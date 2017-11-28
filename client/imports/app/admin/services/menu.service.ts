import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MenuService {
    public toggleSidebar: EventEmitter<any> = new EventEmitter();
}