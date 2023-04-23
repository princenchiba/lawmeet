import React from 'react'
import shoppingIcon from '../res/shopping.svg'

export default function ReportItem() {
  return (
    <div className='flex justify-between items-start cursor-default'>
        <div className='flex'>
            <img src={shoppingIcon} alt='template-icon' />
            <div className='m-5'>
                <p>Report 1</p>
                <p className='opacity-50'>5:12pm . Template 1</p>
            </div>
        </div>
        <button className='bg-white hover:outline-none focus:outline-none'>View</button>
    </div>
  )
}
