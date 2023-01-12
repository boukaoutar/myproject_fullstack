import React, { useState, useEffect } from "react";
import Axios from "axios";
import '../styles/App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function Home() {

  //State of registhation fields
  const [data, setData] = useState([]);
  const [nameReg, setnameReg] = useState('');
  const [emailReg, setemailReg] = useState('');
  const [contactheg, setcontactheg] = useState('');

  //READ
  const showUsers = async () => {
    const response =  await Axios.get('http://localhost:8080/');
    setData(response.data);
  }

  //CREATE
  const register = async () => {
    await Axios.post('http://localhost:8080/user',{
      name: nameReg,
      email: emailReg,
      contact: contactheg,
    }).then((response) => {
      console.log(response);
    });
    window.location.reload();
  };

  //DELETE
  const removeUser = async (id) => {
    console.log("ID : ****",id)
    if(window.confirm("Are you sure to delete this user ?")){
      let url = `http://localhost:8080/delete/${id}`
      console.log('freeUrl', url)
      await Axios.delete(url);
      //toast.success("Contact deleted successfully");
    }
    window.location.reload();
  };

  useEffect(() => {
    showUsers();
  }, []);

  return (
    <div className="App">

      <ToastContainer position="top-center" />

      <div className="registration">
        <h1> New user </h1>
          <label> Name </label>
          <input type="text" onChange= {(e) => {
            setnameReg(e.target.value);
          }}/>
          <label> Email </label>
          <input type="text" onChange= {(e) => {
            setemailReg(e.target.value);
          }}/>
          <label> Contact </label>
          <input type="text" onChange= {(e) => {
            setcontactheg(e.target.value);
          }}/>
          <button onClick={register}> Add user </button>
      </div>

      <div className="Show">
        <h1> List of users </h1>
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th scope="col" style={{textAlign: "center"}}> Id </th>
              <th scope="col" style={{textAlign: "center"}}> Name </th>
              <th scope="col" style={{textAlign: "center"}}> Email </th>
              <th scope="col" style={{textAlign: "center"}}> Contact </th>
              <th scope="col" style={{textAlign: "center"}}> Action </th>
            </tr>
          </thead> 
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr key={item.id}>
                <th scope="row"> {index+1}  </th>
                <td> {item.name} </td>
                <td> {item.email} </td>
                <td> {item.contact} </td>
                <td>
                    <Link to={`/get/${item.id}`}>
                        <button> View </button>
                    </Link> 
                  
                    <button onClick={() => removeUser(item.id)}> Delete </button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>  
      </div>
    
    </div>
  );
}

export default Home;