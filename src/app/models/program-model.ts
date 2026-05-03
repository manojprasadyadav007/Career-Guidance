import { Campus } from "./campus-model";

export interface Program {
    ProgramId: number;
    ProgramName: string;
    ProgramCode:string;
    InstitutionId: number;
    DurationTime: string;
    DurationType: any;
    NoOfSemester: any;
    ApplicationFee: number;
    TutionFee: number;
    ProgramStatus: any;
    OfferLetterTAT: string;
    AddUserId: number;
    ProgramCurrency:string;
    Campus:number[];
    ProgramDescipline:number[];
    ProgramLevel:number;
    ProgramLink:string;
    Description:string;
    AverageProcessingDay:string;
    onCampus: boolean;
    offCampus: boolean;
    homeStay: boolean;
    postGraduateWithWork: boolean;
    programWithCoOpOption: boolean;
    conditionalOfferLetter: boolean;
    workWhileStudy: boolean;
    searchPriority:number,
    SpecializationId:number[],
    ProgramModes:number[],
    privateAccomodation: boolean;
}