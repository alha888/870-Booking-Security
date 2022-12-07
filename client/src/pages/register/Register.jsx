import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  
  const [credentials, setCredentials] = useState({
    username: null,
    password: null,
    email: null,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", credentials);

      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });

      navigate("/login")
      console.log(res.data)

    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };


  return (   

<div>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" 
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/> 
      

    <div className="Register">
     
      <h1>Register</h1>

        
      <div className="Register Container">
        <div class="formRegister">
            <label className="Username-label"/>Username: <br/> 
            <input 
                type="text" 
                className="form-username" 
                id="username" 
                placeholder="username"
                onChange={handleChange}/><br/>
            <label className="Password-label"/>Password: <br/> 
            <input 
                type="password" 
                className="form-password" 
                id="password" 
                onChange={handleChange}/><br/><br/>
            <label className="2fa-reg-label"/>2FA Setting with Email: <br/>
            <input 
                type="email" 
                className="form-2fa-email" 
                id="email" 
                placeholder="abc@gmail.com"
                onChange={handleChange}/><br/><br/>
        </div>
        <button 
            type="submit" 
            className="btn-register" 
            onClick={handleClick}>
            Sign up with 2FA authentication</button>
      </div>
    </div></div>
  );
  
};

export default Register;
