import { FaRegComment } from "react-icons/fa"
import Notification from "./notification"
import { MdCalendarToday } from "react-icons/md"
import { motion } from 'framer-motion';
import useEditModal from "../Hooks/useEdit";


const User = ({ data, itemVariants }) => {
    const Edit = useEditModal();
    const getRandomColor = () => {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFC300', '#FF33F6'];
        return colors[Math.floor(Math.random() * colors.length)];
    };
    const initial = data?.userName?.charAt(0).toUpperCase();
    const bgColor = getRandomColor();
    return (
        <div className='flex flex-col md:flex-row md:justify-between p-4 bg-white rounded-lg shadow-md'>
            <motion.div
                variants={itemVariants}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 mb-4 md:mb-0"
            >
                {data?.image ? <div className="relative w-16 h-16">
                    <img
                        onClick={Edit.onOpen}
                        src={data?.image}
                        alt="User"
                        className="w-full h-full rounded-full object-cover border-2 border-blue-500 shadow-md cursor-pointer transition-transform transform hover:scale-105"
                    />
                    <span className="absolute bottom-0 right-0 block w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-md"></span>
                </div> : <div
                    onClick={Edit.onOpen}
                    className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-blue-500 shadow-md"
                    style={{ backgroundColor: bgColor }}
                >
                    <span className="text-3xl font-bold text-white">{initial}</span>
                </div>}
                <div>
                    <p className="font-semibold text-2xl text-gray-800">{data?.userName}</p>
                    <p className="text-gray-600 text-sm">{data?.role}</p>
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2 text-gray-600 bg-gray-200 rounded-full px-3 py-1 mb-4 md:mb-0"
            >
                <MdCalendarToday size={20} />
                <span className="text-sm">
                    {new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date())}
                </span>
            </motion.div>

            <motion.div
                variants={itemVariants}
                transition={{ delay: 1 }}
                className="flex items-center gap-4 mb-4 md:mb-0"
            >
                <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <Notification />
                <FaRegComment size={24} className="text-gray-600 hover:text-blue-600 transition-colors" />
            </motion.div>
        </div>


    )
}

export default User