import {Component, Input, OnInit} from "@angular/core";
import template from "./widget.component.html";
import style from "./widget.component.scss";
import {ModalService} from "../modals/modals.service";

@Component({
    selector: "widget",
    host: {
        class: 'widget',
    },
    template,
    styles: [style],
})

export class admin_WidgetComponent implements OnInit {
    @Input() slug: string;

    constructor(private _modalService: ModalService) {

    }

    ngOnInit() {

    }
}