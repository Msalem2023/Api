import { useQuery } from "@tanstack/react-query";
import { BiPhoneOff, BiVideoOff } from "react-icons/bi";
import { MyGroupChats } from "./http";
import { motion } from 'framer-motion';
import { Context } from "../Hooks/useChat";



const AllChats = () => {
    const { dispatch } = Context();
    const { data } = useQuery({
        queryKey: ['my-chats'],
        queryFn: MyGroupChats,
    });
    console.log(data)



    return (
            <div className="flex flex-col p-4">
                {data?.chats?.map((e, i) => (
                    <div
                        key={e._id}
                        onClick={() => dispatch({ type: "Chat", payload: e._id })}
                        className="bg-white rounded-lg shadow-md p-4 m-2 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex -space-x-4 rtl:space-x-reverse">
                                {e?.Users.map(attendee => (
                                    <motion.img
                                        key={attendee.id}
                                        src={attendee.image}
                                        alt={attendee.name}
                                        className="w-12 h-12 border-2 border-white rounded-full hover:scale-105 transition-transform"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    />
                                ))}
                            </div>
                            <div className="flex-grow ml-4">
                                <h2 className="text-lg font-semibold text-gray-800">{e.name || 'Chat Room'}</h2>
                                <p className="text-gray-600 text-sm">{e.lastMessage || 'No messages yet'}</p>
                            </div>
                            <span className="text-gray-500 text-xs">{new Date(e.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                ))}
            </div>
    );
};

export default AllChats;
