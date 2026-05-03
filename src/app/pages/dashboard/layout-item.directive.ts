import { Directive, OnChanges, Input, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MyToDoComponent } from './my-to-do/my-to-do.component';
import { MonthWiseApplicatinChartComponent } from './month-wise-applicatin-chart/month-wise-applicatin-chart.component';
import { ProgramWiseApplicationChartComponent } from './program-wise-application-chart/program-wise-application-chart.component';
import { TilesComponent } from './tiles/tiles.component';

const components = {
  mytodo: MyToDoComponent,
  monthwiseapplication: MonthWiseApplicatinChartComponent,
  programwiseapplication:ProgramWiseApplicationChartComponent,
  tiles:TilesComponent
};

@Directive({
  selector: '[appLayoutItem]'
})
export class LayoutItemDirective implements OnChanges {

  @Input() componentRef: string;
  component: ComponentRef<any>;
  
  constructor(
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) { }
  ngOnChanges(): void {
    const component = components[this.componentRef];
    
    if (component) {
      const factory = this.resolver.resolveComponentFactory<any>(component);
      this.component = this.container.createComponent(factory);
    }
  }

}
