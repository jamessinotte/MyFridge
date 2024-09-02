"use strict";

var _react = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _reactRouterDom = require("react-router-dom");
var _client = require("react-dom/client");
var _App = _interopRequireDefault(require("./App.js"));
var _axios = require("axios");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const container = document.getElementById('root');
const root = (0, _client.createRoot)(container);
root.render( /*#__PURE__*/_react.default.createElement(_react.StrictMode, null, /*#__PURE__*/_react.default.createElement(_App.default, null)));