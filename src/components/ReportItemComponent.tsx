import React from 'react'
import shoppingIcon from '../res/shopping.svg'
import Report from '../utilities/ReportInt'
import { useNavigate } from "react-router-dom";

export default function ReportItemComponent(props:{report: Report}) {

  const navigate = useNavigate();

  const continueEditting =()=>{
    navigate('/complete-report', {state: {report: props.report}})
  }

  return (
    <div className='flex justify-between items-start cursor-default' >
        <div className='flex' onClick={()=>{navigate('/view-report', {state: {report: props.report}})}}>
            <img src={shoppingIcon} alt='template-icon' />
            <div className='m-5'>
                <p>{props.report.title}</p>
                <p className='opacity-50'>5:12pm . Template 1</p>
            </div>
        </div>
        <div>
          {props.report.title !== 'incomplete report' ? 
            (<button className='bg-white hover:outline-none focus:outline-none' onClick={()=>{navigate('/pdf-generated', {state: {report: props.report}})}}>View PDF</button>):
            (<button onClick={continueEditting}>continue editing</button>)}
        </div>
    </div>
  )
}
