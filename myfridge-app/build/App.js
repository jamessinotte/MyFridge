"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Home = _interopRequireDefault(require("./Home1.js"));
var _Signin = _interopRequireWildcard(require("./Signin.js"));
var _Signup = _interopRequireDefault(require("./Signup.js"));
var _FridgeHome = _interopRequireDefault(require("./FridgeHome.js"));
var _Fridge = _interopRequireDefault(require("./Fridge.js"));
var _RecipeBuilder = _interopRequireDefault(require("./RecipeBuilder.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const userNumber = _Signin.userData.userNumber;
class App extends _react.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      path: "/",
      element: /*#__PURE__*/_react.default.createElement(_Home.default, null)
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/Signin",
      element: /*#__PURE__*/_react.default.createElement(_Signin.default, null)
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/Signup",
      element: /*#__PURE__*/_react.default.createElement(_Signup.default, null)
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/FridgeHome/:userNumber",
      element: /*#__PURE__*/_react.default.createElement(_FridgeHome.default, null)
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/RecipeBuilder/:userNumber",
      element: /*#__PURE__*/_react.default.createElement(_RecipeBuilder.default, null)
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/Fridge/:userNumber",
      element: /*#__PURE__*/_react.default.createElement(_Fridge.default, null)
    }))));
  }
}
;
var _default = exports.default = App;