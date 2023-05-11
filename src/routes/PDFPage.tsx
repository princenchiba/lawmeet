import React, { useEffect } from 'react'
import PDFComponent from '../components/PDFComponent'
import { useLocation } from 'react-router-dom';
import Report from '../utils/ReportInt';
import { PDFViewer } from '@react-pdf/renderer';


export default function PDFPage() {

    const location = useLocation();

    const report: Report = location.state?.report

    useEffect(()=>{
        console.log('the report', report)
    }, [])

  return (
    <div className='w-screen h-screen'>
        <PDFViewer className='w-full h-full'>
            <PDFComponent report={report}/>
        </PDFViewer>
    </div>
  )
}
