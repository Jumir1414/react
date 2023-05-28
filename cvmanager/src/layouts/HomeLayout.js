import React from "react";
import { Stack, Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SideNavBar from "../component/SideNavBar";
import LogoutButton from "../component/LogoutButton";
import { Link } from "react-router-dom";
import Logo from "../assets/Amnillogo.png";
const HomeLayout = () => {
  return (
    <div className="home-layout">
      <Container fluid style={{ height: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col
            className="sidenav"
            sm={3}
            style={{ width: "20%", height: "100%" }}
          >
            <Stack gap={3}>
              <div>
                <Link to="../home">
                  <img
                    src={Logo}
                    width="171"
                    height="51"
                    className="d-inline-block align-top"
                    alt="logo"
                  />
                </Link>
              </div>
              <SideNavBar />
              <div
                className="nav-button"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <LogoutButton />
              </div>
            </Stack>
          </Col>
          <Col
            sm={9}
            style={{
              width: "80%",
              height: "100%",
              overflowY: "scroll",
            }}
          >
            <div>
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeLayout;
