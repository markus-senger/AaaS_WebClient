export class EMail {
    constructor(
        public actionID?: string,
        public subject?: string,
        public content?: string,
        public sentTo?: string
    ) {}
}