/* http://prismjs.com/download.html?themes=prism&languages=json&plugins=line-highlight */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function () {
    var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
      t = (_self.Prism = {
        util: {
          encode: function (e) {
            return e instanceof n
              ? new n(e.type, t.util.encode(e.content), e.alias)
              : "Array" === t.util.type(e)
              ? e.map(t.util.encode)
              : e
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString
              .call(e)
              .match(/\[object (\w+)\]/)[1];
          },
          clone: function (e) {
            var n = t.util.type(e);
            switch (n) {
              case "Object":
                var a = {};
                for (var r in e)
                  e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
                return a;
              case "Array":
                return (
                  e.map &&
                  e.map(function (e) {
                    return t.util.clone(e);
                  })
                );
            }
            return e;
          },
        },
        languages: {
          extend: function (e, n) {
            var a = t.util.clone(t.languages[e]);
            for (var r in n) a[r] = n[r];
            return a;
          },
          insertBefore: function (e, n, a, r) {
            r = r || t.languages;
            var l = r[e];
            if (2 == arguments.length) {
              a = arguments[1];
              for (var i in a) a.hasOwnProperty(i) && (l[i] = a[i]);
              return l;
            }
            var o = {};
            for (var s in l)
              if (l.hasOwnProperty(s)) {
                if (s == n)
                  for (var i in a) a.hasOwnProperty(i) && (o[i] = a[i]);
                o[s] = l[s];
              }
            return (
              t.languages.DFS(t.languages, function (t, n) {
                n === r[e] && t != e && (this[t] = o);
              }),
              (r[e] = o)
            );
          },
          DFS: function (e, n, a, r) {
            r = r || {};
            for (var l in e)
              e.hasOwnProperty(l) &&
                (n.call(e, l, e[l], a || l),
                "Object" !== t.util.type(e[l]) || r[e[l]]
                  ? "Array" !== t.util.type(e[l]) ||
                    r[e[l]] ||
                    ((r[e[l]] = !0), t.languages.DFS(e[l], n, l, r))
                  : ((r[e[l]] = !0), t.languages.DFS(e[l], n, null, r)));
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          for (
            var a,
              r = document.querySelectorAll(
                'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
              ),
              l = 0;
            (a = r[l++]);

          )
            t.highlightElement(a, e === !0, n);
        },
        highlightElement: function (n, a, r) {
          for (var l, i, o = n; o && !e.test(o.className); ) o = o.parentNode;
          o &&
            ((l = (o.className.match(e) || [, ""])[1]), (i = t.languages[l])),
            (n.className =
              n.className.replace(e, "").replace(/\s+/g, " ") +
              " language-" +
              l),
            (o = n.parentNode),
            /pre/i.test(o.nodeName) &&
              (o.className =
                o.className.replace(e, "").replace(/\s+/g, " ") +
                " language-" +
                l);
          var s = n.textContent,
            u = { element: n, language: l, grammar: i, code: s };
          if (!s || !i) return t.hooks.run("complete", u), void 0;
          if ((t.hooks.run("before-highlight", u), a && _self.Worker)) {
            var g = new Worker(t.filename);
            (g.onmessage = function (e) {
              (u.highlightedCode = e.data),
                t.hooks.run("before-insert", u),
                (u.element.innerHTML = u.highlightedCode),
                r && r.call(u.element),
                t.hooks.run("after-highlight", u),
                t.hooks.run("complete", u);
            }),
              g.postMessage(
                JSON.stringify({
                  language: u.language,
                  code: u.code,
                  immediateClose: !0,
                })
              );
          } else
            (u.highlightedCode = t.highlight(u.code, u.grammar, u.language)),
              t.hooks.run("before-insert", u),
              (u.element.innerHTML = u.highlightedCode),
              r && r.call(n),
              t.hooks.run("after-highlight", u),
              t.hooks.run("complete", u);
        },
        highlight: function (e, a, r) {
          var l = t.tokenize(e, a);
          return n.stringify(t.util.encode(l), r);
        },
        tokenize: function (e, n) {
          var a = t.Token,
            r = [e],
            l = n.rest;
          if (l) {
            for (var i in l) n[i] = l[i];
            delete n.rest;
          }
          e: for (var i in n)
            if (n.hasOwnProperty(i) && n[i]) {
              var o = n[i];
              o = "Array" === t.util.type(o) ? o : [o];
              for (var s = 0; s < o.length; ++s) {
                var u = o[s],
                  g = u.inside,
                  c = !!u.lookbehind,
                  f = 0,
                  h = u.alias;
                u = u.pattern || u;
                for (var p = 0; p < r.length; p++) {
                  var d = r[p];
                  if (r.length > e.length) break e;
                  if (!(d instanceof a)) {
                    u.lastIndex = 0;
                    var m = u.exec(d);
                    if (m) {
                      c && (f = m[1].length);
                      var y = m.index - 1 + f,
                        m = m[0].slice(f),
                        v = m.length,
                        k = y + v,
                        b = d.slice(0, y + 1),
                        w = d.slice(k + 1),
                        P = [p, 1];
                      b && P.push(b);
                      var A = new a(i, g ? t.tokenize(m, g) : m, h);
                      P.push(A),
                        w && P.push(w),
                        Array.prototype.splice.apply(r, P);
                    }
                  }
                }
              }
            }
          return r;
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var a = t.hooks.all;
            (a[e] = a[e] || []), a[e].push(n);
          },
          run: function (e, n) {
            var a = t.hooks.all[e];
            if (a && a.length) for (var r, l = 0; (r = a[l++]); ) r(n);
          },
        },
      }),
      n = (t.Token = function (e, t, n) {
        (this.type = e), (this.content = t), (this.alias = n);
      });
    if (
      ((n.stringify = function (e, a, r) {
        if ("string" == typeof e) return e;
        if ("Array" === t.util.type(e))
          return e
            .map(function (t) {
              return n.stringify(t, a, e);
            })
            .join("");
        var l = {
          type: e.type,
          content: n.stringify(e.content, a, r),
          tag: "span",
          classes: ["token", e.type],
          attributes: {},
          language: a,
          parent: r,
        };
        if (
          ("comment" == l.type && (l.attributes.spellcheck = "true"), e.alias)
        ) {
          var i = "Array" === t.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(l.classes, i);
        }
        t.hooks.run("wrap", l);
        var o = "";
        for (var s in l.attributes)
          o += (o ? " " : "") + s + '="' + (l.attributes[s] || "") + '"';
        return (
          "<" +
          l.tag +
          ' class="' +
          l.classes.join(" ") +
          '" ' +
          o +
          ">" +
          l.content +
          "</" +
          l.tag +
          ">"
        );
      }),
      !_self.document)
    )
      return _self.addEventListener
        ? (_self.addEventListener(
            "message",
            function (e) {
              var n = JSON.parse(e.data),
                a = n.language,
                r = n.code,
                l = n.immediateClose;
              _self.postMessage(t.highlight(r, t.languages[a], a)),
                l && _self.close();
            },
            !1
          ),
          _self.Prism)
        : _self.Prism;
    var a = document.getElementsByTagName("script");
    return (
      (a = a[a.length - 1]),
      a &&
        ((t.filename = a.src),
        document.addEventListener &&
          !a.hasAttribute("data-manual") &&
          document.addEventListener("DOMContentLoaded", t.highlightAll)),
      _self.Prism
    );
  })();
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.json = {
  property: /".*?"(?=\s*:)/gi,
  string: /"(?!:)(\\?[^"])*?"(?!:)/g,
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
  punctuation: /[{}[\]);,]/g,
  operator: /:/g,
  boolean: /\b(true|false)\b/gi,
  null: /\bnull\b/gi,
}),
  (Prism.languages.jsonp = Prism.languages.json);
