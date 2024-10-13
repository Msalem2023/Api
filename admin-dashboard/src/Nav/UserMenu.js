
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import useRegisterModal from "../Hooks/useRegister";
import useLoginModal from "../Hooks/useLogIn";
import Avatar from "../Components/Avatar";

const UserMenu = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  //For Airbnb your home
  
  return (
    <div className="mainCont relative">
      <div className="innerCont flex flex-row items-center gap-3">
        <div  className="hidden md:block text-xl font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Dashboard
        </div>
        <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full flex flex-row items-center gap-3 cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                  }}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => {
                  }}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => {
                  }}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => {
                  }}
                  label="My properties"
                />
                <MenuItem  label="Airbnb my home" />
                <MenuItem
                  onClick={() => {
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;