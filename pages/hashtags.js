import Accueil from "../components/Accueil";
import Trends from "../components/Trends";
import Hashtag from "../components/Hashtag";
import LastHashtag from "../components/LastHashtags";

// page pour les hashtag 

// CREE COMPOSANT RECHERCHE HASHTAG ET DISPLAY HASHTAG 

function Hashtags() {
  return (
    <div className="flex justify-center w-screen">

      <div className="w-3/12"><Accueil /></div>

      <div className="h-screen pt-5 w-6/12 bg-[#151d27]">
        <Hashtag /><LastHashtag/>
      </div>

      <div className="w-3/12"><Trends /></div>

    </div>
  );
}

export default Hashtags;
