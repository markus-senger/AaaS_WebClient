export class HeartbeatDetectorUpdate {
    constructor(
        public maxMissedBeats?: string,
        public name?: string,
        public timeBetweenChecks?: string,
        public active?: boolean
    ) {}
}