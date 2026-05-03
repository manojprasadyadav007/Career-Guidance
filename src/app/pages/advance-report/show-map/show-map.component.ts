import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { UserLocationService } from 'app/services/user-location.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster/src/toaster.service';

@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.scss']
})
export class ShowMapComponent implements OnInit  , OnDestroy{
  today: Date = new Date();
  userList: any[];
  locationData: any[];
  formdata = {
    UserId: null,
    fromdate: this.today,
    todate: this.today
  }

  location = {
    latitude: -28.68352,
    longitude: -147.20785,
    mapType: "satelite",
    zoom: 17
  };
  userFilter:any='';
  startPoint: any;
  endPoint: any;



  @ViewChild('map', { static: true }) agmMap;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private userService: UserService,
    private userLocationService: UserLocationService,
    private authService: AuthenticationService,
    private router: Router,private toasterService: ToasterService) { }

  ngOnInit() {
    if (this.authService.checkPermission(sitemap.Reports_Mobility) <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }
    this.userService.forDDL('', '', 0, 0).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.userList = res;
    })
  }


  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  showMap() {
    this.locationData = [];
    this.startPoint = null;
    this.endPoint = null; 
    this.userLocationService.forMap(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.locationData = res;

      if (this.locationData.length > 0) {
        this.location.latitude = this.locationData[this.locationData.length - 1].lat;
        this.location.longitude = this.locationData[this.locationData.length - 1].lng;

        this.startPoint = this.locationData[0];
        this.endPoint = this.locationData[this.locationData.length - 1];
      }
      else{
        this.toasterService.pop("success","No Data Found");
      }
    });
  }




}
