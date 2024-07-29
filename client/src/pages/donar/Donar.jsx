import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import ApiService from '../../api/ApiService'

const Donar = () => {
  const [donations, setDonations] = useState(null)
    const navigate = useNavigate()
        
    useEffect(() => {
      try {
          const data = ApiService.getAllDonations('/donations')
          setDonations(data)
      } catch (error) {
          console.log(error)
      }
  }, [])
  return (
    <div className='h-screen p-10 dark:bg-slate-900'>
      <button className='h-[auto] text-white bg-slate-500 rounded-lg p-3' onClick={()=>navigate('/donate-now')}>Donate Now</button>
    <div className="flex flex-col justify-center-items-start">
      <Card img={donations?.portfolioImages} category={donations?.category}/>
    </div>
    </div>
  )
}

export default Donar
