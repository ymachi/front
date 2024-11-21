import React from 'react'
import { useRouter } from 'next/router'
import EditArticle from '@/components/EditArticle'
const id = () => {
    const {push} = useRouter()
  return (
    <div>
      <EditArticle/>
    </div>
  )
}

export default id
