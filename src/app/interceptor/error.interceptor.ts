import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthenticationService } from "app/services/authentication.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToasterService } from "angular2-toaster";
import { environment } from "environments/environment";
import { EMPTY} from 'rxjs';

@Injectable({
    providedIn:  'root'
  })
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toasterService:ToasterService,
        private inj: Injector) {
        }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                
               let auth = this.inj.get(AuthenticationService);                    
              auth.logout(true);  
              // location.reload(true);
               return EMPTY;
            }
            const error = err.error!=null && err.error.Message ? err.error.Message : err.statusText;
            if(request.url.toLocaleLowerCase().startsWith(environment.apiurl) && !request.url.toLocaleLowerCase().includes('refreshtoken'))
            {
                this.toasterService.pop("error",error);
            }
           // console.log(err);
            return throwError(err);
        }));
    }
}