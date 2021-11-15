import React from "react";
import AuctionTile from "./AuctionTile";

const AuctionCard = ({ user }) => {
  return (
    <div
      className="card_container padding10 "
      style={{ maxHeight: "800px", minWidth: "300px", display: "flex" }}
    >
      <div>
        <h4 style={{ color: "grey", justifyContent: "center" }}>
          {user.roles == "Farmer" ? "My Auctions" : "Participated Auctions"}{" "}
        </h4>

        <div style={{ overflow: "auto", maxHeight: "300px" }}>
          {user.auctionsParticipated? user.auctionsParticipated.map((item, index) => (
            <div key={index} style={{ margin: "10px" }}>
              <AuctionTile auction={item} />
              <div
                style={{
                  border: "1px solid grey",
                  margin: "5px",
                  opacity: 0.3,
                }}
              />
              </div>
          )) : 
          <div style={{ margin: "10px" }}>
            <h4>No Auctions Participated</h4>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
