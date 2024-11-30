import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full'>
        <div className="logo font-bold text-white text-2xl  ">
           
           <span className='text-green-700'> &lt;</span>
           Pass
           <span className='text-green-700'>OP/ &gt;</span>
           

           </div>
        <div className='flex justify-center items-center'>

      Created  with <img src="icons8-love.gif" className='w-5 mx-2 ' alt="" />  By Subodh Mule
        </div>
    </div>
  )
}

export default Footer
