import { BiVideo } from "react-icons/bi"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaPhoneAlt } from "react-icons/fa"
import Avatar from "./Avatar"
import { useQuery } from "@tanstack/react-query"
import { chat, MyGroupChats } from "./http"
import { Context } from "../Hooks/useChat"
import Send from "./Send"
import Messages from "./messages"
import VideoCall from "./videoCall"
import AllChats from "./Video"
import { motion } from 'framer-motion';




const Chat = () => {
    const { state } = Context();
    console.log(state.Chat)
    const { data } = useQuery({
        queryKey: ['Message', state.Chat],
        queryFn: chat,
    });
    let receiver = ""
    if (data?.Chat?.Users?.length > 1) {
        receiver = <div className="flex justify-between items-center mt-2">
            <div className="flex -space-x-4 rtl:space-x-reverse">
                {data?.Chat?.Users?.map(attendee => (
                    <motion.img
                        key={attendee.id}
                        src={attendee.image}
                        alt={attendee.name}
                        className="w-20 h-20 border-2 border-white rounded-full hover:scale-105 transition-transform cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    />
                ))}
            </div>
        </div>
    } else {
        console.log(data)
        receiver = <div className="relative w-24 h-24">
            <Avatar
                src={JSON.stringify(data?.Chat?.Receiver?._id) === JSON.stringify(state.Chat)
                    ? data?.Chat?.Receiver?.image
                    : data?.Chat?.Sender?.image}
                className="rounded-full border-2 border-gray-300"
            />
            <span className="absolute bottom-0 right-0 block w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

    }

    console.log(data)

    return (
        <>
            <div className="flex flex-col p-4 relative bg-white rounded-lg shadow-lg">
                {state.Chat ? (
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-inner p-6 mb-6">
                        {receiver}
                        <div className="text-center mt-4">
                            <p className="font-bold text-3xl text-gray-800 hover:text-blue-600 transition-colors duration-200">
                                {JSON.stringify(data?.Chat?.Receiver?._id) === JSON.stringify(state.Chat)
                                    ? data?.Chat?.Receiver?.userName
                                    : data?.Chat?.Sender?.userName}
                            </p>
                            <p className="text-gray-500 text-lg">
                                {JSON.stringify(data?.Chat?.Receiver?._id) === JSON.stringify(state.Chat)
                                    ? data?.Chat?.Receiver?.role
                                    : data?.Chat?.Sender?.role}
                            </p>
                        </div>
                        <div className="flex items-center justify-around gap-8 pt-6">
                            <FaPhoneAlt size={28} className="text-blue-500 hover:text-blue-700 transition-colors duration-200 cursor-pointer" />
                            {/* Uncomment for video call functionality */}
                            {/* <VideoCall/> */}
                            <BiVideo size={28} className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer" />
                            <BsThreeDotsVertical size={26} className="text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer" />
                        </div>
                    </div>
                ) : (
                    <AllChats />
                )}
                <Messages messages={data?.Chat?.Messages} />
                {state.Chat && <Send chat={data?.Chat?._id} />}
            </div>

        </>


    );
};

export default Chat;