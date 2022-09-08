import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalActionService } from '../../services/modal-action.service';
import { GenericDetailsModalComponent } from '../generic-details-modal/generic-details-modal.component';
import { GenericFormModalComponent } from '../generic-form-modal/generic-form-modal.component';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewChecked {
  buttonActionColumns: string[] = ['details', 'edit', 'delete'];

  @Input() dataSource: any = []; // array of Data coming from parent
  @Input() displayedColumns: any = []; //array of columns coming fro parent ex: ['id','name','email']
  @Input() title: string = '';
  @Input() serviceName: string = ''; //property to receive the name of the service to eexctue actions by the modal
  @Input() fields: string[] = [];

  columns: string[] = []; //aray for showing the coming columns from parent

  matDataSource!: any; //property to initialize our matdatasource to allow filtering
  

  constructor(
    public dialog: MatDialog,
    public modalActionService: ModalActionService
  ) {
  }

  ngOnInit(): void {
    this.columns = [...this.displayedColumns]; //we copy the columns coming from parent to this property, for looping with ngfor on html
    this.displayedColumns = [
      ...this.displayedColumns,
      ...this.buttonActionColumns,
    ]; //we combine the columns from the parent and our default columns (delete, edit, )
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.matDataSource = new MatTableDataSource(this.dataSource);
  }


  openDetails(element: any) {
    this.dialog.open(GenericDetailsModalComponent, {
      data: {
        element: element,
        title: `${this.title} details`,
      },
    });
  }

  openEdit(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      element: element, //all data from row
      title: `${this.title} editing`, //title for modal
      method: 'update',
      serviceName: this.serviceName, //name of the service to execute correct service
    };
    this.dialog.open(GenericFormModalComponent, dialogConfig); //GenericFormModalComponent componente generico reutilizable para agregar/editar informacion
  }

  addElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: `${this.title} adding`, //title for modal
      method: 'add',
      fields: this.fields,
      serviceName: this.serviceName, //name of the service to execute correct service
    };
    this.dialog.open(GenericFormModalComponent, dialogConfig); //GenericFormModalComponent componente generico reutilizable para agregar/editar informacion
  }

  deleteElement(element: any) {
    //TODO CREATE UI SERVICE FOR SWEET ALERT
    this.modalActionService
      .modalActionDelete(this.serviceName, element._id)
      .subscribe((response: any) => {
        Swal.fire('Deleted!', response.msg, 'success');
      });
  }


  applyFilter(event: Event) {
    
    const filterValue: any = (event.target as HTMLInputElement).value;
    this.matDataSource.filter = filterValue.trim().toLowerCase();
}
}
