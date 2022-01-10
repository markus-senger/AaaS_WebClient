export class EMailUpdate {
    constructor(
        public subject?: string,
        public content?: string,
        public sentTo?: string
    ) {}
}