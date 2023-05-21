import React, { useState } from "react";
import { Container } from "react-bootstrap";
import HeaderBar from "../../component/HeaderBar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "../../component/Table";
import { Link } from "react-router-dom";
import useFetch from "../../utilities/useFetch";
import useDelete from "../../utilities/useDelete";
const Interview = () => {
  const [lgShow, setLgShow] = useState(false);
  const localizer = momentLocalizer(moment);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUid(id);
    setShow(true);
  };
  const { deleteData } = useDelete();
  const handleDelete = () => {
    handleClose();

    deleteData(
      `${process.env.REACT_APP_BASE_URL}/interview/`,
      uid,
      "Applicant has been Deleted"
    );
    refetch();
  };

  const { datas, loading, refetch } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/interview`
  );

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#b2b8be",
      },
    },
  };
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Date and Time",
      selector: (row) => row.date,
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
          <Link
            to={`editinterview/${row.id}`}
            className="btn btn-sm ms-1 btn-success"
          >
            Edit
          </Link>
          <Link
            to={`viewinterview/${row.id}`}
            className="btn btn-sm  btn-secondary"
          >
            View
          </Link>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-5 ">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  } else {
    let events = [];
    datas.map((data) => {
      return (events = [
        {
          title: data.title,
          start: new Date(data.date),
          end: new Date(data.date),
        },
        ...events,
      ]);
    });

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

        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Calender
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              // views={["month", "agenda"]}
              style={{ height: 450 }}
            />
          </Modal.Body>
        </Modal>
        <HeaderBar path={"createinterview"} header={"Interview"} />
        <div>
          <Button onClick={() => setLgShow(true)}>Show Calender</Button>
        </div>
        <div className="custom-data-table-container mt-3">
          <Table
            columns={columns}
            data={datas}
            customStyles={tableCustomStyles}
            pagination
            highlightOnHover="true"
            className="custom-data-table"
            fixedHeader
            fixedHeaderScrollHeight="400px"
          />
        </div>
      </Container>
    );
  }
};

export default Interview;
