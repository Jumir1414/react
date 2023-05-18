import React from "react";
import { Container, Table } from "react-bootstrap";
import HeaderBar from "../../component/HeaderBar";

const ApplicantWithExperience = () => {
  return (
    <Container fluid>
      <HeaderBar path={""} header={"Applicant With Experience"} />
      {/* <Container fluid>
        <h2>Applicant With Experience</h2>
        <div className="topbar ">
          <CreateButton path={"createawe"} />
          <div className="search ">
            <input className="search-input" type="text" />
            <Button className="search-btn">
              <i className="fa-solid fa-magnifying-glass" />
            </Button>
          </div>
          ;
        </div>
      </Container> */}
      <Container fluid>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>ju@gmail.com</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default ApplicantWithExperience;
