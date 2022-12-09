import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
//import { Http2ServerRequest } from "http2";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { json } from "stream/consumers";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  
  const [credentials, setCredentials] = useState({
    username: null,
    password: null,
    email: null,
    code6: null,
    secret:null,
  });

  const [sentMail, setSentMail] = useState(false);

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const callSendCode = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post("mail/getUserInfo",credentials);

        credentials.username = res.data.user.username        
        credentials.code6 = res.data.user.code6
        credentials.email = res.data.user.email

       res = await axios.post("/mail/sendMail",credentials)

       console.log(res.data)
      //  console.log("收到的code", credentials.code6)

      setSentMail(true);

    } catch (err) {
      console.log("post to mail.js wrong!",err)
    }
  };


  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      if(!sentMail) {
        const message = "Please, get the code first!"
        navigate(`/errorLogin/${message}`)
      }
      else{
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    }
  } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data});
    }
  
  };


  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <br />
        <br />
      <button onClick={callSendCode}      className="SendCodeButton">
                  Send me a Authentication CODE
                </button>
        <label className="auth-code-label"/>Input the Authentication CODE: <br/>
            <input 
                type="text" 
                className="auth-code-input" 
                id="code6" 
                />

        
            
            <br/>
        <button onClick={handleClick} className="lButton">
          Login
        </button>

        {error && <span>{error.message}</span>}


      
      </div><br />
    </div>
  );
};

export default Login;
