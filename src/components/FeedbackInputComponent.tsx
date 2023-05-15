import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { updateReport } from "../utilities/dbFunctions";

export default function FeedbackInputComponent(props:{id:string | undefined, setShow:any}) {

    const currentUser = useUser().user

    const [feedback, setFeedback] = useState<string>('')

    const [buttonText, setButtonText] = useState('send')

    const handleSubmit = async (e:any)=>{
        e.preventDefault()
        console.log('sending feedback...')
        try{
            setButtonText('sending feedback....')
            const newParam = {id:props.id, feedback:{from: currentUser?.username, text: feedback}}
            await updateReport(newParam)
            setButtonText('feedback sent')
            setTimeout(()=>{
                setFeedback('')
                setButtonText('send')
            }, 1000);
        } catch(e){
            setButtonText('send')
            console.log('update failed')
        }
    }

    const handleFeedbackChange =(e?:any)=>{
        setFeedback(e.target.value)
    }

    return (
    <div className="fixed ml-auto h-full w-full flex justify-center items-center">
        <form className="py-9 px-9 bg-white flex justify-center flex-col rounded-xl w-96 drop-shadow-2xl" onSubmit={handleSubmit}>
            <p className="text-black ">{`from: ${currentUser?.username}`}</p>
            <input className="p-3 bg-grey-300 text-black rounded-xl mt-3 bg-gray-100 " placeholder="your feedback here" required
                value={feedback} onChange={(e)=>{handleFeedbackChange(e)}}/>
            <button className="mt-5 bg-black text-white font-bold">{buttonText}</button>
            <p className="mt-3 text-red-600 w-full text-center cursor-pointer" onClick={()=>{props.setShow(false)}}>cancel</p>
        </form>
        
    </div>
    )
}
