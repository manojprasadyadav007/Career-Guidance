import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentApplicationService } from 'app/services/agent-application.service';
import { ActivatedRoute } from '@angular/router';
import { defaultOptions } from 'ngx-extended-pdf-viewer';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.scss']
})
export class GeneratePdfComponent implements OnInit , OnDestroy {

  data: string;

  public mobileFriendlyZoomSetting = '150%';

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private agentApplicationService: AgentApplicationService, private activateRoute: ActivatedRoute) {
    defaultOptions.workerSrc = './assets/pdf.worker.js';
  }

  ngOnInit() {
    this.activateRoute.paramMap
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.print(+res.get('id'))
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  print(id:number)
  {
    this.agentApplicationService.print(id)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.data = res;
    });
  }


}
