"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Signin = require("./Signin.js");
var _axios = _interopRequireDefault(require("axios"));
var _reactSelectVirtualized = _interopRequireDefault(require("react-select-virtualized"));
var _FridgeModule = _interopRequireDefault(require("./Fridge.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Fridge extends _react.Component {
  constructor() {
    super();
    _defineProperty(this, "newFoodData", async () => {
      const response = await fetch("https://myfridgeweb-9977.onrender.com/Food");
      const data = await response.json();
      const newItems = data.map((item, index) => ({
        ...item,
        inFridge: false,
        label: item.ingredient,
        number: index,
        weight: 0,
        inRecipe: true
      }));
      console.log(newItems, 'items seen');
      const newData = {
        fridgeItems: newItems
      };
      this.setState({
        made: true
      });
      this.setState(prevState => {
        return {
          ...prevState,
          ...newData
        };
      });
    });
    _defineProperty(this, "componentDidMount", async () => {
      console.log(_Signin.userData);
      if (_Signin.userData.user.ingredients_use.ingredients.length == 0) {
        await this.newFoodData();
        console.log(this.state, 'newState');
      } else {
        const newItems = await _Signin.userData.user.ingredients_use.ingredients;
        const newData = {
          fridgeItems: newItems
        };
        this.setState(prevState => {
          return {
            ...prevState,
            ...newData
          };
        });
      }
      this.setState({
        made: true
      });
    });
    _defineProperty(this, "componentDidUpdate", async () => {
      console.log(this.state, 'Update State');
      if (this.state.made == true) {
        {
          this.updateFoodDataSubmit();
        }
      }
    });
    _defineProperty(this, "updateFoodDataSubmit", async () => {
      let fridgeItems = this.state.fridgeItems;
      const response = await _axios.default.post("https://myfridgeweb-9977.onrender.com/Fridge/".concat(_Signin.userData.user.userNumber), {
        fridgeItems
      });
    });
    _defineProperty(this, "deleteItem", index => {
      const newItems = this.state.fridgeItems;
      console.log(newItems[index]);
      newItems[index].inFridge = false;
      let newData = {
        fridgeItems: newItems
      };
      this.setState({
        newData
      });
      this.updateFoodDataSubmit();
    });
    _defineProperty(this, "addFridge", async event => {
      event.preventDefault();
      const fridgeItemss = this.state.fridgeItems;
      if (this.state.selectedValue) {
        const itemToUpdate = fridgeItemss[this.state.selectedValue.number];
        itemToUpdate.inFridge = true;
        let number = itemToUpdate.number;
        fridgeItemss[number] = itemToUpdate;
      }
      this.setState({
        fridgeItems: fridgeItemss
      });
    });
    _defineProperty(this, "searchbarDropdown", props => {
      /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        className: _FridgeModule.default.AddItem,
        placeholder: "Search for Items"
      });
    });
    _defineProperty(this, "handleSearchChange", option => {
      this.setState({
        selectedValue: option
      });
    });
    this.state = {
      foodData: [],
      fridgeItems: [],
      made: false,
      selectedValue: 'Corn'
    };
  }
  render() {
    const {
      fridgeItems
    } = this.state;
    const fridgeList = this.state.fridgeItems.map((item, index) => {
      if (item.inFridge == true) {
        console.log('button made');
        return /*#__PURE__*/_react.default.createElement("div", {
          className: _FridgeModule.default.itemArea,
          key: index
        }, /*#__PURE__*/_react.default.createElement("button", {
          className: _FridgeModule.default.itemFridge,
          onClick: () => this.deleteItem(index)
        }, item.label));
      } else {
        return null;
      }
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _FridgeModule.default.Fridge
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: _FridgeModule.default.FridgeHeadings
    }, /*#__PURE__*/_react.default.createElement("h1", {
      className: _FridgeModule.default.FridgeWelcome,
      id: "Welcome_MyFridge"
    }, "Welcome to The Fridge!"), /*#__PURE__*/_react.default.createElement("h2", {
      className: _FridgeModule.default.FridgeHeading
    }, " Search for Items to Add, Click on Items to Delete")), /*#__PURE__*/_react.default.createElement("div", {
      className: _FridgeModule.default.addFridge
    }, /*#__PURE__*/_react.default.createElement("form", {
      method: "post",
      className: _FridgeModule.default.Form
    }, /*#__PURE__*/_react.default.createElement(_reactSelectVirtualized.default, {
      className: _FridgeModule.default.Select,
      onChange: this.handleSearchChange,
      options: this.state.fridgeItems,
      getOptionValue: option => option.label
    }), /*#__PURE__*/_react.default.createElement("button", {
      className: _FridgeModule.default.SubmitFridge,
      onClick: this.addFridge,
      type: "submit"
    }, "Add Item"))), /*#__PURE__*/_react.default.createElement("div", {
      className: _FridgeModule.default.Items
    }, fridgeList), /*#__PURE__*/_react.default.createElement("div", {
      className: _FridgeModule.default.FridgeHomeButtonContainer
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: "/FridgeHome/".concat(_Signin.userData.user.userNumber)
    }, /*#__PURE__*/_react.default.createElement("button", {
      className: _FridgeModule.default.FridgeHomeButton
    }, "Go to Fridge Home"))));
  }
}
var _default = exports.default = Fridge;