! function() {
    var n = ("https:" === document.location.protocol ? "https:" : "http:") + "//api.getblueshift.com/",
        u = n + "unity.gif",
        t = !1,
        l = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest,
        f = {};
    var o, d = {
        eventApiKey: void 0,
        userParams: {},
        slots: [],
        slotParams: {},
        tz: (new Date).getTimezoneOffset()
    };

    function i() {
        for (var s = [], e = 0; e < d.slots.length; e++) ! function(r) {
            var e, t;
            s[r] = h(), s[r].open("POST", n + "live", !0), s[r].setRequestHeader("Content-Type", "application/json"), s[r].setRequestHeader("X-Api-Key", d.eventApiKey), s[r].onreadystatechange = function() {
                if (4 === s[r].readyState && 200 == s[r].status) {
                    try {
                        var e = JSON.parse(s[r].responseText)
                    } catch (e) {
                        console.log("error loading slot", e)
                    }
                    e && e.show && (t = d.slots[r].el, n = e.width, o = e.height, i = e.content, e = document.createElement("iframe"), t.innerHTML = "", t.appendChild(e), e.src = "''", e.style.width = n, e.style.height = o, e.style.border = "none", e.contentWindow.document.open(), e.contentWindow.document.write(i), e.contentWindow.document.close(), t.style.width = n, t.style.height = o, t.style.display = "block")
                }
                var t, n, o, i
            }, s[r].send((e = d.slots[r].name, (t = d.slotParams[d.slots[r].name] || {}).tz = d.tz, t = {
                x: d.eventApiKey,
                slot: e,
                user: d.userParams,
                context: t
            }, JSON.stringify(t)))
        }(e)
    }

    function r(e) {
        ! function() {
            d.slots = [];
            for (var e = document.querySelectorAll("[data-bsft-slot]"), t = 0; t < e.length; t++) d.slots.push({
                name: e[t].dataset.bsftSlot,
                el: e[t]
            })
        }(), d.slotParams = e || {}, i()
    }

    function h() {
        if (window.XMLHttpRequest) try {
            var t = new XMLHttpRequest
        } catch (e) {
            t = new window.ActiveXObject("Microsoft.XMLHTTP")
        }
        return t
    }

    function p(e, t, n) {
        var o = new Date;
        o.setDate(o.getDate() + n);
        var i = window.location.hostname,
            r = i.split(".");
        4 == r.length && 0 <= r[0] && r[0] <= 255 && 0 <= r[1] && r[1] <= 255 && 0 <= r[2] && r[2] <= 255 && 0 <= r[3] && r[3] <= 255 || (i = "." + i.replace(/^www./, ""));
        i = escape(t) + (null == n ? "" : ";expires=" + o.toUTCString()) + ";path=/;domain=" + i + ";SameSite=Strict;";
        document.cookie = e + "=" + i
    }

    function s(e) {
        var t, n, o = e[0],
            i = function() {
                var t = "";
                try {
                    t = window.top.document.referrer
                } catch (e) {
                    if (window.parent) try {
                        t = window.parent.document.referrer
                    } catch (e) {
                        t = ""
                    }
                }
                return t = "" === t ? document.referrer : t
            }(),
            r = Math.floor(1e6 * Math.random() + 1),
            s = Math.round(new Date / 1e3),
            a = function(e) {
                for (var t, n, o = document.cookie.split(";"), i = 0; i < o.length; i++)
                    if (t = o[i].substr(0, o[i].indexOf("=")), n = o[i].substr(o[i].indexOf("=") + 1), (t = t.replace(/^\s+|\s+$/g, "")) == e) return unescape(n)
            }("_bs");

        function c() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        if ("object" == typeof analytics && "function" == typeof analytics.user && (t = _blueshiftid, "YmU3MGIwNGVkMzUyZDAzYjA5NDc5NmJjNWZjZTdiMDU=" !== (t = btoa(t)) && "MWM2ZGEyNGExOGM1MjQyNTNlZTExNmU0YzUzOTNjZWY=" !== t && (a != (t = analytics.user().anonymousId()) && p("_bs", t, 365), a = t)), null == a && p("_bs", a = c() + c() + "-" + c() + "-" + c() + "-" + c() + "-" + c() + c() + c(), 365), "config" == o && e[1]) return f = e[1], 1;
        if ("identify" == o && (d.userParams = e[1] || {}, d.userParams.cookie = a), "track" == o) o = e[1], e = e[2];
        else {
            if ("retarget" == o) return 1;
            e = e[1]
        }
        for (n in req = u + "?t=" + s + "&e=" + o + "&r=" + encodeURIComponent(i) + "&z=" + r + "&x=" + window._blueshiftid + "&k=" + a + "&u=" + encodeURIComponent(window.location.href), e) v = e[n], "object" == typeof v ? req += "&" + n + "_json=" + encodeURIComponent(JSON.stringify(v)) : req += "&" + n + "=" + encodeURIComponent(v);
        return l ? f.usePOST ? ((e = null == e ? {} : e).t = s, e.e = o, e.r = i, e.z = r, e.x = window._blueshiftid, e.k = a, e.u = window.location.href, function(e, t) {
            try {
                xhr = h(), xhr.open("POST", e, !0), xhr.setRequestHeader("X-Api-Key", d.eventApiKey), xhr.setRequestHeader("Content-Type", "application/json"), xhr.send(JSON.stringify(t))
            } catch (e) {}
        }(u, e)) : function(e) {
            try {
                xhr = h(), xhr.open("GET", e, !0), xhr.setRequestHeader("X-Api-Key", d.eventApiKey), xhr.send(e)
            } catch (e) {}
        }(req) : (a = req, new Image(1, 1).src = a), 1
    }

    function a(e, t) {
        setTimeout(function() {
            c(e)
        }, t)
    }

    function c(e) {
        null != e[0] && (t ? "identify" !== e[0] && "config" !== e[0] ? d.userParams.cookie || 1e3 < new Date - o ? "live" === e[0] ? r(e[1]) : s(e) : a(e, 20) : s(e) : a(e, 20))
    }

    function e() {
        t = !0, o = new Date, d.eventApiKey = _blueshiftid
    }
    if ("object" == typeof blueshift) {
        var y = void 0 === blueshift.slice ? [] : blueshift.slice(0);
        for (blueshift = {
                events: [],
                load: function() {
                    e()
                },
                retarget: function() {
                    c(["retarget"])
                },
                track: function(e, t) {
                    c(["track", e, t])
                },
                pageload: function(e) {
                    c(["pageload", e])
                },
                identify: function(e) {
                    c(["identify", e])
                },
                live: function(e) {
                    c(["live", e])
                }
            }, w = 0; w < y.length; w++) blueshift.events.push(y[w])
    }
    for (var w = 0; w < blueshift.events.length; w++) c(blueshift.events[w]);
    "complete" === document.readyState ? e() : window.addEventListener("load", e, !1)
}();