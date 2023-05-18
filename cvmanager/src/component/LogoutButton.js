import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const LogoutButton = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    navigate("/");
    handleClose();
  };

  return (
    <>
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            Confirm Logout ??
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Are you sure?</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Button variant="secondary" onClick={handleShow}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default LogoutButton;
