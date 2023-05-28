import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import HeaderBar from "../../component/HeaderBar";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Table from "../../component/Table";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import useFetch from "../../utilities/useFetch";
import useDelete from "../../utilities/useDelete";
import ErrorMsg from "../../component/ErrorMsg";
const AssesmentTest = () => {
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState("");
  const [filterDatas, setFilterDatas] = useState([]);
  const [search, setSearch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUid(id);
    setShow(true);
  };

  const { datas, loading, error, refetch } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/assesmentTest`
  );
  const { deleteData } = useDelete();
  useEffect(() => {
    const result = datas.filter((data) => {
      return data.applicantName.toLowerCase().includes(search.toLowerCase());
    });
    setFilterDatas(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
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
    deleteData(
      `${process.env.REACT_APP_BASE_URL}/assesmentTest/${uid}`,

      "Assessment Test has been deleted"
    );
    refetch();
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

  if (error) {
    return (
      <div>
        <ErrorMsg msg={error.message} />
        <div className="text-center">
          <button onClick={refetch} className="btn btn-primary ">
            Reload
          </button>
        </div>
      </div>
    );
  } else {
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
            data={search === "" ? datas : filterDatas}
            pagination
            customStyles={tableCustomStyles}
            highlightOnHover="true"
            className="custom-data-table"
            fixedHeader
            fixedHeaderScrollHeight="500px"
            progressPending={loading}
            progressComponent={
              <div className="mt-4">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            }
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search Here"
                className="w-25 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </Container>
    );
  }
};

export default AssesmentTest;
