import { Input } from "@/components/ui/input";
import Background from "@/assets/bg.png";
import Logo from "@/assets/logo.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import { apiClinet } from "@/lib/api-client";

const Auth = () => {

    //Input Components
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateSignup= () => {  
        if(!email.length) {
            toast.error("Email is required.");
            return false;
        }
        if(!password.length){
            toast.error("Passwrod is required");
            return false;
        }       
        if(password !== confirmPassword){
            toast.error("Password and confirm password should be same.");
            return false;
        }                           
        return true;
        
    };

    //Handle Click Events

    const handleLogin = async () => {};
    
    const handleSignUp = async () => {
        if(validateSignup()) {
            const response = await apiClient.post(SIGNUP_ROUTE, {emial, password}) ;
            console.log({ response });
        }
    };

    return(
         <div className="h-[100vh] w-[100vw] flex items-center justify-center">
                <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:[60vw] roundeed-3xl grid xl:grid-cols-2">
                    <div className="flex flex-col gap-10 items-center justify-center">
                        <div className="flex items-center justify-center flex-col">
                            <div className="flex items-center justify-center">
                                <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                                <img src={Logo} alt="Emoji" className="h-[100px]"/>
                            </div>
                            <p className="font-medium text -cneter">
                                Fill in the details to get started
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <Tabs className="w-3/4">
                                <TabsList className='bg-transparent rounded-none w-full'>
                                    <TabsTrigger 
                                        value="login" 
                                        className="data-[state=active]:bg-transparent
                                         text-black text-opacity-90 border-b-2 rounded-none
                                          w-full data-[state=active]:text-black 
                                          data-[state=active];font-semibold
                                         data-[state=active]:border-b-purple-500 
                                         p-3 transition-all duration-300">Login</TabsTrigger>

                                    <TabsTrigger value="signup"
                                    className="data-[state=active]:bg-transparent
                                         text-black text-opacity-90 border-b-2 rounded-none
                                          w-full data-[state=active]:text-black 
                                          data-[state=active];font-semibold
                                         data-[state=active]:border-b-purple-500 
                                         p-3 transition-all duration-300">SignUp</TabsTrigger>
                                </TabsList>
                                <TabsContent className="flex flex-col gap-5 mt-10" 
                                value="login">
                                    <Input 
                                    placeholder="Email" 
                                    type="email" 
                                    className="rounded-full p-6" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    /> 
                                    <Input
                                    placeholder="Password"
                                    type="password"
                                    className="rounded-full p-6"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    /> 
                                    <Button className="rounded-full p-6" onClick={handleLogin}>
                                        Login
                                    </Button>
                                </TabsContent>
                                <TabsContent className="flex flex-col gap-5" 
                                value="signup">
                                <Input 
                                    placeholder="Email" 
                                    type="email" 
                                    className="rounded-full p-6" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    /><Input 
                                    placeholder="Password" 
                                    type="password" 
                                    className="rounded-full p-6" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    />
                                    <Input 
                                    placeholder="Confirm Password" 
                                    type="password" 
                                    className="rounded-full p-6" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    />
                                    <Button className="rounded-full p-6" onClick={handleSignUp}>
                                        Signup
                                    </Button>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                    <div className="hidden xl:flex justify_center items-center">
                        <img src={Background} alt="backgroung login" className="h-[500px]"/>
                    </div>
                </div>
            </div>
        );
};

export default Auth;