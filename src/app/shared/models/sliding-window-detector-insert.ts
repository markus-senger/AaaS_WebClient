import { DetectorInsert } from "./detector-insert";

export class SlidingWindowDetectorInsert {
    constructor(
        public timeInterval?: string,
        public aggregationOp?: string,
        public threshold?: string,
        public comparisonOp?: string,
        public detectorDto?: DetectorInsert,
        public dataID?: string
    ) {}
}