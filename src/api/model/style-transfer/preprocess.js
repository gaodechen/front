import midiConverter from 'midi-converter'

/**
 * @description convert main track to sequence
 * @param {array} track
 * @returns
 */
const TrackToSeq = (track) => {
    let lastOff = 0;
    let seq = [];
    track.forEach(x => {
        if (x.subtype === 'noteOn' && x.deltaTime !== 0 && x.velocity >= 45) {
            seq.push({ ...x, deltaTime: lastOff });
            seq.push({ ...x, subtype: 'noteOff' });
            lastOff = 0;
        } else {
            lastOff += x.deltaTime;
        }
    })
    return seq;
}

/**
 * @description covert midi commands to discrete sequence
 * @param {array} track
 * @param {number} [ratio=1]
 */
// 'note_on channel=0 note=69 velocity=57 time=614',
const DiscreteSeq = (track, ratio = 1) => {
    let startTime = 0;
    let durationTime = 0;
    let changeTime = 0;
    let seq = []
    let noteList = []

    for (let i = 0; i < track.length; i++) {
        let x = track[i]
        if (x.subtype === 'noteOn') {
            if (i !== 0 && track[i - 1].subtype === 'noteOn') {
                noteList.push(x.noteNumber);
                changeTime += x.deltaTime * ratio;
            } else {
                startTime = x.deltaTime * ratio + changeTime;
                changeTime = 0;
                noteList = [x.noteNumber];
            }
        } else if (x.subtype === 'noteOff') {
            if (x.deltaTime !== 0) {
                durationTime = x.deltaTime * ratio + changeTime;
                changeTime = 0;
                seq.push([startTime, noteList, durationTime])
            }
        }
    }
    return seq;
}

/**
 * @description proprecess for inference, covering midi to triple seq
 * @param {string} midiPath
 */
const Preprocess = (midiFileContent) => {
    let midiJson = midiConverter.midiToJson(midiFileContent);
    let track = TrackToSeq(midiJson.tracks[0]);
    let seq = DiscreteSeq(track)

    let parts = parseInt((seq.length - 1) / 300) + 1
    let number = 300 * parts - seq.length;

    for (let x = 0; x < number; x++) {
        seq.push([0, [0], 0])
    }

    var L = new Array(parts);

    for (let i = 0; i < parts; i++) {
        let subSeq = seq.slice(300 * i, 300 * i + 300);
        L[i] = new Array(900).fill(0);
        for(let j = 0; j < 300; j++) {
            L[i][j] = subSeq[j][0];
        }
        for(let j = 300; j < 600; j++) {
            L[i][j] = subSeq[j - 300][1][0]
        }
        for(let j = 600; j < subSeq.length; j++) {
            L[i][j] = subSeq[j - 600][2];
        }
    }

    return L;
}

export default Preprocess;