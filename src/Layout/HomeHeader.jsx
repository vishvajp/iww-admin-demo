import React from "react";
import "./HomeHeader.css";
import { useState, useContext } from "react";
// import saaluvar from "./loginimages/Prami-Final-Logo.png";
import saalu from "../Assets/Images/iww logo.png";
import { useNavigate } from "react-router-dom";
import cra from "../Assets/Images/CRA.jpg";
import itTech from "../Assets/Images/IT-Tech.jpg";
import precomtech from "../Assets/Images/precomtec.jpg";
import sutan from "../Assets/Images/Sutan.jpg";
import iww from "../Assets/Images/iww logo.png";
import { HeaderDataContext } from "../Context/HeaderContext";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    colorState,
    setColorState,
    logoImg,
    setLogoImg,
    headerTitle,
    setHeaderTitle,
  } = useContext(HeaderDataContext);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   const { baseUrl } = useContext(UserDataContext);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // console.log(headerTitle, colorState);

  return (
    <div className="home-header-height-100">
      <div className="d-flex flex-column home-header-height-90">
        <div className="d-flex flex-row align-items-center navbar  p-0">
          <div className="d-flex align-items-center home-header-left-logo-div">
            <img
              src={saalu}
              style={{
                width: "170px",
                padding: "8px",
                marginLeft: "20px",
                height: "100%",
              }}
            />
          </div>
          <div>
            <img className="home-header-middle-logo" src={logoImg}></img>
          </div>

          <div className="second-cont d-flex align-items-center">
            <div className="dropdown" style={{ minWidth: "250px" }}>
              <div
                className=" d-flex user-detail"
                style={{ borderRadius: "30px", cursor: "pointer" }}
                onClick={() => setOpen(!open)}
              >
                <div className="d-flex flex-column justify-content-center ">
                  <p className="text-end welcome mb-1">Welcome to</p>
                  <p className="mb-0 red-font fw-bold text-end">
                    {headerTitle}
                  </p>
                </div>
                <div>
                  <img
                    className="docimage ms-2"
                    src="https://images.unsplash.com/photo-1719937206642-ca0cd57198cc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    style={{ width: "45px", height: "45px" }}
                    alt="User"
                  />
                </div>

                {open && (
                  <ul
                    className="dropdown-menu show "
                    style={{ marginTop: "55px" }}
                  >
                    <div
                      className="d-flex align-items-center ps-1 mb-2"
                      onClick={(e) => {
                        setHeaderTitle("Iww Group Of Companies");
                        setColorState("#010b51");
                        setLogoImg("");
                      }}
                    >
                      <img src={iww} className="home-header-dropdown-img"></img>
                      <span className="dropdown-item ps-1">
                        Iww Group Of Companies
                      </span>
                    </div>
                    <div
                      className="d-flex align-items-center ps-1 mb-2"
                      onClick={(e) => {
                        setHeaderTitle("Cra Energy Solution");
                        setColorState("#08615f");
                        setLogoImg(cra);
                      }}
                    >
                      <img src={cra} className="home-header-dropdown-img"></img>
                      <span className="dropdown-item ps-1">
                        Cra Energy Solution
                      </span>
                    </div>
                    <div
                      className="d-flex align-items-center ps-1 mb-2"
                      onClick={(e) => {
                        setHeaderTitle("IT Tech");
                        setColorState("#4f5aa2");
                        setLogoImg(itTech);
                      }}
                    >
                      <img
                        src={itTech}
                        className="home-header-dropdown-img"
                      ></img>
                      <span className="dropdown-item ps-1">IT Tech</span>
                    </div>
                    <div
                      className="d-flex align-items-center ps-1 mb-2"
                      onClick={() => {
                        setHeaderTitle("Precomtech");
                        setColorState("#eb202a");
                        setLogoImg(precomtech);
                      }}
                    >
                      <img
                        src={precomtech}
                        className="home-header-dropdown-img"
                      ></img>
                      <span className="dropdown-item ps-1">Precomtech</span>
                    </div>
                    <div
                      className="d-flex align-items-center ps-1 mb-1"
                      onClick={(e) => {
                        setHeaderTitle("PT.SUTAN & HARITZ");
                        setColorState("#900a19");
                        setLogoImg(sutan);
                      }}
                    >
                      <img
                        src={sutan}
                        className="home-header-dropdown-img"
                      ></img>
                      <span className="dropdown-item ps-1">
                        PT.SUTAN & HARITZ
                      </span>
                    </div>
                  </ul>
                )}
              </div>
            </div>

            {/* <div
            className="drophead d-flex justify-content-end align-items-center px-0 "
            style={{ marginLeft: "-35px" }}
          >
            <MdArrowDropDownCircle
              className="pe-1 "
              style={{ width: "28px", height: "28px", color:"red" }}
            />
          </div> */}
            <div className="d-flex align-items-center logout-button-div">
              <button className="logout-button" onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: colorState, height: "10%" }}></div>
    </div>
  );
};

export default Header;
