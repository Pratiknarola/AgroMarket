import {
  AiOutlineUser,
  FcRating,
  HiUserCircle,
  MdEmail,
  GrStatusGood,
  GrStatusCritical,
} from "react-icons/all";
const ProfileCard = ({ user }) => {
  return (
    <div className="card_container ">
      <img
        src="https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Corbis-TL007642_brkxd1.jpg"
        className="imgStyle"
      />
      <div style={{ display: "table", margin: "0 auto" }}>
        <h5 style={h5Style}>
          <AiOutlineUser style={{ marginRight: "5px" }} />
          {user.firstname} {user.lastname}
        </h5>
        <h5
          style={
            user.rating > 3.8
              ? greenStyle
              : user.rating <= 2.0
              ? redStyle
              : yellowStyle
          }
        >
          <FcRating style={{ marginRight: "5px" }} />
          <span>{user.rating}</span>
        </h5>
        <h5 style={h5Style}>
          <HiUserCircle style={{ marginRight: "5px" }} />
          {user.username}
        </h5>
        <h5 style={h5Style}>
          <MdEmail style={{ marginRight: "5px" }} />
          {user.email}
        </h5>
        <h5 style={user.status == "Active" ? greenStyle : redStyle}>
          {user.status == "Active" ? (
            <GrStatusGood style={{ marginRight: "5px" }} />
          ) : (
            <GrStatusCritical style={{ marginRight: "5px" }} />
          )}
          {user.status}
        </h5>
        <h5 style={h5Style}>{user.roles}</h5>
      </div>
    </div>
  );
};

const greenStyle = {
  color: "green",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
};

const yellowStyle = {
  color: "yellow",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
};

const redStyle = {
  color: "red",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
};

const h5Style = {
  color: "grey",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
};

ProfileCard.defaultProps = {
  user: {
    username: "nelsonMandela",
    email: "nelsonMandela@gmail.com",
    status: "Pending",
    roles: "Buyer",
    firstname: "Nelson",
    lastname: "Mandela",
    rating: 4.5,
  },
};

export default ProfileCard;
