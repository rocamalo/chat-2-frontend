import { Injectable } from '@angular/core';
import { catchError, EMPTY, of } from 'rxjs';
import { GroupsService } from 'src/app/pages/modules/groups/services/group.service';

@Injectable({
  providedIn: 'root'
})
export class ModalActionService {

  constructor(
    private groupsService: GroupsService
  ) { }

  modalActionEdit(serviceName: any, data: any, id: string): any {
    switch (serviceName) {
      case "groups":
       return this.groupsService.update(data, id);
        break;
      
      case "other":
        alert("other");
        return this.groupsService.getAll();
        break;
        
      default:
        return this.groupsService.getAll();
        break;
    }
  }

  modalActionAdd(serviceName: any, data: any): any {
    switch (serviceName) {
      case "groups":
        return this.groupsService.add(data);
        break;
      
        case "other":
          return this.groupsService.getAll();
          break;
        
      default:
        return this.groupsService.getAll();
        break;
    }
  }

  modalActionDelete(serviceName: any, id: string): any {
    switch (serviceName) {
      case "groups":
        return this.groupsService.delete(id);
        break;
      
        case "other":
          return this.groupsService.getAll();
          break;
        
      default:
        return this.groupsService.getAll();
        break;
    }
  }

  

}
