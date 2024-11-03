import axios from "axios";
//Icons
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
//React Hooks
import { useState, useCallback } from "react";

//Form
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";

//Custom Hook

//Custom Components

//Next Auth

//Toast
import { toast } from "react-hot-toast";
import useRegisterModal from "../Hooks/useRegister";
import useLoginModal from "../Hooks/useLogIn";
import Header from "../Components/Header";
import Input from "../Components/Input";
import Button from "../Components/Button";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

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
  const onSubmit = (data) => {
    setIsLoading(true);

    axios.post("http://localhost:5000/user/signup", data)
      .then((res) => {
        console.log(res)
        toast.success("Success!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Something Went Wrong!");
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Toggle Login Signup
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Header title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="userName" label="userName" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
      <Input id="cPassword" label="confirm your Password" type="password" disabled={isLoading} register={register} errors={errors} required />

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
          <div>Already have an account?</div>
          <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
            Login
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;