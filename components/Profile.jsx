"use client"
import React from 'react'
import PromptCard from './PromptCard'

function Profile({name, desc, data, handleEdit, handleDelete}) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'><span className='blue_gradient'>{name} </span></h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 promp_layout grid grid-cols-1 xl:grid-cols-3 gap-5'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={()=>handleEdit && handleEdit(post)}
          handleDelete={()=>handleDelete && handleDelete(post)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile