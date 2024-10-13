import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import useEditModal from "../Hooks/useEdit";
import { useAuth } from "../Hooks/useCurrentUser";
import { useForm } from "react-hook-form";
import ImageUpload from "../Components/ImageUpload";
import { useMutation } from "@tanstack/react-query";
import Modal from "./Modal";
import Input from "../Components/Input";
import { Update, UpdateRole } from "../Components/http";
import { client } from "..";
import axios from "axios";
import Header from "../Components/Header";
import usePromoteModal from "../Hooks/usePromote";
import { useSearchParams } from "react-router-dom";
import { Context } from "../Hooks/useChat";

const PromoteModal = () => {
    const promote = usePromoteModal();
    // const [role, setRole] = useState("")
    const { state } = Context()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          userName: "",
          email: "",
          password: "",
          cPassword:""
        },
      });





    //Dynamically importing map based on location

    //Custom set value (dont know why)
    // eg. "category" : "Beach"

    const onSubmit = () => {
        const token = localStorage.getItem("token")
        // mutate({ role, state, token })
    };
    const { mutate, isLoading } = useMutation({
        mutationFn: UpdateRole,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Profile"] });
            toast.success("Info has been modified successfully");
            promote.onClose();
        },
        onError: () => {
            toast.error("An error occurred while updating info");
        }
    });



    let bodycontent = (
        // <div className="flex flex-col gap-8">
        // <Header
        //     title="Update your title as well as your username"
        //     subtitle="Edit"
        // />
        <form class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
            <div class="p-6 space-y-6 bg-white rounded-lg">
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>

                        <Input
                            type="text"
                            label="first-name"
                            id="first-name"
                            class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            disabled={isLoading} register={register} errors={errors} required
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <Input
                            type="text"
                            label="last-name"
                            id="last-name"
                            class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Green"
                            disabled={isLoading} register={register} errors={errors} required
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <Input
                            type="email"
                            label="email"
                            id="email"
                            class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="example@company.com"
                            disabled={isLoading} register={register} errors={errors} required
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <Input
                            type="number"
                            label="phone-number"
                            id="phone-number"
                            class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="e.g. +(12)3456 789"
                            disabled={isLoading} register={register} errors={errors} required
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                        <Input
                            type="text"
                            label="department"
                            id="department"
                            class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Development"
                            disabled={isLoading} register={register} errors={errors} required
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                        <Input
                            type="number"
                            label="company"
                            id="company"
                            class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123456"
                            disabled={isLoading} register={register} errors={errors} required
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="current-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                        <Input
                            type="password"
                            label="current-password"
                            id="current-password"
                            class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="••••••••"
                            disabled={isLoading} register={register} errors={errors} required                        />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                        <Input
                            type="password"
                            label="new-password"
                            id="new-password"
                            class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="••••••••"
                            disabled={isLoading} register={register} errors={errors} required
                        />
                    </div>
                </div>
            </div>
        </form>

    )


    return (
        <Modal
            body={bodycontent}
            onSubmit={onSubmit}
            disabled={isLoading}
            isOpen={promote.isOpen}
            title="Promote"
            onClose={promote.onClose}
            actionLabel="Edit"
        />
    );
};

export default PromoteModal;