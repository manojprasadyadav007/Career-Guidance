import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [],
})
export class tooltip {

    public newTaskTooltip(){  return 'Create New task'; }

    public taskAllTooltip(){  return 'All';  }

    public taskHighTooltip(){return 'High'; }

    public taskMediumTooltip(){  return 'Medium'; }

    public tasklowTooltip(){  return 'Low'; }


}

