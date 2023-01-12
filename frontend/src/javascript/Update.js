import React, { useState, useEffect } from "react";
import { useParams , Link} from "react-router-dom";
import Axios from "axios";
import '../styles/App.css';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    email: "",
    contatc: "",
};

const Update = () => {

    const [state, setState] = useState(initialState);

    const {name, email, contact} = state;


    const {id} = useParams();
  
    useEffect(  () => {
        Axios.get(`http://localhost:8080/get/${id}`).then((resp) => {
            setState({...resp.data[0]});
        });
        
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("Please complete all the fields");
        } else {
            await Axios.put(`http://localhost:8080/update/${id}`, {
                name,
                email,
                contact,
            }).then(() => {
                setState({ name: "", email: "", contact:"" });
            }).catch((err) => toast.error(err.response.data));
            toast.success("User updated !")
        }
   };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}> 
                <label htmlFor="name"> Name </label>
                <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={name || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="email"> Email </label>
                <input 
                    type="text" 
                    id="email"
                    name="email"
                    value={email || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="contact"> Contact </label>
                <input 
                    type="text" 
                    id="contact"
                    name="contact"
                    value={contact || ""}
                    onChange={handleInputChange}
                />

                <input 
                    type="submit" 
                    value="Save"
                />
                <Link to="/">
                    <input 
                        type="button" 
                        value="Go Back"
                    />
                </Link>
            </form> 
        </div>
    );
}

export default Update;
