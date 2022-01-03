export class ClientInstance {
    constructor(
        public appKey?: string,
        public clientID?: string,
        public description?: string,
        public state?: string,
        public lastHeartbeat?: string
    ) {}
}

