import React from 'react';
import Link from 'next/link';
import Router from "next/router"
import axios from "axios"
const BE_URL = "https://photocommentbe.onrender.com";
//const BE_URL = "http://localhost:8000"
export default function LoginPage() {

    const loginCheck = "success"
    function sendProp(username,userID){
      Router.push({
        pathname: "/",
        query : {
          loginCheck,
          username,
          userID
        }
      })
    }
    const callAPILogin = async (form_values) => {
      const url = BE_URL + "/api/user/login"
        axios
        .post(url, {
          username: form_values.username,
          password: form_values.password,
        })
        .then(async (res) => {
          sendProp(res.data.username,res.data.userID)
        })
        .catch(async (error) => {
          console.log(error)
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        console.log('form values', form_values)
        await callAPILogin(form_values)
      };
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div style={{display:"block"}}>
                    <label htmlFor="#username"> Username</label>
                    <input 
                        placeholder="Enter username"
                        type={"text"}
                        id="username"
                        name="username"
                    />

                    <label style={{marginLeft:"40px"}}  htmlFor="password">Password:</label>
                    <input placeholder="Enter Password" type="password" id="password" name="password" required />
                    <p>Click here to <Link href="/register/register-page">Register Account </Link>
                    </p>

                    <div style={{marginLeft:"15%",marginTop:"50px"}}>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}