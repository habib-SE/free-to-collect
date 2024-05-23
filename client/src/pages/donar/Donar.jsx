import React from 'react'
import { useNavigate } from 'react-router-dom'

const Donar = () => {
    const navigate = useNavigate()
  return (
    <div className='h-screen p-10 dark:bg-slate-900'>
      <button className='h-[auto] text-white bg-slate-500 rounded-lg p-3' onClick={()=>navigate('/donate-now')}>Donate Now</button>
    </div>
  )
}

export default Donar
