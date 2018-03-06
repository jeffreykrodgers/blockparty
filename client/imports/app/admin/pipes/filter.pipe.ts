import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'filter',
    pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(array: any[], filterFrom: any[]): any {
        if (array.length === 0 || filterFrom.length === 0) {
            return array;
        }
        return array.filter(item => filterFrom.some(f => f.value === item[f.slug]));
    }
}