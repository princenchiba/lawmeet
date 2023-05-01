import Qna from "../utilities/QnaInt"

export default function SectionComponent(props:{section:{title:string, qnas:Qna[]}}) {

    const section = props.section

  return (
    <div className="mb-10">
        <p className="font-bold">{section.title}</p>
        {section.qnas.map(qna =>(
            <div className="mb-3">
                <p>{`Q: ${qna.question}`}</p>
                <p>{`A: ${qna.answer}`}</p>
            </div>
        ))}
    </div>
  )
}
