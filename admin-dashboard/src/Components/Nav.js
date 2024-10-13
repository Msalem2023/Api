

import React from 'react';
import { BiHelpCircle, BiLogOut } from 'react-icons/bi';
import { MdDashboard } from 'react-icons/md';
import { motion } from 'framer-motion';


const Navbar = ({ item, itemVariants }) => {
    const logout=()=>{
        sessionStorage.removeItem("token")
        window.location.href="http://localhost:3000"
        
    }
    return (
        <>
            {/* Header Section */}
            <div className="hidden lg:block h-[700px]">
                <motion.div
                     className="p-6 border-b border-gray-300 bg-gray-50 flex items-center rounded-lg">
                    <MdDashboard size={32} color="skyblue" />
                    <p className="font-bold text-2xl text-sky-600 ml-4">Dashboard</p>
                </motion.div>

                {/* Item List */}
                <motion.div
                    className="flex-grow p-6 overflow-y-auto">
                    {item.map((e, index) => (
                        <motion.div
                            variants={itemVariants}
                            transition={{ delay: index * 0.8 }}
                            key={index}
                            className="flex flex-row items-center p-3 gap-4 mb-3 hover:bg-gray-200 rounded-lg transition ease-in-out duration-150"
                            onClick={e.onClick} // Call the function here

                        >
                            <span className="text-gray-700">{e.Icon}</span>
                            <p className="font-semibold text-lg text-gray-800">{e.titel}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Help and Log Out Section */}
                <motion.div
                     className="absolute bottom-3 w-full p-6 border-t border-gray-300">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-4 cursor-pointer hover:bg-gray-300 p-3 rounded-lg transition ease-in-out duration-150">
                            <BiHelpCircle color="gray" size={28} />
                            <p className="font-semibold text-md text-gray-700">Help & Information</p>
                        </div>
                        <div onClick={logout} className="flex flex-row items-center gap-4 cursor-pointer hover:bg-gray-300 p-3 rounded-lg transition ease-in-out duration-150">
                            <BiLogOut size={28} color="gray" />
                            <p className="font-semibold text-md text-gray-700">Log Out</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>

    );
};

export default Navbar;
