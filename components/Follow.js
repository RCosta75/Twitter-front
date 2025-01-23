import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTweet } from "../reducers/tweetRex";
import { useRouter } from "next/router";

function Follow(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const currentUser = useSelector((state) => state.user.value);

  console.log(props.id, 'props')

  // route follow
  const handleFollow = () => {
    fetch(`http://localhost:3000/users/follow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentId: currentUser.id,
        watchId: props.id,
      }),
    }).then(() => {
      dispatch(updateTweet());
    });
  };

  let test = props.followers.includes(currentUser.id);

  const goToProfilePage = () => {
    props.setIsModalOpenFollowings && props.setIsModalOpenFollowings(false);
    props.setIsModalOpenFollowers && props.setIsModalOpenFollowers(false);
    props.setIsModalLikeOpen && props.setIsModalLikeOpen(false);
    props.setIsModalRetweetOpen && props.setIsModalRetweetOpen(false);

    router.push({
      pathname: "/profilepage",
      query: {
        username: props.username,
        id: props.id,
      },
    });
  };

  return (
    <div className="flex flex-col justify-center " >
      <div className="flex bg-[#0E141B] m-2 flex-row h-24 items-center justify-evenly text-center border-2 border-[#1D2735]">
        <img
          src={props?.profil ? `/${props.profil}` : "/oeuf.png"}
          width={40}
          height={40}
          className="rounded-full cursor-pointer h-16 w-16 "
          onClick={() => goToProfilePage()}
        />
        <h1
          onClick={() => goToProfilePage()}
          className="text-gray-50 text-3xl cursor-pointer w-1/4 font-bold pl-4"
        >
          {props?.firstname}
        </h1>
        <h3
          onClick={() => goToProfilePage()}
          className="text-gray-400 cursor-pointer w-1/4 text-lg pl-4 mt-2"
        >
          @{props?.username}
        </h3>

        {props?.username === currentUser.username ? (
          <div className="w-1/4"></div>
        ) : router.pathname !== "/search" ? (
          <button
            className="text-[#5dbbfe] w-1/4 justify-center flex text-center mt-2 border-2 font-bold border-[#48b2fe] text-base rounded-3xl h-1/4 px-3 py-2.5 text-medium cursor-pointer transition-colors duration-300 ease-in-out hover:shadow-xl items-center"
            onClick={() => handleFollow()}
          >
            {!test ? "Follow" : "Unfollow"}
          </button>
        ) : (
          <button
            className="text-[#5dbbfe] w-1/4 h-1/2 justify-center flex text-center mt-2 border-2 font-bold border-[#48b2fe] text-base rounded-3xl px-3 py-2.5 text-medium cursor-pointer transition-colors duration-300 ease-in-out hover:shadow-xl items-center"
            onClick={() => handleFollow()}
          >
            {!test ? "Follow" : "Unfollow"}
          </button>
        )}

      </div>
    </div>
  );
}

export default Follow;
