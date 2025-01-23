import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateTweet } from "../reducers/tweetRex";
import { useRouter } from "next/router";
import { Modal } from "antd";
import Follow from "./Follow";
import { login } from "../reducers/user";

export default function Profile(props) {


    // un useState() par modal
    const [isModalOpenFollowers, setIsModalOpenFollowers] = useState(false);
    const [isModalOpenFollowings, setIsModalOpenFollowings] = useState(false);
  
    // au clique sur button modal ouvre
    const followersModal = () => {
      setIsModalOpenFollowers(true);
    };
  
    const followingsModal = () => {
      setIsModalOpenFollowings(true);
    };
    // au clique exterieur modal se ferme
    const handleCancel = () => {
      setIsModalOpenFollowers(false);
      setIsModalOpenFollowings(false);
    };

  const [isFollow,setIsFollow] = useState()
  const [watchUser,setWatchUser] = useState()
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  
  const [editProfil, setEditProfil] = useState(false)
  const [bioData, setBioData] = useState('')
  const [firstNameData, setFirstNameData] = useState('')


  const dispatch = useDispatch()
  const router = useRouter()

  const currentUser = useSelector((state) => state.user.value);
  const tweetRex = useSelector((state) => state.tweetRex.value);


  // route dynamique pour recuperer les infos envoyer au router.push()
  const   {
    username = "",
  } = router.query;

  const userProfile = {
    username,
  }

  // envoi des donnée de l'auteur du tweet avec router.push()
  const goToDm = (watchId , username , firstname, profil) => {
    router.push({
        pathname: "/dm",
        query: {
          firstname : firstname,
          username: username,
          id: watchId,
          profil: profil
        },
      });
  }

  // ASYNCRONIE NECESSITE 2 CLIQUE POUR RERENDER 
  // met a jour les donnée du profil selon userProfile recu de router.push() 
  useEffect(() => {
    fetch(`https://twitter-back-gamma.vercel.app//users/get/${userProfile.username ? userProfile.username : currentUser.username}`)
    .then((response) => response.json())
    .then((users) => {
        setIsFollow(users.user?.followers),
        setWatchUser(users.user)
        setFollowers(users.user?.followers)
        setFollowings(users.user?.following)
    })
  }, [tweetRex, userProfile.username, currentUser.username]);


  // route follow
  const handleFollow = () => {
        fetch(`https://twitter-back-gamma.vercel.app//users/follow`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentId: currentUser.id,
            watchId : watchUser._id,
          }),
        }).then(() => {
          dispatch(updateTweet())
        });
  }

  // route changer bio
  const handleBio = () => {
    fetch(`https://twitter-back-gamma.vercel.app//users/bio`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: currentUser.token,
        bio : bioData,
      }),
    }).then(() => {
      dispatch(updateTweet())
      setEditProfil(!editProfil)
    });
}

// route pour changer fistname 
  const handleFirstname = () => {
    if(firstNameData.length > 0){
      fetch(`https://twitter-back-gamma.vercel.app//users/firstname`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: currentUser.token,
          firstname : firstNameData,
        }),
      }).then(() => {
        dispatch(updateTweet())
        dispatch(login({
          firstname : firstNameData,
          username: currentUser.username,
          token: currentUser.token,
          id : currentUser.id,
          profil: currentUser.profil,
        }))
        setEditProfil(!editProfil)
      });
    }

}

  let followersMap = followers?.map((e,i) => {
    return (<Follow 
            key={i}
            firstname = {e?.firstname}
            username = {e?.username}
            profil = {e?.profil}
            id = {e?._id}
            followers = {e?.followers}
            setIsModalOpenFollowers = {setIsModalOpenFollowers}
            />)
  })

  let followingMap = followings?.map((e,i) => {
    return (<Follow 
            key={i}
            firstname = {e?.firstname}
            username = {e?.username}
            profil = {e?.profil}
            id = {e?._id}
            followers = {e?.followers}
            setIsModalOpenFollowings = {setIsModalOpenFollowings}
            />)
  })

  return (
    <div className="h-3/4 flex flex-col overflow-auto no-scrollbar justify-between">
      <div className=" bg-[url('/clouds.jpg')] bg-center  h-3/5 border-b-4 border-[#0E141B]"></div>

      <img
          src={watchUser?.profil ? `/${watchUser.profil}` : "/oeuf.png"}
          width={100}
          height={100}
          className="rounded-full h-44 w-44  ml-10 -m-20 border-4 border-[#0E141B]"
        />

      <div className=" h-3/5 flex flex-col ">

        <div className="h-1/2 flex flex-row px-10 w-full justify-between">
          <div className="flex-col pt-20">

            
            {!editProfil ? 
            <h1 className="text-gray-50 px-10 text-3xl font-bold">
            {watchUser?.firstname }
            </h1> : 
            <div className="flex flex-row">
            <input
            className="font-inherit no-scrollbar resize-none mt-2 mb-2 p-2 focus:border-gray-50 w-80 text-lg border-2 rounded-md border-gray-600 outline-0 text-white bg-transparent transition-all duration-200"
            maxLength={30}
            placeholder="Change your FirstName"
            onChange={(e) => setFirstNameData(e.target.value)}
            value={firstNameData}
            ></input>
            <button
              className=" text-[#5dbbfe] mt-2 border-2 w-20 justify-center font-bold border-[#48b2fe] ml-4 text-base rounded-3xl h-1/4 px-2 py-2 text-medium cursor-pointer transition-colors duration-300 ease-in-out hover:shadow-xl flex items-center"
              onClick={() => handleFirstname()}
             >Save</button>
            </div>
            }

              {editProfil ? 
              <></> :
                <h3 className="text-gray-400 text-lg px-10 w-full">@{watchUser?.username }</h3>
              }


            {!editProfil ? 
              <p className="pt-3 px-10 text-base text-gray-50 w-full">
              {watchUser?.bio } </p> 
              : 
              <div className="flex flex-row">
              <textarea
              className="font-inherit no-scrollbar resize-none mt-2 mb-2 p-2 focus:border-gray-50 w-80 text-lg border-2 rounded-md border-gray-600 outline-0 text-white bg-transparent transition-all duration-200"
              maxLength={140}
              type="text"
              placeholder="Change your bio"
              onChange={(e) => setBioData(e.target.value)}
              value={bioData}
            ></textarea>
              <button
              className=" text-[#5dbbfe] mt-6 border-2 w-20 justify-center font-bold border-[#48b2fe] ml-4 text-base rounded-3xl h-1/4 px-2 py-2 text-medium cursor-pointer transition-colors duration-300 ease-in-out hover:shadow-xl flex items-center"
              onClick={() => handleBio()}
             >Save</button>
            </div>
              }

            {editProfil ? <></> : 
             <div className="pt-3 flex w-2/3 text-gray-50 justify-between gap-3">
             <p className=" cursor-pointer px-10 flex gap-1" onClick={() => followingsModal()}>
               {watchUser?.following.length} <span className="text-gray-500">Following</span>
             </p>
             <p className=" cursor-pointer flex gap-1" onClick={() => followersModal()}>
               {watchUser?.followers.length} <span className="text-gray-500">Followers</span>
             </p>
           </div>
            }
           
           </div>
          <Modal
          open={isModalOpenFollowers}
          footer={null}
          closeIcon={null}
          maskClosable={true}
          onCancel={handleCancel}
          height={200}
          >
            <div className="h-80 overflow-auto thin-scrollbar">
            {followersMap}
            </div>

          </Modal>

          <Modal
          open={isModalOpenFollowings}
          footer={null}
          closeIcon={null}
          maskClosable={true}
          onCancel={handleCancel}
          height={200}
          >
          <div className="h-80 overflow-auto thin-scrollbar">
            {followingMap}
            </div>
          </Modal>

          <div className="flex gap-2">
            
            {currentUser.id !== watchUser?._id  ?             
            <button
              className=" text-[#5dbbfe] mt-4 border-2 font-bold border-[#48b2fe] text-base rounded-3xl h-1/4 px-3 py-2.5 text-medium cursor-pointer transition-colors duration-300 ease-in-out hover:shadow-xl flex items-center"
              onClick={() => {goToDm(watchUser?._id , watchUser?.username , watchUser?.firstname, watchUser?.profil)}}
            >
              <svg width="30px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#48b2fe" stroke-width="1.5"></path> <path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="#48b2fe" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            </button> : null}


            {currentUser.id !== watchUser?._id  ?
            <button
            className=" text-[#5dbbfe] mt-4 border-2 font-bold border-[#48b2fe] text-base rounded-3xl h-1/4 px-3 py-2.5 text-medium cursor-pointer transition-colors duration-300 ease-in-out hover:shadow-xl flex items-center"
            onClick={() => handleFollow()}
          >
            {!isFollow?.find((e) => e._id === currentUser.id) ? "Follow" : "Unfollow"}
          </button>
          :
          <button
            onClick={() => setEditProfil(!editProfil)}
             className=" text-[#5dbbfe] mt-4 border-2 flex justify-center font-bold border-[#48b2fe] text-base rounded-3xl h-1/4 px-3 py-2.5 text-medium cursor-pointer transition-colors duration-300 ease-in-out hover:shadow-xl items-center"
             // handle edit 
           >
             {editProfil ? "Cancel" : "Edit Profil"}
           </button>
           }


          </div>



        </div>
      
      </div>
      <div className="flex h-20">

        {props.tweetShow === "tweets" ? (
          <button className="w-1/4 h-full border-b-4 text-[#5dbbfe] hover:border-b-4 border-[#5dbbfe] cursor-pointer text-center py-1 hover:text-[#5dbbfe] font-bold text-lg" onClick={() => props.setTweetShow("tweets")}>Tweets</button>
        )
          : 
        (
          <button className="w-1/4 h-full focus:border-b-4 focus:text-[#5dbbfe] hover:border-b-4 border-[#5dbbfe] cursor-pointer text-center py-1 hover:text-[#5dbbfe] text-gray-400 font-bold text-lg" onClick={() => props.setTweetShow("tweets")}>Tweets</button>    
        )}

        {props.tweetShow === "replies" ? (
          <button className="w-1/4 h-full border-b-4 text-[#5dbbfe] hover:border-b-4 border-[#5dbbfe] cursor-pointer text-center py-1 hover:text-[#5dbbfe] font-bold text-lg" onClick={() => props.setTweetShow("replies")}>Tweets & Replies</button>
        )
          : 
        (
          <button className="w-1/4 h-full focus:border-b-4 focus:text-[#5dbbfe] hover:border-b-4 border-[#5dbbfe] cursor-pointer text-center py-1 hover:text-[#5dbbfe] text-gray-400 font-bold text-lg" onClick={() => props.setTweetShow("replies")}>Tweets & Replies</button>    
        )}

        {props.tweetShow === "media" ? (
          <button className="w-1/4 h-full border-b-4 text-[#5dbbfe] hover:border-b-4 border-[#5dbbfe] cursor-pointer text-center py-1 hover:text-[#5dbbfe] font-bold text-lg" onClick={() => props.setTweetShow("media")}>Media</button>
        )
          : 
        (
          <button className="w-1/4 h-full focus:border-b-4 focus:text-[#5dbbfe] hover:border-b-4 border-[#5dbbfe] cursor-pointer text-center py-1 hover:text-[#5dbbfe] text-gray-400 font-bold text-lg" onClick={() => props.setTweetShow("media")}>Media</button>    
        )}

        {props.tweetShow === "likes" ? (
          <button className="w-1/4 h-full border-b-4 text-[#5dbbfe] hover:border-b-4 border-[#5dbbfe] cursor-pointer text-center py-1 hover:text-[#5dbbfe] font-bold text-lg" onClick={() => props.setTweetShow("likes")}>Likes</button>
        )
          : 
        (
          <button className="w-1/4 h-full focus:border-b-4 focus:text-[#5dbbfe] hover:border-b-4 border-[#5dbbfe] cursor-pointer text-center py-1 hover:text-[#5dbbfe] text-gray-400 font-bold text-lg" onClick={() => props.setTweetShow("likes")}>Likes</button>    
        )}

      </div>
       
    </div>
  );
}
