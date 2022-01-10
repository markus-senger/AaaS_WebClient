export class WebHookInsert {
    constructor(
        public detectorID?: string,
        public url?: string,
        public tool?: string,
        public name?: string
    ) {}
}