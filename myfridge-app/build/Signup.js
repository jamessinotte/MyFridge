"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _SignupModule = _interopRequireDefault(require("./Signup.module.css"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Invalid_Password = () => /*#__PURE__*/_react.default.createElement("div", {
  id: "Invalid_Password"
}, /*#__PURE__*/_react.default.createElement("h1", {
  className: _SignupModule.default.invalidPassword
}, "Passwords do not match"));
const Inputs = _ref => {
  let {
    OnInputChangeEmail,
    OnInputChangePassword,
    OnInputChangeName
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "SignupInputs",
    className: _SignupModule.default.SignupInputs
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "email",
    name: "email",
    placeholder: "Email",
    onChange: OnInputChangeEmail,
    className: _SignupModule.default.emailBox
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    name: "password",
    placeholder: "Password",
    onChange: OnInputChangePassword,
    className: _SignupModule.default.passwordBox
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    name: "confirm_password",
    placeholder: "Confirm Password",
    onChange: OnInputChangePassword,
    className: _SignupModule.default.confirmPasswordBox
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    name: "name",
    placeholder: "Display Name",
    onChange: OnInputChangeName,
    className: _SignupModule.default.nameBox
  }));
};
class Signup extends _react.Component {
  constructor() {
    super();
    _defineProperty(this, "handleInputChangeEmail", event => {
      const {
        name,
        value
      } = event.target;
      this.setState({
        [name]: value
      });
    });
    _defineProperty(this, "handleInputChangePassword", event => {
      const {
        name,
        value
      } = event.target;
      this.setState({
        [name]: value
      });
    });
    _defineProperty(this, "handleInputChangeName", event => {
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
        password,
        confirm_password,
        name
      } = this.state;
      if (password === confirm_password) {
        try {
          await _axios.default.post('https://myfridgeweb-9977.onrender.com/Signup', {
            email,
            password,
            name
          });
          this.showInputs(false);
          this.setState({
            Signedup: true,
            errorMessage: ''
          });
        } catch (error) {
          console.error('Signup error:', error);
          this.setState({
            errorMessage: 'Signup failed. Please try again.'
          });
        }
      } else {
        this.setState({
          showPasswordError: true,
          errorMessage: ''
        });
      }
    });
    _defineProperty(this, "showInputs", booleon => {
      this.setState({
        showInput: booleon
      });
    });
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      name: '',
      showInput: true,
      showPasswordError: false,
      errorMessage: '',
      // State variable for error message
      Signedup: false
    };
  }
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _SignupModule.default.Signup
    }, /*#__PURE__*/_react.default.createElement("form", {
      className: _SignupModule.default.SignupForm,
      onSubmit: this.handleSubmit
    }, this.state.showInput && /*#__PURE__*/_react.default.createElement(Inputs, {
      OnInputChangeEmail: this.handleInputChangeEmail,
      OnInputChangePassword: this.handleInputChangePassword,
      OnInputChangeName: this.handleInputChangeName
    }), this.state.showPasswordError && /*#__PURE__*/_react.default.createElement(Invalid_Password, null), this.state.errorMessage && /*#__PURE__*/_react.default.createElement("div", {
      className: _SignupModule.default.ErrorMessage
    }, this.state.errorMessage), /*#__PURE__*/_react.default.createElement("button", {
      type: "submit",
      className: _SignupModule.default.Submit
    }, "Sign Up"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: "/Signin",
      className: _SignupModule.default.Link
    }, "Sign In")), this.state.Signedup && /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/Signin"
    }));
  }
}
var _default = exports.default = Signup;