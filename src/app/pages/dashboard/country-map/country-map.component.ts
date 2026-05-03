import { OnInit, Component, OnDestroy } from '@angular/core';
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent implements OnInit, OnDestroy {

  countryWiseApplicationCount;
  worldMap: any = mapsData.world;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService: DashboardService) {
    this.customizeLayers = this.customizeLayers.bind(this);
  }
  ngOnInit() {
    this.countryOutcome();
  }

  countryOutcome() {
    this.dashboardService.CountryWiseApplicationCount()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        const countryData = res;
        if (countryData) {
          this.countryWiseApplicationCount = res;
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  customizeTooltip(arg) {
    if (arg.attribute('population')) {
      return {
        text: arg.attribute('name') + ': Total Agent - ' + arg.attribute('population')
      };
    }
  }

  customizeLayers(elements) {
    elements.forEach((element) => {
      if (this.countryWiseApplicationCount[element.attribute('name')]) {
        
        const applicationsCount = this.countryWiseApplicationCount[element.attribute('name')].TotalAgents;
        if(applicationsCount)
        {
          element.attribute('population',  applicationsCount );
        }
       // const agentsCount = this.countryWiseApplicationCount[element.attribute('name')].TotalAgents;
      //  element.attribute('Agent', agentsCount ? agentsCount : 0);

        // const finalData = 'Application: ' + applicationsCount + ', Agents: ' + agentsCount; 
        // element.attribute('Application', finalData ? finalData : '');
      }

    });
  }

  customizeText(arg) {
    let text;
    if (arg.index === 0) {
      text = '< 0.5%';
    } else if (arg.index === 5) {
      text = '> 3%';
    } else {
      text = arg.start + '% to ' + arg.end + '%';
    }
    return text;
  }

}
