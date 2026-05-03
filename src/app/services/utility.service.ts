import { Injectable } from '@angular/core';
// import * as jspdf from 'jspdf';
// import html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js'
//(window as any).html2canvas = html2canvas;


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public captureScreen(element,filename) {
    var opt = {
      margin:       0.5,
      filename:     filename+'.pdf',
      image:        { type: 'png' },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }
}
