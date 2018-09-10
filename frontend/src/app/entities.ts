

export class Account {
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public email: string,
        public enabled: boolean,
        public likedShops: Array<string>
    ) { }
}

export class Shop {
    constructor(
        public id: string,
        public picture: string,
        public name: string,
        public email: string,
        public city: string,
        public location: LocationHolder
    ) { }
}

export class LocationHolder {
    constructor(
        public type: string,
        public coordinates: Array<number>
    ) {}
}

export class Credentials {
    constructor(
        public username,
        public password
    ) {}
}

export class PaginationOptionsHolder {
    constructor(
        public pageIndex: number,
        public length: number,
        public pageSize: number,
        public pageSizeOptions: Array<number>
    ) {}
}


export class NearLocationParamsHolder {
    constructor(
        public location: LocationHolder,
        public distance: number
    ) {}
}

export class Coords {
    constructor(
        public lng,
        public lat
    ) {

    }
}
