'use client'
import React from 'react'

function ErrorBoundary({error}) {
  return (
    <div>
    <div>Error in Profile Review</div>
    <div>{error.message}</div>
    <h1>This Error is actually showing</h1>
    </div>
  )
}

export default ErrorBoundary