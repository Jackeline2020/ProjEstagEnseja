const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let technologiesGSCSchema = new Schema({
    //f5
    LTM: {type: Number, required: true},
    GTM: {type: Number, required: true},
    ASM: {type: Number, required: true},
    APM: {type: Number, required: true},
    BIGIQ: {type: Number, required: true},
    //security
    Firepower: {type: Number, required: true},
    ASA: {type: Number, required: true},
    ISE: {type: Number, required: true},
    Umbrella: {type: Number, required: true},
    NGIPS: {type: Number, required: true},
    //datacenter
    ACI: {type: Number, required: true},
    UCS: {type: Number, required: true},
    MDS: {type: Number, required: true},
    Vmware: {type: Number, required: true},
    FIS: {type: Number, required: true},
    //wifi
    WCS: {type: Number, required: true},
    WLC: {type: Number, required: true},
    AP: {type: Number, required: true},
    Meraki: {type: Number, required: true},
    Aruba: {type: Number, required: true},
    //routingswitch
    Routing: {type: Number, required: true},
    Switching: {type: Number, required: true},
    VLAN: {type: Number, required: true},
    BGP: {type: Number, required: true},
    StaticRouting: {type: Number, required: true},
    //collaboration
    CUCM: {type: Number, required: true},
    UCCX: {type: Number, required: true},
    MediaSense: {type: Number, required: true},
    Telepresence: {type: Number, required: true},
    Webex: {type: Number, required: true}
});

// Export the model
module.exports = mongoose.model('technologiesGSC', technologiesGSCSchema);