import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/router";

export default function SignIn() {
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [error, setError] = useState(false)

  const dispatch = useDispatch();
  const router = useRouter();

  const handleConnection = () => {
    // appel route pour se connecter
    fetch("https://twitter-back-gamma.vercel.app//users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // login avec valeur input value useState onChange(e => useState(e.target.value))
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            // ajout user dans login
            login({
              username: signInUsername,
              firstname: data.firstname,
              token: data.token,
              profil: data.profil,
              id : data.id,
            })
          );
          setSignInUsername("");
          setSignInPassword("");
          setError(false)
          // changement de page (tweet)
          router.push("/feed");
        } else{
          setError(true)
        }
      });
  };

  return (
    <div className="flex flex-col bg-[#151d27] text-gray-200 justify-center items-center">
      <FontAwesomeIcon
        className="mt-8"
        icon={faTwitter}
        rotation={180}
        size={"2xl"}
        style={{ color: "#ffffff" }}
      />
      <h1 className="text-2xl font-bold">Connect to Twitter</h1>
      <input
        className="w-1/2 bg-[#151d27] border border-white border-opacity-50 p-2 m-2 rounded-sm text-gray-200"
        type="text"
        placeholder="Username"
        id="signInUsername"
        value={signInUsername}
        onChange={(e) => setSignInUsername(e.target.value)}
      ></input>
      <input
        className="w-1/2 bg-[#151d27] border border-white border-opacity-50 p-2 m-2 rounded-sm text-gray-200"
        type="password"
        placeholder="Password"
        id="signInPassword"
        value={signInPassword}
        onChange={(e) => setSignInPassword(e.target.value)}
      ></input>
      {error && <p className="text-red-600">Wrong Username or Password </p>}
      <button
       className="bg-gray-200 text-[#151d27] border-0 hover:shadow-xl shadow-white rounded-[24px] px-[80px] py-[10px] text-[1rem] font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-300 m-[10px_0px_40px_0px]"
       id="connection" onClick={() => handleConnection()}>
        Sign In
      </button>
    </div>
  );
}
