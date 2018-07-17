(function () {
    window.NEJ = window.NEJ || {};
    NEJ.O = {};
    NEJ.R = [];
    NEJ.F = function () {
        return !1
    };
    NEJ.P = function (Go7h) {
        if (!Go7h || !Go7h.length) return null;
        var YW3x = window;
        for (var a = Go7h.split('.'), l = a.length, i = a[0] == 'window' ? 1 : 0; i < l; YW3x = YW3x[a[i]] = YW3x[a[i]] || {}, i++);
        return YW3x
    };
    NEJ.Q = function (bJ8B, Go7h) {
        bJ8B = bJ8B || NEJ.O;
        var bs7l = Go7h.split('.');
        for (var i = 0, l = bs7l.length; i < l; i++) {
            bJ8B = bJ8B[bs7l[i]];
            if (!bJ8B) break
        }
        return bJ8B
    };
    NEJ.C = function () {
        var bJZ5e = function () {
            return NEJ.O.toString.call(arguments[0]) != '[object Function]'
        };
        var bEo3x = function (D7w, by7r) {
            for (var x in by7r)
                if (D7w == by7r[x]) return x;
            return null
        };
        var bxp1x = {
                cx8p: 0,
                bk7d: 1,
                bD8v: 2,
                bW8O: 3,
                bL8D: 4,
                fa9R: 5,
                ko1x: 6,
                eF9w: 7
            },
            vW4a = {
                cF8x: 0,
                bm7f: 1,
                bG8y: 2,
                cg8Y: 3,
                bR8J: 4,
                gE0x: 5,
                ls1x: 6,
                gt0x: 7
            };
        return function () {
            var fJ9A = function () {
                this.bEO3x();
                return this.cx8p.apply(this, arguments)
            };
            fJ9A.prototype.bEO3x = NEJ.F;
            fJ9A.prototype.cx8p = NEJ.F;
            fJ9A.N7G = function (AI6C, bKJ5O) {
                if (bJZ5e(AI6C)) return;
                if (bKJ5O == null || !!bKJ5O) NEJ.X(this, AI6C, bJZ5e);
                this.bVm8e = AI6C;
                this.ct8l = AI6C.prototype;
                var bI8A = function () {};
                bI8A.prototype = AI6C.prototype;
                this.prototype = new bI8A;
                var Hy8q = this.prototype;
                Hy8q.constructor = this;
                var ck8c;
                for (var x in bxp1x) {
                    ck8c = bEo3x(bxp1x[x], vW4a);
                    if (!ck8c || !this.ct8l[x]) continue;
                    Hy8q[x] = function (V7O) {
                        return function () {
                            this[V7O].apply(this, arguments)
                        }
                    }(ck8c)
                }
                var Fm7f = {};
                for (var x in vW4a) {
                    ck8c = bEo3x(vW4a[x], bxp1x);
                    if (!ck8c || !this.ct8l[ck8c]) continue;
                    Fm7f[ck8c] = AI6C;
                    Hy8q[x] = function (V7O) {
                        return function () {
                            var o7h,
                                bI8A = this.bxn1x[V7O],
                                VH2x = bI8A.prototype[V7O];
                            this.bxn1x[V7O] = bI8A.bVm8e || AI6C;
                            if (!!VH2x) o7h = VH2x.apply(this, arguments);
                            this.bxn1x[V7O] = AI6C;
                            return o7h
                        }
                    }(ck8c)
                }
                Hy8q.bEO3x = function () {
                    this.bxn1x = NEJ.X({}, Fm7f)
                };
                Hy8q.cIZ7S = Hy8q.cF8x;
                return Hy8q
            };
            return fJ9A
        }
    }();
    NEJ.X = function (gn0x, bP8H, dX9O) {
        if (!gn0x || !bP8H) return gn0x;
        dX9O = dX9O || NEJ.F;
        for (var x in bP8H) {
            if (bP8H.hasOwnProperty(x) && !dX9O(bP8H[x], x)) gn0x[x] = bP8H[x]
        }
        return gn0x
    };
    NEJ.EX = function (gn0x, bP8H) {
        if (!gn0x || !bP8H) return gn0x;
        for (var x in gn0x) {
            if (gn0x.hasOwnProperty(x) && bP8H[x] != null) gn0x[x] = bP8H[x]
        }
        return gn0x
    };
    var Ic8U = Function.prototype;
    Ic8U.eG9x = function (lF1x, xD5I) {
        var f = NEJ.F,
            xD5I = xD5I || f,
            lF1x = lF1x || f,
            dt9k = this;
        return function () {
            var d7e = {
                args: NEJ.R.slice.call(arguments, 0)
            };
            lF1x(d7e);
            if (!d7e.stopped) {
                d7e.value = dt9k.apply(this, d7e.args);
                xD5I(d7e)
            }
            return d7e.value
        }
    };
    Ic8U.g7b = function () {
        var bf7Y = arguments,
            gn0x = arguments[0],
            bxg1x = this;
        return function () {
            var wU5Z = NEJ.R.slice.call(bf7Y, 1);
            NEJ.R.push.apply(wU5Z, arguments);
            return bxg1x.apply(gn0x || window, wU5Z)
        }
    };
    Ic8U.ey9p = function () {
        var bf7Y = arguments,
            gn0x = NEJ.R.shift.call(bf7Y),
            bxg1x = this;
        return function () {
            NEJ.R.push.apply(arguments, bf7Y);
            return bxg1x.apply(gn0x || window, arguments)
        }
    };
    var Ic8U = String.prototype;
    if (!Ic8U.trim) {
        Ic8U.trim = function () {
            var dg9X = /(?:^\s+)|(?:\s+$)/g;
            return function () {
                return this.replace(dg9X, '')
            }
        }()
    }
    if (!window.MWF) window.MWF = NEJ;
    if (!window.mwf) window.mwf = NEJ.P('nej');
    if (!window.console) {
        NEJ.P('console').log = NEJ.F;
        NEJ.P('console').error = NEJ.F
    }
    var lt,
        gt,
        amp,
        nbsp,
        quot,
        apos,
        copy,
        reg
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        O7H = c7f('nej.p'),
        up4t = window.navigator.platform,
        uo4s = window.navigator.userAgent;
    var lt1x = {
        mac: up4t,
        win: up4t,
        linux: up4t,
        ipad: uo4s,
        ipod: uo4s,
        iphone: up4t,
        android: uo4s
    };
    O7H.Id8V = lt1x;
    for (var x in lt1x) lt1x[x] = (new RegExp(x, 'i')).test(lt1x[x]);
    lt1x.ios = lt1x.ipad || lt1x.iphone || lt1x.ipod;
    lt1x.tablet = lt1x.ipad;
    lt1x.desktop = lt1x.mac || lt1x.win || lt1x.linux && !lt1x.android;
    var iz0x = {
        engine: 'unknow',
        release: 'unknow',
        browser: 'unknow',
        version: 'unknow',
        prefix: {
            css: '',
            pro: '',
            clz: ''
        }
    };
    O7H.dr9i = iz0x;
    if (/msie\s+(.*?);/i.test(uo4s) || /trident\/.+rv:([\d\.]+)/i.test(uo4s)) {
        iz0x.engine = 'trident';
        iz0x.browser = 'ie';
        iz0x.version = RegExp.$1;
        iz0x.prefix = {
            css: 'ms',
            pro: 'ms',
            clz: 'MS',
            evt: 'MS'
        };
        var mn1x = {
            6: '2.0',
            7: '3.0',
            8: '4.0',
            9: '5.0',
            10: '6.0',
            11: '7.0'
        };
        iz0x.release = mn1x[document.documentMode] || mn1x[parseInt(iz0x.version)]
    } else if (/webkit\/?([\d.]+?)(?=\s|$)/i.test(uo4s)) {
        iz0x.engine = 'webkit';
        iz0x.release = RegExp.$1 || '';
        iz0x.prefix = {
            css: 'webkit',
            pro: 'webkit',
            clz: 'WebKit'
        }
    } else if (/rv\:(.*?)\)\s+gecko\//i.test(uo4s)) {
        iz0x.engine = 'gecko';
        iz0x.release = RegExp.$1 || '';
        iz0x.browser = 'firefox';
        iz0x.prefix = {
            css: 'Moz',
            pro: 'moz',
            clz: 'Moz'
        };
        if (/firefox\/(.*?)(?=\s|$)/i.test(uo4s)) iz0x.version = RegExp.$1 || ''
    } else if (/presto\/(.*?)\s/i.test(uo4s)) {
        iz0x.engine = 'presto';
        iz0x.release = RegExp.$1 || '';
        iz0x.browser = 'opera';
        iz0x.prefix = {
            css: 'O',
            pro: 'o',
            clz: 'O'
        };
        if (/version\/(.*?)(?=\s|$)/i.test(uo4s)) iz0x.version = RegExp.$1 || ''
    }
    if (iz0x.browser == 'unknow') {
        var mn1x = [
            'chrome',
            'maxthon',
            'safari'
        ];
        for (var i = 0, l = mn1x.length, V7O; i < l; i++) {
            V7O = mn1x[i] == 'safari' ? 'version' : mn1x[i];
            if ((new RegExp(V7O + '/(.*?)(?=\\s|$)', 'i')).test(uo4s)) {
                iz0x.browser = mn1x[i];
                iz0x.version = RegExp.$1.trim();
                break
            }
        }
    }
    O7H.bNc5h = {};
    var beK5P = iz0x.engine != 'trident';
    O7H.nu2x = {
        gecko: iz0x.engine != 'gecko',
        webkit: iz0x.engine != 'webkit',
        presto: iz0x.engine != 'presto',
        trident0: beK5P || iz0x.release > '2.0',
        trident1: beK5P || iz0x.release < '6.0',
        trident2: beK5P || iz0x.release > '3.0',
        trident: beK5P || iz0x.release >= '6.0'
    }
})();
(function () {
    var iC0x = NEJ.P('nej.c'),
        R7K = {};
    var bxc1x = function () {
        var dg9X = /^([\w]+?:\/\/.*?(?=\/|$))/i;
        return function (Y7R) {
            Y7R = Y7R || '';
            if (dg9X.test(Y7R)) return RegExp.$1;
            return location.protocol + '//' + location.host
        }
    }();
    var Qu0x = function () {
        var bPy6s = function (i7b, by7r) {
            if (!i7b || !i7b.length) return;
            for (var i = 0, l = i7b.length, jT1x; i < l; i++) {
                jT1x = i7b[i];
                if (jT1x.indexOf('://') > 0) by7r[bxc1x(jT1x)] = jT1x
            }
        };
        var bg7Z = {
            portrait: {
                name: 'portrait',
                dft: 'portrait/'
            },
            'ajax.swf': {
                name: 'ajax',
                dft: 'nej_proxy_flash.swf'
            },
            'chart.swf': {
                name: 'chart',
                dft: 'nej_flex_chart.swf'
            },
            'audio.swf': {
                name: 'audio',
                dft: 'nej_player_audio.swf'
            },
            'video.swf': {
                name: 'video',
                dft: 'nej_player_video.swf'
            },
            'clipboard.swf': {
                name: 'clipboard',
                dft: 'nej_clipboard.swf'
            }
        };
        return function (bP8H) {
            iC0x.Ih8Z('root', bP8H.root || '/res/');
            var bwP1x,
                fV0x = iC0x.B7u('root');
            for (var x in bg7Z) {
                bwP1x = bg7Z[x];
                iC0x.Ih8Z(x, bP8H[bwP1x.name] || fV0x + bwP1x.dft)
            }
            var CX6R = bP8H.p_csrf;
            if (CX6R == !0) {
                CX6R = {
                    cookie: 'AntiCSRF',
                    param: 'AntiCSRF'
                }
            }
            iC0x.Ih8Z('csrf', NEJ.EX({
                cookie: '',
                param: ''
            }, CX6R));
            R7K.frames = {};
            bPy6s(bP8H.p_frame, R7K.frames);
            R7K.flashs = {};
            bPy6s(bP8H.p_flash, R7K.flashs)
        }
    }();
    iC0x.Ih8Z = function (J7C, D7w) {
        R7K[J7C] = D7w
    };
    iC0x.B7u = function (J7C) {
        return R7K[J7C]
    };
    iC0x.bVn8f = function (Y7R) {
        var tN4R = bxc1x(Y7R);
        return R7K.frames[tN4R] || tN4R + '/res/nej_proxy_frame.html'
    };
    iC0x.bVo8g = function (Y7R) {
        return R7K.flashs[bxc1x(Y7R)]
    };
    Qu0x(window.NEJ_CONF || NEJ.O)
})();
(function () {
    var c7f = NEJ.P,
        O7H = c7f('nej.p'),
        iC0x = c7f('nej.c'),
        bP8H = window.NEJ_CONF || NEJ.O;
    if (O7H.nu2x.trident) return;
    iC0x.Ih8Z('storage.swf', bP8H.storage || iC0x.B7u('root') + 'nej_storage.swf');
    if (O7H.dr9i.release < '4.0') {
        iC0x.Ih8Z('blank.png', bP8H.blank || iC0x.B7u('root') + 'nej_blank.gif')
    }
    var i7b = bP8H.xdr,
        gK0x = /^(https?:\/\/.*?)(?=\/|$)/i,
        km1x = /[\/?=&]/i;
    var bKn5s = function (Y7R) {
        return (gK0x.test(Y7R) ? RegExp.$1 : '').toLowerCase()
    };
    if (!!i7b && !!i7b.length)
        for (var i = i7b.length - 1, Y7R, J7C; i >= 0; i--) {
            Y7R = i7b[i];
            J7C = bKn5s(Y7R);
            if (!!J7C) iC0x.Ih8Z(J7C, Y7R)
        }
    iC0x.cIU7N = function (Y7R) {
        var J7C = bKn5s(Y7R);
        if (!J7C) {
            if (km1x.test(Y7R)) {
                J7C = location.protocol + '//' + location.host
            } else if (Y7R.indexOf('://') < 0) {
                J7C = location.protocol + '//' + Y7R
            } else {
                J7C = Y7R
            }
        }
        return iC0x.B7u(J7C) || J7C + '/res/nej_xdomain.html'
    }
})();
(function () {
    var c7f = NEJ.P,
        iC0x = c7f('nej.c'),
        O7H = c7f('nej.g'),
        gI0x = +(new Date);
    O7H.cIT7M = 10000 - gI0x;
    O7H.bwB1x = 10001 - gI0x;
    O7H.cIR7K = 10002 - gI0x;
    O7H.bSX8P = 10003 - gI0x;
    O7H.bVt8l = 10004 - gI0x;
    O7H.cIP7I = 10005 - gI0x;
    O7H.bwn1x = 10006 - gI0x;
    O7H.bVx8p = 10007 - gI0x;
    O7H.zI5N = 'Content-Type';
    O7H.cIL7E = 'text/plain';
    O7H.Ff7Y = 'multipart/form-data';
    O7H.bVC8u = 'application/x-www-form-urlencoded';
    O7H.bwc1x = iC0x.B7u('blank.png') || 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
})();
(function () {
    var c7f = NEJ.P,
        fA9r = NEJ.R,
        O7H = c7f('nej.p'),
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        be7X = c7f('nej.h');
    var ke1x = O7H.dr9i.prefix,
        bPR6L = O7H.bNc5h,
        bVE8w = {
            scale: 'scale({x|1},{y|1})',
            rotate: 'rotate({a})',
            translate: 'translate({x},{y})'
        },
        bVL8D = {
            scale: 'scale3d({x|1},{y|1},{z|1})',
            rotate: 'rotate3d({x},{y},{z},{a})',
            translate: 'translate3d({x},{y},{z})'
        },
        PP0x = {
            transition: !0,
            transform: !0,
            animation: !0,
            keyframes: !0,
            box: !0,
            'box-pack': !0,
            'box-flex': !0,
            marquee: !0,
            'border-radius': !0,
            'user-select': !0
        };
    var Qu0x = function () {
        var tn3x = be7X.bCc3x();
        bPR6L.css3d = !!tn3x && tn3x.m41 != null;
        var dg9X = /-([a-z])/g;
        for (var x in PP0x) {
            PP0x[bCm3x(x)] = PP0x[x]
        }
    };
    var bCm3x = function () {
        var dg9X = /-([a-z])/g;
        return function (V7O) {
            V7O = V7O || '';
            return V7O.replace(dg9X, function ($1, $2) {
                return $2.toUpperCase()
            })
        }
    }();
    var bCs3x = function (V7O) {
        return (!bPR6L.css3d ? bVE8w : bVL8D)[V7O]
    };
    var bCO3x = function () {
        var dg9X = /\s+/;
        return function (fJ9A) {
            fJ9A = (fJ9A || '').trim();
            return !!fJ9A ? fJ9A.split(dg9X) : null
        }
    }();
    var ben4r = function (F7y, u7n, fJ9A) {
        F7y = a6g.B7u(F7y);
        if (!F7y) return;
        k7d.bd7W(bCO3x(fJ9A), function (dZ9Q) {
            F7y.classList[u7n](dZ9Q)
        })
    };
    be7X.Im8e = function (i7b) {
        return fA9r.slice.call(i7b, 0)
    };
    be7X.bvI1x = function (F7y) {
        return be7X.Im8e(F7y.children)
    };
    be7X.bvF1x = function (F7y, fJ9A) {
        return be7X.Im8e(F7y.getElementsByClassName(fJ9A))
    };
    be7X.bvC1x = function (F7y, Ip8h) {
        ben4r(F7y, 'add', Ip8h)
    };
    be7X.bvx1x = function (F7y, Iq8i) {
        ben4r(F7y, 'remove', Iq8i)
    };
    be7X.Sk1x = function (F7y, Iq8i, Ip8h) {
        ben4r(F7y, 'remove', Iq8i);
        ben4r(F7y, 'add', Ip8h)
    };
    be7X.bvr1x = function (F7y, fJ9A) {
        F7y = a6g.B7u(F7y);
        if (!F7y) return !1;
        var i7b = F7y.classList;
        if (!i7b || !i7b.length) return !1;
        return k7d.dj9a(bCO3x(fJ9A), function (dZ9Q) {
            return i7b.contains(dZ9Q)
        }) >= 0
    };
    be7X.bvn1x = function (F7y, dZ9Q) {};
    be7X.bvm1x = function (F7y) {};
    be7X.bvl1x = function (gh0x, nM2x) {
        gh0x.selectionEnd = nM2x.end || 0;
        gh0x.selectionStart = nM2x.start || 0;
        gh0x.focus()
    };
    be7X.bvk1x = function (gh0x) {
        return {
            end: gh0x.selectionEnd,
            start: gh0x.selectionStart
        }
    };
    be7X.bvj1x = function () {
        var EC7v = function (dZ9Q, d7e) {
            var F7y = h7a.W7P(d7e);
            if (!F7y.value) a6g.x7q(F7y, dZ9Q)
        };
        var Ir8j = function (dZ9Q, d7e) {
            a6g.y7r(h7a.W7P(d7e), dZ9Q)
        };
        return function (F7y, fg9X, dZ9Q) {
            if (fg9X == 1) {
                h7a.s7l(F7y, 'blur', EC7v.g7b(null, dZ9Q))
            }
            if (fg9X == 1 || fg9X == -1) {
                h7a.s7l(F7y, 'focus', Ir8j.g7b(null, dZ9Q))
            }
        }
    }();
    be7X.bve1x = function (G7z) {
        return (new XMLSerializer).serializeToString(G7z) || ''
    };
    be7X.bvd1x = function (BQ6K) {
        var fV0x = (new DOMParser).parseFromString(BQ6K, 'text/xml').documentElement;
        return fV0x.nodeName == 'parsererror' ? null : fV0x
    };
    be7X.buX1x = function (F7y) {};
    be7X.nS2x = function (F7y) {
        return null
    };
    be7X.buT1x = function (F7y) {
        return null
    };
    be7X.buQ1x = function (dO9F) {};
    be7X.buE1x = function () {
        var bf7Y = be7X.Im8e(arguments);
        bf7Y[0] = a6g.B7u(bf7Y[0]);
        if (!bf7Y[0]) return null;
        bf7Y[1] = (bf7Y[1] || '').toLowerCase();
        if (!bf7Y[1]) return null;
        return bf7Y
    };
    be7X.AW6Q = function () {
        var wQ5V = {
                touchstart: 'mousedown',
                touchmove: 'mousemove',
                touchend: 'mouseup'
            },
            jz1x = {
                transitionend: 'TransitionEnd',
                animationend: 'AnimationEnd',
                animationstart: 'AnimationStart',
                animationiteration: 'AnimationIteration'
            };
        var bVM8E = function (u7n) {
            return (ke1x.evt || ke1x.pro) + u7n
        };
        return function () {
            var bf7Y = be7X.buE1x.apply(be7X, arguments);
            if (!bf7Y) return;
            var bdY4c = jz1x[bf7Y[1]],
                bdW4a = wQ5V[bf7Y[1]];
            if (!!bdY4c) {
                bf7Y[4] = bf7Y[1];
                bf7Y[1] = bVM8E(bdY4c)
            } else if (!!bdW4a) {
                var V7O = 'on' + bf7Y[1];
                if (!(V7O in bf7Y[0])) {
                    bf7Y[4] = bf7Y[1];
                    bf7Y[1] = bdW4a
                }
            }
            return bf7Y
        }
    }();
    be7X.buq1x = function () {
        var bf7Y = arguments;
        bf7Y[0].addEventListener(bf7Y[1], bf7Y[2], !!bf7Y[3])
    };
    be7X.bdU4Y = function () {
        var bf7Y = arguments;
        bf7Y[0].removeEventListener(bf7Y[1], bf7Y[2], !!bf7Y[3])
    };
    be7X.bub1x = function (F7y, u7n, e7d) {
        var d7e = document.createEvent('Event');
        d7e.initEvent(u7n, !0, !0);
        NEJ.X(d7e, e7d);
        F7y.dispatchEvent(d7e)
    };
    be7X.bCc3x = function () {
        var gK0x = /\((.*?)\)/,
            km1x = /\s*,\s*/,
            i7b = [
                'm11',
                'm12',
                'm21',
                'm22',
                'm41',
                'm42'
            ];
        var bdQ4U = function (tn3x) {
            var ik0x = {};
            if (gK0x.test(tn3x || '')) {
                k7d.bd7W(RegExp.$1.split(km1x), function (D7w, r7k) {
                    ik0x[i7b[r7k]] = D7w || ''
                })
            }
            return ik0x
        };
        return function (tn3x) {
            if (!!window.CSSMatrix) return new CSSMatrix(tn3x);
            var V7O = ke1x.clz + 'CSSMatrix';
            if (!!window[V7O]) return new window[V7O](tn3x || '');
            return bdQ4U(tn3x)
        }
    }();
    be7X.bGm4q = function () {
        var dg9X = /\{(.*?)\}/g;
        return function (V7O, by7r) {
            by7r = by7r || o;
            var pi2x = bCs3x(V7O);
            return !pi2x ? '' : pi2x.replace(dg9X, function ($1, $2) {
                var bs7l = $2.split('|');
                return by7r[bs7l[0]] || bs7l[1] || '0'
            })
        }
    }();
    be7X.btS1x = function (F7y, V7O, D7w) {
        F7y.style[be7X.bJN4R(V7O)] = D7w
    };
    be7X.bJN4R = function () {
        var dg9X = /^[a-z]/,
            btO1x = ke1x.css;
        var bVN8F = function (V7O) {
            return V7O.replace(dg9X, function ($1) {
                return btO1x + $1.toUpperCase()
            })
        };
        return function (V7O) {
            V7O = bCm3x(V7O);
            var bVT8L = be7X.bWb8T(V7O, PP0x);
            return bVT8L ? bVN8F(V7O) : V7O
        }
    }();
    be7X.bWb8T = function () {
        var dg9X = /^([a-z]+?)[A-Z]/;
        return function (V7O, by7r) {
            if (!by7r[V7O]) {
                if (dg9X.test(V7O)) V7O = RegExp.$1
            }
            return !!by7r[V7O]
        }
    }();
    be7X.bWc8U = function () {
        var dg9X = /\$<(.*?)>/gi,
            btO1x = '-' + ke1x.css.toLowerCase() + '-';
        return function (ku1x) {
            return ku1x.replace(dg9X, function ($1, $2) {
                var eQ9H = $2,
                    bs7l = eQ9H.split('|'),
                    pi2x = bCs3x(bs7l[0]);
                if (!!pi2x) {
                    return be7X.bGm4q(bs7l[0], k7d.hu0x(bs7l[1]))
                }
                return !be7X.bWf8X(eQ9H, PP0x) ? eQ9H : btO1x + eQ9H
            })
        }
    }();
    be7X.bWf8X = function (V7O, by7r) {
        return !!by7r[V7O]
    };
    be7X.btD1x = function (ci8a, ku1x) {
        ci8a.textContent = ku1x
    };
    be7X.btB1x = function (ci8a, ku1x) {
        var zS6M = ci8a.sheet,
            bq7j = zS6M.cssRules.length;
        zS6M.insertRule(ku1x, bq7j);
        return zS6M.cssRules[bq7j]
    };
    be7X.cIy7r = function (F7y, e7d) {};
    be7X.bdJ4N = function (bdH4L) {
        return (bdH4L || '').toLowerCase() != 'transparent'
    };
    be7X.bWS8K = function (F7y) {};
    be7X.btt1x = function (F7y, V7O) {
        if (!!F7y.getAttribute) return F7y.getAttribute(V7O);
        return ''
    };
    be7X.bdF4J = function (eN9E) {
        a6g.cJ8B(eN9E)
    };
    Qu0x()
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        O7H = c7f('nej.p'),
        be7X = c7f('nej.h');
    if (O7H.nu2x.trident0) return;
    var gI0x = +(new Date);
    R7K = {};
    be7X.bvn1x = be7X.bvn1x.eG9x(function (d7e) {
        d7e.stopped = !0;
        var bf7Y = d7e.args,
            C7v = a6g.lM1x(bf7Y[0]),
            J7C = 'hover-' + C7v;
        if (!C7v || !!R7K[J7C]) return;
        R7K[J7C] = !0;
        h7a.s7l(C7v, 'mouseenter', a6g.y7r.g7b(a6g, C7v, bf7Y[1]));
        h7a.s7l(C7v, 'mouseleave', a6g.x7q.g7b(a6g, C7v, bf7Y[1]))
    });
    be7X.bvm1x = function () {
        var cIw7p = function () {};
        return be7X.bvm1x.eG9x(function (d7e) {
            d7e.stopped = !0;
            var F7y = d7e.args[0],
                C7v = 'fixed-' + a6g.lM1x(F7y);
            if (!!R7K[C7v]) return;
            var bg7Z = {};
            R7K[C7v] = bg7Z
        })
    }();
    be7X.buX1x = be7X.buX1x.eG9x(function (d7e) {
        d7e.stopped = !0;
        var F7y = d7e.args[0],
            ci8a = F7y.style,
            bFI3x = a6g.ow2x();
        ci8a.width = bFI3x.scrollWidth + 'px';
        ci8a.height = bFI3x.scrollHeight + 'px'
    });
    be7X.nS2x = be7X.nS2x.eG9x(function (d7e) {
        d7e.stopped = !0;
        var F7y = d7e.args[0],
            lf1x = R7K[F7y.msk];
        if (!lf1x) {
            F7y.msk = gI0x++;
            lf1x = a6g.dh9Y('iframe');
            lf1x.style.position = 'absolute';
            R7K[F7y.msk] = lf1x
        }
        d7e.value = lf1x;
        var ci8a = lf1x.style;
        ci8a.top = (parseInt(a6g.de9V(F7y, 'top')) || 0) + 'px';
        ci8a.left = (parseInt(a6g.de9V(F7y, 'left')) || 0) + 'px';
        ci8a.width = F7y.offsetWidth + 'px';
        ci8a.height = F7y.offsetHeight + 'px';
        F7y.insertAdjacentElement('beforeBegin', lf1x)
    });
    be7X.buT1x = be7X.buT1x.eG9x(function (d7e) {
        d7e.stopped = !0;
        var lf1x = R7K[d7e.args[0].msk];
        if (!!lf1x) a6g.mT2x(lf1x)
    })
})();
(function () {
    var c7f = NEJ.P,
        O7H = c7f('nej.p'),
        a6g = c7f('nej.e'),
        be7X = c7f('nej.h');
    if (O7H.nu2x.trident1) return;
    be7X.AW6Q = function () {
        var wQ5V = {
            touchcancel: 'MSPointerCancel',
            touchstart: 'MSPointerDown',
            touchmove: 'MSPointerMove',
            touchend: 'MSPointerUp'
        };
        return be7X.AW6Q.eG9x(function (d7e) {
            var bf7Y = be7X.buE1x.apply(be7X, d7e.args);
            if (!bf7Y) {
                d7e.stopped = !0;
                return
            }
            var u7n = wQ5V[bf7Y[1]];
            if (!!u7n && ('on' + u7n).toLowerCase() in bf7Y[0]) {
                bf7Y[4] = bf7Y[1];
                bf7Y[1] = u7n;
                d7e.stopped = !0;
                d7e.value = bf7Y
            }
        })
    }();
    be7X.bdJ4N = function (bdH4L) {
        return !0
    };
    be7X.bdF4J = be7X.bdF4J.eG9x(function (d7e) {
        d7e.stopped = !0;
        var eN9E = d7e.args[0];
        a6g.ba7T(eN9E, 'display', 'none');
        try {
            eN9E.contentWindow.document.body.innerHTML = '&nbsp;'
        } catch (ex) {}
    })
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        O7H = c7f('nej.p'),
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        be7X = c7f('nej.h'),
        btq1x = {};
    if (O7H.nu2x.trident) return;
    be7X.Im8e = be7X.Im8e.eG9x(function (d7e) {
        d7e.stopped = !0;
        var i7b = d7e.args[0];
        if (!i7b) {
            d7e.value = null;
            return
        }
        var r7k = 0,
            o7h = [];
        while (!!i7b[r7k]) {
            o7h.push(i7b[r7k++])
        }
        d7e.value = o7h
    });
    be7X.bvI1x = be7X.bvI1x.eG9x(function (d7e) {
        d7e.stopped = !0;
        var bs7l = [];
        k7d.bd7W(d7e.args[0].childNodes, function (f7c) {
            if (f7c.nodeType == 1) bs7l.push(f7c)
        });
        d7e.value = bs7l
    });
    be7X.bvF1x = be7X.bvF1x.eG9x(function (d7e) {
        var F7y = d7e.args[0];
        if (!!F7y.getElementsByClassName) return;
        d7e.stopped = !0;
        var o7h = [],
            NI0x = new RegExp('(\\s|^)(?:' + d7e.args[1].replace(/\s+/g, '|') + ')(?=\\s|$)');
        k7d.bd7W(F7y.getElementsByTagName('*'), function (f7c) {
            if (NI0x.test(f7c.className)) o7h.push(f7c)
        });
        d7e.value = o7h
    });
    be7X.bvl1x = be7X.bvl1x.eG9x(function (d7e) {
        var gh0x = d7e.args[0],
            nM2x = d7e.args[1];
        if (gh0x.selectionStart == null) {
            d7e.stopped = !0;
            var db9S = gh0x.createTextRange();
            db9S.collapse(!0);
            db9S.moveStart('character', nM2x.start);
            db9S.moveEnd('character', nM2x.end - nM2x.start);
            db9S.select();
            gh0x.focus()
        }
    });
    be7X.bvk1x = be7X.bvk1x.eG9x(function (d7e) {
        var gh0x = d7e.args[0];
        gh0x.focus();
        if (gh0x.selectionStart == null) {
            d7e.stopped = !0;
            var bNC5H = document.selection.createRange();
            var bPa6U = gh0x.createTextRange();
            bPa6U.moveToBookmark(bNC5H.getBookmark());
            var bto1x = gh0x.createTextRange();
            bto1x.collapse(!0);
            bto1x.setEndPoint('EndToStart', bPa6U);
            var hD0x = bto1x.text.length;
            d7e.value = {
                start: hD0x,
                end: hD0x + bNC5H.text.length
            }
        }
    });
    be7X.bve1x = be7X.bve1x.eG9x(function (d7e) {
        if (!!window.XMLSerializer) return;
        d7e.stopped = !0;
        var F7y = d7e.args[0];
        d7e.value = F7y.xml != null ? F7y.xml : F7y.outHTML
    });
    be7X.bvd1x = function () {
        var NK0x = [
            'Msxml2.DOMDocument.6.0',
            'Msxml2.DOMDocument.3.0'
        ];
        var bXf8X = function () {
            try {
                for (var i = 0, l = NK0x.length; i < l; i++) return new ActiveXObject(NK0x[i])
            } catch (ex) {
                return null
            }
        };
        return be7X.bvd1x.eG9x(function (d7e) {
            if (!!window.DOMParser) return;
            d7e.stopped = !0;
            var nK2x = bXf8X();
            if (!!nK2x && nK2x.loadXML(d7e.args[0]) && !nK2x.parseError.errorCode) d7e.value = nK2x.documentElement
        })
    }();
    be7X.AW6Q = function () {
        var jz1x = {
            input: 'propertychange',
            load: 'readystatechange'
        };
        for (var x in jz1x) btq1x[jz1x[x]] = !0;
        var bXk9b = function (F7y, u7n) {
            if ('on' + u7n in F7y) return null;
            return jz1x[u7n] || ''
        };
        var bXm9d = function (u7n, dt9k) {
            var cN8F = dt9k;
            switch (u7n) {
            case 'readystatechange':
                cN8F = function (d7e) {
                    var F7y = h7a.W7P(d7e) || this;
                    if (F7y.readyState == 'loaded' || F7y.readyState == 'complete') {
                        d7e.target = F7y;
                        dt9k.call(F7y, d7e)
                    }
                };
                break;
            case 'propertychange':
                cN8F = function (d7e) {
                    var F7y = h7a.W7P(d7e) || this;
                    if ('value' in F7y && d7e.propertyName == 'value') {
                        d7e.target = F7y;
                        dt9k.call(F7y, d7e)
                    }
                };
                break
            }
            return cN8F
        };
        return be7X.AW6Q.eG9x(function (d7e) {
            var bf7Y = be7X.buE1x.apply(be7X, d7e.args);
            if (!bf7Y) {
                d7e.stopped = !0;
                return
            }
            var u7n = bXk9b(bf7Y[0], bf7Y[1]);
            if (!!u7n) {
                d7e.stopped = !0;
                bf7Y[4] = bf7Y[1];
                bf7Y[1] = u7n;
                if (!!bf7Y[2]) {
                    bf7Y[5] = bf7Y[2];
                    bf7Y[2] = bXm9d(bf7Y[1], bf7Y[2])
                }
                d7e.value = bf7Y
            }
        }, function (d7e) {
            var bf7Y = d7e.value;
            if (!bf7Y[0] || !k7d.gG0x(bf7Y[2])) return;
            if (!k7d.gG0x(bf7Y[5])) bf7Y[5] = bf7Y[2];
            bf7Y[2] = bf7Y[2].g7b(bf7Y[0])
        })
    }();
    be7X.buq1x = be7X.buq1x.eG9x(function (d7e) {
        var bf7Y = d7e.args;
        if (!!btq1x[bf7Y[1]] || !document.addEventListener) {
            d7e.stopped = !0;
            bf7Y[0].attachEvent('on' + bf7Y[1], bf7Y[2])
        }
    });
    be7X.bdU4Y = be7X.bdU4Y.eG9x(function (d7e) {
        var bf7Y = d7e.args;
        if (!!btq1x[bf7Y[1]] || !document.removeEventListener) {
            d7e.stopped = !0;
            bf7Y[0].detachEvent('on' + bf7Y[1], bf7Y[2])
        }
    });
    be7X.bub1x = be7X.bub1x.eG9x(function (d7e) {
        if (!document.createEvent) {
            d7e.stopped = !0;
            var bf7Y = d7e.args,
                bUG8y = document.createEventObject();
            NEJ.X(bUG8y, bf7Y[2]);
            try {
                bf7Y[0].fireEvent('on' + bf7Y[1], bUG8y)
            } catch (ex) {
                console.error(ex.message);
                console.error(ex.stack)
            }
        }
    });
    be7X.btS1x = be7X.btS1x.eG9x(function (d7e) {
        var bf7Y = d7e.args,
            V7O = bf7Y[1].toLowerCase();
        if (V7O == 'opacity' && !(V7O in document.body.style)) {
            bf7Y[1] = 'filter';
            bf7Y[2] = 'alpha(opacity=' + bf7Y[2] * 100 + ')'
        }
    });
    be7X.btD1x = function () {
        var fq9h = 30;
        return be7X.btD1x.eG9x(function (d7e) {
            var F7y = d7e.args[0];
            if (!F7y.styleSheet) return;
            d7e.stopped = !0;
            var ku1x = d7e.args[1];
            var i7b = document.styleSheets;
            if (i7b.length > fq9h) {
                F7y = i7b[fq9h];
                ku1x = F7y.cssText + ku1x
            } else {
                F7y = F7y.styleSheet
            }
            F7y.cssText = ku1x
        })
    }();
    be7X.btB1x = be7X.btB1x.eG9x(function (d7e) {
        var bf7Y = d7e.args,
            zS6M = bf7Y[0].sheet;
        if (!!zS6M) return;
        d7e.stopped = !0;
        var zS6M = bf7Y[0].styleSheet,
            bq7j = zS6M.rules.length,
            bs7l = bf7Y[1].split(/[\{\}]/);
        zS6M.addRule(bs7l[0], bs7l[1], bq7j);
        d7e.value = zS6M.rules[bq7j]
    });
    be7X.bvj1x = function () {
        var EC7v = function (dZ9Q, d7e) {
            a6g.x7q(h7a.W7P(d7e), dZ9Q)
        };
        return be7X.bvj1x.eG9x(function (d7e) {
            if (O7H.dr9i.release >= '4.0') return;
            var bf7Y = d7e.args;
            if (bf7Y[1] != 1) {
                h7a.s7l(bf7Y[0], 'blur', EC7v.g7b(null, bf7Y[2]));
                bf7Y[1] = -1
            }
        })
    }();
    be7X.bdJ4N = function (bdH4L) {
        return !0
    };
    be7X.btt1x = be7X.btt1x.eG9x(function (d7e) {
        var bf7Y = d7e.args,
            f7c = (bf7Y[0].attributes || bb7U)[bf7Y[1]];
        if (!!f7c) {
            d7e.stopped = !0;
            d7e.value = f7c.value
        }
    }, function (d7e) {
        var bf7Y = d7e.args;
        if (bf7Y[1] == 'maxlength' && d7e.value == 2147483647) d7e.value = ''
    });
    if (O7H.dr9i.release < 5) {
        be7X.buQ1x = function () {
            var ej9a,
                eN9E,
                kp1x = [],
                btk0x = 'cb-' + +(new Date),
                bo7h = '<script>parent.nej.h["' + btk0x + '"] = !0;parent.location.hash = decodeURIComponent("#<HASH>");</scr' + 'ipt>';
            var bCu3x = function () {
                ej9a = window.clearTimeout(ej9a);
                if (!kp1x.length) return;
                var dO9F = kp1x.shift();
                try {
                    var xC5H = eN9E.contentWindow.document;
                    xC5H.open();
                    xC5H.write('<head><title>');
                    xC5H.write(document.title);
                    xC5H.write('</title>');
                    xC5H.write(bo7h.replace('#<HASH>', encodeURIComponent(dO9F)));
                    xC5H.write('</head><body></body>');
                    if (location.hostname != document.domain) xC5H.domain = document.domain;
                    xC5H.close();
                    be7X[btk0x] = !1
                } catch (ex) {
                    console.log(ex.message || ex);
                    kp1x.unshift(dO9F)
                }
                ej9a = window.setTimeout(bCu3x, 50)
            };
            return be7X.buQ1x.eG9x(function (d7e) {
                d7e.stopped = !0;
                var dO9F = d7e.args[0];
                if (!!be7X[btk0x] || !eN9E && !dO9F) return;
                kp1x.push(dO9F);
                if (!eN9E) eN9E = a6g.bdC4G();
                bCu3x()
            })
        }()
    }
    try {
        document.execCommand('BackgroundImageCache', !1, !0)
    } catch (e) {}
})();
(function () {
    var c7f = NEJ.P,
        h7a = c7f('nej.v'),
        be7X = c7f('nej.h'),
        O7H = c7f('nej.p'),
        bdB4F = O7H.bNc5h;
    if (O7H.nu2x.gecko) return;
    var Qu0x = function () {
        bdB4F.css3d = bdB4F.css3d || 'MozPerspective' in document.body.style;
        if (!document.body.insertAdjacentElement) HTMLElement.prototype.insertAdjacentElement = function (iQ0x, F7y) {
            if (!iQ0x || !F7y) return;
            switch (iQ0x) {
            case 'beforeEnd':
                this.appendChild(F7y);
                return;
            case 'beforeBegin':
                this.parentNode.insertBefore(F7y, this);
                return;
            case 'afterBegin':
                !this.firstChild ? this.appendChild(F7y) : this.insertBefore(F7y, this.firstChild);
                return;
            case 'afterEnd':
                !this.nextSibling ? this.parentNode.appendChild(F7y) : this.parentNode.insertBefore(F7y, this.nextSibling);
                return
            }
        };
        if (!('innerText' in document.body)) {
            HTMLElement.prototype['__defineGetter__']('innerText', function () {
                return this.textContent
            });
            HTMLElement.prototype['__defineSetter__']('innerText', function (bo7h) {
                this.textContent = bo7h
            })
        }
    };
    be7X.AW6Q = function () {
        var gK0x = /^(?:transitionend|animationend|animationstart|animationiteration)$/i;
        return be7X.AW6Q.eG9x(function (d7e) {
            var bf7Y = d7e.args;
            if (gK0x.test(bf7Y[1] || '')) {
                d7e.stopped = !0;
                d7e.value = bf7Y
            }
        })
    }();
    be7X.bWS8K = function () {
        var bXr9i = function (d7e) {
            h7a.bh7a(d7e);
            h7a.W7P(d7e).control.click()
        };
        return function (F7y) {
            h7a.s7l(F7y, 'click', bXr9i)
        }
    }();
    Qu0x()
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        be7X = c7f('nej.h');
    var bdy4C = function () {
        var mn1x = !!document.body.classList;
        return function () {
            return mn1x
        }
    }();
    var bFF3x = function () {
        var dg9X = /\s+/g;
        return function (fJ9A) {
            fJ9A = (fJ9A || '').trim();
            return !fJ9A ? null : new RegExp('(\\s|^)(?:' + fJ9A.replace(dg9X, '|') + ')(?=\\s|$)', 'g')
        }
    }();
    be7X.Sk1x = be7X.Sk1x.eG9x(function (d7e) {
        if (bdy4C()) return;
        d7e.stopped = !0;
        var bf7Y = d7e.args,
            F7y = a6g.B7u(bf7Y[0]);
        if (!F7y || !bf7Y[1] && !bf7Y[2]) return;
        var fJ9A = F7y.className || '';
        var Ip8h = ' ' + (bf7Y[2] || ''),
            Iq8i = bFF3x((bf7Y[1] || '') + Ip8h);
        !!Iq8i && (fJ9A = fJ9A.replace(Iq8i, '$1'));
        F7y.className = (fJ9A + Ip8h).replace(/\s+/g, ' ').trim()
    });
    be7X.bvC1x = be7X.bvC1x.eG9x(function (d7e) {
        if (bdy4C()) return;
        d7e.stopped = !0;
        var bf7Y = d7e.args;
        be7X.Sk1x(bf7Y[0], '', bf7Y[1])
    });
    be7X.bvx1x = be7X.bvx1x.eG9x(function (d7e) {
        if (bdy4C()) return;
        d7e.stopped = !0;
        var bf7Y = d7e.args;
        be7X.Sk1x(bf7Y[0], bf7Y[1], '')
    });
    be7X.bvr1x = be7X.bvr1x.eG9x(function (d7e) {
        if (bdy4C()) return;
        d7e.stopped = !0;
        var bf7Y = d7e.args,
            F7y = a6g.B7u(bf7Y[0]);
        if (!F7y) {
            d7e.value = !1;
            return
        }
        var dg9X = bFF3x(bf7Y[1]);
        d7e.value = !dg9X ? !1 : dg9X.test(F7y.className || '')
    })
})();
(function () {
    var c7f = NEJ.P,
        O7H = c7f('nej.p'),
        be7X = c7f('nej.h');
    if (O7H.nu2x.webkit) return;
    be7X.bdJ4N = function (bdH4L) {
        return !0
    }
})();
(function () {
    var c7f = NEJ.P,
        be7X = c7f('nej.h'),
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        cX8P = c7f('nej.x'),
        R7K = {};
    var bFK3x = function (F7y) {
        F7y = a6g.B7u(F7y);
        if (!F7y || !R7K[F7y.id]) return;
        var bdx4B = !0,
            C7v = F7y.id;
        k7d.eC9t(R7K[C7v], function () {
            bdx4B = !1;
            return !0
        });
        if (bdx4B) delete R7K[C7v]
    };
    h7a.s7l = cX8P.s7l = function () {
        var bXZ9Q = function () {
            var bf7Y = be7X.AW6Q.apply(be7X, arguments);
            if (!bf7Y || !bf7Y[2]) return;
            var vY4c = a6g.lM1x(bf7Y[0]),
                pp2x = R7K[vY4c] || {};
            R7K[vY4c] = pp2x;
            vY4c = bf7Y[4] || bf7Y[1];
            var Dh7a = pp2x[vY4c] || [];
            pp2x[vY4c] = Dh7a;
            Dh7a.push({
                type: bf7Y[1],
                func: bf7Y[2],
                capt: !!bf7Y[3],
                sfun: bf7Y[5] || bf7Y[2]
            });
            return bf7Y.slice(0, 4)
        };
        return function () {
            var bf7Y = bXZ9Q.apply(null, arguments);
            if (!!bf7Y) be7X.buq1x.apply(be7X, bf7Y);
            return this
        }
    }();
    h7a.mw1x = cX8P.mw1x = function () {
        var bYa9R = function () {
            var wU5Z = arguments,
                vY4c = a6g.lM1x(wU5Z[0]),
                pp2x = R7K[vY4c],
                u7n = (wU5Z[1] || '').toLowerCase(),
                d7e = wU5Z[2];
            if (!pp2x || !u7n || !d7e) return;
            pp2x = pp2x[u7n];
            if (!pp2x) return;
            var bYc9T = !!wU5Z[3],
                r7k = k7d.dj9a(pp2x, function (jz1x) {
                    return d7e == jz1x.sfun && bYc9T == jz1x.capt
                });
            if (r7k < 0) return;
            var jz1x = pp2x.splice(r7k, 1)[0];
            return !jz1x ? null : [
                a6g.B7u(vY4c),
                jz1x.type,
                jz1x.func,
                jz1x.capt
            ]
        };
        return function () {
            var bf7Y = bYa9R.apply(null, arguments);
            if (!!bf7Y) {
                be7X.bdU4Y.apply(be7X, bf7Y);
                bFK3x(bf7Y[0])
            }
            return this
        }
    }();
    h7a.hl0x = cX8P.hl0x = function () {
        var bKO5T = function () {
            var wU5Z = arguments,
                vY4c = a6g.lM1x(wU5Z[0]),
                pp2x = R7K[vY4c],
                Dh7a = (wU5Z[1] || '').toLowerCase();
            if (!pp2x || !Dh7a) return;
            var F7y = a6g.B7u(vY4c);
            k7d.nz2x(pp2x[Dh7a], function (jz1x, r7k, i7b) {
                be7X.bdU4Y(F7y, jz1x.type, jz1x.func, jz1x.capt);
                i7b.splice(r7k, 1)
            });
            delete pp2x[Dh7a]
        };
        var bYf9W = function (F7y) {
            F7y = a6g.B7u(F7y);
            if (!F7y) return;
            var C7v = F7y.id;
            k7d.eC9t(R7K[C7v], function (i7b, u7n) {
                bKO5T(C7v, u7n)
            });
            delete R7K[C7v]
        };
        return function (F7y, u7n) {
            !u7n ? bYf9W(F7y) : bKO5T(F7y, u7n);
            bFK3x(F7y);
            return this
        }
    }();
    h7a.W7P = function () {
        var bsR0x;
        var Ib8T = function (V7O, F7y) {
            var bs7l = V7O.split(':');
            if (bs7l.length > 1) {
                if (!bsR0x) bsR0x = {
                    c: a6g.bE8w,
                    d: a6g.t7m,
                    a: a6g.gw0x
                };
                var IC8u = bsR0x[bs7l[0]];
                if (!!IC8u) return !!IC8u(F7y, bs7l[1]);
                V7O = bs7l[1]
            }
            return !!a6g.gw0x(F7y, V7O) || !!a6g.t7m(F7y, V7O) || a6g.bE8w(F7y, V7O)
        };
        return function (d7e) {
            if (!d7e) return null;
            var F7y = d7e.target || d7e.srcElement,
                dX9O = arguments[1];
            if (!dX9O) return F7y;
            if (k7d.fH9y(dX9O)) dX9O = Ib8T.g7b(null, dX9O);
            if (k7d.gG0x(dX9O)) {
                while (F7y) {
                    if (!!dX9O(F7y)) return F7y;
                    F7y = F7y.parentNode
                }
                return null
            }
            return F7y
        }
    }();
    h7a.bh7a = function (d7e) {
        h7a.tC4G(d7e);
        h7a.cr8j(d7e);
        return this
    };
    h7a.tC4G = function (d7e) {
        if (!!d7e) {
            !!d7e.stopPropagation ? d7e.stopPropagation() : d7e.cancelBubble = !0
        }
        return this
    };
    h7a.cr8j = function (d7e) {
        if (!!d7e) {
            !!d7e.preventDefault ? d7e.preventDefault() : d7e.returnValue = !1
        }
        return this
    };
    h7a.cIm7f = function () {
        var qx3x = !1;
        var bYs9j = function () {
            if (qx3x) return;
            qx3x = !0;
            h7a.s7l(document, 'click', bYU9L, !0)
        };
        var bYU9L = function (d7e) {
            var F7y = h7a.W7P(d7e),
                bYV9M = a6g.t7m(F7y, 'stopped');
            if (bYV9M == 'true') {
                h7a.bh7a(d7e);
                a6g.t7m(F7y, 'stopped', 'false')
            }
        };
        return function (d7e) {
            if (!d7e) return;
            if (d7e.type == 'click') {
                h7a.bh7a(d7e);
                return
            }
            bYs9j();
            a6g.t7m(h7a.W7P(d7e), 'stopped', 'true')
        }
    }();
    h7a.jA1x = function (d7e) {
        return d7e.pageX != null ? d7e.pageX : d7e.clientX + a6g.ow2x().scrollLeft
    };
    h7a.mf1x = function (d7e) {
        return d7e.pageY != null ? d7e.pageY : d7e.clientY + a6g.ow2x().scrollTop
    };
    h7a.z7s = cX8P.z7s = function (F7y, u7n, e7d) {
        var bf7Y = be7X.AW6Q(F7y, u7n);
        if (!!bf7Y) be7X.bub1x(bf7Y[0], bf7Y[1], e7d);
        return this
    };
    c7f('dbg').dumpEV = function () {
        return R7K
    };
    cX8P.isChange = !0
})();
(function () {
    var o = !0,
        w = null;
    (function (B) {
        function v(a) {
            if ('bug-string-char-index' == a) return 'a' != 'a' [0];
            var f,
                c = 'json' == a;
            if (c || 'json-stringify' == a || 'json-parse' == a) {
                if ('json-stringify' == a || c) {
                    var d = k.stringify,
                        b = 'function' == typeof d && l;
                    if (b) {
                        (f = function () {
                            return 1
                        }).toJSON = f;
                        try {
                            b = '0' === d(0) && '0' === d(new Number) && '""' == d(new String) && d(m) === r && d(r) === r && d() === r && '1' === d(f) && '[1]' == d([f]) && '[null]' == d([r]) && 'null' == d(w) && '[null,null,null]' == d([r,
                                m,
                                w
                            ]) && '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}' == d({
                                a: [
                                    f,
                                    o, !1,
                                    w,
                                    '\0\n\f\r\t'
                                ]
                            }) && '1' === d(w, f) && '[\n 1,\n 2\n]' == d([1,
                                2
                            ], w, 1) && '"-271821-04-20T00:00:00.000Z"' == d(new Date(-8640000000000000)) && '"+275760-09-13T00:00:00.000Z"' == d(new Date(8640000000000000)) && '"-000001-01-01T00:00:00.000Z"' == d(new Date(-62198755200000)) && '"1969-12-31T23:59:59.999Z"' == d(new Date(-1))
                        } catch (n) {
                            b = !1
                        }
                    }
                    if (!c) return b
                }
                if ('json-parse' == a || c) {
                    a = k.parse;
                    if ('function' == typeof a) try {
                        if (0 === a('0') && !a(!1)) {
                            f = a('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');
                            var e = 5 == f.a.length && 1 === f.a[0];
                            if (e) {
                                try {
                                    e = !a('"\t"')
                                } catch (g) {}
                                if (e) try {
                                    e = 1 !== a('01')
                                } catch (i) {}
                            }
                        }
                    } catch (O) {
                        e = !1
                    }
                    if (!c) return e
                }
                return b && e
            }
        }
        var m = {}.toString,
            p,
            C,
            r,
            D = typeof define === 'function' && define.amd,
            k = 'object' == typeof exports && exports;
        k || D ? 'object' == typeof JSON && JSON ? k ? (k.stringify = JSON.stringify, k.parse = JSON.parse) : k = JSON : D && (k = B.JSON = {}) : k = B.JSON || (B.JSON = {});
        var l = new Date(-3509827334573292);
        try {
            l = -109252 == l.getUTCFullYear() && 0 === l.getUTCMonth() && 1 === l.getUTCDate() && 10 == l.getUTCHours() && 37 == l.getUTCMinutes() && 6 == l.getUTCSeconds() && 708 == l.getUTCMilliseconds()
        } catch (P) {}
        if (!v('json')) {
            var s = v('bug-string-char-index');
            if (!l) var t = Math.floor,
                J = [
                    0,
                    31,
                    59,
                    90,
                    120,
                    151,
                    181,
                    212,
                    243,
                    273,
                    304,
                    334
                ],
                z = function (a, f) {
                    return J[f] + 365 * (a - 1970) + t((a - 1969 + (f = +(f > 1))) / 4) - t((a - 1901 + f) / 100) + t((a - 1601 + f) / 400)
                };
            if (!(p = {}.hasOwnProperty)) p = function (a) {
                var f = {},
                    c;
                if ((f.__proto__ = w, f.__proto__ = {
                    toString: 1
                }, f).toString != m) p = function (a) {
                    var f = this.__proto__,
                        a = a in (this.__proto__ = w, this);
                    this.__proto__ = f;
                    return a
                };
                else {
                    c = f.constructor;
                    p = function (a) {
                        var f = (this.constructor || c).prototype;
                        return a in this && !(a in f && this[a] === f[a])
                    }
                }
                f = w;
                return p.call(this, a)
            };
            var K = {
                'boolean': 1,
                number: 1,
                string: 1,
                'undefined': 1
            };
            C = function (a, f) {
                var c = 0,
                    b,
                    h,
                    n;
                (b = function () {
                    this.valueOf = 0
                }).prototype.valueOf = 0;
                h = new b;
                for (n in h) p.call(h, n) && c++;
                b = h = w;
                if (c) c = c == 2 ? function (a, f) {
                    var c = {},
                        b = m.call(a) == '[object Function]',
                        d;
                    for (d in a)!(b && d == 'prototype') && !p.call(c, d) && (c[d] = 1) && p.call(a, d) && f(d)
                } : function (a, f) {
                    var c = m.call(a) == '[object Function]',
                        b,
                        d;
                    for (b in a)!(c && b == 'prototype') && p.call(a, b) && !(d = b === 'constructor') && f(b);
                    (d || p.call(a, b = 'constructor')) && f(b)
                };
                else {
                    h = [
                        'valueOf',
                        'toString',
                        'toLocaleString',
                        'propertyIsEnumerable',
                        'isPrototypeOf',
                        'hasOwnProperty',
                        'constructor'
                    ];
                    c = function (a, f) {
                        var c = m.call(a) == '[object Function]',
                            b,
                            d;
                        if (d = !c)
                            if (d = typeof a.constructor != 'function') {
                                d = typeof a.hasOwnProperty;
                                d = d == 'object' ? !!a.hasOwnProperty : !K[d]
                            }
                        d = d ? a.hasOwnProperty : p;
                        for (b in a)!(c && b == 'prototype') && d.call(a, b) && f(b);
                        for (c = h.length; b = h[--c]; d.call(a, b) && f(b));
                    }
                }
                c(a, f)
            };
            if (!v('json-stringify')) {
                var L = {
                        92: '\\\\',
                        34: '\\"',
                        8: '\\b',
                        12: '\\f',
                        10: '\\n',
                        13: '\\r',
                        9: '\\t'
                    },
                    u = function (a, f) {
                        return ('000000' + (f || 0)).slice(-a)
                    },
                    G = function (a) {
                        var f = '"',
                            b = 0,
                            d = a.length,
                            h = d > 10 && s,
                            n;
                        for (h && (n = a.split('')); b < d; b++) {
                            var e = a.charCodeAt(b);
                            switch (e) {
                            case 8:
                            case 9:
                            case 10:
                            case 12:
                            case 13:
                            case 34:
                            case 92:
                                f = f + L[e];
                                break;
                            default:
                                if (e < 32) {
                                    f = f + ('\\u00' + u(2, e.toString(16)));
                                    break
                                }
                                f = f + (h ? n[b] : s ? a.charAt(b) : a[b])
                            }
                        }
                        return f + '"'
                    },
                    E = function (a, b, c, d, h, n, e) {
                        var g = b[a],
                            i,
                            j,
                            k,
                            l,
                            q,
                            s,
                            v,
                            x,
                            y;
                        try {
                            g = b[a]
                        } catch (A) {}
                        if (typeof g == 'object' && g) {
                            i = m.call(g);
                            if (i == '[object Date]' && !p.call(g, 'toJSON'))
                                if (g > -1 / 0 && g < 1 / 0) {
                                    if (z) {
                                        k = t(g / 86400000);
                                        for (i = t(k / 365.2425) + 1970 - 1; z(i + 1, 0) <= k; i++);
                                        for (j = t((k - z(i, 0)) / 30.42); z(i, j + 1) <= k; j++);
                                        k = 1 + k - z(i, j);
                                        l = (g % 86400000 + 86400000) % 86400000;
                                        q = t(l / 3600000) % 24;
                                        s = t(l / 60000) % 60;
                                        v = t(l / 1000) % 60;
                                        l = l % 1000
                                    } else {
                                        i = g.getUTCFullYear();
                                        j = g.getUTCMonth();
                                        k = g.getUTCDate();
                                        q = g.getUTCHours();
                                        s = g.getUTCMinutes();
                                        v = g.getUTCSeconds();
                                        l = g.getUTCMilliseconds()
                                    }
                                    g = (i <= 0 || i >= 10000 ? (i < 0 ? '-' : '+') + u(6, i < 0 ? -i : i) : u(4, i)) + '-' + u(2, j + 1) + '-' + u(2, k) + 'T' + u(2, q) + ':' + u(2, s) + ':' + u(2, v) + '.' + u(3, l) + 'Z'
                                } else g = w;
                            else if (typeof g.toJSON == 'function' && (i != '[object Number]' && i != '[object String]' && i != '[object Array]' || p.call(g, 'toJSON'))) g = g.toJSON(a)
                        }
                        c && (g = c.call(b, a, g));
                        if (g === w) return 'null';
                        i = m.call(g);
                        if (i == '[object Boolean]') return '' + g;
                        if (i == '[object Number]') return g > -1 / 0 && g < 1 / 0 ? '' + g : 'null';
                        if (i == '[object String]') return G('' + g);
                        if (typeof g == 'object') {
                            for (a = e.length; a--;)
                                if (e[a] === g) throw TypeError();
                            e.push(g);
                            x = [];
                            b = n;
                            n = n + h;
                            if (i == '[object Array]') {
                                j = 0;
                                for (a = g.length; j < a; y || (y = o), j++) {
                                    i = E(j, g, c, d, h, n, e);
                                    x.push(i === r ? 'null' : i)
                                }
                                a = y ? h ? '[\n' + n + x.join(',\n' + n) + '\n' + b + ']' : '[' + x.join(',') + ']' : '[]'
                            } else {
                                C(d || g, function (a) {
                                    var b = E(a, g, c, d, h, n, e);
                                    b !== r && x.push(G(a) + ':' + (h ? ' ' : '') + b);
                                    y || (y = o)
                                });
                                a = y ? h ? '{\n' + n + x.join(',\n' + n) + '\n' + b + '}' : '{' + x.join(',') + '}' : '{}'
                            }
                            e.pop();
                            return a
                        }
                    };
                k.stringify = function (a, b, c) {
                    var d,
                        h,
                        j;
                    if (typeof b == 'function' || typeof b == 'object' && b)
                        if (m.call(b) == '[object Function]') h = b;
                        else if (m.call(b) == '[object Array]') {
                        j = {};
                        for (var e = 0, g = b.length, i; e < g; i = b[e++], (m.call(i) == '[object String]' || m.call(i) == '[object Number]') && (j[i] = 1));
                    }
                    if (c)
                        if (m.call(c) == '[object Number]') {
                            if ((c = c - c % 1) > 0) {
                                d = '';
                                for (c > 10 && (c = 10); d.length < c; d = d + ' ');
                            }
                        } else m.call(c) == '[object String]' && (d = c.length <= 10 ? c : c.slice(0, 10));
                    return E('', (i = {}, i[''] = a, i), h, j, d, '', [])
                }
            }
            if (!v('json-parse')) {
                var M = String.fromCharCode,
                    N = {
                        92: '\\',
                        34: '"',
                        47: '/',
                        98: '',
                        116: '\t',
                        110: '\n',
                        102: '\f',
                        114: '\r'
                    },
                    b,
                    A,
                    j = function () {
                        b = A = w;
                        throw SyntaxError()
                    },
                    q = function () {
                        for (var a = A, f = a.length, c, d, h, k, e; b < f;) {
                            e = a.charCodeAt(b);
                            switch (e) {
                            case 9:
                            case 10:
                            case 13:
                            case 32:
                                b++;
                                break;
                            case 123:
                            case 125:
                            case 91:
                            case 93:
                            case 58:
                            case 44:
                                c = s ? a.charAt(b) : a[b];
                                b++;
                                return c;
                            case 34:
                                c = '@';
                                for (b++; b < f;) {
                                    e = a.charCodeAt(b);
                                    if (e < 32) j();
                                    else if (e == 92) {
                                        e = a.charCodeAt(++b);
                                        switch (e) {
                                        case 92:
                                        case 34:
                                        case 47:
                                        case 98:
                                        case 116:
                                        case 110:
                                        case 102:
                                        case 114:
                                            c = c + N[e];
                                            b++;
                                            break;
                                        case 117:
                                            d = ++b;
                                            for (h = b + 4; b < h; b++) {
                                                e = a.charCodeAt(b);
                                                e >= 48 && e <= 57 || e >= 97 && e <= 102 || e >= 65 && e <= 70 || j()
                                            }
                                            c = c + M('0x' + a.slice(d, b));
                                            break;
                                        default:
                                            j()
                                        }
                                    } else {
                                        if (e == 34) break;
                                        e = a.charCodeAt(b);
                                        for (d = b; e >= 32 && e != 92 && e != 34;) e = a.charCodeAt(++b);
                                        c = c + a.slice(d, b)
                                    }
                                }
                                if (a.charCodeAt(b) == 34) {
                                    b++;
                                    return c
                                }
                                j();
                            default:
                                d = b;
                                if (e == 45) {
                                    k = o;
                                    e = a.charCodeAt(++b)
                                }
                                if (e >= 48 && e <= 57) {
                                    for (e == 48 && (e = a.charCodeAt(b + 1), e >= 48 && e <= 57) && j(); b < f && (e = a.charCodeAt(b), e >= 48 && e <= 57); b++);
                                    if (a.charCodeAt(b) == 46) {
                                        for (h = ++b; h < f && (e = a.charCodeAt(h), e >= 48 && e <= 57); h++);
                                        h == b && j();
                                        b = h
                                    }
                                    e = a.charCodeAt(b);
                                    if (e == 101 || e == 69) {
                                        e = a.charCodeAt(++b);
                                        (e == 43 || e == 45) && b++;
                                        for (h = b; h < f && (e = a.charCodeAt(h), e >= 48 && e <= 57); h++);
                                        h == b && j();
                                        b = h
                                    }
                                    return +a.slice(d, b)
                                }
                                k && j();
                                if (a.slice(b, b + 4) == 'true') {
                                    b = b + 4;
                                    return o
                                }
                                if (a.slice(b, b + 5) == 'false') {
                                    b = b + 5;
                                    return false
                                }
                                if (a.slice(b, b + 4) == 'null') {
                                    b = b + 4;
                                    return w
                                }
                                j()
                            }
                        }
                        return '$'
                    },
                    F = function (a) {
                        var b,
                            c;
                        a == '$' && j();
                        if (typeof a == 'string') {
                            if ((s ? a.charAt(0) : a[0]) == '@') return a.slice(1);
                            if (a == '[') {
                                for (b = [];; c || (c = o)) {
                                    a = q();
                                    if (a == ']') break;
                                    if (c)
                                        if (a == ',') {
                                            a = q();
                                            a == ']' && j()
                                        } else j();
                                    a == ',' && j();
                                    b.push(F(a))
                                }
                                return b
                            }
                            if (a == '{') {
                                for (b = {};; c || (c = o)) {
                                    a = q();
                                    if (a == '}') break;
                                    if (c)
                                        if (a == ',') {
                                            a = q();
                                            a == '}' && j()
                                        } else j();
                                        (a == ',' || typeof a != 'string' || (s ? a.charAt(0) : a[0]) != '@' || q() != ':') && j();
                                    b[a.slice(1)] = F(q())
                                }
                                return b
                            }
                            j()
                        }
                        return a
                    },
                    I = function (a, b, c) {
                        c = H(a, b, c);
                        c === r ? delete a[b] : a[b] = c
                    },
                    H = function (a, b, c) {
                        var d = a[b],
                            h;
                        if (typeof d == 'object' && d)
                            if (m.call(d) == '[object Array]')
                                for (h = d.length; h--;) I(d, h, c);
                            else C(d, function (a) {
                                I(d, a, c)
                            });
                        return c.call(a, b, d)
                    };
                k.parse = function (a, f) {
                    var c,
                        d;
                    b = 0;
                    A = '' + a;
                    c = F(q());
                    q() != '$' && j();
                    b = A = w;
                    return f && m.call(f) == '[object Function]' ? H((d = {}, d[''] = c, d), '', f) : c
                }
            }
        }
        D && define(function () {
            return k
        })
    })(this)
})();
(function () {
    var c7f = NEJ.P,
        O7H = c7f('nej.p');
    if (O7H.nu2x.trident0) return;
    JSON.parse = JSON.parse.eG9x(function (d7e) {
        var cK8C = d7e.args[0] || '';
        if (cK8C.length >= 500000) {
            d7e.stopped = !0;
            d7e.value = eval('(' + cK8C + ')')
        }
    })
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        eo9f = c7f('nej.g'),
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        be7X = c7f('nej.h'),
        cX8P = c7f('nej.x'),
        IE8w,
        bsI0x = {},
        R7K = document.createDocumentFragment();
    a6g.lM1x = cX8P.lM1x = function (F7y) {
        F7y = a6g.B7u(F7y);
        if (!F7y) return;
        var C7v = !!F7y.id ? F7y.id : 'auto-id-' + k7d.OI0x(16);
        F7y.id = C7v;
        if (a6g.B7u(C7v) != F7y) bsI0x[C7v] = F7y;
        return C7v
    };
    a6g.B7u = cX8P.B7u = function (F7y) {
        var f7c = bsI0x['' + F7y];
        if (!!f7c) return f7c;
        if (!k7d.fH9y(F7y) && !k7d.xs5x(F7y)) return F7y;
        return document.getElementById(F7y)
    };
    a6g.dk9b = cX8P.dk9b = function (F7y, dZ9Q) {
        F7y = a6g.B7u(F7y);
        if (!F7y) return null;
        var i7b = be7X.bvI1x(F7y);
        if (!!dZ9Q) k7d.nz2x(i7b, function (f7c, r7k) {
            if (!a6g.bE8w(f7c, dZ9Q)) i7b.splice(r7k, 1)
        });
        return i7b
    };
    a6g.H7A = cX8P.H7A = function (F7y, fJ9A) {
        F7y = a6g.B7u(F7y);
        return !F7y ? null : be7X.bvF1x(F7y, fJ9A.trim())
    };
    a6g.bFo3x = cX8P.bFo3x = function (F7y) {
        F7y = a6g.B7u(F7y);
        if (!!F7y) {
            F7y = F7y.parentNode;
            while (!!F7y) {
                if (F7y.scrollHeight > F7y.clientHeight) break;
                F7y = F7y.parentNode
            }
            if (!!F7y) return F7y
        }
        var pp2x = document.body.scrollHeight,
            Dh7a = document.documentElement.scrollHeight;
        return Dh7a >= pp2x ? document.documentElement : document.body
    };
    a6g.ow2x = function () {
        var bFE3x = function (i7b) {
            var o7h = 0;
            k7d.bd7W(i7b, function (eE9v) {
                if (!eE9v) return;
                if (!o7h) {
                    o7h = eE9v
                } else {
                    o7h = Math.min(o7h, eE9v)
                }
            });
            return o7h
        };
        return function (xC5H) {
            var IF8x = xC5H || document,
                CI6C = IF8x.body,
                CH6B = IF8x.documentElement,
                o7h = {
                    scrollTop: Math.max(CI6C.scrollTop, CH6B.scrollTop),
                    scrollLeft: Math.max(CI6C.scrollLeft, CH6B.scrollLeft),
                    clientWidth: bFE3x([CI6C.clientWidth,
                        CI6C.offsetWidth,
                        CH6B.clientWidth,
                        CH6B.offsetWidth
                    ]),
                    clientHeight: bFE3x([CI6C.clientHeight,
                        CI6C.offsetHeight,
                        CH6B.clientHeight,
                        CH6B.offsetHeight
                    ])
                };
            o7h.scrollWidth = Math.max(o7h.clientWidth, CI6C.scrollWidth, CH6B.scrollWidth);
            o7h.scrollHeight = Math.max(o7h.clientHeight, CI6C.scrollHeight, CH6B.scrollHeight);
            return o7h
        }
    }();
    a6g.cIg7Z = function (fq9h, pm2x) {
        var o7h = NEJ.X({}, pm2x),
            bIs4w = fq9h.width / fq9h.height,
            bdo4s = pm2x.width / pm2x.height;
        if (bIs4w > bdo4s && pm2x.height > fq9h.height) {
            o7h.height = fq9h.height;
            o7h.width = o7h.height * bdo4s
        }
        if (bIs4w < bdo4s && pm2x.width > fq9h.width) {
            o7h.width = fq9h.width;
            o7h.height = o7h.width / bdo4s
        }
        return o7h
    };
    a6g.cIf7Y = function () {
        var dg9X = /\s+/;
        var vQ4U = {
            left: function () {
                    return 0
                },
                center: function (hB0x, pm2x) {
                    return (hB0x.width - pm2x.width) / 2
                },
                right: function (hB0x, pm2x) {
                    return hB0x.width - pm2x.width
                },
                top: function () {
                    return 0
                },
                middle: function (hB0x, pm2x) {
                    return (hB0x.height - pm2x.height) / 2
                },
                bottom: function (hB0x, pm2x) {
                    return hB0x.height - pm2x.height
                }
        };
        return function (hB0x, pm2x, nV2x) {
            var o7h = {},
                bs7l = (nV2x || '').split(dg9X),
                gx0x = vQ4U[bs7l[1]] || vQ4U.middle,
                gU0x = vQ4U[bs7l[0]] || vQ4U.center;
            o7h.top = gx0x(hB0x, pm2x);
            o7h.left = gU0x(hB0x, pm2x);
            return o7h
        }
    }();
    a6g.sM3x = cX8P.sM3x = function (F7y, dZ9Q) {
        be7X.bvn1x(F7y, dZ9Q || a6g.t7m(F7y, 'hover') || 'js-hover');
        return this
    };
    a6g.II8A = cX8P.II8A = function (F7y) {
        F7y = a6g.B7u(F7y);
        if (!F7y) return;
        be7X.bvm1x(F7y)
    };
    a6g.bZB9s = cX8P.bZB9s = function () {
        var R7K = {},
            bLF5K = 2;
        var cad9U = function (C7v, dZ9Q, d7e) {
            R7K[C7v] = [
                h7a.jA1x(d7e),
                h7a.mf1x(d7e)
            ];
            a6g.y7r(C7v, dZ9Q)
        };
        var caj9a = function (C7v, dZ9Q, d7e) {
            var bM8E = R7K[C7v];
            if (!k7d.eJ9A(bM8E)) return;
            var cat9k = Math.abs(h7a.jA1x(d7e) - bM8E[0]),
                cav9m = Math.abs(h7a.mf1x(d7e) - bM8E[1]);
            if (cat9k > bLF5K || cav9m > bLF5K) bsj0x(C7v, dZ9Q)
        };
        var bsj0x = function (C7v, dZ9Q) {
            if (k7d.eJ9A(R7K[C7v])) {
                R7K[C7v] = -1;
                a6g.x7q(C7v, dZ9Q)
            }
        };
        return function (F7y, dZ9Q) {
            var C7v = a6g.lM1x(F7y);
            if (!C7v || R7K[C7v] != null) return;
            R7K[C7v] = -1;
            dZ9Q = dZ9Q || a6g.t7m(C7v, 'highlight') || 'js-highlight';
            h7a.s7l(C7v, 'touchstart', cad9U.g7b(null, C7v, dZ9Q));
            h7a.s7l(document, 'touchmove', caj9a.g7b(null, C7v, dZ9Q));
            h7a.s7l(document, 'touchend', bsj0x.g7b(null, C7v, dZ9Q));
            h7a.s7l(document, 'touchcancel', bsj0x.g7b(null, C7v, dZ9Q))
        }
    }();
    a6g.Cr6l = cX8P.Cr6l = function () {
        var caL9C = function (C7v, dZ9Q, caM9D) {
            var F7y = a6g.B7u(C7v),
                d7e = {
                    clazz: dZ9Q,
                    target: F7y
                };
            if (a6g.bE8w(F7y, dZ9Q)) {
                d7e.toggled = !1;
                a6g.x7q(F7y, dZ9Q)
            } else {
                d7e.toggled = !0;
                a6g.y7r(F7y, dZ9Q)
            }
            caM9D.call(null, d7e)
        };
        return function (F7y, e7d) {
            F7y = a6g.B7u(F7y);
            if (!!F7y) {
                var ik0x = {
                    ontoggle: br7k,
                    clazz: 'js-toggle',
                    element: F7y.parentNode
                };
                if (k7d.fH9y(e7d)) {
                    var f7c = a6g.B7u(e7d);
                    !!f7c ? ik0x.element = f7c : ik0x.clazz = e7d
                } else {
                    NEJ.EX(ik0x, e7d);
                    ik0x.element = a6g.B7u(ik0x.element)
                }
                var C7v = a6g.lM1x(ik0x.element);
                h7a.s7l(F7y, 'click', caL9C.g7b(null, C7v, ik0x.clazz, ik0x.ontoggle || br7k))
            }
            return this
        }
    }();
    a6g.mS2x = cX8P.mS2x = function (F7y, e7d) {
        F7y = a6g.B7u(F7y);
        if (!F7y) return;
        var fg9X = 0,
            dZ9Q = 'js-focus';
        if (k7d.xs5x(e7d)) {
            fg9X = e7d
        } else if (k7d.fH9y(e7d)) {
            dZ9Q = e7d
        } else if (k7d.ly1x(e7d)) {
            fg9X = e7d.mode || fg9X;
            dZ9Q = e7d.clazz || dZ9Q
        }
        var D7w = parseInt(a6g.t7m(F7y, 'mode'));
        if (!isNaN(D7w)) fg9X = D7w;
        D7w = a6g.t7m(F7y, 'focus');
        if (!!D7w) dZ9Q = D7w;
        be7X.bvj1x(F7y, fg9X, dZ9Q);
        return this
    };
    a6g.dh9Y = function () {
        var by7r = {
            a: {
                href: '#',
                hideFocus: !0
            },
            style: {
                type: 'text/css'
            },
            link: {
                type: 'text/css',
                rel: 'stylesheet'
            },
            iframe: {
                frameBorder: 0
            },
            script: {
                defer: !0,
                type: 'text/javascript'
            }
        };
        return function (fB9s, fJ9A, bI8A) {
            var F7y = document.createElement(fB9s);
            NEJ.X(F7y, by7r[fB9s.toLowerCase()]);
            if (!!fJ9A) F7y.className = fJ9A;
            bI8A = a6g.B7u(bI8A);
            if (!!bI8A) bI8A.appendChild(F7y);
            return F7y
        }
    }();
    a6g.bdC4G = function () {
        var cbu0x = function () {
            if (location.hostname == document.domain) return 'about:blank';
            return 'javascript:(function(){document.open();document.domain="' + document.domain + '";document.close();})();'
        };
        var cbW0x = function (V7O) {
            V7O = V7O.trim();
            if (!V7O) return a6g.dh9Y('iframe');
            var eN9E;
            try {
                eN9E = document.createElement('<iframe name="' + V7O + '"></iframe>');
                eN9E.frameBorder = 0
            } catch (e) {
                eN9E = a6g.dh9Y('iframe');
                eN9E.name = V7O
            }
            return eN9E
        };
        return function (e7d) {
            e7d = e7d || bb7U;
            var eN9E = cbW0x(e7d.name || '');
            if (!e7d.visible) eN9E.style.display = 'none';
            if (k7d.gG0x(e7d.onload)) h7a.s7l(eN9E, 'load', function (d7e) {
                if (!eN9E.src) return;
                h7a.hl0x(eN9E, 'load');
                e7d.onload(d7e)
            });
            var bI8A = e7d.parent;
            if (k7d.gG0x(bI8A)) {
                try {
                    bI8A(eN9E)
                } catch (e) {}
            } else {
                (a6g.B7u(bI8A) || document.body).appendChild(eN9E)
            }
            var cR8J = e7d.src || cbu0x();
            window.setTimeout(function () {
                eN9E.src = cR8J
            }, 0);
            return eN9E
        }
    }();
    a6g.cJ8B = cX8P.cJ8B = function () {
        var bTU8M = function (zx5C) {
            zx5C.src = eo9f.bwc1x
        };
        var bUL8D = function (ei9Z) {
            ei9Z.src = 'about:blank'
        };
        return function (F7y, cco0x) {
            F7y = a6g.B7u(F7y);
            if (!F7y) return this;
            if (!cco0x) h7a.hl0x(F7y);
            delete bsI0x[F7y.id];
            var fB9s = F7y.tagName;
            if (fB9s == 'IFRAME') {
                bUL8D(F7y)
            } else if (fB9s == 'IMG') {
                bTU8M(F7y)
            } else if (!!F7y.getElementsByTagName) {
                k7d.bd7W(F7y.getElementsByTagName('img'), bTU8M);
                k7d.bd7W(F7y.getElementsByTagName('iframe'), bUL8D)
            }
            if (!!F7y.parentNode) {
                F7y.parentNode.removeChild(F7y)
            }
            return this
        }
    }();
    a6g.mT2x = cX8P.mT2x = function (F7y) {
        F7y = a6g.B7u(F7y);
        if (!!F7y) R7K.appendChild(F7y);
        return this
    };
    a6g.byi2x = cX8P.byi2x = function (F7y) {
        F7y = a6g.B7u(F7y);
        if (!F7y) return;
        k7d.nz2x(F7y.childNodes, function (f7c) {
            a6g.cJ8B(f7c)
        })
    };
    a6g.IM8E = cX8P.IM8E = function () {
        var dZ9Q,
            gK0x = /\s+/;
        var ccz0x = function () {
            if (!!dZ9Q) return;
            dZ9Q = a6g.sW3x('.#<uispace>{position:relative;zoom:1;}.#<uispace>-show{position:absolute;top:0;left:100%;cursor:text;white-space:nowrap;overflow:hidden;}');
            a6g.bAr2x()
        };
        return function (F7y, e7d) {
            F7y = a6g.B7u(F7y);
            if (!F7y) return;
            ccz0x();
            e7d = e7d || bb7U;
            var bI8A = F7y.parentNode;
            if (!a6g.bE8w(bI8A, dZ9Q)) {
                bI8A = a6g.dh9Y('span', dZ9Q);
                F7y.insertAdjacentElement('beforeBegin', bI8A);
                bI8A.appendChild(F7y)
            }
            var bBA2x = e7d.nid || '',
                f7c = a6g.H7A(bI8A, bBA2x || dZ9Q + '-show')[0];
            if (!f7c) {
                var ea9R = ((e7d.clazz || '') + ' ' + bBA2x).trim();
                ea9R = dZ9Q + '-show' + (!ea9R ? '' : ' ') + ea9R;
                f7c = a6g.dh9Y(e7d.tag || 'span', ea9R);
                bI8A.appendChild(f7c)
            }
            var ea9R = e7d.clazz;
            if (!!ea9R) {
                ea9R = (ea9R || '').trim().split(gK0x)[0] + '-parent';
                a6g.y7r(bI8A, ea9R)
            }
            return f7c
        }
    }();
    a6g.t7m = cX8P.t7m = function () {
        var brV0x = {},
            fB9s = 'data-',
            dg9X = /\-(.{1})/gi;
        var Ef7Y = function (F7y) {
            var C7v = a6g.lM1x(F7y);
            if (!!brV0x[C7v]) return;
            var by7r = {};
            k7d.bd7W(F7y.attributes, function (f7c) {
                var J7C = f7c.nodeName;
                if (J7C.indexOf(fB9s) != 0) return;
                J7C = J7C.replace(fB9s, '').replace(dg9X, function ($1, $2) {
                    return $2.toUpperCase()
                });
                by7r[J7C] = f7c.nodeValue || ''
            });
            brV0x[C7v] = by7r
        };
        return function (F7y, J7C, D7w) {
            F7y = a6g.B7u(F7y);
            if (!F7y) return null;
            var bdh4l = F7y.dataset;
            if (!bdh4l) {
                Ef7Y(F7y);
                bdh4l = brV0x[F7y.id]
            }
            if (D7w !== undefined) bdh4l[J7C] = D7w;
            return bdh4l[J7C]
        }
    }();
    a6g.gw0x = cX8P.gw0x = function (F7y, V7O, D7w) {
        F7y = a6g.B7u(F7y);
        if (!F7y) return '';
        if (D7w !== undefined && !!F7y.setAttribute) F7y.setAttribute(V7O, D7w);
        return be7X.btt1x(F7y, V7O)
    };
    a6g.on2x = function (dQ9H) {
        var ru3x = document.createElement('div');
        ru3x.innerHTML = dQ9H;
        var i7b = a6g.dk9b(ru3x);
        return i7b.length > 1 ? ru3x : i7b[0]
    };
    a6g.ccS0x = cX8P.ccS0x = function (F7y) {
        F7y = a6g.B7u(F7y);
        return !F7y ? '' : be7X.bve1x(F7y)
    };
    a6g.bEj3x = function (BQ6K) {
        BQ6K = (BQ6K || '').trim();
        return !BQ6K ? null : be7X.bvd1x(BQ6K)
    };
    a6g.cdp0x = function (cG8y, u7n) {
        cG8y = cG8y || '';
        switch (u7n) {
        case 'xml':
            cG8y = a6g.bEj3x(cG8y);
            break;
        case 'json':
            try {
                cG8y = JSON.parse(cG8y)
            } catch (ex) {
                cG8y = null
            }
            break
        }
        return cG8y
    };
    a6g.hR0x = cX8P.hR0x = function () {
        var cea0x = function (F7y) {
            return F7y == document.body || F7y == document.documentElement
        };
        return function (eb9S, nq2x) {
            eb9S = a6g.B7u(eb9S);
            if (!eb9S) return null;
            nq2x = a6g.B7u(nq2x) || null;
            var o7h = {
                    x: 0,
                    y: 0
                },
                brF0x,
                do9f,
                bdb4f;
            while (!!eb9S && eb9S != nq2x) {
                brF0x = cea0x(eb9S);
                do9f = brF0x ? 0 : eb9S.scrollLeft;
                bdb4f = parseInt(a6g.de9V(eb9S, 'borderLeftWidth')) || 0;
                o7h.x += eb9S.offsetLeft + bdb4f - do9f;
                do9f = brF0x ? 0 : eb9S.scrollTop;
                bdb4f = parseInt(a6g.de9V(eb9S, 'borderTopWidth')) || 0;
                o7h.y += eb9S.offsetTop + bdb4f - do9f;
                eb9S = eb9S.offsetParent
            }
            return o7h
        }
    }();
    a6g.mX2x = cX8P.mX2x = function (F7y) {
        var bi7b = a6g.hR0x(F7y);
        window.scrollTo(bi7b.x, bi7b.y);
        return this
    };
    a6g.cHE7x = function (tn3x) {
        tn3x = (tn3x || '').trim();
        return be7X.bCc3x(tn3x)
    };
    a6g.cee0x = cX8P.cee0x = function (F7y, V7O, by7r) {
        F7y = a6g.B7u(F7y);
        if (!F7y) return this;
        var D7w = be7X.bGm4q(V7O, by7r);
        if (!D7w) return this;
        a6g.ba7T(F7y, 'transform', D7w);
        return this
    };
    a6g.fb9S = cX8P.fb9S = function (F7y, by7r) {
        F7y = a6g.B7u(F7y);
        if (!!F7y) k7d.eC9t(by7r, function (D7w, V7O) {
            a6g.ba7T(F7y, V7O, D7w)
        });
        return this
    };
    a6g.cey0x = cX8P.cey0x = function (gh0x, e7d) {
        gh0x = a6g.B7u(gh0x);
        if (!gh0x) return {
            start: 0,
            end: 0
        };
        if (k7d.xs5x(e7d)) e7d = {
            start: e7d,
            end: e7d
        };
        if (e7d != null) {
            if (e7d.end == null) e7d.end = e7d.start || 0;
            be7X.bvl1x(gh0x, e7d)
        } else {
            e7d = be7X.bvk1x(gh0x)
        }
        return e7d
    };
    a6g.ba7T = cX8P.ba7T = function (F7y, V7O, D7w) {
        F7y = a6g.B7u(F7y);
        if (!!F7y) be7X.btS1x(F7y, V7O, D7w);
        return this
    };
    a6g.de9V = cX8P.de9V = function (F7y, V7O) {
        F7y = a6g.B7u(F7y);
        if (!F7y) return '';
        var hd0x = !window.getComputedStyle ? F7y.currentStyle || bb7U : window.getComputedStyle(F7y, null);
        return hd0x[be7X.bJN4R(V7O)] || ''
    };
    a6g.bIy4C = function () {
        var dg9X = /[\s\r\n]+/gi;
        return function (ci8a) {
            ci8a = (ci8a || '').trim().replace(dg9X, ' ');
            if (!ci8a) return;
            var f7c = a6g.dh9Y('style');
            document.head.appendChild(f7c);
            be7X.btD1x(f7c, be7X.bWc8U(ci8a));
            return f7c
        }
    }();
    a6g.bIS4W = function (zn5s) {
        try {
            zn5s = zn5s.trim();
            if (!!zn5s) return (new Function(zn5s))()
        } catch (ex) {
            console.error(ex.message);
            console.error(ex.stack)
        }
    };
    a6g.sW3x = function () {
        var dg9X = /#<.*?>/g,
            gI0x = +(new Date);
        return function (ku1x) {
            if (!IE8w) IE8w = [];
            var fJ9A = 'auto-' + gI0x++;
            IE8w.push(ku1x.replace(dg9X, fJ9A));
            return fJ9A
        }
    }();
    a6g.bAr2x = function () {
        if (!!IE8w) {
            a6g.bIy4C(IE8w.join(''));
            IE8w = null
        }
        return this
    };
    a6g.cHB7u = function (ci8a, ku1x) {
        ci8a = a6g.B7u(ci8a);
        return !ci8a ? null : be7X.btB1x(ci8a, ku1x)
    };
    a6g.y7r = cX8P.y7r = function () {
        be7X.bvC1x.apply(be7X, arguments);
        return this
    };
    a6g.x7q = cX8P.x7q = function () {
        be7X.bvx1x.apply(be7X, arguments);
        return this
    };
    a6g.fk9b = cX8P.fk9b = function () {
        be7X.Sk1x.apply(be7X, arguments);
        return this
    };
    a6g.bE8w = cX8P.bE8w = function () {
        return be7X.bvr1x.apply(be7X, arguments)
    };
    if (!document.head) document.head = document.getElementsByTagName('head')[0] || document.body;
    cX8P.isChange = !0
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        fA9r = NEJ.R,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        be7X = c7f('nej.h'),
        k7d = c7f('nej.u');
    var HJ8B = function (j7c, u7n) {
        try {
            u7n = u7n.toLowerCase();
            if (j7c === null) return u7n == 'null';
            if (j7c === undefined) return u7n == 'undefined';
            return bb7U.toString.call(j7c).toLowerCase() == '[object ' + u7n + ']'
        } catch (e) {
            return !1
        }
    };
    k7d.gG0x = function (j7c) {
        return HJ8B(j7c, 'function')
    };
    k7d.fH9y = function (j7c) {
        return HJ8B(j7c, 'string')
    };
    k7d.xs5x = function (j7c) {
        return HJ8B(j7c, 'number')
    };
    k7d.cHA7t = function (j7c) {
        return HJ8B(j7c, 'boolean')
    };
    k7d.Ea7T = function (j7c) {
        return HJ8B(j7c, 'date')
    };
    k7d.eJ9A = function (j7c) {
        return HJ8B(j7c, 'array')
    };
    k7d.ly1x = function (j7c) {
        return HJ8B(j7c, 'object')
    };
    k7d.fv9m = function () {
        var dg9X = /[^\x00-\xfff]/g;
        return function (bo7h) {
            return ('' + (bo7h || '')).replace(dg9X, '**').length
        }
    }();
    k7d.dj9a = function (i7b, p7i) {
        var dX9O = k7d.gG0x(p7i) ? p7i : function (D7w) {
                return D7w === p7i
            },
            r7k = k7d.eC9t(i7b, dX9O);
        return r7k != null ? r7k : -1
    };
    k7d.cHw7p = function () {
        var bLz5E;
        var PL0x = function (i7b, ph2x, pg2x) {
            if (ph2x > pg2x) return -1;
            var Ga7T = Math.ceil((ph2x + pg2x) / 2),
                o7h = bLz5E(i7b[Ga7T], Ga7T, i7b);
            if (o7h == 0) return Ga7T;
            if (o7h < 0) return PL0x(i7b, ph2x, Ga7T - 1);
            return PL0x(i7b, Ga7T + 1, pg2x)
        };
        return function (i7b, IC8u) {
            bLz5E = IC8u || br7k;
            return PL0x(i7b, 0, i7b.length - 1)
        }
    }();
    k7d.nz2x = function (i7b, cN8F, P7I) {
        if (!i7b || !i7b.length || !k7d.gG0x(cN8F)) return null;
        for (var i = i7b.length - 1; i >= 0; i--)
            if (!!cN8F.call(P7I, i7b[i], i, i7b)) return i;
        return null
    };
    k7d.bd7W = function (i7b, cN8F, P7I) {
        if (!i7b || !i7b.length || !k7d.gG0x(cN8F)) return this;
        if (!!i7b.forEach) {
            i7b.forEach(cN8F, P7I);
            return this
        }
        for (var i = 0, l = i7b.length; i < l; i++) cN8F.call(P7I, i7b[i], i, i7b);
        return this
    };
    k7d.eC9t = function (i7b, cN8F, P7I) {
        if (!i7b || !k7d.gG0x(cN8F)) return null;
        if (i7b.length != null) {
            if (i7b.length > 0)
                for (var i = 0, l = i7b.length; i < l; i++)
                    if (!!cN8F.call(P7I, i7b[i], i, i7b)) return i
        }
        if (k7d.ly1x(i7b)) {
            for (var x in i7b)
                if (i7b.hasOwnProperty(x) && !!cN8F.call(P7I, i7b[x], x, i7b)) return x
        }
        return null
    };
    k7d.cfh0x = function (jn1x, cfl0x, e7d) {
        jn1x = jn1x || [];
        e7d = e7d || bb7U;
        var bPJ6D = !!e7d.union,
            xd5i = !!e7d.begin,
            bcJ4N = e7d.compare,
            cfE0x = bPJ6D && xd5i ? k7d.nz2x : k7d.bd7W;
        cfE0x(cfl0x, function (p7i) {
            if (!!bcJ4N) bcJ4N = bcJ4N.ey9p(p7i);
            var r7k = k7d.dj9a(jn1x, bcJ4N || p7i);
            if (r7k >= 0) jn1x.splice(r7k, 1);
            if (bPJ6D) jn1x[xd5i ? 'unshift' : 'push'](p7i)
        });
        return jn1x
    };
    k7d.BS6M = function (by7r, bo7h) {
        if (!by7r || !bo7h || !bo7h.replace) return bo7h || '';
        return bo7h.replace(by7r.r, function ($1) {
            var o7h = by7r[!by7r.i ? $1.toLowerCase() : $1];
            return o7h != null ? o7h : $1
        })
    };
    k7d.dH9y = function () {
        var by7r = {
            r: /\<|\>|\&lt;|\&gt;|\&|\r|\n|\s|\'|\"/g,
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            ' ': '&nbsp;',
            '"': '&quot;',
            '\'': '&#39;',
            '\n': '<br/>',
            '\r': '',
            '&lt;': '&lt;',
            '&gt;': '&gt;'
        };
        return function (bo7h) {
            return k7d.BS6M(by7r, bo7h)
        }
    }();
    k7d.BR6L = function () {
        var by7r = {
            r: /\&(?:lt|gt|amp|nbsp|#39|quot)\;|\<br\/\>/gi,
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&nbsp;': ' ',
            '&#39;': '\'',
            '&quot;': '"',
            '<br/>': '\n'
        };
        return function (bo7h) {
            return k7d.BS6M(by7r, bo7h)
        }
    }();
    k7d.if0x = function () {
        var by7r = {
                i: !0,
                r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g
            },
            cfR1x = [
                '上午',
                '下午'
            ],
            cfW1x = [
                'A.M.',
                'P.M.'
            ],
            bqz0x = [
                '日',
                '一',
                '二',
                '三',
                '四',
                '五',
                '六'
            ],
            cgd1x = [
                '一',
                '二',
                '三',
                '四',
                '五',
                '六',
                '七',
                '八',
                '九',
                '十',
                '十一',
                '十二'
            ],
            cgJ1x = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sept',
                'Oct',
                'Nov',
                'Dec'
            ];
        var QN1x = function (gV0x) {
            gV0x = parseInt(gV0x) || 0;
            return (gV0x < 10 ? '0' : '') + gV0x
        };
        var cgL1x = function (pU2x) {
            return pU2x < 12 ? 0 : 1
        };
        return function (bA7t, IY8Q, cgW1x) {
            if (!bA7t || !IY8Q) return '';
            bA7t = k7d.bcx4B(bA7t);
            by7r.yyyy = bA7t.getFullYear();
            by7r.yy = ('' + by7r.yyyy).substr(2);
            by7r.M = bA7t.getMonth() + 1;
            by7r.MM = QN1x(by7r.M);
            by7r.eM = cgJ1x[by7r.M - 1];
            by7r.cM = cgd1x[by7r.M - 1];
            by7r.d = bA7t.getDate();
            by7r.dd = QN1x(by7r.d);
            by7r.H = bA7t.getHours();
            by7r.HH = QN1x(by7r.H);
            by7r.m = bA7t.getMinutes();
            by7r.mm = QN1x(by7r.m);
            by7r.s = bA7t.getSeconds();
            by7r.ss = QN1x(by7r.s);
            by7r.ms = bA7t.getMilliseconds();
            by7r.w = bqz0x[bA7t.getDay()];
            var bzL2x = cgL1x(by7r.H);
            by7r.ct = cfR1x[bzL2x];
            by7r.et = cfW1x[bzL2x];
            if (!!cgW1x) {
                by7r.H = by7r.H % 12
            }
            return k7d.BS6M(by7r, IY8Q)
        }
    }();
    k7d.bcx4B = function (bA7t) {
        var cY8Q = bA7t;
        if (k7d.fH9y(bA7t)) cY8Q = new Date(Date.parse(bA7t));
        if (!k7d.Ea7T(bA7t)) cY8Q = new Date(bA7t);
        return cY8Q
    };
    k7d.II8A = function (chh1x, chA1x) {
        return (new Number(chh1x)).toFixed(chA1x)
    };
    k7d.bqb0x = function () {
        var gK0x = /([^\/:])\/.*$/,
            km1x = /\/[^\/]+$/,
            Es7l = /[#\?]/,
            bqa0x = location.href.split(/[?#]/)[0],
            tB4F = document.createElement('a');
        var bpV0x = function (jx1x) {
            return (jx1x || '').indexOf('://') > 0
        };
        var bCw3x = function (jx1x) {
            return (jx1x || '').split(Es7l)[0].replace(km1x, '/')
        };
        var chF1x = function (jx1x, fV0x) {
            if (jx1x.indexOf('/') == 0) return fV0x.replace(gK0x, '$1') + jx1x;
            return bCw3x(fV0x) + jx1x
        };
        bqa0x = bCw3x(bqa0x);
        return function (jx1x, fV0x) {
            jx1x = (jx1x || '').trim();
            if (!bpV0x(fV0x)) fV0x = bqa0x;
            if (!jx1x) return fV0x;
            if (bpV0x(jx1x)) return jx1x;
            jx1x = chF1x(jx1x, fV0x);
            tB4F.href = jx1x;
            jx1x = tB4F.href;
            return bpV0x(jx1x) ? jx1x : tB4F.getAttribute('href', 4)
        }
    }();
    k7d.chW1x = function () {
        var dg9X = /^([\w]+?:\/\/.*?(?=\/|$))/i;
        return function (Y7R) {
            if (dg9X.test(Y7R || '')) return RegExp.$1.toLowerCase();
            return ''
        }
    }();
    k7d.bCZ3x = function (G7z, ik0x) {
        if (!G7z) return ik0x;
        var V7O = G7z.tagName.toLowerCase(),
            i7b = a6g.dk9b(G7z);
        if (!i7b || !i7b.length) {
            ik0x[V7O] = G7z.textContent || G7z.text || '';
            return ik0x
        }
        var ck8c = {};
        ik0x[V7O] = ck8c;
        k7d.bd7W(i7b, function (f7c) {
            k7d.bCZ3x(f7c, ck8c)
        });
        return ik0x
    };
    k7d.cGZ7S = function (BQ6K) {
        try {
            return k7d.bCZ3x(a6g.bEj3x(BQ6K), {})
        } catch (ex) {
            return null
        }
    };
    k7d.Ro1x = function (ih0x, RD1x) {
        var ik0x = {};
        k7d.bd7W((ih0x || '').split(RD1x), function (V7O) {
            var bcm4q = V7O.split('=');
            if (!bcm4q || !bcm4q.length) return;
            var J7C = bcm4q.shift();
            if (!J7C) return;
            ik0x[decodeURIComponent(J7C)] = decodeURIComponent(bcm4q.join('='))
        });
        return ik0x
    };
    k7d.vC4G = function (gn0x, RD1x, cjb1x) {
        if (!gn0x) return '';
        var bs7l = [];
        for (var x in gn0x) {
            bs7l.push(encodeURIComponent(x) + '=' + (!!cjb1x ? encodeURIComponent(gn0x[x]) : gn0x[x]))
        }
        return bs7l.join(RD1x || ',')
    };
    k7d.hu0x = function (bv7o) {
        return k7d.Ro1x(bv7o, '&')
    };
    k7d.cC8u = function (gn0x) {
        return k7d.vC4G(gn0x, '&', !0)
    };
    k7d.cGX7Q = function (gn0x) {
        return be7X.Im8e(gn0x)
    };
    k7d.cGW7P = function (i7b, dX9O) {
        var o7h = {};
        k7d.bd7W(i7b, function (p7i) {
            var J7C = p7i;
            if (!!dX9O) {
                J7C = dX9O(p7i)
            }
            o7h[J7C] = p7i
        });
        return o7h
    };
    k7d.cGV7O = function (gV0x, fY0x) {
        var cje1x = ('' + gV0x).length,
            cjm1x = Math.max(1, parseInt(fY0x) || 0),
            do9f = cjm1x - cje1x;
        if (do9f > 0) {
            gV0x = (new Array(do9f + 1)).join('0') + gV0x
        }
        return '' + gV0x
    };
    k7d.bcg4k = function (gn0x, V7O) {
        if (!k7d.eJ9A(V7O)) {
            try {
                delete gn0x[V7O]
            } catch (e) {
                gn0x[V7O] = undefined
            }
            return this
        }
        k7d.bd7W(V7O, k7d.bcg4k.g7b(k7d, gn0x));
        return this
    };
    k7d.OI0x = function () {
        var bGG4K = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        return function (bq7j) {
            bq7j = bq7j || 10;
            var o7h = [];
            for (var i = 0, bGI4M; i < bq7j; ++i) {
                bGI4M = Math.floor(Math.random() * bGG4K.length);
                o7h.push(bGG4K.charAt(bGI4M))
            }
            return o7h.join('')
        }
    }();
    k7d.Bj6d = function (fE9v, fq9h) {
        return Math.floor(Math.random() * (fq9h - fE9v) + fE9v)
    };
    k7d.nR2x = function (bq7j) {
        bq7j = Math.max(0, Math.min(bq7j || 8, 30));
        var fE9v = Math.pow(10, bq7j - 1),
            fq9h = fE9v * 10;
        return k7d.Bj6d(fE9v, fq9h).toString()
    };
    k7d.bce4i = function () {
        var gI0x = +(new Date);
        return function () {
            return '' + gI0x++
        }
    }()
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        fA9r = NEJ.R,
        br7k = NEJ.F,
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut'),
        pc2x;
    if (!!O7H.cI8A) return;
    O7H.cI8A = NEJ.C();
    pc2x = O7H.cI8A.prototype;
    O7H.cI8A.A7t = function (e7d) {
        e7d = e7d || {};
        var cz8r = !!this.AY6S && this.AY6S.shift();
        if (!cz8r) {
            cz8r = new this(e7d);
            this.cjr1x = (this.cjr1x || 0) + 1
        }
        cz8r.bk7d(e7d);
        return cz8r
    };
    O7H.cI8A.T7M = function () {
        var SN1x = function (p7i, r7k, i7b) {
            p7i.T7M();
            i7b.splice(r7k, 1)
        };
        return function (cz8r) {
            if (!cz8r) return null;
            if (!k7d.eJ9A(cz8r)) {
                if (!(cz8r instanceof this)) {
                    var fJ9A = cz8r.constructor;
                    if (!!fJ9A.T7M) fJ9A.T7M(cz8r);
                    return null
                }
                if (cz8r == this.fi9Z) delete this.fi9Z;
                if (cz8r == this.AU6O) delete this.AU6O;
                cz8r.bD8v();
                if (!this.AY6S) this.AY6S = [];
                if (k7d.dj9a(this.AY6S, cz8r) < 0) {
                    this.AY6S.push(cz8r)
                }
                return null
            }
            k7d.nz2x(cz8r, SN1x, this)
        }
    }();
    O7H.cI8A.go0x = function (e7d) {
        e7d = e7d || {};
        if (!this.fi9Z) this.fi9Z = this.A7t(e7d);
        return this.fi9Z
    };
    O7H.cI8A.bKA5F = function (e7d, rB3x) {
        e7d = e7d || {};
        if (!!rB3x && !!this.AU6O) {
            this.AU6O.T7M();
            delete this.AU6O
        }
        if (!this.AU6O) {
            this.AU6O = this.A7t(e7d)
        } else {
            this.AU6O.bk7d(e7d)
        }
        return this.AU6O
    };
    pc2x.cx8p = function () {
        var gI0x = +(new Date);
        return function () {
            this.id = gI0x++;
            this.lX1x = {};
            this.bLs5x = {}
        }
    }();
    pc2x.bk7d = function (e7d) {
        this.boU9L(e7d)
    };
    pc2x.bD8v = function () {
        this.hl0x();
        this.Jk8c()
    };
    pc2x.bX8P = function () {
        var gI0x = +(new Date);
        var cjO2x = function (bf7Y) {
            if (!bf7Y || bf7Y.length < 3) return;
            this.bLs5x['de-' + gI0x++] = bf7Y;
            h7a.s7l.apply(h7a, bf7Y)
        };
        return function (i7b) {
            k7d.bd7W(i7b, cjO2x, this)
        }
    }();
    pc2x.Jk8c = function () {
        var cjT2x = function (bf7Y, J7C, by7r) {
            delete by7r[J7C];
            h7a.mw1x.apply(h7a, bf7Y)
        };
        return function () {
            k7d.eC9t(this.bLs5x, cjT2x)
        }
    }();
    pc2x.cGO7H = function (dX9O) {
        dX9O = dX9O || br7k;
        k7d.eC9t(this, function (FO7H, J7C, by7r) {
            if (!!FO7H && !!FO7H.T7M && !dX9O(FO7H)) {
                delete by7r[J7C];
                FO7H.T7M()
            }
        })
    };
    pc2x.T7M = function () {
        this.constructor.T7M(this)
    };
    pc2x.boQ9H = function (u7n) {
        var d7e = this.lX1x[u7n.toLowerCase()];
        return !!d7e && d7e !== br7k
    };
    pc2x.s7l = function (u7n, d7e) {
        this.wJ5O.apply(this, arguments);
        return this
    };
    pc2x.mw1x = function (u7n, d7e) {
        var u7n = (u7n || '').toLowerCase(),
            ee9V = this.lX1x[u7n];
        if (!k7d.eJ9A(ee9V)) {
            if (ee9V == d7e) delete this.lX1x[u7n];
            return
        }
        k7d.nz2x(ee9V, function (ev9m, r7k, i7b) {
            if (ev9m == d7e) i7b.splice(r7k, 1)
        })
    };
    pc2x.wJ5O = function (u7n, d7e) {
        if (!!u7n && k7d.gG0x(d7e)) this.lX1x[u7n.toLowerCase()] = d7e;
        return this
    };
    pc2x.boU9L = function () {
        var cmA2x = function (d7e, u7n) {
            this.wJ5O(u7n, d7e)
        };
        return function (ee9V) {
            k7d.eC9t(ee9V, cmA2x, this);
            return this
        }
    }();
    pc2x.hl0x = function () {
        var boJ9A = function (d7e, u7n) {
            this.hl0x(u7n)
        };
        return function (u7n) {
            var u7n = (u7n || '').toLowerCase();
            if (!!u7n) {
                delete this.lX1x[u7n]
            } else {
                k7d.eC9t(this.lX1x, boJ9A, this)
            }
            return this
        }
    }();
    pc2x.boH9y = function (u7n, d7e) {
        if (!u7n || !k7d.gG0x(d7e)) return this;
        u7n = u7n.toLowerCase();
        var ee9V = this.lX1x[u7n];
        if (!ee9V) {
            this.lX1x[u7n] = d7e;
            return this
        }
        if (!k7d.eJ9A(ee9V)) {
            this.lX1x[u7n] = [
                ee9V
            ]
        }
        this.lX1x[u7n].push(d7e);
        return this
    };
    pc2x.z7s = function (u7n) {
        var d7e = this.lX1x[(u7n || '').toLowerCase()];
        if (!d7e) return this;
        var bf7Y = fA9r.slice.call(arguments, 1);
        if (!k7d.eJ9A(d7e)) return d7e.apply(this, bf7Y);
        k7d.bd7W(d7e, function (dt9k) {
            try {
                dt9k.apply(this, bf7Y)
            } catch (ex) {
                console.error(ex.message);
                console.error(ex.stack)
            }
        }, this);
        return this
    };
    O7H.bbS4W = function () {
        var R7K = {};
        return function (C7v, fJ9A, e7d) {
            var fh9Y = fJ9A.cnr2x;
            if (!fh9Y) {
                fh9Y = k7d.OI0x(10);
                fJ9A.cnr2x = fh9Y
            }
            var J7C = C7v + '-' + fh9Y,
                cz8r = R7K[J7C];
            if (!!e7d && !cz8r) {
                cz8r = fJ9A.A7t(e7d);
                cz8r.T7M = cz8r.T7M.eG9x(function (d7e) {
                    delete R7K[J7C];
                    delete cz8r.T7M
                });
                R7K[J7C] = cz8r
            }
            return cz8r
        }
    }()
})();
(function () {
    var o = NEJ.O,
        u = NEJ.P('nej.u'),
        j = NEJ.P('nej.j');
    j.gy0x = function () {
        var cY8Q = new Date,
            cns2x = +cY8Q,
            bos9j = 86400000;
        var cnv2x = function (V7O) {
            var rD3x = document.cookie,
                sS3x = '\\b' + V7O + '=',
                bbQ4U = rD3x.search(sS3x);
            if (bbQ4U < 0) return '';
            bbQ4U += sS3x.length - 2;
            var wE5J = rD3x.indexOf(';', bbQ4U);
            if (wE5J < 0) wE5J = rD3x.length;
            return rD3x.substring(bbQ4U, wE5J) || ''
        };
        return function (V7O, j7c) {
            if (j7c === undefined) return cnv2x(V7O);
            if (u.fH9y(j7c)) {
                if (!!j7c) {
                    document.cookie = V7O + '=' + j7c + ';';
                    return j7c
                }
                j7c = {
                    expires: -100
                }
            }
            j7c = j7c || o;
            var rD3x = V7O + '=' + (j7c.value || '') + ';';
            delete j7c.value;
            if (j7c.expires !== undefined) {
                cY8Q.setTime(cns2x + j7c.expires * bos9j);
                j7c.expires = cY8Q.toGMTString()
            }
            rD3x += u.vC4G(j7c, ';');
            document.cookie = rD3x
        }
    }()
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        iC0x = c7f('nej.c'),
        eo9f = c7f('nej.g'),
        a6g = c7f('nej.e'),
        v7o = c7f('nej.j'),
        I7B = c7f('nej.ut'),
        O7H = c7f('nej.ut.j'),
        k7d = c7f('nej.u'),
        b7g;
    if (!!O7H.Jn8f) return;
    O7H.Jn8f = NEJ.C();
    b7g = O7H.Jn8f.N7G(I7B.cI8A);
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.pK2x = {
            noescape: false,
            url: '',
            sync: !1,
            cookie: !1,
            type: 'text',
            method: 'GET',
            timeout: 60000
        };
        NEJ.EX(this.pK2x, e7d);
        var CX6R = iC0x.B7u('csrf');
        if ((/^\/[^\/]/.test(this.pK2x.url) || this.pK2x.url.indexOf(location.protocol + '//' + location.host) == 0) && !!CX6R.cookie && !!CX6R.param) {
            var bv7o = encodeURIComponent(CX6R.param) + '=' + encodeURIComponent(v7o.gy0x(CX6R.cookie) || ''),
                RD1x = this.pK2x.url.indexOf('?') < 0 ? '?' : '&';
            this.pK2x.url += RD1x + bv7o
        }
        this.bbN4R = e7d.headers || {};
        var bo7h = this.bbN4R[eo9f.zI5N];
        if (bo7h == null) this.bbN4R[eo9f.zI5N] = eo9f.bVC8u
    };
    b7g.bD8v = function () {
        this.bG8y();
        delete this.Ax6r;
        delete this.pK2x;
        delete this.bbN4R
    };
    b7g.cnR2x = function (bo7h) {
        var by7r = {
            r: /\<|\>/g,
            '<': '&lt;',
            '>': '&gt;'
        };
        if (!this.pK2x.noescape) {
            return k7d.BS6M(by7r, bo7h)
        } else {
            return bo7h
        }
    };
    b7g.vt4x = function (d7e) {
        var et9k = d7e.status;
        if (et9k == -1) {
            this.z7s('onerror', {
                code: eo9f.bSX8P,
                message: '请求[' + this.pK2x.url + ']超时！'
            });
            return
        }
        if (('' + et9k).indexOf('2') != 0) {
            this.z7s('onerror', {
                data: et9k,
                code: eo9f.bwn1x,
                message: '服务器返回异常状态[' + et9k + ']!',
                extData: d7e.result
            });
            return
        }
        this.z7s('onload', a6g.cdp0x(this.cnR2x(d7e.result), this.pK2x.type))
    };
    b7g.cp8h = br7k;
    b7g.bnZ9Q = function (j7c) {
        var Y7R = this.pK2x.url;
        if (!Y7R) {
            this.z7s('onerror', {
                code: eo9f.bwB1x,
                message: '没有输入请求地址！'
            });
            return this
        }
        try {
            this.pK2x.data = j7c == null ? null : j7c;
            var d7e = {
                request: this.pK2x,
                headers: this.bbN4R
            };
            try {
                this.z7s('onbeforerequest', d7e)
            } catch (ex) {
                console.error(ex.message);
                console.error(ex.stack)
            }
            this.cp8h(d7e)
        } catch (e) {
            this.z7s('onerror', {
                code: eo9f.bwn1x,
                message: '请求[' + Y7R + ']失败:' + e.message + '！'
            })
        }
        return this
    };
    b7g.kf1x = br7k
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        be7X = c7f('nej.h'),
        eo9f = c7f('nej.g'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut.j'),
        R7K = {},
        TP1x;
    if (!!O7H.bbI4M) return;
    O7H.bbI4M = NEJ.C();
    TP1x = O7H.bbI4M.N7G(O7H.Jn8f);
    TP1x.bD8v = function () {
        this.bG8y();
        window.clearTimeout(this.ed9U);
        delete this.ed9U;
        try {
            this.rG3x.onreadystatechange = br7k;
            this.rG3x.abort()
        } catch (e) {}
        delete this.rG3x
    };
    TP1x.cp8h = function () {
        var cnT2x = function (D7w, J7C) {
            this.rG3x.setRequestHeader(J7C, D7w)
        };
        return function (e7d) {
            var gf0x = e7d.request,
                oU2x = e7d.headers;
            this.rG3x = be7X.bnU9L();
            if (oU2x[eo9f.zI5N] === eo9f.Ff7Y) {
                delete oU2x[eo9f.zI5N];
                this.rG3x.upload.onprogress = this.gv0x.g7b(this, 1);
                if (gf0x.data.tagName === 'FORM') gf0x.data = new FormData(gf0x.data)
            }
            this.rG3x.onreadystatechange = this.gv0x.g7b(this, 2);
            if (gf0x.timeout != 0) {
                this.ed9U = window.setTimeout(this.gv0x.g7b(this, 3), gf0x.timeout)
            }
            this.rG3x.open(gf0x.method, gf0x.url, !gf0x.sync);
            k7d.eC9t(oU2x, cnT2x, this);
            if (!!this.pK2x.cookie && 'withCredentials' in this.rG3x) this.rG3x.withCredentials = !0;
            this.rG3x.send(gf0x.data)
        }
    }();
    TP1x.gv0x = function (u7n) {
        switch (u7n) {
        case 1:
            this.z7s('onuploading', arguments[1]);
            break;
        case 2:
            if (this.rG3x.readyState == 4) this.vt4x({
                status: this.rG3x.status,
                result: this.rG3x.responseText || ''
            });
            break;
        case 3:
            this.vt4x({
                status: -1
            });
            break
        }
    };
    TP1x.kf1x = function () {
        this.vt4x({
            status: 0
        });
        return this
    }
})();
(function () {
    if (typeof TrimPath === 'undefined') {
        TrimPath = {};
        if (typeof exports !== 'undefined') TrimPath = exports
    }
    var Uc1x = {},
        bbG4K = [],
        bEc3x = /\s+/g,
        gI0x = +(new Date),
        Js8k,
        bP8H,
        hH0x;
    var FR7K = function () {
        var gK0x = /^\s*[\[\{'"].*?[\]\}'"]\s*$/,
            km1x = /[\&\|\<\>\+\-\*\/\%\,\(\)\[\]\?\:\!\=\;\s]/,
            Es7l = /^(?:defined|null|undefined|true|false|instanceof|new|this|typeof|\$v|[\d]+)$/i,
            bnL9C = /^new\s+/,
            cnV3x = /['"]/;
        var cnX3x = function (D7w) {
            if (gK0x.test(D7w)) return;
            D7w = D7w.split('.')[0].trim();
            if (!D7w || cnV3x.test(D7w)) return;
            D7w = D7w.replace(bnL9C, '');
            try {
                if (Es7l.test(D7w)) return;
                hH0x[D7w] = 1
            } catch (e) {}
        };
        return function (bo7h) {
            bo7h = bo7h || '';
            if (!bo7h || gK0x.test(bo7h)) return;
            var bs7l = bo7h.split(km1x);
            for (var i = 0, l = bs7l.length; i < l; i++) cnX3x(bs7l[i])
        }
    }();
    var cnY3x = function (dJ9A) {
        if (dJ9A[2] != 'in') throw 'bad for loop statement: ' + dJ9A.join(' ');
        bbG4K.push(dJ9A[1]);
        FR7K(dJ9A[3]);
        return 'var __HASH__' + dJ9A[1] + ' = ' + dJ9A[3] + ',' + dJ9A[1] + ',' + dJ9A[1] + '_count=0;' + 'if (!!__HASH__' + dJ9A[1] + ')' + 'for(var ' + dJ9A[1] + '_key in __HASH__' + dJ9A[1] + '){' + dJ9A[1] + ' = __HASH__' + dJ9A[1] + '[' + dJ9A[1] + '_key];' + 'if (typeof(' + dJ9A[1] + ')=="function") continue;' + dJ9A[1] + '_count++;'
    };
    var cnZ3x = function () {
        var dJ9A = bbG4K[bbG4K.length - 1];
        return '}; if(!__HASH__' + dJ9A + '||!' + dJ9A + '_count){'
    };
    var coa3x = function () {
        bbG4K.pop();
        return '};'
    };
    var cob3x = function (dJ9A) {
        if (dJ9A[2] != 'as') throw 'bad for list loop statement: ' + dJ9A.join(' ');
        var UF2x = dJ9A[1].split('..');
        if (UF2x.length > 1) {
            FR7K(UF2x[0]);
            FR7K(UF2x[1]);
            return 'for(var ' + dJ9A[3] + ',' + dJ9A[3] + '_index=0,' + dJ9A[3] + '_beg=' + UF2x[0] + ',' + dJ9A[3] + '_end=' + UF2x[1] + ',' + dJ9A[3] + '_length=parseInt(' + dJ9A[3] + '_end-' + dJ9A[3] + '_beg+1);' + dJ9A[3] + '_index<' + dJ9A[3] + '_length;' + dJ9A[3] + '_index++){' + dJ9A[3] + ' = ' + dJ9A[3] + '_beg+' + dJ9A[3] + '_index;'
        } else {
            FR7K(dJ9A[1]);
            return 'for(var __LIST__' + dJ9A[3] + ' = ' + dJ9A[1] + ',' + dJ9A[3] + ',' + dJ9A[3] + '_index=0,' + dJ9A[3] + '_length=__LIST__' + dJ9A[3] + '.length;' + dJ9A[3] + '_index<' + dJ9A[3] + '_length;' + dJ9A[3] + '_index++){' + dJ9A[3] + ' = __LIST__' + dJ9A[3] + '[' + dJ9A[3] + '_index];'
        }
    };
    var coc3x = function (dJ9A) {
        if (!dJ9A || !dJ9A.length) return;
        dJ9A.shift();
        var V7O = dJ9A[0].split('(')[0];
        return 'var ' + V7O + ' = function' + dJ9A.join('').replace(V7O, '') + '{var __OUT=[];'
    };
    var cok3x = function (dJ9A) {
        if (!dJ9A[1]) throw 'bad include statement: ' + dJ9A.join(' ');
        return 'if (typeof inline == "function"){__OUT.push(inline('
    };
    var bnw8o = function (ke1x, dJ9A) {
        FR7K(dJ9A.slice(1).join(' '));
        return ke1x
    };
    var cor3x = function (dJ9A) {
        return bnw8o('if(', dJ9A)
    };
    var cot3x = function (dJ9A) {
        return bnw8o('}else if(', dJ9A)
    };
    var coJ3x = function (dJ9A) {
        return bnw8o('var ', dJ9A)
    };
    bP8H = {
        blk: /^\{(cdata|minify|eval)/i,
        tag: 'forelse|for|list|if|elseif|else|var|macro|break|notrim|trim|include',
        def: {
            'if': {
                pfix: cor3x,
                sfix: '){',
                pmin: 1
            },
            'else': {
                pfix: '}else{'
            },
            elseif: {
                pfix: cot3x,
                sfix: '){',
                pdft: 'true'
            },
            '/if': {
                pfix: '}'
            },
            'for': {
                pfix: cnY3x,
                pmin: 3
            },
            forelse: {
                pfix: cnZ3x
            },
            '/for': {
                pfix: coa3x
            },
            list: {
                pfix: cob3x,
                pmin: 3
            },
            '/list': {
                pfix: '};'
            },
            'break': {
                pfix: 'break;'
            },
            'var': {
                pfix: coJ3x,
                sfix: ';'
            },
            macro: {
                pfix: coc3x
            },
            '/macro': {
                pfix: 'return __OUT.join("");};'
            },
            trim: {
                pfix: function () {
                    Js8k = !0
                }
            },
            '/trim': {
                pfix: function () {
                    Js8k = null
                }
            },
            inline: {
                pfix: cok3x,
                pmin: 1,
                sfix: '));}'
            }
        },
        ext: {
            seed: function (ke1x) {
                    return (ke1x || '') + '' + gI0x
                },
                'default': function (D7w, kv1x) {
                    return D7w || kv1x
                }
        }
    };
    var coN3x = function () {
        var coQ3x = /\\([\{\}])/g;
        return function (bo7h, jL1x) {
            bo7h = bo7h.replace(coQ3x, '$1');
            var dJ9A = bo7h.slice(1, -1).split(bEc3x),
                bg7Z = bP8H.def[dJ9A[0]];
            if (!bg7Z) {
                bbs4w(bo7h, jL1x);
                return
            }
            if (!!bg7Z.pmin && bg7Z.pmin >= dJ9A.length) throw 'Statement needs more parameters:' + bo7h;
            jL1x.push(!!bg7Z.pfix && typeof bg7Z.pfix != 'string' ? bg7Z.pfix(dJ9A) : bg7Z.pfix || '');
            if (!!bg7Z.sfix) {
                if (dJ9A.length <= 1) {
                    if (!!bg7Z.pdft) jL1x.push(bg7Z.pdft)
                } else {
                    for (var i = 1, l = dJ9A.length; i < l; i++) {
                        if (i > 1) jL1x.push(' ');
                        jL1x.push(dJ9A[i])
                    }
                }
                jL1x.push(bg7Z.sfix)
            }
        }
    }();
    var bJb4f = function (JB8t, jL1x) {
        if (!JB8t || !JB8t.length) return;
        if (JB8t.length == 1) {
            var bnj8b = JB8t.pop();
            FR7K(bnj8b);
            jL1x.push(bnj8b == '' ? '""' : bnj8b);
            return
        }
        var bni8a = JB8t.pop().split(':');
        jL1x.push('__MDF[\'' + bni8a.shift() + '\'](');
        bJb4f(JB8t, jL1x);
        if (bni8a.length > 0) {
            var bf7Y = bni8a.join(':');
            FR7K(bf7Y);
            jL1x.push(',' + bf7Y)
        }
        jL1x.push(')')
    };
    var bbs4w = function (bo7h, jL1x) {
        if (!bo7h) return;
        var wq4u = bo7h.split('\n');
        if (!wq4u || !wq4u.length) return;
        for (var i = 0, l = wq4u.length, hy0x; i < l; i++) {
            hy0x = wq4u[i];
            if (!!Js8k) {
                hy0x = hy0x.trim();
                if (!hy0x) continue
            }
            coU3x(hy0x, jL1x);
            if (!!Js8k && i < l - 1) jL1x.push('__OUT.push(\'\\n\');')
        }
    };
    var coU3x = function () {
        var cpc3x = /\|\|/g,
            cpd3x = /#@@#/g;
        return function (bo7h, jL1x) {
            var MY9P = '}',
                MZ9Q = -1,
                bq7j = bo7h.length,
                xd5i,
                fQ9H,
                JG8y,
                bbl4p,
                Nd9U;
            while (MZ9Q + MY9P.length < bq7j) {
                xd5i = '${';
                fQ9H = '}';
                JG8y = bo7h.indexOf(xd5i, MZ9Q + MY9P.length);
                if (JG8y < 0) break;
                if (bo7h.charAt(JG8y + 2) == '%') {
                    xd5i = '${%';
                    fQ9H = '%}'
                }
                bbl4p = bo7h.indexOf(fQ9H, JG8y + xd5i.length);
                if (bbl4p < 0) break;
                bbi4m(bo7h.substring(MZ9Q + MY9P.length, JG8y), jL1x);
                Nd9U = bo7h.substring(JG8y + xd5i.length, bbl4p).replace(cpc3x, '#@@#').split('|');
                for (var i = 0, l = Nd9U.length; i < l; Nd9U[i] = Nd9U[i].replace(cpd3x, '||'), i++);
                jL1x.push('__OUT.push(');
                bJb4f(Nd9U, jL1x);
                jL1x.push(');');
                MY9P = fQ9H;
                MZ9Q = bbl4p
            }
            bbi4m(bo7h.substring(MZ9Q + MY9P.length), jL1x)
        }
    }();
    var bbi4m = function () {
        var by7r = {
            r: /\n|\\|\'/g,
            '\n': '\\n',
            '\\': '\\\\',
            '\'': '\\\''
        };
        var cpe3x = function (bo7h) {
            return (bo7h || '').replace(by7r.r, function ($1) {
                return by7r[$1] || $1
            })
        };
        return function (bo7h, jL1x) {
            if (!bo7h) return;
            jL1x.push('__OUT.push(\'' + cpe3x(bo7h) + '\');')
        }
    }();
    var cpf3x = function () {
        var cpi3x = /\t/g,
            cpj3x = /\n/g,
            cpk3x = /\r\n?/g;
        var bNS5X = function (bo7h, xd5i) {
            var r7k = bo7h.indexOf('}', xd5i + 1);
            while (bo7h.charAt(r7k - 1) == '\\') {
                r7k = bo7h.indexOf('}', r7k + 1)
            }
            return r7k
        };
        var cpO3x = function () {
            var bs7l = [],
                Ez7s = arguments[0];
            for (var x in Ez7s) {
                x = (x || '').trim();
                if (!x) continue;
                bs7l.push(x + '=$v(\'' + x + '\')')
            }
            return bs7l.length > 0 ? 'var ' + bs7l.join(',') + ';' : ''
        };
        return function (bo7h) {
            hH0x = {};
            bo7h = bo7h.replace(cpk3x, '\n').replace(cpi3x, '    ');
            var rT3x = [
                'if(!__CTX) return \'\';',
                ''
            ];
            rT3x.push('function $v(__NAME){var v = __CTX[__NAME];return v==null?window[__NAME]:v;};');
            rT3x.push('var defined=function(__NAME){return __CTX[__NAME]!=null;},');
            rT3x.push('__OUT=[];');
            var EK7D = -1,
                bq7j = bo7h.length;
            var nE2x,
                JI8A,
                No0x,
                Nq0x,
                Ce6Y,
                Nv0x,
                bmj8b,
                ND0x;
            while (EK7D + 1 < bq7j) {
                nE2x = EK7D;
                nE2x = bo7h.indexOf('{', nE2x + 1);
                while (nE2x >= 0) {
                    JI8A = bNS5X(bo7h, nE2x);
                    No0x = bo7h.substring(nE2x, JI8A);
                    Nq0x = No0x.match(bP8H.blk);
                    if (!!Nq0x) {
                        Ce6Y = Nq0x[1].length + 1;
                        Nv0x = bo7h.indexOf('}', nE2x + Ce6Y);
                        if (Nv0x >= 0) {
                            bmj8b = Nv0x - nE2x - Ce6Y <= 0 ? '{/' + Nq0x[1] + '}' : No0x.substr(Ce6Y + 1);
                            Ce6Y = bo7h.indexOf(bmj8b, Nv0x + 1);
                            if (Ce6Y >= 0) {
                                bbs4w(bo7h.substring(EK7D + 1, nE2x), rT3x);
                                ND0x = bo7h.substring(Nv0x + 1, Ce6Y);
                                switch (Nq0x[1]) {
                                case 'cdata':
                                    bbi4m(ND0x, rT3x);
                                    break;
                                case 'minify':
                                    bbi4m(ND0x.replace(cpj3x, ' ').replace(bEc3x, ' '), rT3x);
                                    break;
                                case 'eval':
                                    if (!!ND0x) rT3x.push('__OUT.push((function(){' + ND0x + '})());');
                                    break
                                }
                                nE2x = EK7D = Ce6Y + bmj8b.length - 1
                            }
                        }
                    } else if (bo7h.charAt(nE2x - 1) != '$' && bo7h.charAt(nE2x - 1) != '\\' && No0x.substr(No0x.charAt(1) == '/' ? 2 : 1).search(bP8H.tag) == 0) {
                        break
                    }
                    nE2x = bo7h.indexOf('{', nE2x + 1)
                }
                if (nE2x < 0) break;
                JI8A = bNS5X(bo7h, nE2x);
                if (JI8A < 0) break;
                bbs4w(bo7h.substring(EK7D + 1, nE2x), rT3x);
                coN3x(bo7h.substring(nE2x, JI8A + 1), rT3x);
                EK7D = JI8A
            }
            bbs4w(bo7h.substring(EK7D + 1), rT3x);
            rT3x.push(';return __OUT.join("");');
            rT3x[1] = cpO3x(hH0x);
            hH0x = null;
            return new Function('__CTX', '__MDF', rT3x.join(''))
        }
    }();
    TrimPath.seed = function () {
        return gI0x
    };
    TrimPath.merge = function () {
        var NE0x = {};
        TrimPath.dump = function () {
            return {
                func: NE0x,
                text: Uc1x
            }
        };
        return function (fh9Y, j7c, jV1x) {
            try {
                j7c = j7c || {};
                if (!NE0x[fh9Y] && !Uc1x[fh9Y]) return '';
                if (!NE0x[fh9Y]) {
                    NE0x[fh9Y] = cpf3x(Uc1x[fh9Y]);
                    delete Uc1x[fh9Y]
                }
                if (!!jV1x) {
                    for (var x in bP8H.ext)
                        if (!jV1x[x]) jV1x[x] = bP8H.ext[x]
                }
                return NE0x[fh9Y](j7c, jV1x || bP8H.ext)
            } catch (ex) {
                return ex.message || ''
            }
        }
    }();
    TrimPath.parse = function () {
        var cqc3x = +(new Date);
        return function (bo7h, fh9Y) {
            if (!bo7h) return '';
            fh9Y = fh9Y || 'ck_' + cqc3x++;
            Uc1x[fh9Y] = bo7h;
            return fh9Y
        }
    }()
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        ez9q = {},
        bTk8c = {};
    a6g.JR9I = TrimPath.seed;
    a6g.bZ8R = function () {
        var bTV8N = function (C7v) {
            return !a6g.iL0x ? '' : a6g.iL0x(C7v)
        };
        return function (fh9Y, j7c, jV1x) {
            j7c = NEJ.X(NEJ.X({}, bTk8c), j7c);
            j7c.inline = bTV8N;
            jV1x = NEJ.X(NEJ.X({}, ez9q), jV1x);
            jV1x.rand = k7d.nR2x;
            jV1x.format = k7d.if0x;
            jV1x.escape = k7d.dH9y;
            jV1x.inline = bTV8N;
            return TrimPath.merge(fh9Y, j7c, jV1x)
        }
    }();
    a6g.ex9o = function (bo7h, cqd3x) {
        if (!bo7h) return '';
        var fh9Y,
            F7y = a6g.B7u(bo7h);
        if (!!F7y) {
            fh9Y = F7y.id;
            bo7h = F7y.value || F7y.innerText;
            if (!cqd3x) a6g.cJ8B(F7y)
        }
        return TrimPath.parse(bo7h, fh9Y)
    };
    a6g.dA9r = function (bI8A, fh9Y, j7c, jV1x) {
        bI8A = a6g.B7u(bI8A);
        if (!!bI8A) bI8A.innerHTML = a6g.bZ8R(fh9Y, j7c, jV1x);
        return this
    };
    a6g.cGb7U = function (by7r) {
        NEJ.X(ez9q, by7r)
    };
    a6g.cqf3x = function (by7r) {
        NEJ.X(bTk8c, by7r)
    };
    c7f('dbg').dumpJST = function () {
        return TrimPath.dump()
    }
})();
(function () {
    var dv9m = NEJ.P('nej.p'),
        O7H = window,
        lt1x = dv9m.Id8V,
        bxE2x = lt1x.ipad || lt1x.iphone;
    if (!bxE2x && !!O7H.requestAnimationFrame && !!O7H.cancelRequestAnimationFrame) return;
    var ke1x = dv9m.dr9i.prefix.pro;
    if (!bxE2x && !!O7H[ke1x + 'RequestAnimationFrame'] && !!O7H[ke1x + 'CancelRequestAnimationFrame']) {
        O7H.requestAnimationFrame = O7H[ke1x + 'RequestAnimationFrame'];
        O7H.cancelRequestAnimationFrame = O7H[ke1x + 'CancelRequestAnimationFrame'];
        return
    }
    var baV3x = lt1x.desktop ? 80 : lt1x.ios ? 50 : 30;
    O7H.requestAnimationFrame = function (cN8F) {
        return window.setTimeout(function () {
            try {
                cN8F(+(new Date))
            } catch (ex) {}
        }, 1000 / baV3x)
    };
    O7H.cancelRequestAnimationFrame = function (C7v) {
        window.clearTimeout(C7v);
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        k7d = c7f('nej.u'),
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        be7X = c7f('nej.h'),
        cX8P = c7f('nej.x'),
        baU3x = c7f('nej.ut.j.cb'),
        gi0x;
    if (!!a6g.sE3x) return;
    a6g.sE3x = cX8P.sE3x = function () {
        var R7K = {},
            gK0x = /^(?:mouse.*|(?:dbl)?click)$/i;
        window.onflashevent = function (d7e) {
            var C7v = decodeURIComponent(d7e.target),
                u7n = d7e.type.toLowerCase();
            var dt9k = R7K[C7v + '-on' + u7n];
            if (!!dt9k) {
                try {
                    dt9k(d7e)
                } catch (e) {}
                return
            }
            var cP8H = R7K[C7v + '-tgt'];
            if (!!cP8H && gK0x.test(u7n)) {
                bzP2x(cP8H, d7e)
            }
        };
        var blE8w = function (e7d) {
            var bI8A = a6g.B7u(e7d.parent) || document.body,
                dQ9H = a6g.bZ8R(gi0x, e7d);
            bI8A.insertAdjacentHTML(!e7d.hidden ? 'beforeEnd' : 'afterBegin', dQ9H)
        };
        var bzP2x = function (C7v, d7e) {
            var u7n = d7e.type.toLowerCase();
            requestAnimationFrame(function () {
                h7a.z7s(C7v, u7n)
            })
        };
        var cqm3x = function (hP0x) {
            return !!hP0x && !!hP0x.inited && !!hP0x.inited()
        };
        var NT0x = function (C7v) {
            var bs7l = [
                    document.embeds[C7v],
                    a6g.B7u(C7v),
                    document[C7v],
                    window[C7v]
                ],
                r7k = k7d.eC9t(bs7l, cqm3x),
                hP0x = bs7l[r7k],
                blB8t = C7v + '-count';
            R7K[blB8t]++;
            if (!!hP0x || R7K[blB8t] > 100) {
                R7K[C7v](hP0x);
                delete R7K[C7v];
                delete R7K[blB8t];
                return
            }
            window.setTimeout(NT0x.g7b(null, C7v), 300)
        };
        var cqF3x = function (e7d) {
            var C7v = e7d.id,
                cm8e = e7d.params;
            if (!cm8e) {
                cm8e = {};
                e7d.params = cm8e
            }
            var hH0x = cm8e.flashvars || '';
            hH0x += (!hH0x ? '' : '&') + ('id=' + C7v);
            if (!e7d.hidden && (!!e7d.target || be7X.bdJ4N(cm8e.wmode))) {
                var hV0x = a6g.lM1x(e7d.target) || a6g.lM1x(e7d.parent),
                    baS3x = k7d.bce4i();
                baU3x['cb' + baS3x] = bzP2x.g7b(null, hV0x);
                hH0x += '&onevent=nej.ut.j.cb.cb' + baS3x;
                R7K[C7v + '-tgt'] = hV0x
            }
            cm8e.flashvars = hH0x;
            k7d.eC9t(e7d, function (D7w, J7C) {
                if (k7d.gG0x(D7w) && J7C != 'onready') {
                    R7K[C7v + '-' + J7C] = D7w
                }
            })
        };
        return function (e7d) {
            e7d = NEJ.X({}, e7d);
            if (!e7d.src) return;
            var C7v = 'flash_' + k7d.bce4i();
            e7d.id = C7v;
            cqF3x(e7d);
            blE8w(e7d);
            if (!e7d.onready) return;
            R7K[C7v] = e7d.onready;
            R7K[C7v + '-count'] = 0;
            NT0x(C7v)
        }
    }();
    gi0x = a6g.ex9o('{var hide  = defined("hidden")&&!!hidden}{var param = defined("params")&&params||NEJ.O}{var width = !hide?width:"1px",height = !hide?height:"1px"}{if hide}<div style="position:absolute;top:0;left:0;width:1px;height:1px;z-index:10000;overflow:hidden;">{/if}<object classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"codebase = "http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"width = "${width|default:"100px"}"height = "${height|default:"100px"}" id="${id}"><param value="${src}" name="movie">{for x in param}<param value="${x}" name="${x_key}"/>{/for}<embed src="${src}" name="${id}"width="${width|default:"100px"}"height="${height|default:"100px"}"pluginspage="http://www.adobe.com/go/getflashplayer"type="application/x-shockwave-flash"{for x in param}${x_key}="${x}" {/for}></embed></object>{if hide}</div>{/if}');
    cX8P.isChange = !0
})();
(function () {
    var c7f = NEJ.P,
        iC0x = c7f('nej.c'),
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut.j'),
        baU3x = c7f('nej.ut.j.cb'),
        R7K = {},
        gI0x = +(new Date),
        blx8p;
    if (!!O7H.blm8e) return;
    baU3x['ld' + gI0x] = function (J7C, cG8y) {
        var jS1x = R7K[J7C];
        if (!jS1x) return;
        delete R7K[J7C];
        jS1x.vt4x({
            status: 200,
            result: cG8y
        })
    };
    baU3x['er' + gI0x] = function (J7C, et9k) {
        var jS1x = R7K[J7C];
        if (!jS1x) return;
        delete R7K[J7C];
        jS1x.vt4x({
            status: et9k || 0
        })
    };
    O7H.blm8e = NEJ.C();
    blx8p = O7H.blm8e.N7G(O7H.Jn8f);
    blx8p.cp8h = function (e7d) {
        var hP0x = R7K.flash;
        if (k7d.eJ9A(hP0x)) {
            hP0x.push(this.cp8h.g7b(this, e7d));
            return
        }
        if (!hP0x) {
            R7K.flash = [
                this.cp8h.g7b(this, e7d)
            ];
            a6g.sE3x({
                hidden: !0,
                src: iC0x.B7u('ajax.swf'),
                onready: function (hP0x) {
                    if (!hP0x) return;
                    var i7b = R7K.flash;
                    R7K.flash = hP0x;
                    k7d.nz2x(i7b, function (dt9k) {
                        try {
                            dt9k()
                        } catch (e) {}
                    })
                }
            });
            return
        }
        this.Ax6r = 'swf-' + k7d.nR2x();
        R7K[this.Ax6r] = this;
        var j7c = NEJ.EX({
            url: '',
            data: null,
            method: 'GET'
        }, e7d.request);
        j7c.key = this.Ax6r;
        j7c.headers = e7d.headers;
        j7c.onerror = 'nej.ut.j.cb.er' + gI0x;
        j7c.onloaded = 'nej.ut.j.cb.ld' + gI0x;
        var bCR3x = iC0x.bVo8g(j7c.url);
        if (!!bCR3x) j7c.policyURL = bCR3x;
        hP0x.request(j7c)
    };
    blx8p.kf1x = function () {
        delete R7K[this.Ax6r];
        this.vt4x({
            status: 0
        });
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        be7X = c7f('nej.h');
    be7X.bCY3x = function () {
        var dg9X = /^([\w]+?:\/\/.*?(?=\/|$))/i;
        return function (kE1x) {
            kE1x = kE1x || '';
            if (dg9X.test(kE1x)) return RegExp.$1;
            return '*'
        }
    }();
    be7X.bll8d = function (j7c) {
        return j7c
    };
    be7X.blg8Y = function (baM3x, e7d) {
        if (!baM3x.postMessage) return;
        e7d = e7d || bb7U;
        baM3x.postMessage(be7X.bll8d(e7d.data), be7X.bCY3x(e7d.origin))
    }
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut'),
        b7g;
    if (!!O7H.fI9z) return;
    O7H.fI9z = NEJ.C();
    b7g = O7H.fI9z.N7G(O7H.cI8A);
    b7g.cx8p = function () {
        this.S7L = {};
        this.cF8x()
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.Oc0x = a6g.B7u(e7d.element) || window;
        this.bEL3x(e7d.event);
        this.cqJ3x();
        this.z7s('oninit')
    };
    b7g.bD8v = function () {
        var DS7L = function (D7w, J7C, by7r) {
            if (!k7d.eJ9A(D7w)) {
                k7d.bcg4k(this.Oc0x, J7C)
            }
            delete by7r[J7C]
        };
        return function () {
            this.bG8y();
            k7d.eC9t(this.S7L, DS7L, this);
            delete this.Oc0x
        }
    }();
    b7g.baJ3x = function (F7y, u7n) {
        F7y = a6g.B7u(F7y);
        return F7y == this.Oc0x && (!u7n || !!this.S7L['on' + u7n])
    };
    b7g.bEL3x = function (d7e) {
        if (k7d.fH9y(d7e)) {
            var V7O = 'on' + d7e;
            if (!this.S7L[V7O]) {
                this.S7L[V7O] = this.cqK3x.g7b(this, d7e)
            }
            this.bFa3x(d7e);
            return
        }
        if (k7d.eJ9A(d7e)) {
            k7d.bd7W(d7e, this.bEL3x, this)
        }
    };
    b7g.bFa3x = function (u7n) {
        var d7e = 'on' + u7n,
            dt9k = this.Oc0x[d7e],
            bFf3x = this.S7L[d7e];
        if (dt9k != bFf3x) {
            this.baI3x(u7n);
            if (!!dt9k && dt9k != br7k) this.bFs3x(u7n, dt9k);
            this.Oc0x[d7e] = bFf3x
        }
    };
    b7g.bFs3x = function (u7n, dt9k, cqN3x) {
        var i7b = this.S7L[u7n];
        if (!i7b) {
            i7b = [];
            this.S7L[u7n] = i7b
        }
        if (k7d.gG0x(dt9k)) {
            !cqN3x ? i7b.push(dt9k) : i7b.unshift(dt9k)
        }
    };
    b7g.baI3x = function (u7n, dt9k) {
        var i7b = this.S7L[u7n];
        if (!i7b || !i7b.length) return;
        if (!dt9k) {
            delete this.S7L[u7n];
            return
        }
        k7d.nz2x(i7b, function (D7w, r7k, Kb9S) {
            if (dt9k === D7w) {
                Kb9S.splice(r7k, 1);
                return !0
            }
        })
    };
    b7g.cqK3x = function (u7n, d7e) {
        d7e = d7e || {
            noargs: !0
        };
        d7e.type = u7n;
        this.z7s('ondispatch', d7e);
        if (!!d7e.stopped) return;
        k7d.bd7W(this.S7L[u7n], function (dt9k) {
            try {
                dt9k(d7e)
            } catch (ex) {
                console.error(ex.message);
                console.error(ex.stack)
            }
        })
    };
    b7g.cqJ3x = function () {
        var bkM8E = function (d7e) {
            var bf7Y = d7e.args,
                u7n = bf7Y[1].toLowerCase();
            if (this.baJ3x(bf7Y[0], u7n)) {
                d7e.stopped = !0;
                this.bFa3x(u7n);
                this.bFs3x(u7n, bf7Y[2], bf7Y[3]);
                this.z7s('oneventadd', {
                    type: u7n,
                    listener: bf7Y[2]
                })
            }
        };
        var crq3x = function (d7e) {
            var bf7Y = d7e.args,
                u7n = bf7Y[1].toLowerCase();
            if (this.baJ3x(bf7Y[0], u7n)) {
                d7e.stopped = !0;
                this.baI3x(u7n, bf7Y[2])
            }
        };
        var boJ9A = function (d7e) {
            var bf7Y = d7e.args,
                u7n = (bf7Y[1] || '').toLowerCase();
            if (this.baJ3x(bf7Y[0])) {
                if (!!u7n) {
                    this.baI3x(u7n);
                    return
                }
                k7d.eC9t(this.S7L, function (D7w, J7C) {
                    if (k7d.eJ9A(D7w)) {
                        this.baI3x(J7C)
                    }
                }, this)
            }
        };
        var cry3x = function (d7e) {
            var bf7Y = d7e.args,
                u7n = bf7Y[1].toLowerCase();
            if (this.baJ3x(bf7Y[0], u7n)) {
                d7e.stopped = !0;
                bf7Y[0]['on' + u7n].apply(bf7Y[0], bf7Y.slice(2))
            }
        };
        return function () {
            if (!!this.crR3x) return;
            this.crR3x = true;
            h7a.s7l = h7a.s7l.eG9x(bkM8E.g7b(this));
            h7a.mw1x = h7a.mw1x.eG9x(crq3x.g7b(this));
            h7a.hl0x = h7a.hl0x.eG9x(boJ9A.g7b(this));
            h7a.z7s = h7a.z7s.eG9x(cry3x.g7b(this))
        }
    }()
})();
(function () {
    var c7f = NEJ.P,
        O7H = c7f('nej.p'),
        be7X = c7f('nej.h'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        I7B = c7f('nej.ut');
    if (O7H.nu2x.trident) return;
    if (!!window.postMessage) {
        be7X.bll8d = be7X.bll8d.eG9x(function (d7e) {
            d7e.stopped = !0;
            d7e.value = JSON.stringify(d7e.args[0])
        });
        return
    }
    var J7C = 'MSG|',
        kp1x = [];
    var csZ4d = function () {
        var V7O = unescape(window.name || '').trim();
        if (!V7O || V7O.indexOf(J7C) != 0) return;
        window.name = '';
        var o7h = k7d.Ro1x(V7O.replace(J7C, ''), '|'),
            kE1x = (o7h.origin || '').toLowerCase();
        if (!!kE1x && kE1x != '*' && location.href.toLowerCase().indexOf(kE1x) != 0) return;
        h7a.z7s(window, 'message', {
            data: JSON.parse(o7h.data || 'null'),
            source: window.frames[o7h.self] || o7h.self,
            origin: be7X.bCY3x(o7h.ref || document.referrer)
        })
    };
    var ctB4F = function () {
        var baD3x;
        var ctM4Q = function (by7r, r7k, i7b) {
            if (k7d.dj9a(baD3x, by7r.w) < 0) {
                baD3x.push(by7r.w);
                i7b.splice(r7k, 1);
                by7r.w.name = by7r.d
            }
        };
        return function () {
            baD3x = [];
            k7d.nz2x(kp1x, ctM4Q);
            baD3x = null
        }
    }();
    be7X.blg8Y = function () {
        var cub4f = function (j7c) {
            var o7h = {};
            j7c = j7c || bb7U;
            o7h.origin = j7c.origin || '';
            o7h.ref = location.href;
            o7h.self = j7c.source;
            o7h.data = JSON.stringify(j7c.data);
            return J7C + k7d.vC4G(o7h, '|', !0)
        };
        return be7X.blg8Y.eG9x(function (d7e) {
            d7e.stopped = !0;
            var bf7Y = d7e.args;
            kp1x.unshift({
                w: bf7Y[0],
                d: escape(cub4f(bf7Y[1]))
            })
        })
    }();
    I7B.fI9z.A7t({
        element: window,
        event: 'message'
    });
    window.setInterval(ctB4F, 100);
    window.setInterval(csZ4d, 20)
})();
(function () {
    var c7f = NEJ.P,
        be7X = c7f('nej.h'),
        a6g = c7f('nej.e'),
        v7o = c7f('nej.j');
    v7o.cuh4l = function () {
        var gM0x = window.name || '_parent',
            cuR4V = {
                gx0x: window.top,
                gM0x: window,
                bI8A: window.parent
            };
        return function (cP8H, e7d) {
            if (typeof cP8H == 'string') {
                cP8H = cuR4V[cP8H] || window.frames[cP8H];
                if (!cP8H) return this
            }
            var j7c = NEJ.X({
                origin: '*',
                source: gM0x
            }, e7d);
            be7X.blg8Y(cP8H, j7c);
            return this
        }
    }()
})();
(function () {
    var c7f = NEJ.P,
        iC0x = c7f('nej.c'),
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        O7H = c7f('nej.ut.j'),
        R7K = {},
        bax3x;
    if (!!O7H.bks8k) return;
    O7H.bks8k = NEJ.C();
    bax3x = O7H.bks8k.N7G(O7H.Jn8f);
    bax3x.cx8p = function () {
        var fd9U = 'NEJ-AJAX-DATA:',
            Ef7Y = !1;
        var bkr8j = function (d7e) {
            var j7c = d7e.data;
            if (j7c.indexOf(fd9U) != 0) return;
            j7c = JSON.parse(j7c.replace(fd9U, ''));
            var jS1x = R7K[j7c.key];
            if (!jS1x) return;
            delete R7K[j7c.key];
            j7c.result = decodeURIComponent(j7c.result || '');
            jS1x.vt4x(j7c)
        };
        var bkq8i = function () {
            if (!Ef7Y) {
                Ef7Y = !0;
                h7a.s7l(window, 'message', bkr8j)
            }
        };
        return function () {
            this.cF8x();
            bkq8i()
        }
    }();
    bax3x.cp8h = function (e7d) {
        var gf0x = e7d.request,
            jS1x = iC0x.bVn8f(gf0x.url),
            ei9Z = R7K[jS1x];
        if (k7d.eJ9A(ei9Z)) {
            ei9Z.push(this.cp8h.g7b(this, e7d));
            return
        }
        if (!ei9Z) {
            R7K[jS1x] = [
                this.cp8h.g7b(this, e7d)
            ];
            a6g.bdC4G({
                src: jS1x,
                visible: !1,
                onload: function (d7e) {
                    var i7b = R7K[jS1x];
                    R7K[jS1x] = h7a.W7P(d7e).contentWindow;
                    k7d.nz2x(i7b, function (dt9k) {
                        try {
                            dt9k()
                        } catch (e) {}
                    })
                }
            });
            return
        }
        this.Ax6r = 'frm-' + k7d.nR2x();
        R7K[this.Ax6r] = this;
        var j7c = NEJ.EX({
            url: '',
            data: null,
            timeout: 0,
            method: 'GET'
        }, gf0x);
        j7c.key = this.Ax6r;
        j7c.headers = e7d.headers;
        v7o.cuh4l(R7K[jS1x], {
            data: j7c
        })
    };
    bax3x.kf1x = function () {
        delete R7K[this.Ax6r];
        this.vt4x({
            status: 0
        });
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        eo9f = c7f('nej.g'),
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        O7H = c7f('nej.ut.j'),
        R7K = {},
        Kh9Y;
    if (!!O7H.bkl8d) return;
    O7H.bkl8d = NEJ.C();
    Kh9Y = O7H.bkl8d.N7G(O7H.Jn8f);
    Kh9Y.cx8p = function () {
        var fd9U = 'NEJ-UPLOAD-RESULT:',
            Ef7Y = !1;
        var bkr8j = function (d7e) {
            var j7c = d7e.data;
            if (j7c.indexOf(fd9U) != 0) return;
            j7c = JSON.parse(j7c.replace(fd9U, ''));
            var jS1x = R7K[j7c.key];
            if (!jS1x) return;
            delete R7K[j7c.key];
            jS1x.vt4x(decodeURIComponent(j7c.result))
        };
        var bkq8i = function () {
            if (!Ef7Y) {
                Ef7Y = !0;
                h7a.s7l(window, 'message', bkr8j)
            }
        };
        return function () {
            this.cF8x();
            bkq8i()
        }
    }();
    Kh9Y.bD8v = function () {
        this.bG8y();
        a6g.cJ8B(this.bjZ7S);
        delete this.bjZ7S;
        window.clearTimeout(this.ed9U);
        delete this.ed9U
    };
    Kh9Y.vt4x = function (cG8y) {
        var Q7J;
        try {
            Q7J = JSON.parse(cG8y);
            this.z7s('onload', Q7J)
        } catch (e) {
            this.z7s('onerror', {
                code: eo9f.bVt8l,
                message: cG8y
            })
        }
    };
    Kh9Y.cp8h = function () {
        var cuU4Y = function () {
            var mq1x,
                cG8y;
            try {
                var mq1x = this.bjZ7S.contentWindow.document.body,
                    cG8y = mq1x.innerText || mq1x.textContent
            } catch (e) {
                return
            }
            this.vt4x(cG8y)
        };
        var bjW7P = function (Y7R, fg9X, rD3x) {
            v7o.bn7g(Y7R, {
                type: 'json',
                method: 'POST',
                cookie: rD3x,
                mode: parseInt(fg9X) || 0,
                onload: function (j7c) {
                    if (!this.ed9U) return;
                    this.z7s('onuploading', j7c);
                    this.ed9U = window.setTimeout(bjW7P.g7b(this, Y7R, fg9X, rD3x), 1000)
                }.g7b(this),
                onerror: function (cb8T) {
                    if (!this.ed9U) return;
                    this.ed9U = window.setTimeout(bjW7P.g7b(this, Y7R, fg9X, rD3x), 1000)
                }.g7b(this)
            })
        };
        return function (e7d) {
            var gf0x = e7d.request,
                oU2x = e7d.headers,
                fj9a = gf0x.data,
                V7O = 'fom-' + k7d.nR2x();
            R7K[V7O] = this;
            fj9a.target = V7O;
            fj9a.method = 'POST';
            fj9a.enctype = eo9f.Ff7Y;
            fj9a.encoding = eo9f.Ff7Y;
            var Y7R = fj9a.action || '',
                lx1x = Y7R.indexOf('?') <= 0 ? '?' : '&';
            fj9a.action = Y7R + lx1x + '_proxy_=form';
            this.bjZ7S = a6g.bdC4G({
                name: V7O,
                onload: function (d7e) {
                    var ei9Z = h7a.W7P(d7e);
                    h7a.s7l(ei9Z, 'load', cuU4Y.g7b(this));
                    fj9a.submit();
                    var bKQ5V = (fj9a.nej_query || bb7U).value;
                    if (!bKQ5V) return;
                    var fg9X = (fj9a.nej_mode || bb7U).value,
                        rD3x = (fj9a.nej_cookie || bb7U).value == 'true';
                    this.ed9U = window.setTimeout(bjW7P.g7b(this, bKQ5V, fg9X, rD3x), 100)
                }.g7b(this)
            })
        }
    }();
    Kh9Y.kf1x = function () {
        this.z7s('onerror', {
            code: eo9f.bVx8p,
            message: '客户端终止文件上传'
        });
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        be7X = c7f('nej.h'),
        O7H = c7f('nej.ut.j');
    be7X.bnU9L = function () {
        return new XMLHttpRequest
    };
    be7X.bjU7N = function (fg9X, bam3x, e7d) {
        var by7r = !!bam3x ? {
            2: O7H.bkl8d
        } : {
            2: O7H.bks8k,
            3: O7H.blm8e
        };
        return (by7r[fg9X] || O7H.bbI4M).A7t(e7d)
    }
})();
(function () {
    var c7f = NEJ.P,
        O7H = c7f('nej.p'),
        be7X = c7f('nej.h');
    if (O7H.nu2x.trident) return;
    be7X.bnU9L = function () {
        var NK0x = [
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.3.0',
            'Msxml2.XMLHTTP.4.0',
            'Msxml2.XMLHTTP.5.0',
            'MSXML2.XMLHTTP',
            'Microsoft.XMLHTTP'
        ];
        var cuV4Z = function () {
            for (var i = 0, l = NK0x.length; i < l; i++) {
                try {
                    return new ActiveXObject(NK0x[i])
                } catch (e) {}
            }
            return null
        };
        return be7X.bnU9L.eG9x(function (d7e) {
            if (!!window.XMLHttpRequest) return;
            d7e.stopped = !0;
            d7e.value = cuV4Z()
        })
    }();
    be7X.bjU7N = function () {
        var Fm7f = {
            0: 2,
            1: 3
        };
        return be7X.bjU7N.eG9x(function (d7e) {
            var bf7Y = d7e.args,
                fg9X = bf7Y[0] || 0;
            bf7Y[0] = !!bf7Y[1] ? 2 : Fm7f[fg9X] || fg9X
        })
    }()
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        be7X = c7f('nej.h'),
        eo9f = c7f('nej.g'),
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        O7H = c7f('nej.ut.j'),
        ol2x = {},
        Ib8T = br7k;
    v7o.kf1x = function (fh9Y) {
        var R7K = ol2x[fh9Y];
        if (!R7K) return this;
        R7K.req.kf1x();
        return this
    };
    v7o.beP5U = function (dX9O) {
        Ib8T = dX9O || br7k;
        return this
    };
    v7o.bn7g = function () {
        var jG1x = (location.protocol + '//' + location.host).toLowerCase();
        var cvb4f = function (Y7R) {
            var kE1x = k7d.chW1x(Y7R);
            return !!kE1x && kE1x != jG1x
        };
        var cvc4g = function (oU2x) {
            return (oU2x || bb7U)[eo9f.zI5N] == eo9f.Ff7Y
        };
        var cve4i = function (e7d) {
            var bam3x = cvc4g(e7d.headers);
            if (!cvb4f(e7d.url) && !bam3x) return O7H.bbI4M.A7t(e7d);
            return be7X.bjU7N(e7d.mode, bam3x, e7d)
        };
        var DS7L = function (fh9Y) {
            var R7K = ol2x[fh9Y];
            if (!R7K) return;
            if (!!R7K.req) R7K.req.T7M();
            delete ol2x[fh9Y]
        };
        var bNO5T = function (fh9Y, u7n) {
            var R7K = ol2x[fh9Y];
            if (!R7K) return;
            DS7L(fh9Y);
            try {
                var d7e = {
                    type: u7n,
                    result: arguments[2]
                };
                Ib8T(d7e);
                if (!d7e.stopped)(R7K[u7n] || br7k)(d7e.result)
            } catch (ex) {
                console.error(ex.message);
                console.error(ex)
            }
        };
        var yJ5O = function (fh9Y, j7c) {
            bNO5T(fh9Y, 'onload', j7c)
        };
        var Ar6l = function (fh9Y, cb8T) {
            bNO5T(fh9Y, 'onerror', cb8T)
        };
        return function (Y7R, e7d) {
            e7d = e7d || {};
            var fh9Y = k7d.nR2x(),
                R7K = {
                    onload: e7d.onload || br7k,
                    onerror: e7d.onerror || br7k
                };
            ol2x[fh9Y] = R7K;
            e7d.onload = yJ5O.g7b(null, fh9Y);
            e7d.onerror = Ar6l.g7b(null, fh9Y);
            if (!!e7d.query) {
                var lx1x = Y7R.indexOf('?') < 0 ? '?' : '&',
                    bv7o = e7d.query;
                if (k7d.ly1x(bv7o)) bv7o = k7d.cC8u(bv7o);
                if (!!bv7o) Y7R += lx1x + bv7o
            }
            e7d.url = Y7R;
            R7K.req = cve4i(e7d);
            R7K.req.bnZ9Q(e7d.data);
            return fh9Y
        }
    }();
    v7o.gT0x = function (fj9a, e7d) {
        var dK9B = {
            mode: 0,
            type: 'json',
            query: null,
            cookie: !1,
            headers: {},
            onload: null,
            onerror: null,
            onuploading: null,
            onbeforerequest: null
        };
        NEJ.EX(dK9B, e7d);
        dK9B.data = fj9a;
        dK9B.method = 'POST';
        dK9B.timeout = 0;
        dK9B.headers[eo9f.zI5N] = eo9f.Ff7Y;
        return v7o.bn7g(fj9a.action, dK9B)
    }
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        eo9f = c7f('nej.g'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        O7H = c7f('nej.ut.j'),
        mo1x,
        gQ0x = 60000;
    if (!!O7H.OK0x) return;
    O7H.OK0x = NEJ.C();
    mo1x = O7H.OK0x.N7G(I7B.cI8A);
    mo1x.cx8p = function () {
        this.cF8x();
        this.OO0x = {
            onerror: this.cvf4j.g7b(this),
            onloaded: this.cvg4k.g7b(this)
        };
        if (!this.constructor.S7L) this.constructor.S7L = {
            loaded: {}
        }
    };
    mo1x.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.Kr9i = e7d.version;
        this.bjk7d = e7d.timeout;
        this.OO0x.version = this.Kr9i;
        this.OO0x.timeout = this.bjk7d
    };
    mo1x.bRZ7S = function (J7C) {
        delete this.constructor.S7L[J7C]
    };
    mo1x.Di7b = function (J7C) {
        return this.constructor.S7L[J7C]
    };
    mo1x.bSB7u = function (J7C, j7c) {
        this.constructor.S7L[J7C] = j7c
    };
    mo1x.bac3x = br7k;
    mo1x.bSH7A = function (gf0x) {
        h7a.hl0x(gf0x)
    };
    mo1x.bjd7W = function (gf0x) {
        gf0x.src = this.kO1x;
        document.head.appendChild(gf0x)
    };
    mo1x.CY6S = function () {
        var R7K = this.Di7b(this.kO1x);
        if (!R7K) return;
        window.clearTimeout(R7K.timer);
        this.bSH7A(R7K.request);
        delete R7K.bind;
        delete R7K.timer;
        delete R7K.request;
        this.bRZ7S(this.kO1x);
        this.Di7b('loaded')[this.kO1x] = !0
    };
    mo1x.ZX3x = function (V7O) {
        var R7K = this.Di7b(this.kO1x);
        if (!R7K) return;
        var i7b = R7K.bind;
        this.CY6S();
        if (!!i7b && i7b.length > 0) {
            var cz8r;
            while (i7b.length) {
                cz8r = i7b.shift();
                try {
                    cz8r.z7s(V7O, arguments[1])
                } catch (ex) {
                    console.error(ex.message);
                    console.error(ex.stack)
                }
                cz8r.T7M()
            }
        }
    };
    mo1x.eI9z = function (cb8T) {
        this.ZX3x('onerror', cb8T)
    };
    mo1x.bTD8v = function () {
        this.ZX3x('onloaded')
    };
    mo1x.cvh4l = function (Y7R) {
        this.constructor.A7t(this.OO0x).Kt9k(Y7R)
    };
    mo1x.bUe8W = function (cb8T) {
        var R7K = this.Di7b(this.xe5j);
        if (!R7K) return;
        if (!!cb8T) R7K.error++;
        R7K.loaded++;
        if (R7K.loaded < R7K.total) return;
        this.bRZ7S(this.xe5j);
        this.z7s(R7K.error > 0 ? 'onerror' : 'onloaded')
    };
    mo1x.cvf4j = function (cb8T) {
        this.bUe8W(!0)
    };
    mo1x.cvg4k = function () {
        this.bUe8W()
    };
    mo1x.Kt9k = function (Y7R) {
        Y7R = k7d.bqb0x(Y7R);
        if (!Y7R) {
            this.z7s('onerror', {
                code: eo9f.bwB1x,
                message: '请指定要载入的资源地址！'
            });
            return this
        }
        this.kO1x = Y7R;
        if (!!this.Kr9i) this.kO1x += (this.kO1x.indexOf('?') < 0 ? '?' : '&') + this.Kr9i;
        if (this.Di7b('loaded')[this.kO1x]) {
            try {
                this.z7s('onloaded')
            } catch (ex) {
                console.error(ex.message);
                console.error(ex.stack)
            }
            this.T7M();
            return this
        }
        var R7K = this.Di7b(this.kO1x),
            gf0x;
        if (!!R7K) {
            R7K.bind.unshift(this);
            R7K.timer = window.clearTimeout(R7K.timer)
        } else {
            gf0x = this.bac3x();
            R7K = {
                request: gf0x,
                bind: [
                    this
                ]
            };
            this.bSB7u(this.kO1x, R7K);
            h7a.s7l(gf0x, 'load', this.bTD8v.g7b(this));
            h7a.s7l(gf0x, 'error', this.eI9z.g7b(this, {
                code: eo9f.bwn1x,
                message: '无法加载指定资源文件[' + this.kO1x + ']！'
            }))
        }
        if (this.bjk7d != 0) R7K.timer = window.setTimeout(this.eI9z.g7b(this, {
            code: eo9f.bSX8P,
            message: '指定资源文件[' + this.kO1x + ']载入超时！'
        }), this.bjk7d || gQ0x);
        if (!!gf0x) this.bjd7W(gf0x);
        this.z7s('onloading');
        return this
    };
    mo1x.bUn8f = function (i7b) {
        if (!i7b || !i7b.length) {
            this.z7s('onerror', {
                code: eo9f.bwB1x,
                message: '请指定要载入的资源队列！'
            });
            return this
        }
        this.xe5j = k7d.nR2x();
        var R7K = {
            error: 0,
            loaded: 0,
            total: i7b.length
        };
        this.bSB7u(this.xe5j, R7K);
        for (var i = 0, l = i7b.length; i < l; i++) {
            if (!i7b[i]) {
                R7K.total--;
                continue
            }
            this.cvh4l(i7b[i])
        }
        this.z7s('onloading');
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        be7X = c7f('nej.h'),
        O7H = c7f('nej.ut.j'),
        Pe0x;
    if (!!O7H.biJ7C) return;
    O7H.biJ7C = NEJ.C();
    Pe0x = O7H.biJ7C.N7G(O7H.OK0x);
    Pe0x.bac3x = function () {
        var eN9E = a6g.dh9Y('iframe');
        eN9E.width = 0;
        eN9E.height = 0;
        eN9E.style.display = 'none';
        return eN9E
    };
    Pe0x.bjd7W = function (gf0x) {
        gf0x.src = this.kO1x;
        document.body.appendChild(gf0x)
    };
    Pe0x.eI9z = function (cb8T) {
        var eN9E = (this.Di7b(this.kO1x) || bb7U).request;
        this.ZX3x('onerror', cb8T);
        be7X.bdF4J(eN9E)
    };
    Pe0x.bTD8v = function () {
        var mq1x = null,
            eN9E = (this.Di7b(this.kO1x) || bb7U).request;
        try {
            mq1x = eN9E.contentWindow.document.body
        } catch (ex) {}
        this.ZX3x('onloaded', mq1x);
        be7X.bdF4J(eN9E)
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        O7H = c7f('nej.ut.j'),
        biH7A;
    if (!!O7H.ZP3x) return;
    O7H.ZP3x = NEJ.C();
    biH7A = O7H.ZP3x.N7G(O7H.OK0x);
    biH7A.bac3x = function () {
        return a6g.dh9Y('link')
    };
    biH7A.bjd7W = function (gf0x) {
        gf0x.href = this.kO1x;
        document.head.appendChild(gf0x)
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        O7H = c7f('nej.ut.j'),
        ZM3x;
    if (!!O7H.ZL3x) return;
    O7H.ZL3x = NEJ.C();
    ZM3x = O7H.ZL3x.N7G(O7H.OK0x);
    ZM3x.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.bxA2x = e7d.async;
        this.biu7n = e7d.charset;
        this.OO0x.async = !1;
        this.OO0x.charset = this.biu7n
    };
    ZM3x.bac3x = function () {
        var gf0x = a6g.dh9Y('script');
        if (this.bxA2x != null) gf0x.async = !!this.bxA2x;
        if (this.biu7n != null) gf0x.charset = this.biu7n;
        return gf0x
    };
    ZM3x.bSH7A = function (gf0x) {
        a6g.cJ8B(gf0x)
    }
})();
(function () {
    var c7f = NEJ.P,
        v7o = c7f('nej.j'),
        O7H = c7f('nej.ut.j');
    v7o.cvq4u = function (Y7R, e7d) {
        O7H.ZL3x.A7t(e7d).Kt9k(Y7R);
        return this
    };
    v7o.cvs4w = function (i7b, e7d) {
        O7H.ZL3x.A7t(e7d).bUn8f(i7b);
        return this
    };
    v7o.cEV6P = function (Y7R, e7d) {
        O7H.ZP3x.A7t(e7d).Kt9k(Y7R);
        return this
    };
    v7o.cwk4o = function (i7b, e7d) {
        O7H.ZP3x.A7t(e7d).bUn8f(i7b);
        return this
    };
    v7o.bzv2x = function (Y7R, e7d) {
        O7H.biJ7C.A7t(e7d).Kt9k(Y7R);
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        I7B = c7f('nej.ut'),
        R7K = {},
        sT3x = +(new Date) + '-';
    a6g.da8S = function () {
        var cH8z = 0;
        var Pj0x = function () {
            if (cH8z > 0) return;
            cH8z = 0;
            h7a.z7s(document, 'templateready');
            h7a.hl0x(document, 'templateready')
        };
        var ZH3x = function (gh0x, e7d) {
            var cR8J = a6g.t7m(gh0x, 'src');
            if (!cR8J) return;
            e7d = e7d || bb7U;
            var fV0x = e7d.root;
            if (!fV0x) {
                fV0x = gh0x.ownerDocument.location.href
            } else {
                fV0x = k7d.bqb0x(fV0x)
            }
            cR8J = cR8J.split(',');
            k7d.bd7W(cR8J, function (D7w, r7k, i7b) {
                i7b[r7k] = k7d.bqb0x(D7w, fV0x)
            });
            return cR8J
        };
        var cwn4r = function (gh0x, e7d) {
            if (!gh0x) return;
            var cR8J = ZH3x(gh0x, e7d);
            if (!!cR8J) v7o.cwk4o(cR8J, {
                version: a6g.t7m(gh0x, 'version')
            });
            a6g.bIy4C(gh0x.value)
        };
        var cwo4s = function (D7w) {
            cH8z--;
            a6g.bIS4W(D7w);
            Pj0x()
        };
        var cwr4v = function (gh0x, e7d) {
            if (!gh0x) return;
            var cR8J = ZH3x(gh0x, e7d),
                eQ9H = gh0x.value;
            if (!!cR8J) {
                cH8z++;
                var e7d = {
                    version: a6g.t7m(gh0x, 'version'),
                    onloaded: cwo4s.g7b(null, eQ9H)
                };
                window.setTimeout(v7o.cvs4w.g7b(v7o, cR8J, e7d), 0);
                return
            }
            a6g.bIS4W(eQ9H)
        };
        var cws4w = function (mq1x) {
            cH8z--;
            a6g.da8S(mq1x);
            Pj0x()
        };
        var cwt4x = function (gh0x, e7d) {
            if (!gh0x) return;
            var cR8J = ZH3x(gh0x, e7d)[0];
            if (!!cR8J) {
                cH8z++;
                var e7d = {
                    version: a6g.t7m(gh0x, 'version'),
                    onloaded: cws4w
                };
                window.setTimeout(v7o.bzv2x.g7b(v7o, cR8J, e7d), 0)
            }
        };
        var cwI4M = function (C7v, cG8y) {
            cH8z--;
            a6g.Kv9m(C7v, cG8y || '');
            Pj0x()
        };
        var cwJ5O = function (gh0x, e7d) {
            if (!gh0x || !gh0x.id) return;
            var C7v = gh0x.id,
                cR8J = ZH3x(gh0x, e7d)[0];
            if (!!cR8J) {
                cH8z++;
                var Y7R = cR8J + (cR8J.indexOf('?') < 0 ? '?' : '&') + (a6g.t7m(gh0x, 'version') || ''),
                    e7d = {
                        type: 'text',
                        method: 'GET',
                        onload: cwI4M.g7b(null, C7v)
                    };
                window.setTimeout(v7o.bn7g.g7b(v7o, Y7R, e7d), 0)
            }
        };
        var cxH5M = function (f7c, e7d) {
            var u7n = f7c.name.toLowerCase();
            switch (u7n) {
            case 'jst':
                a6g.ex9o(f7c, !0);
                return;
            case 'txt':
                a6g.Kv9m(f7c.id, f7c.value || '');
                return;
            case 'ntp':
                a6g.ir0x(f7c.value || '', f7c.id);
                return;
            case 'js':
                cwr4v(f7c, e7d);
                return;
            case 'css':
                cwn4r(f7c, e7d);
                return;
            case 'html':
                cwt4x(f7c, e7d);
                return;
            case 'res':
                cwJ5O(f7c, e7d);
                return
            }
        };
        I7B.fI9z.A7t({
            element: document,
            event: 'templateready',
            oneventadd: Pj0x
        });
        return function (F7y, e7d) {
            F7y = a6g.B7u(F7y);
            if (!!F7y) {
                var i7b = F7y.tagName == 'TEXTAREA' ? [
                    F7y
                ] : F7y.getElementsByTagName('textarea');
                k7d.bd7W(i7b, function (f7c) {
                    cxH5M(f7c, e7d)
                });
                a6g.cJ8B(F7y, !0)
            }
            Pj0x();
            return this
        }
    }();
    a6g.Kv9m = function (J7C, D7w) {
        R7K[J7C] = D7w || '';
        return this
    };
    a6g.iL0x = function (J7C) {
        return R7K[J7C] || ''
    };
    a6g.ir0x = function (F7y, J7C) {
        J7C = J7C || k7d.nR2x();
        F7y = a6g.B7u(F7y) || F7y;
        a6g.Kv9m(sT3x + J7C, F7y);
        a6g.mT2x(F7y);
        return J7C
    };
    a6g.dy9p = function (J7C) {
        if (!J7C) return null;
        J7C = sT3x + J7C;
        var D7w = a6g.iL0x(J7C);
        if (!D7w) return null;
        if (k7d.fH9y(D7w)) {
            D7w = a6g.on2x(D7w);
            a6g.Kv9m(J7C, D7w)
        }
        return D7w.cloneNode(!0)
    };
    a6g.Cq6k = function () {
        var Ib8T = function (D7w, J7C) {
            return J7C == 'offset' || J7C == 'limit'
        };
        return function (i7b, p7i, e7d) {
            var bs7l = [];
            if (!i7b || !i7b.length || !p7i) return bs7l;
            e7d = e7d || bb7U;
            var dq9h = i7b.length,
                jW1x = parseInt(e7d.offset) || 0,
                fQ9H = Math.min(dq9h, jW1x + (parseInt(e7d.limit) || dq9h)),
                cq8i = {
                    total: i7b.length,
                    range: [
                        jW1x,
                        fQ9H
                    ]
                };
            NEJ.X(cq8i, e7d, Ib8T);
            for (var i = jW1x, cz8r; i < fQ9H; i++) {
                cq8i.index = i;
                cq8i.data = i7b[i];
                cz8r = p7i.A7t(cq8i);
                var C7v = cz8r.FK7D();
                R7K[C7v] = cz8r;
                cz8r.T7M = cz8r.T7M.eG9x(function (C7v, cz8r) {
                    delete R7K[C7v];
                    delete cz8r.T7M
                }.g7b(null, C7v, cz8r));
                bs7l.push(cz8r)
            }
            return bs7l
        }
    }();
    a6g.bCS3x = function (C7v) {
        return R7K[C7v]
    };
    a6g.cEF6z = function (ea9R, e7d) {
        e7d = e7d || bb7U;
        a6g.da8S(e7d.tid || 'template-box');
        h7a.s7l(document, 'templateready', function () {
            ea9R.A7t().z7s('onshow', e7d)
        })
    };
    c7f('dbg').dumpTC = function () {
        return R7K
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        O7H = c7f('nej.ui'),
        b7g;
    if (!!O7H.eg9X) return;
    O7H.eg9X = NEJ.C();
    b7g = O7H.eg9X.N7G(I7B.cI8A);
    b7g.cx8p = function () {
        this.cF8x();
        a6g.bAr2x();
        this.cf8X();
        this.bW8O()
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.cxQ5V(e7d.clazz);
        this.bDI3x(e7d.parent)
    };
    b7g.bD8v = function () {
        this.bG8y();
        this.bDR3x();
        delete this.ge0x;
        a6g.mT2x(this.n7g);
        a6g.x7q(this.n7g, this.bhZ7S);
        delete this.bhZ7S
    };
    b7g.cf8X = br7k;
    b7g.bW8O = function () {
        if (!this.ce8W) this.Ky9p();
        this.n7g = a6g.dy9p(this.ce8W);
        if (!this.n7g) this.n7g = a6g.dh9Y('div', this.me1x);
        a6g.y7r(this.n7g, this.me1x)
    };
    b7g.Ky9p = br7k;
    b7g.cxQ5V = function (dZ9Q) {
        this.bhZ7S = dZ9Q || '';
        a6g.y7r(this.n7g, this.bhZ7S)
    };
    b7g.cyP5U = function () {
        if (!this.me1x) return;
        a6g.y7r(this.ge0x, this.me1x + '-parent')
    };
    b7g.bDR3x = function () {
        if (!this.me1x) return;
        a6g.x7q(this.ge0x, this.me1x + '-parent')
    };
    b7g.lA1x = function () {
        return this.n7g
    };
    b7g.bDI3x = function (bI8A) {
        if (!this.n7g) return this;
        this.bDR3x();
        if (k7d.gG0x(bI8A)) {
            this.ge0x = bI8A(this.n7g)
        } else {
            this.ge0x = a6g.B7u(bI8A);
            if (!!this.ge0x) this.ge0x.appendChild(this.n7g)
        }
        this.cyP5U();
        return this
    };
    b7g.L7E = function () {
        if (!this.ge0x || !this.n7g || this.n7g.parentNode == this.ge0x) return this;
        this.ge0x.appendChild(this.n7g);
        return this
    };
    b7g.bt7m = function () {
        a6g.mT2x(this.n7g);
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        be7X = c7f('nej.h'),
        O7H = c7f('nej.ui'),
        wP5U,
        bFg3x;
    if (!!O7H.Pu0x) return;
    O7H.Pu0x = NEJ.C();
    wP5U = O7H.Pu0x.N7G(O7H.eg9X);
    bFg3x = O7H.Pu0x.ct8l;
    wP5U.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.wJ5O('oncontentready', e7d.oncontentready || this.cyW5b.g7b(this));
        this.czf5k = !!e7d.nohack;
        this.czg5l = !!e7d.destroyable;
        this.KA9r(e7d.content)
    };
    wP5U.bD8v = function () {
        this.z7s('onbeforerecycle');
        this.bG8y();
        this.ZC3x();
        this.KA9r('');
        a6g.fb9S(this.n7g, {
            top: '',
            left: ''
        })
    };
    wP5U.cyW5b = br7k;
    wP5U.KC9t = br7k;
    wP5U.ZC3x = function () {
        a6g.mT2x(this.n7g);
        if (!!this.nS2x) {
            this.nS2x = be7X.buT1x(this.n7g);
            delete this.nS2x
        }
    };
    wP5U.KA9r = function (bo7h) {
        if (!this.n7g || !this.BT6N || bo7h == null) return this;
        bo7h = bo7h || '';
        k7d.fH9y(bo7h) ? this.BT6N.innerHTML = bo7h : this.BT6N.appendChild(bo7h);
        this.z7s('oncontentready', this.BT6N);
        return this
    };
    wP5U.gJ0x = function (bi7b) {
        var D7w = bi7b.top;
        if (D7w != null) {
            D7w += 'px';
            a6g.ba7T(this.n7g, 'top', D7w);
            a6g.ba7T(this.nS2x, 'top', D7w)
        }
        var D7w = bi7b.left;
        if (D7w != null) {
            D7w += 'px';
            a6g.ba7T(this.n7g, 'left', D7w);
            a6g.ba7T(this.nS2x, 'left', D7w)
        }
        return this
    };
    wP5U.L7E = function () {
        a6g.ba7T(this.n7g, 'visibility', 'hidden');
        bFg3x.L7E.apply(this, arguments);
        this.KC9t();
        a6g.ba7T(this.n7g, 'visibility', '');
        if (!this.czf5k) {
            this.nS2x = be7X.nS2x(this.n7g)
        }
        return this
    };
    wP5U.bt7m = function () {
        this.czg5l ? this.T7M() : this.ZC3x();
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        k7d = c7f('nej.u'),
        a6g = c7f('nej.e'),
        O7H = c7f('nej.ui'),
        BL6F;
    if (!!O7H.ZA3x) return;
    O7H.ZA3x = NEJ.C();
    BL6F = O7H.ZA3x.N7G(O7H.eg9X);
    BL6F.bk7d = function (e7d) {
        this.PC0x();
        this.bm7f(this.cAf5k(e7d));
        this.cd8V.onbeforerecycle = this.T7M.g7b(this);
        this.oI2x = this.bhG6A()
    };
    BL6F.bD8v = function () {
        this.z7s('onbeforerecycle');
        this.bG8y();
        delete this.cd8V;
        a6g.mT2x(this.n7g);
        var Bu6o = this.oI2x;
        if (!!Bu6o) {
            delete this.oI2x;
            Bu6o.T7M()
        }
    };
    BL6F.bhG6A = br7k;
    BL6F.cAf5k = function (e7d) {
        var o7h = {};
        k7d.eC9t(e7d, function (p7i, J7C) {
            this.cd8V.hasOwnProperty(J7C) ? this.cd8V[J7C] = p7i : o7h[J7C] = p7i
        }, this);
        return o7h
    };
    BL6F.PC0x = function () {
        this.cd8V = {
            clazz: '',
            parent: null,
            content: this.n7g,
            destroyable: !1,
            oncontentready: null,
            nohack: !1
        }
    };
    BL6F.L7E = function () {
        if (!!this.oI2x) this.oI2x.L7E();
        this.z7s('onaftershow');
        return this
    };
    BL6F.bt7m = function () {
        if (!!this.oI2x) this.oI2x.bt7m();
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        eo9f = c7f('nej.g'),
        be7X = c7f('nej.h'),
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        O7H = c7f('nej.ui'),
        PF0x,
        bIc4g;
    if (!!O7H.KD9u) return;
    var iR0x = a6g.sW3x('.#<uispace>{position:fixed;_position:absolute;z-index:100;top:0;bottom:0;left:0;right:0;width:100%;height:100%;background-image:url(' + eo9f.bwc1x + ');}');
    O7H.KD9u = NEJ.C();
    PF0x = O7H.KD9u.N7G(O7H.eg9X);
    bIc4g = O7H.KD9u.ct8l;
    PF0x.bk7d = function (e7d) {
        this.bm7f(e7d);
        var bo7h = e7d.content || '&nbsp;';
        k7d.fH9y(bo7h) ? this.n7g.innerHTML = bo7h : this.n7g.appendChild(bo7h)
    };
    PF0x.bD8v = function () {
        this.bG8y();
        this.n7g.innerHTML = '&nbsp;'
    };
    PF0x.cf8X = function () {
        this.me1x = iR0x
    };
    PF0x.L7E = function () {
        be7X.buX1x(this.n7g);
        bIc4g.L7E.apply(this, arguments);
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        O7H = c7f('nej.ut'),
        wB4F;
    if (!!O7H.uJ4N) return;
    O7H.uJ4N = NEJ.C();
    wB4F = O7H.uJ4N.N7G(O7H.cI8A);
    wB4F.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.cAg5l = !!e7d.overflow;
        this.n7g = a6g.B7u(e7d.body);
        this.Be6Y = a6g.B7u(e7d.view) || a6g.bFo3x(this.n7g);
        this.bJG4K = a6g.B7u(e7d.mbar) || this.n7g;
        this.Zu3x = parseInt(e7d.direction) || 0;
        if (!!e7d.isRelative) {
            this.n7g.style.position = 'relative';
            this.bht6n = true;
            this.bhq6k()
        }
        this.bX8P([
            [document,
                'mouseup',
                this.bho6i.g7b(this)
            ],
            [
                document,
                'mousemove',
                this.bhk6e.g7b(this)
            ],
            [
                this.bJG4K,
                'mousedown',
                this.PK0x.g7b(this)
            ]
        ])
    };
    wB4F.bhq6k = function () {
        if (!!this.bht6n) {
            this.KI9z = a6g.hR0x(this.n7g, this.Be6Y);
            this.KI9z.x -= parseInt(a6g.de9V(this.n7g, 'left')) || 0;
            this.KI9z.y -= parseInt(a6g.de9V(this.n7g, 'top')) || 0
        }
    };
    wB4F.bD8v = function () {
        this.bG8y();
        delete this.n7g;
        delete this.bJG4K;
        delete this.Be6Y
    };
    wB4F.bgR5W = function () {
        return {
            x: Math.max(this.Be6Y.clientWidth, this.Be6Y.scrollWidth) - this.n7g.offsetWidth,
            y: Math.max(this.Be6Y.clientHeight, this.Be6Y.scrollHeight) - this.n7g.offsetHeight
        }
    };
    wB4F.PK0x = function (d7e) {
        h7a.bh7a(d7e);
        if (!!this.hQ0x) return;
        this.hQ0x = {
            x: h7a.jA1x(d7e),
            y: h7a.mf1x(d7e)
        };
        this.bKL5Q = this.bgR5W();
        this.z7s('ondragstart', d7e)
    };
    wB4F.bhk6e = function (d7e) {
        if (!this.hQ0x) return;
        var bi7b = {
            x: h7a.jA1x(d7e),
            y: h7a.mf1x(d7e)
        };
        var pS2x = bi7b.x - this.hQ0x.x,
            pR2x = bi7b.y - this.hQ0x.y,
            D7w = {
                top: (parseInt(a6g.de9V(this.n7g, 'top')) || 0) + pR2x,
                left: (parseInt(a6g.de9V(this.n7g, 'left')) || 0) + pS2x
            };
        if (this.bht6n) {
            this.bhq6k();
            D7w.top = D7w.top + this.KI9z.y;
            D7w.left = D7w.left + this.KI9z.x
        }
        this.hQ0x = bi7b;
        this.gJ0x(D7w)
    };
    wB4F.bho6i = function (d7e) {
        if (!this.hQ0x) return;
        delete this.bKL5Q;
        delete this.hQ0x;
        this.z7s('ondragend', this.bgP5U())
    };
    wB4F.gJ0x = function (d7e) {
        if (!this.cAg5l) {
            var bLy5D = this.bKL5Q || this.bgR5W();
            d7e.top = Math.min(bLy5D.y, Math.max(0, d7e.top));
            d7e.left = Math.min(bLy5D.x, Math.max(0, d7e.left))
        }
        var ci8a = this.n7g.style;
        if (this.bht6n) {
            this.bhq6k();
            d7e.top = d7e.top - this.KI9z.y;
            d7e.left = d7e.left - this.KI9z.x
        }
        if (this.Zu3x == 0 || this.Zu3x == 2) ci8a.top = d7e.top + 'px';
        if (this.Zu3x == 0 || this.Zu3x == 1) ci8a.left = d7e.left + 'px';
        this.z7s('onchange', d7e);
        return this
    };
    wB4F.bgP5U = function () {
        return {
            left: parseInt(a6g.de9V(this.n7g, 'left')) || 0,
            top: parseInt(a6g.de9V(this.n7g, 'top')) || 0
        }
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = NEJ.P('nej.e'),
        h7a = NEJ.P('nej.v'),
        k7d = NEJ.P('nej.u'),
        I7B = NEJ.P('nej.ut'),
        O7H = NEJ.P('nej.ui'),
        iR0x,
        gi0x,
        b7g,
        K7D;
    if (!!O7H.Zk3x) return;
    O7H.Zk3x = NEJ.C();
    b7g = O7H.Zk3x.N7G(O7H.Pu0x);
    K7D = O7H.Zk3x.ct8l;
    b7g.cx8p = function () {
        this.sh3x = {};
        this.kU1x = {
            onchange: this.bhk6e.g7b(this)
        };
        this.cF8x()
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.cAt5y(e7d.mask);
        this.cAF5K(e7d.align);
        this.AM6G(e7d.title);
        if (!e7d.draggable) return;
        this.je0x = I7B.uJ4N.A7t(this.kU1x)
    };
    b7g.bD8v = function () {
        this.bG8y();
        delete this.qW3x;
        delete this.PW0x;
        if (!!this.AG6A) {
            this.AG6A.T7M();
            delete this.AG6A
        }
        if (!!this.je0x) {
            this.je0x.T7M();
            delete this.je0x
        }
    };
    b7g.cf8X = function () {
        this.me1x = iR0x;
        this.ce8W = gi0x
    };
    b7g.bW8O = function () {
        this.cg8Y();
        var i7b = a6g.dk9b(this.n7g);
        this.BT6N = i7b[1];
        this.kU1x.mbar = i7b[0];
        this.kU1x.body = this.n7g;
        h7a.s7l(i7b[2], 'mousedown', this.cAY5d.g7b(this));
        h7a.s7l(this.kU1x.mbar, 'mousedown', this.PK0x.g7b(this));
        this.bOn6h = a6g.dk9b(this.kU1x.mbar)[0]
    };
    b7g.cAY5d = function (d7e) {
        h7a.bh7a(d7e);
        this.z7s('onclose', d7e);
        if (!d7e.stopped) {
            this.bt7m()
        }
    };
    b7g.PK0x = function (d7e) {
        h7a.z7s(document, 'click')
    };
    b7g.bhk6e = function (d7e) {
        if (!this.nS2x) return;
        a6g.fb9S(this.nS2x, {
            top: d7e.top + 'px',
            left: d7e.left + 'px'
        })
    };
    b7g.KC9t = function () {
        var ev9m = [

                function () {
                    return 0
                },
                function (op2x, mC1x, bi7b, J7C) {
                    if (J7C == 'top' && window.top != window.self) {
                        var Zg3x = 0,
                            Ey7r = 0;
                        if (top.g_topBarHeight) Zg3x = top.g_topBarHeight;
                        if (top.g_bottomBarShow && top.g_bottomBarHeight) Ey7r = top.g_bottomBarHeight;
                        if (op2x.top <= Zg3x) {
                            var bgB5G = Math.max(0, (mC1x.height - (Zg3x - op2x.top) - Ey7r - bi7b.height) / 2);
                            return bgB5G + Zg3x
                        } else {
                            var bgB5G = Math.max(0, (mC1x.height - Ey7r - bi7b.height) / 2);
                            return bgB5G + op2x.top
                        }
                    }
                    return Math.max(0, op2x[J7C] + (mC1x[is0x[J7C]] - bi7b[is0x[J7C]]) / 2)
                },
                function (op2x, mC1x, bi7b, J7C) {
                    return op2x[J7C] + (mC1x[is0x[J7C]] - bi7b[is0x[J7C]])
                }
            ],
            cBc5h = [
                'left',
                'top'
            ],
            is0x = {
                left: 'width',
                top: 'height'
            };
        return function () {
            var D7w = {},
                ci8a = this.n7g.style,
                jF1x = a6g.ow2x(),
                op2x = {
                    left: jF1x.scrollLeft,
                    top: jF1x.scrollTop
                },
                mC1x = {
                    width: jF1x.clientWidth,
                    height: jF1x.clientHeight
                },
                bi7b = {
                    width: this.n7g.offsetWidth,
                    height: this.n7g.offsetHeight
                },
                do9f = {
                    left: jF1x.clientWidth - this.n7g.offsetWidth,
                    top: jF1x.clientHeight - this.n7g.offsetHeight
                };
            k7d.bd7W(cBc5h, function (J7C, r7k) {
                var dt9k = ev9m[this.qW3x[r7k]];
                if (!dt9k) return;
                D7w[J7C] = dt9k(op2x, mC1x, bi7b, J7C)
            }, this);
            this.gJ0x(D7w)
        }
    }();
    b7g.cBg6a = function () {
        if (!this.AG6A) {
            if (!this.PW0x) return;
            this.sh3x.parent = this.ge0x;
            this.AG6A = this.PW0x.A7t(this.sh3x)
        }
        this.AG6A.L7E()
    };
    b7g.ZC3x = function () {
        if (!!this.AG6A) this.AG6A.bt7m();
        K7D.ZC3x.apply(this, arguments)
    };
    b7g.cAt5y = function (lf1x) {
        if (!!lf1x) {
            if (lf1x instanceof O7H.KD9u) {
                this.AG6A = lf1x;
                return
            }
            if (k7d.gG0x(lf1x)) {
                this.PW0x = lf1x;
                return
            }
            this.PW0x = O7H.KD9u;
            if (k7d.fH9y(lf1x)) this.sh3x.clazz = lf1x;
            return
        }
        this.PW0x = null
    };
    b7g.AM6G = function (em9d, dQ9H) {
        if (!!this.bOn6h) {
            var VH2x = !dQ9H ? 'innerText' : 'innerHTML';
            this.bOn6h[VH2x] = em9d || '标题'
        }
        return this
    };
    b7g.cAF5K = function () {
        var dg9X = /\s+/,
            cBj6d = {
                left: 0,
                center: 1,
                right: 2,
                auto: 3
            },
            cBp6j = {
                top: 0,
                middle: 1,
                bottom: 2,
                auto: 3
            };
        return function (nV2x) {
            this.qW3x = (nV2x || '').split(dg9X);
            var ck8c = cBj6d[this.qW3x[0]];
            if (ck8c == null) ck8c = 1;
            this.qW3x[0] = ck8c;
            var ck8c = cBp6j[this.qW3x[1]];
            if (ck8c == null) ck8c = 1;
            this.qW3x[1] = ck8c;
            return this
        }
    }();
    b7g.L7E = function () {
        K7D.L7E.apply(this, arguments);
        this.cBg6a();
        return this
    };
    iR0x = a6g.sW3x('.#<uispace>{position:absolute;z-index:1000;border:1px solid #aaa;background:#fff;}.#<uispace> .zbar{line-height:30px;background:#8098E7;border-bottom:1px solid #aaa;}.#<uispace> .zcnt{padding:10px 5px;}.#<uispace> .zttl{margin-right:20px;text-align:left;}.#<uispace> .zcls{position:absolute;top:5px;right:0;width:20px;height:20px;line-height:20px;cursor:pointer;}');
    gi0x = a6g.ir0x('<div class="' + iR0x + '"><div class="zbar"><div class="zttl f-thide">标题</div></div><div class="zcnt"></div><span class="zcls" title="关闭窗体">×</span></div>')
})();
(function () {
    var c7f = NEJ.P,
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ui'),
        bgA5F;
    if (!!O7H.Ze3x) return;
    O7H.Ze3x = NEJ.C();
    bgA5F = O7H.Ze3x.N7G(O7H.ZA3x);
    bgA5F.bhG6A = function () {
        return O7H.Zk3x.A7t(this.cd8V)
    };
    bgA5F.PC0x = function () {
        O7H.Ze3x.ct8l.PC0x.apply(this, arguments);
        this.cd8V.mask = null;
        this.cd8V.title = '标题';
        this.cd8V.align = '';
        this.cd8V.draggable = !1;
        this.cd8V.onclose = null
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        bc7V = c7f('nej.ui'),
        m7f = c7f('nm.l'),
        b7g,
        K7D;
    m7f.el9c = NEJ.C();
    b7g = m7f.el9c.N7G(bc7V.Ze3x);
    b7g.bk7d = function (e7d) {
        e7d.clazz = 'm-layer z-show ' + (e7d.clazz || '');
        e7d.nohack = true;
        e7d.draggable = true;
        this.bm7f(e7d)
    };
    b7g.dV9M = function (f7c, bH8z) {
        if (!f7c) return;
        a6g.ba7T(f7c, 'display', !bH8z ? 'none' : '');
        f7c.lastChild.innerText = bH8z || ''
    };
    b7g.dY9P = function (gH0x, cZ8R, Qf0x, Qh0x) {
        var ea9R = 'js-lock';
        if (cZ8R === undefined) return a6g.bE8w(gH0x, ea9R);
        !cZ8R ? a6g.x7q(gH0x, ea9R) : a6g.y7r(gH0x, ea9R);
        gH0x.firstChild.innerText = !cZ8R ? Qf0x : Qh0x
    };
    m7f.el9c.L7E = function (e7d) {
        e7d = e7d || {};
        if (e7d.mask === undefined) e7d.mask = 'm-mask';
        if (e7d.parent === undefined) e7d.parent = document.body;
        if (e7d.draggable === undefined) e7d.draggable = true;
        !!this.fi9Z && this.fi9Z.T7M();
        this.fi9Z = this.A7t(e7d);
        this.fi9Z.L7E(e7d);
        return this.fi9Z
    };
    m7f.el9c.bt7m = function () {
        !!this.fi9Z && this.fi9Z.T7M()
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        m7f = c7f('nm.l'),
        b7g,
        K7D;
    m7f.bgq5v = NEJ.C();
    b7g = m7f.bgq5v.N7G(m7f.el9c);
    K7D = m7f.bgq5v.ct8l;
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        if (e7d.bubble === undefined) e7d.bubble = true;
        this.Qi0x = e7d.bubble;
        this.qR3x = e7d.message || ''
    };
    b7g.cf8X = function () {
        this.ce8W = a6g.ir0x('<div class="lyct f-cb f-tc"></div>')
    };
    b7g.bW8O = function () {
        this.cg8Y();
        h7a.s7l(this.n7g, 'click', this.cL8D.g7b(this))
    };
    b7g.cL8D = function (d7e) {
        var f7c = h7a.W7P(d7e, 'd:action');
        if (!f7c) return;
        if (f7c.href) h7a.cr8j(d7e);
        if (a6g.t7m(f7c, 'action') == 'close') this.bt7m();
        if (this.Qi0x === !1) h7a.tC4G(d7e);
        this.z7s('onaction', a6g.t7m(f7c, 'action'))
    };
    b7g.L7E = function () {
        K7D.L7E.call(this);
        this.n7g.innerHTML = this.qR3x
    };
    var gI0x = a6g.ex9o('<div class="f-fs1" style="line-height:22px;">${message|default:""}</div><div class="lybtn">{list buttons as item}<a hidefocus="true" class="u-btn2 ${item.klass} {if item.style}${item.style}{else}u-btn2-w2{/if}" href="javascript:;" {if !!item.action}data-action="${item.action}"{/if}><i>${item.text}</i></a>{/list}</div>');
    l7e.ns2x = function () {
        var ej9a;
        var cz8r;
        var bgo5t = function (eM9D, U7N) {
            if (k7d.gG0x(eM9D, 'function') && eM9D(U7N) != -1) cz8r.T7M()
        };
        var CS6M = function () {
            !!cz8r && cz8r.bt7m()
        };
        return function (e7d) {
            clearTimeout(ej9a);
            e7d = e7d || {};
            e7d.title = e7d.title || '提示';
            e7d.clazz = e7d.clazz || '';
            e7d.parent = e7d.parent || document.body;
            e7d.buttons = e7d.buttons || [];
            e7d.message = a6g.bZ8R(gI0x, e7d);
            e7d.onaction = bgo5t.g7b(null, e7d.action);
            if (e7d.mask === undefined) e7d.mask = true;
            if (e7d.draggable === undefined) e7d.draggable = true;
            !!cz8r && cz8r.T7M();
            cz8r = m7f.bgq5v.A7t(e7d);
            cz8r.L7E();
            if (e7d.autoclose) ej9a = setTimeout(CS6M.g7b(null), 2000);
            return cz8r
        }
    }();
    l7e.fs9j = function (e7d) {
        e7d = e7d || {};
        e7d.clazz = e7d.clazz || 'm-layer-w1';
        e7d.buttons = [{
            klass: 'u-btn2-2',
            action: 'close',
            text: e7d.btntxt || '确定'
        }];
        var cz8r = l7e.ns2x(e7d);
        return cz8r
    };
    l7e.ho0x = function (e7d) {
        e7d = e7d || {};
        e7d.clazz = e7d.clazz || 'm-layer-w2';
        e7d.buttons = [{
            klass: 'u-btn2-2',
            action: 'ok',
            text: e7d.btnok || '确定',
            style: e7d.okstyle || ''
        }, {
            klass: 'u-btn2-1',
            action: 'close',
            text: e7d.btncc || '取消',
            style: e7d.ccstyle || ''
        }];
        var cz8r = l7e.ns2x(e7d);
        return cz8r
    }
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u');
    a6g.cBs6m = function () {
        var gK0x = /[\r\n]/gi,
            R7K = {};
        var cBw6q = function (cK8C) {
            return (cK8C || '').replace(gK0x, 'aa').length
        };
        var byd2x = function (C7v) {
            var bg7Z = R7K[C7v],
                byg2x = a6g.B7u(C7v),
                rh3x = a6g.B7u(C7v + '-counter');
            if (!byg2x || !bg7Z) return;
            var d7e = {
                input: byg2x.value
            };
            d7e.length = bg7Z.onlength(d7e.input);
            d7e.delta = bg7Z.max - d7e.length;
            bg7Z.onchange(d7e);
            rh3x.innerHTML = d7e.value || '剩余' + d7e.delta + '个字'
        };
        return function (F7y, e7d) {
            var C7v = a6g.lM1x(F7y);
            if (!C7v || !!R7K[C7v]) return;
            var bg7Z = NEJ.X({}, e7d);
            bg7Z.onchange = bg7Z.onchange || br7k;
            bg7Z.onlength = cBw6q;
            if (!bg7Z.max) {
                var byF2x = parseInt(a6g.gw0x(C7v, 'maxlength')),
                    byS2x = parseInt(a6g.t7m(C7v, 'maxLength'));
                bg7Z.max = byF2x || byS2x || 100;
                if (!byF2x && !!byS2x) bg7Z.onlength = k7d.fv9m
            }
            R7K[C7v] = bg7Z;
            h7a.s7l(C7v, 'input', byd2x.g7b(null, C7v));
            var f7c = a6g.IM8E(C7v, {
                nid: bg7Z.nid || 'js-counter',
                clazz: bg7Z.clazz
            });
            bg7Z.xid = C7v + '-counter';
            f7c.id = bg7Z.xid;
            byd2x(C7v)
        }
    }()
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        be7X = c7f('nej.h');
    be7X.bgn5s = function (F7y, dZ9Q) {}
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        O7H = c7f('nej.p'),
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        be7X = c7f('nej.h');
    if (O7H.nu2x.trident) return;
    be7X.bgn5s = function () {
        var R7K = {};
        var Ir8j = function (d7e) {
            var dm9d = h7a.W7P(d7e);
            if (!!dm9d.value) return;
            a6g.ba7T(a6g.IM8E(dm9d), 'display', 'none')
        };
        var EC7v = function (d7e) {
            var dm9d = h7a.W7P(d7e);
            if (!!dm9d.value) return;
            a6g.ba7T(a6g.IM8E(dm9d), 'display', '')
        };
        var cBE6y = function (dm9d, dZ9Q) {
            var C7v = a6g.lM1x(dm9d),
                ja0x = a6g.IM8E(dm9d, {
                    tag: 'label',
                    clazz: dZ9Q
                });
            ja0x.htmlFor = C7v;
            var cG8y = a6g.gw0x(dm9d, 'placeholder') || '';
            ja0x.innerText = cG8y == 'null' ? '' : cG8y;
            var cc8U = dm9d.offsetHeight + 'px';
            a6g.fb9S(ja0x, {
                left: 0,
                display: !dm9d.value ? '' : 'none'
            })
        };
        return be7X.bgn5s.eG9x(function (d7e) {
            d7e.stopped = !0;
            var bf7Y = d7e.args,
                dm9d = a6g.B7u(bf7Y[0]);
            if (!!R7K[dm9d.id]) return;
            cBE6y(dm9d, bf7Y[1]);
            R7K[dm9d.id] = !0;
            h7a.s7l(dm9d, 'blur', EC7v.g7b(null));
            h7a.s7l(dm9d, 'focus', Ir8j.g7b(null))
        })
    }()
})();
(function () {
    var c7f = NEJ.P,
        be7X = c7f('nej.h'),
        a6g = c7f('nej.e'),
        cX8P = c7f('nej.x');
    a6g.gr0x = cX8P.gr0x = function (F7y, dZ9Q) {
        be7X.bgn5s(F7y, a6g.t7m(F7y, 'holder') || dZ9Q || 'js-placeholder');
        return this
    };
    cX8P.isChange = !0
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut'),
        hU0x;
    if (!!O7H.Qk0x) return;
    O7H.Qk0x = NEJ.C();
    hU0x = O7H.Qk0x.N7G(O7H.cI8A);
    hU0x.cx8p = function () {
        this.cF8x();
        this.GZ8R = {
            tp: {
                nid: 'js-nej-tp'
            },
            ok: {
                nid: 'js-nej-ok'
            },
            er: {
                nid: 'js-nej-er'
            }
        }
    };
    hU0x.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.gp0x = document.forms[e7d.form] || a6g.B7u(e7d.form);
        this.bX8P([
            [this.gp0x,
                'keypress',
                this.cBF6z.g7b(this)
            ]
        ]);
        this.qR3x = e7d.message || {};
        this.qR3x.pass = this.qR3x.pass || '&nbsp;';
        var fg9X = this.pH2x(this.gp0x, 'focusMode', 1);
        if (!isNaN(fg9X)) {
            this.bAx2x = {
                mode: fg9X,
                clazz: e7d.focus
            }
        }
        this.CJ6D = e7d.holder;
        this.GZ8R.tp.clazz = 'js-mhd ' + (e7d.tip || 'js-tip');
        this.GZ8R.ok.clazz = 'js-mhd ' + (e7d.pass || 'js-pass');
        this.GZ8R.er.clazz = 'js-mhd ' + (e7d.error || 'js-error');
        this.bAP2x = e7d.invalid || 'js-invalid';
        this.cBM6G(e7d);
        this.gD0x();
        if (!!this.Cy6s) this.Cy6s.focus()
    };
    hU0x.bD8v = function () {
        this.bG8y();
        delete this.qR3x;
        delete this.Cy6s;
        delete this.Hv8n;
        delete this.gp0x;
        delete this.bBQ3x;
        delete this.Qp0x
    };
    hU0x.pH2x = function (f7c, xp5u, u7n) {
        var D7w = a6g.t7m(f7c, xp5u);
        switch (u7n) {
        case 1:
            return parseInt(D7w);
        case 2:
            return (D7w || '').toLowerCase() == 'true';
        case 3:
            return this.bfQ5V(D7w)
        }
        return D7w
    };
    hU0x.Cd6X = function (D7w, u7n) {
        if (u7n == 'date') return this.bfQ5V(D7w);
        return parseInt(D7w)
    };
    hU0x.YT3x = function () {
        var km1x = /^button|submit|reset|image|hidden|file$/i;
        return function (f7c) {
            f7c = this.B7u(f7c) || f7c;
            var u7n = f7c.type;
            return !!f7c.name && !km1x.test(f7c.type || '')
        }
    }();
    hU0x.cCa6U = function () {
        var km1x = /^hidden$/i;
        return function (f7c) {
            if (this.YT3x(f7c)) return !0;
            f7c = this.B7u(f7c) || f7c;
            var u7n = f7c.type || '';
            return km1x.test(u7n)
        }
    }();
    hU0x.bfQ5V = function () {
        var dg9X = /[-\/]/;
        var cCI6C = function (D7w) {
            if (!D7w) return '';
            D7w = D7w.split(dg9X);
            D7w.push(D7w.shift());
            return D7w.join('/')
        };
        return function (D7w) {
            if ((D7w || '').toLowerCase() == 'now') return +(new Date);
            return Date.parse(cCI6C(D7w))
        }
    }();
    hU0x.cBF6z = function (d7e) {
        if (d7e.keyCode != 13) return;
        this.z7s('onenter', d7e)
    };
    hU0x.cCP6J = function (C7v, V7O) {
        var so3x = this.Qp0x[V7O],
            D7w = this.pH2x(C7v, V7O);
        if (!D7w || !so3x) return;
        this.YR3x(C7v, so3x);
        this.bfF5K(C7v, V7O, D7w)
    };
    hU0x.cCU6O = function (C7v, V7O) {
        try {
            var bCX3x = this.pH2x(C7v, V7O);
            if (!bCX3x) return;
            var D7w = new RegExp(bCX3x);
            this.bfF5K(C7v, V7O, D7w);
            this.YR3x(C7v, this.Qp0x[V7O])
        } catch (e) {}
    };
    hU0x.cCV6P = function (C7v, V7O) {
        var so3x = this.Qp0x[V7O];
        if (!!so3x && this.pH2x(C7v, V7O, 2)) this.YR3x(C7v, so3x)
    };
    hU0x.bfA5F = function (C7v, V7O, D7w) {
        D7w = parseInt(D7w);
        if (isNaN(D7w)) return;
        this.bfF5K(C7v, V7O, D7w);
        this.YR3x(C7v, this.Qp0x[V7O])
    };
    hU0x.bDa3x = function (C7v, V7O) {
        this.bfA5F(C7v, V7O, this.pH2x(C7v, V7O))
    };
    hU0x.bDc3x = function (C7v, V7O) {
        this.bfA5F(C7v, V7O, a6g.gw0x(C7v, V7O))
    };
    hU0x.bDf3x = function (C7v, V7O, u7n) {
        var D7w = this.Cd6X(this.pH2x(C7v, V7O), this.pH2x(C7v, 'type'));
        this.bfA5F(C7v, V7O, D7w)
    };
    hU0x.cDb6V = function () {
        var gK0x = /^input|textarea$/i;
        var Ir8j = function (d7e) {
            this.pF2x(h7a.W7P(d7e))
        };
        var EC7v = function (d7e) {
            var f7c = h7a.W7P(d7e);
            if (!this.pH2x(f7c, 'ignore', 2)) {
                this.bDD3x(f7c)
            }
        };
        return function (f7c) {
            if (this.pH2x(f7c, 'autoFocus', 2)) this.Cy6s = f7c;
            var qZ3x = a6g.gw0x(f7c, 'placeholder');
            if (!!qZ3x && qZ3x != 'null') a6g.gr0x(f7c, this.CJ6D);
            if (!!this.bAx2x && gK0x.test(f7c.tagName)) a6g.mS2x(f7c, this.bAx2x);
            var C7v = a6g.lM1x(f7c);
            this.cCV6P(C7v, 'required');
            this.cCP6J(C7v, 'type');
            this.cCU6O(C7v, 'pattern');
            this.bDc3x(C7v, 'maxlength');
            this.bDc3x(C7v, 'minlength');
            this.bDa3x(C7v, 'maxLength');
            this.bDa3x(C7v, 'minLength');
            this.bDf3x(C7v, 'min');
            this.bDf3x(C7v, 'max');
            var V7O = f7c.name;
            this.qR3x[V7O + '-tip'] = this.pH2x(f7c, 'tip');
            this.qR3x[V7O + '-error'] = this.pH2x(f7c, 'message');
            this.pF2x(f7c);
            var bz7s = this.Hv8n[C7v],
                j7c = (bz7s || bb7U).data || bb7U,
                QC0x = this.pH2x(f7c, 'counter', 2);
            if (QC0x && (j7c.maxlength || j7c.maxLength)) {
                a6g.cBs6m(C7v, {
                    nid: this.GZ8R.tp.nid,
                    clazz: 'js-counter'
                })
            }
            if (!!bz7s && gK0x.test(f7c.tagName)) {
                this.bX8P([
                    [f7c,
                        'focus',
                        Ir8j.g7b(this)
                    ],
                    [
                        f7c,
                        'blur',
                        EC7v.g7b(this)
                    ]
                ])
            } else if (this.pH2x(f7c, 'focus', 2)) {
                this.bX8P([
                    [f7c,
                        'focus',
                        Ir8j.g7b(this)
                    ]
                ])
            }
        }
    }();
    hU0x.cBM6G = function () {
        var DQ7J = {
            number: /^[\d]+$/i,
            url: /^[a-z]+:\/\/(?:[\w-]+\.)+[a-z]{2,6}.*$/i,
            email: /^[\w-\.]+@(?:[\w-]+\.)+[a-z]{2,6}$/i,
            date: function (v) {
                return !v || !isNaN(this.bfQ5V(v))
            }
        };
        var cDc6W = {
            required: function (f7c) {
                    var u7n = f7c.type,
                        cDe6Y = !f7c.value,
                        cDx6r = (u7n == 'checkbox' || u7n == 'radio') && !f7c.checked;
                    if (cDx6r || cDe6Y) return -1
                },
                type: function (f7c, e7d) {
                    var dg9X = this.bBQ3x[e7d.type],
                        eQ9H = f7c.value.trim(),
                        cDA6u = !!dg9X.test && !dg9X.test(eQ9H),
                        cDG6A = k7d.gG0x(dg9X) && !dg9X.call(this, eQ9H);
                    if (cDA6u || cDG6A) return -2
                },
                pattern: function (f7c, e7d) {
                    if (!e7d.pattern.test(f7c.value)) return -3
                },
                maxlength: function (f7c, e7d) {
                    if (f7c.value.length > e7d.maxlength) return -4
                },
                minlength: function (f7c, e7d) {
                    if (f7c.value.length < e7d.minlength) return -5
                },
                maxLength: function (f7c, e7d) {
                    if (k7d.fv9m(f7c.value) > e7d.maxLength) return -4
                },
                minLength: function (f7c, e7d) {
                    if (k7d.fv9m(f7c.value) < e7d.minLength) return -5
                },
                min: function (f7c, e7d) {
                    var gV0x = this.Cd6X(f7c.value, e7d.type);
                    if (isNaN(gV0x) || gV0x < e7d.min) return -6
                },
                max: function (f7c, e7d) {
                    var gV0x = this.Cd6X(f7c.value, e7d.type);
                    if (isNaN(gV0x) || gV0x > e7d.max) return -7
                }
        };
        return function (e7d) {
            this.bBQ3x = NEJ.X(NEJ.X({}, DQ7J), e7d.type);
            this.Qp0x = NEJ.X(NEJ.X({}, cDc6W), e7d.attr)
        }
    }();
    hU0x.YR3x = function (C7v, zi5n) {
        if (!k7d.gG0x(zi5n)) return;
        var bz7s = this.Hv8n[C7v];
        if (!bz7s || !bz7s.func) {
            bz7s = bz7s || {};
            bz7s.func = [];
            this.Hv8n[C7v] = bz7s
        }
        bz7s.func.push(zi5n)
    };
    hU0x.bfF5K = function (C7v, V7O, D7w) {
        if (!V7O) return;
        var bz7s = this.Hv8n[C7v];
        if (!bz7s || !bz7s.data) {
            bz7s = bz7s || {};
            bz7s.data = {};
            this.Hv8n[C7v] = bz7s
        }
        bz7s.data[V7O] = D7w
    };
    hU0x.bDD3x = function (f7c) {
        f7c = this.B7u(f7c) || f7c;
        var bz7s = this.Hv8n[a6g.lM1x(f7c)];
        if (!f7c || !bz7s || !this.YT3x(f7c)) return !0;
        var o7h;
        k7d.eC9t(bz7s.func, function (ev9m) {
            o7h = ev9m.call(this, f7c, bz7s.data);
            return o7h != null
        }, this);
        if (o7h == null) {
            var d7e = {
                target: f7c,
                form: this.gp0x
            };
            this.z7s('oncheck', d7e);
            o7h = d7e.value
        }
        var d7e = {
            target: f7c,
            form: this.gp0x
        };
        if (o7h != null) {
            d7e.code = o7h;
            this.z7s('oninvalid', d7e);
            if (!d7e.stopped) {
                this.cDF6z(f7c, d7e.value || this.qR3x[f7c.name + o7h])
            }
        } else {
            this.z7s('onvalid', d7e);
            if (!d7e.stopped) this.cDE6y(f7c, d7e.value)
        }
        return o7h == null
    };
    hU0x.yF5K = function () {
        var cDD6x = function (bdY4c, bdW4a) {
            return bdY4c == bdW4a ? 'block' : 'none'
        };
        var cDC6w = function (f7c, u7n, bH8z) {
            var qZ3x = bFl3x.call(this, f7c, u7n);
            if (!qZ3x && !!bH8z) qZ3x = a6g.IM8E(f7c, this.GZ8R[u7n]);
            return qZ3x
        };
        var bFl3x = function (f7c, u7n) {
            var qZ3x;
            if (u7n == 'tp') qZ3x = a6g.B7u(f7c.name + '-tip');
            if (!qZ3x) qZ3x = a6g.H7A(f7c.parentNode, this.GZ8R[u7n].nid)[0];
            return qZ3x
        };
        return function (f7c, bH8z, u7n) {
            f7c = this.B7u(f7c) || f7c;
            if (!f7c) return;
            u7n == 'er' ? a6g.y7r(f7c, this.bAP2x) : a6g.x7q(f7c, this.bAP2x);
            var qZ3x = cDC6w.call(this, f7c, u7n, bH8z);
            if (!!qZ3x && !!bH8z) qZ3x.innerHTML = bH8z;
            k7d.eC9t(this.GZ8R, function (D7w, J7C) {
                a6g.ba7T(bFl3x.call(this, f7c, J7C), 'display', cDD6x(u7n, J7C))
            }, this)
        }
    }();
    hU0x.pF2x = function (f7c, bH8z) {
        this.yF5K(f7c, bH8z || this.qR3x[f7c.name + '-tip'], 'tp');
        return this
    };
    hU0x.cDE6y = function (f7c, bH8z) {
        this.yF5K(f7c, bH8z || this.qR3x[f7c.name + '-pass'] || this.qR3x.pass, 'ok');
        return this
    };
    hU0x.cDF6z = function (f7c, bH8z) {
        this.yF5K(f7c, bH8z || this.qR3x[f7c.name + '-error'], 'er');
        return this
    };
    hU0x.jb0x = function () {
        var gK0x = /^(?:radio|checkbox)$/i;
        var cDB6v = function (D7w) {
            return D7w == null ? '' : D7w
        };
        var bFv3x = function (D7w, f7c) {
            if (gK0x.test(f7c.type || '')) {
                f7c.checked = D7w == f7c.value
            } else {
                f7c.value = cDB6v(D7w)
            }
        };
        return function (V7O, D7w) {
            var f7c = this.B7u(V7O);
            if (!f7c) return this;
            if (f7c.tagName == 'SELECT' || !f7c.length) {
                bFv3x(D7w, f7c)
            } else {
                k7d.bd7W(f7c, bFv3x.g7b(null, D7w))
            }
            return this
        }
    }();
    hU0x.B7u = function (V7O) {
        return this.gp0x.elements[V7O]
    };
    hU0x.cDJ6D = function () {
        return this.gp0x
    };
    hU0x.YH3x = function () {
        var gK0x = /^radio|checkbox$/i,
            km1x = /^number|date$/;
        var cDz6t = function (by7r, f7c) {
            var V7O = f7c.name,
                D7w = f7c.value,
                bz7s = by7r[V7O],
                u7n = this.pH2x(f7c, 'type');
            if (km1x.test(u7n)) D7w = this.Cd6X(D7w, u7n);
            if (gK0x.test(f7c.type) && !f7c.checked) {
                D7w = this.pH2x(f7c, 'value');
                if (!D7w) return
            }
            if (!!bz7s) {
                if (!k7d.eJ9A(bz7s)) {
                    bz7s = [
                        bz7s
                    ];
                    by7r[V7O] = bz7s
                }
                bz7s.push(D7w)
            } else {
                by7r[V7O] = D7w
            }
        };
        return function () {
            var o7h = {};
            k7d.bd7W(this.gp0x.elements, function (f7c) {
                if (this.cCa6U(f7c)) cDz6t.call(this, o7h, f7c)
            }, this);
            return o7h
        }
    }();
    hU0x.QJ1x = function () {
        var cDy6s = function (f7c) {
            if (this.YT3x(f7c)) this.pF2x(f7c)
        };
        return function () {
            this.gp0x.reset();
            k7d.bd7W(this.gp0x.elements, cDy6s, this);
            return this
        }
    }();
    hU0x.cGs7l = function () {
        this.gp0x.submit();
        return this
    };
    hU0x.gD0x = function () {
        var cDl6f = function (f7c) {
            if (this.YT3x(f7c)) this.cDb6V(f7c)
        };
        return function () {
            this.Hv8n = {};
            k7d.bd7W(this.gp0x.elements, cDl6f, this);
            return this
        }
    }();
    hU0x.cDk6e = function (f7c) {
        f7c = this.B7u(f7c) || f7c;
        if (!!f7c) return this.bDD3x(f7c);
        var o7h = !0;
        k7d.bd7W(this.gp0x.elements, function (f7c) {
            var jr1x = this.cDk6e(f7c);
            o7h = o7h && jr1x
        }, this);
        return o7h
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        I7B = c7f('nej.ut'),
        k7d = c7f('nej.u'),
        l7e = c7f('nm.x'),
        m7f = c7f('nm.l'),
        b7g,
        K7D;
    m7f.YD3x = NEJ.C();
    b7g = m7f.YD3x.N7G(m7f.el9c);
    K7D = m7f.YD3x.ct8l;
    b7g.bW8O = function () {
        this.cg8Y();
        h7a.s7l(this.n7g, 'click', this.cL8D.g7b(this));
        h7a.s7l(document, 'mousewheel', this.By6s.g7b(this));
        if (!!document.body.addEventListener) document.body.addEventListener('DOMMouseScroll', this.By6s.g7b(this))
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        if (e7d.jst) {
            this.n7g.innerHTML = a6g.bZ8R(e7d.jst, e7d.data)
        } else if (e7d.ntp) {
            this.n7g.appendChild(a6g.dy9p(e7d.ntp))
        } else if (e7d.txt) {
            this.n7g.innerHTML = a6g.iL0x(e7d.txt)
        } else if (e7d.html) {
            this.n7g.innerHTML = e7d.html
        }
        var QS1x = this.n7g.getElementsByTagName('form');
        if (QS1x.length) {
            this.gp0x = I7B.Qk0x.A7t({
                form: QS1x[0]
            })
        }
        this.EO7H = a6g.dk9b(this.n7g)[0]
    };
    b7g.bD8v = function () {
        this.z7s('ondestroy');
        this.bG8y();
        this.n7g.innerHTML = '';
        delete this.EO7H
    };
    b7g.cL8D = function (d7e) {
        var f7c = h7a.W7P(d7e, 'd:action'),
            j7c = this.gp0x ? this.gp0x.YH3x() : null,
            d7e = {
                action: a6g.t7m(f7c, 'action')
            };
        if (j7c) d7e.data = j7c;
        if (d7e.action) {
            this.z7s('onaction', d7e);
            if (d7e.stopped) return;
            this.bt7m()
        }
    };
    b7g.By6s = function (d7e) {
        if (!this.EO7H) return;
        h7a.bh7a(d7e);
        var do9f = d7e.wheelDelta || -d7e.detail;
        this.EO7H.scrollTop -= do9f
    };
    l7e.kz1x = function (e7d) {
        e7d.destroyable = e7d.destroyable || true;
        e7d.title = e7d.title || '提示';
        e7d.draggable = true;
        e7d.parent = e7d.parent || document.body;
        e7d.mask = e7d.mask || true;
        var Bu6o = m7f.YD3x.A7t(e7d);
        Bu6o.L7E();
        return Bu6o
    }
})();
(function () {
    var p = NEJ.P('nej.u');
    var bGW4a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        QT1x = {},
        Fa7T = {};
    for (var i = 0, l = bGW4a.length, c; i < l; i++) {
        c = bGW4a.charAt(i);
        QT1x[i] = c;
        Fa7T[c] = i
    }
    var cDj6d = function (iA0x) {
        var r7k = 0,
            c,
            o7h = [];
        while (r7k < iA0x.length) {
            c = iA0x[r7k];
            if (c < 128) {
                o7h.push(String.fromCharCode(c));
                r7k++
            } else if (c > 191 && c < 224) {
                o7h.push(String.fromCharCode((c & 31) << 6 | iA0x[r7k + 1] & 63));
                r7k += 2
            } else {
                o7h.push(String.fromCharCode((c & 15) << 12 | (iA0x[r7k + 1] & 63) << 6 | iA0x[r7k + 2] & 63));
                r7k += 3
            }
        }
        return o7h.join('')
    };
    var cDf6Z = function () {
        var hy0x = /\r\n/g;
        return function (j7c) {
            j7c = j7c.replace(hy0x, '\n');
            var o7h = [],
                mn1x = String.fromCharCode(237);
            if (mn1x.charCodeAt(0) < 0)
                for (var i = 0, l = j7c.length, c; i < l; i++) {
                    c = j7c.charCodeAt(i);
                    c > 0 ? o7h.push(c) : o7h.push(256 + c >> 6 | 192, 256 + c & 63 | 128)
                } else
                    for (var i = 0, l = j7c.length, c; i < l; i++) {
                        c = j7c.charCodeAt(i);
                        if (c < 128) o7h.push(c);
                        else if (c > 127 && c < 2048) o7h.push(c >> 6 | 192, c & 63 | 128);
                        else o7h.push(c >> 12 | 224, c >> 6 & 63 | 128, c & 63 | 128)
                    }
            return o7h
        }
    }();
    var Le9V = function (iA0x) {
        var r7k = 0,
            o7h = [],
            fg9X = iA0x.length % 3;
        if (fg9X == 1) iA0x.push(0, 0);
        if (fg9X == 2) iA0x.push(0);
        while (r7k < iA0x.length) {
            o7h.push(QT1x[iA0x[r7k] >> 2], QT1x[(iA0x[r7k] & 3) << 4 | iA0x[r7k + 1] >> 4], QT1x[(iA0x[r7k + 1] & 15) << 2 | iA0x[r7k + 2] >> 6], QT1x[iA0x[r7k + 2] & 63]);
            r7k += 3
        }
        if (fg9X == 1) o7h[o7h.length - 1] = o7h[o7h.length - 2] = '=';
        if (fg9X == 2) o7h[o7h.length - 1] = '=';
        return o7h.join('')
    };
    var bIl4p = function () {
        var rB3x = /\n|\r|=/g;
        return function (j7c) {
            var r7k = 0,
                o7h = [];
            j7c = j7c.replace(rB3x, '');
            for (var i = 0, l = j7c.length; i < l; i += 4) o7h.push(Fa7T[j7c.charAt(i)] << 2 | Fa7T[j7c.charAt(i + 1)] >> 4, (Fa7T[j7c.charAt(i + 1)] & 15) << 4 | Fa7T[j7c.charAt(i + 2)] >> 2, (Fa7T[j7c.charAt(i + 2)] & 3) << 6 | Fa7T[j7c.charAt(i + 3)]);
            var bq7j = o7h.length,
                fg9X = j7c.length % 4;
            if (fg9X == 2) o7h = o7h.slice(0, bq7j - 2);
            if (fg9X == 3) o7h = o7h.slice(0, bq7j - 1);
            return o7h
        }
    }();
    p.cDM6G = function (j7c) {
        return cDj6d(bIl4p(j7c))
    };
    p.cDa6U = function (j7c) {
        var iA0x = bIl4p(j7c),
            dq9h = iA0x.length,
            iC0x;
        var r7k = 0;
        while (iC0x = iA0x[r7k]) {
            if (iC0x > 128) {
                iA0x[r7k] = iC0x - 256
            }
            r7k++
        }
        return iA0x
    };
    p.cCZ6T = function (j7c) {
        try {
            return window.btoa(j7c)
        } catch (ex) {
            return Le9V(cDf6Z(j7c))
        }
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        h7a = c7f('nej.v'),
        a6g = c7f('nej.e'),
        v7o = c7f('nej.j'),
        O7H = c7f('nej.p'),
        k7d = c7f('nej.u'),
        m7f = c7f('nm.l'),
        w7p = c7f('nm.w'),
        bC8u = c7f('nej.ui'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        b7g,
        K7D;
    var TYPE_MAP = {
        13: 'playlist',
        17: 'program',
        18: 'song',
        19: 'album'
    };
    m7f.bJd4h = NEJ.C();
    b7g = m7f.bJd4h.N7G(m7f.el9c);
    b7g.cf8X = function () {
        this.ce8W = 'm-download-layer'
    };
    b7g.bW8O = function () {
        this.cg8Y();
        var i7b = a6g.H7A(this.n7g, 'j-flag');
        this.bwF1x = i7b[0];
        this.bwx1x = i7b[1];
        this.bJF4J = i7b[2];
        v7o.bn7g('/client/version/get', {
            type: 'json',
            onload: this.cCY6S.g7b(this)
        });
        if (O7H.Id8V.mac) {
            a6g.x7q(this.bwF1x.parentNode, 'f-hide');
            a6g.y7r(this.bwx1x.parentNode, 'f-hide');
            a6g.y7r(this.bJF4J, 'f-hide')
        } else {
            a6g.y7r(this.bwF1x.parentNode, 'f-hide');
            a6g.x7q(this.bwx1x.parentNode, 'f-hide');
            a6g.x7q(this.bJF4J, 'f-hide')
        }
    };
    b7g.bk7d = function (e7d) {
        e7d.clazz = ' m-layer-down';
        e7d.parent = e7d.parent || document.body;
        e7d.title = '下载';
        e7d.draggable = !0;
        e7d.destroyalbe = !0;
        e7d.mask = true;
        this.bm7f(e7d);
        this.bX8P([
            [this.n7g,
                'click',
                this.bT8L.g7b(this)
            ]
        ]);
        this.eu9l = TYPE_MAP[e7d.type];
        this.hb0x = e7d.id
    };
    b7g.bD8v = function () {
        this.bG8y()
    };
    b7g.Do7h = function () {
        this.bt7m()
    };
    b7g.FV7O = function (d7e) {
        this.z7s('onok', D7w);
        this.bt7m()
    };
    b7g.bT8L = function (d7e) {
        var f7c = h7a.W7P(d7e, 'd:action');
        switch (a6g.t7m(f7c, 'action')) {
        case 'download':
            this.bt7m();
            window.open(a6g.t7m(f7c, 'src'));
            break;
        case 'orpheus':
            this.bt7m();
            location.href = 'orpheus://' + k7d.cCZ6T(JSON.stringify({
                type: this.eu9l,
                id: this.hb0x,
                cmd: 'download'
            }));
            break
        }
    };
    b7g.cCY6S = function (d7e) {
        if ((d7e || bb7U).code == 200) {
            this.Kr9i = d7e.data;
            this.bwF1x.innerText = 'V' + this.Kr9i.mac;
            this.bwx1x.innerText = 'V' + this.Kr9i.pc
        }
    };
    l7e.Lh9Y = function (e7d) {
        m7f.bJd4h.A7t(e7d).L7E()
    }
})();
(function () {
    var c7f = NEJ.P,
        l7e = c7f('nm.x');
    var FullscreenApi = {};
    var apiMap = [
        ['requestFullscreen',
            'exitFullscreen',
            'fullscreenElement',
            'fullscreenEnabled',
            'fullscreenchange',
            'fullscreenerror'
        ],
        [
            'webkitRequestFullscreen',
            'webkitExitFullscreen',
            'webkitFullscreenElement',
            'webkitFullscreenEnabled',
            'webkitfullscreenchange',
            'webkitfullscreenerror'
        ],
        [
            'webkitRequestFullScreen',
            'webkitCancelFullScreen',
            'webkitCurrentFullScreenElement',
            'webkitCancelFullScreen',
            'webkitfullscreenchange',
            'webkitfullscreenerror'
        ],
        [
            'mozRequestFullScreen',
            'mozCancelFullScreen',
            'mozFullScreenElement',
            'mozFullScreenEnabled',
            'mozfullscreenchange',
            'mozfullscreenerror'
        ],
        [
            'msRequestFullscreen',
            'msExitFullscreen',
            'msFullscreenElement',
            'msFullscreenEnabled',
            'MSFullscreenChange',
            'MSFullscreenError'
        ]
    ];
    var specApi = apiMap[0];
    var browserApi;
    for (var i = 0; i < apiMap.length; i++) {
        if (apiMap[i][1] in document) {
            browserApi = apiMap[i];
            break
        }
    }
    if (browserApi) {
        for (var i = 0; i < browserApi.length; i++) {
            FullscreenApi[specApi[i]] = browserApi[i]
        }
    }
    l7e.FX7Q = FullscreenApi
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        k7d = c7f('nej.u'),
        q7j = c7f('nm.d'),
        bP8H = {};
    q7j.B7u = function (J7C) {
        return bP8H[J7C]
    };
    q7j.na2x = function (J7C, bg7Z) {
        bP8H[J7C] = bg7Z
    };
    q7j.ff9W = function (j7c) {
        k7d.eC9t(j7c, function (p7i, J7C) {
            var bg7Z = bP8H[J7C] || {};
            NEJ.X(bg7Z, p7i);
            bP8H[J7C] = bg7Z
        })
    }
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        be7X = c7f('nej.h');
    be7X.Yv3x = function (J7C) {
        return localStorage.getItem(J7C)
    };
    be7X.Yu3x = function (J7C, D7w) {
        localStorage.setItem(J7C, D7w)
    };
    be7X.bvP1x = function (J7C) {
        localStorage.removeItem(J7C)
    };
    be7X.bvO1x = function () {
        localStorage.clear()
    };
    be7X.cCX6R = function () {
        var o7h = [];
        for (var i = 0, l = localStorage.length; i < l; i++) o7h.push(localStorage.key(i));
        return o7h
    };
    be7X.buM1x = function () {
        (document.onstorageready || br7k)()
    };
    be7X.buA1x = function () {
        return !0
    }
})();
(function () {
    var c7f = NEJ.P,
        O7H = c7f('nej.p'),
        iC0x = c7f('nej.c'),
        be7X = c7f('nej.h'),
        tH4L;
    if (O7H.nu2x.trident || !!window.localStorage) return;
    var cCW6Q = function () {
        var ru3x,
            ej9a;
        var blE8w = function () {
            ru3x = document.createElement('div');
            NEJ.X(ru3x.style, {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1px',
                height: '1px',
                zIndex: 10000,
                overflow: 'hidden'
            });
            document.body.insertAdjacentElement('afterBegin', ru3x);
            ru3x.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="1" height="1"id="f-' + +(new Date) + '" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"><param name="movie" value="' + iC0x.B7u('storage.swf') + '"/><param name="AllowScriptAccess" value="sameDomain"/></object>'
        };
        var NT0x = function () {
            ej9a = window.clearTimeout(ej9a);
            var hP0x = ru3x.getElementsByTagName('object')[0];
            if (!!hP0x.initStorage) {
                delete ru3x;
                tH4L = hP0x;
                tH4L.initStorage('nej-storage');
                (document.onstorageready || br7k)();
                return
            }
            ej9a = window.setTimeout(NT0x, 500)
        };
        return function () {
            if (!!tH4L) return;
            blE8w();
            NT0x()
        }
    }();
    be7X.Yv3x = be7X.Yv3x.eG9x(function (d7e) {
        d7e.stopped = !0;
        if (!tH4L) return;
        d7e.value = tH4L.getItem(d7e.args[0])
    });
    be7X.Yu3x = be7X.Yu3x.eG9x(function (d7e) {
        d7e.stopped = !0;
        if (!tH4L) return;
        var bf7Y = d7e.args;
        tH4L.setItem(bf7Y[0], bf7Y[1])
    });
    be7X.bvP1x = be7X.bvP1x.eG9x(function (d7e) {
        d7e.stopped = !0;
        if (!tH4L) return;
        tH4L.removeItem(d7e.args[0])
    });
    be7X.bvO1x = be7X.bvO1x.eG9x(function (d7e) {
        d7e.stopped = !0;
        if (!!tH4L) tH4L.clear()
    });
    be7X.buM1x = be7X.buM1x.eG9x(function (d7e) {
        d7e.stopped = !0;
        cCW6Q()
    });
    be7X.buA1x = be7X.buA1x.eG9x(function (d7e) {
        d7e.stopped = !0;
        d7e.value = !!tH4L
    })
})();
(function () {
    var c7f = NEJ.P,
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        be7X = c7f('nej.h'),
        v7o = c7f('nej.j'),
        I7B = c7f('nej.ut'),
        R7K = {};
    v7o.uk4o = function (J7C, D7w) {
        var bMh5m = JSON.stringify(D7w);
        try {
            be7X.Yu3x(J7C, bMh5m)
        } catch (ex) {
            console.error(ex.message);
            console.error(ex)
        }
        if (bMh5m != be7X.Yv3x(J7C)) R7K[J7C] = D7w;
        return this
    };
    v7o.tI4M = function (J7C) {
        var j7c = JSON.parse(be7X.Yv3x(J7C) || 'null');
        return j7c == null ? R7K[J7C] : j7c
    };
    v7o.bNa5f = function (J7C, D7w) {
        var j7c = v7o.tI4M(J7C);
        if (j7c == null) {
            j7c = D7w;
            v7o.uk4o(J7C, j7c)
        }
        return j7c
    };
    v7o.Lk9b = function (J7C) {
        delete R7K[J7C];
        be7X.bvP1x(J7C);
        return this
    };
    v7o.cDO6I = function () {
        var bup1x = function (p7i, J7C, by7r) {
            delete by7r[J7C]
        };
        return function () {
            k7d.eC9t(R7K, bup1x);
            be7X.bvO1x();
            return this
        }
    }();
    v7o.cDP6J = function (o7h) {
        o7h = o7h || {};
        k7d.bd7W(be7X.cCX6R(), function (J7C) {
            o7h[J7C] = v7o.tI4M(J7C)
        });
        return o7h
    };
    I7B.fI9z.A7t({
        element: document,
        event: 'storageready',
        oneventadd: function () {
            if (be7X.buA1x()) {
                document.onstorageready()
            }
        }
    });
    var cCT6N = function () {
        var cCR6L = function (D7w, J7C, by7r) {
            be7X.Yu3x(J7C, JSON.stringify(D7w));
            delete by7r[J7C]
        };
        return function () {
            k7d.eC9t(R7K, cCR6L)
        }
    }();
    h7a.s7l(document, 'storageready', cCT6N);
    be7X.buM1x()
})();
(function () {
    var c7f = NEJ.P,
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut'),
        Lm9d;
    if (!!O7H.btL1x) return;
    O7H.btL1x = NEJ.C();
    Lm9d = O7H.btL1x.N7G(O7H.cI8A);
    Lm9d.cx8p = function () {
        var gI0x = +(new Date),
            nl2x = 'dat-' + gI0x;
        return function () {
            this.cF8x();
            var R7K = this.constructor[nl2x];
            if (!R7K) {
                R7K = {};
                this.constructor[nl2x] = R7K
            }
            this.S7L = R7K
        }
    }();
    Lm9d.B7u = function (J7C) {
        return this.S7L[J7C]
    };
    Lm9d.na2x = function (J7C, D7w) {
        var nm2x = this.S7L[J7C];
        this.S7L[J7C] = D7w;
        h7a.z7s(localCache, 'cachechange', {
            key: J7C,
            type: 'set',
            oldValue: nm2x,
            newValue: D7w
        });
        return this
    };
    Lm9d.cJ8B = function (J7C) {
        var nm2x = this.S7L[J7C];
        k7d.bcg4k(this.S7L, J7C);
        h7a.z7s(localCache, 'cachechange', {
            key: J7C,
            type: 'delete',
            oldValue: nm2x,
            newValue: undefined
        });
        return nm2x
    };
    Lm9d.Ym3x = function (Go7h) {
        return NEJ.Q(this.S7L, Go7h)
    };
    window.localCache = O7H.btL1x.A7t();
    O7H.fI9z.A7t({
        element: localCache,
        event: 'cachechange'
    })
})();
(function () {
    var c7f = NEJ.P,
        fA9r = NEJ.R,
        br7k = NEJ.F,
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        O7H = c7f('nej.ut'),
        nl2x = 'dat-' + +(new Date),
        no2x;
    if (!!O7H.btF1x) return;
    O7H.btF1x = NEJ.C();
    no2x = O7H.btF1x.N7G(O7H.cI8A);
    no2x.cx8p = function () {
        this.cF8x();
        this.S7L = this.constructor[nl2x];
        if (!this.S7L) {
            this.S7L = {};
            this.S7L[nl2x + '-l'] = {};
            this.constructor[nl2x] = this.S7L
        }
    };
    no2x.sz3x = function (J7C) {
        return this.S7L[J7C]
    };
    no2x.qe3x = function (J7C, D7w) {
        this.S7L[J7C] = D7w
    };
    no2x.lJ1x = function (J7C, kv1x) {
        var j7c = this.sz3x(J7C);
        if (j7c == null) {
            j7c = kv1x;
            this.qe3x(J7C, j7c)
        }
        return j7c
    };
    no2x.cCQ6K = function (J7C) {
        if (J7C != null) {
            delete this.S7L[J7C];
            return
        }
        k7d.eC9t(this.S7L, function (p7i, J7C) {
            if (J7C == nl2x + '-l') return;
            this.cCQ6K(J7C)
        }, this)
    };
    no2x.cDQ6K = function (J7C) {
        if (!!v7o.Lk9b) return v7o.Lk9b(J7C)
    };
    no2x.cCL6F = function (J7C) {
        if (!!v7o.tI4M) return v7o.tI4M(J7C)
    };
    no2x.cCK6E = function (J7C, D7w) {
        if (!!v7o.uk4o) v7o.uk4o(J7C, D7w)
    };
    no2x.Hw8o = function (J7C, kv1x) {
        var j7c = this.RB1x(J7C);
        if (j7c == null) {
            j7c = kv1x;
            this.wg4k(J7C, j7c)
        }
        return j7c
    };
    no2x.RB1x = function (J7C) {
        var j7c = this.sz3x(J7C);
        if (j7c != null) return j7c;
        j7c = this.cCL6F(J7C);
        if (j7c != null) this.qe3x(J7C, j7c);
        return j7c
    };
    no2x.wg4k = function (J7C, D7w) {
        this.cCK6E(J7C, D7w);
        this.qe3x(J7C, D7w)
    };
    no2x.bRv7o = function (J7C) {
        if (J7C != null) {
            delete this.S7L[J7C];
            if (!!v7o.Lk9b) v7o.Lk9b(J7C);
            return
        }
        k7d.eC9t(this.S7L, function (p7i, J7C) {
            if (J7C == nl2x + '-l') return;
            this.bRv7o(J7C)
        }, this)
    };
    no2x.cDR6L = function () {
        this.bRv7o();
        return this
    };
    no2x.cDS6M = function (J7C) {
        var j7c = this.S7L[nl2x + '-l'];
        delete j7c[J7C]
    };
    no2x.bsO0x = function (J7C) {
        var j7c = this.S7L[nl2x + '-l'],
            bf7Y = fA9r.slice.call(arguments, 1);
        k7d.bd7W(j7c[J7C], function (cN8F) {
            try {
                cN8F.apply(null, bf7Y)
            } catch (ex) {
                console.error(ex.message);
                console.error(ex.stack)
            }
        });
        delete j7c[J7C]
    };
    no2x.bxq1x = function (J7C, cN8F) {
        cN8F = cN8F || br7k;
        var i7b = this.S7L[nl2x + '-l'][J7C];
        if (!i7b) {
            i7b = [
                cN8F
            ];
            this.S7L[nl2x + '-l'][J7C] = i7b;
            return !1
        }
        i7b.push(cN8F);
        return !0
    };
    no2x.cCF6z = function (i7b, bi7b, fY0x) {
        if (!i7b) return !1;
        bi7b = parseInt(bi7b) || 0;
        fY0x = parseInt(fY0x) || 0;
        if (!fY0x) {
            if (!i7b.loaded) return !1;
            fY0x = i7b.length
        }
        if (!!i7b.loaded) fY0x = Math.min(fY0x, i7b.length - bi7b);
        for (var i = 0; i < fY0x; i++)
            if (!i7b[bi7b + i]) return !1;
        return !0
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut'),
        b7g,
        K7D;
    if (!!O7H.RE1x) return;
    O7H.RE1x = NEJ.C();
    b7g = O7H.RE1x.N7G(O7H.btF1x);
    K7D = O7H.RE1x.ct8l;
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.xe5j = e7d.key || 'id';
        this.bl7e = e7d.data || bb7U;
        this.cCE6y = !!e7d.autogc;
        this.cCC6w(e7d.id)
    };
    b7g.bD8v = function () {
        this.bG8y();
        if (!!this.ed9U) {
            this.bSW8O()
        }
    };
    b7g.cCC6w = function (C7v) {
        var R7K;
        if (!!C7v) {
            R7K = this.S7L[C7v];
            if (!R7K) {
                R7K = {};
                this.S7L[C7v] = R7K
            }
        }
        R7K = R7K || this.S7L;
        R7K.hash = R7K.hash || {};
        this.RH1x = R7K
    };
    b7g.bSW8O = function () {
        this.ed9U = window.clearTimeout(this.ed9U);
        var by7r = {};
        k7d.eC9t(this.RH1x, function (i7b, J7C) {
            if (J7C == 'hash') return;
            if (!k7d.eJ9A(i7b)) return;
            k7d.bd7W(i7b, function (p7i) {
                if (!p7i) return;
                by7r[p7i[this.xe5j]] = !0
            }, this)
        }, this);
        k7d.eC9t(this.Yh3x(), function (p7i, C7v, dO9F) {
            if (!by7r[C7v]) {
                delete dO9F[C7v]
            }
        })
    };
    b7g.cCB6v = function () {
        if (!!this.ed9U) {
            this.ed9U = window.clearTimeout(this.ed9U)
        }
        this.ed9U = window.setTimeout(this.bSW8O.g7b(this), 150)
    };
    b7g.Co6i = function (p7i, Yg3x) {
        p7i = this.bTx8p(p7i, Yg3x) || p7i;
        if (!p7i) return null;
        var J7C = p7i[this.xe5j];
        if (J7C != null) {
            var id0x = this.Yh3x()[J7C];
            if (!!id0x) p7i = NEJ.X(id0x, p7i);
            this.Yh3x()[J7C] = p7i
        }
        delete p7i.bTP8H;
        return p7i
    };
    b7g.bTx8p = br7k;
    b7g.brG0x = function (J7C, p7i) {
        if (!p7i) return;
        if (!k7d.eJ9A(p7i)) {
            var i7b = this.hI0x(J7C),
                p7i = this.Co6i(p7i, J7C);
            if (!!p7i) i7b.unshift(p7i);
            return
        }
        k7d.nz2x(p7i, this.brG0x.g7b(this, J7C))
    };
    b7g.RN1x = function (J7C, cy8q) {
        var i7b = this.hI0x(J7C);
        i7b.length = Math.max(i7b.length, cy8q);
        this.brv0x(J7C);
        return this
    };
    b7g.kg1x = function (J7C) {
        return this.hI0x(J7C).length
    };
    b7g.brv0x = function (J7C, oB2x) {
        this.hI0x(J7C).loaded = oB2x != !1;
        return this
    };
    b7g.Ya3x = function (J7C) {
        return !!this.hI0x(J7C).loaded
    };
    b7g.uc4g = function (J7C, i7b) {
        this.uZ4d(J7C);
        this.bre0x({
            key: J7C,
            offset: 0,
            limit: i7b.length + 1
        }, {
            list: i7b,
            total: i7b.length
        })
    };
    b7g.hI0x = function () {
        var DY7R = function (J7C) {
            return (J7C || '') + (!J7C ? '' : '-') + 'list'
        };
        return function (J7C) {
            var J7C = DY7R(J7C),
                i7b = this.RH1x[J7C];
            if (!i7b) {
                i7b = [];
                this.RH1x[J7C] = i7b
            }
            return i7b
        }
    }();
    b7g.Yh3x = function () {
        var dO9F = this.RH1x.hash;
        if (!dO9F) {
            dO9F = {};
            this.RH1x.hash = dO9F
        }
        return dO9F
    };
    b7g.bra0x = function () {
        var DY7R = function (e7d) {
            return 'r-' + e7d.key
        };
        return function (e7d) {
            var jg0x = NEJ.X({}, e7d),
                nQ2x = DY7R(jg0x);
            if (!this.bxq1x(nQ2x, this.z7s.g7b(this))) {
                jg0x.rkey = nQ2x;
                jg0x.onload = this.cCA6u.g7b(this, jg0x);
                this.z7s('dopullrefresh', jg0x)
            }
            return this
        }
    }();
    b7g.cCA6u = function (e7d, i7b) {
        this.brG0x(e7d.key, i7b);
        this.bsO0x(e7d.rkey, 'onpullrefresh', e7d)
    };
    b7g.lQ1x = function () {
        var DY7R = function (e7d) {
            return 'r-' + e7d.key + '-' + e7d.offset + '-' + e7d.limit
        };
        return function (e7d) {
            e7d = e7d || bb7U;
            var jg0x = {
                    key: '' + e7d.key || '',
                    ext: e7d.ext || null,
                    data: e7d.data || null,
                    offset: parseInt(e7d.offset) || 0,
                    limit: parseInt(e7d.limit) || 0
                },
                i7b = this.hI0x(jg0x.key);
            if (this.cCF6z(i7b, jg0x.offset, jg0x.limit)) {
                this.z7s('onlistload', jg0x);
                return this
            }
            var nQ2x = DY7R(jg0x);
            if (!this.bxq1x(nQ2x, this.z7s.g7b(this))) {
                jg0x.rkey = nQ2x;
                jg0x.onload = this.bre0x.g7b(this, jg0x);
                this.z7s('doloadlist', jg0x)
            }
            return this
        }
    }();
    b7g.bre0x = function () {
        var DS7L = function (p7i, r7k, i7b) {
            if (!!p7i) {
                return !0
            }
            i7b.splice(r7k, 1)
        };
        return function (e7d, o7h) {
            e7d = e7d || bb7U;
            var J7C = e7d.key,
                bi7b = e7d.offset,
                byk2x = this.hI0x(J7C);
            var i7b = o7h || [];
            if (!k7d.eJ9A(i7b)) {
                i7b = o7h.result || o7h.list || [];
                var cy8q = parseInt(o7h.total);
                if (!isNaN(cy8q) || cy8q > i7b.length) {
                    this.RN1x(J7C, cy8q)
                }
            }
            k7d.bd7W(i7b, function (p7i, r7k) {
                byk2x[bi7b + r7k] = this.Co6i(p7i, J7C)
            }, this);
            if (i7b.length < e7d.limit) {
                this.brv0x(J7C);
                k7d.nz2x(byk2x, DS7L)
            }
            this.bsO0x(e7d.rkey, 'onlistload', e7d)
        }
    }();
    b7g.uZ4d = function () {
        var DS7L = function (p7i, r7k, i7b) {
            i7b.splice(r7k, 1)
        };
        return function (J7C) {
            var i7b = this.hI0x(J7C);
            k7d.nz2x(i7b, DS7L);
            this.brv0x(J7C, !1);
            if (this.cCE6y) {
                this.cCB6v()
            }
            return this
        }
    }();
    b7g.byz2x = function (p7i, Yg3x) {
        return !p7i.bTP8H
    };
    b7g.eH9y = function (C7v) {
        return this.Yh3x()[C7v]
    };
    b7g.cDT6N = function (C7v) {
        var p7i = this.eH9y(C7v);
        if (!!p7i) p7i.bTP8H = !0
    };
    b7g.XR3x = function () {
        var DY7R = function (e7d) {
            return 'r-' + e7d.key + '-' + e7d.id
        };
        return function (e7d) {
            e7d = e7d || bb7U;
            var C7v = e7d[this.xe5j],
                jg0x = {
                    id: C7v,
                    ext: e7d.ext,
                    data: e7d.data || {},
                        key: '' + e7d.key || ''
                };
            p7i = this.eH9y(C7v);
            jg0x.data[this.xe5j] = C7v;
            if (!!p7i && this.byz2x(p7i, jg0x.key)) {
                this.z7s('onitemload', jg0x);
                return this
            }
            var nQ2x = DY7R(jg0x);
            if (!this.bxq1x(nQ2x, this.z7s.g7b(this))) {
                jg0x.rkey = nQ2x;
                jg0x.onload = this.cCx6r.g7b(this, jg0x);
                this.z7s('doloaditem', jg0x)
            }
            return this
        }
    }();
    b7g.cCx6r = function (e7d, p7i) {
        e7d = e7d || bb7U;
        this.Co6i(p7i, e7d.key);
        this.bsO0x(e7d.rkey, 'onitemload', e7d)
    };
    b7g.jE1x = function (e7d) {
        e7d = NEJ.X({}, e7d);
        e7d.onload = this.yp5u.g7b(this, e7d);
        this.z7s('doadditem', e7d)
    };
    b7g.yp5u = function (e7d, p7i) {
        var J7C = e7d.key;
        p7i = this.Co6i(p7i, J7C);
        if (!!p7i) {
            var fd9U = 0,
                i7b = this.hI0x(J7C);
            if (!e7d.push) {
                fd9U = -1;
                var bi7b = e7d.offset || 0;
                i7b.splice(bi7b, 0, p7i)
            } else if (i7b.loaded) {
                fd9U = 1;
                i7b.push(p7i)
            } else {
                i7b.length++
            }
        }
        var d7e = {
            key: J7C,
            flag: fd9U,
            data: p7i,
            action: 'add',
            ext: e7d.ext
        };
        this.z7s('onitemadd', d7e);
        return d7e
    };
    b7g.Lw9n = function (e7d) {
        e7d = NEJ.X({}, e7d);
        e7d.onload = this.bpU0x.g7b(this, e7d);
        this.z7s('dodeleteitem', e7d)
    };
    b7g.bpU0x = function (e7d, bzD2x) {
        var p7i,
            J7C = e7d.key;
        if (!!bzD2x) {
            p7i = this.eH9y(e7d.id) || null;
            var C7v = e7d.id,
                cCw6q = this.xe5j,
                i7b = this.hI0x(J7C),
                r7k = k7d.dj9a(i7b, function (id0x) {
                    return !!id0x && id0x[cCw6q] == C7v
                });
            if (r7k >= 0) i7b.splice(r7k, 1)
        }
        var d7e = {
            key: J7C,
            data: p7i,
            action: 'delete',
            ext: e7d.ext
        };
        this.z7s('onitemdelete', d7e);
        return d7e
    };
    b7g.XQ3x = function (e7d) {
        e7d = NEJ.X({}, e7d);
        e7d.onload = this.cCu6o.g7b(this, e7d);
        this.z7s('doupdateitem', e7d)
    };
    b7g.cCu6o = function (e7d, p7i) {
        var J7C = e7d.key;
        if (!!p7i) p7i = this.Co6i(p7i, J7C);
        var d7e = {
            key: J7C,
            data: p7i,
            action: 'update',
            ext: e7d.ext
        };
        this.z7s('onitemupdate', d7e);
        return d7e
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut'),
        b7g;
    if (!!O7H.bpJ9A) return;
    O7H.bpJ9A = NEJ.C();
    b7g = O7H.bpJ9A.N7G(O7H.RE1x);
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.boU9L({
            doloadlist: this.XO3x.g7b(this),
            doloaditem: this.bpG9x.g7b(this),
            doadditem: this.bAb2x.g7b(this),
            dodeleteitem: this.XL3x.g7b(this),
            doupdateitem: this.XJ3x.g7b(this),
            dopullrefresh: this.bAw2x.g7b(this)
        })
    };
    b7g.XO3x = br7k;
    b7g.bAw2x = br7k;
    b7g.bpG9x = br7k;
    b7g.bAb2x = br7k;
    b7g.XL3x = br7k;
    b7g.XJ3x = br7k
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        I7B = c7f('nej.ut'),
        l7e = c7f('nm.x'),
        q7j = c7f('nm.d'),
        b7g,
        K7D;
    q7j.hE0x = NEJ.C();
    b7g = q7j.hE0x.N7G(I7B.bpJ9A);
    b7g.cp8h = function () {
        var Bh6b = location.protocol + '//' + location.host;
        var cCt6n = function (bs7l, j7c) {
            var by7r = {
                conf: {},
                data: {},
                urls: []
            };
            k7d.bd7W(bs7l, function (J7C, r7k, i7b) {
                var bg7Z = q7j.B7u(J7C);
                if (!bg7Z) return;
                var boY9P = bAW2x(bg7Z.url, j7c[J7C]);
                by7r.urls.push(boY9P);
                by7r.conf[boY9P] = bg7Z;
                by7r.data[boY9P] = JSON.stringify(j7c[J7C] == null ? '' : j7c[J7C])
            });
            return by7r
        };
        var bAW2x = function (Y7R, j7c) {
            return Y7R.replace(/\{(.*?)\}/gi, function ($1, $2) {
                return j7c[$2] || $1
            })
        };
        var bAX2x = function (bg7Z, e7d, d7e) {
            h7a.z7s(window, 'requesterror', d7e);
            if (!!d7e.stopped) return;
            var CO6I = bg7Z.onerror || e7d.onerror;
            if (k7d.fH9y(CO6I)) {
                this.z7s(CO6I, d7e, e7d)
            } else {
                (CO6I || br7k).call(this, d7e, e7d)
            }
            var d7e = {
                result: d7e,
                option: e7d
            };
            this.z7s('onerror', d7e);
            if (!d7e.stopped)(bg7Z.onmessage || br7k).call(this, d7e.result.code, d7e.result)
        };
        var bBd2x = function (Q7J, bg7Z, e7d) {
            var o7h = Q7J;
            if (k7d.gG0x(bg7Z.format)) {
                o7h = bg7Z.format.call(this, Q7J, e7d)
            }
            return o7h
        };
        var yJ5O = function (Q7J, bg7Z, e7d, vW4a) {
            if (k7d.gG0x(bg7Z.beforeload)) {
                bg7Z.beforeload.call(this, Q7J, e7d, bg7Z)
            }
            if (Q7J && Q7J.code != null && Q7J.code != 200) {
                bAX2x.call(this, bg7Z, e7d, {
                    key: e7d.key,
                    code: Q7J.code,
                    message: Q7J.message || '',
                    captchaId: Q7J.captchaId,
                    ext: Q7J
                });
                return
            }
            var o7h = Q7J;
            if (!vW4a) {
                o7h = bBd2x.call(this, Q7J, bg7Z, e7d)
            } else if (k7d.gG0x(bg7Z.format)) {
                var boV9M = [];
                k7d.bd7W(vW4a.urls, function (Y7R) {
                    boV9M.push(bBd2x.call(this, Q7J[Y7R], vW4a.conf[Y7R], e7d))
                }, this);
                boV9M.push(e7d);
                o7h = bg7Z.format.apply(this, boV9M)
            }
            var sw3x = bg7Z.onload || e7d.onload,
                bBB2x = bg7Z.finaly || e7d.finaly || br7k;
            if (k7d.fH9y(sw3x)) {
                bBB2x.call(this, this.z7s(sw3x, o7h), e7d)
            } else {
                bBB2x.call(this, (sw3x || br7k).call(this, o7h), e7d)
            }
        };
        var Ar6l = function (bg7Z, e7d, cb8T) {
            bAX2x.call(this, bg7Z, e7d, {
                key: e7d.key,
                code: cb8T.code || -1,
                message: cb8T.message || ''
            })
        };
        return function (bg7Z, e7d) {
            if (k7d.fH9y(bg7Z)) {
                bg7Z = q7j.B7u(bg7Z)
            }
            delete e7d.value;
            (bg7Z.filter || br7k).call(this, e7d, bg7Z);
            var Q7J = e7d.value;
            if (!!Q7J) {
                yJ5O.call(this, Q7J, bg7Z, e7d);
                return
            }
            var Y7R,
                j7c = e7d.data || bb7U,
                Ak6e = {
                    cookie: !0,
                    type: bg7Z.rtype || 'json',
                    method: bg7Z.type || 'POST',
                    onerror: Ar6l.g7b(this, bg7Z, e7d),
                    noescape: bg7Z.noescape
                };
            if (k7d.eJ9A(bg7Z.url)) {
                var vW4a = cCt6n(bg7Z.url, j7c);
                Y7R = Bh6b + '/api/batch';
                Ak6e.data = k7d.cC8u(vW4a.data);
                Ak6e.onload = yJ5O.ey9p(this, bg7Z, e7d, vW4a);
                Ak6e.headers = {
                    'batch-method': 'POST'
                };
                delete vW4a.data
            } else {
                var ke1x = bg7Z.url.indexOf(':') < 0 ? Bh6b : '';
                Y7R = bAW2x(ke1x + bg7Z.url, j7c);
                Ak6e.data = k7d.cC8u(e7d.data);
                Ak6e.onload = yJ5O.ey9p(this, bg7Z, e7d)
            }
            if (Ak6e.method == 'GET') Ak6e.query = Ak6e.data;
            return v7o.bn7g(Y7R, Ak6e)
        }
    }();
    b7g.Fi7b = function () {
        var gK0x = /^get|list|pull$/i;
        return function (bCa3x, e7d) {
            var J7C = e7d.key,
                bg7Z = q7j.B7u(J7C.split('-')[0] + '-' + bCa3x);
            if (gK0x.test(bCa3x) && J7C.indexOf('post-') < 0) bg7Z.type = 'GET';
            this.cp8h(bg7Z, e7d)
        }
    }();
    b7g.cDU6O = function (J7C, i7b) {
        var cy8q = i7b.length;
        this.bre0x({
            key: J7C,
            offset: 0,
            limit: cy8q + 1
        }, {
            list: i7b,
            total: cy8q
        })
    };
    b7g.XO3x = function (e7d) {
        this.Fi7b('list', e7d)
    };
    b7g.bpG9x = function (e7d) {
        this.Fi7b('get', e7d)
    };
    b7g.bAw2x = function (e7d) {
        this.Fi7b('pull', e7d)
    };
    b7g.bAb2x = function (e7d) {
        this.Fi7b('add', e7d)
    };
    b7g.XL3x = function (e7d) {
        this.Fi7b('del', e7d)
    };
    b7g.XJ3x = function (e7d) {
        this.Fi7b('update', e7d)
    };
    b7g.cCo6i = function (p7i) {
        this.Co6i(p7i)
    };
    I7B.fI9z.A7t({
        element: window,
        event: 'requesterror'
    })
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        h7a = c7f('nej.v'),
        I7B = c7f('nej.ut'),
        q7j = c7f('nm.d'),
        boR9I = {},
        b7g,
        K7D;
    var uq4u = function (o7h, e7d) {
        o7h.conf = e7d.conf;
        return o7h
    };
    q7j.ff9W({
        'res-mv-get': {
            type: 'GET',
            url: '/api/v1/mv/detail',
            format: function (Q7J, e7d) {
                return uq4u({
                    mv: Q7J
                }, e7d)
            }
        },
        'res-song-get': {
            type: 'GET',
            url: '/api/song/detail',
            format: function (o7h, e7d) {
                    if (!!o7h.songs && o7h.songs.length > 0) o7h.song = o7h.songs[0];
                    else o7h.song = boR9I;
                    delete o7h.songs;
                    return uq4u(o7h, e7d)
                },
                filter: function (e7d) {
                    e7d.data.ids = '[' + e7d.data.id + ']'
                }
        },
        'res-program-get': {
            type: 'GET',
            url: '/api/dj/program/detail',
            format: uq4u
        },
        'res-album-get': {
            type: 'GET',
            url: '/api/album/{id}',
            format: uq4u
        },
        'res-playlist-get': {
            type: 'GET',
            url: '/api/playlist/detail',
            format: function (o7h, e7d) {
                o7h.playlist = o7h.result;
                delete o7h.result;
                return uq4u(o7h, e7d)
            }
        },
        'res-mv-play': {
            type: 'GET',
            url: '/api/song/mv/play',
            format: uq4u
        },
        'res-playlist-play': {
            type: 'GET',
            url: '/api/playlist/update/playcount',
            format: uq4u
        },
        'res-program-play': {
            type: 'GET',
            url: '/api/dj/program/listen',
            format: uq4u
        },
        'res-djradio-get': {
            type: 'GET',
            url: '/api/dj/program/byradio',
            filter: function (e7d) {
                    var i7b = e7d.data.id.split('-');
                    e7d.data.radioId = i7b[0];
                    e7d.data.asc = i7b[1] == 2;
                    e7d.data.limit = 1000;
                    delete e7d.data.id
                },
                format: function (Q7J, e7d) {
                    var cCn6h = {
                        id: e7d.data.radioId,
                        programs: Q7J.programs
                    };
                    return uq4u({
                        djradio: cCn6h
                    }, e7d)
                }
        },
        'res-hotSongs-get': {
            type: 'GET',
            url: '/api/artist/{id}',
            format: uq4u
        },
        'res-lyric-get': {
            type: 'GET',
            url: '/api/song/lyric',
            filter: function (e7d) {
                    e7d.data.lv = 0;
                    e7d.data.tv = 0
                },
                format: function (o7h, e7d) {
                    var wC5H = {
                        lyric: '',
                        nolyric: true
                    };
                    if (o7h.code == 200 && o7h.lrc && o7h.lrc.lyric) {
                        wC5H.lyric = o7h.lrc.lyric;
                        wC5H.nolyric = false
                    } else {
                        wC5H.nolyric = true
                    }
                    return uq4u({
                        lyric: wC5H
                    }, e7d)
                }
        }
    });
    q7j.wO5T = NEJ.C();
    b7g = q7j.wO5T.N7G(q7j.hE0x);
    b7g.cCl6f = function (u7n, cT8L) {
        return this.sz3x(this.XE3x(u7n, cT8L))
    };
    b7g.Si1x = function (u7n, cT8L, e7d) {
        e7d = e7d || {};
        var j7c = this.sz3x(this.XE3x(u7n, cT8L));
        if (j7c && (u7n != 13 && u7n != 19 || e7d.conf && e7d.conf.useCache)) {
            this.z7s('onresourceload', u7n, cT8L, j7c, e7d.conf);
            return
        }
        e7d.data = {
            id: cT8L
        };
        e7d.onload = this.cCk6e.g7b(this, u7n, cT8L);
        e7d.onerror = this.cCj6d.g7b(this, u7n, cT8L);
        this.cp8h('res-' + this.BJ6D(u7n) + '-get', e7d)
    };
    b7g.cCk6e = function (u7n, cT8L, o7h) {
        var j7c = o7h[this.BJ6D(u7n)];
        this.qe3x(this.XE3x(u7n, cT8L), j7c);
        this.z7s('onresourceload', u7n, cT8L, j7c, o7h.conf)
    };
    b7g.cCj6d = function (u7n, cT8L, o7h, e7d) {
        if (o7h.code != 404) {
            this.z7s('onresourceerror', u7n, cT8L, o7h.code);
            return
        }
        this.qe3x(this.XE3x(u7n, cT8L), boR9I);
        this.z7s('onresourceload', u7n, cT8L, boR9I, e7d.conf)
    };
    b7g.cDV6P = function (u7n, e7d) {
        this.cp8h('res-' + this.BJ6D(u7n) + '-play', e7d)
    };
    b7g.XE3x = function (u7n, cT8L) {
        return 'res-' + this.BJ6D(u7n) + '-' + cT8L
    };
    b7g.BJ6D = function (u7n) {
        var by7r = {
            2: 'hotSongs',
            13: 'playlist',
            17: 'program',
            18: 'song',
            19: 'album',
            21: 'mv',
            41: 'lyric',
            70: 'djradio'
        };
        return by7r[u7n]
    };
    q7j.wO5T.LA9r = function (u7n, cT8L) {
        if (!this.fi9Z) this.fi9Z = q7j.wO5T.A7t({});
        return this.fi9Z.cCl6f(u7n, cT8L)
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        bnF9w = /^[1-9][0-9]*$/,
        b7g,
        K7D;
    var LOCAL_LOG_KEY = 'local-log';
    q7j.ff9W({
        'bi-log': {
            url: '/api/feedback/weblog'
        },
        'bi-batch-log': {
            url: '/api/feedback/weblog'
        },
        'plus-mv-count': {
            url: '/api/song/mv/play'
        },
        'plus-song-count': {
            url: '/api/song/play'
        },
        'plus-dj-count': {
            type: 'GET',
            url: '/api/dj/program/listen'
        },
        'plus-playlist-count': {
            type: 'GET',
            url: '/api/playlist/update/playcount'
        }
    });
    q7j.hT0x = NEJ.C();
    b7g = q7j.hT0x.N7G(q7j.hE0x);
    b7g.eT9K = function (U7N, bg7Z) {
        if (!U7N || !bg7Z) return;
        if (k7d.fH9y(bg7Z)) {
            try {
                bg7Z = JSON.parse(bg7Z)
            } catch (_e) {
                if (console && console.warn) {
                    console.warn('bilog error: ', a6g)
                }
            }
        }
        if (!k7d.ly1x(bg7Z)) return;
        this.cp8h('bi-log', {
            data: {
                logs: JSON.stringify([{
                    action: U7N,
                    json: bg7Z
                }])
            }
        });
        if (typeof GEnvType == 'string' && GEnvType == 'local') {
            console.log('[BI LOG] action=' + U7N + ', json=' + JSON.stringify(bg7Z))
        }
    };
    b7g.Xy2x = function (nT2x) {
        if (!k7d.eJ9A(nT2x)) return;
        this.cp8h('bi-batch-log', {
            data: {
                logs: JSON.stringify(nT2x)
            }
        })
    };
    b7g.bDB3x = function (bg7Z) {
        if (!bg7Z || !bg7Z.type || !bg7Z.rid) return;
        var nU2x = bg7Z.type;
        if (bnF9w.test(nU2x)) {
            nU2x = this.BJ6D(nU2x)
        }
        if (!nU2x) return;
        if (nU2x == 'playlist') nU2x = 'list';
        this.eT9K('search', {
            type: nU2x,
            id: bg7Z.rid || null,
            keyword: bg7Z.keyword || null
        })
    };
    b7g.Sr1x = function () {
        var cCe6Y = /^\/m\/(song|album|playlist)\?id=(\d+)/;
        return function (bg7Z) {
            if (!bg7Z || !bg7Z.type || !bg7Z.rid) return;
            if (bg7Z.play === undefined) bg7Z.play = true;
            var nU2x = bg7Z.type;
            if (bnF9w.test(nU2x)) {
                nU2x = this.BJ6D(nU2x)
            }
            if (!nU2x) return;
            if (nU2x == 'playlist') nU2x = 'list';
            var Q7J = {
                id: bg7Z.rid,
                type: nU2x
            };
            if (nU2x == 'song' && bg7Z.source) {
                Q7J.source = this.bDQ3x(bg7Z.source);
                if (!!bg7Z.sourceid) Q7J.sourceid = bg7Z.sourceid
            }
            this.eT9K(!bg7Z.play ? 'addto' : 'play', Q7J);
            if (nU2x == 'song' && bg7Z.hash && bg7Z.hash.match(cCe6Y)) {
                this.eT9K(!bg7Z.play ? 'addto' : 'play', {
                    type: RegExp.$1,
                    id: RegExp.$2
                })
            }
        }
    }();
    b7g.bnn8f = function (C7v, bA7t, eb9S, Gr7k) {
        var Q7J = {
            type: 'song',
            wifi: 0,
            download: 0
        };
        var cCb6V = {
            1: 'ui',
            2: 'playend',
            3: 'interrupt',
            4: 'exception'
        };
        Q7J.id = C7v;
        Q7J.time = Math.round(bA7t);
        Q7J.end = k7d.fH9y(Gr7k) ? Gr7k : cCb6V[Gr7k] || '';
        if (eb9S && eb9S.fid) {
            Q7J.source = this.bDQ3x(eb9S.fid);
            Q7J.sourceId = eb9S.fdata
        }
        this.eT9K('play', Q7J)
    };
    b7g.bEg3x = function (u7n, cT8L) {
        if (!u7n || !cT8L) return;
        if (bnF9w.test(u7n)) u7n = this.BJ6D(u7n);
        if (u7n != 'playlist' && u7n != 'dj') return;
        var bg7Z = q7j.B7u('plus-' + u7n + '-count');
        if (!bg7Z) return !1;
        this.cp8h(bg7Z, {
            data: {
                id: cT8L
            }
        });
        var R7K = this.lJ1x('play-hist-' + u7n, []);
        if (k7d.dj9a(R7K, cT8L) < 0) {
            R7K.push(cT8L);
            return !0
        }
        return !1
    };
    b7g.BJ6D = function (u7n) {
        var by7r = {
            1: 'user',
            2: 'artist',
            13: 'playlist',
            17: 'dj',
            18: 'song',
            19: 'album',
            21: 'mv',
            31: 'toplist'
        };
        return by7r[u7n]
    };
    b7g.bDQ3x = function (LC9t) {
        var by7r = {
            1: 'user',
            2: 'artist',
            13: 'list',
            17: 'dj',
            18: 'song',
            19: 'album',
            21: 'mv',
            31: 'toplist',
            32: 'search',
            33: 'search',
            34: 'event',
            35: 'msg'
        };
        return by7r[LC9t]
    };
    b7g.bEm3x = function (hi0x) {
        var nT2x = this.Hw8o(LOCAL_LOG_KEY, []);
        nT2x.unshift(hi0x);
        if (nT2x.length > 200) {
            nT2x.length = 200
        }
        this.wg4k(LOCAL_LOG_KEY, nT2x)
    };
    b7g.cBZ6T = function () {
        return this.RB1x(LOCAL_LOG_KEY)
    };
    b7g.ek9b = function (Q7J) {
        this.eT9K('play', Q7J)
    };
    var bEG3x = q7j.hT0x.go0x();
    l7e.sk3x = function () {
        bEG3x.eT9K.apply(bEG3x, arguments)
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        I7B = c7f('nej.ut'),
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        m7f = c7f('nm.l'),
        l7e = c7f('nm.x'),
        q7j = c7f('nm.d');
    var FullscreenApi = l7e.FX7Q || {};
    if (!q7j.wO5T) return;
    var R7K = q7j.wO5T.A7t({
        onresourceload: cBX6R
    });
    var uD4H = q7j.hT0x.go0x();

    function cBX6R(u7n, cT8L, j7c, bg7Z) {
        var i7b = [];
        switch (parseInt(u7n)) {
        case 2:
            i7b = j7c;
            break;
        case 13:
            i7b = j7c.tracks;
            break;
        case 18:
            i7b.push(j7c);
            break;
        case 19:
            i7b = j7c.songs;
            break;
        case 21:
            if (j7c.mp && j7c.mp.fee && j7c.mp.pl <= 0) {
                l7e.Sx1x(j7c.data.id, j7c.mp.fee);
                return
            }
            break
        }
        if (l7e.LF9w(i7b, true, null, u7n == 19 ? {
            source: 'album',
            sourceid: cT8L
        } : null) == 0) {
            return
        }
        l7e.fs9j({
            clazz: 'm-layer-w2',
            bubble: !1,
            message: bg7Z.message
        })
    }

    function cBW6Q(d7e, of2x, zl5q, ez9q) {
        ez9q = ez9q || {};
        if (d7e.action == 'ok') {
            if (zl5q) {
                location.dispatch2('/payfee?songId=' + zl5q)
            } else {
                location.dispatch2('/payfee?fee=' + of2x || 1)
            }
            uD4H.eT9K('click', {
                type: 'tobuyvip',
                name: 'box',
                source: ez9q.source || 'song',
                sourceid: ez9q.sourceid || zl5q || 0
            })
        } else if (d7e.action == 'song') {
            location.dispatch2('/payfee?singleSong=true&songId=' + zl5q);
            uD4H.eT9K('click', {
                type: 'tobuyone',
                name: 'box',
                source: ez9q.source || 'song',
                sourceid: ez9q.sourceid || zl5q || 0
            })
        }
    }

    function Sz1x(bH8z) {
        l7e.fs9j({
            clazz: 'm-layer-w2',
            bubble: !1,
            message: bH8z,
            btntxt: '知道了'
        })
    }

    function SA1x(bH8z, Q7J) {
        Sz1x((Q7J || bb7U).toast || bH8z)
    }
    l7e.it0x = function (bH8z, C7v, u7n, cBU6O, bj7c) {
        bH8z = bH8z || '由于版权保护，您所在的地区暂时无法使用。';
        if (cBU6O && bj7c && bj7c.privilege && bj7c.privilege.toast) {
            v7o.bn7g('/api/song/toast', {
                query: {
                    id: bj7c.id
                },
                type: 'json',
                onload: SA1x.g7b(this, bH8z),
                onerror: SA1x.g7b(this, bH8z)
            })
        } else if (C7v && u7n) {
            R7K.Si1x(u7n, C7v, {
                conf: {
                    message: bH8z,
                    useCache: u7n != 18
                }
            })
        } else {
            Sz1x(bH8z)
        }
    };
    l7e.uL4P = function (of2x, zl5q, u7n, ez9q, ny2x) {
        var bP8H,
            pi2x = 'm-popup-info',
            bmp8h = '单首购买',
            bmi8a = '马上去开通',
            cV8N = '唱片公司要求，当前歌曲须付费使用。',
            bFG3x = true;
        try {
            bP8H = top.api.feeMessage || {}
        } catch (e) {
            bP8H = {}
        }
        if (of2x == 1 || of2x == 8 || of2x == 16) {
            if (u7n == 'song') {
                pi2x = 'm-popup-song-buy';
                cV8N = bP8H['vip2'] || cV8N;
                bmi8a = bP8H['vip2button'] || '包月购买';
                bmp8h = bP8H['vip2link'] || bmp8h;
                if (ny2x && ny2x.flag !== undefined) {
                    var bs7l = ny2x.flag.toString(2).split('');
                    if (parseInt(bs7l.pop(), 10) == 1) {
                        bFG3x = false
                    }
                }
            } else {
                cV8N = bP8H['vip'] || cV8N
            }
        } else if (of2x == 4) {
            cV8N = bP8H['album'] || cV8N;
            bmi8a = '立即订购'
        } else {
            cV8N = bP8H['unknow'] || cV8N
        }
        l7e.kz1x({
            clazz: 'm-layer-w5',
            html: a6g.bZ8R(pi2x, {
                songTxt: bmp8h,
                tip: cV8N,
                oktext: bmi8a,
                cctext: '以后再说',
                showSongText: bFG3x
            }),
            onaction: cBW6Q.ey9p(null, of2x, zl5q, ez9q)
        })
    };
    l7e.bFH3x = function (hC0x, gg0x) {
        l7e.ho0x({
            title: '提示',
            message: '唱片公司要求，该歌曲须下载后播放',
            btnok: '下载',
            btncc: '取消',
            okstyle: 'u-btn2-w1',
            ccstyle: 'u-btn2-w1',
            action: function (u7n) {
                if (u7n == 'ok') {
                    l7e.Lh9Y({
                        id: hC0x,
                        type: gg0x
                    })
                }
            }
        })
    };
    l7e.Sx1x = function (kx1x, of2x) {
        var bP8H,
            cV8N = '唱片公司要求，当前歌曲须付费使用。';
        try {
            bP8H = top.api.feeMessage || {}
        } catch (e) {
            bP8H = {}
        }
        if (of2x == 1 || of2x == 8) {
            cV8N = bP8H['vip'] || cV8N
        } else if (of2x == 4) {
            cV8N = bP8H['album'] || cV8N
        } else {
            cV8N = bP8H['unknow'] || cV8N
        }
        return l7e.kz1x({
            parent: document[FullscreenApi.fullscreenElement] || document.body,
            clazz: 'm-layer-w5',
            html: a6g.bZ8R('m-popup-info', {
                tip: cV8N,
                oktext: '马上去开通',
                cctext: '以后再说'
            }),
            onaction: function (d7e) {
                if (d7e.action == 'ok') {
                    location.dispatch2('/payfee?mvId=' + kx1x);
                    uD4H.eT9K('click', {
                        type: 'tobuyone',
                        name: 'box',
                        source: 'mv',
                        sourceid: kx1x || 0
                    })
                }
            }
        })
    };
    l7e.LF9w = function () {
        function compareFee(cBT6N, cBQ6K) {
            var by7r = {
                1: 99,
                8: 99,
                4: 88,
                16: 99
            };
            return (by7r[cBT6N] || 0) - (by7r[cBQ6K] || 0)
        }
        return function (i7b, cV8N, se3x, ez9q) {
            se3x = se3x || {};
            var zi5n = [],
                LG9x = {},
                bGo4s = 0,
                bGv4z = 0,
                LH9y = null;
            if (!i7b || !i7b.length) return zi5n;
            k7d.bd7W(i7b, function (bj7c) {
                var fx9o = l7e.qk3x(bj7c);
                if (fx9o == 0) {
                    zi5n.push(bj7c)
                } else if (fx9o == 10) {
                    if (bj7c.privilege) {
                        bj7c.fee = bj7c.privilege.fee
                    }
                    if (compareFee(bj7c.fee, LG9x.fee) > 0) {
                        LG9x = bj7c
                    }
                } else if (fx9o == 11) {
                    ++bGo4s;
                    if (!se3x.play) zi5n.push(bj7c)
                } else if (fx9o == 1000) {
                    ++bGv4z;
                    if (!se3x.download) zi5n.push(bj7c)
                } else if (fx9o == 100) {
                    LH9y = bj7c
                }
            });
            if (zi5n.length == 0 && cV8N) {
                if (bGo4s == i7b.length) {
                    var sQ3x = i7b[0].privilege || {};
                    if (sQ3x.payed) {
                        l7e.it0x('唱片公司要求，该歌曲须下载后播放')
                    } else {
                        l7e.uL4P(sQ3x.fee, null, null, ez9q)
                    }
                } else if (bGv4z == i7b.length) {
                    l7e.it0x('因版权方要求，该歌曲不支持下载')
                } else if (LG9x.id) {
                    l7e.uL4P(LG9x.fee, LG9x.id, null, ez9q, LG9x.privilege)
                } else {
                    if (LH9y && i7b.length == 1 && LH9y.privilege && LH9y.privilege.st < 0 && LH9y.privilege.toast) {
                        l7e.it0x(null, null, null, true, LH9y)
                    } else {
                        l7e.it0x()
                    }
                }
            }
            return zi5n
        }
    }();
    l7e.qk3x = function (bj7c) {
        if (!bj7c) return 0;
        var fx9o = bj7c.privilege;
        if (bj7c.program) return 0;
        if (window.GAbroad) return 100;
        if (fx9o) {
            if (fx9o.st != null && fx9o.st < 0) {
                return 100
            }
            if (fx9o.fee > 0 && fx9o.fee != 8 && fx9o.payed == 0 && fx9o.pl <= 0) return 10;
            if (fx9o.fee == 16) return 11;
            if ((fx9o.fee == 0 || fx9o.payed) && fx9o.pl > 0 && fx9o.dl == 0) return 1000;
            if (fx9o.pl == 0 && fx9o.dl == 0) return 100;
            return 0
        } else {
            var et9k = bj7c.status != null ? bj7c.status : bj7c.st != null ? bj7c.st : 0;
            if (bj7c.status >= 0) return 0;
            if (bj7c.fee > 0) return 10;
            return 100
        }
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        fA9r = NEJ.R,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        w7p = c7f('nm.w'),
        b7g;
    if (!!w7p.bGK4O) return;
    var ck8c = ~ [];
    ck8c = {
        bGL4P: ++ck8c,
        cBO6I: (![] + '')[ck8c],
        kk1x: ++ck8c,
        LI9z: (![] + '')[ck8c],
        Xp2x: (ck8c[ck8c] + '')[ck8c],
        bHm4q: ++ck8c,
        cDX6R: ({} + '')[ck8c],
        cBL6F: (ck8c[ck8c] + '')[ck8c],
        cBK6E: (![] + '')[ck8c],
        SG1x: ++ck8c,
        Xn2x: (!'' + '')[ck8c],
        cDY6S: ++ck8c,
        Bg6a: ++ck8c,
        bIu4y: ({} + '')[ck8c],
        wa4e: ++ck8c,
        cBH6B: ++ck8c,
        cDZ6T: ++ck8c,
        cEa6U: ++ck8c
    };
    ck8c.LM9D = (ck8c.LM9D = ck8c + '')[ck8c.Bg6a] + (ck8c.LO9F = ck8c.LM9D[ck8c.kk1x]) + (ck8c.Xj2x = (ck8c.DL7E + '')[ck8c.kk1x]) + (!ck8c + '')[ck8c.SG1x] + (ck8c.DO7H = ck8c.LM9D[ck8c.wa4e]) + (ck8c.DL7E = (!'' + '')[ck8c.kk1x]) + (cBC6w = (!'' + '')[ck8c.bHm4q]) + ck8c.LM9D[ck8c.Bg6a] + ck8c.DO7H + ck8c.LO9F + ck8c.DL7E;
    ck8c.Xj2x = ck8c.DL7E + (!'' + '')[ck8c.SG1x] + ck8c.DO7H + cBC6w + ck8c.DL7E + ck8c.Xj2x;
    ck8c.DL7E = ck8c.bGL4P[ck8c.LM9D][ck8c.LM9D];
    w7p.bGK4O = ck8c
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        h7a = c7f('nej.v'),
        a6g = c7f('nej.e'),
        O7H = c7f('nej.ui'),
        b7g;
    if (!!O7H.Xh2x) return;
    var iR0x = a6g.sW3x('.#<uispace>{position:absolute;background:#fff;}');
    O7H.Xh2x = NEJ.C();
    b7g = O7H.Xh2x.N7G(O7H.Pu0x);
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.bX8P([
            [document,
                'click',
                this.sF3x.g7b(this)
            ]
        ]);
        this.cBA6u = !!e7d.nostop;
        this.bJO4S = {
            top: e7d.top,
            left: e7d.left
        }
    };
    b7g.bD8v = function () {
        delete this.Ah6b;
        delete this.bjF7y;
        delete this.qW3x;
        delete this.bKr5w;
        delete this.Xe2x;
        delete this.bJO4S;
        this.bG8y()
    };
    b7g.cf8X = function () {
        this.me1x = iR0x
    };
    b7g.bW8O = function () {
        this.cg8Y();
        this.BT6N = this.n7g;
        h7a.s7l(this.n7g, 'click', this.cBz6t.g7b(this))
    };
    b7g.sF3x = function (d7e) {
        if (d7e.button != 2) this.bt7m()
    };
    b7g.cBz6t = function (d7e) {
        if (this.cBA6u) return;
        h7a.tC4G(d7e);
        var F7y = h7a.W7P(d7e);
        if (F7y.tagName == 'A') h7a.cr8j(d7e)
    };
    b7g.cBy6s = function () {
        var dg9X = /\s+/i;
        return function (nV2x) {
            nV2x = (nV2x || '').trim().toLowerCase().split(dg9X);
            nV2x[0] = nV2x[0] || 'bottom';
            nV2x[1] = nV2x[1] || 'left';
            this.qW3x = nV2x
        }
    }();
    b7g.cBx6r = function (nV2x) {
        var o7h = {},
            ni2x = this.bjF7y,
            cEb6V = a6g.ow2x(),
            cA8s = this.n7g.offsetWidth,
            cc8U = this.n7g.offsetHeight;
        switch (nV2x[0]) {
        case 'top':
            o7h.top = ni2x.top - cc8U;
            o7h.left = nV2x[1] == 'right' ? ni2x.left + ni2x.width - cA8s : ni2x.left;
            break;
        case 'left':
            o7h.left = ni2x.left - cA8s;
            o7h.top = nV2x[1] == 'bottom' ? ni2x.top + ni2x.height - cc8U : ni2x.top;
            break;
        case 'right':
            o7h.left = ni2x.left + ni2x.width;
            o7h.top = nV2x[1] == 'bottom' ? ni2x.top + ni2x.height - cc8U : ni2x.top;
            break;
        default:
            o7h.top = ni2x.top + ni2x.height;
            o7h.left = nV2x[1] == 'right' ? ni2x.left + ni2x.width - cA8s : ni2x.left;
            break
        }
        return o7h
    };
    b7g.KC9t = function () {
        if (!this.bKr5w) {
            this.gJ0x(this.bJO4S);
            return
        }
        if (!!this.Xe2x) {
            this.gJ0x(this.Ah6b);
            return
        }
        if (!!this.bjF7y) this.gJ0x(this.cBx6r(this.qW3x))
    };
    b7g.cBv6p = function (F7y, do9f, d7e) {
        do9f = do9f || bb7U;
        var bLe5j = a6g.ow2x(),
            cX8P = h7a.jA1x(d7e) + (do9f.left || 0),
            hx0x = h7a.mf1x(d7e) + (do9f.top || 0),
            cA8s = F7y.offsetWidth + (do9f.right || 0),
            cc8U = F7y.offsetHeight + (do9f.bottom || 0),
            LW9N = bLe5j.scrollWidth,
            biv7o = bLe5j.scrollHeight,
            bip7i = cX8P + cA8s,
            bie7X = hx0x + cc8U;
        switch (this.qW3x[0]) {
        case 'top':
            hx0x = bie7X > biv7o ? hx0x - cc8U : hx0x;
            if (this.qW3x[1] == 'right') {
                cX8P = cX8P - cA8s < 0 ? 0 : cX8P - cA8s
            } else {
                cX8P = bip7i > LW9N ? LW9N - cA8s : cX8P
            }
            break;
        case 'left':
            cX8P = bip7i > LW9N ? LW9N - cA8s : cX8P;
            if (this.qW3x[1] == 'top') {
                hx0x = bie7X > biv7o ? hx0x - cc8U : hx0x
            } else {
                hx0x = hx0x - cc8U < 0 ? hx0x : hx0x - cc8U
            }
            break;
        case 'right':
            cX8P = cX8P - cA8s < 0 ? 0 : cX8P - cA8s;
            if (this.qW3x[1] == 'top') {
                hx0x = bie7X > biv7o ? hx0x - cc8U : hx0x
            } else {
                hx0x = hx0x - cc8U < 0 ? hx0x : hx0x - cc8U
            }
            break;
        default:
            hx0x = hx0x - cc8U < 0 ? hx0x : hx0x - cc8U;
            if (this.qW3x[1] == 'left') {
                cX8P = bip7i > LW9N ? LW9N - cA8s : cX8P
            } else {
                cX8P = cX8P - cA8s < 0 ? 0 : cX8P - cA8s
            }
            break
        }
        return {
            top: hx0x,
            left: cX8P
        }
    };
    b7g.bib7U = function () {
        var cBt6n = function (F7y, do9f) {
            F7y = a6g.B7u(F7y);
            if (!F7y) return;
            do9f = do9f || bb7U;
            var bi7b = a6g.hR0x(F7y);
            return {
                top: bi7b.y - (do9f.top || 0),
                left: bi7b.x - (do9f.left || 0),
                width: F7y.offsetWidth + (do9f.right || 0),
                height: F7y.offsetHeight + (do9f.bottom || 0)
            }
        };
        return function (e7d) {
            e7d = e7d || bb7U;
            this.Xe2x = e7d.event;
            this.cBy6s(e7d.align);
            if (!!this.Xe2x) this.Ah6b = this.cBv6p(e7d.target, e7d.delta, this.Xe2x);
            this.bjF7y = cBt6n(e7d.target, e7d.delta);
            this.bKr5w = !!e7d.fitable;
            this.L7E();
            return this
        }
    }()
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ui'),
        b7g,
        K7D;
    if (!!O7H.CF6z) return;
    O7H.CF6z = NEJ.C();
    b7g = O7H.CF6z.N7G(O7H.ZA3x);
    K7D = O7H.CF6z.ct8l;
    O7H.CF6z.cEc6W = function () {
        var cBr6l = function (d7e, C7v, fJ9A, ks1x, Tu1x) {
            var cz8r,
                J7C = C7v + '-i',
                R7K = fJ9A.xZ5e,
                bNf5k = !!ks1x.noclear,
                bNu5z = !!ks1x.toggled;
            if (k7d.gG0x(ks1x.onbeforeclick)) {
                var WU2x = ks1x.noclear,
                    cBq6k = ks1x.toggled;
                try {
                    ks1x.onbeforeclick(ks1x)
                } catch (e) {}
                bNf5k = !!ks1x.noclear;
                bNu5z = !!ks1x.toggled;
                ks1x.toggled = cBq6k;
                ks1x.noclear = WU2x
            }
            var FO7H = R7K[J7C];
            if (bNu5z && !!FO7H) {
                FO7H.bt7m();
                return
            }
            h7a.bh7a(d7e);
            if (!bNf5k) {
                h7a.z7s(document, 'click');
                cz8r = fJ9A.A7t(ks1x)
            } else {
                cz8r = fJ9A.bKA5F(ks1x, !0)
            }
            R7K[J7C] = cz8r;
            cz8r.wJ5O('onbeforerecycle', function () {
                delete R7K[J7C]
            });
            cz8r.bib7U(Tu1x)
        };
        return function (f7c, e7d) {
            f7c = a6g.B7u(f7c);
            if (!f7c) return this;
            if (!this.xZ5e) this.xZ5e = {};
            var C7v = a6g.lM1x(f7c);
            if (!!this.xZ5e[C7v]) return this;
            e7d = NEJ.X({}, e7d);
            var Tu1x = NEJ.EX({
                align: '',
                delta: null,
                fitable: !1
            }, e7d);
            Tu1x.target = C7v;
            e7d.destroyable = !0;
            if (!e7d.fixed) {
                Tu1x.fitable = !0;
                e7d.parent = document.body
            }
            this.xZ5e[C7v] = [
                C7v,
                e7d.event || 'click',
                cBr6l.ey9p(null, C7v, this, e7d, Tu1x)
            ];
            h7a.s7l.apply(h7a, this.xZ5e[C7v]);
            return this
        }
    }();
    O7H.CF6z.cEd6X = function (f7c) {
        if (!this.xZ5e) return this;
        var C7v = a6g.lM1x(f7c),
            d7e = this.xZ5e[C7v];
        if (!d7e) return this;
        delete this.xZ5e[C7v];
        h7a.mw1x.apply(h7a, d7e);
        var cz8r = this.xZ5e[C7v + '-i'];
        if (!!cz8r) cz8r.bt7m();
        return this
    };
    b7g.bhG6A = function () {
        return O7H.Xh2x.A7t(this.cd8V)
    };
    b7g.PC0x = function () {
        K7D.PC0x.apply(this, arguments);
        this.cd8V.top = null;
        this.cd8V.left = null;
        this.cd8V.nostop = !1
    };
    b7g.bib7U = function (e7d) {
        if (!!this.oI2x) this.oI2x.bib7U(e7d);
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        bc7V = c7f('nej.ui'),
        m7f = c7f('nm.l'),
        b7g,
        K7D;
    m7f.bhC6w = NEJ.C();
    b7g = m7f.bhC6w.N7G(bc7V.CF6z);
    b7g.bk7d = function (e7d) {
        e7d.nohack = true;
        this.bm7f(e7d)
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        m7f = c7f('nm.l'),
        l7e = c7f('nm.x'),
        b7g,
        K7D;
    var FullscreenApi = l7e.FX7Q || {};
    m7f.Z7S = NEJ.C();
    b7g = m7f.Z7S.N7G(m7f.bhC6w);
    K7D = m7f.Z7S.ct8l;
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.eu9l = e7d.type || 1
    };
    b7g.bW8O = function () {
        this.cg8Y();
        this.n7g = a6g.on2x(this.cBn6h());
        var i7b = a6g.dk9b(this.n7g);
        this.rb3x = i7b[0];
        this.cu8m = i7b[1]
    };
    b7g.cBn6h = function () {
        return '<div class="sysmsg"><i class="u-icn u-icn-31"></i><span></span></div>'
    };
    b7g.KC9t = function () {
        var D7w = {},
            ci8a = this.n7g.style,
            jF1x = a6g.ow2x(),
            op2x = {
                left: jF1x.scrollLeft,
                top: jF1x.scrollTop
            },
            do9f = {
                left: jF1x.clientWidth - this.n7g.offsetWidth,
                top: jF1x.clientHeight - this.n7g.offsetHeight
            };
        D7w.top = Math.max(0, op2x.top + do9f.top / 2);
        D7w.left = Math.max(0, op2x.left + do9f.left / 2);
        this.oI2x.gJ0x(D7w)
    };
    b7g.L7E = function (e7d) {
        K7D.L7E.call(this);
        this.KC9t();
        this.eu9l == 1 ? a6g.fk9b(this.rb3x, 'u-icn-32', 'u-icn-31') : a6g.fk9b(this.rb3x, 'u-icn-31', 'u-icn-32');
        this.cu8m.innerHTML = e7d.tip || ''
    };
    window.g_showTipCard = m7f.Z7S.L7E = function () {
        var ej9a;
        return function (e7d) {
            clearTimeout(ej9a);
            if (e7d.parent === undefined) e7d.parent = document[FullscreenApi.fullscreenElement] || document.body;
            if (e7d.autoclose === undefined) e7d.autoclose = true;
            e7d.clazz = 'm-sysmsg';
            !!this.fi9Z && this.fi9Z.T7M();
            this.fi9Z = this.A7t(e7d);
            this.fi9Z.L7E(e7d);
            if (e7d.autoclose) ej9a = setTimeout(this.bt7m.g7b(this), 2000)
        }.g7b(m7f.Z7S)
    }();
    m7f.Z7S.bt7m = function () {
        !!this.fi9Z && this.fi9Z.bt7m()
    }
})();
(function () {
    var c7f = NEJ.P,
        v7o = c7f('nej.j'),
        k7d = c7f('nej.u');
    if (window['GRef'] && window['GRef'] == 'mail') {
        v7o.bn7g = v7o.bn7g.eG9x(function (d7e) {
            e7d = d7e.args[1];
            e7d.query = e7d.query || {};
            if (k7d.fH9y(e7d.query)) e7d.query = k7d.hu0x(e7d.query);
            e7d.query.ref = 'mail'
        })
    }
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        fA9r = NEJ.R,
        I7B = c7f('nej.ut'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        q7j = c7f('nm.d'),
        m7f = c7f('nm.l'),
        J7C = 'playlist-tracks_',
        b7g;
    q7j.ff9W({
        'playlist_my-list': {
            url: '/api/user/playlist',
            type: 'GET',
            format: function (Q7J, e7d) {
                    this.cBm6g(Q7J.playlist);
                    return {
                        total: 0,
                        list: fA9r
                    }
                },
                onerror: function () {
                    this.z7s('onlisterror')
                }
        },
        'playlist_new-add': {
            url: '/api/playlist/create',
            format: function (Q7J, e7d) {
                    var nj2x = Q7J.playlist;
                    nj2x.creator = GUser;
                    nj2x.isHost = !0;
                    nj2x.typeFlag = 'playlist';
                    return nj2x
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.ig0x, 'listchange', d7e)
                },
                onmessage: function () {
                    var mA1x = {
                        507: '歌单数量超过上限！',
                        405: '你操作太快了，请休息一会再试！',
                        406: '你操作太快了，请休息一会再试！'
                    };
                    return function (cj8b) {
                        m7f.Z7S.L7E({
                            tip: mA1x[cj8b] || '创建失败',
                            type: 2
                        })
                    }
                }()
        },
        'playlist_new-del': {
            url: '/api/playlist/delete',
            type: 'GET',
            filter: function (e7d) {
                    e7d.id = e7d.data.pid
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.ig0x, 'listchange', d7e)
                },
                onmessage: function () {
                    var mA1x = {
                        404: '歌单不存在！',
                        405: '你操作太快了，请休息一会再试！',
                        406: '你操作太快了，请休息一会再试！'
                    };
                    return function (cj8b) {
                        m7f.Z7S.L7E({
                            tip: mA1x[cj8b] || '删除失败',
                            type: 2
                        })
                    }
                }()
        },
        'playlist_fav-add': {
            type: 'GET',
            url: '/api/playlist/subscribe',
            filter: function (e7d) {
                    var ez9q = e7d.ext || {};
                    e7d.ext = NEJ.X(ez9q, e7d.data);
                    e7d.data = {
                        id: e7d.ext.id
                    }
                },
                format: function (Q7J, e7d) {
                    m7f.Z7S.L7E({
                        tip: '收藏成功' + (Q7J.point > 0 ? ' 获得<em class="s-fc6">' + Q7J.point + '积分</em>' : '')
                    });
                    var p7i = e7d.ext;
                    p7i.subscribedCount++;
                    return p7i
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.cBl6f, 'listchange', d7e);
                    h7a.z7s(q7j.cBl6f, 'itemchange', {
                        attr: 'subscribedCount',
                        data: d7e.data
                    })
                },
                onmessage: function () {
                    var mA1x = {
                        404: '歌单不存在！',
                        501: '歌单已经收藏！',
                        506: '歌单收藏数量超过上限！'
                    };
                    return function (cj8b) {
                        m7f.Z7S.L7E({
                            type: 2,
                            tip: mA1x[cj8b] || '收藏失败，请稍后再试！'
                        })
                    }
                }()
        },
        'playlist_fav-del': {
            url: '/api/playlist/unsubscribe',
            type: 'GET',
            filter: function (e7d) {
                    e7d.id = e7d.data.id = e7d.data.pid
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.ig0x, 'listchange', d7e)
                },
                onmessage: function () {
                    var mA1x = {
                        404: '歌单不存在！',
                        405: '你操作太快了，请休息一会再试！',
                        406: '你操作太快了，请休息一会再试！'
                    };
                    return function (cj8b) {
                        m7f.Z7S.L7E({
                            tip: mA1x[cj8b],
                            type: 2
                        })
                    }
                }()
        },
        'playlist_new-update': {
            url: [
                'playlist-update-name',
                'playlist-update-tag',
                'playlist-update-desc'
            ],
            filter: function (e7d) {
                    var j7c = e7d.data,
                        WT2x = {};
                    WT2x['playlist-update-name'] = {
                        id: j7c.id,
                        name: j7c.name
                    };
                    WT2x['playlist-update-tag'] = {
                        id: j7c.id,
                        tags: j7c.tags.join(';')
                    };
                    WT2x['playlist-update-desc'] = {
                        id: j7c.id,
                        desc: j7c.description
                    };
                    e7d.data = WT2x;
                    e7d.ext = j7c
                },
                format: function (V7O, ri3x, Tw1x, e7d) {
                    if (V7O.code == 200 && ri3x.code == 200 && Tw1x.code == 200) {
                        e7d.ext.allSuccess = true;
                        m7f.Z7S.L7E({
                            tip: '保存成功'
                        })
                    } else if (V7O.code == 407 || ri3x.code == 407 || Tw1x.code == 407) {
                        e7d.ext.allSuccess = false;
                        m7f.Z7S.L7E({
                            type: 2,
                            tip: '输入内容包含关键字'
                        })
                    } else {
                        e7d.ext.allSuccess = false;
                        m7f.Z7S.L7E({
                            type: 2,
                            tip: '保存失败'
                        })
                    }
                    return this.eH9y(e7d.ext.id)
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.ig0x, 'listchange', d7e)
                },
                onmessage: function (cj8b) {
                    m7f.Z7S.L7E({
                        type: 2,
                        tip: '保存失败'
                    })
                }
        },
        'playlist-update-name': {
            url: '/api/playlist/update/name',
            format: function (Q7J, e7d) {
                var p7i = this.eH9y(e7d.ext.id);
                if (Q7J.code == 200) p7i.name = e7d.ext.name;
                return Q7J
            }
        },
        'playlist-update-tag': {
            url: '/api/playlist/tags/update',
            format: function (Q7J, e7d) {
                var p7i = this.eH9y(e7d.ext.id);
                if (Q7J.code == 200) p7i.tags = e7d.ext.tags;
                return Q7J
            }
        },
        'playlist-update-desc': {
            url: '/api/playlist/desc/update',
            format: function (Q7J, e7d) {
                var p7i = this.eH9y(e7d.ext.id);
                if (Q7J.code == 200) p7i.description = e7d.ext.description;
                return Q7J
            }
        },
        'playlist-update-cover': {
            url: '/api/playlist/cover/update',
            filter: function (e7d) {
                    e7d.url = e7d.data.url;
                    delete e7d.data.url
                },
                format: function (Q7J, e7d) {
                    m7f.Z7S.L7E({
                        tip: '保存成功'
                    });
                    var p7i = this.eH9y(e7d.data.id);
                    p7i.coverImgUrl = e7d.url;
                    e7d.ext = p7i;
                    return p7i
                },
                onmessage: function (cj8b) {
                    m7f.Z7S.L7E({
                        type: 2,
                        tip: '保存失败'
                    })
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.ig0x, 'itemchange', {
                        attr: 'coverImgUrl',
                        data: e7d.ext
                    })
                }
        },
        'playlist-upcount': {
            url: '/api/playlist/update/playcount',
            type: 'GET',
            format: function (Q7J, e7d) {
                var nj2x = this.eH9y(e7d.data.id);
                if (!nj2x) return;
                nj2x.playCount++;
                h7a.z7s(q7j.ig0x, 'itemchange', {
                    attr: 'playcount',
                    data: nj2x
                })
            }
        }
    });
    q7j.ig0x = NEJ.C();
    b7g = q7j.ig0x.N7G(q7j.hE0x);
    b7g.cx8p = function () {
        this.cF8x()
    };
    b7g.bPT6N = function () {
        var dn9e = GUser.userId;
        this.lQ1x({
            limit: 1001,
            key: 'playlist_my-' + dn9e,
            data: {
                offset: 0,
                limit: 1001,
                uid: dn9e
            }
        })
    };
    b7g.cBm6g = function (i7b) {
        var dn9e = GUser.userId,
            jd0x = [],
            bQQ7J = [];
        k7d.bd7W(i7b, function (p7i) {
            p7i.typeFlag = 'playlist';
            if (p7i.creator && p7i.creator.userId == dn9e) {
                if (p7i.specialType == 5) p7i.name = '我喜欢的音乐';
                p7i.isHost = !0;
                jd0x.push(p7i)
            } else {
                bQQ7J.push(p7i)
            }
        });
        this.uc4g('playlist_new-' + dn9e, jd0x);
        this.uc4g('playlist_fav-' + dn9e, bQQ7J)
    };
    b7g.cBk6e = function (j7c) {
        this.cp8h('playlist-update-cover', {
            data: j7c
        })
    };
    b7g.cEe6Y = function () {
        var TA1x = this.cBi6c.B7u('host-plist');
        if (TA1x.length == 0) {
            return
        }
        if (TA1x.length == 1 && TA1x[0].trackCount <= 0) {
            return
        }
        for (var i = 0, len = TA1x.length; i < len; i++) {
            var p7i = TA1x[i];
            if (p7i.trackCount > 0) return p7i.id
        }
        return this.cBi6c.B7u('host-plist')[0].id
    };
    b7g.cBh6b = function (C7v) {
        if (GUser && GUser.userId > 0) {
            this.cp8h('playlist-upcount', {
                data: {
                    id: C7v
                }
            })
        }
    };
    b7g.FC7v = function () {
        if (GUser && GUser.userId > 0) {
            return !0
        } else {
            top.login();
            return !1
        }
    };
    b7g.cEf6Z = function () {
        return GUser.userId
    };
    b7g.FI7B = function (p7i) {
        if (p7i.userId == GUser.userId && p7i.specialType == 5) p7i.name = '我喜欢的音乐';
        h7a.z7s(this.constructor, 'itemchange', {
            data: this.Co6i(p7i)
        });
        return p7i
    };
    I7B.fI9z.A7t({
        element: q7j.ig0x,
        event: [
            'listchange',
            'playcountchange',
            'itemchange'
        ]
    })
})();
(function () {
    var c7f = NEJ.P,
        fA9r = NEJ.R,
        br7k = NEJ.F,
        bb7U = NEJ.O,
        I7B = c7f('nej.ut'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        l7e = c7f('nm.x'),
        q7j = c7f('nm.d'),
        m7f = c7f('nm.l'),
        b7g,
        K7D;
    q7j.ff9W({
        'program-get': {
            url: '/api/dj/program/detail',
            format: function (Q7J) {
                return Q7J.program
            }
        },
        'program_djradio-list': {
            type: 'GET',
            url: '/api/dj/program/byradio',
            filter: function (e7d) {
                    e7d.data.limit = 1000;
                    delete e7d.data.id
                },
                format: function (Q7J, e7d) {
                    var bRw7p = [],
                        pv2x = Q7J.programs;
                    if (pv2x) {
                        for (var i = 0, l = pv2x.length; i < l; i++) {
                            if (pv2x[i].programFeeType < 10 || pv2x[i].buyed) {
                                bRw7p.push(pv2x[i])
                            }
                        }
                    }
                    return bRw7p
                }
        },
        'program_fav-list': {
            url: '/api/djprogram/subscribed/paged',
            format: function (Q7J, e7d) {
                    return Q7J.programs
                },
                onerror: 'onlisterror'
        },
        'program_fav-add': {
            url: '/api/djprogram/subscribe',
            filter: function (e7d) {
                    e7d.ext = e7d.data;
                    e7d.data = {
                        id: e7d.ext.id
                    };
                    e7d.id = e7d.data.id
                },
                format: function (Q7J, e7d) {
                    m7f.Z7S.L7E({
                        tip: '收藏成功'
                    });
                    var p7i = e7d.ext;
                    p7i.subscribedCount++;
                    p7i.subscribed = !0;
                    return p7i
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.rp3x, 'listchange', d7e)
                },
                onmessage: function () {
                    var mA1x = {
                        404: '节目不存在！',
                        501: '节目已收藏！'
                    };
                    return function (cj8b) {
                        m7f.Z7S.L7E({
                            type: 2,
                            tip: mA1x[cj8b] || '收藏失败！'
                        })
                    }
                }()
        },
        'program_fav-del': {
            url: '/api/djprogram/unsubscribe',
            finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.rp3x, 'listchange', d7e)
                },
                onmessage: function () {
                    var mA1x = {
                        404: '节目不存在！',
                        502: '没有收藏此节目！'
                    };
                    return function (cj8b) {
                        l7e.bgM5R({
                            txt: mA1x[cj8b] || '取消收藏失败！'
                        })
                    }
                }()
        },
        'program-update-count': {
            type: 'GET',
            url: '/api/dj/program/listen',
            filter: function (e7d) {
                    var p7i = this.eH9y(e7d.data.id) || bb7U;
                    e7d.ext = (p7i.listenerCount || 0) + 1
                },
                format: function (Q7J, e7d) {
                    var p7i = this.eH9y(e7d.data.id);
                    if (!!p7i) {
                        p7i.listenerCount = Math.max(e7d.ext, p7i.listenerCount || 0)
                    }
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.rp3x, 'itemchange', {
                        attr: 'playCount',
                        data: this.eH9y(e7d.data.id)
                    })
                }
        },
        'program-like': {
            url: '/api/resource/like',
            filter: function (e7d) {
                    e7d.data = {
                        threadId: 'A_DJ_1_' + e7d.id
                    }
                },
                format: function (Q7J, e7d) {
                    var p7i = e7d.ext.data || this.eH9y(e7d.id);
                    p7i.liked = true;
                    p7i.likedCount++;
                    e7d.ext.data = p7i;
                    try {
                        top.player.setLike(p7i)
                    } catch (e) {}
                    return p7i
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.rp3x, 'itemchange', {
                        attr: 'likedCount',
                        data: e7d.ext.data
                    })
                }
        },
        'program-unlike': {
            url: '/api/resource/unlike',
            filter: function (e7d) {
                    e7d.data = {
                        threadId: 'A_DJ_1_' + e7d.id
                    }
                },
                format: function (Q7J, e7d) {
                    var p7i = e7d.ext.data || this.eH9y(e7d.id);
                    p7i.liked = false;
                    p7i.likedCount--;
                    e7d.ext.data = p7i;
                    try {
                        top.player.setLike(p7i)
                    } catch (e) {}
                    return p7i
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.rp3x, 'itemchange', {
                        attr: 'likedCount',
                        data: e7d.ext.data
                    })
                }
        }
    });
    q7j.rp3x = NEJ.C();
    b7g = q7j.rp3x.N7G(q7j.hE0x);
    b7g.cEh6b = function () {
        var dn9e = GUser.userId;
        this.lQ1x({
            limit: 1001,
            key: 'program_fav-' + dn9e,
            data: {
                offset: 0,
                limit: 1000,
                uid: dn9e
            }
        })
    };
    b7g.cEi6c = function (dc9T) {
        var py2x = dc9T[this.xe5j];
        l7e.cBb5g(4, function (R7K) {
            R7K.uc4g('track_program-' + py2x, dc9T.songs)
        });
        delete dc9T.songs;
        var bN8F = dc9T.mainSong;
        l7e.cBb5g(4, function (R7K) {
            R7K.uc4g('track_program_main-' + py2x, !bN8F ? [] : [
                bN8F
            ])
        });
        dc9T.mainSong = (bN8F || bb7U).id
    };
    b7g.cEj6d = function (C7v) {
        var dc9T = this.eH9y(C7v),
            dn9e = localCache.Ym3x('host.profile.userId');
        return !!dc9T && dc9T.dj.userId == dn9e
    };
    b7g.cEk6e = function (C7v) {
        return !1
    };
    b7g.FI7B = function (p7i) {
        h7a.z7s(this.constructor, 'itemchange', {
            attr: 'detail',
            data: this.Co6i(p7i)
        });
        return p7i
    };
    b7g.cBh6b = function (C7v) {
        this.cp8h('program-update-count', {
            data: {
                id: C7v
            }
        })
    };
    l7e.bSU8M = function (e7d) {
        var R7K = q7j.rp3x.A7t({
            onitemadd: function () {
                    (e7d.onsuccess || br7k)()
                },
                onerror: function () {
                    (e7d.onerror || br7k)()
                }
        });
        if (e7d.data.liked) {
            R7K.vr4v(e7d.data)
        } else {
            R7K.oR2x(e7d.data)
        }
    };
    b7g.oR2x = function (dc9T) {
        if (!l7e.gR0x()) return;
        var cq8i = {
            ext: {}
        };
        if (k7d.ly1x(dc9T)) {
            cq8i.id = dc9T.id;
            cq8i.ext.data = dc9T
        } else {
            cq8i.id = dc9T
        }
        this.cp8h('program-like', cq8i)
    };
    b7g.vr4v = function (dc9T) {
        if (!l7e.gR0x()) return;
        var cq8i = {
            ext: {}
        };
        if (k7d.ly1x(dc9T)) {
            cq8i.id = dc9T.id;
            cq8i.ext.data = dc9T
        } else {
            cq8i.id = dc9T
        }
        this.cp8h('program-unlike', cq8i)
    };
    I7B.fI9z.A7t({
        element: q7j.rp3x,
        event: [
            'listchange',
            'itemchange'
        ]
    })
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        fA9r = NEJ.R,
        I7B = c7f('nej.ut'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        q7j = c7f('nm.d'),
        m7f = c7f('nm.l'),
        l7e = c7f('nm.x'),
        J7C = 'playlist-tracks_',
        l7e = c7f('nm.x'),
        b7g;
    q7j.ff9W({
        'track-get': {
            url: '/api/v3/song/detail',
            filter: function (e7d) {
                    e7d.data.c = JSON.stringify([{
                        id: e7d.data.id
                    }])
                },
                format: function (Q7J, e7d) {
                    var bj7c = l7e.FZ7S(Q7J.songs[0]);
                    bj7c.privilege = Q7J.privileges[0];
                    return bj7c
                }
        },
        'track_playlist-list': {
            url: '/api/v3/playlist/detail',
            filter: function (e7d) {
                    e7d.data.n = 1000
                },
                format: function (Q7J, e7d) {
                    var hw0x = [];
                    this.sX3x.FI7B(Q7J.playlist);
                    k7d.bd7W(Q7J.playlist.tracks, function (bN8F, r7k) {
                        var bTt8l = l7e.FZ7S(bN8F);
                        bTt8l.privilege = Q7J.privileges[r7k];
                        hw0x.push(bTt8l)
                    }, this);
                    return hw0x
                }
        },
        'track_album-list': {
            url: '/api/v1/album/{id}',
            format: function (Q7J, e7d) {
                var hw0x = [];
                k7d.bd7W(Q7J.songs, function (bj7c) {
                    hw0x.push(l7e.FZ7S(bj7c))
                });
                return hw0x
            }
        },
        'track_playlist-add': {
            url: '/api/playlist/manipulate/tracks',
            filter: function (e7d) {
                    var by7r = {},
                        j7c = e7d.data,
                        cAW5b = this.hI0x(e7d.key) || [];
                    Gf7Y = [];
                    k7d.bd7W(cAW5b, function (bN8F) {
                        var C7v = k7d.ly1x(bN8F) ? bN8F.id : bN8F;
                        by7r[C7v] = true
                    });
                    e7d.ext = [];
                    k7d.bd7W(j7c.tracks, function (bN8F) {
                        var C7v = k7d.ly1x(bN8F) ? bN8F.id : bN8F;
                        if (!by7r[C7v]) {
                            Gf7Y.push(C7v);
                            by7r[C7v] = true;
                            e7d.ext.push(bN8F)
                        }
                    });
                    j7c.trackIds = JSON.stringify(Gf7Y);
                    j7c.op = 'add';
                    if (!Gf7Y.length) {
                        e7d.value = {
                            code: 502
                        }
                    }
                },
                format: function (Q7J, e7d) {
                    m7f.Z7S.L7E({
                        tip: '已添加至歌单'
                    });
                    var nj2x = this.sX3x.eH9y(e7d.data.pid);
                    if (!!Q7J.coverImgUrl) nj2x.coverImgUrl = Q7J.coverImgUrl;
                    k7d.nz2x(e7d.ext, function (bN8F) {
                        this.yp5u(e7d, k7d.ly1x(bN8F) ? bN8F : null);
                        if (!!nj2x) nj2x.trackCount++
                    }, this);
                    h7a.z7s(q7j.ig0x, 'itemchange', {
                        data: nj2x || {},
                            cmd: 'add'
                    });
                    this.z7s('onaddsuccess');
                    return null
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.wD5I, 'listchange', {
                        key: e7d.key,
                        action: 'refresh'
                    });
                    var py2x = e7d.data.pid,
                        cy8q = this.kg1x(e7d.key)
                },
                onmessage: function () {
                    var mA1x = {
                        502: '歌曲已存在！',
                        505: '歌单已满！'
                    };
                    return function (cj8b) {
                        setTimeout(function () {
                            m7f.Z7S.L7E({
                                tip: mA1x[cj8b] || '添加失败，请稍后再试！',
                                type: 2
                            })
                        }, 0)
                    }
                }()
        },
        'track_playlist-del': {
            url: '/api/playlist/manipulate/tracks',
            filter: function (e7d) {
                    var j7c = e7d.data;
                    e7d.ext = j7c.trackIds;
                    j7c.trackIds = JSON.stringify(j7c.trackIds);
                    j7c.op = 'del'
                },
                format: function (Q7J, e7d) {
                    var nj2x = this.sX3x.eH9y(e7d.data.pid);
                    k7d.bd7W(e7d.ext, function (C7v) {
                        this.bpU0x({
                            id: C7v,
                            key: 'track_playlist-' + e7d.data.pid
                        }, !0);
                        if (!!nj2x) nj2x.trackCount = Math.max(0, nj2x.trackCount - 1)
                    }, this);
                    h7a.z7s(q7j.ig0x, 'itemchange', {
                        data: nj2x || {},
                            cmd: 'del'
                    });
                    return null
                },
                finaly: function (d7e, e7d) {
                    h7a.z7s(q7j.wD5I, 'listchange', {
                        key: e7d.key,
                        action: 'refresh'
                    })
                },
                onmessage: function (cj8b) {
                    l7e.bgM5R({
                        text: '歌曲删除失败！'
                    })
                }
        },
        'track_program-list': {
            url: '/api/dj/program/detail',
            format: function (Q7J, e7d) {
                    return this.bTQ8I.FI7B(Q7J.program).songs
                },
                onerror: 'onlisterror'
        },
        'track_listen_record-list': {
            url: '/api/v1/play/record',
            format: function (Q7J, e7d) {
                    var i7b = [];
                    if (e7d.data.type == -1) {
                        if (Q7J.weekData && Q7J.weekData.length) {
                            e7d.data.type = 1
                        } else {
                            e7d.data.type = 0
                        }
                    }
                    if (e7d.data.type == 1) {
                        i7b = this.bTR8J(Q7J.weekData)
                    } else {
                        i7b = this.bTR8J(Q7J.allData)
                    }
                    return i7b
                },
                onerror: 'onlisterror'
        },
        'track_day-list': {
            url: '/api/v2/discovery/recommend/songs',
            format: function (Q7J, e7d) {
                    var nT2x = [],
                        i7b = Q7J.recommend || [];
                    k7d.bd7W(i7b, function (bj7c, r7k) {
                        nT2x.push({
                            action: 'recommendimpress',
                            json: {
                                alg: bj7c.alg,
                                scene: 'user-song',
                                position: r7k,
                                id: bj7c.id
                            }
                        })
                    });
                    this.kH1x.Xy2x(nT2x);
                    e7d.limit = i7b.length;
                    return i7b
                },
                onerror: 'onlisterror'
        },
        'track_lyric-get': {
            type: 'GET',
            url: '/api/song/lyric',
            filter: function (e7d) {
                    e7d.data.lv = 0;
                    e7d.data.tv = 0
                },
                format: function (o7h, e7d) {
                    return o7h
                },
                onload: 'onlyricload',
            onerror: 'onlyricerror'
        }
    });
    q7j.wD5I = NEJ.C();
    b7g = q7j.wD5I.N7G(q7j.hE0x);
    b7g.cx8p = function () {
        this.cF8x();
        this.sX3x = q7j.ig0x.A7t();
        this.bTQ8I = q7j.rp3x.A7t();
        this.kH1x = q7j.hT0x.A7t()
    };
    b7g.bTR8J = function (i7b) {
        var o7h = [],
            fq9h = 0;
        k7d.bd7W(i7b, function (p7i, r7k) {
            var bj7c = l7e.FZ7S(p7i.song);
            if (r7k == 0) {
                fq9h = p7i.score
            }
            bj7c.max = fq9h;
            bj7c.playCount = p7i.playCount;
            bj7c.score = p7i.score;
            o7h.push(bj7c)
        });
        return o7h
    };
    I7B.fI9z.A7t({
        element: q7j.wD5I,
        event: [
            'listchange'
        ]
    })
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        cB8t = c7f('nm.pc');
    var bgI5N = {
        playlist: 'A_PL_0_',
        dj: 'A_DJ_1_',
        program: 'A_DJ_1_',
        album: 'R_AL_3_',
        song: 'R_SO_4_'
    };
    var qI3x = function (bP8H) {
        var Bh6b = 'orpheus://orpheus';
        window.top.postMessage(JSON.stringify(bP8H), Bh6b)
    };
    var cAO5T = function (mm1x) {
        var kE1x = 'http://' + location.host + '/',
            TD1x = /(igame|music)\.163\.com\/(song|album|playlist|dj|event|artist|mv|djradio|topic|video|program|user\/home|activity)\?id=(\w+)(&uid=(\d+))?/,
            dP9G = TD1x.exec(mm1x);
        if (!dP9G) return cAN5S(mm1x);
        var gg0x = dP9G[2],
            hC0x = dP9G[3],
            dn9e = dP9G[4] || '',
            jh0x = '';
        switch (gg0x) {
        case 'album':
            jh0x = '#/m/album/comment/?rid=' + bgI5N[gg0x] + hC0x + '&id=' + hC0x;
            break;
        case 'playlist':
            jh0x = '#/m/playlist/comment/?rid=' + bgI5N[gg0x] + hC0x + '&id=' + hC0x;
            break;
        case 'song':
        case 'dj':
        case 'program':
            jh0x = '#/m/song?rid=' + bgI5N[gg0x] + hC0x;
            break;
        case 'event':
            jh0x = '#/m/friend/event/?id=' + hC0x + '&uid=' + dn9e;
            break;
        case 'user/home':
            jh0x = '#/m/personal/?uid=' + hC0x;
            break;
        case 'mv':
            jh0x = '#/m2/mv/?id=' + hC0x;
            break;
        case 'activity':
            jh0x = '#/m/friend/activity?id=' + hC0x;
            break;
        case 'video':
            jh0x = '#/m2/mv/?id=' + hC0x + '&type=1';
            break;
        default:
            jh0x = '#/m/' + gg0x + '/?id=' + hC0x
        }
        return kE1x + jh0x
    };
    var cAN5S = function (mm1x) {
        var cAM5R = /http:\/\/player\.youku\.com\/embed\/(.+)/;
        var dP9G = cAM5R.exec(mm1x);
        if (dP9G) return 'http://v.youku.com/v_show/id_' + dP9G[1];
        return mm1x
    };
    cB8t.ek9b = function (gg0x, hC0x) {
        qI3x({
            name: 'play',
            args: {
                type: gg0x,
                id: hC0x
            }
        })
    };
    cB8t.fG9x = function () {
        qI3x({
            name: 'pause'
        })
    };
    cB8t.AJ6D = function (mm1x) {
        qI3x({
            name: 'open',
            args: {
                link: cAO5T(mm1x)
            }
        })
    };
    cB8t.kY1x = function (gg0x, hC0x, cG8y) {
        qI3x({
            name: 'share',
            args: {
                type: gg0x,
                id: hC0x,
                shareContent: cG8y
            }
        })
    };
    cB8t.bxP2x = function (gg0x, hC0x) {
        qI3x({
            name: 'comment',
            args: {
                type: gg0x,
                id: hC0x
            }
        })
    };
    cB8t.cAJ5O = function () {
        qI3x({
            name: 'init'
        })
    };
    cB8t.AL6F = function (cc8U) {
        qI3x({
            name: 'setHeight',
            args: {
                height: cc8U
            }
        })
    };
    cB8t.il0x = function (bH8z, X7Q) {
        qI3x({
            name: 'toast',
            args: {
                message: bH8z || '',
                state: X7Q
            }
        })
    };
    cB8t.TF1x = function (mm1x) {
        qI3x({
            name: 'login',
            args: {
                link: mm1x
            }
        })
    };
    cB8t.byr2x = function (Bk6e) {
        qI3x({
            name: 'topbar',
            args: {
                show: !!Bk6e
            }
        })
    };
    cB8t.cAI5N = function (bz7s) {
        qI3x({
            name: 'refreshtopbar',
            args: {
                info: bz7s
            }
        })
    };
    cB8t.cAH5M = function (bs7l, r7k) {
        qI3x({
            name: 'big',
            args: {
                arr: bs7l,
                index: r7k
            }
        })
    };
    cB8t.Lh9Y = function (cw8o) {
        qI3x({
            name: 'download',
            args: {
                img: cw8o
            }
        })
    };
    cB8t.bzc2x = function (cAE5J) {
        qI3x({
            name: 'scrollable',
            args: {
                scrollable: cAE5J
            }
        })
    }
})();
(function () {
    function J() {
        var d = '6skV4PUYecGhx07l'.split('');
        this.d = function (f) {
            if (null == f || void 0 == f) return f;
            if (0 != f.length % 2) throw Error('1100');
            for (var b = [], c = 0; c < f.length; c++) {
                0 == c % 2 && b.push('%');
                for (var g = d, a = 0; a < g.length; a++)
                    if (f.charAt(c) == g[a]) {
                        b.push(a.toString(16));
                        break
                    }
            }
            return decodeURIComponent(b.join(''))
        }
    }
    var k = (new J).d,
        d = (new J).d,
        e = (new J).d,
        f = (new J).d,
        g = (new J).d;
    (function () {
        var B = [
                e('44UsY4UP'),
                e('40UcU7UcUkUsYkP6UxYPUYUcU7'),
                d('U4UPUVUlU4UPPPPk4c4VUlU0Y6UlU7UPU7Y4'),
                f('47P6P6UxUsYcUPYkPVUeUPUxUx'),
                f('40PVk6PkUPUUUPYkUPU7UVUPk6PVUsU7YVk6PVUPYkUcUU'),
                e('4eUcYkUsUYUcU7Ulk6PVUsU7YVk64Y4k'),
                d('YVUPYkUcUU'),
                g('UYUPY44VUlU7Y4UPYeY4')
            ],
            J = [
                g('YPU7UcUUUlYkU0VkUU')
            ],
            b = [
                d(''),
                g('4YYkUsYcP4UPYeY4'),
                k('Y6UsYkUPU7Y4'),
                e('7Phchx7PcxeU'),
                k('Y6UxYPUYUcU7YV'),
                d('4sU4UlUkUP4PYe40UsU744UPY4UPUVY4'),
                e('V6V6VsV6'),
                d('4YUlUlUYUxUPk64PUsYkY4Uek6P6UxYPUYUcU7'),
                k('PUUPUPY4UxUPk6P4PUk64VUlYkUP'),
                f('V6V6V6VY'),
                f('V6V6V6V4'),
                d('V6V6V6Vk'),
                d('V6V6V6VV'),
                g('V6V6V6V6'),
                e('V6V6V6Vs'),
                g('PPU7UcY4Yck6P6UxUsYcUPYk'),
                d('PVUhYcY6UPk6PYUPUkk6P6UxYPUYUcU7'),
                d('PYUPUk4hUcY4k0UcU7Y4UPUYYkUcUPYkY4UPk6P6444U'),
                e('4kUPUxUxk640P4'),
                e('V6V6V6Ve'),
                g('UYUPY4PVYPY6Y6UlYkY4UPU44PYeY4UPU7YVUcUlU7YV'),
                d('YVUPY4P4UcU0UP'),
                e('V6V6V6Vc'),
                g('PVUsUUUPPVUPUsYkUVUe'),
                d('kk'),
                f('k4'),
                f('PPU7UcYUUPYkYV'),
                e('kP'),
                e('kU'),
                f('kY'),
                f('VsVsVsV6'),
                d('UYUPY4k6Y6UxYPUYUcU7k6YVY4YkUcU7UYk6UPYeUVUPY6Y4UcUlU7'),
                e('P4UeYkUPUP44PVUeUsU4UlYY'),
                g('kh'),
                f('kx'),
                d('k0'),
                f('4sYkUsUk'),
                g('7eehhc7Uc7cx74heh07YhheU7PG7eh'),
                d('k7'),
                g('4UPPPG4PPVUeUsYkUP'),
                g('kl'),
                d('V6'),
                k('Vs'),
                f('Vk'),
                e('VV'),
                e('V4'),
                e('74hhhl7PG7ehPl4Y4kVkVVVsVk'),
                g('VP'),
                f('VU'),
                e('4cU7UsUVY4UcYUUP4VUsY6Y4UcUlU7P4UPYeY4'),
                f('VY'),
                d('PY4P4kPG4P47k64kYkUlYYYVUPYkk64PYeY4UPU7YVUcUlU7'),
                f('Ve'),
                e('Vc'),
                g('VG'),
                g('44UcYUPek64kYkUlYYYVUPYkk6P6UxYPUYk04cU7'),
                k('Vh'),
                g('V0'),
                d('PPY6UxUsYck6P64V'),
                e('UVUsU7YUUsYVk6UPYeUVUPY6Y4UcUlU7'),
                f('4s'),
                k('4k'),
                g('4V'),
                g('44'),
                g('4P'),
                f('7Ph7G77eh0Gl7ccheP7chhcs'),
                e('4U'),
                k('4eUsYkYkUcU7UYY4UlU7'),
                f('4Y'),
                f('4e'),
                f('4c'),
                k('4G'),
                e('4YU7UlU0UPk6PVUeUPUxUxk64cU7Y4UPUYYkUsY4UcUlU7'),
                f('4h'),
                f('4x'),
                f('40'),
                e('47'),
                f('4l'),
                k('P6'),
                d('Ps'),
                k('Pk'),
                d('PV'),
                g('47UcUsUYUsYkUsk6PVUlUxUcU4'),
                g('P4'),
                e('PVUPUU4VUxUcUPU7Y4k6P6UxYPUYUcU7'),
                d('PP'),
                e('PU'),
                d('VsVsVsVs'),
                e('PY'),
                d('Pe'),
                g('Pc'),
                k('PG'),
                e('4YUlYPU4Yck64lUxU4k6PVY4YcUxUP'),
                k('Px'),
                g('PkUlUkUxUlYek64xUsYPU7UVUeUPYkk6P6UxYPUYUcU7'),
                d('40UcUVYkUlYVUlUUY4k64lUUUUUcUVUPk6VkV6VsVV'),
                f('PsPs40YPYVUcUV'),
                k('Us'),
                e('4PYPYkUlYVY4UcUxUP'),
                e('Uk'),
                k('YkU0UlUVYek7PkUPUsUxP6UxUsYcUPYkk64YVkk64VUlU7Y4YkUlUxk7Vs'),
                k('UV'),
                d('PVUVYkUcY6Y4UcU7UYk744UcUVY4UcUlU7UsYkYc'),
                f('U4'),
                f('74hhhl7PG7eh'),
                f('UP'),
                k('UU'),
                k('UY'),
                e('Ue'),
                d('40Usk04VUlU7UUUcUYk7UVUlU0k6Y6UxYPUYUcU7'),
                d('Uc'),
                g('VsV6VsV6'),
                d('4VUsYVYPUsUx'),
                d('UG'),
                e('Uh'),
                e('Ux'),
                d('U0'),
                g('U7'),
                e('Ul'),
                d('Y6'),
                k('VsV6V6Ve'),
                f('UVY4'),
                d('U4Ul47UlY4P4YkUsUVUh'),
                g('Ys'),
                d('YVUPY4P4UcU0UPUlYPY4'),
                f('74heh07PG7ehk6P6YkUl'),
                e('Yk'),
                k('4YUcYVUeUs'),
                k('UYUPY4P4UcU0UPYGUlU7UP4lUUUUYVUPY4'),
                g('YV'),
                d('VsV6V6VP'),
                g('VsV6V6V4'),
                k('Y4'),
                k('YP'),
                g('VsV6V6VV'),
                f('YU'),
                f('VsV6V6Vs'),
                d('YY'),
                e('Ye'),
                e('U4YkUsYY4sYkYkUsYcYV'),
                g('Yc'),
                e('YG'),
                f('Yh'),
                g('Y0'),
                k('Y7'),
                d('UUUlU7Y4'),
                g('VsV6V6Vc'),
                k('V0U7YPUxUxVhk6Y6UsY4UeV0klVhk6UPYeY6UcYkUPYVV0'),
                f('PVUeUPUxUxk7PP4c4eUPUxY6UPYk'),
                f('Y4Ul44UsY4UsPPPk4x'),
                f('PYUcU7U4UlYYP4UPYeY4'),
                e('UxUsU7UYYPUsUYUP'),
                g('U4Ul'),
                f('74heh07chhcsk6P6YkUl'),
                e('4eUcUYUeUxUcUYUeY4P4UPYeY4'),
                k('U4UcYU'),
                g('40UPU7YPP4UPYeY4'),
                e('4s4l4xk640UPU4UcUsk6P6UxUsYcUkUsUVUhk6P6UxYPUYUcU7'),
                f('4VUcY4YkUcYek6UlU7UxUcU7UPk6Y6UxYPUYk0UcU7'),
                f('UPUV'),
                f('44UPYVU4UPU0UlU7Us'),
                k('4cU7UsUVY4UcYUUP4kUlYkU4UPYk'),
                f('PkUPUsUxP6UxUsYcUPYk'),
                d('4e4P4x4x4l'),
                f('kxk6kYUVUlU4UPkYVG'),
                k('UPU0'),
                f('U7Y6P4UlU7UYUkYP4sU4U4UcU7'),
                e('UVYkUPUsY4UP4PUxUPU0UPU7Y4'),
                g('Y6UeUsU7Y4UlU0'),
                k('40PVk6P640UcU7UVUeUl'),
                d('7UGPhY74h0cV'),
                d('UPYUUsUx'),
                f('UPYe'),
                k('44UcYUPek6PU4l44k64eUPUxY6UPYkk6P6UxYPUYk0UcU7'),
                f('7UcUh67YhheU7Ucee774h0cV'),
                d('PsYPUcUVUhP4UcU0UP4VUeUPUVUh4lUkUGUPUVY4k7PsYPUcUVUhP4UcU0UP4VUeUPUVUhk7Vs'),
                k('4UUxYc4lYk44UcUPk64YUsU0UPYVk6P6UxYPUYUcU7'),
                e('UsY4Y4UsUVUePVUeUsU4UPYk'),
                e('P6UxUsYc4lU7k6P6UxYPUYk0UcU7'),
                f('UYUPY4P4UcU0UP'),
                e('Vsk7V6Vs'),
                e('4kYkUlUsU4YYUsYc'),
                k('UUY6'),
                e('4sUxUsYYUsYkk647P64sP64ck6YPY4UcUxYV'),
                d('4UUlYkY4UP'),
                g('UeUsYVUe4VUlU4UP'),
                e('7UcUhc7UG0GV7PGYcG74h0cV'),
                e('4PPV47k6PVUlU7UsYkk64sP64c'),
                k('4eP644UPY4UPUVY4'),
                e('4kUcY4U4UPUUUPU7U4UPYkk6PsYPUcUVUhPVUVUsU7'),
                k('4c4Pk6P4UsUkk6Y6UxYPUYUcU7'),
                g('kYkx'),
                k('4kYPY4Y4UlU74UUsUVUP'),
                e('UVY6YP4VUxUsYVYV'),
                g('4VUPU7Y4YPYkYck64YUlY4UeUcUV'),
                f('4lU7UxUcU7UPk6PVY4UlYkUsUYUPk6Y6UxYPUYk0UcU7'),
                k('PVUsUUUPYkk6PPY6U4UsY4UP'),
                d('40YVYeU0UxVkk7444l4044UlUVYPU0UPU7Y4'),
                d('4PU7UYYkUsYUUPYkYVk640P4'),
                d('PVUcUxYUUPYkUxUcUYUeY4k6P6UxYPUYk04cU7'),
                g('4YUlUlUYUxUPk64YUPUsYkYVk6V6k7VPk7VVVVk7V6'),
                g('4VUcY4YkUcYek64c4V4sk64VUxUcUPU7Y4'),
                d('UsUxY6UeUsUkUPY4UcUV'),
                k('PU44UlYYU7UxUlUsU4UPYk'),
                e('7Pe0e77UcUeY7UGPhY74h0cV'),
                f('UsY4Y4YkPUUPYkY4UPYe'),
                g('7PG7eh74h0cV'),
                f('UVUlUlUhUcUP'),
                g('kPVkVk'),
                k('kPVkVU'),
                g('4VUPU7Y4UsYPYk'),
                g('V4UYUsU0UP'),
                e('PkUlUVUhYYUPUxUx'),
                e('4xUlUY40UP4cU7k6P6UxYPUYUcU7k6Vsk7V6k7V6k7VcVUVs'),
                g('4lUVY4UlYVUeUsY6UPk6PVY4YkUPUsU0UcU7UYk6PVUPYkYUUcUVUPYV'),
                e('Y4Ul4Y40P4PVY4YkUcU7UY'),
                d('Y4UeV0kl'),
                d('PVYPU0UsY4YkUsP6444Uk64kYkUlYYYVUPYkk6P6UxYPUYUcU7'),
                k('P6444Uk7P6U4UU4VY4YkUx'),
                g('UUUcUxUxPVY4YcUxUP'),
                d('UGUP'),
                f('4sU4UlUkUPk640UcU7UYk6PVY4U4'),
                g('P4UlYkUVUe4eUPUxY6UPYk'),
                e('4UYkUsU7UhUxUcU7k64YUlY4UeUcUVk64eUPUsYUYc'),
                f('7Pe0e77UcUeY74hhhl7PG7eh'),
                g('4eUsYkU0UlU7Yck6P6UxYPUYk04cU7'),
                d('4YUcUYUc'),
                f('YUVsk7Vs'),
                g('4hUcU7Ulk640P4'),
                f('PVUcU04eUPUc'),
                k('4sUxUcPVPV4l4xUlUYUcU7k6Y6UxYPUYUcU7'),
                k('PkUPUsUxP6UxUsYcUPYkk7PkUPUsUxP6UxUsYcUPYkkeY4U0kck64sUVY4UcYUUPPek64VUlU7Y4YkUlUxk6keVVVkk0UkUcY4kc'),
                d('PcUsU7U4UPYek6P6444Uk6PUUcUPYYUPYk'),
                g('4VUcY4YkUcYek6PkUPUVUPUcYUUPYkk6P6UxYPUYk0UcU7'),
                g('U0UsUc'),
                g('Y4UlY6'),
                d('4sUVYkUlP6444Uk7P6444U'),
                g('UVUsU7YUUsYVk6UsY6Uck6UPYeUVUPY6Y4UcUlU7'),
                d('4cU7UsUVY4UcYUUP4VUsY6Y4UcUlU7'),
                g('40UPU7YP'),
                d('Y6YkUPUVUcYVUcUlU7k6U0UPU4UcYPU0Y6k6UUUxUlUsY4Vhk6YUUsYkYcUcU7UYk6YUUPUVVkk6YUUsYkYcUcU7P4UPYe4VUlUlYkU4UcU7UsY4UPVhk6YUUlUcU4k6U0UsUcU7kekck6Yhk6k6k6UYUxPl4UYkUsUY4VUlUxUlYkk6V0k6YUUPUVV4keYUUsYkYcUcU7P4UPYe4VUlUlYkU4UcU7UsY4UPkxk6V6kxk6VskcVhk6Y0'),
                g('PsPsVkV6VsVVk64UUcYkUPUUUlYek6P6UxYPUYUcU7'),
                f('4YUlUlUYUxUPk6PPY6U4UsY4UP'),
                k('7Pe0e77UcUeY7Ph0Gc74hGcs'),
                k('UP40YPYVUcUVP6UxYPUYUcU7k6444x40VU'),
                f('PYUPUkk64VUlU0Y6UlU7UPU7Y4YV'),
                e('4kUsUkYcUxUlU7k6P4UlUlUx4kUsYk'),
                g('4VUlUlYYUlU7k6PPY6U4UsY4UP'),
                k('4cU7UUUlP4UPYeY4'),
                f('YkU0UlUVYek7PkUPUsUxP6UxUsYcUPYkk64YVkk64VUlU7Y4YkUlUx'),
                d('Uc40UPYVUek6Y6UxYPUYUcU7'),
                e('PkUPUsUx44UlYYU7UxUlUsU4UPYkk6P6UxYPUYUcU7'),
                e('PVYcU0UsU7Y4UPUVk6P64h4ck64VUxUcUPU7Y4'),
                g('PlY6UeUsU7Y4UlU0'),
                g('4Y444xk64lUkUGUPUVY4k6PYUPUkk6P6UxYPUYk0UcU7k6VsVUk7V6V6'),
                d('YYUPUkUYUx'),
                k('7Pe0e77UcUeY7PG7eh74h0cV'),
                g('YVUVYkUPUPU7'),
                k('UkUlU4Yc'),
                f('P4Pk4c4s474Y4x4PPlPVP4Pk4cP6'),
                k('U7V0'),
                d('P4UxYYUY40UlU7Ul'),
                f('kYVGkY'),
                k('4xUlUY40UP4cU7k6P6UxYPUYUcU7k6Vsk7V6k7V6k7VcVVVP'),
                d('UUYPU7UVY4UcUlU7'),
                e('UVUlU7Y4UPYeY4k7UeUsYVUe4VUlU4UP'),
                k('4sYkUVUeUc4V4s44'),
                g('PU4PPkP44PPePlPV4e4s444PPk'),
                k('PPUkYPU7Y4YP'),
                d('4UUsUVUPUkUlUlUhk6P6UxYPUYUcU7'),
                e('4sUVY4UcYUUP4VUsY6Y4UcUlU7'),
                g('7YhheU7Ucee774h0cV'),
                k('40UsUxUYYPU7k64YUlY4UeUcUV'),
                e('47UPYYYVk64YUlY4UeUcUVk640P4'),
                e('4VUsY6Y4UcUlU7P4UPYeY4'),
                k('UsPGUkPcV6UVPeU4PYVsUPPUUUVkPPUYVVP4UeV4PVUcPkVPUGPsUhVUP6Ux4lVYU047U7Ve40Ul4xVcY64hYs4GYk4cYV4eY44YYP4UYU4PYY44Ye4VYc4kYG4s'),
                e('44UPUGUsPUYPk64x4Y4Vk6PVUsU7YVk640UlU7Ul'),
                k('4VUlY6Y6UPYkY6UxUsY4UPk64YUlY4UeUcUVk64xUcUYUeY4'),
                e('PVUPUYUlUPk6P6YkUcU7Y4'),
                g('PVUsYYUsYVU4UPUP'),
                d('4kUsYPUeUsYPYVk6VcVV'),
                f('4VUeUsUxUhU4YPYVY4UPYk'),
                g('4sUkUsU4Uck640P4k64VUlU7U4UPU7YVUPU4k64xUcUYUeY4'),
                f('4xYPUVUcU4Usk64kYkUcUYUeY4'),
                g('PYUcU4UPk64xUsY4UcU7'),
                g('UUUlU7Y4k6U4UPY4UPUVY4k6UPYkYkUlYk'),
                f('4hUlYGYPUhUsk64YUlY4UeUcUVk6P6YkVU47'),
                d('4eY4U0UxVPk6UxUlUVUsY4UcUlU7k6Y6YkUlYUUcU4UPYk'),
                f('44UcYUPek6P6UxYPYVk6PYUPUkk6P6UxUsYcUPYk'),
                f('PUUxUsU4UcU0UcYkk6PVUVYkUcY6Y4'),
                d('4UUcUxUPk644UlYYU7UxUlUsU4UPYkk6P6UxYPUYk0UcU7'),
                f('UlUk'),
                d('4sU4UlU4Ukk7PVY4YkUPUsU0'),
                d('40UPU7UxUl'),
                e('UVUsUxUxP6UeUsU7Y4UlU0'),
                k('PYUlUxUUYkUsU0k640UsY4UeUPU0UsY4UcUVUs'),
                e('4VUsY4UsUxUcU7Us4YYkUlYPY6k6PPY6U4UsY4UP'),
                k('4PYkUsYVk64kUlUxU4k64cP44V'),
                e('44UPYUUsUxPUPkPe4VY4YkUxk744UPYUUsUxPUPkPe4VY4YkUxk7Vs'),
                k('4GPV4PPVPV4c4l474c44k0PYPcPcPc'),
                g('7Pe0e77UcUeY7YhheU7chhcs'),
                k('UsU4U44kUPUeUsYUUcUlYk'),
                k('Y6Us'),
                k('4kUcY4YVY4YkUPUsU0k6PUUPYkUsk6PVUPYkUcUU'),
                d('keUUYPU7UVY4UcUlU7kekcYhYkUPY4YPYkU7k6VsVkVVVhY0kckekcVh'),
                d('Y6Uc'),
                d('P4UPU7UVUPU7Y4k64UP447k6Y6UxYPUYk0UcU7'),
                k('YkUPU0UlYUUP4VUeUcUxU4'),
                f('4UUlUxYek6VVk64kYkUlYYYVUPYkk6P6UxYPUYUcU7'),
                k('YPYVUPP6YkUlUYYkUsU0'),
                f('UeUlYVY4U7UsU0UP'),
                f('Y6UeUsU7Y4UlU0k7UcU7UGUPUVY44GYV'),
                f('PVUeUlUVUhYYUsYUUP4UUxUsYVUek7PVUeUlUVUhYYUsYUUP4UUxUsYVUe'),
                d('YkUYUkUskeVsV6Vkkxk6VkV6V4kxk6V6kxk6V6k7VYkc'),
                e('4sU4UkUxUlUVUhP6UxYPUYUcU7'),
                e('4kUsUVUhUYYkUlYPU7U4'),
                g('4sUY4VUlU7Y4YkUlUxk74sUY4VUlU7Y4YkUlUx'),
                e('P6UeUlY4Ul4VUPU7Y4UPYkP6UxYPUYUcU7Vsk7Vsk7Vkk7Vk'),
                g('4YYPU7UYPVUPUl'),
                e('YVV0'),
                d('U4UPUVUlU4UPPPPk4c'),
                g('7UcUhc7UG0GV7eeeck74h0cV'),
                d('7Pe0e77UcUeY7UcUh67cG0el'),
                d('VsVkVV'),
                g('YYUPUkUYUxk6UPYeUVUPY6Y4UcUlU7'),
                f('YkUP'),
                k('PY40P6UxUsYcUPYkk74l4VPe'),
                e('VYVkY6Ye'),
                f('4sY6Y6PYUlYkUhYVY6UsUVUP'),
                d('4eUcUYUeUxUcUYUeY4'),
                e('U4UlUVYPU0UPU7Y4'),
                d('PcUsU7U4UPYek640UPU4UcUsk6P6UxYPUYUcU7'),
                e('4PPV47k64xUsYPU7UVUek640UlYGUcUxUxUsk6P6UxYPUYUcU7'),
                d('VYV6Y6Yek6kY4sYkUcUsUxkY'),
                k('UcU7UGUPUVY44GYV'),
                g('4xUlU0Us'),
                d('4kUcY44VUlU0UPY44sUYUPU7Y4'),
                f('4VUsUxUcUkYkUc'),
                f('4kUlUlUhU0UsU7k64lUxU4k6PVY4YcUxUP'),
                d('YVUPYVYVUcUlU7PVY4UlYkUsUYUP'),
                f('PPY4UlY6UcUs'),
                k('UVUlU0Y6UcUxUPPVUeUsU4UPYk'),
                e('UPYVUVUsY6UP'),
                d('PVUVYkUlUxUxUkUsYk'),
                g('PYUcU7U4UlYY'),
                d('VsV4VYV4V4U4VcVPVVVeVVUVU4VVV6VYVP444sV4Vk4VVcVVUV44Us4sUPVYV4VUVP4V4U4sVPUU4VV64kVcVV4kVs'),
                d('7ccGhU74hcGU'),
                d('4hUsYVY6UPYkYVUhYck6P6UsYVYVYYUlYkU4k640UsU7UsUYUPYk'),
                e('40UcU7UY4xUcPPk04PYeY44k'),
                d('UYUPY4k6YVYcYVY4UPU0k6UVUlUxUlYkYVk6UPYeUVUPY6Y4UcUlU7'),
                d('PVUhYcY6UPk744UPY4UPUVY4UcUlU7'),
                k('4UUcUxUP4xUsUkk6Y6UxYPUYUcU7'),
                e('U7Y64sP64ck6P6UxYPUYUcU7'),
                g('U7UlY4PlUPYeUcYVY4PlUeUlYVY4'),
                e('VkU4'),
                d('4sUVY4UcYUUPPe4lUkUGUPUVY4'),
                k('44UlY4YPU0'),
                d('P6444Uk0Pe4VUeUsU7UYUPk6PUUcUPYYUPYk'),
                d('P640UcU7UY4xUcPP'),
                k('UVUlUxUlYk44UPY6Y4Ue')
            ],
            c = [
                f('47UlUhUcUsk6PVYPUcY4UPk64PU7UsUkUxUPYkk6P6UxYPUYUcU7'),
                k('PkUPUsUxPUUcU4UPUlk7PkUPUsUxPUUcU4UPUlkeY4U0kck64sUVY4UcYUUPPek64VUlU7Y4YkUlUxk6keVVVkk0UkUcY4kc'),
                k('40UsUYU7UPY4Ul'),
                e('4sU4UlUkUP4PYe40UsU74V4V44UPY4UPUVY4'),
                f('4YUsUkYkUcUlUxUs'),
                k('P6UxUsYcUkUcUxUx'),
                e('U7UsYUUcUYUsY4UlYk'),
                g('PkUsUVUeUsU7Us'),
                e('P4YYk64VUPU7k640P4k64VUlU7U4UPU7YVUPU4k64PYeY4YkUsk64kUlUxU4'),
                e('PsPs40UcU7Uc444xk6P6UxYPUYUcU7'),
                f('kVUUVUV6'),
                f('UUUcUxUxPkUPUVY4'),
                e('V0U7YPUxUxVhk6Y6UsY4UeV0klVhk6U4UlU0UsUcU7V0'),
                d('44UPUUUsYPUxY4k64kYkUlYYYVUPYkk64eUPUxY6UPYk'),
                d('4UYkUPU7UVUek6PVUVYkUcY6Y4k640P4'),
                g('7UG6eY7UGPhY74h0cV'),
                g('UPU7UVUlU4UPPPPk4c'),
                e('PPU0Y6YPYVUe'),
                k('UcUVY6'),
                f('7Pe0e77UcUeY7Yc6GP7Yele6'),
                k('UVYkUPUsY4UPP6YkUlUYYkUsU0'),
                g('U0UlU7UlYVY6UsUVUP'),
                k('4kYPY4Y4UlU7PVUeUsU4UlYY'),
                k('4kUlU4UlU7Uck640P4'),
                g('PVP44sP44c4VPl44Pk4sPY'),
                e('7chhcs74h0cV'),
                k('U4UlYYU7UxUlUsU4PPY6U4UsY4UPYk'),
                k('4sUxUcUPU4UcY4k6P6UxYPUYk04cU7'),
                d('P6444Uk6UcU7Y4UPUYYkUsU4Ulk6U4Ulk6PYUPUk4hUcY4'),
                k('YPU7UcUUUlYkU04lUUUUYVUPY4'),
                k('UPU7UVUlU4UPPPPk4c4VUlU0Y6UlU7UPU7Y4'),
                f('P6UcUVUsYVUs'),
                f('4sU4UlUkUPk64UUsU7UYYVUlU7UYk6PVY4U4'),
                k('UkUcU7U44kYPUUUUUPYk'),
                g('4sPU4Yk6PVUcY4UPPVUsUUUPY4Yck6Y6UxYPUYUcU7'),
                f('4lYkUkUcY4k644UlYYU7UxUlUsU4UPYk'),
                d('UVUlUxUlYk'),
                f('UeUcU4U4UPU7'),
                f('UxUlUVUsUxPVY4UlYkUsUYUP'),
                e('4YUlUlUYUxUPk6P4UsUxUhk64PUUUUUPUVY4YVk6P6UxYPUYUcU7'),
                d('UcU7U4UPYeUPU4444k'),
                g('4xYPUVUcU4Usk64UUsYe'),
                g('4sU0UsYGUlU740P6VV44UlYYU7UxUlUsU4UPYkP6UxYPUYUcU7'),
                k('UVYkUPUsY4UP4kYPUUUUUPYk'),
                f('4VUsYVY4UPUxUxUsYk'),
                k('UxUcU7UhP6YkUlUYYkUsU0'),
                f('4VUsUxUcUUUlYkU7UcUsU7k64U4k'),
                f('P4UeYkUPUP444eUcUYUeUxUcUYUeY4'),
                g('UVYkUPUsY4UPPVUeUsU4UPYk'),
                f('4YYPUxUcU0'),
                f('47YcYe4xUsYPU7UVUeUPYk'),
                d('PcUlYPP4YPUkUPk6P6UxYPUYk0UcU7'),
                e('7UGPhY74h0cVPl4Y4kVkVVVsVk'),
                g('PVPY4VY4Uxk7PVPY4VY4Ux'),
                f('4YUlUlUYUxUPk64PUsYkY4Uek6P6UxYPUYk0UcU7'),
                k('PsPs44UlYYU7UxUlUsU4k6P6UxYPUYUcU7'),
                k('k7U0YPYVUcUVk7VsVUVVk7UVUlU0Vhk7UcUYUsU0UPk7VsVUVVk7UVUlU0Vhk7U0YPYVUcUVk7UeYGk7U7UPY4UPUsYVUPk7UVUlU0'),
                k('47UlYkY4UlU7k64cU4UPU7Y4UcY4Yck6PVUsUUUP'),
                d('Y6UsYkYVUP4cU7Y4'),
                f('PVUcU0Y6UxUPk6P6UsYVYV'),
                d('4VUlUxUlU7U7Usk640P4'),
                k('YGUsUhUl'),
                k('UYUPY4PPU7UcUUUlYkU04xUlUVUsY4UcUlU7'),
                e('YVUeUsU4UPYkPVUlYPYkUVUP'),
                d('44UlYYU7UxUlUsU4UPYkYVk6Y6UxYPUYUcU7'),
                f('UxUlUVUsY4UcUlU7'),
                f('4eUPYkUlUPYVk6kUk64YUPU7UPYkUsUxYVk6UxUcYUUP'),
                g('YYUcU7U4UlYY'),
                g('PVUeUlYYUVUsYkU4k64YUlY4UeUcUV'),
                d('7Ph7G77eh0Gl7UG0GV7chhcs74h0cV'),
                e('7Pe0e77UcUeY7eGsex7UGPhY'),
                d('4YUcU7UYUPYk'),
                g('PkUlUVUh40UPUxY4k6PPY6U4UsY4UP'),
                f('PYUcU7U4UlYY4UYkUsU0UP'),
                g('UPU7UsUkUxUPPUUPYkY4UPYe4sY4Y4YkUcUk4sYkYkUsYc'),
                k('4hUsUVYVY44lU7UP'),
                d('UsY4Y4YkUcUkYPY4UPk6YUUPUVVkk6UsY4Y4YkPUUPYkY4UPYeVhk6YUUsYkYcUcU7UYk6YUUPUVVkk6YUUsYkYcUcU7P4UPYe4VUlUlYkU4UcU7UsY4UPVhk6YPU7UcUUUlYkU0k6YUUPUVVkk6YPU7UcUUUlYkU04lUUUUYVUPY4Vhk6YUUlUcU4k6U0UsUcU7kekck6Yhk6k6k6YUUsYkYcUcU7P4UPYe4VUlUlYkU4UcU7UsY4UPk6V0k6UsY4Y4YkPUUPYkY4UPYek6khk6YPU7UcUUUlYkU04lUUUUYVUPY4Vhk6k6k6UYUxPlP6UlYVUcY4UcUlU7k6V0k6YUUPUVV4keUsY4Y4YkPUUPYkY4UPYekxk6V6kxk6VskcVhk6Y0'),
                f('P6UPYkY6UPY4YPUs'),
                k('UlY6UPU744UsY4UsUkUsYVUP'),
                f('UVUsU7YUUsYV'),
                d('Uc4YUPY4Y4UPYkPVUVYkUcY6Y4UsUkUxUPP6UxYPUYUcU7'),
                d('4cU7UUUlYkU0UsUxk6PkUlU0UsU7'),
                k('47UcY4YkUlk6P6444Uk6P6UxYPUYk04cU7'),
                g('40YVYeU0UxVkk7Pe404x4eP4P4P6'),
                e('7Pe0e77UcUeY7chhcs74h0cV'),
                f('47P64xUsYVY4P6UsYVYV'),
                d('P4UeYkUPUP444UUsUVUP'),
                f('4xUsYVY4P6UsYVYV'),
                f('VGVG'),
                k('Y6UsYkYVUP4UUxUlUsY4'),
                k('7Pe0e77UcUeY7ccGhU74hcGU'),
                d('Vhk6'),
                g('UYUPY44sY4Y4YkUcUk4xUlUVUsY4UcUlU7'),
                f('YhkYU7UsU0UPkYVG'),
                e('47YcUsUxUs'),
                f('U7UlY4PlUPYeUcYVY4PlUeUlYVY4U7UsU0UP'),
                f('PxkY'),
                g('4Y4U4s4V4Pk6P6UxYPUYUcU7'),
                k('YPU7U4UPUUUcU7UPU4'),
                d('7UcUh67PG7eh74h0cV'),
                g('PlUcYPYsYeUxU4U0YGYkPl'),
                e('Pxk7'),
                f('40UsY4YPYkUsk640P4k6PVUVYkUcY6Y4k64VUsY6UcY4UsUxYV'),
                e('4sYkUcUsUxk64kUxUsUVUh'),
                e('4UUsU7UYPVUlU7UY'),
                d('U0YY4Vk6U7UhUkUsUUUGUlYkU4k6Y6UeYVUYUxYck6UPYeYUY4k6YGYsUcYPkxk67sh0G6k6Y4Y6UeYVY4klVGklYPUeUkUYY4UcUVk7U0UlklUxUPYUYUUs'),
                d('4kYkUsUYUYUsU4UlUVUcUl'),
                f('4eUsYkU0UlU7Yck64UUcYkUPUUUlYek6P6UxYPUYUcU7'),
                f('P6UsUxUsUVUPk6PVUVYkUcY6Y4k640P4'),
                g('47UsY4UcYUUPk64VUxUcUPU7Y4'),
                e('YPYVUPYk4sUYUPU7Y4'),
                g('PsYPUcUVUhP4UcU0UPk7PsYPUcUVUhP4UcU0UP'),
                k('UPYeY6UPYkUcU0UPU7Y4UsUxk0YYUPUkUYUx'),
                f('4sPkPk4sPcPl4kPP4U4U4PPk'),
                f('7eehhc7Uc7cx74heh074heG07chhcs'),
                d('4sUxUcY6UsYck6PVUPUVYPYkUcY4Yck64VUlU7Y4YkUlUxk6VV'),
                d('PVUVYkUcY6Y4k640P4k64kUlUxU4'),
                e('kxk6kYUkYkUlYYYVUPYkP6YkUlY6kYVG'),
                g('P4444V4VY4Uxk7P4444V4VY4Ux'),
                k('YVUPUxUU'),
                f('4cU7UUUl4kUsUVUhUYYkUlYPU7U4'),
                g('P6UsU7U4Ulk6PYUPUkk6P6UxYPUYUcU7'),
                e('4eUsUPY4Y4UPU7YVUVUeYYUPUcUxUPYk'),
                d('YVY6UsU7'),
                g('4sUVY4UcYUUP4kUlYkU4UPYk'),
                k('P4UeYkUPUP444xUcUYUeY4PVUeUsU4UlYY'),
                g('V6VkV6Vk'),
                f('V6VkV6VV'),
                e('V6VkV6V6'),
                d('V6VkV6Vs'),
                d('PYP64ck644UPY4UPUVY4UlYkk6Vsk7V4'),
                g('Vhk6UPYeY6UcYkUPYVV0'),
                d('P4UeYkUPUP4444UsYkUhPVUeUsU4UlYY'),
                g('4PYeUcUUk64PYUUPYkYcYYUeUPYkUP'),
                d('4kUsY4Y4UxUPUxUlUYk64YUsU0UPk64xUsYPU7UVUeUPYk'),
                g('4cU0Y6UsUVY4'),
                k('PU4x4Vk640YPUxY4UcU0UPU4UcUsk6P6UxYPUYUcU7'),
                d('4sU4UlUkUPk64eUPUkYkUPYY'),
                e('4kUxYPUPPVY4UsUVUhYVk64cU7YVY4UsUxUxk644UPY4UPUVY4UlYk'),
                d('YYYYYYU0U0U0U0U0U0U0U0U0U0UxUxUc'),
                d('UeUcYVY4UlYkYc'),
                g('YVUsU7YVk0YVUPYkUcUU'),
                g('P6UsY6YcYkYPYV'),
                d('4kYPY4Y4UlU7P4UPYeY4'),
                k('V6VkVsVs'),
                f('4sY6Y6PPY6'),
                g('P6UsYkUlU0k7P4PUk6Y6UxUsYcUPYkk6Y6UxYPUYUcU7'),
                k('44UPUsUxP6UxYc4xUcYUUPk6PPY6U4UsY4UP'),
                f('4xUlUeUcY4k64YYPUGUsYkUsY4Uc'),
                d('4UPk4s4Y404P47P4PlPV4e4s444PPk'),
                d('4sUYUPU7UVYck64U4k'),
                e('40UsUVYkUlU0UPU4UcUs4UUxUsYVUeP6UsY6UPYkk740UsUVYkUlU0UPU4UcUs4UUxUsYVUeP6UsY6UPYk'),
                d('kVkVkV'),
                f('PYUlYkU44VUsY6Y4YPYkUPPe'),
                k('UYUPY44VUlU0Y6YPY4UPU4PVY4YcUxUP'),
                e('Y6UxUsY4UUUlYkU0'),
                e('V6VsV6VP'),
                g('4sYkUsUkUcUVk6P4YcY6UPYVUPY4Y4UcU7UY'),
                e('V6VsV6VU'),
                e('V6VsV6VV'),
                d('7Pe0e77UcUeY74heG07PG7eh'),
                g('V6VsV6V4'),
                f('V6VsV6Vs'),
                g('V6VsV6Vk'),
                f('V6VsV6V6'),
                k('V6VsV6VY'),
                k('4kYPY4Y4UlU74eUcUYUeUxUcUYUeY4'),
                k('YUUPYkY4UPYe4sY4Y4YkUcUkP6UlUcU7Y4UPYk'),
                e('V6VsV6Ve'),
                k('Y4UPYeY44kUsYVUPUxUcU7UP'),
                e('kVV6VUVc'),
                f('U4UlYPUkUxUPP4YYUcYVY4k6PYUPUkk6P6UxYPUYUcU7'),
                g('YPU7UPYVUVUsY6UP'),
                g('P4UeYPU7U4UPYkk644UsY64VY4YkUxk647P64sP64ck6P6UxYPUYUcU7'),
                d('4kUsY4UsU7UY'),
                d('444U4hUsUck0PV4k'),
                g('PVU7UsY6k64cP44V')
            ],
            Ja = [
                e('40UlUlUx4kUlYkUsU7')
            ];
        (function () {
            var a = [
                82,
                73,
                50,
                30,
                45,
                29,
                28,
                16,
                82,
                41,
                77,
                5,
                27,
                92,
                27,
                0,
                2,
                1423857449, -2,
                3, -3,
                3432918353,
                1555261956,
                4,
                2847714899, -4,
                5, -5,
                2714866558,
                1281953886,
                6, -6,
                198958881,
                1141124467,
                2970347812, -7,
                7,
                3110523913,
                8, -8,
                2428444049, -9,
                9,
                10, -10,
                11, -11,
                2563907772,
                12, -12,
                13,
                2282248934, -13,
                2154129355, -14,
                14,
                15, -15,
                16, -16,
                17, -17,
                18, -18,
                19, -19,
                20, -20,
                21, -21, -22,
                22,
                23, -23,
                24, -24, -25,
                25, -26,
                26,
                27, -27,
                28, -28,
                29, -29, -30,
                30,
                31, -31, -32,
                32, -33,
                33, -34,
                34, -35,
                35, -37, -36,
                36,
                37, -38,
                39, -39,
                38, -41,
                41,
                40, -40,
                42, -43,
                43, -42, -45,
                45, -44,
                44, -46,
                47,
                46, -47,
                48, -48,
                49, -49,
                50, -51,
                51, -50,
                570562233,
                53, -52, -53,
                52,
                55,
                54, -54, -55,
                503444072, -57, -56,
                57,
                56,
                58, -59, -58,
                59,
                60,
                61, -61, -60,
                62,
                63, -63, -62, -66,
                711928724,
                64, -67,
                66,
                65, -64, -65,
                67, -69,
                68,
                69,
                70, -70, -68, -71,
                71, -72,
                3686517206, -75, -74,
                75,
                73,
                72,
                74, -73,
                79,
                76, -76,
                77, -79, -78,
                78, -77,
                3554079995,
                82, -80,
                80, -83, -82,
                81, -81,
                83, -85, -84, -86,
                86,
                84,
                85,
                87, -87, -91,
                90,
                88,
                89, -88, -90,
                91, -89,
                95,
                94, -92, -95,
                93, -94, -93,
                92, -99,
                99, -96,
                98, -97, -98,
                96,
                97, -101,
                3272380065,
                100, -103,
                101,
                102, -102, -100,
                103,
                107, -105,
                104,
                106,
                105, -106, -104, -107,
                111,
                108,
                110,
                109, -108, -110, -109, -111,
                251722036, -114,
                115,
                113,
                112,
                114, -115, -112, -113, -118,
                118, -116, -119,
                116,
                117, -117,
                119,
                123,
                120,
                122,
                121, -120, -122, -121, -123,
                125,
                127,
                3412177804,
                126,
                124, -125, -126, -124, -127, -128,
                128, -129,
                1843258603,
                3803740692,
                984961486,
                3939845945,
                4195302755,
                4066508878,
                255,
                1706088902,
                256,
                1969922972,
                365,
                2097651377,
                376229701,
                853044451,
                752459403,
                1000,
                426522225,
                3772115230,
                615818150,
                3904427059,
                4167216745,
                4027552580,
                3654703836,
                1886057615,
                879679996,
                3518719985,
                3244367275,
                2013776290,
                3373015174,
                1759359992,
                285281116,
                1622183637,
                1006888145,
                10000,
                1231636301,
                83908371,
                1090812512,
                2463272603,
                1373503546,
                2596254646,
                2321926636,
                1504918807,
                2181625025,
                2882616665,
                2747007092,
                3009837614,
                3138078467,
                397917763,
                81470997,
                829329135,
                2657392035,
                956543938,
                2517215374,
                2262029012,
                40735498,
                2394877945,
                3266489909,
                702138776,
                2808555105,
                2936675148,
                1258607687,
                1131014506,
                3218104598,
                3082640443,
                1404277552,
                565507253,
                534414190,
                1541320221,
                1913087877,
                2053790376,
                1789927666,
                3965973030,
                3826175755,
                4107580753,
                4240017532,
                1658658271,
                3579855332,
                3708648649,
                3453421203,
                3317316542,
                1873836001,
                1742555852,
                461845907,
                3608007406,
                1996959894,
                3747672003,
                3485111705,
                2137656763,
                3352799412,
                213261112,
                3993919788,
                1.01,
                3865271297,
                4139329115,
                4275313526,
                282753626,
                1068828381,
                2768942443,
                2909243462,
                936918000,
                3183342108,
                27492,
                141376813,
                1740000,
                3050360625,
                654459306,
                2617837225,
                1454621731,
                2489596804,
                2227061214,
                1591671054,
                2362670323,
                4294967295,
                1308918612,
                2246822507,
                795835527,
                1181335161,
                414664567,
                4279200368,
                1661365465,
                1037604311,
                4150417245,
                3887607047,
                1802195444,
                4023717930,
                2075208622,
                1943803523,
                901097722,
                628085408,
                755167117,
                3322730930,
                3462522015,
                3736837829,
                3604390888,
                2366115317,
                0.4,
                2238001368,
                2512341634,
                2647816111, -0.2,
                314042704,
                1510334235,
                58964,
                1382605366,
                31158534,
                450548861,
                3020668471,
                1119000684,
                3160834842,
                2898065728,
                1256170817,
                1800000,
                2765210733,
                3060149565,
                3188396048,
                2932959818,
                124634137,
                2797360999,
                366619977,
                62317068, -0.26,
                1202900863,
                498536548,
                1340076626,
                2405801727,
                2265490386,
                1594198024,
                1466479909,
                2547177864,
                249268274,
                2680153253,
                2125561021,
                3294710456,
                855842277,
                3423369109,
                0.732134444,
                3705015759,
                3569037538,
                1994146192,
                1711684554,
                1852507879,
                997073096,
                733239954,
                4251122042,
                601450431,
                4111451223,
                167816743,
                3855990285,
                3988292384,
                3369554304,
                3233442989,
                3495958263,
                3624741850,
                65535,
                453092731, -0.9,
                2094854071,
                1957810842,
                325883990,
                4057260610,
                1684777152,
                4189708143,
                3915621685,
                162941995,
                1812370925,
                3775830040,
                783551873,
                3134207493,
                1172266101,
                2998733608,
                2724688242,
                1303535960,
                2852801631,
                112637215,
                1567103746,
                651767980,
                1426400815,
                906185462,
                2211677639,
                1047427035,
                2344532202,
                2607071920,
                2466906013,
                225274430,
                544179635,
                2176718541,
                2312317920,
                1483230225,
                1342533948,
                2567524794,
                2439277719,
                1088359270,
                671266974,
                1219638859,
                953729732,
                3099436303,
                2966460450,
                817233897,
                2685067896,
                2825379669,
                4089016648,
                4224994405,
                3943577151,
                3814918930,
                476864866,
                1634467795,
                335633487,
                1762050814,
                1,
                2044508324, -1,
                3401237130,
                3268935591,
                3524101629,
                3663771856,
                1907459465
            ];
            (function () {
                function d(b, c) {
                    if (null == b) return null;
                    for (var l = x(c), f = [], g = b.length, e = a[15]; e < g; e++) f.push(Y(b[e], l++));
                    return f
                }

                function f(b) {
                    if (null == b) return null;
                    for (var c = [], l = a[15], d = b.length; l < d; l++) {
                        var g = b[l];
                        c[l] = Ka[(g >>> a[23] & a[56]) * a[58] + (g & a[56])]
                    }
                    return c
                }

                function g(h) {
                    var c = [];
                    if (null == h || void 0 == h || h.length == a[15]) return za(L);
                    if (h.length >= L) {
                        var c = a[15],
                            l = [];
                        if (null != h && h.length != a[15]) {
                            if (h.length < L) throw Error(b[134]);
                            for (var d = a[15]; d < L; d++) l[d] = h[c + d]
                        }
                        return l
                    }
                    for (l = a[15]; l < L; l++) c[l] = h[l % h.length];
                    return c
                }

                function e(h) {
                    var c = a[405];
                    if (null != h)
                        for (var l = a[15]; l < h.length; l++) c = c >>> a[38] ^ La[(c ^ h[l]) & a[299]];
                    h = Aa(c ^ a[405]);
                    c = h.length;
                    if (null == h || c < a[15]) h = new String(b[0]);
                    else {
                        for (var l = [], d = a[15]; d < c; d++) l.push(Ma(h[d]));
                        h = l.join(b[0])
                    }
                    return h
                }

                function k(h, c, l) {
                    var d,
                        f = [
                            b[70],
                            b[85],
                            b[118],
                            b[73],
                            b[77],
                            b[106],
                            b[80],
                            b[116],
                            b[44],
                            b[42],
                            b[62],
                            b[114],
                            b[93],
                            b[105],
                            b[40],
                            b[64],
                            b[103],
                            b[86],
                            b[99],
                            b[141],
                            b[48],
                            b[89],
                            b[76],
                            b[69],
                            b[132],
                            b[47],
                            b[88],
                            b[33],
                            b[43],
                            b[45],
                            b[78],
                            b[53],
                            b[110],
                            b[50],
                            b[68],
                            b[101],
                            b[52],
                            b[41],
                            b[138],
                            b[133],
                            b[66],
                            b[129],
                            b[108],
                            b[81],
                            b[140],
                            b[90],
                            b[117],
                            b[63],
                            b[107],
                            b[91],
                            b[135],
                            b[115],
                            b[113],
                            b[97],
                            b[60],
                            b[61],
                            b[137],
                            b[126],
                            b[83],
                            b[79],
                            b[119],
                            b[71],
                            b[123],
                            b[75]
                        ],
                        g = b[74],
                        e = [];
                    if (l == a[541]) l = h[c],
                        d = a[15],
                        e.push(f[l >>> a[16] & a[153]]),
                        e.push(f[(l << a[23] & a[122]) + (d >>> a[23] & a[56])]),
                        e.push(g),
                        e.push(g);
                    else if (l == a[16]) l = h[c],
                        d = h[c + a[541]],
                        h = a[15],
                        e.push(f[l >>> a[16] & a[153]]),
                        e.push(f[(l << a[23] & a[122]) + (d >>> a[23] & a[56])]),
                        e.push(f[(d << a[16] & a[148]) + (h >>> a[30] & a[19])]),
                        e.push(g);
                    else if (l == a[19]) l = h[c],
                        d = h[c + a[541]],
                        h = h[c + a[16]],
                        e.push(f[l >>> a[16] & a[153]]),
                        e.push(f[(l << a[23] & a[122]) + (d >>> a[23] & a[56])]),
                        e.push(f[(d << a[16] & a[148]) + (h >>> a[30] & a[19])]),
                        e.push(f[h & a[153]]);
                    else throw Error(b[111]);
                    return e.join(b[0])
                }

                function za(b) {
                    for (var c = [], l = a[15]; l < b; l++) c[l] = a[15];
                    return c
                }

                function Z(h, c, l, d, f) {
                    if (null != h && h.length != a[15]) {
                        if (null == l) throw Error(b[131]);
                        if (h.length < f) throw Error(b[134]);
                        for (var e = a[15]; e < f; e++) l[d + e] = h[c + e]
                    }
                }

                function Aa(b) {
                    var c = [];
                    c[0] = b >>> a[74] & a[299];
                    c[1] = b >>> a[58] & a[299];
                    c[2] = b >>> a[38] & a[299];
                    c[3] = b & a[299];
                    return c
                }

                function ma(h) {
                    if (null == h || void 0 == h) return h;
                    h = encodeURIComponent(h);
                    for (var c = [], l = h.length, d = a[15]; d < l; d++)
                        if (h.charAt(d) == b[27])
                            if (d + a[16] < l) c.push(Na(h.charAt(++d) + b[0] + h.charAt(++d))[0]);
                            else throw Error(b[146]);
                    else c.push(h.charCodeAt(d));
                    return c
                }

                function Na(b) {
                    if (null == b || b.length == a[15]) return [];
                    b = new String(b);
                    for (var c = [], l = b.length / a[16], d = a[15], f = a[15]; f < l; f++) {
                        var e = parseInt(b.charAt(d++), a[58]) << a[23],
                            g = parseInt(b.charAt(d++), a[58]);
                        c[f] = x(e + g)
                    }
                    return c
                }

                function Ma(c) {
                    var d = [];
                    d.push(aa[c >>> a[23] & a[56]]);
                    d.push(aa[c & a[56]]);
                    return d.join(b[0])
                }

                function na(b, c) {
                    if (null == b || null == c || b.length != c.length) return b;
                    for (var d = [], f = a[15], e = b.length; f < e; f++) d[f] = Y(b[f], c[f]);
                    return d
                }

                function Y(a, b) {
                    a = x(a);
                    b = x(b);
                    return x(a ^ b)
                }

                function Oa(a, b) {
                    return x(a + b)
                }

                function x(c) {
                    if (c < a[290]) return x(a[291] - (a[290] - c));
                    if (c >= a[290] && c <= a[282]) return c;
                    if (c > a[282]) return x(a[292] + c - a[282]);
                    throw Error(b[136])
                }

                function Pa(h) {
                    function d() {
                        for (var h = [
                            b[282],
                            c[32],
                            c[137],
                            b[221],
                            c[150],
                            b[36],
                            c[157],
                            c[103],
                            c[174],
                            b[280],
                            b[18],
                            b[303],
                            c[23],
                            b[338],
                            c[106],
                            b[181],
                            b[337],
                            c[46],
                            c[44],
                            b[112],
                            b[210],
                            b[194],
                            b[281],
                            c[60],
                            b[277],
                            b[276],
                            b[160],
                            c[175],
                            b[356],
                            b[198],
                            b[297],
                            b[98],
                            c[104],
                            b[184],
                            b[223],
                            c[14],
                            c[4],
                            b[226],
                            b[127],
                            b[92],
                            c[49],
                            b[318],
                            c[122],
                            b[67],
                            B[5],
                            c[135],
                            c[81],
                            c[75],
                            b[228],
                            b[286],
                            c[148],
                            b[335],
                            b[283],
                            c[41],
                            c[2],
                            b[272],
                            c[102],
                            b[293],
                            b[348],
                            Ja[0],
                            b[169],
                            B[4],
                            b[273],
                            b[82],
                            c[94],
                            c[108],
                            c[142],
                            c[77],
                            c[5],
                            b[358],
                            c[7],
                            b[212],
                            b[279],
                            c[116],
                            b[278],
                            c[68],
                            b[229],
                            c[176],
                            b[261],
                            c[8],
                            b[268],
                            c[17],
                            b[26],
                            b[340],
                            b[289],
                            b[284],
                            b[104],
                            c[160],
                            b[224],
                            b[256],
                            b[243],
                            b[322],
                            b[204],
                            c[19],
                            b[300],
                            c[70],
                            c[90],
                            b[206],
                            b[3],
                            b[65],
                            c[99],
                            b[186],
                            b[321],
                            b[170],
                            b[346],
                            c[25],
                            b[174],
                            b[271],
                            c[15],
                            b[46],
                            c[52],
                            c[69],
                            c[84],
                            b[153],
                            b[125],
                            c[114],
                            b[37]
                        ], f = [], e = a[15]; e < h.length; e++) try {
                            var g = h[e];
                            l()(g) && f.push(g)
                        } catch (k) {}
                        return f.join(b[56])
                    }

                    function l() {
                        function h(a) {
                            var c = {};
                            return k.style.fontFamily = a,
                                g.appendChild(k),
                                c.height = k.offsetHeight,
                                c.width = k.offsetWidth,
                                g[b[307]](k),
                                c
                        }
                        var d = [
                                c[21],
                                c[141],
                                B[6]
                            ],
                            l = [],
                            f = c[139],
                            e = b[327],
                            g = C[b[258]],
                            k = C[b[167]](c[123]);
                        k.style.fontSize = e;
                        k.style.visibility = c[37];
                        k.innerHTML = f;
                        for (f = a[15]; f < d.length; f++) l[f] = h(d[f]);
                        return function (c) {
                            for (var f = a[15]; f < l.length; f++) {
                                var e = h(c + b[34] + d[f]),
                                    g = l[f];
                                if (e.height !== g.height || e.width !== g.width) return !0
                            }
                            return !1
                        }
                    }

                    function f() {
                        var a = null,
                            h = null,
                            d = [];
                        try {
                            h = C[b[167]](c[79]),
                                a = h[B[7]](b[255]) || h[B[7]](c[112])
                        } catch (l) {}
                        if (!a) return d;
                        try {
                            d.push(a[b[20]]())
                        } catch (g) {}
                        try {
                            d.push(e(a, h))
                        } catch (k) {}
                        return d.join(b[56])
                    }

                    function e(h, d) {
                        try {
                            var f = c[76],
                                l = b[240],
                                g = h[c[43]]();
                            h[c[33]](h[c[113]], g);
                            var k = new Float32Array([a[432],
                                a[488],
                                a[15],
                                a[428],
                                a[453],
                                a[15],
                                a[15],
                                a[468],
                                a[15]
                            ]);
                            h.bufferData(h[c[113]], k, h[c[24]]);
                            g.k = a[19];
                            g.l = a[19];
                            var t = h[c[20]](),
                                X = h[c[48]](h[b[267]]);
                            h[c[63]](X, f);
                            h[b[341]](X);
                            var la = h[c[48]](h[c[149]]);
                            return h[c[63]](la, l),
                                h[b[341]](la),
                                h[b[177]](t, X),
                                h[b[177]](t, la),
                                h[c[45]](t),
                                h[b[309]](t),
                                t.n = h[c[92]](t, b[205]),
                                t.m = h[c[62]](t, c[29]),
                                h[c[74]](t.o),
                                h[c[167]](t.n, g.k, h.FLOAT, !a[541], a[15], a[15]),
                                h[J[0]](t.m, a[541], a[541]),
                                h[b[139]](h[b[259]], a[15], g.l),
                                M(d[b[149]]())
                        } catch ($a) {
                            return b[324]
                        }
                    }

                    function g() {
                        var h = C[b[167]](b[155]),
                            d = [],
                            f = [
                                c[124],
                                b[270],
                                b[328],
                                b[315],
                                b[192],
                                c[166],
                                c[22],
                                c[143],
                                b[274],
                                b[1],
                                b[329],
                                b[154],
                                b[161],
                                b[238],
                                b[49],
                                c[120],
                                b[248],
                                b[239],
                                b[156],
                                b[343],
                                c[132],
                                c[86],
                                c[47],
                                c[125],
                                b[32],
                                b[344],
                                c[73],
                                b[150]
                            ];
                        if (!window[c[154]]) return d.join(b[0]);
                        for (var l = a[15]; l < f.length; l++) try {
                            C[b[258]].appendChild(h),
                                h.style.color = f[l],
                                d.push(f[l]),
                                d.push(window[c[154]](h).getPropertyValue(c[36])),
                                C[b[258]][b[307]](h)
                        } catch (e) {
                            d.push(b[349])
                        }
                        return d.join(b[54])
                    }

                    function k() {
                        try {
                            var h = C[b[167]](c[79]),
                                d = h[B[7]](b[354]),
                                f = c[105];
                            d[c[169]] = b[235];
                            d[b[145]] = b[333];
                            d[c[169]] = b[202];
                            d[b[219]] = c[10];
                            d[c[11]](a[281], a[541], a[152], a[66]);
                            d[b[219]] = c[170];
                            d.fillText(f, a[16], a[56]);
                            d[b[219]] = b[313];
                            d.fillText(f, a[23], a[60]);
                            return h[b[149]]()
                        } catch (l) {
                            return b[237]
                        }
                    }

                    function m() {
                        try {
                            return window[b[355]] && n.h ? q() : r()
                        } catch (a) {
                            return b[31]
                        }
                    }

                    function r() {
                        if (!y[b[4]]) return b[0];
                        var h = [
                                b[211],
                                b[314],
                                c[3],
                                b[5],
                                b[183],
                                c[27],
                                c[115],
                                b[230],
                                c[42],
                                b[157],
                                c[145],
                                b[266],
                                c[34],
                                b[246],
                                c[134],
                                b[336],
                                b[189],
                                c[138],
                                b[296],
                                b[201],
                                b[158],
                                b[233],
                                b[247],
                                c[147],
                                c[13],
                                b[55],
                                b[288],
                                b[173],
                                c[171],
                                c[64],
                                c[26],
                                b[244],
                                b[332],
                                b[187],
                                c[133],
                                b[269],
                                b[290],
                                b[351],
                                b[176],
                                b[308],
                                b[39],
                                b[254],
                                c[97],
                                c[71],
                                b[72],
                                b[7],
                                c[54],
                                b[200],
                                c[39],
                                b[242],
                                c[107],
                                b[225],
                                c[66],
                                b[188],
                                b[287],
                                b[190],
                                c[80],
                                b[250],
                                b[347],
                                c[87],
                                b[263],
                                b[213],
                                b[109],
                                b[95],
                                B[1],
                                c[109],
                                c[82],
                                c[0],
                                c[57],
                                b[352],
                                c[85],
                                B[3],
                                b[166],
                                c[50],
                                b[214],
                                b[195],
                                c[35],
                                c[121],
                                c[146],
                                c[28],
                                b[357],
                                b[317],
                                c[31],
                                b[178],
                                b[241],
                                c[55],
                                c[9],
                                b[96],
                                b[251],
                                b[94],
                                c[72],
                                b[196],
                                b[23],
                                b[102],
                                b[84],
                                b[148],
                                b[199],
                                c[59],
                                b[16],
                                b[217],
                                b[252],
                                b[306],
                                c[173],
                                b[222],
                                b[15],
                                b[58],
                                b[203],
                                b[8],
                                c[136],
                                b[245],
                                b[17],
                                b[51],
                                b[295],
                                c[153],
                                c[130],
                                b[331],
                                b[232],
                                c[51],
                                c[61]
                            ],
                            d = [],
                            f = {};
                        d.push(p(y[b[4]], function (h) {
                            f[h.name] = a[541];
                            var d = p(h, function (a) {
                                return [a.type,
                                    a.suffixes
                                ].join(b[144])
                            }).join(b[34]);
                            return [h.name,
                                h.description,
                                d
                            ].join(c[88])
                        }, this).join(b[25]));
                        d.push(p(h, function (a) {
                            if (f[a]) return b[0];
                            a = y[b[4]][a];
                            if (!a) return b[0];
                            var h = p(a, function (a) {
                                return [a.type,
                                    a.suffixes
                                ].join(b[144])
                            }).join(b[34]);
                            return [a.name,
                                a.description,
                                h
                            ].join(c[88])
                        }, this).join(b[56]));
                        return d.join(b[56])
                    }

                    function q() {
                        return window[b[355]] ? p([b[236],
                            b[292],
                            b[316],
                            b[298],
                            c[151],
                            b[197],
                            c[83],
                            b[218],
                            c[111],
                            b[175],
                            b[249],
                            b[100],
                            b[162],
                            b[231],
                            c[1],
                            b[249],
                            b[102],
                            b[148],
                            b[312],
                            c[53],
                            b[350],
                            c[118],
                            b[326]
                        ], function (a) {
                            try {
                                return new window[b[355]](a),
                                    a
                            } catch (h) {
                                return null
                            }
                        }).join(b[56]) : b[0]
                    }

                    function p(a, b, h) {
                        var c = [];
                        if (null == a) return c;
                        if (I && a.map === I) return a.map(b, h);
                        E(a, function (a, d, f) {
                            c[c.length] = b.call(h, a, d, f)
                        });
                        return c
                    }

                    function E(b, h) {
                        if (null !== b)
                            if (z && b.forEach === z) b.forEach(h, void 0);
                            else if (b.length === +b.length)
                            for (var c = a[15], d = b.length; c < d && h.call(void 0, b[c], c, b) !== {}; c++);
                        else
                            for (c in b)
                                if (b.hasOwnProperty(c) && h.call(void 0, b[c], c, b) === {}) break
                    }
                    var z = Array.prototype.forEach,
                        I = Array.prototype.map,
                        n = {
                            e: M,
                            j: !0,
                            i: !0,
                            h: !0,
                            b: !0,
                            a: !0
                        };
                    typeof h == b[264] ? n.e = h : (null != h.b && void 0 != h.b && (n.b = h.b), null != h.a && void 0 != h.a && (n.a = h.a));
                    this.get = function () {
                        var h = [],
                            l = [];
                        if (Qa) {
                            var e;
                            try {
                                e = !!window[b[339]]
                            } catch (X) {
                                e = !0
                            }
                            h.push(e);
                            var p;
                            try {
                                p = !!window[c[38]]
                            } catch (z) {
                                p = !0
                            }
                            h.push(p);
                            h.push(!!window[c[40]]);
                            C[b[258]] ? h.push(typeof C[b[258]][b[301]]) : h.push('undefined');
                            h.push(typeof window[c[78]]);
                            h.push(y[b[193]]);
                            h.push(y[c[155]]);
                            if (e = n.i) try {
                                var u = C[b[167]](c[79]);
                                e = !(!u[B[7]] || !u[B[7]](b[354]))
                            } catch (r) {
                                e = !1
                            }
                            if (e) try {
                                h.push(k()),
                                    n.b && h.push(f())
                            } catch (E) {
                                h.push(b[59])
                            }
                            h.push(g());
                            n.a && l.push(d());
                            l.push(y[c[110]]);
                            l.push(y[b[151]]);
                            l.push(window[b[257]][b[359]]);
                            n.j && (u = window[b[257]] ? [
                                window[b[257]].height,
                                window[b[257]].width
                            ] : [
                                a[15],
                                a[15]
                            ], typeof u !== c[98] && l.push(u.join(b[138])));
                            l.push((new Date)[b[128]]());
                            l.push(y[b[122]]);
                            l.push(m())
                        }
                        u = [];
                        n.e ? (u.push(n.e(h.join(c[152]))), u.push(n.e(l.join(c[152])))) : (u.push(M(h.join(c[152]))), u.push(M(l.join(c[152]))));
                        return u
                    }
                }

                function M(h) {
                    var c = a[88],
                        d,
                        f,
                        e,
                        g,
                        k,
                        m;
                    d = h.length & a[19];
                    f = h.length - d;
                    e = c;
                    c = a[21];
                    g = a[375];
                    for (m = a[15]; m < f;) k = h.charCodeAt(m) & a[299] | (h.charCodeAt(++m) & a[299]) << a[38] | (h.charCodeAt(++m) & a[299]) << a[58] | (h.charCodeAt(++m) & a[299]) << a[74],
                        ++m,
                        k = (k & a[486]) * c + (((k >>> a[58]) * c & a[486]) << a[58]) & a[405],
                        k = k << a[56] | k >>> a[60],
                        k = (k & a[486]) * g + (((k >>> a[58]) * g & a[486]) << a[58]) & a[405],
                        e ^= k,
                        e = e << a[50] | e >>> a[64],
                        e = (e & a[486]) * a[26] + (((e >>> a[58]) * a[26] & a[486]) << a[58]) & a[405],
                        e = (e & a[486]) + a[394] + (((e >>> a[58]) + a[435] & a[486]) << a[58]);
                    k = a[15];
                    switch (d) {
                    case a[19]:
                        k ^= (h.charCodeAt(m + a[16]) & a[299]) << a[58];
                    case a[16]:
                        k ^= (h.charCodeAt(m + a[541]) & a[299]) << a[38];
                    case a[541]:
                        k ^= h.charCodeAt(m) & a[299],
                            k = (k & a[486]) * c + (((k >>> a[58]) * c & a[486]) << a[58]) & a[405],
                            k = k << a[56] | k >>> a[60],
                            k = (k & a[486]) * g + (((k >>> a[58]) * g & a[486]) << a[58]) & a[405],
                            e ^= k
                    }
                    e ^= h.length;
                    e ^= e >>> a[58];
                    e = (e & a[486]) * a[407] + (((e >>> a[58]) * a[407] & a[486]) << a[58]) & a[405];
                    e ^= e >>> a[50];
                    e = (e & a[486]) * a[349] + (((e >>> a[58]) * a[349] & a[486]) << a[58]) & a[405];
                    e ^= e >>> a[58];
                    h = e >>> a[15];
                    d = [];
                    d.push(h);
                    try {
                        for (var r, B = h + b[0], p = a[15], E = a[15], z = a[15]; z < B.length; z++) try {
                            var q = parseInt(B.charAt(z) + b[0]),
                                p = q || q === a[15] ? p + q : p + a[541];
                            E++
                        } catch (n) {
                            p += a[541],
                                E++
                        }
                        E = E == a[15] ? a[541] : E;
                        r = ba(p * a[541] / E, N);
                        for (var x, C = Math.floor(r / Math.pow(a[43], N - a[541])), G = h + b[0], w = a[15], D = a[15], H = a[15], u = a[15], F = a[15]; F < G.length; F++) try {
                            var v = parseInt(G.charAt(F) + b[0]);
                            v || v === a[15] ? v < C ? (D++, w += v) : (u++, H += v) : (u++, H += C)
                        } catch (A) {
                            u++,
                            H += C
                        }
                        u = u == a[15] ? a[541] : u;
                        D = D == a[15] ? a[541] : D;
                        x = ba(H * a[541] / u - w * a[541] / D, T);
                        d.push(ca(r, N, b[41]));
                        d.push(ca(x, T, b[41]))
                    } catch (y) {
                        d = [],
                            d.push(h),
                            d.push(U(N, b[35]).join(b[0])),
                            d.push(U(T, b[35]).join(b[0]))
                    }
                    return d.join(b[0])
                }

                function ba(h, c) {
                    if (h < a[15] || h >= a[43]) throw Error(b[30]);
                    for (var d = U(c, b[41]), e = b[0] + h, f = a[15], g = a[15]; f < d.length && g < e.length; g++) e.charAt(g) != b[38] && (d[f++] = e.charAt(g));
                    return parseInt(d.join(b[0]))
                }

                function ca(a, c, d) {
                    a = b[0] + a;
                    if (a.length > c) throw Error(b[87]);
                    if (a.length == c) return a;
                    for (var e = [], f = a.length; f < c; f++) e.push(d);
                    e.push(a);
                    return e.join(b[0])
                }

                function U(b, c) {
                    if (b <= a[15]) return [a[15]];
                    for (var d = [], e = a[15]; e < b; e++) d.push(c);
                    return d
                }

                function r(a) {
                    return null == a || void 0 == a
                }

                function m(a, b, c) {
                    this.f = a;
                    this.c = b;
                    this.g = r(c) ? !0 : c
                }

                function Ra(a) {
                    if (r(a) || r(a.f) || r(a.c)) return !1;
                    try {
                        if (r(window[a.f])) return !1
                    } catch (b) {
                        return !1
                    }
                    return !0
                }

                function v(c, d) {
                    if (r(c)) return b[0];
                    for (var e = a[15]; e < c.length; e++) {
                        var f = c[e];
                        if (!r(f) && f.f == d) return f
                    }
                }

                function da() {
                    var h;
                    a: {
                        if (!r(q))
                            for (h = a[15]; h < q.length; h++) {
                                var d = q[h];
                                if (d.g && !Ra(d)) {
                                    h = d;
                                    break a
                                }
                            }
                        h = null
                    }
                    var e;
                    if (r(h)) {
                        try {
                            e = window.parseFloat(b[180]) === a[384] && window.isNaN(window.parseFloat(b[163]))
                        } catch (f) {
                            e = !1
                        }
                        if (e) {
                            var g;
                            try {
                                g = window.parseInt(b[323]) === a[273] && window.isNaN(window.parseInt(b[163]))
                            } catch (k) {
                                g = !1
                            }
                            if (g) {
                                var m;
                                try {
                                    m = window.decodeURI(b[208]) === b[24]
                                } catch (C) {
                                    m = !1
                                }
                                if (m) {
                                    var x;
                                    try {
                                        x = window.decodeURIComponent(b[209]) === b[28]
                                    } catch (F) {
                                        x = !1
                                    }
                                    if (x) {
                                        var p;
                                        try {
                                            p = window.encodeURI(b[24]) === b[208]
                                        } catch (E) {
                                            p = !1
                                        }
                                        if (p) {
                                            var z;
                                            try {
                                                z = window.encodeURIComponent(b[28]) === b[209]
                                            } catch (I) {
                                                z = !1
                                            }
                                            if (z) {
                                                var n;
                                                try {
                                                    n = window.escape(b[28]) === b[209]
                                                } catch (A) {
                                                    n = !1
                                                }
                                                if (n) {
                                                    var y;
                                                    try {
                                                        y = window.unescape(b[209]) === b[28]
                                                    } catch (G) {
                                                        y = !1
                                                    }
                                                    if (y) {
                                                        var w;
                                                        try {
                                                            w = window.eval(b[304]) === a[273]
                                                        } catch (D) {
                                                            w = !1
                                                        }
                                                        e = w ? null : v(q, b[171])
                                                    } else e = v(q, c[172])
                                                } else e = v(q, b[342])
                                            } else e = v(q, c[30])
                                        } else e = v(q, c[16])
                                    } else e = v(q, B[2])
                                } else e = v(q, b[320])
                            } else e = v(q, c[58])
                        } else e = v(q, c[89])
                    } else e = h;
                    return e
                }

                function Sa() {
                    var a = da();
                    if (!r(a)) return a.c;
                    try {
                        a = r(window[b[168]]) || r(window[b[168]][b[334]]) ? null : v(q, b[311])
                    } catch (c) {
                        a = null
                    }
                    if (!r(a)) return a.c;
                    try {
                        a = r(context) || r(context[b[185]]) ? null : v(q, b[265])
                    } catch (d) {
                        a = null
                    }
                    return r(a) ? null : a.c
                }

                function Ba(c) {
                    for (var d = [], e = a[15]; e < c; e++) {
                        var f = Math.random() * Ta,
                            f = Math.floor(f);
                        d.push(ea.charAt(f))
                    }
                    return d.join(b[0])
                }

                function P(h) {
                    for (var d = (C[b[207]] || b[0]).split(c[91]), e = a[15]; e < d.length; e++) {
                        var f = d[e].indexOf(b[57]);
                        if (f >= a[15]) {
                            var g = d[e].substring(f + a[541], d[e].length);
                            if (d[e].substring(a[15], f) == h) return window.decodeURIComponent(g)
                        }
                    }
                    return null
                }

                function Ca(h) {
                    var d = [
                            b[135],
                            b[182],
                            b[133],
                            b[108],
                            b[159],
                            b[165],
                            c[18]
                        ],
                        e = b[0];
                    if (null == h || void 0 == h) return h;
                    if (typeof h == [b[291],
                        b[220],
                        b[121]
                    ].join(b[0])) {
                        for (var e = e + b[142], f = a[15]; f < d.length; f++)
                            if (h.hasOwnProperty(d[f])) {
                                var g = b[29] + d[f] + b[262],
                                    k;
                                k = b[0] + h[d[f]];
                                k = null == k || void 0 == k ? k : k.replace(/'/g, c[96]).replace(/"/g, b[24]);
                                e += g + k + b[191]
                            }
                        e.charAt(e.length - a[541]) == b[34] && (e = e.substring(a[15], e.length - a[541]));
                        return e += b[143]
                    }
                    return null
                }

                function oa(a, d, e, f) {
                    var g = [];
                    g.push(a + b[57] + encodeURIComponent(d));
                    e && (a = new Date, a = new Date(f), f = a[b[215]](), g.push(c[91]), g.push(b[172]), g.push(b[305]), g.push(b[325]), g.push(b[319]), g.push(f));
                    g.push(c[91]);
                    g.push(b[302]);
                    g.push(b[216]);
                    null != A && void 0 != A && A != b[0] && (g.push(c[91]), g.push(b[152]), g.push(b[234]), g.push(b[260]), g.push(A));
                    C[b[207]] = g.join(b[0])
                }

                function Da(a) {
                    window[pa] = a
                }

                function Ea(a) {
                    window[qa] = a
                }

                function Fa(c, d) {
                    for (var e = [], f = a[15]; f < d; f++) e.push(c);
                    return e.join(b[0])
                }

                function Ga(a, c) {
                    var d = P(a);
                    null !== d && void 0 !== d && d !== b[0] || oa(a, c, !1)
                }

                function ra() {
                    var a = P(V);
                    if (null == a || void 0 == a || a == b[0]) a = window[qa];
                    return a
                }

                function Ua() {
                    var a = ra();
                    if (null == a || void 0 == a || a == b[0]) return !1;
                    try {
                        return (a = parseInt(a)) && a >= fa ? !0 : !1
                    } catch (c) {
                        return !1
                    }
                }

                function ga(c) {
                    if (null == c || void 0 == c || c == b[0]) return null;
                    c = c.split(b[54]);
                    return c.length < a[16] || !/[0-9]+/gi.test(c[1]) ? null : parseInt(c[1])
                }

                function Q() {
                    var a = P(S);
                    if (null == a || void 0 == a || a == b[0]) a = window[pa];
                    return a
                }

                function Va() {
                    var c = Q();
                    if (null == c || void 0 == c || c == b[0]) return a[15];
                    c = ga(c);
                    return null == c ? a[15] : c - (sa - ta) - (new window[B[0]])[b[179]]()
                }

                function Ha(d, e) {
                    var f = new window[B[0]];
                    f[b[21]](f[b[179]]() - a[326]);
                    window[b[330]][b[207]] = null == e || void 0 == e || e == b[0] ? d + b[147] + f[b[215]]() : d + c[12] + e + c[131] + f[b[215]]()
                }

                function Ia() {
                    if (!(null == K || void 0 == K || K.length <= a[15]))
                        for (var c = a[15]; c < K.length; c++) {
                            var d = K[c];
                            (null != A && void 0 != A && A != b[0] || null != d && void 0 != d && d != b[0]) && A != d && (Ha(S, d), Ha(V, d))
                        }
                }

                function ua() {
                    Ia();
                    window[qa] = null;
                    window[pa] = null;
                    var h = !0,
                        t = {
                            v: b[227]
                        },
                        l = Sa();
                    l && (t[c[18]] = l);
                    l = null;
                    t[b[108]] = Wa;
                    var m = (new window[B[0]])[b[179]]() + sa,
                        r = m + a[308] * a[148] * a[148] * a[74] * a[303] * a[26];
                    t[b[133]] = Ba(a[19]) + m + Ba(a[19]);
                    try {
                        var q = (new Pa({
                            b: Xa,
                            a: Ya
                        })).get();
                        null != q && void 0 != q && q.length > a[15] ? t[b[182]] = q.join(b[34]) : (t[b[182]] = Fa(b[41], a[43]), t[b[159]] = b[42], h = !1)
                    } catch (C) {
                        t[b[182]] = Fa(b[41], a[43]),
                            t[b[159]] = b[42],
                            h = !1
                    }
                    try {
                        var v = l = Ca(t),
                            t = Za;
                        if (null == t || void 0 == t) throw Error(b[120]);
                        if (null == v || void 0 == v) v = b[0];
                        var q = v,
                            y;
                        y = null == v ? e([]) : e(ma(v));
                        var A = ma(q + y),
                            p = ma(t);
                        null == A && (A = []);
                        y = [];
                        for (var E = a[15]; E < va; E++) {
                            var z = Math.random() * a[301],
                                z = Math.floor(z);
                            y[E] = x(z)
                        }
                        var p = g(p),
                            p = na(p, g(y)),
                            E = p = g(p),
                            I;
                        if (null == A || void 0 == A || A.length == a[15]) I = za(F);
                        else {
                            var n = A.length,
                                J = a[15],
                                J = n % F <= F - ha ? F - n % F - ha : F * a[16] - n % F - ha,
                                z = [];
                            Z(A, a[15], z, a[15], n);
                            for (var K = a[15]; K < J; K++) z[n + K] = a[15];
                            Z(Aa(n), a[15], z, n + J, ha);
                            I = z
                        }
                        n = I;
                        if (null == n || n.length % F != a[15]) throw Error(b[130]);
                        I = [];
                        for (var G = a[15], w = n.length / F, D = a[15]; D < w; D++) {
                            I[D] = [];
                            for (var H = a[15]; H < F; H++) I[D][H] = n[G++]
                        }
                        G = [];
                        Z(y, a[15], G, a[15], va);
                        for (var u = I.length, L = a[15]; L < u; L++) {
                            var O,
                                M;
                            var N = I[L];
                            if (null == N) M = null;
                            else {
                                for (var T = x(a[104]), w = [], U = N.length, P = a[15]; P < U; P++) w.push(Oa(N[P], T++));
                                M = w
                            }
                            var Q;
                            w = M;
                            if (null == w) Q = null;
                            else {
                                for (var aa = x(a[143]), D = [], ba = w.length, wa = a[15]; wa < ba; wa++) D.push(Y(w[wa], aa--));
                                Q = D
                            }
                            var ca = d(Q, a[127]);
                            O = d(ca, a[36]);
                            var xa = na(O, p),
                                ia;
                            w = xa;
                            D = E;
                            if (null == w) ia = null;
                            else if (null == D) ia = w;
                            else {
                                for (var H = [], da = D.length, W = a[15], ea = w.length; W < ea; W++) H[W] = x(w[W] + D[W % da]);
                                ia = H
                            }
                            var xa = na(ia, E),
                                ja = f(xa),
                                ja = f(ja);
                            Z(ja, a[15], G, L * F + va, F);
                            E = ja
                        }
                        var ka;
                        if (null == G || void 0 == G) ka = null;
                        else if (G.length == a[15]) ka = b[0];
                        else {
                            var ya = a[19];
                            try {
                                for (var u = [], R = a[15]; R < G.length;)
                                    if (R + ya <= G.length) u.push(k(G, R, ya)),
                                        R += ya;
                                    else {
                                        u.push(k(G, R, G.length - R));
                                        break
                                    }
                                ka = u.join(b[0])
                            } catch (ra) {
                                throw Error(b[111])
                            }
                        }
                        l = ka
                    } catch (ga) {
                        l = Ca({
                                ec: b[43],
                                em: ga.message
                            }),
                            h = !1
                    }
                    l = l + b[54] + m;
                    oa(S, l, h, r);
                    Ga(S, l);
                    Da(l);
                    oa(V, fa, h, r);
                    Ga(V, fa);
                    Ea(fa);
                    window[b[124]] && window[b[124]](ua, ta)
                }
                m.prototype = {
                    toString: function () {
                        return c[93] + this.f + b[164] + this.c + c[117] + this.g + b[143]
                    }
                };
                var q = [
                        new m(c[67], b[13]),
                        new m(b[330], b[14]),
                        new m(c[6], b[11]),
                        new m(c[65], b[12]),
                        new m(c[140], b[10]),
                        new m(b[257], b[9]),
                        new m(b[2], b[19]),
                        new m(b[235], b[22]),
                        new m(c[119], b[6]),
                        new m(c[89], c[164]),
                        new m(c[58], c[162]),
                        new m(b[320], c[163]),
                        new m(B[2], c[159]),
                        new m(c[16], c[161]),
                        new m(c[30], c[156]),
                        new m(b[342], c[158]),
                        new m(c[172], c[165]),
                        new m(b[171], c[168]),
                        new m(b[253], c[128], !1),
                        new m(b[294], c[129], !1),
                        new m(b[168], c[126], !1),
                        new m(b[311], c[127], !1),
                        new m(b[265], c[144], !1)
                    ],
                    Qa = da() ? !1 : !0,
                    Wa = window && window[c[65]] && window[c[65]].host || b[353],
                    C = window[b[330]],
                    y = window[c[6]],
                    N = a[16],
                    T = a[16],
                    aa = [
                        b[41],
                        b[42],
                        b[43],
                        b[44],
                        b[45],
                        b[47],
                        b[48],
                        b[50],
                        b[52],
                        b[53],
                        b[97],
                        b[99],
                        b[101],
                        b[103],
                        b[105],
                        b[106]
                    ],
                    La = [
                        a[15],
                        a[377],
                        a[383],
                        a[522],
                        a[449],
                        a[316],
                        a[495],
                        a[343],
                        a[462],
                        a[542],
                        a[310],
                        a[461],
                        a[496],
                        a[464],
                        a[415],
                        a[40],
                        a[455],
                        a[363],
                        a[533],
                        a[402],
                        a[438],
                        a[293],
                        a[366],
                        a[511],
                        a[491],
                        a[493],
                        a[476],
                        a[333],
                        a[539],
                        a[412],
                        a[297],
                        a[427],
                        a[474],
                        a[29],
                        a[369],
                        a[503],
                        a[325],
                        a[353],
                        a[546],
                        a[390],
                        a[420],
                        a[440],
                        a[174],
                        a[442],
                        a[306],
                        a[501],
                        a[469],
                        a[336],
                        a[508],
                        a[331],
                        a[482],
                        a[355],
                        a[358],
                        a[400],
                        a[379],
                        a[528],
                        a[525],
                        a[459],
                        a[423],
                        a[34],
                        a[408],
                        a[520],
                        a[319],
                        a[446],
                        a[471],
                        a[437],
                        a[47],
                        a[417],
                        a[548],
                        a[506],
                        a[463],
                        a[312],
                        a[320],
                        a[256],
                        a[345],
                        a[498],
                        a[380],
                        a[395],
                        a[523],
                        a[385],
                        a[416],
                        a[537],
                        a[429],
                        a[298],
                        a[497],
                        a[487],
                        a[335],
                        a[478],
                        a[300],
                        a[433],
                        a[513],
                        a[367],
                        a[368],
                        a[451],
                        a[404],
                        a[534],
                        a[504],
                        a[295],
                        a[337],
                        a[470],
                        a[443],
                        a[413],
                        a[445],
                        a[190],
                        a[354],
                        a[317],
                        a[391],
                        a[547],
                        a[33],
                        a[466],
                        a[505],
                        a[370],
                        a[521],
                        a[398],
                        a[447],
                        a[321],
                        a[460],
                        a[517],
                        a[37],
                        a[424],
                        a[403],
                        a[350],
                        a[529],
                        a[381],
                        a[334],
                        a[499],
                        a[356],
                        a[483],
                        a[481],
                        a[332],
                        a[452],
                        a[490],
                        a[296],
                        a[431],
                        a[341],
                        a[419],
                        a[536],
                        a[401],
                        a[516],
                        a[362],
                        a[365],
                        a[515],
                        a[479],
                        a[304],
                        a[314],
                        a[458],
                        a[139],
                        a[540],
                        a[414],
                        a[53],
                        a[309],
                        a[473],
                        a[387],
                        a[519],
                        a[388],
                        a[374],
                        a[494],
                        a[348],
                        a[340],
                        a[324],
                        a[426],
                        a[28],
                        a[527],
                        a[456],
                        a[318],
                        a[450],
                        a[389],
                        a[526],
                        a[485],
                        a[352],
                        a[510],
                        a[329],
                        a[378],
                        a[532],
                        a[342],
                        a[409],
                        a[283],
                        a[441],
                        a[421],
                        a[436],
                        a[467],
                        a[339],
                        a[130],
                        a[509],
                        a[372],
                        a[502],
                        a[475],
                        a[22],
                        a[545],
                        a[397],
                        a[307],
                        a[360],
                        a[514],
                        a[364],
                        a[302],
                        a[347],
                        a[399],
                        a[535],
                        a[361],
                        a[328],
                        a[430],
                        a[294],
                        a[418],
                        a[382],
                        a[330],
                        a[480],
                        a[489],
                        a[32],
                        a[346],
                        a[492],
                        a[322],
                        a[359],
                        a[518],
                        a[386],
                        a[373],
                        a[410],
                        a[51],
                        a[411],
                        a[472],
                        a[323],
                        a[457],
                        a[313],
                        a[538],
                        a[305],
                        a[531],
                        a[376],
                        a[406],
                        a[344],
                        a[351],
                        a[484],
                        a[327],
                        a[512],
                        a[448],
                        a[315],
                        a[524],
                        a[392],
                        a[24],
                        a[425],
                        a[454],
                        a[530],
                        a[393],
                        a[544],
                        a[357],
                        a[311],
                        a[500],
                        a[371],
                        a[17],
                        a[477],
                        a[338],
                        a[465],
                        a[507],
                        a[157],
                        a[439],
                        a[232],
                        a[434],
                        a[422]
                    ],
                    Ka = [
                        a[76],
                        a[182],
                        a[199],
                        a[231],
                        a[165],
                        a[156],
                        a[75],
                        a[207],
                        a[166],
                        a[19],
                        a[158],
                        a[223],
                        a[191],
                        a[102],
                        a[35],
                        a[94],
                        a[126],
                        a[127],
                        a[248],
                        a[192],
                        a[56],
                        a[66],
                        a[284],
                        a[274],
                        a[82],
                        a[110],
                        a[257],
                        a[258],
                        a[175],
                        a[275],
                        a[86],
                        a[215],
                        a[224],
                        a[95],
                        a[167],
                        a[168],
                        a[193],
                        a[233],
                        a[64],
                        a[285],
                        a[159],
                        a[70],
                        a[153],
                        a[240],
                        a[208],
                        a[45],
                        a[173],
                        a[241],
                        a[140],
                        a[83],
                        a[65],
                        a[103],
                        a[152],
                        a[135],
                        a[194],
                        a[209],
                        a[144],
                        a[38],
                        a[276],
                        a[46],
                        a[114],
                        a[265],
                        a[68],
                        a[131],
                        a[106],
                        a[242],
                        a[243],
                        a[225],
                        a[136],
                        a[71],
                        a[132],
                        a[145],
                        a[128],
                        a[183],
                        a[60],
                        a[44],
                        a[286],
                        a[118],
                        a[266],
                        a[72],
                        a[90],
                        a[18],
                        a[267],
                        a[200],
                        a[73],
                        a[123],
                        a[169],
                        a[111],
                        a[137],
                        a[115],
                        a[244],
                        a[277],
                        a[98],
                        a[216],
                        a[74],
                        a[26],
                        a[124],
                        a[282],
                        a[27],
                        a[133],
                        a[259],
                        a[281],
                        a[31],
                        a[217],
                        a[249],
                        a[41],
                        a[96],
                        a[78],
                        a[23],
                        a[160],
                        a[176],
                        a[184],
                        a[250],
                        a[201],
                        a[119],
                        a[226],
                        a[62],
                        a[16],
                        a[251],
                        a[59],
                        a[48],
                        a[227],
                        a[148],
                        a[129],
                        a[116],
                        a[290],
                        a[170],
                        a[107],
                        a[99],
                        a[234],
                        a[87],
                        a[134],
                        a[245],
                        a[210],
                        a[84],
                        a[235],
                        a[195],
                        a[260],
                        a[91],
                        a[261],
                        a[92],
                        a[211],
                        a[100],
                        a[80],
                        a[262],
                        a[268],
                        a[112],
                        a[185],
                        a[218],
                        a[79],
                        a[122],
                        a[269],
                        a[104],
                        a[120],
                        a[177],
                        a[20],
                        a[263],
                        a[149],
                        a[61],
                        a[77],
                        a[154],
                        a[36],
                        a[150],
                        a[125],
                        a[89],
                        a[219],
                        a[101],
                        a[252],
                        a[113],
                        a[141],
                        a[121],
                        a[220],
                        a[273],
                        a[186],
                        a[253],
                        a[178],
                        a[202],
                        a[246],
                        a[108],
                        a[187],
                        a[81],
                        a[117],
                        a[49],
                        a[203],
                        a[30],
                        a[264],
                        a[270],
                        a[142],
                        a[271],
                        a[212],
                        a[138],
                        a[52],
                        a[221],
                        a[88],
                        a[109],
                        a[222],
                        a[143],
                        a[236],
                        a[54],
                        a[97],
                        a[272],
                        a[287],
                        a[541],
                        a[228],
                        a[247],
                        a[146],
                        a[63],
                        a[278],
                        a[67],
                        a[254],
                        a[161],
                        a[15],
                        a[543],
                        a[213],
                        a[204],
                        a[214],
                        a[188],
                        a[179],
                        a[196],
                        a[58],
                        a[229],
                        a[288],
                        a[237],
                        a[55],
                        a[279],
                        a[162],
                        a[50],
                        a[155],
                        a[289],
                        a[69],
                        a[197],
                        a[180],
                        a[280],
                        a[151],
                        a[93],
                        a[230],
                        a[181],
                        a[39],
                        a[85],
                        a[238],
                        a[105],
                        a[25],
                        a[255],
                        a[171],
                        a[189],
                        a[42],
                        a[198],
                        a[57],
                        a[163],
                        a[164],
                        a[205],
                        a[239],
                        a[172],
                        a[206],
                        a[147],
                        a[43]
                    ],
                    F = a[158],
                    L = a[158],
                    ha = a[23],
                    va = a[23],
                    d = function (b, c) {
                        if (null == b) return null;
                        for (var d = x(c), e = [], f = b.length, g = a[15]; g < f; g++) e.push(Y(b[g], d++));
                        return e
                    },
                    Za = b[345],
                    S = b[299],
                    V = c[100],
                    fa = a[91],
                    ea = b[275],
                    Ta = ea.length,
                    sa = a[444],
                    ta = a[396],
                    Ya = !1,
                    Xa = !1,
                    O = window && window[c[65]] && window[c[65]][b[310]] || c[95],
                    A = c[56],
                    A = function (d, e) {
                        if (null == d || void 0 == d || d == b[0] || null == e || void 0 == e || e.length <= a[15]) return null;
                        e = e.split(b[56]);
                        for (var f = a[15]; f < e.length; f++) {
                            var g = new RegExp(e[f].replace(/\./g, c[101]) + b[25]);
                            if (null != d.match(g) || null != (b[38] + d).match(g)) return e[f]
                        }
                        return null
                    }(O, A),
                    pa = S.replace(/[^a-zA-Z0-9$]/g, b[0]).toLowerCase(),
                    qa = V.replace(/[^a-zA-Z0-9$]/g, b[0]).toLowerCase(),
                    K = function (c) {
                        var d = [];
                        if (!c) return d;
                        c = c.split(b[38]);
                        for (var e = b[0], f = a[15]; f < c.length; f++) f < c.length - a[541] && (e = b[38] + c[c.length - a[541] - f] + e, d.push(e));
                        return d
                    }(O);
                K.push(null);
                K.push(b[38] + O);
                (function (d) {
                    for (var e = a[15], f = (C[b[207]] || b[0]).split(c[91]), g = a[15]; g < f.length; g++) {
                        var k = f[g].indexOf(b[57]);
                        k >= a[15] && f[g].substring(a[15], k) == d && (e += a[541])
                    }
                    return e
                })(S) > a[541] && Ia();
                (function () {
                    var a = Q();
                    if (null == a || void 0 == a || a == b[0]) a = !1;
                    else {
                        var c;
                        if (c = Ua()) a = ga(a),
                            c = !(null == a || a - (new window[B[0]])[b[179]]() <= sa - ta);
                        a = c
                    }
                    return a
                })() ? (Da(Q()), Ea(ra()), O = Va(), window[b[124]] && window[b[124]](ua, O)) : ua()
            })()
        })()
    })()
})();
(function () {})();
(function () {
    var bzg2x;
    var vE4I = 'VISITOR_CLIENT_NO_COOKIE_SUPPORT';
    var cAC5H = 0;
    var bzp2x = 0;
    var bzt2x = 1;
    var bzu2x = 0;
    var bfO5T = '';
    var bzw2x = '';
    var bzz2x = '';
    var WL2x = '';
    var WK2x = '';
    var bfv5A = '';
    var bzH2x = 0;
    var bzJ2x = '';
    var Mh9Y = '';
    var Ho8g = 0;
    var bfs5x = ntes_get_domain();
    var bfj5o = null;
    var cEp6j = '//analytics.163.com';
    var cAv5A = function () {};

    function is_spider() {
        return /baiduspider/gi.test(window.navigator.userAgent)
    }

    function ntes_get_domain() {
        var f = document.domain;
        var d = f.split('.');
        var c = d.length;
        var e = /^\d+$/g;
        if (e.test(d[c - 1])) {
            return f
        }
        if (d.length < 3) {
            return '.' + f
        }
        var g = [
            'com',
            'net',
            'org',
            'gov',
            'co'
        ];
        var b,
            a = false;
        for (b = 0; b < g.length; b++) {
            if (d[c - 2] == g[b]) {
                a = true
            }
        }
        if (!a) {
            return '.' + d[c - 2] + '.' + d[c - 1]
        } else {
            return '.' + d[c - 3] + '.' + d[c - 2] + '.' + d[c - 1]
        }
    }

    function ntes_set_cookie_long(a, c) {
        var b = new Date;
        b.setTime(b.getTime() + 1000 * 60 * 60 * 24 * 365 * 100);
        document.cookie = a + '=' + c + '; expires=' + b.toGMTString() + '; path=/; domain=' + bfs5x
    }

    function ntes_set_cookie(a, c) {
        var b = new Date;
        b.setTime(b.getTime() + 0);
        document.cookie = a + '=' + c + '; path=/; domain=' + bfs5x
    }

    function ntes_set_cookie_new(b, d, a) {
        if (!a || a == '') {
            a = 1000 * 60 * 60 * 24 * 365 * 1
        }
        var c = new Date;
        c.setTime(c.getTime() + a);
        document.cookie = b + '=' + d + '; expires=' + c.toGMTString() + '; path=/; domain=' + bfs5x
    }

    function ntes_get_cookie(c) {
        var a = document.cookie;
        var d = c + '=';
        var g = a.length;
        var b = 0;
        while (b < g) {
            var e = b + d.length;
            if (a.substring(b, e) == d) {
                var f = a.indexOf(';', e);
                if (f == -1) {
                    f = g
                }
                return unescape(a.substring(e, f))
            }
            b = a.indexOf(' ', b) + 1;
            if (b == 0) {
                break
            }
        }
        return -1
    }

    function ntes_get_flashver() {
        var f = '',
            n = navigator;
        if (n.plugins && n.plugins.length) {
            for (var ii = 0; ii < n.plugins.length; ii++) {
                if (n.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
                    f = n.plugins[ii].description.split('Shockwave Flash')[1];
                    break
                }
            }
        } else {
            if (window.ActiveXObject) {
                for (var ii = 10; ii >= 2; ii--) {
                    try {
                        var fl = eval('new ActiveXObject(\'ShockwaveFlash.ShockwaveFlash.' + ii + '\');');
                        if (fl) {
                            f = ii + '.0';
                            break
                        }
                    } catch (e) {}
                }
            }
        }
        return f
    }
    var cAu5z = 0;
    var TR1x = 8;

    function ntes_hex_md5(a) {
        return binl2hex(ntes_core_md5(str2binl(a), a.length * TR1x))
    }

    function ntes_core_md5(p, k) {
        p[k >> 5] |= 128 << k % 32;
        p[(k + 64 >>> 9 << 4) + 14] = k;
        var o = 1732584193;
        var n = -271733879;
        var m = -1732584194;
        var l = 271733878;
        for (var g = 0; g < p.length; g += 16) {
            var j = o;
            var h = n;
            var f = m;
            var e = l;
            o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936);
            l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586);
            m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819);
            n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330);
            o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897);
            l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426);
            m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341);
            n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983);
            o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416);
            l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417);
            m = md5_ff(m, l, o, n, p[g + 10], 17, -42063);
            n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162);
            o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682);
            l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101);
            m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290);
            n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329);
            o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510);
            l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632);
            m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713);
            n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302);
            o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691);
            l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083);
            m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335);
            n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848);
            o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438);
            l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690);
            m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961);
            n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501);
            o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467);
            l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784);
            m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473);
            n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734);
            o = md5_hh(o, n, m, l, p[g + 5], 4, -378558);
            l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463);
            m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562);
            n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556);
            o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060);
            l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353);
            m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632);
            n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640);
            o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174);
            l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222);
            m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979);
            n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189);
            o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487);
            l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835);
            m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520);
            n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651);
            o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844);
            l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415);
            m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905);
            n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055);
            o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571);
            l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606);
            m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523);
            n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799);
            o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359);
            l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744);
            m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380);
            n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649);
            o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070);
            l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379);
            m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259);
            n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551);
            o = safe_add(o, j);
            n = safe_add(n, h);
            m = safe_add(m, f);
            l = safe_add(l, e)
        }
        return Array(o, n, m, l)
    }

    function md5_cmn(h, e, d, c, g, f) {
        return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d)
    }

    function md5_ff(g, f, k, j, e, i, h) {
        return md5_cmn(f & k | ~f & j, g, f, e, i, h)
    }

    function md5_gg(g, f, k, j, e, i, h) {
        return md5_cmn(f & j | k & ~j, g, f, e, i, h)
    }

    function md5_hh(g, f, k, j, e, i, h) {
        return md5_cmn(f ^ k ^ j, g, f, e, i, h)
    }

    function md5_ii(g, f, k, j, e, i, h) {
        return md5_cmn(k ^ (f | ~j), g, f, e, i, h)
    }

    function safe_add(a, d) {
        var c = (a & 65535) + (d & 65535);
        var b = (a >> 16) + (d >> 16) + (c >> 16);
        return b << 16 | c & 65535
    }

    function bit_rol(a, b) {
        return a << b | a >>> 32 - b
    }

    function str2binl(d) {
        var c = new Array;
        var a = (1 << TR1x) - 1;
        for (var b = 0; b < d.length * TR1x; b += TR1x) {
            c[b >> 5] |= (d.charCodeAt(b / TR1x) & a) << b % 32
        }
        return c
    }

    function binl2hex(c) {
        var b = cAu5z ? '0123456789ABCDEF' : '0123456789abcdef';
        var d = '';
        for (var a = 0; a < c.length * 4; a++) {
            d += b.charAt(c[a >> 2] >> a % 4 * 8 + 4 & 15) + b.charAt(c[a >> 2] >> a % 4 * 8 & 15)
        }
        return d
    }

    function str_to_ent(e) {
        var a = '';
        var d;
        for (d = 0; d < e.length; d++) {
            var f = e.charCodeAt(d);
            var b = '';
            if (f > 255) {
                while (f >= 1) {
                    b = '0123456789'.charAt(f % 10) + b;
                    f = f / 10
                }
                if (b == '') {
                    b = '0'
                }
                b = '#' + b;
                b = '&' + b;
                b = b + ';';
                a += b
            } else {
                a += e.charAt(d)
            }
        }
        return a
    }

    function ntes_get_navigation_info() {
        WL2x = '-';
        bfv5A = '-';
        WK2x = '-';
        var c = window.self,
            b = window.screen,
            a = window.navigator;
        if (c.screen) {
            WL2x = b.width + 'x' + b.height;
            bfv5A = b.colorDepth + '-bit'
        } else {
            if (c.java) {
                var e = java.awt.Toolkit.getDefaultToolkit();
                var f = e.getScreenSize();
                WL2x = f.width + 'x' + f.height
            }
        }
        if (a.language) {
            WK2x = a.language.toLowerCase()
        } else {
            if (a.browserLanguage) {
                WK2x = a.browserLanguage.toLowerCase()
            }
        }
        var g = new Date(document.lastModified);
        bzH2x = g.getTime() / 1000
    }

    function fetch_visitor_hash() {
        var c = new Date;
        var b = document.body.clientWidth + ':' + document.body.clientHeight;
        var a = str_to_ent(c.getTime() + Math.random() + document.location + document.referrer + screen.width + screen.height + navigator.userAgent + document.cookie + b);
        return ntes_hex_md5(a)
    }

    function cEs6m(c, b, f) {
        var e = c + '_' + +(new Date) + parseInt(Math.random() * 100),
            a,
            d = f || cAv5A;
        a = window[e] = new Image;
        a.onload = function () {
            window[e] = null;
            d()
        };
        a.onerror = function () {
            window[e] = null;
            d()
        };
        a.src = b;
        a = null
    }

    function neteaseTracker(l, a, m, k) {
        if (is_spider()) {
            return
        }
        var e = k || bzg2x;
        bfO5T = escape(a || document.location);
        bzw2x = escape(m || document.title);
        bzz2x = l === true ? '' : escape(l || document.referrer);
        bzJ2x = ntes_get_flashver();
        var b = (new Date).getTime();
        if (bfj5o == null) {
            document.cookie = '__ntes__test__cookies=' + b;
            bfj5o = ntes_get_cookie('__ntes__test__cookies') == b ? true : false;
            document.cookie = '__ntes__test__cookies=' + b + '; expires=' + (new Date('1970/01/01')).toUTCString()
        }
        if (e == 'undefined' || !e) {
            return
        }
        if (bfO5T.indexOf('http') != 0) {
            return
        }
        var h = ntes_get_cookie('_ntes_nnid');
        if (h == -1) {
            if (bfj5o) {
                vE4I = fetch_visitor_hash();
                bzp2x = 1;
                ntes_set_cookie_long('_ntes_nnid', vE4I + ',' + (new Date).getTime());
                ntes_set_cookie_long('_ntes_nuid', vE4I)
            }
        } else {
            var o = h.indexOf(',');
            var p = h.indexOf('|');
            var f = false;
            if (p == -1) {
                p = h.length
            }
            vE4I = h.substr(0, o);
            Ho8g = h.substr(o + 1, p - o - 1);
            if (Ho8g == 0) {
                Ho8g = (new Date).getTime();
                f = true
            }
            if (!vE4I) {
                vE4I = fetch_visitor_hash();
                f = true
            }
            if (f) {
                ntes_set_cookie_long('_ntes_nnid', vE4I + ',' + Ho8g);
                ntes_set_cookie_long('_ntes_nuid', vE4I)
            }
            if (Ho8g != 0 && b - Ho8g > 365 * 86400 * 1000) {
                Ho8g = 0;
                ntes_set_cookie_long('_ntes_nnid', vE4I + ',' + (new Date).getTime());
                ntes_set_cookie_long('_ntes_nuid', vE4I)
            }
        }

        function c(q, i) {
            var s = ntes_get_cookie(q),
                r = ntes_get_cookie(i);
            return s == -1 ? r == -1 ? '' : r : s
        }
        Mh9Y = c('P_INFO', 'P_OINFO');
        Mh9Y = Mh9Y ? Mh9Y.substr(0, Mh9Y.indexOf('|')) : '';
        bzu2x = c('S_INFO', 'S_OINFO') ? 1 : 0;
        ntes_get_navigation_info();
        var n = [
            '_nacc=',
            e,
            '&_nvid=',
            vE4I,
            '&_nvtm=',
            cAC5H,
            '&_nvsf=',
            bzt2x,
            '&_nvfi=',
            bzp2x,
            '&_nlag=',
            WK2x,
            '&_nlmf=',
            bzH2x,
            '&_nres=',
            WL2x,
            '&_nscd=',
            bfv5A,
            '&_nstm=',
            bzu2x,
            '&_nurl=',
            bfO5T,
            '&_ntit=',
            bzw2x,
            '&_nref=',
            bzz2x,
            '&_nfla=',
            bzJ2x,
            '&_nssn=',
            Mh9Y,
            '&_nxkey=', (b + '' + Math.random()).substring(6, 20),
            '&_end1'
        ].join('');
        bzt2x = 0;
        neteaseTracker.callback = null
    }
    bzg2x = 'iad';
    neteaseTracker()
})();
(function () {})();
var CryptoJS = CryptoJS || function (u, p) {
    var d = {},
        l = d.lib = {},
        s = function () {},
        t = l.Base = {
            extend: function (a) {
                    s.prototype = this;
                    var c = new s;
                    a && c.mixIn(a);
                    c.hasOwnProperty('init') || (c.init = function () {
                        c.$super.init.apply(this, arguments)
                    });
                    c.init.prototype = c;
                    c.$super = this;
                    return c
                },
                create: function () {
                    var a = this.extend();
                    a.init.apply(a, arguments);
                    return a
                },
                init: function () {},
                mixIn: function (a) {
                    for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                    a.hasOwnProperty('toString') && (this.toString = a.toString)
                },
                clone: function () {
                    return this.init.prototype.extend(this)
                }
        },
        r = l.WordArray = t.extend({
            init: function (a, c) {
                    a = this.words = a || [];
                    this.sigBytes = c != p ? c : 4 * a.length
                },
                toString: function (a) {
                    return (a || v).stringify(this)
                },
                concat: function (a) {
                    var c = this.words,
                        e = a.words,
                        j = this.sigBytes;
                    a = a.sigBytes;
                    this.clamp();
                    if (j % 4)
                        for (var k = 0; k < a; k++) c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4);
                    else if (65535 < e.length)
                        for (k = 0; k < a; k += 4) c[j + k >>> 2] = e[k >>> 2];
                    else c.push.apply(c, e);
                    this.sigBytes += a;
                    return this
                },
                clamp: function () {
                    var a = this.words,
                        c = this.sigBytes;
                    a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4);
                    a.length = u.ceil(c / 4)
                },
                clone: function () {
                    var a = t.clone.call(this);
                    a.words = this.words.slice(0);
                    return a
                },
                random: function (a) {
                    for (var c = [], e = 0; e < a; e += 4) c.push(4294967296 * u.random() | 0);
                    return new r.init(c, a)
                }
        }),
        w = d.enc = {},
        v = w.Hex = {
            stringify: function (a) {
                    var c = a.words;
                    a = a.sigBytes;
                    for (var e = [], j = 0; j < a; j++) {
                        var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255;
                        e.push((k >>> 4).toString(16));
                        e.push((k & 15).toString(16))
                    }
                    return e.join('')
                },
                parse: function (a) {
                    for (var c = a.length, e = [], j = 0; j < c; j += 2) e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << 24 - 4 * (j % 8);
                    return new r.init(e, c / 2)
                }
        },
        b = w.Latin1 = {
            stringify: function (a) {
                    var c = a.words;
                    a = a.sigBytes;
                    for (var e = [], j = 0; j < a; j++) e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
                    return e.join('')
                },
                parse: function (a) {
                    for (var c = a.length, e = [], j = 0; j < c; j++) e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
                    return new r.init(e, c)
                }
        },
        x = w.Utf8 = {
            stringify: function (a) {
                    try {
                        return decodeURIComponent(escape(b.stringify(a)))
                    } catch (c) {
                        throw Error('Malformed UTF-8 data')
                    }
                },
                parse: function (a) {
                    return b.parse(unescape(encodeURIComponent(a)))
                }
        },
        q = l.BufferedBlockAlgorithm = t.extend({
            reset: function () {
                    this.j7c = new r.init;
                    this.bAH2x = 0
                },
                WG2x: function (a) {
                    'string' == typeof a && (a = x.parse(a));
                    this.j7c.concat(a);
                    this.bAH2x += a.sigBytes
                },
                Dl7e: function (a) {
                    var c = this.j7c,
                        e = c.words,
                        j = c.sigBytes,
                        k = this.blockSize,
                        b = j / (4 * k),
                        b = a ? u.ceil(b) : u.max((b | 0) - this.bAC2x, 0);
                    a = b * k;
                    j = u.min(4 * a, j);
                    if (a) {
                        for (var q = 0; q < a; q += k) this.bAK2x(e, q);
                        q = e.splice(0, a);
                        c.sigBytes -= j
                    }
                    return new r.init(q, j)
                },
                clone: function () {
                    var a = t.clone.call(this);
                    a.j7c = this.j7c.clone();
                    return a
                },
                bAC2x: 0
        });
    l.Hasher = q.extend({
        cfg: t.extend(),
        init: function (a) {
                this.cfg = this.cfg.extend(a);
                this.reset()
            },
            reset: function () {
                q.reset.call(this);
                this.bwV1x()
            },
            update: function (a) {
                this.WG2x(a);
                this.Dl7e();
                return this
            },
            finalize: function (a) {
                a && this.WG2x(a);
                return this.WD2x()
            },
            blockSize: 16,
        bxk1x: function (a) {
                return function (b, e) {
                    return (new a.init(e)).finalize(b)
                }
            },
            cAn5s: function (a) {
                return function (b, e) {
                    return (new n.HMAC.init(a, e)).finalize(b)
                }
            }
    });
    var n = d.algo = {};
    return d
}(Math);
(function () {
    var u = CryptoJS,
        p = u.lib.WordArray;
    u.enc.Base64 = {
        stringify: function (d) {
                var l = d.words,
                    p = d.sigBytes,
                    t = this.by7r;
                d.clamp();
                d = [];
                for (var r = 0; r < p; r += 3)
                    for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++) d.push(t.charAt(w >>> 6 * (3 - v) & 63));
                if (l = t.charAt(64))
                    for (; d.length % 4;) d.push(l);
                return d.join('')
            },
            parse: function (d) {
                var l = d.length,
                    s = this.by7r,
                    t = s.charAt(64);
                t && (t = d.indexOf(t), -1 != t && (l = t));
                for (var t = [], r = 0, w = 0; w < l; w++)
                    if (w % 4) {
                        var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4),
                            b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4);
                        t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4);
                        r++
                    }
                return p.create(t, r)
            },
            by7r: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    }
})();
(function (u) {
    function p(b, n, a, c, e, j, k) {
        b = b + (n & a | ~n & c) + e + k;
        return (b << j | b >>> 32 - j) + n
    }

    function d(b, n, a, c, e, j, k) {
        b = b + (n & c | a & ~c) + e + k;
        return (b << j | b >>> 32 - j) + n
    }

    function l(b, n, a, c, e, j, k) {
        b = b + (n ^ a ^ c) + e + k;
        return (b << j | b >>> 32 - j) + n
    }

    function s(b, n, a, c, e, j, k) {
        b = b + (a ^ (n | ~c)) + e + k;
        return (b << j | b >>> 32 - j) + n
    }
    for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++) b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0;
    r = r.MD5 = v.extend({
        bwV1x: function () {
                this.dO9F = new w.init([1732584193,
                    4023233417,
                    2562383102,
                    271733878
                ])
            },
            bAK2x: function (q, n) {
                for (var a = 0; 16 > a; a++) {
                    var c = n + a,
                        e = q[c];
                    q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360
                }
                var a = this.dO9F.words,
                    c = q[n + 0],
                    e = q[n + 1],
                    j = q[n + 2],
                    k = q[n + 3],
                    z = q[n + 4],
                    r = q[n + 5],
                    t = q[n + 6],
                    w = q[n + 7],
                    v = q[n + 8],
                    A = q[n + 9],
                    B = q[n + 10],
                    C = q[n + 11],
                    u = q[n + 12],
                    D = q[n + 13],
                    E = q[n + 14],
                    x = q[n + 15],
                    f = a[0],
                    m = a[1],
                    g = a[2],
                    h = a[3],
                    f = p(f, m, g, h, c, 7, b[0]),
                    h = p(h, f, m, g, e, 12, b[1]),
                    g = p(g, h, f, m, j, 17, b[2]),
                    m = p(m, g, h, f, k, 22, b[3]),
                    f = p(f, m, g, h, z, 7, b[4]),
                    h = p(h, f, m, g, r, 12, b[5]),
                    g = p(g, h, f, m, t, 17, b[6]),
                    m = p(m, g, h, f, w, 22, b[7]),
                    f = p(f, m, g, h, v, 7, b[8]),
                    h = p(h, f, m, g, A, 12, b[9]),
                    g = p(g, h, f, m, B, 17, b[10]),
                    m = p(m, g, h, f, C, 22, b[11]),
                    f = p(f, m, g, h, u, 7, b[12]),
                    h = p(h, f, m, g, D, 12, b[13]),
                    g = p(g, h, f, m, E, 17, b[14]),
                    m = p(m, g, h, f, x, 22, b[15]),
                    f = d(f, m, g, h, e, 5, b[16]),
                    h = d(h, f, m, g, t, 9, b[17]),
                    g = d(g, h, f, m, C, 14, b[18]),
                    m = d(m, g, h, f, c, 20, b[19]),
                    f = d(f, m, g, h, r, 5, b[20]),
                    h = d(h, f, m, g, B, 9, b[21]),
                    g = d(g, h, f, m, x, 14, b[22]),
                    m = d(m, g, h, f, z, 20, b[23]),
                    f = d(f, m, g, h, A, 5, b[24]),
                    h = d(h, f, m, g, E, 9, b[25]),
                    g = d(g, h, f, m, k, 14, b[26]),
                    m = d(m, g, h, f, v, 20, b[27]),
                    f = d(f, m, g, h, D, 5, b[28]),
                    h = d(h, f, m, g, j, 9, b[29]),
                    g = d(g, h, f, m, w, 14, b[30]),
                    m = d(m, g, h, f, u, 20, b[31]),
                    f = l(f, m, g, h, r, 4, b[32]),
                    h = l(h, f, m, g, v, 11, b[33]),
                    g = l(g, h, f, m, C, 16, b[34]),
                    m = l(m, g, h, f, E, 23, b[35]),
                    f = l(f, m, g, h, e, 4, b[36]),
                    h = l(h, f, m, g, z, 11, b[37]),
                    g = l(g, h, f, m, w, 16, b[38]),
                    m = l(m, g, h, f, B, 23, b[39]),
                    f = l(f, m, g, h, D, 4, b[40]),
                    h = l(h, f, m, g, c, 11, b[41]),
                    g = l(g, h, f, m, k, 16, b[42]),
                    m = l(m, g, h, f, t, 23, b[43]),
                    f = l(f, m, g, h, A, 4, b[44]),
                    h = l(h, f, m, g, u, 11, b[45]),
                    g = l(g, h, f, m, x, 16, b[46]),
                    m = l(m, g, h, f, j, 23, b[47]),
                    f = s(f, m, g, h, c, 6, b[48]),
                    h = s(h, f, m, g, w, 10, b[49]),
                    g = s(g, h, f, m, E, 15, b[50]),
                    m = s(m, g, h, f, r, 21, b[51]),
                    f = s(f, m, g, h, u, 6, b[52]),
                    h = s(h, f, m, g, k, 10, b[53]),
                    g = s(g, h, f, m, B, 15, b[54]),
                    m = s(m, g, h, f, e, 21, b[55]),
                    f = s(f, m, g, h, v, 6, b[56]),
                    h = s(h, f, m, g, x, 10, b[57]),
                    g = s(g, h, f, m, t, 15, b[58]),
                    m = s(m, g, h, f, D, 21, b[59]),
                    f = s(f, m, g, h, z, 6, b[60]),
                    h = s(h, f, m, g, C, 10, b[61]),
                    g = s(g, h, f, m, j, 15, b[62]),
                    m = s(m, g, h, f, A, 21, b[63]);
                a[0] = a[0] + f | 0;
                a[1] = a[1] + m | 0;
                a[2] = a[2] + g | 0;
                a[3] = a[3] + h | 0
            },
            WD2x: function () {
                var b = this.j7c,
                    n = b.words,
                    a = 8 * this.bAH2x,
                    c = 8 * b.sigBytes;
                n[c >>> 5] |= 128 << 24 - c % 32;
                var e = u.floor(a / 4294967296);
                n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
                n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
                b.sigBytes = 4 * (n.length + 1);
                this.Dl7e();
                b = this.dO9F;
                n = b.words;
                for (a = 0; 4 > a; a++) c = n[a],
                    n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
                return b
            },
            clone: function () {
                var b = v.clone.call(this);
                b.dO9F = this.dO9F.clone();
                return b
            }
    });
    t.MD5 = v.bxk1x(r);
    t.HmacMD5 = v.cAn5s(r)
})(Math);
(function () {
    var u = CryptoJS,
        p = u.lib,
        d = p.Base,
        l = p.WordArray,
        p = u.algo,
        s = p.EvpKDF = d.extend({
            cfg: d.extend({
                keySize: 4,
                hasher: p.MD5,
                iterations: 1
            }),
            init: function (d) {
                    this.cfg = this.cfg.extend(d)
                },
                compute: function (d, r) {
                    for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) {
                        n && s.update(n);
                        var n = s.update(d).finalize(r);
                        s.reset();
                        for (var a = 1; a < p; a++) n = s.finalize(n),
                            s.reset();
                        b.concat(n)
                    }
                    b.sigBytes = 4 * q;
                    return b
                }
        });
    u.EvpKDF = function (d, l, p) {
        return s.create(p).compute(d, l)
    }
})();
CryptoJS.lib.Cipher || function (u) {
    var p = CryptoJS,
        d = p.lib,
        l = d.Base,
        s = d.WordArray,
        t = d.BufferedBlockAlgorithm,
        r = p.enc.Base64,
        w = p.algo.EvpKDF,
        v = d.Cipher = t.extend({
            cfg: l.extend(),
            createEncryptor: function (e, a) {
                    return this.create(this.buN1x, e, a)
                },
                createDecryptor: function (e, a) {
                    return this.create(this.cAm5r, e, a)
                },
                init: function (e, a, b) {
                    this.cfg = this.cfg.extend(b);
                    this.bBg2x = e;
                    this.J7C = a;
                    this.reset()
                },
                reset: function () {
                    t.reset.call(this);
                    this.bwV1x()
                },
                process: function (e) {
                    this.WG2x(e);
                    return this.Dl7e()
                },
                finalize: function (e) {
                    e && this.WG2x(e);
                    return this.WD2x()
                },
                keySize: 4,
            ivSize: 4,
            buN1x: 1,
            cAm5r: 2,
            bxk1x: function (e) {
                return {
                    encrypt: function (b, k, d) {
                            return ('string' == typeof k ? c : a).encrypt(e, b, k, d)
                        },
                        decrypt: function (b, k, d) {
                            return ('string' == typeof k ? c : a).decrypt(e, b, k, d)
                        }
                }
            }
        });
    d.StreamCipher = v.extend({
        WD2x: function () {
                return this.Dl7e(!0)
            },
            blockSize: 1
    });
    var b = p.mode = {},
        x = function (e, a, b) {
            var c = this.bBj2x;
            c ? this.bBj2x = u : c = this.bBk2x;
            for (var d = 0; d < b; d++) e[a + d] ^= c[d]
        },
        q = (d.BlockCipherMode = l.extend({
            createEncryptor: function (e, a) {
                    return this.Encryptor.create(e, a)
                },
                createDecryptor: function (e, a) {
                    return this.Decryptor.create(e, a)
                },
                init: function (e, a) {
                    this.bBl2x = e;
                    this.bBj2x = a
                }
        })).extend();
    q.Encryptor = q.extend({
        processBlock: function (e, a) {
            var b = this.bBl2x,
                c = b.blockSize;
            x.call(this, e, a, c);
            b.encryptBlock(e, a);
            this.bBk2x = e.slice(a, a + c)
        }
    });
    q.Decryptor = q.extend({
        processBlock: function (e, a) {
            var b = this.bBl2x,
                c = b.blockSize,
                d = e.slice(a, a + c);
            b.decryptBlock(e, a);
            x.call(this, e, a, c);
            this.bBk2x = d
        }
    });
    b = b.CBC = q;
    q = (p.pad = {}).Pkcs7 = {
        pad: function (a, b) {
                for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4) l.push(d);
                c = s.create(l, c);
                a.concat(c)
            },
            unpad: function (a) {
                a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255
            }
    };
    d.BlockCipher = v.extend({
        cfg: v.cfg.extend({
            mode: b,
            padding: q
        }),
        reset: function () {
                v.reset.call(this);
                var a = this.cfg,
                    b = a.iv,
                    a = a.mode;
                if (this.bBg2x == this.buN1x) var c = a.createEncryptor;
                else c = a.createDecryptor,
                    this.bAC2x = 1;
                this.fg9X = c.call(a, this, b && b.words)
            },
            bAK2x: function (a, b) {
                this.fg9X.processBlock(a, b)
            },
            WD2x: function () {
                var a = this.cfg.padding;
                if (this.bBg2x == this.buN1x) {
                    a.pad(this.j7c, this.blockSize);
                    var b = this.Dl7e(!0)
                } else b = this.Dl7e(!0),
                    a.unpad(b);
                return b
            },
            blockSize: 4
    });
    var n = d.CipherParams = l.extend({
            init: function (a) {
                    this.mixIn(a)
                },
                toString: function (a) {
                    return (a || this.formatter).stringify(this)
                }
        }),
        b = (p.format = {}).OpenSSL = {
            stringify: function (a) {
                    var b = a.ciphertext;
                    a = a.salt;
                    return (a ? s.create([1398893684,
                        1701076831
                    ]).concat(a).concat(b) : b).toString(r)
                },
                parse: function (a) {
                    a = r.parse(a);
                    var b = a.words;
                    if (1398893684 == b[0] && 1701076831 == b[1]) {
                        var c = s.create(b.slice(2, 4));
                        b.splice(0, 4);
                        a.sigBytes -= 16
                    }
                    return n.create({
                        ciphertext: a,
                        salt: c
                    })
                }
        },
        a = d.SerializableCipher = l.extend({
            cfg: l.extend({
                format: b
            }),
            encrypt: function (a, b, c, d) {
                    d = this.cfg.extend(d);
                    var l = a.createEncryptor(c, d);
                    b = l.finalize(b);
                    l = l.cfg;
                    return n.create({
                        ciphertext: b,
                        key: c,
                        iv: l.iv,
                        algorithm: a,
                        mode: l.mode,
                        padding: l.padding,
                        blockSize: a.blockSize,
                        formatter: d.format
                    })
                },
                decrypt: function (a, b, c, d) {
                    d = this.cfg.extend(d);
                    b = this.bdQ4U(b, d.format);
                    return a.createDecryptor(c, d).finalize(b.ciphertext)
                },
                bdQ4U: function (a, b) {
                    return 'string' == typeof a ? b.parse(a, this) : a
                }
        }),
        p = (p.kdf = {}).OpenSSL = {
            execute: function (a, b, c, d) {
                d || (d = s.random(8));
                a = w.create({
                    keySize: b + c
                }).compute(a, d);
                c = s.create(a.words.slice(b), 4 * c);
                a.sigBytes = 4 * b;
                return n.create({
                    key: a,
                    iv: c,
                    salt: d
                })
            }
        },
        c = d.PasswordBasedCipher = a.extend({
            cfg: a.cfg.extend({
                kdf: p
            }),
            encrypt: function (b, c, d, l) {
                    l = this.cfg.extend(l);
                    d = l.kdf.execute(d, b.keySize, b.ivSize);
                    l.iv = d.iv;
                    b = a.encrypt.call(this, b, c, d.key, l);
                    b.mixIn(d);
                    return b
                },
                decrypt: function (b, c, d, l) {
                    l = this.cfg.extend(l);
                    c = this.bdQ4U(c, l.format);
                    d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt);
                    l.iv = d.iv;
                    return a.decrypt.call(this, b, c, d.key, l)
                }
        })
}();
(function () {
    for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++) a[c] = 128 > c ? c << 1 : c << 1 ^ 283;
    for (var e = 0, j = 0, c = 0; 256 > c; c++) {
        var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4,
            k = k >>> 8 ^ k & 255 ^ 99;
        l[e] = k;
        s[k] = e;
        var z = a[e],
            F = a[z],
            G = a[F],
            y = 257 * a[k] ^ 16843008 * k;
        t[e] = y << 24 | y >>> 8;
        r[e] = y << 16 | y >>> 16;
        w[e] = y << 8 | y >>> 24;
        v[e] = y;
        y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e;
        b[k] = y << 24 | y >>> 8;
        x[k] = y << 16 | y >>> 16;
        q[k] = y << 8 | y >>> 24;
        n[k] = y;
        e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1
    }
    var H = [
            0,
            1,
            2,
            4,
            8,
            16,
            32,
            64,
            128,
            27,
            54
        ],
        d = d.AES = p.extend({
            bwV1x: function () {
                    for (var a = this.J7C, c = a.words, d = a.sigBytes / 4, a = 4 * ((this.cAd5i = d + 6) + 1), e = this.cAb5g = [], j = 0; j < a; j++)
                        if (j < d) e[j] = c[j];
                        else {
                            var k = e[j - 1];
                            j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24);
                            e[j] = e[j - d] ^ k
                        }
                    c = this.cAa5f = [];
                    for (d = 0; d < a; d++) j = a - d,
                        k = d % 4 ? e[j] : e[j - 4],
                        c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>> 8 & 255]] ^ n[l[k & 255]]
                },
                encryptBlock: function (a, b) {
                    this.bBo2x(a, b, this.cAb5g, t, r, w, v, l)
                },
                decryptBlock: function (a, c) {
                    var d = a[c + 1];
                    a[c + 1] = a[c + 3];
                    a[c + 3] = d;
                    this.bBo2x(a, c, this.cAa5f, b, x, q, n, s);
                    d = a[c + 1];
                    a[c + 1] = a[c + 3];
                    a[c + 3] = d
                },
                bBo2x: function (a, b, c, d, e, j, l, f) {
                    for (var m = this.cAd5i, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++) var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++],
                        s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++],
                        t = d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++],
                        n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++],
                        g = q,
                        h = s,
                        k = t;
                    q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++];
                    s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++];
                    t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++];
                    n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++];
                    a[b] = q;
                    a[b + 1] = s;
                    a[b + 2] = t;
                    a[b + 3] = n
                },
                keySize: 8
        });
    u.AES = p.bxk1x(d)
})();

function RSAKeyPair(a, b, c) {
    this.e = biFromHex(a),
        this.d = biFromHex(b),
        this.m = biFromHex(c),
        this.chunkSize = 2 * biHighIndex(this.m),
        this.radix = 16,
        this.barrett = new BarrettMu(this.m)
}

function twoDigit(a) {
    return (10 > a ? '0' : '') + String(a)
}

function encryptedString(a, b) {
    for (var f, g, h, i, j, k, l, c = new Array, d = b.length, e = 0; d > e;) c[e] = b.charCodeAt(e),
        e++;
    for (; 0 != c.length % a.chunkSize;) c[e++] = 0;
    for (f = c.length, g = '', e = 0; f > e; e += a.chunkSize) {
        for (j = new BigInt, h = 0, i = e; i < e + a.chunkSize; ++h) j.digits[h] = c[i++],
            j.digits[h] += c[i++] << 8;
        k = a.barrett.powMod(j, a.e),
            l = 16 == a.radix ? biToHex(k) : biToString(k, a.radix),
            g += l + ' '
    }
    return g.substring(0, g.length - 1)
}

function decryptedString(a, b) {
    var e,
        f,
        g,
        h,
        c = b.split(' '),
        d = '';
    for (e = 0; e < c.length; ++e)
        for (h = 16 == a.radix ? biFromHex(c[e]) : biFromString(c[e], a.radix), g = a.barrett.powMod(h, a.d), f = 0; f <= biHighIndex(g); ++f) d += String.fromCharCode(255 & g.digits[f], g.digits[f] >> 8);
    return 0 == d.charCodeAt(d.length - 1) && (d = d.substring(0, d.length - 1)),
        d
}

function setMaxDigits(a) {
    maxDigits = a,
        ZERO_ARRAY = new Array(maxDigits);
    for (var b = 0; b < ZERO_ARRAY.length; b++) ZERO_ARRAY[b] = 0;
    bigZero = new BigInt,
        bigOne = new BigInt,
        bigOne.digits[0] = 1
}

function BigInt(a) {
    this.digits = 'boolean' == typeof a && 1 == a ? null : ZERO_ARRAY.slice(0),
        this.isNeg = !1
}

function biFromDecimal(a) {
    for (var d, e, f, b = '-' == a.charAt(0), c = b ? 1 : 0; c < a.length && '0' == a.charAt(c);)++c;
    if (c == a.length) d = new BigInt;
    else {
        for (e = a.length - c, f = e % dpl10, 0 == f && (f = dpl10), d = biFromNumber(Number(a.substr(c, f))), c += f; c < a.length;) d = biAdd(biMultiply(d, lr10), biFromNumber(Number(a.substr(c, dpl10)))),
            c += dpl10;
        d.isNeg = b
    }
    return d
}

function biCopy(a) {
    var b = new BigInt(!0);
    return b.digits = a.digits.slice(0),
        b.isNeg = a.isNeg,
        b
}

function biFromNumber(a) {
    var c,
        b = new BigInt;
    for (b.isNeg = 0 > a, a = Math.abs(a), c = 0; a > 0;) b.digits[c++] = a & maxDigitVal,
        a >>= biRadixBits;
    return b
}

function reverseStr(a) {
    var c,
        b = '';
    for (c = a.length - 1; c > -1; --c) b += a.charAt(c);
    return b
}

function biToString(a, b) {
    var d,
        e,
        c = new BigInt;
    for (c.digits[0] = b, d = biDivideModulo(a, c), e = hexatrigesimalToChar[d[1].digits[0]]; 1 == biCompare(d[0], bigZero);) d = biDivideModulo(d[0], c),
        digit = d[1].digits[0],
        e += hexatrigesimalToChar[d[1].digits[0]];
    return (a.isNeg ? '-' : '') + reverseStr(e)
}

function biToDecimal(a) {
    var c,
        d,
        b = new BigInt;
    for (b.digits[0] = 10, c = biDivideModulo(a, b), d = String(c[1].digits[0]); 1 == biCompare(c[0], bigZero);) c = biDivideModulo(c[0], b),
        d += String(c[1].digits[0]);
    return (a.isNeg ? '-' : '') + reverseStr(d)
}

function digitToHex(a) {
    var b = 15,
        c = '';
    for (i = 0; 4 > i; ++i) c += hexToChar[a & b],
        a >>>= 4;
    return reverseStr(c)
}

function biToHex(a) {
    var d,
        b = '';
    for (biHighIndex(a), d = biHighIndex(a); d > -1; --d) b += digitToHex(a.digits[d]);
    return b
}

function charToHex(a) {
    var h,
        b = 48,
        c = b + 9,
        d = 97,
        e = d + 25,
        f = 65,
        g = 90;
    return h = a >= b && c >= a ? a - b : a >= f && g >= a ? 10 + a - f : a >= d && e >= a ? 10 + a - d : 0
}

function hexToDigit(a) {
    var d,
        b = 0,
        c = Math.min(a.length, 4);
    for (d = 0; c > d; ++d) b <<= 4,
        b |= charToHex(a.charCodeAt(d));
    return b
}

function biFromHex(a) {
    var d,
        e,
        b = new BigInt,
        c = a.length;
    for (d = c, e = 0; d > 0; d -= 4, ++e) b.digits[e] = hexToDigit(a.substr(Math.max(d - 4, 0), Math.min(d, 4)));
    return b
}

function biFromString(a, b) {
    var g,
        h,
        i,
        j,
        c = '-' == a.charAt(0),
        d = c ? 1 : 0,
        e = new BigInt,
        f = new BigInt;
    for (f.digits[0] = 1, g = a.length - 1; g >= d; g--) h = a.charCodeAt(g),
        i = charToHex(h),
        j = biMultiplyDigit(f, i),
        e = biAdd(e, j),
        f = biMultiplyDigit(f, b);
    return e.isNeg = c,
        e
}

function biDump(a) {
    return (a.isNeg ? '-' : '') + a.digits.join(' ')
}

function biAdd(a, b) {
    var c,
        d,
        e,
        f;
    if (a.isNeg != b.isNeg) b.isNeg = !b.isNeg,
        c = biSubtract(a, b),
        b.isNeg = !b.isNeg;
    else {
        for (c = new BigInt, d = 0, f = 0; f < a.digits.length; ++f) e = a.digits[f] + b.digits[f] + d,
            c.digits[f] = 65535 & e,
            d = Number(e >= biRadix);
        c.isNeg = a.isNeg
    }
    return c
}

function biSubtract(a, b) {
    var c,
        d,
        e,
        f;
    if (a.isNeg != b.isNeg) b.isNeg = !b.isNeg,
        c = biAdd(a, b),
        b.isNeg = !b.isNeg;
    else {
        for (c = new BigInt, e = 0, f = 0; f < a.digits.length; ++f) d = a.digits[f] - b.digits[f] + e,
            c.digits[f] = 65535 & d,
            c.digits[f] < 0 && (c.digits[f] += biRadix),
            e = 0 - Number(0 > d);
        if (-1 == e) {
            for (e = 0, f = 0; f < a.digits.length; ++f) d = 0 - c.digits[f] + e,
                c.digits[f] = 65535 & d,
                c.digits[f] < 0 && (c.digits[f] += biRadix),
                e = 0 - Number(0 > d);
            c.isNeg = !a.isNeg
        } else c.isNeg = a.isNeg
    }
    return c
}

function biHighIndex(a) {
    for (var b = a.digits.length - 1; b > 0 && 0 == a.digits[b];)--b;
    return b
}

function biNumBits(a) {
    var e,
        b = biHighIndex(a),
        c = a.digits[b],
        d = (b + 1) * bitsPerDigit;
    for (e = d; e > d - bitsPerDigit && 0 == (32768 & c); --e) c <<= 1;
    return e
}

function biMultiply(a, b) {
    var d,
        h,
        i,
        k,
        c = new BigInt,
        e = biHighIndex(a),
        f = biHighIndex(b);
    for (k = 0; f >= k; ++k) {
        for (d = 0, i = k, j = 0; e >= j; ++j, ++i) h = c.digits[i] + a.digits[j] * b.digits[k] + d,
            c.digits[i] = h & maxDigitVal,
            d = h >>> biRadixBits;
        c.digits[k + e + 1] = d
    }
    return c.isNeg = a.isNeg != b.isNeg,
        c
}

function biMultiplyDigit(a, b) {
    var c,
        d,
        e,
        f;
    for (result = new BigInt, c = biHighIndex(a), d = 0, f = 0; c >= f; ++f) e = result.digits[f] + a.digits[f] * b + d,
        result.digits[f] = e & maxDigitVal,
        d = e >>> biRadixBits;
    return result.digits[1 + c] = d,
        result
}

function arrayCopy(a, b, c, d, e) {
    var g,
        h,
        f = Math.min(b + e, a.length);
    for (g = b, h = d; f > g; ++g, ++h) c[h] = a[g]
}

function biShiftLeft(a, b) {
    var e,
        f,
        g,
        h,
        c = Math.floor(b / bitsPerDigit),
        d = new BigInt;
    for (arrayCopy(a.digits, 0, d.digits, c, d.digits.length - c), e = b % bitsPerDigit, f = bitsPerDigit - e, g = d.digits.length - 1, h = g - 1; g > 0; --g, --h) d.digits[g] = d.digits[g] << e & maxDigitVal | (d.digits[h] & highBitMasks[e]) >>> f;
    return d.digits[0] = d.digits[g] << e & maxDigitVal,
        d.isNeg = a.isNeg,
        d
}

function biShiftRight(a, b) {
    var e,
        f,
        g,
        h,
        c = Math.floor(b / bitsPerDigit),
        d = new BigInt;
    for (arrayCopy(a.digits, c, d.digits, 0, a.digits.length - c), e = b % bitsPerDigit, f = bitsPerDigit - e, g = 0, h = g + 1; g < d.digits.length - 1; ++g, ++h) d.digits[g] = d.digits[g] >>> e | (d.digits[h] & lowBitMasks[e]) << f;
    return d.digits[d.digits.length - 1] >>>= e,
        d.isNeg = a.isNeg,
        d
}

function biMultiplyByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, 0, c.digits, b, c.digits.length - b),
        c
}

function biDivideByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, b, c.digits, 0, c.digits.length - b),
        c
}

function biModuloByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, 0, c.digits, 0, b),
        c
}

function biCompare(a, b) {
    if (a.isNeg != b.isNeg) return 1 - 2 * Number(a.isNeg);
    for (var c = a.digits.length - 1; c >= 0; --c)
        if (a.digits[c] != b.digits[c]) return a.isNeg ? 1 - 2 * Number(a.digits[c] > b.digits[c]) : 1 - 2 * Number(a.digits[c] < b.digits[c]);
    return 0
}

function biDivideModulo(a, b) {
    var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        c = biNumBits(a),
        d = biNumBits(b),
        e = b.isNeg;
    if (d > c) return a.isNeg ? (f = biCopy(bigOne), f.isNeg = !b.isNeg, a.isNeg = !1, b.isNeg = !1, g = biSubtract(b, a), a.isNeg = !0, b.isNeg = e) : (f = new BigInt, g = biCopy(a)),
        new Array(f, g);
    for (f = new BigInt, g = a, h = Math.ceil(d / bitsPerDigit) - 1, i = 0; b.digits[h] < biHalfRadix;) b = biShiftLeft(b, 1),
        ++i,
        ++d,
        h = Math.ceil(d / bitsPerDigit) - 1;
    for (g = biShiftLeft(g, i), c += i, j = Math.ceil(c / bitsPerDigit) - 1, k = biMultiplyByRadixPower(b, j - h); - 1 != biCompare(g, k);)++f.digits[j - h],
        g = biSubtract(g, k);
    for (l = j; l > h; --l) {
        for (m = l >= g.digits.length ? 0 : g.digits[l], n = l - 1 >= g.digits.length ? 0 : g.digits[l - 1], o = l - 2 >= g.digits.length ? 0 : g.digits[l - 2], p = h >= b.digits.length ? 0 : b.digits[h], q = h - 1 >= b.digits.length ? 0 : b.digits[h - 1], f.digits[l - h - 1] = m == p ? maxDigitVal : Math.floor((m * biRadix + n) / p), r = f.digits[l - h - 1] * (p * biRadix + q), s = m * biRadixSquared + (n * biRadix + o); r > s;)--f.digits[l - h - 1],
            r = f.digits[l - h - 1] * (p * biRadix | q),
            s = m * biRadix * biRadix + (n * biRadix + o);
        k = biMultiplyByRadixPower(b, l - h - 1),
            g = biSubtract(g, biMultiplyDigit(k, f.digits[l - h - 1])),
            g.isNeg && (g = biAdd(g, k), --f.digits[l - h - 1])
    }
    return g = biShiftRight(g, i),
        f.isNeg = a.isNeg != e,
        a.isNeg && (f = e ? biAdd(f, bigOne) : biSubtract(f, bigOne), b = biShiftRight(b, i), g = biSubtract(b, g)),
        0 == g.digits[0] && 0 == biHighIndex(g) && (g.isNeg = !1),
        new Array(f, g)
}

function biDivide(a, b) {
    return biDivideModulo(a, b)[0]
}

function biModulo(a, b) {
    return biDivideModulo(a, b)[1]
}

function biMultiplyMod(a, b, c) {
    return biModulo(biMultiply(a, b), c)
}

function biPow(a, b) {
    for (var c = bigOne, d = a;;) {
        if (0 != (1 & b) && (c = biMultiply(c, d)), b >>= 1, 0 == b) break;
        d = biMultiply(d, d)
    }
    return c
}

function biPowMod(a, b, c) {
    for (var d = bigOne, e = a, f = b;;) {
        if (0 != (1 & f.digits[0]) && (d = biMultiplyMod(d, e, c)), f = biShiftRight(f, 1), 0 == f.digits[0] && 0 == biHighIndex(f)) break;
        e = biMultiplyMod(e, e, c)
    }
    return d
}

function BarrettMu(a) {
    this.modulus = biCopy(a),
        this.k = biHighIndex(this.modulus) + 1;
    var b = new BigInt;
    b.digits[2 * this.k] = 1,
        this.mu = biDivide(b, this.modulus),
        this.bkplus1 = new BigInt,
        this.bkplus1.digits[this.k + 1] = 1,
        this.modulo = BarrettMu_modulo,
        this.multiplyMod = BarrettMu_multiplyMod,
        this.powMod = BarrettMu_powMod
}

function BarrettMu_modulo(a) {
    var i,
        b = biDivideByRadixPower(a, this.k - 1),
        c = biMultiply(b, this.mu),
        d = biDivideByRadixPower(c, this.k + 1),
        e = biModuloByRadixPower(a, this.k + 1),
        f = biMultiply(d, this.modulus),
        g = biModuloByRadixPower(f, this.k + 1),
        h = biSubtract(e, g);
    for (h.isNeg && (h = biAdd(h, this.bkplus1)), i = biCompare(h, this.modulus) >= 0; i;) h = biSubtract(h, this.modulus),
        i = biCompare(h, this.modulus) >= 0;
    return h
}

function BarrettMu_multiplyMod(a, b) {
    var c = biMultiply(a, b);
    return this.modulo(c)
}

function BarrettMu_powMod(a, b) {
    var d,
        e,
        c = new BigInt;
    for (c.digits[0] = 1, d = a, e = b;;) {
        if (0 != (1 & e.digits[0]) && (c = this.multiplyMod(c, d)), e = biShiftRight(e, 1), 0 == e.digits[0] && 0 == biHighIndex(e)) break;
        d = this.multiplyMod(d, d)
    }
    return c
}
var maxDigits, ZERO_ARRAY, bigZero, bigOne, dpl10, lr10, hexatrigesimalToChar, hexToChar, highBitMasks, lowBitMasks, biRadixBase = 2,
    biRadixBits = 16,
    bitsPerDigit = biRadixBits,
    biRadix = 65536,
    biHalfRadix = biRadix >>> 1,
    biRadixSquared = biRadix * biRadix,
    maxDigitVal = biRadix - 1,
    maxInteger = 9999999999999998;
setMaxDigits(20), dpl10 = 15, lr10 = biFromNumber(1000000000000000), hexatrigesimalToChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'), hexToChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'), highBitMasks = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535), lowBitMasks = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);
! function () {
    function a(a) {
        var d,
            e,
            b = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            c = '';
        for (d = 0; a > d; d += 1) e = Math.random() * b.length,
            e = Math.floor(e),
            c += b.charAt(e);
        return c
    }

    function b(a, b) {
        var c = CryptoJS.enc.Utf8.parse(b),
            d = CryptoJS.enc.Utf8.parse('0102030405060708'),
            e = CryptoJS.enc.Utf8.parse(a),
            f = CryptoJS.AES.encrypt(e, c, {
                iv: d,
                mode: CryptoJS.mode.CBC
            });
        return f.toString()
    }

    function c(a, b, c) {
        var d,
            e;
        return setMaxDigits(131),
            d = new RSAKeyPair(b, '', c),
            e = encryptedString(d, a)
    }

    function d(d, e, f, g) {
        var h = {},
            i = a(16);
        window.console.log(i)
        i = '1234567891234567'
        return h.encText = b(d, g),
            h.encText = b(h.encText, i),
            h.encSecKey = c(i, e, f),
            h
    }

    function e(a, b, d, e) {
        var f = {};
        return f.encText = c(a + e, b, d),
            f
    }
    window.asrsea = d,
        window.ecnonasr = e
}();
(function () {
    var c7f = NEJ.P,
        eo9f = c7f('nej.g'),
        v7o = c7f('nej.j'),
        k7d = c7f('nej.u'),
        TY1x = c7f('nm.x.ek');
    TY1x.emj = {
        '色': '00e0b',
        '流感': '509f6',
        '这边': '259df',
        '弱': '8642d',
        '嘴唇': 'bc356',
        '亲': '62901',
        '开心': '477df',
        '呲牙': '22677',
        '憨笑': 'ec152',
        '猫': 'b5ff6',
        '皱眉': '8ace6',
        '幽灵': '15bb7',
        '蛋糕': 'b7251',
        '发怒': '52b3a',
        '大哭': 'b17a8',
        '兔子': '76aea',
        '星星': '8a5aa',
        '钟情': '76d2e',
        '牵手': '41762',
        '公鸡': '9ec4e',
        '爱意': 'e341f',
        '禁止': '56135',
        '狗': 'fccf6',
        '亲亲': '95280',
        '叉': '104e0',
        '礼物': '312ec',
        '晕': 'bda92',
        '呆': '557c9',
        '生病': '38701',
        '钻石': '14af6',
        '拜': 'c9d05',
        '怒': 'c4f7f',
        '示爱': '0c368',
        '汗': '5b7a4',
        '小鸡': '6bee2',
        '痛苦': '55932',
        '撇嘴': '575cc',
        '惶恐': 'e10b4',
        '口罩': '24d81',
        '吐舌': '3cfe4',
        '心碎': '875d3',
        '生气': 'e8204',
        '可爱': '7b97d',
        '鬼脸': 'def52',
        '跳舞': '741d5',
        '男孩': '46b8e',
        '奸笑': '289dc',
        '猪': '6935b',
        '圈': '3ece0',
        '便便': '462db',
        '外星': '0a22b',
        '圣诞': '8e7',
        '流泪': '01000',
        '强': '1',
        '爱心': '0CoJU',
        '女孩': 'm6Qyw',
        '惊恐': '8W8ju',
        '大笑': 'd'
    };
    TY1x.md = [
        '色',
        '流感',
        '这边',
        '弱',
        '嘴唇',
        '亲',
        '开心',
        '呲牙',
        '憨笑',
        '猫',
        '皱眉',
        '幽灵',
        '蛋糕',
        '发怒',
        '大哭',
        '兔子',
        '星星',
        '钟情',
        '牵手',
        '公鸡',
        '爱意',
        '禁止',
        '狗',
        '亲亲',
        '叉',
        '礼物',
        '晕',
        '呆',
        '生病',
        '钻石',
        '拜',
        '怒',
        '示爱',
        '汗',
        '小鸡',
        '痛苦',
        '撇嘴',
        '惶恐',
        '口罩',
        '吐舌',
        '心碎',
        '生气',
        '可爱',
        '鬼脸',
        '跳舞',
        '男孩',
        '奸笑',
        '猪',
        '圈',
        '便便',
        '外星',
        '圣诞'
    ]
})();
(function () {
    var c7f = NEJ.P,
        eo9f = c7f('nej.g'),
        v7o = c7f('nej.j'),
        k7d = c7f('nej.u'),
        TY1x = c7f('nm.x.ek'),
        l7e = c7f('nm.x');
    if (v7o.bn7g.redefine) return;
    window.GEnc = true;
    var bsL0x = function (czZ5e) {
        var o7h = [];
        k7d.bd7W(czZ5e, function (czX5c) {
            o7h.push(TY1x.emj[czX5c])
        });
        return o7h.join('')
    };
    var czW5b = v7o.bn7g;
    v7o.bn7g = function (Y7R, e7d) {
        var j7c = {},
            e7d = NEJ.X({}, e7d),
            lx1x = Y7R.indexOf('?');
        if (window.GEnc && /(^|\.com)\/api/.test(Y7R) && !(e7d.headers && e7d.headers[eo9f.zI5N] == eo9f.Ff7Y) && !e7d.noEnc) {
            if (lx1x != -1) {
                j7c = k7d.hu0x(Y7R.substring(lx1x + 1));
                Y7R = Y7R.substring(0, lx1x)
            }
            if (e7d.query) {
                j7c = NEJ.X(j7c, k7d.fH9y(e7d.query) ? k7d.hu0x(e7d.query) : e7d.query)
            }
            if (e7d.data) {
                j7c = NEJ.X(j7c, k7d.fH9y(e7d.data) ? k7d.hu0x(e7d.data) : e7d.data)
            }
            j7c['csrf_token'] = v7o.gy0x('__csrf');
            Y7R = Y7R.replace('api', 'weapi');
            e7d.method = 'post';
            delete e7d.query;
            window.console.log(j7c);
            var bBU3x = window.asrsea(JSON.stringify(j7c), bsL0x(['流泪',
                '强'
            ]), bsL0x(TY1x.md), bsL0x(['爱心',
                '女孩',
                '惊恐',
                '大笑'
            ]));
            window.console.log(bBU3x);
            e7d.data = k7d.cC8u({
                params: bBU3x.encText,
                encSecKey: bBU3x.encSecKey
            })
        }
        czW5b(Y7R, e7d)
    };
    v7o.bn7g.redefine = true
})();
(function () {
    window.setTimeout(function () {
        if (!location.href.match(/^https?:\/\/([a-zA-Z0-9\-]+?\.)*?music\.163\.com($|\/)/gi)) return;
        var getNode = function (tagName, attrName, attrValue) {
            if (!tagName || !attrName || !attrValue) return null;
            var nodes = document.getElementsByTagName(tagName);
            if (nodes && nodes.length) {
                for (var i = 0, ii = nodes.length; i < ii; i++) {
                    if ((nodes[i][attrName] || '').toLowerCase() == attrValue.toLowerCase()) {
                        return nodes[i]
                    }
                }
            }
            return null
        };
        var meta = getNode('meta', 'name', 'robots');
        if (meta && (meta.content || '').toLowerCase() == 'nofollow') return;
        var canonicalURL,
            curProtocol;
        var link = getNode('link', 'rel', 'canonical');
        if (link && link.href) canonicalURL = link.href;
        if (!canonicalURL) {
            curProtocol = location.protocol.split(':')[0]
        } else {
            curProtocol = canonicalURL.split(':')[0]
        }
        if (!canonicalURL) canonicalURL = location.href;
        var pushHref = String(curProtocol).toLowerCase() === 'https' ? 'https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif' : '//api.share.baidu.com/s.gif';
        var params = [];
        if (document.referrer) {
            params.push('r=' + encodeURIComponent(document.referrer))
        }
        params.push('l=' + encodeURIComponent(canonicalURL));
        (new Image).src = pushHref + '?' + params.join('&')
    }, 3000)
})();
(function () {})();
(function () {})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        dv9m = c7f('nej.p'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        dC9t = c7f('nm.u'),
        l7e = c7f('nm.x'),
        q7j = c7f('nm.d'),
        m7f = c7f('nm.l'),
        cB8t = c7f('nm.pc'),
        brJ0x = 'http://s1.music.126.net/style/web2/emt/emoji_{ID}.png',
        j7c = {
            '大笑': '86',
            '可爱': '85',
            '憨笑': '359',
            '色': '95',
            '亲亲': '363',
            '惊恐': '96',
            '流泪': '356',
            '亲': '362',
            '呆': '352',
            '哀伤': '342',
            '呲牙': '343',
            '吐舌': '348',
            '撇嘴': '353',
            '怒': '361',
            '奸笑': '341',
            '汗': '97',
            '痛苦': '346',
            '惶恐': '354',
            '生病': '350',
            '口罩': '351',
            '大哭': '357',
            '晕': '355',
            '发怒': '115',
            '开心': '360',
            '鬼脸': '94',
            '皱眉': '87',
            '流感': '358',
            '爱心': '33',
            '心碎': '34',
            '钟情': '303',
            '星星': '309',
            '生气': '314',
            '便便': '89',
            '强': '13',
            '弱': '372',
            '拜': '14',
            '牵手': '379',
            '跳舞': '380',
            '禁止': '374',
            '这边': '262',
            '爱意': '106',
            '示爱': '376',
            '嘴唇': '367',
            '狗': '81',
            '猫': '78',
            '猪': '100',
            '兔子': '459',
            '小鸡': '450',
            '公鸡': '461',
            '幽灵': '116',
            '圣诞': '411',
            '外星': '101',
            '钻石': '52',
            '礼物': '107',
            '男孩': '0',
            '女孩': '1',
            '蛋糕': '337',
            18: '186',
            '圈': '312',
            '叉': '313'
        },
        czV5a = function () {
            if (h7a && h7a.z7s) {
                h7a.dispatchEventalias = h7a.z7s
            }
        };
    czV5a();
    l7e.brz0x = function (bN8F) {
        if (!bN8F || bN8F.copyrightId === undefined || !!bN8F.program) return false;
        if (window.GAbroad) {
            bN8F.fee = 0;
            return true
        }
        if (bN8F.status < 0) return true;
        var Uf2x;
        if (typeof GCopyrights !== 'undefined') Uf2x = GCopyrights;
        try {
            if (!Uf2x && !!top.GCopyrights) Uf2x = top.GCopyrights
        } catch (e) {}
        if (Uf2x) {
            var r7k = k7d.dj9a(Uf2x, bN8F.copyrightId);
            if (r7k >= 0) return true
        }
        return false
    };
    l7e.bru0x = function () {
        var CL6F = /^\/m\/(song|album|artist|playlist|dj|search)\?/,
            wQ5V = {
                2: 'artist',
                13: 'playlist',
                17: 'dj',
                19: 'album',
                18: 'song',
                31: 'toplist',
                32: 'searchsong',
                33: 'searchlyric',
                34: 'event',
                70: 'djradio',
                24: 'day',
                50: 'record'
            },
            czR5W = {
                song: '单曲',
                album: '专辑',
                artist: '歌手',
                playlist: '歌单',
                dj: '电台节目',
                searchsong: '单曲搜索',
                searchlyric: '歌词搜索',
                toplist: '榜单',
                event: '动态',
                djradio: '电台',
                day: '每日歌曲推荐',
                record: '听歌排行榜'
            };
        var czM5R = function (J7C, j7c, Up2x) {
            switch (J7C) {
            case 'event':
                j7c = j7c.split('|');
                return '/event?id=' + j7c[0] + '&uid=' + j7c[1];
            case 'searchsong':
            case 'searchlyric':
                var u7n = J7C == 'searchsong' ? 1 : 1006;
                return '/search/m/?s=' + encodeURIComponent(j7c) + '&type=' + u7n;
            case 'toplist':
                return '/discover/toplist?id=' + j7c + '&_hash=songlist-' + Up2x;
            case 'day':
                return '/discover/recommend/taste' + '?_hash=songlist-' + Up2x;;
            case 'record':
                j7c = j7c.split('|');
                return '/user/songs/rank?id=' + j7c[0] + '&cat=' + j7c[1];
                break;
            default:
                return '/' + J7C + '?id=' + j7c + '&_hash=songlist-' + Up2x
            }
        };
        return function (eb9S, Up2x) {
            if (!eb9S) return null;
            var LC9t = eb9S.fid || (eb9S.type != 18 ? eb9S.type : null),
                bpE9v = eb9S.fdata || eb9S.rid,
                bCH3x = eb9S.page || eb9S.fhref;
            var J7C = wQ5V[LC9t];
            if (!J7C) {
                var zv5A = (bCH3x || '').match(CL6F);
                if (zv5A) J7C = zv5A[1]
            }
            if (!J7C) return null;
            return {
                title: czR5W[J7C],
                link: !wQ5V[LC9t] ? bCH3x : czM5R(J7C, bpE9v, Up2x),
                fid: LC9t,
                fdata: bpE9v
            }
        }
    }();
    l7e.Wr2x = function (kv1x) {
        var dp9g = kv1x;
        if (typeof GUser !== 'undefined' && GUser.userId > 0) dp9g = GUser;
        return dp9g
    };
    l7e.gR0x = function () {
        if (typeof GUser !== 'undefined' && GUser.userId > 0) {
            return true
        } else {
            top.login();
            return false
        }
    };
    l7e.Ms9j = function () {
        var CL6F = /#(.*?)$/;
        return function (gx0x) {
            var jG1x = gx0x === false ? location : top.location;
            return CL6F.test(jG1x.href) ? RegExp.$1 : ''
        }
    }();
    l7e.BK6E = function () {
        var BI6C = a6g.dh9Y('audio'),
            czL5Q = BI6C.canPlayType && BI6C.canPlayType('audio/mpeg');
        if (czL5Q) return 2;
        var czI5N = l7e.bpm9d().supported;
        if (czI5N) return 1;
        return 0
    };
    l7e.bpm9d = function () {
        var gn0x,
            bpf9W = !1,
            boO9F = '';
        if (dv9m.dr9i.browser == 'ie') {
            try {
                gn0x = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
            } catch (e) {
                gn0x = null
            }
            if (gn0x) {
                bpf9W = !0;
                boO9F = gn0x.GetVariable('$version')
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0) {
                gn0x = navigator.plugins['Shockwave Flash'];
                if (gn0x) {
                    bpf9W = !0;
                    boO9F = gn0x.description
                }
            }
        }
        return {
            supported: bpf9W,
            version: boO9F
        }
    };
    l7e.rx3x = function () {
        return '网易云音乐'
    };
    l7e.czG5L = function () {
        return j7c
    };
    l7e.bDz3x = function (cG8y) {
        var C7v = j7c[cG8y];
        return C7v == null ? '' : brJ0x.replace('{ID}', C7v)
    };
    l7e.wX5c = function (bo7h, ea9R, Bn6h) {
        if (!bo7h) return '';
        if (!!Bn6h) {
            bo7h = l7e.czF5K(bo7h)
        }
        return l7e.Wq2x(l7e.czE5J(bo7h, ea9R))
    };
    l7e.Wo2x = function () {
        var TD1x = {
                AT: /(@([\u4e00-\u9fa5A-Za-z0-9-_]{2,})((?=[ :@：])|$))/g,
                LINK: /(@([\u4e00-\u9fa5A-Za-z0-9-_]{2,})((?=[ :@：])|$))|((http[s]{0,1}):\/\/[\-a-zA-Z0-9\.]+(:(6553[0-5]|655[0-2][0-9]|65[0-4][0-9][0-9]|6[0-4][0-9][0-9][0-9]|\\d{2,4}|[1-9]))?(\/[a-zA-Z0-9\\\.\-~!@#$%\^&\*\+\?:_\/=<>]*)?)/g,
                ACT_NOLINK: /(@([\u4e00-\u9fa5A-Za-z0-9-_]{2,})((?=[ :@：])|$))|(#[^\[\]\/\\\#\r\n]+?#)/g,
                ACT: /(@([\u4e00-\u9fa5A-Za-z0-9-_]{2,})((?=[ :@：])|$))|((http[s]{0,1}):\/\/[\-a-zA-Z0-9\.]+(:(6553[0-5]|655[0-2][0-9]|65[0-4][0-9][0-9]|6[0-4][0-9][0-9][0-9]|\\d{2,4}|[1-9]))?(\/[a-zA-Z0-9\\\.\-~!@#$%\^&\*\+\?:_\/=<>]*)?)|(#[^\[\]\/\\\#\r\n]+?#)/g,
                LING: /\n/g,
                BLANK: /\s/g,
                MLINE: /([ \f\r\t\v]*\n){2,}/g
            },
            bnT9K = {
                LINK: '<a href="${url}" class="${klass}">${value}</a>',
                AT: '<a href="${url}" class="${klass}">@${value}</a>',
                ACT: '<a href="javascript:;" class="${klass}" data-title="${value}" data-action="activity">${value}</a>'
            },
            czD5I = {
                r: /\<|\>|\&lt;|\&gt;|\&|\'|\"/g,
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                ' ': '&nbsp;',
                '"': '&quot;',
                '\'': '&#39;',
                '&lt;': '&lt;',
                '&gt;': '&gt;'
            },
            czC5H = [
                'AT',
                'LINK',
                'ACT_NOLINK',
                'ACT'
            ];
        var czy5D = function (dI9z, bnS9J) {
            dI9z = Mt9k(dI9z);
            if (!!bnS9J) {
                dI9z = dI9z.replace(TD1x.MLINE, '\n\n').replace(TD1x.LING, '</br>')
            }
            dI9z = l7e.Wq2x(dI9z);
            return dI9z
        };
        var Mt9k = function (bo7h) {
            return k7d.BS6M(czD5I, bo7h)
        };
        return function (dI9z, e7d, dE9v) {
            e7d = e7d || {};
            dE9v = dE9v || {};
            dE9v.actHash = {};
            var czv5A = !!e7d.parseLink,
                czp5u = !!e7d.parseAct,
                czk5p = e7d.linkTpl || bnT9K.LINK,
                czj5o = e7d.atTpl || bnT9K.AT,
                czi5n = e7d.atUrl || '/user/home?nickname=',
                czh5m = e7d.actTpl || bnT9K.ACT,
                bnS9J = !!e7d.keepSpace,
                bng8Y = e7d.linkKlass || 's-fc7';
            cEx6r = e7d.actBiJson || '';
            if (!dI9z) return '';
            dI9z = dI9z.trim().replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
            var lI1x = czC5H[czv5A + 2 * czp5u],
                dg9X = TD1x[lI1x],
                bs7l = null,
                ka1x = null,
                gu0x = 0,
                cEy6s = '',
                cEz6t = '';
            var pr2x = [];
            dg9X.lastIndex = 0;
            while (bs7l = dg9X.exec(dI9z)) {
                var dP9G = {
                    html: '',
                    before: bs7l.index - 1,
                    after: bs7l.index + bs7l[0].length
                };
                if (bs7l[1]) {
                    var ka1x = bs7l[2].replace(/[^\x00-\xff]/g, '**');
                    if (ka1x.length < 4 || ka1x.length > 32) {} else {
                        var EX7Q = a6g.ex9o(czj5o);
                        dP9G.html = a6g.bZ8R(EX7Q, {
                            value: Mt9k(bs7l[2]),
                            url: encodeURI(czi5n + bs7l[2]),
                            klass: bng8Y
                        });
                        pr2x.push(dP9G)
                    }
                } else if (bs7l.length > 8 && bs7l[4]) {
                    var EX7Q = a6g.ex9o(czk5p);
                    dP9G.html = a6g.bZ8R(EX7Q, {
                        value: Mt9k(bs7l[4]),
                        url: bs7l[4],
                        klass: bng8Y
                    });
                    pr2x.push(dP9G)
                } else {
                    var bFh3x = lI1x == 'ACT_NOLINK' ? 4 : 9;
                    var EX7Q = a6g.ex9o(czh5m);
                    dP9G.html = a6g.bZ8R(EX7Q, {
                        value: Mt9k(bs7l[bFh3x]),
                        klass: bng8Y
                    });
                    pr2x.push(dP9G);
                    dE9v.actHash[bs7l[bFh3x].slice(1, -1)] = true
                }
            }
            var bmA8s = pr2x.length,
                kv1x = {
                    before: dI9z.length - 1,
                    after: 0
                },
                bmt8l = '';
            for (var i = 0; i <= bmA8s; i++) {
                var hD0x,
                    fQ9H;
                hD0x = (pr2x[i - 1] || kv1x).after;
                fQ9H = (pr2x[i] || kv1x).before;
                if (fQ9H >= hD0x && hD0x >= 0 && fQ9H <= dI9z.length - 1) {
                    bmt8l += czy5D(dI9z.substring(hD0x, fQ9H + 1), bnS9J)
                }
                if (pr2x[i]) {
                    bmt8l += pr2x[i].html
                }
            }
            return bmt8l
        }
    }();
    l7e.czF5K = function () {
        var dg9X = new RegExp('(http[s]{0,1})://[-a-zA-Z0-9.]+(:(6553[0-5]|655[0-2][0-9]|65[0-4][0-9][0-9]|6[0-4][0-9][0-9][0-9]|\\d{2,4}|[1-9]))?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?', 'g');
        return function (bo7h) {
            return (bo7h || '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(dg9X, function ($0, $1) {
                return '<a href=' + $0 + ' class="link u-link"><i class="u-dicn u-dicn-28"></i>网页链接</a>'
            })
        }
    }();
    l7e.czE5J = function () {
        var dg9X = /@([a-zA-Z0-9_\-\u4E00-\u9FA5]+)/g;
        var ev9m = function (ka1x, ea9R) {
            return '<a href="/user/home?nickname=' + encodeURIComponent(ka1x) + '" class="' + (ea9R || '') + '">@' + ka1x + '</a>'
        };
        return function (bo7h, ea9R) {
            return (bo7h || '').replace(dg9X, function ($0, $1) {
                return ev9m($1, ea9R)
            })
        }
    }();
    l7e.Wq2x = function () {
        var dg9X = /\[(.*?)\]/g;
        return function (bo7h) {
            return (bo7h || '').replace(dg9X, function ($1, $2) {
                var Y7R = l7e.bDz3x($2);
                return !Y7R ? $1 : '<img src="' + Y7R + '"/>'
            })
        }
    }();
    l7e.Cr6l = function (F7y, ea9R) {
        a6g.bE8w(F7y, ea9R) ? a6g.x7q(F7y, ea9R) : a6g.y7r(F7y, ea9R)
    };
    l7e.Mu9l = function (cP8H, kE1x) {
        cP8H = a6g.B7u(cP8H);
        kE1x = a6g.B7u(kE1x);
        if (!cP8H || !kE1x) return !1;
        for (kE1x = kE1x.parentNode; !!kE1x && kE1x != cP8H; kE1x = kE1x.parentNode);
        return kE1x == cP8H
    };
    l7e.le1x = function () {
        var bFu3x = function (gV0x) {
            return (gV0x < 10 ? '0' : '') + gV0x
        };
        return function (lb1x) {
            lb1x = parseInt(lb1x) || 0;
            if (!lb1x) return '00:00';
            var xV5a = Math.floor(lb1x % 60),
                cza5f = Math.floor(lb1x / 60);
            return bFu3x(cza5f) + ':' + bFu3x(xV5a)
        }
    }();
    l7e.xU5Z = function (fT0x, wp4t) {
        if (!fT0x || fT0x.length == 0) return '';
        wp4t = wp4t || '/';
        var bs7l = [];
        for (var i = fT0x.length - 1; i >= 0; i--) {
            bs7l.unshift(fT0x[i].name)
        }
        return bs7l.join(wp4t)
    };
    l7e.rP3x = function () {
        var Uy2x = function (ic0x, ea9R, cP8H, Wk2x) {
            var ev9m = Wk2x ? l7e.blf8X : k7d.dH9y;
            if (!ic0x || !ic0x.name) return '';
            if (!ic0x.id) return '<span class="' + ea9R + '">' + ev9m(ic0x.name) + '</span>';
            return '<a' + (cP8H ? ' target="_blank"' : '') + ' class="' + ea9R + '" href="/artist?id=' + ic0x.id + '" hidefocus="true">' + ev9m(ic0x.name) + '</a>'
        };
        return function (fT0x, V7O, wp4t, cP8H, bFO4S, Wk2x) {
            if (!fT0x || !fT0x.length) return '';
            wp4t = wp4t || '/';
            V7O = V7O || '';
            Mv9m = '';
            var em9d = [];
            for (var i = 0, i7b = [], tM4Q = [], fL9C; i < fT0x.length; ++i) {
                em9d.push(fT0x[i].name);
                if (!fT0x[i] || fT0x[i].id <= 0) {
                    tM4Q.push(fT0x[i]);
                    continue
                }
                if (k7d.gG0x(V7O)) {
                    fL9C = V7O(fT0x[i])
                } else {
                    fL9C = Uy2x(fT0x[i], V7O, cP8H, Wk2x)
                }
                if (fL9C && bFO4S && fT0x[i].tns && fT0x[i].tns.length > 0) {
                    Mv9m = k7d.dH9y(fT0x[i].tns[0]);
                    fL9C += '<span class="s-fc8" title="' + Mv9m + '"> - (' + Mv9m + ')</span>'
                }!!fL9C && i7b.push(fL9C)
            }
            for (var i = 0, fL9C; i < tM4Q.length; ++i) {
                if (k7d.gG0x(V7O)) {
                    fL9C = V7O(tM4Q[i])
                } else {
                    fL9C = Uy2x(tM4Q[i], V7O, cP8H, Wk2x)
                }
                if (fL9C && bFO4S && tM4Q[i].tns && tM4Q[i].tns.length > 0) {
                    Mv9m = k7d.dH9y(tM4Q[i].tns[0]);
                    fL9C += '<span class="s-fc8" title="' + Mv9m + '"> - (' + Mv9m + ')</span>'
                }!!fL9C && i7b.push(fL9C)
            }
            return '<span title="' + em9d.join(wp4t) + '">' + i7b.join(wp4t) + '</span>'
        }
    }();
    l7e.xF5K = function (fy9p, pC2x) {
        pC2x = pC2x || '86';
        return !!fy9p && (pC2x == '86' ? /^\d{11}$/ : /^\d+$/).test(fy9p)
    };
    l7e.cEA6u = function (fy9p) {
        if (!l7e.xF5K(fy9p)) return fy9p;
        return fy9p.substring(0, 3) + '****' + fy9p.substr(7)
    };
    l7e.jP1x = function () {
        var dg9X = /^\s+$/g;
        return function (ih0x) {
            return !ih0x || dg9X.test(ih0x)
        }
    }();
    l7e.UC2x = function () {
        var bkv8n = /[^\x00-\xfff]/g;
        return function (ih0x) {
            var cyV5a = ih0x.match(bkv8n) || [],
                dq9h = cyV5a.length;
            return ih0x.length + dq9h
        }
    }();
    l7e.BD6x = function () {
        var bkv8n = /[^\x00-\xfff]/;
        return function (ih0x, eE9v) {
            for (var i = 0, len = ih0x.length; i < len && eE9v > 0; i++) {
                if (bkv8n.test(ih0x.charAt(i))) {
                    eE9v -= 2;
                    if (eE9v < 0) {
                        break
                    }
                } else {
                    eE9v -= 1
                }
            }
            return ih0x.substring(0, i)
        }
    }();
    l7e.Bt6n = function (ih0x, eE9v, QC0x) {
        eE9v = eE9v || 10;
        QC0x = QC0x || nej.p.dr9i.engine == 'trident' && parseInt(nej.p.dr9i.release) < 5;
        if (QC0x && l7e.UC2x(ih0x) > eE9v) {
            return l7e.BD6x(ih0x, eE9v) + '...'
        } else {
            return ih0x
        }
    };
    l7e.bGV4Z = function (f7c) {
        return f7c === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(f7c.type || f7c.href || ~f7c.tabIndex)
    };
    l7e.cyU5Z = function (d7e, cP8H) {
        if (!d7e || !cP8H) return !0;
        var f7c,
            u7n = d7e.type.toLowerCase();
        if (u7n == 'mouseout') {
            f7c = d7e.relatedTarget || d7e.toElement
        } else if (u7n == 'mouseover') {
            f7c = d7e.relatedTarget || d7e.fromElement
        }
        return !f7c || f7c !== cP8H && !l7e.Mu9l(cP8H, f7c)
    };
    l7e.sM3x = function () {
        R7K = {};
        return function (f7c, dZ9Q) {
            var C7v = a6g.lM1x(f7c),
                J7C = 'hover-' + C7v;
            if (!dZ9Q || !C7v || !!R7K[J7C]) return;
            R7K[J7C] = !0;
            h7a.s7l(C7v, 'mouseover', function () {
                var bjS7L = a6g.H7A(f7c, 'hshow') || [];
                var bjP7I = a6g.H7A(f7c, 'icn-dislike') || [];
                a6g.y7r(C7v, 'z-hover');
                a6g.ba7T(bjS7L[0], 'display', 'block');
                a6g.ba7T(bjP7I[0], 'display', 'block')
            });
            h7a.s7l(C7v, 'mouseout', function () {
                var bjS7L = a6g.H7A(f7c, 'hshow') || [];
                var bjP7I = a6g.H7A(f7c, 'icn-dislike') || [];
                a6g.x7q(C7v, 'z-hover');
                a6g.ba7T(bjS7L[0], 'display', 'none');
                a6g.ba7T(bjP7I[0], 'display', 'none')
            })
        }
    }();
    l7e.bHh4l = function () {
        var by7r = {
            r: /\(|\)|\[|\]|\{|\}|\*|\+|\^|\$|\?|\!|\\|\||\./gi,
            '(': '\\(',
            ')': '\\)',
            '[': '\\[',
            ']': '\\]',
            '{': '\\{',
            '}': '\\}',
            '*': '\\*',
            '+': '\\+',
            '^': '\\^',
            $: '\\$',
            '?': '\\?',
            '!': '\\!',
            '\\': '\\\\',
            '|': '\\|',
            '.': '\\.'
        };
        return function (ih0x) {
            return k7d.BS6M(by7r, ih0x)
        }
    }();
    l7e.zj5o = function (bA7t) {
        if (k7d.Ea7T(bA7t)) bA7t = bA7t.getTime();
        var eV9M = new Date,
            ki1x = eV9M.getTime() - bA7t;
        if (ki1x <= 60000) return '刚刚';
        var mV2x = eV9M.getHours() * 3600000 + eV9M.getMinutes() * 60000 + eV9M.getSeconds() * 1000;
        if (ki1x <= mV2x) {
            if (ki1x < 3600000) {
                var Gm7f = Math.floor(ki1x / 60000);
                return Gm7f + '分钟前'
            }
            return k7d.if0x(bA7t, 'HH:mm')
        } else {
            if (ki1x < mV2x + 86400000) {
                return '昨天' + k7d.if0x(bA7t, 'HH:mm')
            } else {
                var gL0x = eV9M.getFullYear(),
                    UD2x = new Date(gL0x, 0, 1);
                var mV2x = eV9M.getTime() - UD2x.getTime();
                if (ki1x < mV2x) {
                    return k7d.if0x(bA7t, 'M月d日 HH:mm')
                }
                return k7d.if0x(bA7t, 'yyyy年M月d日')
            }
        }
    };
    l7e.cyS5X = function (bA7t) {
        if (k7d.Ea7T(bA7t)) bA7t = bA7t.getTime();
        var eV9M = new Date,
            ki1x = eV9M.getTime() - bA7t;
        var mV2x = eV9M.getHours() * 3600000 + eV9M.getMinutes() * 60000 + eV9M.getSeconds() * 1000;
        if (ki1x <= mV2x) {
            return '今天' + k7d.if0x(bA7t, 'HH:mm')
        } else {
            if (ki1x < mV2x + 86400000) {
                return '昨天' + k7d.if0x(bA7t, 'HH:mm')
            } else {
                return k7d.if0x(bA7t, 'yy-MM-dd HH:mm')
            }
        }
    };
    l7e.cyR5W = function (bA7t) {
        if (k7d.Ea7T(bA7t)) bA7t = bA7t.getTime();
        var eV9M = new Date,
            ki1x = eV9M.getTime() - bA7t;
        if (ki1x <= 60000) return '刚刚';
        var mV2x = eV9M.getHours() * 3600000 + eV9M.getMinutes() * 60000 + eV9M.getSeconds() * 1000;
        if (ki1x <= mV2x) {
            if (ki1x < 3600000) {
                var Gm7f = Math.floor(ki1x / 60000);
                return Gm7f + '分钟前'
            }
            return k7d.if0x(bA7t, 'HH:mm')
        } else {
            if (ki1x < mV2x + 86400000) {
                return '昨天' + k7d.if0x(bA7t, 'HH:mm')
            } else if (ki1x < mV2x + 86400000 * 6) {
                var gL0x = eV9M.getFullYear(),
                    UD2x = new Date(gL0x, 0, 1);
                var mV2x = eV9M.getTime() - UD2x.getTime();
                if (ki1x < mV2x) {
                    return k7d.if0x(bA7t, 'M月d日 HH:mm')
                }
                return k7d.if0x(bA7t, 'yyyy年M月d日')
            } else {
                return '最近'
            }
        }
    };
    l7e.Wh2x = function () {
        var dg9X = /\{(.*?)\}/gi;
        return function (pi2x, j7c) {
            return (pi2x || '').replace(dg9X, function ($1, $2) {
                var D7w = j7c[$2];
                return D7w == null ? $1 : D7w
            })
        }
    }();
    l7e.ff9W = function () {
        var bf7Y = Array.prototype.slice.call(arguments, 0),
            pi2x = bf7Y.shift();
        if (pi2x) {
            return pi2x.replace(/{(\d+)}/g, function ($1, $2) {
                return $2 < bf7Y.length ? bf7Y[$2] : $1
            })
        }
        return ''
    };
    l7e.Mx9o = function (i7b, ea9R, ke1x) {
        return '';
        ke1x = ke1x || ' - ';
        if (i7b && i7b.length) {
            return ke1x + (!!ea9R ? '<span class="' + ea9R + '">' + i7b[0] + '</span>' : i7b[0])
        }
        return ''
    };
    l7e.bIJ4N = function () {
        if (window.getSelection) {
            var sc3x = window.getSelection();
            if (sc3x && sc3x.focusNode && sc3x.focusNode.tagName) {
                var Cu6o = a6g.dk9b(sc3x.focusNode);
                for (var i = 0, yb5g; i < Cu6o.length; ++i) {
                    yb5g = Cu6o[i].tagName;
                    if (!yb5g) continue;
                    yb5g = yb5g.toLowerCase();
                    if (yb5g == 'textarea' || yb5g == 'input') return !0
                }
            }
        } else if (document.selection) {
            var db9S = document.selection.createRange();
            if (db9S) {
                var f7c = db9S.parentElement();
                if (f7c && f7c.tagName) {
                    var yb5g = f7c.tagName.toLowerCase();
                    if (yb5g == 'textarea' || yb5g == 'input') return !0
                }
            }
        }
        return !1
    };
    l7e.Cm6g = function (fD9u) {
        if (/^[A-Z]\:\\/i.test(fD9u)) {
            fD9u = fD9u.split('\\')
        } else {
            fD9u = fD9u.split('/')
        }
        fD9u = fD9u[fD9u.length - 1];
        return fD9u
    };
    l7e.cyQ5V = function () {
        var DQ7J = [
            13,
            17,
            34,
            19,
            18,
            21
        ];
        return function (C7v) {
            var bs7l = (C7v || '').split('_');
            return {
                type: DQ7J[bs7l[2]] || -1,
                id: bs7l[3] || ''
            }
        }
    }();
    l7e.bJz4D = function (gn0x) {
        if (!gn0x) {
            return true
        }
        for (var k in gn0x) {
            return false
        }
        return true
    };
    l7e.bin7g = function (dp9g) {
        if (!dp9g) {
            return ''
        }
        if (4 == dp9g.userType) {
            return '<sup class="icn u-icn2 u-icn2-music2"></sup>'
        } else if (dp9g.authStatus == 1) {
            return '<sup class="u-icn u-icn-1"></sup>'
        } else if (dp9g.expertTags && dp9g.expertTags.length || !l7e.bJz4D(dp9g.experts)) {
            return '<sup class="u-icn u-icn-84"></sup>'
        }
    };
    l7e.UH2x = function (hJ0x) {
        if (!hJ0x) return '';
        var dq9h = hJ0x.length,
            io0x = [];
        io0x[0] = dq9h / 3 | 0;
        io0x[1] = io0x[0] + ((dq9h - io0x[0]) / 2 | 0);
        return hJ0x.substring(0, io0x[0]) + hJ0x.substring(io0x[0], io0x[1]).replace(/\d/g, '*') + hJ0x.substring(io0x[1], dq9h)
    };
    l7e.cEB6v = function (r7k, cy8q) {
        return (r7k % cy8q + cy8q) % cy8q
    };
    l7e.bhN6H = function () {
        var DQ7J = {
            0: 'playlist',
            1: 'program',
            2: 'event',
            3: 'album',
            4: 'song',
            5: 'mv',
            6: 'topic',
            62: 'video'
        };
        return function (C7v) {
            var bs7l = (C7v || '').split('_'),
                o7h = {
                    type: DQ7J[bs7l[2]] || -1,
                    id: bs7l[3] || ''
                };
            if (o7h.type == 'event') {
                o7h.uid = bs7l[4] || '';
                return '/' + o7h.type + '?id=' + o7h.id + '&uid=' + o7h.uid
            }
            return '/' + o7h.type + '?id=' + o7h.id
        }
    }();
    l7e.bhz6t = function () {
        var DQ7J = {
            0: '歌单',
            1: '电台节目',
            2: '动态',
            3: '专辑',
            4: '单曲',
            5: 'MV',
            6: '专栏文章',
            62: '视频'
        };
        return function (C7v) {
            var bs7l = (C7v || '').split('_');
            return DQ7J[bs7l[2]] || '资源'
        }
    }();
    l7e.cyO5T = function (bv7o) {
        var qs = bv7o.length > 0 ? bv7o.substring(1) : '',
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                args[name] = value
            }
        }
        return args
    };
    l7e.bgX5c = function (oc2x, UR2x) {
        var VZ2x = 0,
            et9k = new Array;
        k7d.bd7W(oc2x, function (Y7R, r7k) {
            var cw8o = a6g.dh9Y('img');
            cw8o.src = Y7R;
            h7a.s7l(cw8o, 'load', function (r7k, d7e) {
                et9k[r7k] = 1;
                VZ2x++;
                if (VZ2x == oc2x.length) UR2x(oc2x, et9k)
            }.g7b(this, r7k));
            h7a.s7l(cw8o, 'error', function (d7e, r7k) {
                et9k[r7k] = 0;
                VZ2x++;
                if (VZ2x == oc2x.length) UR2x(oc2x, et9k)
            }.g7b(this, r7k))
        })
    };
    l7e.MD9u = function (i7b, dX9O) {
        var o7h = [];
        k7d.bd7W(i7b, function (p7i, r7k, P7I) {
            o7h.push(dX9O(p7i, r7k, P7I))
        });
        return o7h
    };
    l7e.beP5U = function (i7b, dX9O, P7I) {
        var o7h = [];
        k7d.bd7W(i7b, function (p7i, r7k) {
            if (dX9O.call(P7I, p7i, r7k, i7b)) {
                o7h.push(p7i)
            }
        });
        return o7h
    };
    l7e.bKH5M = function (bo7h) {
        return k7d.dH9y((bo7h || '').replace(/\s{2,}/g, ' ').trim())
    };
    var cyM5R = {
        r: /\<|\>/g,
        '<': '&lt;',
        '>': '&gt;'
    };
    l7e.cyJ5O = function (bo7h) {
        return k7d.BS6M(cyM5R, bo7h)
    };
    l7e.bwN1x = function (bj7c) {
        if (bj7c.transNames && bj7c.transNames.length) {
            return bj7c.transNames[0]
        } else if (bj7c.alias && bj7c.alias.length) {
            return bj7c.alias[0]
        }
    };
    l7e.bwj1x = function (Tw1x) {
        if (Tw1x) {
            return Tw1x.replace(/\n{2,}/g, '<br/><br/>').replace(/\n/g, '<br/>').replace(/(<br\/?>){2,}/g, '<br/><br/>')
        }
    };
    l7e.bta0x = function (f7c) {
        var f7c = a6g.B7u(f7c),
            cG8y = f7c && f7c.getElementsByTagName('textarea')[0],
            J7C = a6g.t7m(f7c, 'key'),
            bqR0x = a6g.t7m(f7c, 'simple') == '1',
            cyI5N = a6g.t7m(f7c, 'pvnamed') == '1',
            cyH5M = q7j.wD5I.go0x();
        if (!(f7c && cG8y && J7C)) return;
        var VR2x,
            bnl8d,
            VQ2x;
        VR2x = a6g.H7A(a6g.B7u('m-playlist'), 'j-img');
        k7d.bd7W(VR2x, function (iP0x) {
            if (!VQ2x && a6g.t7m(iP0x, 'key')) {
                VQ2x = a6g.t7m(iP0x, 'key');
                iP0x.removeAttribute('data-key')
            }
        });
        VR2x = a6g.H7A(a6g.B7u('m-playlist'), 'm-info');
        k7d.bd7W(VR2x, function (iP0x) {
            if (!bnl8d && iP0x.id && iP0x.id.indexOf('auto-id-') == 0) {
                bnl8d = iP0x.id.slice(8, 12)
            }
        });
        var D7w = cG8y.value || cG8y.defaultValue;
        if (VQ2x) {
            D7w = decodeURIComponent(k7d.cyG5L(D7w, 'param=' + bnl8d + VQ2x))
        }
        D7w = JSON.parse(D7w);
        if (cyI5N) {
            l7e.cyF5K(D7w)
        }
        if (bqR0x) {
            D7w = l7e.FZ7S(D7w)
        }
        cyH5M.uc4g(J7C, D7w);
        f7c.innerHTML = '';
        return J7C
    };
    l7e.cyC5H = function (pN2x) {
        if (!pN2x.onbeforelistload) {
            pN2x.onbeforelistload = function (d7e) {
                d7e.value = '<div class="u-load s-fc4"><i class="icn"></i> 加载中...</div>'
            }
        }
        if (!pN2x.onemptylist) {
            pN2x.onemptylist = function (d7e) {
                d7e.value = '<div class="n-nmusic"><h3 class="f-ff2"><i class="u-icn u-icn-21"></i>' + (pN2x.emptyMsg || '暂时还没有数据') + '</h3></div>'
            }
        }
        return pN2x
    };
    l7e.cyF5K = function (hw0x) {
        k7d.bd7W(hw0x, function (bN8F) {
            bN8F.privilege = bN8F.pv;
            delete bN8F.pv
        })
    };
    l7e.FZ7S = function (in0x) {
        if (k7d.eJ9A(in0x)) {
            var dE9v = [];
            k7d.bd7W(in0x, function (bqR0x) {
                dE9v.push(bMQ5V(bqR0x))
            });
            return dE9v
        } else {
            return bMQ5V(in0x)
        }

        function bMQ5V(in0x) {
            if (!in0x) return null;
            var dE9v = {
                album: in0x.al,
                alias: in0x.alia || in0x.ala || [],
                artists: in0x.ar || [],
                commentThreadId: 'R_SO_4_' + in0x.id,
                copyrightId: in0x.cp || 0,
                duration: in0x.dt || 0,
                id: in0x.id,
                mvid: in0x.mv || 0,
                name: in0x.name || '',
                cd: in0x.cd,
                position: in0x.no || 0,
                ringtone: in0x.rt,
                rtUrl: in0x.rtUrl,
                status: in0x.st || 0,
                pstatus: in0x.pst || 0,
                fee: in0x.fee || 0,
                version: in0x.v || 0,
                eq: in0x.eq,
                songType: in0x.t || 0,
                mst: in0x.mst,
                score: in0x.pop || 0,
                ftype: in0x.ftype,
                rtUrls: in0x.rtUrls,
                transNames: in0x.tns,
                privilege: in0x.privilege,
                lyrics: in0x.lyrics
            };
            return dE9v
        }
    };
    l7e.cEC6w = function () {
        var f7c = a6g.on2x('<div class="u-mask u-mask-light"></div>' + '<div class="m-opentip">' + '<div class="lay">' + '<div class="note">' + '<h3>分享打不开？</h3>' + '<p>请点击右上角<br>选择<span class="s-fc5">“分享到...”</span></p>' + '</div></div></div>');
        document.body.appendChild(f7c);
        h7a.s7l(f7c, 'click', function (d7e) {
            h7a.bh7a(d7e);
            a6g.cJ8B(f7c)
        })
    };
    l7e.iF0x = function (cH8z) {
        if (cH8z < 100000) {
            return cH8z
        } else if (cH8z < 100000000) {
            return Math.floor(cH8z / 1000) / 10 + '万'
        } else {
            return Math.floor(cH8z / 10000000) / 10 + '亿'
        }
    };
    l7e.un4r = function (cH8z, cG8y) {
        return '<i>' + (cH8z ? '(' + cH8z + ')' : cG8y) + '</i>'
    };
    l7e.bNo5t = function (u7n, hX0x) {
        var e7d = {};
        if (!k7d.ly1x(hX0x)) {
            return e7d
        }
        switch (parseInt(u7n)) {
        case 17:
            e7d.title = hX0x.name;
            e7d.author = (hX0x.radio || []).name;
            e7d.picUrl = hX0x.coverUrl;
            e7d.category = hX0x.radio.category;
            break;
        case 19:
            e7d.title = hX0x.name;
            e7d.author = l7e.xU5Z(hX0x.artists);
            e7d.authors = l7e.xU5Z(hX0x.artists, ' / ');
            e7d.picUrl = hX0x.picUrl;
            break;
        case 13:
            e7d.title = hX0x.name;
            e7d.author = (hX0x.creator || []).nickname;
            e7d.picUrl = hX0x.coverImgUrl;
            break;
        case 18:
            e7d.title = hX0x.name;
            e7d.author = l7e.xU5Z(hX0x.artists);
            e7d.picUrl = (hX0x.album || []).picUrl;
            break;
        case 20:
            e7d.title = hX0x.name;
            e7d.author = '';
            e7d.picUrl = hX0x.img1v1Url;
            break;
        case 21:
            e7d.title = hX0x.name;
            e7d.author = hX0x.artistName;
            e7d.authors = l7e.xU5Z(hX0x.artists, ' / ');
            e7d.picUrl = hX0x.newCover || hX0x.cover;
            break;
        case 70:
            e7d.title = hX0x.name;
            e7d.author = (hX0x.dj || []).nickname;
            e7d.picUrl = hX0x.picUrl;
            e7d.category = hX0x.category;
            break;
        default:
            break
        }
        return e7d
    };
    l7e.bNx5C = function () {
        return location.hostname.indexOf('igame.163.com') >= 0
    };
    l7e.Vl2x = function (ev9m, oo2x, e7d) {
        var bJ8B,
            bf7Y,
            o7h;
        var gQ0x = null;
        var uj4n = 0;
        if (!e7d) e7d = {};
        var yh5m = function () {
            uj4n = e7d.leading === false ? 0 : +(new Date);
            gQ0x = null;
            o7h = ev9m.apply(bJ8B, bf7Y);
            if (!gQ0x) bJ8B = bf7Y = null
        };
        return function () {
            var eV9M = +(new Date);
            if (!uj4n && e7d.leading === false) uj4n = eV9M;
            var HQ8I = oo2x - (eV9M - uj4n);
            bJ8B = this;
            bf7Y = arguments;
            if (HQ8I <= 0 || HQ8I > oo2x) {
                if (gQ0x) {
                    clearTimeout(gQ0x);
                    gQ0x = null
                }
                uj4n = eV9M;
                o7h = ev9m.apply(bJ8B, bf7Y);
                if (!gQ0x) bJ8B = bf7Y = null
            } else if (!gQ0x && e7d.trailing !== false) {
                gQ0x = setTimeout(yh5m, HQ8I)
            }
            return o7h
        }
    };
    l7e.MJ9A = function (ev9m, oo2x, oy2x) {
        var gQ0x,
            bf7Y,
            bJ8B,
            Cn6h,
            o7h;
        var yh5m = function () {
            var gu0x = new Date - Cn6h;
            if (gu0x < oo2x && gu0x >= 0) {
                gQ0x = setTimeout(yh5m, oo2x - gu0x)
            } else {
                gQ0x = null;
                if (!oy2x) {
                    o7h = ev9m.apply(bJ8B, bf7Y);
                    if (!gQ0x) bJ8B = bf7Y = null
                }
            }
        };
        return function () {
            bJ8B = this;
            bf7Y = arguments;
            Cn6h = new Date;
            var Vn2x = oy2x && !gQ0x;
            if (!gQ0x) gQ0x = setTimeout(yh5m, oo2x);
            if (Vn2x) {
                o7h = ev9m.apply(bJ8B, bf7Y);
                bJ8B = bf7Y = null
            }
            return o7h
        }
    };
    l7e.Vp2x = function (f7c, ht0x) {
        if (f7c) {
            var f7c = f7c.firstElementChild;
            if (f7c) {
                f7c.firstElementChild && (f7c = f7c.firstElementChild);
                f7c.setAttribute('xlink:href', '/style/pc/svg/' + ht0x)
            }
        }
    };
    l7e.bOw6q = function (em9d) {
        if (!em9d || !em9d.length) {
            return
        }
        em9d = /^#(.+?)#$/.exec(em9d)[1];
        em9d = em9d.replace(/\s/g, ' ');
        v7o.bn7g('/api/act/detail', {
            type: 'json',
            method: 'post',
            data: k7d.cC8u({
                actname: em9d
            }),
            onload: function (Q7J) {
                    if (!Q7J || Q7J.code != 200 || !Q7J.act) {
                        m7f.Z7S.L7E({
                            type: 2,
                            tip: '该话题暂未创建'
                        })
                    } else {
                        location.dispatch2('/activity?id=' + Q7J.act.actId)
                    }
                },
                onerror: function (cb8T) {
                    m7f.Z7S.L7E({
                        type: 2,
                        tip: '操作失败，请稍后再试'
                    })
                }
        })
    };
    l7e.cyA5F = function (em9d) {
        if (!em9d || !em9d.length) {
            return
        }
        var Vr2x = location.host;
        em9d = /^#(.+?)#$/.exec(em9d)[1];
        em9d = em9d.replace(/\s/g, ' ');
        v7o.bn7g('/api/act/detail', {
            type: 'json',
            method: 'post',
            data: k7d.cC8u({
                actname: em9d
            }),
            onload: function (Q7J) {
                    if (!Q7J || Q7J.code != 200 || !Q7J.act) {
                        cB8t.il0x('该话题暂未创建')
                    } else {
                        cB8t.AJ6D(Vr2x + '/activity?id=' + Q7J.act.actId)
                    }
                },
                onerror: function (cb8T) {
                    cB8t.il0x('操作失败，请稍后再试')
                }
        })
    };
    l7e.bpD9u = function (yH5M, rr3x) {
        if (!yH5M || !rr3x) return false;
        if (yH5M == rr3x) return true;
        return l7e.bpD9u(yH5M, rr3x.parentNode)
    };
    a6g.cE8w = function (bI8A, iZ0x) {
        if (!bI8A) return null;
        if (!iZ0x) return bI8A.firstChild;
        return a6g.H7A(bI8A, iZ0x)[0]
    };
    l7e.bPK6E = function (ih0x) {
        return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(ih0x)
    };
    l7e.bPP6J = function (ih0x, Vs2x) {
        Vs2x = Vs2x || '86';
        if (Vs2x == '86') return /^\d{11}$/.test(ih0x);
        return /^\d+$/.test(ih0x)
    };
    l7e.cED6x = function (ud4h) {
        if (!ud4h) {
            return '0b'
        }
        var cyx5C = [
            'Bytes',
            'KB',
            'MB',
            'GB'
        ];
        var bc7V = Math.floor(Math.log(ud4h) / Math.log(1024));
        return (ud4h / Math.pow(1024, Math.floor(bc7V))).toFixed(bc7V == 1 ? 0 : 1) + cyx5C[bc7V]
    };
    l7e.bQk6e = function (dI9z, fq9h, cyw5B) {
        if (!dI9z) return dI9z;
        var dq9h = k7d.fv9m(dI9z);
        if (dq9h <= fq9h) return dI9z;
        var boe9V = dq9h - dI9z.length,
            bjn7g = dI9z.length - boe9V;
        var fE9v = Math.ceil(fq9h / 2),
            cyv5A = fq9h,
            bQM7F = 0;
        if (boe9V < fE9v) fE9v = fq9h - boe9V;
        if (bjn7g < fq9h) fq9h = bjn7g + Math.ceil((fq9h - bjn7g) / 2);
        while (fE9v <= fq9h) {
            bQM7F = k7d.fv9m(dI9z.substr(0, fE9v));
            var bhb5g = cyv5A - bQM7F;
            if (bhb5g == 0) break;
            if (bhb5g == 1) {
                var cyt5y = k7d.fv9m(dI9z.charAt(fE9v));
                if (cyt5y == 1) {
                    fE9v++;
                    break
                } else {
                    break
                }
            }
            fE9v += Math.floor(bhb5g / 2)
        }
        return dI9z.substr(0, fE9v) + (!!cyw5B ? '' : '...')
    };
    l7e.cys5x = function (bq7j) {
        bq7j = bq7j || 10;
        var cK8C = '';
        for (var i = 0; i < bq7j; i++) {
            cK8C += String.fromCharCode(Math.round(Math.random() * 20901) + 19968)
        }
        return cK8C
    };
    var cyq5v = /([A-Za-z0-9 \.\-\(\)\!\?])/,
        cyp5u = /([\u4e00-\u9fa5\uac00-\ud7af\u3040-\u30ff\u31f0-\u31ff])/,
        cyo5t = [
            '的',
            '一',
            '是',
            '在',
            '不',
            '了',
            '有',
            '和',
            '人',
            '这',
            '中',
            '大',
            '为',
            '上',
            '个',
            '国',
            '我',
            '以',
            '要',
            '他',
            '时',
            '来',
            '用',
            '们',
            '生',
            '到',
            '作',
            '地',
            '于',
            '出',
            '就',
            '分',
            '对',
            '成',
            '会',
            '可',
            '主',
            '发',
            '年',
            '动',
            '同',
            '工',
            '也',
            '能',
            '下',
            '过',
            '子',
            '说',
            '产',
            '种',
            '面',
            '而',
            '方',
            '后',
            '多',
            '定',
            '行',
            '学',
            '法',
            '所',
            '民',
            '得',
            '经',
            '十',
            '三',
            '之',
            '进',
            '着',
            '等',
            '部',
            '度',
            '家',
            '电',
            '力',
            '里',
            '如',
            '水',
            '化',
            '高',
            '自',
            '二',
            '理',
            '起',
            '小',
            '物',
            '现',
            '实',
            '加',
            '量',
            '都',
            '两',
            '体',
            '制',
            '机',
            '当',
            '使',
            '点',
            '从',
            '业',
            '本',
            '去',
            '把',
            '性',
            '好',
            '应',
            '开',
            '它',
            '合',
            '还',
            '因',
            '由',
            '其',
            '些',
            '然',
            '前',
            '外',
            '天',
            '政',
            '四',
            '日',
            '那',
            '社',
            '义',
            '事',
            '平',
            '形',
            '相',
            '全',
            '表',
            '间',
            '样',
            '与',
            '关',
            '各',
            '重',
            '新',
            '线',
            '内',
            '数',
            '正',
            '心',
            '反',
            '你',
            '明',
            '看',
            '原',
            '又',
            '么',
            '利',
            '比',
            '或',
            '但',
            '质',
            '气',
            '第',
            '向',
            '道',
            '命',
            '此',
            '变',
            '条',
            '只',
            '没',
            '结',
            '解',
            '问',
            '意',
            '建',
            '月',
            '公',
            '无',
            '系',
            '军',
            '很',
            '情',
            '者',
            '最',
            '立',
            '代',
            '想',
            '已',
            '通',
            '并',
            '提',
            '直',
            '题',
            '党',
            '程',
            '展',
            '五',
            '果',
            '料',
            '象',
            '员',
            '革',
            '位',
            '入',
            '常',
            '文',
            '总',
            '次',
            '品',
            '式',
            '活',
            '设',
            '及',
            '管',
            '特',
            '件',
            '长',
            '求',
            '老',
            '头',
            '基',
            '资',
            '边',
            '流',
            '路',
            '级',
            '少',
            '图',
            '山',
            '统',
            '接',
            '知',
            '较',
            '将',
            '组',
            '见',
            '计',
            '别',
            '她',
            '手',
            '角',
            '期',
            '根',
            '论',
            '运',
            '农',
            '指',
            '几',
            '九',
            '区',
            '强',
            '放',
            '决',
            '西',
            '被',
            '干',
            '做',
            '必',
            '战',
            '先',
            '回',
            '则',
            '任',
            '取',
            '据',
            '处',
            '队',
            '南',
            '给',
            '色',
            '光',
            '门',
            '即',
            '保',
            '治',
            '北',
            '造',
            '百',
            '规',
            '热',
            '领',
            '七',
            '海',
            '口',
            '东',
            '导',
            '器',
            '压',
            '志',
            '世',
            '金',
            '增',
            '争',
            '济',
            '阶',
            '油',
            '思',
            '术',
            '极',
            '交',
            '受',
            '联',
            '什',
            '认',
            '六',
            '共',
            '权',
            '收',
            '证',
            '改',
            '清',
            '己',
            '美',
            '再',
            '采',
            '转',
            '更',
            '单',
            '风',
            '切',
            '打',
            '白',
            '教',
            '速',
            '花',
            '带',
            '安',
            '场',
            '身',
            '车',
            '例',
            '真',
            '务',
            '具',
            '万',
            '每',
            '目',
            '至',
            '达',
            '走',
            '积',
            '示',
            '议',
            '声',
            '报',
            '斗',
            '完',
            '类',
            '八',
            '离',
            '华',
            '名',
            '确',
            '才',
            '科',
            '张',
            '信',
            '马',
            '节',
            '话',
            '米',
            '整',
            '空',
            '元',
            '况',
            '今',
            '集',
            '温',
            '传',
            '土',
            '许',
            '步',
            '群',
            '广',
            '石',
            '记',
            '需',
            '段',
            '研',
            '界',
            '拉',
            '林',
            '律',
            '叫',
            '且',
            '究',
            '观',
            '越',
            '织',
            '装',
            '影',
            '算',
            '低',
            '持',
            '音',
            '众',
            '书',
            '布',
            '复',
            '容',
            '儿',
            '须',
            '际',
            '商',
            '非',
            '验',
            '连',
            '断',
            '深',
            '难',
            '近',
            '矿',
            '千',
            '周',
            '委',
            '素',
            '技',
            '备',
            '半',
            '办',
            '青',
            '省',
            '列',
            '习',
            '响',
            '约',
            '支',
            '般',
            '史',
            '感',
            '劳',
            '便',
            '团',
            '往',
            '酸',
            '历',
            '市',
            '克',
            '何',
            '除',
            '消',
            '构',
            '府',
            '称',
            '太',
            '准',
            '精',
            '值',
            '号',
            '率',
            '族',
            '维',
            '划',
            '选',
            '标',
            '写',
            '存',
            '候',
            '毛',
            '亲',
            '快',
            '效',
            '斯',
            '院',
            '查',
            '江',
            '型',
            '眼',
            '王',
            '按',
            '格',
            '养',
            '易',
            '置',
            '派',
            '层',
            '片',
            '始',
            '却',
            '专',
            '状',
            '育',
            '厂',
            '京',
            '识',
            '适',
            '属',
            '圆',
            '包',
            '火',
            '住',
            '调',
            '满',
            '县',
            '局',
            '照',
            '参',
            '红',
            '细',
            '引',
            '听',
            '该',
            '铁',
            '价',
            '严',
            '龙',
            '飞'
        ];
    var bRd7W = function (cyn5s) {
        var bq7j = k7d.Bj6d(1, 5),
            cym5r = Math.random() < 0.5,
            jd0x = '';
        if (cyn5s) {
            if (cym5r) {
                while (bq7j >= 0) {
                    jd0x += cyo5t[k7d.Bj6d(0, 500)];
                    bq7j--
                }
            } else {
                jd0x = l7e.cys5x(bq7j)
            }
        } else {
            jd0x = k7d.OI0x(bq7j)
        }
        return '<div class="soil">' + jd0x + '</div>'
    };
    l7e.blf8X = function (ep9g) {
        ep9g = k7d.BR6L(ep9g);
        try {
            var bq7j = ep9g.length,
                r7k = k7d.Bj6d(1, bq7j - 1);
            while (r7k < bq7j) {
                if (cyp5u.test(ep9g.charAt(r7k))) {
                    return k7d.dH9y(ep9g.slice(0, r7k)) + bRd7W(true) + k7d.dH9y(ep9g.slice(r7k))
                } else if (cyq5v.test(ep9g.charAt(r7k))) {
                    return k7d.dH9y(ep9g.slice(0, r7k)) + bRd7W() + k7d.dH9y(ep9g.slice(r7k))
                } else {
                    r7k++
                }
            }
            return k7d.dH9y(ep9g)
        } catch (e) {
            return k7d.dH9y(ep9g)
        }
    };
    l7e.bal3x = function (lv1x, my1x) {
        return '//nos.netease.com/' + lv1x + '/' + my1x
    };
    l7e.cyl5q = function (fD9u) {
        var dP9G = /(.+)(\.[^\.]+$)/.exec(fD9u);
        return dP9G ? {
            filename: dP9G[1],
            suffix: dP9G[2]
        } : {
            filename: fD9u || '',
            suffix: ''
        }
    };
    l7e.bRB7u = function (bs7l, cyj5o) {
        var dE9v = [];
        k7d.bd7W(bs7l, function (id0x) {
            dE9v.push(cyj5o(id0x))
        });
        return dE9v
    };
    var cyg5l = {
        title: 'name',
        durationms: 'duration',
        coverUrl: 'cover',
        playTime: 'playCount',
        vid: 'id',
        subscribed: 'subed'
    };
    l7e.bRT7M = function (yU5Z) {
        var j7c = NEJ.X({}, yU5Z);
        k7d.eC9t(yU5Z, function (p7i, J7C) {
            var bRW7P = cyg5l[J7C];
            if (bRW7P) {
                j7c[bRW7P] = p7i
            }
        });
        var Vx2x = yU5Z.creator || [];
        if (!k7d.eJ9A(Vx2x)) {
            Vx2x = [
                Vx2x
            ]
        }
        if (Vx2x) {
            j7c.artists = [];
            k7d.bd7W(Vx2x, function (p7i) {
                j7c.artists.push({
                    name: p7i.nickname || p7i.userName,
                    id: p7i.userId
                })
            })
        }
        if (!!yU5Z.aliaName) {
            j7c.alias = [
                yU5Z.aliaName
            ]
        }
        if (!!yU5Z.transName) {
            j7c.transNames = [
                yU5Z.transName
            ]
        }
        return j7c
    };
    l7e.cyf5k = function (Y7R) {
        return (Y7R || '').replace(/^https?:/, '')
    };
    l7e.FI7B = function (cK8C) {
        if (!k7d.fH9y(cK8C)) return cK8C;
        var dE9v = null;
        try {
            dE9v = JSON.parse(cK8C)
        } catch (_e) {}
        return dE9v
    };
    var cyd5i = '<span class="s-fc7 f-tdn">${value}</span>';
    l7e.cya5f = function (cG8y, tW4a, e7d) {
        e7d = e7d || {};
        if (!tW4a) {
            return k7d.dH9y(cG8y)
        }
        cG8y = k7d.BR6L(cG8y);
        var pr2x = [],
            bs7l = null,
            NI0x = new RegExp(l7e.bHh4l(tW4a), 'gi'),
            pi2x = e7d.tpl || cyd5i;
        while (bs7l = NI0x.exec(cG8y)) {
            var dP9G = {
                html: '',
                before: bs7l.index - 1,
                after: bs7l.index + bs7l[0].length
            };
            var EX7Q = a6g.ex9o(pi2x);
            dP9G.html = a6g.bZ8R(EX7Q, {
                value: k7d.dH9y(bs7l[0])
            });
            pr2x.push(dP9G)
        }
        var bmA8s = pr2x.length,
            kv1x = {
                before: cG8y.length - 1,
                after: 0
            },
            dE9v = '';
        for (var i = 0; i <= bmA8s; i++) {
            var hD0x,
                fQ9H;
            hD0x = (pr2x[i - 1] || kv1x).after;
            fQ9H = (pr2x[i] || kv1x).before;
            if (fQ9H >= hD0x && hD0x >= 0 && fQ9H <= cG8y.length - 1) {
                dE9v += k7d.dH9y(cG8y.substring(hD0x, fQ9H + 1))
            }
            if (pr2x[i]) {
                dE9v += pr2x[i].html
            }
        }
        return dE9v
    }
})();
(function () {
    var k7d = NEJ.P('nej.u');

    function cxZ5e() {
        var CQ6K = function (hY0x) {
            if (hY0x < -128) {
                return CQ6K(128 - (-128 - hY0x))
            } else if (hY0x >= -128 && hY0x <= 127) {
                return hY0x
            } else if (hY0x > 127) {
                return CQ6K(-129 + hY0x - 127)
            } else {
                throw new Error('1001')
            }
        };
        var cxW5b = function (hY0x, bi7b) {
            return CQ6K(hY0x + bi7b)
        };
        var cxV5a = function (VK2x, bpT9K) {
            if (VK2x == null) {
                return null
            }
            if (bpT9K == null) {
                return VK2x
            }
            var rd3x = [];
            var cxU5Z = bpT9K.length;
            for (var i = 0, bq7j = VK2x.length; i < bq7j; i++) {
                rd3x[i] = cxW5b(VK2x[i], bpT9K[i % cxU5Z])
            }
            return rd3x
        };
        var cxT5Y = function (VL2x) {
            if (VL2x == null) {
                return VL2x
            }
            var rd3x = [];
            var cxS5X = VL2x.length;
            for (var i = 0, bq7j = cxS5X; i < bq7j; i++) {
                rd3x[i] = CQ6K(0 - VL2x[i])
            }
            return rd3x
        };
        var cxP5U = function (bff5k, Vk2x) {
            bff5k = CQ6K(bff5k);
            Vk2x = CQ6K(Vk2x);
            return CQ6K(bff5k ^ Vk2x)
        };
        var bTE8w = function (Vj2x, bqq0x) {
            if (Vj2x == null || bqq0x == null || Vj2x.length != bqq0x.length) {
                return Vj2x
            }
            var rd3x = [];
            var cxM5R = Vj2x.length;
            for (var i = 0, bq7j = cxM5R; i < bq7j; i++) {
                rd3x[i] = cxP5U(Vj2x[i], bqq0x[i])
            }
            return rd3x
        };
        var bTS8K = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'a',
            'b',
            'c',
            'd',
            'e',
            'f'
        ];
        var cxL5Q = function (dv9m) {
            var MG9x = [];
            MG9x.push(bTS8K[dv9m >>> 4 & 15]);
            MG9x.push(bTS8K[dv9m & 15]);
            return MG9x.join('')
        };
        var bTX8P = function (ud4h) {
            var bq7j = ud4h.length;
            if (ud4h == null || bq7j < 0) {
                return new String('')
            }
            var MG9x = [];
            for (var i = 0; i < bq7j; i++) {
                MG9x.push(cxL5Q(ud4h[i]))
            }
            return MG9x.join('')
        };
        var bUd8V = function (VW2x) {
            if (VW2x == null || VW2x.length == 0) {
                return VW2x
            }
            var beQ5V = new String(VW2x);
            var rd3x = [];
            var bq7j = beQ5V.length / 2;
            var bi7b = 0;
            for (var i = 0; i < bq7j; i++) {
                var pg2x = parseInt(beQ5V.charAt(bi7b++), 16) << 4;
                var ph2x = parseInt(beQ5V.charAt(bi7b++), 16);
                rd3x[i] = CQ6K(pg2x + ph2x)
            }
            return rd3x
        };
        var bUi8a = function (cK8C) {
            if (cK8C == null || cK8C == undefined) {
                return cK8C
            }
            var UM2x = encodeURIComponent(cK8C);
            var ud4h = [];
            var bUu8m = UM2x.length;
            for (var i = 0; i < bUu8m; i++) {
                if (UM2x.charAt(i) == '%') {
                    if (i + 2 < bUu8m) {
                        ud4h.push(bUd8V(UM2x.charAt(++i) + '' + UM2x.charAt(++i))[0])
                    } else {
                        throw new Error('1009')
                    }
                } else {
                    ud4h.push(UM2x.charCodeAt(i))
                }
            }
            return ud4h
        };
        var cxK5P = function (xy5D) {
            var bc7V = 0;
            bc7V += (xy5D[0] & 255) << 24;
            bc7V += (xy5D[1] & 255) << 16;
            bc7V += (xy5D[2] & 255) << 8;
            bc7V += xy5D[3] & 255;
            return bc7V
        };
        var cEG6A = function (bc7V) {
            var xy5D = [];
            xy5D[0] = bc7V >>> 24 & 255;
            xy5D[1] = bc7V >>> 16 & 255;
            xy5D[2] = bc7V >>> 8 & 255;
            xy5D[3] = bc7V & 255;
            return xy5D
        };
        var cxG5L = function (cR8J, bhi6c, bq7j) {
            var dE9v = [];
            if (cR8J == null || cR8J.length == 0) {
                return dE9v
            }
            if (cR8J.length < bq7j) {
                throw new Error('1003')
            }
            for (var i = 0; i < bq7j; i++) {
                dE9v[i] = cR8J[bhi6c + i]
            }
            return dE9v
        };
        var bhD6x = function (cR8J, bhi6c, sD3x, cxD5I, bq7j) {
            if (cR8J == null || cR8J.length == 0) {
                return sD3x
            }
            if (sD3x == null) {
                throw new Error('1004')
            }
            if (cR8J.length < bq7j) {
                throw new Error('1003')
            }
            for (var i = 0; i < bq7j; i++) {
                sD3x[cxD5I + i] = cR8J[bhi6c + i]
            }
            return sD3x
        };
        var cxy5D = function (bq7j) {
            var bs7l = [];
            for (var i = 0; i < bq7j; i++) {
                bs7l[i] = 0
            }
            return bs7l
        };
        var cxv5A = [
            82,
            9,
            106, -43,
            48,
            54, -91,
            56, -65,
            64, -93, -98, -127, -13, -41, -5,
            124, -29,
            57, -126, -101,
            47, -1, -121,
            52, -114,
            67,
            68, -60, -34, -23, -53,
            84,
            123, -108,
            50, -90, -62,
            35,
            61, -18,
            76, -107,
            11,
            66, -6, -61,
            78,
            8,
            46, -95,
            102,
            40, -39,
            36, -78,
            118,
            91, -94,
            73,
            109, -117, -47,
            37,
            114, -8, -10,
            100, -122,
            104, -104,
            22, -44, -92,
            92, -52,
            93,
            101, -74, -110,
            108,
            112,
            72,
            80, -3, -19, -71, -38,
            94,
            21,
            70,
            87, -89, -115, -99, -124, -112, -40, -85,
            0, -116, -68, -45,
            10, -9, -28,
            88,
            5, -72, -77,
            69,
            6, -48,
            44,
            30, -113, -54,
            63,
            15,
            2, -63, -81, -67,
            3,
            1,
            19, -118,
            107,
            58, -111,
            17,
            65,
            79,
            103, -36, -22, -105, -14, -49, -50, -16, -76, -26,
            115, -106, -84,
            116,
            34, -25, -83,
            53, -123, -30, -7,
            55, -24,
            28,
            117, -33,
            110,
            71, -15,
            26,
            113,
            29,
            41, -59, -119,
            111, -73,
            98,
            14, -86,
            24, -66,
            27, -4,
            86,
            62,
            75, -58, -46,
            121,
            32, -102, -37, -64, -2,
            120, -51,
            90, -12,
            31, -35, -88,
            51, -120,
            7, -57,
            49, -79,
            18,
            16,
            89,
            39, -128, -20,
            95,
            96,
            81,
            127, -87,
            25, -75,
            74,
            13,
            45, -27,
            122, -97, -109, -55, -100, -17, -96, -32,
            59,
            77, -82,
            42, -11, -80, -56, -21, -69,
            60, -125,
            83, -103,
            97,
            23,
            43,
            4,
            126, -70,
            119, -42,
            38, -31,
            105,
            20,
            99,
            85,
            33,
            12,
            125
        ];
        var Mw9n = 64;
        var Wg2x = 64;
        var bxK2x = 4;
        var cxu5z = function (qV3x) {
            var bya2x = [];
            if (qV3x == null || qV3x == undefined || qV3x.length == 0) {
                return cxy5D(Wg2x)
            }
            if (qV3x.length >= Wg2x) {
                return cxG5L(qV3x, 0, Wg2x)
            } else {
                for (var i = 0; i < Wg2x; i++) {
                    bya2x[i] = qV3x[i % qV3x.length]
                }
            }
            return bya2x
        };
        var cxt5y = function (Wi2x) {
            if (Wi2x == null || Wi2x.length % Mw9n != 0) {
                throw new Error('1005')
            }
            var bkD8v = [];
            var bi7b = 0;
            var cxs5x = Wi2x.length / Mw9n;
            for (var i = 0; i < cxs5x; i++) {
                bkD8v[i] = [];
                for (var j = 0; j < Mw9n; j++) {
                    bkD8v[i][j] = Wi2x[bi7b++]
                }
            }
            return bkD8v
        };
        var cxr5w = function (byl2x) {
            var pg2x = byl2x >>> 4 & 15;
            var ph2x = byl2x & 15;
            var bi7b = pg2x * 16 + ph2x;
            return cxv5A[bi7b]
        };
        var byp2x = function (blS8K) {
            if (blS8K == null) {
                return null
            }
            var bys2x = [];
            for (var i = 0, bq7j = blS8K.length; i < bq7j; i++) {
                bys2x[i] = cxr5w(blS8K[i])
            }
            return bys2x
        };
        var byx2x = function (Mr9i, qV3x) {
            if (Mr9i == null) {
                return null
            }
            if (Mr9i.length == 0) {
                return []
            }
            if (Mr9i.length % Mw9n != 0) {
                throw new Error('1005')
            }
            qV3x = cxu5z(qV3x);
            var bpL9C = qV3x;
            var bqw0x = cxt5y(Mr9i);
            var Uo2x = [];
            var cxq5v = bqw0x.length;
            for (var i = 0; i < cxq5v; i++) {
                var bqx0x = byp2x(bqw0x[i]);
                bqx0x = byp2x(bqx0x);
                var bqy0x = bTE8w(bqx0x, bpL9C);
                var cxp5u = cxV5a(bqy0x, cxT5Y(bpL9C));
                bqy0x = bTE8w(cxp5u, qV3x);
                bhD6x(bqy0x, 0, Uo2x, i * Mw9n, Mw9n);
                bpL9C = bqw0x[i]
            }
            var bzj2x = [];
            bhD6x(Uo2x, Uo2x.length - bxK2x, bzj2x, 0, bxK2x);
            var bq7j = cxK5P(bzj2x);
            if (bq7j > Uo2x.length) {
                throw new Error('1006')
            }
            var rd3x = [];
            bhD6x(Uo2x, 0, rd3x, 0, bq7j);
            return rd3x
        };
        var cxo5t = function (Wy2x, J7C) {
            if (Wy2x == null) {
                return null
            }
            var bzs2x = new String(Wy2x);
            if (bzs2x.length == 0) {
                return []
            }
            var Mr9i = bUd8V(bzs2x);
            if (J7C == null || J7C == undefined) {
                throw new Error('1007')
            }
            var qV3x = bUi8a(J7C);
            return byx2x(Mr9i, qV3x)
        };
        this.cxn5s = function (Wy2x, J7C) {
            var btn1x = cxo5t(Wy2x, J7C);
            var FE7x = new String(bTX8P(btn1x));
            var xL5Q = [];
            var btH1x = FE7x.length / 2;
            var bi7b = 0;
            for (var i = 0; i < btH1x; i++) {
                xL5Q.push('%');
                xL5Q.push(FE7x.charAt(bi7b++));
                xL5Q.push(FE7x.charAt(bi7b++))
            }
            return xL5Q.join('')
        };
        k7d.cyG5L = function (buO1x, J7C) {
            return k7d.cxm5r(k7d.cDa6U(buO1x), J7C)
        };
        k7d.cxm5r = function (buO1x, J7C) {
            var btn1x = byx2x(buO1x, bUi8a(J7C));
            var FE7x = new String(bTX8P(btn1x));
            var xL5Q = [];
            var btH1x = FE7x.length / 2;
            var bi7b = 0;
            for (var i = 0; i < btH1x; i++) {
                xL5Q.push('%');
                xL5Q.push(FE7x.charAt(bi7b++));
                xL5Q.push(FE7x.charAt(bi7b++))
            }
            return xL5Q.join('')
        }
    }
    window.settmusic = (new cxZ5e).cxn5s
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        I7B = c7f('nej.ut'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        J7C = 'Search-tracks_',
        b7g;
    q7j.ff9W({
        'search-suggest': {
            url: '/api/search/suggest/web',
            type: 'POST',
            format: function (Q7J) {
                    return Q7J
                },
                onerror: function (Q7J, e7d) {
                    if (Q7J.code == 407) {
                        e7d.onForbidden()
                    }
                }
        },
        'search-multimatch': {
            url: '/api/search/suggest/multimatch',
            type: 'GET'
        },
        'search-list': {
            url: '/api/cloudsearch/get/web',
            type: 'post',
            noescape: true,
            filter: function (e7d, bg7Z) {
                    window.log && window.log('searchkeywordclient', {
                        type: this.cxl5q(parseInt(e7d.data.type)) || 'suggest',
                        keyword: e7d.data.s,
                        offset: e7d.offset
                    })
                },
                format: function (Q7J, e7d) {
                    if (Q7J.abroad) {
                        try {
                            Q7J.result = JSON.parse(decodeURIComponent(settmusic(Q7J.result, q7j.sk)))
                        } catch (e) {}
                    }
                    Q7J.result = Q7J.result || {};
                    var i7b,
                        cy8q,
                        hO0x = [],
                        qm3x = e7d.data.s || '',
                        fY0x = e7d.data.limit,
                        u7n = parseInt(e7d.data.type) || 1,
                        o7h = Q7J.result;
                    switch (u7n) {
                    case 1:
                        i7b = this.bzK2x(o7h.songs, e7d.data.hlpretag, e7d.data.hlposttag);
                        cy8q = o7h.songCount;
                        break;
                    case 10:
                        i7b = o7h.albums;
                        cy8q = o7h.albumCount;
                        break;
                    case 100:
                        i7b = o7h.artists;
                        cy8q = o7h.artistCount;
                        break;
                    case 1000:
                        i7b = o7h.playlists;
                        cy8q = o7h.playlistCount;
                        break;
                    case 1002:
                        i7b = o7h.userprofiles;
                        cy8q = o7h.userprofileCount;
                        break;
                    case 1004:
                        i7b = o7h.mvs;
                        cy8q = o7h.mvCount;
                        break;
                    case 1014:
                        i7b = l7e.bRB7u(o7h.videos, l7e.bRT7M);
                        cy8q = o7h.videoCount;
                        break;
                    case 1006:
                        i7b = this.bzK2x(o7h.songs, e7d.data.hlpretag, e7d.data.hlposttag);
                        cy8q = o7h.songCount;
                        break;
                    case 1009:
                        var qw3x = o7h.djRadios;
                        if (!!qw3x) {
                            k7d.bd7W(qw3x, function (D7w, r7k, cxk5p) {
                                D7w.xid = D7w.id;
                                D7w.id = D7w.id + '_rad'
                            });
                            if (qw3x.length) {
                                this.uc4g('radio_search-' + e7d.data.s, qw3x)
                            }
                        }
                        cy8q = Math.min(o7h.djprogramCount, 500);
                        i7b = o7h.djprograms || [];
                        if (e7d.data.isPub) {
                            k7d.nz2x(qw3x, function (D7w, r7k, cxk5p) {
                                D7w.stype = 1;
                                i7b.unshift(D7w)
                            });
                            cy8q = Math.min(i7b.length, 500)
                        }
                        break
                    }
                    this.z7s('onsearchload', Q7J);
                    if (i7b && i7b.length) {
                        for (var i = 0; i < fY0x; i++) {
                            if (i < i7b.length) {
                                hO0x.push(i7b[i])
                            } else {
                                hO0x.push(null)
                            }
                        }
                    }
                    return {
                        more: !0,
                        total: Math.min(cy8q || 0, qm3x.length < 3 ? 500 : 5000),
                        list: hO0x
                    }
                },
                onerror: function (Q7J, e7d) {
                    e7d.onload(e7d, []);
                    if (k7d.gG0x(e7d.onerror)) {
                        e7d.onerror(Q7J)
                    }
                }
        }
    });
    q7j.FT7M = NEJ.C();
    b7g = q7j.FT7M.N7G(q7j.hE0x);
    b7g.cx8p = function () {
        this.cF8x()
    };
    b7g.cxj5o = function (J7C, e7d) {
        if (!J7C) return;
        if (!!this.bzR2x) v7o.kf1x(this.bzR2x);
        this.bzR2x = this.cp8h('search-suggest', NEJ.X({
            data: {
                s: J7C,
                limit: 8
            }
        }, e7d))
    };
    b7g.cxi5n = function (J7C, e7d) {
        if (!J7C) return;
        this.cp8h('search-multimatch', NEJ.X({
            data: {
                s: J7C
            }
        }, e7d))
    };
    b7g.bzK2x = function () {
        var cxf5k = function (hy0x, bzU2x, bzZ2x) {
            var cxe5j = hy0x.match(new RegExp(bzU2x + '(.+?)' + bzZ2x, 'gi')),
                cH8z = 0;
            k7d.bd7W(cxe5j, function (p7i) {
                cH8z += p7i.replace(new RegExp(bzU2x, 'g'), '').replace(new RegExp(bzZ2x, 'g'), '').length
            });
            return cH8z
        };
        return function (js1x, cxd5i, cxc5h) {
            var bAq2x = [];
            k7d.bd7W(js1x, function (bj7c, bc7V) {
                bj7c = l7e.FZ7S(bj7c);
                var WH2x = bj7c.lyrics || [],
                    dq9h = WH2x.length,
                    jW1x = 0,
                    cy8q = 4,
                    WJ2x = {
                        l: 0,
                        v: 0
                    },
                    bfH5M;
                if (dq9h > 4) {
                    k7d.bd7W(WH2x, function (hy0x, r7k) {
                        var bAA2x = cxf5k(hy0x, cxd5i, cxc5h);
                        if (bAA2x > WJ2x.v) {
                            WJ2x.v = bAA2x;
                            WJ2x.l = r7k
                        }
                    });
                    jW1x = WJ2x.l;
                    jW1x = Math.max(jW1x, 0);
                    bfH5M = dq9h - jW1x - 4;
                    if (bfH5M < 0) jW1x += bfH5M;
                    bj7c.lrcAbstractEnd = jW1x + cy8q - 1
                } else {
                    bj7c.lrcAbstractEnd = dq9h - 1
                }
                bj7c.lrcAbstractStart = jW1x;
                bj7c.indexId = (WH2x && WH2x.length ? 'L' : 'NL') + bj7c.id;
                bAq2x.push(bj7c)
            });
            return bAq2x
        }
    }();
    b7g.cxl5q = function (u7n) {
        switch (u7n) {
        case 1:
            return 'song';
            break;
        case 100:
            return 'artist';
            break;
        case 10:
            return 'album';
            break;
        case 1004:
            return 'mv';
            break;
        case 1014:
            return 'video';
            break;
        case 1006:
            return 'lyric';
            break;
        case 1000:
            return 'list';
            break;
        case 1009:
            return 'djradio';
            break;
        case 1002:
            return 'user';
            break;
        default:
            return 'suggest';
            break
        }
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        v7o = c7f('nej.j'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        E7x = c7f('nm.m'),
        m7f = c7f('nm.l'),
        dx9o = c7f('nm.i'),
        M7F = c7f('nm.m.sch'),
        b7g,
        K7D;
    var WM2x = {
        songs: 1,
        artists: 100,
        albums: 10,
        playlists: 1000,
        mvs: 1004
    };
    M7F.TM1x = NEJ.C();
    b7g = M7F.TM1x.N7G(I7B.cI8A);
    b7g.cx8p = function (f7c) {
        this.cF8x();
        this.bW8O(f7c);
        this.S7L = q7j.FT7M.go0x()
    };
    b7g.bW8O = function (f7c) {
        this.n7g = f7c;
        var i7b = a6g.H7A(f7c, 'j-flag');
        this.eU9L = i7b[0];
        this.bfS5X = i7b[1];
        this.cs8k = i7b[2];
        this.nt2x = i7b[3];
        h7a.s7l(this.eU9L, 'input', this.gj0x.g7b(this));
        h7a.s7l(this.eU9L, 'keyup', this.gj0x.g7b(this));
        h7a.s7l(this.eU9L, 'focus', this.gO0x.g7b(this));
        h7a.s7l(this.bfS5X, 'click', this.gO0x.g7b(this));
        h7a.s7l(this.eU9L, 'blur', this.bgc5h.g7b(this));
        h7a.s7l(this.cs8k, 'click', this.WQ2x.g7b(this));
        h7a.s7l(this.n7g, 'keydown', this.bgZ5e.g7b(this));
        h7a.s7l(this.n7g, 'keypress', this.WR2x.g7b(this));
        h7a.s7l(this.nt2x, 'mouseover', this.Tv1x.g7b(this));
        h7a.s7l(this.nt2x, 'mouseout', this.Tv1x.g7b(this));
        if (this.eU9L.value) {
            this.eU9L.value = ''
        }
        if (this.eU9L.style.opacity != null) {
            this.eU9L.style.opacity = 1
        }
    };
    b7g.gj0x = function (d7e) {
        if (d7e.type == 'keyup' && d7e.keyCode == 8 || d7e.keyCode == 46) {
            this.GD8v()
        } else if (d7e.type == 'input' || d7e.type == 'propertychange') {
            setTimeout(this.GD8v.g7b(this), 0)
        }
    };
    b7g.gO0x = function () {
        this.yn5s(this.bfS5X, !1);
        a6g.y7r(this.n7g, 'm-srch-fcs');
        this.eU9L.focus();
        this.GD8v();
        a6g.y7r((a6g.H7A('g-topbar', 'j-showoff') || [])[0], 'f-hide')
    };
    b7g.bgc5h = function () {
        if (!this.eU9L.value) {
            this.yn5s(this.bfS5X, !0)
        }
        var GF8x = a6g.H7A(this.nt2x, 'slt');
        if (this.WV2x(this.nt2x) && GF8x.length > 0 && a6g.t7m(GF8x[0], 'type')) {
            var ht0x = GF8x[0].href;
            if (/#\/(song|album|artist|playlist)\?id=(\d+)/.test(ht0x)) {
                window.log('search', {
                    rid: RegExp.$2,
                    type: RegExp.$1,
                    keyword: this.eU9L.value
                })
            }
            this.bhJ6D(GF8x[0].href)
        }
        this.yn5s(this.nt2x, !1);
        a6g.x7q(this.n7g, 'm-srch-fcs')
    };
    b7g.yn5s = function (f7c, mb1x) {
        a6g.ba7T(f7c, 'display', !mb1x ? 'none' : '')
    };
    b7g.WV2x = function (f7c) {
        return a6g.de9V(f7c, 'display') != 'none'
    };
    b7g.GD8v = function () {
        var cxb5g = function (ih0x) {
            ih0x = k7d.BR6L(ih0x);
            var eE9v = this.n7g.clientWidth > 250 ? 41 : 17;
            if (l7e.UC2x(ih0x) > eE9v) {
                ih0x = l7e.BD6x(ih0x, eE9v) + '...'
            }
            return k7d.dH9y(ih0x)
        };
        var WW2x = function (o7h) {
            return o7h.songs && o7h.songs.length || o7h.albums && o7h.albums.length || o7h.artists && o7h.artists.length || o7h.playlists && o7h.playlists.length
        };
        var sw3x = function (tW4a, d7e) {
            if (!l7e.bGV4Z(this.eU9L) || l7e.jP1x(this.eU9L.value)) {
                this.yn5s(this.nt2x, !1);
                return
            }
            d7e.keyword = k7d.dH9y(tW4a);
            var dQ9H = a6g.bZ8R('m-search-suggest', d7e, {
                    mark: l7e.cya5f.ey9p(this, tW4a),
                    cutStr: cxb5g.g7b(this)
                }),
                tz4D = d7e.result.order;
            this.nt2x.innerHTML = dQ9H;
            this.yn5s(this.nt2x, WW2x(d7e.result) ? !0 : !1);
            if (!!tz4D && !!tz4D.length && WM2x[tz4D[0]]) {
                this.bhQ6K = {
                    keyword: tW4a,
                    type: WM2x[tz4D[0]]
                }
            }
        };
        var cxa5f = function () {
            this.yn5s(this.nt2x, !1);
            return
        };
        return function () {
            var D7w = this.eU9L.value;
            if (l7e.jP1x(D7w)) {
                this.yn5s(this.nt2x, !1);
                return
            }
            this.S7L.cxj5o(D7w, {
                onload: sw3x.g7b(this, D7w),
                onForbidden: cxa5f.g7b(this)
            })
        }
    }();
    b7g.WR2x = function (d7e) {
        if (d7e.keyCode != 13) return;
        var GF8x = a6g.H7A(this.nt2x, 'slt');
        if (this.WV2x(this.nt2x) && GF8x.length > 0) {
            this.bhJ6D(GF8x[0].href);
            this.yn5s(this.nt2x, !1);
            return
        }
        this.WQ2x();
        this.yn5s(this.nt2x, !1)
    };
    b7g.bgZ5e = function (d7e) {
        if (!this.WV2x(this.nt2x)) return;
        var i7b = a6g.H7A(this.nt2x, 'xtag'),
            dq9h = i7b.length,
            r7k = k7d.dj9a(i7b, function (p7i) {
                return a6g.bE8w(p7i, 'slt')
            });
        switch (d7e.keyCode) {
        case 38:
            if (r7k >= 0) a6g.x7q(i7b[r7k], 'slt');
            a6g.y7r(i7b[r7k <= 0 ? dq9h - 1 : r7k - 1], 'slt');
            break;
        case 40:
            if (r7k >= 0) a6g.x7q(i7b[r7k], 'slt');
            a6g.y7r(i7b[(r7k + 1) % dq9h], 'slt');
            break
        }
    };
    b7g.Tv1x = function (d7e) {
        if (!this.WV2x(this.nt2x)) return;
        var Tk1x,
            F7y = h7a.W7P(d7e),
            i7b = a6g.H7A(this.nt2x, 'xtag');
        if (F7y.tagName.toLowerCase() == 'a') Tk1x = F7y;
        else if (F7y.parentNode.tagName.toLowerCase() == 'a') Tk1x = F7y.parentNode;
        if (!Tk1x) return;
        k7d.bd7W(i7b, function (p7i) {
            a6g.x7q(p7i, 'slt');
            a6g.t7m(p7i, 'type', '')
        });
        if (d7e.type == 'mouseout') return;
        a6g.y7r(Tk1x, 'slt');
        a6g.t7m(Tk1x, 'type', 'mouse')
    };
    b7g.WQ2x = function () {
        var dO9F = location.hash,
            r7k = dO9F.indexOf('?'),
            bv7o = k7d.hu0x(dO9F.substring(r7k + 1));
        bv7o.s = this.eU9L.value;
        if (l7e.jP1x(bv7o.s)) return;
        if (!bv7o.type && this.bhQ6K && this.bhQ6K.keyword == bv7o.s) {
            bv7o.type = this.bhQ6K.type
        }
        this.bhJ6D('/search/#/?' + k7d.cC8u(bv7o));
        this.eU9L.blur()
    };
    b7g.bhJ6D = function (Y7R) {
        if (location.dispatch2) {
            location.dispatch2(Y7R)
        } else {
            location.href = Y7R
        }
    };
    M7F.TM1x.cwZ5e = function () {
        var i7b = a6g.H7A(document.body, 'j-suggest');
        k7d.bd7W(i7b, function (p7i) {
            new M7F.TM1x(p7i)
        })
    };
    M7F.TM1x.cwZ5e()
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        I7B = c7f('nej.ut'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        q7j = c7f('nm.d'),
        b7g;
    q7j.ff9W({
        'mv_artist-list': {
            url: '/api/artist/mvs',
            type: 'get',
            format: function (Q7J) {
                return {
                    total: Q7J.size || 0,
                    list: Q7J.mvs || []
                }
            }
        },
        'album_artist-list': {
            url: '/api/artist/albums/{id}',
            type: 'get',
            format: function (Q7J) {
                return {
                    total: Q7J.size || 0,
                    list: Q7J.hotAlbums || []
                }
            }
        },
        'ydcailing_post-list': {
            url: '/api/cailing/all',
            type: 'POST',
            format: function (Q7J) {
                return Q7J.result.songs
            }
        },
        'wo-list': {
            url: '/api/unicom/wo/content',
            format: function (Q7J, e7d) {
                if (e7d.offset == 0) {
                    var pD2x = Q7J.data[0];
                    this.z7s('onfirstload', pD2x);
                    Q7J.data.splice(0, 1);
                    return Q7J.data
                } else {
                    return Q7J.data
                }
            }
        }
    });
    q7j.GS8K = NEJ.C();
    b7g = q7j.GS8K.N7G(q7j.hE0x);
    b7g.cx8p = function () {
        this.cF8x()
    };
    b7g.bhS6M = function () {
        var sT3x = 'LOCAL_FLAG';
        return function (u7n, cwY5d) {
            var j7c = this.Hw8o(sT3x, {});
            if (j7c[u7n]) {
                return true
            } else {
                if (!cwY5d) {
                    j7c[u7n] = true;
                    this.wg4k(sT3x, j7c)
                }
                return false
            }
        }
    }()
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut'),
        bio7h;
    if (!!O7H.ot2x) return;
    O7H.ot2x = NEJ.C();
    bio7h = O7H.ot2x.N7G(O7H.cI8A);
    bio7h.bk7d = function () {
        var cwW5b = function (d7e) {
            d7e.matched = d7e.source == d7e.target
        };
        return function (e7d) {
            e7d.oncheck = e7d.oncheck || cwW5b;
            this.bm7f(e7d);
            this.bU8M = e7d.list;
            this.jo1x = e7d.dataset || 'id';
            this.kT1x = e7d.selected || 'js-selected'
        }
    }();
    bio7h.oq2x = function (D7w) {
        var F7y,
            d7e = {
                target: D7w
            };
        k7d.bd7W(this.bU8M, function (f7c) {
            delete d7e.matched;
            d7e.source = a6g.t7m(f7c, this.jo1x);
            this.z7s('oncheck', d7e);
            if (!d7e.matched) {
                a6g.x7q(f7c, this.kT1x)
            } else {
                F7y = f7c;
                a6g.y7r(f7c, this.kT1x)
            }
        }, this);
        return F7y
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        O7H = c7f('nej.ut'),
        pE2x;
    if (!!O7H.df9W) return;
    O7H.df9W = NEJ.C();
    pE2x = O7H.df9W.N7G(O7H.cI8A);
    pE2x.cx8p = function () {
        this.iX0x = {};
        this.cF8x();
        this.bL8D()
    };
    pE2x.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.biz7s = e7d.umi || '';
        this.AF6z = e7d.dispatcher;
        this.LX9O = e7d.composite || bb7U;
        this.boU9L({
            onshow: this.fa9R.g7b(this),
            onhide: this.ko1x.g7b(this),
            onrefresh: this.eF9w.g7b(this),
            onmessage: this.ra3x.g7b(this),
            onbeforehide: this.cwV5a.g7b(this)
        })
    };
    pE2x.bD8v = function () {
        delete this.biz7s;
        this.iX0x = {};
        this.bG8y()
    };
    pE2x.uu4y = function (d7e) {
        if (!!d7e) d7e.stopped = !0
    };
    pE2x.bL8D = br7k;
    pE2x.fa9R = br7k;
    pE2x.ko1x = br7k;
    pE2x.eF9w = br7k;
    pE2x.ra3x = br7k;
    pE2x.cwV5a = br7k;
    pE2x.mY2x = function (nq2x, bH8z, fg9X) {
        this.AF6z.biB7u({
            to: nq2x,
            mode: fg9X || 0,
            data: bH8z,
            from: this.biz7s
        })
    };
    pE2x.cEH6B = function (u7n, j7c) {
        this.AF6z.Bv6p(u7n, {
            from: this.biz7s,
            data: j7c
        })
    };
    pE2x.cEI6C = function () {
        this.AF6z.mv1x.apply(this.AF6z, arguments)
    };
    pE2x.cwP5U = function () {
        return this.iX0x
    };
    a6g.Xc2x = function () {
        if (!!window.dispatcher) {
            dispatcher.bDO3x.apply(dispatcher, arguments)
        }
    }
})();
(function () {
    var c7f = NEJ.P,
        br7k = NEJ.F,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut'),
        Ai6c;
    if (!!O7H.du9l) return;
    O7H.du9l = NEJ.C();
    Ai6c = O7H.du9l.N7G(O7H.df9W);
    Ai6c.cwO5T = function (e7d) {
        var bI8A;
        if (!bI8A) {
            var j7c = e7d.input || bb7U;
            bI8A = a6g.B7u(j7c.parent)
        }
        if (!bI8A) {
            var j7c = e7d.data || bb7U;
            bI8A = a6g.B7u(j7c.parent)
        }
        if (!bI8A) {
            bI8A = a6g.B7u(e7d.parent)
        }
        return bI8A
    };
    Ai6c.fa9R = function (e7d) {
        var bI8A = this.cwO5T(e7d);
        if (!!bI8A && !!this.n7g) bI8A.appendChild(this.n7g);
        this.gE0x(e7d);
        this.bDV3x('onshow', e7d);
        this.eF9w(e7d)
    };
    Ai6c.eF9w = function (e7d) {
        this.gt0x(e7d);
        this.bDV3x('onrefresh', e7d)
    };
    Ai6c.ko1x = function () {
        this.ls1x();
        this.cwN5S();
        a6g.mT2x(this.n7g)
    };
    Ai6c.bEb3x = function () {
        var gK0x = /^onshow|onrefresh|delay$/;
        return function (cl8d) {
            return gK0x.test(cl8d)
        }
    }();
    Ai6c.bEd3x = br7k;
    Ai6c.bDV3x = function () {
        var bEe3x = function (bv7o, e7d, cl8d, py2x) {
            if (this.bEb3x(py2x)) return;
            if (!!bv7o) cl8d += (cl8d.indexOf('?') > 1 ? '&' : '?') + bv7o;
            var dm9d = this.bEd3x(py2x, e7d) || {};
            dm9d.location = e7d;
            dm9d.parent = this.iX0x[py2x];
            this.AF6z.iu0x(cl8d, {
                input: dm9d
            })
        };
        return function (u7n, e7d) {
            if (!e7d.nodelay) {
                if (!!this.LX9O.delay) return;
                var bEh3x = this.LX9O[u7n] || bb7U;
                if (bEh3x.delay) return
            }
            var bv7o = k7d.cC8u(e7d.param) || '';
            if (u7n == 'onrefresh') {
                k7d.eC9t(this.LX9O, bEe3x.g7b(this, bv7o, e7d))
            }
            k7d.eC9t(bEh3x, bEe3x.g7b(this, bv7o, e7d))
        }
    }();
    Ai6c.cwN5S = function () {
        var CS6M = function (cl8d, py2x) {
            if (!this.bEb3x(py2x)) this.AF6z.bt7m(cl8d)
        };
        return function () {
            k7d.eC9t(this.LX9O, CS6M, this);
            k7d.eC9t(this.LX9O.onshow, CS6M, this);
            k7d.eC9t(this.LX9O.onrefresh, CS6M, this)
        }
    }()
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        I7B = c7f('nej.ut'),
        v7o = c7f('nej.j'),
        k7d = c7f('nej.u'),
        E7x = c7f('nm.m'),
        l7e = c7f('nm.x'),
        q7j = c7f('nm.d'),
        b7g,
        K7D;
    E7x.SZ1x = NEJ.C();
    b7g = E7x.SZ1x.N7G(I7B.cI8A);
    b7g.cx8p = function () {
        this.cF8x();
        this.n7g = a6g.B7u('g-topbar');
        var i7b = a6g.H7A(this.n7g, 'j-tflag');
        this.bjf7Y = i7b[0];
        this.HR8J = i7b[1];
        this.bEs3x = i7b[2];
        this.bjr7k = i7b[3];
        this.cwM5R = I7B.ot2x.A7t({
            list: this.bjf7Y.getElementsByTagName('a'),
            selected: 'z-slt',
            dataset: 'module'
        });
        this.bjw7p = I7B.ot2x.A7t({
            list: this.bjr7k.getElementsByTagName('a'),
            selected: 'z-slt',
            dataset: 'module'
        });
        this.bX8P([
            [this.n7g,
                'click',
                this.ST1x.g7b(this)
            ],
            [
                this.HR8J,
                'click',
                this.cL8D.g7b(this)
            ],
            [
                this.HR8J,
                'mouseout',
                this.bEz3x.g7b(this, 0)
            ],
            [
                this.HR8J,
                'mouseover',
                this.bEz3x.g7b(this, 1)
            ]
        ]);
        window.scrollTopbar = this.cwL5Q.g7b(this);
        window.matchNav = this.bEE3x.g7b(this);
        window.polling = this.ux4B.g7b(this);
        this.bjO7H = q7j.GS8K.A7t();
        this.cwK5P();
        this.LN9E();
        var bv7o = k7d.hu0x(location.href.split('?')[1]) || {};
        if (bv7o.market) {
            a6g.B7u('topbar-download-link').href = '/download?market=' + bv7o.market
        }
        var bkA8s = a6g.H7A(this.n7g, 'j-showoff');
        if (bkA8s && !this.bjO7H.bhS6M('newMvSearch')) {
            a6g.x7q(bkA8s[0], 'f-hide');
            window.setTimeout(function () {
                a6g.y7r(bkA8s[0], 'f-hide')
            }, 5000)
        }
    };
    b7g.ux4B = function (d7e) {
        var dO9F = l7e.Ms9j();
        if (!/^\/msg/.test(dO9F)) {
            var xx5C = 0;
            xx5C += d7e.comment;
            xx5C += d7e.forward;
            xx5C += d7e.msg;
            xx5C += d7e.notice;
            if (xx5C > 0) {
                xx5C = xx5C > 99 ? '99+' : xx5C;
                this.SL1x.innerText = xx5C;
                this.LL9C.innerText = xx5C;
                a6g.x7q(this.SL1x, 'f-hide');
                a6g.x7q(this.LL9C, 'f-hide');
                this.Xq2x = true
            } else {
                a6g.y7r(this.SL1x, 'f-hide');
                a6g.y7r(this.LL9C, 'f-hide');
                this.Xq2x = false
            }
            var eW9N = '/at';
            if (d7e.notice) eW9N = '/notify';
            if (d7e.comment) eW9N = '/comment';
            if (d7e.msg > 0) eW9N = '/private';
            if (d7e.forward > 0) eW9N = '/at';
            this.LL9C.parentNode.href = '/msg/#' + eW9N
        } else {
            this.LL9C.parentNode.href = 'javascript:;';
            a6g.y7r(this.SL1x, 'f-hide');
            a6g.y7r(this.LL9C, 'f-hide');
            this.Xq2x = false
        }
        var i7b = a6g.H7A(this.bjf7Y, 'j-t');
        if (!/^\/friend/.test(dO9F)) {
            if (i7b && i7b.length) {
                a6g.ba7T(i7b[0], 'display', d7e.event > 0 ? '' : 'none')
            }
        } else {
            a6g.ba7T(i7b[0], 'display', 'none')
        }
    };
    b7g.cL8D = function (d7e) {
        var f7c = h7a.W7P(d7e, 'd:action');
        if (f7c) {
            switch (a6g.t7m(f7c, 'action')) {
            case 'login':
                h7a.cr8j(d7e);
                var u7n = a6g.t7m(f7c, 'type');
                if (u7n) {
                    if (u7n == 'sina' || u7n == 'tencent') top.open(f7c.href);
                    else top.login(u7n == 'mobile' ? 0 : 3)
                } else {
                    top.login()
                }
                break;
            case 'logout':
                h7a.cr8j(d7e);
                top.logout();
                break;
            case 'viewStore':
                if (!this.bjO7H.bhS6M('storeNew')) {
                    a6g.y7r(this.cEJ6D, 'f-vhide')
                }
                break;
            case 'viewLevel':
                if (!this.bjO7H.bhS6M('levelNew')) {
                    a6g.y7r(this.cEK6E, 'f-vhide')
                }
                break
            }
        }
    };
    b7g.ST1x = function (d7e) {
        var f7c = h7a.W7P(d7e, 'd:action');
        if (!f7c) return;
        var U7N = a6g.t7m(f7c, 'action');
        switch (U7N) {
        case 'bilog':
            var bms8k = a6g.t7m(f7c, 'logAction'),
                bmG8y = a6g.t7m(f7c, 'logJson');
            window.log(bms8k, bmG8y);
            break
        }
    };
    b7g.bEz3x = function (LE9v, d7e) {
        if (this.bmJ8B) {
            this.bmJ8B.style.display = !LE9v ? 'none' : '';
            (LE9v || !this.Xq2x ? a6g.y7r : a6g.x7q).call(window, this.SL1x, 'f-hide')
        }
    };
    b7g.cwL5Q = function (gc0x) {
        a6g.ba7T(this.n7g, 'top', -gc0x + 'px')
    };
    b7g.bEE3x = function (eW9N, cwH4L) {
        this.cwM5R.oq2x(eW9N);
        if (eW9N == 'discover') {
            a6g.y7r(this.bEs3x, 'f-hide');
            a6g.x7q(this.bjr7k, 'f-hide');
            window.g_topBarHeight = 105;
            this.bjw7p.oq2x(cwH4L)
        } else {
            a6g.x7q(this.bEs3x, 'f-hide');
            a6g.y7r(this.bjr7k, 'f-hide');
            window.g_topBarHeight = 75
        }
    };
    b7g.cwK5P = function () {
        var ei9Z = a6g.B7u('g_iframe');
        if (!ei9Z) return;
        var gx0x = ei9Z.contentWindow.document.getElementById('g_top');
        this.bEE3x(a6g.t7m(gx0x, 'module'), a6g.t7m(gx0x, 'sub'))
    };
    var Xv2x = {},
        bFt3x = /\/\/\w+/,
        cwG4K = {
            avatarUrl: function (a, b) {
                    a = a || '';
                    b = b || '';
                    return a.replace(bFt3x, '') !== b.replace(bFt3x, '')
                },
                userId: true,
            nickname: true,
            reward: true,
            topic: true,
            djStatus: true
        };
    b7g.cwF4J = function (XD3x) {
        var oa2x = k7d.dj9a(cwG4K, function (D7w, J7C) {
            if (k7d.gG0x(D7w)) {
                return D7w(XD3x[J7C], Xv2x[J7C])
            } else {
                return XD3x[J7C] !== Xv2x[J7C]
            }
        });
        Xv2x = XD3x;
        return XD3x[oa2x]
    };
    b7g.LN9E = function () {
        var dp9g = GUser || {},
            cwB4F = GUserAcc || {};
        if (dp9g && dp9g.userId) {
            var bFD3x = NEJ.X(dp9g, cwB4F);
            if (this.cwF4J(bFD3x)) {
                a6g.dA9r(this.HR8J, 'm-topbar-user-login', bFD3x)
            }
        } else {
            Xv2x = {};
            this.HR8J.innerHTML = a6g.iL0x('m-topbar-user-unlogin');
            var i7b = a6g.H7A(this.bjf7Y, 'j-t');
            a6g.ba7T(i7b[0], 'display', 'none')
        }
        a6g.x7q(this.HR8J, 'f-hide');
        this.Xq2x = false;
        var i7b = a6g.H7A(this.HR8J, 'j-uflag');
        if (dp9g && dp9g.userId) {
            this.SL1x = i7b.shift();
            this.bmJ8B = i7b.shift();
            this.LL9C = i7b.shift()
        } else {
            this.bmJ8B = i7b.shift()
        }
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        h7a = c7f('nej.v'),
        I7B = c7f('nej.ut'),
        q7j = c7f('nm.d'),
        b7g,
        K7D;
    q7j.ff9W({
        'polling-get': {
            type: 'GET',
            url: '/api/pl/count',
            format: function (Q7J) {
                h7a.z7s(q7j.tl3x, 'message', Q7J)
            }
        }
    });
    q7j.tl3x = NEJ.C();
    b7g = q7j.tl3x.N7G(q7j.hE0x);
    b7g.XF3x = function () {
        this.cp8h('polling-get', {})
    };
    b7g.uC4G = function () {
        var ej9a;
        return function () {
            if (!!ej9a) return;
            ej9a = window.setInterval(this.XF3x.g7b(this), 100000);
            this.XF3x()
        }
    }();
    I7B.fI9z.A7t({
        event: 'message',
        element: q7j.tl3x
    })
})();
var io = 'undefined' === typeof module ? {} : module.exports;
(function () {
    (function (exports, global) {
        var io = exports;
        io.version = '0.9.16';
        io.protocol = 1;
        io.transports = [];
        io.j = [];
        io.sockets = {};
        io.connect = function (host, details) {
            var uri = io.util.parseUri(host),
                uuri,
                socket;
            if (global && global.location) {
                uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
                uri.host = uri.host || (global.document ? global.document.domain : global.location.hostname);
                uri.port = uri.port || global.location.port
            }
            uuri = io.util.uniqueUri(uri);
            var options = {
                host: uri.host,
                secure: 'https' == uri.protocol,
                port: uri.port || ('https' == uri.protocol ? 443 : 80),
                query: uri.query || ''
            };
            io.util.merge(options, details);
            if (options['force new connection'] || !io.sockets[uuri]) {
                socket = new io.Socket(options)
            }
            if (!options['force new connection'] && socket) {
                io.sockets[uuri] = socket
            }
            socket = socket || io.sockets[uuri];
            return socket.of(uri.path.length > 1 ? uri.path : '')
        }
    })('object' === typeof module ? module.exports : this.io = {}, this);
    (function (exports, global) {
        var util = exports.util = {};
        var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
        var parts = [
            'source',
            'protocol',
            'authority',
            'userInfo',
            'user',
            'password',
            'host',
            'port',
            'relative',
            'path',
            'directory',
            'file',
            'query',
            'anchor'
        ];
        util.parseUri = function (str) {
            var m = re.exec(str || ''),
                uri = {},
                i = 14;
            while (i--) {
                uri[parts[i]] = m[i] || ''
            }
            return uri
        };
        util.uniqueUri = function (uri) {
            var protocol = uri.protocol,
                host = uri.host,
                port = uri.port;
            if ('document' in global) {
                host = host || document.domain;
                port = port || (protocol == 'https' && document.location.protocol !== 'https:' ? 443 : document.location.port)
            } else {
                host = host || 'localhost';
                if (!port && protocol == 'https') {
                    port = 443
                }
            }
            return (protocol || 'http') + '://' + host + ':' + (port || 80)
        };
        util.query = function (base, addition) {
            var query = util.chunkQuery(base || ''),
                components = [];
            util.merge(query, util.chunkQuery(addition || ''));
            for (var part in query) {
                if (query.hasOwnProperty(part)) {
                    components.push(part + '=' + query[part])
                }
            }
            return components.length ? '?' + components.join('&') : ''
        };
        util.chunkQuery = function (qs) {
            var query = {},
                params = qs.split('&'),
                i = 0,
                l = params.length,
                kv;
            for (; i < l; ++i) {
                kv = params[i].split('=');
                if (kv[0]) {
                    query[kv[0]] = kv[1]
                }
            }
            return query
        };
        var pageLoaded = false;
        util.load = function (fn) {
            if ('document' in global && document.readyState === 'complete' || pageLoaded) {
                return fn()
            }
            util.on(global, 'load', fn, false)
        };
        util.on = function (element, event, fn, capture) {
            if (element.attachEvent) {
                element.attachEvent('on' + event, fn)
            } else if (element.addEventListener) {
                element.addEventListener(event, fn, capture)
            }
        };
        util.request = function (xdomain) {
            if (xdomain && 'undefined' != typeof XDomainRequest && !util.ua.hasCORS) {
                return new XDomainRequest
            }
            if ('undefined' != typeof XMLHttpRequest && (!xdomain || util.ua.hasCORS)) {
                return new XMLHttpRequest
            }
            if (!xdomain) {
                try {
                    return new(window[['Active'].concat('Object').join('X')])('Microsoft.XMLHTTP')
                } catch (e) {}
            }
            return null
        };
        if ('undefined' != typeof window) {
            util.load(function () {
                pageLoaded = true
            })
        }
        util.defer = function (fn) {
            if (!util.ua.webkit || 'undefined' != typeof importScripts) {
                return fn()
            }
            util.load(function () {
                setTimeout(fn, 100)
            })
        };
        util.merge = function merge(target, additional, deep, lastseen) {
            var seen = lastseen || [],
                depth = typeof deep == 'undefined' ? 2 : deep,
                prop;
            for (prop in additional) {
                if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
                    if (typeof target[prop] !== 'object' || !depth) {
                        target[prop] = additional[prop];
                        seen.push(additional[prop])
                    } else {
                        util.merge(target[prop], additional[prop], depth - 1, seen)
                    }
                }
            }
            return target
        };
        util.mixin = function (ctor, ctor2) {
            util.merge(ctor.prototype, ctor2.prototype)
        };
        util.inherit = function (ctor, ctor2) {
            function f() {}
            f.prototype = ctor2.prototype;
            ctor.prototype = new f
        };
        util.isArray = Array.isArray || function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]'
        };
        util.intersect = function (arr, arr2) {
            var ret = [],
                longest = arr.length > arr2.length ? arr : arr2,
                shortest = arr.length > arr2.length ? arr2 : arr;
            for (var i = 0, l = shortest.length; i < l; i++) {
                if (~util.indexOf(longest, shortest[i])) ret.push(shortest[i])
            }
            return ret
        };
        util.indexOf = function (arr, o, i) {
            for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0; i < j && arr[i] !== o; i++) {}
            return j <= i ? -1 : i
        };
        util.toArray = function (enu) {
            var arr = [];
            for (var i = 0, l = enu.length; i < l; i++) arr.push(enu[i]);
            return arr
        };
        util.ua = {};
        util.ua.hasCORS = 'undefined' != typeof XMLHttpRequest && function () {
            try {
                var a = new XMLHttpRequest
            } catch (e) {
                return false
            }
            return a.withCredentials != undefined
        }();
        util.ua.webkit = 'undefined' != typeof navigator && /webkit/i.test(navigator.userAgent);
        util.ua.iDevice = 'undefined' != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
    })('undefined' != typeof io ? io : module.exports, this);
    (function (exports, io) {
        exports.EventEmitter = EventEmitter;

        function EventEmitter() {}
        EventEmitter.prototype.on = function (name, fn) {
            if (!this.$events) {
                this.$events = {}
            }
            if (!this.$events[name]) {
                this.$events[name] = fn
            } else if (io.util.isArray(this.$events[name])) {
                this.$events[name].push(fn)
            } else {
                this.$events[name] = [
                    this.$events[name],
                    fn
                ]
            }
            return this
        };
        EventEmitter.prototype.addListener = EventEmitter.prototype.on;
        EventEmitter.prototype.once = function (name, fn) {
            var self = this;

            function on() {
                self.removeListener(name, on);
                fn.apply(this, arguments)
            }
            on.listener = fn;
            this.on(name, on);
            return this
        };
        EventEmitter.prototype.removeListener = function (name, fn) {
            if (this.$events && this.$events[name]) {
                var list = this.$events[name];
                if (io.util.isArray(list)) {
                    var pos = -1;
                    for (var i = 0, l = list.length; i < l; i++) {
                        if (list[i] === fn || list[i].listener && list[i].listener === fn) {
                            pos = i;
                            break
                        }
                    }
                    if (pos < 0) {
                        return this
                    }
                    list.splice(pos, 1);
                    if (!list.length) {
                        delete this.$events[name]
                    }
                } else if (list === fn || list.listener && list.listener === fn) {
                    delete this.$events[name]
                }
            }
            return this
        };
        EventEmitter.prototype.removeAllListeners = function (name) {
            if (name === undefined) {
                this.$events = {};
                return this
            }
            if (this.$events && this.$events[name]) {
                this.$events[name] = null
            }
            return this
        };
        EventEmitter.prototype.listeners = function (name) {
            if (!this.$events) {
                this.$events = {}
            }
            if (!this.$events[name]) {
                this.$events[name] = []
            }
            if (!io.util.isArray(this.$events[name])) {
                this.$events[name] = [
                    this.$events[name]
                ]
            }
            return this.$events[name]
        };
        EventEmitter.prototype.emit = function (name) {
            if (!this.$events) {
                return false
            }
            var handler = this.$events[name];
            if (!handler) {
                return false
            }
            var args = Array.prototype.slice.call(arguments, 1);
            if ('function' == typeof handler) {
                handler.apply(this, args)
            } else if (io.util.isArray(handler)) {
                var listeners = handler.slice();
                for (var i = 0, l = listeners.length; i < l; i++) {
                    listeners[i].apply(this, args)
                }
            } else {
                return false
            }
            return true
        }
    })('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports);
    (function (exports, nativeJSON) {
        'use strict';
        if (nativeJSON && nativeJSON.parse) {
            return exports.JSON = {
                parse: nativeJSON.parse,
                stringify: nativeJSON.stringify
            }
        }
        var JSON = exports.JSON = {};

        function f(n) {
            return n < 10 ? '0' + n : n
        }

        function date(d, key) {
            return isFinite(d.valueOf()) ? d.getUTCFullYear() + '-' + f(d.getUTCMonth() + 1) + '-' + f(d.getUTCDate()) + 'T' + f(d.getUTCHours()) + ':' + f(d.getUTCMinutes()) + ':' + f(d.getUTCSeconds()) + 'Z' : null
        }
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap,
            indent,
            meta = {
                '': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            },
            rep;

        function quote(string) {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + string + '"'
        }

        function str(key, holder) {
            var i,
                k,
                v,
                length,
                mind = gap,
                partial,
                value = holder[key];
            if (value instanceof Date) {
                value = date(key)
            }
            if (typeof rep === 'function') {
                value = rep.call(holder, key, value)
            }
            switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null'
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null'
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v
            }
        }
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' '
                }
            } else if (typeof space === 'string') {
                indent = space
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify')
            }
            return str('', {
                '': value
            })
        };
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k,
                    v,
                    value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({
                    '': j
                }, '') : j
            }
            throw new SyntaxError('JSON.parse')
        }
    })('undefined' != typeof io ? io : module.exports, typeof JSON !== 'undefined' ? JSON : undefined);
    (function (exports, io) {
        var parser = exports.parser = {};
        var packets = parser.packets = [
            'disconnect',
            'connect',
            'heartbeat',
            'message',
            'json',
            'event',
            'ack',
            'error',
            'noop'
        ];
        var reasons = parser.reasons = [
            'transport not supported',
            'client not handshaken',
            'unauthorized'
        ];
        var advice = parser.advice = [
            'reconnect'
        ];
        var JSON = io.JSON,
            indexOf = io.util.indexOf;
        parser.encodePacket = function (packet) {
            var type = indexOf(packets, packet.type),
                id = packet.id || '',
                endpoint = packet.endpoint || '',
                ack = packet.ack,
                data = null;
            switch (packet.type) {
            case 'error':
                var reason = packet.reason ? indexOf(reasons, packet.reason) : '',
                    adv = packet.advice ? indexOf(advice, packet.advice) : '';
                if (reason !== '' || adv !== '') data = reason + (adv !== '' ? '+' + adv : '');
                break;
            case 'message':
                if (packet.data !== '') data = packet.data;
                break;
            case 'event':
                var ev = {
                    name: packet.name
                };
                if (packet.args && packet.args.length) {
                    ev.args = packet.args
                }
                data = JSON.stringify(ev);
                break;
            case 'json':
                data = JSON.stringify(packet.data);
                break;
            case 'connect':
                if (packet.qs) data = packet.qs;
                break;
            case 'ack':
                data = packet.ackId + (packet.args && packet.args.length ? '+' + JSON.stringify(packet.args) : '');
                break
            }
            var encoded = [
                type,
                id + (ack == 'data' ? '+' : ''),
                endpoint
            ];
            if (data !== null && data !== undefined) encoded.push(data);
            return encoded.join(':')
        };
        parser.encodePayload = function (packets) {
            var decoded = '';
            if (packets.length == 1) return packets[0];
            for (var i = 0, l = packets.length; i < l; i++) {
                var packet = packets[i];
                decoded += '�' + packet.length + '�' + packets[i]
            }
            return decoded
        };
        var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
        parser.decodePacket = function (data) {
            var pieces = data.match(regexp);
            if (!pieces) return {};
            var id = pieces[2] || '',
                data = pieces[5] || '',
                packet = {
                    type: packets[pieces[1]],
                    endpoint: pieces[4] || ''
                };
            if (id) {
                packet.id = id;
                if (pieces[3]) packet.ack = 'data';
                else packet.ack = true
            }
            switch (packet.type) {
            case 'error':
                var pieces = data.split('+');
                packet.reason = reasons[pieces[0]] || '';
                packet.advice = advice[pieces[1]] || '';
                break;
            case 'message':
                packet.data = data || '';
                break;
            case 'event':
                try {
                    var opts = JSON.parse(data);
                    packet.name = opts.name;
                    packet.args = opts.args
                } catch (e) {}
                packet.args = packet.args || [];
                break;
            case 'json':
                try {
                    packet.data = JSON.parse(data)
                } catch (e) {}
                break;
            case 'connect':
                packet.qs = data || '';
                break;
            case 'ack':
                var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
                if (pieces) {
                    packet.ackId = pieces[1];
                    packet.args = [];
                    if (pieces[3]) {
                        try {
                            packet.args = pieces[3] ? JSON.parse(pieces[3]) : []
                        } catch (e) {}
                    }
                }
                break;
            case 'disconnect':
            case 'heartbeat':
                break
            }
            return packet
        };
        parser.decodePayload = function (data) {
            if (data.charAt(0) == '�') {
                var ret = [];
                for (var i = 1, length = ''; i < data.length; i++) {
                    if (data.charAt(i) == '�') {
                        ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
                        i += Number(length) + 1;
                        length = ''
                    } else {
                        length += data.charAt(i)
                    }
                }
                return ret
            } else {
                return [parser.decodePacket(data)]
            }
        }
    })('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports);
    (function (exports, io) {
        exports.Transport = Transport;

        function Transport(socket, sessid) {
            this.socket = socket;
            this.sessid = sessid
        }
        io.util.mixin(Transport, io.EventEmitter);
        Transport.prototype.heartbeats = function () {
            return true
        };
        Transport.prototype.onData = function (data) {
            this.clearCloseTimeout();
            if (this.socket.connected || this.socket.connecting || this.socket.reconnecting) {
                this.setCloseTimeout()
            }
            if (data !== '') {
                var msgs = io.parser.decodePayload(data);
                if (msgs && msgs.length) {
                    for (var i = 0, l = msgs.length; i < l; i++) {
                        this.onPacket(msgs[i])
                    }
                }
            }
            return this
        };
        Transport.prototype.onPacket = function (packet) {
            this.socket.setHeartbeatTimeout();
            if (packet.type == 'heartbeat') {
                return this.onHeartbeat()
            }
            if (packet.type == 'connect' && packet.endpoint == '') {
                this.onConnect()
            }
            if (packet.type == 'error' && packet.advice == 'reconnect') {
                this.isOpen = false
            }
            this.socket.onPacket(packet);
            return this
        };
        Transport.prototype.setCloseTimeout = function () {
            if (!this.closeTimeout) {
                var self = this;
                this.closeTimeout = setTimeout(function () {
                    self.onDisconnect()
                }, this.socket.closeTimeout)
            }
        };
        Transport.prototype.onDisconnect = function () {
            if (this.isOpen) this.close();
            this.clearTimeouts();
            this.socket.onDisconnect();
            return this
        };
        Transport.prototype.onConnect = function () {
            this.socket.onConnect();
            return this
        };
        Transport.prototype.clearCloseTimeout = function () {
            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
                this.closeTimeout = null
            }
        };
        Transport.prototype.clearTimeouts = function () {
            this.clearCloseTimeout();
            if (this.reopenTimeout) {
                clearTimeout(this.reopenTimeout)
            }
        };
        Transport.prototype.packet = function (packet) {
            this.send(io.parser.encodePacket(packet))
        };
        Transport.prototype.onHeartbeat = function (heartbeat) {
            this.packet({
                type: 'heartbeat'
            })
        };
        Transport.prototype.onOpen = function () {
            this.isOpen = true;
            this.clearCloseTimeout();
            this.socket.onOpen()
        };
        Transport.prototype.onClose = function () {
            var self = this;
            this.isOpen = false;
            this.socket.onClose();
            this.onDisconnect()
        };
        Transport.prototype.prepareUrl = function () {
            var options = this.socket.options;
            return this.scheme() + '://' + options.host + ':' + options.port + '/' + options.resource + '/' + io.protocol + '/' + this.name + '/' + this.sessid
        };
        Transport.prototype.ready = function (socket, fn) {
            fn.call(this)
        }
    })('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports);
    (function (exports, io, global) {
        exports.Socket = Socket;

        function Socket(options) {
            this.options = {
                port: 80,
                secure: false,
                document: 'document' in global ? document : false,
                resource: 'socket.io',
                transports: io.transports,
                'connect timeout': 10000,
                'try multiple transports': true,
                reconnect: true,
                'reconnection delay': 500,
                'reconnection limit': Infinity,
                'reopen delay': 3000,
                'max reconnection attempts': 10,
                'sync disconnect on unload': false,
                'auto connect': true,
                'flash policy port': 10843,
                manualFlush: false
            };
            io.util.merge(this.options, options);
            this.connected = false;
            this.open = false;
            this.connecting = false;
            this.reconnecting = false;
            this.namespaces = {};
            this.buffer = [];
            this.doBuffer = false;
            if (this.options['sync disconnect on unload'] && (!this.isXDomain() || io.util.ua.hasCORS)) {
                var self = this;
                io.util.on(global, 'beforeunload', function () {
                    self.disconnectSync()
                }, false)
            }
            if (this.options['auto connect']) {
                this.connect()
            }
        }
        io.util.mixin(Socket, io.EventEmitter);
        Socket.prototype.of = function (name) {
            if (!this.namespaces[name]) {
                this.namespaces[name] = new io.SocketNamespace(this, name);
                if (name !== '') {
                    this.namespaces[name].packet({
                        type: 'connect'
                    })
                }
            }
            return this.namespaces[name]
        };
        Socket.prototype.publish = function () {
            this.emit.apply(this, arguments);
            var nsp;
            for (var i in this.namespaces) {
                if (this.namespaces.hasOwnProperty(i)) {
                    nsp = this.of(i);
                    nsp.$emit.apply(nsp, arguments)
                }
            }
        };

        function empty() {}
        Socket.prototype.handshake = function (fn) {
            var self = this,
                options = this.options;

            function complete(data) {
                if (data instanceof Error) {
                    self.connecting = false;
                    self.onError(data.message)
                } else {
                    fn.apply(null, data.split(':'))
                }
            }
            var url = [
                'http' + (options.secure ? 's' : '') + ':/',
                options.host + ':' + options.port,
                options.resource,
                io.protocol,
                io.util.query(this.options.query, 't=' + +(new Date))
            ].join('/');
            if (this.isXDomain() && !io.util.ua.hasCORS) {
                var insertAt = document.getElementsByTagName('script')[0],
                    script = document.createElement('script');
                script.src = url + '&jsonp=' + io.j.length;
                insertAt.parentNode.insertBefore(script, insertAt);
                io.j.push(function (data) {
                    complete(data);
                    script.parentNode.removeChild(script)
                })
            } else {
                var xhr = io.util.request();
                xhr.open('GET', url, true);
                if (this.isXDomain()) {
                    xhr.withCredentials = true
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        xhr.onreadystatechange = empty;
                        if (xhr.status == 200) {
                            complete(xhr.responseText)
                        } else if (xhr.status == 403) {
                            self.onError(xhr.responseText)
                        } else {
                            self.connecting = false;
                            !self.reconnecting && self.onError(xhr.responseText)
                        }
                    }
                };
                xhr.send(null)
            }
        };
        Socket.prototype.getTransport = function (override) {
            var transports = override || this.transports,
                match;
            for (var i = 0, transport; transport = transports[i]; i++) {
                if (io.Transport[transport] && io.Transport[transport].check(this) && (!this.isXDomain() || io.Transport[transport].xdomainCheck(this))) {
                    return new io.Transport[transport](this, this.sessionid)
                }
            }
            return null
        };
        Socket.prototype.connect = function (fn) {
            if (this.connecting && this.transports != 'jsonp-polling') {
                return this
            }
            var self = this;
            self.connecting = true;
            this.handshake(function (sid, heartbeat, close, transports) {
                self.sessionid = sid;
                self.closeTimeout = close * 1000;
                self.heartbeatTimeout = heartbeat * 1000;
                var check = function () {
                    return 'WebSocket' in global && !('__addTask' in WebSocket) || 'MozWebSocket' in global
                };
                if (!check()) {
                    transports = 'jsonp-polling'
                }
                if (!self.transports) self.transports = self.origTransports = transports ? io.util.intersect(transports.split(','), self.options.transports) : self.options.transports;
                self.setHeartbeatTimeout();

                function connect(transports) {
                    if (self.transport) self.transport.clearTimeouts();
                    self.transport = self.getTransport(transports);
                    if (!self.transport) return self.publish('connect_failed');
                    self.transport.ready(self, function () {
                        self.connecting = true;
                        self.publish('connecting', self.transport.name);
                        self.transport.open();
                        if (self.options['connect timeout']) {
                            self.connectTimeoutTimer = setTimeout(function () {
                                if (!self.connected) {
                                    self.connecting = false;
                                    if (self.options['try multiple transports']) {
                                        var remaining = self.transports;
                                        while (remaining.length > 0 && remaining.splice(0, 1)[0] != self.transport.name) {}
                                        if (remaining.length) {
                                            connect(remaining)
                                        } else {
                                            self.publish('connect_failed')
                                        }
                                    }
                                }
                            }, self.options['connect timeout'])
                        }
                    })
                }
                connect(self.transports);
                self.once('connect', function () {
                    clearTimeout(self.connectTimeoutTimer);
                    fn && typeof fn == 'function' && fn()
                })
            });
            return this
        };
        Socket.prototype.setHeartbeatTimeout = function () {
            clearTimeout(this.heartbeatTimeoutTimer);
            if (this.transport && !this.transport.heartbeats()) return;
            var self = this;
            this.heartbeatTimeoutTimer = setTimeout(function () {
                self.transport.onClose()
            }, this.heartbeatTimeout)
        };
        Socket.prototype.packet = function (data) {
            if (this.connected && !this.doBuffer) {
                this.transport.packet(data)
            } else {
                this.buffer.push(data)
            }
            return this
        };
        Socket.prototype.setBuffer = function (v) {
            this.doBuffer = v;
            if (!v && this.connected && this.buffer.length) {
                if (!this.options['manualFlush']) {
                    this.flushBuffer()
                }
            }
        };
        Socket.prototype.flushBuffer = function () {
            this.transport.payload(this.buffer);
            this.buffer = []
        };
        Socket.prototype.disconnect = function () {
            if (this.connected || this.connecting) {
                if (this.open) {
                    this.of('').packet({
                        type: 'disconnect'
                    })
                }
                this.onDisconnect('booted')
            }
            return this
        };
        Socket.prototype.disconnectSync = function () {
            var xhr = io.util.request();
            var uri = [
                'http' + (this.options.secure ? 's' : '') + ':/',
                this.options.host + ':' + this.options.port,
                this.options.resource,
                io.protocol,
                '',
                this.sessionid
            ].join('/') + '/?disconnect=1';
            xhr.open('GET', uri, false);
            xhr.send(null);
            this.onDisconnect('booted')
        };
        Socket.prototype.isXDomain = function () {
            var port = global.location.port || ('https:' == global.location.protocol ? 443 : 80);
            return this.options.host !== global.location.hostname || this.options.port != port
        };
        Socket.prototype.onConnect = function () {
            if (!this.connected) {
                this.connected = true;
                this.connecting = false;
                if (!this.doBuffer) {
                    this.setBuffer(false)
                }
                this.emit('connect')
            }
        };
        Socket.prototype.onOpen = function () {
            this.open = true
        };
        Socket.prototype.onClose = function () {
            this.open = false;
            clearTimeout(this.heartbeatTimeoutTimer)
        };
        Socket.prototype.onPacket = function (packet) {
            this.of(packet.endpoint).onPacket(packet)
        };
        Socket.prototype.onError = function (err) {
            if (err && err.advice) {
                if (err.advice === 'reconnect' && (this.connected || this.connecting)) {
                    this.disconnect();
                    if (this.options.reconnect) {
                        this.reconnect()
                    }
                }
            }
            this.publish('error', err && err.reason ? err.reason : err)
        };
        Socket.prototype.onDisconnect = function (reason) {
            var wasConnected = this.connected,
                wasConnecting = this.connecting;
            this.connected = false;
            this.connecting = false;
            this.open = false;
            if (wasConnected || wasConnecting) {
                this.transport.close();
                this.transport.clearTimeouts();
                if (wasConnected) {
                    this.publish('disconnect', reason);
                    if ('booted' != reason && this.options.reconnect && !this.reconnecting) {
                        this.reconnect()
                    }
                }
            }
        };
        Socket.prototype.reconnect = function () {
            this.reconnecting = true;
            this.reconnectionAttempts = 0;
            this.reconnectionDelay = this.options['reconnection delay'];
            var self = this,
                maxAttempts = this.options['max reconnection attempts'],
                tryMultiple = this.options['try multiple transports'],
                limit = this.options['reconnection limit'];

            function reset() {
                if (self.connected) {
                    for (var i in self.namespaces) {
                        if (self.namespaces.hasOwnProperty(i) && '' !== i) {
                            self.namespaces[i].packet({
                                type: 'connect'
                            })
                        }
                    }
                    self.publish('reconnect', self.transport.name, self.reconnectionAttempts)
                }
                clearTimeout(self.reconnectionTimer);
                self.removeListener('connect_failed', maybeReconnect);
                self.removeListener('connect', maybeReconnect);
                self.reconnecting = false;
                delete self.reconnectionAttempts;
                delete self.reconnectionDelay;
                delete self.reconnectionTimer;
                delete self.redoTransports;
                self.options['try multiple transports'] = tryMultiple
            }

            function maybeReconnect() {
                if (!self.reconnecting) {
                    return
                }
                if (self.connected) {
                    return reset()
                }
                if (self.connecting && self.reconnecting && self.transports != 'jsonp-polling') {
                    return self.reconnectionTimer = setTimeout(maybeReconnect, 1000)
                }
                if (self.reconnectionAttempts++ >= maxAttempts) {
                    if (!self.redoTransports) {
                        self.on('connect_failed', maybeReconnect);
                        self.options['try multiple transports'] = true;
                        self.transports = self.origTransports;
                        self.transport = self.getTransport();
                        self.redoTransports = true;
                        self.connect()
                    } else {
                        self.publish('reconnect_failed');
                        reset()
                    }
                } else {
                    if (self.reconnectionDelay < limit) {
                        self.reconnectionDelay *= 2
                    }
                    self.connect();
                    self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
                    self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay)
                }
            }
            this.options['try multiple transports'] = false;
            this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);
            this.on('connect', maybeReconnect)
        }
    })('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this);
    (function (exports, io) {
        exports.SocketNamespace = SocketNamespace;

        function SocketNamespace(socket, name) {
            this.socket = socket;
            this.name = name || '';
            this.flags = {};
            this.json = new Flag(this, 'json');
            this.ackPackets = 0;
            this.acks = {}
        }
        io.util.mixin(SocketNamespace, io.EventEmitter);
        SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;
        SocketNamespace.prototype.of = function () {
            return this.socket.of.apply(this.socket, arguments)
        };
        SocketNamespace.prototype.packet = function (packet) {
            packet.endpoint = this.name;
            this.socket.packet(packet);
            this.flags = {};
            return this
        };
        SocketNamespace.prototype.send = function (data, fn) {
            var packet = {
                type: this.flags.json ? 'json' : 'message',
                data: data
            };
            if ('function' == typeof fn) {
                packet.id = ++this.ackPackets;
                packet.ack = true;
                this.acks[packet.id] = fn
            }
            return this.packet(packet)
        };
        SocketNamespace.prototype.emit = function (name) {
            var args = Array.prototype.slice.call(arguments, 1),
                lastArg = args[args.length - 1],
                packet = {
                    type: 'event',
                    name: name
                };
            if ('function' == typeof lastArg) {
                packet.id = ++this.ackPackets;
                packet.ack = 'data';
                this.acks[packet.id] = lastArg;
                args = args.slice(0, args.length - 1)
            }
            packet.args = args;
            return this.packet(packet)
        };
        SocketNamespace.prototype.disconnect = function () {
            if (this.name === '') {
                this.socket.disconnect()
            } else {
                this.packet({
                    type: 'disconnect'
                });
                this.$emit('disconnect')
            }
            return this
        };
        SocketNamespace.prototype.onPacket = function (packet) {
            var self = this;

            function ack() {
                self.packet({
                    type: 'ack',
                    args: io.util.toArray(arguments),
                    ackId: packet.id
                })
            }
            switch (packet.type) {
            case 'connect':
                this.$emit('connect');
                break;
            case 'disconnect':
                if (this.name === '') {
                    this.socket.onDisconnect(packet.reason || 'booted')
                } else {
                    this.$emit('disconnect', packet.reason)
                }
                break;
            case 'message':
            case 'json':
                var params = [
                    'message',
                    packet.data
                ];
                if (packet.ack == 'data') {
                    params.push(ack)
                } else if (packet.ack) {
                    this.packet({
                        type: 'ack',
                        ackId: packet.id
                    })
                }
                this.$emit.apply(this, params);
                break;
            case 'event':
                var params = [
                    packet.name
                ].concat(packet.args);
                if (packet.ack == 'data') params.push(ack);
                this.$emit.apply(this, params);
                break;
            case 'ack':
                if (this.acks[packet.ackId]) {
                    this.acks[packet.ackId].apply(this, packet.args);
                    delete this.acks[packet.ackId]
                }
                break;
            case 'error':
                if (packet.advice) {
                    this.socket.onError(packet)
                } else {
                    if (packet.reason == 'unauthorized') {
                        this.$emit('connect_failed', packet.reason)
                    } else {
                        this.$emit('error', packet.reason)
                    }
                }
                break
            }
        };

        function Flag(nsp, name) {
            this.namespace = nsp;
            this.name = name
        }
        Flag.prototype.send = function () {
            this.namespace.flags[this.name] = true;
            this.namespace.send.apply(this.namespace, arguments)
        };
        Flag.prototype.emit = function () {
            this.namespace.flags[this.name] = true;
            this.namespace.emit.apply(this.namespace, arguments)
        }
    })('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports);
    (function (exports, io, global) {
        exports.websocket = WS;

        function WS(socket) {
            io.Transport.apply(this, arguments)
        }
        io.util.inherit(WS, io.Transport);
        WS.prototype.name = 'websocket';
        WS.prototype.open = function () {
            var query = io.util.query(this.socket.options.query),
                self = this,
                Socket;
            if (!Socket) {
                Socket = global.MozWebSocket || global.WebSocket
            }
            this.websocket = new Socket(this.prepareUrl() + query);
            this.websocket.onopen = function () {
                self.onOpen();
                self.socket.setBuffer(false)
            };
            this.websocket.onmessage = function (ev) {
                self.onData(ev.data)
            };
            this.websocket.onclose = function () {
                self.onClose();
                self.socket.setBuffer(true)
            };
            this.websocket.onerror = function (e) {
                self.onError(e)
            };
            return this
        };
        if (io.util.ua.iDevice) {
            WS.prototype.send = function (data) {
                var self = this;
                setTimeout(function () {
                    self.websocket.send(data)
                }, 0);
                return this
            }
        } else {
            WS.prototype.send = function (data) {
                this.websocket.send(data);
                return this
            }
        }
        WS.prototype.payload = function (arr) {
            for (var i = 0, l = arr.length; i < l; i++) {
                this.packet(arr[i])
            }
            return this
        };
        WS.prototype.close = function () {
            this.websocket.close();
            return this
        };
        WS.prototype.onError = function (e) {
            this.socket.onError(e)
        };
        WS.prototype.scheme = function () {
            return this.socket.options.secure ? 'wss' : 'ws'
        };
        WS.check = function () {
            return 'WebSocket' in global && !('__addTask' in WebSocket) || 'MozWebSocket' in global
        };
        WS.xdomainCheck = function () {
            return true
        };
        io.transports.push('websocket')
    })('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this);
    (function (exports, io) {
        exports.flashsocket = Flashsocket;

        function Flashsocket() {
            io.Transport.websocket.apply(this, arguments)
        }
        io.util.inherit(Flashsocket, io.Transport.websocket);
        Flashsocket.prototype.name = 'flashsocket';
        Flashsocket.prototype.open = function () {
            var self = this,
                args = arguments;
            WebSocket.XG3x(function () {
                io.Transport.websocket.prototype.open.apply(self, args)
            });
            return this
        };
        Flashsocket.prototype.send = function () {
            var self = this,
                args = arguments;
            WebSocket.XG3x(function () {
                io.Transport.websocket.prototype.send.apply(self, args)
            });
            return this
        };
        Flashsocket.prototype.close = function () {
            WebSocket.Se1x.length = 0;
            io.Transport.websocket.prototype.close.call(this);
            return this
        };
        Flashsocket.prototype.ready = function (socket, fn) {
            function init() {
                var options = socket.options,
                    port = options['flash policy port'],
                    path = [
                        'http' + (options.secure ? 's' : '') + ':/',
                        options.host + ':' + options.port,
                        options.resource,
                        'static/flashsocket',
                        'WebSocketMain' + (socket.isXDomain() ? 'Insecure' : '') + '.swf'
                    ];
                if (!Flashsocket.loaded) {
                    if (typeof WEB_SOCKET_SWF_LOCATION === 'undefined') {
                        WEB_SOCKET_SWF_LOCATION = path.join('/')
                    }
                    if (port !== 843) {
                        WebSocket.loadFlashPolicyFile('xmlsocket://' + options.host + ':' + port)
                    }
                    WebSocket.boT9K();
                    Flashsocket.loaded = true
                }
                fn.call(self)
            }
            var self = this;
            if (document.body) return init();
            io.util.load(init)
        };
        Flashsocket.check = function () {
            if (typeof WebSocket == 'undefined' || !('__initialize' in WebSocket) || !swfobject) return false;
            return swfobject.getFlashPlayerVersion().major >= 10
        };
        Flashsocket.xdomainCheck = function () {
            return true
        };
        if (typeof window != 'undefined') {
            WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true
        }
        io.transports.push('flashsocket')
    })('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports);
    if ('undefined' != typeof window) {
        var swfobject = function () {
            var D = 'undefined',
                r = 'object',
                S = 'Shockwave Flash',
                W = 'ShockwaveFlash.ShockwaveFlash',
                q = 'application/x-shockwave-flash',
                R = 'SWFObjectExprInst',
                x = 'onreadystatechange',
                O = window,
                j = document,
                t = navigator,
                T = false,
                U = [
                    h
                ],
                o = [],
                N = [],
                I = [],
                l,
                Q,
                E,
                B,
                J = false,
                a = false,
                n,
                G,
                m = true,
                M = function () {
                    var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
                        ah = t.userAgent.toLowerCase(),
                        Y = t.platform.toLowerCase(),
                        ae = Y ? /win/.test(Y) : /win/.test(ah),
                        ac = Y ? /mac/.test(Y) : /mac/.test(ah),
                        af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, '$1')) : false,
                        X = !+'\v1',
                        ag = [
                            0,
                            0,
                            0
                        ],
                        ab = null;
                    if (typeof t.plugins != D && typeof t.plugins[S] == r) {
                        ab = t.plugins[S].description;
                        if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                            T = true;
                            X = false;
                            ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, '$1');
                            ag[0] = parseInt(ab.replace(/^(.*)\..*$/, '$1'), 10);
                            ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, '$1'), 10);
                            ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, '$1'), 10) : 0
                        }
                    } else {
                        if (typeof O[['Active'].concat('Object').join('X')] != D) {
                            try {
                                var ad = new(window[['Active'].concat('Object').join('X')])(W);
                                if (ad) {
                                    ab = ad.GetVariable('$version');
                                    if (ab) {
                                        X = true;
                                        ab = ab.split(' ')[1].split(',');
                                        ag = [
                                            parseInt(ab[0], 10),
                                            parseInt(ab[1], 10),
                                            parseInt(ab[2], 10)
                                        ]
                                    }
                                }
                            } catch (Z) {}
                        }
                    }
                    return {
                        w3: aa,
                        pv: ag,
                        wk: af,
                        ie: X,
                        win: ae,
                        mac: ac
                    }
                }(),
                k = function () {
                    if (!M.w3) {
                        return
                    }
                    if (typeof j.readyState != D && j.readyState == 'complete' || typeof j.readyState == D && (j.getElementsByTagName('body')[0] || j.body)) {
                        f()
                    }
                    if (!J) {
                        if (typeof j.addEventListener != D) {
                            j.addEventListener('DOMContentLoaded', f, false)
                        }
                        if (M.ie && M.win) {
                            j.attachEvent(x, function () {
                                if (j.readyState == 'complete') {
                                    j.detachEvent(x, arguments.callee);
                                    f()
                                }
                            });
                            if (O == top) {
                                (function () {
                                    if (J) {
                                        return
                                    }
                                    try {
                                        j.documentElement.doScroll('left')
                                    } catch (X) {
                                        setTimeout(arguments.callee, 0);
                                        return
                                    }
                                    f()
                                })()
                            }
                        }
                        if (M.wk) {
                            (function () {
                                if (J) {
                                    return
                                }
                                if (!/loaded|complete/.test(j.readyState)) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                f()
                            })()
                        }
                        s(f)
                    }
                }();

            function f() {
                if (J) {
                    return
                }
                try {
                    var Z = j.getElementsByTagName('body')[0].appendChild(C('span'));
                    Z.parentNode.removeChild(Z)
                } catch (aa) {
                    return
                }
                J = true;
                var X = U.length;
                for (var Y = 0; Y < X; Y++) {
                    U[Y]()
                }
            }

            function K(X) {
                if (J) {
                    X()
                } else {
                    U[U.length] = X
                }
            }

            function s(Y) {
                if (typeof O.addEventListener != D) {
                    O.addEventListener('load', Y, false)
                } else {
                    if (typeof j.addEventListener != D) {
                        j.addEventListener('load', Y, false)
                    } else {
                        if (typeof O.attachEvent != D) {
                            i(O, 'onload', Y)
                        } else {
                            if (typeof O.onload == 'function') {
                                var X = O.onload;
                                O.onload = function () {
                                    X();
                                    Y()
                                }
                            } else {
                                O.onload = Y
                            }
                        }
                    }
                }
            }

            function h() {
                if (T) {
                    V()
                } else {
                    H()
                }
            }

            function V() {
                var X = j.getElementsByTagName('body')[0];
                var aa = C(r);
                aa.setAttribute('type', q);
                aa.style.visibility = 'hidden';
                var Z = X.appendChild(aa);
                if (Z) {
                    var Y = 0;
                    (function () {
                        if (typeof Z.GetVariable != D) {
                            var ab = Z.GetVariable('$version');
                            if (ab) {
                                ab = ab.split(' ')[1].split(',');
                                M.pv = [
                                    parseInt(ab[0], 10),
                                    parseInt(ab[1], 10),
                                    parseInt(ab[2], 10)
                                ]
                            }
                        } else {
                            if (Y < 10) {
                                Y++;
                                setTimeout(arguments.callee, 10);
                                return
                            }
                        }
                        X.removeChild(aa);
                        Z = null;
                        H()
                    })()
                } else {
                    H()
                }
            }

            function H() {
                var ag = o.length;
                if (ag > 0) {
                    for (var af = 0; af < ag; af++) {
                        var Y = o[af].id;
                        var ab = o[af].callbackFn;
                        var aa = {
                            success: false,
                            id: Y
                        };
                        if (M.pv[0] > 0) {
                            var ae = c(Y);
                            if (ae) {
                                if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                                    w(Y, true);
                                    if (ab) {
                                        aa.success = true;
                                        aa.ref = z(Y);
                                        ab(aa)
                                    }
                                } else {
                                    if (o[af].expressInstall && A()) {
                                        var ai = {};
                                        ai.data = o[af].expressInstall;
                                        ai.width = ae.getAttribute('width') || '0';
                                        ai.height = ae.getAttribute('height') || '0';
                                        if (ae.getAttribute('class')) {
                                            ai.styleclass = ae.getAttribute('class')
                                        }
                                        if (ae.getAttribute('align')) {
                                            ai.align = ae.getAttribute('align')
                                        }
                                        var ah = {};
                                        var X = ae.getElementsByTagName('param');
                                        var ac = X.length;
                                        for (var ad = 0; ad < ac; ad++) {
                                            if (X[ad].getAttribute('name').toLowerCase() != 'movie') {
                                                ah[X[ad].getAttribute('name')] = X[ad].getAttribute('value')
                                            }
                                        }
                                        P(ai, ah, Y, ab)
                                    } else {
                                        p(ae);
                                        if (ab) {
                                            ab(aa)
                                        }
                                    }
                                }
                            }
                        } else {
                            w(Y, true);
                            if (ab) {
                                var Z = z(Y);
                                if (Z && typeof Z.SetVariable != D) {
                                    aa.success = true;
                                    aa.ref = Z
                                }
                                ab(aa)
                            }
                        }
                    }
                }
            }

            function z(aa) {
                var X = null;
                var Y = c(aa);
                if (Y && Y.nodeName == 'OBJECT') {
                    if (typeof Y.SetVariable != D) {
                        X = Y
                    } else {
                        var Z = Y.getElementsByTagName(r)[0];
                        if (Z) {
                            X = Z
                        }
                    }
                }
                return X
            }

            function A() {
                return !a && F('6.0.65') && (M.win || M.mac) && !(M.wk && M.wk < 312)
            }

            function P(aa, ab, X, Z) {
                a = true;
                E = Z || null;
                B = {
                    success: false,
                    id: X
                };
                var ae = c(X);
                if (ae) {
                    if (ae.nodeName == 'OBJECT') {
                        l = g(ae);
                        Q = null
                    } else {
                        l = ae;
                        Q = X
                    }
                    aa.id = R;
                    if (typeof aa.width == D || !/%$/.test(aa.width) && parseInt(aa.width, 10) < 310) {
                        aa.width = '310'
                    }
                    if (typeof aa.height == D || !/%$/.test(aa.height) && parseInt(aa.height, 10) < 137) {
                        aa.height = '137'
                    }
                    j.title = j.title.slice(0, 47) + ' - Flash Player Installation';
                    var ad = M.ie && M.win ? [
                            'Active'
                        ].concat('').join('X') : 'PlugIn',
                        ac = 'MMredirectURL=' + O.location.toString().replace(/&/g, '%26') + '&MMplayerType=' + ad + '&MMdoctitle=' + j.title;
                    if (typeof ab.flashvars != D) {
                        ab.flashvars += '&' + ac
                    } else {
                        ab.flashvars = ac
                    }
                    if (M.ie && M.win && ae.readyState != 4) {
                        var Y = C('div');
                        X += 'SWFObjectNew';
                        Y.setAttribute('id', X);
                        ae.parentNode.insertBefore(Y, ae);
                        ae.style.display = 'none';
                        (function () {
                            if (ae.readyState == 4) {
                                ae.parentNode.removeChild(ae)
                            } else {
                                setTimeout(arguments.callee, 10)
                            }
                        })()
                    }
                    u(aa, ab, X)
                }
            }

            function p(Y) {
                if (M.ie && M.win && Y.readyState != 4) {
                    var X = C('div');
                    Y.parentNode.insertBefore(X, Y);
                    X.parentNode.replaceChild(g(Y), X);
                    Y.style.display = 'none';
                    (function () {
                        if (Y.readyState == 4) {
                            Y.parentNode.removeChild(Y)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    })()
                } else {
                    Y.parentNode.replaceChild(g(Y), Y)
                }
            }

            function g(ab) {
                var aa = C('div');
                if (M.win && M.ie) {
                    aa.innerHTML = ab.innerHTML
                } else {
                    var Y = ab.getElementsByTagName(r)[0];
                    if (Y) {
                        var ad = Y.childNodes;
                        if (ad) {
                            var X = ad.length;
                            for (var Z = 0; Z < X; Z++) {
                                if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == 'PARAM') && !(ad[Z].nodeType == 8)) {
                                    aa.appendChild(ad[Z].cloneNode(true))
                                }
                            }
                        }
                    }
                }
                return aa
            }

            function u(ai, ag, Y) {
                var X,
                    aa = c(Y);
                if (M.wk && M.wk < 312) {
                    return X
                }
                if (aa) {
                    if (typeof ai.id == D) {
                        ai.id = Y
                    }
                    if (M.ie && M.win) {
                        var ah = '';
                        for (var ae in ai) {
                            if (ai[ae] != Object.prototype[ae]) {
                                if (ae.toLowerCase() == 'data') {
                                    ag.movie = ai[ae]
                                } else {
                                    if (ae.toLowerCase() == 'styleclass') {
                                        ah += ' class="' + ai[ae] + '"'
                                    } else {
                                        if (ae.toLowerCase() != 'classid') {
                                            ah += ' ' + ae + '="' + ai[ae] + '"'
                                        }
                                    }
                                }
                            }
                        }
                        var af = '';
                        for (var ad in ag) {
                            if (ag[ad] != Object.prototype[ad]) {
                                af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                            }
                        }
                        aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + '>' + af + '</object>';
                        N[N.length] = ai.id;
                        X = c(ai.id)
                    } else {
                        var Z = C(r);
                        Z.setAttribute('type', q);
                        for (var ac in ai) {
                            if (ai[ac] != Object.prototype[ac]) {
                                if (ac.toLowerCase() == 'styleclass') {
                                    Z.setAttribute('class', ai[ac])
                                } else {
                                    if (ac.toLowerCase() != 'classid') {
                                        Z.setAttribute(ac, ai[ac])
                                    }
                                }
                            }
                        }
                        for (var ab in ag) {
                            if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != 'movie') {
                                e(Z, ab, ag[ab])
                            }
                        }
                        aa.parentNode.replaceChild(Z, aa);
                        X = Z
                    }
                }
                return X
            }

            function e(Z, X, Y) {
                var aa = C('param');
                aa.setAttribute('name', X);
                aa.setAttribute('value', Y);
                Z.appendChild(aa)
            }

            function y(Y) {
                var X = c(Y);
                if (X && X.nodeName == 'OBJECT') {
                    if (M.ie && M.win) {
                        X.style.display = 'none';
                        (function () {
                            if (X.readyState == 4) {
                                b(Y)
                            } else {
                                setTimeout(arguments.callee, 10)
                            }
                        })()
                    } else {
                        X.parentNode.removeChild(X)
                    }
                }
            }

            function b(Z) {
                var Y = c(Z);
                if (Y) {
                    for (var X in Y) {
                        if (typeof Y[X] == 'function') {
                            Y[X] = null
                        }
                    }
                    Y.parentNode.removeChild(Y)
                }
            }

            function c(Z) {
                var X = null;
                try {
                    X = j.getElementById(Z)
                } catch (Y) {}
                return X
            }

            function C(X) {
                return j.createElement(X)
            }

            function i(Z, X, Y) {
                Z.attachEvent(X, Y);
                I[I.length] = [
                    Z,
                    X,
                    Y
                ]
            }

            function F(Z) {
                var Y = M.pv,
                    X = Z.split('.');
                X[0] = parseInt(X[0], 10);
                X[1] = parseInt(X[1], 10) || 0;
                X[2] = parseInt(X[2], 10) || 0;
                return Y[0] > X[0] || Y[0] == X[0] && Y[1] > X[1] || Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2] ? true : false
            }

            function v(ac, Y, ad, ab) {
                if (M.ie && M.mac) {
                    return
                }
                var aa = j.getElementsByTagName('head')[0];
                if (!aa) {
                    return
                }
                var X = ad && typeof ad == 'string' ? ad : 'screen';
                if (ab) {
                    n = null;
                    G = null
                }
                if (!n || G != X) {
                    var Z = C('style');
                    Z.setAttribute('type', 'text/css');
                    Z.setAttribute('media', X);
                    n = aa.appendChild(Z);
                    if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                        n = j.styleSheets[j.styleSheets.length - 1]
                    }
                    G = X
                }
                if (M.ie && M.win) {
                    if (n && typeof n.addRule == r) {
                        n.addRule(ac, Y)
                    }
                } else {
                    if (n && typeof j.createTextNode != D) {
                        n.appendChild(j.createTextNode(ac + ' {' + Y + '}'))
                    }
                }
            }

            function w(Z, X) {
                if (!m) {
                    return
                }
                var Y = X ? 'visible' : 'hidden';
                if (J && c(Z)) {
                    c(Z).style.visibility = Y
                } else {
                    v('#' + Z, 'visibility:' + Y)
                }
            }

            function L(Y) {
                var Z = /[\\\"<>\.;]/;
                var X = Z.exec(Y) != null;
                return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
            }
            var d = function () {
                if (M.ie && M.win) {
                    window.attachEvent('onunload', function () {
                        var ac = I.length;
                        for (var ab = 0; ab < ac; ab++) {
                            I[ab][0].detachEvent(I[ab][1], I[ab][2])
                        }
                        var Z = N.length;
                        for (var aa = 0; aa < Z; aa++) {
                            y(N[aa])
                        }
                        for (var Y in M) {
                            M[Y] = null
                        }
                        M = null;
                        for (var X in swfobject) {
                            swfobject[X] = null
                        }
                        swfobject = null
                    })
                }
            }();
            return {
                registerObject: function (ab, X, aa, Z) {
                        if (M.w3 && ab && X) {
                            var Y = {};
                            Y.id = ab;
                            Y.swfVersion = X;
                            Y.expressInstall = aa;
                            Y.callbackFn = Z;
                            o[o.length] = Y;
                            w(ab, false)
                        } else {
                            if (Z) {
                                Z({
                                    success: false,
                                    id: ab
                                })
                            }
                        }
                    },
                    getObjectById: function (X) {
                        if (M.w3) {
                            return z(X)
                        }
                    },
                    embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
                        var X = {
                            success: false,
                            id: ah
                        };
                        if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                            w(ah, false);
                            K(function () {
                                ae += '';
                                ag += '';
                                var aj = {};
                                if (af && typeof af === r) {
                                    for (var al in af) {
                                        aj[al] = af[al]
                                    }
                                }
                                aj.data = ab;
                                aj.width = ae;
                                aj.height = ag;
                                var am = {};
                                if (ad && typeof ad === r) {
                                    for (var ak in ad) {
                                        am[ak] = ad[ak]
                                    }
                                }
                                if (Z && typeof Z === r) {
                                    for (var ai in Z) {
                                        if (typeof am.flashvars != D) {
                                            am.flashvars += '&' + ai + '=' + Z[ai]
                                        } else {
                                            am.flashvars = ai + '=' + Z[ai]
                                        }
                                    }
                                }
                                if (F(Y)) {
                                    var an = u(aj, am, ah);
                                    if (aj.id == ah) {
                                        w(ah, true)
                                    }
                                    X.success = true;
                                    X.ref = an
                                } else {
                                    if (aa && A()) {
                                        aj.data = aa;
                                        P(aj, am, ah, ac);
                                        return
                                    } else {
                                        w(ah, true)
                                    }
                                }
                                if (ac) {
                                    ac(X)
                                }
                            })
                        } else {
                            if (ac) {
                                ac(X)
                            }
                        }
                    },
                    switchOffAutoHideShow: function () {
                        m = false
                    },
                    ua: M,
                getFlashPlayerVersion: function () {
                        return {
                            major: M.pv[0],
                            minor: M.pv[1],
                            release: M.pv[2]
                        }
                    },
                    hasFlashPlayerVersion: F,
                createSWF: function (Z, Y, X) {
                        if (M.w3) {
                            return u(Z, Y, X)
                        } else {
                            return undefined
                        }
                    },
                    showExpressInstall: function (Z, aa, X, Y) {
                        if (M.w3 && A()) {
                            P(Z, aa, X, Y)
                        }
                    },
                    removeSWF: function (X) {
                        if (M.w3) {
                            y(X)
                        }
                    },
                    createCSS: function (aa, Z, Y, X) {
                        if (M.w3) {
                            v(aa, Z, Y, X)
                        }
                    },
                    addDomLoadEvent: K,
                addLoadEvent: s,
                getQueryParamValue: function (aa) {
                        var Z = j.location.search || j.location.hash;
                        if (Z) {
                            if (/\?/.test(Z)) {
                                Z = Z.split('?')[1]
                            }
                            if (aa == null) {
                                return L(Z)
                            }
                            var Y = Z.split('&');
                            for (var X = 0; X < Y.length; X++) {
                                if (Y[X].substring(0, Y[X].indexOf('=')) == aa) {
                                    return L(Y[X].substring(Y[X].indexOf('=') + 1))
                                }
                            }
                        }
                        return ''
                    },
                    expressInstallCallback: function () {
                        if (a) {
                            var X = c(R);
                            if (X && l) {
                                X.parentNode.replaceChild(l, X);
                                if (Q) {
                                    w(Q, true);
                                    if (M.ie && M.win) {
                                        l.style.display = 'block'
                                    }
                                }
                                if (E) {
                                    E(B)
                                }
                            }
                            a = false
                        }
                    }
            }
        }()
    }(function () {
        if ('undefined' == typeof window || window.WebSocket) return;
        var console = window.console;
        if (!console || !console.log || !console.error) {
            console = {
                log: function () {},
                    error: function () {}
            }
        }
        if (!swfobject.hasFlashPlayerVersion('10.0.0')) {
            console.error('Flash Player >= 10.0.0 is required.');
            return
        }
        if (location.protocol == 'file:') {
            console.error('WARNING: web-socket-js doesn\'t work in file:///... URL ' + 'unless you set Flash Security Settings properly. ' + 'Open the page via Web server i.e. http://...')
        }
        WebSocket = function (url, protocols, proxyHost, proxyPort, headers) {
            var self = this;
            self.hb0x = WebSocket.cwA4E++;
            WebSocket.bFM3x[self.hb0x] = self;
            self.readyState = WebSocket.CONNECTING;
            self.bufferedAmount = 0;
            self.lX1x = {};
            if (!protocols) {
                protocols = []
            } else if (typeof protocols == 'string') {
                protocols = [
                    protocols
                ]
            }
            setTimeout(function () {
                WebSocket.XG3x(function () {
                    WebSocket.pM2x.create(self.hb0x, url, protocols, proxyHost || null, proxyPort || 0, headers || null)
                })
            }, 0)
        };
        WebSocket.prototype.send = function (data) {
            if (this.readyState == WebSocket.CONNECTING) {
                throw 'INVALID_STATE_ERR: Web Socket connection has not been established'
            }
            var result = WebSocket.pM2x.send(this.hb0x, encodeURIComponent(data));
            if (result < 0) {
                return true
            } else {
                this.bufferedAmount += result;
                return false
            }
        };
        WebSocket.prototype.close = function () {
            if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
                return
            }
            this.readyState = WebSocket.CLOSING;
            WebSocket.pM2x.close(this.hb0x)
        };
        WebSocket.prototype.addEventListener = function (type, listener, useCapture) {
            if (!(type in this.lX1x)) {
                this.lX1x[type] = []
            }
            this.lX1x[type].push(listener)
        };
        WebSocket.prototype.removeEventListener = function (type, listener, useCapture) {
            if (!(type in this.lX1x)) return;
            var events = this.lX1x[type];
            for (var i = events.length - 1; i >= 0; --i) {
                if (events[i] === listener) {
                    events.splice(i, 1);
                    break
                }
            }
        };
        WebSocket.prototype.dispatchEvent = function (event) {
            var events = this.lX1x[event.type] || [];
            for (var i = 0; i < events.length; ++i) {
                events[i](event)
            }
            var handler = this['on' + event.type];
            if (handler) handler(event)
        };
        WebSocket.prototype.cwz4D = function (flashEvent) {
            if ('readyState' in flashEvent) {
                this.readyState = flashEvent.readyState
            }
            if ('protocol' in flashEvent) {
                this.protocol = flashEvent.protocol
            }
            var jsEvent;
            if (flashEvent.type == 'open' || flashEvent.type == 'error') {
                jsEvent = this.bFR4V(flashEvent.type)
            } else if (flashEvent.type == 'close') {
                jsEvent = this.bFR4V('close')
            } else if (flashEvent.type == 'message') {
                var data = decodeURIComponent(flashEvent.message);
                jsEvent = this.cwy4C('message', data)
            } else {
                throw 'unknown event type: ' + flashEvent.type
            }
            this.dispatchEvent(jsEvent)
        };
        WebSocket.prototype.bFR4V = function (type) {
            if (document.createEvent && window.Event) {
                var event = document.createEvent('Event');
                event.initEvent(type, false, false);
                return event
            } else {
                return {
                    type: type,
                    bubbles: false,
                    cancelable: false
                }
            }
        };
        WebSocket.prototype.cwy4C = function (type, data) {
            if (document.createEvent && window.MessageEvent && !window.opera) {
                var event = document.createEvent('MessageEvent');
                event.initMessageEvent('message', false, false, data, null, null, window, null);
                return event
            } else {
                return {
                    type: type,
                    data: data,
                    bubbles: false,
                    cancelable: false
                }
            }
        };
        WebSocket.CONNECTING = 0;
        WebSocket.OPEN = 1;
        WebSocket.CLOSING = 2;
        WebSocket.CLOSED = 3;
        WebSocket.pM2x = null;
        WebSocket.bFM3x = {};
        WebSocket.Se1x = [];
        WebSocket.cwA4E = 0;
        WebSocket.loadFlashPolicyFile = function (url) {
            WebSocket.XG3x(function () {
                WebSocket.pM2x.loadManualPolicyFile(url)
            })
        };
        WebSocket.boT9K = function () {
            if (WebSocket.pM2x) return;
            if (WebSocket.cwv4z) {
                window.WEB_SOCKET_SWF_LOCATION = WebSocket.cwv4z
            }
            if (!window.WEB_SOCKET_SWF_LOCATION) {
                console.error('[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf');
                return
            }
            var container = document.createElement('div');
            container.id = 'webSocketContainer';
            container.style.position = 'absolute';
            if (WebSocket.cwu4y()) {
                container.style.left = '0px';
                container.style.top = '0px'
            } else {
                container.style.left = '-100px';
                container.style.top = '-100px'
            }
            var holder = document.createElement('div');
            holder.id = 'webSocketFlash';
            container.appendChild(holder);
            document.body.appendChild(container);
            swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, 'webSocketFlash', '1', '1', '10.0.0', null, null, {
                hasPriority: true,
                swliveconnect: true,
                allowScriptAccess: 'always'
            }, null, function (e) {
                if (!e.success) {
                    console.error('[WebSocket] swfobject.embedSWF failed')
                }
            })
        };
        WebSocket.cEL6F = function () {
            setTimeout(function () {
                WebSocket.pM2x = document.getElementById('webSocketFlash');
                WebSocket.pM2x.setCallerUrl(location.href);
                WebSocket.pM2x.setDebug(!!window.WEB_SOCKET_DEBUG);
                for (var i = 0; i < WebSocket.Se1x.length; ++i) {
                    WebSocket.Se1x[i]()
                }
                WebSocket.Se1x = []
            }, 0)
        };
        WebSocket.cEM6G = function () {
            setTimeout(function () {
                try {
                    var events = WebSocket.pM2x.receiveEvents();
                    for (var i = 0; i < events.length; ++i) {
                        WebSocket.bFM3x[events[i].webSocketId].cwz4D(events[i])
                    }
                } catch (e) {
                    console.error(e)
                }
            }, 0);
            return true
        };
        WebSocket.cEN6H = function (message) {
            console.log(decodeURIComponent(message))
        };
        WebSocket.dV9M = function (message) {
            console.error(decodeURIComponent(message))
        };
        WebSocket.XG3x = function (task) {
            if (WebSocket.pM2x) {
                task()
            } else {
                WebSocket.Se1x.push(task)
            }
        };
        WebSocket.cwu4y = function () {
            if (!window.navigator || !window.navigator.mimeTypes) {
                return false
            }
            var mimeType = window.navigator.mimeTypes['application/x-shockwave-flash'];
            if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
                return false
            }
            return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false
        };
        if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
            if (window.addEventListener) {
                window.addEventListener('load', function () {
                    WebSocket.boT9K()
                }, false)
            } else {
                window.attachEvent('onload', function () {
                    WebSocket.boT9K()
                })
            }
        }
    })();
    (function (exports, io, global) {
        exports.XHR = XHR;

        function XHR(socket) {
            if (!socket) return;
            io.Transport.apply(this, arguments);
            this.sendBuffer = []
        }
        io.util.inherit(XHR, io.Transport);
        XHR.prototype.open = function () {
            this.socket.setBuffer(false);
            this.onOpen();
            this.get();
            this.setCloseTimeout();
            return this
        };
        XHR.prototype.payload = function (payload) {
            var msgs = [];
            for (var i = 0, l = payload.length; i < l; i++) {
                msgs.push(io.parser.encodePacket(payload[i]))
            }
            this.send(io.parser.encodePayload(msgs))
        };
        XHR.prototype.send = function (data) {
            this.post(data);
            return this
        };

        function empty() {}
        XHR.prototype.post = function (data) {
            var self = this;
            this.socket.setBuffer(true);

            function stateChange() {
                if (this.readyState == 4) {
                    this.onreadystatechange = empty;
                    self.posting = false;
                    if (this.status == 200) {
                        self.socket.setBuffer(false)
                    } else {
                        self.onClose()
                    }
                }
            }

            function onload() {
                this.onload = empty;
                self.socket.setBuffer(false)
            }
            this.sendXHR = this.request('POST');
            if (global.XDomainRequest && this.sendXHR instanceof XDomainRequest) {
                this.sendXHR.onload = this.sendXHR.onerror = onload
            } else {
                this.sendXHR.onreadystatechange = stateChange
            }
            this.sendXHR.send(data)
        };
        XHR.prototype.close = function () {
            this.onClose();
            return this
        };
        XHR.prototype.request = function (method) {
            var req = io.util.request(this.socket.isXDomain()),
                query = io.util.query(this.socket.options.query, 't=' + +(new Date));
            req.open(method || 'GET', this.prepareUrl() + query, true);
            if (method == 'POST') {
                try {
                    if (req.setRequestHeader) {
                        req.setRequestHeader('Content-type', 'text/plain;charset=UTF-8')
                    } else {
                        req.contentType = 'text/plain'
                    }
                } catch (e) {}
            }
            return req
        };
        XHR.prototype.scheme = function () {
            return this.socket.options.secure ? 'https' : 'http'
        };
        XHR.check = function (socket, xdomain) {
            try {
                var request = io.util.request(xdomain),
                    usesXDomReq = global.XDomainRequest && request instanceof XDomainRequest,
                    socketProtocol = socket && socket.options && socket.options.secure ? 'https:' : 'http:',
                    isXProtocol = global.location && socketProtocol != global.location.protocol;
                if (request && !(usesXDomReq && isXProtocol)) {
                    return true
                }
            } catch (e) {}
            return false
        };
        XHR.xdomainCheck = function (socket) {
            return XHR.check(socket, true)
        }
    })('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this);
    (function (exports, io) {
        exports.htmlfile = HTMLFile;

        function HTMLFile(socket) {
            io.Transport.XHR.apply(this, arguments)
        }
        io.util.inherit(HTMLFile, io.Transport.XHR);
        HTMLFile.prototype.name = 'htmlfile';
        HTMLFile.prototype.get = function () {
            this.doc = new(window[['Active'].concat('Object').join('X')])('htmlfile');
            this.doc.open();
            this.doc.write('<html></html>');
            this.doc.close();
            this.doc.parentWindow.s = this;
            var iframeC = this.doc.createElement('div');
            iframeC.className = 'socketio';
            this.doc.body.appendChild(iframeC);
            this.iframe = this.doc.createElement('iframe');
            iframeC.appendChild(this.iframe);
            var self = this,
                query = io.util.query(this.socket.options.query, 't=' + +(new Date));
            this.iframe.src = this.prepareUrl() + query;
            io.util.on(window, 'unload', function () {
                self.destroy()
            })
        };
        HTMLFile.prototype.c7f = function (data, doc) {
            data = data.replace(/\\\//g, '/');
            this.onData(data);
            try {
                var script = doc.getElementsByTagName('script')[0];
                script.parentNode.removeChild(script)
            } catch (e) {}
        };
        HTMLFile.prototype.destroy = function () {
            if (this.iframe) {
                try {
                    this.iframe.src = 'about:blank'
                } catch (e) {}
                this.doc = null;
                this.iframe.parentNode.removeChild(this.iframe);
                this.iframe = null;
                CollectGarbage()
            }
        };
        HTMLFile.prototype.close = function () {
            this.destroy();
            return io.Transport.XHR.prototype.close.call(this)
        };
        HTMLFile.check = function (socket) {
            if (typeof window != 'undefined' && [
                'Active'
            ].concat('Object').join('X') in window) {
                try {
                    var a = new(window[['Active'].concat('Object').join('X')])('htmlfile');
                    return a && io.Transport.XHR.check(socket)
                } catch (e) {}
            }
            return false
        };
        HTMLFile.xdomainCheck = function () {
            return false
        };
        io.transports.push('htmlfile')
    })('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports);
    (function (exports, io, global) {
        exports['xhr-polling'] = XHRPolling;

        function XHRPolling() {
            io.Transport.XHR.apply(this, arguments)
        }
        io.util.inherit(XHRPolling, io.Transport.XHR);
        io.util.merge(XHRPolling, io.Transport.XHR);
        XHRPolling.prototype.name = 'xhr-polling';
        XHRPolling.prototype.heartbeats = function () {
            return false
        };
        XHRPolling.prototype.open = function () {
            var self = this;
            io.Transport.XHR.prototype.open.call(self);
            return false
        };

        function empty() {}
        XHRPolling.prototype.get = function () {
            if (!this.isOpen) return;
            var self = this;

            function stateChange() {
                if (this.readyState == 4) {
                    this.onreadystatechange = empty;
                    if (this.status == 200) {
                        self.onData(this.responseText);
                        self.get()
                    } else {
                        self.onClose()
                    }
                }
            }

            function onload() {
                this.onload = empty;
                this.onerror = empty;
                self.retryCounter = 1;
                self.onData(this.responseText);
                self.get()
            }

            function onerror() {
                self.retryCounter++;
                if (!self.retryCounter || self.retryCounter > 3) {
                    self.onClose()
                } else {
                    self.get()
                }
            }
            this.xhr = this.request();
            if (global.XDomainRequest && this.xhr instanceof XDomainRequest) {
                this.xhr.onload = onload;
                this.xhr.onerror = onerror
            } else {
                this.xhr.onreadystatechange = stateChange
            }
            this.xhr.send(null)
        };
        XHRPolling.prototype.onClose = function () {
            io.Transport.XHR.prototype.onClose.call(this);
            if (this.xhr) {
                this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = empty;
                try {
                    this.xhr.abort()
                } catch (e) {}
                this.xhr = null
            }
        };
        XHRPolling.prototype.ready = function (socket, fn) {
            var self = this;
            io.util.defer(function () {
                fn.call(self)
            })
        };
        io.transports.push('xhr-polling')
    })('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this);
    (function (exports, io, global) {
        var indicator = global.document && 'MozAppearance' in global.document.documentElement.style;
        exports['jsonp-polling'] = JSONPPolling;

        function JSONPPolling(socket) {
            io.Transport['xhr-polling'].apply(this, arguments);
            this.index = io.j.length;
            var self = this;
            io.j.push(function (msg) {
                self.c7f(msg)
            })
        }
        io.util.inherit(JSONPPolling, io.Transport['xhr-polling']);
        JSONPPolling.prototype.name = 'jsonp-polling';
        JSONPPolling.prototype.post = function (data) {
            var self = this,
                query = io.util.query(this.socket.options.query, 't=' + +(new Date) + '&i=' + this.index);
            if (!this.form) {
                var form = document.createElement('form'),
                    area = document.createElement('textarea'),
                    id = this.iframeId = 'socketio_iframe_' + this.index,
                    iframe;
                form.className = 'socketio';
                form.style.position = 'absolute';
                form.style.top = '0px';
                form.style.left = '0px';
                form.style.display = 'none';
                form.target = id;
                form.method = 'POST';
                form.setAttribute('accept-charset', 'utf-8');
                area.name = 'd';
                form.appendChild(area);
                document.body.appendChild(form);
                this.form = form;
                this.area = area
            }
            this.form.action = this.prepareUrl() + query;

            function complete() {
                initIframe();
                self.socket.setBuffer(false)
            }

            function initIframe() {
                if (self.iframe) {
                    self.form.removeChild(self.iframe)
                }
                try {
                    iframe = document.createElement('<iframe name="' + self.iframeId + '">')
                } catch (e) {
                    iframe = document.createElement('iframe');
                    iframe.name = self.iframeId
                }
                iframe.id = self.iframeId;
                self.form.appendChild(iframe);
                self.iframe = iframe
            }
            initIframe();
            this.area.value = io.JSON.stringify(data);
            try {
                this.form.submit()
            } catch (e) {}
            if (this.iframe.attachEvent) {
                iframe.onreadystatechange = function () {
                    if (self.iframe.readyState == 'complete') {
                        complete()
                    }
                }
            } else {
                this.iframe.onload = complete
            }
            this.socket.setBuffer(true)
        };
        JSONPPolling.prototype.get = function () {
            var self = this,
                script = document.createElement('script'),
                query = io.util.query(this.socket.options.query, 't=' + +(new Date) + '&i=' + this.index);
            if (this.script) {
                this.script.parentNode.removeChild(this.script);
                this.script = null
            }
            script.async = true;
            script.src = this.prepareUrl() + query;
            script.onerror = function () {
                self.onClose()
            };
            var insertAt = document.getElementsByTagName('script')[0];
            insertAt.parentNode.insertBefore(script, insertAt);
            this.script = script;
            if (indicator) {
                setTimeout(function () {
                    var iframe = document.createElement('iframe');
                    document.body.appendChild(iframe);
                    document.body.removeChild(iframe)
                }, 100)
            }
        };
        JSONPPolling.prototype.c7f = function (msg) {
            this.onData(msg);
            if (this.isOpen) {
                this.get()
            }
            return this
        };
        JSONPPolling.prototype.ready = function (socket, fn) {
            var self = this;
            if (!indicator) return fn.call(this);
            io.util.load(function () {
                fn.call(self)
            })
        };
        JSONPPolling.check = function () {
            return 'document' in global
        };
        JSONPPolling.xdomainCheck = function () {
            return true
        };
        io.transports.push('jsonp-polling')
    })('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this);
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return io
        })
    }
})();
(function () {
    var isArray = Array.isArray;
    if (isArray === undefined) {
        isArray = function (arr) {
            return Object.prototype.toString.call(arr) === '[object Array]'
        }
    }
    var root = this;

    function EventEmitter() {}
    if (typeof module !== 'undefined' && module.exports) {
        module.exports.EventEmitter = EventEmitter
    } else {
        root = window;
        root.EventEmitter = EventEmitter
    }
    var defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function (n) {
        if (!this.ee9V) this.ee9V = {};
        this.bGh4l = n
    };
    EventEmitter.prototype.emit = function () {
        var type = arguments[0];
        if (type === 'error') {
            if (!this.ee9V || !this.ee9V.error || isArray(this.ee9V.error) && !this.ee9V.error.length) {
                if (this.domain) {
                    var er = arguments[1];
                    er.domain_emitter = this;
                    er.domain = this.domain;
                    er.domain_thrown = false;
                    this.domain.emit('error', er);
                    return false
                }
                if (arguments[1] instanceof Error) {
                    throw arguments[1]
                } else {
                    throw new Error('Uncaught, unspecified \'error\' event.')
                }
                return false
            }
        }
        if (!this.ee9V) return false;
        var handler = this.ee9V[type];
        if (!handler) return false;
        if (typeof handler == 'function') {
            if (this.domain) {
                this.domain.enter()
            }
            switch (arguments.length) {
            case 1:
                handler.call(this);
                break;
            case 2:
                handler.call(this, arguments[1]);
                break;
            case 3:
                handler.call(this, arguments[1], arguments[2]);
                break;
            default:
                var l = arguments.length;
                var args = new Array(l - 1);
                for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
                handler.apply(this, args)
            }
            if (this.domain) {
                this.domain.exit()
            }
            return true
        } else if (isArray(handler)) {
            if (this.domain) {
                this.domain.enter()
            }
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            var listeners = handler.slice();
            for (var i = 0, l = listeners.length; i < l; i++) {
                listeners[i].apply(this, args)
            }
            if (this.domain) {
                this.domain.exit()
            }
            return true
        } else {
            return false
        }
    };
    EventEmitter.prototype.addListener = function (type, listener) {
        if ('function' !== typeof listener) {
            throw new Error('addListener only takes instances of Function')
        }
        if (!this.ee9V) this.ee9V = {};
        this.emit('newListener', type, typeof listener.listener === 'function' ? listener.listener : listener);
        if (!this.ee9V[type]) {
            this.ee9V[type] = listener
        } else if (isArray(this.ee9V[type])) {
            this.ee9V[type].push(listener)
        } else {
            this.ee9V[type] = [
                this.ee9V[type],
                listener
            ]
        }
        if (isArray(this.ee9V[type]) && !this.ee9V[type].warned) {
            var m;
            if (this.bGh4l !== undefined) {
                m = this.bGh4l
            } else {
                m = defaultMaxListeners
            }
            if (m && m > 0 && this.ee9V[type].length > m) {
                this.ee9V[type].warned = true;
                console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this.ee9V[type].length);
                console.trace()
            }
        }
        return this
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function (type, listener) {
        if ('function' !== typeof listener) {
            throw new Error('.once only takes instances of Function')
        }
        var self = this;

        function g() {
            self.removeListener(type, g);
            listener.apply(this, arguments)
        }
        g.listener = listener;
        self.on(type, g);
        return this
    };
    EventEmitter.prototype.removeListener = function (type, listener) {
        if ('function' !== typeof listener) {
            throw new Error('removeListener only takes instances of Function')
        }
        if (!this.ee9V || !this.ee9V[type]) return this;
        var list = this.ee9V[type];
        if (isArray(list)) {
            var position = -1;
            for (var i = 0, length = list.length; i < length; i++) {
                if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                    position = i;
                    break
                }
            }
            if (position < 0) return this;
            list.splice(position, 1)
        } else if (list === listener || list.listener && list.listener === listener) {
            delete this.ee9V[type]
        }
        return this
    };
    EventEmitter.prototype.removeAllListeners = function (type) {
        if (arguments.length === 0) {
            this.ee9V = {};
            return this
        }
        var events = this.ee9V && this.ee9V[type];
        if (!events) return this;
        if (isArray(events)) {
            events.splice(0)
        } else {
            this.ee9V[type] = null
        }
        return this
    };
    EventEmitter.prototype.listeners = function (type) {
        if (!this.ee9V) this.ee9V = {};
        if (!this.ee9V[type]) this.ee9V[type] = [];
        if (!isArray(this.ee9V[type])) {
            this.ee9V[type] = [
                this.ee9V[type]
            ]
        }
        return this.ee9V[type]
    }
})();
(function () {
    if (typeof Object.create !== 'function') {
        Object.create = function (o) {
            function F() {}
            F.prototype = o;
            return new F
        }
    }
    var root = window;
    var pomelo = Object.create(EventEmitter.prototype);
    root.pomelo = pomelo;
    var socket = null;
    var id = 1;
    var callbacks = {};
    var route = 'web-connector.messageHandler.';
    var isRegister = false;
    var success = 200;
    var register_ack = 'register';
    var bind_ack = 'bind';
    var regBind_ack = 'registerAndBind';
    var cancelBind_ack = 'cancelBind';
    var message_store = {};
    var heartbeat_interval = 1000 * 60;
    var heartbeat_timer;
    var current_user;
    var current_domain;
    var cacheMessageIds = [];
    var cacheSize = 100;
    pomelo.init = function (host, port, reconnect, cb) {
        var url = 'ws://' + host;
        if (port) {
            url += ':' + port
        }
        var params;
        if (reconnect) {
            params = {
                'force new connection': true,
                reconnect: true,
                'max reconnection attempts': 50
            }
        } else {
            params = {
                'force new connection': true,
                reconnect: false
            }
        }
        socket = io.connect(url, params);
        socket.on('connect', function () {
            console.log('[pomeloclient.init] websocket connected!');
            cb()
        });
        socket.on('reconnect', function () {
            pomelo.emit('reconnect')
        });
        socket.on('message', function (data) {
            message_store = {};
            if (typeof data === 'string') {
                data = JSON.parse(data)
            }
            if (data instanceof Array) {
                processMessageBatch(data)
            } else {
                processMessage(data);
                emitMessage()
            }
        });
        socket.on('error', function (err) {
            cb(err)
        });
        socket.on('disconnect', function (reason) {
            isRegister = false;
            pomelo.emit('disconnect', reason)
        })
    };
    var request = function (method, opts, cb) {
        if (!method) {
            console.error('request message error with no method.');
            return
        }
        id++;
        callbacks[id] = cb;
        sendMsg(method, id, opts)
    };
    var notify = function (method, msg) {
        if (!method) {
            console.error('notify message error with no method.');
            return
        }
        sendMsg(method, 0, msg)
    };
    var sendMsg = function (method, msgId, msg) {
        var path = route + method;
        var rs = {
            id: msgId,
            route: path,
            msg: msg
        };
        var sg = JSON.stringify(rs);
        socket.send(sg)
    };
    var processMessageBatch = function (msgs) {
        for (var i = 0, l = msgs.length; i < l; i++) {
            processMessage(msgs[i])
        }
        emitMessage()
    };
    var emitMessage = function () {
        for (var key in message_store) {
            pomelo.emit(key, message_store[key])
        }
    };
    var processMessage = function (msg) {
        if (msg.id) {
            var cb = callbacks[msg.id];
            delete callbacks[msg.id];
            if (typeof cb !== 'function') {
                console.log('[pomeloclient.processMessage] cb is not a function for request ' + msg.id);
                return
            }
            cb(msg.body);
            if (msg.body.type === register_ack && msg.body.code == success) {
                isRegister = true
            }
            if ((msg.body.type === bind_ack || msg.body.type === regBind_ack) && msg.body.code == success) {
                heartbeat_timer = setInterval(function () {
                    notify('heartbeat', {
                        flag: 'online',
                        domain: current_domain,
                        user: current_user
                    })
                }, heartbeat_interval)
            }
            if (msg.body.type === cancelBind_ack && msg.body.code == success) {
                clearInterval(heartbeat_timer)
            }
            return
        } else {
            if (!filterMessage(msg)) {
                return
            }
            if (!message_store[msg.route]) {
                if (msg.body instanceof Array) {
                    message_store[msg.route] = msg.body
                } else {
                    message_store[msg.route] = [
                        msg.body
                    ]
                }
            } else {
                var arr = message_store[msg.route];
                if (msg.body instanceof Array) {
                    var messages = msg.body;
                    for (var i = 0; i < messages.length; i++) {
                        arr.push(messages[i])
                    }
                } else {
                    arr.push(msg.body)
                }
                message_store[msg.route] = arr
            }
        }
    };
    var filterMessage = function (message) {
        var msgs = message.body;
        var ids = [];
        var results = {};
        if (msgs instanceof Array) {
            for (var i = 0; i < msgs.length; i++) {
                var id = msgs[i].msgId;
                ids.push(id)
            }
            var duplicatedIds = checkMessage(ids);
            if (duplicatedIds.length !== 0) {
                return false
            } else {
                cacheMessageIds = cacheMessageIds.concat(ids);
                if (cacheMessageIds.length > cacheSize) {
                    var length = cacheMessageIds - cacheSize;
                    for (var i = 0; i < length; i++) {
                        cacheMessageIds.shift()
                    }
                }
            }
        }
        return true
    };
    var checkMessage = function (ids) {
        var array = [];
        for (var i = 0; i < cacheMessageIds.length; i++) {
            var id = cacheMessageIds[i];
            for (var j = 0; j < ids.length; j++) {
                if (ids[j] === id) {
                    array.push(id)
                }
            }
        }
        return array
    };
    pomelo.register = function (opts, cb) {
        request('register', opts, cb)
    };
    pomelo.bind = function (opts, cb) {
        if (isRegister) {
            current_domain = opts.domain;
            current_user = opts.user;
            request('bind', opts, cb)
        } else {
            console.log('cannot bind without registration.')
        }
    };
    pomelo.registerAndBind = function (opts, cb) {
        current_domain = opts.domain;
        current_user = opts.user;
        request('registerAndBind', opts, cb)
    };
    pomelo.cancelBind = function (opts, cb) {
        current_domain = null;
        current_user = null;
        request('cancelBind', opts, cb)
    };
    pomelo.getOnlineUser = function (opts, cb) {
        request('getOnlineUser', opts, cb)
    };
    pomelo.disconnect = function () {
        if (socket) {
            socket.disconnect();
            socket = null
        }
    };
    pomelo.ackMessage = function (domain, msgs) {
        var msgIds = '';
        var types = '';
        var message = {};
        var user;
        for (var i = 0; i < msgs.length; i++) {
            var data = msgs[i];
            if (!user) {
                user = data.user
            }
            msgIds += data.msgId;
            types += data.type;
            if (i !== msgs.length - 1) {
                msgIds += ';';
                types += ';'
            }
        }
        var message = {
            user: user,
            msgIds: msgIds,
            types: types,
            domain: domain
        };
        notify('ack', message)
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        l7e = c7f('nm.x'),
        dC9t = c7f('nm.u'),
        q7j = c7f('nm.d'),
        RZ1x = c7f('pomelo'),
        X7Q = 0,
        b7g,
        K7D;
    q7j.ff9W({
        'polling-init': {
            url: '/api/push/init',
            format: function (Q7J) {
                    X7Q = 2;
                    var ti3x = {
                            domain: 'music.163.com',
                            host: MUSIC_CONFIG.pushHost,
                            port: MUSIC_CONFIG.pushPort,
                            key: MUSIC_CONFIG.pushKey,
                            secret: 'bec0b878892740c498505a85eb3dcec9'
                        },
                        j7c = Q7J.account || bb7U,
                        dn9e = GUser.userId;
                    RZ1x.init(ti3x.host, ti3x.port, true, this.cwq4u.g7b(this, {
                        user: dn9e,
                        nonce: j7c.nonce,
                        domain: ti3x.domain,
                        productKey: ti3x.key,
                        signature: j7c.signature,
                        expire_time: j7c.expireTime
                    }))
                },
                onerror: function () {
                    return this.bpa9R()
                }
        }
    });
    q7j.AE6y = NEJ.C();
    b7g = q7j.AE6y.N7G(q7j.hE0x);
    b7g.cx8p = function () {
        var qx3x = !1;
        return function (e7d) {
            if (!qx3x) {
                qx3x = !0
            }
            this.cF8x(e7d);
            RZ1x.on('specify', this.ra3x.g7b(this));
            RZ1x.on('broadcast', this.ra3x.g7b(this))
        }
    }();
    b7g.ra3x = function (d7e) {
        k7d.bd7W(d7e, function (bH8z) {
            h7a.z7s(q7j.AE6y, 'message', bH8z)
        }, this)
    };
    b7g.bpa9R = function () {
        var bA7t = 500;
        return function () {
            X7Q = 0;
            RZ1x.disconnect();
            if (bA7t > 60000) bA7t = 500;
            bA7t *= 2
        }
    }();
    b7g.cwq4u = function (e7d, cb8T) {
        if (!!cb8T) {
            return this.bpa9R()
        }
        X7Q = 3;
        RZ1x.registerAndBind(e7d, function (o7h) {
            if (o7h.code != 200) {
                return this.bpa9R()
            }
            X7Q = 4
        }.g7b(this))
    };
    b7g.cEP6J = function () {
        dC9t.cwm4q.go0x().cEQ6K()
    };
    b7g.cES6M = function () {
        dC9t.cwm4q.go0x().cET6N()
    };
    b7g.brR0x = function () {
        var qx3x = !1;
        return function () {
            if (qx3x) return;
            qx3x = !0;
            this.cp8h('polling-init', {})
        }
    }();
    I7B.fI9z.A7t({
        event: 'message',
        element: q7j.AE6y
    })
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        dv9m = c7f('nej.p'),
        k7d = c7f('nej.u'),
        m7f = c7f('nm.l'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        cB8t = c7f('api'),
        b7g,
        K7D;
    var gi0x = a6g.ir0x('<div class="lyct f-cb"><div class="m-fdback"><div class="tip">任何产品中的问题，欢迎反馈给我们</div><div class="u-txtwrap f-pr"><textarea class="u-txt area" placeholder="请输入反馈内容"></textarea><span class="zs s-fc2">140</span></div><div class="u-txtwrap f-pr holder-parent"><textarea class="u-txt contact" placeholder="请留下联系方式（电话、QQ、邮箱）" maxLength="100"></textarea></div><div style="display:none" class="u-err"><i class="u-icn u-icn-25"></i>内容不能为空！</div></div><div class="lybtn f-tc"><a href="javascript:;" class="u-btn2 u-btn2-2 u-btn2-w4" hidefocus="true"><i>发送意见</i></a><a href="javascript:;" class="u-btn2 u-btn2-1 u-btn2-w4" hidefocus="true"><i>取 消</i></a></div></div>');
    m7f.brU0x = NEJ.C();
    b7g = m7f.brU0x.N7G(m7f.el9c);
    K7D = m7f.brU0x.ct8l;
    b7g.bk7d = function (e7d) {
        e7d.title = '意见反馈';
        this.bm7f(e7d)
    };
    b7g.cf8X = function () {
        this.ce8W = gi0x
    };
    b7g.bW8O = function () {
        this.cg8Y();
        this.hv0x = {};
        var Lq9h = a6g.H7A;
        var Ep7i = h7a.s7l;
        this.hv0x.submit_btn = Lq9h(this.n7g, 'u-btn2')[0];
        this.hv0x.cancle_btn = Lq9h(this.n7g, 'u-btn2')[1];
        this.hv0x.prompt_msg = Lq9h(this.n7g, 'u-err')[0];
        this.hv0x.zs = Lq9h(this.n7g, 'zs')[0];
        a6g.ba7T(this.hv0x.zs, 'display', 'none');
        this.hv0x.fb_txt = Lq9h(this.n7g, 'u-txt')[0];
        this.hv0x.contact = Lq9h(this.n7g, 'u-txt')[1];
        a6g.gr0x(this.hv0x.fb_txt, 'holder');
        a6g.gr0x(this.hv0x.contact, 'holder');
        if (a6g.bE8w(this.hv0x.fb_txt.parentNode, 'holder-parent')) {
            a6g.ba7T(this.hv0x.fb_txt.parentNode, 'display', 'block')
        }
        if (a6g.bE8w(this.hv0x.contact.parentNode, 'holder-parent')) {
            a6g.ba7T(this.hv0x.contact.parentNode, 'display', 'block')
        }
        Ep7i(this.hv0x.submit_btn, 'click', this.cwj4n.g7b(this));
        Ep7i(this.hv0x.cancle_btn, 'click', this.cwh4l.g7b(this));
        Ep7i(this.hv0x.prompt_msg, 'msgShow', this.cwg4k.g7b(this));
        Ep7i(this.hv0x.fb_txt, 'keyup', this.uI4M.g7b(this));
        Ep7i(this.hv0x.fb_txt, 'input', this.fO9F.g7b(this));
        Ep7i(this.hv0x.contact, 'keyup', this.cwf4j.g7b(this));
        Ep7i(this.hv0x.contact, 'input', this.bHu4y.g7b(this));
        this.kH1x = q7j.hT0x.A7t()
    };
    b7g.cwj4n = function (d7e) {
        h7a.bh7a(d7e);
        if (this.cO8G()) return;
        var bo7h = this.hv0x.fb_txt.value.trim();
        var bq7j = bo7h.length;
        var e7d = {
            type: 'json',
            method: 'post',
            noEnc: true
        };
        var bHE4I = this.hv0x.contact.value.trim();
        var Yl3x = {
            ua: navigator.userAgent,
            hash: top.location.hash,
            href: location.href,
            flash: l7e.bpm9d(),
            contact: bHE4I
        };
        var j7c = {
                content: bo7h,
                client: 'web',
                xInfo: JSON.stringify(Yl3x)
            },
            nT2x = this.kH1x.cBZ6T();
        if (nT2x && nT2x.length) {
            j7c.log = nT2x.join('\n')
        }
        if (bq7j == 0) {
            this.hv0x.prompt_msg.innerHTML = '反馈内容不能为空';
            a6g.ba7T(this.hv0x.prompt_msg, 'display', 'block');
            return
        }
        if (bHE4I.length > 100) {
            this.hv0x.prompt_msg.innerHTML = '联系方式最多只能输入100个字符';
            a6g.ba7T(this.hv0x.prompt_msg, 'display', 'block');
            return
        }
        this.cO8G(true);
        e7d.data = k7d.cC8u(j7c);
        e7d.onload = this.cwe4i.g7b(this);
        e7d.onerror = this.iN0x.g7b(this);
        v7o.bn7g('/api/feedback/web', e7d)
    };
    b7g.fO9F = function (d7e) {
        var bq7j = this.hv0x.fb_txt.value.trim().length;
        if (bq7j > 0) a6g.ba7T(this.hv0x.prompt_msg, 'display', 'none');
        dv9m.dr9i.browser == 'ie' && dv9m.dr9i.version < '7.0' ? setTimeout(this.gj0x.g7b(this), 0) : this.gj0x()
    };
    b7g.uI4M = function (d7e) {
        if (d7e.keyCode === 8) this.gj0x()
    };
    b7g.gj0x = function () {
        var bq7j = this.hv0x.fb_txt.value.trim().length;
        this.hv0x.zs.innerHTML = !bq7j ? '0/140' : bq7j + '/140'
    };
    b7g.bHu4y = function (d7e) {
        var bq7j = this.hv0x.contact.value.trim().length;
        if (bq7j > 0) a6g.ba7T(this.hv0x.prompt_msg, 'display', 'none')
    };
    b7g.cwf4j = function (d7e) {
        if (d7e.keyCode === 8) this.bHu4y()
    };
    b7g.cwh4l = function (d7e) {
        h7a.cr8j(d7e);
        this.bt7m()
    };
    b7g.cwg4k = function (d7e) {
        var f7c = h7a.W7P(d7e);
        f7c.innerHTML = '请输入反馈内容'
    };
    b7g.cEU6O = function (cEW6Q) {
        var f7c = h7a.W7P(d7e);
        f7c.innerHTML = ''
    };
    b7g.cwe4i = function (o7h) {
        this.cO8G(false);
        this.bt7m();
        m7f.Z7S.L7E({
            tip: '意见发送成功',
            autoclose: true
        })
    };
    b7g.iN0x = function (o7h) {
        this.cO8G(false);
        m7f.Z7S.L7E({
            tip: '意见发送失败',
            autoclose: true
        })
    };
    b7g.cO8G = function (cZ8R) {
        return this.dY9P(this.hv0x.submit_btn, cZ8R, '发送意见', '发送中...')
    };
    b7g.L7E = function () {
        K7D.L7E.call(this);
        this.cO8G(false);
        this.hv0x.fb_txt.value = '';
        this.hv0x.contact.value = '';
        a6g.ba7T(this.hv0x.prompt_msg, 'display', 'none');
        this.gj0x()
    };
    l7e.cwa4e = function (e7d) {
        e7d = e7d || {};
        if (e7d.title === undefined) e7d.title = '意见反馈';
        m7f.brU0x.L7E(e7d)
    };
    cB8t.feedback = l7e.feedback = l7e.cwa4e
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        O7H = c7f('nej.ui'),
        b7g;
    if (!!O7H.zW6Q) return;
    O7H.zW6Q = NEJ.C();
    b7g = O7H.zW6Q.N7G(O7H.eg9X);
    b7g.cx8p = function () {
        this.hb0x = this.bID4H();
        this.cF8x()
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.co8g = e7d.index;
        this.gA0x = e7d.total;
        this.hA0x = e7d.range;
        this.gD0x(e7d.data)
    };
    b7g.bD8v = function () {
        this.bG8y();
        delete this.bl7e;
        delete this.co8g;
        delete this.gA0x;
        delete this.hA0x
    };
    b7g.iv0x = br7k;
    b7g.bID4H = function () {
        var gI0x = +(new Date);
        return function () {
            return 'itm-' + ++gI0x
        }
    }();
    b7g.FK7D = function () {
        return this.hb0x
    };
    b7g.ia0x = function () {
        return this.bl7e
    };
    b7g.gD0x = function (j7c) {
        this.bl7e = j7c || {};
        this.iv0x(this.bl7e)
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        O7H = c7f('nej.ui'),
        b7g,
        K7D;
    if (!!O7H.uM4Q) return;
    O7H.uM4Q = NEJ.C();
    b7g = O7H.uM4Q.N7G(O7H.zW6Q);
    K7D = O7H.uM4Q.ct8l;
    b7g.bk7d = function (e7d) {
        this.cvY4c = e7d.pkey || 'id';
        this.bm7f(e7d)
    };
    b7g.EP7I = function (j7c) {
        this.z7s('ondelete', {
            ext: j7c,
            id: this.FK7D(),
            data: this.ia0x(),
            body: this.lA1x()
        })
    };
    b7g.td3x = function (j7c) {
        this.z7s('onupdate', {
            ext: j7c,
            id: this.FK7D(),
            data: this.ia0x(),
            body: this.lA1x()
        })
    };
    b7g.gD0x = function (j7c) {
        K7D.gD0x.apply(this, arguments);
        this.hb0x = this.bl7e[this.cvY4c] || this.bID4H()
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        fA9r = NEJ.R,
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ui'),
        b7g,
        iR0x,
        bus1x;
    if (!!O7H.buy1x) return;
    O7H.buy1x = NEJ.C();
    b7g = O7H.buy1x.N7G(O7H.eg9X);
    b7g.bk7d = function (e7d) {
        this.Yp3x = NEJ.X({}, e7d);
        this.fP9G = NEJ.X({}, e7d);
        delete this.Yp3x.onchange;
        this.fP9G.onchange = this.fU0x.g7b(this);
        this.bm7f(e7d);
        this.cvX4b({
            number: e7d.number,
            label: e7d.label || bb7U
        })
    };
    b7g.bD8v = function () {
        this.bG8y();
        if (!!this.ln1x) {
            this.ln1x.T7M();
            delete this.ln1x
        }
        delete this.Yp3x;
        delete this.fP9G;
        this.cvW4a();
        this.n7g.innerHTML = '&nbsp;'
    };
    b7g.cf8X = function () {
        this.me1x = iR0x
    };
    b7g.cvX4b = function (j7c) {
        a6g.dA9r(this.n7g, bus1x, j7c);
        var gI0x = a6g.JR9I();
        this.fP9G.list = a6g.H7A(this.n7g, 'js-i-' + gI0x);
        this.fP9G.pbtn = (a6g.H7A(this.n7g, 'js-p-' + gI0x) || fA9r)[0];
        this.fP9G.nbtn = (a6g.H7A(this.n7g, 'js-n-' + gI0x) || fA9r)[0]
    };
    b7g.bW8O = function () {
        this.cg8Y()
    };
    b7g.cEY6S = function (j7c) {
        return a6g.bZ8R(bus1x, j7c)
    };
    b7g.fU0x = function (d7e) {
        if (this.Rh1x) return;
        var r7k = d7e.index,
            cy8q = d7e.total;
        this.Rh1x = !0;
        this.Rg1x(r7k, cy8q);
        k7d.bd7W(this.Yr3x, function (sZ3x) {
            sZ3x.Rg1x(r7k, cy8q)
        });
        this.Rh1x = !1;
        this.z7s('onchange', d7e)
    };
    b7g.g7b = function (bI8A) {
        bI8A = a6g.B7u(bI8A);
        if (!bI8A) return this;
        var cq8i = NEJ.X({}, this.Yp3x);
        cq8i.parent = bI8A;
        cq8i.index = this.sY3x();
        cq8i.total = this.kg1x();
        var sZ3x = this.constructor.A7t(cq8i);
        sZ3x.wJ5O('onchange', this.fP9G.onchange);
        if (!this.Yr3x) this.Yr3x = [];
        this.Yr3x.push(sZ3x);
        return this
    };
    b7g.cvW4a = function () {
        var bup1x = function (sZ3x, r7k, i7b) {
            sZ3x.T7M();
            i7b.splice(r7k, 1)
        };
        return function () {
            k7d.nz2x(this.Yr3x, bup1x)
        }
    }();
    b7g.kW1x = function (r7k) {
        if (!this.ln1x) return;
        this.ln1x.kW1x(r7k)
    };
    b7g.sY3x = function () {
        if (!this.ln1x) return 1;
        return this.ln1x.sY3x()
    };
    b7g.kg1x = function () {
        if (!this.ln1x) return 1;
        return this.ln1x.kg1x()
    };
    b7g.Rg1x = function (r7k, cy8q) {
        if (!this.ln1x) return;
        this.ln1x.Rg1x(r7k, cy8q)
    };
    b7g.bvB1x = function (cy8q) {
        if (!this.ln1x) return;
        this.ln1x.bvB1x(cy8q)
    };
    iR0x = a6g.sW3x('.#<uispace>{font-size:12px;line-height:160%;}.#<uispace> a{margin:0 2px;padding:2px 8px;color:#333;border:1px solid #aaa;text-decoration:none;}.#<uispace> .js-disabled{cursor:default;}.#<uispace> .js-selected{cursor:default;background:#bbb;}');
    bus1x = a6g.ex9o('{trim}{if !defined("noprv")||!noprv}<a href="#" class="zbtn zprv ${\'js-p-\'|seed}">${label.prev||"上一页"}</a>{/if}{list 1..number as x}<a href="#" class="zpgi zpg${x} ${\'js-i-\'|seed}"></a>{/list}{if !defined("nonxt")||!nonxt}<a href="#" class="zbtn znxt ${\'js-n-\'|seed}">${label.next||"下一页"}</a>{/if}{/trim}')
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        O7H = c7f('nej.ut'),
        b7g;
    if (!!O7H.Yt3x) return;
    O7H.Yt3x = NEJ.C();
    b7g = O7H.Yt3x.N7G(O7H.cI8A);
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.Yw3x = e7d.pbtn;
        this.cs8k = e7d.nbtn;
        this.YB3x = e7d.sbtn;
        this.YF3x = e7d.ebtn;
        this.jo1x = e7d.event || 'click';
        this.kT1x = e7d.selected || 'js-selected';
        this.nY2x = e7d.disabled || 'js-disabled';
        this.cvU4Y(e7d.list);
        this.Rg1x(e7d.index || 1, e7d.total || 1)
    };
    b7g.bD8v = function () {
        this.bG8y();
        delete this.bU8M;
        delete this.jo1x;
        delete this.Yw3x;
        delete this.cs8k;
        delete this.YB3x;
        delete this.YF3x;
        delete this.bLq5v;
        delete this.gA0x;
        delete this.co8g;
        delete this.kT1x;
        delete this.nY2x
    };
    b7g.cvU4Y = function () {
        var bfa5f = function (f7c) {
            this.bU8M.push(f7c);
            this.bX8P([
                [f7c,
                    this.jo1x,
                    this.cv8n.ey9p(this, 0)
                ]
            ])
        };
        return function (i7b) {
            this.bU8M = [];
            this.bX8P([
                [this.Yw3x,
                    'click',
                    this.cv8n.ey9p(this, -1)
                ],
                [
                    this.cs8k,
                    'click',
                    this.cv8n.ey9p(this, 1)
                ],
                [
                    this.YB3x,
                    'click',
                    this.cv8n.ey9p(this, -2)
                ],
                [
                    this.YF3x,
                    'click',
                    this.cv8n.ey9p(this, 2)
                ]
            ]);
            k7d.bd7W(i7b, bfa5f, this)
        }
    }();
    b7g.Fu7n = function (f7c, r7k) {
        if (r7k == null) {
            f7c.innerText = '';
            a6g.ba7T(f7c, 'display', 'none');
            a6g.x7q(f7c, this.kT1x)
        } else {
            f7c.innerText = r7k;
            a6g.ba7T(f7c, 'display', '');
            r7k == this.co8g ? a6g.y7r(f7c, this.kT1x) : a6g.x7q(f7c, this.kT1x)
        }
    };
    b7g.bfl5q = function () {
        if (this.co8g <= 1) {
            a6g.y7r(this.Yw3x, this.nY2x);
            a6g.y7r(this.YB3x, this.nY2x)
        } else {
            a6g.x7q(this.Yw3x, this.nY2x);
            a6g.x7q(this.YB3x, this.nY2x)
        }
        if (this.co8g >= this.gA0x) {
            a6g.y7r(this.cs8k, this.nY2x);
            a6g.y7r(this.YF3x, this.nY2x)
        } else {
            a6g.x7q(this.cs8k, this.nY2x);
            a6g.x7q(this.YF3x, this.nY2x)
        }
    };
    b7g.YO3x = br7k;
    b7g.bfJ5O = function () {
        this.YO3x();
        this.bfl5q();
        this.z7s('onchange', {
            last: this.bLq5v,
            total: this.gA0x,
            index: this.co8g,
            ext: this.bfK5P
        })
    };
    b7g.bMf5k = function (r7k) {
        r7k = parseInt(r7k);
        if (isNaN(r7k) || this.gA0x == null) return !1;
        r7k = Math.max(1, Math.min(r7k, this.gA0x));
        this.bLq5v = this.co8g;
        this.co8g = r7k;
        return !0
    };
    b7g.bfN5S = function (cy8q) {
        cy8q = parseInt(cy8q);
        if (isNaN(cy8q) || cy8q < 1) return !1;
        this.gA0x = cy8q;
        return !0
    };
    b7g.cv8n = function (d7e, fd9U) {
        h7a.cr8j(d7e);
        var F7y = h7a.W7P(d7e);
        if (!F7y || a6g.bE8w(F7y, this.kT1x) || a6g.bE8w(F7y, this.nY2x)) return;
        var r7k = F7y.innerText;
        switch (fd9U) {
        case 1:
        case -1:
            r7k = this.co8g + fd9U;
            break;
        case 2:
            r7k = this.gA0x;
            break;
        case -2:
            r7k = 1;
            break
        }
        this.kW1x(r7k)
    };
    b7g.sY3x = function () {
        return this.co8g
    };
    b7g.kW1x = function (r7k) {
        var cvT4X = this.co8g;
        this.bMf5k(r7k);
        if (cvT4X != this.co8g) this.bfJ5O();
        return this
    };
    b7g.kg1x = function () {
        return this.gA0x
    };
    b7g.RN1x = function (cy8q) {
        if (this.bfN5S(cy8q) && this.co8g != null) {
            this.co8g = 1;
            this.bfJ5O()
        }
        return this
    };
    b7g.bvB1x = function (cy8q) {
        if (this.bfN5S(cy8q)) {
            this.YO3x();
            this.bfl5q()
        }
        return this
    };
    b7g.Rg1x = function (r7k, cy8q) {
        if (!this.bfN5S(cy8q) || !this.bMf5k(r7k)) return this;
        this.bfJ5O();
        return this
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        cX8P = c7f('nej.x'),
        O7H = c7f('nej.ut'),
        b7g;
    if (!!O7H.Qt0x) return;
    O7H.Qt0x = NEJ.C();
    b7g = O7H.Qt0x.N7G(O7H.Yt3x);
    b7g.cx8p = function () {
        this.cF8x();
        var f7c = a6g.dh9Y('span', 'zdot');
        f7c.innerText = '...';
        this.YV3x = [
            f7c.cloneNode(true),
            f7c
        ]
    };
    b7g.bD8v = function () {
        this.bG8y();
        this.bMT5Y()
    };
    b7g.bMT5Y = function () {
        a6g.mT2x(this.YV3x[0]);
        a6g.mT2x(this.YV3x[1])
    };
    b7g.YO3x = function () {
        this.bfK5P = {
            last: !1,
            first: !1,
            list: this.bU8M
        };
        this.bMT5Y();
        this.Fu7n(this.bU8M[0], 1);
        var bM8E = 1,
            bq7j = this.bU8M.length;
        if (this.gA0x < bq7j) {
            for (var rq3x; bM8E < bq7j; bM8E++) {
                rq3x = bM8E + 1;
                this.Fu7n(this.bU8M[bM8E], rq3x > this.gA0x ? null : rq3x)
            }
            return
        }
        if (this.co8g > 1) {
            var cH8z = Math.floor((bq7j - 2) / 2),
                cvS4W = this.gA0x - bq7j + 2,
                hD0x = Math.max(2, this.co8g - cH8z);
            if (this.gA0x >= bq7j) {
                hD0x = Math.min(hD0x, cvS4W)
            }
            if (hD0x > 2) {
                this.bU8M[0].insertAdjacentElement('afterEnd', this.YV3x[0]);
                this.bfK5P.first = !0
            }
            for (var r7k;; bM8E++) {
                r7k = hD0x + bM8E - 1;
                if (r7k > this.co8g) break;
                this.Fu7n(this.bU8M[bM8E], r7k)
            }
        }
        if (this.co8g < this.gA0x) {
            var r7k,
                hD0x = this.co8g + 1;
            for (var i = 0, l = bq7j - 2;; i++, bM8E++) {
                r7k = hD0x + i;
                if (bM8E > l || r7k > this.gA0x) break;
                this.Fu7n(this.bU8M[bM8E], r7k)
            }
            if (r7k < this.gA0x) {
                this.bU8M[bM8E].insertAdjacentElement('beforeBegin', this.YV3x[1]);
                this.bfK5P.last = !0
            }
            if (r7k <= this.gA0x) {
                this.Fu7n(this.bU8M[bM8E++], this.gA0x)
            }
        }
        for (; bM8E < bq7j; bM8E++) {
            this.Fu7n(this.bU8M[bM8E])
        }
    };
    a6g.cvR4V = cX8P.cvR4V = function (bI8A, e7d) {
        var C7v = a6g.lM1x(bI8A);
        if (!C7v) return null;
        if (!O7H.bbS4W(C7v, O7H.Qt0x)) {
            e7d = e7d || {};
            var i7b = !e7d.clazz ? a6g.dk9b(C7v) : a6g.H7A(C7v, e7d.clazz);
            e7d.pbtn = i7b.shift();
            e7d.nbtn = i7b.pop();
            e7d.list = i7b;
            delete e7d.clazz
        }
        return O7H.bbS4W(C7v, O7H.Qt0x, e7d || bb7U)
    };
    cX8P.isChange = !0
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        fA9r = NEJ.R,
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        O7H = c7f('nej.ui'),
        b7g,
        K7D,
        gi0x;
    if (!!O7H.Qm0x) return;
    O7H.Qm0x = NEJ.C();
    b7g = O7H.Qm0x.N7G(O7H.buy1x);
    K7D = O7H.Qm0x.ct8l;
    b7g.bk7d = function (e7d) {
        e7d.number = parseInt(e7d.number) || 9;
        this.bm7f(e7d);
        this.ln1x = I7B.Qt0x.A7t(this.fP9G)
    };
    b7g.fU0x = function (d7e) {
        if (!!this.Yp3x.noend) {
            var bNr5w = d7e.ext || bb7U,
                i7b = bNr5w.list || fA9r;
            if (bNr5w.last) {
                a6g.ba7T(i7b[i7b.length - 1], 'display', 'none')
            }
        }
        K7D.fU0x.apply(this, arguments)
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        bc7V = c7f('nej.ui'),
        O7H = c7f('nej.ut'),
        b7g;
    if (!!O7H.Zd3x) return;
    O7H.Zd3x = NEJ.C();
    b7g = O7H.Zd3x.N7G(O7H.cI8A);
    b7g.bk7d = function (e7d) {
        this.ju1x = {};
        this.bm7f(e7d);
        this.ij0x = a6g.B7u(e7d.parent);
        this.fn9e = {
            parent: this.ij0x
        };
        this.oL2x = parseInt(e7d.limit) || 10;
        this.yD5I = parseInt(e7d.first) || this.oL2x;
        this.cvQ4U(e7d.item);
        this.cvP4T(e7d.cache || bb7U);
        this.cvO4S(e7d.pager || bb7U);
        this.gD0x()
    };
    b7g.bD8v = function () {
        this.z7s('onbeforerecycle');
        this.Qa0x();
        this.bG8y();
        if (this.ju1x.clear) {
            this.S7L.uZ4d(this.ju1x.key)
        }
        this.S7L.T7M();
        if (!!this.jw1x) {
            this.jw1x.T7M();
            delete this.jw1x
        }
        delete this.bNT5Y;
        delete this.fP9G;
        delete this.Zi3x;
        delete this.S7L;
        delete this.ij0x;
        delete this.PX0x;
        delete this.fn9e;
        delete this.ju1x
    };
    b7g.bOh5m = function () {
        var dg9X = /\{(.*?)\}/gi,
            cvN4R = function (pi2x, j7c) {
                return (pi2x || '{id}{seed}').replace(dg9X, function ($1, $2) {
                    var D7w = j7c[$2];
                    return D7w == null ? $1 : D7w
                })
            };
        return function (C7v) {
            var J7C = cvN4R(this.fn9e.jstIdTempalte, {
                id: C7v,
                seed: a6g.JR9I()
            });
            if (!this.fn9e.jstIdType) {
                return a6g.B7u(J7C)
            } else if (this.fn9e.jstIdType == 1) {
                return (a6g.H7A(this.ij0x, J7C) || [])[0]
            }
        }
    }();
    b7g.Ao6i = function (bM8E, bi7b, fY0x, bq7j) {
        var o7h = {
            index: 1,
            total: 1
        };
        if (bi7b >= bM8E) {
            o7h.index = Math.floor((bi7b - bM8E) / fY0x) + 2
        }
        if (bq7j > bM8E) {
            o7h.total = Math.ceil((bq7j - bM8E) / fY0x) + 1
        }
        return o7h
    };
    b7g.bOz6t = function (J7C) {
        delete this.PX0x;
        this.KG9x = J7C;
        this.bX8P([
            [this.ij0x,
                'click',
                this.cvM4Q.g7b(this)
            ]
        ])
    };
    b7g.cvQ4U = function (p7i) {
        if (k7d.fH9y(p7i)) {
            this.bOz6t(p7i);
            return
        }
        NEJ.X(this.fn9e, p7i);
        var ea9R = this.fn9e.klass;
        delete this.fn9e.klass;
        if (k7d.fH9y(ea9R)) {
            this.bOz6t(ea9R);
            return
        }
        delete this.KG9x;
        this.PX0x = ea9R;
        this.fn9e.ondelete = this.z7s.g7b(this, 'ondelete');
        this.fn9e.onupdate = this.z7s.g7b(this, 'onupdate')
    };
    b7g.cvP4T = function (R7K) {
        var ea9R = R7K.klass,
            ks1x = NEJ.X({}, R7K);
        this.ju1x.key = ks1x.lkey;
        this.ju1x.data = ks1x.data || {};
        this.ju1x.clear = !!ks1x.clear;
        this.fn9e.pkey = ks1x.key || 'id';
        ks1x.onlistload = this.bha5f.g7b(this);
        ks1x.onpullrefresh = this.cvL4P.g7b(this);
        if (!!ea9R && 'onlistchange' in ea9R) {
            this.bX8P([
                [ea9R,
                    'listchange',
                    this.bhl6f.g7b(this)
                ]
            ])
        } else {
            ks1x.onitemadd = this.Zv3x.g7b(this);
            ks1x.onitemdelete = this.Zw3x.g7b(this);
            ks1x.onitemupdate = this.bPG6A.g7b(this)
        }
        this.S7L = (ea9R || O7H.RE1x).A7t(ks1x);
        if (R7K.total != null) {
            this.S7L.RN1x(this.ju1x.key, R7K.total)
        }
        if (!!R7K.list) {
            this.S7L.uc4g(this.ju1x.key, R7K.list)
        }
    };
    b7g.cvO4S = function (sZ3x) {
        this.bNT5Y = sZ3x.klass || bc7V.Qm0x;
        this.fP9G = NEJ.X({}, sZ3x);
        if (k7d.eJ9A(sZ3x.parent)) {
            this.fP9G.parent = sZ3x.parent[0];
            this.PE0x = sZ3x.parent.slice(1);
            if (!this.PE0x || !this.PE0x.length) {
                delete this.PE0x
            }
        }
        delete this.fP9G.klass
    };
    b7g.Qa0x = function () {
        var gK0x = /^(?:table|tr|tbody|ul|ol|select)$/i;
        return function () {
            this.z7s('onbeforelistclear', {
                parent: this.ij0x
            });
            if (!!this.fK9B && this.fK9B.length > 0) {
                this.fK9B = this.PX0x.T7M(this.fK9B);
                delete this.fK9B
            }
            if (gK0x.test(this.ij0x.tagName)) {
                a6g.byi2x(this.ij0x)
            } else {
                this.ij0x.innerHTML = ''
            }
        }
    }();
    b7g.bhI6C = function (ZB3x) {
        if (!!this.fP9G.fixed) return;
        a6g.ba7T(this.fP9G.parent, 'display', ZB3x);
        k7d.bd7W(this.PE0x, function (bI8A) {
            a6g.ba7T(bI8A, 'display', ZB3x)
        }, this)
    };
    b7g.bhT6N = function () {
        var r7k = this.fP9G.index || 1;
        delete this.fP9G.index;
        if (!!this.jw1x) {
            r7k = this.jw1x.sY3x()
        }
        this.AC6w({
            last: r7k,
            index: r7k
        })
    };
    b7g.AC6w = function (d7e) {
        this.z7s('onpagechange', d7e)
    };
    b7g.bQe6Y = function (bi7b) {
        this.ju1x.offset = bi7b;
        this.XO3x()
    };
    b7g.bQg6a = function (e7d) {
        return e7d
    };
    b7g.XO3x = function () {
        this.Pv0x();
        var j7c = this.ju1x.data;
        j7c.offset = this.ju1x.offset;
        var pD2x = j7c.offset == 0;
        j7c.total = pD2x;
        this.ju1x.limit = pD2x ? this.yD5I : this.oL2x;
        j7c.limit = this.ju1x.limit;
        this.S7L.lQ1x(this.bQg6a(NEJ.X({}, this.ju1x)))
    };
    b7g.bha5f = function (e7d) {
        if (e7d.key != this.ju1x.key || e7d.offset != this.ju1x.offset) return;
        this.ZD3x();
        var i7b = this.S7L.hI0x(e7d.key);
        if (!i7b || !i7b.length) {
            this.bic7V();
            return
        }
        var fY0x = e7d.limit,
            bi7b = e7d.offset;
        if (this.bim7f(i7b, bi7b, fY0x)) return;
        this.z7s('onbeforelistrender', {
            list: i7b,
            offset: bi7b,
            parent: this.ij0x
        });
        if (!!this.KG9x) {
            this.fn9e.xlist = i7b;
            this.fn9e.beg = bi7b;
            this.fn9e.end = Math.min(i7b.length, bi7b + fY0x) - 1;
            this.fn9e.act = 'list';
            var dQ9H = a6g.bZ8R(this.KG9x, this.fn9e);
            this.Pm0x(dQ9H)
        } else {
            this.fn9e.limit = fY0x;
            this.fn9e.offset = bi7b;
            var hp0x = a6g.Cq6k(i7b, this.PX0x, this.fn9e);
            this.Pl0x(hp0x)
        }
        this.z7s('onafterlistrender', {
            list: i7b,
            offset: bi7b,
            parent: this.ij0x
        })
    };
    b7g.cvL4P = function (e7d) {
        if (!this.Zi3x) return;
        delete this.Zi3x;
        this.ZD3x('onafterpullrefresh');
        this.gD0x()
    };
    b7g.bQP7I = function (r7k, cy8q) {
        if (!!this.jw1x) {
            var wE5J = this.jw1x.sY3x(),
                cvK4O = this.jw1x.kg1x();
            if (wE5J > cy8q || cy8q != cvK4O) {
                this.jw1x.T7M();
                delete this.jw1x;
                this.AC6w({
                    last: wE5J,
                    index: Math.min(r7k, cy8q)
                });
                return !0
            }
        } else {
            this.fP9G.index = r7k;
            this.fP9G.total = cy8q;
            this.jw1x = this.bNT5Y.A7t(this.fP9G);
            this.jw1x.wJ5O('onchange', this.AC6w.g7b(this));
            k7d.bd7W(this.PE0x, function (bI8A) {
                this.jw1x.g7b(bI8A)
            }, this)
        }
    };
    b7g.ZK3x = function () {
        var gI0x = +(new Date);
        return function (j7c) {
            var C7v = j7c[this.fn9e.pkey];
            if (!C7v) {
                j7c['dirty-data'] = !0;
                j7c[this.fn9e.pkey] = 'dirty-' + gI0x++
            }
            return j7c
        }
    }();
    b7g.ZO3x = function (j7c) {
        var C7v = j7c[this.fn9e.pkey];
        if (!!j7c['dirty-data']) {
            delete j7c['dirty-data'];
            delete j7c[this.fn9e.pkey]
        }
        return C7v
    };
    b7g.ZR3x = function () {
        var cvI4M = function (kJ1x, mq1x) {
            this.ij0x.insertAdjacentElement(kJ1x, mq1x)
        };
        return function (kJ1x, j7c) {
            var Kb9S = [
                j7c
            ];
            if (!!this.KG9x) {
                this.fn9e.xlist = Kb9S;
                this.fn9e.beg = 0;
                this.fn9e.end = 0;
                this.fn9e.act = 'add';
                this.Pm0x(a6g.bZ8R(this.KG9x, this.fn9e), kJ1x)
            } else {
                this.fn9e.limit = 1;
                this.fn9e.offset = 0;
                this.fn9e.parent = cvI4M.g7b(this, kJ1x);
                var hp0x = a6g.Cq6k(Kb9S, this.PX0x, this.fn9e);
                this.fn9e.parent = this.ij0x;
                this.Pl0x(hp0x)
            }
        }
    }();
    b7g.Pv0x = br7k;
    b7g.ZD3x = function (V7O) {
        var d7e = {
            parent: this.ij0x
        };
        this.z7s(V7O || 'onafterlistload', d7e);
        if (!d7e.stopped) {
            a6g.mT2x(this.cu8m)
        }
    };
    b7g.bim7f = br7k;
    b7g.bad3x = function (bH8z, kJ1x) {
        if (k7d.fH9y(bH8z)) {
            if (!this.cu8m) this.cu8m = a6g.dh9Y('div');
            this.cu8m.innerHTML = bH8z
        } else {
            this.cu8m = bH8z
        }
        this.ij0x.insertAdjacentElement(kJ1x || 'beforeEnd', this.cu8m)
    };
    b7g.yF5K = function (V7O, kv1x, kJ1x) {
        var d7e = {
            parent: this.ij0x
        };
        this.z7s(V7O, d7e);
        if (!d7e.stopped) {
            this.bad3x(d7e.value || kv1x, kJ1x)
        }
    };
    b7g.bic7V = br7k;
    b7g.Pm0x = br7k;
    b7g.Pl0x = br7k;
    b7g.cvM4Q = function () {
        var gK0x = /^(?:delete|update)$/;
        return function (d7e) {
            var f7c = h7a.W7P(d7e, 'd:action');
            if (!f7c) return;
            var U7N = a6g.t7m(f7c, 'action');
            if (!gK0x.test(U7N)) return;
            var C7v = a6g.t7m(f7c, 'id');
            if (!C7v) return;
            var p7i = this.S7L.eH9y(C7v);
            if (!p7i) return;
            h7a.bh7a(d7e);
            this.z7s('on' + U7N, {
                data: p7i,
                id: p7i[this.fn9e.pkey],
                body: a6g.B7u(this.bOh5m(C7v))
            })
        }
    }();
    b7g.Zv3x = br7k;
    b7g.XL3x = function (d7e) {
        var j7c = d7e.data || {},
            e7d = {
                data: j7c,
                key: this.ju1x.key,
                id: j7c[this.fn9e.pkey]
            };
        this.z7s('onbeforedelete', e7d);
        this.S7L.Lw9n(e7d)
    };
    b7g.Zw3x = br7k;
    b7g.XJ3x = function (d7e) {
        var j7c = d7e.data || {},
            e7d = {
                data: j7c,
                key: this.ju1x.key
            };
        this.z7s('onbeforeupdate', e7d);
        this.S7L.XQ3x(e7d)
    };
    b7g.bPG6A = function (d7e) {
        this.OU0x(d7e, 'onafterupdate');
        if (d7e.stopped) return;
        var C7v = d7e.data[this.fn9e.pkey];
        if (!!this.fK9B) {
            var p7i = a6g.bCS3x(C7v);
            if (!!p7i) p7i.gD0x(d7e.data)
        } else {
            var f7c = a6g.B7u(C7v + '' + a6g.JR9I());
            if (!f7c) return;
            var i7b = this.S7L.hI0x(d7e.key),
                r7k = k7d.dj9a(i7b, d7e.data);
            if (r7k < 0) return;
            this.fn9e.list = i7b;
            this.fn9e.beg = r7k;
            this.fn9e.end = r7k;
            this.fn9e.act = 'update';
            var dQ9H = a6g.bZ8R(this.KG9x, this.fn9e);
            f7c.insertAdjacentHTML('afterEnd', dQ9H);
            a6g.cJ8B(f7c)
        }
    };
    b7g.OU0x = function (d7e, V7O) {
        var p7i = d7e.data;
        if (!p7i || p7i[this.fn9e.pkey] == null) {
            this.z7s('onerror', d7e);
            d7e.stopped = !0
        }
        if (!d7e.stopped) {
            this.z7s(V7O, d7e)
        }
    };
    b7g.bjp7i = br7k;
    b7g.bjq7j = br7k;
    b7g.bhl6f = function (d7e) {
        if (d7e.key != this.ju1x.key) return;
        switch (d7e.action) {
        case 'add':
            this.Zv3x(d7e);
            break;
        case 'delete':
            this.Zw3x(d7e);
            break;
        case 'update':
            this.bPG6A(d7e);
            break;
        case 'refresh':
            this.gD0x();
            break;
        case 'unshift':
            this.bjq7j(d7e.offset, d7e.limit);
            break;
        case 'append':
            this.bjp7i(d7e.offset, d7e.limit);
            break
        }
    };
    b7g.pu2x = function (p7i) {
        this.XJ3x({
            data: p7i
        })
    };
    b7g.mH2x = function (p7i) {
        this.XL3x({
            data: p7i
        })
    };
    b7g.sK3x = function (p7i) {
        this.S7L.jE1x({
            data: p7i,
            key: this.ju1x.key
        })
    };
    b7g.sJ3x = function () {
        return this.S7L
    };
    b7g.bjt7m = function (j7c) {
        this.ZR3x('afterBegin', this.ZK3x(j7c));
        return this.ZO3x(j7c)
    };
    b7g.bRE7x = function (j7c) {
        this.ZR3x('beforeEnd', this.ZK3x(j7c));
        return this.ZO3x(j7c)
    };
    b7g.gD0x = function () {
        this.Qa0x();
        this.bhT6N()
    };
    b7g.cEZ6T = function () {
        this.S7L.uZ4d(this.ju1x.key);
        this.gD0x()
    };
    b7g.bra0x = function () {
        if (!!this.Zi3x) return;
        this.Zi3x = !0;
        this.yF5K('onbeforepullrefresh', '列表刷新中...', 'afterBegin');
        this.S7L.bra0x({
            key: this.ju1x.key,
            data: this.ju1x.data
        })
    };
    b7g.kg1x = function () {
        return this.S7L.kg1x(this.ju1x.key)
    };
    b7g.bRO7H = function () {
        return this.jw1x
    };
    b7g.Ya3x = function () {
        return this.S7L.Ya3x(this.ju1x.key)
    };
    b7g.cvG4K = function () {
        return this.fK9B
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        fA9r = NEJ.R,
        k7d = c7f('nej.u'),
        a6g = c7f('nej.e'),
        O7H = c7f('nej.ut'),
        b7g,
        K7D;
    if (!!O7H.kt1x) return;
    O7H.kt1x = NEJ.C();
    b7g = O7H.kt1x.N7G(O7H.Zd3x);
    K7D = O7H.kt1x.ct8l;
    b7g.Ao6i = function (bi7b, bq7j) {
        return K7D.Ao6i.call(this, this.yD5I, bi7b, this.oL2x, bq7j)
    };
    b7g.bjv7o = function (r7k) {
        var bi7b = 0;
        if (r7k > 1) bi7b = this.yD5I + (r7k - 2) * this.oL2x;
        return bi7b
    };
    b7g.AC6w = function (d7e) {
        K7D.AC6w.apply(this, arguments);
        if (!d7e.stopped) {
            this.bQe6Y(this.bjv7o(d7e.index))
        }
    };
    b7g.Pv0x = function () {
        this.Qa0x();
        this.yF5K('onbeforelistload', '列表加载中...')
    };
    b7g.ZD3x = function () {
        K7D.ZD3x.apply(this, arguments);
        this.Qa0x()
    };
    b7g.bim7f = function (i7b, bi7b, fY0x) {
        var bz7s = this.Ao6i(bi7b, i7b.length);
        if (this.bQP7I(bz7s.index, bz7s.total)) return !0;
        this.bhI6C(bz7s.total > 1 ? '' : 'none')
    };
    b7g.bic7V = function () {
        this.yF5K('onemptylist', '没有列表数据！')
    };
    b7g.bad3x = function (bH8z, kJ1x) {
        if (!kJ1x && k7d.fH9y(bH8z)) {
            this.ij0x.innerHTML = bH8z;
            return
        }
        K7D.bad3x.apply(this, arguments)
    };
    b7g.Pm0x = function (dQ9H) {
        this.ij0x.innerHTML = dQ9H
    };
    b7g.Pl0x = function (hp0x) {
        this.fK9B = hp0x
    };
    b7g.Zv3x = function (d7e) {
        this.OU0x(d7e, 'onafteradd');
        if (!d7e.stopped) this.gD0x()
    };
    b7g.Zw3x = function (d7e) {
        this.OU0x(d7e, 'onafterdelete');
        if (!d7e.stopped) this.gD0x()
    };
    b7g.bjp7i = function (bi7b, fY0x) {
        var r7k = 1;
        if (!!this.jw1x) {
            r7k = this.jw1x.sY3x()
        }
        var jW1x = this.bjv7o(r7k),
            fQ9H = jW1x + (r7k > 1 ? this.oL2x : this.yD5I);
        if (bi7b >= fQ9H && !!this.jw1x) {
            var bz7s = this.Ao6i(0, this.kg1x());
            this.jw1x.bvB1x(bz7s.total);
            this.bhI6C(bz7s.total > 1 ? '' : 'none')
        } else {
            this.gD0x()
        }
    };
    b7g.bjq7j = function (bi7b, fY0x) {
        var r7k = 1;
        if (!!this.jw1x) {
            r7k = this.jw1x.sY3x()
        }
        var jW1x = this.bjv7o(r7k),
            bz7s = this.Ao6i(jW1x, this.kg1x());
        this.AC6w({
            last: r7k,
            index: bz7s.index
        })
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        I7B = c7f('nej.ut'),
        k7d = c7f('nej.u'),
        l7e = c7f('nm.x'),
        q7j = c7f('nm.d'),
        w7p = c7f('nm.w'),
        fq9h = 40,
        b7g,
        K7D;
    w7p.bah3x = NEJ.C();
    b7g = w7p.bah3x.N7G(I7B.cI8A);
    K7D = w7p.bah3x.ct8l;
    b7g.cx8p = function () {
        this.cF8x()
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.OL0x = e7d.inputer;
        this.bjA7t = e7d.tipper;
        this.bX8P([
            [this.OL0x,
                'input',
                this.fO9F.g7b(this)
            ]
        ])
    };
    b7g.bD8v = function () {
        this.bG8y();
        this.Kn9e(null, null)
    };
    b7g.fO9F = function (d7e) {
        if (d7e && d7e.type == 'keyup' && (d7e.keyCode != 8 || d7e.keyCode != 68)) return;
        var V7O = this.OL0x.value,
            cFa6U;
        if (l7e.UC2x(V7O) > fq9h) {
            this.OL0x.value = l7e.BD6x(V7O, fq9h);
            this.Kn9e('歌单名不能超过20个汉字或40个英文字符！', arguments.callee.g7b(this))
        } else if (V7O.indexOf('#') >= 0 || V7O.indexOf('@') >= 0) {
            this.Kn9e('歌单名不能包含字符“@”和“#”！')
        } else {
            this.Kn9e(null, null);
            this.z7s('onchange', {
                value: V7O
            })
        }
    };
    b7g.cvE4I = function () {
        this.fO9F()
    };
    b7g.Kn9e = function () {
        var C7v = 0;
        return function (dI9z, bSv7o) {
            if (!!C7v) window.clearTimeout(C7v);
            if (!dI9z) {
                a6g.y7r(this.bjA7t, 'f-vhide');
                this.bSy7r = !1;
                return
            }
            this.bjA7t.innerHTML = '<i class="u-icn u-icn-25"></i>' + dI9z;
            a6g.x7q(this.bjA7t, 'f-vhide');
            this.bSy7r = !0;
            if (k7d.gG0x(bSv7o)) C7v = window.setTimeout(function () {
                this.Kn9e(null, null);
                bSv7o()
            }.g7b(this), 1000)
        }
    }();
    b7g.bSz7s = function () {
        if (this.bSy7r) return !1;
        if (l7e.jP1x(this.OL0x.value)) {
            this.Kn9e('歌单名不能为空');
            return !1
        }
        return !0
    };
    b7g.fX0x = function () {
        return this.OL0x.value
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        h7a = c7f('nej.v'),
        a6g = c7f('nej.e'),
        v7o = c7f('nej.j'),
        m7f = c7f('nm.l'),
        w7p = c7f('nm.w'),
        bC8u = c7f('nej.ui'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        b7g,
        K7D;
    m7f.bai3x = NEJ.C();
    b7g = m7f.bai3x.N7G(m7f.el9c);
    K7D = m7f.bai3x.ct8l;
    b7g.cx8p = function () {
        this.cF8x()
    };
    b7g.bW8O = function () {
        this.cg8Y();
        var i7b = a6g.H7A(this.n7g, 'j-flag');
        this.bap3x = {
            inputer: i7b[0],
            tipper: i7b[1]
        };
        this.iK0x = {
            onerror: this.bSR7K.g7b(this),
            onitemadd: this.bSR7K.g7b(this)
        };
        this.lG1x = i7b[2];
        h7a.s7l(i7b[2], 'click', this.Hj8b.g7b(this));
        h7a.s7l(i7b[3], 'click', this.Do7h.g7b(this));
        h7a.s7l(this.n7g, 'keypress', this.bSV8N.g7b(this))
    };
    b7g.cf8X = function () {
        this.ce8W = 'm-wgt-create'
    };
    b7g.bk7d = function (e7d) {
        e7d.clazz = ' m-layer-w2';
        e7d.parent = e7d.parent || document.body;
        e7d.title = '新建歌单';
        e7d.draggable = !0;
        e7d.destroyalbe = !0;
        e7d.mask = true;
        this.bm7f(e7d);
        this.bap3x.inputer.value = e7d.name || '';
        this.vj4n = w7p.bah3x.A7t(this.bap3x);
        this.vj4n.cvE4I();
        this.S7L = q7j.ig0x.A7t(this.iK0x);
        setTimeout(function () {
            this.bap3x.inputer.focus()
        }.g7b(this), 0)
    };
    b7g.bD8v = function () {
        this.bG8y();
        if (this.vj4n) {
            this.vj4n.T7M();
            delete this.vj4n
        }
        this.sG3x(!1);
        this.bap3x.inputer.value = ''
    };
    b7g.sG3x = function (Oz0x) {
        this.oP2x = Oz0x;
        if (Oz0x) {
            this.lG1x.innerHTML = '<i>新建中...</i>';
            a6g.y7r(this.lG1x, 'u-btn2-dis')
        } else {
            this.lG1x.innerHTML = '<i>新 建</i>';
            a6g.x7q(this.lG1x, 'u-btn2-dis')
        }
    };
    b7g.Hj8b = function () {
        if (this.oP2x || !this.vj4n.bSz7s()) return;
        var cq8i = {
            key: 'playlist_new-' + GUser.userId,
            data: {
                name: this.vj4n.fX0x()
            },
            offset: 1
        };
        this.S7L.jE1x(cq8i);
        this.sG3x(!0)
    };
    b7g.bSR7K = function (d7e) {
        var cj8b = (d7e.result || bb7U).code;
        if (!cj8b) {
            this.z7s('onsuccess', d7e.data)
        } else {
            this.z7s('onerror', d7e)
        }
        this.bt7m()
    };
    b7g.Do7h = function () {
        this.bt7m()
    };
    b7g.bSV8N = function (d7e) {
        if (d7e.keyCode == 13) this.Hj8b()
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        v7o = c7f('nej.j'),
        l7e = c7f('nm.x'),
        q7j = c7f('nm.d'),
        m7f = c7f('nm.l'),
        b7g,
        K7D;
    m7f.bkc7V = NEJ.C();
    b7g = m7f.bkc7V.N7G(m7f.el9c);
    K7D = m7f.bkc7V.ct8l;
    b7g.cx8p = function () {
        this.cF8x()
    };
    b7g.bW8O = function () {
        this.cg8Y();
        var i7b = a6g.H7A(this.n7g, 'j-flag');
        this.iM0x = {
            limit: 301,
            parent: i7b[1],
            cache: {
                klass: q7j.ig0x,
                lkey: 'playlist_new-' + GUser.userId,
                onlisterror: this.bkg7Z.g7b(this)
            },
            item: {
                klass: 'm-wgt-subscribe-item',
                cutStr: l7e.Bt6n,
                escape: k7d.dH9y
            }
        };
        this.iK0x = {
            onsuccess: this.bas3x.g7b(this),
            onerror: this.eI9z.g7b(this)
        };
        h7a.s7l(i7b[0], 'click', this.Hj8b.g7b(this));
        h7a.s7l(i7b[1], 'click', this.kQ1x.g7b(this))
    };
    b7g.cf8X = function () {
        this.ce8W = 'm-wgt-subscribe'
    };
    b7g.bk7d = function (e7d) {
        e7d.parent = e7d.parent || document.body;
        e7d.clazz = ' m-layer-w2';
        e7d.title = '添加到歌单';
        e7d.draggable = !0;
        e7d.mask = !0;
        this.bm7f(e7d);
        this.bay3x = (e7d.tracks || []).reverse();
        this.iM0x.item.size = this.bay3x.length;
        this.iK0x.name = e7d.name || '';
        this.bTK8C = q7j.wD5I.A7t({
            onaddsuccess: this.BZ6T.g7b(this)
        });
        this.sX3x = q7j.ig0x.A7t({
            onlistload: this.cvD4H.g7b(this)
        });
        this.sX3x.bPT6N();
        k7d.bd7W(this.bay3x, function (p7i, r7k, i7b) {
            if (!k7d.ly1x(p7i)) {
                i7b[r7k] = this.bTK8C.eH9y(p7i) || p7i
            }
        }, this)
    };
    b7g.cvD4H = function () {
        if (this.dM9D) this.dM9D.T7M();
        this.dM9D = I7B.kt1x.A7t(this.iM0x)
    };
    b7g.Hj8b = function () {
        this.bt7m();
        if (this.HC8u) this.HC8u.T7M();
        this.HC8u = m7f.bai3x.A7t(this.iK0x);
        this.HC8u.L7E()
    };
    b7g.kQ1x = function () {
        var cvC4G = function (f7c) {
            while (f7c && f7c != document) {
                if (f7c.tagName.toLowerCase() == 'li') {
                    return f7c
                }
                f7c = f7c.parentNode
            }
        };
        return function (d7e) {
            h7a.cr8j(d7e);
            var F7y = h7a.W7P(d7e),
                Ad6X = cvC4G(F7y);
            if (!!Ad6X && !a6g.bE8w(Ad6X, 'dis')) {
                this.bas3x({
                    id: a6g.t7m(Ad6X, 'id')
                })
            }
        }
    }();
    b7g.bas3x = function (d7e) {
        var C7v = d7e.id;
        if (!C7v || !this.bay3x.length) return;
        this.bTK8C.jE1x({
            key: 'track_playlist-' + C7v,
            data: {
                tracks: this.bay3x,
                pid: C7v
            }
        });
        this.bt7m()
    };
    b7g.BZ6T = function () {
        this.z7s('onsuccess');
        m7f.Z7S.L7E({
            tip: '收藏成功'
        })
    };
    b7g.eI9z = function (d7e) {
        this.bt7m();
        this.z7s('onerror', d7e);
        var cV8N = '收藏失败';
        switch (d7e.code) {
        case 405:
            cV8N = '操作过于频繁，先休息一下再试吧';
            break;
        case 507:
            cV8N = '歌单数量超过限制';
            break;
        case 502:
            cV8N = '歌曲已经存在'
        }
        m7f.Z7S.L7E({
            tip: cV8N,
            type: 2
        })
    };
    b7g.bkg7Z = function () {
        this.bt7m();
        m7f.Z7S.L7E({
            tip: '列表下载失败，请稍后再试',
            type: 2
        })
    };
    l7e.mv1x = function (e7d) {
        if (!GUser || !GUser.userId || GUser.userId <= 0) {
            top.login();
            return
        }
        m7f.bkc7V.L7E(e7d)
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        dv9m = c7f('nej.p'),
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        k7d = c7f('nej.u'),
        l7e = c7f('nm.x');
    var bkJ8B,
        oB2x,
        Y7R = decodeURIComponent(location.href),
        jS1x = /.+(https?:\/\/.+\/proxy.html)/.test(Y7R) ? RegExp.$1 : '';
    if (!!jS1x) {
        v7o.uk4o('mail_proxy_url', jS1x)
    } else {
        jS1x = v7o.tI4M('mail_proxy_url') || 'about:blank'
    }
    bkJ8B = a6g.bdC4G({
        src: jS1x,
        onload: function () {
            oB2x = true
        }
    });
    var bTW8O = function () {
        v7o.gy0x('USER_TRIGGER', {
            value: true,
            expire: 1 / (24 * 60),
            path: '/'
        })
    };
    var cvA4E = function () {
        if (dv9m.dr9i.browser == 'ie' && parseInt(dv9m.dr9i.version) < 9) {
            l7e.fs9j({
                clazz: 'm-layer-w2',
                message: '当前浏览器版本过低，暂时无法使用，请升级后再试。'
            });
            return false
        }
        return true
    };
    l7e.Kd9U = function (u7n, C7v, U7N) {
        if (!cvA4E()) return;
        bTW8O();
        if (U7N == 'stop') {
            if (!oB2x) throw 'proxy not loaded';
            bTW8O();
            bkJ8B.contentWindow.location.replace(jS1x + '#' + k7d.cC8u({
                to: 'ifrmMusic',
                message: JSON.stringify({
                    s: +(new Date),
                    action: 'stop'
                })
            }))
        } else {
            bkJ8B.contentWindow.location.replace(jS1x + '#' + k7d.cC8u({
                to: 'ifrmMusic',
                message: JSON.stringify({
                    type: u7n,
                    id: C7v,
                    s: +(new Date),
                    action: U7N
                })
            }))
        }
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        k7d = c7f('nej.u'),
        l7e = c7f('nm.x'),
        m7f = c7f('nm.l'),
        q7j = c7f('nm.d');
    var kH1x = q7j.hT0x.A7t();
    var oQ2x = q7j.wD5I.A7t({
        onlistload: cvz4D,
        onitemload: cvy4C,
        onerror: eI9z
    });
    var HO8G = q7j.rp3x.A7t({
        onlistload: cvx4B,
        onitemload: cvw4A,
        onerror: eI9z
    });
    var bUs8k = {};

    function wk4o(d7e) {
        var f7c = h7a.W7P(d7e, 'd:resAction'),
            U7N = a6g.t7m(f7c, 'resAction');
        if (f7c && (U7N == 'play' || U7N == 'addto')) {
            var u7n = parseInt(a6g.t7m(f7c, 'resType'));
            bUv8n({
                action: U7N,
                type: u7n,
                id: a6g.t7m(f7c, 'resId'),
                from: a6g.t7m(f7c, 'resFrom'),
                data: a6g.t7m(f7c, 'resData'),
                order: a6g.t7m(f7c, 'resOrder'),
                node: f7c
            });
            if (u7n != 13) bUy8q(f7c)
        }
    }

    function bUv8n(bP8H) {
        var U7N = bP8H.action,
            u7n = bP8H.type,
            C7v = bP8H.id,
            eb9S = bP8H.from,
            j7c = bP8H.data,
            tz4D = bP8H.order,
            e7d = {
                limit: 1000,
                offset: 0,
                data: {
                    id: C7v
                },
                ext: {
                    id: C7v,
                    action: U7N,
                    type: u7n,
                    from: eb9S,
                    data: j7c,
                    node: bP8H.node
                }
            };
        if (U7N != 'play' && U7N != 'addto' || !u7n) return;
        if (window.GRef && GRef == 'mail') {
            l7e.Kd9U(u7n, C7v, U7N);
            return
        }
        switch (u7n) {
        case 13:
            e7d.key = 'track_playlist-' + C7v;
            oQ2x.lQ1x(e7d);
            break;
        case 17:
            e7d.key = 'program';
            e7d.id = C7v;
            HO8G.XR3x(e7d);
            if (U7N == 'play') {
                v7o.bn7g('/api/dj/program/listen', {
                    query: {
                        id: C7v
                    }
                })
            }
            break;
        case 18:
            e7d.key = 'track';
            e7d.id = C7v;
            oQ2x.XR3x(e7d);
            break;
        case 19:
            e7d.key = 'track_album-' + C7v;
            oQ2x.lQ1x(e7d);
            break;
        case 24:
            e7d.key = 'track_day';
            oQ2x.lQ1x(e7d);
            break;
        case 2:
            e7d.key = 'track_artist_top-' + C7v;
            oQ2x.lQ1x(e7d);
            break;
        case 70:
            e7d.key = 'program_djradio-' + C7v + '-' + tz4D;
            e7d.data.radioId = C7v;
            e7d.data.asc = tz4D == 2;
            HO8G.lQ1x(e7d);
            break
        }
    }

    function bUz8r(i7b) {
        var o7h = [];
        k7d.bd7W(i7b, function (p7i) {
            if (p7i.mainSong) {
                p7i.mainSong.program = p7i;
                o7h.push(p7i.mainSong);
                p7i.localupdatetime = +(new Date);
                oQ2x.cCo6i(p7i.mainSong);
                p7i.mainTrackId = p7i.mainSong.id;
                delete p7i.mainSong
            } else {
                var bUB8t = oQ2x.eH9y(p7i.mainTrackId);
                bUB8t && o7h.push(bUB8t)
            }
        });
        return o7h
    }

    function baL3x(i7b, e7d) {
        var rB3x = e7d.action == 'play' && e7d.type != 17 && e7d.type != 18,
            fW0x = e7d.action == 'play';
        if (!i7b.length) return;
        if (e7d.type == 19) {
            i7b = l7e.LF9w(i7b, true, {
                play: true
            }, {
                source: 'album',
                sourceid: e7d.id
            })
        } else {
            i7b = l7e.LF9w(i7b, true, {
                play: true
            })
        }
        k7d.bd7W(i7b, function (p7i) {
            p7i.source = l7e.bru0x({
                fid: e7d.from,
                fdata: e7d.data,
                type: e7d.type,
                rid: e7d.id
            }, p7i.id)
        });
        top.player.addTo(i7b, rB3x, fW0x);
        kH1x.Sr1x({
            rid: e7d.id,
            type: e7d.type,
            hash: l7e.Ms9j(),
            play: fW0x,
            source: e7d.from,
            sourceid: e7d.data
        })
    }

    function cvz4D(d7e) {
        var ez9q = d7e.ext || {};
        i7b = oQ2x.hI0x(d7e.key);
        baL3x(i7b, ez9q);
        if (ez9q.type == 13 && ez9q.action == 'play' && i7b && i7b.length > 0) {
            bUy8q(ez9q.node);
            v7o.bn7g('/api/playlist/update/playcount', {
                query: {
                    id: ez9q.id
                }
            })
        }
    }

    function cvy4C(d7e) {
        var i7b = [
                oQ2x.eH9y(d7e.id)
            ],
            bj7c = i7b[0],
            qF3x = l7e.qk3x(bj7c),
            sQ3x = bj7c.privilege || {};
        if (qF3x == 10) {
            l7e.uL4P(sQ3x.fee || bj7c.fee, bj7c.id, 'song', null, sQ3x)
        } else if (qF3x == 100) {
            l7e.it0x(null, null, null, true, bj7c)
        } else if (qF3x == 11) {
            l7e.bFH3x(bj7c.id, 18)
        } else {
            baL3x(i7b, d7e.ext)
        }
    }

    function cvx4B(d7e) {
        var i7b = bUz8r(HO8G.hI0x(d7e.key));
        baL3x(i7b, d7e.ext)
    }

    function cvw4A(d7e) {
        var i7b = bUz8r([HO8G.eH9y(d7e.id)]);
        baL3x(i7b, d7e.ext)
    }

    function eI9z() {
        top.player.tipPlay('无法播放，音乐已下线')
    }

    function bUy8q(f7c) {
        var u7n = a6g.t7m(f7c, 'resType'),
            C7v = a6g.t7m(f7c, 'resId'),
            J7C = u7n + '-' + C7v;
        if (bUs8k[J7C]) return;
        var bUI8A = a6g.B7u('play-count'),
            blh8Z = a6g.H7A(f7c.parentNode, 'nb'),
            NV0x = null;
        if (bUI8A) {
            NV0x = bUI8A
        } else {
            NV0x = !!blh8Z && !!blh8Z[0] ? blh8Z[0] : null
        }
        if (NV0x) {
            var cH8z = NV0x.innerHTML;
            if (/^\d+$/.test(cH8z)) {
                NV0x.innerText = +cH8z + 1
            }
            bUs8k[J7C] = true
        }
    }
    l7e.cvv4z = function (f7c) {
        h7a.s7l(f7c || document.body, 'click', wk4o.g7b(this))
    };
    l7e.cvu4y = function (U7N, u7n, C7v) {
        bUv8n({
            action: U7N,
            type: u7n,
            id: C7v
        })
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        I7B = c7f('nej.ut'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        b7g,
        K7D;
    q7j.ff9W({
        'share-all': {
            url: '/api/share/friends/resource',
            format: function (o7h, e7d) {
                    this.cvt4x(o7h, e7d)
                },
                onerror: 'onshareerror'
        },
        'share-sns': {
            url: '/api/share/resource/sns',
            format: function (o7h, e7d) {
                    this.z7s('onshareall', e7d.result)
                },
                onerror: function (o7h, e7d) {
                    this.z7s('onshareall', e7d.result)
                }
        },
        'share-private': {
            url: '/api/msg/private/send',
            onload: 'onshareprivate',
            onerror: 'onshareerror'
        },
        share_img_compound: {
            url: '/upload/event/img/compound',
            type: 'POST',
            format: function (o7h, e7d) {
                    e7d.options.picUrl = o7h.picUrl;
                    this.bxu2x(e7d.options, e7d.result)
                },
                onerror: function (o7h, e7d) {
                    this.z7s('onshareall', e7d.result)
                }
        },
        'vid-get': {
            url: '/api/video/coversvid/get',
            format: function (Q7J, e7d) {
                this.qe3x('vid_info-' + e7d.data.nosKey, Q7J);
                return Q7J
            }
        },
        'video-submit': {
            url: '/api/cloudvideo/video/event/submit',
            filter: function (e7d) {},
                format: function (o7h, e7d) {
                    e7d.data = e7d.data2;
                    this.cp8h('share-all', e7d)
                },
                onerror: 'onshareerror'
        }
    });
    q7j.blI8A = NEJ.C();
    b7g = q7j.blI8A.N7G(q7j.hE0x);
    b7g.cvr4v = function () {
        var vn4r = function (Q7J, e7d) {
            e7d.times++;
            if (e7d.times > 10) {
                this.z7s('onvinfoerror', e7d.key, Q7J)
            } else {
                setTimeout(ev9m.g7b(this, e7d), e7d.times * 1000)
            }
        };
        var xM5R = function (Q7J, e7d) {
            this.z7s('onvinfo', e7d.key, Q7J)
        };
        var ev9m = function (e7d) {
            var Y7R = e7d.url;
            v7o.bn7g(Y7R + '?vinfo', {
                method: 'GET',
                type: 'json',
                mode: 1,
                onload: xM5R.ey9p(this, e7d),
                onerror: vn4r.ey9p(this, e7d)
            })
        };
        return function (e7d) {
            e7d.times = 0;
            ev9m.call(this, e7d)
        }
    }();
    b7g.cFc6W = function () {
        var Dv7o;
        var vn4r = function (Q7J, e7d) {
            if (Q7J.code > 0) {
                clearInterval(this.Dw7p);
                this.z7s('onviderror', e7d.data.nosKey)
            }
        };
        var xM5R = function (J7C, Q7J) {
            if (Q7J.vid && Q7J.covers) {
                clearInterval(this.Dw7p);
                this.z7s('onvid', J7C, Q7J)
            }
        };
        var ev9m = function (e7d) {
            if (+(new Date) - Dv7o > 60 * 60 * 1000) {
                clearInterval(this.Dw7p);
                this.z7s('onviderror', e7d.data.nosKey);
                return
            }
            e7d.onload = xM5R.g7b(this, e7d.data.nosKey);
            e7d.onerror = vn4r.g7b(this);
            this.cp8h('vid-get', e7d)
        };
        return function (e7d) {
            if (!e7d || !e7d.data) return;
            Dv7o = +(new Date);
            this.Dw7p = clearInterval(this.Dw7p);
            this.Dw7p = setInterval(ev9m.g7b(this, e7d), 10000);
            ev9m.apply(this, arguments)
        }
    }();
    b7g.cvo4s = function () {
        this.Dw7p = clearInterval(this.Dw7p)
    };
    b7g.cvt4x = function (o7h, nX2x) {
        if (o7h.event && nX2x.snsTypes) {
            if (nX2x.pics) {
                var bxU2x = [];
                for (var i = 0, len = nX2x.pics.length; i < len; i++) {
                    bxU2x[i] = nX2x.pics[i].originId
                }
                this.cp8h('share_img_compound', {
                    data: {
                        picIds: bxU2x.join(',')
                    },
                    options: nX2x,
                    result: o7h
                })
            } else {
                nX2x.picUrl = nX2x.picUrl;
                this.bxu2x(nX2x, o7h)
            }
        } else {
            this.z7s('onshareall', o7h)
        }
        var uD4H = q7j.hT0x.A7t();
        uD4H.eT9K(nX2x.isPub ? 'pubevent' : 'shareevent', {
            id: o7h.id
        })
    };
    b7g.bxu2x = function (nX2x, o7h) {
        var cq8i = {},
            d7e = o7h.event || {};
        cq8i.eventid = d7e.id;
        cq8i.eventtype = d7e.type;
        nX2x.picUrl && (cq8i.picUrl = nX2x.picUrl);
        cq8i.snsTypes = nX2x.snsTypes;
        cq8i.msg = nX2x.data.msg || '';
        cq8i.type = nX2x.data.type;
        nX2x.data.id && (cq8i.id = nX2x.data.id);
        if (cq8i.eventtype == 41) {
            var Q7J = l7e.FI7B(d7e.json);
            cq8i.eventtype = 39;
            if (cq8i.msg) {
                cq8i.msg += '  '
            }
            cq8i.msg += '分享' + Q7J.video.creator.nickname + '的视频《' + Q7J.video.title + '》';
            delete cq8i.id
        }
        this.cp8h('share-sns', {
            data: cq8i,
            result: o7h
        })
    };
    b7g.cvn4r = function (e7d) {
        var j7c = {
            type: '',
            id: 0,
            threadId: '',
            msg: '',
            actId: 0,
            pics: '',
            uuid: 'publish-' + +(new Date) + k7d.nR2x(5)
        };
        j7c = NEJ.EX(j7c, e7d);
        if (j7c.id < 0) {
            delete j7c.id;
            j7c.type = 'noresource'
        }
        if (!j7c.threadId) {
            delete j7c.threadId
        }
        if (!j7c.actId) {
            delete j7c.actId
        }
        if (!j7c.pics) {
            delete j7c.pics
        } else {
            j7c.pics = JSON.stringify(j7c.pics)
        }
        this.cp8h('share-all', {
            data: j7c,
            snsTypes: e7d.snsTypes,
            picUrl: e7d.picUrl,
            pics: e7d.pics,
            isPub: e7d.isPub
        })
    };
    b7g.cvm4q = function (e7d) {
        this.cp8h('share-private', e7d)
    };
    b7g.cvl4p = function (e7d) {
        this.cp8h('video-submit', e7d)
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        b7g,
        K7D;
    var cvj4n = {
        40: !0
    };
    q7j.ff9W({
        'event-list': {
            url: '/api/v1/event/get',
            filter: function (e7d) {
                    e7d.data.getcounts = true;
                    e7d.data.pagesize = e7d.data.limit;
                    if (e7d.data.offset == 0) {
                        e7d.data.lasttime = -1
                    }
                    delete e7d.data.offset
                },
                format: function (Q7J, e7d) {
                    Q7J.event = l7e.beP5U(Q7J.event, function (p7i, r7k) {
                        return !cvj4n[p7i.type]
                    });
                    this.cvi4m(Q7J.event);
                    e7d.data.lasttime = Q7J.lasttime;
                    if (Q7J.event.length) {
                        Q7J.event.length = e7d.limit
                    }
                    return {
                        list: Q7J.event,
                        total: Q7J.size
                    }
                }
        },
        'event_latest-list': {
            url: '/api/act/event/getnews',
            format: function (Q7J, e7d) {
                return {
                    list: Q7J.events,
                    total: Q7J.count
                }
            }
        },
        'event-pull': {
            url: '/api/event/getnews',
            filter: function (e7d) {
                    e7d.data.pagesize = 20
                },
                format: function (Q7J, e7d) {
                    return Q7J.event
                }
        },
        'ievent-get': {
            type: 'GET',
            url: '/api/event/get',
            onload: 'oneventload',
            onerror: 'oneventloaderror'
        },
        'ievent-new-get': {
            type: 'GET',
            url: '/api/event/getnews',
            onload: 'oneventnewload'
        },
        'ievent_user-list': {
            type: 'GET',
            url: '/api/event/get/{userId}',
            filter: function (e7d) {
                    if (e7d.data.offset == 0) {
                        e7d.data.time = -1
                    }
                    delete e7d.data.offset;
                    e7d.data.getcounts = true
                },
                format: function (Q7J, e7d) {
                    e7d.data.time = Q7J.lasttime;
                    var i7b = Q7J.events;
                    if (Q7J.more && i7b.length < e7d.data.limit) {
                        i7b = this.JO8G(i7b, e7d.data.limit)
                    }
                    return {
                        list: i7b,
                        total: Q7J.size
                    }
                }
        },
        'ievent-res-get': {
            url: '/api/res/status',
            format: function (o7h, e7d) {
                o7h.conf = e7d.conf;
                return o7h
            }
        },
        'ievent-like': {
            url: '/api/resource/like',
            onload: 'oneventlike',
            filter: function (e7d, bg7Z) {
                    if (e7d.like) {
                        if (e7d.comment) {
                            bg7Z.url = '/api/v1/comment/like'
                        } else {
                            bg7Z.url = '/api/resource/like'
                        }
                        bg7Z.onload = 'oneventlike';
                        bg7Z.onerror = 'oneventlikeerr'
                    } else {
                        if (e7d.comment) {
                            bg7Z.url = '/api/v1/comment/unlike'
                        } else {
                            bg7Z.url = '/api/resource/unlike'
                        }
                        bg7Z.onload = 'oneventunlike';
                        bg7Z.onerror = 'oneventunlikeerr'
                    }
                },
                format: function (o7h, e7d) {
                    o7h.eid = e7d.eid;
                    o7h.origin = e7d.origin;
                    o7h.ext = e7d.ext;
                    return o7h
                }
        },
        'ievent_user-del': {
            url: '/api/event/delete',
            format: function (o7h, e7d) {
                o7h.id = e7d.data.id;
                return o7h
            }
        },
        'event-del': {
            url: '/api/event/delete',
            filter: function (e7d, bg7Z) {
                    if (e7d.data.type == 'nointer') {
                        bg7Z.url = '/api/event/rcmd/reject'
                    } else if (e7d.data.transcoding) {
                        bg7Z.url = '/api/event/video/transcoding/delete'
                    } else {
                        bg7Z.url = '/api/event/delete'
                    }
                },
                format: function (o7h, e7d) {
                    o7h.id = e7d.data.id;
                    return o7h
                }
        },
        'event_activity-del': {
            url: '/api/event/delete',
            format: function (o7h, e7d) {
                o7h.id = e7d.data.id;
                return o7h
            }
        },
        'event_activity-list': {
            url: '/api/act/event',
            filter: function (e7d) {
                    e7d.data.lasttime = e7d.data.lasttime || -1;
                    e7d.data.pagesize = e7d.data.limit;
                    e7d.data.getcounts = true;
                    delete e7d.data.offset
                },
                format: function (Q7J, e7d) {
                    e7d.data.lasttime = Q7J.lasttime;
                    var i7b = Q7J.events;
                    if (Q7J.more) i7b = this.JO8G(i7b, e7d.data.pagesize);
                    return {
                        list: i7b,
                        total: Q7J.size
                    }
                },
                onerror: 'onlisterror'
        }
    });
    q7j.xQ5V = NEJ.C();
    b7g = q7j.xQ5V.N7G(q7j.hE0x);
    b7g.cx8p = function () {
        this.cF8x()
    };
    b7g.bmh8Z = function (u7n, cT8L) {
        return u7n + '-' + cT8L
    };
    b7g.cFd6X = function (e7d) {
        this.cp8h('ievent-get', e7d)
    };
    b7g.cFe6Y = function (e7d) {
        this.cp8h('ievent-new-get', e7d)
    };
    b7g.cFg6a = function (e7d) {
        this.cp8h('ievent-user-get', e7d)
    };
    b7g.cFh6b = function (u7n, cT8L) {
        return this.sz3x(this.bmh8Z(u7n, cT8L))
    };
    b7g.cFi6c = function (JL8D, e7d) {
        if (!JL8D || !JL8D.length) return;
        e7d = e7d || {};
        var by7r = {
            song: 2,
            album: 4,
            playlist: 1,
            mv: 3,
            program: 5
        };
        for (var i = 0, Gf7Y = [], byB2x = [], j7c; i < JL8D.length; ++i) {
            j7c = JL8D[i];
            j7c = this.sz3x(this.bmh8Z(j7c.type, j7c.id));
            if (!j7c) {
                Gf7Y.push(JL8D[i].id);
                byB2x.push(by7r[JL8D[i].type] || 0)
            }
        }
        if (!Gf7Y.length) {
            this.z7s('oneventresload', e7d.conf);
            return
        }
        e7d.data = {
            ids: JSON.stringify(Gf7Y),
            types: JSON.stringify(byB2x)
        };
        e7d.onload = this.cva4e.g7b(this);
        this.cp8h('ievent-res-get', e7d)
    };
    b7g.cva4e = function (o7h) {
        if (o7h.code != 200) {
            this.z7s('oneventreserror', o7h.code);
            return
        }
        var by7r = {
            1: 'playlist',
            2: 'song',
            3: 'mv',
            4: 'album',
            5: 'program'
        };
        for (var i = 0, i7b = o7h.results; i < i7b.length; ++i) {
            this.qe3x(this.bmh8Z(by7r[i7b[i].type], i7b[i].id), i7b[i])
        }
        this.z7s('oneventresload', o7h.conf)
    };
    b7g.byG2x = function (j7c) {
        var J7C = 'event-list';
        this.brG0x(J7C, j7c);
        this.z7s('onitemadd', {
            key: J7C,
            action: 'add',
            data: j7c,
            flag: -1
        })
    };
    b7g.oR2x = function (e7d) {
        this.cp8h('ievent-like', e7d)
    };
    b7g.mH2x = function (e7d) {
        this.cp8h('ievent-delete', e7d)
    };
    b7g.JO8G = function (i7b, fY0x) {
        for (var i = i7b.length; i < fY0x; i++) i7b.push(null);
        return i7b
    };
    b7g.cvi4m = function (i7b) {
        var o7h = [];
        if (!i7b || !i7b.length) return;
        k7d.bd7W(i7b, function (d7e) {
            d7e.biData = this.byL2x(d7e)
        }, this)
    };
    b7g.byL2x = function () {
        var WM2x = {
                32: 'comment',
                33: 'activity',
                34: 'recomment_artist'
            },
            cuZ4d = [
                13,
                17,
                18,
                19,
                20,
                21,
                22,
                28,
                31
            ];
        return function (d7e) {
            var Q7J = {
                id: d7e.id,
                sourceid: d7e.user.userId,
                alg: d7e.rcmdInfo ? d7e.rcmdInfo.alg : null,
                contentType: WM2x[d7e.type] || (k7d.dj9a(cuZ4d, d7e.type) != -1 ? 'user_event' : 'other')
            };
            return Q7J
        }
    }();
    b7g.DN7G = function (cuX4b, d7e) {
        var Q7J = this.byL2x(d7e);
        Q7J.actionType = cuX4b;
        if (window.log) log('eventclick', Q7J)
    };
    b7g.cFk6e = function (e7d) {
        this.cp8h('event_latest-list', e7d)
    }
})();
(function (factory) {
    window.SparkMD5 = factory()
})(function (undefined) {
    'use strict';
    var add32 = function (a, b) {
            return a + b & 4294967295
        },
        hex_chr = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'a',
            'b',
            'c',
            'd',
            'e',
            'f'
        ];

    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32(a << s | a >>> 32 - s, b)
    }

    function md5cycle(x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];
        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0
    }

    function md5blk(s) {
        var md5blks = [],
            i;
        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24)
        }
        return md5blks
    }

    function md5blk_array(a) {
        var md5blks = [],
            i;
        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24)
        }
        return md5blks
    }

    function md51(s) {
        var n = s.length,
            state = [
                1732584193, -271733879, -1732584194,
                271733878
            ],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;
        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)))
        }
        s = s.substring(i - 64);
        length = s.length;
        tail = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3)
        }
        tail[i >> 2] |= 128 << (i % 4 << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0
            }
        }
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;
        tail[14] = lo;
        tail[15] = hi;
        md5cycle(state, tail);
        return state
    }

    function md51_array(a) {
        var n = a.length,
            state = [
                1732584193, -271733879, -1732584194,
                271733878
            ],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;
        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a.subarray(i - 64, i)))
        }
        a = i - 64 < n ? a.subarray(i - 64) : new Uint8Array(0);
        length = a.length;
        tail = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a[i] << (i % 4 << 3)
        }
        tail[i >> 2] |= 128 << (i % 4 << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0
            }
        }
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;
        tail[14] = lo;
        tail[15] = hi;
        md5cycle(state, tail);
        return state
    }

    function rhex(n) {
        var s = '',
            j;
        for (j = 0; j < 4; j += 1) {
            s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15]
        }
        return s
    }

    function hex(x) {
        var i;
        for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i])
        }
        return x.join('')
    }
    if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') {
        add32 = function (x, y) {
            var lsw = (x & 65535) + (y & 65535),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return msw << 16 | lsw & 65535
        }
    }
    if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {
        (function () {
            function clamp(val, length) {
                val = val | 0 || 0;
                if (val < 0) {
                    return Math.max(val + length, 0)
                }
                return Math.min(val, length)
            }
            ArrayBuffer.prototype.slice = function (from, to) {
                var length = this.byteLength,
                    begin = clamp(from, length),
                    end = length,
                    num,
                    target,
                    targetArray,
                    sourceArray;
                if (to !== undefined) {
                    end = clamp(to, length)
                }
                if (begin > end) {
                    return new ArrayBuffer(0)
                }
                num = end - begin;
                target = new ArrayBuffer(num);
                targetArray = new Uint8Array(target);
                sourceArray = new Uint8Array(this, begin, num);
                targetArray.set(sourceArray);
                return target
            }
        })()
    }

    function toUtf8(str) {
        if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str))
        }
        return str
    }

    function utf8Str2ArrayBuffer(str, returnUInt8Array) {
        var length = str.length,
            buff = new ArrayBuffer(length),
            arr = new Uint8Array(buff),
            i;
        for (i = 0; i < length; i += 1) {
            arr[i] = str.charCodeAt(i)
        }
        return returnUInt8Array ? arr : buff
    }

    function arrayBuffer2Utf8Str(buff) {
        return String.fromCharCode.apply(null, new Uint8Array(buff))
    }

    function concatenateArrayBuffers(first, second, returnUInt8Array) {
        var result = new Uint8Array(first.byteLength + second.byteLength);
        result.set(new Uint8Array(first));
        result.set(new Uint8Array(second), first.byteLength);
        return returnUInt8Array ? result : result.buffer
    }

    function hexToBinaryString(hex) {
        var bytes = [],
            length = hex.length,
            x;
        for (x = 0; x < length - 1; x += 2) {
            bytes.push(parseInt(hex.substr(x, 2), 16))
        }
        return String.fromCharCode.apply(String, bytes)
    }

    function SparkMD5() {
        this.reset()
    }
    SparkMD5.prototype.append = function (str) {
        this.appendBinary(toUtf8(str));
        return this
    };
    SparkMD5.prototype.appendBinary = function (contents) {
        this.rM3x += contents;
        this.bq7j += contents.length;
        var length = this.rM3x.length,
            i;
        for (i = 64; i <= length; i += 64) {
            md5cycle(this.dO9F, md5blk(this.rM3x.substring(i - 64, i)))
        }
        this.rM3x = this.rM3x.substring(i - 64);
        return this
    };
    SparkMD5.prototype.end = function (raw) {
        var buff = this.rM3x,
            length = buff.length,
            i,
            tail = [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            ret;
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3)
        }
        this.ov2x(tail, length);
        ret = hex(this.dO9F);
        if (raw) {
            ret = hexToBinaryString(ret)
        }
        this.reset();
        return ret
    };
    SparkMD5.prototype.reset = function () {
        this.rM3x = '';
        this.bq7j = 0;
        this.dO9F = [
            1732584193, -271733879, -1732584194,
            271733878
        ];
        return this
    };
    SparkMD5.prototype.getState = function () {
        return {
            buff: this.rM3x,
            length: this.bq7j,
            hash: this.dO9F
        }
    };
    SparkMD5.prototype.setState = function (state) {
        this.rM3x = state.buff;
        this.bq7j = state.length;
        this.dO9F = state.hash;
        return this
    };
    SparkMD5.prototype.destroy = function () {
        delete this.dO9F;
        delete this.rM3x;
        delete this.bq7j
    };
    SparkMD5.prototype.ov2x = function (tail, length) {
        var i = length,
            tmp,
            lo,
            hi;
        tail[i >> 2] |= 128 << (i % 4 << 3);
        if (i > 55) {
            md5cycle(this.dO9F, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0
            }
        }
        tmp = this.bq7j * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;
        tail[14] = lo;
        tail[15] = hi;
        md5cycle(this.dO9F, tail)
    };
    SparkMD5.hash = function (str, raw) {
        return SparkMD5.hashBinary(toUtf8(str), raw)
    };
    SparkMD5.hashBinary = function (content, raw) {
        var hash = md51(content),
            ret = hex(hash);
        return raw ? hexToBinaryString(ret) : ret
    };
    SparkMD5.ArrayBuffer = function () {
        this.reset()
    };
    SparkMD5.ArrayBuffer.prototype.append = function (arr) {
        var buff = concatenateArrayBuffers(this.rM3x.buffer, arr, true),
            length = buff.length,
            i;
        this.bq7j += arr.byteLength;
        for (i = 64; i <= length; i += 64) {
            md5cycle(this.dO9F, md5blk_array(buff.subarray(i - 64, i)))
        }
        this.rM3x = i - 64 < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);
        return this
    };
    SparkMD5.ArrayBuffer.prototype.end = function (raw) {
        var buff = this.rM3x,
            length = buff.length,
            tail = [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            i,
            ret;
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff[i] << (i % 4 << 3)
        }
        this.ov2x(tail, length);
        ret = hex(this.dO9F);
        if (raw) {
            ret = hexToBinaryString(ret)
        }
        this.reset();
        return ret
    };
    SparkMD5.ArrayBuffer.prototype.reset = function () {
        this.rM3x = new Uint8Array(0);
        this.bq7j = 0;
        this.dO9F = [
            1732584193, -271733879, -1732584194,
            271733878
        ];
        return this
    };
    SparkMD5.ArrayBuffer.prototype.getState = function () {
        var state = SparkMD5.prototype.getState.call(this);
        state.buff = arrayBuffer2Utf8Str(state.buff);
        return state
    };
    SparkMD5.ArrayBuffer.prototype.setState = function (state) {
        state.buff = utf8Str2ArrayBuffer(state.buff, true);
        return SparkMD5.prototype.setState.call(this, state)
    };
    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
    SparkMD5.ArrayBuffer.prototype.ov2x = SparkMD5.prototype.ov2x;
    SparkMD5.ArrayBuffer.hash = function (arr, raw) {
        var hash = md51_array(new Uint8Array(arr)),
            ret = hex(hash);
        return raw ? hexToBinaryString(ret) : ret
    };
    return SparkMD5
});
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        eo9f = c7f('nej.g'),
        k7d = c7f('nej.u'),
        fL9C = c7f('nej.n'),
        I7B = c7f('nej.ut'),
        l7e = c7f('nm.x'),
        q7j = c7f('nm.d'),
        jK1x = c7f('nm.x.nos'),
        w7p = c7f('nm.w');
    var cuT4X = 1024 * 256,
        cuS4W = 1024 * 1024 * 2,
        rn3x = {
            TOKEN_ERROR: -100,
            DNS_ERROR: -101
        },
        bzq2x = typeof File !== 'undefined' ? File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice : br7k,
        rl3x = {
            MD5_DONE: 0.2,
            TOKEN_GET: 0.22,
            DNS_GET: 0.24,
            UPLOADED: 1
        },
        jI1x = {
            AUDIO: 'audio',
            IMAGE: 'image',
            TXT: 'txt',
            RAR: 'rar',
            OTHER: 'other',
            VIDEO: 'video'
        };
    var ol2x = {};
    var uD4H = q7j.hT0x.A7t();
    jK1x.cFl6f = function () {
        return jI1x
    };
    var cuO4S = function () {
        return k7d.nR2x(6) + +(new Date)
    };
    var JJ8B = function (iH0x, e7d) {
        if (!ol2x[e7d.taskId]) {
            return
        }(e7d.onuploading || br7k).call(this, iH0x)
    };
    var bmw8o = function (R7K) {
        var cuN4R = R7K.md5,
            cU8M = R7K.file,
            cuM4Q = cuN4R + cU8M.size;
        return 'nos_file_hash_' + cuM4Q
    };
    var cuL4P = function (R7K) {
        var J7C = bmw8o(R7K),
            j7c = v7o.bNa5f(J7C, '{}');
        try {
            j7c = JSON.parse(j7c)
        } catch (e) {
            j7c = {}
        }
        return j7c
    };
    var cuK4O = function (R7K, e7d) {
        if (!R7K.md5) {
            return
        }
        var J7C = bmw8o(R7K),
            j7c = v7o.bNa5f(J7C, '{}');
        try {
            j7c = JSON.parse(j7c)
        } catch (e) {
            j7c = {}
        }
        NEJ.X(j7c, e7d);
        v7o.uk4o(J7C, JSON.stringify(j7c))
    };
    var cuJ4N = function (R7K) {
        var J7C = bmw8o(R7K);
        v7o.Lk9b(J7C)
    };
    var cuI4M = function (R7K, eM9D) {
        var Y7R = R7K.urls[Math.min(R7K.urlIndex, R7K.urls.length - 1)],
            cU8M = R7K.file,
            lv1x = R7K.bucket,
            my1x = R7K.objectKey,
            eO9F = R7K.token,
            bJ8B = R7K.context,
            oU2x = {},
            Ng9X = bzq2x.call(cU8M, R7K.beg, R7K.end),
            bv7o = {
                offset: R7K.beg,
                complete: R7K.lastChunk || false,
                version: '1.0'
            };
        if (bJ8B) {
            bv7o.context = bJ8B
        }
        oU2x['x-nos-token'] = eO9F;
        oU2x[eo9f.zI5N] = cU8M.type;
        R7K.reqId = v7o.bn7g(Y7R + '/' + lv1x + '/' + my1x, {
            type: 'json',
            method: 'POST',
            headers: oU2x,
            query: bv7o,
            data: Ng9X,
            onload: eM9D.onload,
            onerror: eM9D.onerror
        })
    };
    var cuG4K = function (o7h, R7K, e7d) {
        o7h = {
            code: 200,
            fileName: e7d.file.name,
            size: e7d.file.size,
            type: e7d.file.type,
            bucket: R7K.bucket,
            docId: R7K.docId,
            objectKey: R7K.objectKey,
            url: '//nos.netease.com/' + R7K.bucket + '/' + R7K.objectKey
        };
        cuJ4N(R7K);
        if (!ol2x[e7d.taskId]) {
            return
        }
        delete ol2x[e7d.taskId];
        uD4H.eT9K('sysaction', {
            type: 'nosuploadsuccess',
            location: location.href,
            result: JSON.stringify(o7h)
        });
        (e7d.onsuccess || br7k).call(this, o7h)
    };
    var cuF4J = function (o7h, e7d) {
        (e7d.onerror || br7k).call(this, o7h)
    };
    var cuE4I = function (o7h, R7K, e7d) {
        R7K.context = o7h.context;
        R7K.beg = o7h.offset;
        var iH0x = R7K.beg / R7K.file.size;
        cuK4O(R7K, {
            bucket: R7K.bucket,
            objectKey: R7K.objectKey,
            token: R7K.token,
            context: R7K.context,
            beg: R7K.beg,
            updateTime: +(new Date)
        });
        iH0x = rl3x.DNS_GET + (rl3x.UPLOADED - rl3x.DNS_GET) * iH0x;
        JJ8B(iH0x, e7d);
        if (R7K.lastChunk) {
            cuG4K(o7h, R7K, e7d)
        } else {
            bbn4r(R7K, e7d)
        }
    };
    var cuB4F = function (o7h, R7K, e7d) {
        uD4H.eT9K('sysaction', {
            type: 'noschunkuploaderror',
            location: location.href,
            code: o7h.data,
            body: o7h.extData,
            ext: JSON.stringify(R7K),
            timging: +(new Date) - R7K.chuckUploadStartTime
        });
        if (R7K.urlIndex < Math.max(R7K.urls.length - 1, 5)) {
            R7K.urlIndex++;
            bbn4r(R7K, e7d)
        } else {
            cuF4J(o7h, e7d)
        }
    };
    var bbn4r = function (R7K, e7d) {
        if (!R7K || R7K.step == -1) {
            return
        }
        R7K.end = R7K.beg + cuT4X;
        if (R7K.end >= R7K.file.size) {
            R7K.end = R7K.file.size;
            R7K.lastChunk = true
        }
        R7K.chuckUploadStartTime = +(new Date);
        cuI4M(R7K, {
            onload: cuE4I.ey9p(this, R7K, e7d),
            onerror: cuB4F.ey9p(this, R7K, e7d)
        })
    };
    var cuA4E = function (o7h, R7K, e7d) {
        R7K.beg = o7h.offset;
        var iH0x = R7K.beg / R7K.file.size;
        iH0x = rl3x.DNS_GET + (rl3x.UPLOADED - rl3x.DNS_GET) * iH0x;
        JJ8B(iH0x, e7d);
        bbn4r(R7K, e7d)
    };
    var cuy4C = function (o7h, R7K, e7d) {
        R7K.beg = 0;
        delete R7K.context;
        bnh8Z(R7K, e7d)
    };
    var bAk2x = function (Vy2x, R7K, e7d) {
        R7K.lastChunk = false;
        R7K.urls = Vy2x;
        R7K.urlIndex = 0;
        JJ8B(rl3x.DNS_GET, e7d);
        if (R7K.fromExist) {
            delete R7K.fromExist;
            var Y7R = R7K.urls[Math.min(R7K.urlIndex, R7K.urls.length - 1)],
                lv1x = R7K.bucket,
                my1x = R7K.objectKey,
                eO9F = R7K.token,
                bJ8B = R7K.context,
                oU2x = {},
                bv7o = {
                    context: bJ8B,
                    version: '1.0'
                };
            oU2x['x-nos-token'] = eO9F;
            R7K.reqId = v7o.bn7g(Y7R + '/' + lv1x + '/' + my1x + '?uploadContext', {
                type: 'json',
                method: 'GET',
                headers: oU2x,
                query: bv7o,
                onload: cuA4E.ey9p(this, R7K, e7d),
                onerror: cuy4C.ey9p(this, R7K, e7d)
            })
        } else {
            R7K.beg = 0;
            bbn4r(R7K, e7d)
        }
    };
    var cux4B = function (o7h, R7K, e7d) {
        o7h.code = rn3x.DNS_ERROR;
        (e7d.onerror || br7k).call(this, o7h)
    };
    var bAo2x = function (j7c, e7d) {
        var o7h = j7c.result || {},
            lv1x = o7h.bucket,
            my1x = o7h.objectKey,
            eO9F = o7h.token,
            R7K = ol2x[e7d.taskId];
        if (!lv1x || !my1x || !eO9F || !R7K) {
            o7h.code = rn3x.TOKEN_ERROR;
            (e7d.onerror || br7k).call(this, o7h);
            return
        }
        R7K.bucket = lv1x;
        R7K.objectKey = my1x;
        R7K.docId = o7h.docId;
        R7K.token = eO9F;
        JJ8B(rl3x.TOKEN_GET, e7d);
        if (location.protocol == 'https:') {
            bAk2x(['//nosup-hz1.127.net'], R7K, e7d)
        } else {
            R7K.reqId = jK1x.cus4w({
                bucket: lv1x,
                onload: bAk2x.ey9p(this, R7K, e7d),
                onerror: cux4B.ey9p(this, R7K, e7d)
            })
        }
        R7K.step = 1
    };
    var cur4v = function (o7h, e7d) {
        o7h.code = rn3x.TOKEN_ERROR;
        (e7d.onerror || br7k).call(this, o7h)
    };
    var bnh8Z = function (R7K, e7d) {
        var cU8M = e7d.file,
            ft9k = cU8M.name || '',
            ez9q = ft9k.split('.').pop();
        jK1x.bbv4z(NEJ.X({
            filename: ft9k,
            ext: ez9q,
            onload: bAo2x.ey9p(this, e7d),
            onerror: cur4v.ey9p(this, e7d)
        }, e7d, function (p7i) {
            return k7d.gG0x(p7i) || k7d.ly1x(p7i)
        }))
    };
    var cuq4u = function (R7K, e7d) {
        if (!R7K || R7K.step == -1) {
            return
        }
        R7K.md5 = R7K.spark.end();
        var Jx8p = cuL4P(R7K) || {},
            lv1x = Jx8p.bucket,
            my1x = Jx8p.objectKey,
            eO9F = Jx8p.token;
        if (!lv1x || !my1x || !eO9F) {
            bnh8Z(R7K, e7d)
        } else {
            R7K.context = Jx8p.context;
            R7K.beg = Jx8p.beg;
            R7K.fromExist = true;
            bAo2x({
                result: Jx8p
            }, e7d)
        }
    };
    var cup4t = function (EB7u, R7K, e7d) {
        if (!R7K || R7K.step == -1) {
            return
        }
        R7K.beg = R7K.end;
        var iH0x = R7K.beg / R7K.file.size;
        iH0x = 0 + rl3x.MD5_DONE * iH0x;
        JJ8B(iH0x, e7d);
        R7K.spark.append(EB7u.result);
        if (R7K.lastChunk) {
            cuq4u(R7K, e7d)
        } else {
            bAI2x(R7K, e7d)
        }
    };
    var cuo4s = function (o7h, R7K, e7d) {
        R7K.md5 = '';
        bnh8Z(R7K, e7d)
    };
    var bAI2x = function (R7K, e7d) {
        if (!R7K || R7K.step == -1) {
            return
        }
        R7K.end = R7K.beg + cuS4W;
        if (R7K.end >= R7K.file.size) {
            R7K.end = R7K.file.size;
            R7K.lastChunk = true
        }
        var EB7u = new FileReader;
        EB7u.onload = cup4t.g7b(this, EB7u, R7K, e7d);
        EB7u.onerror = cuo4s.g7b(this, EB7u, R7K, e7d);
        EB7u.readAsArrayBuffer(bzq2x.call(R7K.file, R7K.beg, R7K.end))
    };
    jK1x.gT0x = function (e7d) {
        var cU8M = e7d.file,
            ft9k = cU8M.name || '',
            ez9q = ft9k.split('.').pop(),
            ED7w = cuO4S();
        e7d.taskId = ED7w;
        ol2x[ED7w] = {
            step: 0
        };
        JJ8B(0, e7d);
        var R7K = ol2x[ED7w];
        R7K.id = ED7w;
        R7K.file = cU8M;
        R7K.beg = 0;
        R7K.lastChunk = false;
        R7K.spark = new SparkMD5.ArrayBuffer;
        var cun4r = e7d.onerror || br7k;
        e7d.onerror = function () {
            if (!ol2x[ED7w]) {
                return
            }
            delete ol2x[ED7w];
            cun4r.apply(this, arguments)
        };
        uD4H.eT9K('sysaction', {
            type: 'nosuploadstart',
            location: location.href
        });
        bAI2x(R7K, e7d);
        return ED7w
    };
    jK1x.kf1x = function (C7v) {
        var R7K = ol2x[C7v];
        if (R7K) {
            if (R7K.step == 0) {
                delete ol2x[C7v]
            } else {
                R7K.step = -1;
                if (R7K.reqId) {
                    v7o.kf1x(R7K.reqId)
                }
                delete ol2x[C7v]
            }
        }
    };
    jK1x.bbv4z = function () {
        var yJ5O = function (o7h, e7d) {
            (e7d.onload || br7k).call(this, o7h)
        };
        var Ar6l = function (o7h, e7d) {
            (e7d.onerror || br7k).call(this, o7h)
        };
        var bAS2x = JSON.stringify({
            code: 200,
            size: '$(ObjectSize)'
        });
        return function (e7d) {
            var bbx4B = e7d.returnBody || bAS2x;
            if (k7d.ly1x(bbx4B)) {
                try {
                    JSON.stringify(bbx4B)
                } catch (e) {
                    bbx4B = bAS2x
                }
            }
            return v7o.bn7g('/api/nos/token/alloc', {
                method: 'POST',
                type: 'json',
                query: {
                    filename: e7d.filename || '',
                    ext: e7d.ext || '',
                    type: e7d.type || jI1x.OTHER,
                    bucket: e7d.bucket || '',
                    local: e7d.local || false,
                    nos_product: e7d.nosProduct || 0,
                    return_body: bbx4B
                },
                onload: yJ5O.ey9p(this, e7d),
                onerror: Ar6l.ey9p(this, e7d)
            })
        }
    }();
    jK1x.cus4w = function () {
        var cum4q = '//wanproxy.127.net/lbs';
        var yJ5O = function (o7h, e7d) {
            if (o7h.lbs) {}
            var Vy2x = o7h.upload;
            if (!Vy2x || !Vy2x.length) {
                Ar6l(o7h, e7d)
            }(e7d.onload || br7k).call(this, Vy2x)
        };
        var Ar6l = function (o7h, e7d) {
            (e7d.onerror || br7k).call(this, o7h)
        };
        return function (e7d) {
            var lv1x = e7d.bucket;
            return v7o.bn7g(cum4q, {
                method: 'GET',
                type: 'json',
                query: {
                    version: '1.0',
                    bucketname: lv1x
                },
                onload: yJ5O.ey9p(this, e7d),
                onerror: Ar6l.ey9p(this, e7d)
            })
        }
    }();
    jK1x.bbB4F = function () {
        return typeof File !== 'undefined' && typeof Blob !== 'undefined' && typeof FileList !== 'undefined' && (!!Blob.prototype.webkitSlice || !!Blob.prototype.mozSlice || !!Blob.prototype.slice || false)
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        ca8S = c7f('nej.ut'),
        bC8u = c7f('nej.ui'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        jK1x = c7f('nm.x.nos'),
        E7x = c7f('nm.m'),
        m7f = c7f('nm.l'),
        w7p = c7f('nm.w'),
        b7g,
        K7D;
    var gi0x = a6g.ir0x('<form action="" method="post" enctype="multipart/form-data"><input name="Object" type="hidden" value=""><input name="x-nos-token" type="hidden" value=""><input name="x-nos-entity-type" type="hidden" value="json" /><input name="Content-Type" type="hidden" value="" /><input class="j-file" type="file" name="file" /></form>');
    w7p.bBe2x = NEJ.C();
    b7g = w7p.bBe2x.N7G(bC8u.eg9X);
    b7g.cf8X = function () {
        this.ce8W = gi0x
    };
    b7g.bW8O = function () {
        this.cg8Y();
        this.bF8x = this.n7g;
        this.hG0x = a6g.H7A(this.n7g, 'j-file')[0];
        h7a.s7l(this.hG0x, 'change', this.rC3x.g7b(this))
    };
    b7g.bk7d = function (e7d) {
        e7d = e7d || {};
        this.bm7f(e7d);
        this.hG0x.accept = e7d.accept || '*';
        this.wH5M = e7d
    };
    b7g.bbC4G = function () {
        return a6g.lM1x(this.hG0x)
    };
    b7g.rC3x = function (d7e) {
        if (this.hG0x.value == '') return;
        var kN1x = this.hG0x.value.split('\\'),
            ft9k = kN1x.length > 0 ? kN1x[kN1x.length - 1] : kN1x[0],
            pb2x = (this.hG0x.files || [{}])[0];
        var cm8e = {
            files: this.hG0x.files,
            filename: ft9k,
            size: pb2x.size,
            cancelUpload: false
        };
        this.z7s('onchange', cm8e);
        if (cm8e.cancelUpload) {
            this.hG0x.value = '';
            return
        }
        if (cm8e.stopped) {
            return
        }
        this.Uq2x()
    };
    b7g.Uq2x = function () {
        if (this.hG0x.value == '') return;
        var kN1x = this.hG0x.value.split('\\'),
            ft9k = kN1x.length > 0 ? kN1x[kN1x.length - 1] : kN1x[0],
            ez9q = (ft9k.split('.') || []).pop(),
            pb2x = (this.hG0x.files || [{}])[0],
            ER7K = (pb2x.type || '').split('/').shift();
        if (pb2x.size > 100 * 1024 * 1024) {
            return this.nF2x('onerror', {
                code: -200
            })
        }
        this.z7s('onuploading', 0);
        this.bBC2x = jK1x.bbv4z(NEJ.X({
            onload: this.Um2x.ey9p(this, ft9k),
            onerror: this.nF2x.g7b(this)
        }, this.wH5M, function (p7i) {
            return k7d.gG0x(p7i) || k7d.ly1x(p7i)
        }))
    };
    b7g.Um2x = function (bS8K, ft9k) {
        var o7h = bS8K.result || {},
            lv1x = o7h.bucket,
            my1x = o7h.objectKey,
            eO9F = o7h.token;
        if (!lv1x || !my1x || !eO9F) {
            bS8K.code = -100;
            this.nF2x.call(this, bS8K);
            return
        }
        var pb2x = (this.hG0x.files || [{}])[0];
        var hO0x = a6g.dk9b(this.bF8x);
        hO0x[0].value = my1x;
        hO0x[1].value = eO9F;
        if (pb2x.type && pb2x.type.indexOf('audio') == 0) {
            hO0x[3].value = 'audio/mpeg'
        } else {
            hO0x[3].value = pb2x.type || ''
        }
        this.bF8x.action = '//nos.netease.com/' + lv1x;
        this.EV7O = o7h;
        this.qA3x = ft9k;
        this.z7s('onuploading', 0.2);
        this.gT0x()
    };
    b7g.gT0x = function () {
        this.bBC2x = v7o.gT0x(this.bF8x, {
            type: 'json',
            onload: this.vw4A.g7b(this),
            onerror: this.nF2x.g7b(this),
            onuploading: this.bbD4H.g7b(this)
        })
    };
    b7g.kf1x = function () {
        v7o.kf1x(this.bBC2x);
        this.bF8x.reset()
    };
    b7g.vw4A = function (bS8K) {
        var eO9F = this.EV7O,
            ft9k = this.qA3x,
            pb2x = (this.hG0x.files || [{}])[0],
            kv1x = {
                code: 200,
                fileName: ft9k,
                size: pb2x.size,
                bucket: eO9F.bucket,
                docId: eO9F.docId,
                objectKey: eO9F.objectKey,
                url: '//nos.netease.com/' + eO9F.bucket + '/' + eO9F.objectKey
            };
        if (!bS8K) {
            bS8K = kv1x
        }
        if (!bS8K.code || bS8K.code == 200) {
            this.z7s('onsuccess', NEJ.X(kv1x, bS8K))
        } else {
            this.z7s('onerror', bS8K)
        }
        this.bF8x.reset()
    };
    b7g.nF2x = function (bS8K) {
        this.z7s('onerror', bS8K);
        this.bF8x.reset()
    };
    b7g.bbD4H = function (iH0x) {
        this.z7s('onuploading', 0.2 + iH0x.loaded / iH0x.total * 0.8)
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        ca8S = c7f('nej.ut'),
        bC8u = c7f('nej.ui'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        jK1x = c7f('nm.x.nos'),
        E7x = c7f('nm.m'),
        m7f = c7f('nm.l'),
        w7p = c7f('nm.w'),
        b7g,
        K7D;
    w7p.Uh2x = NEJ.C();
    b7g = w7p.Uh2x.N7G(ca8S.cI8A);
    b7g.bk7d = function (e7d) {
        e7d = e7d || {};
        this.bm7f(e7d);
        this.bbH4L = w7p.bBe2x.A7t(NEJ.X({
            parent: e7d.parent,
            onchange: this.rC3x.g7b(this),
            onuploading: this.z7s.g7b(this, 'onuploading'),
            onsuccess: this.z7s.g7b(this, 'onsuccess'),
            onerror: this.z7s.g7b(this, 'onerror')
        }, e7d, function (p7i) {
            return k7d.gG0x(p7i) || k7d.ly1x(p7i)
        }));
        if (e7d.multiple && jK1x.bbB4F()) {
            a6g.gw0x(this.bbH4L.bbC4G(), 'multiple', true)
        }
        this.wH5M = e7d
    };
    b7g.rC3x = function (e7d) {
        var ft9k = e7d.filename,
            ez9q = (ft9k.split('.') || []).pop();
        this.bCg3x = (e7d.files || [{}])[0];
        this.z7s('onchange', e7d);
        if (jK1x.bbB4F() && !e7d.stopped && !e7d.cancelUpload) {
            this.Uq2x(true);
            e7d.stopped = true
        }
    };
    b7g.bbC4G = function () {
        return this.bbH4L.bbC4G()
    };
    b7g.cui4m = function () {
        return this.bCg3x
    };
    b7g.Uq2x = function (fd9U, cU8M) {
        cU8M = cU8M || this.bCg3x;
        if (jK1x.bbB4F()) {
            this.bCk3x = jK1x.gT0x(NEJ.X({
                file: cU8M,
                local: this.wH5M.bucket && this.wH5M.bucket.length,
                onuploading: this.z7s.g7b(this, 'onuploading'),
                onsuccess: this.z7s.g7b(this, 'onsuccess'),
                onerror: this.z7s.g7b(this, 'onerror')
            }, this.wH5M, function (p7i) {
                return k7d.gG0x(p7i) || k7d.ly1x(p7i)
            }));
            return this.bCk3x
        } else if (!fd9U) {
            this.bbH4L.Uq2x()
        }
    };
    b7g.kf1x = function (C7v) {
        C7v = C7v || this.bCk3x;
        if (C7v) {
            jK1x.kf1x(C7v)
        }
        this.bbH4L.kf1x()
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        eo9f = c7f('nej.g'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        fL9C = c7f('nej.n'),
        I7B = c7f('nej.ut'),
        bc7V = c7f('nej.ui'),
        w7p = c7f('nm.w'),
        m7f = c7f('nm.l'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        M7F = c7f('nm.x.f'),
        jK1x = c7f('nm.x.nos'),
        b7g,
        K7D,
        bnV9M = {
            0: '',
            '-1': '不能添加重复图片',
            '-10': '最多只能添加9张',
            '-3': '请选择不超过5M的图片'
        },
        bod9U = 5 * 1024 * 1024,
        cFm6g = 80,
        bCp3x = /\.(bmp|jpg|jpeg|png|gif)$/i;
    w7p.bCq3x = NEJ.C();
    b7g = w7p.bCq3x.N7G(I7B.uJ4N);
    b7g.bgR5W = function () {
        return {
            x: this.Be6Y.clientWidth - this.n7g.offsetWidth,
            y: this.Be6Y.clientHeight - this.n7g.offsetHeight
        }
    };
    w7p.bom9d = NEJ.C();
    b7g = w7p.bom9d.N7G(bc7V.eg9X);
    b7g.cf8X = function () {
        this.ce8W = 'm-xwgt-share-upload'
    };
    b7g.bW8O = function () {
        this.cg8Y();
        var i7b = a6g.H7A(this.n7g, 'j-flag');
        this.bbP4T = i7b.shift();
        this.Jo8g = i7b.shift();
        this.Te1x = i7b.shift();
        this.bCy3x = {
            onchange: this.bCB3x.ey9p(this, 0),
            onerror: this.eI9z.g7b(this),
            onsuccess: this.vy4C.g7b(this),
            multiple: true,
            parent: this.Jo8g,
            accept: 'image/bmp,image/jpg,image/jpeg,image/png,image/gif'
        };
        this.boX9O = {
            onchange: this.bCB3x.ey9p(this, 1),
            onerror: this.eI9z.g7b(this),
            onsuccess: this.vy4C.g7b(this),
            multiple: true,
            accept: 'image/bmp,image/jpg,image/jpeg,image/png,image/gif'
        };
        this.cug4k = w7p.Uh2x.A7t(this.bCy3x)
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.boX9O.parent = e7d.button;
        this.Ji8a && this.Ji8a.T7M();
        this.Ji8a = w7p.Uh2x.A7t(this.boX9O);
        this.n7g.style.display = 'none';
        if (!!this.eZ9Q) {
            for (var i = this.eZ9Q.length - 1; i >= 0; i--) {
                a6g.cJ8B(this.eZ9Q[i].element, false);
                if (this.eZ9Q[i].dragger) this.eZ9Q[i].dragger.T7M()
            }
        }
        this.eZ9Q = [];
        if (this.Bf6Z) {
            clearTimeout(this.Bf6Z)
        }
        this.bcc4g(0);
        this.Sw1x = 0;
        this.bX8P([
            [this.bCy3x.parent,
                'click',
                this.bCV3x.g7b(this)
            ],
            [
                this.boX9O.parent,
                'click',
                this.bCV3x.g7b(this)
            ]
        ])
    };
    b7g.bD8v = function () {
        h7a.hl0x(this.tQ4U, 'click');
        if (!!this.eZ9Q) {
            for (var i = this.eZ9Q.length - 1; i >= 0; i--) {
                a6g.cJ8B(this.eZ9Q[i].element, false);
                if (this.eZ9Q[i].dragger) this.eZ9Q[i].dragger.T7M()
            }
        }
        this.eZ9Q = [];
        if (this.Bf6Z) {
            clearTimeout(this.Bf6Z)
        }
        this.Bf6Z = 0;
        this.Ji8a && this.Ji8a.T7M();
        delete this.Ji8a;
        this.bG8y()
    };
    b7g.bCV3x = function (d7e) {
        if (!jK1x.bbB4F() && this.eZ9Q.doing) {
            h7a.bh7a(d7e)
        }
    };
    b7g.bCB3x = function (e7d, r7k) {
        var nc2x = e7d.files,
            iG0x;
        e7d.stopped = true;
        if (!nc2x) {
            if (e7d.filename) {
                nc2x = [{
                    name: e7d.filename,
                    isIE: true
                }]
            }
        }
        for (var i = 0, len = nc2x.length; i < len; i++) {
            if (!bCp3x.test(nc2x[i].name)) {
                this.bpg9X({
                    path: nc2x[i].name,
                    index: r7k,
                    status: -4,
                    fail: '这不是<br>图片'
                })
            } else if (nc2x[i].size > bod9U) {
                this.bph9Y(-3);
                this.bpg9X({
                    path: nc2x[i].name,
                    index: r7k,
                    status: -3,
                    fail: '上传<br>失败'
                })
            } else {
                this.bpg9X({
                    path: nc2x[i].name,
                    file: nc2x[i],
                    index: r7k,
                    status: 0
                })
            }
        }
    };
    b7g.bpg9X = function (tF4J) {
        if (this.eZ9Q.length >= 9) {
            this.bph9Y(-10, 3000, this.bDi3x.g7b(this));
            return
        }
        this.cuf4j(tF4J);
        this.eZ9Q.push(tF4J);
        if (!!this.eZ9Q.length) {
            this.n7g.style.display = ''
        }
        if (this.eZ9Q.length >= 9) {
            this.Jo8g.style.display = 'none'
        } else {
            this.Jo8g.style.display = ''
        }
        this.Je8W()
    };
    b7g.Je8W = function () {
        var bpk9b = -1,
            bDp3x = 0;
        for (var i = 0, l = this.eZ9Q.length; i < l; i++) {
            if (this.eZ9Q[i].status == 1) {
                return
            }
            if (this.eZ9Q[i].status == 0 && bpk9b < 0) {
                bpk9b = i
            }
            if (this.eZ9Q[i].status == 2 || this.eZ9Q[i].status < 0) {
                bDp3x++
            }
        }
        var p7i = this.eZ9Q[bpk9b];
        if (p7i) {
            (p7i.index == 0 ? this.cug4k : this.Ji8a).Uq2x(false, p7i.file);
            p7i.status = 1;
            this.eZ9Q.doing = p7i;
            this.z7s('onstartupload', {})
        } else if (bDp3x == this.eZ9Q.length) {
            this.z7s('onfinishupload', {})
        }
    };
    b7g.bpq9h = function () {
        return this.eZ9Q.doing || {}
    };
    b7g.eI9z = function (d7e) {
        var tF4J = this.bpq9h();
        tF4J.status = -4;
        tF4J.fail = '上传<br>失败';
        this.bDt3x(tF4J);
        this.eZ9Q.doing = null;
        this.Je8W()
    };
    b7g.vy4C = function (d7e) {
        var tF4J = this.bpq9h(),
            dP9G = d7e.fileName.match(bCp3x);
        tF4J.picUrl = d7e.url;
        v7o.bn7g('/upload/event/img/v1', {
            query: {
                imgid: d7e.docId,
                format: dP9G[1]
            },
            type: 'json',
            onload: this.bDv3x.g7b(this),
            onerror: this.bDv3x.g7b(this)
        })
    };
    b7g.bDv3x = function (d7e) {
        if (d7e && d7e.code == 200 && d7e.picInfo) {
            var tF4J = this.bpq9h();
            tF4J.status = 2;
            var bz7s = NEJ.X({}, d7e.picInfo);
            bz7s.originId = bz7s.originIdStr;
            bz7s.squareId = bz7s.squareIdStr;
            bz7s.rectangleId = bz7s.rectangleIdStr;
            bz7s.pcSquareId = bz7s.pcSquareIdStr;
            bz7s.pcRectangleId = bz7s.pcRectangleIdStr;
            bz7s.originJpgId = bz7s.originJpgIdStr || bz7s.originJpgId;
            tF4J.picInfo = bz7s;
            this.bDt3x(tF4J);
            this.eZ9Q.doing = null;
            this.Je8W()
        } else {
            this.eI9z(d7e)
        }
    };
    b7g.bph9Y = function (r7k, lb1x, eM9D) {
        if (this.Sw1x < r7k) {
            return
        }
        if (this.Bf6Z) {
            clearTimeout(this.Bf6Z);
            this.Bf6Z = 0
        }
        if (lb1x) {
            this.Te1x.innerText = bnV9M[r7k * 1];
            this.Sw1x = r7k;
            this.Bf6Z = setTimeout(this.bcc4g.g7b(this, r7k, eM9D), lb1x)
        } else {
            this.Te1x.innerText = bnV9M[r7k];
            this.Sw1x = r7k
        }
        this.Te1x.style.display = ''
    };
    b7g.bcc4g = function (r7k, eM9D) {
        if (r7k && this.Sw1x !== r7k) {
            return
        }
        this.Sw1x = 0;
        this.Te1x.innerText = bnV9M[0];
        this.Te1x.style.display = 'none';
        eM9D && eM9D()
    };
    b7g.cuf4j = function (cU8M) {
        var j7c = {};
        if (cU8M.fail) {
            j7c.fail = cU8M.fail
        }
        var dQ9H = a6g.bZ8R('m-xwgt-share-upload-preview', j7c);
        cU8M.element = a6g.on2x(dQ9H);
        h7a.s7l(a6g.H7A(cU8M.element, 'del')[0], 'mousedown', this.cue4i.g7b(this, cU8M), false);
        this.bbP4T.insertBefore(cU8M.element, this.bbP4T.lastElementChild);
        cU8M.dragger = w7p.bCq3x.A7t({
            view: this.bbP4T.parentNode,
            body: cU8M.element,
            overflow: false,
            direction: 0,
            isRelative: 1,
            ondragstart: this.PK0x.g7b(this, cU8M),
            onchange: this.cud4h.g7b(this, cU8M),
            ondragend: this.bho6i.g7b(this, cU8M)
        })
    };
    b7g.bDt3x = function (cU8M) {
        if (!cU8M || !cU8M.element) {
            return false
        }
        var j7c = {};
        if (cU8M.fail) {
            j7c.fail = cU8M.fail
        } else {
            j7c.url = cU8M.picUrl
        }
        a6g.y7r(cU8M.element, 'z-fail');
        cU8M.element.firstChild.outerHTML = a6g.bZ8R('m-xwgt-share-upload-preview-img', j7c)
    };
    b7g.PK0x = function (p7i, kJ1x) {
        a6g.y7r(p7i.element, 'z-sel')
    };
    b7g.cud4h = function (p7i, kJ1x) {
        var cFn6h,
            gu0x = this.eZ9Q.length - 1,
            oa2x;
        for (var i = gu0x; i >= 0; i--) {
            a6g.x7q(this.eZ9Q[i].element, 'z-jump');
            if (this.eZ9Q[i] == p7i) {
                oa2x = i
            } else {
                a6g.fb9S(this.eZ9Q[i].element, {
                    left: '',
                    top: ''
                })
            }
        }
        var RQ1x = {
            x: 46 + 92 * (oa2x % 5) + kJ1x.left,
            y: 46 + 92 * (oa2x / 5 >> 0) + kJ1x.top
        };
        var bpt9k = RQ1x.x / 92 >> 0,
            bpu9l = RQ1x.y / 92 >> 0,
            yV5a = Math.max(0, Math.min(gu0x, bpu9l * 5 + bpt9k));
        if (yV5a == oa2x) {
            return
        }
        var cua4e = yV5a < oa2x;
        for (var i = Math.min(yV5a, oa2x); i <= Math.max(yV5a, oa2x); i++) {
            if (i !== oa2x) {
                var bDK3x = i % 5;
                if (cua4e) {
                    if (bDK3x == 4) {
                        a6g.fb9S(this.eZ9Q[i].element, {
                            left: '-368px',
                            top: '92px'
                        })
                    } else {
                        a6g.fb9S(this.eZ9Q[i].element, {
                            left: '92px',
                            top: ''
                        })
                    }
                } else {
                    if (bDK3x == 0) {
                        a6g.fb9S(this.eZ9Q[i].element, {
                            left: '368px',
                            top: '-92px'
                        })
                    } else {
                        a6g.fb9S(this.eZ9Q[i].element, {
                            left: '-92px',
                            top: ''
                        })
                    }
                }
            }
        }
    };
    b7g.bho6i = function (p7i, kJ1x) {
        var cFo6i,
            gu0x = this.eZ9Q.length - 1,
            oa2x;
        for (var i = gu0x; i >= 0; i--) {
            a6g.fb9S(this.eZ9Q[i].element, {
                left: '',
                top: ''
            });
            if (this.eZ9Q[i] == p7i) {
                oa2x = i
            }
        }
        a6g.x7q(p7i.element, 'z-sel');
        var RQ1x = {
            x: 46 + 92 * (oa2x % 5) + kJ1x.left,
            y: 46 + 92 * (oa2x / 5 >> 0) + kJ1x.top
        };
        var bpt9k = RQ1x.x / 92 >> 0,
            bpu9l = RQ1x.y / 92 >> 0,
            yV5a = Math.max(0, Math.min(gu0x, bpu9l * 5 + bpt9k));
        if (yV5a == oa2x) {
            return
        }
        this.bbP4T.insertBefore(p7i.element, (this.eZ9Q[yV5a + (yV5a > oa2x ? 1 : 0)] || {}).element || this.Jo8g);
        this.eZ9Q.splice(oa2x, 1);
        this.eZ9Q.splice(yV5a, 0, p7i)
    };
    b7g.cue4i = function (p7i, d7e) {
        a6g.cJ8B(p7i.element, false);
        if (p7i.dragger) p7i.dragger.T7M();
        delete p7i.dragger;
        var r7k = -1;
        for (var i = this.eZ9Q.length - 1; i >= 0; i--) {
            if (this.eZ9Q[i] == p7i) {
                r7k = i;
                break
            }
        }
        this.eZ9Q.splice(r7k, r7k >= 0 ? 1 : 0);
        delete p7i;
        if (this.eZ9Q.length >= 9) {
            this.Jo8g.style.display = 'none'
        } else {
            this.Jo8g.style.display = ''
        }
        if (!this.eZ9Q.length) {
            this.n7g.style.display = 'none';
            this.bcc4g(0)
        } else {
            this.bDi3x()
        }
        if (this.eZ9Q.doing == p7i) {
            this.eZ9Q.doing = null
        }
        this.Je8W()
    };
    b7g.bDi3x = function () {
        var bDM3x = false;
        for (var i = 0, len = this.eZ9Q.length; i < len; i++) {
            if (this.eZ9Q[i].status == -3) {
                bDM3x = true
            }
        }
        if (bDM3x) {
            this.bph9Y(-3)
        } else {
            this.bcc4g(-3)
        }
    };
    b7g.Rz1x = function () {
        var dE9v = [];
        for (var i = this.eZ9Q.length - 1; i >= 0; i--) {
            if (this.eZ9Q[i].status == 2) {
                dE9v.unshift(this.eZ9Q[i].picInfo)
            }
        }
        return dE9v
    };
    I7B.fI9z.A7t({
        element: w7p.bom9d,
        event: [
            'onstartupload',
            'onfinishupload'
        ]
    })
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        fA9r = NEJ.R,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        bc7V = c7f('nej.ui'),
        O7H = c7f('nej.ut'),
        b7g,
        K7D;
    if (!!O7H.nd2x) return;
    O7H.nd2x = NEJ.C();
    b7g = O7H.nd2x.N7G(O7H.Zd3x);
    K7D = O7H.nd2x.ct8l;
    b7g.bk7d = function (e7d) {
        this.ctX4b(e7d.more);
        this.FG7z = a6g.B7u(e7d.sbody);
        this.ctV4Z = e7d.fixScrollPosition;
        this.bX8P([
            [this.FG7z,
                'scroll',
                this.ctT4X.g7b(this)
            ]
        ]);
        var do9f = e7d.delta;
        if (do9f == null) do9f = 30;
        this.Rm1x = Math.max(0, do9f);
        var cH8z = parseInt(e7d.count) || 0;
        this.jy1x = Math.max(0, cH8z);
        var gV0x = parseInt(e7d.number) || 0;
        if (gV0x > 1 && gV0x <= cH8z) {
            this.Cd6X = gV0x
        }
        this.bm7f(e7d)
    };
    b7g.bD8v = function () {
        this.bG8y();
        delete this.BA6u;
        delete this.FG7z;
        delete this.tA4E;
        delete this.bcz4D
    };
    b7g.Ao6i = function (bi7b, bq7j) {
        var bM8E = this.yD5I + (this.jy1x - 1) * this.oL2x,
            fY0x = this.jy1x * this.oL2x;
        return K7D.Ao6i.call(this, bM8E, bi7b, fY0x, bq7j)
    };
    b7g.ctX4b = function (bcA4E) {
        this.BA6u = a6g.B7u(bcA4E);
        this.bX8P([
            [this.BA6u,
                'click',
                this.pe2x.g7b(this)
            ]
        ])
    };
    b7g.bqs0x = function (F7y) {
        F7y = F7y || {};
        if (this.tA4E || !F7y) return;
        if (!F7y.scrollHeight) F7y = a6g.ow2x();
        var bi7b = a6g.hR0x(this.ij0x, this.ctV4Z ? F7y : null),
            do9f = bi7b.y + this.ij0x.offsetHeight - F7y.scrollTop - F7y.clientHeight,
            bqt0x = F7y.scrollHeight <= F7y.clientHeight;
        if (do9f <= this.Rm1x || bqt0x && !this.tA4E) {
            this.pe2x()
        }
    };
    b7g.ctT4X = function (d7e) {
        if (this.tA4E) return;
        this.bqs0x(h7a.W7P(d7e))
    };
    b7g.AC6w = function (d7e) {
        K7D.AC6w.apply(this, arguments);
        if (!d7e.stopped) {
            this.Qa0x();
            var bi7b = 0;
            if (d7e.index > 1) {
                bi7b = this.yD5I + ((d7e.index - 1) * this.jy1x - 1) * this.oL2x
            }
            this.hQ0x = bi7b;
            this.pe2x()
        }
    };
    b7g.bQg6a = function (e7d) {
        if (!!this.Cd6X) {
            var do9f = e7d.offset > 0 ? this.oL2x : this.yD5I,
                fY0x = do9f + this.oL2x * (this.Cd6X - 1);
            this.hQ0x = e7d.offset + fY0x;
            e7d.data.limit = fY0x;
            e7d.limit = fY0x;
            delete this.Cd6X
        }
        return e7d
    };
    b7g.bha5f = function (e7d) {
        delete this.bcz4D;
        K7D.bha5f.apply(this, arguments);
        this.bEk3x()
    };
    b7g.bhl6f = function (d7e) {
        if (d7e.key != this.ju1x.key) return;
        switch (d7e.action) {
        case 'refresh':
        case 'append':
            delete this.bcz4D;
            break
        }
        K7D.bhl6f.apply(this, arguments)
    };
    b7g.Pv0x = function () {
        this.yF5K('onbeforelistload', '列表加载中...');
        a6g.ba7T(this.BA6u, 'display', 'none')
    };
    b7g.bim7f = function (i7b, bi7b, fY0x) {
        var bq7j = i7b.length,
            bqC0x = i7b.loaded ? bi7b + fY0x >= bq7j : bi7b + fY0x > bq7j;
        this.hQ0x = Math.min(this.hQ0x, bq7j);
        a6g.ba7T(this.BA6u, 'display', bqC0x ? 'none' : '');
        if (bqC0x) this.tA4E = !0;
        if (this.jy1x > 0) {
            var bz7s = this.Ao6i(bi7b, i7b.length);
            if (this.bQP7I(bz7s.index, bz7s.total)) return !0;
            var do9f = this.yD5I - this.oL2x,
                gV0x = this.jy1x * this.oL2x;
            this.tA4E = (bi7b + fY0x - do9f) % gV0x == 0 || bqC0x;
            a6g.ba7T(this.BA6u, 'display', this.tA4E ? 'none' : '');
            this.bhI6C(this.tA4E && bz7s.total > 1 ? '' : 'none')
        }
    };
    b7g.bic7V = function () {
        this.hQ0x = 0;
        this.tA4E = !0;
        this.yF5K('onemptylist', '没有列表数据！')
    };
    b7g.Pm0x = function (dQ9H, kJ1x) {
        this.ij0x.insertAdjacentHTML(kJ1x || 'beforeEnd', dQ9H)
    };
    b7g.Pl0x = function (hp0x) {
        this.fK9B = this.fK9B || [];
        if (k7d.eJ9A(hp0x)) {
            fA9r.push.apply(this.fK9B, hp0x)
        } else {
            this.fK9B.push(hp0x)
        }
    };
    b7g.Zv3x = function (d7e) {
        a6g.mT2x(this.cu8m);
        this.OU0x(d7e, 'onafteradd');
        var fd9U = d7e.flag;
        if (d7e.stopped || !fd9U) return;
        if (this.jy1x > 0) {
            this.bhT6N();
            return
        }
        this.hQ0x += 1;
        fd9U == -1 ? this.bjt7m(d7e.data) : this.bRE7x(d7e.data)
    };
    b7g.Zw3x = function (d7e) {
        this.OU0x(d7e, 'onafterdelete');
        if (d7e.stopped) return;
        if (this.jy1x > 0) {
            this.bhT6N();
            return
        }
        var C7v = d7e.data[this.fn9e.pkey];
        if (!!this.fK9B) {
            var p7i = a6g.bCS3x(C7v),
                r7k = k7d.dj9a(this.fK9B, p7i);
            if (r7k >= 0) {
                this.fK9B.splice(r7k, 1);
                this.hQ0x -= 1
            }
            if (!!p7i) p7i.T7M()
        } else {
            var f7c = a6g.B7u(this.bOh5m(C7v));
            if (!!f7c) this.hQ0x -= 1;
            a6g.cJ8B(f7c)
        }
        if (this.hQ0x <= 0) this.pe2x()
    };
    b7g.bjp7i = function (bi7b, fY0x) {
        if (bi7b != this.hQ0x) return;
        if (this.Ya3x()) {
            this.tA4E = !1;
            this.bEk3x()
        }
    };
    b7g.bjq7j = function (bi7b, fY0x) {
        if (bi7b != 0) return;
        var Kb9S = this.S7L.hI0x(this.ju1x.key);
        for (var i = fY0x - 1; i >= 0; i--) {
            this.bjt7m(Kb9S[i])
        }
    };
    b7g.bEk3x = function () {
        var F7y = this.FG7z;
        if (!F7y || this.tA4E) return;
        this.bqs0x(this.FG7z)
    };
    b7g.gD0x = function () {
        delete this.tA4E;
        K7D.gD0x.apply(this, arguments)
    };
    b7g.pe2x = function () {
        if (!!this.bcz4D) return;
        this.bcz4D = !0;
        var bi7b = this.hQ0x;
        this.hQ0x += bi7b == 0 ? this.yD5I : this.oL2x;
        this.bQe6Y(bi7b)
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        cX8P = c7f('nej.x'),
        O7H = c7f('nej.ut'),
        b7g;
    if (!!O7H.FS7L) return;
    O7H.FS7L = NEJ.C();
    b7g = O7H.FS7L.N7G(O7H.cI8A);
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.jo1x = e7d.event || 'click';
        this.kT1x = e7d.selected || 'js-selected';
        this.nY2x = e7d.disabled || 'js-disabled';
        this.bEq3x = !!e7d.inverse;
        this.ctS4W(e7d.list);
        this.Qv0x(e7d.index || 0)
    };
    b7g.bD8v = function () {
        var bVe8W = function (f7c) {
            this.bqZ0x(f7c, !1)
        };
        return function () {
            this.bG8y();
            k7d.bd7W(this.bU8M, bVe8W, this);
            delete this.bU8M;
            delete this.jo1x;
            delete this.co8g;
            delete this.nY2x;
            delete this.kT1x;
            delete this.bEq3x
        }
    }();
    b7g.ctS4W = function () {
        var bfa5f = function (p7i) {
            if (!p7i) return;
            this.bU8M.push(p7i);
            var r7k = this.bU8M.length - 1,
                dt9k = this.brq0x[r7k];
            if (!dt9k) {
                dt9k = this.Qv0x.g7b(this, r7k);
                this.brq0x[r7k] = dt9k
            }
            this.bX8P([
                [p7i,
                    this.jo1x,
                    dt9k
                ]
            ])
        };
        return function (i7b) {
            this.bU8M = [];
            if (!this.brq0x) this.brq0x = [];
            k7d.bd7W(i7b, bfa5f, this)
        }
    }();
    b7g.bqZ0x = function (F7y, ctO4S) {
        !!ctO4S && !this.bEq3x ? a6g.y7r(F7y, this.kT1x) : a6g.x7q(F7y, this.kT1x)
    };
    b7g.Qv0x = function (r7k, PH0x, j7c) {
        var F7y = this.bU8M[r7k];
        if (PH0x != !0 && (r7k == this.co8g || !F7y || a6g.bE8w(F7y, this.nY2x))) {
            h7a.cr8j(arguments[1]);
            return this
        }
        var d7e = {
            index: r7k,
            last: this.co8g,
            list: this.lQ1x(),
            data: j7c || a6g.t7m(F7y, 'value')
        };
        this.co8g = r7k;
        F7y = this.bU8M[d7e.last];
        if (!!F7y) this.bqZ0x(F7y, !1);
        F7y = this.bU8M[this.co8g];
        this.bqZ0x(F7y, !0);
        this.z7s('onchange', d7e);
        if (!d7e.nostop) h7a.cr8j(arguments[1]);
        return this
    };
    b7g.sY3x = function () {
        return this.co8g
    };
    b7g.lQ1x = function () {
        return this.bU8M
    };
    a6g.ctN4R = cX8P.ctN4R = function (bI8A, e7d) {
        var C7v = a6g.lM1x(bI8A);
        if (!C7v) return null;
        if (!O7H.bbS4W(C7v, O7H.FS7L)) {
            e7d = e7d || {};
            e7d.list = !e7d.clazz ? a6g.dk9b(C7v) : a6g.H7A(C7v, e7d.clazz);
            delete e7d.clazz
        }
        return O7H.bbS4W(C7v, O7H.FS7L, e7d || bb7U)
    };
    cX8P.isChange = !0
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        l7e = c7f('nm.x');
    var SETTING_KEY = 'player-setting';
    var nx2x = {
        mode: 4,
        volume: 0.8,
        autoPlay: false,
        index: 0,
        lock: false
    };
    nx2x = v7o.tI4M(SETTING_KEY) || nx2x;
    l7e.bsa0x = function () {
        return nx2x
    };
    l7e.Gb7U = function (Gc7V) {
        if (Gc7V) {
            nx2x = Gc7V;
            v7o.uk4o(SETTING_KEY, Gc7V)
        }
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        l7e = c7f('nm.x'),
        q7j = c7f('nm.d'),
        hi0x = c7f('nm.w.player.log');
    var kH1x = q7j.hT0x.A7t();
    var LogLevel = {
        ERROR: 10,
        INFO: 6,
        DEBUG: 2
    };
    var he0x = function (u7n, bH8z, qF3x) {
        var cG8y = l7e.ff9W('{0} {1} {2}', k7d.if0x(new Date, 'yyyy-MM-dd HH:mm:ss'), u7n, bH8z);
        if (qF3x == LogLevel.ERROR) {
            kH1x.eT9K('playerror', {
                message: bH8z
            })
        }
        if (qF3x >= LogLevel.INFO) {
            kH1x.bEm3x(cG8y)
        }
        if (location.hostname.indexOf('igame.163.com') != -1) {
            console.log(cG8y)
        }
    };
    hi0x.ch8Z = function () {
        he0x('PLAY_ERROR', l7e.ff9W.apply(null, arguments), LogLevel.ERROR)
    };
    hi0x.pV2x = function () {
        he0x('PLAY_INFO', l7e.ff9W.apply(null, arguments), LogLevel.INFO)
    };
    hi0x.cFq6k = function () {
        he0x('PLAY_DEBUG', l7e.ff9W.apply(null, arguments), LogLevel.DEBUG)
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        I7B = c7f('nej.ut'),
        k7d = c7f('nej.u'),
        w7p = c7f('nm.w'),
        eM9D = c7f('flash.cb');
    var ee9V = [
        'loadedmetadata',
        'play',
        'pause',
        'ended',
        'waiting',
        'playing',
        'timeupdate',
        'progress',
        'stalled',
        'error'
    ];
    var Gh7a,
        bdl4p,
        vH4L;
    w7p.ctK4O = function (u7n, cN8F) {
        if (u7n != 'flash') {
            if (!Gh7a) {
                Gh7a = a6g.dh9Y('audio');
                k7d.bd7W(ee9V, function (u7n) {
                    h7a.s7l(Gh7a, u7n, onMediaCallBack)
                })
            }
            if (Gh7a && Gh7a.canPlayType && Gh7a.canPlayType('audio/mpeg')) {
                cN8F(new MediaWrap('audio'));
                return
            }
        }
        if (!bdl4p) {
            a6g.sE3x({
                src: '/style/swf/music/music.swf?v=20151204',
                hidden: true,
                params: {
                    allowscriptaccess: 'always'
                },
                onready: function (hP0x) {
                    bdl4p = hP0x;
                    k7d.bd7W(ee9V, function (u7n) {
                        eM9D[u7n] = onMediaCallBack;
                        bdl4p.addCallback(u7n, 'flash.cb.' + u7n)
                    });
                    cN8F(new MediaWrap('flash'))
                }.g7b(this)
            })
        } else {
            cN8F(new MediaWrap('flash'))
        }
    };

    function MediaWrap(Gl7e) {
        var gN0x;
        I7B.fI9z.A7t({
            element: this,
            event: ee9V.concat(['interrupt',
                'recover'
            ])
        });
        gN0x = Gl7e == 'audio' ? Gh7a : bdl4p;
        this.type = Gl7e;
        this.destroy = function () {};
        this.setSrc = function (Y7R) {
            if (vH4L != this) {
                var gu0x = vH4L;
                if (gu0x) {
                    gu0x.interrupt()
                }
                vH4L = this
            }
            if (Gl7e == 'flash') {
                gN0x.setSrc(Y7R)
            } else {
                gN0x.src = Y7R
            }
        };
        this.play = function () {
            if (vH4L != this) {
                var gu0x = vH4L;
                if (gu0x) {
                    gu0x.interrupt();
                    vH4L = this;
                    this.recover()
                } else {
                    vH4L = this
                }
            }
            if (Gl7e == 'flash') {
                gN0x.as_play()
            } else {
                gN0x.play()
            }
        };
        this.pause = function () {
            if (vH4L != this) return;
            if (Gl7e == 'flash') {
                gN0x.as_pause()
            } else {
                gN0x.pause()
            }
        };
        this.load = function () {
            if (vH4L != this) return;
            if (Gl7e == 'flash') {
                gN0x.as_load()
            } else {
                gN0x.load()
            }
        };
        this.interrupt = function () {
            onMediaCallBack({
                type: 'interrupt'
            })
        };
        this.recover = function () {
            onMediaCallBack({
                type: 'recover'
            })
        };
        this.getMedia = function () {
            return gN0x
        };
        var pf2x = [
            'Src',
            'Duration',
            'CurrentTime',
            'Paused',
            'Ended',
            'ReadyState',
            'Volume',
            'Error',
            'Buffered',
            'NetworkState'
        ];
        k7d.bd7W(pf2x, function (V7O) {
            var OC0x = 'get' + V7O,
                Ou0x = 'set' + V7O;
            if (Gl7e == 'flash') {
                if (!this[OC0x]) {
                    this[OC0x] = function () {
                        return gN0x[OC0x]()
                    }
                }
                if (!this[Ou0x]) {
                    this[Ou0x] = function (value) {
                        gN0x[Ou0x](value)
                    }
                }
            } else {
                var bFi3x = V7O.slice(0, 1).toLowerCase() + V7O.slice(1);
                if (!this[OC0x]) {
                    this[OC0x] = function () {
                        return gN0x[bFi3x]
                    }
                }
                if (!this[Ou0x]) {
                    this[Ou0x] = function (value) {
                        gN0x[bFi3x] = value
                    }
                }
            }
        }, this)
    }

    function onMediaCallBack(d7e) {
        if (vH4L) {
            h7a.z7s(vH4L, d7e.type, d7e)
        }
    }
})();
(function () {
    var c7f = NEJ.P,
        h7a = c7f('nej.v'),
        v7o = c7f('nej.j'),
        I7B = c7f('nej.ut'),
        dv9m = c7f('nej.p'),
        w7p = c7f('nm.w'),
        l7e = c7f('nm.x'),
        hi0x = c7f('nm.w.player.log'),
        b7g;
    var DEFAULT_BR = 128000;
    var CDN_HOST_REG = /(m\d+\.music\.126\.net)/;
    var MAX_STALLED_RETRY = 2;
    var MediaError = {
        MEDIA_ERR_ABORTED: 1,
        MEDIA_ERR_NETWORK: 2,
        MEDIA_ERR_DECODE: 3,
        MEDIA_ERR_SRC_NOT_SUPPORTED: 4
    };
    var ErrorType = {
        INFO_GET_ERR: 1,
        NET_ERR: 2,
        UNKNOWN_ERR: 10
    };
    var LoadState = {
        LOAD_START: 1,
        LOADED_META: 2,
        IN_RELOAD: 3,
        IN_RE_GET_URL: 4,
        IN_SWITCH_CDN: 5,
        IN_SWITCH_MEDIA: 6
    };
    var RetryLevel = {
        NONE: 0,
        GET_URL: 1,
        RELOAD: 2,
        SWITCH_CDN: 3
    };
    var bFk3x = false;
    w7p.fN9E = NEJ.C();
    b7g = w7p.fN9E.N7G(I7B.cI8A);
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.cM8E = {};
        this.bdt4x(e7d.media);
        v7o.bn7g('/api/cdns', {
            type: 'json',
            onload: function (d7e) {
                if (d7e.code) {
                    this.qK3x = d7e.data
                }
            }.g7b(this)
        })
    };
    b7g.bD8v = function () {
        this.bG8y();
        delete this.cM8E
    };
    b7g.bdu4y = function (bj7c) {
        if (!bj7c) return;
        var xj5o = this.cM8E.volume;
        if (this.dS9J) {
            this.dS9J.pause()
        }
        this.cM8E = {
            time: 0,
            id: bj7c.id,
            duration: bj7c.duration / 1000,
            play: this.cM8E.play,
            stalledRetryCount: 0
        };
        if (xj5o != null) {
            this.cM8E.volume = xj5o
        }
        this.cM8E.loadState = LoadState.LOAD_START;
        this.bFw3x(bj7c.id);
        hi0x.pV2x('play song id: {0}', bj7c.id)
    };
    b7g.ek9b = function () {
        if (this.cM8E.error) {
            this.cM8E.error = null;
            if (this.cM8E.error == ErrorType.INFO_GET_ERR || this.bFy3x()) {
                this.bFz3x()
            } else {
                this.Op0x()
            }
        } else {
            if (this.dS9J) {
                this.dS9J.play()
            }
        }
        this.cM8E.play = true;
        this.qb3x('play')
    };
    b7g.fG9x = function () {
        if (this.dS9J) {
            this.dS9J.pause()
        }
        this.cM8E.play = false;
        this.qb3x('pause')
    };
    b7g.pj2x = function (bA7t) {
        if (this.dS9J) {
            this.dS9J.setCurrentTime(bA7t)
        }
        this.cM8E.time = bA7t;
        hi0x.pV2x('seek to: {0}', bA7t)
    };
    b7g.bsQ0x = function () {
        return this.cM8E.duration || 0
    };
    b7g.vL4P = function () {
        return !!this.cM8E.play
    };
    b7g.mR2x = function (Of0x) {
        this.cM8E.volume = Of0x;
        if (this.dS9J) {
            this.dS9J.setVolume(Of0x)
        }
    };
    b7g.bdv4z = function () {
        return this.cM8E.time
    };
    b7g.bdt4x = function (u7n) {
        w7p.ctK4O(u7n, function (gN0x) {
            this.dS9J = gN0x;
            hi0x.pV2x('media loaded: {0}', gN0x.type);
            this.bX8P([
                [this.dS9J,
                    'loadedmetadata',
                    this.ctI4M.g7b(this)
                ],
                [
                    this.dS9J,
                    'ended',
                    this.ctH4L.g7b(this)
                ],
                [
                    this.dS9J,
                    'waiting',
                    this.zA5F.g7b(this)
                ],
                [
                    this.dS9J,
                    'play',
                    this.vM4Q.g7b(this)
                ],
                [
                    this.dS9J,
                    'pause',
                    this.btf0x.g7b(this)
                ],
                [
                    this.dS9J,
                    'playing',
                    this.NN0x.g7b(this)
                ],
                [
                    this.dS9J,
                    'timeupdate',
                    this.ctG4K.g7b(this)
                ],
                [
                    this.dS9J,
                    'progress',
                    this.sP3x.g7b(this)
                ],
                [
                    this.dS9J,
                    'stalled',
                    this.btV1x.g7b(this)
                ],
                [
                    this.dS9J,
                    'interrupt',
                    this.fG9x.g7b(this)
                ],
                [
                    this.dS9J,
                    'recover',
                    this.ctE4I.g7b(this)
                ],
                [
                    this.dS9J,
                    'error',
                    this.eI9z.g7b(this)
                ]
            ]);
            if (this.cM8E) {
                if (this.cM8E.loadState == LoadState.LOAD_START || this.cM8E.loadState == LoadState.IN_SWITCH_MEDIA) {
                    this.bua1x();
                    if (this.cM8E.volume != null) {
                        this.dS9J.setVolume(this.cM8E.volume)
                    }
                }
            }
        }.g7b(this))
    };
    b7g.ctD4H = function (u7n) {
        this.Jk8c();
        this.dS9J.destroy();
        this.cM8E.loadState = LoadState.IN_SWITCH_MEDIA;
        this.zA5F();
        this.bdt4x(u7n);
        hi0x.pV2x('switch media')
    };
    b7g.cFr6l = function () {
        return this.dS9J
    };
    b7g.bFw3x = function () {
        this.zA5F();
        v7o.bn7g('/api/song/enhance/player/url', {
            type: 'json',
            query: {
                ids: JSON.stringify([this.cM8E.id]),
                br: DEFAULT_BR
            },
            onload: this.bGc4g.g7b(this),
            onerror: this.bGc4g.g7b(this)
        })
    };
    b7g.bGc4g = function (d7e) {
        if (d7e.code == 200 && d7e.data && d7e.data.length) {
            var bz7s = d7e.data[0];
            if (!bz7s.url) {
                this.cM8E.error = ErrorType.INFO_GET_ERR;
                this.qb3x('error', {
                    code: this.cM8E.error
                });
                return
            }
            this.cM8E.playUrl = bz7s.url;
            this.cM8E.expireTime = (new Date).getTime() + bz7s.expi * 1000;
            this.bua1x()
        } else {
            this.cM8E.error = ErrorType.INFO_GET_ERR;
            this.qb3x('error', {
                code: this.cM8E.error
            });
            hi0x.ch8Z('info load error')
        }
    };
    b7g.bua1x = function () {
        if (this.dS9J) {
            var Y7R = this.cM8E.playUrl;
            if (this.cM8E.time > 0 && (this.cM8E.loadState == LoadState.IN_RE_GET_URL || this.cM8E.loadState == LoadState.IN_RE_GET_URL)) {
                Y7R += '#t=' + this.cM8E.time
            }
            this.dS9J.setSrc(Y7R);
            hi0x.pV2x('load mp3: {0},loadState: {1}.', Y7R, this.cM8E.loadState)
        }
    };
    b7g.bGf4j = function () {
        if (/#t=(\d+)$/.test(this.dS9J.getSrc())) {
            return parseInt(RegExp.$1) || 0
        } else {
            return 0
        }
    };
    b7g.Op0x = function () {
        var bA7t = parseInt(this.cM8E.time) || 0,
            ctA4E = this.bGf4j();
        if (bA7t === ctA4E) {
            this.dS9J.load()
        } else {
            this.dS9J.setSrc(this.cM8E.playUrl + '#t=' + bA7t)
        }
        this.cM8E.loadState = LoadState.IN_RELOAD;
        this.zA5F();
        hi0x.pV2x('reload from: {0}', bA7t)
    };
    b7g.bFz3x = function () {
        this.cM8E.loadState = LoadState.IN_RE_GET_URL;
        this.bFw3x()
    };
    b7g.bGj4n = function () {
        var tN4R = getHost(this.cM8E.playUrl);
        if (tN4R) {
            for (var i = 0; i < this.qK3x.length; i++) {
                var io0x = this.qK3x[i] || [],
                    r7k = io0x.indexOf(tN4R);
                if (r7k >= 0 && io0x.length > 1) {
                    return io0x[(r7k + 1) % io0x.length]
                }
            }
        }

        function getHost(Y7R) {
            if (CDN_HOST_REG.test(Y7R)) return RegExp.$1
        }
    };
    b7g.ctz4D = function () {
        this.cM8E.playUrl = this.cM8E.playUrl.replace(CDN_HOST_REG, this.bGj4n());
        this.cM8E.loadState = LoadState.IN_SWITCH_CDN;
        this.bua1x();
        this.zA5F()
    };
    b7g.ctI4M = function () {
        if (this.cM8E.loadState == LoadState.LOAD_START) {
            this.cM8E.loadState = LoadState.LOADED_META;
            if (this.dS9J.type == 'audio') {
                this.cM8E.duration = this.dS9J.getDuration()
            }
            this.qb3x('loadedmeta', {
                duration: this.cM8E.duration
            })
        } else {
            this.cM8E.loadState = LoadState.LOADED_META
        }
        if (this.cM8E.play) {
            this.dS9J.play()
        } else {
            this.dS9J.pause()
        }
        if (this.cM8E.time && parseInt(this.cM8E.time) != this.bGf4j()) {
            this.dS9J.setCurrentTime(this.cM8E.time)
        }
        this.It8l();
        this.NN0x();
        bFk3x = true;
        hi0x.pV2x('loaded meta')
    };
    b7g.ctH4L = function () {
        this.cM8E.ended = true;
        this.qb3x('ended')
    };
    b7g.zA5F = function () {
        if (!this.cM8E.waiting) {
            this.cM8E.waiting = true;
            this.cM8E.waitTimestamp = +(new Date);
            this.qb3x('waiting')
        }
    };
    b7g.NN0x = function () {
        this.cM8E.waiting = false;
        this.cM8E.waitTimestamp = 0;
        this.qb3x('playing')
    };
    b7g.vM4Q = function () {
        this.qb3x('play')
    };
    b7g.btf0x = function () {
        this.qb3x('pause')
    };
    b7g.ctG4K = function () {
        if (this.cM8E.loadState != LoadState.LOADED_META) return;
        var bA7t = this.dS9J.getCurrentTime();
        if (this.cM8E.waiting && bA7t > this.cM8E.time) {
            this.NN0x()
        }
        this.cM8E.time = bA7t;
        this.qb3x('timeupdate', {
            time: this.cM8E.time,
            duration: this.cM8E.duration
        })
    };
    b7g.sP3x = function (d7e) {
        if (this.cM8E.loadState != LoadState.LOADED_META) return;
        var o7h = {};
        if (d7e.data) {
            o7h.total = d7e.data.total;
            o7h.loaded = d7e.data.loaded
        } else {
            var zH5M = this.dS9J.getBuffered(),
                bA7t = this.dS9J.getCurrentTime(),
                oB2x = 0;
            for (var i = 0; i < zH5M.length; i++) {
                if (bA7t > zH5M.start(i) && bA7t < zH5M.end(i)) {
                    oB2x = zH5M.end(i);
                    break
                }
            }
            o7h.total = this.cM8E.duration;
            o7h.loaded = Math.min(oB2x, o7h.total)
        }
        this.qb3x('progress', o7h)
    };
    b7g.It8l = function () {
        if (this.cM8E.retry) {
            clearTimeout(this.cM8E.retry.tid);
            this.cM8E.retry = null
        }
    };
    b7g.eI9z = function () {
        var cb8T = this.dS9J.getError();
        hi0x.ch8Z('media error code: {0}, netState: {1}', cb8T.code, this.dS9J.getNetworkState());
        if (cb8T.code == MediaError.MEDIA_ERR_NETWORK || cb8T.code == MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
            var Gc7V = l7e.bsa0x();
            if (!this.cM8E.retry) {
                this.cM8E.retry = {
                    level: RetryLevel.NONE
                }
            } else {
                window.clearTimeout(this.cM8E.retry.tid)
            }
            if (this.cM8E.retry.level == RetryLevel.NONE) {
                if (this.bFy3x()) {
                    this.cM8E.retry.level = RetryLevel.GET_URL;
                    this.bFz3x();
                    hi0x.pV2x('Url expired, get url.')
                } else {
                    this.cM8E.retry.level = RetryLevel.RELOAD;
                    this.cM8E.retry.tid = setTimeout(this.Op0x.g7b(this), 3000);
                    hi0x.pV2x('Reload mp3 3s later.')
                }
            } else if (this.cM8E.retry.level == RetryLevel.GET_URL) {
                this.cM8E.retry.level = RetryLevel.RELOAD;
                this.cM8E.retry.tid = setTimeout(this.Op0x.g7b(this), 3000);
                hi0x.pV2x('Reload mp3 3s later.')
            } else if (this.cM8E.retry.level == RetryLevel.RELOAD) {
                this.cM8E.retry.level = RetryLevel.SWITCH_CDN;
                if (this.bGj4n()) {
                    this.cM8E.retry.tid = setTimeout(this.ctz4D.g7b(this), 5000);
                    hi0x.pV2x('Switch CDN 5s later.')
                } else {
                    this.cM8E.retry.tid = setTimeout(this.Op0x.g7b(this), 5000);
                    hi0x.pV2x('Reload mp3 5s later.')
                }
            } else if (!bFk3x && this.dS9J.type == 'audio' && !Gc7V.useFlash && !dv9m.Id8V.mac && l7e.bpm9d().supported) {
                Gc7V.useFlash = true;
                l7e.Gb7U(Gc7V);
                this.ctD4H('flash')
            } else {
                this.It8l();
                this.fG9x();
                this.cM8E.error = ErrorType.NET_ERR;
                this.qb3x('error', {
                    code: this.cM8E.error
                });
                hi0x.ch8Z('error can not retry.')
            }
        } else {
            this.It8l();
            this.fG9x();
            this.cM8E.error = ErrorType.UNKNOWN_ERR;
            this.qb3x('error', {
                code: this.cM8E.error
            });
            hi0x.ch8Z('error can not retry.')
        }
    };
    b7g.btV1x = function () {
        var hV0x = 0,
            bGr4v = 5000;
        return function () {
            this.zA5F();
            clearTimeout(hV0x);
            setTimeout(function () {
                var eV9M = +(new Date);
                if (this.cM8E.waiting && eV9M - this.cM8E.waitTimestamp >= bGr4v && this.cM8E.stalledRetryCount < MAX_STALLED_RETRY) {
                    hi0x.pV2x('stalled too long retry.');
                    this.cM8E.stalledRetryCount++;
                    this.Op0x()
                }
            }.g7b(this), bGr4v);
            hi0x.pV2x('stalled')
        }
    }();
    b7g.bFy3x = function () {
        var eV9M = +(new Date);
        return eV9M > this.cM8E.expireTime
    };
    b7g.ctE4I = function () {
        var bA7t = parseInt(this.cM8E.time) || 0;
        this.dS9J.setSrc(this.cM8E.playUrl + '#t=' + bA7t);
        this.cM8E.loadState = LoadState.IN_RELOAD;
        this.zA5F();
        hi0x.pV2x('recover from: {0}', bA7t)
    };
    b7g.qb3x = function (U7N, j7c) {
        h7a.z7s(w7p.fN9E, 'playaction', {
            action: U7N,
            data: j7c || {}
        })
    };
    I7B.fI9z.A7t({
        element: w7p.fN9E,
        event: [
            'playaction'
        ]
    })
})();
(function () {
    if (!(window == top)) {
        return
    }
    var c7f = NEJ.P,
        h7a = c7f('nej.v'),
        I7B = c7f('nej.ut'),
        w7p = c7f('nm.w'),
        b7g;
    w7p.GW8O = NEJ.C();
    b7g = w7p.GW8O.N7G(w7p.fN9E);
    K7D = w7p.GW8O.ct8l;
    b7g.cx8p = function () {
        this.cF8x()
    };
    b7g.cty4C = function (bN8F) {
        this.bdu4y(bN8F);
        this.ek9b()
    };
    b7g.buV1x = function () {
        this.fG9x()
    };
    b7g.wk4o = function (d7e) {
        if (d7e.action == 'play') {
            this.fG9x()
        }
    };
    b7g.qb3x = function (U7N, j7c) {
        h7a.z7s(w7p.GW8O, 'tmpplayaction', {
            action: U7N,
            data: j7c || {},
                tmp: true
        })
    };
    b7g.sL3x = function () {
        return this.cM8E
    };
    I7B.fI9z.A7t({
        element: w7p.GW8O,
        event: [
            'tmpplayaction'
        ]
    })
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        fL9C = c7f('nej.n'),
        v7o = c7f('nej.j'),
        I7B = c7f('nej.ut'),
        bc7V = c7f('nej.ui'),
        w7p = c7f('nm.w'),
        m7f = c7f('nm.l'),
        la1x = c7f('nm.c'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        b7g,
        K7D,
        bei4m = [{
            item: 'm-publish-search-single',
            type: 1
        }, {
            item: 'm-publish-search-artist',
            type: 100
        }, {
            item: 'm-publish-search-album',
            type: 10
        }, {
            item: 'm-publish-search-mv',
            type: 1004
        }, {
            item: 'm-publish-search-playlist',
            type: 1000
        }, {
            item: 'm-publish-search-djRadio',
            type: 1009
        }];
    var bvw1x = {
        song: 0,
        artist: 1,
        album: 2,
        mv: 3,
        playlist: 4,
        djradio: 5
    };
    w7p.bvy1x = NEJ.C();
    b7g = w7p.bvy1x.N7G(bc7V.eg9X);
    b7g.cx8p = function (e7d) {
        this.cF8x(e7d);
        var i7b = a6g.H7A(this.n7g, 'j-flag');
        this.cFs6m = i7b.shift();
        this.ctv4z = i7b.shift();
        this.Io8g = i7b.shift();
        this.bvH1x = i7b.shift();
        this.bvM1x = [
            i7b.shift(),
            i7b.shift(),
            i7b.shift(),
            i7b.shift(),
            i7b.shift(),
            i7b.shift()
        ];
        this.beo4s = i7b.shift();
        this.bHc4g = i7b.shift();
        this.rt3x = {
            list: this.bvM1x,
            selected: 'z-curr',
            onchange: this.bHg4k.g7b(this)
        };
        h7a.s7l(this.Io8g, 'input', this.bep4t.g7b(this));
        h7a.s7l(this.Io8g, 'propertychange', this.bep4t.g7b(this));
        h7a.s7l(this.Io8g, 'keyup', this.bep4t.g7b(this));
        h7a.s7l(this.ctv4z, 'click', this.bep4t.g7b(this));
        h7a.s7l(this.beo4s, 'click', this.cL8D.g7b(this));
        h7a.s7l(this.bHc4g, 'click', function () {
            this.z7s('oncancel', {})
        }.g7b(this));
        this.S7L = q7j.FT7M.go0x();
        this.PG0x = top.nm.w.GW8O.go0x();
        I7B.fI9z.A7t({
            element: top.nm.w.GW8O,
            event: [
                'tmpplayaction'
            ]
        });
        this.sh3x = {
            limit: 100,
            offset: 0,
            parent: this.beo4s,
            onbeforelistload: this.qU3x.g7b(this)
        };
        q7j.sk = 'fuck' + a6g.t7m(this.bvH1x, 'xname') + '458';
        h7a.s7l(top.nm.w.GW8O, 'tmpplayaction', this.wk4o.g7b(this))
    };
    b7g.cf8X = function () {
        this.ce8W = 'm-xwgt-publish-search'
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        if (!!this.CP6J) {
            this.CP6J.T7M();
            delete this.CP6J
        }
        this.rt3x.index = bvw1x[e7d.type || 'song'];
        this.CP6J = I7B.FS7L.A7t(this.rt3x);
        this.Io8g.value = '';
        this.Io8g.focus();
        this.vS4W = '';
        this.cFt6n = 0;
        if (e7d.showMV == true) {
            this.bvM1x[bvw1x['mv']].parentNode.style.display = '';
            a6g.y7r(this.bvH1x, 'srchtab-1')
        } else {
            this.bvM1x[bvw1x['mv']].parentNode.style.display = 'none';
            a6g.x7q(this.bvH1x, 'srchtab-1')
        }
        if (!!this.dM9D) {
            this.dM9D = this.dM9D.T7M()
        }
        if (e7d.hideBack) {
            a6g.y7r(this.bHc4g.parentNode, 'f-hide')
        }
    };
    b7g.bD8v = function () {
        this.PG0x.buV1x();
        this.bG8y()
    };
    b7g.bep4t = function () {
        var value = this.Io8g.value.trim();
        if (value && value.length) {
            if (value != this.vS4W) {
                this.vS4W = value;
                this.bHg4k({
                    index: this.CP6J.sY3x()
                })
            }
        } else {
            if (this.dM9D) {
                this.dM9D = this.dM9D.T7M()
            }
        }
        this.vS4W = value
    };
    b7g.cL8D = function () {
        var ctt4x = function (F7y) {
                return a6g.bE8w(F7y, 'sitm') || a6g.bE8w(F7y, 'itm') || a6g.bE8w(F7y, 'mv-item')
            },
            cts4w = function (F7y) {
                return a6g.bE8w(F7y, 'ply')
            },
            bHG4K = function () {
                m7f.Z7S.L7E({
                    type: 2,
                    tip: '因合作方要求，该资源需付费使用'
                })
            },
            ctr4v = function () {
                m7f.Z7S.L7E({
                    type: 2,
                    tip: '因合作方要求，该资源需下载后播放'
                })
            },
            bwl1x = function (bj7c) {
                if (bj7c && bj7c.privilege && bj7c.privilege.toast) {
                    v7o.bn7g('/api/song/toast', {
                        query: {
                            id: bj7c.id
                        },
                        type: 'json',
                        onload: SA1x.g7b(this),
                        onerror: SA1x.g7b(this)
                    })
                } else {
                    Sz1x()
                }
            },
            SA1x = function (Q7J) {
                Sz1x((Q7J || bb7U).toast)
            },
            Sz1x = function (bH8z) {
                m7f.Z7S.L7E({
                    type: 2,
                    tip: bH8z || '因合作方要求，该资源暂时下架>_<'
                })
            };
        return function (d7e) {
            var Hs8k = h7a.W7P(d7e, cts4w),
                i7b = h7a.W7P(d7e, ctt4x),
                et9k = this.PG0x.sL3x();
            if (!!i7b) {
                h7a.bh7a(d7e);
                this.OM0x = a6g.t7m(i7b, 'id');
                this.OG0x = a6g.t7m(i7b, 'type');
                if (this.OG0x == 18) {
                    var bN8F = this.S7L.eH9y(this.OM0x),
                        qF3x = l7e.qk3x(bN8F);
                    if (!Hs8k) {
                        if (qF3x == 10) {
                            bHG4K();
                            return
                        } else if (qF3x == 100) {
                            bwl1x(bN8F);
                            return
                        }
                    } else {
                        if (qF3x == 10) {
                            bHG4K();
                            return
                        } else if (qF3x == 100) {
                            bwl1x(bN8F);
                            return
                        } else if (qF3x == 11) {
                            ctr4v();
                            return
                        } else {
                            a6g.x7q(this.CV6P, 'z-pause z-loading');
                            if (Hs8k == this.CV6P && et9k.play && !et9k.ended) {
                                this.PG0x.buV1x()
                            } else {
                                this.CV6P = Hs8k;
                                this.PG0x.cty4C(bN8F)
                            }
                            return
                        }
                    }
                } else if (this.OG0x == 70) {
                    if (a6g.bE8w(i7b, 'z-noprogram')) {
                        m7f.Z7S.L7E({
                            type: 2,
                            tip: '不能分享没有节目的电台'
                        });
                        return
                    }
                }
                this.ctq4u()
            }
        }
    }();
    b7g.ctq4u = function () {
        var hX0x = this.S7L.eH9y(this.OM0x),
            to3x = l7e.bNo5t(this.OG0x, hX0x);
        to3x.title = to3x.title || '';
        to3x.author = to3x.author || '';
        to3x.picUrl = to3x.picUrl || '';
        to3x.authors = to3x.authors || '';
        if (this.OG0x == 70) {
            this.OM0x = this.OM0x.slice(0, -4)
        }
        this.z7s('onfinish', {
            id: this.OM0x,
            type: this.OG0x,
            data: to3x
        })
    };
    b7g.wk4o = function (d7e) {
        var j7c = d7e.data;
        if (!this.CV6P) {
            return
        }
        switch (d7e.action) {
        case 'play':
            a6g.fk9b(this.CV6P, 'z-pause z-play', 'z-loading');
            break;
        case 'pause':
        case 'ended':
            a6g.x7q(this.CV6P, 'z-pause z-loading');
            break;
        case 'error':
            m7f.Z7S.L7E({
                type: 2,
                tip: '试听遇到问题，播放失败'
            });
            a6g.x7q(this.CV6P, 'z-pause z-loading');
            break;
        case 'playing':
            a6g.fk9b(this.CV6P, 'z-loading', 'z-pause');
            break;
        case 'waiting':
            a6g.fk9b(this.CV6P, 'z-pause', 'z-loading');
            break
        }
    };
    b7g.ctn4r = function (d7e) {
        if (d7e.result.code == 407) {
            this.beo4s.innerHTML = '<div class="n-norlt s-fc1">根据相关法律法规和政策，搜索结果未予显示</div>';
            return
        }
        this.beo4s.innerHTML = '<div class="n-norlt s-fc1">页面出错，请稍后再试！</div>'
    };
    b7g.bHg4k = function (d7e) {
        if (!this.vS4W || d7e.index < 0 || d7e.index > 5) {
            return
        }
        this.PG0x.buV1x();
        var bg7Z = bei4m[d7e.index],
            e7d = NEJ.X({}, this.sh3x);
        e7d.cache = {
            klass: q7j.FT7M,
            clear: true,
            onerror: this.ctn4r.g7b(this)
        };
        e7d.cache.lkey = 'search-publish-' + bg7Z.type + '-' + this.vS4W;
        e7d.item = {
            klass: bg7Z.item,
            getRestrictLevel: l7e.qk3x,
            dur2time: l7e.le1x
        };
        if (!e7d.cache.data) {
            e7d.cache.data = {}
        }
        e7d.cache.data.s = this.vS4W;
        e7d.cache.data.type = bg7Z.type;
        e7d.cache.data.isPub = true;
        if (bg7Z.type == 1) {
            e7d.cache.data.hlpretag = '<span class="s-fc7">';
            e7d.cache.data.hlposttag = '</span>'
        }
        e7d.onemptylist = this.ctl4p.g7b(this, this.vS4W);
        if (!!this.Hz8r) this.S7L.uZ4d(this.Hz8r);
        if (!!this.dM9D) {
            this.dM9D = this.dM9D.T7M()
        }
        this.dM9D = I7B.nd2x.A7t(e7d);
        this.Hz8r = e7d.cache.lkey
    };
    b7g.qU3x = function (d7e) {
        d7e.value = a6g.iL0x('m-publish-search-loading')
    };
    b7g.ctl4p = function (J7C, d7e) {
        a6g.dA9r(d7e.parent, 'm-publish-emtpy-message', {
            key: J7C
        });
        d7e.stopped = true
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        dv9m = c7f('nej.p'),
        v7o = c7f('nej.j'),
        ca8S = c7f('nej.ut'),
        bC8u = c7f('nej.ui'),
        w7p = c7f('nm.w'),
        b7g,
        K7D;
    var ctk4o = '.j-item.j-selected a{background:#eee;text-decoration:none;color:#333;}';
    w7p.HA8s = NEJ.C();
    b7g = w7p.HA8s.N7G(bC8u.eg9X);
    var gi0x = a6g.ex9o('m-wgt-receiverInput');
    var cti4m = a6g.ex9o('m-wgt-receiverList');
    var iR0x = a6g.sW3x(ctk4o);
    var csW4a = a6g.ex9o('<div data-id=${userId} class="blk s-fc3 j-receiver">${username}<a href="#" class="cls" title="删除">&times;</a></div>');
    b7g.cx8p = function (e7d) {
        this.bl7e = [];
        this.xw5B = e7d.receiver || null;
        this.csT4X = e7d.unique || false;
        this.ng2x = e7d.err;
        this.bIY4c(this.bIZ4d, e7d.uid);
        this.cF8x(e7d)
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.Vm2x();
        this.Ui2x();
        this.beF5K();
        if (e7d.receiver) this.bwT1x(e7d.receiver.nickname, e7d.receiver.userId);
        a6g.ba7T(this.CJ6D, 'display', 'block');
        a6g.ba7T(this.bwX1x, 'cursor', 'text');
        a6g.ba7T(this.CJ6D, 'cursor', 'text')
    };
    b7g.cf8X = function () {
        var j7c = this.bJx4B();
        this.ce8W = a6g.ir0x(a6g.bZ8R(gi0x, {
            receiver: this.xw5B,
            users: j7c
        }));
        this.me1x = iR0x
    };
    b7g.bW8O = function () {
        this.cg8Y();
        var bQ8I = a6g.H7A(this.n7g, 'j-flag');
        var hp0x = a6g.H7A(this.n7g, 'j-item');
        this.bwX1x = bQ8I[0];
        this.bJD4H = bQ8I[1];
        this.ef9W = bQ8I[2];
        this.CJ6D = bQ8I[3];
        this.beI5N = bQ8I[4];
        this.bwZ1x = bQ8I[5];
        this.fK9B = hp0x;
        a6g.y7r(this.fK9B[0], 'j-selected');
        h7a.s7l(this.ef9W, 'keyup', this.bxb1x.g7b(this));
        h7a.s7l(this.ef9W, 'keydown', this.PA0x.g7b(this));
        h7a.s7l(this.ef9W, 'focus', this.lp1x.g7b(this));
        h7a.s7l(this.beI5N, 'click', this.csR4V.g7b(this));
        h7a.s7l(this.bwX1x, 'click', this.csQ4U.g7b(this));
        h7a.s7l(document.body, 'click', this.pq2x.g7b(this));
        h7a.s7l(this.ef9W, 'input', this.fO9F.g7b(this));
        h7a.s7l(this.ef9W, 'blur', this.nZ2x.g7b(this))
    };
    b7g.bD8v = function (e7d) {
        h7a.mw1x(document.body, 'click', this.pq2x.g7b(this));
        this.bG8y();
        this.beF5K();
        this.csP4T();
        this.pq2x()
    };
    b7g.bxb1x = function (d7e) {
        h7a.bh7a(d7e);
        var jX1x = d7e.keyCode || d7e.which;
        var bo7h = this.ef9W.value;
        var bq7j = this.fK9B.length;
        var rX3x = a6g.H7A(this.n7g, 'j-selected')[0];
        switch (jX1x) {
        case 13:
            var lo1x = a6g.gw0x(rX3x, 'data-username');
            var ip0x = a6g.gw0x(rX3x, 'data-userId');
            this.bwT1x(lo1x, ip0x);
            this.pq2x();
            this.ef9W.value = '';
            break;
        case 38:
            var r7k = a6g.gw0x(rX3x, 'data-index') - 1 < 0 ? bq7j - 1 : a6g.gw0x(rX3x, 'data-index') - 1;
            a6g.x7q(rX3x, 'j-selected');
            a6g.y7r(this.fK9B[r7k], 'j-selected');
            break;
        case 40:
            var r7k = parseInt(a6g.gw0x(rX3x, 'data-index')) + 1 >= bq7j ? 0 : parseInt(a6g.gw0x(rX3x, 'data-index')) + 1;
            a6g.x7q(rX3x, 'j-selected');
            a6g.y7r(this.fK9B[r7k], 'j-selected');
            break;
        default:
            this.xb5g()
        }
    };
    b7g.PA0x = function (d7e) {
        var jX1x = d7e.keyCode || d7e.which;
        var bo7h = this.ef9W.value;
        var r7k = a6g.H7A(this.n7g, 'j-receiver').length - 1;
        if (jX1x === 8 && bo7h === '') this.csM4Q(r7k)
    };
    b7g.fO9F = function (d7e) {
        var bo7h = this.ef9W.value;
        if (bo7h.length > 10) {
            this.ef9W.value = bo7h.substring(0, 10);
            return
        }
        dv9m.dr9i.browser == 'ie' && dv9m.dr9i.version < '7.0' ? setTimeout(this.bxi1x.g7b(this), 0) : this.bxi1x();
        this.Ui2x()
    };
    b7g.lp1x = function () {
        if (this.bl7e[0]) this.xb5g();
        else this.bIY4c(this.csL4P);
        a6g.ba7T(this.CJ6D, 'display', 'none')
    };
    b7g.nZ2x = function () {
        var bq7j = a6g.H7A(this.n7g, 'j-receiver').length;
        if (this.ef9W.value.trim() == '' && bq7j <= 0) a6g.ba7T(this.CJ6D, 'display', 'block')
    };
    b7g.bwT1x = function (lo1x, ip0x) {
        var Ku9l = this.QQ1x();
        if (Ku9l.length >= 10) {
            this.dV9M();
            return
        }
        var bc7V;
        for (bc7V = 0; bc7V < Ku9l.length; bc7V++) {
            if (Ku9l[bc7V] == ip0x) {
                this.pq2x();
                return
            }
        }
        if (!lo1x || !ip0x) return;
        var f7c = a6g.dy9p(a6g.ir0x(a6g.bZ8R(csW4a, {
            username: lo1x,
            userId: ip0x
        })));
        var bI8A = this.bJD4H.parentNode;
        if (this.csT4X) {
            this.beF5K()
        }
        bI8A.insertBefore(f7c, this.bJD4H);
        this.ef9W.value = '';
        var bq7j = a6g.H7A(this.n7g, 'j-receiver').length;
        if (bq7j > 1) a6g.ba7T(this.CJ6D, 'display', 'none');
        this.bxi1x();
        this.Ui2x()
    };
    b7g.beF5K = function () {
        var UB2x = a6g.H7A(this.n7g, 'j-receiver');
        var bc7V;
        if (UB2x.length > 0) {
            for (bc7V = 0; bc7V < UB2x.length; bc7V++) {
                a6g.cJ8B(UB2x[bc7V], false)
            }
        }
    };
    b7g.csP4T = function () {
        this.ef9W.value = ''
    };
    b7g.csM4Q = function (r7k) {
        this.dV9M(!0);
        var UB2x = a6g.H7A(this.n7g, 'j-receiver');
        a6g.cJ8B(UB2x[r7k], false);
        this.Ui2x()
    };
    b7g.xb5g = function () {
        var bo7h = this.ef9W.value;
        var bv7o = bo7h.trim().toLowerCase();
        var j7c;
        bv7o = bv7o.replace(/\[/g, '\\[');
        bv7o = bv7o.replace(/\]/g, '\\]');
        j7c = this.bJx4B(bv7o);
        this.csI4M(j7c)
    };
    b7g.pq2x = function (d7e) {
        a6g.ba7T(this.beI5N, 'display', 'none')
    };
    b7g.dV9M = function (dK9B) {
        if (dK9B && this.ng2x) {
            a6g.ba7T(this.ng2x, 'display', 'none');
            return
        }
        if (this.ng2x) a6g.ba7T(this.ng2x, 'display', 'block')
    };
    b7g.csR4V = function (d7e) {
        h7a.cr8j(d7e);
        var bO8G = d7e.target || d7e.srcElement;
        if (a6g.bE8w(bO8G, 'j-flag')) return;
        var bI8A = bO8G.nodeName.toLowerCase() == 'a' ? bO8G.parentNode : bO8G.parentNode.parentNode;
        var lo1x = a6g.gw0x(bI8A, 'data-username');
        var ip0x = a6g.gw0x(bI8A, 'data-userId');
        this.bwT1x(lo1x, ip0x);
        this.pq2x();
        a6g.ba7T(this.CJ6D, 'display', 'none')
    };
    b7g.csQ4U = function (d7e) {
        h7a.bh7a(d7e);
        var bO8G = d7e.target || d7e.srcElement;
        if (a6g.bE8w(bO8G.parentNode, 'j-receiver')) {
            a6g.cJ8B(bO8G.parentNode, false);
            this.dV9M(!0);
            this.Ui2x()
        } else this.ef9W.focus()
    };
    b7g.bxi1x = function () {
        this.bwZ1x.innerHTML = this.ef9W.value;
        var cA8s = this.bwZ1x.offsetWidth + 2;
        a6g.ba7T(this.ef9W, 'width', cA8s + 'px')
    };
    b7g.Ui2x = function () {
        var beM5R = a6g.hR0x(this.ef9W, this.n7g).y;
        var bLf5k = Math.floor((beM5R - 8) / 27);
        if (bLf5k < 0) return;
        a6g.ba7T(this.bwX1x, 'height', 19 + bLf5k * 29 + 'px')
    };
    b7g.Vm2x = function () {
        var qp3x = [
            'height',
            'paddingLeft',
            'paddingTop',
            'paddingRight',
            'paddingBottom',
            'fontSize',
            'fontFamily',
            'lineHeight'
        ];
        for (var i = 0; i < qp3x.length; i++) {
            a6g.ba7T(this.bwZ1x, qp3x[i], a6g.de9V(this.ef9W, qp3x[i]))
        }
    };
    b7g.bIY4c = function (cN8F, C7v) {
        var dn9e = C7v ? C7v : window.GUser.userId;
        var Y7R = '/api/user/getfollows/' + dn9e;
        var gf0x = v7o.bn7g(Y7R, {
            sync: false,
            method: 'get',
            query: 'offset = 0&limit=1000&order=true',
            onload: cN8F.g7b(this),
            onerror: function (j7c) {
                    this.bl7e = []
                },
                onbeforerequest: function (j7c) {}
        })
    };
    b7g.bIZ4d = function (j7c) {
        this.bl7e = JSON.parse(j7c).follow || [];
        var C7v = GUser.userId;
        for (var i = 0; i < this.bl7e.length; i++) {
            if (this.bl7e[i].userId == C7v) {
                this.bl7e.splice(i, 1);
                continue
            }
            this.bl7e[i].avatarUrl = this.bl7e[i].avatarUrl + '?param=30y30'
        }
    };
    b7g.csL4P = function (j7c) {
        if (this.bl7e[0]) return;
        this.bIZ4d(j7c);
        this.xb5g()
    };
    b7g.bJx4B = function (bv7o) {
        var bv7o = bv7o ? bv7o : '';
        this.bl7e = this.bl7e[0] ? this.bl7e : [];
        var bq7j = this.bl7e.length;
        var QZ1x = this.QQ1x();
        var tP4T = [];
        var Ts1x,
            OR0x,
            bxf1x;
        if (!this.bl7e[0]) return tP4T;
        for (var bc7V = 0; bc7V < bq7j; bc7V++) {
            bxf1x = false;
            for (var v7o = 0; v7o < QZ1x.length; v7o++) {
                if (this.bl7e[bc7V].userId == QZ1x[v7o]) {
                    bxf1x = true;
                    break
                }
            }
            if (bxf1x) continue;
            Ts1x = this.bl7e[bc7V].nickname.toLowerCase().search(bv7o);
            OR0x = this.bl7e[bc7V].py ? this.bl7e[bc7V].py.toLowerCase().search(bv7o) : -1;
            if (Ts1x !== -1 || OR0x != -1) tP4T.push(this.bl7e[bc7V])
        }
        return tP4T
    };
    b7g.csI4M = function (j7c) {
        a6g.dA9r(this.beI5N, cti4m, {
            users: j7c
        });
        a6g.y7r(a6g.H7A(this.n7g, 'j-item')[0], 'j-selected');
        this.fK9B = a6g.H7A(this.n7g, 'j-item');
        a6g.ba7T(this.beI5N, 'display', 'block')
    };
    b7g.QQ1x = function () {
        var tP4T = a6g.H7A(this.n7g, 'j-receiver') || [];
        var ip0x = [];
        for (var i = 0; i < tP4T.length; i++) {
            ip0x.push(a6g.gw0x(tP4T[i], 'data-id'))
        }
        return ip0x
    };
    b7g.cFw6q = function () {
        var ip0x = this.QQ1x();
        var tP4T = [];
        for (var i = 0; i < ip0x.length; i++) {
            for (var j = 0; j < this.bl7e.length; j++) {
                if (ip0x[i] == this.bl7e[j].userId) tP4T.push(this.bl7e[j])
            }
        }
        return tP4T
    };
    b7g.csG4K = function () {
        this.beF5K()
    };
    w7p.HA8s.L7E = function (e7d) {
        if (!GUser || !GUser.userId || GUser.userId <= 0) {
            m7f.po2x.L7E({
                title: '登录'
            });
            return
        }
        e7d = e7d || {};
        if (e7d.parent === undefined) e7d.parent = document.body;
        !!this.fi9Z && this.fi9Z.T7M();
        this.fi9Z = this.A7t(e7d)
    };
    w7p.HA8s.bt7m = function () {
        !!this.fi9Z && this.fi9Z.T7M()
    };
    w7p.HA8s.HK8C = function () {
        return this.pq2x()
    };
    w7p.HA8s.cFx6r = function () {
        return this.xb5g()
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        k7d = c7f('nej.u'),
        h7a = c7f('nej.v'),
        l7e = c7f('nm.x'),
        m7f = c7f('nm.l'),
        b7g,
        K7D;
    m7f.Ie8W = NEJ.C();
    b7g = m7f.Ie8W.N7G(m7f.bhC6w);
    K7D = m7f.Ie8W.ct8l;
    b7g.bk7d = function () {
        var HH8z;
        var csE4I = function (D7w, J7C) {
            HH8z = HH8z || [];
            if (J7C != '18') HH8z.push({
                key: J7C,
                value: D7w
            })
        };
        return function (e7d) {
            this.bm7f(e7d);
            if (e7d.upwards) {
                a6g.y7r(this.n7g, 'm-emts-up')
            } else {
                a6g.x7q(this.n7g, 'm-emts-up')
            }
            if (e7d.rightwards) {
                a6g.y7r(this.n7g, 'm-emts-right')
            } else {
                a6g.x7q(this.n7g, 'm-emts-right')
            }
            if (!HH8z) {
                var by7r = l7e.czG5L();
                k7d.eC9t(by7r, csE4I)
            }
            var bq7j = HH8z.length;
            HH8z.splice(bq7j - 2, 0, {
                key: '18',
                value: '186'
            });
            this.beH5M = HH8z;
            this.csB4F = !!e7d.autoHide
        }
    }();
    b7g.cf8X = function () {
        this.ce8W = 'ntp-portrait'
    };
    b7g.bW8O = function () {
        this.cg8Y();
        var i7b = a6g.H7A(this.n7g, 'j-flag');
        this.bK8C = i7b[0];
        this.csy4C = i7b[1];
        this.csw4A = i7b[2];
        this.csv4z = i7b[3];
        h7a.s7l(this.bK8C, 'click', this.Ab6V.g7b(this));
        h7a.s7l(this.csy4C, 'click', this.HE8w.g7b(this, 1));
        h7a.s7l(this.csv4z, 'click', this.HE8w.g7b(this, 2))
    };
    b7g.bwR1x = function (r7k) {
        this.beD5I = r7k;
        var bi7b = (r7k - 1) * 50;
        var i7b = this.beH5M.slice(bi7b, Math.min(bi7b + 50, this.beH5M.length));
        this.bK8C.innerHTML = a6g.bZ8R('jst-portrait', {
            plist: i7b
        }, {
            purl: l7e.bDz3x
        });
        this.csw4A.innerText = r7k + '/' + Math.ceil(this.beH5M.length / 50)
    };
    b7g.HE8w = function (r7k) {
        var css4w = Math.ceil(this.beH5M.length / 50);
        if (r7k == 1 && this.beD5I == 1 || r7k == 2 && this.beD5I == css4w) return;
        r7k == 1 ? this.bwR1x(this.beD5I - 1) : this.bwR1x(this.beD5I + 1)
    };
    b7g.Ab6V = function (d7e) {
        var F7y = h7a.W7P(d7e, 'd:text');
        if (!F7y) return;
        var d7e = {
            url: a6g.t7m(F7y, 'url'),
            text: a6g.t7m(F7y, 'text')
        };
        this.z7s('onselect', d7e);
        if (this.csB4F && !d7e.stopped) {
            this.bt7m()
        }
    };
    b7g.L7E = function () {
        K7D.L7E.call(this);
        this.bwR1x(1)
    }
})();
(function () {
    var c7f = NEJ.P,
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        dv9m = c7f('nej.p'),
        be7X = c7f('nej.h'),
        I7B = c7f('nej.ut'),
        km1x = /^[#?]+/,
        Es7l = /#(.*?)$/,
        zY6S = window,
        bwK1x = !history.pushState || dv9m.Id8V.android || !history.auto;
    var beC5H = function (Y7R, bwH1x) {
        zY6S.history[!bwH1x ? 'pushState' : 'replaceState'](null, document.title, Y7R)
    };
    var beA5F = function () {
        return location.parse(zY6S.location.href)
    };
    beC5H = beC5H.eG9x(function (d7e) {
        if (!bwK1x) return;
        var bf7Y = d7e.args;
        d7e.stopped = !0;
        Y7R = bf7Y[0].replace(km1x, '');
        !bf7Y[1] ? zY6S.location.hash = Y7R : zY6S.location.replace('#' + Y7R)
    });
    beA5F = beA5F.eG9x(function (d7e) {
        if (!bwK1x) return;
        d7e.stopped = !0;
        var dO9F = Es7l.test(zY6S.location.href) ? RegExp.$1 : '';
        d7e.value = location.parse(dO9F.replace(km1x, ''))
    });
    location.redirect = function (Y7R, bwH1x) {
        beC5H(Y7R, bwH1x);
        return this
    };
    location.active = function () {
        var ej9a,
            Y7R,
            jG1x,
            cZ8R,
            UR2x;
        var bwD1x = function (ht0x) {
            if (!!cZ8R) {
                cZ8R = !1;
                return
            }
            var d7e = {
                oldValue: jG1x,
                newValue: beA5F()
            };
            if (!!location.ignored) {
                location.ignored = !1
            } else {
                h7a.z7s(location, 'beforeurlchange', d7e);
                if (d7e.stopped) {
                    if (!!jG1x) {
                        cZ8R = !0;
                        beC5H(jG1x.href, !0)
                    }
                    return
                }
            }
            Y7R = zY6S.location.href;
            jG1x = d7e.newValue;
            h7a.z7s(location, 'urlchange', jG1x);
            be7X.buQ1x(jG1x.href)
        };
        var bNG5L = function () {
            if (Y7R != zY6S.location.href) bwD1x();
            ej9a = requestAnimationFrame(bNG5L)
        };
        return function (bJ8B) {
            if (!!UR2x) return this;
            UR2x = !0;
            zY6S = bJ8B || window;
            if (bwK1x && 'onhashchange' in window && dv9m.nu2x.trident2) {
                h7a.s7l(zY6S, 'hashchange', bwD1x);
                bwD1x()
            } else if (!ej9a) {
                ej9a = requestAnimationFrame(bNG5L)
            }
            return this
        }
    }();
    location.parse = function () {
        var gK0x = /^https?:\/\/.*?\//i,
            km1x = /[?#]/;
        return function (Y7R) {
            var o7h = {
                href: Y7R
            };
            Y7R = (Y7R || '').replace(gK0x, '/').split(km1x);
            var cH8z = 1;
            if (Y7R[0] == '/' && (Y7R[1] || '').indexOf('/') == 0) cH8z = 2;
            o7h.path = Y7R.splice(0, cH8z).join('?');
            o7h.query = k7d.hu0x(Y7R.join('&'));
            return o7h
        }
    }();
    location.same = function (Y7R) {
        return beA5F().href == Y7R
    };
    I7B.fI9z.A7t({
        element: location,
        event: [
            'beforeurlchange',
            'urlchange'
        ]
    })
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        gq0x = c7f('nm.ut');
    gq0x.vT4X = function (ep9g) {
        var hf0x = {
            text: '',
            start: 0,
            end: 0
        };
        if (ep9g.setSelectionRange) {
            hf0x.start = ep9g.selectionStart;
            hf0x.end = ep9g.selectionEnd;
            hf0x.text = hf0x.start != hf0x.end ? ep9g.value.substring(hf0x.start, hf0x.end) : ''
        } else if (document.selection) {
            var i,
                beu5z = document.selection.createRange(),
                zT6N = document.body.createTextRange();
            zT6N.moveToElementText(ep9g);
            hf0x.text = beu5z.text;
            hf0x.bookmark = beu5z.getBookmark();
            for (i = 0; zT6N.compareEndPoints('StartToStart', beu5z) < 0 && beu5z.moveStart('character', -1) !== 0; i++) {
                if (ep9g.value.charAt(i) == '\n') {
                    i++
                }
            }
            hf0x.start = i;
            hf0x.end = hf0x.text.length + hf0x.start
        }
        return hf0x
    };
    gq0x.bes5x = function (ep9g, hf0x) {
        var zT6N;
        if (!hf0x) {
            hf0x = {
                text: '',
                start: 0,
                end: 0
            }
        }
        ep9g.focus();
        if (ep9g.setSelectionRange) {
            ep9g.setSelectionRange(hf0x.start, hf0x.end)
        } else if (ep9g.createTextRange) {
            zT6N = ep9g.createTextRange();
            if (ep9g.value.length === hf0x.start) {
                zT6N.collapse(false);
                zT6N.select()
            } else {
                zT6N.moveToBookmark(hf0x.bookmark);
                zT6N.select()
            }
        }
    };
    gq0x.Ij8b = function (ep9g, hf0x, cG8y) {
        var hf0x = hf0x || {
            text: '',
            start: 0,
            end: 0
        };
        var bvW1x,
            bOe5j,
            zT6N,
            Px0x,
            bOj5o,
            bOk5p,
            Hq8i;
        this.bes5x(ep9g, hf0x);
        if (ep9g.setSelectionRange) {
            bvW1x = ep9g.value;
            bOe5j = bvW1x.substring(0, hf0x.start) + cG8y + bvW1x.substring(hf0x.end);
            bOj5o = bOk5p = hf0x.start + cG8y.length;
            Hq8i = ep9g.scrollTop;
            ep9g.value = bOe5j;
            if (ep9g.scrollTop != Hq8i) {
                ep9g.scrollTop = Hq8i
            }
            ep9g.setSelectionRange(bOj5o, bOk5p)
        } else if (ep9g.createTextRange) {
            Px0x = document.selection.createRange();
            Px0x.text = cG8y;
            Px0x.setEndPoint('StartToEnd', Px0x);
            Px0x.select()
        }
        h7a.z7s(ep9g, 'keyup')
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        dv9m = c7f('nej.p'),
        k7d = c7f('nej.u'),
        ca8S = c7f('nej.ut'),
        w7p = c7f('nm.w'),
        gq0x = c7f('nm.ut'),
        b7g;
    w7p.bOp6j = NEJ.C();
    b7g = w7p.bOp6j.N7G(ca8S.cI8A);
    b7g.cx8p = function (e7d) {
        this.cF8x(e7d)
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.gs0x = e7d.txt;
        this.Hl8d = e7d.sgtsContainer;
        this.bOE6y = e7d.sgtsList[0];
        this.beq4u = e7d.sgtsItem;
        this.pn2x = e7d.rangeData;
        this.Il8d = e7d.atIndex;
        a6g.y7r(this.beq4u[0], 'selected-item');
        this.PO0x()
    };
    b7g.bD8v = function () {
        this.bG8y();
        h7a.mw1x(document.body, 'keyup', this.bPg6a.g7b(this));
        h7a.mw1x(document.body, 'click', this.bPi6c.g7b(this))
    };
    b7g.PO0x = function () {
        this.bX8P([
            [document.body,
                'keyup',
                this.bPg6a.g7b(this)
            ],
            [
                document.body,
                'click',
                this.bPi6c.g7b(this)
            ],
            [
                this.gs0x,
                'keydown',
                this.bPl6f.g7b(this)
            ],
            [
                this.gs0x,
                'keypress',
                this.bPl6f.g7b(this)
            ],
            [
                this.bOE6y,
                'click',
                this.bPn6h.g7b(this)
            ],
            [
                this.bOE6y,
                'mouseover',
                this.Hi8a.g7b(this)
            ]
        ])
    };
    b7g.Hi8a = function (d7e) {
        var bO8G = h7a.W7P(d7e);
        var p7i = a6g.H7A(this.Hl8d, 'selected-item');
        if (a6g.bE8w(bO8G, 'j-sgt')) {
            a6g.x7q(p7i[0], 'selected-item');
            a6g.y7r(bO8G, 'selected-item')
        }
    };
    b7g.bPg6a = function (d7e) {
        var p7i = a6g.H7A(this.Hl8d, 'selected-item');
        var bq7j = this.beq4u.length;
        var jX1x = d7e.keyCode || d7e.which;
        var r7k,
            j7c;
        switch (jX1x) {
        case 38:
            r7k = a6g.gw0x(p7i[0], 'data-index') - 1 < 0 ? bq7j - 1 : a6g.gw0x(p7i[0], 'data-index') - 1;
            a6g.x7q(p7i[0], 'selected-item');
            a6g.y7r(this.beq4u[r7k], 'selected-item');
            break;
        case 40:
            r7k = parseInt(a6g.gw0x(p7i[0], 'data-index')) + 1 >= bq7j ? 0 : parseInt(a6g.gw0x(p7i[0], 'data-index')) + 1;
            a6g.x7q(p7i[0], 'selected-item');
            a6g.y7r(this.beq4u[r7k], 'selected-item');
            break;
        case 13:
            this.bPn6h(d7e);
            break;
        case 27:
            this.pq2x();
            break;
        case 32:
            var bo7h = this.gs0x.value;
            var r7k = gq0x.vT4X(this.gs0x);
            if (bo7h.charAt(r7k.start - 1) !== ' ') return;
            this.pq2x();
            break
        }
    };
    b7g.bPl6f = function (d7e) {
        var jX1x = d7e.keyCode || d7e.which;
        if (jX1x === 13 || jX1x === 38 || jX1x === 40) {
            h7a.cr8j(d7e);
            d7e.keyCode = 0;
            d7e.which = 0;
            d7e.returnvalue = false
        }
    };
    b7g.bPi6c = function (d7e) {
        var bO8G = d7e.target || d7e.srcElement;
        if (bO8G === this.gs0x) return;
        this.pq2x()
    };
    b7g.bPn6h = function (d7e) {
        h7a.bh7a(d7e);
        var p7i = a6g.H7A(this.Hl8d, 'selected-item')[0];
        var rX3x = d7e.target || d7e.srcElement;
        var u7n = d7e.type;
        if (a6g.bE8w(rX3x, 'lst')) return;
        if (u7n == 'click') {
            a6g.x7q(p7i, 'selected-item');
            a6g.y7r(rX3x, 'selected-item')
        } else rX3x = p7i;
        var j7c = rX3x.innerHTML + ' ';
        this.pq2x();
        var hf0x = this.pn2x;
        hf0x.start = this.Il8d + 1;
        if (dv9m.dr9i.browser == 'ie' && dv9m.dr9i.version < '9.0') {
            this.gs0x.value = this.gs0x.value.substring(0, hf0x.start) + this.gs0x.value.substring(hf0x.end, this.gs0x.value.length);
            hf0x.end = hf0x.start
        }
        gq0x.Ij8b(this.gs0x, hf0x, j7c);
        h7a.z7s(this.gs0x, 'keyup')
    };
    b7g.pq2x = function (d7e) {
        if (!!this.Hl8d) a6g.ba7T(this.Hl8d, 'display', 'none');
        this.T7M()
    };
    b7g.xb5g = function (d7e) {
        if (!!this.Hl8d) a6g.ba7T(this.Hl8d, 'display', 'block')
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        w7p = c7f('nm.w'),
        ca8S = c7f('nej.ut'),
        bC8u = c7f('nej.ui'),
        b7g;
    var csr4v = '.u-atlist{position: absolute;z-index: 10000;}.f-thide.selected-item{background-color: #eee;}';
    var csq4u = a6g.ex9o('m-wgt-atlist');
    var iR0x = a6g.sW3x(csr4v);
    w7p.bPv6p = NEJ.C();
    b7g = w7p.bPv6p.N7G(bC8u.eg9X);
    b7g.cx8p = function (e7d) {
        this.fP9G = {};
        this.cF8x()
    };
    b7g.bk7d = function (e7d) {
        this.fP9G.txt = a6g.B7u(e7d.target);
        this.fP9G.data = e7d.data;
        this.fP9G.offset = e7d.offset;
        this.fP9G.rangeData = e7d.rangeData;
        this.fP9G.atIndex = e7d.atIndex;
        this.csp4t(e7d);
        this.bm7f(e7d);
        this.fP9G.sgtsContainer = this.n7g;
        this.fP9G.sgtsList = a6g.H7A(this.n7g, 'lst');
        this.fP9G.sgtsItem = a6g.H7A(this.n7g, 'f-thide');
        this.QJ1x(e7d);
        this.cso4s = w7p.bOp6j.A7t(this.fP9G)
    };
    b7g.bD8v = function (e7d) {
        this.bG8y();
        this.cso4s.T7M()
    };
    b7g.cf8X = function () {
        this.me1x = iR0x
    };
    b7g.bW8O = function () {
        this.cg8Y()
    };
    b7g.csp4t = function (e7d) {
        this.n7g = a6g.dy9p(a6g.ir0x(a6g.bZ8R(csq4u, e7d.data)))
    };
    b7g.QJ1x = function (e7d) {
        var bPD6x = a6g.H7A(this.n7g, 'selected-item')[0];
        if (bPD6x) a6g.x7q(bPD6x, 'selected-item');
        var cX8P = e7d.offset.x + 'px';
        var hx0x = e7d.offset.y + 'px';
        a6g.ba7T(this.n7g, 'left', cX8P);
        a6g.ba7T(this.n7g, 'top', hx0x)
    }
})();
(function () {
    var c7f = NEJ.P,
        v7o = c7f('nej.j'),
        gq0x = c7f('nm.ut');
    gq0x.bPE6y = function (bo7h) {
        if (!GUser || !GUser.userId || GUser.userId <= 0) return;
        var dg9X = /@([a-zA-Z0-9_\-\u4E00-\u9FA5]+)/g;
        var In8f = bo7h.match(dg9X) || [];
        for (var bc7V = 0; bc7V < In8f.length; bc7V++) {
            In8f[bc7V] = In8f[bc7V].split('@')[1]
        }
        In8f = In8f.reverse();
        var ip0x = GUser.userId;
        var csl3x = v7o.tI4M('mentioners' + ip0x) || [];
        var jR1x = In8f.concat(csl3x);
        if (jR1x.length > 10) jR1x = jR1x.slice(0, 10);
        v7o.uk4o('mentioners' + ip0x, jR1x)
    };
    gq0x.csk3x = function () {
        if (!GUser || !GUser.userId || GUser.userId <= 0) return;
        var ip0x = GUser.userId;
        return v7o.tI4M('mentioners' + ip0x) || []
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        dv9m = c7f('nej.p'),
        v7o = c7f('nej.j'),
        k7d = c7f('nej.u'),
        ca8S = c7f('nej.ut'),
        w7p = c7f('nm.w'),
        gq0x = c7f('nm.ut'),
        l7e = c7f('nm.x'),
        b7g;
    var FullscreenApi = l7e.FX7Q || {};
    w7p.bPL6F = NEJ.C();
    b7g = w7p.bPL6F.N7G(ca8S.cI8A);
    b7g.cx8p = function (e7d) {
        this.cF8x(e7d);
        this.bPM6G()
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.gs0x = e7d.txt;
        this.n7g = e7d.body;
        this.bPO6I = e7d.before;
        this.Rh1x = e7d.flag;
        this.csj3x = e7d.after;
        this.rj3x = [];
        if (dv9m.dr9i.browser != 'ie') {
            setTimeout(function () {
                this.mi1x()
            }.g7b(this), 0)
        }
        this.PO0x()
    };
    b7g.bD8v = function () {
        this.bG8y();
        if (this.vR4V) this.vR4V.T7M();
        delete this.vR4V
    };
    b7g.PO0x = function () {
        this.bX8P([
            [this.gs0x,
                'keyup',
                this.bQc6W.g7b(this, this.gs0x)
            ],
            [
                this.gs0x,
                'click',
                this.bQc6W.g7b(this, this.gs0x)
            ],
            [
                this.gs0x,
                'focus',
                this.mi1x.g7b(this)
            ]
        ])
    };
    b7g.mi1x = function (d7e) {
        this.pn2x = gq0x.vT4X(this.gs0x)
    };
    b7g.bPM6G = function () {
        if (!GUser || !GUser.userId || GUser.userId <= 0) {
            window.GFollowers = [];
            return
        }
        var dn9e = window.GUser.userId;
        var Y7R = '/api/user/getfollows/' + dn9e;
        var gf0x = v7o.bn7g(Y7R, {
            sync: false,
            method: 'get',
            query: 'offset = 0&limit=1000&order=true',
            onload: function (j7c) {
                window.GFollowers = JSON.parse(j7c).follow
            }.g7b(this),
            onerror: function (j7c) {},
                onbeforerequest: function (j7c) {}
        })
    };
    b7g.bQd6X = function (index) {
        var D7w = this.gs0x.value,
            bi7b,
            bvt1x,
            bvs1x,
            Sq1x;
        this.bPO6I.innerHTML = k7d.dH9y(D7w.substr(0, index)).replace(/\n/g, '<br/>').replace(/\s/g, '<span class="j-test" style="display:inline-block;white-space: pre-wrap; font-family:Arial, Helvetica, sans-serif;"></span>');
        var mn1x = a6g.H7A(this.bPO6I, 'j-test');
        for (var bc7V = 0; bc7V < mn1x.length; bc7V++) {
            mn1x[bc7V].innerText = ' '
        }
        this.Rh1x.innerHTML = D7w.charAt(index);
        this.csj3x.innerHTML = k7d.dH9y(D7w.substr(index + 1, D7w.length));
        Sq1x = parseInt(a6g.de9V(this.gs0x, 'lineHeight'));
        a6g.ba7T(this.n7g, 'display', 'block');
        bvt1x = a6g.hR0x(this.Rh1x, this.n7g);
        bvs1x = a6g.hR0x(this.gs0x);
        a6g.ba7T(this.n7g, 'display', 'none');
        var cX8P = bvt1x.x + bvs1x.x;
        var hx0x = bvt1x.y + bvs1x.y + Sq1x;
        bi7b = {
            x: cX8P,
            y: hx0x
        };
        this.csh3x(bi7b)
    };
    b7g.bQc6W = function (ep9g, d7e) {
        h7a.cr8j(d7e);
        var ep9g = ep9g;
        var D7w = ep9g.value;
        var bq7j = D7w.length;
        var r7k = gq0x.vT4X(ep9g).start;
        var bQo6i = 0;
        var jX1x = d7e.keyCode || d7e.which;
        var jR1x;
        this.pn2x = gq0x.vT4X(ep9g);
        var bQq6k = false;
        for (var i = 1; i < 20; i++) {
            jR1x = r7k - i;
            if (D7w.charAt(jR1x) === ' ') break;
            if (D7w.charAt(jR1x) === '@') {
                bQq6k = true;
                this.Il8d = bQo6i = jR1x;
                break
            }
        }
        if (bQq6k && d7e.shiftKey === false && jX1x !== 38 && jX1x !== 40) {
            if (jX1x !== 27 && jX1x !== 13) {
                this.vR4V ? this.vR4V.T7M() : null;
                this.bQd6X(bQo6i)
            }
        } else if (jX1x !== 38 && jX1x !== 40 && d7e.keyCode !== 32) {
            this.vR4V ? this.vR4V.T7M() : null
        }
    };
    b7g.csh3x = function (bi7b) {
        var bi7b = bi7b;
        var j7c = this.vP4T();
        var e7d = {
            parent: document[FullscreenApi.fullscreenElement] || document.body,
            offset: bi7b,
            data: j7c,
            target: this.gs0x,
            rangeData: this.pn2x,
            atIndex: this.Il8d
        };
        this.vR4V ? this.vR4V.T7M() : null;
        this.vR4V = w7p.bPv6p.A7t(e7d)
    };
    b7g.vP4T = function () {
        var csf3x = gq0x.vT4X(this.gs0x).start;
        var cse3x = this.Il8d + 1;
        var bQC6w = gq0x.csk3x() || [];
        var bQF7y = [];
        var bv7o = this.gs0x.value.substring(cse3x, csf3x).toLowerCase();
        bv7o = bv7o.replace(/\[/g, '\\[');
        bv7o = bv7o.replace(/\]/g, '\\]');
        if (window.GFollowers) {
            this.rj3x = window.GFollowers[0] ? window.GFollowers : []
        } else this.rj3x = [];
        if (!this.rj3x[0]) this.bPM6G();
        for (var bc7V = 0; bc7V < bQC6w.length; bc7V++) {
            for (var v7o = 0; v7o < this.rj3x.length; v7o++) {
                if (this.rj3x[v7o].nickname == bQC6w[bc7V]) bQF7y.push(this.rj3x[v7o])
            }
        }
        this.rj3x = k7d.cfh0x(this.rj3x, bQF7y, {
            union: true,
            begin: true
        });
        var csc3x = this.rj3x.length;
        var bec4g = [];
        var Ts1x,
            OR0x;
        if (!this.rj3x[0]) return {
            suggests: bec4g
        };
        for (var i = 0; i < csc3x; i++) {
            Ts1x = this.rj3x[i].nickname.toLowerCase().search(bv7o);
            OR0x = this.rj3x[i].py ? this.rj3x[i].py.toLowerCase().search(bv7o) : -1;
            if (Ts1x !== -1 || OR0x != -1) bec4g.push(this.rj3x[i]);
            if (bec4g.length === 10) break
        }
        return {
            suggests: bec4g
        }
    };
    b7g.SP1x = function () {
        var hf0x = this.pn2x || {
            text: '',
            start: 0,
            end: 0
        };
        h7a.z7s(this.gs0x, 'focus');
        gq0x.Ij8b(this.gs0x, hf0x, '@');
        this.pn2x = gq0x.vT4X(this.gs0x);
        this.Il8d = hf0x.start;
        this.bQd6X(this.Il8d)
    };
    b7g.HK8C = function () {
        if (this.vR4V) this.vR4V.T7M()
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        v7o = c7f('nej.j'),
        w7p = c7f('nm.w'),
        ca8S = c7f('nej.ut'),
        bC8u = c7f('nej.ui'),
        b7g;
    var csb3x = '#shadow-box{position: absolute;display: block;left: 450px;top: 1020px;border: 1px solid black;word-wrap: break-word;display:none;opacity: 0;filter: Alpha(opacity=0);z-index: -1000;}';
    var crZ3x = '<div id="shadow-box" style="word-wrap:break-word"><span  class="node-before"></span><span>@</span><span  class="node-after"></span></div>';
    var gi0x = a6g.ir0x(crZ3x);
    var iR0x = a6g.sW3x(csb3x);
    w7p.SS1x = NEJ.C();
    b7g = w7p.SS1x.N7G(bC8u.eg9X);
    b7g.cx8p = function (e7d) {
        this.fP9G = {};
        this.cF8x()
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d);
        this.fP9G.txt = a6g.B7u(e7d.target);
        this.Vm2x();
        this.Td1x = w7p.bPL6F.A7t(this.fP9G)
    };
    b7g.bD8v = function (e7d) {
        this.bG8y();
        this.Td1x.T7M()
    };
    b7g.cf8X = function () {
        this.ce8W = gi0x;
        this.me1x = iR0x
    };
    b7g.bW8O = function () {
        this.cg8Y();
        var i7b = a6g.dk9b(a6g.B7u(this.n7g));
        this.fP9G.body = this.n7g;
        this.fP9G.before = i7b[0];
        this.fP9G.flag = i7b[1];
        this.fP9G.after = i7b[2]
    };
    b7g.Vm2x = function () {
        var qp3x = [
            'width',
            'borderWidth',
            'border-style',
            'outline',
            'marginLeft',
            'marginTop',
            'marginRight',
            'marginBottom',
            'height',
            'paddingLeft',
            'paddingTop',
            'fontSize',
            'wordWrap',
            'fontFamily',
            'lineHeight',
            'overflowX',
            'overflowY'
        ];
        for (var i = 0; i < qp3x.length; i++) {
            if (qp3x[i] === 'width' && a6g.de9V(this.fP9G.txt, qp3x[i]) == '100%') {
                var crY3x = this.fP9G.txt.offsetWidth;
                if (!crY3x) {
                    setTimeout(function () {
                        a6g.ba7T(this.n7g, qp3x[i], this.fP9G.txt.offsetWidth + 'px')
                    }.g7b(this), 300)
                } else {
                    a6g.ba7T(this.n7g, qp3x[i], this.fP9G.txt.offsetWidth + 'px')
                }
                continue
            }
            a6g.ba7T(this.n7g, qp3x[i], a6g.de9V(this.fP9G.txt, qp3x[i]))
        }
    };
    b7g.SP1x = function () {
        this.Td1x.SP1x()
    };
    b7g.HK8C = function () {
        this.Td1x.HK8C()
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        fA9r = NEJ.R,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        la1x = c7f('nm.c'),
        R7K = {},
        b7g;
    if (!!la1x.buJ1x) return;
    la1x.buJ1x = NEJ.C();
    b7g = la1x.buJ1x.N7G(I7B.cI8A);
    b7g.cx8p = function () {
        this.cF8x()
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d)
    };
    b7g.bD8v = function () {
        this.bG8y()
    };
    b7g.GX8P = function (fh9Y, cN8F, bdX4b) {
        if (R7K[fh9Y]) {
            this.gz0x('register commonJST[' + fh9Y + '] duplicate');
            return
        }
        if (!k7d.gG0x(cN8F)) {
            cN8F = ctl.comJST.crX3x(fh9Y, cN8F, bdX4b)
        }
        R7K[fh9Y] = cN8F
    };
    b7g.crO3x = function (bdV4Z) {
        if (k7d.eJ9A(bdV4Z)) {
            k7d.bd7W(bdV4Z, function (p7i) {
                ctl.comJST.GX8P.apply(this, p7i)
            }, this)
        } else if (k7d.ly1x(bdV4Z)) {
            k7d.eC9t(bdV4Z, function (eQ9H, J7C) {
                ctl.comJST.GX8P(J7C, eQ9H)
            })
        }
    };
    b7g.crX3x = function (fh9Y, vO4S, bdX4b) {
        vO4S = vO4S || {};
        NEJ.X(vO4S, {
            comJST: this.nr2x
        });
        if (vO4S.resetDataName && !k7d.eJ9A(vO4S.resetDataName)) {
            vO4S.resetDataName = [
                vO4S.resetDataName
            ]
        }
        return function () {
            var j7c = arguments[0],
                jV1x = arguments[1];
            if (vO4S.resetDataName) {
                var jR1x = {};
                for (var i = 0, ii = vO4S.resetDataName.length; i < ii; i++) {
                    jR1x[vO4S.resetDataName[i]] = arguments[i]
                }
                j7c = jR1x;
                jV1x = arguments[ii]
            }
            NEJ.X(j7c, vO4S, dX9O);
            if (bdX4b) {
                jV1x = jV1x || {};
                NEJ.X(jV1x, bdX4b)
            }
            return a6g.bZ8R(fh9Y, j7c, jV1x)
        }
    };
    b7g.nr2x = function (fh9Y) {
        if (!R7K[fh9Y]) {
            this.gz0x('commonJST[' + fh9Y + '] is unregister');
            return ''
        } else {
            return R7K[fh9Y].apply(null, fA9r.slice.call(arguments, 1))
        }
    };
    b7g.dump = function () {
        return R7K
    };
    b7g.gz0x = function (crM3x) {
        if (console && console.log) {
            console.log(crM3x)
        }
    };
    var dX9O = function (eQ9H, J7C) {
        return J7C == 'resetDataName'
    };
    c7f('ctl').comJST = la1x.buJ1x.go0x();
    a6g.cqf3x({
        comJST: c7f('ctl').comJST.nr2x
    })
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        br7k = NEJ.F,
        fA9r = NEJ.R,
        a6g = c7f('nej.e'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        la1x = c7f('nm.c'),
        l7e = c7f('nm.x'),
        R7K = {},
        b7g;
    if (!!la1x.buj1x) return;
    la1x.buj1x = NEJ.C();
    b7g = la1x.buj1x.N7G(I7B.cI8A);
    b7g.cx8p = function () {
        this.cF8x();
        var e7d = {
            'com-mv-artists': function (fT0x, dZ9Q, Vf2x, buf1x) {
                    return a6g.bZ8R('com-mv-artists', {
                        artists: fT0x,
                        clazz: dZ9Q,
                        boxClazz: buf1x,
                        mark: Vf2x || function (cK8C) {
                                return cK8C
                            },
                            escape: k7d.dH9y,
                        comJST: ctl.comJST.nr2x
                    })
                },
                'com-album-artists': function (fT0x, dZ9Q, Vf2x, buf1x) {
                    return a6g.bZ8R('com-album-artists', {
                        artists: fT0x,
                        clazz: dZ9Q,
                        boxClazz: buf1x,
                        mark: Vf2x || function (cK8C) {
                                return cK8C
                            },
                            escape: k7d.dH9y,
                        comJST: ctl.comJST.nr2x
                    })
                },
                'com-artists-title': {
                    resetDataName: [
                        'artists'
                    ],
                    escape: k7d.dH9y
                },
                'com-user-type': function (dp9g, dZ9Q, lF1x, xD5I, bRy7r) {
                    return a6g.bZ8R('com-user-type', {
                        x: dp9g,
                        clazz: dZ9Q || '',
                        clazz2: typeof bRy7r == 'undefined' ? 'icn' : bRy7r,
                        before: lF1x || '',
                        after: xD5I || '',
                        isEmptyObject: l7e.bJz4D
                    })
                }
        };
        for (var C7v in e7d) {
            ctl.comJST.GX8P(C7v, e7d[C7v])
        }
    };
    b7g.bk7d = function (e7d) {
        this.bm7f(e7d)
    };
    b7g.bD8v = function () {
        this.bG8y()
    };
    c7f('ctl').comJSTUtil = la1x.buj1x.go0x()
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        a6g = c7f('nej.e'),
        dv9m = c7f('nej.p'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        v7o = c7f('nej.j'),
        w7p = c7f('nm.w'),
        gq0x = c7f('nm.ut'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        m7f = c7f('nm.l'),
        bue1x = [
            2,
            3
        ],
        ea9R = [
            'sn',
            'db'
        ],
        b7g,
        K7D,
        crI3x = {
            13: 'playlist',
            17: 'djprogram',
            18: 'song',
            19: 'album',
            20: 'artist',
            21: 'mv',
            24: 'topic',
            25: 'activity',
            70: 'djradio',
            38: 'concert',
            39: 'video',
            41: 'cloudvideo'
        },
        bdS4W = {
            djprogram: '节目',
            album: '专辑',
            playlist: '歌单',
            song: '单曲',
            yunsong: '单曲',
            artist: '歌手',
            mv: 'MV',
            topic: '音乐专栏',
            djradio: '电台',
            concert: '演出',
            video: '视频',
            cloudvideo: '视频'
        },
        bRK7D = {
            djprogram: ' - ',
            album: ' - ',
            playlist: ' by ',
            song: ' - ',
            yunsong: ' - ',
            artist: '',
            mv: ' - ',
            djradio: ' by ',
            cloudvideo: ' by '
        },
        crH3x = {
            0: 13,
            1: 17,
            3: 19,
            4: 18,
            5: 21,
            6: 24,
            14: 70,
            17: 20
        },
        GP8H = {
            pubEventWithPics: false,
            pubEventWithoutResource: false,
            pubEventWithPictureForbiddenNotice: '等级达到Lv.4，即可添加图片'
        },
        FullscreenApi = l7e.FX7Q || {};
    m7f.qg3x = NEJ.C();
    b7g = m7f.qg3x.N7G(m7f.el9c);
    K7D = m7f.qg3x.ct8l;
    b7g.bk7d = function (e7d) {
        if (e7d.onclose === undefined) {
            e7d.onclose = this.bRP7I.g7b(this)
        }
        this.bm7f(e7d);
        this.Cv6p = e7d.isPub;
        this.jC1x = e7d.rid || -1;
        this.eu9l = e7d.type || -1;
        this.btU1x = e7d.purl;
        this.Nm0x = e7d.name || '';
        this.Np0x = e7d.author || '';
        this.btP1x = e7d.authors || '';
        this.bdO4S = e7d.actId;
        this.bdN4R = e7d.actName;
        this.bSp7i = e7d.title;
        this.bdI4M = {};
        this.crD3x = e7d.mesg || '';
        this.crC3x = e7d.placeholder || '说点什么吧';
        this.btv1x = e7d.hideTip;
        this.crB3x = e7d.videoJumpUrl;
        var i7b,
            eV9M = +(new Date);
        try {
            i7b = top.localCache.B7u('user') || {}
        } catch (e) {
            i7b = {}
        }
        for (var i = 0, i7b = i7b.bindings || [], eO9F; i < i7b.length; ++i) {
            eO9F = !i7b[i].tokenJsonStr ? null : JSON.parse(i7b[i].tokenJsonStr);
            if (!eO9F || eO9F.expires_in === undefined) continue;
            var bdE4I = parseInt(eO9F.expires_in),
                bdD4H = parseInt(i7b[i].refreshTime),
                crA3x = (bdE4I + bdD4H) * 1000 - 5 * 60 * 1000;
            if (crA3x > eV9M) this.bdI4M[i7b[i].type] = !0
        }
        this.xw5B = w7p.HA8s.A7t({
            parent: this.bdz4D,
            err: this.bSP7I
        });
        if (this.hz0x) {
            this.hz0x.T7M()
        }
        this.hz0x = w7p.SS1x.A7t({
            parent: document.body,
            target: this.ew9n
        });
        if (this.eu9l == 24 || this.eu9l == 21 || this.eu9l == 41 || this.GG8y()) {
            this.zz5E.style.display = 'none'
        } else {
            this.zz5E.style.display = '';
            this.pl2x = w7p.bom9d.A7t({
                parent: this.bsX0x,
                button: this.zz5E,
                onstartupload: this.bSY8Q.g7b(this, true),
                onfinishupload: this.bSY8Q.g7b(this, false)
            })
        }
        if (this.GG8y()) {
            this.qd3x.innerText = '';
            a6g.y7r(this.qd3x, 'info-video');
            a6g.y7r(this.bsS0x, 'f-hide')
        } else {
            a6g.x7q(this.bsS0x, 'f-hide')
        }
    };
    b7g.bD8v = function () {
        this.bG8y();
        if (this.xw5B) {
            this.xw5B.T7M();
            delete this.xw5B
        }
        if (this.hz0x) {
            this.hz0x.T7M();
            delete this.hz0x
        }
        if (this.pl2x) {
            this.pl2x.T7M();
            delete this.pl2x
        }
        if (this.mQ2x) {
            this.mQ2x.T7M();
            delete this.mQ2x
        }
    };
    b7g.cf8X = function () {
        this.ce8W = 'm-wgt-sharewin'
    };
    b7g.bW8O = function () {
        this.cg8Y();
        this.bTm8e = a6g.dk9b(this.n7g)[0];
        var bu7n = a6g.H7A(this.n7g, 'j-flag');
        this.qq3x = bu7n.shift();
        this.bSP7I = bu7n.shift();
        this.bdz4D = bu7n.shift();
        this.ew9n = bu7n.shift();
        this.qd3x = bu7n.shift();
        this.bsN0x = bu7n.shift();
        this.crz3x = bu7n.shift();
        this.zz5E = bu7n.shift();
        this.cu8m = bu7n.shift();
        this.bsX0x = bu7n.shift();
        this.BY6S = bu7n.shift();
        this.cFz7s = bu7n.shift();
        this.bsS0x = bu7n.shift();
        this.en9e = bu7n.shift();
        this.bds4w = a6g.H7A(this.bsS0x, 'j-t');
        this.CP6J = I7B.FS7L.A7t({
            list: a6g.dk9b(this.qq3x),
            selected: 'z-slt',
            onchange: this.bsJ0x.g7b(this)
        });
        if (dv9m.dr9i.browser == 'ie' && dv9m.dr9i.version < '8.0') {
            a6g.ba7T(this.bdz4D, 'position', 'relative');
            a6g.ba7T(this.bdz4D, 'zIndex', '10')
        }
        h7a.s7l(window, 'snsbind', this.OH0x.g7b(this));
        h7a.s7l(this.ew9n, 'input', this.fO9F.g7b(this));
        h7a.s7l(this.ew9n, 'keyup', this.uI4M.g7b(this));
        h7a.s7l(this.n7g, 'click', this.cL8D.g7b(this));
        this.S7L = q7j.blI8A.A7t();
        this.S7L.s7l('onshareall', this.bdr4v.g7b(this, 0));
        this.S7L.s7l('onshareerror', this.iN0x.g7b(this));
        this.S7L.s7l('onshareprivate', this.bdr4v.g7b(this, 1));
        this.bdq4u = q7j.xQ5V.A7t();
        this.gz0x = q7j.hT0x.A7t();
        try {
            this.OP0x = top.api.sharePermission
        } catch (e) {}
        if (!this.OP0x) {
            this.OP0x = GP8H;
            v7o.bn7g('/api/event/user/permission', {
                type: 'json',
                onload: function (d7e) {
                    if (d7e.code == 200) {
                        this.OP0x = NEJ.EX(GP8H, d7e)
                    }
                }.g7b(this)
            })
        }
    };
    b7g.bsJ0x = function (d7e) {
        d7e.index == 0 ? a6g.x7q(this.bTm8e, 'm-plshare') : a6g.y7r(this.bTm8e, 'm-plshare');
        this.bdz4D.style.display = d7e.index == 0 ? 'none' : '';
        this.crz3x.style.display = d7e.index == 0 ? '' : 'none';
        this.zz5E.style.display = d7e.index == 0 ? '' : 'none';
        if (this.eu9l == 24 || this.eu9l == 21) {
            this.zz5E.style.display = 'none'
        }
        this.bSP7I.style.display = 'none';
        this.ew9n.value = '';
        this.ch8Z();
        this.Gk7d();
        if (d7e.index == 0) {
            var cA8s = a6g.de9V(this.ew9n, 'width');
            if (cA8s == 'auto' || !cA8s) {
                return
            } else {
                if (this.hz0x) {
                    this.hz0x.T7M()
                }
                this.hz0x = w7p.SS1x.A7t({
                    parent: document.body,
                    target: this.ew9n
                })
            }
            this.bsX0x.style.display = ''
        } else {
            if (this.hz0x) {
                this.hz0x.T7M();
                delete this.hz0x
            }
            this.bsX0x.style.display = 'none'
        }
    };
    b7g.cL8D = function (d7e) {
        var f7c = h7a.W7P(d7e, 'd:action');
        if (!f7c) return;
        if (a6g.t7m(f7c, 'action') == 'search') {
            h7a.cr8j(d7e)
        } else if (a6g.t7m(f7c, 'default') === undefined) {
            h7a.cr8j(d7e)
        }
        switch (a6g.t7m(f7c, 'action')) {
        case 'txt':
            this.mi1x();
            break;
        case 'search':
            if (this.GG8y()) {
                top.location.href = this.crB3x
            } else if (this.Cv6p && this.eu9l != 24) {
                if (this.mQ2x) {
                    this.mQ2x.T7M()
                }
                this.mQ2x = w7p.bvy1x.A7t({
                    parent: this.n7g.parentNode,
                    onfinish: this.bsA0x.g7b(this),
                    oncancel: this.crt3x.g7b(this)
                });
                this.bsy0x = true;
                this.n7g.style.display = 'none';
                this.Gi7b(this.jC1x < 0 ? '添加音乐' : '更换音乐')
            }
            break;
        case 'at':
            h7a.tC4G(d7e);
            !!this.hq0x && this.hq0x.bt7m();
            this.hz0x.SP1x();
            this.gj0x();
            break;
        case 'emot':
            h7a.tC4G(d7e);
            !!this.hz0x && this.hz0x.HK8C();
            if (!this.hq0x) {
                this.hq0x = m7f.Ie8W.A7t({
                    parent: this.bsN0x
                });
                this.hq0x.s7l('onselect', this.Ab6V.g7b(this))
            }
            this.hq0x.L7E();
            break;
        case 'upload':
            break;
        case 'sns':
            h7a.bh7a(d7e);
            var bsl0x,
                bv7o,
                u7n = a6g.t7m(f7c, 'type');
            if (!this.bdI4M[u7n]) {
                bsl0x = f7c.href.split('?');
                bv7o = k7d.hu0x(bsl0x[1]);
                bv7o['csrf_token'] = v7o.gy0x('__csrf');
                top.open(bsl0x[0] + '?' + k7d.cC8u(bv7o));
                return
            }
            var by7r = {
                2: 'sn',
                3: 'db',
                4: 'rr'
            };
            l7e.Cr6l(f7c, 'u-slg-' + by7r[u7n] + '-gray');
            break;
        case 'close':
            !!this.hq0x && this.hq0x.bt7m();
            this.bRP7I();
            break;
        case 'share':
            h7a.bh7a(d7e);
            if (this.GG8y()) {
                if (!a6g.bE8w(f7c, 'u-btn2-2-dis')) {
                    this.crs3x()
                }
            } else if (a6g.bE8w(f7c, 'u-btn2-2-dis')) {
                if (!this.OP0x.pubEventWithoutResource && this.jC1x < 0) {
                    this.crr3x()
                } else {}
            } else if (this.jC1x < 0 && !this.ew9n.value && this.pl2x && this.pl2x.Rz1x().length == 0) {
                m7f.Z7S.L7E({
                    type: 2,
                    tip: '请输入内容'
                })
            } else {
                this.crp3x()
            }
            break
        }
    };
    b7g.crr3x = function () {
        var tf3x = 0,
            brZ0x = function () {
                if (tf3x % 2) {
                    a6g.x7q(this.qd3x, 'z-show')
                } else {
                    a6g.y7r(this.qd3x, 'z-show')
                }
                tf3x++;
                if (tf3x > 5) {
                    clearInterval(ej9a)
                }
            },
            ej9a;
        return function () {
            tf3x = 0;
            clearInterval(ej9a);
            ej9a = setInterval(brZ0x.g7b(this), 200)
        }
    }();
    b7g.OH0x = function (o7h) {
        o7h = o7h.result;
        this.bdI4M[o7h.type] = !0;
        var r7k = k7d.dj9a(bue1x, o7h.type),
            ci8a = 'u-slg-' + ea9R[r7k] + '-gray';
        a6g.x7q(this.bds4w[r7k], ci8a)
    };
    b7g.bsA0x = function (bz7s) {
        var j7c = bz7s.data;
        this.jC1x = bz7s.id;
        this.eu9l = bz7s.type;
        this.n7g.style.display = '';
        this.Gi7b(this.bSp7i);
        this.mQ2x && this.mQ2x.T7M();
        this.bsy0x = false;
        this.btU1x = j7c.picUrl;
        this.Nm0x = j7c.title || '';
        this.Np0x = j7c.author || '';
        this.btP1x = j7c.authors || '';
        this.cro3x();
        this.bdj4n()
    };
    b7g.crt3x = function () {
        this.mQ2x && this.mQ2x.T7M();
        this.n7g.style.display = '';
        this.Gi7b(this.bSp7i);
        this.bsy0x = false;
        this.bdj4n()
    };
    b7g.Ab6V = function (d7e) {
        var bo7h = '[' + d7e.text + ']';
        gq0x.Ij8b(this.ew9n, this.pn2x, bo7h);
        this.gj0x()
    };
    b7g.fO9F = function (d7e) {
        dv9m.dr9i.browser == 'ie' && dv9m.dr9i.version < '7.0' ? setTimeout(this.gj0x.g7b(this), 0) : this.gj0x()
    };
    b7g.uI4M = function (d7e) {
        this.mi1x();
        if (d7e.keyCode == 8) this.gj0x()
    };
    b7g.gj0x = function () {
        this.mi1x();
        this.Gk7d()
    };
    b7g.Gk7d = function () {
        var bq7j = Math.ceil(k7d.fv9m(this.ew9n.value.trim()) / 2);
        this.cu8m.innerText = 140 - bq7j;
        bq7j > 140 ? a6g.fk9b(this.cu8m, 's-fc4', 's-fc6') : a6g.fk9b(this.cu8m, 's-fc6', 's-fc4')
    };
    b7g.crp3x = function () {
        if (this.cO8G()) return;
        if (k7d.fv9m(this.ew9n.value.trim()) > 280) {
            this.ch8Z('字数超过140个字符');
            return
        }
        var u7n = this.CP6J.sY3x(),
            j7c;
        if (u7n == 0) {
            for (var i = 0, IN8F = []; i < this.bds4w.length; ++i) {
                if (!a6g.bE8w(this.bds4w[i], 'u-slg-' + ea9R[i] + '-gray')) IN8F.push(bue1x[i])
            }
            this.cO8G(!0);
            j7c = {
                id: this.jC1x,
                msg: this.ew9n.value.trim(),
                type: this.bcZ4d(this.eu9l),
                picUrl: this.btU1x,
                snsTypes: IN8F.join(','),
                isPub: this.Cv6p
            };
            if (this.bdO4S > 0) {
                j7c.actId = this.bdO4S;
                if (this.bdN4R) {
                    j7c.msg = '#' + this.bdN4R + '#' + j7c.msg
                }
            }
            var oi2x = this.pl2x && this.pl2x.Rz1x();
            if (oi2x && oi2x.length) {
                j7c.pics = oi2x
            }
            this.S7L.cvn4r(j7c)
        } else {
            var tP4T = this.xw5B.QQ1x();
            if (tP4T.length <= 0) {
                this.ch8Z('请至少选择一位好友');
                return
            }
            this.S7L.cvm4q({
                data: {
                    id: this.jC1x,
                    msg: this.ew9n.value.trim(),
                    type: this.bcZ4d(this.eu9l == 41 ? 39 : this.eu9l),
                    userIds: '[' + tP4T.join(',') + ']'
                }
            })
        }
    };
    b7g.crs3x = function () {
        if (this.cO8G()) {
            return
        }
        this.gz0x.eT9K('click', {
            target: 'share',
            targetid: 'button',
            page: 'sharevideo'
        });
        if (k7d.fv9m(this.ew9n.value.trim()) > 280) {
            this.ch8Z('字数超过140个字符');
            return
        }
        this.cO8G(!0);
        var j7c = {
                msg: this.ew9n.value.trim() || '',
                type: 'video'
            },
            crn3x = {
                videoId: this.jC1x
            };
        if (this.bdO4S > 0) {
            j7c.actId = this.bdO4S;
            if (this.bdN4R) {
                j7c.msg = '#' + this.bdN4R + '#' + j7c.msg
            }
        }
        j7c.videoinfo = JSON.stringify(crn3x);
        this.S7L.cvl4p({
            data: {
                videoId: this.jC1x,
                commit: true
            },
            data2: j7c,
            snsTypes: ''
        })
    };
    b7g.bdr4v = function (u7n, o7h) {
        this.cO8G(!1);
        this.bt7m();
        if (!this.btv1x) {
            if (this.GG8y()) {
                m7f.Z7S.L7E({
                    tip: '视频将在转码完成后自动发出',
                    autoclose: true
                })
            } else {
                m7f.Z7S.L7E({
                    tip: '分享成功' + (o7h.point > 0 ? ' 获得<em class="s-fc6">' + o7h.point + '积分</em>' : ''),
                    autoclose: true
                })
            }
        }
        h7a.z7s(m7f.qg3x, 'sharesuccess', {
            isPrivate: u7n,
            rid: this.jC1x,
            rtype: this.eu9l,
            data: o7h.event
        });
        this.z7s('onshare')
    };
    b7g.iN0x = function (o7h) {
        this.cO8G(!1);
        var bH8z = '分享失败';
        if (o7h.code) {
            switch (o7h.code) {
            case 404:
                bH8z = '分享的资源不存在';
                break;
            case 407:
                bH8z = '输入内容包含有关键字';
                break;
            case 408:
                bH8z = '分享太快了，过会再分享吧';
                break;
            case 315:
                bH8z = o7h.message || '根据对方设置，你没有该操作权限';
                break;
            case 329:
                return l7e.fs9j({
                    clazz: 'm-layer-w2',
                    btntxt: '知道了',
                    message: '当前账号存在较多未完成发布的视频<br>请稍后再试'
                })
            }
        }
        this.ch8Z(bH8z)
    };
    b7g.mi1x = function () {
        this.pn2x = gq0x.vT4X(this.ew9n)
    };
    b7g.ch8Z = function (bH8z) {
        this.dV9M(this.en9e, bH8z)
    };
    b7g.cO8G = function (cZ8R) {
        return this.dY9P(this.BY6S, cZ8R, '分享', '分享中...')
    };
    b7g.bcZ4d = function (hY0x) {
        return crI3x[hY0x] || ''
    };
    b7g.crl3x = function () {
        var ep9g,
            vF4J = this.bcZ4d(this.eu9l);
        this.qd3x.style.display = '';
        if (this.jC1x < 0) {
            this.qd3x.innerHTML = '<i class="highlight"></i><div class="text f-thide f-fl f-fs1"><i class="logo f-fl u-icn2 u-icn2-quaver"></i><span class="f-fs1 f-fl">给动态配上音乐</span></div><i class="f-fr icn u-icn2 u-icn2-plus"></i>'
        } else {
            if (!this.Nm0x) {
                this.qd3x.style.display = 'none';
                return
            }
            var bcS4W = this.Cv6p && this.eu9l != 24;
            ep9g = (bdS4W[vF4J] ? bdS4W[vF4J] + '：' : '') + this.Nm0x + (bRK7D[vF4J] || ' ') + (vF4J == 'mv' || vF4J == 'album' ? this.btP1x || this.Np0x : this.Np0x);
            a6g.dA9r(this.qd3x, 'm-xwgt-share-infobar', {
                canChange: bcS4W,
                info: ep9g
            });
            if (bcS4W) {
                a6g.x7q(this.qd3x, 'z-dis')
            } else {
                a6g.y7r(this.qd3x, 'z-dis')
            }
        }
        a6g.x7q(this.qd3x, 'info-video')
    };
    b7g.cro3x = function () {
        var vF4J = this.bcZ4d(this.eu9l),
            ep9g = (bdS4W[vF4J] ? bdS4W[vF4J] + '：' : '') + this.Nm0x + (bRK7D[vF4J] || ' ') + (vF4J == 'mv' || vF4J == 'album' ? this.btP1x || this.Np0x : this.Np0x);
        bcS4W = this.Cv6p && this.eu9l != 24;
        if (this.GG8y()) {} else {
            a6g.x7q(this.qd3x, 'info-video');
            a6g.dA9r(this.qd3x, 'm-xwgt-share-infobar', {
                canChange: bcS4W,
                isPub: this.Cv6p,
                info: ep9g
            })
        }
    };
    b7g.crj3x = function () {
        var IS8K = this.ew9n.value;
        if (this.Cv6p) {
            if (!!this.bsy0x) {
                return !!IS8K && !!IS8K.length || !!this.pl2x && this.pl2x.Rz1x().length > 0
            } else {
                return !(this.jC1x < 0) || !!IS8K && !!IS8K.length || !!this.pl2x && this.pl2x.Rz1x().length > 0
            }
        } else {
            return !!IS8K && !!IS8K.length || !!this.pl2x && this.pl2x.Rz1x().length > 0
        }
    };
    b7g.bdj4n = function () {
        var bUK8C = false;
        if (!this.Cv6p || this.OP0x.pubEventWithoutResource || !(this.jC1x < 0)) {
            bUK8C = true
        }
        if (bUK8C) {
            a6g.x7q(this.BY6S, 'u-btn2-2-dis')
        } else {
            a6g.y7r(this.BY6S, 'u-btn2-2-dis')
        }
    };
    b7g.bSY8Q = function (brf0x) {
        if (brf0x) {
            a6g.y7r(this.BY6S, 'u-btn2-2-dis')
        } else {
            this.bdj4n()
        }
    };
    b7g.bRP7I = function (d7e) {
        if (d7e) {
            d7e.stopped = true
        }
        if (this.crj3x()) {
            l7e.ho0x({
                parent: document[FullscreenApi.fullscreenElement] || document.body,
                title: '提示',
                message: '是否退出本次编辑？',
                btnok: '退出',
                action: function (U7N) {
                    if (U7N == 'ok') {
                        this.z7s('forceclose', {});
                        this.bt7m();
                        h7a.z7s(m7f.qg3x, 'shareclose', {})
                    }
                }.g7b(this)
            })
        } else {
            this.z7s('forceclose', {});
            this.bt7m();
            h7a.z7s(m7f.qg3x, 'shareclose', {})
        }
    };
    b7g.Gi7b = function (em9d, dQ9H) {
        this.oI2x.AM6G(em9d, dQ9H)
    };
    b7g.bcR4V = function (u7n) {
        this.gz0x.eT9K('page', {
            type: u7n
        })
    };
    b7g.GG8y = function () {
        return this.eu9l == 39
    };
    b7g.L7E = function () {
        var cri3x = function (p7i, r7k) {
            var ci8a = 'u-slg-' + ea9R[r7k] + '-gray';
            !this.bdI4M[bue1x[r7k]] ? a6g.y7r(p7i, ci8a) : a6g.x7q(p7i, ci8a)
        };
        return function () {
            K7D.L7E.call(this);
            this.n7g.style.display = '';
            this.ch8Z();
            this.cO8G(!1);
            this.CP6J.Qv0x(0);
            this.ew9n.focus();
            this.ew9n.value = this.crD3x || '';
            this.ew9n.placeholder = this.crC3x || '';
            if (!this.GG8y()) {
                this.crl3x()
            } else {
                a6g.y7r(this.qd3x, 'info-video');
                a6g.dA9r(this.qd3x, 'm-xwgt-share-videobar', {
                    title: this.Nm0x,
                    picUrl: this.btU1x
                })
            }
            this.gj0x();
            this.xw5B.csG4K();
            k7d.bd7W(this.bds4w, cri3x, this);
            this.mi1x();
            if (this.Cv6p) {
                this.qq3x.style.display = 'none'
            } else {
                this.qq3x.style.display = ''
            }
            this.bdj4n()
        }
    }();
    b7g.bt7m = function (d7e) {
        K7D.bt7m.call(this);
        !!this.hq0x && this.hq0x.bt7m();
        if (this.xw5B) {
            this.xw5B.T7M();
            delete this.xw5B
        }
        if (this.hz0x) {
            this.hz0x.T7M();
            delete this.hz0x
        }
        if (this.pl2x) {
            this.pl2x.T7M();
            delete this.pl2x
        }
        if (this.bUR8J) {
            this.bUR8J = this.bUR8J.T7M()
        }
        if (this.mQ2x) {
            this.mQ2x.T7M();
            delete this.mQ2x
        }
    };
    l7e.kY1x = function (e7d) {
        if (!GUser || !GUser.userId || GUser.userId <= 0) {
            top.login();
            return
        }
        if (e7d.title === undefined) {
            e7d.title = '分享'
        }
        if (e7d.actId && e7d.type != 39) {
            var u7n = crH3x[e7d.resourceType],
                bV8N = e7d.resourceJson,
                hX0x;
            if (k7d.fH9y(bV8N)) {
                try {
                    bV8N = JSON.parse(bV8N)
                } catch (e) {}
            }
            if (u7n) {
                hX0x = l7e.bNo5t(u7n, bV8N);
                e7d.name = hX0x.title;
                e7d.author = hX0x.author;
                e7d.picUrl = hX0x.picUrl;
                e7d.type = u7n;
                e7d.rid = (bV8N || []).id
            }
        }
        m7f.qg3x.L7E(e7d)
    };
    I7B.fI9z.A7t({
        element: m7f.qg3x,
        event: [
            'sharesuccess',
            'shareclose'
        ]
    })
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        h7a = c7f('nej.v'),
        a6g = c7f('nej.e'),
        v7o = c7f('nej.j'),
        m7f = c7f('nm.l'),
        w7p = c7f('nm.w'),
        bC8u = c7f('nej.ui'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        b7g,
        K7D;
    m7f.bcN4R = NEJ.C();
    b7g = m7f.bcN4R.N7G(m7f.el9c);
    K7D = m7f.bcN4R.ct8l;
    b7g.cx8p = function () {
        this.cF8x()
    };
    b7g.bW8O = function () {
        this.cg8Y();
        var i7b = a6g.H7A(this.n7g, 'j-flag');
        h7a.s7l(i7b[0], 'click', this.FV7O.g7b(this))
    };
    b7g.cf8X = function () {
        this.ce8W = 'm-import-ok'
    };
    b7g.bk7d = function (e7d) {
        e7d.parent = e7d.parent || document.body;
        e7d.title = '歌曲同步完成';
        this.bm7f(e7d)
    };
    b7g.bD8v = function () {
        this.bG8y()
    };
    b7g.FV7O = function (d7e) {
        this.bt7m();
        if (location.pathname.indexOf('my') >= 0) {
            location.reload()
        } else {
            location.dispatch2('/my/')
        }
    };
    b7g.Do7h = function () {
        this.bt7m()
    };
    b7g.bSV8N = function (d7e) {
        if (d7e.keyCode == 13) this.Hj8b()
    }
})();
(function () {
    var c7f = NEJ.P,
        bb7U = NEJ.O,
        h7a = c7f('nej.v'),
        a6g = c7f('nej.e'),
        v7o = c7f('nej.j'),
        O7H = c7f('nej.p'),
        k7d = c7f('nej.u'),
        m7f = c7f('nm.l'),
        w7p = c7f('nm.w'),
        bC8u = c7f('nej.ui'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        b7g,
        K7D;
    m7f.bxt1x = NEJ.C();
    b7g = m7f.bxt1x.N7G(m7f.el9c);
    b7g.cf8X = function () {
        this.ce8W = 'm-programtips-layer'
    };
    b7g.bW8O = function () {
        this.cg8Y();
        this.bU8M = a6g.H7A(this.n7g, 'j-flag')
    };
    b7g.bk7d = function (e7d) {
        if (e7d.inner) {
            var innerNode = a6g.H7A(this.n7g, 'wrap-p')[0];
            if (innerNode) {
                innerNode.innerHTML = e7d.inner
            }
        }
        e7d.clazz = ' m-layer-programtips ' + (e7d.clazz || '');
        e7d.parent = e7d.parent || document.body;
        e7d.title = e7d.title || '付费内容提示';
        e7d.draggable = !0;
        e7d.destroyalbe = !0;
        e7d.mask = true;
        this.bm7f(e7d);
        this.hb0x = e7d.id;
        this.crh3x = e7d.radiotype;
        this.kO1x = location.protocol + '//' + (this.bqU0x() || 'music.163.com') + '/m/' + this.crh3x + '?id=' + this.hb0x;
        this.kO1x = e7d.url || this.kO1x;
        this.crg3x()
    };
    b7g.bD8v = function () {
        this.bG8y()
    };
    b7g.Do7h = function () {
        this.bt7m()
    };
    b7g.FV7O = function (d7e) {
        this.z7s('onok', D7w);
        this.bt7m()
    };
    l7e.bqQ0x = function (e7d) {
        m7f.bxt1x.A7t(e7d).L7E()
    };
    b7g.crg3x = function () {
        v7o.bn7g('/api/web/qrcode/get', {
            method: 'POST',
            type: 'json',
            data: k7d.cC8u({
                url: this.kO1x,
                size: 180
            }),
            onload: function (j7c) {
                if (j7c.code == 200) {
                    this.crf3x(j7c.qrcodeImageUrl)
                } else {
                    alert('二维码获取失败')
                }
            }.g7b(this)
        })
    };
    b7g.bqU0x = function () {
        var Vr2x = location.host;
        if (Vr2x.indexOf('music') >= 0) {
            return 'music.163.com'
        } else {
            return 'igame.163.com'
        }
    };
    b7g.crf3x = function (jO1x) {
        this.bU8M[0].style.backgroundImage = 'url(' + jO1x + ')'
    }
})();
(function () {
    var c7f = NEJ.P,
        a6g = c7f('nej.e'),
        dv9m = c7f('nej.p'),
        h7a = c7f('nej.v'),
        k7d = c7f('nej.u'),
        I7B = c7f('nej.ut'),
        v7o = c7f('nej.j'),
        q7j = c7f('nm.d'),
        l7e = c7f('nm.x'),
        E7x = c7f('nm.m'),
        m7f = c7f('nm.l'),
        M7F = c7f('nm.m.f'),
        b7g,
        K7D;
    E7x.df9W = NEJ.C();
    b7g = E7x.df9W.N7G(I7B.du9l);
    b7g.bL8D = function () {
        var qx3x = !1;
        return function () {
            if (qx3x) return;
            qx3x = !0;
            this.bR8J();
            if (top == self) {
                return
            }
            this.tk3x = a6g.B7u('g_backtop');
            if (window.GRef != 'mail') {} else {
                this.bxF2x()
            }
            I7B.fI9z.A7t({
                element: window,
                event: [
                    'share',
                    'playchange',
                    'snsbind',
                    'playstatechange'
                ]
            });
            this.bX8P([
                [window,
                    'scroll',
                    this.BH6B.g7b(this)
                ],
                [
                    document,
                    'keyup',
                    this.cqZ3x.g7b(this)
                ],
                [
                    document.body,
                    'click',
                    this.sF3x.g7b(this)
                ],
                [
                    document,
                    'mouseup',
                    this.cqW3x.g7b(this)
                ],
                [
                    this.tk3x,
                    'click',
                    this.QH1x.g7b(this)
                ],
                [
                    q7j.tl3x,
                    'message',
                    this.ux4B.g7b(this)
                ]
            ]);
            l7e.cvv4z(document.body);
            this.BH6B();
            if (this.BG6A !== false && typeof GUser !== 'undefined' && GUser.userId > 0) q7j.tl3x.go0x().uC4G();
            try {
                top.GUser = NEJ.X(top.GUser, GUser);
                top.api.refreshUserInfo();
                if (dv9m.dr9i.browser == 'ie' && parseInt(dv9m.dr9i.version) < 9 && /#(.*?)$/.test(top.document.title)) {
                    top.document.title = '网易云音乐'
                } else {
                    var hd0x = top.player.getPlaying();
                    if (hd0x && hd0x.track && hd0x.playing) {
                        top.document.title = decodeURIComponent('%E2%96%B6%20') + hd0x.track.name
                    } else {
                        top.document.title = document.title
                    }
                }
            } catch (e) {}
            window.share = this.zb5g.g7b(this);
            this.kj1x = q7j.hT0x.A7t();
            window.log = this.he0x.g7b(this);
            var sS3x = location.search;
            if (sS3x) {
                var bv7o = sS3x.substr(sS3x.indexOf('?') + 1),
                    gn0x = k7d.hu0x(bv7o);
                if (gn0x && gn0x['_hash']) location.hash = gn0x['_hash']
            }
        }
    }();
    b7g.cqZ3x = function (d7e) {
        var f7c = h7a.W7P(d7e);
        try {
            if (d7e.keyCode == 80 && l7e.bIJ4N() || [
                'textarea',
                'input'
            ].indexOf(f7c.tagName.toLowerCase()) >= 0) return;
            h7a.z7s(top.document, 'keyup', {
                ctrlKey: d7e.ctrlKey,
                keyCode: d7e.keyCode
            })
        } catch (e) {}
    };
    b7g.sF3x = function (d7e) {
        var f7c = h7a.W7P(d7e);
        if (f7c && f7c.tagName == 'INPUT') return;
        var f7c = h7a.W7P(d7e, 'd:pid');
        if (f7c) {
            h7a.cr8j(d7e);
            var py2x = a6g.t7m(f7c, 'pid'),
                BC6w = a6g.t7m(f7c, 'ptype'),
                U7N = a6g.t7m(f7c, 'action') || 'play';
            switch (U7N) {
            case 'subscribe':
                l7e.mv1x({
                    tracks: [
                        py2x
                    ]
                });
                break
            }
        }
        f7c = h7a.W7P(d7e, 'd:resAction');
        if (f7c && f7c.className.indexOf('-dis') == -1) {
            var cT8L = a6g.t7m(f7c, 'resId'),
                u7n = a6g.t7m(f7c, 'resType'),
                bqj0x = a6g.t7m(f7c, 'resRadiotype'),
                bqi0x = a6g.t7m(f7c, 'resRadioid'),
                eb9S = a6g.t7m(f7c, 'resFrom'),
                j7c = a6g.t7m(f7c, 'resData'),
                U7N = a6g.t7m(f7c, 'resAction'),
                bwl1x = a6g.t7m(f7c, 'resCopyright'),
                bcy4C = a6g.t7m(f7c, 'resAuditstatus');
            if (U7N != 'log' && U7N != 'bilog') h7a.cr8j(d7e);
            switch (U7N) {
            case 'log':
                j7c = (j7c || '').split('|');
                if (!!j7c[0]) {
                    var bg7Z = {
                        id: cT8L,
                        alg: j7c[2] || 'itembased',
                        scene: j7c[3],
                        position: j7c[1] || 0
                    };
                    if (!!j7c[4]) bg7Z.srcid = j7c[4];
                    window.log(j7c[0], bg7Z)
                }
                break;
            case 'bilog':
                var bms8k = a6g.t7m(f7c, 'logAction'),
                    bmG8y = a6g.t7m(f7c, 'logJson');
                window.log(bms8k, bmG8y);
                break;
            case 'share':
                if (bcy4C && bcy4C == 1) {
                    l7e.it0x('由于版权问题，该节目暂时无法分享。')
                } else {
                    share(cT8L, u7n, a6g.t7m(f7c, 'resPic'), a6g.t7m(f7c, 'resName'), a6g.t7m(f7c, 'resAuthor'), a6g.t7m(f7c, 'resAuthors'))
                }
                break;
            case 'fav':
            case 'subscribe':
                if (u7n == 18) {
                    var qF3x = a6g.t7m(f7c, 'resLevel'),
                        of2x = a6g.t7m(f7c, 'resFee');
                    if (qF3x == 10) {
                        l7e.uL4P(of2x, cT8L, 'song');
                        break
                    }
                    l7e.mv1x({
                        tracks: [
                            cT8L
                        ]
                    })
                }
                break;
            case 'download':
                l7e.Lh9Y({
                    id: cT8L,
                    type: u7n
                });
                break;
            case 'programtips':
                if (bcy4C && bcy4C == 1) {
                    l7e.it0x('由于版权问题，该节目暂时无法分享。')
                } else {
                    l7e.bqQ0x({
                        id: bqi0x,
                        radiotype: bqj0x
                    })
                }
                break
            }
        }
        if (top == self) return;
        try {
            top.onIframeClick(d7e)
        } catch (e) {}
    };
    b7g.cqW3x = function (d7e) {
        try {
            h7a.z7s(top.document, 'mouseup')
        } catch (e) {}
    };
    b7g.BH6B = function () {
        var cqV3x = function () {
            var cc8U = window.innerHeight;
            if (!k7d.xs5x(cc8U)) cc8U = (document.documentElement || document.body).clientHeight;
            return cc8U
        };
        return function (d7e) {
            if (!this.tk3x) return;
            var bcw4A = cqV3x(),
                gc0x = document.documentElement.scrollTop || document.body.scrollTop;
            a6g.ba7T(this.tk3x, 'display', gc0x > 0 ? '' : 'none');
            if (dv9m.dr9i.browser == 'ie' && dv9m.dr9i.version < '7.0') {
                var gx0x = Math.min(document.body.clientHeight, bcw4A + gc0x) - 204;
                a6g.ba7T(this.tk3x, 'top', gx0x + 'px')
            }
        }
    }();
    b7g.QH1x = function (d7e) {
        h7a.cr8j(d7e);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0
    };
    b7g.zb5g = function () {
        var bpY0x = function (d7e) {
            h7a.z7s(window, 'share', d7e)
        };
        return function (cT8L, u7n, yX5c, V7O, FH7A, FF7y) {
            l7e.kY1x({
                rid: cT8L,
                type: u7n,
                purl: yX5c,
                name: V7O,
                author: FH7A,
                authors: FF7y,
                onshare: bpY0x.g7b(this)
            })
        }
    }();
    b7g.he0x = function (U7N, bg7Z) {
        try {
            top.log(U7N, bg7Z)
        } catch (e) {
            if (U7N.indexOf('new|') == 0) {
                return this.kj1x.eT9K(U7N.slice(4), bg7Z)
            }
            switch (U7N) {
            case 'play':
                this.kj1x.ek9b(bg7Z);
                break;
            case 'search':
                this.kj1x.bDB3x(bg7Z);
                break;
            default:
                this.kj1x.eT9K(U7N, bg7Z)
            }
        }
    };
    b7g.bxF2x = function () {
        var bcp4t,
            bpF9w = false,
            bs7l = [
                45,
                60
            ];
        var cqU3x = function (bH8z) {
            if (bH8z.title != 'MailBoxImport') return;
            var Q7J = JSON.parse(bH8z.content || 'null') || bb7U;
            if (Q7J.status == 10) {
                m7f.bcN4R.A7t().L7E();
                window.clearTimeout(bcp4t)
            }
        };
        var sw3x = function (d7e) {
            if (d7e.code == 200) {
                if (d7e.status == 1) {
                    h7a.s7l(q7j.AE6y, 'message', cqU3x.g7b(this));
                    q7j.AE6y.A7t().brR0x();
                    bpF9w = true
                } else {
                    if (bpF9w) {
                        if (d7e.status == 10) {
                            m7f.bcN4R.A7t().L7E();
                            h7a.hl0x(q7j.AE6y, 'message');
                            window.clearTimeout(bcp4t);
                            bpF9w = false
                        }
                    } else {
                        window.clearTimeout(bcp4t)
                    }
                }
            }
        };
        return function () {
            var tD4H = bs7l.shift() * 1000;
            v7o.bn7g('/api/musicbox/mail/status', {
                type: 'json',
                method: 'get',
                onload: sw3x.g7b(this)
            });
            if (tD4H) {
                bcp4t = window.setTimeout(arguments.callee, tD4H)
            }
        }
    }();
    b7g.ux4B = function (d7e) {
        try {
            top.polling(d7e)
        } catch (e) {}
    }
})()