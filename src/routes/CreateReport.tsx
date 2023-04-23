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

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

    const [response, setResponse] = useState<Response>({title:'new response', sections: []})

    const [currentAnswer, setCurrentAnswer] = useState('')

    const [readyToGenerateReport, setReadyToGenerateReport] = useState(false)


    const location = useLocation();

    const template: Template = location.state?.template
    const sections = template.sections

    useEffect(()=>{
    }, [])

    const toNextQuestion =()=>{
        if (currentAnswer !== ''){
            repondToQuestion()
            moveFoward()
            setCurrentAnswer('')
        }
        
    }

    const repondToQuestion =()=>{
        addAnswer()
    }

    const addAnswer =()=>{
        let res = response
        console.log('old res', res)
        if (res.sections[currentSectionIndex] === undefined){
            let answers = [currentAnswer]
            res.sections.push({title: sections[currentSectionIndex].title,answers})
        } else{
            res.sections[currentSectionIndex].answers.push(currentAnswer)
        }
       
        setResponse(res)
        console.log('new res',res)
    }

    const moveFoward =()=>{
        if (currentSectionIndex === sections.length - 1 && currentQuestionIndex === sections[currentSectionIndex].questions.length - 1){
            setReadyToGenerateReport(true)
        } else{
            if (currentQuestionIndex + 1 < sections[currentSectionIndex].questions.length){
                setCurrentQuestionIndex(currentQuestionIndex + 1)
            } else if (currentSectionIndex + 1 < sections.length){
                setCurrentSectionIndex(currentSectionIndex + 1)
                setCurrentQuestionIndex(0)
            }
        }
       
    }

    const handleFowardArrowCLick =()=>{
        if (sections[currentSectionIndex].optional){
            moveFoward
        }
    }

    const questionIsAnswered =(sectionIndex: number, questionIndex: number): boolean=>{
        let isAnswered = false
        if (response.sections[sectionIndex] !== undefined){
            if (response.sections[sectionIndex].answers[questionIndex]){
                isAnswered = true
            }
        }
        return isAnswered
    }

    const moveBackwards =()=>{
        if (currentQuestionIndex > 0){
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        } else if (currentSectionIndex > 0){
            setCurrentSectionIndex(currentSectionIndex - 1)
            setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1)
        }
    }

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-evenly">
        {!readyToGenerateReport? (
            <div className='p-5'>
                <p className='text-white text-lg mb-5'>{currentSectionIndex + 1 + '. ' + sections[currentSectionIndex].title}</p>
                <p className='text-white text-3xl'>
                    {`${currentQuestionIndex+1}. ${template.sections[currentSectionIndex].questions[currentQuestionIndex]}?`}
                </p>
                {/* {sections[currentSectionIndex].optional && <span className='text-white opacity-50'>optional</span>} */}
                <textarea placeholder='answer the question'className='text-3xl bg-black focus:outline-none border-b-2 border-white text-white w-full mt-10'
                rows={3} value={currentAnswer} onChange={(e)=>{setCurrentAnswer(e.target.value)}}/>
                <div>
                    <button className='mt-10' onClick={toNextQuestion}>Next</button>
                </div>
                
            </div>
        ): (
            <div>
                <button className='mt-10' >Generate report</button>
            </div>
        )}
        <img src={house} alt="template image" className='template-image object-cover '/>
        {/* <div className='fixed bottom-0 end-0 bg-white mr-10 mb-5 flex p-5 rounded-xl'>
            <div className='mr-5' onClick={moveBackwards}><img src={arrowLeft} alt='left pointing arrow' /></div>
            <div onClick={handleFowardArrowCLick}><img src={arrowRight} alt='right pointing arrow'/></div>
        </div> */}
    </div>
  )
}
