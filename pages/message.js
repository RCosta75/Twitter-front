import Accueil from "../components/Accueil";
import Trends from "../components/Trends";
import React from "react";
import LastDirectMessage from "../components/LastDirectMessage";
import DirectMessage from "../components/DirectMessage";

// page pour les messages 


function Message() {
  return (
    <div className="flex justify-center w-screen">

      <div className="w-3/12"><Accueil /></div>

      <div className="h-screen pt-5 w-6/12 bg-[#151d27]">
        <DirectMessage /><LastDirectMessage />
      </div>

      <div className="w-3/12"><Trends /></div>

    </div>
  );
}

export default Message;
