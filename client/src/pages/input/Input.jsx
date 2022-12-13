
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import "./input.css";

const Input = () => {
  
  const [credentialsH, setCredentialsH] = useState({
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

  const [credentialsR, setCredentialsR] = useState({
    roomInHotel: undefined,
    title: undefined,
    price: undefined,
    maxPeople: undefined,
    desc: undefined,
    });

  const navigate = useNavigate()

  const handleChangeHotel = (e) => {
    setCredentialsH((prev) => ( {...prev, [e.target.id]: e.target.value}));
    console.log(credentialsH)
  };

  const handleChangeRoom = (e) => {
    setCredentialsR((prev) => ( {...prev, [e.target.id]: e.target.value}));
    console.log(credentialsR)
  };

  const inputHotelInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/hotels/createHotel", credentialsH);
      navigate("/input")

  } catch (err) {
    }
  };

  const inputRoomInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/hotels/findByName/${credentialsR.roomInHotel}`);
      await axios.post(`/rooms/${res.data._id}`, credentialsR);

      navigate("/input")

  } catch (err) {
    }
  };

  return (
    <div className="input">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Back to Home</span>
        </Link>
      <br /><br />
      <label htmlFor=""><h1>Hotel Information</h1></label><br />
      <div className="inputHotel">
        <label htmlFor="">Name:  </label>
        <input
          type="text"
          placeholder="hotel name (required)"
          id="name"
          onChange={handleChangeHotel}
          className="hotelNameInput"
        /> <br />
        <label htmlFor=""> Type: </label>
        <input
          type="text"
          placeholder="Hotel/Apartment/Business(required)"
          id="type"
          onChange={handleChangeHotel}
          className="hotelTypeInput"
        /><br />
        <label htmlFor="">City:</label>
        <input
          type="text"
          placeholder="hotel City(required)"
          id="city"
          onChange={handleChangeHotel}
          className="hotelCityInput"
        /><br />
        <label htmlFor="">Address:</label>
        <input
          type="text"
          placeholder="hotel Address(required)"
          id="address"
          onChange={handleChangeHotel}
          className="hotelAdressInput"
        /><br />
        <label htmlFor="">Distance:</label>
        <input
          type="text"
          placeholder="hotel Distance(required)"
          id="distance"
          onChange={handleChangeHotel}
          className="hotelDistanceInput"
        /><br />
        <label htmlFor="">Title:</label>
        <input
          type="text"
          placeholder="hotel Title(required)"
          id="title"
          onChange={handleChangeHotel}
          className="hotelTitleInput"
        /><br />
        <label htmlFor="">Description:</label>
        <input
          type="text"
          placeholder="hotel Description(required)"
          id="desc"
          onChange={handleChangeHotel}
          className="hotelDescriptionInput"
        /><br />
        <label htmlFor="">Rating:</label>
        <input
          type="number"
          placeholder="hotel Rating[0 - 5](required)"
          id="rating"
          onChange={handleChangeHotel}
          className="hotelRatingInput"
        /><br />
        <label htmlFor="">CheapestPrice:</label>
         <input
          type="number"
          placeholder="Cheapest Price (required)"
          id="cheapestPrice"
          onChange={handleChangeHotel}
          className="hotelCheapestPriceInput"
        /><br />
        
        <br />
      <button onClick={inputHotelInfo}                  className="inputHotelButton">
                  Create a Hotel
                </button>
    </div><br/>






    <label htmlFor=""><h1>Room Information</h1></label><br />
      <div className="inputRoom">
        <label htmlFor="">In Hotel:  </label>
        <input
          type="text"
          placeholder="Hotel Name (required)"
          id="roomInHotel"
          onChange={handleChangeRoom}
          className="roomBelongHotelInput"
        /> <br />
        <label htmlFor="">Room Title:  </label>
        <input
          type="text"
          placeholder="Room title (required)"
          id="title"
          onChange={handleChangeRoom}
          className="roomTitleInput"
        /> <br />
        <label htmlFor=""> Price: </label>
        <input
          type="number"
          placeholder="room price (required)"
          id="price"
          onChange={handleChangeRoom}
          className="roomPriceInput"
        /><br />
        <label htmlFor="">Max People:</label>
        <input
          type="number"
          placeholder="# Max People (required)"
          id="maxPeople"
          onChange={handleChangeRoom}
          className="maxPeopleInput"
        /><br />
        <label htmlFor="">Description:</label>
        <input
          type="text"
          placeholder="Room Description (required)"
          id="desc"
          onChange={handleChangeRoom}
          className="roomDescriptionInput"
        /><br />
        
        
        <br />
      <button onClick={inputRoomInfo}                  className="inputRoomButton">
                  Add the room into a Hotel
                </button>
    </div><br/>

    </div>
  );
};

export default Input;
