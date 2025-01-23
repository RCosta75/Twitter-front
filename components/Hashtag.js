import { useDispatch, useSelector } from "react-redux";
import { displayHashtag } from "../reducers/trend";

//composant page hashtag pour rechercher hashtag

function Hashtag() {

  
  const dispatch = useDispatch();
  
  const hash = useSelector((state) => state.trend.value);

  
  return (
    <div className="h-1/5 bg-[#151d27] border-b-4 border-[#0E141B]">
      <h2 className="text-gray-200 m-0 pl-6 text-3xl font-bold justify-start">Hashtag</h2>
      <div className="flex justify-center">
        <input
          className="font-inherit w-4/5 border-2 outline-0 border-gray-500 focus:border-gray-50 text-white mt-4 p-3 bg-transparent rounded-xl text-base "
          onChange={(e) => dispatch(displayHashtag(e.target.value))}
          value={hash} // change reducer qui sert de param a la route getHashtag
        ></input>
      </div>
    </div>
  );
}

export default Hashtag;