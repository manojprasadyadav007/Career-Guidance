import { Directive, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { StudentService } from 'app/services/student.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Directive({
  selector: '[appCheckPassportno]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: CheckPassportNoDirective, multi: true }]
})


export class CheckPassportNoDirective implements Validator, OnDestroy {

  @Input()
  appCheckPassportno: boolean;

  @Input()
  ignoreValue: string;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private studentService: StudentService) { }

  validate(c: FormControl): { [key: string]: any } {

    return new Promise(resolve => {
      if (this.appCheckPassportno && c.value != this.ignoreValue) {
        if (c.errors) {
          return resolve(null);
        }
        if (c.value === '') {
          return resolve(null);
        }

        this.studentService.checkPassportNo(c.value).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            return resolve({ isPassportExists: { valid: false } });
          }
          else {
            return resolve(null);
          }
          //return (res.length>0) ? {"isPassportExists": true} : null;
        });
      }
      else {
        //return null;
        return resolve(null);
      }
    }
    );

  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _onChange: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if ('isPassportExists' in changes) {
      if (this._onChange) this._onChange();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
