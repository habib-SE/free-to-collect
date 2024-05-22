import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className=''>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        wrapperClass=""
      />
    </div>
  )
}

export default Loading