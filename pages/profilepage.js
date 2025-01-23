import Accueil from "../components/Accueil";
import Profile from "../components/Profile";
import Trends from "../components/Trends";
import LastProfile from "../components/LastProfile";
import { useState } from "react";

// page pour les tweet

function Profilepage() {

  const [tweetShow, setTweetShow] = useState("tweets");


  return (
    <div className="flex justify-center w-screen">

      <div className="w-3/12"><Accueil /></div>

      <div className="h-screen w-6/12 overflow-auto thin-scrollbar bg-[#151d27]">
        <Profile setTweetShow={setTweetShow} tweetShow={tweetShow}/><LastProfile tweetShow={tweetShow}/>
      </div>

      <div className="w-3/12"><Trends /></div>

    </div>
  );
}

export default Profilepage;
