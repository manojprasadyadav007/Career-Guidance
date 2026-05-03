export interface StudentSchool
{
    SchoolId: number;
    ParentId: number;
    ParentType: number;
    LevelOfEducation: number;
    LevelOfEducationName: string;
    CountryOfInstitution: number;
    CountryOfInstitutionName: string;
    NameOfInstitution: string;
    Language: string;
    AttendendFrom: Date | string;
    AttendendTo: Date | string;
    Degree: string;
    DegreeAwardedOn: Date | string;
    Addres: string;
    City: string;
    Province: any;
    Pincode: string;
    Marks:SchoolMarks[];
    StreamId: number;
}

export interface SchoolMarks
{
    SubjectId:number;
    SubjectName:string;
    MaxMarks:string;
    MinMarks:string;
    ObtainMarks:string;
    GradeName?:string;
}