
export enum sitemap {
  Institutions = 1,
  Users = 2,
  
  Students = 3,
  Applications = 4,
  InvoiceGenerate = 5,
  InvoiceView = 6,
  Agent = 7,
  Reports_DailySales = 9,
  Reports_ProgramWise = 10,
  Reports_NewApplication = 11,
  Reports_DeferredApplication = 12,
  Reports_ArrivalApplication = 13,
  Reports_RefundTracker = 14,
  Reports_AgentInvoiceTracker = 15,
  Lead = 16,
  Campaign = 17,
  ProgramSearch = 18,
  Opportunity = 19,
  RetrieveApplication = 20,
  Reports_PassportExpiry = 21,
  News = 22,
  Institution_Agreement = 23,
  Agent_Agreement = 24,
  Fee_Waiver = 25,
  NotificationManager = 26,
  Reports_Mobility = 27,

  Reports_GrowthAnalysis = 28,
  Reports_StudentAnalysis = 32,
  Reports_DailySalesWithRevenue = 34,
  Reports_AgentRefundTracker = 35,
  Reports_ConversionRatio = 36,
  Reports_CommissionTracker = 38,
  FeedbackReport = 39,
  InvoiceMapCommission = 40,

  AgentEvaluationForm = 42,
  Commission = 43,
  KnowledgeCentre = 45,
  Reports_AEF_data = 44,

  agent_IntakewiseSummary = 46,
  institute_Countrywisesummary = 47,
  institute_Intakewisesummary = 48,
  agent_Institution_Intakewisesummary = 49,
  agent_Institute_Intakewise_Performance = 50,
  institute_Agentgrowth = 51,
  institutet_Opten_Program = 52,
  pending_Offerletter_Canada = 53,
  pending_Offerletter_Uk = 54,
  summaryof_Refund = 55,
  sales_Report_Canada = 56,
  sales_Report_Usa = 57,
  sales_Report_Uk = 58,
  sales_Report_Hungary = 59,
  aef_Missing_Data = 60,
  Agent_Activity = 61,
  weekly_dashboard = 62,
  Excel_Export = 64,
  Agent_Document = 65,
  Reports_UserActivity = 66,
  agent_ZonewiseReport = 67,
  marketing_Activity = 68,
  topten_agent_performance = 69,
  state_wise_Programwisesummary = 70,
  User_Agent_Assignment = 71,
  refund = 72,
  ghost_login = 73,
  mydoucument =74,
  Marketing_Event = 75,
  Marketing_Agent_Activity = 76,
  marketing_reports =77,
  agent_calling = 78,
  commission_report = 79,
  Institute_Detail = 1001,
  Programs = 1002,
  Campus = 1003,
  Region_of_Marketing = 1004,
  Disciplines = 1005,
  Intakes = 1006,
  Marketing_Collateral = 1007,
  Events = 1008,
  Activity = 1015,
  Application_Flow = 1009,
  Team = 1010,
  Institute_Agents = 1011,
  Institute_BulkProgramUpdate = 1012,
  Group_Visibility = 1013,
  Document = 1014

}

// //Description config 
// export const DocDescription = {agentDoc:true }
   

// Microsoft Authentication Starts
export class microsoftUser {
  displayName: string;
  email: string;
  avatar: string;
  id: string;
  firstName: string;
  lastName: string;
}
export class Event {
  subject: string;
  organizer: Recipient;
  start: DateTimeTimeZone;
  end: DateTimeTimeZone;
  id: string;
}
export class Recipient {
  emailAddress: EmailAddress;
}
export class EmailAddress {
  name: string;
  address: string;
}

export class DateTimeTimeZone {
  dateTime: string;
  timeZone: string;
}

// Microsoft Authentication Ends

export enum documentStatus {
  Pending = 0,
  UploadDone = 1,
  Approved = 2,
  Rejected = 3
}

export enum leadStatus {
  Open = 1,
  Working = 2,
  Converted_Close = 3,
  NotConverted_Close = 4
}

export enum leadSource {
  Web = 1,
  Phone_Enquery = 2,
  Partner_Referral = 3,
  Purchased_List = 4,
  Other = 5
}

