'use client'
import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'
import { Router } from 'next/router'

function MyProfile() {
    const { data: session} = useSession();
    const [posts, setPosts] = useState([])

    const router = useRouter()

    useEffect(()=>{
        const fetchPrompt = async() => {
          console.log('feed useffect running')
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json()
          setPosts(data)
        }
        if(session?.user.id) fetchPrompt()
      },[])



    const handleEdit = (post) =>{
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async(post) =>{
      const hasConfirmed = confirm("Are you sure you want to delete this prompt")

      if (hasConfirmed){
        try{
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          })
          const filteredPost = posts.filter((p) => p._id !== post._id)
          setPosts(filteredPost)
        }catch(error){
          console.log(error)
        }
      }
    }

    



  return (
    <Profile
        name='My Profile'
        desc='Welcome to your personal profile page'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile