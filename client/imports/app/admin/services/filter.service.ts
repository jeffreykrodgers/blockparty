import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class FilterService {

    getFilter(slug) {
        let filters = [{
            name: 'Invitation Number',
            slug: 'invitation_num',
            value: '',
        }, {
            name: 'Relation',
            slug: 'relation',
            value: '',
        }, {
            name: 'Name',
            slug: 'name',
            value: '',
        }, {
            name: 'Party',
            slug: 'party',
            value: '',
        // }, {
        //     name: 'RSVP Status',
        //     slug: 'attending',
        //     value: '',
        }];

        return filters.find(i => i.slug === slug);
    }

    getFilterFields(items, field) {
        return Array.from(new Set(items.map(a => a[field])));
    }
}