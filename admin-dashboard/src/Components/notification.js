import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { notification } from "./http";
import { Context } from "../Hooks/useChat";

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { dispatch } = Context();
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    const { data } = useQuery({
        queryKey: ['notification'],
        queryFn: notification
    });
    console.log(data)



    return (
        <div className="relative">

            <button onClick={toggleOpen} type="button" class="inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
                <span class="sr-only">Notifications</span>
                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{data?.unreadCount>0?data.unreadCount:0}</div>          
            </button>
            {isOpen && (
                <div className="absolute z-10 rounded-xl shadow-lg w-[300px] bg-gray-700 overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {data?.messages?.map((e, i) => {
                            console.log(e.Sender._id)
                            return (
                                <li className="flex p-2">
                                        <img onClick={()=>dispatch({type:"Chat",payload:e.Sender._id})} class="w-12 h-12 mb-3 me-3 rounded-full sm:mb-0" src={e.Sender?.image} alt="Bonnie Green" />
                                        <div>
                                            <div class="text-base font-normal text-gray-600 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">{e.Sender.userName}</span> sent <span class="font-medium text-gray-900 dark:text-white">you</span> Message</div>
                                            <div class="text-md font-normal text-white w-[100px] overflow-hidden ">{e.Message}</div>
                                            <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                                <svg class="w-2.5 h-2.5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z" />
                                                    <path d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                                                    <path d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                                                </svg>
                                                Private
                                            </span>
                                        </div>
                                </li>
                            )
                        })}

                    </div>
                </div>
            )
            }
        </div>
    )
}
export default Notification