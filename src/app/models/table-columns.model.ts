export interface TableColumnInterface{
    columnDef:string;
    header:string;
    isTotal:boolean;
    cell?(element:any):any;
}
export class TableColumn implements TableColumnInterface
{
    columnDef:string;
    header:string;
    isTotal:boolean;
    cell?(element:any) {return  '${element.columnDef}'};
}
