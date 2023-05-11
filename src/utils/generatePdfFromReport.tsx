import React from 'react';
import Report from "./ReportInt";
import ReactDOM from 'react-dom';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

const generatePdfFromReport =(report: Report)=>{
  // ReactDOM.render(<MyDocument/>, document.getElementById('root'))
}

const MyDocument = () => (
  <div className='fixed'>
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
  </div>
  
);

export default generatePdfFromReport