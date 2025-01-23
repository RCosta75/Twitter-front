import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tweet from "./Tweet";

function LastBookmarks() {
  const [tweetData, setTweetData] = useState([]);

  // useState pour contenir les tweet (tableau objet)

  const user = useSelector((state) => state.user.value);

  const tweetRex = useSelector((state) => state.tweetRex.value);

  // affichage tweet avec reducer true or false re-render a chaque tweet
  useEffect(() => {
    fetch(`http://localhost:3000/users/bookmarked/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.result){
            setTweetData(data.bookmarked.reverse());
            // useState pour contenir les tweet recuper (objet)
        }
      });
  }, [tweetRex]);


  // iteration tableau tweetData pour affichage tweet
  const tweet = tweetData?.map((data, i) => {
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
        isLike={data.likes.some((e) => e._id === user.id)}
        replyTo={data?.replyTo}
        // props pour gerer le like
        retweet={data.retweet}
        isRetweet={data.retweet.some((e) => e._id === user.id)}
        // props pour gerer le retweet
        bookmarks={data.bookmarks}
        isBookmark={data.bookmarks.some((e) => e === user.id)}
        // props pour gerer les bookmarks
        _id={data._id}
      />
    );
  });

  return (
    <div className=" h-5/6 bg-[#151d27] thin-scrollbar overflow-auto border-b-2 border-[#0E141B]">
      {tweet}
    </div>
  );
}

export default LastBookmarks;
