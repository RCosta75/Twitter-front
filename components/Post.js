import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateTweet} from '../reducers/tweetRex';
import {  useRouter } from "next/router";


function Post() {
  
  const dispatch = useDispatch();
  const router = useRouter()
  
  const [tweetData, setTweetData] = useState('');
  // useState pour recup message

  const user = useSelector((state) => state.user.value);

  const event = new Date()

  // creatioon tweet avec token user et useState input et route post :token
  let handleClick = () => {
    fetch(`https://twitter-back-gamma.vercel.app//tweets/post/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // message avec useState()
          message: tweetData,
          date: event.toLocaleString('fr-FR')
      }),
  })
      .then((response) => response.json())
      .then(data => {

        
        if(data.result){
          // si tweet poster reducer true/false,
          // ecoute sur le render (hook effet lastTweet.js)
          setTweetData('');
          dispatch(updateTweet());
          // reducer true or false re-render componant dans LastTweet.js
      }}) };
  
      const goToProfilePage = () => {
        dispatch(updateTweet())
        router.push({
          pathname: "/profilepage",
          query: {
            username : user.username,
          },
        })
      }
  
  const length = tweetData.length
  
  return (
    <div className=" h-1/3 bg-[#151d27] items-center border-[#0E141B]">
      
      <h2 className="text-gray-200 -mt-2 pl-6 pb-2 text-3xl font-bold justify-start  border-[#0E141B]">Home</h2>
      
      <div className="flex justify-center border-t-4 pt-4 border-[#0E141B] items-center gap-4 pl-5 ">
      <img
          onClick={() => goToProfilePage()}
          src={user.profil ? `/${user.profil}` : "/oeuf.png"}
          className="rounded-full cursor-pointer  w-24 border-[#0E141B] border-4 h-20"
        />
        <textarea
          className="font-inherit no-scrollbar resize-none mt-2 mb-2 p-2 h-24 focus:border-gray-50  w-4/5 text-lg border-2 rounded-md border-[#243042] outline-0 text-white bg-transparent transition-all duration-200"
          maxLength={280}
          type="text"
          placeholder="What is happening?"
          onChange={(e) => setTweetData(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? handleClick() : null}
          value={tweetData}
        ></textarea>

      
        <div className="flex flex-col items-center pr-5  pb-5 gap-5">
          <span className="text-gray-500">{length}/280</span>
          <button 
          className="bg-[#2B3A4F] border-[#0E141B] text-gray-200 border-2 text-base rounded-[24px] px-3 py-2.5 text-medium font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:shadow-xl flex items-center"
          onClick={() => handleClick()}>Tweet</button>
        </div>

       

      </div>

      <div className="flex pl-36 items-center justify-start align-middle text-center gap-4">
        <svg className=" cursor-pointer" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="#018FF4"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM5 4C4.44772 4 4 4.44772 4 5V17.5857L9.29285 12.2928C9.68337 11.9023 10.3165 11.9023 10.7071 12.2928L12.5 14.0857L20 6.58569V5C20 4.44772 19.5523 4 19 4H5ZM20 9.41412L13.2071 16.2071C12.8165 16.5976 12.1834 16.5976 11.7928 16.2071L9.99995 14.4142L4.5308 19.8833C4.67072 19.9578 4.83043 20 5 20H19C19.5523 20 20 19.5523 20 19V9.41412Z" fill="#018FF4"></path> </g></svg>
        <svg className=" cursor-pointer"  width="40px" height="35px" viewBox="0 0 24 24" version="1.1"  fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>ic_fluent_gif_24_regular</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_gif_24_regular" fill="#018FF4" fill-rule="nonzero"> <path d="M18.75,3.50054297 C20.5449254,3.50054297 22,4.95561754 22,6.75054297 L22,17.2531195 C22,19.048045 20.5449254,20.5031195 18.75,20.5031195 L5.25,20.5031195 C3.45507456,20.5031195 2,19.048045 2,17.2531195 L2,6.75054297 C2,4.95561754 3.45507456,3.50054297 5.25,3.50054297 L18.75,3.50054297 Z M18.75,5.00054297 L5.25,5.00054297 C4.28350169,5.00054297 3.5,5.78404466 3.5,6.75054297 L3.5,17.2531195 C3.5,18.2196178 4.28350169,19.0031195 5.25,19.0031195 L18.75,19.0031195 C19.7164983,19.0031195 20.5,18.2196178 20.5,17.2531195 L20.5,6.75054297 C20.5,5.78404466 19.7164983,5.00054297 18.75,5.00054297 Z M8.01459972,8.87193666 C8.61149825,8.87193666 9.03352891,8.95326234 9.51677386,9.18532686 C9.82793289,9.33475204 9.95904407,9.70812933 9.80961888,10.0192884 C9.6601937,10.3304474 9.28681641,10.4615586 8.97565738,10.3121334 C8.67582824,10.1681491 8.43601415,10.1219367 8.01459972,10.1219367 C7.14788947,10.1219367 6.51103525,10.9182985 6.51103525,11.9943017 C6.51103525,13.0713011 7.14873038,13.8702789 8.01459972,13.8702789 C8.44322427,13.8702789 8.80607251,13.6904125 8.99484486,13.3695045 L9.001,13.354543 L9.001,12.620543 L8.62521827,12.6211937 C8.31142012,12.6211937 8.05163513,12.3899359 8.00699487,12.0885517 L8.00021827,11.9961937 C8.00021827,11.6823956 8.23147615,11.4226106 8.53286035,11.3779703 L8.62521827,11.3711937 L9.62682145,11.3711937 C9.94061961,11.3711937 10.2004046,11.6024516 10.2450448,11.9038358 L10.2518215,11.9961937 L10.2504852,13.5438774 L10.2504852,13.5438774 L10.2441303,13.5991827 L10.2441303,13.5991827 L10.2229651,13.6890602 L10.2229651,13.6890602 L10.2024697,13.7442077 C9.82606539,14.6343365 8.96156448,15.1202789 8.01459972,15.1202789 C6.38857781,15.1202789 5.26103525,13.707564 5.26103525,11.9943017 C5.26103525,10.2816525 6.38839145,8.87193666 8.01459972,8.87193666 Z M12.6289445,8.99393497 C12.9427427,8.99393497 13.2025276,9.22519285 13.2471679,9.52657705 L13.2539445,9.61893497 L13.2539445,14.381065 C13.2539445,14.726243 12.9741225,15.006065 12.6289445,15.006065 C12.3151463,15.006065 12.0553614,14.7748072 12.0107211,14.4734229 L12.0039445,14.381065 L12.0039445,9.61893497 C12.0039445,9.273757 12.2837665,8.99393497 12.6289445,8.99393497 Z M15.6247564,8.99393489 L17.6221579,9.00083497 C17.9673338,9.00202673 18.246188,9.28281321 18.2450039,9.62798912 C18.2439132,9.94178541 18.0117595,10.2007704 17.7102229,10.2443727 L17.6178421,10.2508313 L16.247,10.245543 L16.247,11.999543 L17.37,12.0004012 C17.6837982,12.0004012 17.9435831,12.2316591 17.9882234,12.5330433 L17.995,12.6254012 C17.995,12.9391993 17.7637421,13.1989843 17.4623579,13.2436246 L17.37,13.2504012 L16.247,13.249543 L16.2475985,14.3649711 C16.2475985,14.6787693 16.0163406,14.9385543 15.7149564,14.9831945 L15.6225985,14.9899711 C15.3088003,14.9899711 15.0490154,14.7587133 15.0043751,14.4573291 L14.9975984,14.3649711 L14.9975984,9.61677709 C14.9986853,9.30298081 15.230839,9.04399582 15.5323756,9.00039353 L15.6247564,8.99393489 Z" id="🎨-Color"> </path> </g> </g> </g></svg>
        <svg className=" cursor-pointer"  fill="#018FF4" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24,23h44c2.2,0,4,1.8,4,4v4c0,2.2-1.8,4-4,4H24c-2.2,0-4-1.8-4-4v-4C20,24.8,21.8,23,24,23z"></path> <path d="M24,41h25c2.2,0,4,1.8,4,4v4c0,2.2-1.8,4-4,4H24c-2.2,0-4-1.8-4-4v-4C20,42.8,21.8,41,24,41z"></path> <path d="M65.9,52c7.7,0,14,6.3,14,14s-6.3,14-14,14s-14-6.3-14-14S58.2,52,65.9,52z M73.8,62.9c0.3-0.3,0.3-1,0-1.3 l-1.4-1.3c-0.4-0.4-1-0.4-1.4,0l-7.5,8.4l-3.4-3.4c-0.4-0.4-1-0.4-1.4,0l-1.4,1.3c-0.4,0.3-0.4,0.9,0,1.3l4.8,4.7 c0.4,0.4,0.9,0.6,1.4,0.6c0.6,0,1-0.2,1.4-0.6L73.8,62.9z M24,59h23.2c-0.8,2.3-1.2,4.3-1.2,6c-0.1,2.1,0.1,4.1,0.6,6H24l0,0 c-2.2,0-4-1.8-4-4v-4l0,0C20,60.8,21.8,59,24,59z"></path> </g> </g></svg>
        <svg className=" cursor-pointer"  width="30px" height="28px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#018FF4" d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"></path> <path fill="#018FF4" d="M8 13.2c-2 0-3.8-1.2-4.6-3.1l0.9-0.4c0.6 1.5 2.1 2.4 3.7 2.4s3.1-1 3.7-2.4l0.9 0.4c-0.8 2-2.6 3.1-4.6 3.1z"></path> <path fill="#018FF4" d="M7 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z"></path> <path fill="#018FF4" d="M11 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z"></path> </g></svg>
      </div> 

    </div>
  );
}

export default Post;