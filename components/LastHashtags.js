import Tweet from "./Tweet";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { displayHashtag } from "../reducers/trend";
import { updateTweet } from "../reducers/tweetRex";
import { useRouter } from "next/router";


function LastHashtag() {
  const [tweetData, setTweetData] = useState([]);
  const [commentData, setCommentData] = useState([])
  // useState pour contenir les tweet (tableau objet)
  const tweetRex = useSelector((state) => state.tweetRex.value);
  const user = useSelector((state) => state.user.value);
  const hash = useSelector((state) => state.trend.value);
  // reducer pour recuperer la value onClick du hashtag

  const dispatch = useDispatch()
  const router = useRouter()
  
  const [hashtags, setHashtags] = useState([]);

  // affichage des hashtags
  useEffect(() => {
    fetch("http://localhost:3000/hashtags/display")
      .then((response) => response.json())
      .then((data) => {
        setHashtags(data.hashtag.sort((a,b) => b.tweet.length - a.tweet.length));
      });
  }, [tweetRex]);

  useEffect(() => {
    // encodeURI pour gerer caractere speciaux ici #
    // cherche selon valeur du reducer
    fetch(
      `http://localhost:3000/hashtags/get/${encodeURIComponent(
        hash
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        // useState pour contenir les tweet recuper (objet) dans collection hashtag
        setTweetData(data.hashtag?.tweet.reverse());
        setCommentData(data.hashtag?.comments.reverse())
      });
    // re-render a chaque changement du reducer hashtag
  }, [hash, tweetRex]);


  let commentAndTweet = null

  // Assemblage des commentaire et des tweets
  if(tweetData && commentData){
    commentAndTweet = tweetData.concat(commentData)
  }

 let tweetSorted = commentAndTweet?.sort((a, b) => {
    const dateA = a.date.includes('T') ? a.date : a.date.split(' ').reverse().join(' ');
    const dateB = b.date.includes('T') ? b.date : b.date.split(' ').reverse().join(' ');
    return dateA.localeCompare(dateB);
  }).reverse()
  // supp #_tweet et tweet onClick sur poubelle
  const tweet = tweetSorted?.map((data, i) => {
    return (
      <Tweet
        key={i}
        firstname={data.author.firstname}
        username={data.author.username}
        date={data.date}
        picture={data.author.profil}
        message={data.message}
        comments={data.comments}
        likes={data.likes}
        _id={data._id}
        isLike={data.likes.some((e) => e._id === user.id)}
        // props pour gerer le like
        retweet={data.retweet}
        isRetweet={data.retweet.some((e) => e._id === user.id)}
        // props pour gerer le retweet
        bookmarks={data.bookmarks}
        isBookmark={data.bookmarks.some((e) => e === user.id)}
        // props pour gerer les bookmarks
        replyTo={data.replyTo}
      />
    );
  });

      const goToHashtag = (hashtag) => {
        dispatch(displayHashtag(hashtag))
        dispatch(updateTweet())
      }


  let tendance = hashtags.map((e, i) => {
    // si le hashtag n'a pas de [id_tweet] renvoi rien si oui ...
    if(e.tweet.length < 1 ){
      return (
        <div></div>
      )
    } else {
        return (
          <div className="flex justify-between border-2 h-1/6 border-gray-500 m-4 rounded-xl  items-center flex-row w-full text-gray-50 p-6 font-semibold" key={i}>
              <span className="cursor-pointer text-lg" onClick={() => goToHashtag(e.hashtag)} >{e.hashtag}</span>
              <span className=" text-gray-500 cursor-pointer" onClick={() => goToHashtag(e.hashtag)}>{e.tweet.length} Tweets</span>
          </div>
      )}
})

  return (
    <div className=" h-4/5 bg-[#151d27] border-b-4 border-[#0E141B] scrollbar-none pt-5">
      
      {hash.length > 1 ?  (
        <div className="flex h-full flex-col overflow-auto thin-scrollbar bg-[#1b232c] mx-5 mb-5 ">
        {tweet}
        </div>
      ) :  (
        <div className="flex h-full flex-wrap overflow-auto thin-scrollbar bg-[#1b232c] mx-10 -my-2 border-4 border-[#1D2735]  rounded-xl">
        {tendance}
        </div>
      )}


    </div>
  );
}

export default LastHashtag;
