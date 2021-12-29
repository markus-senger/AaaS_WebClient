export class LogMessage {
    constructor(
        public dataId?: string,
        public entryId?: string,
        public type?: string,
        public message?: string,
        public timestamp?: string
    ) {}
}
