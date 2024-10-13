
"use client";

// import axios from "axios";

//Router
//Icons
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
//React Hooks
import { useCallback, useState } from "react";

//Form
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";

//Custom Hook

//Custom Components

//Toast
import { toast } from "react-hot-toast";

//Next Auth
// import { signIn } from "next-auth/react";
import Header from "../Components/Header";
import Input from "../Components/Input";
import useRegisterModal from "../Hooks/useRegister";
import useLoginModal from "../Hooks/useLogIn";
import Button from "../Components/Button";
import { useAuth } from "../Hooks/useCurrentUser";
import axios from "axios";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {login}=useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Submit Handler
  const onSubmit = useCallback(async (data) => {
    try {
        setIsLoading(true)
         await axios.post("http://localhost:5000/user/signin",
           data, {
            headers: {
                'content-type': 'application/json',
            }
        }).then(response=>{
            console.log(response)
             login(response.data)
        })
        loginModal.onClose()
        
    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        setIsLoading(false)
        toast.success("Welcome Back")
    }

}, [login,loginModal])

  //Toggle Login Signup
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Header title="Welcome back" subtitle="Login to your account!" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />

      <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        icon={FcGoogle}
        label="Continue With Google"
        onClick={() => {
        //   signIn("google");
        }}
      />
      <Button
        outline
        icon={AiFillGithub}
        label="Continue With Github"
        onClick={() => {
        //   signIn("github");
        }}
      />
      <div className="text-neutral-500 font-light mt-4">
        <div className="flex justify-center gap-2">
          <div>First time using Airbnb?</div>
          <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;