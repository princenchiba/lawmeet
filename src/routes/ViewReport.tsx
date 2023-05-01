import { useLocation } from 'react-router-dom';
import Report from "../utilities/ReportInt";
import SectionComponent from "../components/SectionComponent";


export default function ViewReport() {

    const location = useLocation();

    const report: Report = location.state?.report

    return (
        <div className="flex h-screen w-screen p-10 flex-col">
            <h2 className="text-2xl text-black font-bold mb 10" style={{marginBottom:'1em'}}>{report.title}</h2>
            <div>
                {report.sections.map(section=>(
                    <SectionComponent section={section} key={section.title}/>
                ))}
            </div>
            <div className='fixed bottom-0 w-screen flex justify-evenly bg-white p-3'>
                <button className='bg-black text-white'>Edit</button>
                <button className='bg-blue-600 text-white'>Add Feedback</button>
                <button className='bg-red-700 text-white'>Delete</button>
            </div>
        </div>
    )
}
