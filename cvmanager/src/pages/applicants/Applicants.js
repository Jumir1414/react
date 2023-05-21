import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import HeaderBar from "../../component/HeaderBar";
import Spinner from "react-bootstrap/Spinner";

import { Link } from "react-router-dom";
import Table from "../../component/Table";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import useFetch from "../../utilities/useFetch";
import useDelete from "../../utilities/useDelete";
const Applicants = () => {
  const [filterDatas, setFilterDatas] = useState([]);
  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);
  const [uid, setUid] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUid(id);
    setShow(true);
  };

  const { datas, loading, refetch } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/applicants`
  );
  const { deleteData } = useDelete();
  useEffect(() => {
    const result = datas.filter((data) => {
      return (
        data.fullName.toLowerCase().includes(search.toLowerCase()) ||
        data.technology.toLowerCase().includes(search.toLowerCase()) ||
        data.position.toLowerCase().includes(search.toLowerCase())
      );
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
  const conditionalRowStyles = [
    {
      when: (row) => row.status === "Blacklisted",
      style: {
        backgroundColor: "red",
      },
    },
  ];
  const handleDelete = () => {
    handleClose();

    deleteData(
      `${process.env.REACT_APP_BASE_URL}/applicants/`,
      uid,
      "Applicant has been Deleted"
    );
    refetch();
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Technology",
      selector: (row) => row.technology,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row) => row.position,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
            to={`editapplicant/${row.id}`}
            className="btn btn-sm ms-1 btn-success"
          >
            Edit
          </Link>
          <Link
            to={`viewapplicant/${row.id}`}
            className="btn btn-sm  btn-secondary"
          >
            View
          </Link>
          {/* <Link>View</Link> */}
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
      <HeaderBar path={"createapplicant"} header={"Applicants List"} />
      <div className="custom-data-table-container">
        <Table
          columns={columns}
          data={search === "" ? datas : filterDatas}
          conditionalRowStyles={conditionalRowStyles}
          pagination
          customStyles={tableCustomStyles}
          highlightOnHover="true"
          className="custom-data-table"
          fixedHeader
          fixedHeaderScrollHeight="400px"
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
};

export default Applicants;
