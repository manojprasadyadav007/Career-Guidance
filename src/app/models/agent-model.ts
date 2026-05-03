export interface MSMAgent
{
    AgentId: number;
    CompanyName: string;
    Website: string;
    SkypeId: string;
    WhatsappId: string;
    LegalFirstName: string;
    LegalLastName: string;
    Email: string;
    PhoneNo: string;
    PhoneNo1: string;
    CountryOfBusiness: number;
    StreetAddress: string;
    City: string;
    Province: string;
    Country: number;
    BankName: string;
    BankAddress: string;
    InstitutionNo: string;
    TransitNo: string;
    AccountNo: string;
    AccountName: string;
    Comment: string;
    AgentStatus: number;
    AddUserId: number;
    Zipcode: string;
    IFSCCode:string;
    SwiftCode:string;
    RefList?:any[],
    Document?:any[],
    PartnerTypeId: number,

    PrimContName: string;
    PrimContSkypeId: string;
    PrimContWhatsappId: string;
    PrimContEmail: string;
    PrimContPhoneNo: string;
    PrimContMobileNo: string;
    PrimContStreetAddress: string;
    PrimContCity: string;
    PrimContProvince: string;
    PrimCoutCountry: number;
    PrimContZipcode: string;
    SecondContName: string;
    SecondContSkypeId: string;
    SecondContWhatsappId: string;
    SecondContEmail: string;
    SecondContPhoneNo: string;
    SecondContMobileNo: string;
    SecondContStreetAddress: string;
    SecondContCity: string;
    SecondContProvince: string;
    SecondCoutCountry: number;
    SecondContZipcode: string;
    DirectorContName: string;
    DirectorContSkypeId: string;
    DirectorContWhatsappId: string;
    DirectorContEmail: string;
    DirectorContPhoneNo: string;
    DirectorContMobileNo: string;
    DirectorContStreetAddress: string;
    DirectorContCity: string;
    DirectorContProvince: string;
    DirectorCoutCountry: number;
    DirectorContZipcode: string;
 
    BranchName:string;
    BranchNo:string;
    PanNo:string;  
    currency:string;    
}