import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { deletePropertyFromObject } from 'src/app/utils/delete-property-in-object';
import { ModalActionService } from '../../services/modal-action.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-generic-form-modal',
  templateUrl: './generic-form-modal.component.html',
  styleUrls: ['./generic-form-modal.component.scss'],
})
export class GenericFormModalComponent implements OnInit {
  myForm!: FormGroup;
  depuratedObject: any; //object without id property or any desired properties we don't want to edit/add

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GenericFormModalComponent>,
    private modalActionService: ModalActionService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({}); 
    if(this.data.method === 'update') {
      this.depuratedObject = deletePropertyFromObject(this.data.element, '_id');
      this.createFormControlsFromObjectAsUpdating();
    } else if (this.data.method === 'add') {
      this.createFormControlsAsAdding();
    }
  }


  onCancel() {
    this.dialogRef.close();
  }

  submitData() {
    if (this.myForm.invalid) {
      return;
    }
    const serviceName = this.data.serviceName;
    const data = this.myForm.value;
    if (this.data.method === 'update') {
      const id = this.data.element._id;
      this.modalActionService.modalActionEdit(serviceName, data, id).subscribe(
        (response: any) => {
          if (response.ok) {
            Swal.fire(response.msg);
            this.onCancel();
          }
        },
        (error: any) => Swal.fire('Error at updating data')
      );
    } else if (this.data.method === 'add') {
      this.modalActionService.modalActionAdd(serviceName, data).subscribe(
        (response: any) => {
          if (response.ok) {
            Swal.fire(response.msg);
            this.onCancel();
          }
        },
        (error: any) => Swal.fire('Error at updating data')
      );
    }
  }

  private createFormControlsFromObjectAsUpdating() {
    //right now we're setting up initial value for every control, but if we are in add form, we could simply replace element for ''
    for (const key in this.depuratedObject) {
      if (Object.prototype.hasOwnProperty.call(this.depuratedObject, key)) {
        const element = this.depuratedObject[key];
       this.myForm.addControl(key,new FormControl(element, Validators.required));
      }
    }
  }

  private createFormControlsAsAdding() {
    for (let index = 0; index < this.data.fields.length; index++) {
      const element = this.data.fields[index];
      this.myForm.addControl(element, new FormControl('', Validators.required))
    }
  }
}
