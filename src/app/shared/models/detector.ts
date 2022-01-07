export class Detector {
    constructor(
        public detectorID?: string,
        public dataID?: string,
        public name?: string,
        public timeBetweenChecks?: string,
        public lastCheck?: string
    ) {}
}