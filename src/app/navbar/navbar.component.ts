import { Component, OnInit, ViewEncapsulation, ElementRef, Input, OnDestroy } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { SubTitleService } from 'app/services/sub-title.service';
import { sitemap,AppDefaultValue } from 'app/models/site-map.model';
import { MatDialog } from '@angular/material';
import { FeedbackComponent } from 'app/utility/feedback/feedback.component';
import html2canvas from 'html2canvas';
import { ScreenshotService } from 'app/services/screenshot.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { tooltip } from 'app/navbar/navbar-tooltip.module';
const misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
};

declare var $: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit , OnDestroy {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    title: string;
    @Input()
    currentUser: Login;

    show_user_menu: boolean = false;

    private onDestroy$: Subject<void> = new Subject<void>();

    constructor(location: Location, private element: ElementRef, private router: Router,
        private authService: AuthenticationService,
        private subtitleService: SubTitleService,
        private matDialog: MatDialog,
        private screenShotService: ScreenshotService,
        public tooltip : tooltip
        ) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.authService.currentUserSubject.pipe(takeUntil(this.onDestroy$)).subscribe((res)=>{
            this.currentUser = res;
            this.show_user_menu = this.authService.checkPermission(sitemap.Users) > 0 && (this.currentUser.RoleId != 2 || this.currentUser.AccountVerificationStatus === 1) && this.currentUser.PartnerTypeId < 2 ;
        });
        this.router.events.pipe(takeUntil(this.onDestroy$)).subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Show loading indicator
                this.subtitleService.name.next(undefined);
            }
        });

        this.subtitleService.name.pipe(takeUntil(this.onDestroy$)).subscribe(n => this.title = n);

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.pipe(takeUntil(this.onDestroy$)).subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    public ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }


    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1).toLowerCase();
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (titlee.includes(this.listTitles[item].path.toLowerCase())) {
                return this.listTitles[item].title;
            }
            //   if(this.listTitles[item].path === titlee){
            //       return this.listTitles[item].title;
            //   }
        }
        return 'Dashboard';
    }
    logout() {
        this.authService.logout();
        this.router.navigate(['/signin']);
    }
    backtoMainLogin() {
        localStorage.setItem(AppDefaultValue.tokenPath,this.currentUser.GhostLogin);
        this.authService.refreshToken();
    }

    minimizeSidebar() {
        const body = document.getElementsByTagName('body')[0];

        if (misc.sidebar_mini_active === true) {
            body.classList.remove('sidebar-mini');
            misc.sidebar_mini_active = false;

        } else {
            setTimeout(function () {
                body.classList.add('sidebar-mini');

                misc.sidebar_mini_active = true;
            }, 300);
        }

        // we simulate the window Resize so the charts will get updated in realtime.
        const simulateWindowResize = setInterval(function () {
            window.dispatchEvent(new Event('resize'));
        }, 180);

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(function () {
            clearInterval(simulateWindowResize);
        }, 1000);
    }

    openuserTasks(){
        this.router.navigate(['/member/user-task']);
    }

    openFeedback() {
        html2canvas(document.querySelector("#screenshot"), { scrollY: window.scrollY }).then(canvas => {
            let canvasdata = canvas.toDataURL('image/png');
            this.screenShotService.outPutsubj({ name: canvasdata });
        });

        this.matDialog.open(FeedbackComponent, { width: '50%', minWidth: '400px' }).afterClosed()
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.screenShotService.outPutsubj(null);
        });
    }
}
