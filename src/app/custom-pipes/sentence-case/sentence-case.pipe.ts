import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase'
})
export class SentenceCasePipe implements PipeTransform {

  capitalValues: string;
  transform(value: string): string {
    if (!value) {
      return value;
    } else {
      this.capitalValues =
        value[0].toUpperCase() + value.substr(1).toLowerCase();
    }
    if (this.capitalValues.includes(" id")) {
      return this.capitalValues.replace(" id", " ID");
    }

    else if (this.capitalValues.indexOf("/") != -1) {
      var inputStr = this.capitalValues.split("/");
      for (var i = 1; i < inputStr.length; i++) {
        inputStr[i] = inputStr[i].charAt(0).toUpperCase() + inputStr[i].substring(1);
      }
      this.capitalValues = inputStr.join(" / ");
      return this.capitalValues
    }
    else {
      return this.capitalValues;
    }
  }

}
