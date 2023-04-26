import React, { useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Report from '../utilities/ReportInt';

const styles = StyleSheet.create({
    page: {
        padding: 30
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
      color: 'black'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });

export default function PDFComponent(props:{report: Report}) {

    useEffect(()=>{
        console.log(props.report)
    }, [])

    const meetingDate: string = props.report.sections[0].qnas[0].answer
    const nameOfSeniorAttorney: string = props.report.sections[1].qnas[0].answer
    const nameOfSupportingAttorney: string = props.report.sections[1].qnas[1].answer
    const nameOfClient: string = props.report.sections[2].qnas[0].answer
    const agenda: string = props.report.sections[3].qnas[0].answer
    const personCarryingOutIntro: string = props.report.sections[4].qnas[0].answer

    // section B
    const sizeOfProperty: string = props.report.sections[5].qnas[1].answer
    const askingPrice: string = props.report.sections[5].qnas[3].answer
    const propertyAddress: string = props.report.sections[5].qnas[2].answer
    const propertyAge: string = props.report.sections[5].qnas[6].answer
    const litigation: string = props.report.sections[5].qnas[7].answer
    const propertyDefects: string = 'no'
    const debts: string = props.report.sections[5].qnas[9].answer

    // section c
    const legalCounselOnDueDiligence: string = props.report.sections[7].qnas[0].answer
    const legalConsideration: string = props.report.sections[7].qnas[1].answer
    const legalCounselOnTaxImplications: string = props.report.sections[7].qnas[2].answer
    const legalCounselOnFinancialOptions: string = props.report.sections[7].qnas[3].answer

    //adjournment
    const timeOfAdjournment: string = props.report.sections[8].qnas[0].answer

    const reportGenerator: string = props.report.sections[9].qnas[0].answer

  return (
    <Document style={{backgroundColor: 'black'}}>
      <Page style={styles.page} size="A4">
        <Text style={{fontWeight:'bold', fontSize:20}}>
            {`MINUTES OF LEGAL BRIEFING WITH ${nameOfClient} - STAC00318`}
        </Text>
        <Text style={{fontWeight:'light', fontSize: 10, marginTop:5}}>Data: {meetingDate}</Text>
        <Text style={{fontWeight:'light', fontSize: 10, marginTop:5}}>Location: Gwarinpe Estate 900108, Abuja, Federal Capital Territory, Nigeria</Text>

        <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>Legal Attendees:</Text>
        <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{nameOfSeniorAttorney}</Text>
        <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{nameOfSupportingAttorney}</Text>

        <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>Client Attendees:</Text>
        <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{nameOfClient}</Text>

        <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>Agenda:</Text>
        <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{agenda}</Text>

        <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>A. Introduction</Text>
        <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>
        {`On ${meetingDate}, a meeting was held with a client who expressed interest in purchasing a house.
         The purpose of the meeting was to gather information about the property and the client's requirements, as 
         well as to provide guidance on the legal process of purchasing a property. ${nameOfSeniorAttorney} introduced 
         me (${nameOfSupportingAttorney}) and explained my role in the meeting. The client introduced himself and provided 
         background information regarding his interest in purchasing a property. `}</Text>

         <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>B. Property Description</Text> 
         <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>The client provided a description of the property as:</Text>
         <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{sizeOfProperty}</Text>
         <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{`Current asking price of ${askingPrice}`}</Text>        
         <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{`The property is located ${propertyAddress}`}</Text>
         <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{`The property is approximately ${propertyAge} old`}</Text>
         <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>No current litigation on the property</Text>
         <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>No known defects or issues with the property</Text>
         <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>There are no liens or mortgages on the property</Text>

         {legalCounselOnDueDiligence === 'yes' && (
            <View>
                <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>C. Due Diligence</Text>
                <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>
                    {`
                    ${nameOfSeniorAttorney} provided guidance to the client regarding the importance of conducting due diligence before making an offer for the property. He advised the client to obtain a real estate agent to  inspection the property to assess its physical condition and identify any major issues that may need to be addressed. Barr. Samuel also informed the client that we will conduct a title search to ensure that there are no mortgages, liens, encumbrances, or legal disputes associated with the property. ${nameOfSeniorAttorney} continued by explaining that conducting due diligence is crucial in order to avoid costly surprises down the road and to ensure that the client is getting what they are paying for.
                    `}
                </Text> 
            </View>
         )}
        
        {legalConsideration === 'yes' && (
            <View>
                <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>D. Legal Considerations</Text>
                <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>
                    {`
                    ${nameOfSeniorAttorney} briefed the client about the purchase agreement and assured him of our support to represent him throughout the process of purchasing the property. He was made to understand the his interest will not be undermined in the entire process. 
                    `}
                </Text> 
            </View>
         )}

         {legalCounselOnTaxImplications === 'yes' && (
            <View>
                <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>E. Tax Implications</Text>
                <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>
                    {`
                    ${nameOfSeniorAttorney} provided guidance to the client on the potential tax implications of the purchase. He advised the client to consult with a tax professional to determine the tax consequences of the purchase. ${nameOfSeniorAttorney} explained that there are different tax considerations depending on the property’s specifications. 
                    `}
                </Text> 
            </View>
         )}

          {legalCounselOnFinancialOptions === 'yes' && (
            <View>
                <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>F. Financing Options</Text>
                <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>
                    {`
                    ${nameOfSeniorAttorney} raised questions regarding the clients budget and financing options. The client disclosed that he is considering paying the outright fee for the property. He also added that he will be leasing the property once the agreement is finalised.
                    `}
                </Text> 
            </View>
         )}

         <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>F. Adjournment</Text>
        <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{`The meeting was adjourned at about ${timeOfAdjournment}`}</Text>

        <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>PREPARED BY: </Text>
        <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>{nameOfSupportingAttorney}</Text>

      </Page>
    </Document>
    
  )
}
