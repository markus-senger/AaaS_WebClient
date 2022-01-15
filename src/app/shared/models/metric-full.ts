import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class MetricFull {
    constructor(
        public t_dataID?: string,
        public t_name?: string,
        public t_m_description?: string,

        public t_m_c_state?: string,
        public t_m_c_timestamp?: string,

        public t_m_m_value?: string,
        public t_m_m_timestamp?: string,

        public t_m_t_start?: string,
        public t_m_t_end?: string,
        public t_m_t_value?: string,
        
        public c_clientID?: string,
        public c_appKey?: string,
        public c_description?: string,

    ) {}
}