import React, { useEffect, useRef, useState } from 'react';
import { BiPhoneOff, BiVideo, BiVideoOff } from 'react-icons/bi';
import io from 'socket.io-client';
import Peer from 'simple-peer';
const socket = io('http://localhost:5000'); // Adjust port as necessary


const VideoCall = ({ data, chat }) => {
  const [incoming, setIncoming] = useState(false);
  const [calling, setCalling] = useState(false);
  const [stream, setStream] = useState();
  const [caller, setCaller] = useState();

  const [signal, setSignal] = useState();
  // const [me, setMe] = useState();
  const [name, setName] = useState();
  const [userToCall, setUserToCall] = useState();
  const [callEnded, setCallEnded] = useState(false);


  const [callAccepted, setCallAccepted] = useState(false);
  const [peer, setPeer] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const connectionRef = useRef()
  const me = JSON.stringify(data?.Chat?.Receiver?._id) === JSON.stringify(chat)
    ? data?.Chat?.Sender?.socketId
    : data?.Chat?.Receiver?.socketId

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream)
      localVideoRef.current.srcObject = stream;
    })

    socket.emit("updateSockets", { token: sessionStorage.getItem("token") });

    // socket.on('me', (id)=>{
    //   setMe(id)
    // });

    socket.on("callUser", (data) => {
      setIncoming(true)
      setCaller(data.from)
      setName(data.name)
      setSignal(data.signal)
    })
  }, [])

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream

    })
    peer.on("signal", (data) => {
      console.log("me", me)
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name
      })
    })

    peer.on("stream", (remoteStream) => {

      remoteVideoRef.current.srcObject = remoteStream;
    })
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })
    connectionRef.current = peer
  }

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream

    })
    peer.on("signal", (data) => {


      socket.emit("answerCall", { signal: data, to: caller })
    })

    peer.on("stream", (remoteStream) => {
      console.log(remoteStream.getTracks());

      console.log("Remote stream received:", remoteStream);
      console.log(remoteVideoRef.current)
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    })
    if (signal) {
      console.log("Incoming signal received:", signal);
      peer.signal(signal); // Use the incoming signal
      connectionRef.current = peer
    }

  }
  const leave = () => {
    setCallEnded(true)
    connectionRef.current.destroy()
  }
  console.log(me)


  return (
    <>
      <p>{me}</p>
      {/* <input onChange={(e)=>setUserToCall(e.target.value)} /> */}
      <BiVideo onClick={() => callUser(JSON.stringify(data?.Chat?.Receiver?._id) === JSON.stringify(chat)
        ? data?.Chat?.Receiver?.socketId
        : data?.Chat?.Sender?.socketId)} size={26} className="text-red-500" />
      {calling && <div id="marketing-banner" tabindex="-1" class="fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600">
        <div class="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
          <a href="https://flowbite.com/" class="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600">
            <BiVideo size={26} className="text-red-500" />
            <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Call Initiated</span>
          </a>
          <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">We are trying to connect you...</p>
        </div>
        <div class="flex items-center flex-shrink-0">
          <a onClick={answerCall} href="#" class="px-5 py-2 me-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cancel</a>
          <button data-dismiss-target="#marketing-banner" type="button" class="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close banner</span>
          </button>
        </div>
      </div>}
      {incoming && <div id="marketing-banner" tabindex="-1" class="fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600">
        <div class="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
          <a href="https://flowbite.com/" class="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600">
            <BiVideo size={26} className="text-red-500" />
            <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">New Call</span>
          </a>
          <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Incoming call from {name}</p>
        </div>
        <div class="flex items-center flex-shrink-0">
          <a onClick={answerCall} href="#" class="px-5 py-2 me-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Answer Call</a>
          <button data-dismiss-target="#marketing-banner" type="button" class="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close banner</span>
          </button>
        </div>
      </div>
      }
      <div className="flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <video
            ref={localVideoRef}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg shadow-lg"
            autoPlay
            muted
          />
          <video
            ref={remoteVideoRef}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg shadow-lg"
            autoPlay
          />
        </div>

        <div className="flex space-x-4">
          <button
            // onClick={muteSelf}
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            <BiVideoOff size={20} className="mr-2" />
            Mute
          </button>

          <button
            // onClick={hangUp}
            className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            <BiPhoneOff size={20} className="mr-2" />
            Hang Up
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoCall;
