'use strict';

exports.ok = function(values, res, code) {
  var data = {
      'status': 'OK',
      'result': values
  };
  res.status(code).json(data);
  res.end();
};

exports.deleted = function(values, res, code) {
  var data = {
      'status': 'OK',
      'result': {
                  'message': values
                }
  };
  res.status(code).json(data);
  res.end();
};

exports.loggedIn = function(values, res, code) {
  var data = {
      'status': 'OK',
      'message': 'Logged In Successfully',
      'result': {
                  'access_token': values
                }
  };
  res.status(code).json(data);
  res.end();
};