import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from '../../components/head'
import Nav from '../../components/nav'

const View = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div>
      <Link href='/view/[id]' as={'/view/111'}>
        hreflink
      </Link>
      <p>ID: {id}</p>
    </div>
  )
}

export default View