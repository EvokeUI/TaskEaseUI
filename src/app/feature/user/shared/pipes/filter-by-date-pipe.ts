import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDate',
  pure: true
})
export class FilterByDatePipe implements PipeTransform {

  transform(tasks: any[], date: any): any[] {

    if (!tasks || tasks.length === 0) return [];
    if (!date) return tasks;

    // Format selected date as MM/dd/yyyy
    const selected = this.formatToMMDDYYYY(date);

    return tasks.filter(task => {
      if (!task.createdDate) return false;

      const taskDate = this.formatToMMDDYYYY(task.createdDate);

      return taskDate === selected;
    });
  }

  private formatToMMDDYYYY(date: any): string {
    const d = new Date(date);
    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    const yyyy = d.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
  }
}
