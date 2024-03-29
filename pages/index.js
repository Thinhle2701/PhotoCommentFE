import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React,{ useState,useEffect } from 'react';
import LoginPage from './login/login-page';
import RegisterPage from './register/register-page';
import HomePage from './home/home-page';
import {useRouter} from "next/router"
import Router from 'next/router';
const BE_URL = "https://photocommentbe.onrender.com"
//const BE_URL = "http://localhost:8000"
export default function Home() {
  const router = useRouter()
  const {query :{loginCheck,username,userID},} = router
  const props = {
    loginCheck,username,userID,
  }
  console.log(props)
  const [login,setLogin] = useState(false)
  const [userIDValue,setUserIDValue] = useState("")
  const [usernameValue,setUserNameValue] = useState("")
  useEffect(() => {
    if (props.loginCheck == "success"){
      setLogin(true)
      setUserIDValue(props.userID)
      setUserNameValue(props.username)
      Router.push({
        pathname: "/home/home-page",
        query : {
          userIDValue,
          usernameValue
        }
      })
    }
  }, [props])

  return (
    <div>
      {login  ? (<HomePage></HomePage>) : (<LoginPage ></LoginPage>)}
      {/* <LoginPage checkLogin={login} ></LoginPage> */}
    </div>
  );
}
