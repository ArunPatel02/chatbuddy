import { useContext, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { CustomContext } from '../../CustomContext';

const useSocket = () => {

    const { setUserData, userData, setContactList , setAppSocket } = useContext(CustomContext); // Assuming userdata and setUserData are context values


    let socket: Socket;

    useEffect(() => {
        if (userData.profileComplete && !socket?.connect) {
            socket = io("http://192.168.1.2:5000", {
                withCredentials: true,
                extraHeaders: {
                    Authorization: userData._id,
                },
            });
            socket.on("connect", () => {
                console.log("Connected to socket server" , socket.id);
            });

            setAppSocket(socket)

            socket.on("new message", (message) => {
                console.log("New message", message);
                alert("new message");
            });

            return () => {
                // socket.disconnect();
            };
        }
    }, [userData.profileComplete, userData._id]);

    return { socket }
};

export default useSocket;