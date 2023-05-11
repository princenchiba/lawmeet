import Qna from "./QnaInt"

export default interface Report {
    id: string
    title: string,
    sections: {title: string, qnas: Qna[]}[]
}