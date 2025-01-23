import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { updateTweet } from "../reducers/tweetRex";
import DmContent from "./DmContent";

function Conv(props) {
  const user = useSelector((state) => state.user.value);
  const tweetRex = useSelector((state) => state.tweetRex.value);
  const [dmData, setDmData] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const scrollRef = useRef(null); // Référence pour le conteneur des messages

  const { username = "", firstname = "", id = "", profil = "" } = router.query;

  const dmProfile = { username , firstname, id, profil };

  const handleClick = () => {
    fetch(`http://localhost:3000/messages/add/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: user.id,
        receive: dmProfile.id,
        content: message,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setMessage("");
        dispatch(updateTweet());
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/messages/get/${user.id}/${dmProfile.id}`)
      .then((response) => response.json())
      .then((data) => {
        setDmData(data || []);
      });
  }, [tweetRex,router.query]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } 
    
  }, [dmData]); // Défiler vers le bas après chaque mise à jour des messages




  let dm = dmData?.map((e, i) => {
    return <DmContent key={i} {...e} />;
  }) 

  const goToProfilePage = () => {
    router.push({
      pathname: "/profilepage",
      query: {
        username: dmProfile.username,
        id: dmProfile._id,
      },
    });
  };

  return (
    <div className="h-full">
      <div className="flex flex-row items-center border-b-4 h-1/6 border-[#0E141B]">
        <img
          src={dmProfile.profil ? `${dmProfile.profil}` : "oeuf.png"}
          className="rounded-full border-4 cursor-pointer border-[#0E141B] m-2 h-24 w-24 "
          onClick={() => goToProfilePage()}
        />
        <p
          className="cursor-pointer text-gray-50 font-extrabold text-5xl"
          onClick={() => goToProfilePage()}
        >
          {dmProfile.firstname}
          <span
            onClick={() => goToProfilePage()}
            className="font-normal cursor-pointer text-gray-500 pl-4 text-2xl"
          >
            @{dmProfile.username}
          </span>
        </p>
      </div>
      <div
        ref={scrollRef}
        className="h-4/6 bg-[#151d27] w-full overflow-auto overscroll-y-auto thin-scrollbar"
      >
        {dm}
      </div>
      <div className="flex flex-col justify-center align-middle items-center w-full ">
        <div className="flex flex-row justify-around w-10/12 border-4  border-[#243042] focus:border-gray-50">
          <textarea
            className="font-inherit no-scrollbar h-full resize-none p-2 w-4/6 text-lg rounded-md outline-0 text-white bg-transparent transition-all duration-200"
            maxLength={280}
            type="text"
            placeholder="Post your reply"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleClick() : null)}
            value={message}
          ></textarea>
          <div className=" w-1/6 flex flex-col items-center pb-5">
            <button
              className="bg-[#2B3A4F] border-[#0E141B] text-gray-200 border-2 text-base h-1/2 mt-5 w-full rounded-3xl mr-5 text-medium font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:shadow-xl flex justify-center items-center"
              onClick={() => handleClick()}
            >
              Send
            </button>
            <p className="text-gray-400 pr-5">{message.length}/280</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conv;
