import Accueil from "../components/Accueil";
import Trends from "../components/Trends";
import Bookmarks from "../components/Bookmarks";
import LastBookmarks from "../components/LastBookmarks";

// page pour les bookmarks 


function Bookmarked() {
  return (
    <div className="flex justify-center w-screen">

      <div className="w-3/12"><Accueil /></div>

      <div className="h-screen pt-5 w-6/12 bg-[#151d27]">
        <Bookmarks /><LastBookmarks/>
      </div>

      <div className="w-3/12"><Trends /></div>

    </div>
  );
}

export default Bookmarked;
