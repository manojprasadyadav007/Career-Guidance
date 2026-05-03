import { Directive, Input, Host } from '@angular/core';
import { NgForOf } from '@angular/common';

@Directive({
  selector: '[ngForTrackByProperty]'
})
export class NgForTrackByPropertyDirective<T> {

  @Input()
  public ngForTrackByProperty: keyof T;

  constructor(@Host() private ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = (index: number, item: T) => {
      if (this.ngForTrackByProperty) {
        return item[this.ngForTrackByProperty];
      }
  
      return item;
    };
  }

}
