import Login from "./Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

// composant pour page 1 logo gauche / login  droite

function Home() {
  return (
      <div className="flex flex-row justify-center w-full">
        <div className="bg-cover bg-center h-screen w-2/5 flex justify-center bg-[url('/backgroundC.png')] items-center">
          <FontAwesomeIcon
            icon={faTwitter}
            size="2xl"
            style={{ color: "#ffffff" }}
          />
        </div>
        <div className="bg-[#151d27] w-[60vw]">
          <Login/>
        </div>
      </div>
  );
}

export default Home;