import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import ImageUpload from "../Components/ImageUpload";
import { useMutation } from "@tanstack/react-query";
import Modal from "./Modal";
import { Update, uploadAttachments, uploadImages } from "../Components/http";
import { client } from "..";
import Header from "../Components/Header";
import useAttachment from "../Hooks/useAttachment";
import { Context } from "../Hooks/useChat";

const AttachModal = () => {
    const Attach = useAttachment();
    const{ state}= Context()
    const [image, setImage] = useState([])




    const onSubmit = () => {
        const token=localStorage.getItem("token")
        
        mutate({ image, state,token })
    };
    const { mutate, isLoading } = useMutation({
        mutationFn: uploadImages,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Message"] });
            toast.success("Info has been modified successfully");
            Attach.onClose();
        },
        onError: () => {
            toast.error("An error occurred while updating info");
        }
    });
    const handleImageChange = (newImage) => {
        // Create a new array including the existing images and the new one
        setImage((prevImages) => [...prevImages, newImage]);
      };
    

    let bodycontent = (
            <div className="flex flex-col gap-8">
                <Header
                    title="Upload Pic And Share it with friends"
                    subtitle="Attachments"
                />
                <ImageUpload value={image}
                    onChange={(value) => handleImageChange(value)} />
            </div>
        )
        console.log(image)


    return (
        <Modal
            body={bodycontent}
            onSubmit={onSubmit}
            disabled={isLoading}
            isOpen={Attach.isOpen}
            title="Attachments"
            onClose={Attach.onClose}
            actionLabel="Attach up to 10 Images"
        />
    );
};

export default AttachModal;