import React from "react";
import AuctionTile from "./AuctionTile";

const PurchasedAuctionCard = ({ user }) => {
  return (
    <div
      className="card_container padding10 "
      style={{ maxHeight: "400px", minWidth: "300px" }}
    >
      <div>
        <h4 style={{ color: "grey", justifyContent: "center" }}>
          {user.roles == "Farmer" ? "My Auctions" : "Participated Auctions"}{" "}
        </h4>

        <div style={{ overflow: "auto", maxHeight: "300px" }}>
          {user.auctionsParticipated.map((item, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchasedAuctionCard;
