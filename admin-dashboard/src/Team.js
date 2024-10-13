import { useCallback, useState } from "react";
import { FaPlus, FaUsers } from "react-icons/fa";
import usePromoteModal from "./Hooks/usePromote";
import { Context } from "./Hooks/useChat";
import MenuItem from "./Nav/MenuItem";
import Pagination from "./Components/pagination";
import { BsEnvelope, BsThreeDotsVertical } from "react-icons/bs";
import { BiUser } from "react-icons/bi";

const Team = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const { dispatch } = Context();
    const promote = usePromoteModal();

    const [items, setItems] = useState()

    const liftHandler = useCallback((newItems) => {
        setItems(newItems);
    }, []);

    const UpdateRole = (id) => {
        promote.onOpen();
        dispatch({ type: "Chat", payload: id });
    };

    return (
        <>
            <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
    <div className="flex items-center mb-6">
        <FaUsers className="text-4xl mr-3 text-blue-600" />
        <h1 className="text-4xl font-bold text-gray-800">Team</h1>
        <div className="flex items-center ml-auto bg-blue-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow">
            <BiUser size={24} />
            <span className="ml-1 text-lg font-semibold">{items?.length}</span>
        </div>
    </div>

    {items?.map((user) => (
        <div key={user._id} className="flex flex-row justify-between items-center bg-white rounded-lg p-4 m-2 shadow hover:shadow-lg transition-shadow">
            <div onClick={() => dispatch({ type: "Chat", payload: user._id })} className="flex items-center text-gray-900 cursor-pointer">
                <img className="w-14 h-14 rounded-full border-2 border-gray-300 shadow-sm" src={user.image} alt={user.userName} />
                <div className="ml-4">
                    <div className="text-lg font-semibold">{user.userName}</div>
                    <div className="text-sm font-normal text-gray-600 overflow-hidden w-[200px]">{user.email}</div>
                </div>
            </div>
            <BsThreeDotsVertical
                size={30}
                onClick={() => UpdateRole(user._id)}
                className="bg-gray-300 text-gray-800 p-2 rounded-full hover:bg-gray-400 transition-colors cursor-pointer"
            />
        </div>
    ))}

    <Pagination data={data?.Team} lifthandler={liftHandler} number={2} />

    <hr className="my-4 border-t border-gray-300" />

    <div className="flex items-center p-4 m-2 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
        <FaPlus size={30} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors" />
        <p className="ml-3 text-gray-700 text-lg font-medium">Add new team member</p>
    </div>
</div>


            {/* <div className="sm:rounded-lg">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
                    <div className="relative">
                        <button
                            id="dropdownActionButton"
                            onClick={toggleOpen}
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
                            type="button"
                        >
                            Action
                            <svg
                                className="w-2.5 h-2.5 ms-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="absolute rounded-xl shadow-md w-[300px] md:w-[200px] z-10 bg-white overflow-hidden left-0 top-10 text-sm">
                                <div className="flex flex-col cursor-pointer">
                                    <MenuItem label="Reward" />
                                    <MenuItem label="Promote" />
                                    <MenuItem label="Activate account" />
                                    <MenuItem label="Delete User" />

                                </div>
                            </div>
                        )}
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search for users"
                        />
                    </div>
                </div >
            </div >
            <div className="overflow-x-auto">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">Position</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.map((user, index) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th onClick={()=>dispatch({type:"Chat",payload:user._id})} scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img class="w-12 h-12 rounded-full" src={user.image} alt="Jese"/>
                                        <div class="ps-3">
                                            <div class="text-base font-semibold">{user.userName}</div>
                                            <div class="font-normal text-gray-500">{user.email}</div>
                                        </div>
                                </th>
                                <td class="px-6 py-4">
                                    React Developer
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> {user.status}
                                    </div>
                                </td>
                                <td onClick={()=>UpdateRole(user._id)} class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </>
    );
};

export default Team;
