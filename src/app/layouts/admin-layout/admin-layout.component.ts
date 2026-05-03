import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';

import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from "jquery";
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { AppDefaultValue } from 'app/models/site-map.model';
//import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
//import { Keepalive } from '@ng-idle/keepalive';
import { MatDialog } from '@angular/material';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';

import { UserLocationService } from 'app/services/user-location.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { interval } from 'rxjs/internal/observable/interval';
import { SpinnerService } from 'app/services/spinner.service';



@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    showGhost:boolean=false;



    private onDestroy$: Subject<void> = new Subject<void>();

   

    currentUser: Login;
   // userMenu: any[];


    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    init:boolean=false;

    geosubid:number;
    geooption= {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    locationTimer;

    constructor(public location: Location, private router: Router,
        private authService: AuthenticationService,
      //  private idle: Idle, 
        private matDialog:MatDialog,
        private ngZone:NgZone,
        private userLocationService:UserLocationService,
        private spinnerService: SpinnerService
    ) {
    }

    setGhostLogin()
    {
        this.authService.currentUserSubject.pipe(takeUntil(this.onDestroy$))
        .subscribe((res)=>{
            if(res.GhostLogin)
            {
                this.showGhost=true;
            }
            else
            {
                this.showGhost=false;
            }
        })
    }

    ngOnInit() {


        // if(navigator.geolocation)
        // {
        //       this.geosubid = navigator.geolocation.watchPosition(function(pos){
        //            this.userService.locationAdd(
        //                {Coords:pos.coords.latitude+","+pos.coords.longitude,Accuracy:pos.coords.accuracy}
        //            );
        //       }, function(err){
        //         this.userService.locationAdd(
        //             {LocationError:err.message,ErrorCode:err.code}
        //         );
        //       }, this.geooption);
        // }
        // else{
        //     this.userService.locationAdd(
        //         {LocationError:'device not supported',ErrorCode:0}
        //     );
        // }

        this.authService.currentUserSubject.pipe(takeUntil(this.onDestroy$))
        .subscribe({
            next: (v) => {
                this.currentUser = v;
                if(this.init)
                {
                    if(v.UserId===0)
                    {
                        this.matDialog.closeAll();
                        this.ngZone.run(()=> {
                             this.router.navigate(['/signin'], { queryParams: { returnUrl: this.router.url }});
                         });
                    }
                }
            }
        });

        this.reset();

        const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function
            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.pipe(takeUntil(this.onDestroy$))
        .subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                this.spinnerService.isLoading.next(0);
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
        this._router = this.router.events.pipe(takeUntil(this.onDestroy$)).pipe(takeUntil(this.onDestroy$))
        .filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.onDestroy$)).subscribe((event: NavigationEnd) => {
            elemMainPanel.scrollTop = 0;
            //elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }

        const window_width = $(window).width();
        let $sidebar = $('.sidebar');
        let $sidebar_responsive = $('body > .navbar-collapse');
        let $sidebar_img_container = $sidebar.find('.sidebar-background');


        if (window_width > 767) {
            if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
                $('.fixed-plugin .dropdown').addClass('open');
            }

        }

        $('.fixed-plugin a').click(function (event) {
            // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
            if ($(this).hasClass('switch-trigger')) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else if (window.event) {
                    window.event.cancelBubble = true;
                }
            }
        });

        $('.fixed-plugin .badge').click(function () {
            let $full_page_background = $('.full-page-background');


            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            var new_color = $(this).data('color');

            if ($sidebar.length !== 0) {
                $sidebar.attr('data-color', new_color);
            }

            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.attr('data-color', new_color);
            }
        });

        $('.fixed-plugin .img-holder').click(function () {
            let $full_page_background = $('.full-page-background');

            $(this).parent('li').siblings().removeClass('active');
            $(this).parent('li').addClass('active');


            var new_image = $(this).find("img").attr('src');

            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeOut('fast', function () {
                    $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                    $sidebar_img_container.fadeIn('fast');
                });
            }

            if ($full_page_background.length != 0) {

                $full_page_background.fadeOut('fast', function () {
                    $full_page_background.css('background-image', 'url("' + new_image + '")');
                    $full_page_background.fadeIn('fast');
                });
            }

            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
            }
        });
        this.init=true;
        this.setGhostLogin();
    }
    ngAfterViewInit() {

        try
        {
            if(this.currentUser.RoleType===1)
            {
                this.locationTimer= interval(60000).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
                    this.getLocation();
                 });
            }
        }
        catch(e)
        {
            console.error('lt',e.message);
        }
       

        this.runOnRouteChange();
    }
    isMaps(path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        }
        else {
            return true;
        }
    }
    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    ngOnDestroy() {
        this.onDestroy$.next();

        if (this._router) {
            this._router.unsubscribe();
        }
        if(this.geosubid)
        {
            navigator.geolocation.clearWatch(this.geosubid);
        }
        if(this.locationTimer)
        {
            this.locationTimer.unsubscribe();
        }
    }


    reset() {
        // if(this.idle)
        // {
        //     this.idle.watch(true);
        //     this.idleState = 'Started.';
        //     this.timedOut = false;
        // }
      }

      showTimeOutWarning()
      {
          if(this.currentUser.UserId>0)
          {
            this.matDialog.open(ConfirmBoxComponent,{data:{title:'MSM',content:'your were logout in 10 second',icon:'info',yesLabel:'logout',noLabel:'stay'}}).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
                if(res)
                {
                    this.authService.logout();
                }
                else
                {
                    this.reset();
                }
            });
          }
      }

      getLocation()
      {
        if(navigator.geolocation)
        {
             navigator.geolocation.getCurrentPosition((pos)=>{
                this.addLocation({Lat:pos.coords.latitude,Lng: +pos.coords.longitude,Accuracy:pos.coords.accuracy});
             }, (err)=> {
                this.addLocation( {LocationError:err.message,ErrorCode:err.code});
             } , this.geooption);
        }
        else{
            this.addLocation( {LocationError:'device not supported',ErrorCode:0});
        }
      }

      addLocation(data:any)
      {
        //this.userLocationService.add( data ).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{});
      }

}
