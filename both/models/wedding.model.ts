
interface Wedding {
    _id?: string;
    date: any;
    theme: any;
    spouses: Spouse[];
    budgets?: Budget[];
    invitations?: Invitation[];
    guests?: Guest[];
    tables?: Table[];
    venues?: Venue[];
    meals?: Meal[];
    registries? : Registry[];
    announcements?: Announcement[];

    uploads?: Upload[];
}

interface Spouse {
    _id?: string;
    first_name: String;
    last_name: String;
    title: String;
    email?: String;
    password?: String;
    services?: any;
}

interface Budget {
    _id?: string;
    name?: string;
    max?: number;
}

interface Invitation {
    _id?: string;
    notes?: string;
    code: string;
    guests: string[];
}

interface Guest {
    _id?: string;
    name: string;
    email?: string;
    invitation_num: string;
    status?: string;
    secondary: boolean;
    meal?: string;
    dietary?: string;
    relation?: string;
    party?: string;
    reminder?: string;
    gift?: number;
    table?: number;
}

interface Table {
    _id?: string;
    notes?: string;
    seats: number;
    guests: string[];
}

interface Venue {
    _id?: string;
    name: string;
    image?: string;
    address: {
        street: string,
        city: string,
        state: string,
        zip: string,
    };
    event: string;
    price?: number;
    start_time: any;
    end_time: any;
}

interface Meal {
    _id?: string;
    name: string;
    color?: string;
    price?: number;
    image?: string;
    notes?: string;
}

interface Registry {
    _id?: string;
    name: string;
    image?: string;
    description?: string;
    link: string;
}

interface Announcement {
    _id?: string;
    date: any;
    title: string;
    announcement: string;
}

interface Upload {
    _id?: string;
    meta?: object;
    path: string;
}

export type WeddingDB = Wedding;