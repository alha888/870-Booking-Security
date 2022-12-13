
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./input.css";

const Input = () => {
  
  const [credentials, setCredentials] = useState({
    name: undefined,
    type: undefined,
    city: undefined,
    address: undefined,
    distance:undefined,
    title:undefined,
    desc:undefined,
    rating:undefined,
    cheapestPrice:undefined,
    });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ( {...prev, [e.target.id]: e.target.value}));
    console.log(credentials)
  };

  const inputHotelInfo = async (e) => {
    
    e.preventDefault();

    try {
        
        const res = await axios.post("/hotels/createHotel", credentials);


      navigate("/input")

  } catch (err) {
    }
  
  };

  return (
    <div className="input">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Back to Home</span>
        </Link>
      
      <div className="inputHotel">
        <input
          type="text"
          placeholder="hotel name (required)"
          id="name"
          onChange={handleChange}
          className="hotelNameInput"
        /> <br />
        <input
          type="text"
          placeholder="Hotel/Apartment/Business(required)"
          id="type"
          onChange={handleChange}
          className="hotelTypeInput"
        /><br />
        <input
          type="text"
          placeholder="hotel City(required)"
          id="city"
          onChange={handleChange}
          className="hotelCityInput"
        /><br />
        <input
          type="text"
          placeholder="hotel Address(required)"
          id="address"
          onChange={handleChange}
          className="hotelAdressInput"
        /><br />
        <input
          type="text"
          placeholder="hotel Distance(required)"
          id="distance"
          onChange={handleChange}
          className="hotelDistanceInput"
        /><br />
        <input
          type="text"
          placeholder="hotel Title(required)"
          id="title"
          onChange={handleChange}
          className="hotelTitleInput"
        /><br />
        <input
          type="text"
          placeholder="hotel Description(required)"
          id="desc"
          onChange={handleChange}
          className="hotelDescriptionInput"
        /><br />
        <input
          type="number"
          placeholder="hotel Rating[0 - 5](required)"
          id="rating"
          onChange={handleChange}
          className="hotelRatingInput"
        /><br />
         <input
          type="number"
          placeholder="Cheapest Price (required)"
          id="cheapestPrice"
          onChange={handleChange}
          className="hotelCheapestPriceInput"
        /><br />
        
        <br />
      <button onClick={inputHotelInfo}                  className="inputHotelButton">
                  Input this Hotel to DataBase
                </button>
    </div><br/>
    </div>
  );
};

export default Input;
