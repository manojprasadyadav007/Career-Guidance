import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
@Component({
  selector: 'app-new-institution-tiles,[app-new-institution-tiles]',
  templateUrl: './new-institution-tiles.component.html',
  styleUrls: ['./new-institution-tiles.component.scss']
})
export class NewInstitutionTilesComponent implements OnInit, OnDestroy {

  
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor( ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  
}