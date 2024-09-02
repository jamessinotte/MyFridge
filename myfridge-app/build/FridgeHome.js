"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Signin = require("./Signin.js");
var _axios = _interopRequireDefault(require("axios"));
var _mongoose = require("mongoose");
var _FridgeHomeModule = _interopRequireDefault(require("./FridgeHome.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class FridgeHome extends _react.Component {
  constructor() {
    super();
    _defineProperty(this, "prevRestrictions", () => {
      console.log('prevRestrictions');
      if (this.state.checkedRestrictions == false && _Signin.userData.user.restrictions.made == true) {
        console.log('set restrictions');
        this.setState(prevState => {
          const newRestrictions = {
            diets: _Signin.userData.user.restrictions.diets,
            allergies: _Signin.userData.user.restrictions.allergies,
            checkedRestrictions: true
          };
          return {
            ...prevState,
            ...newRestrictions
          };
        });
      } else if (this.state.checkedRestrictions == false) {
        console.log('update restrictions');
        _Signin.userData.user.restrictions.allergies = this.state.allergies;
        _Signin.userData.user.restrictions.diets = this.state.diets;
        this.setState(prevState => {
          const newRestrictions = {
            checkedRestrictions: true
          };
          return {
            ...prevState,
            ...newRestrictions
          };
        });
      }
    });
    _defineProperty(this, "onclickDiet", index => {
      this.setState(prevState => {
        const newDiets = prevState.diets.map((diet, idx) => {
          if (idx === index) {
            return {
              ...diet,
              value: !diet.value
            };
          }
          return diet;
        });
        console.log(this.state);
        return {
          diets: newDiets
        };
      });
    });
    _defineProperty(this, "onclickAllergy", index => {
      this.setState(prevState => {
        const newAllergies = prevState.allergies.map((allergy, idx) => {
          if (idx == index) {
            return {
              ...allergy,
              value: !allergy.value
            };
          }
          return allergy;
        });
        console.log(this.state);
        return {
          allergies: newAllergies
        };
      });
    });
    _defineProperty(this, "handleSubmit", async (event, destination, diet, allergies) => {
      event.preventDefault();
      console.log(this.state);
      const userNumber = _Signin.userData.user.userNumber || _Signin.userData.user.userNumber;
      this.setState({
        dataSent: true,
        navigateto: destination
      });
      console.log('userNumber', userNumber);
      if (!userNumber) {
        console.error('Usernumber is undefined');
        return;
      }
      try {
        console.log('UserNumber', this.state.userNumber);
        const response = await _axios.default.post("https://myfridgeweb-9977.onrender.com/FridgeHome/".concat(userNumber), {
          diet,
          allergies
        });
      } catch (error) {
        event.preventDefault();
        console.log('Error sending data too database', error);
      }
    });
    this.state = {
      dataSent: false,
      userNumber: null,
      checkedRestrictions: false,
      navigateto: null,
      diets: [{
        text: "Vegan",
        id: "Vegan",
        value: false
      }, {
        text: "Vegetarian",
        id: "Vegetarian",
        value: false
      }, {
        text: "Gluten-free",
        id: "Pork-free",
        value: false
      }, {
        text: "Pescatarian",
        id: "Pescatarian",
        value: false
      }, {
        text: "Lacto-Vegetarian",
        id: "Lacto-vegeterian",
        value: false
      }, {
        text: "Ovo-Vegetarian",
        id: "Kosher",
        value: false
      }, {
        text: "Whole30",
        id: "Whole30",
        value: false
      }, {
        text: "Keto",
        id: "Keto",
        value: false
      }, {
        text: "Paleo",
        id: "Paleo",
        value: false
      }],
      allergies: [{
        text: "Dairy",
        id: "Dairy-free",
        value: false
      }, {
        text: "Eggs",
        id: "Eggs-free",
        value: false
      }, {
        text: "Seafood",
        id: "Seafood",
        value: false
      }, {
        text: "Tree Nuts",
        id: "Tree-Nut-free",
        value: false
      }, {
        text: "Wheat",
        id: "Wheat-free",
        value: false
      }, {
        text: "Peanut",
        id: "Peanut",
        value: false
      }, {
        text: "Soy",
        id: "Soy-free",
        value: false
      }, {
        text: "Shellfish",
        id: "Shellfish-free",
        value: false
      }]
    };
  }
  componentDidMount() {
    this.setState({
      userNumber: _Signin.userData.user.userNumber
    });
    this.prevRestrictions();
  }
  render() {
    const dietList = this.state.diets.map((type, index) => /*#__PURE__*/_react.default.createElement("div", {
      key: type.id,
      className: _FridgeHomeModule.default.diet
    }, /*#__PURE__*/_react.default.createElement("input", {
      className: _FridgeHomeModule.default.cbx,
      type: "checkbox",
      checked: type.value,
      id: type.id,
      onChange: () => {
        this.onclickDiet(index);
      }
    }), /*#__PURE__*/_react.default.createElement("label", {
      className: _FridgeHomeModule.default.lbl,
      htmlFor: type.id
    }, type.text)));
    const allergyList = this.state.allergies.map((type, index) => /*#__PURE__*/_react.default.createElement("div", {
      key: type.id,
      className: _FridgeHomeModule.default.allergy
    }, /*#__PURE__*/_react.default.createElement("input", {
      className: _FridgeHomeModule.default.cbx,
      type: "checkbox",
      checked: type.value,
      id: type.id,
      onChange: () => {
        this.onclickAllergy(index);
      }
    }), /*#__PURE__*/_react.default.createElement("label", {
      className: _FridgeHomeModule.default.lbl,
      htmlFor: type.id
    }, type.text)));
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _FridgeHomeModule.default.FridgeHome
    }, /*#__PURE__*/_react.default.createElement("h1", {
      className: _FridgeHomeModule.default.Title,
      id: "Welcome_MyFridge"
    }, "Welcome to MyFridge!"), /*#__PURE__*/_react.default.createElement("h2", {
      className: _FridgeHomeModule.default.headingFridge
    }, "Click on your Fridge to edit your Ingredients!"), /*#__PURE__*/_react.default.createElement("h3", {
      className: _FridgeHomeModule.default.headingRecipe
    }, "Click on Recipe Builder to craft a Recipe!"), /*#__PURE__*/_react.default.createElement("div", {
      className: _FridgeHomeModule.default.options,
      id: "options"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: _FridgeHomeModule.default.dietArea
    }, /*#__PURE__*/_react.default.createElement("h4", null, "Diets"), dietList), /*#__PURE__*/_react.default.createElement("div", {
      className: _FridgeHomeModule.default.allergyArea
    }, /*#__PURE__*/_react.default.createElement("h4", null, "Allergies"), allergyList)), /*#__PURE__*/_react.default.createElement("div", {
      id: "homeLinks",
      className: _FridgeHomeModule.default.links
    }, /*#__PURE__*/_react.default.createElement("button", {
      className: _FridgeHomeModule.default.buttons,
      onClick: e => this.handleSubmit(e, 'Fridge', this.state.diets, this.state.allergies)
    }, "Open Fridge"), /*#__PURE__*/_react.default.createElement("button", {
      className: _FridgeHomeModule.default.buttons,
      onClick: e => this.handleSubmit(e, 'RecipeBuilder', this.state.diets, this.state.allergies)
    }, "Build Recipes"), this.state.dataSent && /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/".concat(this.state.navigateto, "/").concat(this.state.userNumber)
    })));
  }
}
var _default = exports.default = FridgeHome;