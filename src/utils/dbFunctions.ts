import faunadb, {Client} from 'faunadb'
import createDbClient from './createDbClient';
import { Template } from './TemplateInt';
import Report from './ReportInt'

const client: Client = createDbClient()
const query = faunadb.query

export const listTemplates = async()=>{
    

    let templates: Template[] = []

   try{
    const templateIds: string[] = await listTemplateIds()
    for (let i=0; i<templateIds.length; i++){
        const res: any = await client.query(
            query.Get(
                query.Ref(
                    query.Collection('Templates'), templateIds[i]
                )
            )
        )
        const template:Template = res.data
        templates.push(template)
    }
   } catch(error){
    console.log('list templates error', error)
   }

   return templates
}


const listTemplateIds =async()=>{

    let templateIds: string[] = []

    interface Response{
        data: any
    }
    
    try{
        const res:Response = await client.query(
            query.Paginate(query.Match(query.Index('all_templates')))
        )
        for (let i=0; i<res.data.length; i++){
            const templateId: string = res.data[i].value.id
            templateIds.push(templateId)
        }
    }catch(error){
        console.log('db error', error)
    }

    return templateIds
}


export const createReport = async(report: Report)=>{

    try{
            const res = await client.query(
                query.Create(
                query.Collection('Reports'),
                { data: report },
                )
            )
            console.log('report created', res)
    } catch(e){
        console.log('report creation error', e)
    }
    

}

export const listReports = async () =>{
    let reports: Report[] = []

   try{
    const reportIds: string[] = await listReportIds()
    for (let i=0; i<reportIds.length; i++){
        const res: any = await client.query(
            query.Get(
                query.Ref(
                    query.Collection('Reports'), reportIds[i]
                )
            )
        )
        const report:Report = {id:reportIds[i], ...res.data}
        reports.push(report)
    }
   } catch(error){
    console.log('list reports error', error)
   }

   console.log('the reports', reports)
   return reports
}

const listReportIds =async ()=>{
    let reportIds: string[] = []

    interface Response{
        data: any
    }
    
    try{
        const res:Response = await client.query(
            query.Paginate(query.Match(query.Index('all_reports')))
        )
        for (let i=0; i<res.data.length; i++){
            const reportId: string = res.data[i].value.id
            reportIds.push(reportId)
        }
    }catch(error){
        console.log('db reports error', error)
    }

    return reportIds
}

export const deleteReport = async (id: string)=>{
    console.log(`deleting ${id}...`)
    try{
        await client.query(query.Delete(query.Ref(query.Collection('Reports'), id)))
    } catch(e){
        console.log(e)
    }
}