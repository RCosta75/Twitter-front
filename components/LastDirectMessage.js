import React from 'react';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import DmUser from './DmUser';

function LastDirectMessage() {

    const [dmData, setDmData] = useState([])

    const router = useRouter();

    const user = useSelector((state) => state.user.value);
    const tweetRex = useSelector((state) => state.tweetRex.value);

    useEffect(() => {
        fetch(`https://twitter-back-gamma.vercel.app/users/getdm/${user.id}`)
          .then((response) => response.json())
          .then((data) => {
            // useState pour contenir les tweet recuper (objet)
            setDmData(data.dm.reverse())
          });
      }, [tweetRex]);


      let dm = dmData.map((e, i) => {
        return (
            <DmUser
            key={i}
            {...e}
            />
        )})

    return (
        <div className='mx-10 overflow-auto thin-scrollbar my-4'>
            {dm}
        </div>
    );
}

export default LastDirectMessage;