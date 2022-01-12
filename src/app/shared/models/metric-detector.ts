export class MetricDetector {
    constructor(
        public d_detectorID?: string,
        public d_m_min?: string,
        public d_m_max?: string,
        public d_m_threshold?: string,
        public d_s_timeInterval?: string,
        public d_s_aggregationOp?: string,
        public d_s_comparisonOp?: string,
        public d_s_threshold?: string,
        public d_name?: string,
        public d_timeBetweenChecks?: string,
        public d_lastCheck?: string,
        public d_active?: boolean,

        public t_dataID?: string,
        public t_name?: string,
        public t_description?: string,

        public a_actionID?: string,
        public a_name?: string,
        public a_w_url?: string,
        public a_w_tool?: string,
        public a_e_subject?: string,
        public a_e_content?: string,
        public a_e_sentTo?: string
    ) {}
}