!(function () {
  function e(e, t) {
    return Array.prototype.slice.call((t || document).querySelectorAll(e));
  }
  function t(e, t) {
    return (
      (t = " " + t + " "),
      (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t) > -1
    );
  }
  function n(e, n, i) {
    for (
      var o,
        a = n.replace(/\s+/g, "").split(","),
        l = +e.getAttribute("data-line-offset") || 0,
        d = r() ? parseInt : parseFloat,
        c = d(getComputedStyle(e).lineHeight),
        s = 0;
      (o = a[s++]);

    ) {
      o = o.split("-");
      var u = +o[0],
        m = +o[1] || u,
        h = document.createElement("div");
      (h.textContent = Array(m - u + 2).join(" \n")),
        (h.className = (i || "") + " line-highlight"),
        t(e, "line-numbers") ||
          (h.setAttribute("data-start", u),
          m > u && h.setAttribute("data-end", m)),
        (h.style.top = (u - l - 1) * c + "px"),
        t(e, "line-numbers")
          ? e.appendChild(h)
          : (e.querySelector("code") || e).appendChild(h);
    }
  }
  function i() {
    var t = location.hash.slice(1);
    e(".temporary.line-highlight").forEach(function (e) {
      e.parentNode.removeChild(e);
    });
    var i = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
    if (i && !document.getElementById(t)) {
      var r = t.slice(0, t.lastIndexOf(".")),
        o = document.getElementById(r);
      o &&
        (o.hasAttribute("data-line") || o.setAttribute("data-line", ""),
        n(o, i, "temporary "),
        document.querySelector(".temporary.line-highlight").scrollIntoView());
    }
  }
  if (
    "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    document.querySelector
  ) {
    var r = (function () {
        var e;
        return function () {
          if ("undefined" == typeof e) {
            var t = document.createElement("div");
            (t.style.fontSize = "13px"),
              (t.style.lineHeight = "1.5"),
              (t.style.padding = 0),
              (t.style.border = 0),
              (t.innerHTML = "&nbsp;<br />&nbsp;"),
              document.body.appendChild(t),
              (e = 38 === t.offsetHeight),
              document.body.removeChild(t);
          }
          return e;
        };
      })(),
      o = 0;
    Prism.hooks.add("complete", function (t) {
      var r = t.element.parentNode,
        a = r && r.getAttribute("data-line");
      r &&
        a &&
        /pre/i.test(r.nodeName) &&
        (clearTimeout(o),
        e(".line-highlight", r).forEach(function (e) {
          e.parentNode.removeChild(e);
        }),
        n(r, a),
        (o = setTimeout(i, 1)));
    }),
      window.addEventListener && window.addEventListener("hashchange", i);
  }
})();
