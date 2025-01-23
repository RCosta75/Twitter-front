import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileMessage from "./ProfileMessage";
import { useRouter } from "next/router";

function LastProfile(props) {
  const [tweetData, setTweetData] = useState([]);
  const [likedData, setLikedData] = useState([]);
  const [rtData, setRtData] = useState([]);
  const [replyData, setReplyData] = useState([]);


  // useState pour contenir les tweet (tableau objet)

  const currentUser = useSelector((state) => state.user.value);

  const tweetRex = useSelector((state) => state.tweetRex.value);

  const router = useRouter();

  // route dynamique pour recuperer les infos envoyer au router.push()
  const { username = "", id = "" } = router.query;

  const userProfile = {
    username,
    id,
  };

  // affichage tweet avec reducer true or false re-render a chaque tweet poster
  useEffect(() => {
    fetch(`http://localhost:3000/users/get/${userProfile.username}`)
      .then((response) => response.json())
      .then((users) => {
        console.log(users)
        setRtData(users.user?.retweets.reverse())
        setTweetData(users.user?.tweets.reverse());
        setLikedData(users.user?.liked.reverse());
        setReplyData(users.user?.comment)
      });
  }, [tweetRex, userProfile.username]);

  let allTweets = []

  console.log(replyData, 'reply')

  if(userProfile.username){
  allTweets = tweetData?.concat(rtData)
  }

  const triDate = (dateString) => {
    if (!dateString || !dateString.includes('/')) {
      return ;
    }
  
    const [day, month, yearAndTime] = dateString.split('/');
    const [year, time] = yearAndTime.split(' ');
    return new Date(`${year}-${month}-${day}T${time}`);
  };

  let sortedTweets = allTweets?.sort((a, b) => triDate(a.date) - triDate(b.date)).reverse()
   let replyAndTweets = [...rtData, ...tweetData,...replyData]

  let sortedReply = replyAndTweets?.sort((a, b) => triDate(a.date) - triDate(b.date)).reverse()
  
  const tweetAndReply = sortedReply.map((data,i) => {
    console.log(data,'data')
    if(data.replyTo){
        return (
          <div className="flex flex-row w-full justify-end items-center">
          <svg width="89px" height="89px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#243042" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M9 16h7.2l-2.6 2.6L15 20l5-5-5-5-1.4 1.4 2.6 2.6H9c-2.2 0-4-1.8-4-4s1.8-4 4-4h2V4H9c-3.3 0-6 2.7-6 6s2.7 6 6 6z"></path> </g> </g></svg>
          <div className="w-11/12 justify-center align-middle flex flex-col">
          <ProfileMessage
          key={i}
          firstname={data?.replyTo.author.firstname}
          username={data?.replyTo.author.username}
          picture={data?.replyTo.author.profil}
          date={data?.replyTo.date}
          message={data?.replyTo.message}
          comments={data?.replyTo.comments}
          replyTo={data?.replyTo.replyTo}
          likes={data?.replyTo.likes}
          isLike={data?.replyTo.likes?.some((e) => e._id === currentUser.id)}
          // props pour gerer le like
          retweet={data?.replyTo.retweet}
          isRetweet={data?.replyTo.retweet?.some((e) => e._id === currentUser.id)}
          // props pour gerer le retweet
          bookmarks={data?.replyTo.bookmarks}
          isBookmark={data?.replyTo.bookmarks?.some((e) => e === currentUser.id)}
          // props pour gerer les bookmarks
          _id={data?.replyTo._id}/>
    <ProfileMessage
          key={i}
          firstname={data?.author.firstname}
          username={data?.author.username}
          picture={data?.author.profil}
          date={data?.date}
          message={data?.message}
          comments={data?.comments}
          replyTo={data?.replyTo}
          likes={data?.likes}
          isLike={data?.likes?.some((e) => e._id === currentUser.id)}
          // props pour gerer le like
          retweet={data?.retweet}
          isRetweet={data?.retweet?.some((e) => e._id === currentUser.id)}
          // props pour gerer le retweet
          bookmarks={data?.bookmarks}
          isBookmark={data?.bookmarks?.some((e) => e === currentUser.id)}
          // props pour gerer les bookmarks
          _id={data?._id}/>
        </div>
        </div>
        )} else {
    return (
      <ProfileMessage
        key={i}
        firstname={data?.author.firstname}
        username={data?.author.username}
        picture={data?.author.profil}
        date={data?.date}
        message={data?.message}
        comments={data?.comments}
        replyTo={data?.replyTo}
        likes={data?.likes}
        isLike={data?.likes?.some((e) => e._id === currentUser.id)}
        // props pour gerer le like
        retweet={data?.retweet}
        isRetweet={data?.retweet?.some((e) => e._id === currentUser.id)}
        // props pour gerer le retweet
        bookmarks={data?.bookmarks}
        isBookmark={data?.bookmarks?.some((e) => e === currentUser.id)}
        // props pour gerer les bookmarks
        _id={data?._id}
      />
    );
  }})


  // iteration tableau tweetData pour affichage tweet
  const tweetUser = sortedTweets?.map((data, i) => {
    return (
      <ProfileMessage
        key={i}
        firstname={data?.author.firstname}
        username={data?.author.username}
        picture={data?.author.profil}
        date={data?.date}
        message={data?.message}
        comments={data?.comments}
        replyTo={data?.replyTo}
        likes={data?.likes}
        isLike={data?.likes?.some((e) => e._id === currentUser.id)}
        // props pour gerer le like
        retweet={data?.retweet}
        isRetweet={data?.retweet?.some((e) => e._id === currentUser.id)}
        // props pour gerer le retweet
        bookmarks={data?.bookmarks}
        isBookmark={data?.bookmarks?.some((e) => e === currentUser.id)}
        // props pour gerer les bookmarks
        _id={data?._id}
      />
    );
  });

  

  const likedTweet = likedData?.map((data, i) => {
    return (
      <ProfileMessage
        key={i}
        firstname={data.author.firstname}
        username={data.author.username}
        picture={data.author.profil}
        date={data.date}
        message={data.message}
        likes={data.likes}
        isLike={data.likes?.some((e) => e._id === currentUser.id)}
        // props pour gerer le like
        retweet={data.retweet}
        isRetweet={data.retweet?.some((e) => e._id === currentUser.id)}
        // props pour gerer le retweet
        bookmarks={data.bookmarks}
        isBookmark={data.bookmarks?.some((e) => e._id === currentUser.id)}
        // props pour gerer les bookmarks
        _id={data._id}
      />
    );
  });


  return (
    <div className=" h-1/3 flex-wrap border-t-4 border-[#0E141B] bg-[#151d27] ">
      {props.tweetShow === 'likes' && likedTweet}
      {props.tweetShow === 'tweets' && tweetUser}
      {props.tweetShow === 'replies' && tweetAndReply}
    </div>
  );
}

export default LastProfile;
