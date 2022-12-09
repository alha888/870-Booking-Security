import { useNavigate, useLocation, useParams} from "react-router-dom";


const ErrorLogin = () => {

    // const location = useLocation();
    // const message = location.pathname.split("/")[2].toString();

    //console.log(message)
    const params = useParams()

    const navigate = useNavigate()
    const backToLogin = () => {navigate("/login")}
    
    return (
        <div className="errorlogin" >
          <div className="elContainer">

            <br />
            <div>
           <h2 type="text"><span>{params.message}</span></h2>
            <br /><br />
            </div>

            <button 
            onClick={backToLogin} 
            className="elButton">
              Back to Login
            </button>
   
          
          </div>
        </div>
      );
    };

    export default ErrorLogin;
