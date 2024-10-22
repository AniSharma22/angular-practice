import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPipe',
  standalone: false,
})

export class DataPipe implements PipeTransform {
  transform(value: number): string {
    return String(value * 84);
  }
}
