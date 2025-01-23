import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/router";

function SignUp() {
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [error, setError] = useState(false)

  const dispatch = useDispatch();
  const router = useRouter();

  // appel route pour crée un user
  const handleRegister = () => {
    fetch("https://twitter-back-gamma.vercel.app//users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // user avec input et on change et value useState()
        firstname: signUpFirstname,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // incrementation user dans le reducer
          dispatch(
            login({
              firstname: signUpFirstname,
              username: signUpUsername,
              token: data.newUser.token,
              id : data.newUser._id,
            })
          );
          setSignUpFirstname("");
          setSignUpUsername("");
          setSignUpPassword("");
          // changement de page vers /tweets
          router.push("/feed");
        } else {
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
      <h1 className="text-2xl">Create your Twitter account</h1>
      <input
        className="w-1/2 bg-[#151d27] border border-white border-opacity-50 p-2 m-2 rounded-sm text-gray-200"
        type="text"
        placeholder="Firstname"
        id="signUpFirstname"
        value={signUpFirstname}
        onChange={(e) => setSignUpFirstname(e.target.value)}
      ></input>
      <input
        className="w-1/2 bg-[#151d27] border border-white border-opacity-50 p-2 m-2 rounded-sm text-gray-200"
        type="text"
        placeholder="Username"
        id="signUpUsername"
        value={signUpUsername}
        onChange={(e) => setSignUpUsername(e.target.value)}
      ></input>
      <input
      className="w-1/2 bg-[#151d27] border border-white border-opacity-50 p-2 m-2 rounded-sm text-gray-200"
        type="password"
        placeholder="Password"
        id="signUpPassword"
        value={signUpPassword}
        onChange={(e) => setSignUpPassword(e.target.value)}
      ></input>
            {error && <p className="text-red-600">Username already exist</p>}
      <button
      className="bg-gray-200 text-[#151d27] border-0 rounded-[24px] px-[80px] py-[10px] text-[1rem] font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-300 m-[10px_0px_40px_0px]"
      id="register" onClick={() => handleRegister()}>
        Sign Up
      </button>

    </div>
  );
}

export default SignUp;
