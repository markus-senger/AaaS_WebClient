import { HeartbeatDetector } from "src/app/shared/models/heartbeat-detector";

export function mapHeartBeatDetector(detectorDto: any[]): HeartbeatDetector[] {
    var detector: HeartbeatDetector[] = new Array();
    for(var entry of detectorDto) {
        detector.push({
            d_detectorID: entry.detectorID,
            c_clientID: entry.clientID,
            c_appKey: entry.appKey,
            d_maxMissedBeats: entry.maxMissedBeats,
        });
    }
    return detector;
  }