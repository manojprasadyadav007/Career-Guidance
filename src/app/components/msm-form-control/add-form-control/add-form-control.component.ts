import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-add-form-control',
  templateUrl: './add-form-control.component.html',
  styleUrls: ['./add-form-control.component.scss']
})
export class AddFormControlComponent implements OnInit {
   formdata=this.resetForm();
   btnLabel="Add";
   readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(@Inject(MAT_DIALOG_DATA) data,
   private matDialogRef:MatDialogRef<AddFormControlComponent>) { 
    if(data)
    {
      if(data.formdata)
      {
        this.formdata = JSON.parse( JSON.stringify(data.formdata));
        this.btnLabel='Update';
      }
      else if(data.lastControl)
      {
        try
        {
          var lastclassname = data.lastControl.Data.controlClass;
          if (lastclassname && lastclassname.search(/col-md-12/gi) >= 0) {
            this.formdata.RowNumber = +data.lastControl.RowNumber + 1;
            this.formdata.ColumnNumber = 1;
          }
          else {
            this.formdata.RowNumber = +data.lastControl.RowNumber;
            this.formdata.ColumnNumber = +data.lastControl.ColumnNumber + 1;
          }
  
          this.formdata.Data.controlClass = lastclassname ? lastclassname : 'col-md-12';
          this.formdata.ControlType = data.lastControl.ControlType;
        }
        catch(e)
        {

        }
      }
    }
  }

  ngOnInit() {
  }

  resetForm()
  {
    this.btnLabel = 'Add';
    return {
      ControlId: 0, ControlLabel: '', ControlType: null, RowNumber: null, ColumnNumber: null,
      FormValue: '',
      Data: {
        controlClass: 'col-md-12',
        templateField: '',
        option: [],
        validation: {
          required: { value: false, message: 'This field is required' },
          pattern: { value: '', message: 'Invalid value' },
          minValue: {
            value: '',
            message: "Invalid value"
          },
          maxValue: {
            value: '',
            message: "Invalid value"
          },
          minLength: {
            value: '',
            message: ''
          },
          maxLength: {
            value: '',
            message: ''
          }
        }
      }
    };
  }

  addOption(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.formdata.Data.option.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeOption(option: string): void {
    const index = this.formdata.Data.option.indexOf(option);

    if (index >= 0) {
      this.formdata.Data.option.splice(index, 1);
    }
  }

  add(form:NgForm)
  {
     if(form.invalid)
     {
        return;
     }
     this.matDialogRef.close(this.formdata);
  }

}
