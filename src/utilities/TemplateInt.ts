export interface Template {
    title: string,
    sections: {title: string, questions:string[], optional: boolean, type?: string}[],
}
