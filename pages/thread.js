import React from 'react';
import { useRouter } from 'next/router';
import Accueil from '../components/Accueil';
import Trends from '../components/Trends';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import ThreadTweet from '../components/ThreadTweet';
import ThreadReply from '../components/ThreadReply';





function Thread() {

    const [tweetData, setTweetData] = useState()

    const tweetRex = useSelector((state) => state.tweetRex.value);
    const user = useSelector((state) => state.user.value);

    const router = useRouter()

    const   {
        id = ""
      } = router.query;
    
      const tweetThread = {
        id
      }



      if(tweetThread.id){
        useEffect(() => {
            fetch(`https://twitter-back-gamma.vercel.app//tweets/getone/${tweetThread.id}`)
              .then((response) => response.json())
              .then((data) => {
                // useState pour contenir les tweet recuper (objet)
                setTweetData(data.data)
              });
          }, [tweetRex]);
      } else {
        router.push('feed')
      }

      let reply = tweetData?.comments?.map((e,i) => {
        return (
          <ThreadReply 
          key={i}
          tweetData={e}
          isRetweet={e?.retweet?.some((e) => e._id === user.id)}
          isBookmark={e?.bookmarks?.includes(user.id)}
          isLike={e?.likes?.some((e) => e._id === user.id)}
            />
        )
      })


    return (
        <div className="flex justify-center w-screen">
    
          <div className="w-3/12"><Accueil /></div>
    
          <div className="h-screen pt-5 w-6/12 flex flex-col items-center overflow-auto thin-scrollbar bg-[#151d27]">
            <ThreadTweet tweetData={tweetData} 
            isRetweet={tweetData?.retweet?.some((e) => e._id === user.id)}
            isBookmark={tweetData?.bookmarks?.some((e) => e === user.id)}
            isLike={tweetData?.likes?.some((e) => e._id === user.id)}/>
            {reply?.reverse()}
            
          </div>
    
          <div className="w-3/12"><Trends /></div>
    
        </div>
      );
    }


export default Thread;