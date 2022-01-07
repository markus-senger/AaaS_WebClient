export class HeartbeatDetector {
    constructor(
        public detectorID?: string,
        public clientID?: string,
        public appKey?: string,
        public maxMissedBeats?: string
    ) {}
}
