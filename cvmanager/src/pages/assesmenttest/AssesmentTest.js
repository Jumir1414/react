import React, { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import HeaderBar from "../../component/HeaderBar";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "../../component/Table";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
const AssesmentTest = () => {
  const [datas, setDatas] = useState([]);
  const [pending, setPending] = useState(true);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUid(id);
    setShow(true);
  };
  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/assesmentTest`
      );
      setDatas(response.data);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  }, [datas]);

  useEffect(() => {
    getData();
  }, []);

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#b2b8be",
      },
    },
  };

  const handleDelete = () => {
    handleClose();
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/assesmentTest/` + uid)
      .then((res) => {
        alert("Interviewer has been Deleted");
        getData();
      });
  };

  const columns = [
    {
      name: "Applicant's Name",
      selector: (row) => row.applicantName,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Evaluation",
      selector: (row) => row.evaluation,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="action">
          <button
            onClick={(e) => handleShow(row.id)}
            className="btn btn-sm  btn-danger"
          >
            Delete
          </button>

          <Link to={`editat/${row.id}`} className="btn btn-sm ms-1 btn-success">
            Edit
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Container fluid>
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            Are You Sure To Delete??
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Are you sure?</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <HeaderBar path={"createat"} header={"Assessment Test"} />
      <div className="custom-data-table-container">
        <Table
          columns={columns}
          data={datas}
          pagination
          customStyles={tableCustomStyles}
          highlightOnHover="true"
          className="custom-data-table"
          fixedHeader
          fixedHeaderScrollHeight="500px"
          progressPending={pending}
          progressComponent={
            <div className="mt-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        />
      </div>
    </Container>
  );
};

export default AssesmentTest;
