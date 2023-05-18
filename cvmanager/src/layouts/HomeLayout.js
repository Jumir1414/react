import React from "react";
import { Stack, Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SideNavBar from "../component/SideNavBar";
import LogoutButton from "../component/LogoutButton";
const HomeLayout = () => {
  let data = JSON.parse(localStorage.getItem("UserInfo"));
  return (
    <div className="home-layout">
      <Container fluid style={{ height: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col className="sidenav" sm={3} style={{ width: "20%" }}>
            <Stack className="mt-3" gap={3}>
              <div className="header">
                <span style={{ display: "flex", marginBottom: "2px" }}>
                  <h5>Manager : {data.name.toUpperCase()} </h5>
                </span>
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
          <Col sm={9} style={{ width: "80%" }}>
            <Container fluid>
              <Outlet />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeLayout;