export enum campaignTypes {
  Conference = 1,
  Webinar = 2,
  Trade_Show = 3,
  Public_Relations = 4,
  Partners = 5,
  Referral_Program = 6,
  Advertisement = 7,
  Banner_Ads = 8,
  Direct_Mail = 9,
  Email = 10,
  Telemarketing = 11,
  Other = 12,
}

export enum campaignStatus {
  Planned = 1,
  In_Progress = 2,
  Completed = 3,
  Aborted = 4,
}

export enum attendeType {
  Attende = 1,
  Paritcipant = 2,
  Assignee = 3
}

export enum parentType {
  Campaign = 1,
  Event = 2,
  Task = 3,
  Institute = 4,
  Program = 5,
  Student = 6,
  Application = 7,
  Lead = 8,
  Agent = 9,
  User = 10,
  AgentReference = 11,
  InvoiceTransactions = 12,
  KnowledgeCentre = 13,
  AEFReferenceCheck = 14,
  StudyPermit = 15,
  ApplicationRefund = 16
}

export enum taskStatus {
  Not_Started = 0,
  In_Progress = 1,
  Completed = 2,
  Closed = 3,
  Deferred = 4
}

export enum recurringMode {
  Daily = 0,
  Weekly = 1,
  Monthly = 2,
  Yearly = 3
}

export enum taskPriority {
  Low = 0,
  Medium = 1,
  High = 2
}

export enum campaignActivityType {
  Meeting = 0,
  Call = 1,
  Call_Reply = 2,
  Mail = 3,
  Mail_Reply = 4
}

export enum applicationStatus {
  Under_Process = -1,
  Pending_Document = 1,
  Approved = 2,
  Rejected = 3,
  Wait_Listed = 4,
  Seat_Full = 5,
  Program_Closed = 6,
  Offer_Letter_Issued = 7,
  Tution_Fee_Pending = 8,
  Receipt_Upload = 9,
  Waiting_For_LOA = 10,
  LOA_Received = 11,
  Waiting_For_Visa_Status = 12,
  Study_Permit_Approved = 13,
  Study_Permit_Rejected = 14,
  Deferred = 15,
  Drop_Out = 16,
  Fee_Deposit_1st_Semester = 17,
  Fee_Deposit_2nd_Semester = 18,
  Tution_Fee_Deposited = 19,
}

export enum RoleTypes {
  Other = 0,
  Employee = 1,
  Institution = 2
}

export enum InvoiceStatus {
  Submition_Pending = 0,
  Submited_For_Approval = 1,
  Rejected_For_Correction = 2,
  Submited_To_Institute_For_Payment = 3,
  Rejected_For_Correction_By_Institution = 4,
  Accepted = 5
}

export enum AgentEvolutionFormStatus {
  Submission_Pending = -1,
  Review_Pending = 0,
  Review_In_Process = 1,
  Rejected = 2,
  Approved = 3
}


export enum programModes {
  Full_Time = 1,
  Part_Time = 2,
  Online = 3
}

export enum Role {
  Admin = 1,
  Agent = 2,
  Student = 3,
  Institute = 100
}
export enum RoleType {
  MSMTeam = 1,
  Institute = 2,
  Other = 0
}

export const editorlist = ["undo", "redo", "separator",
  "separator", {
    formatName: "size",
    formatValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt']
  }, {
    formatName: "font",
    formatValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana']
  }, "separator",
  "bold", "italic", "strike", "underline", "separator",
  "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
  "orderedList", "bulletList", "separator",
  , {
    formatName: "header",
    formatValues: [false, 1, 2, 3, 4, 5]
  }, "color", "background", "separator", "link", "image", "clear", "codeBlock", "blockquote",
];


export function enumToArray(definition) {
  return Object.keys(definition).filter(value => Number.isFinite(+value))
    .map(key => ({ value: +key, text: definition[key].replace(/_/g, ' ') }));
}

export function enumToName(e: any, id: number) {
  var value = e[id];
  if (value) {
    return value.replace(/_/g, ' ');
  }
  else {
    return '';
  }
}


