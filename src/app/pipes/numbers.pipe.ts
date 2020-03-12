import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'numbers'
})

export class NumbersPipe implements PipeTransform {

	transform(value, args:string[]) : any {
		let res = [];
		
		for (let i = 0; i < value; i++) {
			var val = { value: i, class: false }
			res.push(val);
		}
		
		return res;
	}
}
