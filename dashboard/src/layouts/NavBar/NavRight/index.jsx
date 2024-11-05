import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { handleToast } from "../../../utils/toast";
import { UserContext } from "../../../contexts/AuthContext";
import Cookies from "js-cookie";

const NavRight = () => {
  const { setUser, setLoginAuth } = React.useContext(UserContext);

  const status = useSelector((state) => state.staff.getMeStatus);
  const data = useSelector((state) => state.staff.data);
  const [profileData, setProfileData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success") {
      setProfileData(data);
    }
  }, [status, data]);

  const logoutme = () => {
    setLoginAuth(false);
    setUser({});
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    navigate("/");
    handleToast("success", "Logout successfully");
  };

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix="navbar-nav ml-auto">
        <ListGroup.Item as="li" bsPrefix="">
          <Dropdown align="end" className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#">
              <img
                src={profileData?.avatar || "/default-avatar.png"}
                className="img-radius wid-40"
                alt="User Profile"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img
                  src={profileData?.avatar || "/default-avatar.png"}
                  className="img-radius"
                  alt="User Profile"
                />
                <span>{profileData?.name || "Guest"}</span>
                <Link
                  to="#"
                  className="dud-logout"
                  title="Logout"
                  onClick={logoutme}
                >
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup as="ul" variant="flush" className="pro-body">
                <ListGroup.Item as="li">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-settings" /> Settings
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-mail" /> My Messages
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-lock" /> Lock Screen
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link className="dropdown-item" onClick={logoutme}>
                    <i className="feather icon-log-out" /> Logout
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavRight;
