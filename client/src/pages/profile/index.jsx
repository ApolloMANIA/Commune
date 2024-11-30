import { useAppStore } from "@/store";



const Profile = () => {
    const { userInfo } = useAppStore();
    return <div>Profile
        <div>
            <h1>email:{userInfo.email}</h1>
            <h1>{userInfo.id}</h1>
        </div>
    </div>;
   
};

export default Profile;