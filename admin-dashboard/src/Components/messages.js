import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Context } from '../Hooks/useChat';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import FetchAudio from './play';
import Image from './Images';
import Tooltip from '../Tooltip'; // Ensure the path is correct
import { useMutation } from '@tanstack/react-query';
import { client } from '..';
import toast from 'react-hot-toast';
import { handelReaction } from "./http";
import { useAuth } from '../Hooks/useCurrentUser';
import Avatar from './Avatar';
import { CiRead, CiUnread } from 'react-icons/ci';



const Messages = ({ messages }) => {
  const { user } = useAuth()
  console.log(user)

  console.log(messages)
  const { state } = Context();
  const { mutate } = useMutation({
    mutationFn: handelReaction,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Voice"] });
      toast.success("emoji sent!");

    },
    onError: () => {
      toast.error("Oops! emoji couldn't be sent");
    },
  });

  const handleReaction = (messageId, emoji) => {
    console.log(messageId, emoji)

    mutate({ messageId, emoji });
  };

  return (
    <motion.div className="h-[500px] overflow-auto cursor-pointer p-4">
      <motion.div>
        {messages?.map((element, i) => {
          const isSender = JSON.stringify(user?._id) === JSON.stringify(element.Sender._id)
          const isRead = element.status === 'read';
          const timeAgo = formatDistanceToNow(new Date(element.createdAt), { addSuffix: true, locale: enUS });
          const bgColor = isSender
            ? 'bg-gradient-to-r from-green-400 to-green-300 text-black shadow-md' // Sender's message gradient
            : 'bg-gradient-to-r from-gray-400 to-gray-300 text-black shadow-md' // Receiver's message gradient

            //  !element?.Message?.includes('https') && !Array.isArray(element.Message)
            ;
          return (
            <motion.div
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.3, delay: i * 0.5 }}
              key={element._id}
              className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <Tooltip content={['❤️', '😂', '😠', '👍']} onClick={(emoji) => handleReaction(element._id, emoji)}>
                <div className={`flex items-start space-x-2 ${isSender ? 'flex-row-reverse' : ''}`}>
                  <img
                    className="w-12 h-12 rounded-full"
                    src={element.Sender.image}
                    alt={`${element.Sender.userName}'s profile`}
                  />
                  <div className="flex flex-col gap-1 w-[300px]">
                    <div className="flex items-center flex-reverse justify-between space-x-2 px-2">
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{timeAgo}</span>
                      <span className="text-lg font-semibold text-black">{element?.Sender?.userName}</span>
                    </div>
                    <div className={`${bgColor} p-3 rounded-xl w-full`}>
                      {Array.isArray(element.Message) ? (
                        <Image Images={element.Message} />
                      ) : element.Message.includes('voice') ? (
                        <FetchAudio url={element.Message} />
                      ) : (<div className='flex flex-row items-center justify-between gap-3 w-auto'>
                        <p className="text-lg font-semibold p-2">{element.Message}</p>
                        {isSender && (
                          <div className={`flex items-center ${isRead ? 'text-green-500' : 'text-gray-400'}`}>
                            {isRead ? <CiRead size={20} color='green' /> : <CiUnread size={20} color='gray' />}
                          </div>
                        )}
                      </div>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 flex space-x-2 p-2 bg-white rounded-lg shadow-md">
                      {element?.reactions.map(reaction => (
                        <span
                          key={reaction.userId}
                          className="text-xl cursor-pointer hover:scale-110 transition-transform duration-200"
                          title={`Reacted by ${reaction.userId}`} // Tooltip for better accessibility
                        >
                          {reaction.reaction}
                        </span>
                      ))}
                    </div>
                    {isSender && element?.ReadBy?.map((e, i) => (<div className="relative w-8 h-8">
                      <Avatar
                        src={e.image}
                        className={` rounded-full border-2 border-gray-300`}
                      />
                    </div>))}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              </Tooltip>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Messages;
