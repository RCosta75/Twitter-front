import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function DmUser(props) {

    const router = useRouter();

    const [content,setContent] = useState('')


    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        fetch(`https://twitter-back-gamma.vercel.app/messages/getOne/${user.id}/${props._id}`)
          .then((response) => response.json())
          .then((data) => {
            setContent(data)
          });
      }, []);



          const goToDmPage = (watchId , username , firstname, profil) => {
            router.push({
                pathname: "/dm",
                query: {
                  firstname : firstname,
                  username: username,
                  id: watchId,
                  profil: profil
                },
              });
          }

  return (
    <div className="border-2 cursor-pointer flex flex-row border-[#243042] bg-[#0E141B] justify-center items-center"
    onClick={() => goToDmPage(props._id, props.username, props.firstname, props.profil)}>
        <img
          src={props.profil ? `${props.profil}` : "oeuf.png"}
          className="rounded-full border-4 border-[#1D2735] m-2 h-20 w-24"
        />

      <div className="flex flex-col items-start justify-around w-full">

        <div className="flex flex-row px-2 w-full h-1/2 items-center ">
          <p className="text-gray-50 text-2xl whitespace-nowrap font-bold w-auto">{props.firstname} </p>
          <p className="text-gray-600 pl-4 font-normal whitespace-nowrap text-xl">@{props.username}</p>
          <div className="flex justify-end w-full">
          {content.read || content.author !== user.id && <svg className="flex justify-self-end " width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#018FF4"></path> </g></svg>}
          </div>
        </div>

            {content.read || content.author === user.id ? 
            <div className="p-2 h-1/2">
              <p className="text-gray-600 text-lg">{content.content}</p>
            </div>
            :
            <div className="p-2 h-1/2 pb-4">
              <p className="text-gray-50 font-semibold text-lg">{content.content}</p>
            </div>
            }

      </div>
    </div>
  );
}

export default DmUser;
