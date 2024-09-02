"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Home1Module = _interopRequireDefault(require("./Home1.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class Home1 extends _react.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _Home1Module.default.Home1
    }, /*#__PURE__*/_react.default.createElement("h1", {
      className: _Home1Module.default.Title
    }, "Welcome To MyFridge!"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: "/Signin"
    }, /*#__PURE__*/_react.default.createElement("button", {
      className: _Home1Module.default.getStarted,
      variant: "raised"
    }, "Get Started!")));
  }
}
var _default = exports.default = Home1;