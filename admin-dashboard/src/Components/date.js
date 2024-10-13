import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Datepicker } from 'flowbite'; // Ensure this is the correct import
import 'flowbite/dist/flowbite.css';
import { motion } from 'framer-motion';
import Add from './Add';
import Location from './location';
import Projects from './Projects';
import Header from './Header';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import { CreateMeeting } from './http';
import { client } from '..';
import toast from 'react-hot-toast';

const STEPS = {
    Category: 0,
    Location: 1,
    Info: 2,
    Images: 3,
    Description: 4,
    Price: 5,
};

const Picker = ({ Attendees }) => {
    const startDateRef = useRef();
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [participants, setParticipants] = useState([]);
    const [project, setProject] = useState([]);
    const [office, setOffice] = useState([]);
    const [step, setStep] = useState(STEPS.Category);
    const times = [
        "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
        "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
    ];

    const onBack = () => setStep((value) => value - 1);
    const onNext = () => setStep((value) => value + 1);

    const actionLabel = useMemo(() => (step === STEPS.Price ? "Create" : "Next"), [step]);
    const secondaryActionLabel = useMemo(() => (step === STEPS.Category ? null : "Back"), [step]);

    const handleTimeChange = (time) => setSelectedTime(time);

    const formattedDate = useMemo(() => {
        const dateValue = startDateRef.current?.datepicker?.dates[0];
    
        if (dateValue) {
          const date = new Date(dateValue);
          if (!isNaN(date.getTime())) { // Check if the date is valid
            setStartDate(new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              }).format(date))
             ;
          } else {
            console.error('Invalid date:', dateValue);
            return '';
          }
        }
        
        return ''; // Return an empty string if no valid date is found
      }, [startDateRef.current?.datepicker?.dates[0]]);
    
    useEffect(() => {
        const startDatepicker = new Datepicker(startDateRef.current, {
            autohide: false,
            format: 'M d y',
            buttons: true,
        });

        return () => {
            startDatepicker.destroy();
        };
    }, []);

    const filteredAttendees = Attendees?.Team?.filter(attendee =>
        participants.includes(attendee.userName)
    ) || [];

    const renderBodyContent = () => {
        switch (step) {
            case STEPS.Location:
                return (
                    <div className="flex flex-col gap-8">
                        <ul className="grid w-full grid-cols-2 gap-2 mt-2">
                            {times.map((time, index) => (
                                <li key={index}>
                                    <input
                                        type="radio"
                                        id={`time-${index}`}
                                        value={time}
                                        className="hidden peer"
                                        name="timetable"
                                        onChange={() => handleTimeChange(time)}
                                        checked={selectedTime === time}
                                    />
                                    <label
                                        htmlFor={`time-${index}`}
                                        className="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white hover:bg-blue-500 transition-colors duration-200"
                                    >
                                        {time}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case STEPS.Info:
                return (
                    <div className="flex flex-col gap-8">
                        <Header title="Share the office where the meeting will be held in" subtitle="Office Location?" />
                        <Location handelProject={setOffice} />
                    </div>
                );

            case STEPS.Images:
                return (
                    <div className="flex flex-col gap-8">
                        <Header title="Add The participants of the meeting" subtitle="who will join?" />
                        <Add getParticipants={setParticipants} Participants={Attendees?.Team?.map(e => e.userName)} />
                    </div>
                );

            case STEPS.Description:
                return (
                    <div className="flex flex-col gap-8">
                        <Header title="select the project in hand?" subtitle="Which Project" />
                        <Projects handelProject={setProject} />
                    </div>
                );

            case STEPS.Price:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-white rounded-lg shadow-md">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900 text-base font-medium">
                                {new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(startDate)) || 'Select Date'}
                            </span>
                        </div>

                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                            </svg>
                            {office[0] || 'Select Office'}
                        </div>

                        <div className="col-span-1 md:col-span-2 mx-auto">
                            <div className="flex -space-x-4 rtl:space-x-reverse">
                                {filteredAttendees.map(attendee => (
                                    <motion.img
                                        key={attendee.id}
                                        src={attendee.image}
                                        alt={attendee.name}
                                        className="w-10 h-10 border border-white rounded-full dark:border-gray-800 max-w-full"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">Duration</div>
                            <span className="text-gray-900 text-base font-medium block">{selectedTime || 'Select Time'}</span>
                        </div>

                        <div className="flex flex-col">
                            <div className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">Project</div>
                            <span className="text-gray-900 text-base font-medium block">{project[0] || 'Select Project'}</span>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                            <div ref={startDateRef} className="datepicker mx-auto mb-4 sm:mb-0 flex-1 min-w-[150px]" />
                        </div>
                    </div>
                );
        }
    };

    const { mutate } = useMutation({
        mutationFn: CreateMeeting,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Voice"] });
            toast.success("Meeting Created!");
            setStartDate(new Date());
            setSelectedTime('');
            setOffice([]);
            setParticipants([]);
            setProject([]);
        },
        onError: () => {
            toast.error("Oops! Meeting couldn't be created");
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (step !== STEPS.Price) {
            return onNext();
        }
        mutate({ startDate, office, project, selectedTime, participants });
    };

    return (
        <div className="relative p-6 bg-gray-50 rounded-lg shadow-lg">
            {renderBodyContent()}
            <div className="p-4 flex flex-col gap-2">
                <div className="flex flex-row items-center gap-4 w-full">
                    <Button onClick={onSubmit} label={actionLabel} />
                    {step !== STEPS.Category && <Button onClick={onBack} label={secondaryActionLabel} />}
                </div>
            </div>
        </div>
    );
};

export default Picker;

