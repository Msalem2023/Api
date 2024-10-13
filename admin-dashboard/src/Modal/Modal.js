"use client"
import { useCallback, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import Button from "../Components/Button"

const Modal= ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    disabled,
    actionLabel,
    secondaryAction,
    SecondaryLabel

}) => {
    const [showModal, setShowModal] = useState(isOpen)
    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])
    const handelClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false)
        setTimeout(() => {
            onClose()
        }, 300)

    }, [disabled, onClose])
    const handelSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit()
    }, [disabled, onSubmit])
    const handelSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction()

    }, [disabled, secondaryAction])
    if (!isOpen) {
        return null
    }
    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
            <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-6 my-auto h-full lg:h-auto md:h-auto">
                <div className={`translate duration-500 h-full ${showModal? "translate-y-0":"translate-y-full"} ${showModal?"opacity-100":"opacity-0"}`}>
                    <div className="relative flex flex-col w-full h-full shadow-lg rounded-lg outline-none focus:outline-none bg-white border-0 lg:h-auto md:h-auto">
                        <div className="flex justify-center items-center p-6 border-b-[1px] rounded-t relative">
                            <button onClick={handelClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                                <IoMdClose size={18}/>

                            </button>
                            <div className="text-lg font-semibold">
                                {title}
                            </div>
                        </div>
                        <div className="relative p-6 flex-auto">
                            {body}
                        </div>
                        <div className="p-6 flex flex-col gap-2">
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Button  onClick={onSubmit}  label={actionLabel}/>
                                {secondaryAction&&<Button  onClick={secondaryAction}  label={SecondaryLabel}/>}

                            </div>
                            {footer}
                             
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Modal