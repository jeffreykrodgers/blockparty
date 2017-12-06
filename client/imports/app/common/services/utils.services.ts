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

    invertColorType(color, type) {
        let colors = [
            {
                name: 'gray',
                hex: '#818285',
            }, {
                name: 'lightGray',
                hex: '#EEEEEE',
            }, {
                name: 'white',
                hex: '#FFFFFF',
            }, {
                name: 'frost',
                hex: '#F6FAFB',
            }, {
                name: 'lightPurple',
                hex: '#F1E4FF',
            }, {
                name: 'blue',
                hex: '#2186C4',
            }, {
                name: 'purple',
                hex: '#8781EF',
            }, {
                name: 'pink',
                hex: '#F6A2D3',
            }, {
                name: 'navy',
                hex: '#20437D',
            }, {
                name: 'teal',
                hex: '#78ECD6',
            }, {
                name: 'green',
                hex: '#79ED94',
            }, {
                name: 'red',
                hex: '#ED5858',
            }
        ];

        let colArr = colors.filter(col => {
            if (col.name === color || col.hex === color) {
                return col;
            }
        });

        switch (type) {
            case 'hex':
                return colArr[0].hex;
            case 'name':
            default:
                return colArr[0].name;
        }
    }
}