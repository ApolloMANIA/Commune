import { useAppstore } from '@/store';
import { HOST } from '@/utils/constants';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { userInfo } = useAppstore();

    useEffect(() => {
        if (!userInfo?.id) {
            return;
        }

        const socketInstance = io(HOST, {
            withCredentials: true,
            query: { userId: userInfo.id },
        });

        socketInstance.on('connect', () => {
            console.log('Connected to the socket server');
        });

        const handleRecieveMessage = (message) => {
            const { selectedChatData, selectedChatType, addMessage, pinDirectMessage, userInfo } =
                useAppstore.getState();

            const myId = userInfo?.id || userInfo?._id;
            const other =
                message.sender?._id === myId || message.sender === myId
                    ? message.recipient
                    : message.sender;

            if (other && typeof other === 'object') {
                pinDirectMessage(other);
            }

            if (
                selectedChatType !== undefined &&
                selectedChatData &&
                (selectedChatData._id === message.sender._id ||
                    selectedChatData._id === message.recipient._id)
            ) {
                console.log('Recieved message:', message);
                addMessage(message);
            }
        };

        socketInstance.on('recieveMessage', handleRecieveMessage);
        setSocket(socketInstance);

        return () => {
            socketInstance.off('recieveMessage', handleRecieveMessage);
            socketInstance.disconnect();
            setSocket(null);
        };
    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};
