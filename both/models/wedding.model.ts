
interface Wedding {
    _id?: string;
    date: any;
    theme: any;
    budgets?: Budget[];
    spouses: Spouse[];
    venues?: Venue[];
    meals?: Meal[];
    announcements?: Announcement[];
    guests?: Guest[];
    invitations?: Invitation[];
    tables?: Table[];
}

interface Budget {
    _id?: string;
    name?: string;
    max?: number;
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

interface Venue {
    _id?: string;
    name: string;
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
    notes?: string;
}

interface Announcement {
    _id?: string;
    date: any;
    title: string;
    announcement: string;
}

interface Invitation {
    _id?: string;
    notes?: string;
    code: string;
    guests: string[];
}

interface Table {
    _id?: string;
    notes?: string;
    seats: number;
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

export type WeddingDB = Wedding;