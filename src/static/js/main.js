(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var socket = io.connect("/");

function sendMessage(message) {
  socket.emit("newMessage", {
    message: message
  });
  console.log("YOU:".concat(message));
}

function setNickname(nickname) {
  socket.emit("newNickName", {
    nickname: nickname
  });
}

socket.on("sendMessage", function (_ref) {
  var message = _ref.message,
      nickname = _ref.nickname;
  return console.log("".concat(nickname, ": ").concat(message));
});
socket.on("messageSent", function (_ref2) {
  var message = _ref2.message,
      me = _ref2.me;
  return console.log("".concat(me, ": ").concat(message));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfN2ViYjE0My5qcyJdLCJuYW1lcyI6WyJzb2NrZXQiLCJpbyIsImNvbm5lY3QiLCJzZW5kTWVzc2FnZSIsIm1lc3NhZ2UiLCJlbWl0IiwiY29uc29sZSIsImxvZyIsInNldE5pY2tuYW1lIiwibmlja25hbWUiLCJvbiIsIm1lIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLE1BQU0sR0FBR0MsRUFBRSxDQUFDQyxPQUFILENBQVcsR0FBWCxDQUFmOztBQUVBLFNBQVNDLFdBQVQsQ0FBcUJDLE9BQXJCLEVBQThCO0FBQzVCSixFQUFBQSxNQUFNLENBQUNLLElBQVAsQ0FBWSxZQUFaLEVBQTBCO0FBQUVELElBQUFBLE9BQU8sRUFBRUE7QUFBWCxHQUExQjtBQUNBRSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsZUFBbUJILE9BQW5CO0FBQ0Q7O0FBRUQsU0FBU0ksV0FBVCxDQUFxQkMsUUFBckIsRUFBK0I7QUFDN0JULEVBQUFBLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZLGFBQVosRUFBMkI7QUFBRUksSUFBQUEsUUFBUSxFQUFFQTtBQUFaLEdBQTNCO0FBQ0Q7O0FBRURULE1BQU0sQ0FBQ1UsRUFBUCxDQUFVLGFBQVYsRUFBeUI7QUFBQSxNQUFHTixPQUFILFFBQUdBLE9BQUg7QUFBQSxNQUFZSyxRQUFaLFFBQVlBLFFBQVo7QUFBQSxTQUN2QkgsT0FBTyxDQUFDQyxHQUFSLFdBQWVFLFFBQWYsZUFBNEJMLE9BQTVCLEVBRHVCO0FBQUEsQ0FBekI7QUFJQUosTUFBTSxDQUFDVSxFQUFQLENBQVUsYUFBVixFQUF5QjtBQUFBLE1BQUdOLE9BQUgsU0FBR0EsT0FBSDtBQUFBLE1BQVlPLEVBQVosU0FBWUEsRUFBWjtBQUFBLFNBQXFCTCxPQUFPLENBQUNDLEdBQVIsV0FBZUksRUFBZixlQUFzQlAsT0FBdEIsRUFBckI7QUFBQSxDQUF6QiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNvY2tldCA9IGlvLmNvbm5lY3QoXCIvXCIpO1xuXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShtZXNzYWdlKSB7XG4gIHNvY2tldC5lbWl0KFwibmV3TWVzc2FnZVwiLCB7IG1lc3NhZ2U6IG1lc3NhZ2UgfSk7XG4gIGNvbnNvbGUubG9nKGBZT1U6JHttZXNzYWdlfWApXG59XG5cbmZ1bmN0aW9uIHNldE5pY2tuYW1lKG5pY2tuYW1lKSB7XG4gIHNvY2tldC5lbWl0KFwibmV3Tmlja05hbWVcIiwgeyBuaWNrbmFtZTogbmlja25hbWUgfSk7XG59XG5cbnNvY2tldC5vbihcInNlbmRNZXNzYWdlXCIsICh7IG1lc3NhZ2UsIG5pY2tuYW1lIH0pID0+XG4gIGNvbnNvbGUubG9nKGAke25pY2tuYW1lfTogJHttZXNzYWdlfWApXG4pO1xuXG5zb2NrZXQub24oXCJtZXNzYWdlU2VudFwiLCAoeyBtZXNzYWdlLCBtZSB9KSA9PiBjb25zb2xlLmxvZyhgJHttZX06ICR7bWVzc2FnZX1gKSk7XG4iXX0=
},{}]},{},[1])