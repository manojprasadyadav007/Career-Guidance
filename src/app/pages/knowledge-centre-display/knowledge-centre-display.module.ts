import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { KnowledgeCentreDisplayComponent } from './knowledge-centre-display.component';
import { KnowledgeCentreDetailComponent } from './knowledge-centre-detail/knowledge-centre-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module'
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';





@NgModule({
  declarations: [KnowledgeCentreDisplayComponent, KnowledgeCentreDetailComponent],
  imports: [
    RemoveSpacesModule,
    SentenceCaseModule,
    CommonModule,
    MatButtonModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatOptionModule,
    FormsModule,
    TrackByPropertyModule,
    RouterModule.forChild([
      {
        path: '', component: KnowledgeCentreDisplayComponent
      }
    ]),
  ],
  exports: [],
  entryComponents: [KnowledgeCentreDetailComponent]
})
export class KnowledgeCentreDisplayModule { }
