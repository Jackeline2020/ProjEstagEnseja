
const Technologies = require('../models/skills');

// retrieve and return all technologies.
exports.list = (req, res) => {
    Technologies.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No technologies found!";
            else message = 'Technologies successfully retrieved';

            res.render('skills', {data: data});

            //res.send({
                //success: true,
                //message: message,
                //data: data
           // });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving technologies."
        });
    });
};

// create a new Technologies.
exports.create = function (req, res) {

    Technologies.findOne({ 'email': req.body.email })
    .then(data => {
        if(data){
            res.json({ success: false, message: 'This email has no available' });
        }else{

    // create a technologies
    let technologies = new Technologies({
            //employees
            name: req.body.name,
            email: req.body.email,
            office: req.body.office,
            job: req.body.job,

            //f5
            LTM: req.body.LTM,
            GTM: req.body.GTM,
            ASM: req.body.ASM,
            APM: req.body.APM,
            BIGIQ: req.body.BIGIQ,
            //security
            Firepower: req.body.Firepower,
            ASA: req.body.ASA,
            ISE: req.body.ISE,
            Umbrella: req.body.Umbrella,
            NGIPS: req.body.NGIPS,
            //datacenter
            ACI: req.body.ACI,
            UCS: req.body.UCS,
            MDS: req.body.MDS,
            Vmware: req.body.Vmware,
            FIS: req.body.FIS,
            //wifi
            WCS: req.body.WCS,
            WLC: req.body.WLC,
            AP: req.body.AP,
            Meraki: req.body.Meraki,
            Aruba: req.body.Aruba,
            //routingswitch
            Routing: req.body.Routing,
            Switching: req.body.Switching,
            VLAN: req.body.VLAN,
            BGP: req.body.BGP,
            StaticRouting: req.body.StaticRouting,
            //collaboration
            CUCM: req.body.CUCM,
            UCCX: req.body.UCCX,
            MediaSense: req.body.MediaSense,
            Telepresence: req.body.Telepresence,
            Webex: req.body.Webex
    });

    // save technologies in the database.
    technologies.save()
        .then(data => {
            res.redirect('/myskills');
            /*res.send({
                success: true,
                message: 'Technologies successfully created',
                data: data
            });*/
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while creating the technologies."
            })
        });
        }

    }).catch(err => res.json({ success: false, message: err, statusCode: 500 }));

};

// find a single technologies with a id.
exports.show = (req, res) => {
    Technologies.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Technologies not found with id " + req.params.id
                });
            }
            res.render('mySkills', {data: data});

           /* res.send({
                success: true,
                message: 'Technologies successfully retrieved',
                data: data
            }); */
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Technologies not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving technologies with id " + req.params.id
        });
    });
};

// update a technologies  by the id.
exports.update = (req, res) => {
    // validate request
    if( !req.body.LTM || 
        !req.body.GTM ||
        !req.body.ASM ||
        !req.body.APM ||
        !req.body.BIGIQ || //f5

        !req.body.Firepower ||
        !req.body.ASA ||
        !req.body.ISE ||
        !req.body.Umbrella ||
        !req.body.NGIPS || //security
        
        !req.body.ACI ||
        !req.body.UCS ||
        !req.body.MDS ||
        !req.body.Vmware ||
        !req.body.FIS || //datacenter

        !req.body.WCS ||
        !req.body.WLC ||
        !req.body.AP ||
        !req.body.Meraki ||
        !req.body.Aruba || //wifi

        !req.body.Routing ||
        !req.body.Switching ||
        !req.body.VLAN ||
        !req.body.BGP ||
        !req.body.StaticRouting || //routingswitch

        !req.body.CUCM ||
        !req.body.UCCX ||
        !req.body.MediaSense ||
        !req.body.Telepresence ||
        !req.body.Webex //collaboration
        ) {
        return res.status(400).send({
            success: false,
            message: "Please enter technologies name and price"
        });
    }

    // find technologies and update
    Technologies.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Technologies not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Technologies not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating technologies with id " + req.params.id
        });
    });
};

// delete a technologies with the specified id.
exports.delete = (req, res) => {
    Technologies.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Technologies not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Technologies successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "Technologies not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete technologies with id " + req.params.id
        });
    });
};