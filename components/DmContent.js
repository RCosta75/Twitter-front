import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function DmContent(props) {

    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        if(props.authorId !== user.id){
            fetch(`https://twitter-back-gamma.vercel.app/messages/read/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: props.messageId,
                })
              }).then((response) => response.json())
        }
    }, [props.authorId, user.id]);

    return (

        
       <div>


        {props.authorId !== user.id ? 
            <div className='p-2 mx-8 mt-2 max-w-3/5 justify-self-start'>
                <p className='justify-self-start p-2 bg-gray-500 rounded-xl whitespace-pre-wrap text-gray-50 font-medium'>{props.content}</p>
                <p className='text-gray-500'>{props.date.replace(/-/ig, '/').replace('T', ' ').slice(5, 16)}</p>
            </div>
        :
        <div className='p-2 mx-8 mt-2 max-w-3/5 justify-self-end'>
            <p className='bg-[#018FF4] p-2 rounded-xl justify-self-end whitespace-pre-wrap text-gray-50 font-medium'>{props.content}</p>
            <p className='justify-self-end text-gray-500'>{props.date.replace(/-/ig, '/').replace('T', ' ').slice(5, 16)}</p>
        </div>
        }

       </div>
    );
}

export default DmContent;