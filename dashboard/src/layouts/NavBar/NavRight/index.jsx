import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useAuth } from "../../../contexts/AuthContext";
import { handleToast } from "../../../utils/toast";
import { getMe, logout as handleLogout } from "../../../redux/slices/staff";

// Custom hook for handling user profile fetching and logout
const useUserProfile = (dispatch, profile, status, data) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (profile?.isBlocked) {
      logout();
      navigate("/");
    }
    if (profile) {
      setProfileData(profile);
    }
    if (profile === undefined) {
      const token = Cookies.get("refreshToken");
      dispatch(getMe({ token }));
    }
  }, [navigate, profile, logout, dispatch]);

  useEffect(() => {
    if (status === "failed") {
      handleToast("error", "Get profile failed", "top-right");
    }
    if (status === "success") {
      setProfileData(data);
    }
  }, [status, data, profile]);

  const logoutme = () => {
    dispatch(handleLogout()).then((result) => {
      if (result.type === "staff/logout/fulfilled") {
        handleToast("success", "Logout successful", "top-right");
        logout();
        navigate("/");
      } else {
        handleToast("error", "Logout failed", "top-right");
      }
    });
  };

  return { profileData, logoutme };
};

// In the NavRight component
const NavRight = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.staff.me?.staffData);
  const status = useSelector((state) => state.staff.getMeStatus);
  const data = useSelector((state) => state.staff.me.staffData);
  const { profileData, logoutme } = useUserProfile(
    dispatch,
    profile,
    status,
    data
  );
  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto">
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="end" className="drp-user">
            <Dropdown.Toggle
              as={Link}
              variant="link"
              to="#"
              id="dropdown-basic"
            >
              <img
                src={profileData?.avatar}
                className="img-radius wid-40"
                alt="User Profile"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img
                  src={profileData?.avatar}
                  className="img-radius"
                  alt="User Profile"
                />
                <span>{profileData?.name}</span>
                <Link to="#" className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup
                as="ul"
                bsPrefix=" "
                variant="flush"
                className="pro-body"
              >
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-settings" /> Settings
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-mail" /> My Messages
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-lock" /> Lock Screen
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link className="dropdown-item" onClick={logoutme}>
                    <i className="feather icon-log-out" />
                    Logout
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
