import React from 'react'
import shoppingIcon from '../res/shopping.svg'
import Report from '../utilities/ReportInt'
import { useNavigate } from "react-router-dom";

export default function ReportItemComponent(props:{report: Report}) {

  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-start cursor-default' onClick={()=>{navigate('/pdf-generated', {state: {report: props.report}})}}>
        <div className='flex'>
            <img src={shoppingIcon} alt='template-icon' />
            <div className='m-5'>
                <p>{props.report.title}</p>
                <p className='opacity-50'>5:12pm . Template 1</p>
            </div>
        </div>
        <div>
          <button className='bg-white hover:outline-none focus:outline-none'>Edit</button>
          <button className='bg-white hover:outline-none focus:outline-none text-red-600'>Delete</button>
        </div>
    </div>
  )
}
