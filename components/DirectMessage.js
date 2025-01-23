import React from 'react';
import {useSelector} from "react-redux";
import { useRouter } from 'next/router';

function DirectMessage(props) {


    const user = useSelector((state) => state.user.value);


  return (
    <div className="h-1/6 bg-[#151d27] flex flex-col border-b-4 pl-10 items-start border-[#0E141B] justify-center">
        <h2 className="text-gray-200 text-3xl font-bold ">Messages</h2>
        <div className="flex flex-row justify-between w-full">
            <p className="text-gray-600">@{user.username}</p>
        </div>

    </div>
  );
}

export default DirectMessage;