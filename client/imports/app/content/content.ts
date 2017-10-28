import { Component, OnInit } from "@angular/core";
import template from "./content.html";
import style from "./content.scss";

@Component({
    selector: "content",
    host: {
        class: 'content',
    },
    template,
    styles: [ style ]
})

export class ContentView implements OnInit {

    constructor() {

    }

    ngOnInit() {

    };
}