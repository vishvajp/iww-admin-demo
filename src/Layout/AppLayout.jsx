import React, { useState, useEffect,useContext  } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import HomeHeader from "./HomeHeader";
import { useNavigate, useLocation } from "react-router-dom";
import circleLogo from "../Assets/Images/circle-logo.png";
import { FaPlusCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdTableRows } from "react-icons/md";
import { PiTableBold } from "react-icons/pi";
import { FaMinusCircle } from "react-icons/fa";
import { HeaderDataContext } from "../Context/HeaderContext";

import "../Layout/AppLayout.css"
export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const { Header, Content, Sider, Footer } = Layout;
const {
    colorState,
    setColorState,
    
  } = useContext(HeaderDataContext);
  const [sidebar, setSidebar] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hanlesidebar = () => {
    console.log("team beam");
    setSidebar(!sidebar);
  };

  function getItem(label, key, visible, children) {
    const isSubMenuOpen = openKeys.includes(key);

    return {
      key,
      children,
      label: (
        <div className="menu-item-label">
          <span>{label}</span>
          {visible && (
            <div className="menu-icon-container">
              {isSubMenuOpen ? (
                <FaMinusCircle className="menu-plus-icon" />
              ) : (
                <img src={circleLogo} className="menu-plus-icon" />
              )}
            </div>
          )}
        </div>
      ),
    };
  }

  const val = [
    {
      menu_name: "Dashboard",
      menu_url: "dashboard",
      visible: true,
      submenuservice: [],
    },
    {
      menu_name: "Create Quotation",
      menu_url: "quotation",
      visible: true,
      // submenuservice: [
      //   {
      //     menu_name: "Admin Profile",
      //     menu_url: "home/profile",

      //     visible: false,
      //   },
      //   {
      //     menu_name: "Admin Setting",
      //     menu_url: "home/admin/adminsetting",
      //     visible: false,
      //   },
      //   {
      //     menu_name: "Access Control",
      //     menu_url: "home/admin/accesscontrol",
      //     visible: false,
      //   },
      //   {
      //     menu_name: "Login History",
      //     menu_url: "home/admin/profilehistory",
      //     visible: false,
      //   },
      // ],
    },

    // {
    //   menu_name: "Progress update",
    //   menu_url: "progress",
    //   visible: true,
      
    // },
    {
      menu_name: "Purchase & Payment ",
      menu_url: "payment",
      visible: true,
      submenuservice: [],
    },
    {
      menu_name: "Invoice",
      menu_url: "invoice",
      visible: true,
      submenuservice: [],
    },
   
    {
      menu_name: "Summary",
      menu_url: "summary",
      visible: true,
      submenuservice: [],
    },
    {
      menu_name: "Expense",
      menu_url: "expense",
      visible: true,
    },
    {
      menu_name: "Stock Management",
      menu_url: "stock",
      visible: true,
    },
    {
      menu_name: "Client Management",
      menu_url: "clients",
      visible: true,
      submenuservice: [
        {
          menu_name: "Client Details",
          menu_url: "client/details",
          visible: false,
        },
        {
          menu_name: "Client Credentials",
          menu_url: "client/credentials",
          visible: false,
        },
      ],
    },
    {
      menu_name: "Projects",
      menu_url: "projects",
      visible: true,
      submenuservice: [
        {
          menu_name: "Ongoing Projects",
          menu_url: "project/ongoing",
          visible: false,
        },
        {
          menu_name: "Project Costing Reports",
          menu_url: "project/costling",
          visible: false,
        },
        {
          menu_name: "Project Photos & Media",
          menu_url: "project/media",
          visible: false,
        },
        {
          menu_name: "Project Completion Certificates",
          menu_url: "project/certificate",
          visible: false,
        },
      ],
    },
    {
      menu_name: "Employees",
      menu_url: "employees",
      visible: true,
      submenuservice: [
        {
          menu_name: "Payroll",
          menu_url: "employee/payroll",
          visible: false,
        },
       
      ],
    },
    {
      menu_name: "Attendance",
      menu_url: "employee/attendence",
      visible: true,
      submenuservice: [
        {
          menu_name: "Monthly Meetings",
          menu_url: "meeting/details",
          visible: false,
        },
       
      ],
    },
    {
      menu_name: "Assets & Security",
      menu_url: "assets",
      visible: true,
      submenuservice: [
        {                                                           
          menu_name: "Asset Details",
          menu_url: "asset/details",
          visible: false,
        },
        {
          menu_name: "CCTV",
          menu_url: "asset/cctv",
          visible: false,
        },
       
      ],
    },
    {
      menu_name: "Supplier Management",
      menu_url: "/supplier",
      visible: true,
      submenuservice: [
        {
          menu_name: "Supplier Detail",
          menu_url: "supplier/details",
          visible: false,
        },
       
       
      ],
    },
    
  ];

  const items1 = val.map((item) => {
    if (item.submenuservice?.length === 0) {
      return getItem(item.menu_name, `/${item.menu_url}`, item.visible);
    } else {
      return getItem(
        item.menu_name,
        `/${item.menu_url}`,
        item.visible,
        item.submenuservice?.map((submenu) =>
          getItem(submenu.menu_name, `/${submenu.menu_url}`, submenu.visible)
        )
      );
    }
  });

  const location = useLocation();
  const locationUrl = location.pathname;
  const checklocation = locationUrl
    .slice(1)
    .split("")
    .map((team, index) => (index === 0 ? team.toUpperCase() : team))
    .join("");

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const handleMenuClick = ({ key, keyPath }) => {
    const clickedItem = val.find(
      (item) => `/${item.menu_url}` === keyPath[keyPath.length - 1]
    );

    // If the clicked item is a top-level menu item and has no submenus, close the menu
    if (
      !clickedItem ||
      (clickedItem.submenuservice?.length === 0 && keyPath.length === 1)
    ) {
      setOpenKeys([]); // Close all submenus
    }

    navigate(key);
  };
  return (
    <Layout>
      <Header className="bg-light">
        <HomeHeader />
      </Header>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className="applayout-ant-sider"
          style={{
            width: 250,
            boxShadow: "0px 1px 5px gray",
            display: isMobile ? (sidebar ? "block" : "none") : "block",
            backgroundColor:colorState
          }}
        >
          <div className="d-flex justify-content-end menuhead align-items-center ms-3">
            <img
              className="docimage ms-2"
              src="https://images.unsplash.com/photo-1719937206642-ca0cd57198cc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style={{ width: "40px", height: "40px" }}
              alt="Profile"
            />
            <div className="vertical-line"></div>
            <div className="d-flex flex-column w-100">
              <p className="m-0 p-0 docname">Mr. Username</p>
              <p className="mb-0 d-flex welcome text-black">Role</p>
            </div>
          </div>
          <Menu
            style={{ marginTop: "3px" }}
            onClick={handleMenuClick}
            selectedKeys={[location.pathname]} // Set the default selected key here
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            mode="inline"
            items={items1}
          />
        </Sider>
        <Layout className="ant-sider-layeout" style={{ flex: 1 }}>
          <div className="d-flex" onClick={hanlesidebar}>
            {sidebar ? (
              <PiTableBold className="closetab" />
            ) : (
              <MdTableRows className="opentab" />
            )}
          </div>
          <Layout>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <FaHome className="me-1" />
                {checklocation}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Content>
              <div className="content-wrapper mb-3 ms-0">{children}</div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Footer
        className="antfooter"
        style={{
          textAlign: "center",
        }}
      >
        ©{new Date().getFullYear()}.saaluvar.com
      </Footer>
    </Layout>
  );
}
