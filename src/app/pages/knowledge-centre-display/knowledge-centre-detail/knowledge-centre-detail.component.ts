import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KnowledgeCentreService } from 'app/services/knowledge-centre.service';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'environments/environment';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-knowledge-centre-detail',
  templateUrl: './knowledge-centre-detail.component.html',
  styleUrls: ['./knowledge-centre-detail.component.scss']
})
export class KnowledgeCentreDetailComponent implements OnInit, OnDestroy {

  title: string;
  content: SafeHtml;
  knowledgeCID: number;
  dataToShow;
  attachments;
  attchementLength: number;
  filePath: string;
  uploadDir: string = 'knowledge-centre'
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private knowledgeService: KnowledgeCentreService,
    private DomSanitizer : DomSanitizer
  ) {
    this.knowledgeCID = data.knowledgeCID;
  }

  ngOnInit() {
    this.filePath = environment.filepath + this.uploadDir;

    this.dataFetch();
  }

  dataFetch() {
    this.knowledgeService.display(this.knowledgeCID).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.dataToShow = res;
      this.title = this.dataToShow.DocumentTitle;
      this.content = this.DomSanitizer.bypassSecurityTrustHtml(this.dataToShow.DocumentDescription);
      this.attachments = this.dataToShow.Attachments;
      this.attchementLength = this.attachments.length;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
