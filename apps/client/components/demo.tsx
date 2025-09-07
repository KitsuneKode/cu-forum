'use client'
import React from 'react'
import { api } from '@cu-forum/convex'
import { useQuery } from 'convex/react'

const Demo = () => {
  const auth = useQuery(api.auth.getUserServer)

  const authUser = useQuery(api.auth.getCurrentUser)
  const authSession = useQuery(api.auth.getSession)

  return (
    <div>
      {auth ? 'Logged In' : 'Logged Out'}
      {JSON.stringify(authUser)}
      {JSON.stringify(authSession)}
      {JSON.stringify(auth)}
    </div>
  )
}

export default Demo
