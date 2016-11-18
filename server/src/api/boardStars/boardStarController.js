'use strict';

const async     = require ('async');

const boardModel     = require ('../boards/boardModel');
const boardStarModel = require ('./boardStarModel');
    
const tokenNotFound = 'Sorry. I do not recognize that token';
const idNotFound    = 'Sorry. I do not recognize that id';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

const boardStarController = {};

boardStarController.findAll = (req, res) => {
  async.waterfall([  
    (callback) => {
      boardStarModel.find(callback);
    },
    (boardStar, callback) =>{
      if (!boardStar) {
        callback({error: 'Error getting boardStars'});
      } else {
        callback(null, boardStar);
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
        boardStars: results
      }
    });
  });
};

boardStarController.findById = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        boardStarModel.findById(req.params.id, callback);
      },
      (boardStar, callback) => {
        if (!boardStar) {
          callback(tokenNotFound);
        } else {
          boardStarModel.findById(req.params.id, callback);
        }
      },
      (boardStar, callback) => {
        if (!boardStar) {
          callback(idNotFound);
        } else {
          callback(null, boardStar);          
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
          boardStar: results
        }
      });
    });
  } else {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid boardStar id'
      }
    });
  }
};

boardStarController.save = (req, res) => {
  if (objectIdRegex.test(req.body.id)) {
    async.waterfall([
      (callback) => {
        boardModel.findById(req.body.id, callback);
      },
      (id, callback) => {
        if (!id) {
          callback('This board id does not exist');
        } else {
          boardStarModel.findById(req.body.id, callback);
        }
      },
      (boardStar, callback) => {
        if (boardStar) {
          callback('This board is already added to board star');
        } else {
          let boardStar = new boardStarModel({
            id: req.body.id
          });
          callback(null, boardStar);
        }
      },
      (boardStar, callback) => {
        boardStar.save(callback);
      },
      (boardStar, numAffected, callback) => {
        if (!boardStar) {
          callback(idNotFound);
        } else {
          callback(null, boardStar.id);          
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
  } else {
    return res.status(404).json({
      data: {
        error: 'Please enter a valid board id'
      }
    });
  }
};

boardStarController.remove = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        boardStarModel.findById(req.params.id, callback);
      },
      (boardStar, callback) => {
        if (!boardStar) {
          callback(idNotFound);
        } else {
          boardStar.remove(callback)
        }
      },
      (boardStar, callback) => {
        if (!boardStar) {
          callback('Sorry. I could not remove that boardStar');
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
        error: 'Please enter a valid boardStar id'
      }
    });
  }
}

boardStarController.update = (req, res) => {
  return res.status(405).json({
    data: {
      error: 'You are not allowed to perform that request'
    }
  }); 
}

module.exports = boardStarController;