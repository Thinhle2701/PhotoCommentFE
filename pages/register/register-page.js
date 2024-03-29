import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
const BE_URL = "https://photocommentbe.onrender.com";
export default function RegisterPage() {
    const [registerSuccess,setRegisterSuccess] = useState(false)
    const callAPIRegisterAccount = async (form_values) => {
        try {
            const url = BE_URL + "/api/user/add_user"
            const res = await fetch(url,{
              method: 'POST',
              body: JSON.stringify(form_values),
              headers: {
                'content-type': 'application/json'
              }
            })
            console.log(res)
            if(res.ok){
                setRegisterSuccess(true)
              console.log("Yeai!")
            }else{
              console.log("Oops! Something is wrong.")
            }
          } catch (error) {
              console.log(error)
          }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        console.log('form values', form_values)
        await callAPIRegisterAccount(form_values)
    };
    return (
    <div>
        <h1>Register Page</h1>
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

                    <label style={{marginLeft:"40px"}}  htmlFor="email">email</label>
                    <input placeholder="Enter Email" type="email" id="email" name="email" required />

                    <div style={{marginLeft:"15%",marginTop:"50px"}}>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>   
            {
                registerSuccess ? (<div>
                    <h4>registerSuccess</h4>
                    <p>Click here to Go to <Link href="/login/login-page">Login Page</Link>
                    </p>
                </div>) : (<div></div>)
            }
    </div>);
}