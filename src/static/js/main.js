(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require("./sockets.js");

require("./login.js");

require("./notifications.js");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfN2VkY2MyOGIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vc29ja2V0cy5qc1wiO1xuaW1wb3J0IFwiLi9sb2dpbi5qc1wiO1xuaW1wb3J0IFwiLi9ub3RpZmljYXRpb25zLmpzXCI7XG5cbiJdfQ==
},{"./login.js":2,"./notifications.js":3,"./sockets.js":4}],2:[function(require,module,exports){
"use strict";

var _sockets = require("./sockets");

var body = document.querySelector("body");
var loginForm = document.getElementById("jsForm");
var loginInput = document.getElementById("jsInput");
var LOGGED_OUT = "loggedOut";
var LOGGED_IN = "loggedIn";
var NICKNAME = "nickName";
var nickName = localStorage.getItem(NICKNAME);

var login = function login(nickName) {
  document.socket = io.connect("/");
  document.socket.emit("setNickname", {
    nickName: nickName
  });
};

var handleLoginFormSubmit = function handleLoginFormSubmit(e) {
  e.preventDefault();
  var newNickName = loginInput.value;
  localStorage.setItem(NICKNAME, "".concat(newNickName));
  loginInput.value = "";
  login(newNickName);
};

loginForm.addEventListener("submit", handleLoginFormSubmit);

if (nickName == null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  login(nickName);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2dpbkZvcm0iLCJnZXRFbGVtZW50QnlJZCIsImxvZ2luSW5wdXQiLCJMT0dHRURfT1VUIiwiTE9HR0VEX0lOIiwiTklDS05BTUUiLCJuaWNrTmFtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2dpbiIsInNvY2tldCIsImlvIiwiY29ubmVjdCIsImVtaXQiLCJoYW5kbGVMb2dpbkZvcm1TdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJuZXdOaWNrTmFtZSIsInZhbHVlIiwic2V0SXRlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBTUEsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYjtBQUNBLElBQU1DLFNBQVMsR0FBR0YsUUFBUSxDQUFDRyxjQUFULENBQXdCLFFBQXhCLENBQWxCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHSixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBbkI7QUFFQSxJQUFNRSxVQUFVLEdBQUcsV0FBbkI7QUFDQSxJQUFNQyxTQUFTLEdBQUcsVUFBbEI7QUFDQSxJQUFNQyxRQUFRLEdBQUcsVUFBakI7QUFFQSxJQUFNQyxRQUFRLEdBQUdDLFlBQVksQ0FBQ0MsT0FBYixDQUFxQkgsUUFBckIsQ0FBakI7O0FBRUEsSUFBTUksS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQ0gsUUFBRCxFQUFjO0FBQzFCUixFQUFBQSxRQUFRLENBQUNZLE1BQVQsR0FBa0JDLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXLEdBQVgsQ0FBbEI7QUFDQWQsRUFBQUEsUUFBUSxDQUFDWSxNQUFULENBQWdCRyxJQUFoQixDQUFxQixhQUFyQixFQUFvQztBQUFFUCxJQUFBQSxRQUFRLEVBQUVBO0FBQVosR0FBcEM7QUFDRCxDQUhEOztBQUtBLElBQU1RLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQ0MsQ0FBRCxFQUFPO0FBQ25DQSxFQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQSxNQUFNQyxXQUFXLEdBQUdmLFVBQVUsQ0FBQ2dCLEtBQS9CO0FBQ0FYLEVBQUFBLFlBQVksQ0FBQ1ksT0FBYixDQUFxQmQsUUFBckIsWUFBa0NZLFdBQWxDO0FBQ0FmLEVBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsR0FBbUIsRUFBbkI7QUFDQVQsRUFBQUEsS0FBSyxDQUFDUSxXQUFELENBQUw7QUFDRCxDQU5EOztBQVFBakIsU0FBUyxDQUFDb0IsZ0JBQVYsQ0FBMkIsUUFBM0IsRUFBcUNOLHFCQUFyQzs7QUFFQSxJQUFJUixRQUFRLElBQUksSUFBaEIsRUFBc0I7QUFDcEJULEVBQUFBLElBQUksQ0FBQ3dCLFNBQUwsR0FBaUJsQixVQUFqQjtBQUNELENBRkQsTUFFTztBQUNMTixFQUFBQSxJQUFJLENBQUN3QixTQUFMLEdBQWlCakIsU0FBakI7QUFDQUssRUFBQUEsS0FBSyxDQUFDSCxRQUFELENBQUw7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNvY2tldEluaXQgfSBmcm9tIFwiLi9zb2NrZXRzXCI7XG5cbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbmNvbnN0IGxvZ2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNGb3JtXCIpO1xuY29uc3QgbG9naW5JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNJbnB1dFwiKTtcblxuY29uc3QgTE9HR0VEX09VVCA9IFwibG9nZ2VkT3V0XCI7XG5jb25zdCBMT0dHRURfSU4gPSBcImxvZ2dlZEluXCI7XG5jb25zdCBOSUNLTkFNRSA9IFwibmlja05hbWVcIjtcblxuY29uc3Qgbmlja05hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShOSUNLTkFNRSk7XG5cbmNvbnN0IGxvZ2luID0gKG5pY2tOYW1lKSA9PiB7XG4gIGRvY3VtZW50LnNvY2tldCA9IGlvLmNvbm5lY3QoXCIvXCIpO1xuICBkb2N1bWVudC5zb2NrZXQuZW1pdChcInNldE5pY2tuYW1lXCIsIHsgbmlja05hbWU6IG5pY2tOYW1lIH0pO1xufTtcblxuY29uc3QgaGFuZGxlTG9naW5Gb3JtU3VibWl0ID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBuZXdOaWNrTmFtZSA9IGxvZ2luSW5wdXQudmFsdWU7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKE5JQ0tOQU1FLCBgJHtuZXdOaWNrTmFtZX1gKTtcbiAgbG9naW5JbnB1dC52YWx1ZSA9IFwiXCI7XG4gIGxvZ2luKG5ld05pY2tOYW1lKTtcbn07XG5cbmxvZ2luRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUxvZ2luRm9ybVN1Ym1pdCk7XG5cbmlmIChuaWNrTmFtZSA9PSBudWxsKSB7XG4gIGJvZHkuY2xhc3NOYW1lID0gTE9HR0VEX09VVDtcbn0gZWxzZSB7XG4gIGJvZHkuY2xhc3NOYW1lID0gTE9HR0VEX0lOO1xuICBsb2dpbihuaWNrTmFtZSk7XG59XG4iXX0=
},{"./sockets":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNewUser = void 0;

var handleNewUser = function handleNewUser(_ref) {
  var nickName = _ref.nickName;
  console.log("".concat(nickName, " has Joined"));
};

exports.handleNewUser = handleNewUser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbnMuanMiXSwibmFtZXMiOlsiaGFuZGxlTmV3VXNlciIsIm5pY2tOYW1lIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLElBQU1BLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsT0FBa0I7QUFBQSxNQUFmQyxRQUFlLFFBQWZBLFFBQWU7QUFDN0NDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixXQUFlRixRQUFmO0FBQ0QsQ0FGTSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBoYW5kbGVOZXdVc2VyID0gKHsgbmlja05hbWUgfSkgPT4ge1xuICBjb25zb2xlLmxvZyhgJHtuaWNrTmFtZX0gaGFzIEpvaW5lZGApO1xufTtcblxuIl19
},{}],4:[function(require,module,exports){
"use strict";
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbXX0=
},{}]},{},[1])