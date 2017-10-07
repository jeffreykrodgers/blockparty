import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import template from "./app.component.html";
import style from "./app.component.scss";

@Component({
    selector: "app",
    template,
    styles: [style],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
    constructor() {

    }

    ngOnInit() {

    }
}
