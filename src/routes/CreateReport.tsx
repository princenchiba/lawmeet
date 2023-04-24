import house from '../res/house.jpg'
import arrowRight from '../res/arrowRight.svg'
import arrowLeft from '../res/arrowLeft.svg'
import { useLocation } from 'react-router-dom';
import './createreport.css'
import { Template } from '../utilities/TemplateInt';
import { useEffect, useState } from 'react';

export default function CreateReport() {

    interface Response {
        title: string,
        sections: {title: string, answers: string[]}[]
    }

    interface Qna {
        question: string,
        answer: string,
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

    const [qnaSections, setQnaSections] = useState<Qna[][]>()

    const [currentAnswer, setCurrentAnswer] = useState('')

    const [readyToGenerateReport, setReadyToGenerateReport] = useState(false)

    const [reportName, setReportName] = useState('')


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

    const toNextQuestion =()=>{
        answerCurrentQuestion()
        moveFoward()
    }

    const answerCurrentQuestion =()=>{
        if (qnaSections !== undefined){
            const sections = qnaSections
            // update the answers to the current question
            sections[currentSectionIndex][currentQuestionIndex].answer = currentAnswer
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
                }
            } else if (currentSectionIndex + 1 < sections.length){
                setCurrentSectionIndex(currentSectionIndex + 1)
                setCurrentQuestionIndex(0)
                if (qnaSections !== undefined){
                    setCurrentAnswer(qnaSections[currentSectionIndex+1][0].answer)
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
            }
        } else if (currentSectionIndex > 0){
            setCurrentSectionIndex(currentSectionIndex - 1)
            setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1)
            if (qnaSections !== undefined){
                setCurrentAnswer(qnaSections[currentSectionIndex - 1][sections[currentSectionIndex - 1].questions.length - 1].answer)
            }
        }
    }

    const generateReport =()=>{

    }

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-evenly">
        {!readyToGenerateReport? (
            <div className='p-5'>
                <p className='text-white text-lg mb-5'>{currentSectionIndex + 1 + '. ' + sections[currentSectionIndex].title}</p>
                <p className='text-white text-3xl'>
                    {`${currentQuestionIndex+1}. ${template.sections[currentSectionIndex].questions[currentQuestionIndex]}?`}
                </p>
                <textarea placeholder='answer the question'className='text-3xl bg-black focus:outline-none border-b-2 border-white text-white w-full mt-10'
                rows={3} value={currentAnswer} onChange={(e)=>{setCurrentAnswer(e.target.value)}}/>
                <div>
                    <button className='mt-10' onClick={toNextQuestion}>Next</button>
                </div>
                
            </div>
        ): (
            <div>
                <input placeholder='name the report' className='text-3xl bg-black focus:outline-none border-b-2 border-white text-white w-full mt-10'
                value={reportName} onChange={(e)=>{setReportName(e.target.value)}}/>
                <button className='mt-10' >Generate report</button>
            </div>
        )}
        <img src={house} alt="template image" className='template-image object-cover '/>
        <div className='fixed bottom-0 end-0 bg-white mr-10 mb-5 flex p-5 rounded-xl'>
            <div className='mr-5' onClick={moveBackwards}><img src={arrowLeft} alt='left pointing arrow' /></div>
            <div onClick={moveFoward}><img src={arrowRight} alt='right pointing arrow'/></div>
        </div>
    </div>
  )
}
