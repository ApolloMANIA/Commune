import { useAppstore } from '@/store'
import React, { useEffect, useRef } from 'react'

const MessageContainer = () => {
  const scrollRef = useRef(null)
  const { selectedChatMessages, userInfo } = useAppstore()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedChatMessages])

  const renderMessages = () => {
    return selectedChatMessages.map((message) => {
      const isSentByMe =
        message.sender === userInfo.id ||
        message.sender === userInfo._id ||
        message.sender?._id === userInfo.id

      return (
        <div
          key={message._id || `${message.timestamp}-${message.content}`}
          className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-3`}
        >
          <div
            className={`max-w-[70%] break-words rounded-lg px-4 py-2 text-sm ${
              isSentByMe
                ? 'bg-[#8417ff]/5 text-white'
                : 'bg-[#2a2b33] text-white'
            }`}
          >
            {message.messageType === 'text' && <p>{message.content}</p>}
            {message.timestamp && (
              <span className="mt-1 block text-[10px] text-gray-400">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw]">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  )
}

export default MessageContainer
