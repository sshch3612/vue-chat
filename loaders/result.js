webpackJsonp(
  [1],
  {
    CRgB: function(t, e) {},
    G0WA: function(t, e) {},
    "GZu/": function(t, e) {},
    JvLC: function(t, e) {},
    NHnr: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("xd7I"),
        s = {
          name: "HelloWorld",
          data: function() {
            return { msg: "Welcome to Your Vue.js App" };
          },
          methods: {
            showContent: function(t) {}
          },
          beforeCreate: function() {},
          created: function() {},
          beforeMount: function() {},
          mounted: function() {},
          beforeDestroy: function() {},
          destroyed: function() {}
        },
        r = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { staticClass: "hello" }, [
              e("h1", [this._v(this._s(this.msg))]),
              this._v(" "),
              e("h2", { on: { click: this.showContent } }, [
                this._v("Essential Links")
              ])
            ]);
          },
          staticRenderFns: []
        };
      var a = n("C7Lr")(
          s,
          r,
          !1,
          function(t) {
            n("ZCvA");
          },
          "data-v-24662c1e",
          null
        ).exports,
        o = n("DV+v"),
        l = (o.b,
        Number,
        String,
        String,
        String,
        String,
        Boolean,
        Function,
        String,
        Boolean,
        Number,
        String,
        {
          name: "tab",
          mixins: [o.b],
          mounted: function() {
            var t = this;
            this.$nextTick(function() {
              setTimeout(function() {
                t.hasReady = !0;
              }, 0);
            });
          },
          props: {
            lineWidth: { type: Number, default: 3 },
            activeColor: String,
            barActiveColor: String,
            defaultColor: String,
            disabledColor: String,
            animate: { type: Boolean, default: !0 },
            customBarWidth: [Function, String],
            preventDefault: Boolean,
            scrollThreshold: { type: Number, default: 4 },
            barPosition: {
              type: String,
              default: "bottom",
              validator: function(t) {
                return -1 !== ["bottom", "top"].indexOf(t);
              }
            }
          },
          computed: {
            barLeft: function() {
              if (this.hasReady) {
                var t = this.scrollable
                  ? window.innerWidth /
                    this.$children[
                      this.currentIndex || 0
                    ].$el.getBoundingClientRect().width
                  : this.number;
                return this.currentIndex * (100 / t) + "%";
              }
            },
            barRight: function() {
              if (this.hasReady) {
                var t = this.scrollable
                  ? window.innerWidth /
                    this.$children[
                      this.currentIndex || 0
                    ].$el.getBoundingClientRect().width
                  : this.number;
                return (t - this.currentIndex - 1) * (100 / t) + "%";
              }
            },
            innerBarStyle: function() {
              return {
                width:
                  "function" == typeof this.customBarWidth
                    ? this.customBarWidth(this.currentIndex)
                    : this.customBarWidth,
                backgroundColor: this.barActiveColor || this.activeColor
              };
            },
            barStyle: function() {
              var t = {
                left: this.barLeft,
                right: this.barRight,
                display: "block",
                height: this.lineWidth + "px",
                transition: this.hasReady ? null : "none"
              };
              return (
                this.customBarWidth
                  ? (t.backgroundColor = "transparent")
                  : (t.backgroundColor =
                      this.barActiveColor || this.activeColor),
                t
              );
            },
            barClass: function() {
              return {
                "vux-tab-ink-bar-transition-forward":
                  "forward" === this.direction,
                "vux-tab-ink-bar-transition-backward":
                  "backward" === this.direction
              };
            },
            scrollable: function() {
              return this.number > this.scrollThreshold;
            }
          },
          watch: {
            currentIndex: function(t, e) {
              (this.direction = t > e ? "forward" : "backward"),
                this.$emit("on-index-change", t, e),
                this.hasReady && this.scrollToActiveTab();
            }
          },
          data: function() {
            return { direction: "forward", right: "100%", hasReady: !1 };
          },
          methods: {
            scrollToActiveTab: function() {
              var t = this;
              if (this.scrollable && this.$children && this.$children.length) {
                var e = this.$children[this.currentIndex].$el,
                  n = 0;
                window.requestAnimationFrame(function i() {
                  var s = t.$refs.nav;
                  (s.scrollLeft +=
                    (e.offsetLeft -
                      (s.offsetWidth - e.offsetWidth) / 2 -
                      s.scrollLeft) /
                    15),
                    ++n < 15 && window.requestAnimationFrame(i);
                });
              }
            }
          }
        }),
        c = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                staticClass: "vux-tab-wrap",
                class: "top" === t.barPosition ? "vux-tab-bar-top" : ""
              },
              [
                n("div", { staticClass: "vux-tab-container" }, [
                  n(
                    "div",
                    {
                      ref: "nav",
                      staticClass: "vux-tab",
                      class: [
                        { "vux-tab-no-animate": !t.animate },
                        { scrollable: t.scrollable }
                      ]
                    },
                    [
                      t._t("default"),
                      t._v(" "),
                      t.animate
                        ? n(
                            "div",
                            {
                              staticClass: "vux-tab-ink-bar",
                              class: t.barClass,
                              style: t.barStyle
                            },
                            [
                              t.customBarWidth
                                ? n("span", {
                                    staticClass: "vux-tab-bar-inner",
                                    style: t.innerBarStyle
                                  })
                                : t._e()
                            ]
                          )
                        : t._e()
                    ],
                    2
                  )
                ])
              ]
            );
          },
          staticRenderFns: []
        };
      var u = n("C7Lr")(
          l,
          c,
          !1,
          function(t) {
            n("JvLC");
          },
          null,
          null
        ).exports,
        d = (o.a,
        String,
        Boolean,
        String,
        String,
        String,
        {
          name: "tab-item",
          mixins: [o.a],
          props: {
            activeClass: String,
            disabled: Boolean,
            badgeBackground: { type: String, default: "#f74c31" },
            badgeColor: { type: String, default: "#fff" },
            badgeLabel: String
          },
          computed: {
            style: function() {
              return {
                borderWidth: this.$parent.lineWidth + "px",
                borderColor: this.$parent.activeColor,
                color: this.currentSelected
                  ? this.$parent.activeColor
                  : this.disabled
                  ? this.$parent.disabledColor
                  : this.$parent.defaultColor,
                border: this.$parent.animate ? "none" : "auto"
              };
            }
          }
        }),
        h = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                staticClass: "vux-tab-item",
                class: [
                  t.currentSelected ? t.activeClass : "",
                  {
                    "vux-tab-selected": t.currentSelected,
                    "vux-tab-disabled": t.disabled
                  }
                ],
                style: t.style,
                on: { click: t.onItemClick }
              },
              [
                t._t("default"),
                t._v(" "),
                void 0 !== t.badgeLabel && "" !== t.badgeLabel
                  ? n(
                      "span",
                      {
                        staticClass: "vux-tab-item-badge",
                        style: {
                          background: t.badgeBackground,
                          color: t.badgeColor
                        }
                      },
                      [t._v("\n  " + t._s(t.badgeLabel))]
                    )
                  : t._e()
              ],
              2
            );
          },
          staticRenderFns: []
        },
        f = n("C7Lr")(d, h, !1, null, null, null).exports,
        v = {
          name: "bottomTab",
          components: { Tab: u, TabItem: f },
          methods: {
            goCagetory: function(t) {
              this.$router.replace({ path: "/category" });
            },
            goHome: function() {
              this.$router.replace({ path: "/" });
            }
          }
        },
        g = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "Tab",
              {
                staticClass: "tab-bar",
                attrs: { "scroll-threshold": 5, "bar-position": "top" }
              },
              [
                n(
                  "TabItem",
                  {
                    attrs: { selected: "" },
                    on: { "on-item-click": t.goHome }
                  },
                  [t._v("聊天")]
                ),
                t._v(" "),
                n("TabItem", { on: { "on-item-click": t.goCagetory } }, [
                  t._v("分类")
                ]),
                t._v(" "),
                n("TabItem", [t._v("收藏")]),
                t._v(" "),
                n("TabItem", [t._v("厨房故事")]),
                t._v(" "),
                n("TabItem", [t._v("更多")])
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var b = n("C7Lr")(
          v,
          g,
          !1,
          function(t) {
            n("k/DX");
          },
          "data-v-50ad4573",
          null
        ).exports,
        m = {
          name: "App",
          data: function() {
            return { show: !0 };
          },
          components: { HelloWorld: a, BottomTab: b },
          methods: {
            showHide: function() {
              this.show = !this.show;
            }
          }
        },
        p = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e(
              "div",
              { attrs: { id: "app" } },
              [e("router-view"), this._v(" "), e("BottomTab")],
              1
            );
          },
          staticRenderFns: []
        };
      var _ = n("C7Lr")(
          m,
          p,
          !1,
          function(t) {
            n("GZu/");
          },
          "data-v-206a9186",
          null
        ).exports,
        C = n("KGCO"),
        y = {
          render: function() {
            var t = this.$createElement;
            return (this._self._c || t)(
              "span",
              { staticClass: "vux-label-desc" },
              [this._t("default")],
              2
            );
          },
          staticRenderFns: []
        };
      var x = n("C7Lr")(
          { name: "inline-desc" },
          y,
          !1,
          function(t) {
            n("CRgB");
          },
          null,
          null
        ).exports,
        S = n("7+S+"),
        w = n("Dvzy"),
        $ = n("n9nh"),
        k = n("x8E4"),
        T = (Object(w.a)(),
        {
          name: "cell",
          components: { InlineDesc: x },
          props: Object(w.a)(),
          created: function() {
            0;
          },
          beforeMount: function() {
            (this.hasTitleSlot = !!this.$slots.title), this.$slots.value;
          },
          computed: {
            labelStyles: function() {
              return Object($.a)({
                width: Object(k.a)(this, "labelWidth"),
                textAlign: Object(k.a)(this, "labelAlign"),
                marginRight: Object(k.a)(this, "labelMarginRight")
              });
            },
            valueClass: function() {
              return {
                "vux-cell-primary":
                  "content" === this.primary || "left" === this.valueAlign,
                "vux-cell-align-left": "left" === this.valueAlign,
                "vux-cell-arrow-transition": !!this.arrowDirection,
                "vux-cell-arrow-up": "up" === this.arrowDirection,
                "vux-cell-arrow-down": "down" === this.arrowDirection
              };
            },
            labelClass: function() {
              return {
                "vux-cell-justify":
                  "justify" === this.$parent.labelAlign ||
                  "justify" === this.$parent.$parent.labelAlign
              };
            },
            style: function() {
              if (this.alignItems) return { alignItems: this.alignItems };
            }
          },
          methods: {
            onClick: function() {
              !this.disabled && Object(S.a)(this.link, this.$router);
            }
          },
          data: function() {
            return { hasTitleSlot: !0, hasMounted: !1 };
          }
        }),
        L = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                staticClass: "weui-cell",
                class: {
                  "vux-tap-active": t.isLink || !!t.link,
                  "weui-cell_access": t.isLink || !!t.link,
                  "vux-cell-no-border-intent": !t.borderIntent,
                  "vux-cell-disabled": t.disabled
                },
                style: t.style,
                on: { click: t.onClick }
              },
              [
                n("div", { staticClass: "weui-cell__hd" }, [t._t("icon")], 2),
                t._v(" "),
                n(
                  "div",
                  {
                    staticClass: "vux-cell-bd",
                    class: {
                      "vux-cell-primary":
                        "title" === t.primary && "left" !== t.valueAlign
                    }
                  },
                  [
                    n(
                      "p",
                      [
                        t.title || t.hasTitleSlot
                          ? n(
                              "label",
                              {
                                staticClass: "vux-label",
                                class: t.labelClass,
                                style: t.labelStyles
                              },
                              [t._t("title", [t._v(t._s(t.title))])],
                              2
                            )
                          : t._e(),
                        t._v(" "),
                        t._t("after-title")
                      ],
                      2
                    ),
                    t._v(" "),
                    n(
                      "inline-desc",
                      [t._t("inline-desc", [t._v(t._s(t.inlineDesc))])],
                      2
                    )
                  ],
                  1
                ),
                t._v(" "),
                n(
                  "div",
                  { staticClass: "weui-cell__ft", class: t.valueClass },
                  [
                    t._t("value"),
                    t._v(" "),
                    t._t("default", [t._v(t._s(t.value))]),
                    t._v(" "),
                    t.isLoading
                      ? n("i", { staticClass: "weui-loading" })
                      : t._e()
                  ],
                  2
                ),
                t._v(" "),
                t._t("child")
              ],
              2
            );
          },
          staticRenderFns: []
        };
      var B = n("C7Lr")(
          T,
          L,
          !1,
          function(t) {
            n("w+8+");
          },
          null,
          null
        ).exports,
        R = ($.a,
        String,
        String,
        String,
        String,
        String,
        String,
        Number,
        String,
        String,
        {
          name: "group",
          methods: { cleanStyle: $.a },
          props: {
            title: String,
            titleColor: String,
            labelWidth: String,
            labelAlign: String,
            labelMarginRight: String,
            gutter: [String, Number],
            footerTitle: String,
            footerTitleColor: String
          }
        }),
        I = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              [
                t.title
                  ? n("div", {
                      staticClass: "weui-cells__title",
                      style: t.cleanStyle({ color: t.titleColor }),
                      domProps: { innerHTML: t._s(t.title) }
                    })
                  : t._e(),
                t._v(" "),
                t._t("title"),
                t._v(" "),
                n(
                  "div",
                  {
                    staticClass: "weui-cells",
                    class: { "vux-no-group-title": !t.title },
                    style: t.cleanStyle({
                      marginTop:
                        "number" == typeof t.gutter ? t.gutter + "px" : t.gutter
                    })
                  },
                  [t._t("after-title"), t._v(" "), t._t("default")],
                  2
                ),
                t._v(" "),
                t.footerTitle
                  ? n("div", {
                      staticClass: "weui-cells__title vux-group-footer-title",
                      style: t.cleanStyle({ color: t.footerTitleColor }),
                      domProps: { innerHTML: t._s(t.footerTitle) }
                    })
                  : t._e()
              ],
              2
            );
          },
          staticRenderFns: []
        };
      var A = n("C7Lr")(
          R,
          I,
          !1,
          function(t) {
            n("QU0M");
          },
          null,
          null
        ).exports,
        W = { name: "Home", components: { Cell: B, Group: A } },
        F = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e(
              "div",
              { staticClass: "home" },
              [
                e(
                  "Group",
                  [
                    e("Cell", { attrs: { link: "/chat", title: "苏韶春" } }),
                    this._v(" "),
                    e("Cell", { attrs: { title: "title" } })
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var M = n("C7Lr")(
          W,
          F,
          !1,
          function(t) {
            n("G0WA");
          },
          "data-v-ccbbf1b4",
          null
        ).exports,
        E = {
          name: "Chat",
          data: function() {
            return { msg: 123 };
          },
          mounted: function() {},
          sockets: {
            message: function(t) {
              this.$data.msg = t;
            },
            registered: function(t) {}
          },
          methods: {
            sendMsg: function() {
              var t = this.$refs.message.value,
                e = this.$refs.toinput.value;
              this.$socket.emit("message", { to: e, message: t });
            },
            test: function() {
              this.$socket.emit("message", "1111dff");
            },
            registered: function() {
              var t = this.$refs.input.value;
              this.$socket.emit("registered", { userId: t });
            },
            online: function(t) {},
            addgroup: function() {
              var t = this.$refs.input.value;
              this.$socket.emit("addgroup", { groupId: "10001", userId: t });
            },
            sendGroupMsg: function() {
              var t = this.$refs.groupmessage.value;
              this.$socket.emit("groupchat", { groupId: "10001", message: t });
            }
          }
        },
        j = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { staticClass: "home" }, [
              n("div", { staticClass: "registered" }, [
                n("input", {
                  ref: "input",
                  staticClass: "registered-info",
                  attrs: { type: "text" }
                }),
                t._v(" "),
                n(
                  "div",
                  {
                    staticClass: "registered-btn",
                    on: { click: t.registered }
                  },
                  [t._v("用户注册")]
                )
              ]),
              t._v(" "),
              n("div", { staticClass: "entry" }, [
                n("textarea", { ref: "message", staticClass: "message" }),
                t._v(" "),
                n(
                  "button",
                  { staticClass: "entryBtn", on: { click: t.sendMsg } },
                  [t._v("发送")]
                )
              ]),
              t._v(" "),
              n("div", [t._v("\n    " + t._s(t.msg) + "\n  ")]),
              t._v(" "),
              n("div", { staticClass: "registered" }, [
                n("input", {
                  ref: "toinput",
                  staticClass: "registered-info",
                  attrs: { type: "text" }
                }),
                t._v(" "),
                n("div", { staticClass: "registered-btn" }, [t._v("用户接收")])
              ]),
              t._v(" "),
              n("div", { staticClass: "registered" }, [
                n("input", {
                  staticClass: "registered-info",
                  attrs: { type: "text" }
                }),
                t._v(" "),
                n(
                  "div",
                  { staticClass: "registered-btn", on: { click: t.addgroup } },
                  [t._v("加入群组")]
                )
              ]),
              t._v(" "),
              n("div", { staticClass: "entry" }, [
                n("textarea", { ref: "groupmessage", staticClass: "message" }),
                t._v(" "),
                n(
                  "button",
                  { staticClass: "entryBtn", on: { click: t.sendGroupMsg } },
                  [t._v("发送")]
                )
              ])
            ]);
          },
          staticRenderFns: []
        };
      var D = n("C7Lr")(
          E,
          j,
          !1,
          function(t) {
            n("ixg/");
          },
          "data-v-d8f3e996",
          null
        ).exports,
        H = {
          render: function() {
            var t = this.$createElement;
            return (this._self._c || t)("div", { staticClass: "category" }, [
              this._v("\n  类别\n")
            ]);
          },
          staticRenderFns: []
        };
      var G = n("C7Lr")(
        { name: "Category" },
        H,
        !1,
        function(t) {
          n("TBGF");
        },
        "data-v-ed26cf4e",
        null
      ).exports;
      i.a.use(C.default);
      var O = new C.default({
          routes: [
            { path: "/", name: "Home", component: M },
            { path: "/chat", name: "Chat", component: D },
            { path: "/category", name: "Category", component: G },
            { path: "/hello", name: "HelloWorld", component: a }
          ]
        }),
        N = n("Oprb"),
        P = n.n(N);
      n("wb4P");
      (i.a.config.productionTip = !1),
        i.a.use(new P.a({ debug: !0, connection: "http://localhost:7001/" })),
        new i.a({
          el: "#app",
          router: O,
          components: { App: _ },
          template: "<App/>",
          sockets: {
            connect: function(t) {},
            customEmit: function(t) {},
            disconnect: function() {},
            res: function(t) {}
          }
        });
    },
    QU0M: function(t, e) {},
    TBGF: function(t, e) {},
    ZCvA: function(t, e) {},
    "ixg/": function(t, e) {},
    "k/DX": function(t, e) {},
    "w+8+": function(t, e) {},
    wb4P: function(t, e) {}
  },
  ["NHnr"]
);
//# sourceMappingURL=app.0bc7c5ae1b5ed2241a1c.js.map
