export class SlidingWindowDetectorUpdate {
    constructor(
        public timeInterval?: string,
        public aggregationOp?: string,
        public threshold?: string,
        public comparisonOp?: string,
        public name?: string,
        public timeBetweenChecks?: string,
        public active?: boolean
    ) {}
}