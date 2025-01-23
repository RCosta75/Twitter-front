import Accueil from "../components/Accueil";
import Post from "../components/Post";
import Trends from "../components/Trends";
import LastTweet from "../components/LastTweets";

// page pour les tweet

function Tweets() {
  return (
    <div className="flex justify-center w-screen">

      <div className="w-3/12"><Accueil /></div>
 
      <div className="h-screen pt-5 overflow-auto thin-scrollbar w-6/12  bg-[#151d27]">
        <Post /><LastTweet/>
      </div>

      <div className="w-3/12"><Trends /></div>

    </div>
  );
}

export default Tweets;
