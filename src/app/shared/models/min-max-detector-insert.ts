import { DetectorInsert } from "./detector-insert";

export class MinMaxDetectorInsert {
    constructor(
        public min?: string,
        public max?: string,
        public threshold?: string,
        public detectorDto?: DetectorInsert,
        public dataID?: string
    ) {}
}