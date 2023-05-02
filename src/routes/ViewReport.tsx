import { useLocation } from 'react-router-dom';
import Report from "../utilities/ReportInt";
import SectionComponent from "../components/SectionComponent";


export default function ViewReport() {

    const location = useLocation();

    const report: Report = location.state?.report

    const meetingDate: string = report.sections[0].qnas[0].answer
    const nameOfSeniorAttorney: string = report.sections[1].qnas[0].answer
    const nameOfSupportingAttorney: string = report.sections[1].qnas[1].answer
    const nameOfClient: string = report.sections[2].qnas[0].answer
    const agenda: string = report.sections[3].qnas[0].answer
    const personCarryingOutIntro: string = report.sections[4].qnas[0].answer

    // section B
    const sizeOfProperty: string = report.sections[5].qnas[1].answer
    const askingPrice: string = report.sections[5].qnas[3].answer
    const propertyAddress: string = report.sections[5].qnas[2].answer
    const propertyAge: string = report.sections[5].qnas[6].answer
    const litigation: string = report.sections[5].qnas[7].answer
    const propertyDefects: string = 'no'
    const debts: string = report.sections[5].qnas[9].answer

    // section c
    const legalCounselOnDueDiligence: string = report.sections[7].qnas[0].answer
    const legalConsideration: string = report.sections[7].qnas[1].answer
    const legalCounselOnTaxImplications: string = report.sections[7].qnas[2].answer
    const legalCounselOnFinancialOptions: string = report.sections[7].qnas[3].answer

    //adjournment
    const timeOfAdjournment: string = report.sections[8].qnas[0].answer

    const reportGenerator: string = report.sections[9].qnas[0].answer

    return (
        <div className="flex h-screen w-screen p-10 flex-col mb-10">
            <div >
                <p style={{fontWeight:'bold', fontSize:20}}>
                    {`MINUTES OF LEGAL BRIEFING WITH ${nameOfClient} - STAC00318`}
                </p>
                <p style={{fontWeight:'light', fontSize: 10, marginTop:5}}>Data: {meetingDate}</p>
                <p style={{fontWeight:'light', fontSize: 10, marginTop:5}}>Location: Gwarinpe Estate 900108, Abuja, Federal Capital Territory, Nigeria</p>

                <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>Legal Attendees:</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{nameOfSeniorAttorney}</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{nameOfSupportingAttorney}</p>

                <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>Client Attendees:</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{nameOfClient}</p>

                <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>Agenda:</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{agenda}</p>

                <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>A. Introduction</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>
                {`On ${meetingDate}, a meeting was held with a client who expressed interest in purchasing a house.
                The purpose of the meeting was to gather information about the property and the client's requirements, as 
                well as to provide guidance on the legal process of purchasing a property. ${nameOfSeniorAttorney} introduced 
                me (${nameOfSupportingAttorney}) and explained my role in the meeting. The client introduced himself and provided 
                background information regarding his interest in purchasing a property. `}</p>

                <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>B. Property Description</p> 
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>The client provided a description of the property as:</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{sizeOfProperty}</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{`Current asking price of ${askingPrice}`}</p>        
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{`The property is located ${propertyAddress}`}</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{`The property is approximately ${propertyAge} old`}</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>No current litigation on the property</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>No known defects or issues with the property</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>There are no liens or mortgages on the property</p>

                {legalCounselOnDueDiligence === 'yes' && (
                    <div>
                        <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>C. Due Diligence</p>
                        <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>
                            {`
                            ${nameOfSeniorAttorney} provided guidance to the client regarding the importance of conducting due diligence before making an offer for the property. He advised the client to obtain a real estate agent to  inspection the property to assess its physical condition and identify any major issues that may need to be addressed. Barr. Samuel also informed the client that we will conduct a title search to ensure that there are no mortgages, liens, encumbrances, or legal disputes associated with the property. ${nameOfSeniorAttorney} continued by explaining that conducting due diligence is crucial in order to avoid costly surprises down the road and to ensure that the client is getting what they are paying for.
                            `}
                        </p> 
                    </div>
                )}
                
                {legalConsideration === 'yes' && (
                    <div>
                        <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>D. Legal Considerations</p>
                        <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>
                            {`
                            ${nameOfSeniorAttorney} briefed the client about the purchase agreement and assured him of our support to represent him throughout the process of purchasing the property. He was made to understand the his interest will not be undermined in the entire process. 
                            `}
                        </p> 
                    </div>
                )}

                {legalCounselOnTaxImplications === 'yes' && (
                    <div>
                        <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>E. Tax Implications</p>
                        <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>
                            {`
                            ${nameOfSeniorAttorney} provided guidance to the client on the potential tax implications of the purchase. He advised the client to consult with a tax professional to determine the tax consequences of the purchase. ${nameOfSeniorAttorney} explained that there are different tax considerations depending on the property’s specifications. 
                            `}
                        </p> 
                    </div>
                )}

                {legalCounselOnFinancialOptions === 'yes' && (
                    <div>
                        <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>F. Financing Options</p>
                        <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>
                            {`
                            ${nameOfSeniorAttorney} raised questions regarding the clients budget and financing options. The client disclosed that he is considering paying the outright fee for the property. He also added that he will be leasing the property once the agreement is finalised.
                            `}
                        </p> 
                    </div>
                )}

                <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>F. Adjournment</p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{`The meeting was adjourned at about ${timeOfAdjournment}`}</p>

                <p style={{fontWeight:'bold', fontSize:15, marginTop:15}}>PREPARED BY: </p>
                <p style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{nameOfSupportingAttorney}</p>

            </div>
            <div className='fixed bottom-0 w-screen flex justify-evenly bg-white p-3'>
                <button className='bg-black text-white'>Edit</button>
                <button className='bg-blue-600 text-white'>Add Feedback</button>
                <button className='bg-red-700 text-white'>Delete</button>
            </div>
        </div>
    )
}
