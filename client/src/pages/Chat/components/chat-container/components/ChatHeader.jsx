import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getColor } from '@/lib/utils'
import { useAppstore } from '@/store'
import { HOST } from '@/utils/constants'
import React from 'react'
import { RiCloseFill } from 'react-icons/ri'
const ChatHeader = () => {

  const {closeChat, selectedChatData, selectedChatType} = useAppstore();

  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20 ' >
        <div className='flex gap-5 items-center w-full justify-between'>
            <div className='flex gap-3 items-center justify-center'>
                <div className='w-12 h-12 relative' >
                  <Avatar className='h-12 w-12  rounded-full overflow-hidden'>
                      {selectedChatData.image ? (
                        <AvatarImage 
                          src={`${HOST}/${selectedChatData.image}`} 
                          alt="profile" 
                          className="object-cover w-full h-full bg-black" 
                          />
                          ) : (
                          <div 
                            className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                              selectedChatData.color
                            )}`}
                          >
                            {
                              selectedChatData.firstname
                              ? selectedChatData.firstname.split("").shift()
                              : selectedChatData.email.split("").shift()
                            }
                          </div>
                        )}
                  </Avatar>
                </div>
                <div>
                  {selectedChatType === 'contact'&& selectedChatData.firstname ? `${selectedChatData.firstname} ${selectedChatData.lastname}`: selectedChatData.email}
                </div>
            </div>
            <div className='flex items-center justify-center gap-5 '>
                <Button 
                    className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all' 
                    onClick={closeChat}
                >
                    <RiCloseFill className='text-3xl' />
                </Button>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader