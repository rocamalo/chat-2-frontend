import { Component, OnInit } from '@angular/core';
import { Group } from '../../interfaces/group.interface';
import { GroupsService } from '../../services/group.service';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss']
})
export class ListGroupsComponent implements OnInit {

groups: Group[] = [];
columns: Array<string> = [
  '_id',
  'name',
  'status'
];

serviceName: string = 'groups'; //property to pass the name of the service that will be use by the table and to send it to the modal to execute the aproppiate service

fields: Array<string> = [ //fields for when opening Form for adding a new element
  'status',
  'name'
];

  constructor(public groupsService: GroupsService) { }

  
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.groupsService.groups$.subscribe( groups =>  this.groups = groups);
  }
}
