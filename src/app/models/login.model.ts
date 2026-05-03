export class Login
{
    UserId: number;
    DisplayName: string;
    UserName: string;
    MobileNo: string;
    EmailId: string;
    isActive: number;
    PartnerTypeId:number;
    RoleId: number;
    ProfileImage: string;
    isDefault:number;
    RefId:number;
    Token:String;
    AccountVerificationStatus:number;
    Permission:any[];
    isPrimary:number;
    RoleType: number;
    ProviderId?: string;
    ProviderName?: string;
    isViewCT:boolean;
    GenerateOn?:Date;
    InstitutionCount?:number;
    IsViewCTStatus?:boolean;
    BusinessCertFound?:number;
    GhostLogin?:string;
}