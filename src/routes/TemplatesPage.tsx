import { useEffect, useState } from 'react';
import TemplateComponent from '../components/TemplateComponent'
import { listTemplates } from '../utilities/dbFunctions';
import { Template } from '../utilities/TemplateInt';

export default function TemplatesPage() {

  const [templates, setTemplates] = useState<Template[]>([])

    useEffect(()=>{
        loadTemplates()
    }, [])

    const loadTemplates =async()=>{
        let templates = await listTemplates()
        setTemplates(templates)
    }

  return (
    <div className='p-10 w-full'>
      <h2 className='text-5xl font-bold mb-5'>Templates</h2>
      <p className='text-sm opacity-50'>choose a template to create a report</p>

      <div className='mt-10 flex flex-wrap'>
        {templates.map(template =>(
          <TemplateComponent key={template.title} template={template}/>
        ))}
      </div>
    </div>
  )
}
