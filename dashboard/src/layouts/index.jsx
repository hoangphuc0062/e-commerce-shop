/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef } from "react";
import * as actionType from "../store/actions";
import useWindowSize from "./../hooks/useWindowSize";
import useOutsideClick from "./../hooks/useOutsideClick";
import Breadcrumb from "./Breadcrumb";
import { ConfigContext } from "../contexts/ConfigContext";
import { Outlet } from "react-router-dom";
import getNavigationByRole from "./role";
import Cookies from "js-cookie";
import ROLE from "../config/role";

const AdminLayout = () => {
  const windowSize = useWindowSize();
  const ref = useRef();
  const { state, dispatch } = useContext(ConfigContext);
  const { collapseMenu, layout } = state;

  useOutsideClick(ref, () => {
    if (collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  });

  useEffect(() => {
    if (windowSize.width > 992 && windowSize.width <= 1024) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }

    if (windowSize.width < 992) {
      dispatch({ type: actionType.CHANGE_LAYOUT, layout: "vertical" });
    }
  }, [dispatch, layout, windowSize]);

  const mobileOutClickHandler = () => {
    if (windowSize.width < 992 && collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  };

  // const role = JSON.parse(localStorage.getItem("role"));

  const role = Cookies.get("role");
  const common = getNavigationByRole(ROLE[role]);

  let outSideClass = ["nav-outside"];
  if (collapseMenu) {
    outSideClass = [...outSideClass, "mob-backdrop"];
  }
  outSideClass = [...outSideClass, "mob-fixed"];

  return (
    <React.Fragment>
      {windowSize.width < 992 ? (
        <div className={outSideClass.join(" ")} ref={ref}>
          {common}
        </div>
      ) : (
        common
      )}
      <div
        className="pcoded-main-container"
        onClick={mobileOutClickHandler}
        onKeyDown={mobileOutClickHandler}
      >
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <Breadcrumb />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
