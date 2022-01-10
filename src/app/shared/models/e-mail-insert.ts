export class EMailInsert {
    constructor(
        public subject?: string,
        public content?: string,
        public sentTo?: string,
        public detectorID?: string,
        public name?: string
    ) {}
}