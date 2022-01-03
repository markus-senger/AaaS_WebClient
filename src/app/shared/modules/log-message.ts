export class LogMessage {
    constructor(
        public dataID?: string,
        public entryID?: string,
        public type?: string,
        public message?: string,
        public timestamp?: string
    ) {}
}
