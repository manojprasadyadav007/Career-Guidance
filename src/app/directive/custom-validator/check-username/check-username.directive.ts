import { Directive, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { FormControl, Validator,  NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Directive({
  selector: '[appCheckUsername]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CheckUsernameDirective, multi: true}]
})
export class CheckUsernameDirective implements Validator,OnDestroy  {

  @Input()
  appCheckUsername:boolean;

  @Input()
  ignoreValue:string;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private userService:UserService) { }

  validate(c: FormControl): {[key: string]: any} {

    return new Promise(resolve =>
      {
        if(this.appCheckUsername && c.value != this.ignoreValue)
        {
          if(c.errors)
          {
            return resolve(null);
          }

          this.userService.checkUserName(c.value).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
            if(res.length>0)
            {
             return resolve({ isUserExists: { valid: false } });
            }
            else
            {
               return resolve(null);
            }
            //return (res.length>0) ? {"isUserExists": true} : null;
          });
        }
        else
        {
          //return null;
          return resolve(null);
        }
      }
      );
    //return ( v > this.appCheckUsername)? {"isUserExists": true} : null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
 
 private _onChange: () => void;

 ngOnChanges(changes: SimpleChanges): void {
    if ('isUserExists' in changes) {
      if (this._onChange) this._onChange();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
