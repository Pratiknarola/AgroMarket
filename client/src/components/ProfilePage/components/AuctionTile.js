import React from "react";

const AuctionTile = ({ auction }) => {
  console.log(auction);

  var date = new Date(auction.startdate * 1000);

  console.log(date.toString());

  return (
    <div style={{ justifyContent: "space-around", display: "flex" }}>
      <p style={{ overflow: "auto" }}>{auction.description}</p>

      <p style={{ marginLeft: "10px" }}>
        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
      </p>
    </div>
  );
};

export default AuctionTile;
