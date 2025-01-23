import React, { useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrashCan,
  faRetweet,
  faMessage,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateTweet } from "../reducers/tweetRex";
import { useRouter } from "next/router";
import { displayHashtag } from "../reducers/trend";
import { useState } from "react";
import { Modal } from "antd";
import Follow from "./Follow";

function ThreadTweet(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const [message, setMessage] = useState("");
  const [isModalRetweetOpen, setIsModalRetweetOpen] = useState(false);
  const [isModalLikeOpen, setIsModalLikeOpen] = useState(false);

  // au clique sur button modal ouvre
  const retweetModal = () => {
    if (props.tweetData.retweet.length > 0) {
      setIsModalRetweetOpen(true);
    }
  };

  const likeModal = () => {
    if (props?.tweetData?.likes.length > 0) {
      setIsModalLikeOpen(true);
    }
  };

  let liked = props?.tweetData?.likes;
  let retweeted = props?.tweetData?.retweet;

  let retweetMap = retweeted?.map((e, i) => {
    return (
      <Follow
        key={i}
        firstname={e?.firstname}
        username={e?.username}
        profil={e?.profil}
        id={e?._id}
        followers={e?.followers}
        setIsModalRetweetOpen={setIsModalRetweetOpen}
      />
    );
  });

  let likeMap = liked?.map((e, i) => {
    return (
      <Follow
        key={i}
        firstname={e?.firstname}
        username={e?.username}
        profil={e?.profil}
        id={e?._id}
        followers={e?.followers}
        setIsModalLikeOpen={setIsModalLikeOpen}
      />
    );
  });

  const handleCancel = () => {
    setIsModalLikeOpen(false);
    setIsModalRetweetOpen(false);
  };

  // gerer style hashtag
  function formatMessageWithHashtags(message) {
    return message?.split(" ").map((word, i) => {
      if (word.startsWith("#")) {
        return (
          <span
            key={i}
            className="text-[#018FF4] cursor-pointer"
            onClick={() => goToHashtag(word)}
          >
            {word + " "}
          </span>
        );
      } else {
        return word + " ";
      }
    });
  }

  const goToHashtag = (hashtag) => {
    dispatch(displayHashtag(hashtag));
    dispatch(updateTweet());
    router.push("/hashtags");
  };

  // fonction pour les retweet
  const handleRetweet = () => {
    fetch(`https://twitter-back-gamma.vercel.app/tweets/retweet`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idTweet: props.tweetData._id,
        idUser: user.id,
      }),
    }).then(() => {
      // reducer true or false pour re-render du composant
      dispatch(updateTweet());
    });
  };

  // route pour les bookmarks
  const handleBookmarks = () => {
    fetch(`https://twitter-back-gamma.vercel.app/tweets/bookmarks`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idTweet: props.tweetData._id,
        idUser: user.id,
      }),
    }).then(() => {
      dispatch(updateTweet());
    });
  };

  // fonction pour gerer les likes
  const handleLikes = () => {
    fetch(`https://twitter-back-gamma.vercel.app/tweets/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idTweet: props.tweetData._id,
        idUser: user.id,
      }),
    }).then(() => {
      // reducer true or false pour re-render du composant
      dispatch(updateTweet());
    });
  };

  const goToProfilePage = () => {
    router.push({
      pathname: "/profilepage",
      query: {
        username: props.tweetData.author.username,
        id: props.tweetData.author._id,
      },
    });
  };

  let test = props.tweetData?.comments;

  const handleClick = (id) => {
    fetch(`https://twitter-back-gamma.vercel.app/tweets/comment/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idTweet : id,
        idUser : user.id,
        message: message,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setMessage("");
        dispatch(updateTweet());
      });
  };

  return (
    <div className="w-full">
      <div className="border-4 border-[#243042] w-full bg-[#0E141B] text-gray-200 mb-5">
        <div className="flex flex-row items-center text-center text-gray-200 pl-5 pt-5 gap-2 text-sm">
          <Image
            onClick={() => goToProfilePage()}
            className="rounded-full cursor-pointer mt-10 border-4 border-[#1D2735] "
            src={
              !props.tweetData?.author.profil
                ? "/oeuf.png"
                : `/${props.tweetData.author.profil}`
            }
            width={60}
            height={60}
          />
          <h3
            onClick={() => goToProfilePage()}
            className="text-2xl hover:underline mb-5 cursor-pointer font-bold"
          >
            {props?.tweetData?.author.firstname}
          </h3>
          <span
            onClick={() => goToProfilePage()}
            className="text-gray-600 mb-4 hover:underline cursor-pointer text-base"
          >
            @{props?.tweetData?.author.username}
          </span>
          <span className="text-xs mb-7 text-gray-600">
            {" "}
            <span className=" mb-3 text-3xl">.</span> {props?.tweetData?.date.replace("T"," ").slice(0,16).replace("-","/")}
          </span>
        </div>

        <p className="text-gray-400 text-base pl-24">
          {formatMessageWithHashtags(props?.tweetData?.message)}
        </p>

        <div className="flex justify-around p-5">
          <div className="flex items-center gap-3 w-1/5 justify-center">
            <FontAwesomeIcon
              icon={faMessage}
              style={{ color: "#ffffff" }}
              className="cursor-pointer"
            />
            <span>{test?.length}</span>
          </div>

          <div className="flex items-center gap-3 w-1/5 justify-center">
            <FontAwesomeIcon
              icon={faRetweet}
              style={
                // couleur selon la props isRetweet reçu depuis lastTweets
                !props.isRetweet
                  ? { color: "white", cursor: "pointer" }
                  : { color: "#018FF4", cursor: "pointer" }
              }
              onClick={() => handleRetweet()}
            />
            <span className="cursor-pointer" onClick={() => retweetModal()}>
              {" "}
              {props?.tweetData?.retweet?.length}{" "}
            </span>
          </div>

          <Modal
            open={isModalRetweetOpen}
            footer={null}
            closeIcon={null}
            maskClosable={true}
            onCancel={handleCancel}
            height={200}
          >
            <div className="h-56 overflow-auto thin-scrollbar">
              {retweetMap}
            </div>
          </Modal>

          <Modal
            open={isModalLikeOpen}
            footer={null}
            closeIcon={null}
            maskClosable={true}
            onCancel={handleCancel}
            height={200}
          >
            <div className="h-56 overflow-auto thin-scrollbar">{likeMap}</div>
          </Modal>

          <div className="flex items-center gap-3 w-1/5 justify-center">
            <FontAwesomeIcon
              icon={faHeart}
              style={
                // couleur selon la props isLike reçu depuis lastTweets
                !props.isLike
                  ? { color: "white", cursor: "pointer" }
                  : { color: "#C71F37", cursor: "pointer" }
              }
              onClick={() => handleLikes()}
            />
            <span className="cursor-pointer" onClick={() => likeModal()}>
              {" "}
              {props?.tweetData?.likes?.length}{" "}
            </span>
          </div>

          <div className="flex items-center w-1/5 justify-center">
            <FontAwesomeIcon
              icon={faBookmark}
              style={
                !props.isBookmark
                  ? { color: "white", cursor: "pointer" }
                  : { color: "#018FF4", cursor: "pointer" }
              }
              onClick={() => handleBookmarks()}
            />
          </div>

          {props?.tweetData?.username === user.username && (
            <div className="flex items-center w-1/5 justify-center">
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => deleteOne()}
                style={{ color: "#ffffff", cursor: "pointer" }}
              />
            </div>
          )}
        </div>
        <div></div>
      </div>
      <div className="flex flex-row items-center justify-center pb-5 w-full">
      <div className="flex flex-row justify-around w-10/12 border-4  border-[#243042] focus:border-gray-50">
      <textarea
          className="font-inherit no-scrollbar h-1/2 resize-none p-2 w-4/6 text-lg rounded-md outline-0 text-white bg-transparent transition-all duration-200"
          maxLength={280}
          type="text"
          placeholder="Post your reply"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
          <div className=" mt-5 w-1/6 flex flex-col items-center pb-5">
          <button
            className="bg-[#2B3A4F] border-[#0E141B] text-gray-200 border-2 text-base h-1/2 mt-5 w-full rounded-3xl mr-5 text-medium font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:shadow-xl flex justify-center items-center"
            onClick={() => handleClick(props.tweetData._id)}
          >
            Reply
          </button>
          <p className="text-gray-400 pr-5">{message.length}/280</p>
          </div>
      </div>
      </div>
    </div>
  );
}

export default ThreadTweet;
