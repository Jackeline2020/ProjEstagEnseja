const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let skillsSchema = new Schema({

    _id: {type: String},
    name: {type: String, required: false, max: 255},
    email: {type: String, required: false, max: 255},
    office: {type: String, required: false, max: 255},
    job: {type: String, required: false, max: 255},

    //f5
    LTM: {type: Number, required: false},
    GTM: {type: Number, required: false},
    ASM: {type: Number, required: false},
    APM: {type: Number, required: false},
    BIGIQ: {type: Number, required: false},
    //security
    Firepower: {type: Number, required: false},
    ASA: {type: Number, required: false},
    ISE: {type: Number, required: false},
    Umbrella: {type: Number, required: false},
    NGIPS: {type: Number, required: false},
    //datacenter
    ACI: {type: Number, required: false},
    UCS: {type: Number, required: false},
    MDS: {type: Number, required: false},
    Vmware: {type: Number, required: false},
    FIS: {type: Number, required: false},
    //wifi
    WCS: {type: Number, required: false},
    WLC: {type: Number, required: false},
    AP: {type: Number, required: false},
    Meraki: {type: Number, required: false},
    Aruba: {type: Number, required: false},
    //routingswitch
    Routing: {type: Number, required: false},
    Switching: {type: Number, required: false},
    VLAN: {type: Number, required: false},
    BGP: {type: Number, required: false},
    StaticRouting: {type: Number, required: false},
    //collaboration
    CUCM: {type: Number, required: false},
    UCCX: {type: Number, required: false},
    MediaSense: {type: Number, required: false},
    Telepresence: {type: Number, required: false},
    Webex: {type: Number, required: false}
},
{
    timestamps: {type: Date, required: true}
});

// Export the model
module.exports = mongoose.model('skillsGSC', skillsSchema);