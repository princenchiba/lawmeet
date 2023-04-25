import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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

export default function PDFComponent() {
  return (
    <Document style={{backgroundColor: 'black'}}>
      <Page style={styles.page} size="A4">
        <Text style={{fontWeight:'bold', fontSize:20}}>
            MINUTES OF LEGAL BRIEFING WITH GEORGE MADUBUKO - STAC00318
        </Text>
        <Text style={{fontWeight:'light', fontSize: 10, marginTop:5}}>Data: 16-02-2021</Text>
        <Text style={{fontWeight:'light', fontSize: 10, marginTop:5}}>Location: Gwarinpe Estate 900108, Abuja, Federal Capital Territory, Nigeria</Text>

        <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>Legal Attendees:</Text>
        <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>Barr. Samuel Elogheme Esq.</Text>
        <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>James Nwankwo</Text>

        <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>Client Attendees:</Text>
        <Text style={{ fontSize:10, marginTop:5, fontWeight:'light'}}>George Madubuko</Text>
      </Page>
    </Document>
    
  )
}
