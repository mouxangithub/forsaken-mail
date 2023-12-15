/**
 * Created by Hongcai Deng on 2015/12/28.
 */

"use strict";

const mailin = require("./mailin");

module.exports = function (io) {
  mailin.on("message", function (connection, data) {
    let to = data.headers.to.toLowerCase();
    let exp = /[\w\._\-\+]+@[\w\._\-\+]+/i;
    if (exp.test(to)) {
      let from = data.headers.from.toLowerCase();
      let subject = data.headers.subject || "无主题";
      let time = new Date(data.headers.date).toLocaleTimeString();
      console.log(
        "收信人：" +
          to.match(exp) +
          " --- " +
          "发信人：" +
          from.match(exp) +
          " --- " +
          "主题：" +
          subject +
          " --- " +
          "时间：" +
          time
      );
      io.emit("mail", data);
    }
  });
  io.on("connection", (socket) => {});
};
