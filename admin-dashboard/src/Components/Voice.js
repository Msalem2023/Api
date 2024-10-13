import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Voice } from './http';
import { client } from '..';
import toast from 'react-hot-toast';
import { Context } from '../Hooks/useChat';
import { FaMicrophone } from 'react-icons/fa';
import { BsFillSendArrowUpFill, BsRecordCircle } from 'react-icons/bs';

const VoiceNote = ({ ChatId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Unable to access microphone");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const { mutate } = useMutation({
    mutationFn: Voice,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Message"] });
      toast.success("Voice Sent");
      setAudioBlob(null); // Reset audioBlob after sending
    },
    onError: () => {
      toast.error("An error occurred while sending voice note");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (audioBlob) {
      const formData = new FormData();
      formData.append('file', audioBlob, 'voice-note.wav');
      formData.append('ChatId', ChatId);

      console.log(...formData); // Debugging FormData contents
      mutate(formData);
    }
  };

  return (
    <div className=" text-white">
      <form onSubmit={handleSubmit} className="">
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className="flex items-center"
        >
          
          {isRecording ? <BsRecordCircle color='red' size={24} /> : <FaMicrophone size={24} color='black' className={`${audioBlob&&"hidden"}`} />}
        </button>
        {audioBlob && (
          <button
            type="submit"
            className=" text-white font-bold py-2 px-4 rounded mt-2"
          >
            <BsFillSendArrowUpFill size={24} color='blue' className='m-2' />
          </button>
        )}
      </form>
    </div>
  );
};

export default VoiceNote;