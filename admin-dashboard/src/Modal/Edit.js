import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import useEditModal from "../Hooks/useEdit";
import { useAuth } from "../Hooks/useCurrentUser";
import { useForm } from "react-hook-form";
import ImageUpload from "../Components/ImageUpload";
import { useMutation } from "@tanstack/react-query";
import Modal from "./Modal";
import Input from "../Components/Input";
import { Update } from "../Components/http";
import { client } from "..";
import axios from "axios";
import Header from "../Components/Header";

const EditModal = () => {
    const Edit = useEditModal();
    const [image, setImage] = useState("")



    //Dynamically importing map based on location

    //Custom set value (dont know why)
    // eg. "category" : "Beach"

    const onSubmit = () => {
        const token=localStorage.getItem("token")
        mutate({ image,token })
    };
    const { mutate, isLoading } = useMutation({
        mutationFn: Update,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Profile"] });
            toast.success("Info has been modified successfully");
            Edit.onClose();
        },
        onError: () => {
            toast.error("An error occurred while updating info");
        }
    });

    let bodycontent = (
            <div className="flex flex-col gap-8">
                <Header
                    title="Update your profile's picture"
                    subtitle="Edit"
                />
                <ImageUpload value={image}
                    onChange={(value) => {
                        setImage(value)
                    }} />
            </div>
        )
    
    // if (step === 1) {
    //     bodycontent = (
    //         <div className="flex flex-col gap-8">
    //             <Header
    //                 title="Update your title as well as your username"
    //                 subtitle="Edit"
    //             />
    //             <div className="flex flex-col gap-4">
    //                 <input id="userName" className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed" onChange={(e) => setUserName(e.target.value)}
    //                     placeholder="User Name" disabled={isLoading} required />
    //                 <input className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed" id="title" onChange={(e) => setTitle(e.target.value)}
    //                     placeholder="Title" disabled={isLoading} required />
    //             </div>
    //         </div>
    //     )

    // }

    return (
        <Modal
            body={bodycontent}
            onSubmit={onSubmit}
            disabled={isLoading}
            isOpen={Edit.isOpen}
            title="Edit your Profile"
            onClose={Edit.onClose}
            actionLabel="update"
        />
    );
};

export default EditModal;