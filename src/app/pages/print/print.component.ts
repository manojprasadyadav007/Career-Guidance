import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AgentApplicationService } from 'app/services/agent-application.service';
import { ApplicationService } from 'app/services/application.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvoiceService } from 'app/services/invoice.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit, OnDestroy {

  data: string;
  applicationId;
  agentApplicationId;
  invoiceId;
  title: string;
  public mobileFriendlyZoomSetting = '150%';
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private dialogref: MatDialogRef<PrintComponent>,
    private agentApplicationService: AgentApplicationService,
    private applicationService: ApplicationService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.applicationId = data.applicationId,
    this.agentApplicationId = data.agentApplicationId,
    this.title = data.title,
    this.invoiceId = data.invoiceId;
  }

  ngOnInit() {
    // this.route.queryParamMap.pipe(takeUntil(this.onDestroy$)).subscribe(res => {

    
    // });


    if (this.applicationId) {

      this.applicationService.print(this.applicationId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.data = res;
      });
    }
    else if (this.agentApplicationId) {

      this.agentApplicationService.print(this.agentApplicationId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.data = res;
      });
    }
    else if(this.invoiceId) {
      this.printInvoice(this.invoiceId);
    }
  }

  printInvoice(invoiceId: number) {
    if (invoiceId > 0) {
      this.invoiceService.print(invoiceId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.data = res;
      });
    }
  }


  cancel() {
    this.dialogref.close();
  }


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
