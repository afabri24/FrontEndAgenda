import React from 'react'
import { CiFaceFrown } from "react-icons/ci";

function NotFound() {
  return (
    <div className='flex items-center justify-center flex-col'>
      <CiFaceFrown style={{
                      display: 'inline-block',
                      width: '200px',
                      height: '200px',
                    }}/>
      <h5 className='text-6xl'>404</h5>
      <h4 className=''>Page not Found</h4>
    </div>
  )
}

export default NotFound
