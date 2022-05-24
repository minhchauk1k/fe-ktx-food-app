import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'vnd'
})
export class VndPipe implements PipeTransform {
    constructor(
        private pipe: DecimalPipe
    ) { }
    
    transform(number: number): string {
        return number == 0 ? 0 + ' VNĐ' : this.pipe.transform(number, '4.0') + ' VNĐ';
    }
}