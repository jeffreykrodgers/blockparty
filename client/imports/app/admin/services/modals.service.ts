import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class ModalService {
    private modalObservable = new Subject<any>();

    openModal(form, data = {}, mode = 'Add') {
        const payload = {
            mode: mode,
            form: form,
            data: data,
        };

        this.modalObservable.next(payload);
    }

    get events$ () {
        return this.modalObservable.asObservable();
    }
}