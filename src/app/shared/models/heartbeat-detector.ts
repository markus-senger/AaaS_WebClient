export class HeartbeatDetector {
    constructor(
        public d_detectorID?: string,
        public d_maxMissedBeats?: string,
        public d_name?: string,
        public d_timeBetweenChecks?: string,
        public d_lastCheck?: string,

        public c_clientID?: string,
        public c_appKey?: string,
        public c_description?: string,
        public c_state?: string,
        public c_lastHeartbeat?: string,

        public a_actionID?: string,
        public a_name?: string,
        public a_w_url?: string,
        public a_w_tool?: string,
        public a_e_subject?: string,
        public a_e_content?: string,
        public a_e_sentTo?: string
    ) {}
}
