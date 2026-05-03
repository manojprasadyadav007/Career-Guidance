import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringFilterforMultiBy'
})
export class stringFilterforMultiByPipe implements PipeTransform {

    transform(arr: any[], searchText: string, fieldName?: string,arryName? : string): any[] {
        if (!arr) return [];
        if (!searchText) return arr;
        searchText = searchText.toLowerCase();
        let cloned = arr.map(x => Object.assign({}, x));
        let finaldata = cloned.filter((it: any) => {
            // if (!it.orginialData) {
            //     //it.orginialData = Object.assign([], it[arryName]);
            //     it.orginialData = it[arryName].map(x => Object.assign([], x));
            // }
        
            //it[arryName] = it.orginialData;
            it[arryName] = it[arryName].filter(item => {
                return item[fieldName].toLowerCase().includes(searchText);
            });
            return it[arryName].length > 0;
        });
        return finaldata;
    }

}
