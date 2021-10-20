import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: [],
    };
    this.updateLeaderboard = this.updateLeaderboard.bind(this);
  }

  componentDidMount() {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APPID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      encrypted: true,
    });
    this.channel = this.pusher.subscribe("auctions");

    this.channel.bind("updated", this.updateLeaderboard);
  }

  updateLeaderboard(newTask) {
    console.log(newTask);
    this.setState((prevState) => ({
      bids: newTask.bids,
    }));
  }

  render() {
    return <div>{console.log(this.bids)}</div>;
  }
}
