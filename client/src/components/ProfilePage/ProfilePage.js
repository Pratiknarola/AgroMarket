// import "./App.css";
import { useState, useEffect } from "react";
import { Router } from "react-router";
import Login from "../Login/Login";
import PurchasedAuctionCard from "./components/PurchasedAuctionsCard";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
//get the data in here and then pass this to Card component

// role 
// username
// email id
// first name 
// last name
// array of auctions participated
// rating



const ProfilePage = () => {
  
  const [user, setUser] = useState(localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : {});
  const [auctionslist, setAuctionslist] = useState([]);

  useEffect(() => {
    if (!user) {
      return (
        <Router>
          <Login setUser={setUser} />
        </Router>
      );  
    }
  }, [user]);
  
  useEffect(() => {

    if(auctionslist.length === 0 || auctionslist === undefined) {
      user.auctionsParticipated.map((auction, index) => {
        axios.get(`http://localhost:8080/api/auction/id/${auction}`).then(res => {
          setAuctionslist((auctionslist) => auctionslist.concat(res.data));
        });
        console.log(auctionslist);
      })
    }
    return () => { setAuctionslist([]) }

  }, [])

  
  //   const user = {
  //     username: 'nelsonMandela',
  //     email: "nelsonMandela@gmail.com",
  //     status: 'Active',
  //     roles: "Buyer",
  //     firstname: "Nelson",
  //     lastname: "Mandela",
  //     rating : 4.5,
  //     auctionsParticipated : [{
  //       startdate : 123456789,
  //       duration : 123456789,
  //       harvestDate : "09/04/2021",
  //       crop : {

  //       },
  //       quantity : 1000,
  //       // Todo: Add owner here.
  //       description : "This is test auction",
  //       startprice : 9999,
  //       bids : [{
  //         bidby : 1919292,
  //         bidPrice : 10000,
  //         time : Number,
  //         // TODO : add auction objectID to identify
  //       },]
  //     },
  //     {
  //       startdate : 123456789,
  //       duration : 123456789,
  //       harvestdate : "09/04/2021",
  //       crop : {

  //       },
  //       quantity : 1000,
  //       // Todo: Add owner here.
  //       description : "This is test auction",
  //       startprice : 9999,
  //       bids : [{
  //         bidby : 1919292,
  //         bidPrice : 10000,
  //         time : Number,
  //         // TODO : add auction objectID to identify
  //       },]
  //     },
  //     {
  //       startdate : 123456789,
  //       duration : 123456789,
  //       harvestdate : "09/04/2021",
  //       crop : {

  //       },
  //       quantity : 1000,
  //       // Todo: Add owner here.
  //       description : "This is test auction",
  //       startprice : 9999,
  //       bids : [{
  //         bidby : 1919292,
  //         bidPrice : 10000,
  //         time : Number,
  //         // TODO : add auction objectID to identify
  //       },]
  //     }],
  // }

  // create a profile page with the following components using bootstrap
  // 1. Profile card
  // 2. Auction card
  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <ProfileCard user={user} />
          </div>
          <div className="col-md-8">
            <div className="row" style={{marginTop: "20px"}} >
              <div className="col-md-12">
                <h3>Auctions Participated</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                 {user.auctionsParticipated.length === 0 ? 
                  <div className="alert alert-info" role="alert">
                    You have not participated in any auction yet.
                  </div> 
                  :
                  auctionslist.map((auction, index) => {
                    return <AuctionCard key={index} auction={auction} index={index} />
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>

  );
};

const Header = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Profile Page</h1>
      </div>
    </div>
  );
};

const ProfileCard = ({ user }) => {
  return (
    <div className="card" style={{marginTop : "40px"}}>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
            <p>{user.status}</p>
            <p>{user.roles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const epochToDate = epoch => {
  const date = new Date(epoch);
  console.log("epoch to date", date)
  return date.toDateString()
};

const AuctionCard = ({user, auction, index}) => {
  console.log(`auction card ${index}`, auction); 
  return (
    <div className="card" style={{marginTop: "10px"}}>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://shop.jivabhumi.com/image/cache/catalog/Sonamasuri%20White%20Rice-500x350.jpeg"
              alt="Avatar"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <h3>Auction {index+1}</h3>
            <p>Auction Description: {auction.description} </p>
            <p>Start Date: {epochToDate(Number(auction.startdate))} </p>
            <p>End Date : {epochToDate(Number(auction.startdate) + Number(auction.duration) * 60)} </p>
            <p>Harvest Date : {auction.harvestdate?.split("T")[0]} </p>
            <p>Crop : {auction.crop?.name} </p>
            <p>Quantity : {auction.quantity} </p>
            <p>Start Price : {auction.startprice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default ProfilePage;
