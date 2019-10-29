'use strict';

exports.ok = function(values, res) {
  var data = {
      'status code': 200,
      'Data': values
  };
  res.json(data);
  res.end();
};