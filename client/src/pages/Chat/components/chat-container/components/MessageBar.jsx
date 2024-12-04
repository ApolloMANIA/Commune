
import React, { useEffect, useRef, useState } from 'react'
import {GrAttachment} from 'react-icons/gr'
import { RiEmojiStickerLine } from 'react-icons/ri'
import { IoSend } from 'react-icons/io5'
import EmojiPicker from 'emoji-picker-react'
import { useAppstore } from '@/store'
import { useSocket } from '@/context/SocketContext'

const MessageBar = () => {
  const emojiRef = useRef();
  const socket = useSocket();
  const {selectedChatType, selectedChatData,userInfo } =useAppstore();
  const [message, setMessage] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen ] = useState(false);
  
  useEffect(()=> {  
    const handleClickOutside = (e) => {
      if(emojiRef.current && !emojiRef.current.contains(e.target)){
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [emojiRef])    



  const handleAddEmoji = (emoji) => {
    setMessage((msg)=> msg + emoji.emoji)
  }
  
  const handleSendMessage = async () => {
    if(selectedChatType === 'contact' ) {
      socket.emit('sendMessage', {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: 'text',
        fileUrl: undefined,
      });
    }
  }
  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6 ' > 
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 ">
        <input 
          type="text" 
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none " 
          placeholder="Type a message..."
          value={message}
          onChange={(e)=> setMessage(e.target.value) } 
        />
        <div className="relative ">
          <button className='text-neutral-400 focus:border-none focus:outline-none focus:text-white duration-300 transition-all hover:text-white ' 
          onClick={()=>setEmojiPickerOpen((prev) => !prev)} >
            <RiEmojiStickerLine className='text-2xl' />
          </button>
          <div 
          className='absolute bottom-16 right-0' 
          ref = {emojiRef}>
            <EmojiPicker 
              theme='dark'
              onEmojiClick={handleAddEmoji} //adds emoji to msg
              open={emojiPickerOpen} //opens emoji picker
              autoFocusSearch={false} //focuses on search bar
              width={300} //width of emoji picker
              height={450} //height of emoji picker
              />
          </div>
        </div>
        <button className='text-neutral-400 hover:text-white focus:border-none focus:outline-none focus:text-white duration-300 transition-all'  >
          <GrAttachment className='text-2xl' />
        </button>
      </div>
      <button className='bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none hover:bg-[#681ebd] focus:bg-[#681ebd] focus:outline-none focus:text-white duration-300 transition-all ' onClick={handleSendMessage} >
          <IoSend className='text-2xl' />
      </button>
    </div>
  )
}

export default MessageBar