import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tweet from "./Tweet";

function LastTweet() {
  const [tweetData, setTweetData] = useState([]);
  // useState pour contenir les tweet (tableau objet)

  const user = useSelector((state) => state.user.value);

  const tweetRex = useSelector((state) => state.tweetRex.value);

  // ROUTE A REGLER POUR LES LIKE et retweet et bookmark AVEC ID AU LIEU DE TOKEN
  // affichage tweet avec reducer true or false re-render a chaque tweet
  useEffect(() => {
    fetch("https://twitter-back-gamma.vercel.app/tweets/get")
      .then((response) => response.json())
      .then((data) => {
        // useState pour contenir les tweet recuper (objet)
        setTweetData(data.data);
      });
  }, [tweetRex]);

  console.log(tweetData)

  // iteration tableau tweetData pour affichage tweet
  const tweet = tweetData.map((data, i) => {
    if (data.author) {
      return (
        <Tweet
          key={i}
          firstname={data.author.firstname}
          username={data.author.username}
          picture={data.author.profil}
          date={data.date}
          message={data.message}
          likes={data.likes}
          comments={data.comments}
          replyTo={data.replyTo}
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
      <div className=" max-h-full bg-[#151d27] border-t-4 border-r-4  border-[#0E141B] box-border thin-scrollbar">
        {tweet}
      </div>
    </div>
  );
}

export default LastTweet;
