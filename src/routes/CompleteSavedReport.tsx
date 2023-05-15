import { useLocation } from "react-router-dom";
import Report from "../utilities/ReportInt";
import { useEffect } from "react";
import house from '../res/house.jpg'
import { useState } from "react";
import { createReport } from "../utilities/dbFunctions";
import { useNavigate } from "react-router-dom";
import { deleteReport } from "../utilities/dbFunctions";


export default function CompleteSavedReport() {

    const location = useLocation();

    const navigate = useNavigate();

    const report: Report = location.state?.report
    const [sections, setSections] = useState(report.sections)

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

    const [readyToGenerateReport, setReadyToGenerateReport] = useState(false)

    const [currentAnswer, setCurrentAnswer] = useState(report.sections[0].qnas[0].answer)

    const [reportName, setReportName] = useState('')


    useEffect(()=>{
        console.log(sections)
    }, [])

    const answerAndMoveOn =()=>{
        console.log(currentAnswer)
        answerCurrentQuestion()
        moveFoward()
    }

    const answerCurrentQuestion =(answer?: string)=>{
        // update the answers to the current question
        let newSections = sections
        newSections[currentSectionIndex].qnas[currentQuestionIndex].answer = currentAnswer
        setSections(newSections)
    }

    const moveFoward =()=>{
        if (currentSectionIndex === sections.length - 1 && currentQuestionIndex === sections[currentSectionIndex].qnas.length - 1){
            setReadyToGenerateReport(true)
        } else{
            if (currentQuestionIndex + 1 < sections[currentSectionIndex].qnas.length){
                setCurrentQuestionIndex(currentQuestionIndex + 1)
                setCurrentAnswer(sections[currentSectionIndex].qnas[currentQuestionIndex + 1].answer)
            } else if (currentSectionIndex + 1 < sections.length){
                setCurrentSectionIndex(currentSectionIndex + 1)
                setCurrentQuestionIndex(0)
                setCurrentAnswer(sections[currentSectionIndex+1].qnas[0].answer)
            }
        }
    }

    const moveBackwards =()=>{
        setReadyToGenerateReport(false)
        if (currentQuestionIndex > 0){
            setCurrentQuestionIndex(currentQuestionIndex - 1)
            setCurrentAnswer(sections[currentSectionIndex].qnas[currentQuestionIndex - 1].answer)
        } else if (currentSectionIndex > 0){
            setCurrentSectionIndex(currentSectionIndex - 1)
            setCurrentQuestionIndex(sections[currentSectionIndex - 1].qnas.length - 1)
            setCurrentAnswer(sections[currentSectionIndex - 1].qnas[sections[currentSectionIndex - 1].qnas.length - 1].answer)
        }
    }

    const createReportObject =(isComplete: boolean):Report | undefined=>{
        let newReport: Report | undefined
        let newReportName = reportName
        if (newReportName !== ''){
            newReport = {
                title: newReportName,
                sections,
                isComplete: isComplete
            }
        }
        
        return newReport
    }

    const toGeneratePDF =async ()=>{
        const newReport: Report | undefined = createReportObject(true)
        if (newReport !== undefined){
            try{
                await createReport(newReport)
                await deleteReport(report.id)
                navigate('/pdf-generated', {state: {report: newReport}})
            } catch(e){
                console.log('error on the page', e)
            }
        }
        
    }

    return (
    <div className="h-screen w-screen bg-black flex items-center justify-evenly">
        {!readyToGenerateReport? (
            <div className='p-5'>
                <p className='text-white text-lg mb-5'>{sections[currentSectionIndex].title}</p>
                <p className='text-white text-3xl'>
                    {`${currentQuestionIndex+1}. ${sections[currentSectionIndex].qnas[currentQuestionIndex].question}?`}
                </p>
                <div>
                    <textarea placeholder='answer the question'className='text-3xl bg-black focus:outline-none border-b-2 border-white text-white w-full mt-10'
                    rows={3} value={currentAnswer} onChange={(e)=>{setCurrentAnswer(e.target.value)}}/>
                    <div className='flex items-center '>
                        <button className='mt-10' onClick={answerAndMoveOn}>save and continue</button>
                    </div>
                </div>
            </div>
        ): (
            <div>
                <input placeholder='name the report' className='text-3xl bg-black focus:outline-none border-b-2 border-white text-white w-full mt-10'
                value={reportName} onChange={(e)=>{setReportName(e.target.value)}}/>
                <button className='mt-10' onClick={toGeneratePDF}>Generate report</button>
            </div>
        )}
        <img src={house} alt="template image" className='template-image object-cover ' style={{width: 300, height: 300}}/>
        <div className='fixed bottom-0 start-0 bg-white ml-10 mb-5 flex p-5 rounded-xl cursor-pointer'>
            <div className='mr-5' onClick={moveBackwards}>Prev</div>
            <div onClick={moveFoward}>Next</div>
        </div>
    </div>
    )
}
