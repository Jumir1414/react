import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import HeaderBar from "../../component/HeaderBar";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "../../component/Table";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
const Applicants = () => {
  const [datas, setDatas] = useState([]);
  const [filterDatas, setFilterDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [pending, setPending] = useState(true);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUid(id);
    setShow(true);
  };
  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/applicants`
      );
      setDatas(response.data);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = datas.filter((data) => {
      return (
        data.fullName.toLowerCase().includes(search.toLowerCase()) ||
        data.technology.toLowerCase().includes(search.toLowerCase()) ||
        data.position.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilterDatas(result);
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
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/applicants/` + uid)
      .then((res) => {
        alert("Applicant has been Deleted");
        getData();
      });
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
          pagination
          customStyles={tableCustomStyles}
          highlightOnHover="true"
          className="custom-data-table"
          fixedHeader
          fixedHeaderScrollHeight="400px"
          progressPending={pending}
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
