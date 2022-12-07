import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
    code6: undefined,
    secret:undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const callSendCode = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("mail/getUserInfo",credentials);

      setCredentials((prev) => ({ 
        ...prev, 
        secret: res.data.secret,
        code6:res.data.code6,
        email:res.data.user.email }));

        //console.log(res.data.user.email)

       res = await axios.post("/mail/sendMail",credentials);

        
    } catch (err) {
    }
  };


  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {

      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
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
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>

        {error && <span>{error.message}</span>}


      
      </div><br />
    </div>
  );
};

export default Login;
