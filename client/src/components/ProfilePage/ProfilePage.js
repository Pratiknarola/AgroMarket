// import "./App.css";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import AuctionCard from "./components/AuctionCard";
import PurchasedAuctionCard from "./components/PurchasedAuctionsCard";

//get the data in here and then pass this to Card component

// role 
// username
// email id
// first name 
// last name
// array of auctions participated
// rating



const ProfilePage = ({ user }) => {
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

  return (
    <div>
      <Header />
      <div className="container" style={{ justifyContent: "space-evenly" }}>
        {/* TODO add user here as param like <ProfileCard user /> */}
        <ProfileCard user={user} />
        <AuctionCard user={user} />
        {/* TODO : Uncomment this when user specific task is given<PurchasedAuctionCard user = {user}/> */}
      </div>
    </div>
  );
};

export default ProfilePage;
