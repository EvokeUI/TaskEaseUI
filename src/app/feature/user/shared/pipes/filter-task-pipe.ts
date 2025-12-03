import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTask',
  pure: true
})
export class FilterTaskPipe implements PipeTransform {

  transform(tasks: any[] = [], taskStatus: string = ''): any[] {
    if (!tasks) {
      return [];
    }

    if (!taskStatus || taskStatus.trim() === '') {
      return tasks;
    }

    return tasks.filter(task =>
      task.status?.toLowerCase().includes(taskStatus.toLowerCase())
    );
  }

}
