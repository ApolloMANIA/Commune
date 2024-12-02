import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Lottie from 'react-lottie'
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { animationDefaultOptions, getColor } from "@/lib/utils"
import { apiClient } from "@/lib/apiClient"
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useAppstore } from "@/store"


const NewDM = () => {
    const { setSelectedChatType, setSelectedChatData } = useAppstore();
    const [openNewContactModel, setOpenNewContactModel] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])
    const searchContacts = async(searchTerm) => {
        try {
            if(searchTerm.length > 0) {
                const response = await apiClient.post(       
                    SEARCH_CONTACTS_ROUTES,
                    {searchTerm}, 
                    {withCredentials: true}
                );
                if(response.status === 200 && response.data.contacts) {
                    setSearchedContacts(response.data.contacts);
                }
            } else {
                setSearchedContacts([]);
            }
        } catch (error) {
            console.log({error});
        }
    };

    const selectNewContact = (contact) => {
        setOpenNewContactModel(false);
        setSearchedContacts([]);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
    };




    return (
        <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus
                        className="text-neutral-400 cursor-pointer font-light text-opacity-90 text-start hover:text-neutral-100 transition-all duration-300"
                        onClick={() => setOpenNewContactModel(true)}
                    />
                </TooltipTrigger>
                <TooltipContent
                className="bg-[#1c1b1e] border-none mb-2 text-neutral-100 p-3 rounded-md shadow-md"
                >
                    Select new contact
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
            <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col" >
                <DialogHeader>
                    <DialogTitle>Please Select a Contact</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    <Input 
                        placeholder ="Seach Contacts"
                        className="rounded-lg p-6 bg-[#2c2e3b] border-none text-white"
                        onChange={e=>searchContacts(e.target.value)}
                    />
                </div>
                { searchedContacts.length > 0 && (
                    <ScrollArea className=" h-[250px]">
                        <div className="flex flex-col gap-5">
                            {
                                searchedContacts.map((contact) =>(
                                    <div 
                                    key={contact._id} 
                                    className="flex gap-3 items-center cursor-pointer" 
                                    onClick={()=>selectNewContact(contact)}
                                    >
                                        <div className='w-12 h-12 relative' >
                                            <Avatar className='h-12 w-12  rounded-full overflow-hidden'>
                                            {
                                                contact.image ? (
                                                <AvatarImage 
                                                src={`${HOST}/${contact.image}`} 
                                                alt="profile" 
                                                className = "object-cover w-full h-full bg-black rounded-full" 
                                                />
                                                ) : (
                                                <div 
                                                className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                                                    {
                                                        contact.firstname
                                                        ? contact.firstname.split("").shift()
                                                        : contact.email.split("").shift()
                                                    }
                                                </div>
                                            )}
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>
                                            {contact.firstname && contact.lastname
                                                ? `${contact.firstname} ${contact.lastname}`
                                                : contact.email}
                                            </span>
                                            <span className="text-xs">
                                                {contact.email}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </ScrollArea>
                 )}
                {searchedContacts.length <= 0 && (
                        <div className='flex-1 md:flex mt-5 flex-col justify-center items-center  duration-1000 transition-all ' >
                            <Lottie
                            isClickToPauseDisabled={true} 
                            height={100} 
                            width={100} 
                            options={animationDefaultOptions}
                            />
                            <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center ' >
                                <h3 className='poppins-medium '>
                                Hi<span className='text-purple-500'>! </span>Search New<span className='text-purple-500'> Contact. </span>
                                </h3>
                            </div>
                        </div>
                    )
                }
            </DialogContent>
        </Dialog>
        </>
    );
}; 

export default NewDM