import house from '../res/house.jpg'
import { useLocation } from 'react-router-dom';
import './createreport.css'
import { Template } from '../utilities/TemplateInt';
import { useEffect, useState } from 'react';
import Qna from '../utilities/QnaInt';
import Report from '../utilities/ReportInt';
import { useNavigate } from "react-router-dom";
import {createReport} from '../utilities/dbFunctions'


export default function CreateReportPage() {

    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

    const [qnaSections, setQnaSections] = useState<Qna[][]>()

    const [currentAnswer, setCurrentAnswer] = useState('')

    const [readyToGenerateReport, setReadyToGenerateReport] = useState(false)

    const [reportName, setReportName] = useState('')

    const [questionIsBinary, setQuestionIsBinary] = useState(false)


    const location = useLocation();

    const template: Template = location.state?.template
    const sections = template.sections

    useEffect(()=>{
        setQnaSections(loadQuestionsIntoSeparateArray()) 
    }, [])

    const loadQuestionsIntoSeparateArray =()=>{
        let qnaSections = []
        for (let i=0; i<sections.length; i++ ){
            const section = sections[i]
            let qnas = []
            for (let j=0; j<section.questions.length; j++){
                const qna: Qna = {question: section.questions[j], answer: ''}
                qnas.push(qna)
            }
            qnaSections.push(qnas)
        }
        return qnaSections
    }

    const answerAndMoveOn =()=>{
        answerCurrentQuestion()
        moveFoward()
    }

    const answerCurrentQuestion =(answer?: string)=>{
        if (qnaSections !== undefined){
            const sections = qnaSections
            // update the answers to the current question
            sections[currentSectionIndex][currentQuestionIndex].answer = answer? answer : currentAnswer
            setQnaSections(sections)
        }
    }

    const moveFoward =()=>{
        if (currentSectionIndex === sections.length - 1 && currentQuestionIndex === sections[currentSectionIndex].questions.length - 1){
            setReadyToGenerateReport(true)
        } else{
            if (currentQuestionIndex + 1 < sections[currentSectionIndex].questions.length){
                setCurrentQuestionIndex(currentQuestionIndex + 1)
                if (qnaSections !== undefined){
                    setCurrentAnswer(qnaSections[currentSectionIndex][currentQuestionIndex + 1].answer)
                    if (sections[currentSectionIndex].questionType === 'binary'){
                        setQuestionIsBinary(true)
                    } else{
                        setQuestionIsBinary(false)
                    }
                }
            } else if (currentSectionIndex + 1 < sections.length){
                setCurrentSectionIndex(currentSectionIndex + 1)
                setCurrentQuestionIndex(0)
                if (qnaSections !== undefined){
                    setCurrentAnswer(qnaSections[currentSectionIndex+1][0].answer)

                    if (sections[currentSectionIndex + 1].questionType === 'binary'){
                        setQuestionIsBinary(true)
                    } else{
                        setQuestionIsBinary(false)
                    }
                }
            }
        }
    }

    const moveBackwards =()=>{
        setReadyToGenerateReport(false)
        if (currentQuestionIndex > 0){
            setCurrentQuestionIndex(currentQuestionIndex - 1)
            if (qnaSections !== undefined){
                setCurrentAnswer(qnaSections[currentSectionIndex][currentQuestionIndex - 1].answer)

                if (sections[currentSectionIndex].questionType === 'binary'){
                    setQuestionIsBinary(true)
                } else{
                    setQuestionIsBinary(false)
                }
            }
        } else if (currentSectionIndex > 0){
            setCurrentSectionIndex(currentSectionIndex - 1)
            setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1)
            if (qnaSections !== undefined){
                setCurrentAnswer(qnaSections[currentSectionIndex - 1][sections[currentSectionIndex - 1].questions.length - 1].answer)

                if (sections[currentSectionIndex - 1].questionType === 'binary'){
                    setQuestionIsBinary(true)
                } else{
                    setQuestionIsBinary(false)
                }
            }
        }
    }

    const createReportObject =(isComplete: boolean):Report | undefined=>{
        let newReport: Report | undefined
        let newReportName = reportName
        if (qnaSections !== undefined){
            if (reportName === ''){
                newReportName = 'incomplete report'
            }
            const newReportSections = []
            for (let i=0; i<qnaSections?.length; i++){
                const newReportSection = {title: sections[i].title, qnas: qnaSections[i]}
                newReportSections.push(newReportSection)
            }
            newReport = {
                title: newReportName,
                sections: newReportSections,
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
                navigate('/pdf-generated', {state: {report: newReport}})
            } catch(e){
                console.log('error on the page', e)
            }
        }
        
    }

    const handleBinaryAnswer =(answer: string)=>{
        answerCurrentQuestion(answer)
        moveFoward()
    }

    const saveForLater =async ()=>{
        const newReport: Report | undefined = createReportObject(false)
        console.log(newReport)
        if (newReport !== undefined){
            try{
                await createReport(newReport)
                navigate('/reports')
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
                    {`${currentQuestionIndex+1}. ${template.sections[currentSectionIndex].questions[currentQuestionIndex]}?`}
                </p>
                {questionIsBinary? (<div className='flex justify-center mt-5'>
                    <div className='mr-10'>
                        <button onClick={()=>{handleBinaryAnswer('yes')}}>Yes</button>
                    </div>
                    <div>
                        <button onClick={()=>{handleBinaryAnswer('no')}}>No</button>
                    </div>
                </div>):(
                <div>
                    <textarea placeholder='answer the question'className='text-3xl bg-black focus:outline-none border-b-2 border-white text-white w-full mt-10'
                    rows={3} value={currentAnswer} onChange={(e)=>{setCurrentAnswer(e.target.value)}}/>
                    <div className='flex items-center '>
                        <button className='mt-10' onClick={answerAndMoveOn}>save and continue</button>
                        <button className='text-white mt-10 ml-5 bg-black' onClick={saveForLater}>save for later</button>
                    </div>
                </div>)}
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
