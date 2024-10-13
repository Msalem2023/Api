import { IoPersonCircleSharp } from "react-icons/io5";


const Avatar = ({ src }) => {
  return src ? <img className="w-full h-full rounded-full object-cover" src={src} alt="Avatar" /> : <IoPersonCircleSharp className="text-black" size={50} />
    ;
};

export default Avatar;