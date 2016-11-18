'use strict';

const async     = require ('async');

const organizationModel = require ('./organizationModel');
    
const tokenNotFound = 'Sorry. I do not recognize that token';
const idNotFound    = 'Sorry. I do not recognize that id';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

const organizationController = {};

organizationController.findAll = (req, res) => {
  async.waterfall([  
    (callback) => {
      organizationModel.find(callback);
    },
    (organization, callback) =>{
      if (!organization) {
        callback({error: 'Error getting organizations'});
      } else {
        callback(null, organization);
      }
    }
  ], (err, results) => { 
    if (err) {
      return res.status(500).json({
        data: {
          error: err
        }
      });
    } 

    return res.status(200).json({
      data: {
        organizations: results
      }
    });
  });
};

organizationController.findById = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        organizationModel.findById(req.params.id, callback);
      },
      (organization, callback) => {
        if (!organization) {
          callback(tokenNotFound);
        } else {
          organizationModel.findById(req.params.id, callback);
        }
      },
      (organization, callback) => {
        if (!organization) {
          callback(idNotFound);
        } else {
          callback(null, organization);          
        }
      }
    ], (err, results) => { 
      if (err) {
        return res.status(404).json({
          data: {
            error: err
          }
        });
      } 

      return res.status(200).json({
        data: {
          organization: results
        }
      });
    });
  } else {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid organization id'
      }
    });
  }
};

organizationController.save = (req, res) => {
  async.waterfall([
    (callback) => {
      let cbErrorMsg = {};

      if (req.body.name === undefined) {
        cbErrorMsg.missingNameError = 'Please enter an organization name'; 
      } 

      if (req.body.displayName == undefined) {
        cbErrorMsg.missingDisplayNameError = 'Please enter an organization display name';

        callback(cbErrorMsg);
      } else {
        callback();
      }
    },
    (callback) => {
      let organization = new organizationModel({
        name: req.body.name,
        displayName: req.body.displayName
      });
      callback(null, organization);
    },
    (organization, callback) => {
      organization.save(callback);
    },
    (organization, numAffected, callback) => {
      if (!organization) {
        callback(idNotFound);
      } else {
        callback(null, organization.id);          
      }
    }
  ], (err, results) => { 
    if (err) {
      return res.status(400).json({
        data: {
          error: err
        }
      });
    } 

    return res.status(200).json({
      data: {
        id: results
      }
    });
  });
};

organizationController.remove = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        organizationModel.findById(req.params.id, callback);
      },
      (organization, callback) => {
        if (!organization) {
          callback(idNotFound);
        } else {
          organization.remove(callback)
        }
      },
      (organization, callback) => {
        if (!organization) {
          callback('Sorry. I could not remove that organization');
        } else {
          callback(null, 'success');
        }
      }
    ], (err, results) => { 
      if (err) {
        return res.status(404).json({
          data: {
            error: err
          }
        });
      }

      return res.status(200).json({
        data: {
          message: results
        }
      });
    });
  } else {
    return res.status(404).json({
      data: {
        error: 'Please enter a valid organization id'
      }
    });
  }
}

organizationController.update = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        organizationModel.findById(req.params.id, callback);
      },
      (organization, callback) => {
        if (!organization) {
          callback(idNotFound);
        } else {
          organization.update(
            { name: req.body.name, 
              displayName: req.body.displayName }, 
            { new: true }, 
            callback)
        }
      },
      (organization, callback) => {
        if (!organization) {
          callback('Sorry. I could not update that organization');
        } else {
          callback(null, 'success');
        }
      }
    ], (err, results) => { 
      if (err) {
        return res.status(404).json({
          data: {
            error: err
          }
        });
      } 

      return res.status(200).json({
        data: {
          info: results
        }
      });
    });
  } else {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid organization id'
      }
    });  
  }
}

module.exports = organizationController;