import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMeetingData, Group } from "./http";
import { motion } from 'framer-motion';
import { useCallback, useState } from "react";
import Pagination from "./pagination";
import { Context } from "../Hooks/useChat";
import { FaRegClock } from "react-icons/fa";
import { PiDotsThreeVertical } from "react-icons/pi";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { client } from "..";
import toast from "react-hot-toast";




const Meetings = () => {
    const { dispatch } = Context();

    const { data } = useQuery({
        queryKey: ['Meeting'],
        queryFn: fetchMeetingData,
    });
    const [items, setItems] = useState([])

    const liftHandler = useCallback((newItems) => {
        setItems(newItems);
    }, []);
    const { mutate } = useMutation({
        mutationFn: Group,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Meeting"] });
            toast.success("Group Created");
            
        },
        onError: () => {
            toast.error("Oops! Group couldn't be created");
        },
    });
    const handleGroup = (participants) => {
        mutate({ participants });
    };


    return (
        <div>
            {items?.map((e, i) => (
                <div key={i} className="bg-white rounded-lg p-4 m-2">
                    <p className="text-gray-800 font-semibold text-lg mb-1">Meeting</p>
                    <h5 className="text-gray-900 font-bold text-xl mb-2">{e.project}</h5>

                    <div className="flex items-center gap-2 mb-3">
                        <CiLocationOn size={24} className="text-green-600" />
                        <p className="text-gray-700 italic">{e.office}</p>
                    </div>

                    <div className="bg-gray-200 flex justify-between items-center p-3 rounded-lg mb-3">
                        <div className="flex items-center gap-2">
                            <FaRegClock size={24} className="text-gray-500" />
                            <p className="text-gray-700">{e.selectedTime}</p>
                        </div>
                        <PiDotsThreeVertical size={24} className="text-gray-500" />
                    </div>

                    <div className="bg-gray-200 flex justify-between items-center p-3 rounded-lg mb-3">
                        <div className="flex items-center gap-2">
                            <CiCalendar size={24} className="text-gray-500" />
                            <p className="text-gray-700">
                                {new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(e.startDate)) || 'Select Date'}
                            </p>
                        </div>
                        <PiDotsThreeVertical size={24} className="text-gray-500" />
                    </div>

                    <div>
                        <h3 className="text-gray-800 font-semibold">Attendees</h3>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex -space-x-4 rtl:space-x-reverse">
                                {e.participants.map(attendee => (
                                    <motion.img
                                        key={attendee.id}
                                        src={attendee.image}
                                        alt={attendee.name}
                                        className="w-10 h-10 border-2 border-white rounded-full hover:scale-105 transition-transform cursor-pointer"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        onClick={() => dispatch({ type: "Chat", payload: attendee._id })}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                <h3 className="text-gray-800">Send invitation link</h3>
                                <IoIosSend onClick={()=>handleGroup(e.participants)} className="bg-sky-900 text-white rounded-full p-2 hover:bg-sky-700 transition" size={30} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <Pagination data={data} lifthandler={liftHandler} number={1} />
        </div>
    )
}
export default Meetings