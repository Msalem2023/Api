import { useMemo, useState } from "react";

const SelectableList = ({ items, label, handleSelection }) => {
    const [open, setOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search input

    console.log(selectedItems)

    const handleCheckBox = (item, checked) => {
        let updatedItems;
        if (checked) {
            updatedItems = [...selectedItems, item];
        } else {
            updatedItems = selectedItems.filter(i => i !== item);
        }

        setSelectedItems(updatedItems);
        handleSelection(updatedItems); // Notify parent of the updated selection
    };
    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm])

    return (
        <div className="relative">
            <div
                onClick={() => setOpen(prev => !prev)}
                className="text-base cursor-pointer font-normal text-gray-500 dark:text-gray-400 mb-2"
            >
                <ul>
                    {selectedItems.length > 0 ? (
                        selectedItems.map((item, index) => (
                            <li key={index} className="text-sm">
                                {item}
                            </li>
                        ))
                    ) : (
                        <li className="text-sm">{label} not selected</li>
                    )}
                </ul>
            </div>

            {open && (
                <div className="absolute rounded-xl shadow-md w-[300px] z-10 bg-gray-500 overflow-hidden left-0 top-8 text-sm">
                    <div className="p-3">
                        <label htmlFor="input-group-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="input-group-search"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={`Search ${label}`}
                            />
                        </div>
                    </div>
                    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                        {filteredItems.map((item, i) => (
                            <li key={i}>
                                <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input
                                        onChange={(event) => handleCheckBox(item, event.target.checked)}
                                        id={`checkbox-item-${i}`}
                                        type="checkbox"
                                        checked={selectedItems.includes(item)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor={`checkbox-item-${i}`}
                                        className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                    >
                                        {item}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelectableList;
