import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getColor } from '@/lib/utils';
import { useAppstore } from '@/store';
import { HOST, LOGOUT_ROUTE } from '@/utils/constants';
import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FiEdit2 } from 'react-icons/fi';  
import { useNavigate } from 'react-router-dom';
import {IoLogOut, IoPowerSharp} from 'react-icons/io5'
import { apiClient } from '@/lib/apiClient';

const ProfileInfo = () => {
    const navigate = useNavigate();
    const {userInfo,setUserInfo} = useAppstore();

    const Logout = async () => {
        try{
            const res =await apiClient.post(
                LOGOUT_ROUTE,
                {},
                {withCredentials:true}
            );

            if(res.status === 200){
                navigate("/auth");
                setUserInfo(null);
            }
        } catch(error){
            console.log(error);
        }
    }
    return (
        <div className='absolute bottom-0 h-16 flex items-center justify-between px-4 w-full bg-[#2a2b33]' >
            <div className='flex items-center gap-3 justify-center'>
                <div className='w-12 h-12 relative' >
                    <Avatar className='h-12 w-12  rounded-full overflow-hidden'>
                    {
                        userInfo.image ? (
                        <AvatarImage 
                        src={`${HOST}/${userInfo.image}`} 
                        alt="profile" 
                        className = "object-cover w-full h-full bg-black" 
                        />
                        ) : (
                        <div 
                        className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>
                            {
                                userInfo.firstname
                                ? userInfo.firstname.split("").shift()
                                : userInfo.email.split("").shift()
                            }
                        </div>
                    )}
                    </Avatar>
                </div>
                <div  >
                    {
                        userInfo.firstname && userInfo.lastname ? 
                        `${userInfo.firstname} ${userInfo.lastname}`:""
                    }
                </div>
            </div>
            <div className='flex gap-4' >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiEdit2 className="text-purple-500 text-xl font-medium" 
                            onClick={()=>navigate("/profile")}/>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white " >
                            Edit Profile
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <IoPowerSharp
                            className="text-red-500 text-xl font-medium" 
                            onClick={Logout}/>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white " >
                            Logout
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default ProfileInfo