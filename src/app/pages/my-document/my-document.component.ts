import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-my-document',
  templateUrl: './my-document.component.html',
  styleUrls: ['./my-document.component.scss']
})
export class MyDocumentComponent implements OnInit {
  transactionId:any = 8;
  permission:any=2;
  currentUser:any;
  originDetails:any;
  constructor( private authService:AuthenticationService,) { 
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = authService.checkPermission(sitemap.mydoucument);
    this.originDetails = 'studentDoc';
  }

  ngOnInit() {
  }

}
