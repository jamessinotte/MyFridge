"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userData = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Home = require("./Home1.js");
var _axios = _interopRequireDefault(require("axios"));
var _SigninModule = _interopRequireDefault(require("./Signin.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Input = _ref => {
  let {
    InputChange
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h1", {
    className: _SigninModule.default.Title
  }, " MyFridge "), /*#__PURE__*/_react.default.createElement("h1", {
    className: _SigninModule.default.Heading
  }, "Login"), /*#__PURE__*/_react.default.createElement("div", {
    className: _SigninModule.default.Inputs
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: _SigninModule.default.emailBox,
    type: "email",
    name: "email",
    placeholder: "Email",
    onChange: InputChange
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    className: _SigninModule.default.passwordBox,
    name: "password",
    placeholder: "Password",
    onChange: InputChange
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    className: _SigninModule.default.Submit
  }, "Sign In")));
};
let userData = exports.userData = {};
class Signin extends _react.Component {
  constructor() {
    super();
    _defineProperty(this, "handleInputChange", event => {
      const {
        name,
        value
      } = event.target;
      this.setState({
        [name]: value
      });
    });
    _defineProperty(this, "handleSubmit", async event => {
      event.preventDefault();
      const {
        email,
        password
      } = this.state;
      try {
        await _axios.default.post('https://myfridgeweb-9977.onrender.com/Signin', {
          email,
          password
        }).then(response => {
          exports.userData = userData = response.data;
          let idd = userData.user.userNumber;
          console.log(idd);
          this.setState({
            data_sent: true,
            showSignin: false,
            id: idd
          }, () => {});
        });
      } catch (error) {
        console.error('Sign-in error:', error);
        this.setState({
          errorMessage: 'Invalid email or password. Please try again.'
        });
      }
    });
    this.state = {
      email: '',
      password: '',
      data_sent: false,
      showSignin: true,
      id: '',
      errorMessage: ''
    };
  }
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      id: "Signin",
      className: _SigninModule.default.Signin
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: _SigninModule.default.Form
    }, /*#__PURE__*/_react.default.createElement("form", {
      id: "Signin",
      onSubmit: this.handleSubmit
    }, this.state.showSignin && /*#__PURE__*/_react.default.createElement(Input, {
      InputChange: this.handleInputChange
    }), this.state.errorMessage && /*#__PURE__*/_react.default.createElement("div", {
      className: _SigninModule.default.ErrorMessage
    }, this.state.errorMessage)), /*#__PURE__*/_react.default.createElement("div", {
      className: _SigninModule.default.Signup
    }, /*#__PURE__*/_react.default.createElement("h3", {
      className: _SigninModule.default.SignupText
    }, "New To MyFridge?"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: "/Signup"
    }, /*#__PURE__*/_react.default.createElement("h1", {
      className: _SigninModule.default.SignupLink
    }, "Signup")))), this.state.data_sent && /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/FridgeHome/".concat(this.state.id)
    }));
  }
}
var _default = exports.default = Signin;