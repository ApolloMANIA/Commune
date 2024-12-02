import { useAppstore } from '@/store'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/lib/utils';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/apiClient';
import { ADD_PROFILE_IMAGE_ROUTE, HOST, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from '@/utils/constants';

const Profile = () => {
  const navigate = useNavigate();
  const {userInfo, setUserInfo}=useAppstore();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setselectedColor] = useState(0);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstname(userInfo.firstname);
      setLastname(userInfo.lastname);
      setselectedColor(userInfo.color);
    }
    if(userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstname || !lastname) {
      if (!firstname) {
        toast.error("First Name is required");
      }
      if (!lastname) {
        toast.error("Last Name is required");
      }
      return false;
    }
    return true;
  }
  
  
  const saveChanges = async () => {
    if (validateProfile()){
      try {
        const res = await apiClient.post(
          UPDATE_PROFILE_ROUTE, 
          { firstname, lastname, color: selectedColor }, { withCredentials: true } 
        );
        if (res.status === 200 && res.data) {
          setUserInfo({
            ...res.data
          });
          toast.success("Profile Updated Successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    } 
  };

  const handleNavigate = () => {
    if(userInfo.profileSetup) navigate("/chat");
    else toast.error("Please complete your profile setup");
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const res = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, { withCredentials: true });
      if (res.status === 200 && res.data.image) {
        setUserInfo({ ...userInfo, image: res.data.image });
        toast.success("Profile Image Updated Successfully");
      }
    }
  }
  const handleImageDelete = async () => {
    try {
      const res = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, { withCredentials: true });
      if (res.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Profile Image Removed Successfully");
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-[#1b1c24] h-screen flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max' >
        <div>
          <IoArrowBack onClick={handleNavigate} className='text-white/90 text-4xl lg:text-6xl cursor-pointer'  />
        </div>
        <div className='grid grid-cols-2' >
          <div className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center' 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={()=>setHovered (false)}
          >
            <Avatar className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden'>
              {
                image ? (
                <AvatarImage 
                  src={image} 
                  alt="profile" 
                  className = "object-cover w-full h-full bg-black" 
                  />
                ) : (
                  <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)} `}>
                    {firstname
                    ? firstname.split("").shift()
                  : userInfo.email.split("").shift()}
                  </div>
              )}
            </Avatar>
            {
              hovered && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full cursor-pointer'
                onClick={image ? handleImageDelete : handleFileInputClick} >
                  {
                      image ? (
                      <FaTrash className='text-white text-3xl cursor-pointer' />
                      ) : (
                      <FaPlus className='text-white text-3xl cursor-pointer' />
                      )
                  }
                </div>
              )
            }
            <input 
            type="file" 
            ref={fileInputRef} 
            className='hidden' 
            onChange={handleImageChange} name='profile-image'
            accept='.png, .jpg, .jpeg, .svg, .webp '/>
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center' >
            <div className='w-full'>
              <Input 
              placeholder = "Email" 
              type="email" 
              value={userInfo.email} 
              disabled
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className='w-full'>
              <Input 
              placeholder = "First Name" 
              type="text" 
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className='w-full'>
              <Input 
              placeholder = "Last Name" 
              type="text" 
              value={lastname} 
              onChange={(e) => setLastname(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className='w-full flex gap-5'>
              {
                colors.map((color, index) => (
                  <div 
                  key={index} 
                  onClick={() => setselectedColor(index)}
                  className={`h-8 w-8 rounded-full cursor-pointer ${color} transition-all duration-300 ${selectedColor === index ? 'outline outline-white/50 outline-4' : ''}`}
                  />
                ))
              }
            </div>
          </div>
        </div>
        <div className='w-full'>
            <Button
            className='h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300' 
            onClick={saveChanges}
            >
              Save Changes
            </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile