import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";
import { updateTweet } from "../reducers/tweetRex";

function Accueil() {
  // composant page tweet a gauche
  const dispatch = useDispatch();

  // change de place en react
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  // bouton lougout retire user de reducer
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleHome = () => {
    router.push("/feed")
  }

  const goToProfilePage = () => {
    dispatch(updateTweet())
    router.push({
      pathname: "/profilepage",
      query: {
        username : user.username,
      },
    })
  }

  return (
    <div className="bg-[#151d27] flex flex-col w-full h-screen items-start border-r-4 border-[#0E141B] justify-between ">
      <FontAwesomeIcon
        className="cursor-pointer p-6"
        icon={faTwitter}
        size="4x"
        style={{ color: "whitesmoke" }}
        href="/tweets"
        onClick={() => handleHome()}
      />

      <div className="flex w-full flex-col items-start pl-10 gap-7 text-gray-200">

        <div className="flex flex-row items-center cursor-pointer"
          onClick={() => handleHome()}>
          <svg fill={router.pathname !== "/feed" ? "#ffffff" : "#018FF4"} version="1.1" id="Capa_1"  width="40px" height="40px" viewBox="0 0 75.822 75.822" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M74.944,36.29l-9.469-9.471c-0.003,0-0.003-0.003-0.006-0.003L41.017,2.363c0,0-0.003-0.002-0.003-0.003l-0.988-0.988 c-1.167-1.169-3.063-1.169-4.23,0L34.809,2.36c0,0.001-0.003,0.001-0.003,0.001L10.352,26.817c-0.003,0-0.003,0.003-0.006,0.003 l-9.469,9.471c-1.169,1.169-1.169,3.063,0,4.231c0.583,0.584,1.35,0.877,2.116,0.877s1.533-0.292,2.116-0.877l4.364-4.364 l2.992,31.935c0,3.989,3.245,7.234,7.232,7.234h36.427c3.986,0,7.231-3.245,7.231-7.234l2.992-31.935l4.364,4.364 c0.583,0.584,1.35,0.877,2.115,0.877c0.765,0,1.532-0.292,2.115-0.877C76.114,39.353,76.114,37.458,74.944,36.29z M56.125,69.34 H19.698c-0.687,0-1.248-0.561-1.248-1.25l-2.993-37.918L37.911,7.718l22.454,22.454l-2.992,37.919 C57.372,68.78,56.81,69.34,56.125,69.34z"></path> </g> <g> <path d="M37.911,49.75c-6.528,0-11.839-5.311-11.839-11.839s5.311-11.839,11.839-11.839c6.527,0,11.839,5.311,11.839,11.839 S44.438,49.75,37.911,49.75z M37.911,32.055c-3.229,0-5.854,2.628-5.854,5.854s2.625,5.854,5.854,5.854 c3.229,0,5.854-2.627,5.854-5.854S41.139,32.055,37.911,32.055z"></path> </g> </g> </g> </g></svg>
          
          {router.pathname !== "/feed" ? (
          <p className="text-xl font-bold pl-5 hover:underline">Home</p>
          ) : (
          <p className="text-xl text-blue-500 hover:underline font-bold pl-5">Home</p>
          )}

        </div>

        <div className="flex flex-row items-center cursor-pointer "
        onClick={() => router.push("/hashtags")}>
          <svg width="40px" height="40px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.54944 12L3.21611 15H5.22841L5.56175 12H9.54944L9.21611 15H11.2284L11.5617 12H14.5552L14.7774 10H11.784L12.2284 6H15.2218L15.4441 4H12.4506L12.784 1H10.7717L10.4383 4H6.45064L6.78397 1H4.77166L4.43833 4H1.44431L1.22209 6H4.21611L3.77166 10H0.777642L0.55542 12H3.54944ZM5.78397 10H9.77166L10.2161 6H6.22841L5.78397 10Z" fill={router.pathname !== "/hashtags" ? "#ffffff" : "#018FF4"}></path> </g></svg>          
          {router.pathname !== "/hashtags" ? (
          <p className="text-xl font-bold pl-5 hover:underline">Trends</p>
          ) : (
          <p className="text-xl text-blue-500 hover:underline font-bold pl-5">Trends</p>
          )}

        </div>

        <div className="flex flex-row items-center cursor-pointer "
        onClick={() => router.push("/message")}>
          <svg width="40px" height="40px" viewBox="0 0 1024 1024" fill={router.pathname === "/message" || router.pathname ===  "/dm" ? "#018FF4" : "#ffffff"}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill={router.pathname === "/message" || router.pathname ===  "/dm" ? "#018FF4" : "#ffffff"} d="M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224H128zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64z"></path><path fill={router.pathname === "/message" || router.pathname ===  "/dm" ? "#018FF4" : "#ffffff"} d="M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224h784zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224H205.056z"></path></g></svg>
          
          {router.pathname === "/message" || router.pathname ===  "/dm" ? (
          <p className="text-xl text-blue-500 font-bold pl-5 hover:underline">Messages</p>
          ) : (
          <p className="text-xl  hover:underline font-bold pl-5">Messages</p>
          )}

        </div>

        <div className="flex flex-row items-center cursor-pointer "
          onClick={() => router.push("/bookmarked")}>
          <svg width="40px" height="40px" viewBox="0 0 24 24" fill={router.pathname !== "/bookmarked" ? "#ffffff" : "#018FF4"} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke={router.pathname !== "/bookmarked" ? "#ffffff" : "#018FF4"} stroke-width="2" stroke-linejoin="round"></path> </g></svg>
          
          {router.pathname !== "/bookmarked" ? (
          <p className="text-xl font-bold pl-5 hover:underline">Bookmarks</p>
          ) : (
          <p className="text-xl text-blue-500 hover:underline font-bold pl-5">Bookmarks</p>
          )}
        </div>

        <div className="flex flex-row items-center cursor-pointer"
          onClick={() => goToProfilePage()}>
        <svg width="40px" height="40px" viewBox="0 0 20 20" version="1.1" fill={router.pathname !== "/profilepage" ? "#ffffff" : "#018FF4"}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>profile [#ffffff]</title><defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-380.000000, -2159.000000)" fill={router.pathname !== "/profilepage" ? "#ffffff" : "#018FF4"}> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M334,2011 C337.785,2011 340.958,2013.214 341.784,2017 L326.216,2017 C327.042,2013.214 330.215,2011 334,2011 M330,2005 C330,2002.794 331.794,2001 334,2001 C336.206,2001 338,2002.794 338,2005 C338,2007.206 336.206,2009 334,2009 C331.794,2009 330,2007.206 330,2005 M337.758,2009.673 C339.124,2008.574 340,2006.89 340,2005 C340,2001.686 337.314,1999 334,1999 C330.686,1999 328,2001.686 328,2005 C328,2006.89 328.876,2008.574 330.242,2009.673 C326.583,2011.048 324,2014.445 324,2019 L344,2019 C344,2014.445 341.417,2011.048 337.758,2009.673" id="profile-[#ffffff]"> </path> </g> </g> </g> </g></svg>
       
        {router.pathname !== "/profilepage" ? (
          <p className="text-xl font-bold pl-5 hover:underline">Profile</p>
          ) : (
          <p className="text-xl text-blue-500 hover:underline font-bold pl-5">Profile</p>
          )}
          
        </div>

      </div>

      <div className="text-gray-200  flex flex-row w-full p-10 align-middle">
        <img
          src={user.profil ? `/${user.profil}` : "/oeuf.png"}
          className="rounded-full h-24 w-32 cursor-pointer border-4 border-[#0E141B]"
          onClick={() => goToProfilePage()}
        />

        <div className="w-full flex flex-col pl-2 cursor-pointer">
          <span onClick={() => goToProfilePage()} className="font-bold text-2xl">{user.firstname} </span>
          <span className="text-gray-500 cursor-pointer" onClick={() => goToProfilePage()}> @{user.username} </span>

          <div className="w-full">
            <button
              className="mt-4 w-2/3 border-2 border-[#0E141B] bg-[#243042] text-gray-200 rounded-xl font-semibold cursor-pointer"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
