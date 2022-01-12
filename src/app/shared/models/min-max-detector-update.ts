export class MinMaxDetectorUpdate {
    constructor(
        public min?: string,
        public max?: string,
        public threshold?: string,
        public name?: string,
        public timeBetweenChecks?: string,
        public active?: boolean
    ) {}
}