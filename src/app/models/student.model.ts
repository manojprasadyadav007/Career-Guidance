import { StudentSchool } from "./student-school.model";

export interface Student
{
    StudentId: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Gender: string;
    DateOfBirth: Date | string;
    Addres: string;
    City: string;
    Province: string;
    Country: number;
    Pincode: string;
    MobileNo: string;
    Email: string;
    MaritialStatus: string;
    Language: string;
    Citizenship: number;
    PassportNo: string;


    CountryOfEducation: number;
    HighestLevelOfEducation: number;
    GradingScheme: number;
    GradeAverage: string;
    GraduatedMostRecent: number;


    EnglishExamType: number;
    EnglishExamDate: Date | string;
    EnglishScoreL: number| string;
    EnglishScoreR: number| string;
    EnglishScoreW: number| string;
    EnglishScoreS: number| string;
    GREExamDate: Date | string;
    GREScoreV: number|string;
    GREScoreQ: number|string;
    GREScoreW: number|string;

    GMATExamDate: Date | string;
    GMATScoreA: number|string;
    GMATScoreI: number|string;
    GMATScoreV: number|string;
    GMATScoreQ: number|string;
  
    EduYearStart:string;
    EduYearEnd:string;
    EnglishScoreOverall: number| string;
    AgentId:number;
    PassportExpiryDate?:Date;
    LeadSource?:number;
    LeadStatus?:number;
}