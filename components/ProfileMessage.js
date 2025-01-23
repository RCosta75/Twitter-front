// COMPOSANT POUR TWEET USESTATE() like,setLikes
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


function ProfileMessage(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isModalRetweetOpen, setIsModalRetweetOpen] = useState(false);
  const [isModalLikeOpen, setIsModalLikeOpen] = useState(false);

  // au clique sur button modal ouvre
  const retweetModal = () => {
    setIsModalRetweetOpen(true);
  };

  const likeModal = () => {
    setIsModalLikeOpen(true);
  };
  // au clique exterieur modal se ferme
  const handleCancel = () => {
    setIsModalLikeOpen(false);
    setIsModalRetweetOpen(false);
  };

  let liked = [null]
  let retweeted =[null]

  if(props.likes){
     liked = props?.likes
     retweeted = props?.retweet
  }


  let retweetMap = liked.map((e,i) => {
    return (<Follow 
            key={i}
            firstname = {e?.firstname}
            username = {e?.username}
            profil = {e?.profil}
            id = {e?._id}
            followers = {e?.followers}
            setIsModalRetweetOpen = {setIsModalRetweetOpen}
            />)
  })

  let likeMap = retweeted.map((e,i) => {
    return (<Follow 
            key={i}
            firstname = {e?.firstname}
            username = {e?.username}
            profil = {e?.profil}
            id = {e?._id}
            followers = {e?.followers}
            setIsModalLikeOpen = {setIsModalLikeOpen}
            />)
  })

  // fonction pour gerer les likes
  const handleLikes = () => {
    const data = props.replyTo ? { idComment: props._id ,idUser: user.id } : { idTweet: props._id,idUser: user.id };

    fetch(`http://localhost:3000/tweets/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      // reducer true or false pour re-render du composant
      dispatch(updateTweet());
    });
  };

 // fonction pour les retweet
  const handleRetweet = () => {
    const data = props.replyTo ? { idComment: props._id ,idUser: user.id } : { idTweet: props._id,idUser: user.id };

    fetch(`http://localhost:3000/tweets/retweet`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      // reducer true or false pour re-render du composant
      dispatch(updateTweet());
    });
  };

  // route pour les bookmarks
  const handleBookmarks = () => {
    const data = props.replyTo ? { idComment: props._id ,idUser: user.id } : { idTweet: props._id,idUser: user.id };
    fetch(`http://localhost:3000/tweets/bookmarks`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      dispatch(updateTweet());
    });
  };

  // supp #_tweet et tweet onClick sur poubelle
  const deleteOne = () => {
    const data = props.replyTo ? { idComment: props._id  } : { idTweet: props._id };

    fetch(`http://localhost:3000/tweets/deleter`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      // reducer true or false pour re-render du composant
      dispatch(updateTweet());
    });
  };

  // onClick sur hashtag direction page hashtag
  const goToHashtag = (hashtag) => {
    dispatch(displayHashtag(hashtag));
    dispatch(updateTweet());

    router.push("/hashtags");
  };

  // gerer style hashtag
  function formatMessageWithHashtags(message) {
    return message?.split(" ").map((word, i) => {
      if (word.startsWith("#")) {
        return (
          <span key={i} className="text-[#018FF4] cursor-pointer" onClick={() => goToHashtag(word)}>
            {word + " "}
          </span>
        );
      } else {
        return word + " ";
      }
    });
  }

    // envoi des donnée de l'auteur du tweet avec router.push()
    const goToProfilePage = () => {
      router.push({
        pathname: "/profilepage",
        query: {
          username : props.username,
          id : props._id
        },
      });
    }

    const goToThreadPage = () => {
      router.push({
        pathname: "/thread",
        query: {
          id : props._id
        },
      });
    }

    let test = props?.comments
  

     return (
    <div className="border-2 border-[#243042] bg-[#0E141B] text-gray-200 flex flex-col ">
      <div className="flex flex-row items-center text-center text-gray-200 pl-5 pt-3 gap-3 text-sm">
        <Image
          onClick={() => goToProfilePage()}
          className="rounded-full border-4 border-[#1D2735] cursor-pointer"
          src={ !props.picture ? "/oeuf.png" :`/${props.picture}`}
          width={60}
          height={60}
        />
        <h3 onClick={() => goToProfilePage()} className="text-2xl cursor-pointer font-bold">{props.firstname}</h3>
        <span onClick={() => goToProfilePage()} className="text-gray-600 cursor-pointer text-base">@{props.username}</span>
        <span className="text-xs text-gray-600">{props.date}</span>
      </div>

      <div>
      {props.replyTo?.author?._id && <p className="text-gray-600 text-base pl-24">
        Reply To @{props.replyTo.author.username}
      </p>}
      <p className="text-gray-200 text-base pl-24">
        {formatMessageWithHashtags(props?.message)}
      </p>
      </div>

      <div className="flex justify-around p-5">
        <div className="flex items-center gap-2 cursor-pointer">
          <FontAwesomeIcon icon={faMessage} style={{ color: "#ffffff" }} />
          <span onClick={() => goToThreadPage()}>{test?.length}</span>
        </div>

        <div className="flex items-center gap-3">
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
          <span className="cursor-pointer" onClick={() => retweetModal()}> {props?.retweet ? props?.retweet?.length : "     "} </span>
        </div>

        <Modal
          open={isModalRetweetOpen}
          footer={null}
          closeIcon={null}
          maskClosable={true}
          onCancel={handleCancel}
          height={400}
          >
            <div className="h-80 overflow-auto thin-scrollbar">
            {likeMap}
            </div>

          </Modal>

          <Modal
          open={isModalLikeOpen}
          footer={null}
          closeIcon={null}
          maskClosable={true}
          onCancel={handleCancel}
          height={400}
          >
          <div className="h-80 overflow-auto thin-scrollbar">
            {retweetMap}
          </div>
          </Modal>

        <div className="flex items-center gap-3">
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
          <span className="cursor-pointer" onClick={() => likeModal()}> {props?.likes ? props?.likes.length : ""} </span>
        </div>

        <div className="flex items-center gap-2">
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

        {props.username === user.username && (
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => deleteOne()}
              style={{ color: "#ffffff", cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileMessage;
