import SearchBar from '../components/SearchBar'
import ReportItemComponent from '../components/ReportItemComponent'
import gavel from '../res/gavel.png'
import boxes from '../res/boxes.svg'
import flower from '../res/flower.svg'
import './reports.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { listReports } from '../utils/dbFunctions'
import Report from '../utils/ReportInt'

export default function ReportsPage() {

  const navigate = useNavigate();

  const goToTemplatePage = ()=>{
    navigate('/templates')
  }

  const [reports, setReports] = useState<Report[]>([])

  useEffect(()=>{
    getReports()
  }, [])

  const getReports =async ()=>{
    const reports = await listReports()
    setReports(reports)
  }

  return (
    <div className='flex'>
      <section className='p-10 float-left w-full ml-10'>
          <div className='flex justify-between items-end'>
            <div>
              <h2 className='text-5xl font-bold mb-3'>Reports</h2>
              <p className='text-sm opacity-50'>View previously created reports</p>
            </div>
            <button className='bg-black text-white h-12' onClick={goToTemplatePage}>create report</button>
          </div>
          <SearchBar/>

          <div className='mt-10'>
            {
              reports.map(report =>(
                <ReportItemComponent report={report} key={Math.random()}/>
              ))
            }
          </div>
          
      </section>

      <section className='p-10  container flex flex-col items-center'>
        <div className='w-fit'>
          <img src={gavel} alt='gavel image' className='w-30'/>
          <p className='text text-white font-bold from-black text-xl z-10 p-5'>the law at your <br/> fingertips</p>
        </div>

        <div className='bg-cyan-100 p-5 rounded-lg inner-container'>
          <div className='flex justify-between illustrator-container mb-10'>
            <img src={boxes} alt='boxes'/>
            <img src={flower} alt='boxes'/>
          </div>
          <p className='font-extrabold '>Generating reports</p>
          <p className='font-light mb-10'>Generate reports from predefined templates easily and speedily</p>
          <button className='w-full bg-black text-white'>View Tips</button>
        </div>
      </section>
      
    </div>
  )
}
