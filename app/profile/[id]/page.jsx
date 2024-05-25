'use client'
import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'

function UserProfile({params}) {
    const [posts, setPosts] = useState([])
    const searchParams = useSearchParams()


    const userName  = searchParams.get('name')
    
    
    useEffect(()=>{
        const fetchPrompt = async() => {
          console.log('feed useffect running')
          const response = await fetch(`/api/users/${params?.id}/posts`)
          const data = await response.json()
          setPosts(data)
        }
        if(params?.id) fetchPrompt()
      console.log(params.id)
      },[params.id])

  return (
    <Profile
        name={`${userName}'s Profile`}
        desc={`Welcome to ${userName}'s profile page`}
        data={posts}
        
    />
  )
}

export default UserProfile