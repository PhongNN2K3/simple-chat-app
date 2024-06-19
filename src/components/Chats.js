import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { auth } from "../firebase";
const Chats = () => {
  const navigate = useNavigate();
  let { user } = useAuth();
  const [loading, setLoading] = useState(true);

  //log out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //lấy file ảnh từ firebase account
  const getFiles = async (url) => {
    const path = await fetch(url);
    const blob = await path.blob();
    const file = new File([blob], "avatar.png", { type: "avatar.jpeg" });
    return file;
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    //lay thong tin nguoi dung trong chatengine
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      //nếu không có sẽ tạo account trong chatengine
      .catch(() => {
        let formData = new FormData();
        formData.append("username", user.email);
        formData.append("email", user.email);
        formData.append("secret", user.uid);

        getFiles(user.photoURL).then((file) => {
          formData.append("avatar", file);
          axios
            .post("https://api.chatengine.io/users", formData, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
  }, [user, navigate]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2 style={{ margin: "0 20px", color: "#fff" }}>Simple chat app</h2>
        <button onClick={handleLogout} className="logout-btn">
          Đăng xuất
        </button>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
