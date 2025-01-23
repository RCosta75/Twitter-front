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

function Tweet(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);


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

    const [isModalRetweetOpen, setIsModalRetweetOpen] = useState(false);
    const [isModalLikeOpen, setIsModalLikeOpen] = useState(false);
  
    // au clique sur button modal ouvre
    const retweetModal = () => {
      if(props.retweet.length > 0){
        setModalData(retweetMap)
        setIsModalRetweetOpen(true);
      }

    };
  
    const likeModal = () => {
      if(props.likes.length > 0){
        setModalData(likeMap)
        setIsModalLikeOpen(true);
      }
    };
    
    // au clique exterieur modal se ferme
    const handleCancel = () => {
      setIsModalLikeOpen(false);
      setIsModalRetweetOpen(false);
      setModalData()
    };


    let liked = props?.likes
    let retweeted = props?.retweet

    let retweetMap = retweeted.map((e,i) => {
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
  
    let likeMap = liked.map((e,i) => {
      console.log(e,'e')
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

 // fonction pour les retweet
 const handleRetweet = () => {
  const data = props.replyTo ? { idComment: props._id ,idUser: user.id } : { idTweet: props._id ,idUser: user.id};

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
    const data = props.replyTo ? { idComment: props._id ,idUser: user.id } : { idTweet: props._id ,idUser: user.id};

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
    const data = props.replyTo ? { idComment: props._id } : { idTweet: props._id };
    fetch(`http://localhost:3000/tweets/deleter`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),  // Utilisation directe de l'objet `data`
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
    return message.split(" ").map((word, i) => {
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
    <div className="border-2 border-[#243042] bg-[#0E141B] text-gray-200 " >
      <div className="flex flex-row items-center text-center text-gray-200 pl-5 pt-5 gap-2 text-sm">
        <Image
          onClick={() => goToProfilePage()}
          className="rounded-full cursor-pointer mt-10 border-4 border-[#1D2735] "
          src={ !props.picture ? "/oeuf.png" :`/${props.picture}`}
          width={60}
          height={60}
        />
        <h3 onClick={() => goToProfilePage()} className="text-2xl hover:underline mb-5 cursor-pointer font-bold">{props.firstname}</h3>
        <span onClick={() => goToProfilePage()} className="text-gray-600 mb-4 hover:underline cursor-pointer text-base">@{props.username}</span>
        <span className="text-xs mb-7 text-gray-600"> <span className=" mb-3 text-3xl">.</span> {props.date}</span>
      </div>

      <p className="text-gray-400 text-base pl-24 cursor-pointer" onClick={() => goToThreadPage()}>
        {formatMessageWithHashtags(props.message)}
      </p>

      <div className="flex justify-around p-5">
        <div className="flex items-center gap-3 w-1/5 justify-center cursor-pointer">
          <FontAwesomeIcon icon={faMessage} style={{ color: "#ffffff" }} />
          <span onClick={() => goToThreadPage()} className="cursor-pointer">{test?.length}</span>
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
          <span className="cursor-pointer" onClick={() => retweetModal()}> {props.retweet.length} </span>
        </div>

        <Modal
          open={isModalRetweetOpen}
          footer={null}
          closeIcon={null}
          maskClosable={true}
          onCancel={handleCancel}
          height={200}
          >
            <div className="h-80 overflow-auto thin-scrollbar">
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
          <div className="h-80 overflow-auto thin-scrollbar">
            {likeMap}
          </div>
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
          <span className="cursor-pointer" onClick={() => likeModal()}> {props.likes.length} </span>
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

        {props?.username === user.username && (
          <div className="flex items-center w-1/5 justify-center">
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

export default Tweet;
