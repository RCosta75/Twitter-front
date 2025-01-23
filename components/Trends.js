import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import {useRouter} from 'next/router';
import { displayHashtag, displaySearch } from "../reducers/trend";
import { useDispatch } from "react-redux";
import { updateTweet } from "../reducers/tweetRex";


function Trends() {
  const tweetRex = useSelector((state) => state.tweetRex.value);
  const [hashtagsTweets, setHashtagsTweets] = useState([]);
  const [hashtagsComments, setHashtagsComments] = useState([])

  const dispatch = useDispatch()
  // change de page en react
  const router = useRouter();


  const reduxSearch = useSelector((state) => state.trend.search);
  const hash = useSelector((state) => state.trend.value);

// affichage des hashtags
  useEffect(() => {
    fetch("https://twitter-back-gamma.vercel.app/hashtags/display")
      .then((response) => response.json())
      .then((data) => {
        setHashtagsComments(data.hashtag)
      });
  }, [tweetRex]);

  // onClick sur hashtag direction page hashtag
  const goToHashtag = (hashtag) => {
    dispatch(displayHashtag(hashtag))
    dispatch(updateTweet())
    router.push("/hashtags");
  }

  const handleSearch = () => {
    router.push("/search")
  }

  let hashtags = hashtagsComments.sort((a,b) => {
    let countA = a.tweet.length + a.comments.length;
    let countB = b.tweet.length + b.comments.length;
    return countB - countA})

    // A COMPRENDRE !!!!!!!!!!!!!!
    const uniqueHashtags = Array.from(new Map(hashtags.map(item => [item.hashtag, item])).values()).splice(0,3)

  let tendance = uniqueHashtags.map((e, i) => {
    // si le hashtag n'a pas de [id_tweet] renvoi rien si oui ...
    if(e.tweet.length < 1 && e.comments.length < 1 ){
      return (
        <div></div>
      )
    } else {
      if(hash === e.hashtag && router.pathname === "/hashtags"){
        return (
          <div className="flex flex-col p-6 font-semibold" key={i}>
            <span className="cursor-pointer text-blue-500" onClick={() => goToHashtag(e.hashtag)} >{e.hashtag}</span>
            <span className="pt-2 text-gray-500">{e.tweet.length + e.comments.length} Tweets</span>
          </div>
          )
      } else {
        return (
          <div className="flex flex-col p-6 font-semibold" key={i}>
              <span className="cursor-pointer" onClick={() => goToHashtag(e.hashtag)} >{e.hashtag}</span>
              <span className="pt-2 text-gray-500">{e.tweet.length + e.comments.length} Tweets</span>
          </div>
      )
      }
    }
});
  

  return (
    <div>
      <div className="flex flex-col bg-[#151d27] h-screen p-10 items-start border-l-4 border-[#0E141B] justify-start pl-5 text-gray-200">

      <input
          className="font-inherit w-full bg-gray-600 border-2 focus:border-2 focus:border-gray-50 border-[#243042] outline-0 text-gray-50 mb-6 py-2 px-5 bg-transparent rounded-3xl text-base "
        onChange={(e) => dispatch(displaySearch(e.target.value))}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search Twitter"
        value={reduxSearch}
        ></input>
        <h2 className="text-2xl font-bold pb-5 cursor-pointer" onClick={()=> router.push("/hashtags")}>Trends</h2>
            <div className="bg-[#1b232c] h-1/2 w-4/5 rounded-lg no-scrollbar">
               {tendance}
            </div>
      </div>
    </div>
  );
}

export default Trends;
