import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-details-modal',
  templateUrl: './generic-details-modal.component.html',
  styleUrls: ['./generic-details-modal.component.scss']
})
export class GenericDetailsModalComponent implements OnInit {

properties: string[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
