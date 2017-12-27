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

        // console.log('Event Triggered. Payload:', payload);
        this.modalObservable.next(payload);
    }

    get events$ () {
        // console.log("Observable", this.modalObservable);
        return this.modalObservable.asObservable();
    }
}