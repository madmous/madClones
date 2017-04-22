"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var buildResponse = exports.buildResponse = function buildResponse(statusCode, data, res) {
  if (statusCode === 200) {
    return res.status(200).json({
      data: data
    });
  } else {
    return res.status(statusCode).json({
      error: data
    });
  }
};