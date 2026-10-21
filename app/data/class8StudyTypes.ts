export type BookContent={title:string;pages:[number,number];author?:string;part?:string;sourceNumber?:number};
export type StudyGuide={summary:string;outcomes:string[];remember:string;question:string;answer:string;activity:string;terms:[string,string][]};
export type StudyEntry=BookContent&{number:number;guide:StudyGuide};
export type GuideRow=[summary:string,concept:string,meaning:string,remember:string,question:string,answer:string,activity:string];
export const guide=(row:GuideRow):StudyGuide=>({summary:row[0],outcomes:[row[1],row[2]],remember:row[3],question:row[4],answer:row[5],activity:row[6],terms:[[row[1],row[2]]]});
