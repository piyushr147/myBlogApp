import React from 'react'
import databaseService from '../appwrite/database'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostForm from '../components/post-form/PostForm'
import { Container } from '../components'

function EditPost() {

    const [post,setPost] = useState()
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            databaseService.getPost(slug).then((post)=>{
                console.log(post);
                if(post){
                    setPost(post)
                }
                else{
                    navigate("/")
                }
            })
        }
    },[slug,navigate])

  return post?
  (<div className='py-8'>
    <Container>
        <PostForm post={post}/>
    </Container>
  </div>)
  :null
}

export default EditPost