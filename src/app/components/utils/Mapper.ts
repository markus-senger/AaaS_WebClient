import { HeartbeatDetector } from "src/app/shared/models/heartbeat-detector";
import { MetricDetector } from "src/app/shared/models/metric-detector";

export function mapHeartBeatDetector(detectorDto: any[]): HeartbeatDetector[] {
    var detector: HeartbeatDetector[] = new Array();
    for(var entry of detectorDto) {
        detector.push({
            d_detectorID: entry.detectorID,
            c_clientID: entry.clientID,
            c_appKey: entry.appKey,
            d_maxMissedBeats: entry.maxMissedBeats
        });
    }
    return detector;
}

export function mapMinMaxDetector(detectorDto: any[]): MetricDetector[] {
    var detector: MetricDetector[] = new Array();
    for(var entry of detectorDto) {
        detector.push({
            d_detectorID: entry.detectorID,
            d_m_min: entry.min,
            d_m_max: entry.max,
            d_m_threshold: entry.threshold
        });
    }
    return detector;
}

export function mapSlidingWindowDetector(detectorDto: any[]): MetricDetector[] {
    var detector: MetricDetector[] = new Array();
    for(var entry of detectorDto) {
        detector.push({
            d_detectorID: entry.detectorID,
            d_s_timeInterval: entry.timeInterval,
            d_s_aggregationOp: entry.aggregationOp,
            d_s_comparisonOp: entry.comparisonOp,
            d_s_threshold: entry.threshold
        });
    }
    return detector;
}