import axios from "axios";
import { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const Auth2fa = () => {
  
 
return(
  <div>
    <title>Sign Up - Set 2FA</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" 
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
  

  <div class="container mx-auto mt-4">
    <h1>Sign Up - Set 2FA</h1>
    <form>
      <p>Scan the QR Code in the Authenticator app then enter the code that you see in the app in the text field and click Submit.</p>
      <img src="<%= qr %>" class="img-fluid" />
      <div class="mb-3">
        <label for="code" class="form-label">2FA Code</label>
        <input type="text" class="form-control" id="code" name="code"/>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>
    </div>
  
)
};

export default Auth2fa;