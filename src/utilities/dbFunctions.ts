import faunadb, {Client} from 'faunadb'
import createDbClient from './createDbClient';
import { Template } from './TemplateInt';

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