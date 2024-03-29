import {
    ref,
    uploadBytes,
    listAll,
    getDownloadURL,
    deleteObject,
    refFromURL,
  } from "firebase/storage";
import Link from 'next/link';
import Button from '@mui/material/Button';
import { storage } from "../../lib/Firebase";
import { useState,useEffect } from "react";
import { v4 } from "uuid";
import {useRouter} from "next/router"
import axios from "axios"
const BE_URL = "https://photocommentbe.onrender.com"
export default function HomePage() {
    const router = useRouter()
    const {query :{userIDValue,usernameValue},} = router
    const props = {
        userIDValue,
        usernameValue
    }
    console.log(props)
    const [checkUploadImage, setCheckUploadImage] = useState(false);
    const [imageUpload, setImageUpload] = useState("");
    const [imageList,setImageList] = useState([])
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [commentText,setCommentText] = useState("")

    //if (isLoading) return <p>Loading...</p>

    function retrieveImage(){
        const url = BE_URL + "/api/photo";
        axios
        .get(url)
        .then((res) => {
            console.log(res.data);
            setImageList(res.data);
            setLoading(false)
          })
        .catch((error) => console.log(error));
    }

    useEffect(()=>{
        retrieveImage()
    },[])

    const apiUploadImageBE = async (url)=>{
        const urlAPI = BE_URL + "/api/photo/add_photo"
        axios
        .post(urlAPI, {
          url: url,
          postedBy: props.usernameValue,
        })
        .then(async (res) => {
          window.location.reload()
        })
        .catch(async (error) => {
          console.log(error)
        });
    }

    const uploadImage = () => {
        const imageRef = ref(storage, `image/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((response) => {
          getDownloadURL(response.ref).then((url) => {
            console.log(url);
            setImageUpload(url);
            setCheckUploadImage(true);
            apiUploadImageBE(url)
          });
        });
    };
    
    const handlePostComment = (photoID)=>{
        const url = BE_URL + "/api/photo/post_comment"
        axios
        .post(url, {
          photoID: photoID,
          username: props.usernameValue,
          commentText: commentText
        })
        .then(async (res) => {
          window.location.reload()
        })
        .catch(async (error) => {
          console.log(error)
        });
    }

    const dateValueNormal = (dateCurr) => {
        //"2023-12-04T07:22:30.243+00:00"
        const date = new Date(dateCurr);
        let dateStr = date.toLocaleString();
        return dateStr;
    };


    
    return (
        <div >
            <h1 style={{alignItems:"center",textAlign:"center"}}>
                <p>Upload and Comment Photo By Thinh Le</p>
                <Link href="/">Sign out</Link>
            </h1>
   
            <div style={{display:"flex",marginLeft:"30%"}}>
            <div>
                <div>
                <h1>Image List</h1>
                <div className="image-list">
                {imageList.map((image) => (
                    <div key={image.photoID} className="image-item" style={{border: "1px solid black",marginBottom:"20px"}}>
                    <div style={{display:"flex"}}>
                        <h3>👤 {image.postedBy}</h3>
                        <h3 style={{marginLeft:"20px"}}>📅{dateValueNormal(image.postedTime)}</h3>
                    </div>

                    <img style={{width:"250px",height:"150px"}} src={image.url} alt={image.alt} />
                    <div>
                        <input style={{marginLeft:"20px"}} onChange={(e)=>{setCommentText(e.target.value)}} placeholder="Input Comment"></input>
                        <Button key={image.photoID} onClick={(e)=>{e.preventDefault()
                        handlePostComment(image.photoID)}}>post comment</Button>
                    </div>
                    <div className="image-details" style={{display:"flex"}}>
                        {image.comments.length === 0 ? (
                            <div>no comments</div>
                        ) : (<div>
                            {image.comments.map((cmt) =>(
                                <div>
                                <div style={{display:"flex"}}>
                                <p style={{fontSize:"15px",fontWeight:"bold"}}>{"🗣"}{cmt.commentBy}</p>
                                <p style={{marginLeft:"5px"}}>(</p>
                                <p>{dateValueNormal(cmt.commentDate)}</p>
                                <p>)</p>
                                </div> 
                                    <span style={{marginLeft:"10px"}}>🗨{cmt.commentText}</span>
                                </div>
                            ))}
                        </div>)}

                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
            <div style={{marginLeft:"300px",height:"150px",width:"300px",border:"1px solid black",borderRadius:"10px"}}>
                <h3 style={{}}>Upload image</h3>
                <div style={{ marginLeft: "2%" }}>
                    <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                    }}
                    ></input>
                    <div style={{marginLeft:"40px"}} onClick={uploadImage}>
                    <Button style={{marginTop:"10px"}} variant="contained">Upload Images</Button>
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}