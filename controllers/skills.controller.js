
const Technologies = require('../models/skills');

// retrieve and return all technologies.
exports.list = (req, res) => {
    Technologies.find()
        .then(data => {
            var message = "";
            console.log(data);
            localStorage.setItem(data, data);
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
            /*É AQUI
            var $toast = basecoat.toast('This is a simple toast.');
                $toast.trigger('show', [5000]); 
            */
            res.json({ success: false, message: 'This email has no available' });
        }else{

    // create a technologies
    let technologies = new Technologies({
            //employees
            _id: req.body._id,
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
            res.redirect('/skills');
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
                res.redirect('/skills');

                /*return res.status(404).send({
                    success: false,
                    message: "Technologies not found with id " + req.params.id
                });*/
            }
            res.render('mySkills', {data: data});

           /* res.send({
                success: true,
                message: 'Technologies successfully retrieved',
                data: data
            }); */
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.redirect('/skills');
            /*return res.status(404).send({
                success: false,
                message: "Technologies not found with id " + req.params.id
            });*/
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving technologies with id " + req.params.id
        });
    });
};

// update a technologies  by the id.
exports.update = (req, res) => {
    // find technologies and update
    Technologies.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .then(data => {
            /*if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Technologies not found with id " + req.params.id
                });
            }*/
            res.redirect('/skills');

           /* res.send({
                success: true,
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
            message: "Error updating technologies with id " + req.params.id
        });
    });
};

// delete a technologies with the specified id.
exports.del = (req, res) => {
    Technologies.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) {
                res.redirect('/skills');

                /*return res.status(404).send({
                    success: false,
                    message: "Technologies not found with id " + req.params.id
                });*/
            }
            res.redirect('/skills');
            /*res.send({
                success: true,
                message: "Technologies successfully deleted!"
            });*/
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