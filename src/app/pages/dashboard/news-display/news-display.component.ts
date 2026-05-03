import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-news-display',
  templateUrl: './news-display.component.html',
  styleUrls: ['./news-display.component.scss']
})
export class NewsDisplayComponent implements OnInit {

  title: string;
  content: SafeHtml;
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private DomSanitizer: DomSanitizer
  ) {
    this.title = data.title;
    this.content = this.DomSanitizer.bypassSecurityTrustHtml(data.content);
  }

  ngOnInit() {
  }

}
