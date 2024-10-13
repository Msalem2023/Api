import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowRight, FaMicrophone, FaPaperclip, FaRegSmile } from "react-icons/fa";
import { handelChat } from "./http";
import { client } from "..";
import toast from "react-hot-toast";
import VoiceNote from "./Voice";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import useAttachment from "../Hooks/useAttachment";
import { Context } from "../Hooks/useChat";

const Send = ({ chat }) => {
    const { dispatch } = Context()
    const [Message, setMessage] = useState('');
    const Attach = useAttachment()
    const { mutate } = useMutation({
        mutationFn: handelChat,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['Message'] });
            toast.success('Message Sent!');
            setMessage('');
        },
    });
    const handelMessage = async (ChatId, Message) => {
        mutate({ ChatId, Message });
    };
    const handelattachment = (chat) => {
        console.log(chat)
        Attach.onOpen()
        dispatch({ type: "Receiver", payload: chat });
    }

    return (
        <div className="flex flex-col flex-grow bg-white relative p-4 shadow-lg rounded-lg">
            <div className="flex-1 overflow-y-auto mb-4">
                {/* Chat messages will be displayed here */}
            </div>
            <div className="bg-gray-100 p-4 flex flex-row items-center rounded-lg shadow-inner">
                <FaPaperclip
                    onClick={() => handelattachment(chat)}
                    size={20}
                    className="text-gray-500 mr-2 hover:text-blue-500 transition-colors duration-200"
                />
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-grow py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                    value={Message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex items-center ml-2 space-x-2">
                    {Message ? (
                        <BsFillSendArrowUpFill
                            size={24}
                            onClick={() => handelMessage(chat, Message)}
                            className="text-blue-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                        />
                    ) : (
                        <>
                            <VoiceNote ChatId={chat} />
                            <FaRegSmile size={24} className="text-gray-500 hover:text-blue-500 transition-colors duration-200" />
                        </>
                    )}
                </div>
            </div>
        </div>


    )
}
export default Send