export const appPattern = {
  score: /^((100)|([0-9]{1,2}[\.][0-9]{1,2})|([A-D])(?:-|\+)|([A-F])|([0-9]{1,2}))$/,
  dropDownNumericValue: /^[1-9]\d*$/,
  title: /^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/,
  dropDownNumericValueWithMinus: /^[1-9\-]\d*$/,
  dropDownNumericValueWith0: /^[0-9]\d*$/,
  dropDownNumericValueWithMinusAnd0: /^[0-9\-]\d*$/,
  //phoneno: /^([+][1-9]{1,3}[\s\-][1-9]{3}[\s\-]{0,1}[0-9]{3}[\s\-]{0,1}[0-9]{4,11})$/,
  phoneno: /(^\+\d[0-9\s\-()]{1,48}$)|(^\d{8,15}$)/,
  fileexplorename: /^[0-9a-zA-Z ... ]+$/,
  newPhoneno: /^(?=.*[0-9])[+()0-9]+$/,
  PhoneWithPlusAtStart: /^\+*\d(?=.*[0-9])[()0-9]+$/,
  newPhoneRegrex: /^[\+\d]?(?:[\d-.\s()]*)$/,
  //custom : /^[\+\d]?(?:[\d-.\s()]*)[\)\d]$/,
  customphone:/(^\+\d[0-9\s-()]{1,48}$)|(^\d{8,15}$)/,
  //mobileno: /^([+][1-9]{1,3}[\s\-][1-9]{3}[\s\-]{0,1}[0-9]{3}[\s\-]{0,1}[0-9]{4,11})$/,
  mobileno: /(^\+\d[0-9\s\-()]{1,48}$)|(^\d{8,15}$)/,
  email: /^(?=[^@]*[A-Za-z])[^\W|_/\s][\w\-\.]+@([\w\-]+\.)+[\w\-]{2,20}$/,
  //phoneNoHintTooltip: "+11 111-111-1111XXXXXXX, +11 111 111 1111XXXXXXX, +11 1111111111XXXXXXX",
  phoneNoHintTooltip: "",
  //phoneNoHintLabel: "with country code e.g.",
  phoneNoHintLabel: "",
  //mobileNoHintTooltip: "+11 111-111-1111XXXXXXX, +11 111 111 1111XXXXXXX, +11 1111111111XXXXXXX",
  mobileNoHintTooltip: "",
  //mobileNoHintLabel: "with country code e.g.",
  mobileNoHintLabel: "",
  smtpPort:/^\d{0,4}$/,
  UserName:/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$|^(?=[^@]*[A-Za-z])[^\W|_/\s][\w\-\.]+@([\w\-]+\.)+[\w\-]{2,20}$/,
  // InstPort:/^[0-9]*$/,
  // ipv4:/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b)/,
  // ipv6:/(^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$)/,
  // hostname:/^(?:[a-z0-9]+(?:-[a-z0-9]+)*\.){1,2}[a-z]{2,12}$/,
   //newHost:(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))
  //smtpServer:/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b|^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$|^(?:[a-z0-9]+(?:-[a-z0-9]+)*\.){1,2}[a-z]{2,12}$/,
  smtpServer:/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$|^[a-zA-z0-9][a-zA-z0-9-]+\.(.[a-zA-Z]{1,})+/,
  ifcsPattern: /^[A-Za-z]{4}[0]{1}[0-9A-Za-z]{6}/,
  swiftCodePattern: /^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?/,
  pincode: null,///^[a-zA-Z0-9][a-zA-Z0-9\- ]{0,10}[a-zA-Z0-9]$/,
  pincodeMaxLength: 11,
  alphaNumericWithSpace: /^[a-z][0-9]|^[a-z][a-z0-9\s]+$/i,
  alphaNumericWithSpecialCharacters: /^[^\W|_/\s][ \w\d\W|_/]*$/i,
  alphaNumericWithoutSpecialCharacters: /^[a-zA-Z]+\.[a-zA-Z]{4,10}^/,
  custom: /^(?=.*[^\W|_/\s])[ \w\d\W|_/]*$/i,
  nameWithoutSpecialCharWithSpace: /^(?!\d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 ]*)?$/,
  //new aplhanumeric -alternative one 
  alphaNumericWithSpecialReg: /^(?=.*[a-zA-Z])(?=.*[0-9a-z])[A-Za-z0-9\s]+$/,
  //Sep-2001 pattern
  monthWithYear: /^[A-Za-z]{3}\-(?!0+$)\d{4}$/,
  //numberic ||  N/A 
  numbericOrNA: /^(?:(?!0+$)[0-9]{1,2}|NA|n\/a)$/i,
  // alphanumeric with rang 
  alphaNumericWithSpaceWithRang: /^(?!\s)[a-z]([a-zA-Z0-9\s]{2,100})(?!\s)$/i,
  // /^[a-z0-9](?!.*?[^\na-z-@&$]{2}).*?[a-z0-9]+$/i,
  campusName : /^[^\d|\W|_/\s][a-zA-Z-\s0-9@]*$/i,
  alphaNumericWithSpaceNew: /^[^\d|\W|_/\s][a-zA-Z0-9-\s]*$/i,
  agentCode: /^[a-z0-9][a-z0-9\s]+$/i,
  studentID: /^[a-z0-9][a-z0-9-/\\s]+$/i,
  fax: '^(\+?\d{1,}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{3,})$',
  url: /^(ftp|http|https):\/\/[^ "]+$/,
  panNo: /^[A-Z]{5}[0-9]{4}[A-Z]{1}/,
  onlyNumbers: /^[0-9]{1,9}$/,
  skypeId: /^[^\W|_/\s][\w\d\S|_/]*$/i,
  personName: /^[^\d][a-z0-9]+$/i,
  personFullName: /^[^\d|\W|_/\s][a-zA-Z0-9-\s]*$/i,
  numberwithDecimals: /^-?[\d]{0,10}((\.)[\d]{1,2})?$/

}

