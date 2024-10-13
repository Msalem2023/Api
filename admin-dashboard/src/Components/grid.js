import React from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { FaTasks, FaRegComment } from 'react-icons/fa';
import { GrProjects } from 'react-icons/gr';
import { IoIosSettings } from 'react-icons/io';
import { MdCalendarToday } from 'react-icons/md';
import useEditModal from '../Hooks/useEdit';
import Team from '../Team';
import Chat from './Chat';
import Navbar from './Nav';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamData } from './http';
import { Context } from '../Hooks/useChat';
import Notification from './notification';
import { motion } from 'framer-motion';
import Picker from './date';
import Meetings from './Meetings';
import User from './User';


function GridLayout({ data }) {
  const { state, dispatch } = Context();
  const item = [
    { titel: "Home", Icon: <BiHome color='black' size={30} /> },
    { titel: "Projects", Icon: <GrProjects color='black' size={30} /> },
    { titel: "Tasks", Icon: <FaTasks color='black' size={30} /> },
    { titel: "Team", Icon: <AiOutlineTeam color='black' size={30} />, onClick: () => dispatch({ type: "Chat", payload: undefined }) },
    { titel: "Settings", Icon: <IoIosSettings color='black' size={30} /> }
  ];

  const { data: Data, error, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: fetchTeamData
  });

  if (isLoading) {
    return (
      <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
        Loading...
      </div>
    );
  }

  if (error) return (

    <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <div className='mx-auto'>
        <span class="font-medium text-center">Something went Wrong!</span> Refresh your page or log in again
      </div>
    </div>

  )

  const containerVariants = {
    hidden: { opacity: 0, translateX: -100, translateY: -100 },
    visible: { opacity: 1, translateX: 0, translateY: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, translateY: 20 },
    visible: { opacity: 1, translateY: 0 }
  };

  return (
    <div className="bg-gray-200 p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.3, delay: 1 }}
        className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        {/* Sidebar Navigation */}
        <div className="relative hidden lg:block col-span-1 md:row-span-2 bg-white shadow-lg rounded-lg overflow-hidden">
          <Navbar item={item} itemVariants={itemVariants} />
        </div>

        {/* User Information */}
        <motion.div
          variants={itemVariants}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3 "
        >
          <User data={data} itemVariants={itemVariants} />
        </motion.div>

        {/* Chat Section */}
        <motion.div
          variants={itemVariants}
          transition={{ delay: 1.2 }}
          className="lg:col-span-2 lg:row-span-2 rounded-lg"
        >
        <Chat />
        </motion.div>

        {/* Team Section */}
        <motion.div
          variants={itemVariants}
          transition={{ delay: 1.4 }}
          className="lg:col-span-1 lg:row-span-1 "
        >
          <Team data={Data} />
        </motion.div>

        {/* Meetings Section */}
        <motion.div
          variants={itemVariants}
          transition={{ delay: 1.6 }}
          className="lg:col-span-1 p-5 bg-white lg:row-span-1 shadow-lg rounded-lg border border-gray-300"
        >
          <Meetings />
        </motion.div>

        {/* Picker Section */}
        <motion.div
          variants={itemVariants}
          transition={{ delay: 1.6 }}
          className="lg:col-span-1  lg:row-span-1 "
        >
          <Picker Attendees={Data} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default GridLayout;
