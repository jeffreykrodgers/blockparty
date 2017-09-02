import { Component, OnInit } from "@angular/core";
import template from "./photos.html";
import style from "../../style/themes/default/photos.scss";

@Component({
    selector: "photos",
    template,
    styles: [ style ]
})

export class PhotosComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}