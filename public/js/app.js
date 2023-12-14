/**
 * Created by Hongcai Deng on 2015/12/29.
 */

$(function () {
  $(".ui.modal").modal();

  Push.Permission.request();

  $shortId = $("#shortid");
  $maillist = $("#maillist");

  $maillist.on("click", "tr", function () {
    var mail = $(this).data("mail");
    $("#mailcard .header").text(mail.headers.subject || "无主题");
    $("#mailcard .content:last").html(mail.html);
    $("#mailcard i").click(function () {
      $("#raw").modal("show");
    });
    $("#raw .header").text("RAW");
    $("#raw .content").html(
      $("<pre>").html(
        $("<code>")
          .addClass("language-json")
          .html(JSON.stringify(mail, null, 2))
      )
    );
    Prism.highlightAll();
  });

  var socket = io();

  socket.on("connect", () => {});

  socket.on("mail", function (mail) {
    var val = $shortId.val();
    var exp = /[\w\._\-\+]+@[\w\._\-\+]+/i;
    var to = mail.headers.to;
    var from = mail.headers.from;
    var toMatches = to.match(exp)[0];
    var fromMatches = from.match(exp)[0];
    var shortid = toMatches.substring(0, toMatches.indexOf("@"));
    var match = true;
    if (val) {
      match = false;
      if (val == shortid || (exp.test(val) && val.match(exp)[0] == toMatches)) {
        match = true;
      }
    }
    if (match) {
      Push.create("新邮件", {
        body: "邮件来自：" + mail.headers.from,
        timeout: 5000,
      });
      $tr = $("<tr>").data("mail", mail);
      $tr
        .append($("<td>").text(toMatches))
        .append($("<td>").text(fromMatches))
        .append($("<td>").text(mail.headers.subject || "无主题"))
        .append(
          $("<td>").text(new Date(mail.headers.date).toLocaleTimeString())
        );
      $maillist.prepend($tr);
    }
  });
});
