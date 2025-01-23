import { useSelector, useDispatch } from "react-redux";
import { updateTweet } from "../reducers/tweetRex";



function Bookmarks() {

    const user = useSelector((state) => state.user.value);

    const dispatch = useDispatch()

    const clearBookmarks = () => {
        fetch(`https://twitter-back-gamma.vercel.app//users/clear`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: user.token,
          }),
        }).then(() => {
          // reducer true or false pour re-render du composant
          dispatch(updateTweet());
        });
      };

  return (
    <div className="h-1/6 bg-[#151d27] flex flex-col border-b-4 pl-10 items-start border-[#0E141B] justify-center">
        <h2 className="text-gray-200 text-3xl font-bold ">Bookmarks</h2>
        <div className="flex flex-row justify-between w-full">
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-red-900 pr-2 cursor-pointer hover:underline" onClick={() => clearBookmarks()}
            >Clear all Bookmarks</p>
        </div>

    </div>
  );
}

export default Bookmarks;