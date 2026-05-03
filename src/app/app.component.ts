import { Component} from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   public toasterConfig: ToasterConfig = 
   new ToasterConfig({
       showCloseButton: true, 
       tapToDismiss: false, 
       timeout: 5000
   });

   constructor(private router: Router) {
    if(document.location.href.includes("code")) {
      this.router.navigate(['signin'], { queryParams: { code: document.location.href.split('code=')[1].split('&state')[0] } });
    }
  }
}
