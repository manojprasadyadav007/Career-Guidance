import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskAddComponent } from '../task/task-add/task-add.component';
import { EventAddComponent } from '../event/event-add/event-add.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { EventService } from 'app/services/event.service';
import { parentType } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { GraphService } from '../../services/graph.service';
import { OAuthService } from 'app/services/oauth.service';

declare var gapi: any;

@Component({
  selector: 'app-my-todo-calendar',
  templateUrl: './my-todo-calendar.component.html',
  styleUrls: ['./my-todo-calendar.component.scss']
})
export class MyTodoCalendarComponent implements OnInit, OnDestroy {

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin]; // important!

  eventList = [];

  private onDestroy$: Subject<void> = new Subject<void>();

  customButtons: any;
  options: any;
  eventsGoogle: any;
  eventsOutlook: any;

  googleTasks: any;
  outlookTasks: any;

  constructor(private eventService: EventService,
    private matDialog: MatDialog,
    private router: Router,
    private ngZone: NgZone,
    private graphService: GraphService,
    private authService: OAuthService) { }

  ngOnInit() {

    this.options = {
      editable: true,
      customButtons: {
        microsoft: {
          icon: 'fab fab fa-microsoft',
          click: () => this.microsoftSignIn()
        },
        google: {
          icon: 'fab fab fa-google',
          click: () => this.showGoolgeSignin()
        }
      }
    };
    this.listToDo();
    //this.showGoolgeSignin();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  listToDo() {
    this.eventService.myToDo()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.eventList = res.map((d) => { return { title: d.TaskDescription, start: d.StartDate, end: d.EndDate, id: d.TaskId, extendedProps: d, timeFormat: 'HH:mm tt', taskTape: 90 } });
        this.combineGoogleEvents();
        this.combineGoogleTask();
        this.combineOutlookEvents();
     //   this.combineOutlookTask();
      });
  }

  eventClick(model) {
    let toDoItem = model.event.extendedProps;
    if (toDoItem.googleLink) {
      window.open(toDoItem.googleLink, "_blank");
      return;
    }

    if (toDoItem.outlookLink) {
      window.open(toDoItem.outlookLink, "_blank");
      return;
    }
    if (toDoItem.WorkItem.toLowerCase() === 'task') {
      this.matDialog.open(TaskAddComponent, { data: { TaskId: toDoItem.TaskId, forcereadonly: true } }).afterClosed()
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.listToDo();
        });
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'lead') {
      this.router.navigate(['/member/leads/edit/' + toDoItem.TaskId]);
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'campaign') {
      this.router.navigate(['/member/campaigns/edit/' + toDoItem.TaskId]);
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'event') {
      this.matDialog.open(EventAddComponent, { data: { EventId: toDoItem.TaskId, InstitutionId: 0 } }).afterClosed()
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.listToDo();
        });
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'application') {
      this.router.navigate(['/member/application/view/' + toDoItem.TaskId]);
    }
  }

  eventRender(event) {
    event.el.querySelector('.fc-time').innerHTML = "";
    event.el.querySelector('.fc-title').innerHTML = "<i>" + event.event.title + "</i>";
    try {
      event.el.querySelector('.fc-content').classList.add('fc-content-' + event.event.extendedProps.WorkItem.toLowerCase())
    }
    catch (e) {
      console.error(e);
    }
  }

  onDayClick($event) {

    this.matDialog.open(TaskAddComponent, { data: { ParentType: parentType.Task, TaskDate: $event.dateStr } }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        //this.events = [];
        this.eventList = [];
        this.listToDo();
      });

  }

  showGoolgeSignin() {
    if (gapi) {
      gapi.load('client:auth2', () => {
        this.ngZone.run(() => {

          this.initClient();
        });
      });
    }
    else {
      console.error('gapi not loaded');
    }
  }

  async microsoftSignIn(): Promise<void> {
    await this.authService.signIn();
    await this.listOutlookEvents();
    await this.listOutlookTasks();
  }

  initClient() {
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
      "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/tasks.readonly";

    gapi.client.init({
      apiKey: "AIzaSyCbc2m_e3Y2SEgoMwxW5CIUkXPX9Wkre8Y", //"AIzaSyAcBU8lPbMjrCLkpXuis7zAhTBC5AXtA5M",
      clientId: "767734843872-c44n20h5e222284hvc5713tdhq3b94kq.apps.googleusercontent.com",// ,"767734843872-c44n20h5e222284hvc5713tdhq3b94kq.apps.googleusercontent.com",
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      this.ngZone.run(() => { this.afterInit(); });
    }, function (error) {
      console.error('gapi error', error);
    });
  }

  afterInit() {
    this.initSigninListner();
  }

  initSigninListner() {
    var updateStatus = this.updateSigninStatus;
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateStatus);

    // Handle the initial sign-in state.
    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.ngZone.run(() => {
        this.listGoogleEvents();
        this.listGoogleTask();
      });

    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
  }

  listGoogleEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': false,
      'maxResults': 10,
    }).then((response) => {

      this.ngZone.run(() => {
        this.eventsGoogle = response.result.items;
        this.combineGoogleEvents();
      });
    });
  }

  listGoogleTask() {
    gapi.client.tasks.tasklists.list({ 'maxResults': 10 }).then((response) => {
      this.ngZone.run(() => {
        gapi.client.tasks.tasks.list({ 'tasklist': response.result.items[0].id, 'maxResults': 10 }).then((result) => {
          this.ngZone.run(() => {
            this.googleTasks = result.result.items;
            this.combineGoogleTask();
          });
        });

        //this.combineEvents();
      });
    });

  }



  listOutlookEvents() {
    this.graphService.getEvents()
      .then((res) => {
        this.eventsOutlook = res;
        this.combineOutlookEvents();
      });
  }

  listOutlookTasks() {
    this.graphService.getTasks()
    .then((res) => {
      this.outlookTasks = res;
      this.combineOutlookTask();
    });
  }
  combineGoogleTask() {
    if (this.googleTasks && this.googleTasks.length > 0) {
      for (let i = 0; i < this.googleTasks.length; i++) {
        let event = this.googleTasks[i];
        let when = event.due;
        let googleID = event.id;
        let arr = this.eventList.filter(x => x.id == googleID);

        let dueDate = new Date(when);
        if (arr.length === 0) {
          this.eventList.push({
            title: event.title, start: when, end: null,
            googleLink: "https://calendar.google.com/calendar/u/0/r/day/" + dueDate.getFullYear() + "/" + (dueDate.getMonth() + 1) + "/" + dueDate.getDate(),//  2020/9/16" //event.selfLink,
            id: event.id, extendedProps: {
              EndDate: null,
              StartDate: when,
              TaskDescription: event.notes,
              TaskId: event.id,
              WorkItem: "task",
            }, timeFormat: 'HH:mm tt', taskTape: 90
          });
        }
      }
    }
  }
  combineOutlookTask() {

  }

  openGoogle() {
    this.showGoolgeSignin();
  }

  combineGoogleEvents() {
    if (this.eventsGoogle && this.eventsGoogle.length > 0) {
      for (let i = 0; i < this.eventsGoogle.length; i++) {
        let event = this.eventsGoogle[i];
        let when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        let googleID = event.id;
        let arr = this.eventList.filter(x => x.id == googleID);

        if (arr.length === 0) {
          this.eventList.push({
            title: event.summary, start: when, end: null,
            googleLink: event.htmlLink,
            id: event.id, extendedProps: {
              EndDate: null,
              StartDate: when,
              TaskDescription: event.summary,
              TaskId: event.id,
              WorkItem: "event",
            }, timeFormat: 'HH:mm tt', taskTape: 90
          });
        }
      }
    }
  }


  combineOutlookEvents() {
    if (this.eventsOutlook && this.eventsOutlook.length > 0) {
      for (let i = 0; i < this.eventsOutlook.length; i++) {
        let event = this.eventsOutlook[i];
        let when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        let outlookEventID = event.id;
        let arr = this.eventList.filter(x => x.id == outlookEventID);

        if (arr.length === 0) {
          this.eventList.push({
            title: event.subject,
            start: when,
            end: null,
            outlookLink: null,
            id: event.id,
            extendedProps: {
              EndDate: null,
              StartDate: when,
              TaskDescription: event.subject,
              TaskId: event.id,
              WorkItem: "event",
              outlookLink: event.webLink
            }, timeFormat: 'HH:mm tt', taskTape: 90
          });
        }
      }
    }
  }

}
