import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from 'app/models/country-model';
import { City } from 'app/models/city-model';
import { Province, ProvinceForString } from 'app/models/province-model';
import { InstType } from 'app/models/inst-type.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  APIURL:string= environment.apiurl+"Misc/";

  constructor(private http:HttpClient,private sanitizer: DomSanitizer) { }
  
  eduLevel():Observable<any[]>{
    return this.http.get<any[]>(this.APIURL+"EduLevels");
  }

  gradeScheme():Observable<any[]>{
    return this.http.get<any[]>(this.APIURL+"GradeSchemes");
  }


  gradeSchemeByCountry(countryId:number){
    return this.http.get<any[]>(this.APIURL+"GradeSchemesByCountry?CountryId="+countryId);
  }

  country():Observable<Country[]>{
    return this.http.get<Country[]>(this.APIURL+"Country");
  }

  city(province:number):Observable<City[]>{
    return this.http.get<City[]>(this.APIURL+"City?Province="+province);
  }

  getRegion(institutionId: number){
      return this.http.get<any[]>(this.APIURL+"RegionList?InstitutionId="+institutionId);
  }

  countryByRegion(institutionId: number, regionId: number ){
    return this.http.get<any[]>(this.APIURL+"CountryByRegion?InstitutionId="+institutionId+"&RegionId="+regionId);
  }

  forDropDownOpenOnly(instId){
    return this.http.get<any[]>(this.APIURL+"ForDropDownOpenOnly?InstitutionId="+instId);
  }

  province(country:number):Observable<Province[]>{
    return this.http.get<Province[]>(this.APIURL+"Province?Country="+country);
  }

  provinceForString(country:number):Observable<ProvinceForString[]>{
    return this.http.get<ProvinceForString[]>(this.APIURL+"Province?Country="+country);
  }
  
  provinceMultipleCountry(ContryId:number[]){
    return this.http.post<Province[]>(this.APIURL+"Province",ContryId);
  }

  provinceInstOriginOnly(ContryId:number[]){
    return this.http.post<Province[]>(this.APIURL+"ProvinceInstOriginOnly",ContryId);
  }
  
  ForDDLForPartner(){
    return this.http.get<any>(this.APIURL+"PartnerTypeForDDL");
  }

  currency():Observable<string[]>{
    return this.http.get<string[]>(this.APIURL+"Currency");
  }
  instituionType():Observable<InstType[]>{
    return this.http.get<InstType[]>(this.APIURL+"InstitutionType");
  }

  desciplines():Observable<any[]>{
    return this.http.get<any[]>(this.APIURL+"Desciplines");
  }

  disciplinesGroup():Observable<any[]>{
    return this.http.get<string[]>(this.APIURL+"DisciplineGroups");
  }

  subDesciplines(decsiplines:number[]){
    return this.http.post<any[]>(this.APIURL+"SubDesciplines",decsiplines);
  }

  institutionForFilter(data:any){
    return this.http.post<any[]>(this.APIURL+"InstitutionForFilter",data);
  }

  inteksForFilter(){
    return this.http.post<any[]>(this.APIURL+"IntekListForFilter",{});
  }

  language() {
    return this.http.get<any[]>(this.APIURL+"Language");
  }

  document(parentType:number) {
    return this.http.get<any[]>(this.APIURL+"Document?ParentType="+parentType);
  }

  subject() {
    return this.http.get<any[]>(this.APIURL+"Subject");
  }

  printTest()
  {
     return this.http.post<string>(this.APIURL+"PrintTest",{});
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  statuslist(ActivityType:number,RoleId:number) 
  {
    return this.http.get<any[]>(this.APIURL+"Status?ActivityType="+ActivityType+"&RoleId="+RoleId);
  }

  visaType(CountryId:number) 
  {
    return this.http.get<any[]>(this.APIURL+"VisaType?CountryId="+CountryId);
  }

  zone(CountryId:number) 
  {
    return this.http.get<any[]>(this.APIURL+"Zone?CountryId="+CountryId);
  }

  countryListForSearchProgram(){
    return this.http.get<any[]>(this.APIURL+"CountryForSearchProgram");
  }

  receiptTypeList(){
    return this.http.get<any[]>(this.APIURL+"ReceiptTypes");
  }

  
  countryWithGroup(instituteId:number){
    return this.http.get<any[]>(this.APIURL+"CountryWithGroup?InstitutionId="+instituteId);
  }

  serviceTerm(parentType:number)
  {
    return this.http.get<any>(this.APIURL+"ServiceTerm?ParentType="+parentType);
  }

  serviceTermAccept(parentType:number,parentId:number,key:string)
  {
    return this.http.post<any>(this.APIURL+"ServiceTermAccept",{ParentType:parentType,ParentId:parentId,Key:key});
  }

  department(){
    return this.http.get<any[]>(this.APIURL+"Department");
  }

  board(country:number){
    return this.http.get<any[]>(this.APIURL+"Board?Country="+country);
  }

  stream() {
    return this.http.get<any[]>(this.APIURL + 'StreamForDDL');
  }
  specialization(){
    return this.http.get<any[]>(this.APIURL+"Specialization");
  }

  instPageListParam1()
  {
    return this.http.get<any[]>(this.APIURL+"InstPage_ListParam1");
  }

  instPageListParam2()
  {
    return this.http.get<any[]>(this.APIURL+"InstPage_ListParam2");
  }

  countryInstOriginOnly()
  {
    return this.http.get<any[]>(this.APIURL+"CountryInstOriginOnly");
  }

  excelExtractedList(data:any[]){
    return this.http.post<any[]>(this.APIURL+"ImportEnrollment",{data});
  }

  excelBatchList(){
   const data =  of([{batchNo: "1" , date : "10/07/1993" , fileName: "File 1"},{batchNo: "2" , date : "11/07/1993" , fileName: "File 2"}])
    return data;
   //return this.http.get<any[]>(this.APIURL+"CountryInstOriginOnly");
  }
  excelBatchdataList(batchno:number){
    const list =  of([{'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},{'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},{'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},{'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},{'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    {'student Id' : '1' , 'first Name' : "mani" , "last Name" : "prasad"},{'student Id' : '2' , 'first Name' : "kapil" , "last Name" : "sharma"},
    
   ]);
   return list;
   // return this.http.get<any[]>(this.APIURL+"CountryInstOriginOnly&RoleId="+batchno);
  }

  payStripeLegacy(amount, currency, source, description) {
    return this.http.post<any>(environment.apiurl+"stripe/charge",{Amount: amount, Currency: currency, Source: source, Description: description});
  }
}
