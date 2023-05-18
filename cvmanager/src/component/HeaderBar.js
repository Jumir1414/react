import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const HeaderBar = ({ path, header }) => {
  if (path === "") {
    return (
      <div>
        <Row className="mt-2" style={{ width: "100%" }}>
          <Col>
            <h4>{header}</h4>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div>
        <Row className="mt-2" style={{ width: "100%" }}>
          <Col md={4}>
            <div>
              <Link
                to={path}
                style={{ textDecoration: "none", color: "green" }}
              >
                + Create
              </Link>
            </div>
          </Col>
          <Col>
            <h4>{header}</h4>
          </Col>
        </Row>
      </div>
    );
  }
};

export default HeaderBar;
