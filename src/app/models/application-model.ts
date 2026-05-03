import { Student } from "./student.model";

export interface Application extends Student{
   InstitutionId:number;
   ProgramId:number;
   ApplicationId:number;
   ApplicationStatus:number;
   IntekId:number;
   EnrollmentNo:string;
   AssignedTo:number;
   isSubmited?:number;
   currency?:string;
}