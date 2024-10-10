import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// react-bootstrap
import { ListGroup, Dropdown, Card } from "react-bootstrap";

// third party
import PerfectScrollbar from "react-perfect-scrollbar";

// project import
import ChatList from "./ChatList";

// assets
import avatar1 from "../../../assets/user/avatar-1.jpg";
import avatar2 from "../../../assets/user/avatar-2.jpg";
import avatar3 from "../../../assets/user/avatar-3.jpg";
import avatar4 from "../../../assets/user/avatar-4.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout as handleLogout } from "./../../../redux/slices/staff";
import { Button } from "@mui/material";
import { handleToast } from "../../../utils/toast";
import { useAuth } from "../../../contexts/AuthContext";

// ==============================|| NAV RIGHT ||============================== //

const NavRight = () => {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [listOpen, setListOpen] = useState(false);
  const profile = useSelector((state) => state.staff.me?.staffData);

  const notiData = [
    {
      name: "Joseph William",
      image: avatar2,
      details: "Purchase New Theme and make payment",
      activity: "30 min",
    },
    {
      name: "Sara Soudein",
      image: avatar3,
      details: "currently login",
      activity: "30 min",
    },
    {
      name: "Suzen",
      image: avatar4,
      details: "Purchase New Theme and make payment",
      activity: "yesterday",
    },
  ];

  const logoutme = () => {
    dispatch(handleLogout()).then((result) => {
      if (result.type === "staff/logout/fulfilled") {
        handleToast("success", "Logout successful", "top-right");
        logout();
        navigation("/login");
      } else {
        handleToast("error", "Logout failed", "top-right");
      }
    });
  };
  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto">
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="end">
            <Dropdown.Toggle
              as={Link}
              variant="link"
              to="#"
              id="dropdown-basic"
            >
              <i className="feather icon-bell icon" />
              <span className="badge rounded-pill bg-danger">
                <span />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu
              align="end"
              className="notification notification-scroll"
            >
              <div className="noti-head">
                <h6 className="d-inline-block m-b-0">Notifications</h6>
                <div className="float-end">
                  <Link
                    to="#"
                    style={{ textDecoration: "none" }}
                    className="m-r-10"
                  >
                    mark as read
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="#">
                    clear all
                  </Link>
                </div>
              </div>
              <PerfectScrollbar>
                <ListGroup
                  as="ul"
                  bsPrefix=" "
                  variant="flush"
                  className="noti-body"
                >
                  <ListGroup.Item as="li" bsPrefix=" " className="n-title">
                    <p className="m-b-0">NEW</p>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" " className="notification">
                    <Card
                      className="d-flex align-items-center shadow-none mb-0 p-0"
                      style={{ flexDirection: "row", backgroundColor: "unset" }}
                    >
                      <img
                        className="img-radius"
                        src={avatar1}
                        alt="Generic placeholder"
                      />
                      <Card.Body className="p-0">
                        <p>
                          <strong>John Doe</strong>
                          <span className="n-time text-muted">
                            <i className="icon feather icon-clock me-2" />
                            30 min
                          </span>
                        </p>
                        <p>New ticket Added</p>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" " className="n-title">
                    <p className="m-b-0">EARLIER</p>
                  </ListGroup.Item>
                  {notiData.map((data, index) => {
                    return (
                      <ListGroup.Item
                        key={index}
                        as="li"
                        bsPrefix=" "
                        className="notification"
                      >
                        <Card
                          className="d-flex align-items-center shadow-none mb-0 p-0"
                          style={{
                            flexDirection: "row",
                            backgroundColor: "unset",
                          }}
                        >
                          <img
                            className="img-radius"
                            src={data.image}
                            alt="Generic placeholder"
                          />
                          <Card.Body className="p-0">
                            <p>
                              <strong>{data.name}</strong>
                              <span className="n-time text-muted">
                                <i className="icon feather icon-clock me-2" />
                                {data.activity}
                              </span>
                            </p>
                            <p>{data.details}</p>
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </PerfectScrollbar>
              <div className="noti-footer">
                <Link to="#">show all</Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown>
            <Dropdown.Toggle
              as={Link}
              variant="link"
              to="#"
              className="displayChatbox"
              onClick={() => setListOpen(true)}
            >
              <i className="icon feather icon-mail" />
              <span className="badge bg-success">
                <span />
              </span>
            </Dropdown.Toggle>
          </Dropdown>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="end" className="drp-user">
            <Dropdown.Toggle
              as={Link}
              variant="link"
              to="#"
              id="dropdown-basic"
            >
              <img
                src={profile?.avatar}
                className="img-radius wid-40"
                alt="User Profile"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img
                  src={profile?.avatar}
                  className="img-radius"
                  alt="User Profile"
                />
                <span>{profile?.name}</span>
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
                  <Button className="dropdown-item" onClick={logoutme}>
                    <i className="feather icon-log-out" />
                    Logout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;
