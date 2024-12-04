import React, { Children, useEffect } from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Chat from './pages/Chat/Chat'
import Profile from './pages/Profile/Profile'
import { useAppstore } from './store'
import { apiClient } from './lib/apiClient'
import { GET_USER_INFO } from './utils/constants'
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

const PrivateRoute =({children})=>{
  const  {userInfo} = useAppstore();
  const   isAunthenticated = !!userInfo;
  return isAunthenticated ? children :<Navigate to="/auth"/>
};

const AuthRoute =({children})=>{
  const  {userInfo} = useAppstore();
  const   isAunthenticated = !!userInfo;
  return isAunthenticated ? <Navigate to="/chat"/> : children;
};

const App = () => {
  const {userInfo,setUserInfo} = useAppstore();
  const [loading, setLoading] = React.useState(true);

  //const login = useGoogleLogin((
    //  onSuccess: (tokenresponse) => console.log(tokenresponse),
  // ));

  useEffect(()=>{
      const getUserData = async()=>{
        try {
          const res = await apiClient.get(GET_USER_INFO,{
            withCredentials:true
           });
        
          if(res.status === 200 && res.data.id){
            setUserInfo(res.data);
          }
          else {
            setUserInfo(undefined);
          }

         console.log(res);
      }

      catch (error) {
          setUserInfo(undefined);
      } 

      finally {
          setLoading(false);
      }
    };
    if(!userInfo){
      getUserData();
    } else {
      setLoading(false);
    } 
  },
  [userInfo, setUserInfo]

)
  
  if(loading){
    return <div>Loading...</div>
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/auth" 
          element={
            <AuthRoute>
               <GoogleLogin
              onSuccess={credentialResponse => {
                const credentialResponseDecoded = jwt_decode(
                  credentialResponse.credential
                );
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
              />
              <Auth />
              
            </AuthRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <PrivateRoute>
              <Chat/>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;