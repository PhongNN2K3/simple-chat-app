import { GoogleOutlined, TwitchOutlined } from "@ant-design/icons";
import { signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, twitterProvider } from "../firebase.js";

const Login = () => {
  const navigate = useNavigate();

  //Authentication với Google
  const signInWithGoogle = () => {
    signInWithRedirect(auth, googleProvider).then(() => {
      navigate("/chats");
    });
  };

  //Authentication với Twitter
  const signInWithTwitter = () => {
    signInWithRedirect(auth, twitterProvider).then(() => {
      navigate("/chats");
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Chào mừng bạn đến với Simple chat app</h2>
        <p>Hãy đăng nhập với các phương thức dưới đây</p>
        <br />
        <div className="login-google" onClick={signInWithGoogle}>
          <GoogleOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          Đăng nhập với Google
        </div>
        <br />
        <div className="login-twitter" onClick={signInWithTwitter}>
          <TwitchOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          Đăng nhập với Twitter
        </div>
        <br />
      </div>
    </div>
  );
};

export default Login;
