import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Modal } from "antd";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useState } from "react";
import { useSelector } from "react-redux";
import {useRouter} from "next/router";

// composant pour ouvrir modal page 1 a droite

function Login() {
  // un useState() par modal
  const [isModalOpenSignUp, setIsModalOpenSignUp] = useState(false);
  const [isModalOpenSignIn, setIsModalOpenSignIn] = useState(false);

  const user = useSelector((state) => state.user.value);

  const router = useRouter();


  // au clique sur button modal ouvre
  const signUpModal = () => {
    setIsModalOpenSignUp(true);
  };

  const signInModal = () => {
    setIsModalOpenSignIn(true);
  };
  // au clique exterieur modal se ferme
  const handleCancel = () => {
    setIsModalOpenSignIn(false);
    setIsModalOpenSignUp(false);
  };

  if(user.token){
    router.push("/feed")
  }

  return (
    <div className="bg-[#151d27] text-gray-200 h-screen justify-around items-center flex flex-col">
      <div className="py-2 px-4 gap-3 h-1/2 w-2/4 justify-between align-middle flex flex-col text-center">
        <FontAwesomeIcon
          icon={faTwitter}
          size={"5x"}
          style={{ color: "#ffffff" }}
        />
        <h1 className="text-3xl font-bold">
          See what's happening
        </h1>
        <h3 className="font-bold">Join Twitter today.</h3>
        <button
          onClick={() => signUpModal()}
          className="bg-[#0066ff] text-white border-0 rounded-3xl py-2 font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#0052cc]"
        >
          Sign up
        </button>
        <Modal
          open={isModalOpenSignUp}
          footer={null}
          closeIcon={null}
          maskClosable={true}
          onCancel={handleCancel}
        >
          <SignUp />
        </Modal>
        <h5 className="font-bold">Already have an account?</h5>
        <button onClick={() => signInModal()} className="bg-[#151d27] text-[#0066ff] border border-gray-500 rounded-3xl py-2 px font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#1a2631]">
          Sign in
        </button>
        <Modal
          open={isModalOpenSignIn}
          footer={null}
          closeIcon={null}
          maskClosable={true}
          onCancel={handleCancel}
        >
          <SignIn />
        </Modal>
      </div>
    </div>
  );
}

export default Login;
