import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import useFetch from "../utilities/useFetch";
import Spinner from "react-bootstrap/Spinner";
import { NavLink } from "react-router-dom";
import ErrorMsg from "../component/ErrorMsg";
import { Bar, Pie } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJs } from "chart.js/auto";
const Home = () => {
  let data = JSON.parse(localStorage.getItem("UserInfo"));
  const [search, setSearch] = useState("");
  const [filterDatas, setFilterDatas] = useState([]);
  const { datas, loading, error, refetch } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/applicants`
  );
  useEffect(() => {
    const result = datas.filter((data) => {
      return data.fullName.toLowerCase().includes(search.toLowerCase());
    });
    setFilterDatas(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const technologyCount = datas.reduce((count, person) => {
    const { technology } = person;
    count[technology] = (count[technology] || 0) + 1;
    return count;
  }, {});
  const result = Object.entries(technologyCount).map(([technology, count]) => ({
    label: technology,
    count: count,
  }));

  let chartData = {
    labels: result.map((label) => label.label),

    datasets: [
      {
        label: "Applicants",
        data: result.map((count) => count.count),
        backgroundColor: [
          "#ca7579",
          "#f8c291",
          "#6ab04c",
          "#2c3e50",
          "#3498db",
          "#f39c12",
          "#8e44ad",
          "#2980b9",
          "black",
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          // This more specific font property overrides the global property
          fontColor: "black",
          fontWeight: "bold",
        },
      },
      datalabels: {
        color: "#fff",
        anchor: "end",
        align: "start",
        offset: 10,
        font: {
          weight: "bold",
        },
        formatter: (value) => {
          return value + " applicants";
        },
      },
    },
  };

  const statusCount = datas.reduce((count, person) => {
    const { status } = person;
    count[status] = (count[status] || 0) + 1;
    return count;
  }, {});
  const result2 = Object.entries(statusCount).map(([status, count]) => ({
    label: status,
    count: count,
  }));

  let chartData2 = {
    labels: result2.map((label) => label.label),

    datasets: [
      {
        label: "Status",
        data: result2.map((count) => count.count),
        backgroundColor: ["grey"],
      },
    ],
  };
  const options2 = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const positionCount = datas.reduce((count, person) => {
    const { position } = person;
    count[position] = (count[position] || 0) + 1;
    return count;
  }, {});
  const result3 = Object.entries(positionCount).map(([position, count]) => ({
    label: position,
    count: count,
  }));

  if (loading) {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-5 ">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }
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
      <Row>
        <Navbar bg="white" style={{ width: "100%", height: "4rem" }}>
          <Container>
            <div className="searchcontainer">
              <div className="search">
                <div className="searchicon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input
                  className="Searchinput"
                  placeholder="Search Applicants"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {search && (
                <div className="Searchresult">
                  {filterDatas.length === 0 ? (
                    <div>Applicant not found</div>
                  ) : (
                    filterDatas.map((data) => (
                      <li key={data.id} style={{ listStyle: "none" }}>
                        <NavLink to={`../applicant/viewapplicant/${data.id}`}>
                          {data.fullName}{" "}
                        </NavLink>
                      </li>
                    ))
                  )}
                </div>
              )}
            </div>
            <Navbar.Collapse className="justify-content-end">
              <div className="d-flex align-items-center">
                <span className="dataLabel">Signed in as:</span>{" "}
                <div className="m-2"> {data.name.toUpperCase()}</div>
                <img src={data.image} alt="userpic" className="userimg" />
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Row className="m-2">
            <h4>Total number of Applicants : {datas.length}</h4>
          </Row>
          <Row className="m-2 text-center ">
            <Col sm={6}>
              <h4>Status of applicants</h4>
              <div style={{ height: "300px" }}>
                <Bar data={chartData2} options={options2} />
              </div>
            </Col>
            <Col sm={6}>
              <h4>Number of applicants in Different technologies</h4>
              <div style={{ height: "250px" }}>
                <Pie data={chartData} options={options} />
              </div>
            </Col>
          </Row>
          <Row className="m-3">
            <Col>
              <h4>Applied Positions Number</h4>
              <div>
                {result3.map((position) => (
                  <h6>
                    <span className="dataLabel">{position.label} :</span>
                    {position.count}
                  </h6>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
};

export default Home;
