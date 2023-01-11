import React, { useState, useEffect } from "react";
import Axios from "axios";
import '../styles/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  //State of registhation fields
  const [data, setData] = useState([]);
  const [nameReg, setnameReg] = useState('');
  const [emailReg, setemailReg] = useState('');
  const [contactheg, setcontactheg] = useState('');

  const register = () => {
    Axios.post('http://localhost:8080/register',{
      name: nameReg,
      email: emailReg,
      contact: contactheg,
    }).then((response) => {
      console.log(response);
    });
    showUsers();
  };

  const showUsers = async () => {
    const response =  await Axios.get('http://localhost:8080/');
    setData(response.data);
    console.log("ShowUser", response)
  }

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
          <button onClick={register}> Register </button>
      </div>

      <div className="login">
        <h1> Login </h1>
          <input type="text" placeholder="name ..."/>
          <input type="text" placeholder="email ..."/>
          <button> Login </button>
      </div>

      <div className="Show">
        <h1> Show List of users </h1>
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
                  <button> Edit </button>
                  <button> Delete </button>
                  <button> View </button>
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

export default App;
