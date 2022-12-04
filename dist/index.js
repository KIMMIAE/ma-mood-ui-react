'use strict';

var React = require('react');

var TestButton = function (_a) {
  var children = _a.children;
  return React.createElement("button", {
    className: "bg-green-800 hover:bg-cyan-600"
  }, children);
};

exports.TestButton = TestButton;
