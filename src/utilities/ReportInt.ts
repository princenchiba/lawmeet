import Qna from "./QnaInt"

export default interface Report {
    title: string,
    sections: {title: string, qnas: Qna[]}[]
}