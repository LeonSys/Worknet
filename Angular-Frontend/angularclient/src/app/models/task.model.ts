import {Project} from "./project.model";

export class Task {
  id?: any;
  description?: string;
  priority?: string;
  status?: string;
  assignedUser?: string;
  name?: string;
  deadline?: Date;
  projectNumber?: Number;
  normalDeadLineFormat?: String;
}
