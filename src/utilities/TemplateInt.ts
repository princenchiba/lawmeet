export interface Template {
    title: string,
    sections: {title: string, questions:string[], optional: boolean, questionType?: string}[],
}