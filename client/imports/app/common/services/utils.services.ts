import {Injectable} from '@angular/core';

@Injectable()
export class UtilityService {
    constructor() {

    }

    invertSlug(slug, invert_case) {
        //TODO: Doesn't actually invert, just makes singular plural. Needs fixed
        if (invert_case) slug = this.invertSlugCase(slug);
        return `${slug}s`;
    }

    invertSlugCase(slug: string) {
        if (slug === slug.toLowerCase()) {
            let result = slug.replace( /([A-Z])/g, " $1" );
            return result.charAt(0).toUpperCase() + result.slice(1);
        } else {
            return slug.toLowerCase();
        }
    }
}