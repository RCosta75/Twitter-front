import Accueil from "../components/Accueil";
import Trends from "../components/Trends";
import React from "react";
import Conv from "../components/Conv";


// page pour les messages 


function Dm() {
  return (
    <div className="flex justify-center w-screen">

      <div className="w-3/12"><Accueil /></div>

      <div className="h-screen pt-5 w-6/12 bg-[#151d27]">
        <Conv/>
      </div>

      <div className="w-3/12"><Trends /></div>

    </div>
  );
}

export default Dm;
