/**
 *
 * @name:  表格增强插件-独立版本
 * @author: yelog
 * @link: https://github.com/yelog/layui-soul-table
 * @license: MIT
 * @version: v1.6.4
 */
layui.define(["table"], function (exports) {
    var $ = layui.$, table = layui.table, HIDE = "layui-hide", tables = {}, originCols = {}, defaultConfig = {
        fixTotal: !1,
        drag: !0,
        rowDrag: !1,
        autoColumnWidth: !0,
        contextmenu: !1,
        fixResize: !0,
        overflow: !1,
        fixFixedScroll: !0,
        filter: !1
    }, _BODY = $("body"), _DOC = $(document), mod = {
        render: function (e) {
            tables[e.id] = e;
            var t, i, l, a = $.extend({}, defaultConfig, e);
            a.filter && a.filter.cache ? (t = location.pathname + location.hash + e.id, i = this.deepStringify(e.cols), originCols[e.id] || (originCols[e.id] = this.deepClone(e.cols), (l = localStorage.getItem(t)) && i === localStorage.getItem("origin" + t) ? this.updateCols(e, this.deepParse(l)) : (localStorage.setItem("origin" + t, i), localStorage.removeItem(t)))) : this.clearCache(e), this.suspendConfig[e.id] = {
                drag: !1,
                rowDrag: !1
            }, a.fixTotal && this.fixTotal(e), a.drag && this.drag(e, a.drag), a.rowDrag && this.rowDrag(e, a.rowDrag), a.autoColumnWidth && this.autoColumnWidth(e, a.autoColumnWidth), this.contextmenu(e, a.contextmenu), a.fixResize && this.fixResizeRightFixed(e), a.overflow && this.overflow(e, a.overflow), a.fixFixedScroll && this.fixFixedScroll(e)
        }, config: function (e) {
            "object" == typeof e && $.extend(!0, defaultConfig, e)
        }, updateCols: function (a, n) {
            for (var o, r, e = {}, t = [], i = [], l = $(a.elem).next().children(".layui-table-box"), d = l.children(".layui-table-fixed").children(".layui-table-header").children("table"), s = $.merge(l.children(".layui-table-header").children("table"), d), c = l.children(".layui-table-header").children("table"), h = l.children(".layui-table-fixed").children(".layui-table-body").children("table"), f = l.children(".layui-table-body").children("table"), u = $.merge(l.children(".layui-table-body").children("table"), h), p = 0; p < a.cols.length; p++) for (o = 0; o < a.cols[p].length; o++) a.cols[p][o].oldPos = p + "-" + o, e[a.cols[p][o].key] = a.cols[p][o];
            for (p = 0; p < n.length; p++) {
                for (i = [], o = 0; o < n[p].length; o++) {
                    if (r = a.index + "-" + n[p][o].key, n[p][o].width && e[n[p][o].key] !== n[p][o].width && this.getCssRule(a, r, function (e) {
                        e.style.width = (n[p][o].width || 0) + "px"
                    }), e[n[p][o].key].hide !== n[p][o].hide && (s.find('th[data-key="' + r + '"]')[n[p][o].hide ? "addClass" : "removeClass"]("layui-hide"), u.find('td[data-key="' + r + '"]')[n[p][o].hide ? "addClass" : "removeClass"]("layui-hide")), (e[n[p][o].key].oldPos !== p + "-" + o || e[n[p][o].key].fixed !== n[p][o].fixed) && n[p][o].fixed !== e[n[p][o].key].fixed) return a.cols = n, void table.reload(a.id);
                    e[n[p][o].key].fixed = n[p][o].fixed, e[n[p][o].key].width = n[p][o].width, e[n[p][o].key].hide = n[p][o].hide, i.push(e[n[p][o].key])
                }
                t.push(i)
            }

            function y(e, t) {
                for (p = 0; p < n.length; p++) for (o = 0; o < n[p].length; o++) {
                    r = a.index + "-" + n[p][o].key;
                    var i, l = $(e).children(t + ":eq(" + o + ")").attr("data-key");
                    l !== r && ($(e).children(t + ":eq(" + o + ")").before($(e).children(t + '[data-key="' + r + '"]')), n[p][o].fixed && (i = ("th" === t ? d : h).children().children("th" === t ? "tr" : 'tr[data-index="' + $(e).attr("data-index") + '"]')).children(t + '[data-key="' + l + '"]').before(i.children(t + '[data-key="' + r + '"]')))
                }
            }

            c.children().children("tr").each(function () {
                y(this, "th")
            }), f.children().children("tr").each(function () {
                y(this, "td")
            }), a.cols = t, table.resize(a.id)
        }, getCssRule: function (e, i, l) {
            e = e.elem.next().find("style")[0], e = e.sheet || e.styleSheet || {}, e = e.cssRules || e.rules;
            layui.each(e, function (e, t) {
                if (t.selectorText === ".laytable-cell-" + i) return l(t), !0
            })
        }, autoColumnWidth: function (e, n) {
            var t = this;

            function i(c, i) {
                var e = $(i.elem),
                    t = e.next().children(".layui-table-box").children(".layui-table-header").children("table").children("thead").children("tr").children("th"),
                    l = e.next().children(".layui-table-box").children(".layui-table-fixed").children(".layui-table-header").children("table").children("thead").children("tr").children("th"),
                    h = e.next().children(".layui-table-box").children(".layui-table-body").children("table").children("tbody").children("tr"),
                    f = e.next().children(".layui-table-total").find("tr");

                function a(e, t, i) {
                    var l = t.data("key"), a = l.split("-"), n = 3 === a.length ? a[1] + "-" + a[2] : "";
                    if (!(1 < t.attr("colspan") || t.data("unresize")) && i) {
                        var o = t.text().width(t.css("font")) + 21, r = t.css("font");
                        h.children('td[data-key="' + l + '"]').each(function (e, t) {
                            var i = 0;
                            $(this).children().children() && 0 < $(this).children().children().length ? i += $(this).children().html().width(r) : i = $(this).text().width(r), o < i && (o = i)
                        }), 0 < f.length && (t = f.children('td[data-key="' + l + '"]').text().width(r), o < t && (o = t)), o += 32, c.getCssRule(e, l, function (e) {
                            e.style.width = o + "px"
                        });
                        for (var d = 0; d < e.cols.length; d++) for (var s = 0; s < e.cols[d].length; s++) if (e.cols[d][s].key === n) {
                            e.cols[d][s].width = o;
                            break
                        }
                    }
                }

                String.prototype.width = function (e) {
                    var t = e || _BODY.css("font"), e = $("<div>" + this + "</div>").css({
                        position: "absolute",
                        float: "left",
                        "white-space": "nowrap",
                        visibility: "hidden",
                        font: t
                    }).appendTo(_BODY), t = e.width();
                    return e.remove(), t
                }, void 0 !== n && void 0 !== n.dblclick && !n.dblclick || t.add(l).on("dblclick", function (e) {
                    var t = $(this), e = e.clientX - t.offset().left;
                    a(i, t, 0 < t.parents(".layui-table-fixed-r").length ? e <= 10 : t.width() - e <= 10)
                }), n && n.init && t.add(l).each(function (e) {
                    var t = $(this).attr("data-key").split("-");
                    !1 === i.cols[t[1]][t[2]].autoWidth || Array.isArray(n.init) && -1 === n.init.indexOf($(this).attr("data-field")) || a(i, $(this), !0)
                })
            }

            "object" == typeof e ? i(t, e) : "string" == typeof e ? i(t, tables[e]) : void 0 === e && layui.each(tables, function () {
                i(t, this)
            })
        }, drag: function (R, e) {
            var D, t, _, s, O, c, W, F, T, h, z, X, E, Y, B, N;
            1 < R.cols.length || (D = this, t = $(R.elem), _ = t.next().children(".layui-table-box"), s = $.merge(_.children(".layui-table-header").children("table"), _.children(".layui-table-fixed").children(".layui-table-header").children("table")), O = _.children(".layui-table-fixed").children(".layui-table-body").children("table"), c = _.children(".layui-table-body").children("table"), W = $.merge(_.children(".layui-table-body").children("table"), O), F = t.next().children(".layui-table-total").children("table"), T = t.next().children(".layui-table-total").children("table.layui-table-total-fixed"), h = t.next().children(".layui-table-total").children("table:eq(0)"), z = R.id, X = "simple" === e || e && "simple" === e.type, E = e && e.toolbar, B = Y = !1, s.attr("drag") || (s.attr("drag", !0), E && (_.append('<div class="soul-drag-bar"><div data-type="left">左固定</div><div data-type="none">不固定</div><div data-type="right">右固定</div></div>'), (N = _.children(".soul-drag-bar")).children("div").on("mouseenter", function () {
                $(this).addClass("active")
            }).on("mouseleave", function () {
                $(this).removeClass("active")
            })), s.find("th").each(function () {
                var e, d, k, C, w = $(this), S = w.data("field"), I = w.data("key");
                I && (e = I.split("-"), d = R.cols[e[1]][e[2]], k = e[1] + "-" + e[2], C = 0 < w.parents(".layui-table-fixed").length, $(this).find("span:first,.laytable-cell-checkbox").css("cursor", "move").on("mousedown", function (e) {
                    var y, t, b, x, v, m, r, g;
                    D.suspendConfig[z].drag || 0 !== e.button || (e.preventDefault(), y = w.clone().css("visibility", "hidden"), t = w.position().left, b = w.offset().top, x = e.clientX - t, v = w.parents("tr:eq(0)").css("background-color"), m = w.width(), r = $(this), g = d.fixed, B = !0, _DOC.bind("selectstart", function () {
                        return !1
                    }), _BODY.on("mousemove", function (e) {
                        if (B && y) {
                            _.removeClass("no-left-border"), Y || (E && (N.attr("data-type", g || "none"), N.addClass("active")), w.after(y), w.addClass("isDrag").css({
                                position: "absolute",
                                "z-index": 1,
                                "border-left": "1px solid #e6e6e6",
                                "background-color": v,
                                width: m + 1
                            }), X || ((C ? O : W).find('td[data-key="' + I + '"]').each(function () {
                                $(this).after($(this).clone().css("visibility", "hidden").attr("data-clone", "")), $(this).addClass("isDrag").css({
                                    position: "absolute",
                                    "z-index": 1,
                                    "border-left": "1px solid #e6e6e6",
                                    "background-color": $(this).css("background-color"),
                                    width: m + 1
                                })
                            }), 0 < F.length && (C ? T : F).find('td[data-key="' + I + '"]').each(function () {
                                $(this).after($(this).clone().css("visibility", "hidden").attr("data-clone", "")), $(this).addClass("isDrag").css({
                                    position: "absolute",
                                    "z-index": 1,
                                    "background-color": $(this).parents("tr:eq(0)").css("background-color"),
                                    width: m + 1
                                })
                            }))), Y = !0;
                            var t, i, l, a, n, o = e.clientX - x, r = y.prev().prev(), d = 0 < r.length,
                                s = d ? r.data("key").split("-") : [],
                                c = y.next().hasClass("layui-table-patch") ? [] : y.next(), h = 0 < c.length,
                                f = h ? c.data("key").split("-") : [], u = d && y.position().left - o > r.width() / 2,
                                p = h && o - y.position().left > c.width() / 2;
                            if (Math.abs(y.position().left - o), 0 < y.position().left - o ? !d || !!g != !!R.cols[s[1]][s[2]].fixed : !h || !!g != !!R.cols[f[1]][f[2]].fixed) return w.css("left", y.position().left), W.find('td[data-key="' + I + '"][data-clone]').each(function (e) {
                                $(this).prev().css("left", y.position().left)
                            }), 0 < F.length && F.find('td[data-key="' + I + '"][data-clone]').each(function (e) {
                                $(this).prev().css("left", y.position().left)
                            }), void _.addClass("no-left-border");
                            if (w.css("left", o), u) {
                                for (y.after(r), $("#soul-columns" + z + '>li[data-value="' + S + '"]').after($("#soul-columns" + z + '>li[data-value="' + S + '"]').prev()), l = 0; l < R.cols.length; l++) {
                                    for (a = 0; a < R.cols[l].length; a++) if (R.cols[l][a].key === k) {
                                        t = l, i = a;
                                        break
                                    }
                                    if (void 0 !== t && void 0 !== i) break
                                }
                                n = R.cols[t][i - 1], R.cols[t][i - 1] = R.cols[t][i], R.cols[t][i] = n, D.fixTableRemember(R)
                            } else if (p) {
                                for (y.prev().before(c), $("#soul-columns" + z + '>li[data-value="' + S + '"]').before($("#soul-columns" + z + '>li[data-value="' + S + '"]').next()), l = 0; l < R.cols.length; l++) {
                                    for (a = 0; a < R.cols[l].length; a++) if (R.cols[l][a].key === k) {
                                        t = l, i = a;
                                        break
                                    }
                                    if (void 0 !== t && void 0 !== i) break
                                }
                                n = R.cols[t][i + 1], R.cols[t][i + 1] = R.cols[t][i], R.cols[t][i] = n, D.fixTableRemember(R)
                            }
                            W.find('td[data-key="' + I + '"][data-clone]').each(function () {
                                $(this).prev().css("left", o), u ? 0 !== $(this).prev().prev().length && $(this).after($(this).prev().prev()) : p && 0 !== $(this).next().length && $(this).prev().before($(this).next())
                            }), 0 < F.length && F.find('td[data-key="' + I + '"][data-clone]').each(function () {
                                $(this).prev().css("left", o), u ? 0 !== $(this).prev().prev().length && $(this).after($(this).prev().prev()) : p && 0 !== $(this).next().length && $(this).prev().before($(this).next())
                            }), e.clientY - b < -15 ? (0 === $("#column-remove").length && _BODY.append('<i id="column-remove" class="layui-red layui-icon layui-icon-delete"></i>'), $("#column-remove").css({
                                top: e.clientY - $("#column-remove").height() / 2,
                                left: e.clientX - $("#column-remove").width() / 2,
                                "font-size": b - e.clientY + "px"
                            }), $("#column-remove").show()) : $("#column-remove").hide()
                        }
                    }).on("mouseup", function () {
                        if (_DOC.unbind("selectstart"), _BODY.off("mousemove").off("mouseup"), B && y) {
                            if (B = !1, Y) {
                                "checkbox" !== d.type && r.on("click", function (e) {
                                    e.stopPropagation()
                                }), Y = !1, _.removeClass("no-left-border"), w.removeClass("isDrag").css({
                                    position: "relative",
                                    "z-index": "inherit",
                                    left: "inherit",
                                    "border-left": "inherit",
                                    width: "inherit",
                                    "background-color": "inherit"
                                }), w.next().remove();
                                var e, t = w.prev().data("key");
                                if (g && (e = _.children(".layui-table-header").children("table").find('th[data-key="' + I + '"]'), t ? e.parent().children('th[data-key="' + t + '"]').after(e) : "right" === g ? 0 < w.siblings().length && _.children(".layui-table-header").children("table").find('th[data-key="' + w.next().data("key") + '"]').prev().after(e) : (e.parent().prepend('<th class="layui-hide"></th>'), e.parent().children("th:first").after(e), e.parent().children("th:first").remove())), X ? (W.find('td[data-key="' + I + '"]').each(function () {
                                    var e;
                                    t ? $(this).parent().children('td[data-key="' + t + '"]').after($(this)) : "right" === g ? 0 < w.siblings().length && (0 < (e = $(this).parent().children('td[data-key="' + w.next().data("key") + '"]').prev()).length ? e.after($(this)) : ($(this).parent().prepend('<td class="layui-hide"></td>'), $(this).parent().children("td:first").after($(this)), $(this).parent().children("td:first").remove())) : ($(this).parent().prepend('<td class="layui-hide"></td>'), $(this).parent().children("td:first").after($(this)), $(this).parent().children("td:first").remove())
                                }), 0 < F.length && F.find('td[data-key="' + I + '"]').each(function () {
                                    var e;
                                    t ? $(this).parent().children('td[data-key="' + t + '"]').after($(this)) : "right" === g && 0 < (e = $(this).parent().children('td[data-key="' + w.next().data("key") + '"]').prev()).length ? e.after($(this)) : ($(this).parent().prepend('<td class="layui-hide"></td>'), $(this).parent().children("td:first").after($(this)), $(this).parent().children("td:first").remove())
                                })) : C ? (c.find('td[data-key="' + I + '"]').each(function () {
                                    var e;
                                    t ? $(this).parent().children('td[data-key="' + t + '"]').after($(this)) : "right" === g ? 0 < w.siblings().length && (0 < (e = $(this).parent().children('td[data-key="' + w.next().data("key") + '"]').prev()).length ? e.after($(this)) : ($(this).parent().prepend('<td class="layui-hide"></td>'), $(this).parent().children("td:first").after($(this)), $(this).parent().children("td:first").remove())) : ($(this).parent().prepend('<td class="layui-hide"></td>'), $(this).parent().children("td:first").after($(this)), $(this).parent().children("td:first").remove())
                                }), O.find('td[data-key="' + I + '"][data-clone]').each(function () {
                                    $(this).prev().removeClass("isDrag").css({
                                        position: "relative",
                                        "z-index": "inherit",
                                        left: "inherit",
                                        "border-left": "inherit",
                                        width: "inherit",
                                        "background-color": "inherit"
                                    }), $(this).remove()
                                }), 0 < F.length && (h.find('td[data-key="' + I + '"]').each(function () {
                                    var e;
                                    t ? $(this).parent().children('td[data-key="' + t + '"]').after($(this)) : "right" === g && 0 < (e = $(this).parent().children('td[data-key="' + w.next().data("key") + '"]').prev()).length ? e.after($(this)) : ($(this).parent().prepend('<td class="layui-hide"></td>'), $(this).parent().children("td:first").after($(this)), $(this).parent().children("td:first").remove())
                                }), T.find('td[data-key="' + I + '"][data-clone]').each(function () {
                                    $(this).prev().removeClass("isDrag").css({
                                        position: "relative",
                                        "z-index": "inherit",
                                        left: "inherit",
                                        width: "inherit",
                                        "background-color": "inherit"
                                    }), $(this).remove()
                                }))) : (W.find('td[data-key="' + I + '"][data-clone]').each(function () {
                                    $(this).prev().removeClass("isDrag").css({
                                        position: "relative",
                                        "z-index": "inherit",
                                        left: "inherit",
                                        width: "inherit",
                                        "background-color": "inherit"
                                    }), $(this).remove()
                                }), 0 < F.length && F.find('td[data-key="' + I + '"][data-clone]').each(function () {
                                    $(this).prev().removeClass("isDrag").css({
                                        position: "relative",
                                        "z-index": "inherit",
                                        left: "inherit",
                                        width: "inherit",
                                        "background-color": "inherit"
                                    }), $(this).remove()
                                })), y = null, E) {
                                    if (0 < N.children(".active").length && N.children(".active").attr("data-type") !== N.attr("data-type")) {
                                        for (var i, l, a, n = N.children(".active").attr("data-type"), o = 0; o < R.cols.length; o++) for (i = 0; i < R.cols[o].length; i++) "right" === n || "none" === n && "right" === N.attr("data-type") ? void 0 === a && ("right" === R.cols[o][i].fixed ? a = {
                                            x: o,
                                            y: i
                                        } : i === R.cols[o].length - 1 && (a = {
                                            x: o,
                                            y: i + 1
                                        })) : void 0 !== a || R.cols[o][i].fixed && "right" !== R.cols[o][i].fixed || (a = {
                                            x: o,
                                            y: i
                                        }), R.cols[o][i].key === k && (l = {x: o, y: i});
                                        d.fixed = "none" !== n && n, l.y !== a.y && (R.cols[l.x].splice(l.y, 1), l.y < a.y && --a.y, R.cols[a.x].splice(a.y, 0, d), D.fixTableRemember(R)), table.reload(z)
                                    }
                                    N.removeClass("active")
                                }
                            } else r.unbind("click");
                            $("#column-remove").is(":visible") && (s.find("thead>tr>th[data-key=" + I + "]").addClass(HIDE), W.find('tbody>tr>td[data-key="' + I + '"]').addClass(HIDE), F.find('tbody>tr>td[data-key="' + I + '"]').addClass(HIDE), d.hide = !0, D.fixTableRemember(R), $("#soul-columns" + z).find('li[data-value="' + S + '"]>input').prop("checked", !1)), $("#column-remove").hide()
                        }
                    }))
                }))
            })))
        }, rowDrag: function (p, y) {
            var b, e, x = this, v = $(p.elem), m = v.next().children(".layui-table-box"),
                g = m.children(".layui-table-fixed").children(".layui-table-body").children("table"),
                k = m.children(".layui-table-body").children("table"),
                t = $.merge(m.children(".layui-table-body").children("table"), g), C = p.id, w = !1,
                i = y.trigger || "row", S = !1 !== y.numbers, I = null, R = 0,
                l = "row" === i ? t.children("tbody").children("tr") : t.find(i);
            for ("row" !== i && t.find(i).css("cursor", "move"), b = 0; b < p.cols.length; b++) for (e = 0; e < p.cols[b].length; e++) if ("numbers" === p.cols[b][e].type) {
                I = p.index + "-" + b + "-" + e, R = parseInt(k.find('td[data-key="' + I + '"]:first').text());
                break
            }
            l.on("mousedown", function (e) {
                var r, d, s, c, h, f, t, u;
                x.suspendConfig[C].rowDrag || 0 !== e.button || (r = "row" === i ? $(this) : $(this).parents("tr:eq(0)"), d = parseInt(r.data("index")), s = k.children("tbody").children("tr[data-index=" + d + "]"), c = s.clone().css("visibility", "hidden"), h = g.children("tbody").children("tr[data-index=" + d + "]"), f = m.children(".layui-table-body").scrollTop(), t = r.position().top, u = e.clientY - t, _BODY.on("mousemove", function (e) {
                    w || (w = !0, r = (o = v.next().find("style")[0]).sheet || o.styleSheet || {}, x.addCSSRule(r, ".layui-table-view .layui-table td", "cursor: move"), x.addCSSRule(r, ".layui-table tr", "transition: none"), m.addClass("noselect"), s.after(c), s.css({
                        position: "absolute",
                        "z-index": 1
                    }), h.each(function () {
                        $(this).after($(this).clone().css("visibility", "hidden")), $(this).css({
                            position: "absolute",
                            "z-index": 102
                        })
                    }));
                    var t = e.clientY - u + (m.children(".layui-table-body").scrollTop() - f), i = c.position().top,
                        l = s.prev(), a = 0 < l.length, n = c.next(), o = 0 < n.length, r = a && i - t > l.height() / 2,
                        e = o && t - i > n.height() / 2;
                    if (0 < i - t ? !a : !o) return s.css("top", i), void h.each(function () {
                        $(this).css("top", i)
                    });

                    function d(e, t) {
                        t = parseInt(e.data("index")) + t;
                        return e.data("index", t), e.attr("data-index", t), e
                    }

                    s.css("top", t), h.each(function () {
                        $(this).css("top", t)
                    }), r ? (d(s, -1), c.after(d(l, 1)), h.each(function () {
                        d($(this), -1), $(this).next().after(d($(this).prev(), 1))
                    })) : e && (d(s, 1).before(d(n, -1)), h.each(function () {
                        d($(this), 1), $(this).before(d($(this).next().next(), -1))
                    }))
                }).on("mouseup", function (e) {
                    if (_BODY.off("mousemove").off("mouseup"), w) {
                        w = !1, m.removeClass("noselect"), s.css({
                            position: "inherit",
                            "z-index": "inherit"
                        }), s.next().remove(), h.each(function () {
                            $(this).css({position: "inherit", "z-index": "inherit"}), $(this).next().remove()
                        });
                        var t = v.next().find("style")[0], i = t.sheet || t.styleSheet || {}, t = i.cssRules || i.rules;
                        layui.each(t, function (e, t) {
                            ".layui-table-view .layui-table td" === t.selectorText && (t.style.cursor = "default")
                        });
                        var i = r.index(), l = table.cache[C];
                        if (i !== d) if ("function" != typeof y.before || !1 !== y.before.call(p, {
                            row: l[d],
                            newIndex: i,
                            oldIndex: d,
                            cache: l
                        })) {
                            t = l.splice(d, 1)[0];
                            if (l.splice(i, 0, t), I && S) {
                                var a = [i, d].sort();
                                for (b = a[0]; b <= a[1]; b++) {
                                    var n = R + b;
                                    g.find('td[data-key="' + I + '"]:eq(' + b + ")").children().html(n), k.find('td[data-key="' + I + '"]:eq(' + b + ")").children().html(n), l[b][table.config.indexName] = n - 1
                                }
                            }
                            "function" == typeof y.done && y.done.call(p, {row: t, newIndex: i, oldIndex: d, cache: l})
                        } else {
                            function o(e, t) {
                                return e.data("index", t), e.attr("data-index", t), e
                            }

                            if (i < d) {
                                for (b = i; b < d; b++) o(k.find('tr[data-index="' + (b + 1) + '"]'), b), o(g.find('tr[data-index="' + (b + 1) + '"]'), b);
                                o(s, d), k.find('tr[data-index="' + (d - 1) + '"]').after(s), h.each(function () {
                                    o($(this), d), $(this).parent().children('tr[data-index="' + (d - 1) + '"]').after($(this))
                                })
                            } else {
                                for (b = i; d < b; b--) o(k.find('tr[data-index="' + (b - 1) + '"]'), b), o(g.find('tr[data-index="' + (b - 1) + '"]'), b);
                                o(s, d), k.find('tr[data-index="' + (d + 1) + '"]').before(s), h.each(function () {
                                    o($(this), d), $(this).parent().children('tr[data-index="' + (d + 1) + '"]').before($(this))
                                })
                            }
                        }
                    }
                }))
            })
        }, fixTableRemember: function (e, t) {
            if (void 0 === e.filter ? defaultConfig.filter && defaultConfig.filter.cache : e.filter.cache) {
                if (t && t.rule) for (var i = t.rule.selectorText.split("-")[3] + "-" + t.rule.selectorText.split("-")[4], l = 0; l < e.cols.length; l++) for (var a = 0; a < e.cols[l].length; a++) if (e.cols[l][a].key === i) {
                    e.cols[l][a].width = t.rule.style.width.replace("px", "");
                    break
                }
                var n = location.pathname + location.hash + e.id;
                localStorage.setItem(n, this.deepStringify(e.cols))
            }
        }, clearCache: function (e) {
            e && (e = "object" == typeof e ? (void 0 !== e.config ? e.config : e).id : e, localStorage.removeItem(location.pathname + location.hash + e), originCols[e] && this.updateCols(tables[e], this.deepClone(originCols[e])))
        }, overflow: function (e, t) {
            var i = {};
            if ("string" == typeof t) i = {type: t}; else {
                if ("object" != typeof t) return;
                i = t
            }
            var n, o, l = $(e.elem), t = l.next().find(".layui-table-header"), e = l.next().find(".layui-table-body"),
                l = l.next().find(".layui-table-total"), a = i.hoverTime || 0, r = i.color || "white",
                d = i.bgColor || "black", s = i.minWidth || 300, c = i.maxWidth || 300;

            function h(e) {
                clearTimeout(o);
                var t = $(this), i = t.children(".layui-table-cell"), l = i.outerWidth(), a = l < s ? s : c < l ? c : l;
                t.data("off") || (e ? layer.close(n) : i.prop("scrollWidth") > l && (n = layer.tips('<span style="color: ' + r + '">' + $(this).text() + "</span>", this, {
                    tips: [1, d],
                    maxWidth: a,
                    time: 0
                })))
            }

            "tips" === i.type ? (e.off("mouseenter", "td").off("mouseleave", "td").on("mouseenter", "td", function () {
                var e = this;
                o = setTimeout(function () {
                    h.call(e)
                }, a)
            }).on("mouseleave", "td", function () {
                h.call(this, "hide")
            }), i.header && t.off("mouseenter", "th").off("mouseleave", "th").on("mouseenter", "th", function () {
                var e = this;
                o = setTimeout(function () {
                    h.call(e)
                }, a)
            }).on("mouseleave", "th", function () {
                h.call(this, "hide")
            }), i.total && l.off("mouseenter", "td").off("mouseleave", "td").on("mouseenter", "td", function () {
                var e = this;
                o = setTimeout(function () {
                    h.call(e)
                }, a)
            }).on("mouseleave", "td", function () {
                h.call(this, "hide")
            })) : "title" === i.type && (e.off("mouseenter", "td").on("mouseenter", "td", function () {
                var e = $(this), t = e.children(".layui-table-cell");
                e.data("off") || t.prop("scrollWidth") > t.outerWidth() && t.attr("title", $(this).text())
            }), i.header && t.off("mouseenter", "th").on("mouseenter", "th", function () {
                var e = $(this), t = e.children(".layui-table-cell");
                e.data("off") || t.prop("scrollWidth") > t.outerWidth() && t.attr("title", $(this).text())
            }), i.total && l.off("mouseenter", "td").on("mouseenter", "td", function () {
                var e = $(this), t = e.children(".layui-table-cell");
                e.data("off") || t.prop("scrollWidth") > t.outerWidth() && t.attr("title", $(this).text())
            }))
        }, contextmenu: function (h, e) {
            for (var t = $(h.elem), i = t.next().children(".layui-table-box"), l = $.merge(i.children(".layui-table-header").children("table"), i.children(".layui-table-fixed").children(".layui-table-header").children("table")), a = i.children(".layui-table-fixed").children(".layui-table-body").children("table"), a = $.merge(i.children(".layui-table-body").children("table"), a), t = t.next().children(".layui-table-total").children("table"), f = h.id, n = {
                header: {
                    box: l,
                    tag: "th",
                    opts: e ? e.header : "",
                    cols: {}
                },
                body: {box: a, tag: "td", opts: e ? e.body : "", cols: {}, isBody: !0},
                total: {box: t, tag: "td", opts: e ? e.total : "", cols: {}}
            }, o = !1, r = 0; r < h.cols.length; r++) for (var d = 0; d < h.cols[r].length; d++) h.cols[r][d].contextmenu && (o = !0, n.header.cols[h.cols[r][d].key] = h.cols[r][d].contextmenu.header, n.body.cols[h.cols[r][d].key] = h.cols[r][d].contextmenu.body, n.total.cols[h.cols[r][d].key] = h.cols[r][d].contextmenu.total);
            if (e || o) {
                for (var s in n) !function (i) {
                    n[i].box.find(n[i].tag).on("contextmenu", function (e) {
                        $("#soul-table-contextmenu-wrapper").remove(), _BODY.append('<div id="soul-table-contextmenu-wrapper"></div>'), $("#soul-table-contextmenu-wrapper").on("click", function (e) {
                            e.stopPropagation()
                        });
                        var t = n[i].cols[$(this).data("key").substr($(this).data("key").indexOf("-") + 1)];
                        return !1 !== t && (t && 0 < t.length ? (u($("#soul-table-contextmenu-wrapper"), e.pageX, e.pageY, t, $(this), n[i].box, n[i].tag, n[i].isBody), !1) : !1 !== n[i].opts && (n[i].opts && 0 < n[i].opts.length ? (u($("#soul-table-contextmenu-wrapper"), e.pageX, e.pageY, n[i].opts, $(this), n[i].box, n[i].tag, n[i].isBody), !1) : void 0))
                    })
                }(s);
                _BODY.on("click", function () {
                    $("#soul-table-contextmenu-wrapper").remove()
                })
            }

            function u(e, t, i, l, o, r, d, s) {
                var a, n = [];
                for (n.push('<ul class="soul-table-contextmenu">'), a = 0; a < l.length; a++) n.push('<li data-index="' + a + '" class="' + (l[a].children && 0 < l[a].children.length ? "contextmenu-children" : "") + '">'), l[a].icon ? n.push('<i class="prefixIcon ' + l[a].icon + '" />') : n.push('<i class="prefixIcon" />'), n.push(l[a].name), l[a].children && 0 < l[a].children.length && n.push('<i class="endIcon layui-icon layui-icon-right" />'), n.push("</li>");
                n.push("</ul>"), e.append(n.join(""));
                var c = e.children().last();
                for (i + c.outerHeight() > _BODY.prop("scrollHeight") && (i -= c.outerHeight()) < 0 && (i = 0), "left" === e.parent().data("direction") && 0 < e.offset().left - c.outerWidth() ? (t = -c.outerWidth(), c.data("direction", "left")) : t + c.outerWidth() + e.offset().left > _BODY.prop("scrollWidth") && ((t = t - c.outerWidth() - e.outerWidth()) + e.offset().left < 0 && (t = -e.offset().left), c.data("direction", "left")), c.css({
                    top: i + "px",
                    left: t + "px"
                }), a = 0; a < l.length; a++) "function" == typeof l[a].click && function (t) {
                    e.children(".soul-table-contextmenu:last").children('li[data-index="' + t + '"]').on("click", function () {
                        var e = o.parents("tr:eq(0)").data("index"), a = r.find('tr[data-index="' + e + '"]'),
                            n = layui.table.cache[f][e];
                        l[t].click.call(h, {
                            cell: o,
                            elem: "th" === d ? o : s ? r.children("tbody").children('tr[data-index="' + e + '"]').children('[data-key="' + o.data("key") + '"]') : r.find('[data-key="' + o.data("key") + '"]'),
                            trElem: r.children("tbody").children('tr[data-index="' + e + '"]'),
                            text: o.text(),
                            field: o.data("field"),
                            del: s ? function () {
                                table.cache[f][e] = [], a.remove(), table.resize(f)
                            } : "",
                            update: s ? function (e) {
                                e = e || {}, layui.each(e, function (i, e) {
                                    var l, t;
                                    i in n && (t = a.children('td[data-field="' + i + '"]'), n[i] = e, table.eachCols(f, function (e, t) {
                                        t.field == i && t.templet && (l = t.templet)
                                    }), t.children(".layui-table-cell").html(l ? "function" == typeof l ? l(n) : layui.laytpl($(l).html() || e).render(n) : e), t.data("content", e))
                                })
                            } : "",
                            row: s ? n : {}
                        }), $("#soul-table-contextmenu-wrapper").remove()
                    })
                }(a);
                e.children(".soul-table-contextmenu:last").children("li").on("mouseenter", function (e) {
                    e.stopPropagation(), $(this).siblings(".contextmenu-children").children("ul").remove(), $(this).hasClass("contextmenu-children") && u($(this), $(this).outerWidth(), $(this).position().top, l[$(this).data("index")].children, o, r, d, s)
                })
            }
        }, fixTotal: function (e) {
            var t, i = $(e.elem), l = i.next().children(".layui-table-total"), a = i.next().find("style")[0],
                n = a.sheet || a.styleSheet || {};
            0 < l.length && (a = (e = i.next().children(".layui-table-box")).children(".layui-table-fixed-l").children(".layui-table-body").children("table").children("tbody").children("tr:eq(0)").children("td"), e = e.children(".layui-table-fixed-r").children(".layui-table-body").children("table").children("tbody").children("tr:eq(0)").children("td"), t = [], l.children(".layui-table-total-fixed").remove(), 0 < a.length && (this.addCSSRule(n, ".layui-table-total-fixed-l .layui-table-patch", "display: none"), i.next().css("position", "relative"), t.push('<table style="position: absolute;background-color: #fff;left: 0;top: ' + (l.position().top + 1) + 'px" cellspacing="0" cellpadding="0" border="0" class="layui-table layui-table-total-fixed layui-table-total-fixed-l"><tbody><tr>'), a.each(function () {
                $(this).data("key") && t.push(l.children("table:eq(0)").find('[data-key="' + $(this).data("key") + '"]').prop("outerHTML"))
            }), t.push("</tr></tbody></table>"), l.append(t.join(""))), 0 < e.length && (this.addCSSRule(n, ".layui-table-total-fixed-r td:first-child", "border-left:1px solid #e6e6e6"), this.addCSSRule(n, ".layui-table-total-fixed-r td:last-child", "border-left: none"), i.next().css("position", "relative"), (t = []).push('<table style="position: absolute;background-color: #fff;right: 0;top: ' + (l.position().top + 1) + 'px" cellspacing="0" cellpadding="0" border="0" class="layui-table layui-table-total-fixed layui-table-total-fixed-r"><tbody><tr>'), e.each(function () {
                t.push(l.children("table:eq(0)").find('[data-key="' + $(this).data("key") + '"]').prop("outerHTML"))
            }), t.push("</tr></tbody></table>"), l.append(t.join(""))))
        }, fixResizeRightFixed: function (l) {
            var t, a = this,
                e = $(l.elem).next().children(".layui-table-box").children(".layui-table-fixed-r").children(".layui-table-header").children("table"),
                n = {}, o = "layui-table-sort", r = "layui-table-sort-invalid";
            0 < e.length && (e.find("th").off("mousemove").on("mousemove", function (e) {
                var t = $(this), i = t.offset().left, i = e.clientX - i;
                t.data("unresize") || n.resizeStart || (t.width() - i <= 10 && _BODY.css("cursor", "initial"), n.allowResize = i <= 10, _BODY.css("cursor", n.allowResize ? "col-resize" : ""))
            }).off("mousedown").on("mousedown", function (e) {
                var t, i = $(this);
                n.allowResize && (i.find("." + o).removeClass(o).addClass(r), t = i.data("key"), e.preventDefault(), n.resizeStart = !0, n.offset = [e.clientX, e.clientY], a.getCssRule(l, t, function (e) {
                    var t = e.style.width || i.outerWidth();
                    n.rule = e, n.ruleWidth = parseFloat(t), n.othis = i, n.minWidth = i.data("minwidth") || l.cellMinWidth
                }))
            }), _DOC.on("mousemove", function (e) {
                n.resizeStart && (layui.soulTable.fixTableRemember(l, n), e.preventDefault(), n.rule && ((e = n.ruleWidth - e.clientX + n.offset[0]) < n.minWidth && (e = n.minWidth), n.rule.style.width = e + "px"), t = 1)
            }).on("mouseup", function (e) {
                n.resizeStart && setTimeout(function () {
                    n.othis.find("." + r).removeClass(r).addClass(o), _BODY.css("cursor", ""), n = {}, a.scrollPatch(l)
                }, 30), 2 === t && (t = null)
            }))
        }, fixFixedScroll: function (e) {
            var t = $(e.elem), e = t.next().children(".layui-table-box").children(".layui-table-fixed"),
                i = t.next().children(".layui-table-box").children(".layui-table-main");
            e.on("mouseenter", function () {
                $(this).children(".layui-table-body").addClass("soul-fixed-scroll").on("scroll", function () {
                    var e = $(this).scrollTop();
                    i.scrollTop(e)
                })
            }).on("mouseleave", function () {
                $(this).children(".layui-table-body").removeClass("soul-fixed-scroll").off("scroll")
            })
        }, scrollPatch: function (e) {
            var t = $(e.elem), i = t.next().children(".layui-table-box").children(".layui-table-header"),
                l = t.next().children(".layui-table-total"),
                a = t.next().children(".layui-table-box").children(".layui-table-main"),
                n = t.next().children(".layui-table-box").children(".layui-table-fixed"),
                o = t.next().children(".layui-table-box").children(".layui-table-fixed-r"), r = a.children("table"),
                d = a.width() - a.prop("clientWidth"), s = a.height() - a.prop("clientHeight"),
                e = r.outerWidth() - a.width(), t = function (e) {
                    var t;
                    d && s ? (e = e.eq(0)).find(".layui-table-patch")[0] || ((t = $('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>')).find("div").css({width: d}), e.find("tr").append(t)) : e.find(".layui-table-patch").remove()
                };
            t(i), t(l);
            a = a.height() - s;
            n.find(".layui-table-body").css("height", r.height() >= a ? a : "auto"), o[0 < e ? "removeClass" : "addClass"](HIDE), o.css("right", d - 1)
        }, copy: function (e) {
            var t;
            e ? ((t = document.createElement("div")).id = "tempTarget", t.style.opacity = "0", t.innerText = e, document.body.appendChild(t)) : t = document.querySelector("#" + id);
            try {
                var i = document.createRange();
                i.selectNode(t), window.getSelection().removeAllRanges(), window.getSelection().addRange(i), document.execCommand("copy"), window.getSelection().removeAllRanges()
            } catch (e) {
                console.log("复制失败")
            }
            e && t.parentElement.removeChild(t)
        }, addCSSRule: function (e, t, i, l) {
            "insertRule" in e ? e.insertRule(t + "{" + i + "}", l) : "addRule" in e && e.addRule(t, i, l)
        }, deepStringify: function (e) {
            var i = "[[JSON_FUN_PREFIX_", l = "_JSON_FUN_SUFFIX]]";
            return JSON.stringify(e, function (e, t) {
                return "function" == typeof t ? i + t.toString() + l : t
            })
        }, deepParse: function (str) {
            var JSON_SERIALIZE_FIX = {PREFIX: "[[JSON_FUN_PREFIX_", SUFFIX: "_JSON_FUN_SUFFIX]]"};
            return JSON.parse(str, function (key, value) {
                return "string" == typeof value && 0 < value.indexOf(JSON_SERIALIZE_FIX.SUFFIX) && 0 === value.indexOf(JSON_SERIALIZE_FIX.PREFIX) ? eval("(" + value.replace(JSON_SERIALIZE_FIX.PREFIX, "").replace(JSON_SERIALIZE_FIX.SUFFIX, "") + ")") : value
            }) || {}
        }, deepClone: function (e) {
            var t = Array.isArray(e) ? [] : {};
            if (e && "object" == typeof e) for (var i in e) e.hasOwnProperty(i) && (t[i] = e && "object" == typeof e[i] ? this.deepClone(e[i]) : e[i]);
            return t
        }, clearOriginCols: function (e) {
            e ? delete originCols[e] : originCols = {}
        }, suspendConfig: {}, suspend: function (e, t, i) {
            this.suspendConfig[e][t] = i
        }
    };
    exports("soulTable", mod)
});