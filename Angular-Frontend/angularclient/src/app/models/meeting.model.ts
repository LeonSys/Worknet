import {Task} from "./task.model";
import {User} from "./user.model";

export class Meeting {

  id?: any;
  name?: String;
  creationDate?: Date;
  users?: User[];
  exactTime?: String;
  normalDateFormat?: String;

}
