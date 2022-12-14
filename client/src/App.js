import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Auth2fa from "./pages/auth2fa/Auth2fa";
import Input from "./pages/input/Input";
import ErrorLogin from "./pages/login/ErrorLogin";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/auth2fa" element={<Auth2fa/>}/>
        <Route path="/input" element={<Input/>}/>
        <Route path="/errorLogin/:message" element={<ErrorLogin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
