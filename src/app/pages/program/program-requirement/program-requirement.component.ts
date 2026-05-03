import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-program-requirement',
  templateUrl: './program-requirement.component.html',
  styleUrls: ['./program-requirement.component.scss']
})
export class ProgramRequirementComponent implements OnInit {

  @Input()
  programId: number = 0;

  @Input()
  permission:number=0;

  @Input()
  institutionId:number=0;

  constructor() { }

  ngOnInit() {
  }

}
