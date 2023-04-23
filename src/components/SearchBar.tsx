import React from 'react'
import searchIcon from '../res/SearchIcon.svg'

export default function SearchBar() {
  return (
    <div className='flex items-center bg-gray-200 p-3 mt-10 rounded-lg'>
        <img src={searchIcon} alt='search icon'/>
        <input type='text' placeholder='search for reports' className='bg-gray-200 ml-3 focus:outline-none p-2 flex-1'/>
    </div>
  )
}
