import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'singleComma'
})
export class SingleCommaPipe implements PipeTransform {

    lastValue: string;
    transform(val, args: any[]): string {
        if(!args || !args.length) {return;}
        let cleanArray = args.filter(function (e) { return e });
        if (cleanArray.length) {
            cleanArray = cleanArray.map((item) => {
                return item.toString().replace(/^,|,$|(,+)/g, (g1) => g1 ? ',' : '')
                             .replace(/(^[,\s]+)|([,\s]+$)/g, '');
            });
        }
        return cleanArray.join();
    }
}