export const AppDefaultValue = {
  tokenPath: 'currentUserV5',
  menuPath: 'currentMenu',
  eligiblityKey: 'eligD1',
  filterKey: 'filter',
  User: {
    UserId: 0,
    UserName: 'guest',
    DisplayName: 'Guest',
    ProfileImage: '',
    EmailId: '',
    PartnerTypeId: 0,
    MobileNo: '',
    isActive: 1,
    RoleId: 0,
    isDefault: 0,
    RefId: 0,
    Token: '',
    AccountVerificationStatus: 0,
    Permission: [],
    isPrimary: 0,
    RoleType: 0,
    isViewCT: false
  },
  studentDocuments: [{
    DocumentName: 'Degree Certificate', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'English Proficiency (Confirmation of Test Date)', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Higher Secondary School Transcript', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Passport', required: true, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Secondary School Transcript', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Transcript of all semester marksheet', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'LOR- Letter of Recommendation', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'SOP- Statement of Purpose', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Backlog Summary', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Higher Secondary School Admit Card (In case higher Secondary Certificate is pending)', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Bank Account statement with the amount of $19935', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Personal Statement', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Fitness Certificate', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  ],
  agentDocuments: [{
    DocumentName: 'Logo', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Business Certificate', required: true, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Bank authorization form', required: true, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Void Cheque', required: true, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Director Photo', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Director Passport', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Director Qualification Certificate', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Overall appearance of operations', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Professional Affiliations/Registered with Government Authorities', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  {
    DocumentName: 'Letter Head', required: false, sizelimit: 0, acceptformat: '*/*'
  },
  ],
  documentStatus: documentStatus,
  englishExamRange: [
    {
      Type: -1, AMin: 0, AMax: 0, BMin: 0, BMax: 0, CMin: 0, CMax: 0, DMin: 0, DMax: 0, EMin: 0, EMax: 0, Increment: 0,
      pattern: null,
      showUsername: false,
      ALabel: '', BLabel: '', CLabel: '', DLabel: '', ELabel: '',
      ShowA: false, ShowB: false, ShowC: false, ShowD: false, ShowE: false,
      Name: 'Not Applicable'
    },
    {
      Type: 0, AMin: 0, AMax: 0, BMin: 0, BMax: 0, CMin: 0, CMax: 0, DMin: 0, DMax: 0, EMin: 0, EMax: 0, Increment: 0,
      pattern: null,
      showUsername: false,
      ALabel: '', BLabel: '', CLabel: '', DLabel: '', ELabel: '',
      ShowA: false, ShowB: false, ShowC: false, ShowD: false, ShowE: false,
      Name: 'None'
    },
    {
      Type: 1, AMin: 0, AMax: 9, BMin: 0, BMax: 9, CMin: 0, CMax: 9, DMin: 0, DMax: 9, EMin: 0, EMax: 9, Increment: 0.5,
      pattern: /^[0-9]+(\.[5])?$/,
      showUsername: false,
      ALabel: 'Listening', BLabel: 'Reading', CLabel: 'Writing', DLabel: 'Speaking', ELabel: 'Overall',
      ShowA: true, ShowB: true, ShowC: true, ShowD: true, ShowE: true,
      Name: 'IELTS'
    },
    {
      Type: 2, AMin: 10, AMax: 90, BMin: 10, BMax: 90, CMin: 10, CMax: 90, DMin: 10, DMax: 90, EMin: 10, EMax: 90, Increment: 1,
      pattern: /^[0-9]+(\.[0-9][0-9]?)?$/,
      showUsername: true,
      ALabel: 'Listening', BLabel: 'Reading', CLabel: 'Writing', DLabel: 'Speaking', ELabel: 'Overall',
      ShowA: true, ShowB: true, ShowC: true, ShowD: true, ShowE: true,
      Name: 'PTE'
    },
    {
      Type: 3, AMin: 1, AMax: 30, BMin: 1, BMax: 30, CMin: 1, CMax: 30, DMin: 1, DMax: 30, EMin: 0, EMax: 120, Increment: 1,
      pattern: /^[0-9]+(\.[0-9][0-9]?)?$/,
      showUsername: true,
      ALabel: 'Listening', BLabel: 'Reading', CLabel: 'Writing', DLabel: 'Speaking', ELabel: 'Overall',
      ShowA: true, ShowB: true, ShowC: true, ShowD: true, ShowE: true,
      Name: 'TOEFL iBT'
    },
    {
      Type: 4, AMin: 310, AMax: 677, BMin: 310, BMax: 677, CMin: 310, CMax: 677, DMin: 310, DMax: 677, EMin: 310, EMax: 677, Increment: 1,
      pattern: /^[0-9]+(\.[0-9][0-9]?)?$/,
      showUsername: true,
      ALabel: 'Listening', BLabel: 'Reading', CLabel: 'Writing', DLabel: 'Speaking', ELabel: 'Overall',
      ShowA: true, ShowB: true, ShowC: true, ShowD: true, ShowE: true,
      Name: 'TOEFL PBT'
    },
    {
      Type: 5, AMin: 0, AMax: 100, BMin: 0, BMax: 100, CMin: 0, CMax: 97, DMin: 1, DMax: 4, EMin: 0, EMax: 99, Increment: .5,
      pattern: /^[0-9]+(\.[0-9][0-9]?)?$/,
      showUsername: false,
      ALabel: 'Listening', BLabel: 'GCVR', CLabel: 'Writing', DLabel: 'Speaking', ELabel: 'Final MELAB',
      ShowA: true, ShowB: true, ShowC: true, ShowD: true, ShowE: true,
      Name: 'MELAB'
    },
    {
      Type: 6, AMin: 10, AMax: 90, BMin: 10, BMax: 90, CMin: 10, CMax: 90, DMin: 10, DMax: 90, EMin: 10, EMax: 90, Increment: .5,
      pattern: /^[0-9]+(\.[0-9][0-9]?)?$/,
      showUsername: false,
      ALabel: 'Listening', BLabel: 'Reading', CLabel: 'Writing', DLabel: 'Speaking', ELabel: 'Overall',
      ShowA: true, ShowB: true, ShowC: true, ShowD: true, ShowE: true,
      Name: 'CAEL'
    },
    {
      Type: 7, AMin: 1, AMax: 300, BMin: 1, BMax: 300, CMin: 1, CMax: 300, DMin: 1, DMax: 300, EMin: 1, EMax: 300, Increment: 1,
      pattern: /^[0-9]+(\.[0-9][0-9]?)?$/,
      showUsername: true,
      ALabel: 'Listening', BLabel: 'Reading', CLabel: 'Writing', DLabel: 'Speaking', ELabel: 'Overall',
      ShowA: true, ShowB: true, ShowC: true, ShowD: true, ShowE: true,
      Name: 'TOEFL CBT'
    },
    {
      Type: 8, AMin: 0, AMax: null, BMin: 0, BMax: null, CMin: 0, CMax: null, DMin: 0, DMax: null, EMin: 10, EMax: 160, Increment: .5,
      pattern: null,
      showUsername: false,
      ALabel: '', BLabel: '', CLabel: '', DLabel: '', ELabel: 'Overall',
      ShowA: false, ShowB: false, ShowC: false, ShowD: false, ShowE: true,
      Name: 'Duolingo'
    },
    {
      Type: 9, AMin: 0, AMax: null, BMin: 0, BMax: null, CMin: 0, CMax: null, DMin: 0, DMax: null, EMin: 80, EMax: 230, Increment: 1,
      pattern: null,
      showUsername: false,
      ALabel: '', BLabel: '', CLabel: '', DLabel: '', ELabel: 'Overall',
      ShowA: false, ShowB: false, ShowC: false, ShowD: false, ShowE: true,
      Name: 'ESOL'
    },
    {
      Type: 10, AMin: 20, AMax: 90, BMin: 20, BMax: 90, CMin: 0, CMax: null, DMin: 0, DMax: null, EMin: 20, EMax: 90, Increment: 1,
      pattern: /^[0-9]+(\.[0-9][0-9]?)?$/,
      showUsername: false,
      ALabel: 'Listening', BLabel: 'English', CLabel: '', DLabel: '', ELabel: 'Overall',
      ShowA: true, ShowB: true, ShowC: false, ShowD: false, ShowE: true,
      Name: 'Oxford Online'
    },
    {
      Type: 11, AMin: 0, AMax: 190, BMin: 0, BMax: 190, CMin: 0, CMax: 190, DMin: 0, DMax: 190, EMin: 0, EMax: 190, Increment: .5,
      pattern: /^[0-9]+(\.[0-9][0-9]?)?$/,
      showUsername: false,
      ALabel: 'Listening', BLabel: 'Reading', CLabel: 'Writing', DLabel: 'Speaking', ELabel: 'Overall',
      ShowA: true, ShowB: true, ShowC: true, ShowD: true, ShowE: true,
      Name: 'Cambridge English'
    },
  ],
  appFeeType: ['Accommodation Fees', 'Airport Pick Up Fess', 'Application Fee', 'CAS Deposit', 'Deposit', 'Dormitory Fee', 'Examination Fee', 'Initial Deposit', 'Registration Fee', 'SEVIS Fees', 'Shipment for I-20 Fees', 'Tuition Fee','VISA Fees'],
  appFeeBasis: ['one-time', 'per month', 'per semester', 'per year', 'per course', 'per credit', 'per credit hour', 'per exam', 'per quarter']

}


export interface IComponent {
  id: string;
  componentRef: string;
}

export const defaultFilterData = {
  CountryOfEducation: 0,
  EduLevel: 0,
  GradeScheme: 0,
  GradeAverage: '',
  OnlyDirectAddmission: false,
  EnglishExamType: 0,
  EnglishExamL: '',
  EnglishExamR: '',
  EnglishExamS: '',
  EnglishExamW: '',
  Descipline: [],
  Nationality: 0,
  SortBy: '',
  ShowCommission: false,
  InstitutionType: [],
  InstitutionCountries: [],
  InstitutionProvinces: [],
  Institutions: [],
  ProgramLevel: 0,
  Inteks: [],
  SubDesciplines: [],
  Keyword: '',
  MinTutionFee: 0,
  MaxTutionFee: 200000,
  MinApplicationFee: 0,
  MaxApplicationFee: 100000,
  onCampus: false,
  offCampus: false,
  homeStay: false,
  postGraduateWithWork: false,
  programWithCoOpOption: false,
  conditionalOfferLetter: false,
  workWhileStudy: false,
  ProgramId: '',
  EnglishExamOverall: '',
  ProgramModes: [],
};

