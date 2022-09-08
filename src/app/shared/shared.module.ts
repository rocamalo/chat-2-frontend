import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { MaterialuiModule } from '../materialui/materialui.module';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';


import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TableComponent } from './components/table/table.component';
import { GenericDetailsModalComponent } from './components/generic-details-modal/generic-details-modal.component';
import { KeysValuePipe } from './pipes/keys-value.pipe';
import { GenericFormModalComponent } from './components/generic-form-modal/generic-form-modal.component';
import { IdPipe } from './pipes/id.pipe';
import { KeysPipe } from './pipes/keys.pipe';



@NgModule({
  declarations: [
    CardComponent,
    ModalComponent,
    FormComponent,
    TableComponent,
    GenericDetailsModalComponent,
    KeysValuePipe,
    KeysPipe,
    IdPipe,
    GenericFormModalComponent
  ],
  imports: [
    CommonModule,
    MaterialuiModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot()
  ],
  exports: [
    CardComponent,
    ModalComponent,
    FormComponent,
    TableComponent,
    GenericDetailsModalComponent,
    KeysValuePipe,
    KeysPipe,
    IdPipe
  ]
})
export class SharedModule { }
