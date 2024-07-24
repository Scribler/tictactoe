(function(r, t) {
  "use strict";
  r.onerror = function(e, r, t) {
      return false
  }
  ;
  r.audiocontext = r.audiocontext || r.webkitaudiocontext;
  var s = function(e) {
      try {
          var r = "_";
          e.setitem(r, r);
          e.removeitem(r);
          return true
      } catch (e) {
          return false
      }
  }(r.localstorage);
  if (r.mutationobserver && t.body.classlist && t.body.classlist.contains("mobile")) {
      var o = new mutationobserver(function() {
          var e = t.queryselector(".google-revocation-link-placeholder");
          if (e) {
              e.style = e.getattribute("style") + "bottom: calc(60px + env(safe-area-inset-bottom)) !important;";
              o.disconnect()
          }
      }
      );
      o.observe(t.body, {
          childlist: true
      })
  }
  function a(r) {
      var e = new xmlhttprequest;
      e.open("get", "/assets/audio/" + r + ".mp3", true);
      e.responsetype = "arraybuffer";
      e.onload = function() {
          f.decodeaudiodata(e.response, function(e) {
              l[r] = e
          }, function() {})
      }
      ;
      e.send()
  }
  function y(e) {
      if (d || !l[e]) {
          return
      }
      if (f && f.resume) {
          f.resume()
      }
      var r = f.createbuffersource();
      r.buffer = l[e];
      r.connect(f.destination);
      if (r.start) {
          r.start(0)
      } else {
          r.noteon(0)
      }
  }
  var n = {}, i = {
      player1: 0,
      player2: 0,
      ties: 0
  }, u = {
      player1: 0,
      player2: 0,
      ties: 0
  }, c = "x", v = "o", l = {}, f, m = 9, d, p, l = true, h = true, q = false, b = 300, s = .75, g, w = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  function m() {
      for (var e = n.mute.length; e--; ) {
          n.mute[e].style.display = d ? "none" : ""
      }
  }
  function t() {
      d = !d;
      if (s) {
          localstorage.setitem("muted", d.tostring())
      }
      m()
  }
  function k() {
      q = !q;
      var e = n.scores.scores.classlist;
      if (q) {
          e.remove("p1");
          e.add("p2");
          h = true
      } else {
          e.remove("p2");
          e.add("p1");
          h = false
      }
      n.scores.player1.innerhtml = q ? u.player1 : i.player1;
      n.scores.player2.innerhtml = q ? u.player2 : i.player2;
      n.scores.ties.innerhtml = q ? u.ties : i.ties;
      p = false;
      o()
  }
  function a(e, r) {
      n.squares[r].queryselector("div").classlist.add(e)
  }
  function x() {
      var e = n.scores.turn1.classlist
        , r = n.scores.turn2.classlist
        , t = n.scores.turnties.classlist;
      if (q && n.restart.style.display === "none") {
          if (l) {
              r.remove("turn");
              e.add("turn")
          } else {
              e.remove("turn");
              r.add("turn")
          }
          t.add("turn")
      } else {
          e.remove("turn");
          r.remove("turn");
          t.remove("turn")
      }
  }
  function d(e) {
      if (g[e] !== 0 || c() || !q && l) {
          return
      }
      if (q) {
          l = !l;
          g[e] = l ? -1 : 1;
          a(l ? c : v, e);
          y("note-" + (l ? "low" : "high"));
          c()
      } else {
          g[e] = -1;
          a(c, e);
          l = true;
          y("note-low");
          settimeout(b, b)
      }
      x()
  }
  function h(s, o) {
      n.restart.style.display = "block";
      settimeout(function() {
          var e = "game"
            , r = q ? "players " : "computer ";
          settimeout(function() {
              p = false
          }, b);
          if (o) {
              for (var t = 3; t--; ) {
                  n.squares[o[t]].classlist.add("win")
              }
          }
          switch (s) {
          case c:
              n.scores.player1.innerhtml = q ? ++u.player1 : ++i.player1;
              n.scores.player1.classlist.add("appear");
              n.board.classlist.add("win");
              y("game-over");
              break;
          case v:
              n.scores.player2.innerhtml = q ? ++u.player2 : ++i.player2;
              n.scores.player2.classlist.add("appear");
              n.board.classlist.add("win");
              y("game-over");
              break;
          default:
              n.scores.ties.innerhtml = q ? ++u.ties : ++i.ties;
              n.scores.ties.classlist.add("appear");
              n.board.classlist.add("tie");
              y("game-over-tie");
              break
          }
      }, l && !q ? 100 : b + 100)
  }
  function c() {
      for (var e = w.length; e--; ) {
          var r = w[e]
            , t = g[r[0]] + g[r[1]] + g[r[2]];
          if (t === 3 || t === -3) {
              h(t === 3 ? v : c, r);
              return true
          }
      }
      var s = 0;
      for (e = m; e--; ) {
          if (g[e] !== 0) {
              s++
          }
      }
      if (s === 9) {
          h();
          return true
      }
      return false
  }
  function b() {
      if (c()) {
          return
      }
      var e, r, t, s, o, a, n = 0;
      l = false;
      x();
      y("note-high");
      for (e = m; e--; ) {
          if (g[e] !== 0) {
              n++;
              if (n === 1) {
                  a = e
              }
          }
      }
      if (n < 2 && math.random() > .2) {
          do {
              o = math.floor(math.random() * m)
          } while (o === a)
      } else {
          for (e = m; e--; ) {
              for (r = m; r--; ) {
                  if (g[r] !== 0) {
                      continue
                  }
                  g[r] = 1;
                  if (c()) {
                      a(v, r);
                      return
                  }
                  g[r] = 0
              }
              if (g[e] !== 0) {
                  continue
              }
              g[e] = 1;
              var i = null
                , u = g.concat();
              for (r = m; r--; ) {
                  if (u[r] !== 0) {
                      continue
                  }
                  u[r] = -1;
                  for (t = w.length; t--; ) {
                      if (u[w[t][0]] + u[w[t][1]] + u[w[t][2]] === -3 && math.random() > s) {
                          g[e] = 0;
                          g[r] = 1;
                          a(v, r);
                          c();
                          return
                      }
                  }
                  var c = 0
                    , l = 0
                    , f = u.concat()
                    , d = u.concat();
                  for (t = m; t--; ) {
                      if (f[t] === 0) {
                          f[t] = 1
                      }
                      if (d[t] === 0) {
                          d[t] = -1
                      }
                  }
                  for (t = w.length; t--; ) {
                      if (f[w[t][0]] + f[w[t][1]] + f[w[t][2]] === 3) {
                          c++
                      }
                      if (d[w[t][0]] + d[w[t][1]] + d[w[t][2]] === -3) {
                          l++
                      }
                  }
                  var p = c - l;
                  i = i == null ? p : i > p ? p : i;
                  u[r] = 0
              }
              if (s == null || s < i) {
                  s = i;
                  o = e
              }
              g[e] = 0
          }
      }
      g[o] = 1;
      a(v, o);
      c()
  }
  function i(r) {
      n.squares[r].ontouchstart = n.squares[r].onmousedown = function(e) {
          e.preventdefault();
          d(r)
      }
  }
  function o() {
      if (p) {
          return
      }
      p = true;
      n.restart.style.display = "none";
      g = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (var e = m; e--; ) {
          n.squares[e].classlist.remove("win");
          n.squares[e].queryselector("div").classname = ""
      }
      n.scores.ties.classlist.remove("appear");
      n.scores.player1.classlist.remove("appear");
      n.scores.player2.classlist.remove("appear");
      n.board.classlist.remove("win");
      n.board.classlist.remove("tie");
      l = h = !h;
      x();
      if (h && !q) {
          settimeout(b, b)
      }
  }
  t.addeventlistener("domcontentloaded", function() {
      n = {
          board: t.queryselector(".board"),
          squares: t.queryselectorall(".square"),
          restart: t.queryselector(".restart"),
          mutebutton: t.queryselector(".mute"),
          mute: t.queryselectorall(".mute path"),
          privacy: t.queryselector(".privacy"),
          scores: {
              scores: t.queryselector(".scores"),
              swap: t.queryselector(".swap"),
              player1: t.queryselector(".player1 .score"),
              player2: t.queryselector(".player2 .score"),
              ties: t.queryselector(".ties .score"),
              turn1: t.queryselector(".player1"),
              turn2: t.queryselector(".player2"),
              turnties: t.queryselector(".ties")
          }
      };
      for (var e = m; e--; ) {
          i(e)
      }
      n.restart.ontouchstart = n.scores.scores.ontouchstart = function(e) {
          e.preventdefault()
      }
      ;
      n.scores.scores.ontouchend = n.scores.scores.onclick = function(e) {
          e.preventdefault();
          k()
      }
      ;
      n.restart.ontouchend = n.restart.onclick = function(e) {
          e.preventdefault();
          o()
      }
      ;
      if (r.audiocontext) {
          f = new audiocontext;
          a("note-high");
          a("note-low");
          a("game-over");
          a("game-over-tie");
          d = s ? localstorage.getitem("muted") === "true" : false;
          m();
          n.mutebutton.ontouchstart = n.mutebutton.onclick = function(e) {
              e.preventdefault();
              t()
          }
      }
      o()
  })
}
)(window, document);
