import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
declare var FlywireIntegration: any;
declare var StripeCheckout: any;

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit, OnDestroy {

  amount = 10000;
  description = 'Course Enrollment';
  handler: any;
  confirmationForLegacyStripe: any;
  legacyMessage = '';

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private misc: MiscService) { }

  ngOnInit() {

    // Code for Stripe Legacy
    this.handler = StripeCheckout.configure({
      key: 'pk_test_51Iag9FSHC7g52UTA3WAH4sEHijZScOJVmrDtYiiYWMOn7Nu3c8caGxwIDcUlQb3uqfnyFKnHfm3xgCu5Va1tSGD000g6se9AtP',
      image: 'assets/img/MyMSM_logo_1.png',
      locale: 'auto',
      source: async (source) => {
        console.log(source);
        this.misc.payStripeLegacy(this.amount, 'inr', source.id , 'Course Enrollment').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.confirmationForLegacyStripe = res;
          if(this.confirmationForLegacyStripe.status) {
            if(this.confirmationForLegacyStripe.status === 'succeeded') {
              this.legacyMessage = 'Payment Successful';
            } else {
              this.legacyMessage = this.confirmationForLegacyStripe.failure_message;
            }
          } else {
            this.legacyMessage = this.confirmationForLegacyStripe.Message;
          }
        }, err => {
          // Handle error
        });
      }
    });
  }

  // Code for Stripe
  checkoutStripeLegacy(e) {
    this.handler.open({
      name: 'MSM',
      description: this.description,
      email: 'support@msquaremedia.com'
    });
    e.preventDefault();
  }

  // Code for Stripe
  @HostListener('window.popstate')
  onPopstate() {
    this.handler.close();
  }

  // Code for Flywire
  pay(e: any) {
    var values = {
      reference: 'VNYW0L', 
      email: 'emma.smith@company.com',
      first_name: 'Emma', 
      last_name: 'Smith',
      country: 'US', 
      phone: '9376553283' 
      };
      e.preventDefault();
      var callbacks = {
        onClose: function () {
          console.log("PAYMENT EXPERIENCE FINISHED");
        }
      };
      // Initiate the Flywire integration window
      FlywireIntegration.initiate(values, callbacks);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
