import { useAppStore } from "@/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoarrowBack } from "react-icons/io5";

import { Avatar ,AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const { userInfo , setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const saveChanges = async () => {};


  return (
    <div className="bg-[#191350] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoarrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer"/>
          <div className="grid grid-cols-2">
            <div className="h-full w32 md:w-48 md:h-48 relative flex items-center justify-center" 
            onMouseEnter={()=>setHovered(true)} 
            onMouseLeave={()=>setHovered(false)}
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
            </div>
          </div>
        </div>
      </div>
      {/* Profile
      <div>Email: {userInfo.email}</div> */}
    </div>
  );
};

export default Profile;
// import { useAppStore } from "@/store";



// const Profile = () => {
//     const { userInfo } = useAppStore();
//     return (
//         <div>
//             Profile
//             <div>Email: {userInfo.email}</div>
//         </div>
//     );
// };

// export default Profile;