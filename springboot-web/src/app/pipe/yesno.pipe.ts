import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'yesno'
})
export class YesNoPipe implements PipeTransform {
    YES = 'YES';
    NO = 'NO';
    constructor() { }

    transform(value: string): string {
        return Boolean(value) ? this.YES : this.NO;
    }
}