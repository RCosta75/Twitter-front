import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tweet from "./Tweet";
import { displaySearch } from "../reducers/trend";
import { useDispatch } from "react-redux";
import Follow from "./Follow";

function LastSearch() {
  const [tweetData, setTweetData] = useState([]);
  const [followData, setFollowData] = useState([]);

  // useState pour contenir les tweet (tableau objet)

  const reduxSearch = useSelector((state) => state.trend.search);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const tweetRex = useSelector((state) => state.tweetRex.value);



  if(reduxSearch[0] !== "@"){
    useEffect(() => {
      fetch(`https://twitter-back-gamma.vercel.app/tweets/get/${reduxSearch}`)
        .then((response) => response.json())
        .then((data) => {
          // useState pour contenir les tweet recuper (objet)
          setTweetData(data.data)
          setFollowData(null);
        });
    }, [tweetRex,reduxSearch]);
  }  else {
    useEffect(() => {
      fetch(`https://twitter-back-gamma.vercel.app/users/getSearch/${reduxSearch.slice(1)}`)
        .then((response) => response.json())
        .then((data) => {
          // useState pour contenir les tweet recuper (objet)
          setTweetData(null);
          setFollowData(data.user);
          
        });
    }, [tweetRex,reduxSearch]);
  }
  
  const userData = followData?.map((data, i) => {
    let followId = data.followers.map((e => e._id ))
    if (data.username) {
      return (
        <Follow
          key={i}
          firstname={data.firstname}
          username={data.username}
          profil={data.profil}
          followers={followId}
          following={data.following}
          isFollow={data.followers?.some((e) => e._id === user.id)}
          id={data._id}
        />
      );
    }
  });

  // iteration tableau tweetData pour affichage tweet
  const tweet = tweetData?.map((data, i) => {
    if (data.author) {
      return (
        <Tweet
          key={i}
          firstname={data.author.firstname}
          username={data.author.username}
          picture={data.author.profil}
          date={data.date}
          message={data.message}
          comments={data.comments}
          likes={data.likes}
          isLike={data.likes?.some((e) => e._id === user.id)}
          // props pour gerer le like
          retweet={data.retweet}
          isRetweet={data.retweet?.some((e) => e._id === user.id)}
          // props pour gerer le retweet
          bookmarks={data.bookmarks}
          isBookmark={data.bookmarks?.some((e) => e === user.id)}
          // props pour gerer les bookmarks
          _id={data._id}
        />
      );
    }
  });

  return (
    <div className="h-2/3">
      <div className="h-1/4 mb-4 bg-[#151d27]">
        <h2 className="text-gray-200 m-0 pl-6 text-3xl font-bold justify-start">
          Search
        </h2>
        <div className="flex justify-center">
          <input
            className="f0ont-inherit w-4/5 border-2 outline-0 border-gray-500 focus:border-gray-50 text-white mt-4 p-3 bg-transparent rounded-xl text-base "
            onChange={(e) => dispatch(displaySearch(e.target.value))}
            value={reduxSearch}
          ></input>
        </div>
      </div>
      <div className=" max-h-full h-full w-full bg-[#151d27] border-t-8  border-[#0E141B] thin-scrollbar">
        {tweetData ? tweet : 
          <div className="w-full p-10 h-full flex flex-col self-center" >
            {userData}
          </div>
        }
      </div>
    </div>
  );
}

export default LastSearch;
