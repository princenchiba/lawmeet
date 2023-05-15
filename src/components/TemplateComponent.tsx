import gavel from '../res/gavel.png'
import './template.css'
import { useNavigate } from "react-router-dom";
import { Template } from '../utilities/TemplateInt';

export default function TemplateComponent(props:{template:Template}) {

    const navigate = useNavigate();

  return (
    <div className='ml-5 mb-5' onClick={()=>{navigate('/create-report', {state: {template: props.template}})}}>
        <img src={gavel} alt="template-image"/>
        <div className='title-container p-5'>
            <p className=' text-white font-bold text-2xl'>{props.template.title}</p>
        </div>
        
    </div>
  )
}
