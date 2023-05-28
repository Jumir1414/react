import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const HeaderBar = ({ path, header }) => {
  let data = JSON.parse(localStorage.getItem("UserInfo"));

  return (
    <div>
      <Row className="mt-2 mb-2" style={{ width: "100%" }}>
        <Col md={4}>
          <div>
            <Link
              to={path}
              style={{
                textDecoration: "none",
                color: "green",
                fontSize: "1.5rem",
              }}
            >
              + Create
            </Link>
          </div>
        </Col>
        <Col className="text-center">
          <h4>{header}</h4>
        </Col>
        <Col className="d-flex justify-content-end">
          <div className="d-flex align-items-center">
            <span className="dataLabel">Signed in as:</span>{" "}
            <div className="m-2"> {data.name.toUpperCase()}</div>
            <img src={data.image} alt="userpic" className="userimg" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderBar;
