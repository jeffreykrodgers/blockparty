import {Component, Input, OnInit} from "@angular/core";
import template from "./countdown.component.html";
import style from "./countdown.component.scss";
import {ModalService} from "../modals/modals.service";

@Component({
    selector: "countdown",
    host: {
        class: 'countdown',
    },
    template,
    styles: [style],
})

export class admin_CountdownComponent implements OnInit {
    @Input() slug: string;

    constructor(private _modalService: ModalService) {

    }

    ngOnInit() {

    }
}