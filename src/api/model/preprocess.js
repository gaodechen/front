const Midi = require('@tonejs/midi')
const fs = require('fs')

/**
 * @description convert midi files to triple sequences
 * @param {*} midiPath
 */
async function MidiToSequence(midiPath) {
    const midiData = fs.readFileSync(midiPath)
    const midi = new Midi(midiData)
    // load a midi file in the browser
    // const midi = await Midi.fromUrl(midiPath)
    if(midi.tracks.length <= 0) {
        throw new Error('MIDI文件错误！')
    }
    // using main track
    const track = midi.track[0]
    midi.tracks[0](track => {
        //tracks have notes and controlChanges
        //notes are an array
        const notes = track.notes
        notes.forEach(note => {
            console.log(note.midi + ' ' + note.time + ' ' + note.duration + ' ' + note.name)
            //note.midi, note.time, note.duration, note.name
        })

        //the control changes are an object
        //the keys are the CC number
        //they are also aliased to the CC number's common name (if it has one)
        track.controlChanges.sustain.forEach(cc => {
            // cc.ticks, cc.value, cc.time
            console.log(cc.ticks + ' ' + cc.time + ' ' + cc.value)
        })

        //the track also has a channel and instrument
        //track.instrument.name
    })
}

MidiToSequence("C:/Users/Gao/CycleGANMusic/test.mid")
.then(data => {
    console.log(data)
})
.catch(error => {
    console.log(error)
})