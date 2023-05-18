import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from 'react-bootstrap';





const Table = () => {
const data = [
    {
        "id": 631667,
        "name": "Chaanakya Menon",
        "email": "menon_chaanakya@boyer-ohara.org",
        "gender": "female",
        "status": "inactive"
    },
    {
        "id": 631666,
        "name": "Daevika Arora DDS",
        "email": "dds_arora_daevika@kunde.info",
        "gender": "male",
        "status": "inactive"
    },
    {
        "id": 631665,
        "name": "Avadhesh Nair",
        "email": "avadhesh_nair@daugherty.info",
        "gender": "female",
        "status": "inactive"
    },
    {
        "id": 631246,
        "name": "Aasa Kocchar",
        "email": "kocchar_aasa@conroy-krajcik.io",
        "gender": "male",
        "status": "active"
    },
    {
        "id": 630833,
        "name": "Dhyaneshwar Dhawan",
        "email": "dhawan_dhyaneshwar@okuneva.net",
        "gender": "female",
        "status": "inactive"
    },
    {
        "id": 630831,
        "name": "Vaidehi Abbott DVM",
        "email": "vaidehi_abbott_dvm@abernathy.name",
        "gender": "male",
        "status": "inactive"
    },
    {
        "id": 628899,
        "name": "Bhagirathi Gowda V",
        "email": "bhagirathi_gowda_v@gorczany-nicolas.biz",
        "gender": "male",
        "status": "inactive"
    },
    {
        "id": 628898,
        "name": "Ramesh Gupta",
        "email": "ramesh_gupta@koelpin.biz",
        "gender": "female",
        "status": "inactive"
    },
    {
        "id": 628896,
        "name": "Aalok Singh DVM",
        "email": "dvm_singh_aalok@upton-lehner.info",
        "gender": "female",
        "status": "active"
    },
    {
        "id": 628895,
        "name": "Chapal Trivedi MD",
        "email": "trivedi_md_chapal@watsica-thompson.net",
        "gender": "male",
        "status": "active"
    }
];

    const StatusFormatter = (cell, row) => {
  if (row.status === "active") {
    return <div style={{ backgroundColor: "green", borderRadius: "50%", width: "10px", height: "10px" }}></div>
  } else {
    return <div style={{ backgroundColor: "red", borderRadius: "50%", width: "10px", height: "10px" }}></div>
  }
};

    const columns = [
  {
    dataField: 'id',
    text: 'ID',
   
  },
  {
    dataField: 'name',
    text: 'Name',
    sort: true
  },
  {
    dataField: 'email',
    text: 'Email',
    
  },
  {
    dataField: 'gender',
    text: 'Gender',
    
  },
  {
    dataField: 'status',
    text: 'Status',
    formatter: StatusFormatter,
    
  },
  {
    dataField: 'actions',
    text: 'Actions',
    formatter: (cell,row) => (
      <div>
        <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(row)} >Edit</Button>
        <Button variant="danger" size="sm" className="me-2" >Delete</Button>
        <Button variant="info" size="sm" >View</Button>
      </div>
    )
  }
];

  const handleEdit = (row) => {
    const user = {
      id: `${row.id}`,
      name:`${row.name}`,
      email:`${row.email}`,
      gender:`${row.gender}`,
      status:`${row.status}`,
      
    }
    console.log(user.name);
  };
  const handleDelete = (row) => {
    // Handle delete button click
  };

  const handleView = (row) => {
    // Handle view button click
  };

  return (
    <BootstrapTable
      keyField="id"
      data={data}
      columns={columns}
      striped
      hover
      condensed
    />
  );
}

export default Table;