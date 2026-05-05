import {
    b as hn
} from "./index-3fevySbJ.js";
import {
    c as Ie,
    g as ln
} from "./_commonjsHelpers-D6-XlEtG.js";
import {
    g as qi,
    z as Wi,
    r as cn,
    j as zi,
    h as Yi,
    i as Ki,
    A as Xi,
    k as dn,
    w as ji,
    B as un
} from "./index-BA5ou0W-.js";
var ye = {
        exports: {}
    },
    kt = {},
    Ce = {},
    we = {},
    Ue;

function Q() {
    return Ue || (Ue = 1, (function(g) {
        Object.defineProperty(g, "__esModule", {
            value: !0
        }), g._registerNode = g.Konva = g.glob = void 0;
        const C = Math.PI / 180;

        function M() {
            return typeof window < "u" && ({}.toString.call(window) === "[object Window]" || {}.toString.call(window) === "[object global]")
        }
        g.glob = typeof Ie < "u" ? Ie : typeof window < "u" ? window : typeof WorkerGlobalScope < "u" ? self : {}, g.Konva = {
            _global: g.glob,
            version: "9.3.22",
            isBrowser: M(),
            isUnminified: /param/.test((function(v) {}).toString()),
            dblClickWindow: 400,
            getAngle(v) {
                return g.Konva.angleDeg ? v * C : v
            },
            enableTrace: !1,
            pointerEventsEnabled: !0,
            autoDrawEnabled: !0,
            hitOnDragEnabled: !1,
            capturePointerEventsEnabled: !1,
            _mouseListenClick: !1,
            _touchListenClick: !1,
            _pointerListenClick: !1,
            _mouseInDblClickWindow: !1,
            _touchInDblClickWindow: !1,
            _pointerInDblClickWindow: !1,
            _mouseDblClickPointerId: null,
            _touchDblClickPointerId: null,
            _pointerDblClickPointerId: null,
            _fixTextRendering: !1,
            pixelRatio: typeof window < "u" && window.devicePixelRatio || 1,
            dragDistance: 3,
            angleDeg: !0,
            showWarnings: !0,
            dragButtons: [0, 1],
            isDragging() {
                return g.Konva.DD.isDragging
            },
            isTransforming() {
                var v;
                return (v = g.Konva.Transformer) === null || v === void 0 ? void 0 : v.isTransforming()
            },
            isDragReady() {
                return !!g.Konva.DD.node
            },
            releaseCanvasOnDestroy: !0,
            document: g.glob.document,
            _injectGlobal(v) {
                g.glob.Konva = v
            }
        };
        const T = v => {
            g.Konva[v.prototype.getClassName()] = v
        };
        g._registerNode = T, g.Konva._injectGlobal(g.Konva)
    })(we)), we
}
var xe = {},
    Be;

function rt() {
    return Be || (Be = 1, (function(g) {
        Object.defineProperty(g, "__esModule", {
            value: !0
        }), g.Util = g.Transform = void 0;
        const C = Q();
        class M {
            constructor(c = [1, 0, 0, 1, 0, 0]) {
                this.dirty = !1, this.m = c && c.slice() || [1, 0, 0, 1, 0, 0]
            }
            reset() {
                this.m[0] = 1, this.m[1] = 0, this.m[2] = 0, this.m[3] = 1, this.m[4] = 0, this.m[5] = 0
            }
            copy() {
                return new M(this.m)
            }
            copyInto(c) {
                c.m[0] = this.m[0], c.m[1] = this.m[1], c.m[2] = this.m[2], c.m[3] = this.m[3], c.m[4] = this.m[4], c.m[5] = this.m[5]
            }
            point(c) {
                const p = this.m;
                return {
                    x: p[0] * c.x + p[2] * c.y + p[4],
                    y: p[1] * c.x + p[3] * c.y + p[5]
                }
            }
            translate(c, p) {
                return this.m[4] += this.m[0] * c + this.m[2] * p, this.m[5] += this.m[1] * c + this.m[3] * p, this
            }
            scale(c, p) {
                return this.m[0] *= c, this.m[1] *= c, this.m[2] *= p, this.m[3] *= p, this
            }
            rotate(c) {
                const p = Math.cos(c),
                    P = Math.sin(c),
                    G = this.m[0] * p + this.m[2] * P,
                    y = this.m[1] * p + this.m[3] * P,
                    b = this.m[0] * -P + this.m[2] * p,
                    S = this.m[1] * -P + this.m[3] * p;
                return this.m[0] = G, this.m[1] = y, this.m[2] = b, this.m[3] = S, this
            }
            getTranslation() {
                return {
                    x: this.m[4],
                    y: this.m[5]
                }
            }
            skew(c, p) {
                const P = this.m[0] + this.m[2] * p,
                    G = this.m[1] + this.m[3] * p,
                    y = this.m[2] + this.m[0] * c,
                    b = this.m[3] + this.m[1] * c;
                return this.m[0] = P, this.m[1] = G, this.m[2] = y, this.m[3] = b, this
            }
            multiply(c) {
                const p = this.m[0] * c.m[0] + this.m[2] * c.m[1],
                    P = this.m[1] * c.m[0] + this.m[3] * c.m[1],
                    G = this.m[0] * c.m[2] + this.m[2] * c.m[3],
                    y = this.m[1] * c.m[2] + this.m[3] * c.m[3],
                    b = this.m[0] * c.m[4] + this.m[2] * c.m[5] + this.m[4],
                    S = this.m[1] * c.m[4] + this.m[3] * c.m[5] + this.m[5];
                return this.m[0] = p, this.m[1] = P, this.m[2] = G, this.m[3] = y, this.m[4] = b, this.m[5] = S, this
            }
            invert() {
                const c = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
                    p = this.m[3] * c,
                    P = -this.m[1] * c,
                    G = -this.m[2] * c,
                    y = this.m[0] * c,
                    b = c * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
                    S = c * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
                return this.m[0] = p, this.m[1] = P, this.m[2] = G, this.m[3] = y, this.m[4] = b, this.m[5] = S, this
            }
            getMatrix() {
                return this.m
            }
            decompose() {
                const c = this.m[0],
                    p = this.m[1],
                    P = this.m[2],
                    G = this.m[3],
                    y = this.m[4],
                    b = this.m[5],
                    S = c * G - p * P,
                    k = {
                        x: y,
                        y: b,
                        rotation: 0,
                        scaleX: 0,
                        scaleY: 0,
                        skewX: 0,
                        skewY: 0
                    };
                if (c != 0 || p != 0) {
                    const N = Math.sqrt(c * c + p * p);
                    k.rotation = p > 0 ? Math.acos(c / N) : -Math.acos(c / N), k.scaleX = N, k.scaleY = S / N, k.skewX = (c * P + p * G) / S, k.skewY = 0
                } else if (P != 0 || G != 0) {
                    const N = Math.sqrt(P * P + G * G);
                    k.rotation = Math.PI / 2 - (G > 0 ? Math.acos(-P / N) : -Math.acos(P / N)), k.scaleX = S / N, k.scaleY = N, k.skewX = 0, k.skewY = (c * P + p * G) / S
                }
                return k.rotation = g.Util._getRotation(k.rotation), k
            }
        }
        g.Transform = M;
        const T = "[object Array]",
            v = "[object Number]",
            f = "[object String]",
            s = "[object Boolean]",
            e = Math.PI / 180,
            a = 180 / Math.PI,
            h = "#",
            o = "",
            _ = "0",
            l = "Konva warning: ",
            n = "Konva error: ",
            r = "rgb(",
            d = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 132, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 255, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 203],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [119, 128, 144],
                slategrey: [119, 128, 144],
                snow: [255, 255, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                transparent: [255, 255, 255, 0],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 5]
            },
            m = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
        let w = [];
        const i = typeof requestAnimationFrame < "u" && requestAnimationFrame || function(t) {
            setTimeout(t, 60)
        };
        g.Util = {
            _isElement(t) {
                return !!(t && t.nodeType == 1)
            },
            _isFunction(t) {
                return !!(t && t.constructor && t.call && t.apply)
            },
            _isPlainObject(t) {
                return !!t && t.constructor === Object
            },
            _isArray(t) {
                return Object.prototype.toString.call(t) === T
            },
            _isNumber(t) {
                return Object.prototype.toString.call(t) === v && !isNaN(t) && isFinite(t)
            },
            _isString(t) {
                return Object.prototype.toString.call(t) === f
            },
            _isBoolean(t) {
                return Object.prototype.toString.call(t) === s
            },
            isObject(t) {
                return t instanceof Object
            },
            isValidSelector(t) {
                if (typeof t != "string") return !1;
                const c = t[0];
                return c === "#" || c === "." || c === c.toUpperCase()
            },
            _sign(t) {
                return t === 0 || t > 0 ? 1 : -1
            },
            requestAnimFrame(t) {
                w.push(t), w.length === 1 && i(function() {
                    const c = w;
                    w = [], c.forEach(function(p) {
                        p()
                    })
                })
            },
            createCanvasElement() {
                const t = document.createElement("canvas");
                try {
                    t.style = t.style || {}
                } catch {}
                return t
            },
            createImageElement() {
                return document.createElement("img")
            },
            _isInDocument(t) {
                for (; t = t.parentNode;)
                    if (t == document) return !0;
                return !1
            },
            _urlToImage(t, c) {
                const p = g.Util.createImageElement();
                p.onload = function() {
                    c(p)
                }, p.src = t
            },
            _rgbToHex(t, c, p) {
                return ((1 << 24) + (t << 16) + (c << 8) + p).toString(16).slice(1)
            },
            _hexToRgb(t) {
                t = t.replace(h, o);
                const c = parseInt(t, 16);
                return {
                    r: c >> 16 & 255,
                    g: c >> 8 & 255,
                    b: c & 255
                }
            },
            getRandomColor() {
                let t = (Math.random() * 16777215 << 0).toString(16);
                for (; t.length < 6;) t = _ + t;
                return h + t
            },
            getRGB(t) {
                let c;
                return t in d ? (c = d[t], {
                    r: c[0],
                    g: c[1],
                    b: c[2]
                }) : t[0] === h ? this._hexToRgb(t.substring(1)) : t.substr(0, 4) === r ? (c = m.exec(t.replace(/ /g, "")), {
                    r: parseInt(c[1], 10),
                    g: parseInt(c[2], 10),
                    b: parseInt(c[3], 10)
                }) : {
                    r: 0,
                    g: 0,
                    b: 0
                }
            },
            colorToRGBA(t) {
                return t = t || "black", g.Util._namedColorToRBA(t) || g.Util._hex3ColorToRGBA(t) || g.Util._hex4ColorToRGBA(t) || g.Util._hex6ColorToRGBA(t) || g.Util._hex8ColorToRGBA(t) || g.Util._rgbColorToRGBA(t) || g.Util._rgbaColorToRGBA(t) || g.Util._hslColorToRGBA(t)
            },
            _namedColorToRBA(t) {
                const c = d[t.toLowerCase()];
                return c ? {
                    r: c[0],
                    g: c[1],
                    b: c[2],
                    a: 1
                } : null
            },
            _rgbColorToRGBA(t) {
                if (t.indexOf("rgb(") === 0) {
                    t = t.match(/rgb\(([^)]+)\)/)[1];
                    const c = t.split(/ *, */).map(Number);
                    return {
                        r: c[0],
                        g: c[1],
                        b: c[2],
                        a: 1
                    }
                }
            },
            _rgbaColorToRGBA(t) {
                if (t.indexOf("rgba(") === 0) {
                    t = t.match(/rgba\(([^)]+)\)/)[1];
                    const c = t.split(/ *, */).map((p, P) => p.slice(-1) === "%" ? P === 3 ? parseInt(p) / 100 : parseInt(p) / 100 * 255 : Number(p));
                    return {
                        r: c[0],
                        g: c[1],
                        b: c[2],
                        a: c[3]
                    }
                }
            },
            _hex8ColorToRGBA(t) {
                if (t[0] === "#" && t.length === 9) return {
                    r: parseInt(t.slice(1, 3), 16),
                    g: parseInt(t.slice(3, 5), 16),
                    b: parseInt(t.slice(5, 7), 16),
                    a: parseInt(t.slice(7, 9), 16) / 255
                }
            },
            _hex6ColorToRGBA(t) {
                if (t[0] === "#" && t.length === 7) return {
                    r: parseInt(t.slice(1, 3), 16),
                    g: parseInt(t.slice(3, 5), 16),
                    b: parseInt(t.slice(5, 7), 16),
                    a: 1
                }
            },
            _hex4ColorToRGBA(t) {
                if (t[0] === "#" && t.length === 5) return {
                    r: parseInt(t[1] + t[1], 16),
                    g: parseInt(t[2] + t[2], 16),
                    b: parseInt(t[3] + t[3], 16),
                    a: parseInt(t[4] + t[4], 16) / 255
                }
            },
            _hex3ColorToRGBA(t) {
                if (t[0] === "#" && t.length === 4) return {
                    r: parseInt(t[1] + t[1], 16),
                    g: parseInt(t[2] + t[2], 16),
                    b: parseInt(t[3] + t[3], 16),
                    a: 1
                }
            },
            _hslColorToRGBA(t) {
                if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(t)) {
                    const [c, ...p] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t), P = Number(p[0]) / 360, G = Number(p[1]) / 100, y = Number(p[2]) / 100;
                    let b, S, k;
                    if (G === 0) return k = y * 255, {
                        r: Math.round(k),
                        g: Math.round(k),
                        b: Math.round(k),
                        a: 1
                    };
                    y < .5 ? b = y * (1 + G) : b = y + G - y * G;
                    const N = 2 * y - b,
                        D = [0, 0, 0];
                    for (let I = 0; I < 3; I++) S = P + 1 / 3 * -(I - 1), S < 0 && S++, S > 1 && S--, 6 * S < 1 ? k = N + (b - N) * 6 * S : 2 * S < 1 ? k = b : 3 * S < 2 ? k = N + (b - N) * (2 / 3 - S) * 6 : k = N, D[I] = k * 255;
                    return {
                        r: Math.round(D[0]),
                        g: Math.round(D[1]),
                        b: Math.round(D[2]),
                        a: 1
                    }
                }
            },
            haveIntersection(t, c) {
                return !(c.x > t.x + t.width || c.x + c.width < t.x || c.y > t.y + t.height || c.y + c.height < t.y)
            },
            cloneObject(t) {
                const c = {};
                for (const p in t) this._isPlainObject(t[p]) ? c[p] = this.cloneObject(t[p]) : this._isArray(t[p]) ? c[p] = this.cloneArray(t[p]) : c[p] = t[p];
                return c
            },
            cloneArray(t) {
                return t.slice(0)
            },
            degToRad(t) {
                return t * e
            },
            radToDeg(t) {
                return t * a
            },
            _degToRad(t) {
                return g.Util.warn("Util._degToRad is removed. Please use public Util.degToRad instead."), g.Util.degToRad(t)
            },
            _radToDeg(t) {
                return g.Util.warn("Util._radToDeg is removed. Please use public Util.radToDeg instead."), g.Util.radToDeg(t)
            },
            _getRotation(t) {
                return C.Konva.angleDeg ? g.Util.radToDeg(t) : t
            },
            _capitalize(t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            },
            throw (t) {
                throw new Error(n + t)
            },
            error(t) {
                console.error(n + t)
            },
            warn(t) {
                C.Konva.showWarnings && console.warn(l + t)
            },
            each(t, c) {
                for (const p in t) c(p, t[p])
            },
            _inRange(t, c, p) {
                return c <= t && t < p
            },
            _getProjectionToSegment(t, c, p, P, G, y) {
                let b, S, k;
                const N = (t - p) * (t - p) + (c - P) * (c - P);
                if (N == 0) b = t, S = c, k = (G - p) * (G - p) + (y - P) * (y - P);
                else {
                    const D = ((G - t) * (p - t) + (y - c) * (P - c)) / N;
                    D < 0 ? (b = t, S = c, k = (t - G) * (t - G) + (c - y) * (c - y)) : D > 1 ? (b = p, S = P, k = (p - G) * (p - G) + (P - y) * (P - y)) : (b = t + D * (p - t), S = c + D * (P - c), k = (b - G) * (b - G) + (S - y) * (S - y))
                }
                return [b, S, k]
            },
            _getProjectionToLine(t, c, p) {
                const P = g.Util.cloneObject(t);
                let G = Number.MAX_VALUE;
                return c.forEach(function(y, b) {
                    if (!p && b === c.length - 1) return;
                    const S = c[(b + 1) % c.length],
                        k = g.Util._getProjectionToSegment(y.x, y.y, S.x, S.y, t.x, t.y),
                        N = k[0],
                        D = k[1],
                        I = k[2];
                    I < G && (P.x = N, P.y = D, G = I)
                }), P
            },
            _prepareArrayForTween(t, c, p) {
                const P = [],
                    G = [];
                if (t.length > c.length) {
                    const b = c;
                    c = t, t = b
                }
                for (let b = 0; b < t.length; b += 2) P.push({
                    x: t[b],
                    y: t[b + 1]
                });
                for (let b = 0; b < c.length; b += 2) G.push({
                    x: c[b],
                    y: c[b + 1]
                });
                const y = [];
                return G.forEach(function(b) {
                    const S = g.Util._getProjectionToLine(b, P, p);
                    y.push(S.x), y.push(S.y)
                }), y
            },
            _prepareToStringify(t) {
                let c;
                t.visitedByCircularReferenceRemoval = !0;
                for (const p in t)
                    if (t.hasOwnProperty(p) && t[p] && typeof t[p] == "object") {
                        if (c = Object.getOwnPropertyDescriptor(t, p), t[p].visitedByCircularReferenceRemoval || g.Util._isElement(t[p]))
                            if (c.configurable) delete t[p];
                            else return null;
                        else if (g.Util._prepareToStringify(t[p]) === null)
                            if (c.configurable) delete t[p];
                            else return null
                    }
                return delete t.visitedByCircularReferenceRemoval, t
            },
            _assign(t, c) {
                for (const p in c) t[p] = c[p];
                return t
            },
            _getFirstPointerId(t) {
                return t.touches ? t.changedTouches[0].identifier : t.pointerId || 999
            },
            releaseCanvas(...t) {
                C.Konva.releaseCanvasOnDestroy && t.forEach(c => {
                    c.width = 0, c.height = 0
                })
            },
            drawRoundedRectPath(t, c, p, P) {
                let G = 0,
                    y = 0,
                    b = 0,
                    S = 0;
                typeof P == "number" ? G = y = b = S = Math.min(P, c / 2, p / 2) : (G = Math.min(P[0] || 0, c / 2, p / 2), y = Math.min(P[1] || 0, c / 2, p / 2), S = Math.min(P[2] || 0, c / 2, p / 2), b = Math.min(P[3] || 0, c / 2, p / 2)), t.moveTo(G, 0), t.lineTo(c - y, 0), t.arc(c - y, y, y, Math.PI * 3 / 2, 0, !1), t.lineTo(c, p - S), t.arc(c - S, p - S, S, 0, Math.PI / 2, !1), t.lineTo(b, p), t.arc(b, p - b, b, Math.PI / 2, Math.PI, !1), t.lineTo(0, G), t.arc(G, G, G, Math.PI, Math.PI * 3 / 2, !1)
            }
        }
    })(xe)), xe
}
var Ft = {},
    vt = {},
    bt = {},
    Ve;

function $i() {
    if (Ve) return bt;
    Ve = 1, Object.defineProperty(bt, "__esModule", {
        value: !0
    }), bt.HitContext = bt.SceneContext = bt.Context = void 0;
    const g = rt(),
        C = Q();

    function M(w) {
        const i = [],
            t = w.length,
            c = g.Util;
        for (let p = 0; p < t; p++) {
            let P = w[p];
            c._isNumber(P) ? P = Math.round(P * 1e3) / 1e3 : c._isString(P) || (P = P + ""), i.push(P)
        }
        return i
    }
    const T = ",",
        v = "(",
        f = ")",
        s = "([",
        e = "])",
        a = ";",
        h = "()",
        o = "=",
        _ = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createPattern", "createRadialGradient", "drawImage", "ellipse", "fill", "fillText", "getImageData", "createImageData", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "roundRect", "restore", "rotate", "save", "scale", "setLineDash", "setTransform", "stroke", "strokeText", "transform", "translate"],
        l = ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "letterSpacing", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "direction", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation", "imageSmoothingEnabled"],
        n = 100;
    let r = class {
        constructor(i) {
            this.canvas = i, C.Konva.enableTrace && (this.traceArr = [], this._enableTrace())
        }
        fillShape(i) {
            i.fillEnabled() && this._fill(i)
        }
        _fill(i) {}
        strokeShape(i) {
            i.hasStroke() && this._stroke(i)
        }
        _stroke(i) {}
        fillStrokeShape(i) {
            i.attrs.fillAfterStrokeEnabled ? (this.strokeShape(i), this.fillShape(i)) : (this.fillShape(i), this.strokeShape(i))
        }
        getTrace(i, t) {
            let c = this.traceArr,
                p = c.length,
                P = "",
                G, y, b, S;
            for (G = 0; G < p; G++) y = c[G], b = y.method, b ? (S = y.args, P += b, i ? P += h : g.Util._isArray(S[0]) ? P += s + S.join(T) + e : (t && (S = S.map(k => typeof k == "number" ? Math.floor(k) : k)), P += v + S.join(T) + f)) : (P += y.property, i || (P += o + y.val)), P += a;
            return P
        }
        clearTrace() {
            this.traceArr = []
        }
        _trace(i) {
            let t = this.traceArr,
                c;
            t.push(i), c = t.length, c >= n && t.shift()
        }
        reset() {
            const i = this.getCanvas().getPixelRatio();
            this.setTransform(1 * i, 0, 0, 1 * i, 0, 0)
        }
        getCanvas() {
            return this.canvas
        }
        clear(i) {
            const t = this.getCanvas();
            i ? this.clearRect(i.x || 0, i.y || 0, i.width || 0, i.height || 0) : this.clearRect(0, 0, t.getWidth() / t.pixelRatio, t.getHeight() / t.pixelRatio)
        }
        _applyLineCap(i) {
            const t = i.attrs.lineCap;
            t && this.setAttr("lineCap", t)
        }
        _applyOpacity(i) {
            const t = i.getAbsoluteOpacity();
            t !== 1 && this.setAttr("globalAlpha", t)
        }
        _applyLineJoin(i) {
            const t = i.attrs.lineJoin;
            t && this.setAttr("lineJoin", t)
        }
        setAttr(i, t) {
            this._context[i] = t
        }
        arc(i, t, c, p, P, G) {
            this._context.arc(i, t, c, p, P, G)
        }
        arcTo(i, t, c, p, P) {
            this._context.arcTo(i, t, c, p, P)
        }
        beginPath() {
            this._context.beginPath()
        }
        bezierCurveTo(i, t, c, p, P, G) {
            this._context.bezierCurveTo(i, t, c, p, P, G)
        }
        clearRect(i, t, c, p) {
            this._context.clearRect(i, t, c, p)
        }
        clip(...i) {
            this._context.clip.apply(this._context, i)
        }
        closePath() {
            this._context.closePath()
        }
        createImageData(i, t) {
            const c = arguments;
            if (c.length === 2) return this._context.createImageData(i, t);
            if (c.length === 1) return this._context.createImageData(i)
        }
        createLinearGradient(i, t, c, p) {
            return this._context.createLinearGradient(i, t, c, p)
        }
        createPattern(i, t) {
            return this._context.createPattern(i, t)
        }
        createRadialGradient(i, t, c, p, P, G) {
            return this._context.createRadialGradient(i, t, c, p, P, G)
        }
        drawImage(i, t, c, p, P, G, y, b, S) {
            const k = arguments,
                N = this._context;
            k.length === 3 ? N.drawImage(i, t, c) : k.length === 5 ? N.drawImage(i, t, c, p, P) : k.length === 9 && N.drawImage(i, t, c, p, P, G, y, b, S)
        }
        ellipse(i, t, c, p, P, G, y, b) {
            this._context.ellipse(i, t, c, p, P, G, y, b)
        }
        isPointInPath(i, t, c, p) {
            return c ? this._context.isPointInPath(c, i, t, p) : this._context.isPointInPath(i, t, p)
        }
        fill(...i) {
            this._context.fill.apply(this._context, i)
        }
        fillRect(i, t, c, p) {
            this._context.fillRect(i, t, c, p)
        }
        strokeRect(i, t, c, p) {
            this._context.strokeRect(i, t, c, p)
        }
        fillText(i, t, c, p) {
            p ? this._context.fillText(i, t, c, p) : this._context.fillText(i, t, c)
        }
        measureText(i) {
            return this._context.measureText(i)
        }
        getImageData(i, t, c, p) {
            return this._context.getImageData(i, t, c, p)
        }
        lineTo(i, t) {
            this._context.lineTo(i, t)
        }
        moveTo(i, t) {
            this._context.moveTo(i, t)
        }
        rect(i, t, c, p) {
            this._context.rect(i, t, c, p)
        }
        roundRect(i, t, c, p, P) {
            this._context.roundRect(i, t, c, p, P)
        }
        putImageData(i, t, c) {
            this._context.putImageData(i, t, c)
        }
        quadraticCurveTo(i, t, c, p) {
            this._context.quadraticCurveTo(i, t, c, p)
        }
        restore() {
            this._context.restore()
        }
        rotate(i) {
            this._context.rotate(i)
        }
        save() {
            this._context.save()
        }
        scale(i, t) {
            this._context.scale(i, t)
        }
        setLineDash(i) {
            this._context.setLineDash ? this._context.setLineDash(i) : "mozDash" in this._context ? this._context.mozDash = i : "webkitLineDash" in this._context && (this._context.webkitLineDash = i)
        }
        getLineDash() {
            return this._context.getLineDash()
        }
        setTransform(i, t, c, p, P, G) {
            this._context.setTransform(i, t, c, p, P, G)
        }
        stroke(i) {
            i ? this._context.stroke(i) : this._context.stroke()
        }
        strokeText(i, t, c, p) {
            this._context.strokeText(i, t, c, p)
        }
        transform(i, t, c, p, P, G) {
            this._context.transform(i, t, c, p, P, G)
        }
        translate(i, t) {
            this._context.translate(i, t)
        }
        _enableTrace() {
            let i = this,
                t = _.length,
                c = this.setAttr,
                p, P;
            const G = function(y) {
                let b = i[y],
                    S;
                i[y] = function() {
                    return P = M(Array.prototype.slice.call(arguments, 0)), S = b.apply(i, arguments), i._trace({
                        method: y,
                        args: P
                    }), S
                }
            };
            for (p = 0; p < t; p++) G(_[p]);
            i.setAttr = function() {
                c.apply(i, arguments);
                const y = arguments[0];
                let b = arguments[1];
                (y === "shadowOffsetX" || y === "shadowOffsetY" || y === "shadowBlur") && (b = b / this.canvas.getPixelRatio()), i._trace({
                    property: y,
                    val: b
                })
            }
        }
        _applyGlobalCompositeOperation(i) {
            const t = i.attrs.globalCompositeOperation;
            !t || t === "source-over" || this.setAttr("globalCompositeOperation", t)
        }
    };
    bt.Context = r, l.forEach(function(w) {
        Object.defineProperty(r.prototype, w, {
            get() {
                return this._context[w]
            },
            set(i) {
                this._context[w] = i
            }
        })
    });
    class d extends r {
        constructor(i, {
            willReadFrequently: t = !1
        } = {}) {
            super(i), this._context = i._canvas.getContext("2d", {
                willReadFrequently: t
            })
        }
        _fillColor(i) {
            const t = i.fill();
            this.setAttr("fillStyle", t), i._fillFunc(this)
        }
        _fillPattern(i) {
            this.setAttr("fillStyle", i._getFillPattern()), i._fillFunc(this)
        }
        _fillLinearGradient(i) {
            const t = i._getLinearGradient();
            t && (this.setAttr("fillStyle", t), i._fillFunc(this))
        }
        _fillRadialGradient(i) {
            const t = i._getRadialGradient();
            t && (this.setAttr("fillStyle", t), i._fillFunc(this))
        }
        _fill(i) {
            const t = i.fill(),
                c = i.getFillPriority();
            if (t && c === "color") {
                this._fillColor(i);
                return
            }
            const p = i.getFillPatternImage();
            if (p && c === "pattern") {
                this._fillPattern(i);
                return
            }
            const P = i.getFillLinearGradientColorStops();
            if (P && c === "linear-gradient") {
                this._fillLinearGradient(i);
                return
            }
            const G = i.getFillRadialGradientColorStops();
            if (G && c === "radial-gradient") {
                this._fillRadialGradient(i);
                return
            }
            t ? this._fillColor(i) : p ? this._fillPattern(i) : P ? this._fillLinearGradient(i) : G && this._fillRadialGradient(i)
        }
        _strokeLinearGradient(i) {
            const t = i.getStrokeLinearGradientStartPoint(),
                c = i.getStrokeLinearGradientEndPoint(),
                p = i.getStrokeLinearGradientColorStops(),
                P = this.createLinearGradient(t.x, t.y, c.x, c.y);
            if (p) {
                for (let G = 0; G < p.length; G += 2) P.addColorStop(p[G], p[G + 1]);
                this.setAttr("strokeStyle", P)
            }
        }
        _stroke(i) {
            const t = i.dash(),
                c = i.getStrokeScaleEnabled();
            if (i.hasStroke()) {
                if (!c) {
                    this.save();
                    const P = this.getCanvas().getPixelRatio();
                    this.setTransform(P, 0, 0, P, 0, 0)
                }
                this._applyLineCap(i), t && i.dashEnabled() && (this.setLineDash(t), this.setAttr("lineDashOffset", i.dashOffset())), this.setAttr("lineWidth", i.strokeWidth()), i.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)"), i.getStrokeLinearGradientColorStops() ? this._strokeLinearGradient(i) : this.setAttr("strokeStyle", i.stroke()), i._strokeFunc(this), c || this.restore()
            }
        }
        _applyShadow(i) {
            var t, c, p;
            const P = (t = i.getShadowRGBA()) !== null && t !== void 0 ? t : "black",
                G = (c = i.getShadowBlur()) !== null && c !== void 0 ? c : 5,
                y = (p = i.getShadowOffset()) !== null && p !== void 0 ? p : {
                    x: 0,
                    y: 0
                },
                b = i.getAbsoluteScale(),
                S = this.canvas.getPixelRatio(),
                k = b.x * S,
                N = b.y * S;
            this.setAttr("shadowColor", P), this.setAttr("shadowBlur", G * Math.min(Math.abs(k), Math.abs(N))), this.setAttr("shadowOffsetX", y.x * k), this.setAttr("shadowOffsetY", y.y * N)
        }
    }
    bt.SceneContext = d;
    class m extends r {
        constructor(i) {
            super(i), this._context = i._canvas.getContext("2d", {
                willReadFrequently: !0
            })
        }
        _fill(i) {
            this.save(), this.setAttr("fillStyle", i.colorKey), i._fillFuncHit(this), this.restore()
        }
        strokeShape(i) {
            i.hasHitStroke() && this._stroke(i)
        }
        _stroke(i) {
            if (i.hasHitStroke()) {
                const t = i.getStrokeScaleEnabled();
                if (!t) {
                    this.save();
                    const P = this.getCanvas().getPixelRatio();
                    this.setTransform(P, 0, 0, P, 0, 0)
                }
                this._applyLineCap(i);
                const c = i.hitStrokeWidth(),
                    p = c === "auto" ? i.strokeWidth() : c;
                this.setAttr("lineWidth", p), this.setAttr("strokeStyle", i.colorKey), i._strokeFuncHit(this), t || this.restore()
            }
        }
    }
    return bt.HitContext = m, bt
}
var He;

function be() {
    if (He) return vt;
    He = 1, Object.defineProperty(vt, "__esModule", {
        value: !0
    }), vt.HitCanvas = vt.SceneCanvas = vt.Canvas = void 0;
    const g = rt(),
        C = $i(),
        M = Q();
    let T;

    function v() {
        if (T) return T;
        const a = g.Util.createCanvasElement(),
            h = a.getContext("2d");
        return T = (function() {
            const o = M.Konva._global.devicePixelRatio || 1,
                _ = h.webkitBackingStorePixelRatio || h.mozBackingStorePixelRatio || h.msBackingStorePixelRatio || h.oBackingStorePixelRatio || h.backingStorePixelRatio || 1;
            return o / _
        })(), g.Util.releaseCanvas(a), T
    }
    let f = class {
        constructor(h) {
            this.pixelRatio = 1, this.width = 0, this.height = 0, this.isCache = !1;
            const _ = (h || {}).pixelRatio || M.Konva.pixelRatio || v();
            this.pixelRatio = _, this._canvas = g.Util.createCanvasElement(), this._canvas.style.padding = "0", this._canvas.style.margin = "0", this._canvas.style.border = "0", this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = "0", this._canvas.style.left = "0"
        }
        getContext() {
            return this.context
        }
        getPixelRatio() {
            return this.pixelRatio
        }
        setPixelRatio(h) {
            const o = this.pixelRatio;
            this.pixelRatio = h, this.setSize(this.getWidth() / o, this.getHeight() / o)
        }
        setWidth(h) {
            this.width = this._canvas.width = h * this.pixelRatio, this._canvas.style.width = h + "px";
            const o = this.pixelRatio;
            this.getContext()._context.scale(o, o)
        }
        setHeight(h) {
            this.height = this._canvas.height = h * this.pixelRatio, this._canvas.style.height = h + "px";
            const o = this.pixelRatio;
            this.getContext()._context.scale(o, o)
        }
        getWidth() {
            return this.width
        }
        getHeight() {
            return this.height
        }
        setSize(h, o) {
            this.setWidth(h || 0), this.setHeight(o || 0)
        }
        toDataURL(h, o) {
            try {
                return this._canvas.toDataURL(h, o)
            } catch {
                try {
                    return this._canvas.toDataURL()
                } catch (l) {
                    return g.Util.error("Unable to get data URL. " + l.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."), ""
                }
            }
        }
    };
    vt.Canvas = f;
    class s extends f {
        constructor(h = {
            width: 0,
            height: 0,
            willReadFrequently: !1
        }) {
            super(h), this.context = new C.SceneContext(this, {
                willReadFrequently: h.willReadFrequently
            }), this.setSize(h.width, h.height)
        }
    }
    vt.SceneCanvas = s;
    class e extends f {
        constructor(h = {
            width: 0,
            height: 0
        }) {
            super(h), this.hitCanvas = !0, this.context = new C.HitContext(this), this.setSize(h.width, h.height)
        }
    }
    return vt.HitCanvas = e, vt
}
var Pe = {},
    qe;

function Ge() {
    return qe || (qe = 1, (function(g) {
        Object.defineProperty(g, "__esModule", {
            value: !0
        }), g.DD = void 0;
        const C = Q(),
            M = rt();
        g.DD = {
            get isDragging() {
                let T = !1;
                return g.DD._dragElements.forEach(v => {
                    v.dragStatus === "dragging" && (T = !0)
                }), T
            },
            justDragged: !1,
            get node() {
                let T;
                return g.DD._dragElements.forEach(v => {
                    T = v.node
                }), T
            },
            _dragElements: new Map,
            _drag(T) {
                const v = [];
                g.DD._dragElements.forEach((f, s) => {
                    const {
                        node: e
                    } = f, a = e.getStage();
                    a.setPointersPositions(T), f.pointerId === void 0 && (f.pointerId = M.Util._getFirstPointerId(T));
                    const h = a._changedPointerPositions.find(o => o.id === f.pointerId);
                    if (h) {
                        if (f.dragStatus !== "dragging") {
                            const o = e.dragDistance();
                            if (Math.max(Math.abs(h.x - f.startPointerPos.x), Math.abs(h.y - f.startPointerPos.y)) < o || (e.startDrag({
                                    evt: T
                                }), !e.isDragging())) return
                        }
                        e._setDragPosition(T, f), v.push(e)
                    }
                }), v.forEach(f => {
                    f.fire("dragmove", {
                        type: "dragmove",
                        target: f,
                        evt: T
                    }, !0)
                })
            },
            _endDragBefore(T) {
                const v = [];
                g.DD._dragElements.forEach(f => {
                    const {
                        node: s
                    } = f, e = s.getStage();
                    if (T && e.setPointersPositions(T), !e._changedPointerPositions.find(o => o.id === f.pointerId)) return;
                    (f.dragStatus === "dragging" || f.dragStatus === "stopped") && (g.DD.justDragged = !0, C.Konva._mouseListenClick = !1, C.Konva._touchListenClick = !1, C.Konva._pointerListenClick = !1, f.dragStatus = "stopped");
                    const h = f.node.getLayer() || f.node instanceof C.Konva.Stage && f.node;
                    h && v.indexOf(h) === -1 && v.push(h)
                }), v.forEach(f => {
                    f.draw()
                })
            },
            _endDragAfter(T) {
                g.DD._dragElements.forEach((v, f) => {
                    v.dragStatus === "stopped" && v.node.fire("dragend", {
                        type: "dragend",
                        target: v.node,
                        evt: T
                    }, !0), v.dragStatus !== "dragging" && g.DD._dragElements.delete(f)
                })
            }
        }, C.Konva.isBrowser && (window.addEventListener("mouseup", g.DD._endDragBefore, !0), window.addEventListener("touchend", g.DD._endDragBefore, !0), window.addEventListener("touchcancel", g.DD._endDragBefore, !0), window.addEventListener("mousemove", g.DD._drag), window.addEventListener("touchmove", g.DD._drag), window.addEventListener("mouseup", g.DD._endDragAfter, !1), window.addEventListener("touchend", g.DD._endDragAfter, !1), window.addEventListener("touchcancel", g.DD._endDragAfter, !1))
    })(Pe)), Pe
}
var Te = {},
    ut = {},
    We;

function Z() {
    if (We) return ut;
    We = 1, Object.defineProperty(ut, "__esModule", {
        value: !0
    }), ut.RGBComponent = T, ut.alphaComponent = v, ut.getNumberValidator = f, ut.getNumberOrArrayOfNumbersValidator = s, ut.getNumberOrAutoValidator = e, ut.getStringValidator = a, ut.getStringOrGradientValidator = h, ut.getFunctionValidator = o, ut.getNumberArrayValidator = _, ut.getBooleanValidator = l, ut.getComponentValidator = n;
    const g = Q(),
        C = rt();

    function M(r) {
        return C.Util._isString(r) ? '"' + r + '"' : Object.prototype.toString.call(r) === "[object Number]" || C.Util._isBoolean(r) ? r : Object.prototype.toString.call(r)
    }

    function T(r) {
        return r > 255 ? 255 : r < 0 ? 0 : Math.round(r)
    }

    function v(r) {
        return r > 1 ? 1 : r < 1e-4 ? 1e-4 : r
    }

    function f() {
        if (g.Konva.isUnminified) return function(r, d) {
            return C.Util._isNumber(r) || C.Util.warn(M(r) + ' is a not valid value for "' + d + '" attribute. The value should be a number.'), r
        }
    }

    function s(r) {
        if (g.Konva.isUnminified) return function(d, m) {
            let w = C.Util._isNumber(d),
                i = C.Util._isArray(d) && d.length == r;
            return !w && !i && C.Util.warn(M(d) + ' is a not valid value for "' + m + '" attribute. The value should be a number or Array<number>(' + r + ")"), d
        }
    }

    function e() {
        if (g.Konva.isUnminified) return function(r, d) {
            return C.Util._isNumber(r) || r === "auto" || C.Util.warn(M(r) + ' is a not valid value for "' + d + '" attribute. The value should be a number or "auto".'), r
        }
    }

    function a() {
        if (g.Konva.isUnminified) return function(r, d) {
            return C.Util._isString(r) || C.Util.warn(M(r) + ' is a not valid value for "' + d + '" attribute. The value should be a string.'), r
        }
    }

    function h() {
        if (g.Konva.isUnminified) return function(r, d) {
            const m = C.Util._isString(r),
                w = Object.prototype.toString.call(r) === "[object CanvasGradient]" || r && r.addColorStop;
            return m || w || C.Util.warn(M(r) + ' is a not valid value for "' + d + '" attribute. The value should be a string or a native gradient.'), r
        }
    }

    function o() {
        if (g.Konva.isUnminified) return function(r, d) {
            return C.Util._isFunction(r) || C.Util.warn(M(r) + ' is a not valid value for "' + d + '" attribute. The value should be a function.'), r
        }
    }

    function _() {
        if (g.Konva.isUnminified) return function(r, d) {
            const m = Int8Array ? Object.getPrototypeOf(Int8Array) : null;
            return m && r instanceof m || (C.Util._isArray(r) ? r.forEach(function(w) {
                C.Util._isNumber(w) || C.Util.warn('"' + d + '" attribute has non numeric element ' + w + ". Make sure that all elements are numbers.")
            }) : C.Util.warn(M(r) + ' is a not valid value for "' + d + '" attribute. The value should be a array of numbers.')), r
        }
    }

    function l() {
        if (g.Konva.isUnminified) return function(r, d) {
            return r === !0 || r === !1 || C.Util.warn(M(r) + ' is a not valid value for "' + d + '" attribute. The value should be a boolean.'), r
        }
    }

    function n(r) {
        if (g.Konva.isUnminified) return function(d, m) {
            return d == null || C.Util.isObject(d) || C.Util.warn(M(d) + ' is a not valid value for "' + m + '" attribute. The value should be an object with properties ' + r), d
        }
    }
    return ut
}
var ze;

function J() {
    return ze || (ze = 1, (function(g) {
        Object.defineProperty(g, "__esModule", {
            value: !0
        }), g.Factory = void 0;
        const C = rt(),
            M = Z(),
            T = "get",
            v = "set";
        g.Factory = {
            addGetterSetter(f, s, e, a, h) {
                g.Factory.addGetter(f, s, e), g.Factory.addSetter(f, s, a, h), g.Factory.addOverloadedGetterSetter(f, s)
            },
            addGetter(f, s, e) {
                const a = T + C.Util._capitalize(s);
                f.prototype[a] = f.prototype[a] || function() {
                    const h = this.attrs[s];
                    return h === void 0 ? e : h
                }
            },
            addSetter(f, s, e, a) {
                const h = v + C.Util._capitalize(s);
                f.prototype[h] || g.Factory.overWriteSetter(f, s, e, a)
            },
            overWriteSetter(f, s, e, a) {
                const h = v + C.Util._capitalize(s);
                f.prototype[h] = function(o) {
                    return e && o !== void 0 && o !== null && (o = e.call(this, o, s)), this._setAttr(s, o), a && a.call(this), this
                }
            },
            addComponentsGetterSetter(f, s, e, a, h) {
                const o = e.length,
                    _ = C.Util._capitalize,
                    l = T + _(s),
                    n = v + _(s);
                f.prototype[l] = function() {
                    const d = {};
                    for (let m = 0; m < o; m++) {
                        const w = e[m];
                        d[w] = this.getAttr(s + _(w))
                    }
                    return d
                };
                const r = (0, M.getComponentValidator)(e);
                f.prototype[n] = function(d) {
                    const m = this.attrs[s];
                    a && (d = a.call(this, d, s)), r && r.call(this, d, s);
                    for (const w in d) d.hasOwnProperty(w) && this._setAttr(s + _(w), d[w]);
                    return d || e.forEach(w => {
                        this._setAttr(s + _(w), void 0)
                    }), this._fireChangeEvent(s, m, d), h && h.call(this), this
                }, g.Factory.addOverloadedGetterSetter(f, s)
            },
            addOverloadedGetterSetter(f, s) {
                const e = C.Util._capitalize(s),
                    a = v + e,
                    h = T + e;
                f.prototype[s] = function() {
                    return arguments.length ? (this[a](arguments[0]), this) : this[h]()
                }
            },
            addDeprecatedGetterSetter(f, s, e, a) {
                C.Util.error("Adding deprecated " + s);
                const h = T + C.Util._capitalize(s),
                    o = s + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
                f.prototype[h] = function() {
                    C.Util.error(o);
                    const _ = this.attrs[s];
                    return _ === void 0 ? e : _
                }, g.Factory.addSetter(f, s, a, function() {
                    C.Util.error(o)
                }), g.Factory.addOverloadedGetterSetter(f, s)
            },
            backCompat(f, s) {
                C.Util.each(s, function(e, a) {
                    const h = f.prototype[a],
                        o = T + C.Util._capitalize(e),
                        _ = v + C.Util._capitalize(e);

                    function l() {
                        h.apply(this, arguments), C.Util.error('"' + e + '" method is deprecated and will be removed soon. Use ""' + a + '" instead.')
                    }
                    f.prototype[e] = l, f.prototype[o] = l, f.prototype[_] = l
                })
            },
            afterSetFilter() {
                this._filterUpToDate = !1
            }
        }
    })(Te)), Te
}
var Ye;

function at() {
    if (Ye) return Ft;
    Ye = 1, Object.defineProperty(Ft, "__esModule", {
        value: !0
    }), Ft.Node = void 0;
    const g = be(),
        C = Ge(),
        M = J(),
        T = Q(),
        v = rt(),
        f = Z(),
        s = "absoluteOpacity",
        e = "allEventListeners",
        a = "absoluteTransform",
        h = "absoluteScale",
        o = "canvas",
        _ = "Change",
        l = "children",
        n = "konva",
        r = "listening",
        d = "mouseenter",
        m = "mouseleave",
        w = "pointerenter",
        i = "pointerleave",
        t = "touchenter",
        c = "touchleave",
        p = "set",
        P = "Shape",
        G = " ",
        y = "stage",
        b = "transform",
        S = "Stage",
        k = "visible",
        N = ["xChange.konva", "yChange.konva", "scaleXChange.konva", "scaleYChange.konva", "skewXChange.konva", "skewYChange.konva", "rotationChange.konva", "offsetXChange.konva", "offsetYChange.konva", "transformsEnabledChange.konva"].join(G);
    let D = 1,
        I = class Me {
            constructor(u) {
                this._id = D++, this.eventListeners = {}, this.attrs = {}, this.index = 0, this._allEventListeners = null, this.parent = null, this._cache = new Map, this._attachedDepsListeners = new Map, this._lastPos = null, this._batchingTransformChange = !1, this._needClearTransformCache = !1, this._filterUpToDate = !1, this._isUnderCache = !1, this._dragEventId = null, this._shouldFireChangeEvents = !1, this.setAttrs(u), this._shouldFireChangeEvents = !0
            }
            hasChildren() {
                return !1
            }
            _clearCache(u) {
                (u === b || u === a) && this._cache.get(u) ? this._cache.get(u).dirty = !0 : u ? this._cache.delete(u) : this._cache.clear()
            }
            _getCache(u, x) {
                let E = this._cache.get(u);
                return (E === void 0 || (u === b || u === a) && E.dirty === !0) && (E = x.call(this), this._cache.set(u, E)), E
            }
            _calculate(u, x, E) {
                if (!this._attachedDepsListeners.get(u)) {
                    const R = x.map(F => F + "Change.konva").join(G);
                    this.on(R, () => {
                        this._clearCache(u)
                    }), this._attachedDepsListeners.set(u, !0)
                }
                return this._getCache(u, E)
            }
            _getCanvasCache() {
                return this._cache.get(o)
            }
            _clearSelfAndDescendantCache(u) {
                this._clearCache(u), u === a && this.fire("absoluteTransformChange")
            }
            clearCache() {
                if (this._cache.has(o)) {
                    const {
                        scene: u,
                        filter: x,
                        hit: E,
                        buffer: R
                    } = this._cache.get(o);
                    v.Util.releaseCanvas(u, x, E, R), this._cache.delete(o)
                }
                return this._clearSelfAndDescendantCache(), this._requestDraw(), this
            }
            cache(u) {
                const x = u || {};
                let E = {};
                (x.x === void 0 || x.y === void 0 || x.width === void 0 || x.height === void 0) && (E = this.getClientRect({
                    skipTransform: !0,
                    relativeTo: this.getParent() || void 0
                }));
                let R = Math.ceil(x.width || E.width),
                    F = Math.ceil(x.height || E.height),
                    V = x.pixelRatio,
                    L = x.x === void 0 ? Math.floor(E.x) : x.x,
                    H = x.y === void 0 ? Math.floor(E.y) : x.y,
                    z = x.offset || 0,
                    B = x.drawBorder || !1,
                    A = x.hitCanvasPixelRatio || 1;
                if (!R || !F) {
                    v.Util.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.");
                    return
                }
                const U = Math.abs(Math.round(E.x) - L) > .5 ? 1 : 0,
                    W = Math.abs(Math.round(E.y) - H) > .5 ? 1 : 0;
                R += z * 2 + U, F += z * 2 + W, L -= z, H -= z;
                const Y = new g.SceneCanvas({
                        pixelRatio: V,
                        width: R,
                        height: F
                    }),
                    K = new g.SceneCanvas({
                        pixelRatio: V,
                        width: 0,
                        height: 0,
                        willReadFrequently: !0
                    }),
                    X = new g.HitCanvas({
                        pixelRatio: A,
                        width: R,
                        height: F
                    }),
                    $ = Y.getContext(),
                    tt = X.getContext(),
                    j = new g.SceneCanvas({
                        width: Y.width / Y.pixelRatio + Math.abs(L),
                        height: Y.height / Y.pixelRatio + Math.abs(H),
                        pixelRatio: Y.pixelRatio
                    }),
                    ht = j.getContext();
                return X.isCache = !0, Y.isCache = !0, this._cache.delete(o), this._filterUpToDate = !1, x.imageSmoothingEnabled === !1 && (Y.getContext()._context.imageSmoothingEnabled = !1, K.getContext()._context.imageSmoothingEnabled = !1), $.save(), tt.save(), ht.save(), $.translate(-L, -H), tt.translate(-L, -H), ht.translate(-L, -H), j.x = L, j.y = H, this._isUnderCache = !0, this._clearSelfAndDescendantCache(s), this._clearSelfAndDescendantCache(h), this.drawScene(Y, this, j), this.drawHit(X, this), this._isUnderCache = !1, $.restore(), tt.restore(), B && ($.save(), $.beginPath(), $.rect(0, 0, R, F), $.closePath(), $.setAttr("strokeStyle", "red"), $.setAttr("lineWidth", 5), $.stroke(), $.restore()), this._cache.set(o, {
                    scene: Y,
                    filter: K,
                    hit: X,
                    buffer: j,
                    x: L,
                    y: H
                }), this._requestDraw(), this
            }
            isCached() {
                return this._cache.has(o)
            }
            getClientRect(u) {
                throw new Error('abstract "getClientRect" method call')
            }
            _transformedRect(u, x) {
                const E = [{
                    x: u.x,
                    y: u.y
                }, {
                    x: u.x + u.width,
                    y: u.y
                }, {
                    x: u.x + u.width,
                    y: u.y + u.height
                }, {
                    x: u.x,
                    y: u.y + u.height
                }];
                let R = 1 / 0,
                    F = 1 / 0,
                    V = -1 / 0,
                    L = -1 / 0;
                const H = this.getAbsoluteTransform(x);
                return E.forEach(function(z) {
                    const B = H.point(z);
                    R === void 0 && (R = V = B.x, F = L = B.y), R = Math.min(R, B.x), F = Math.min(F, B.y), V = Math.max(V, B.x), L = Math.max(L, B.y)
                }), {
                    x: R,
                    y: F,
                    width: V - R,
                    height: L - F
                }
            }
            _drawCachedSceneCanvas(u) {
                u.save(), u._applyOpacity(this), u._applyGlobalCompositeOperation(this);
                const x = this._getCanvasCache();
                u.translate(x.x, x.y);
                const E = this._getCachedSceneCanvas(),
                    R = E.pixelRatio;
                u.drawImage(E._canvas, 0, 0, E.width / R, E.height / R), u.restore()
            }
            _drawCachedHitCanvas(u) {
                const x = this._getCanvasCache(),
                    E = x.hit;
                u.save(), u.translate(x.x, x.y), u.drawImage(E._canvas, 0, 0, E.width / E.pixelRatio, E.height / E.pixelRatio), u.restore()
            }
            _getCachedSceneCanvas() {
                let u = this.filters(),
                    x = this._getCanvasCache(),
                    E = x.scene,
                    R = x.filter,
                    F = R.getContext(),
                    V, L, H, z;
                if (u) {
                    if (!this._filterUpToDate) {
                        const B = E.pixelRatio;
                        R.setSize(E.width / E.pixelRatio, E.height / E.pixelRatio);
                        try {
                            for (V = u.length, F.clear(), F.drawImage(E._canvas, 0, 0, E.getWidth() / B, E.getHeight() / B), L = F.getImageData(0, 0, R.getWidth(), R.getHeight()), H = 0; H < V; H++) {
                                if (z = u[H], typeof z != "function") {
                                    v.Util.error("Filter should be type of function, but got " + typeof z + " instead. Please check correct filters");
                                    continue
                                }
                                z.call(this, L), F.putImageData(L, 0, 0)
                            }
                        } catch (A) {
                            v.Util.error("Unable to apply filter. " + A.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.")
                        }
                        this._filterUpToDate = !0
                    }
                    return R
                }
                return E
            }
            on(u, x) {
                if (this._cache && this._cache.delete(e), arguments.length === 3) return this._delegate.apply(this, arguments);
                const E = u.split(G);
                for (let R = 0; R < E.length; R++) {
                    const V = E[R].split("."),
                        L = V[0],
                        H = V[1] || "";
                    this.eventListeners[L] || (this.eventListeners[L] = []), this.eventListeners[L].push({
                        name: H,
                        handler: x
                    })
                }
                return this
            }
            off(u, x) {
                let E = (u || "").split(G),
                    R = E.length,
                    F, V, L, H, z, B;
                if (this._cache && this._cache.delete(e), !u)
                    for (V in this.eventListeners) this._off(V);
                for (F = 0; F < R; F++)
                    if (L = E[F], H = L.split("."), z = H[0], B = H[1], z) this.eventListeners[z] && this._off(z, B, x);
                    else
                        for (V in this.eventListeners) this._off(V, B, x);
                return this
            }
            dispatchEvent(u) {
                const x = {
                    target: this,
                    type: u.type,
                    evt: u
                };
                return this.fire(u.type, x), this
            }
            addEventListener(u, x) {
                return this.on(u, function(E) {
                    x.call(this, E.evt)
                }), this
            }
            removeEventListener(u) {
                return this.off(u), this
            }
            _delegate(u, x, E) {
                const R = this;
                this.on(u, function(F) {
                    const V = F.target.findAncestors(x, !0, R);
                    for (let L = 0; L < V.length; L++) F = v.Util.cloneObject(F), F.currentTarget = V[L], E.call(V[L], F)
                })
            }
            remove() {
                return this.isDragging() && this.stopDrag(), C.DD._dragElements.delete(this._id), this._remove(), this
            }
            _clearCaches() {
                this._clearSelfAndDescendantCache(a), this._clearSelfAndDescendantCache(s), this._clearSelfAndDescendantCache(h), this._clearSelfAndDescendantCache(y), this._clearSelfAndDescendantCache(k), this._clearSelfAndDescendantCache(r)
            }
            _remove() {
                this._clearCaches();
                const u = this.getParent();
                u && u.children && (u.children.splice(this.index, 1), u._setChildrenIndices(), this.parent = null)
            }
            destroy() {
                return this.remove(), this.clearCache(), this
            }
            getAttr(u) {
                const x = "get" + v.Util._capitalize(u);
                return v.Util._isFunction(this[x]) ? this[x]() : this.attrs[u]
            }
            getAncestors() {
                let u = this.getParent(),
                    x = [];
                for (; u;) x.push(u), u = u.getParent();
                return x
            }
            getAttrs() {
                return this.attrs || {}
            }
            setAttrs(u) {
                return this._batchTransformChanges(() => {
                    let x, E;
                    if (!u) return this;
                    for (x in u) x !== l && (E = p + v.Util._capitalize(x), v.Util._isFunction(this[E]) ? this[E](u[x]) : this._setAttr(x, u[x]))
                }), this
            }
            isListening() {
                return this._getCache(r, this._isListening)
            }
            _isListening(u) {
                if (!this.listening()) return !1;
                const E = this.getParent();
                return E && E !== u && this !== u ? E._isListening(u) : !0
            }
            isVisible() {
                return this._getCache(k, this._isVisible)
            }
            _isVisible(u) {
                if (!this.visible()) return !1;
                const E = this.getParent();
                return E && E !== u && this !== u ? E._isVisible(u) : !0
            }
            shouldDrawHit(u, x = !1) {
                if (u) return this._isVisible(u) && this._isListening(u);
                const E = this.getLayer();
                let R = !1;
                C.DD._dragElements.forEach(V => {
                    V.dragStatus === "dragging" && (V.node.nodeType === "Stage" || V.node.getLayer() === E) && (R = !0)
                });
                const F = !x && !T.Konva.hitOnDragEnabled && (R || T.Konva.isTransforming());
                return this.isListening() && this.isVisible() && !F
            }
            show() {
                return this.visible(!0), this
            }
            hide() {
                return this.visible(!1), this
            }
            getZIndex() {
                return this.index || 0
            }
            getAbsoluteZIndex() {
                let u = this.getDepth(),
                    x = this,
                    E = 0,
                    R, F, V, L;

                function H(B) {
                    for (R = [], F = B.length, V = 0; V < F; V++) L = B[V], E++, L.nodeType !== P && (R = R.concat(L.getChildren().slice())), L._id === x._id && (V = F);
                    R.length > 0 && R[0].getDepth() <= u && H(R)
                }
                const z = this.getStage();
                return x.nodeType !== S && z && H(z.getChildren()), E
            }
            getDepth() {
                let u = 0,
                    x = this.parent;
                for (; x;) u++, x = x.parent;
                return u
            }
            _batchTransformChanges(u) {
                this._batchingTransformChange = !0, u(), this._batchingTransformChange = !1, this._needClearTransformCache && (this._clearCache(b), this._clearSelfAndDescendantCache(a)), this._needClearTransformCache = !1
            }
            setPosition(u) {
                return this._batchTransformChanges(() => {
                    this.x(u.x), this.y(u.y)
                }), this
            }
            getPosition() {
                return {
                    x: this.x(),
                    y: this.y()
                }
            }
            getRelativePointerPosition() {
                const u = this.getStage();
                if (!u) return null;
                const x = u.getPointerPosition();
                if (!x) return null;
                const E = this.getAbsoluteTransform().copy();
                return E.invert(), E.point(x)
            }
            getAbsolutePosition(u) {
                let x = !1,
                    E = this.parent;
                for (; E;) {
                    if (E.isCached()) {
                        x = !0;
                        break
                    }
                    E = E.parent
                }
                x && !u && (u = !0);
                const R = this.getAbsoluteTransform(u).getMatrix(),
                    F = new v.Transform,
                    V = this.offset();
                return F.m = R.slice(), F.translate(V.x, V.y), F.getTranslation()
            }
            setAbsolutePosition(u) {
                const {
                    x,
                    y: E,
                    ...R
                } = this._clearTransform();
                this.attrs.x = x, this.attrs.y = E, this._clearCache(b);
                const F = this._getAbsoluteTransform().copy();
                return F.invert(), F.translate(u.x, u.y), u = {
                    x: this.attrs.x + F.getTranslation().x,
                    y: this.attrs.y + F.getTranslation().y
                }, this._setTransform(R), this.setPosition({
                    x: u.x,
                    y: u.y
                }), this._clearCache(b), this._clearSelfAndDescendantCache(a), this
            }
            _setTransform(u) {
                let x;
                for (x in u) this.attrs[x] = u[x]
            }
            _clearTransform() {
                const u = {
                    x: this.x(),
                    y: this.y(),
                    rotation: this.rotation(),
                    scaleX: this.scaleX(),
                    scaleY: this.scaleY(),
                    offsetX: this.offsetX(),
                    offsetY: this.offsetY(),
                    skewX: this.skewX(),
                    skewY: this.skewY()
                };
                return this.attrs.x = 0, this.attrs.y = 0, this.attrs.rotation = 0, this.attrs.scaleX = 1, this.attrs.scaleY = 1, this.attrs.offsetX = 0, this.attrs.offsetY = 0, this.attrs.skewX = 0, this.attrs.skewY = 0, u
            }
            move(u) {
                let x = u.x,
                    E = u.y,
                    R = this.x(),
                    F = this.y();
                return x !== void 0 && (R += x), E !== void 0 && (F += E), this.setPosition({
                    x: R,
                    y: F
                }), this
            }
            _eachAncestorReverse(u, x) {
                let E = [],
                    R = this.getParent(),
                    F, V;
                if (!(x && x._id === this._id)) {
                    for (E.unshift(this); R && (!x || R._id !== x._id);) E.unshift(R), R = R.parent;
                    for (F = E.length, V = 0; V < F; V++) u(E[V])
                }
            }
            rotate(u) {
                return this.rotation(this.rotation() + u), this
            }
            moveToTop() {
                if (!this.parent) return v.Util.warn("Node has no parent. moveToTop function is ignored."), !1;
                const u = this.index,
                    x = this.parent.getChildren().length;
                return u < x - 1 ? (this.parent.children.splice(u, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), !0) : !1
            }
            moveUp() {
                if (!this.parent) return v.Util.warn("Node has no parent. moveUp function is ignored."), !1;
                const u = this.index,
                    x = this.parent.getChildren().length;
                return u < x - 1 ? (this.parent.children.splice(u, 1), this.parent.children.splice(u + 1, 0, this), this.parent._setChildrenIndices(), !0) : !1
            }
            moveDown() {
                if (!this.parent) return v.Util.warn("Node has no parent. moveDown function is ignored."), !1;
                const u = this.index;
                return u > 0 ? (this.parent.children.splice(u, 1), this.parent.children.splice(u - 1, 0, this), this.parent._setChildrenIndices(), !0) : !1
            }
            moveToBottom() {
                if (!this.parent) return v.Util.warn("Node has no parent. moveToBottom function is ignored."), !1;
                const u = this.index;
                return u > 0 ? (this.parent.children.splice(u, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), !0) : !1
            }
            setZIndex(u) {
                if (!this.parent) return v.Util.warn("Node has no parent. zIndex parameter is ignored."), this;
                (u < 0 || u >= this.parent.children.length) && v.Util.warn("Unexpected value " + u + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
                const x = this.index;
                return this.parent.children.splice(x, 1), this.parent.children.splice(u, 0, this), this.parent._setChildrenIndices(), this
            }
            getAbsoluteOpacity() {
                return this._getCache(s, this._getAbsoluteOpacity)
            }
            _getAbsoluteOpacity() {
                let u = this.opacity();
                const x = this.getParent();
                return x && !x._isUnderCache && (u *= x.getAbsoluteOpacity()), u
            }
            moveTo(u) {
                return this.getParent() !== u && (this._remove(), u.add(this)), this
            }
            toObject() {
                let u = this.getAttrs(),
                    x, E, R, F, V;
                const L = {
                    attrs: {},
                    className: this.getClassName()
                };
                for (x in u) E = u[x], V = v.Util.isObject(E) && !v.Util._isPlainObject(E) && !v.Util._isArray(E), !V && (R = typeof this[x] == "function" && this[x], delete u[x], F = R ? R.call(this) : null, u[x] = E, F !== E && (L.attrs[x] = E));
                return v.Util._prepareToStringify(L)
            }
            toJSON() {
                return JSON.stringify(this.toObject())
            }
            getParent() {
                return this.parent
            }
            findAncestors(u, x, E) {
                const R = [];
                x && this._isMatch(u) && R.push(this);
                let F = this.parent;
                for (; F;) {
                    if (F === E) return R;
                    F._isMatch(u) && R.push(F), F = F.parent
                }
                return R
            }
            isAncestorOf(u) {
                return !1
            }
            findAncestor(u, x, E) {
                return this.findAncestors(u, x, E)[0]
            }
            _isMatch(u) {
                if (!u) return !1;
                if (typeof u == "function") return u(this);
                let x = u.replace(/ /g, "").split(","),
                    E = x.length,
                    R, F;
                for (R = 0; R < E; R++)
                    if (F = x[R], v.Util.isValidSelector(F) || (v.Util.warn('Selector "' + F + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), v.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), v.Util.warn("Konva is awesome, right?")), F.charAt(0) === "#") {
                        if (this.id() === F.slice(1)) return !0
                    } else if (F.charAt(0) === ".") {
                    if (this.hasName(F.slice(1))) return !0
                } else if (this.className === F || this.nodeType === F) return !0;
                return !1
            }
            getLayer() {
                const u = this.getParent();
                return u ? u.getLayer() : null
            }
            getStage() {
                return this._getCache(y, this._getStage)
            }
            _getStage() {
                const u = this.getParent();
                return u ? u.getStage() : null
            }
            fire(u, x = {}, E) {
                return x.target = x.target || this, E ? this._fireAndBubble(u, x) : this._fire(u, x), this
            }
            getAbsoluteTransform(u) {
                return u ? this._getAbsoluteTransform(u) : this._getCache(a, this._getAbsoluteTransform)
            }
            _getAbsoluteTransform(u) {
                let x;
                if (u) return x = new v.Transform, this._eachAncestorReverse(function(E) {
                    const R = E.transformsEnabled();
                    R === "all" ? x.multiply(E.getTransform()) : R === "position" && x.translate(E.x() - E.offsetX(), E.y() - E.offsetY())
                }, u), x; {
                    x = this._cache.get(a) || new v.Transform, this.parent ? this.parent.getAbsoluteTransform().copyInto(x) : x.reset();
                    const E = this.transformsEnabled();
                    if (E === "all") x.multiply(this.getTransform());
                    else if (E === "position") {
                        const R = this.attrs.x || 0,
                            F = this.attrs.y || 0,
                            V = this.attrs.offsetX || 0,
                            L = this.attrs.offsetY || 0;
                        x.translate(R - V, F - L)
                    }
                    return x.dirty = !1, x
                }
            }
            getAbsoluteScale(u) {
                let x = this;
                for (; x;) x._isUnderCache && (u = x), x = x.getParent();
                const R = this.getAbsoluteTransform(u).decompose();
                return {
                    x: R.scaleX,
                    y: R.scaleY
                }
            }
            getAbsoluteRotation() {
                return this.getAbsoluteTransform().decompose().rotation
            }
            getTransform() {
                return this._getCache(b, this._getTransform)
            }
            _getTransform() {
                var u, x;
                const E = this._cache.get(b) || new v.Transform;
                E.reset();
                const R = this.x(),
                    F = this.y(),
                    V = T.Konva.getAngle(this.rotation()),
                    L = (u = this.attrs.scaleX) !== null && u !== void 0 ? u : 1,
                    H = (x = this.attrs.scaleY) !== null && x !== void 0 ? x : 1,
                    z = this.attrs.skewX || 0,
                    B = this.attrs.skewY || 0,
                    A = this.attrs.offsetX || 0,
                    U = this.attrs.offsetY || 0;
                return (R !== 0 || F !== 0) && E.translate(R, F), V !== 0 && E.rotate(V), (z !== 0 || B !== 0) && E.skew(z, B), (L !== 1 || H !== 1) && E.scale(L, H), (A !== 0 || U !== 0) && E.translate(-1 * A, -1 * U), E.dirty = !1, E
            }
            clone(u) {
                let x = v.Util.cloneObject(this.attrs),
                    E, R, F, V, L;
                for (E in u) x[E] = u[E];
                const H = new this.constructor(x);
                for (E in this.eventListeners)
                    for (R = this.eventListeners[E], F = R.length, V = 0; V < F; V++) L = R[V], L.name.indexOf(n) < 0 && (H.eventListeners[E] || (H.eventListeners[E] = []), H.eventListeners[E].push(L));
                return H
            }
            _toKonvaCanvas(u) {
                u = u || {};
                const x = this.getClientRect(),
                    E = this.getStage(),
                    R = u.x !== void 0 ? u.x : Math.floor(x.x),
                    F = u.y !== void 0 ? u.y : Math.floor(x.y),
                    V = u.pixelRatio || 1,
                    L = new g.SceneCanvas({
                        width: u.width || Math.ceil(x.width) || (E ? E.width() : 0),
                        height: u.height || Math.ceil(x.height) || (E ? E.height() : 0),
                        pixelRatio: V
                    }),
                    H = L.getContext(),
                    z = new g.SceneCanvas({
                        width: L.width / L.pixelRatio + Math.abs(R),
                        height: L.height / L.pixelRatio + Math.abs(F),
                        pixelRatio: L.pixelRatio
                    });
                return u.imageSmoothingEnabled === !1 && (H._context.imageSmoothingEnabled = !1), H.save(), (R || F) && H.translate(-1 * R, -1 * F), this.drawScene(L, void 0, z), H.restore(), L
            }
            toCanvas(u) {
                return this._toKonvaCanvas(u)._canvas
            }
            toDataURL(u) {
                u = u || {};
                const x = u.mimeType || null,
                    E = u.quality || null,
                    R = this._toKonvaCanvas(u).toDataURL(x, E);
                return u.callback && u.callback(R), R
            }
            toImage(u) {
                return new Promise((x, E) => {
                    try {
                        const R = u ? .callback;
                        R && delete u.callback, v.Util._urlToImage(this.toDataURL(u), function(F) {
                            x(F), R ? .(F)
                        })
                    } catch (R) {
                        E(R)
                    }
                })
            }
            toBlob(u) {
                return new Promise((x, E) => {
                    try {
                        const R = u ? .callback;
                        R && delete u.callback, this.toCanvas(u).toBlob(F => {
                            x(F), R ? .(F)
                        }, u ? .mimeType, u ? .quality)
                    } catch (R) {
                        E(R)
                    }
                })
            }
            setSize(u) {
                return this.width(u.width), this.height(u.height), this
            }
            getSize() {
                return {
                    width: this.width(),
                    height: this.height()
                }
            }
            getClassName() {
                return this.className || this.nodeType
            }
            getType() {
                return this.nodeType
            }
            getDragDistance() {
                return this.attrs.dragDistance !== void 0 ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : T.Konva.dragDistance
            }
            _off(u, x, E) {
                let R = this.eventListeners[u],
                    F, V, L;
                for (F = 0; F < R.length; F++)
                    if (V = R[F].name, L = R[F].handler, (V !== "konva" || x === "konva") && (!x || V === x) && (!E || E === L)) {
                        if (R.splice(F, 1), R.length === 0) {
                            delete this.eventListeners[u];
                            break
                        }
                        F--
                    }
            }
            _fireChangeEvent(u, x, E) {
                this._fire(u + _, {
                    oldVal: x,
                    newVal: E
                })
            }
            addName(u) {
                if (!this.hasName(u)) {
                    const x = this.name(),
                        E = x ? x + " " + u : u;
                    this.name(E)
                }
                return this
            }
            hasName(u) {
                if (!u) return !1;
                const x = this.name();
                return x ? (x || "").split(/\s/g).indexOf(u) !== -1 : !1
            }
            removeName(u) {
                const x = (this.name() || "").split(/\s/g),
                    E = x.indexOf(u);
                return E !== -1 && (x.splice(E, 1), this.name(x.join(" "))), this
            }
            setAttr(u, x) {
                const E = this[p + v.Util._capitalize(u)];
                return v.Util._isFunction(E) ? E.call(this, x) : this._setAttr(u, x), this
            }
            _requestDraw() {
                if (T.Konva.autoDrawEnabled) {
                    const u = this.getLayer() || this.getStage();
                    u ? .batchDraw()
                }
            }
            _setAttr(u, x) {
                const E = this.attrs[u];
                E === x && !v.Util.isObject(x) || (x == null ? delete this.attrs[u] : this.attrs[u] = x, this._shouldFireChangeEvents && this._fireChangeEvent(u, E, x), this._requestDraw())
            }
            _setComponentAttr(u, x, E) {
                let R;
                E !== void 0 && (R = this.attrs[u], R || (this.attrs[u] = this.getAttr(u)), this.attrs[u][x] = E, this._fireChangeEvent(u, R, E))
            }
            _fireAndBubble(u, x, E) {
                x && this.nodeType === P && (x.target = this);
                const R = [d, m, w, i, t, c];
                if (!(R.indexOf(u) !== -1 && (E && (this === E || this.isAncestorOf && this.isAncestorOf(E)) || this.nodeType === "Stage" && !E))) {
                    this._fire(u, x);
                    const V = R.indexOf(u) !== -1 && E && E.isAncestorOf && E.isAncestorOf(this) && !E.isAncestorOf(this.parent);
                    (x && !x.cancelBubble || !x) && this.parent && this.parent.isListening() && !V && (E && E.parent ? this._fireAndBubble.call(this.parent, u, x, E) : this._fireAndBubble.call(this.parent, u, x))
                }
            }
            _getProtoListeners(u) {
                var x, E, R;
                const F = (x = this._cache.get(e)) !== null && x !== void 0 ? x : {};
                let V = F ? .[u];
                if (V === void 0) {
                    V = [];
                    let L = Object.getPrototypeOf(this);
                    for (; L;) {
                        const H = (R = (E = L.eventListeners) === null || E === void 0 ? void 0 : E[u]) !== null && R !== void 0 ? R : [];
                        V.push(...H), L = Object.getPrototypeOf(L)
                    }
                    F[u] = V, this._cache.set(e, F)
                }
                return V
            }
            _fire(u, x) {
                x = x || {}, x.currentTarget = this, x.type = u;
                const E = this._getProtoListeners(u);
                if (E)
                    for (let F = 0; F < E.length; F++) E[F].handler.call(this, x);
                const R = this.eventListeners[u];
                if (R)
                    for (let F = 0; F < R.length; F++) R[F].handler.call(this, x)
            }
            draw() {
                return this.drawScene(), this.drawHit(), this
            }
            _createDragElement(u) {
                const x = u ? u.pointerId : void 0,
                    E = this.getStage(),
                    R = this.getAbsolutePosition();
                if (!E) return;
                const F = E._getPointerById(x) || E._changedPointerPositions[0] || R;
                C.DD._dragElements.set(this._id, {
                    node: this,
                    startPointerPos: F,
                    offset: {
                        x: F.x - R.x,
                        y: F.y - R.y
                    },
                    dragStatus: "ready",
                    pointerId: x
                })
            }
            startDrag(u, x = !0) {
                C.DD._dragElements.has(this._id) || this._createDragElement(u);
                const E = C.DD._dragElements.get(this._id);
                E.dragStatus = "dragging", this.fire("dragstart", {
                    type: "dragstart",
                    target: this,
                    evt: u && u.evt
                }, x)
            }
            _setDragPosition(u, x) {
                const E = this.getStage()._getPointerById(x.pointerId);
                if (!E) return;
                let R = {
                    x: E.x - x.offset.x,
                    y: E.y - x.offset.y
                };
                const F = this.dragBoundFunc();
                if (F !== void 0) {
                    const V = F.call(this, R, u);
                    V ? R = V : v.Util.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.")
                }(!this._lastPos || this._lastPos.x !== R.x || this._lastPos.y !== R.y) && (this.setAbsolutePosition(R), this._requestDraw()), this._lastPos = R
            }
            stopDrag(u) {
                const x = C.DD._dragElements.get(this._id);
                x && (x.dragStatus = "stopped"), C.DD._endDragBefore(u), C.DD._endDragAfter(u)
            }
            setDraggable(u) {
                this._setAttr("draggable", u), this._dragChange()
            }
            isDragging() {
                const u = C.DD._dragElements.get(this._id);
                return u ? u.dragStatus === "dragging" : !1
            }
            _listenDrag() {
                this._dragCleanup(), this.on("mousedown.konva touchstart.konva", function(u) {
                    if (!(!(u.evt.button !== void 0) || T.Konva.dragButtons.indexOf(u.evt.button) >= 0) || this.isDragging()) return;
                    let R = !1;
                    C.DD._dragElements.forEach(F => {
                        this.isAncestorOf(F.node) && (R = !0)
                    }), R || this._createDragElement(u)
                })
            }
            _dragChange() {
                if (this.attrs.draggable) this._listenDrag();
                else {
                    if (this._dragCleanup(), !this.getStage()) return;
                    const x = C.DD._dragElements.get(this._id),
                        E = x && x.dragStatus === "dragging",
                        R = x && x.dragStatus === "ready";
                    E ? this.stopDrag() : R && C.DD._dragElements.delete(this._id)
                }
            }
            _dragCleanup() {
                this.off("mousedown.konva"), this.off("touchstart.konva")
            }
            isClientRectOnScreen(u = {
                x: 0,
                y: 0
            }) {
                const x = this.getStage();
                if (!x) return !1;
                const E = {
                    x: -u.x,
                    y: -u.y,
                    width: x.width() + 2 * u.x,
                    height: x.height() + 2 * u.y
                };
                return v.Util.haveIntersection(E, this.getClientRect())
            }
            static create(u, x) {
                return v.Util._isString(u) && (u = JSON.parse(u)), this._createNode(u, x)
            }
            static _createNode(u, x) {
                let E = Me.prototype.getClassName.call(u),
                    R = u.children,
                    F, V, L;
                x && (u.attrs.container = x), T.Konva[E] || (v.Util.warn('Can not find a node with class name "' + E + '". Fallback to "Shape".'), E = "Shape");
                const H = T.Konva[E];
                if (F = new H(u.attrs), R)
                    for (V = R.length, L = 0; L < V; L++) F.add(Me._createNode(R[L]));
                return F
            }
        };
    Ft.Node = I, I.prototype.nodeType = "Node", I.prototype._attrsAffectingSize = [], I.prototype.eventListeners = {}, I.prototype.on.call(I.prototype, N, function() {
        if (this._batchingTransformChange) {
            this._needClearTransformCache = !0;
            return
        }
        this._clearCache(b), this._clearSelfAndDescendantCache(a)
    }), I.prototype.on.call(I.prototype, "visibleChange.konva", function() {
        this._clearSelfAndDescendantCache(k)
    }), I.prototype.on.call(I.prototype, "listeningChange.konva", function() {
        this._clearSelfAndDescendantCache(r)
    }), I.prototype.on.call(I.prototype, "opacityChange.konva", function() {
        this._clearSelfAndDescendantCache(s)
    });
    const O = M.Factory.addGetterSetter;
    return O(I, "zIndex"), O(I, "absolutePosition"), O(I, "position"), O(I, "x", 0, (0, f.getNumberValidator)()), O(I, "y", 0, (0, f.getNumberValidator)()), O(I, "globalCompositeOperation", "source-over", (0, f.getStringValidator)()), O(I, "opacity", 1, (0, f.getNumberValidator)()), O(I, "name", "", (0, f.getStringValidator)()), O(I, "id", "", (0, f.getStringValidator)()), O(I, "rotation", 0, (0, f.getNumberValidator)()), M.Factory.addComponentsGetterSetter(I, "scale", ["x", "y"]), O(I, "scaleX", 1, (0, f.getNumberValidator)()), O(I, "scaleY", 1, (0, f.getNumberValidator)()), M.Factory.addComponentsGetterSetter(I, "skew", ["x", "y"]), O(I, "skewX", 0, (0, f.getNumberValidator)()), O(I, "skewY", 0, (0, f.getNumberValidator)()), M.Factory.addComponentsGetterSetter(I, "offset", ["x", "y"]), O(I, "offsetX", 0, (0, f.getNumberValidator)()), O(I, "offsetY", 0, (0, f.getNumberValidator)()), O(I, "dragDistance", void 0, (0, f.getNumberValidator)()), O(I, "width", 0, (0, f.getNumberValidator)()), O(I, "height", 0, (0, f.getNumberValidator)()), O(I, "listening", !0, (0, f.getBooleanValidator)()), O(I, "preventDefault", !0, (0, f.getBooleanValidator)()), O(I, "filters", void 0, function(q) {
        return this._filterUpToDate = !1, q
    }), O(I, "visible", !0, (0, f.getBooleanValidator)()), O(I, "transformsEnabled", "all", (0, f.getStringValidator)()), O(I, "size"), O(I, "dragBoundFunc"), O(I, "draggable", !1, (0, f.getBooleanValidator)()), M.Factory.backCompat(I, {
        rotateDeg: "rotate",
        setRotationDeg: "setRotation",
        getRotationDeg: "getRotation"
    }), Ft
}
var Mt = {},
    Ke;

function Se() {
    if (Ke) return Mt;
    Ke = 1, Object.defineProperty(Mt, "__esModule", {
        value: !0
    }), Mt.Container = void 0;
    const g = J(),
        C = at(),
        M = Z();
    let T = class extends C.Node {
        constructor() {
            super(...arguments), this.children = []
        }
        getChildren(f) {
            const s = this.children || [];
            return f ? s.filter(f) : s
        }
        hasChildren() {
            return this.getChildren().length > 0
        }
        removeChildren() {
            return this.getChildren().forEach(f => {
                f.parent = null, f.index = 0, f.remove()
            }), this.children = [], this._requestDraw(), this
        }
        destroyChildren() {
            return this.getChildren().forEach(f => {
                f.parent = null, f.index = 0, f.destroy()
            }), this.children = [], this._requestDraw(), this
        }
        add(...f) {
            if (f.length === 0) return this;
            if (f.length > 1) {
                for (let e = 0; e < f.length; e++) this.add(f[e]);
                return this
            }
            const s = f[0];
            return s.getParent() ? (s.moveTo(this), this) : (this._validateAdd(s), s.index = this.getChildren().length, s.parent = this, s._clearCaches(), this.getChildren().push(s), this._fire("add", {
                child: s
            }), this._requestDraw(), this)
        }
        destroy() {
            return this.hasChildren() && this.destroyChildren(), super.destroy(), this
        }
        find(f) {
            return this._generalFind(f, !1)
        }
        findOne(f) {
            const s = this._generalFind(f, !0);
            return s.length > 0 ? s[0] : void 0
        }
        _generalFind(f, s) {
            const e = [];
            return this._descendants(a => {
                const h = a._isMatch(f);
                return h && e.push(a), !!(h && s)
            }), e
        }
        _descendants(f) {
            let s = !1;
            const e = this.getChildren();
            for (const a of e) {
                if (s = f(a), s) return !0;
                if (a.hasChildren() && (s = a._descendants(f), s)) return !0
            }
            return !1
        }
        toObject() {
            const f = C.Node.prototype.toObject.call(this);
            return f.children = [], this.getChildren().forEach(s => {
                f.children.push(s.toObject())
            }), f
        }
        isAncestorOf(f) {
            let s = f.getParent();
            for (; s;) {
                if (s._id === this._id) return !0;
                s = s.getParent()
            }
            return !1
        }
        clone(f) {
            const s = C.Node.prototype.clone.call(this, f);
            return this.getChildren().forEach(function(e) {
                s.add(e.clone())
            }), s
        }
        getAllIntersections(f) {
            const s = [];
            return this.find("Shape").forEach(e => {
                e.isVisible() && e.intersects(f) && s.push(e)
            }), s
        }
        _clearSelfAndDescendantCache(f) {
            var s;
            super._clearSelfAndDescendantCache(f), !this.isCached() && ((s = this.children) === null || s === void 0 || s.forEach(function(e) {
                e._clearSelfAndDescendantCache(f)
            }))
        }
        _setChildrenIndices() {
            var f;
            (f = this.children) === null || f === void 0 || f.forEach(function(s, e) {
                s.index = e
            }), this._requestDraw()
        }
        drawScene(f, s, e) {
            const a = this.getLayer(),
                h = f || a && a.getCanvas(),
                o = h && h.getContext(),
                _ = this._getCanvasCache(),
                l = _ && _.scene,
                n = h && h.isCache;
            if (!this.isVisible() && !n) return this;
            if (l) {
                o.save();
                const r = this.getAbsoluteTransform(s).getMatrix();
                o.transform(r[0], r[1], r[2], r[3], r[4], r[5]), this._drawCachedSceneCanvas(o), o.restore()
            } else this._drawChildren("drawScene", h, s, e);
            return this
        }
        drawHit(f, s) {
            if (!this.shouldDrawHit(s)) return this;
            const e = this.getLayer(),
                a = f || e && e.hitCanvas,
                h = a && a.getContext(),
                o = this._getCanvasCache();
            if (o && o.hit) {
                h.save();
                const l = this.getAbsoluteTransform(s).getMatrix();
                h.transform(l[0], l[1], l[2], l[3], l[4], l[5]), this._drawCachedHitCanvas(h), h.restore()
            } else this._drawChildren("drawHit", a, s);
            return this
        }
        _drawChildren(f, s, e, a) {
            var h;
            const o = s && s.getContext(),
                _ = this.clipWidth(),
                l = this.clipHeight(),
                n = this.clipFunc(),
                r = typeof _ == "number" && typeof l == "number" || n,
                d = e === this;
            if (r) {
                o.save();
                const w = this.getAbsoluteTransform(e);
                let i = w.getMatrix();
                o.transform(i[0], i[1], i[2], i[3], i[4], i[5]), o.beginPath();
                let t;
                if (n) t = n.call(this, o, this);
                else {
                    const c = this.clipX(),
                        p = this.clipY();
                    o.rect(c || 0, p || 0, _, l)
                }
                o.clip.apply(o, t), i = w.copy().invert().getMatrix(), o.transform(i[0], i[1], i[2], i[3], i[4], i[5])
            }
            const m = !d && this.globalCompositeOperation() !== "source-over" && f === "drawScene";
            m && (o.save(), o._applyGlobalCompositeOperation(this)), (h = this.children) === null || h === void 0 || h.forEach(function(w) {
                w[f](s, e, a)
            }), m && o.restore(), r && o.restore()
        }
        getClientRect(f = {}) {
            var s;
            const e = f.skipTransform,
                a = f.relativeTo;
            let h, o, _, l, n = {
                x: 1 / 0,
                y: 1 / 0,
                width: 0,
                height: 0
            };
            const r = this;
            (s = this.children) === null || s === void 0 || s.forEach(function(w) {
                if (!w.visible()) return;
                const i = w.getClientRect({
                    relativeTo: r,
                    skipShadow: f.skipShadow,
                    skipStroke: f.skipStroke
                });
                i.width === 0 && i.height === 0 || (h === void 0 ? (h = i.x, o = i.y, _ = i.x + i.width, l = i.y + i.height) : (h = Math.min(h, i.x), o = Math.min(o, i.y), _ = Math.max(_, i.x + i.width), l = Math.max(l, i.y + i.height)))
            });
            const d = this.find("Shape");
            let m = !1;
            for (let w = 0; w < d.length; w++)
                if (d[w]._isVisible(this)) {
                    m = !0;
                    break
                }
            return m && h !== void 0 ? n = {
                x: h,
                y: o,
                width: _ - h,
                height: l - o
            } : n = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }, e ? n : this._transformedRect(n, a)
        }
    };
    return Mt.Container = T, g.Factory.addComponentsGetterSetter(T, "clip", ["x", "y", "width", "height"]), g.Factory.addGetterSetter(T, "clipX", void 0, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(T, "clipY", void 0, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(T, "clipWidth", void 0, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(T, "clipHeight", void 0, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(T, "clipFunc"), Mt
}
var Re = {},
    Ct = {},
    Xe;

function Qi() {
    if (Xe) return Ct;
    Xe = 1, Object.defineProperty(Ct, "__esModule", {
        value: !0
    }), Ct.getCapturedShape = T, Ct.createEvent = v, Ct.hasPointerCapture = f, Ct.setPointerCapture = s, Ct.releaseCapture = e;
    const g = Q(),
        C = new Map,
        M = g.Konva._global.PointerEvent !== void 0;

    function T(a) {
        return C.get(a)
    }

    function v(a) {
        return {
            evt: a,
            pointerId: a.pointerId
        }
    }

    function f(a, h) {
        return C.get(a) === h
    }

    function s(a, h) {
        e(a), h.getStage() && (C.set(a, h), M && h._fire("gotpointercapture", v(new PointerEvent("gotpointercapture"))))
    }

    function e(a, h) {
        const o = C.get(a);
        if (!o) return;
        const _ = o.getStage();
        _ && _.content, C.delete(a), M && o._fire("lostpointercapture", v(new PointerEvent("lostpointercapture")))
    }
    return Ct
}
var je;

function fn() {
    return je || (je = 1, (function(g) {
        Object.defineProperty(g, "__esModule", {
            value: !0
        }), g.Stage = g.stages = void 0;
        const C = rt(),
            M = J(),
            T = Se(),
            v = Q(),
            f = be(),
            s = Ge(),
            e = Q(),
            a = Qi(),
            h = "Stage",
            o = "string",
            _ = "px",
            l = "mouseout",
            n = "mouseleave",
            r = "mouseover",
            d = "mouseenter",
            m = "mousemove",
            w = "mousedown",
            i = "mouseup",
            t = "pointermove",
            c = "pointerdown",
            p = "pointerup",
            P = "pointercancel",
            G = "lostpointercapture",
            y = "pointerout",
            b = "pointerleave",
            S = "pointerover",
            k = "pointerenter",
            N = "contextmenu",
            D = "touchstart",
            I = "touchend",
            O = "touchmove",
            q = "touchcancel",
            u = "wheel",
            x = 5,
            E = [
                [d, "_pointerenter"],
                [w, "_pointerdown"],
                [m, "_pointermove"],
                [i, "_pointerup"],
                [n, "_pointerleave"],
                [D, "_pointerdown"],
                [O, "_pointermove"],
                [I, "_pointerup"],
                [q, "_pointercancel"],
                [r, "_pointerover"],
                [u, "_wheel"],
                [N, "_contextmenu"],
                [c, "_pointerdown"],
                [t, "_pointermove"],
                [p, "_pointerup"],
                [P, "_pointercancel"],
                [b, "_pointerleave"],
                [G, "_lostpointercapture"]
            ],
            R = {
                mouse: {
                    [y]: l,
                    [b]: n,
                    [S]: r,
                    [k]: d,
                    [t]: m,
                    [c]: w,
                    [p]: i,
                    [P]: "mousecancel",
                    pointerclick: "click",
                    pointerdblclick: "dblclick"
                },
                touch: {
                    [y]: "touchout",
                    [b]: "touchleave",
                    [S]: "touchover",
                    [k]: "touchenter",
                    [t]: O,
                    [c]: D,
                    [p]: I,
                    [P]: q,
                    pointerclick: "tap",
                    pointerdblclick: "dbltap"
                },
                pointer: {
                    [y]: y,
                    [b]: b,
                    [S]: S,
                    [k]: k,
                    [t]: t,
                    [c]: c,
                    [p]: p,
                    [P]: P,
                    pointerclick: "pointerclick",
                    pointerdblclick: "pointerdblclick"
                }
            },
            F = B => B.indexOf("pointer") >= 0 ? "pointer" : B.indexOf("touch") >= 0 ? "touch" : "mouse",
            V = B => {
                const A = F(B);
                if (A === "pointer") return v.Konva.pointerEventsEnabled && R.pointer;
                if (A === "touch") return R.touch;
                if (A === "mouse") return R.mouse
            };

        function L(B = {}) {
            return (B.clipFunc || B.clipWidth || B.clipHeight) && C.Util.warn("Stage does not support clipping. Please use clip for Layers or Groups."), B
        }
        const H = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);";
        g.stages = [];
        class z extends T.Container {
            constructor(A) {
                super(L(A)), this._pointerPositions = [], this._changedPointerPositions = [], this._buildDOM(), this._bindContentEvents(), g.stages.push(this), this.on("widthChange.konva heightChange.konva", this._resizeDOM), this.on("visibleChange.konva", this._checkVisibility), this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", () => {
                    L(this.attrs)
                }), this._checkVisibility()
            }
            _validateAdd(A) {
                const U = A.getType() === "Layer",
                    W = A.getType() === "FastLayer";
                U || W || C.Util.throw("You may only add layers to the stage.")
            }
            _checkVisibility() {
                if (!this.content) return;
                const A = this.visible() ? "" : "none";
                this.content.style.display = A
            }
            setContainer(A) {
                if (typeof A === o) {
                    let U;
                    if (A.charAt(0) === ".") {
                        const W = A.slice(1);
                        A = document.getElementsByClassName(W)[0]
                    } else A.charAt(0) !== "#" ? U = A : U = A.slice(1), A = document.getElementById(U);
                    if (!A) throw "Can not find container in document with id " + U
                }
                return this._setAttr("container", A), this.content && (this.content.parentElement && this.content.parentElement.removeChild(this.content), A.appendChild(this.content)), this
            }
            shouldDrawHit() {
                return !0
            }
            clear() {
                const A = this.children,
                    U = A.length;
                for (let W = 0; W < U; W++) A[W].clear();
                return this
            }
            clone(A) {
                return A || (A = {}), A.container = typeof document < "u" && document.createElement("div"), T.Container.prototype.clone.call(this, A)
            }
            destroy() {
                super.destroy();
                const A = this.content;
                A && C.Util._isInDocument(A) && this.container().removeChild(A);
                const U = g.stages.indexOf(this);
                return U > -1 && g.stages.splice(U, 1), C.Util.releaseCanvas(this.bufferCanvas._canvas, this.bufferHitCanvas._canvas), this
            }
            getPointerPosition() {
                const A = this._pointerPositions[0] || this._changedPointerPositions[0];
                return A ? {
                    x: A.x,
                    y: A.y
                } : (C.Util.warn(H), null)
            }
            _getPointerById(A) {
                return this._pointerPositions.find(U => U.id === A)
            }
            getPointersPositions() {
                return this._pointerPositions
            }
            getStage() {
                return this
            }
            getContent() {
                return this.content
            }
            _toKonvaCanvas(A) {
                A = A || {}, A.x = A.x || 0, A.y = A.y || 0, A.width = A.width || this.width(), A.height = A.height || this.height();
                const U = new f.SceneCanvas({
                        width: A.width,
                        height: A.height,
                        pixelRatio: A.pixelRatio || 1
                    }),
                    W = U.getContext()._context,
                    Y = this.children;
                return (A.x || A.y) && W.translate(-1 * A.x, -1 * A.y), Y.forEach(function(K) {
                    if (!K.isVisible()) return;
                    const X = K._toKonvaCanvas(A);
                    W.drawImage(X._canvas, A.x, A.y, X.getWidth() / X.getPixelRatio(), X.getHeight() / X.getPixelRatio())
                }), U
            }
            getIntersection(A) {
                if (!A) return null;
                const U = this.children,
                    W = U.length,
                    Y = W - 1;
                for (let K = Y; K >= 0; K--) {
                    const X = U[K].getIntersection(A);
                    if (X) return X
                }
                return null
            }
            _resizeDOM() {
                const A = this.width(),
                    U = this.height();
                this.content && (this.content.style.width = A + _, this.content.style.height = U + _), this.bufferCanvas.setSize(A, U), this.bufferHitCanvas.setSize(A, U), this.children.forEach(W => {
                    W.setSize({
                        width: A,
                        height: U
                    }), W.draw()
                })
            }
            add(A, ...U) {
                if (arguments.length > 1) {
                    for (let Y = 0; Y < arguments.length; Y++) this.add(arguments[Y]);
                    return this
                }
                super.add(A);
                const W = this.children.length;
                return W > x && C.Util.warn("The stage has " + W + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."), A.setSize({
                    width: this.width(),
                    height: this.height()
                }), A.draw(), v.Konva.isBrowser && this.content.appendChild(A.canvas._canvas), this
            }
            getParent() {
                return null
            }
            getLayer() {
                return null
            }
            hasPointerCapture(A) {
                return a.hasPointerCapture(A, this)
            }
            setPointerCapture(A) {
                a.setPointerCapture(A, this)
            }
            releaseCapture(A) {
                a.releaseCapture(A, this)
            }
            getLayers() {
                return this.children
            }
            _bindContentEvents() {
                v.Konva.isBrowser && E.forEach(([A, U]) => {
                    this.content.addEventListener(A, W => {
                        this[U](W)
                    }, {
                        passive: !1
                    })
                })
            }
            _pointerenter(A) {
                this.setPointersPositions(A);
                const U = V(A.type);
                U && this._fire(U.pointerenter, {
                    evt: A,
                    target: this,
                    currentTarget: this
                })
            }
            _pointerover(A) {
                this.setPointersPositions(A);
                const U = V(A.type);
                U && this._fire(U.pointerover, {
                    evt: A,
                    target: this,
                    currentTarget: this
                })
            }
            _getTargetShape(A) {
                let U = this[A + "targetShape"];
                return U && !U.getStage() && (U = null), U
            }
            _pointerleave(A) {
                const U = V(A.type),
                    W = F(A.type);
                if (!U) return;
                this.setPointersPositions(A);
                const Y = this._getTargetShape(W),
                    K = !(v.Konva.isDragging() || v.Konva.isTransforming()) || v.Konva.hitOnDragEnabled;
                Y && K ? (Y._fireAndBubble(U.pointerout, {
                    evt: A
                }), Y._fireAndBubble(U.pointerleave, {
                    evt: A
                }), this._fire(U.pointerleave, {
                    evt: A,
                    target: this,
                    currentTarget: this
                }), this[W + "targetShape"] = null) : K && (this._fire(U.pointerleave, {
                    evt: A,
                    target: this,
                    currentTarget: this
                }), this._fire(U.pointerout, {
                    evt: A,
                    target: this,
                    currentTarget: this
                })), this.pointerPos = null, this._pointerPositions = []
            }
            _pointerdown(A) {
                const U = V(A.type),
                    W = F(A.type);
                if (!U) return;
                this.setPointersPositions(A);
                let Y = !1;
                this._changedPointerPositions.forEach(K => {
                    const X = this.getIntersection(K);
                    if (s.DD.justDragged = !1, v.Konva["_" + W + "ListenClick"] = !0, !X || !X.isListening()) {
                        this[W + "ClickStartShape"] = void 0;
                        return
                    }
                    v.Konva.capturePointerEventsEnabled && X.setPointerCapture(K.id), this[W + "ClickStartShape"] = X, X._fireAndBubble(U.pointerdown, {
                        evt: A,
                        pointerId: K.id
                    }), Y = !0;
                    const $ = A.type.indexOf("touch") >= 0;
                    X.preventDefault() && A.cancelable && $ && A.preventDefault()
                }), Y || this._fire(U.pointerdown, {
                    evt: A,
                    target: this,
                    currentTarget: this,
                    pointerId: this._pointerPositions[0].id
                })
            }
            _pointermove(A) {
                const U = V(A.type),
                    W = F(A.type);
                if (!U || (v.Konva.isDragging() && s.DD.node.preventDefault() && A.cancelable && A.preventDefault(), this.setPointersPositions(A), !(!(v.Konva.isDragging() || v.Konva.isTransforming()) || v.Konva.hitOnDragEnabled))) return;
                const K = {};
                let X = !1;
                const $ = this._getTargetShape(W);
                this._changedPointerPositions.forEach(tt => {
                    const j = a.getCapturedShape(tt.id) || this.getIntersection(tt),
                        ht = tt.id,
                        et = {
                            evt: A,
                            pointerId: ht
                        },
                        st = $ !== j;
                    if (st && $ && ($._fireAndBubble(U.pointerout, { ...et
                        }, j), $._fireAndBubble(U.pointerleave, { ...et
                        }, j)), j) {
                        if (K[j._id]) return;
                        K[j._id] = !0
                    }
                    j && j.isListening() ? (X = !0, st && (j._fireAndBubble(U.pointerover, { ...et
                    }, $), j._fireAndBubble(U.pointerenter, { ...et
                    }, $), this[W + "targetShape"] = j), j._fireAndBubble(U.pointermove, { ...et
                    })) : $ && (this._fire(U.pointerover, {
                        evt: A,
                        target: this,
                        currentTarget: this,
                        pointerId: ht
                    }), this[W + "targetShape"] = null)
                }), X || this._fire(U.pointermove, {
                    evt: A,
                    target: this,
                    currentTarget: this,
                    pointerId: this._changedPointerPositions[0].id
                })
            }
            _pointerup(A) {
                const U = V(A.type),
                    W = F(A.type);
                if (!U) return;
                this.setPointersPositions(A);
                const Y = this[W + "ClickStartShape"],
                    K = this[W + "ClickEndShape"],
                    X = {};
                let $ = !1;
                this._changedPointerPositions.forEach(tt => {
                    const j = a.getCapturedShape(tt.id) || this.getIntersection(tt);
                    if (j) {
                        if (j.releaseCapture(tt.id), X[j._id]) return;
                        X[j._id] = !0
                    }
                    const ht = tt.id,
                        et = {
                            evt: A,
                            pointerId: ht
                        };
                    let st = !1;
                    v.Konva["_" + W + "InDblClickWindow"] ? (st = !0, clearTimeout(this[W + "DblTimeout"])) : s.DD.justDragged || (v.Konva["_" + W + "InDblClickWindow"] = !0, clearTimeout(this[W + "DblTimeout"])), this[W + "DblTimeout"] = setTimeout(function() {
                        v.Konva["_" + W + "InDblClickWindow"] = !1
                    }, v.Konva.dblClickWindow), j && j.isListening() ? ($ = !0, this[W + "ClickEndShape"] = j, j._fireAndBubble(U.pointerup, { ...et
                    }), v.Konva["_" + W + "ListenClick"] && Y && Y === j && (j._fireAndBubble(U.pointerclick, { ...et
                    }), st && K && K === j && j._fireAndBubble(U.pointerdblclick, { ...et
                    }))) : (this[W + "ClickEndShape"] = null, v.Konva["_" + W + "ListenClick"] && this._fire(U.pointerclick, {
                        evt: A,
                        target: this,
                        currentTarget: this,
                        pointerId: ht
                    }), st && this._fire(U.pointerdblclick, {
                        evt: A,
                        target: this,
                        currentTarget: this,
                        pointerId: ht
                    }))
                }), $ || this._fire(U.pointerup, {
                    evt: A,
                    target: this,
                    currentTarget: this,
                    pointerId: this._changedPointerPositions[0].id
                }), v.Konva["_" + W + "ListenClick"] = !1, A.cancelable && W !== "touch" && W !== "pointer" && A.preventDefault()
            }
            _contextmenu(A) {
                this.setPointersPositions(A);
                const U = this.getIntersection(this.getPointerPosition());
                U && U.isListening() ? U._fireAndBubble(N, {
                    evt: A
                }) : this._fire(N, {
                    evt: A,
                    target: this,
                    currentTarget: this
                })
            }
            _wheel(A) {
                this.setPointersPositions(A);
                const U = this.getIntersection(this.getPointerPosition());
                U && U.isListening() ? U._fireAndBubble(u, {
                    evt: A
                }) : this._fire(u, {
                    evt: A,
                    target: this,
                    currentTarget: this
                })
            }
            _pointercancel(A) {
                this.setPointersPositions(A);
                const U = a.getCapturedShape(A.pointerId) || this.getIntersection(this.getPointerPosition());
                U && U._fireAndBubble(p, a.createEvent(A)), a.releaseCapture(A.pointerId)
            }
            _lostpointercapture(A) {
                a.releaseCapture(A.pointerId)
            }
            setPointersPositions(A) {
                const U = this._getContentPosition();
                let W = null,
                    Y = null;
                A = A || window.event, A.touches !== void 0 ? (this._pointerPositions = [], this._changedPointerPositions = [], Array.prototype.forEach.call(A.touches, K => {
                    this._pointerPositions.push({
                        id: K.identifier,
                        x: (K.clientX - U.left) / U.scaleX,
                        y: (K.clientY - U.top) / U.scaleY
                    })
                }), Array.prototype.forEach.call(A.changedTouches || A.touches, K => {
                    this._changedPointerPositions.push({
                        id: K.identifier,
                        x: (K.clientX - U.left) / U.scaleX,
                        y: (K.clientY - U.top) / U.scaleY
                    })
                })) : (W = (A.clientX - U.left) / U.scaleX, Y = (A.clientY - U.top) / U.scaleY, this.pointerPos = {
                    x: W,
                    y: Y
                }, this._pointerPositions = [{
                    x: W,
                    y: Y,
                    id: C.Util._getFirstPointerId(A)
                }], this._changedPointerPositions = [{
                    x: W,
                    y: Y,
                    id: C.Util._getFirstPointerId(A)
                }])
            }
            _setPointerPosition(A) {
                C.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'), this.setPointersPositions(A)
            }
            _getContentPosition() {
                if (!this.content || !this.content.getBoundingClientRect) return {
                    top: 0,
                    left: 0,
                    scaleX: 1,
                    scaleY: 1
                };
                const A = this.content.getBoundingClientRect();
                return {
                    top: A.top,
                    left: A.left,
                    scaleX: A.width / this.content.clientWidth || 1,
                    scaleY: A.height / this.content.clientHeight || 1
                }
            }
            _buildDOM() {
                if (this.bufferCanvas = new f.SceneCanvas({
                        width: this.width(),
                        height: this.height()
                    }), this.bufferHitCanvas = new f.HitCanvas({
                        pixelRatio: 1,
                        width: this.width(),
                        height: this.height()
                    }), !v.Konva.isBrowser) return;
                const A = this.container();
                if (!A) throw "Stage has no container. A container is required.";
                A.innerHTML = "", this.content = document.createElement("div"), this.content.style.position = "relative", this.content.style.userSelect = "none", this.content.className = "konvajs-content", this.content.setAttribute("role", "presentation"), A.appendChild(this.content), this._resizeDOM()
            }
            cache() {
                return C.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."), this
            }
            clearCache() {
                return this
            }
            batchDraw() {
                return this.getChildren().forEach(function(A) {
                    A.batchDraw()
                }), this
            }
        }
        g.Stage = z, z.prototype.nodeType = h, (0, e._registerNode)(z), M.Factory.addGetterSetter(z, "container"), v.Konva.isBrowser && document.addEventListener("visibilitychange", () => {
            g.stages.forEach(B => {
                B.batchDraw()
            })
        })
    })(Re)), Re
}
var Gt = {},
    Ae = {},
    $e;

function ot() {
    return $e || ($e = 1, (function(g) {
        Object.defineProperty(g, "__esModule", {
            value: !0
        }), g.Shape = g.shapes = void 0;
        const C = Q(),
            M = rt(),
            T = J(),
            v = at(),
            f = Z(),
            s = Q(),
            e = Qi(),
            a = "hasShadow",
            h = "shadowRGBA",
            o = "patternImage",
            _ = "linearGradient",
            l = "radialGradient";
        let n;

        function r() {
            return n || (n = M.Util.createCanvasElement().getContext("2d"), n)
        }
        g.shapes = {};

        function d(b) {
            const S = this.attrs.fillRule;
            S ? b.fill(S) : b.fill()
        }

        function m(b) {
            b.stroke()
        }

        function w(b) {
            const S = this.attrs.fillRule;
            S ? b.fill(S) : b.fill()
        }

        function i(b) {
            b.stroke()
        }

        function t() {
            this._clearCache(a)
        }

        function c() {
            this._clearCache(h)
        }

        function p() {
            this._clearCache(o)
        }

        function P() {
            this._clearCache(_)
        }

        function G() {
            this._clearCache(l)
        }
        class y extends v.Node {
            constructor(S) {
                super(S);
                let k;
                for (; k = M.Util.getRandomColor(), !(k && !(k in g.shapes)););
                this.colorKey = k, g.shapes[k] = this
            }
            getContext() {
                return M.Util.warn("shape.getContext() method is deprecated. Please do not use it."), this.getLayer().getContext()
            }
            getCanvas() {
                return M.Util.warn("shape.getCanvas() method is deprecated. Please do not use it."), this.getLayer().getCanvas()
            }
            getSceneFunc() {
                return this.attrs.sceneFunc || this._sceneFunc
            }
            getHitFunc() {
                return this.attrs.hitFunc || this._hitFunc
            }
            hasShadow() {
                return this._getCache(a, this._hasShadow)
            }
            _hasShadow() {
                return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY())
            }
            _getFillPattern() {
                return this._getCache(o, this.__getFillPattern)
            }
            __getFillPattern() {
                if (this.fillPatternImage()) {
                    const k = r().createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
                    if (k && k.setTransform) {
                        const N = new M.Transform;
                        N.translate(this.fillPatternX(), this.fillPatternY()), N.rotate(C.Konva.getAngle(this.fillPatternRotation())), N.scale(this.fillPatternScaleX(), this.fillPatternScaleY()), N.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
                        const D = N.getMatrix(),
                            I = typeof DOMMatrix > "u" ? {
                                a: D[0],
                                b: D[1],
                                c: D[2],
                                d: D[3],
                                e: D[4],
                                f: D[5]
                            } : new DOMMatrix(D);
                        k.setTransform(I)
                    }
                    return k
                }
            }
            _getLinearGradient() {
                return this._getCache(_, this.__getLinearGradient)
            }
            __getLinearGradient() {
                const S = this.fillLinearGradientColorStops();
                if (S) {
                    const k = r(),
                        N = this.fillLinearGradientStartPoint(),
                        D = this.fillLinearGradientEndPoint(),
                        I = k.createLinearGradient(N.x, N.y, D.x, D.y);
                    for (let O = 0; O < S.length; O += 2) I.addColorStop(S[O], S[O + 1]);
                    return I
                }
            }
            _getRadialGradient() {
                return this._getCache(l, this.__getRadialGradient)
            }
            __getRadialGradient() {
                const S = this.fillRadialGradientColorStops();
                if (S) {
                    const k = r(),
                        N = this.fillRadialGradientStartPoint(),
                        D = this.fillRadialGradientEndPoint(),
                        I = k.createRadialGradient(N.x, N.y, this.fillRadialGradientStartRadius(), D.x, D.y, this.fillRadialGradientEndRadius());
                    for (let O = 0; O < S.length; O += 2) I.addColorStop(S[O], S[O + 1]);
                    return I
                }
            }
            getShadowRGBA() {
                return this._getCache(h, this._getShadowRGBA)
            }
            _getShadowRGBA() {
                if (!this.hasShadow()) return;
                const S = M.Util.colorToRGBA(this.shadowColor());
                if (S) return "rgba(" + S.r + "," + S.g + "," + S.b + "," + S.a * (this.shadowOpacity() || 1) + ")"
            }
            hasFill() {
                return this._calculate("hasFill", ["fillEnabled", "fill", "fillPatternImage", "fillLinearGradientColorStops", "fillRadialGradientColorStops"], () => this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops()))
            }
            hasStroke() {
                return this._calculate("hasStroke", ["strokeEnabled", "strokeWidth", "stroke", "strokeLinearGradientColorStops"], () => this.strokeEnabled() && this.strokeWidth() && !!(this.stroke() || this.strokeLinearGradientColorStops()))
            }
            hasHitStroke() {
                const S = this.hitStrokeWidth();
                return S === "auto" ? this.hasStroke() : this.strokeEnabled() && !!S
            }
            intersects(S) {
                const k = this.getStage();
                if (!k) return !1;
                const N = k.bufferHitCanvas;
                return N.getContext().clear(), this.drawHit(N, void 0, !0), N.context.getImageData(Math.round(S.x), Math.round(S.y), 1, 1).data[3] > 0
            }
            destroy() {
                return v.Node.prototype.destroy.call(this), delete g.shapes[this.colorKey], delete this.colorKey, this
            }
            _useBufferCanvas(S) {
                var k;
                if (!((k = this.attrs.perfectDrawEnabled) !== null && k !== void 0 ? k : !0)) return !1;
                const D = S || this.hasFill(),
                    I = this.hasStroke(),
                    O = this.getAbsoluteOpacity() !== 1;
                if (D && I && O) return !0;
                const q = this.hasShadow(),
                    u = this.shadowForStrokeEnabled();
                return !!(D && I && q && u)
            }
            setStrokeHitEnabled(S) {
                M.Util.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."), S ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0)
            }
            getStrokeHitEnabled() {
                return this.hitStrokeWidth() !== 0
            }
            getSelfRect() {
                const S = this.size();
                return {
                    x: this._centroid ? -S.width / 2 : 0,
                    y: this._centroid ? -S.height / 2 : 0,
                    width: S.width,
                    height: S.height
                }
            }
            getClientRect(S = {}) {
                let k = !1,
                    N = this.getParent();
                for (; N;) {
                    if (N.isCached()) {
                        k = !0;
                        break
                    }
                    N = N.getParent()
                }
                const D = S.skipTransform,
                    I = S.relativeTo || k && this.getStage() || void 0,
                    O = this.getSelfRect(),
                    u = !S.skipStroke && this.hasStroke() && this.strokeWidth() || 0,
                    x = O.width + u,
                    E = O.height + u,
                    R = !S.skipShadow && this.hasShadow(),
                    F = R ? this.shadowOffsetX() : 0,
                    V = R ? this.shadowOffsetY() : 0,
                    L = x + Math.abs(F),
                    H = E + Math.abs(V),
                    z = R && this.shadowBlur() || 0,
                    B = L + z * 2,
                    A = H + z * 2,
                    U = {
                        width: B,
                        height: A,
                        x: -(u / 2 + z) + Math.min(F, 0) + O.x,
                        y: -(u / 2 + z) + Math.min(V, 0) + O.y
                    };
                return D ? U : this._transformedRect(U, I)
            }
            drawScene(S, k, N) {
                const D = this.getLayer(),
                    I = S || D.getCanvas(),
                    O = I.getContext(),
                    q = this._getCanvasCache(),
                    u = this.getSceneFunc(),
                    x = this.hasShadow();
                let E;
                const R = k === this;
                if (!this.isVisible() && !R) return this;
                if (q) {
                    O.save();
                    const F = this.getAbsoluteTransform(k).getMatrix();
                    return O.transform(F[0], F[1], F[2], F[3], F[4], F[5]), this._drawCachedSceneCanvas(O), O.restore(), this
                }
                if (!u) return this;
                if (O.save(), this._useBufferCanvas()) {
                    E = this.getStage();
                    const F = N || E.bufferCanvas,
                        V = F.getContext();
                    V.clear(), V.save(), V._applyLineJoin(this);
                    const L = this.getAbsoluteTransform(k).getMatrix();
                    V.transform(L[0], L[1], L[2], L[3], L[4], L[5]), u.call(this, V, this), V.restore();
                    const H = F.pixelRatio;
                    x && O._applyShadow(this), O._applyOpacity(this), O._applyGlobalCompositeOperation(this), O.drawImage(F._canvas, F.x || 0, F.y || 0, F.width / H, F.height / H)
                } else {
                    if (O._applyLineJoin(this), !R) {
                        const F = this.getAbsoluteTransform(k).getMatrix();
                        O.transform(F[0], F[1], F[2], F[3], F[4], F[5]), O._applyOpacity(this), O._applyGlobalCompositeOperation(this)
                    }
                    x && O._applyShadow(this), u.call(this, O, this)
                }
                return O.restore(), this
            }
            drawHit(S, k, N = !1) {
                if (!this.shouldDrawHit(k, N)) return this;
                const D = this.getLayer(),
                    I = S || D.hitCanvas,
                    O = I && I.getContext(),
                    q = this.hitFunc() || this.sceneFunc(),
                    u = this._getCanvasCache(),
                    x = u && u.hit;
                if (this.colorKey || M.Util.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()"), x) {
                    O.save();
                    const R = this.getAbsoluteTransform(k).getMatrix();
                    return O.transform(R[0], R[1], R[2], R[3], R[4], R[5]), this._drawCachedHitCanvas(O), O.restore(), this
                }
                if (!q) return this;
                if (O.save(), O._applyLineJoin(this), !(this === k)) {
                    const R = this.getAbsoluteTransform(k).getMatrix();
                    O.transform(R[0], R[1], R[2], R[3], R[4], R[5])
                }
                return q.call(this, O, this), O.restore(), this
            }
            drawHitFromCache(S = 0) {
                const k = this._getCanvasCache(),
                    N = this._getCachedSceneCanvas(),
                    D = k.hit,
                    I = D.getContext(),
                    O = D.getWidth(),
                    q = D.getHeight();
                I.clear(), I.drawImage(N._canvas, 0, 0, O, q);
                try {
                    const u = I.getImageData(0, 0, O, q),
                        x = u.data,
                        E = x.length,
                        R = M.Util._hexToRgb(this.colorKey);
                    for (let F = 0; F < E; F += 4) x[F + 3] > S ? (x[F] = R.r, x[F + 1] = R.g, x[F + 2] = R.b, x[F + 3] = 255) : x[F + 3] = 0;
                    I.putImageData(u, 0, 0)
                } catch (u) {
                    M.Util.error("Unable to draw hit graph from cached scene canvas. " + u.message)
                }
                return this
            }
            hasPointerCapture(S) {
                return e.hasPointerCapture(S, this)
            }
            setPointerCapture(S) {
                e.setPointerCapture(S, this)
            }
            releaseCapture(S) {
                e.releaseCapture(S, this)
            }
        }
        g.Shape = y, y.prototype._fillFunc = d, y.prototype._strokeFunc = m, y.prototype._fillFuncHit = w, y.prototype._strokeFuncHit = i, y.prototype._centroid = !1, y.prototype.nodeType = "Shape", (0, s._registerNode)(y), y.prototype.eventListeners = {}, y.prototype.on.call(y.prototype, "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", t), y.prototype.on.call(y.prototype, "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", c), y.prototype.on.call(y.prototype, "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva", p), y.prototype.on.call(y.prototype, "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", P), y.prototype.on.call(y.prototype, "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", G), T.Factory.addGetterSetter(y, "stroke", void 0, (0, f.getStringOrGradientValidator)()), T.Factory.addGetterSetter(y, "strokeWidth", 2, (0, f.getNumberValidator)()), T.Factory.addGetterSetter(y, "fillAfterStrokeEnabled", !1), T.Factory.addGetterSetter(y, "hitStrokeWidth", "auto", (0, f.getNumberOrAutoValidator)()), T.Factory.addGetterSetter(y, "strokeHitEnabled", !0, (0, f.getBooleanValidator)()), T.Factory.addGetterSetter(y, "perfectDrawEnabled", !0, (0, f.getBooleanValidator)()), T.Factory.addGetterSetter(y, "shadowForStrokeEnabled", !0, (0, f.getBooleanValidator)()), T.Factory.addGetterSetter(y, "lineJoin"), T.Factory.addGetterSetter(y, "lineCap"), T.Factory.addGetterSetter(y, "sceneFunc"), T.Factory.addGetterSetter(y, "hitFunc"), T.Factory.addGetterSetter(y, "dash"), T.Factory.addGetterSetter(y, "dashOffset", 0, (0, f.getNumberValidator)()), T.Factory.addGetterSetter(y, "shadowColor", void 0, (0, f.getStringValidator)()), T.Factory.addGetterSetter(y, "shadowBlur", 0, (0, f.getNumberValidator)()), T.Factory.addGetterSetter(y, "shadowOpacity", 1, (0, f.getNumberValidator)()), T.Factory.addComponentsGetterSetter(y, "shadowOffset", ["x", "y"]), T.Factory.addGetterSetter(y, "shadowOffsetX", 0, (0, f.getNumberValidator)()), T.Factory.addGetterSetter(y, "shadowOffsetY", 0, (0, f.getNumberValidator)()), T.Factory.addGetterSetter(y, "fillPatternImage"), T.Factory.addGetterSetter(y, "fill", void 0, (0, f.getStringOrGradientValidator)()), T.Factory.addGetterSetter(y, "fillPatternX", 0, (0, f.getNumberValidator)()), T.Factory.addGetterSetter(y, "fillPatternY", 0, (0, f.getNumberValidator)()), T.Factory.addGetterSetter(y, "fillLinearGradientColorStops"), T.Factory.addGetterSetter(y, "strokeLinearGradientColorStops"), T.Factory.addGetterSetter(y, "fillRadialGradientStartRadius", 0), T.Factory.addGetterSetter(y, "fillRadialGradientEndRadius", 0), T.Factory.addGetterSetter(y, "fillRadialGradientColorStops"), T.Factory.addGetterSetter(y, "fillPatternRepeat", "repeat"), T.Factory.addGetterSetter(y, "fillEnabled", !0), T.Factory.addGetterSetter(y, "strokeEnabled", !0), T.Factory.addGetterSetter(y, "shadowEnabled", !0), T.Factory.addGetterSetter(y, "dashEnabled", !0), T.Factory.addGetterSetter(y, "strokeScaleEnabled", !0), T.Factory.addGetterSetter(y, "fillPriority", "color"), T.Factory.addComponentsGetterSetter(y, "fillPatternOffset", ["x", "y"]), T.Factory.addGetterSetter(y, "fillPatternOffsetX", 0, (0, f.getNumberValidator)()), T.Factory.addGetterSetter(y, "fillPatternOffsetY", 0, (0, f.getNumberValidator)()), T.Factory.addComponentsGetterSetter(y, "fillPatternScale", ["x", "y"]), T.Factory.addGetterSetter(y, "fillPatternScaleX", 1, (0, f.getNumberValidator)()), T.Factory.addGetterSetter(y, "fillPatternScaleY", 1, (0, f.getNumberValidator)()), T.Factory.addComponentsGetterSetter(y, "fillLinearGradientStartPoint", ["x", "y"]), T.Factory.addComponentsGetterSetter(y, "strokeLinearGradientStartPoint", ["x", "y"]), T.Factory.addGetterSetter(y, "fillLinearGradientStartPointX", 0), T.Factory.addGetterSetter(y, "strokeLinearGradientStartPointX", 0), T.Factory.addGetterSetter(y, "fillLinearGradientStartPointY", 0), T.Factory.addGetterSetter(y, "strokeLinearGradientStartPointY", 0), T.Factory.addComponentsGetterSetter(y, "fillLinearGradientEndPoint", ["x", "y"]), T.Factory.addComponentsGetterSetter(y, "strokeLinearGradientEndPoint", ["x", "y"]), T.Factory.addGetterSetter(y, "fillLinearGradientEndPointX", 0), T.Factory.addGetterSetter(y, "strokeLinearGradientEndPointX", 0), T.Factory.addGetterSetter(y, "fillLinearGradientEndPointY", 0), T.Factory.addGetterSetter(y, "strokeLinearGradientEndPointY", 0), T.Factory.addComponentsGetterSetter(y, "fillRadialGradientStartPoint", ["x", "y"]), T.Factory.addGetterSetter(y, "fillRadialGradientStartPointX", 0), T.Factory.addGetterSetter(y, "fillRadialGradientStartPointY", 0), T.Factory.addComponentsGetterSetter(y, "fillRadialGradientEndPoint", ["x", "y"]), T.Factory.addGetterSetter(y, "fillRadialGradientEndPointX", 0), T.Factory.addGetterSetter(y, "fillRadialGradientEndPointY", 0), T.Factory.addGetterSetter(y, "fillPatternRotation", 0), T.Factory.addGetterSetter(y, "fillRule", void 0, (0, f.getStringValidator)()), T.Factory.backCompat(y, {
            dashArray: "dash",
            getDashArray: "getDash",
            setDashArray: "getDash",
            drawFunc: "sceneFunc",
            getDrawFunc: "getSceneFunc",
            setDrawFunc: "setSceneFunc",
            drawHitFunc: "hitFunc",
            getDrawHitFunc: "getHitFunc",
            setDrawHitFunc: "setHitFunc"
        })
    })(Ae)), Ae
}
var Qe;

function Ji() {
    if (Qe) return Gt;
    Qe = 1, Object.defineProperty(Gt, "__esModule", {
        value: !0
    }), Gt.Layer = void 0;
    const g = rt(),
        C = Se(),
        M = at(),
        T = J(),
        v = be(),
        f = Z(),
        s = ot(),
        e = Q(),
        a = "#",
        h = "beforeDraw",
        o = "draw",
        _ = [{
            x: 0,
            y: 0
        }, {
            x: -1,
            y: -1
        }, {
            x: 1,
            y: -1
        }, {
            x: 1,
            y: 1
        }, {
            x: -1,
            y: 1
        }],
        l = _.length;
    let n = class extends C.Container {
        constructor(d) {
            super(d), this.canvas = new v.SceneCanvas, this.hitCanvas = new v.HitCanvas({
                pixelRatio: 1
            }), this._waitingForDraw = !1, this.on("visibleChange.konva", this._checkVisibility), this._checkVisibility(), this.on("imageSmoothingEnabledChange.konva", this._setSmoothEnabled), this._setSmoothEnabled()
        }
        createPNGStream() {
            return this.canvas._canvas.createPNGStream()
        }
        getCanvas() {
            return this.canvas
        }
        getNativeCanvasElement() {
            return this.canvas._canvas
        }
        getHitCanvas() {
            return this.hitCanvas
        }
        getContext() {
            return this.getCanvas().getContext()
        }
        clear(d) {
            return this.getContext().clear(d), this.getHitCanvas().getContext().clear(d), this
        }
        setZIndex(d) {
            super.setZIndex(d);
            const m = this.getStage();
            return m && m.content && (m.content.removeChild(this.getNativeCanvasElement()), d < m.children.length - 1 ? m.content.insertBefore(this.getNativeCanvasElement(), m.children[d + 1].getCanvas()._canvas) : m.content.appendChild(this.getNativeCanvasElement())), this
        }
        moveToTop() {
            M.Node.prototype.moveToTop.call(this);
            const d = this.getStage();
            return d && d.content && (d.content.removeChild(this.getNativeCanvasElement()), d.content.appendChild(this.getNativeCanvasElement())), !0
        }
        moveUp() {
            if (!M.Node.prototype.moveUp.call(this)) return !1;
            const m = this.getStage();
            return !m || !m.content ? !1 : (m.content.removeChild(this.getNativeCanvasElement()), this.index < m.children.length - 1 ? m.content.insertBefore(this.getNativeCanvasElement(), m.children[this.index + 1].getCanvas()._canvas) : m.content.appendChild(this.getNativeCanvasElement()), !0)
        }
        moveDown() {
            if (M.Node.prototype.moveDown.call(this)) {
                const d = this.getStage();
                if (d) {
                    const m = d.children;
                    d.content && (d.content.removeChild(this.getNativeCanvasElement()), d.content.insertBefore(this.getNativeCanvasElement(), m[this.index + 1].getCanvas()._canvas))
                }
                return !0
            }
            return !1
        }
        moveToBottom() {
            if (M.Node.prototype.moveToBottom.call(this)) {
                const d = this.getStage();
                if (d) {
                    const m = d.children;
                    d.content && (d.content.removeChild(this.getNativeCanvasElement()), d.content.insertBefore(this.getNativeCanvasElement(), m[1].getCanvas()._canvas))
                }
                return !0
            }
            return !1
        }
        getLayer() {
            return this
        }
        remove() {
            const d = this.getNativeCanvasElement();
            return M.Node.prototype.remove.call(this), d && d.parentNode && g.Util._isInDocument(d) && d.parentNode.removeChild(d), this
        }
        getStage() {
            return this.parent
        }
        setSize({
            width: d,
            height: m
        }) {
            return this.canvas.setSize(d, m), this.hitCanvas.setSize(d, m), this._setSmoothEnabled(), this
        }
        _validateAdd(d) {
            const m = d.getType();
            m !== "Group" && m !== "Shape" && g.Util.throw("You may only add groups and shapes to a layer.")
        }
        _toKonvaCanvas(d) {
            return d = d || {}, d.width = d.width || this.getWidth(), d.height = d.height || this.getHeight(), d.x = d.x !== void 0 ? d.x : this.x(), d.y = d.y !== void 0 ? d.y : this.y(), M.Node.prototype._toKonvaCanvas.call(this, d)
        }
        _checkVisibility() {
            this.visible() ? this.canvas._canvas.style.display = "block" : this.canvas._canvas.style.display = "none"
        }
        _setSmoothEnabled() {
            this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled()
        }
        getWidth() {
            if (this.parent) return this.parent.width()
        }
        setWidth() {
            g.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.')
        }
        getHeight() {
            if (this.parent) return this.parent.height()
        }
        setHeight() {
            g.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.')
        }
        batchDraw() {
            return this._waitingForDraw || (this._waitingForDraw = !0, g.Util.requestAnimFrame(() => {
                this.draw(), this._waitingForDraw = !1
            })), this
        }
        getIntersection(d) {
            if (!this.isListening() || !this.isVisible()) return null;
            let m = 1,
                w = !1;
            for (;;) {
                for (let i = 0; i < l; i++) {
                    const t = _[i],
                        c = this._getIntersection({
                            x: d.x + t.x * m,
                            y: d.y + t.y * m
                        }),
                        p = c.shape;
                    if (p) return p;
                    if (w = !!c.antialiased, !c.antialiased) break
                }
                if (w) m += 1;
                else return null
            }
        }
        _getIntersection(d) {
            const m = this.hitCanvas.pixelRatio,
                w = this.hitCanvas.context.getImageData(Math.round(d.x * m), Math.round(d.y * m), 1, 1).data,
                i = w[3];
            if (i === 255) {
                const t = g.Util._rgbToHex(w[0], w[1], w[2]),
                    c = s.shapes[a + t];
                return c ? {
                    shape: c
                } : {
                    antialiased: !0
                }
            } else if (i > 0) return {
                antialiased: !0
            };
            return {}
        }
        drawScene(d, m, w) {
            const i = this.getLayer(),
                t = d || i && i.getCanvas();
            return this._fire(h, {
                node: this
            }), this.clearBeforeDraw() && t.getContext().clear(), C.Container.prototype.drawScene.call(this, t, m, w), this._fire(o, {
                node: this
            }), this
        }
        drawHit(d, m) {
            const w = this.getLayer(),
                i = d || w && w.hitCanvas;
            return w && w.clearBeforeDraw() && w.getHitCanvas().getContext().clear(), C.Container.prototype.drawHit.call(this, i, m), this
        }
        enableHitGraph() {
            return this.hitGraphEnabled(!0), this
        }
        disableHitGraph() {
            return this.hitGraphEnabled(!1), this
        }
        setHitGraphEnabled(d) {
            g.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening(d)
        }
        getHitGraphEnabled(d) {
            return g.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening()
        }
        toggleHitCanvas() {
            if (!this.parent || !this.parent.content) return;
            const d = this.parent;
            !!this.hitCanvas._canvas.parentNode ? d.content.removeChild(this.hitCanvas._canvas) : d.content.appendChild(this.hitCanvas._canvas)
        }
        destroy() {
            return g.Util.releaseCanvas(this.getNativeCanvasElement(), this.getHitCanvas()._canvas), super.destroy()
        }
    };
    return Gt.Layer = n, n.prototype.nodeType = "Layer", (0, e._registerNode)(n), T.Factory.addGetterSetter(n, "imageSmoothingEnabled", !0), T.Factory.addGetterSetter(n, "clearBeforeDraw", !0), T.Factory.addGetterSetter(n, "hitGraphEnabled", !0, (0, f.getBooleanValidator)()), Gt
}
var Nt = {},
    Je;

function gn() {
    if (Je) return Nt;
    Je = 1, Object.defineProperty(Nt, "__esModule", {
        value: !0
    }), Nt.FastLayer = void 0;
    const g = rt(),
        C = Ji(),
        M = Q();
    let T = class extends C.Layer {
        constructor(f) {
            super(f), this.listening(!1), g.Util.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.')
        }
    };
    return Nt.FastLayer = T, T.prototype.nodeType = "FastLayer", (0, M._registerNode)(T), Nt
}
var Ot = {},
    Ze;

function Ne() {
    if (Ze) return Ot;
    Ze = 1, Object.defineProperty(Ot, "__esModule", {
        value: !0
    }), Ot.Group = void 0;
    const g = rt(),
        C = Se(),
        M = Q();
    let T = class extends C.Container {
        _validateAdd(f) {
            const s = f.getType();
            s !== "Group" && s !== "Shape" && g.Util.throw("You may only add groups and shapes to groups.")
        }
    };
    return Ot.Group = T, T.prototype.nodeType = "Group", (0, M._registerNode)(T), Ot
}
var Lt = {},
    ti;

function Oe() {
    if (ti) return Lt;
    ti = 1, Object.defineProperty(Lt, "__esModule", {
        value: !0
    }), Lt.Animation = void 0;
    const g = Q(),
        C = rt(),
        M = (function() {
            return g.glob.performance && g.glob.performance.now ? function() {
                return g.glob.performance.now()
            } : function() {
                return new Date().getTime()
            }
        })();
    let T = class Rt {
        constructor(f, s) {
            this.id = Rt.animIdCounter++, this.frame = {
                time: 0,
                timeDiff: 0,
                lastTime: M(),
                frameRate: 0
            }, this.func = f, this.setLayers(s)
        }
        setLayers(f) {
            let s = [];
            return f && (s = Array.isArray(f) ? f : [f]), this.layers = s, this
        }
        getLayers() {
            return this.layers
        }
        addLayer(f) {
            const s = this.layers,
                e = s.length;
            for (let a = 0; a < e; a++)
                if (s[a]._id === f._id) return !1;
            return this.layers.push(f), !0
        }
        isRunning() {
            const s = Rt.animations,
                e = s.length;
            for (let a = 0; a < e; a++)
                if (s[a].id === this.id) return !0;
            return !1
        }
        start() {
            return this.stop(), this.frame.timeDiff = 0, this.frame.lastTime = M(), Rt._addAnimation(this), this
        }
        stop() {
            return Rt._removeAnimation(this), this
        }
        _updateFrameObject(f) {
            this.frame.timeDiff = f - this.frame.lastTime, this.frame.lastTime = f, this.frame.time += this.frame.timeDiff, this.frame.frameRate = 1e3 / this.frame.timeDiff
        }
        static _addAnimation(f) {
            this.animations.push(f), this._handleAnimation()
        }
        static _removeAnimation(f) {
            const s = f.id,
                e = this.animations,
                a = e.length;
            for (let h = 0; h < a; h++)
                if (e[h].id === s) {
                    this.animations.splice(h, 1);
                    break
                }
        }
        static _runFrames() {
            const f = {},
                s = this.animations;
            for (let e = 0; e < s.length; e++) {
                const a = s[e],
                    h = a.layers,
                    o = a.func;
                a._updateFrameObject(M());
                const _ = h.length;
                let l;
                if (o ? l = o.call(a, a.frame) !== !1 : l = !0, !!l)
                    for (let n = 0; n < _; n++) {
                        const r = h[n];
                        r._id !== void 0 && (f[r._id] = r)
                    }
            }
            for (const e in f) f.hasOwnProperty(e) && f[e].batchDraw()
        }
        static _animationLoop() {
            const f = Rt;
            f.animations.length ? (f._runFrames(), C.Util.requestAnimFrame(f._animationLoop)) : f.animRunning = !1
        }
        static _handleAnimation() {
            this.animRunning || (this.animRunning = !0, C.Util.requestAnimFrame(this._animationLoop))
        }
    };
    return Lt.Animation = T, T.animations = [], T.animIdCounter = 0, T.animRunning = !1, Lt
}
var Ee = {},
    ei;

function pn() {
    return ei || (ei = 1, (function(g) {
        Object.defineProperty(g, "__esModule", {
            value: !0
        }), g.Easings = g.Tween = void 0;
        const C = rt(),
            M = Oe(),
            T = at(),
            v = Q(),
            f = {
                node: 1,
                duration: 1,
                easing: 1,
                onFinish: 1,
                yoyo: 1
            },
            s = 1,
            e = 2,
            a = 3,
            h = ["fill", "stroke", "shadowColor"];
        let o = 0;
        class _ {
            constructor(r, d, m, w, i, t, c) {
                this.prop = r, this.propFunc = d, this.begin = w, this._pos = w, this.duration = t, this._change = 0, this.prevPos = 0, this.yoyo = c, this._time = 0, this._position = 0, this._startTime = 0, this._finish = 0, this.func = m, this._change = i - this.begin, this.pause()
            }
            fire(r) {
                const d = this[r];
                d && d()
            }
            setTime(r) {
                r > this.duration ? this.yoyo ? (this._time = this.duration, this.reverse()) : this.finish() : r < 0 ? this.yoyo ? (this._time = 0, this.play()) : this.reset() : (this._time = r, this.update())
            }
            getTime() {
                return this._time
            }
            setPosition(r) {
                this.prevPos = this._pos, this.propFunc(r), this._pos = r
            }
            getPosition(r) {
                return r === void 0 && (r = this._time), this.func(r, this.begin, this._change, this.duration)
            }
            play() {
                this.state = e, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onPlay")
            }
            reverse() {
                this.state = a, this._time = this.duration - this._time, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onReverse")
            }
            seek(r) {
                this.pause(), this._time = r, this.update(), this.fire("onSeek")
            }
            reset() {
                this.pause(), this._time = 0, this.update(), this.fire("onReset")
            }
            finish() {
                this.pause(), this._time = this.duration, this.update(), this.fire("onFinish")
            }
            update() {
                this.setPosition(this.getPosition(this._time)), this.fire("onUpdate")
            }
            onEnterFrame() {
                const r = this.getTimer() - this._startTime;
                this.state === e ? this.setTime(r) : this.state === a && this.setTime(this.duration - r)
            }
            pause() {
                this.state = s, this.fire("onPause")
            }
            getTimer() {
                return new Date().getTime()
            }
        }
        class l {
            constructor(r) {
                const d = this,
                    m = r.node,
                    w = m._id,
                    i = r.easing || g.Easings.Linear,
                    t = !!r.yoyo;
                let c, p;
                typeof r.duration > "u" ? c = .3 : r.duration === 0 ? c = .001 : c = r.duration, this.node = m, this._id = o++;
                const P = m.getLayer() || (m instanceof v.Konva.Stage ? m.getLayers() : null);
                P || C.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."), this.anim = new M.Animation(function() {
                    d.tween.onEnterFrame()
                }, P), this.tween = new _(p, function(G) {
                    d._tweenFunc(G)
                }, i, 0, 1, c * 1e3, t), this._addListeners(), l.attrs[w] || (l.attrs[w] = {}), l.attrs[w][this._id] || (l.attrs[w][this._id] = {}), l.tweens[w] || (l.tweens[w] = {});
                for (p in r) f[p] === void 0 && this._addAttr(p, r[p]);
                this.reset(), this.onFinish = r.onFinish, this.onReset = r.onReset, this.onUpdate = r.onUpdate
            }
            _addAttr(r, d) {
                const m = this.node,
                    w = m._id;
                let i, t, c, p, P;
                const G = l.tweens[w][r];
                G && delete l.attrs[w][G][r];
                let y = m.getAttr(r);
                if (C.Util._isArray(d))
                    if (i = [], t = Math.max(d.length, y.length), r === "points" && d.length !== y.length && (d.length > y.length ? (p = y, y = C.Util._prepareArrayForTween(y, d, m.closed())) : (c = d, d = C.Util._prepareArrayForTween(d, y, m.closed()))), r.indexOf("fill") === 0)
                        for (let b = 0; b < t; b++)
                            if (b % 2 === 0) i.push(d[b] - y[b]);
                            else {
                                const S = C.Util.colorToRGBA(y[b]);
                                P = C.Util.colorToRGBA(d[b]), y[b] = S, i.push({
                                    r: P.r - S.r,
                                    g: P.g - S.g,
                                    b: P.b - S.b,
                                    a: P.a - S.a
                                })
                            }
                else
                    for (let b = 0; b < t; b++) i.push(d[b] - y[b]);
                else h.indexOf(r) !== -1 ? (y = C.Util.colorToRGBA(y), P = C.Util.colorToRGBA(d), i = {
                    r: P.r - y.r,
                    g: P.g - y.g,
                    b: P.b - y.b,
                    a: P.a - y.a
                }) : i = d - y;
                l.attrs[w][this._id][r] = {
                    start: y,
                    diff: i,
                    end: d,
                    trueEnd: c,
                    trueStart: p
                }, l.tweens[w][r] = this._id
            }
            _tweenFunc(r) {
                const d = this.node,
                    m = l.attrs[d._id][this._id];
                let w, i, t, c, p, P, G, y;
                for (w in m) {
                    if (i = m[w], t = i.start, c = i.diff, y = i.end, C.Util._isArray(t))
                        if (p = [], G = Math.max(t.length, y.length), w.indexOf("fill") === 0)
                            for (P = 0; P < G; P++) P % 2 === 0 ? p.push((t[P] || 0) + c[P] * r) : p.push("rgba(" + Math.round(t[P].r + c[P].r * r) + "," + Math.round(t[P].g + c[P].g * r) + "," + Math.round(t[P].b + c[P].b * r) + "," + (t[P].a + c[P].a * r) + ")");
                        else
                            for (P = 0; P < G; P++) p.push((t[P] || 0) + c[P] * r);
                    else h.indexOf(w) !== -1 ? p = "rgba(" + Math.round(t.r + c.r * r) + "," + Math.round(t.g + c.g * r) + "," + Math.round(t.b + c.b * r) + "," + (t.a + c.a * r) + ")" : p = t + c * r;
                    d.setAttr(w, p)
                }
            }
            _addListeners() {
                this.tween.onPlay = () => {
                    this.anim.start()
                }, this.tween.onReverse = () => {
                    this.anim.start()
                }, this.tween.onPause = () => {
                    this.anim.stop()
                }, this.tween.onFinish = () => {
                    const r = this.node,
                        d = l.attrs[r._id][this._id];
                    d.points && d.points.trueEnd && r.setAttr("points", d.points.trueEnd), this.onFinish && this.onFinish.call(this)
                }, this.tween.onReset = () => {
                    const r = this.node,
                        d = l.attrs[r._id][this._id];
                    d.points && d.points.trueStart && r.points(d.points.trueStart), this.onReset && this.onReset()
                }, this.tween.onUpdate = () => {
                    this.onUpdate && this.onUpdate.call(this)
                }
            }
            play() {
                return this.tween.play(), this
            }
            reverse() {
                return this.tween.reverse(), this
            }
            reset() {
                return this.tween.reset(), this
            }
            seek(r) {
                return this.tween.seek(r * 1e3), this
            }
            pause() {
                return this.tween.pause(), this
            }
            finish() {
                return this.tween.finish(), this
            }
            destroy() {
                const r = this.node._id,
                    d = this._id,
                    m = l.tweens[r];
                this.pause(), this.anim && this.anim.stop();
                for (const w in m) delete l.tweens[r][w];
                delete l.attrs[r][d], l.tweens[r] && (Object.keys(l.tweens[r]).length === 0 && delete l.tweens[r], Object.keys(l.attrs[r]).length === 0 && delete l.attrs[r])
            }
        }
        g.Tween = l, l.attrs = {}, l.tweens = {}, T.Node.prototype.to = function(n) {
            const r = n.onFinish;
            n.node = this, n.onFinish = function() {
                this.destroy(), r && r()
            }, new l(n).play()
        }, g.Easings = {
            BackEaseIn(n, r, d, m) {
                return d * (n /= m) * n * ((1.70158 + 1) * n - 1.70158) + r
            },
            BackEaseOut(n, r, d, m) {
                return d * ((n = n / m - 1) * n * ((1.70158 + 1) * n + 1.70158) + 1) + r
            },
            BackEaseInOut(n, r, d, m) {
                let w = 1.70158;
                return (n /= m / 2) < 1 ? d / 2 * (n * n * (((w *= 1.525) + 1) * n - w)) + r : d / 2 * ((n -= 2) * n * (((w *= 1.525) + 1) * n + w) + 2) + r
            },
            ElasticEaseIn(n, r, d, m, w, i) {
                let t = 0;
                return n === 0 ? r : (n /= m) === 1 ? r + d : (i || (i = m * .3), !w || w < Math.abs(d) ? (w = d, t = i / 4) : t = i / (2 * Math.PI) * Math.asin(d / w), -(w * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * m - t) * (2 * Math.PI) / i)) + r)
            },
            ElasticEaseOut(n, r, d, m, w, i) {
                let t = 0;
                return n === 0 ? r : (n /= m) === 1 ? r + d : (i || (i = m * .3), !w || w < Math.abs(d) ? (w = d, t = i / 4) : t = i / (2 * Math.PI) * Math.asin(d / w), w * Math.pow(2, -10 * n) * Math.sin((n * m - t) * (2 * Math.PI) / i) + d + r)
            },
            ElasticEaseInOut(n, r, d, m, w, i) {
                let t = 0;
                return n === 0 ? r : (n /= m / 2) === 2 ? r + d : (i || (i = m * (.3 * 1.5)), !w || w < Math.abs(d) ? (w = d, t = i / 4) : t = i / (2 * Math.PI) * Math.asin(d / w), n < 1 ? -.5 * (w * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * m - t) * (2 * Math.PI) / i)) + r : w * Math.pow(2, -10 * (n -= 1)) * Math.sin((n * m - t) * (2 * Math.PI) / i) * .5 + d + r)
            },
            BounceEaseOut(n, r, d, m) {
                return (n /= m) < 1 / 2.75 ? d * (7.5625 * n * n) + r : n < 2 / 2.75 ? d * (7.5625 * (n -= 1.5 / 2.75) * n + .75) + r : n < 2.5 / 2.75 ? d * (7.5625 * (n -= 2.25 / 2.75) * n + .9375) + r : d * (7.5625 * (n -= 2.625 / 2.75) * n + .984375) + r
            },
            BounceEaseIn(n, r, d, m) {
                return d - g.Easings.BounceEaseOut(m - n, 0, d, m) + r
            },
            BounceEaseInOut(n, r, d, m) {
                return n < m / 2 ? g.Easings.BounceEaseIn(n * 2, 0, d, m) * .5 + r : g.Easings.BounceEaseOut(n * 2 - m, 0, d, m) * .5 + d * .5 + r
            },
            EaseIn(n, r, d, m) {
                return d * (n /= m) * n + r
            },
            EaseOut(n, r, d, m) {
                return -d * (n /= m) * (n - 2) + r
            },
            EaseInOut(n, r, d, m) {
                return (n /= m / 2) < 1 ? d / 2 * n * n + r : -d / 2 * (--n * (n - 2) - 1) + r
            },
            StrongEaseIn(n, r, d, m) {
                return d * (n /= m) * n * n * n * n + r
            },
            StrongEaseOut(n, r, d, m) {
                return d * ((n = n / m - 1) * n * n * n * n + 1) + r
            },
            StrongEaseInOut(n, r, d, m) {
                return (n /= m / 2) < 1 ? d / 2 * n * n * n * n * n + r : d / 2 * ((n -= 2) * n * n * n * n + 2) + r
            },
            Linear(n, r, d, m) {
                return d * n / m + r
            }
        }
    })(Ee)), Ee
}
var ii;

function _n() {
    return ii || (ii = 1, (function(g) {
        Object.defineProperty(g, "__esModule", {
            value: !0
        }), g.Konva = void 0;
        const C = Q(),
            M = rt(),
            T = at(),
            v = Se(),
            f = fn(),
            s = Ji(),
            e = gn(),
            a = Ne(),
            h = Ge(),
            o = ot(),
            _ = Oe(),
            l = pn(),
            n = $i(),
            r = be();
        g.Konva = M.Util._assign(C.Konva, {
            Util: M.Util,
            Transform: M.Transform,
            Node: T.Node,
            Container: v.Container,
            Stage: f.Stage,
            stages: f.stages,
            Layer: s.Layer,
            FastLayer: e.FastLayer,
            Group: a.Group,
            DD: h.DD,
            Shape: o.Shape,
            shapes: o.shapes,
            Animation: _.Animation,
            Tween: l.Tween,
            Easings: l.Easings,
            Context: n.Context,
            Canvas: r.Canvas
        }), g.default = g.Konva
    })(Ce)), Ce
}
var Dt = {},
    ni;

function mn() {
    if (ni) return Dt;
    ni = 1, Object.defineProperty(Dt, "__esModule", {
        value: !0
    }), Dt.Arc = void 0;
    const g = J(),
        C = ot(),
        M = Q(),
        T = Z(),
        v = Q();
    let f = class extends C.Shape {
        _sceneFunc(e) {
            const a = M.Konva.getAngle(this.angle()),
                h = this.clockwise();
            e.beginPath(), e.arc(0, 0, this.outerRadius(), 0, a, h), e.arc(0, 0, this.innerRadius(), a, 0, !h), e.closePath(), e.fillStrokeShape(this)
        }
        getWidth() {
            return this.outerRadius() * 2
        }
        getHeight() {
            return this.outerRadius() * 2
        }
        setWidth(e) {
            this.outerRadius(e / 2)
        }
        setHeight(e) {
            this.outerRadius(e / 2)
        }
        getSelfRect() {
            const e = this.innerRadius(),
                a = this.outerRadius(),
                h = this.clockwise(),
                o = M.Konva.getAngle(h ? 360 - this.angle() : this.angle()),
                _ = Math.cos(Math.min(o, Math.PI)),
                l = 1,
                n = Math.sin(Math.min(Math.max(Math.PI, o), 3 * Math.PI / 2)),
                r = Math.sin(Math.min(o, Math.PI / 2)),
                d = _ * (_ > 0 ? e : a),
                m = l * a,
                w = n * (n > 0 ? e : a),
                i = r * (r > 0 ? a : e);
            return {
                x: d,
                y: h ? -1 * i : w,
                width: m - d,
                height: i - w
            }
        }
    };
    return Dt.Arc = f, f.prototype._centroid = !0, f.prototype.className = "Arc", f.prototype._attrsAffectingSize = ["innerRadius", "outerRadius", "angle", "clockwise"], (0, v._registerNode)(f), g.Factory.addGetterSetter(f, "innerRadius", 0, (0, T.getNumberValidator)()), g.Factory.addGetterSetter(f, "outerRadius", 0, (0, T.getNumberValidator)()), g.Factory.addGetterSetter(f, "angle", 0, (0, T.getNumberValidator)()), g.Factory.addGetterSetter(f, "clockwise", !1, (0, T.getBooleanValidator)()), Dt
}
var It = {},
    Ut = {},
    ri;

function Zi() {
    if (ri) return Ut;
    ri = 1, Object.defineProperty(Ut, "__esModule", {
        value: !0
    }), Ut.Line = void 0;
    const g = J(),
        C = Q(),
        M = ot(),
        T = Z();

    function v(e, a, h, o, _, l, n) {
        const r = Math.sqrt(Math.pow(h - e, 2) + Math.pow(o - a, 2)),
            d = Math.sqrt(Math.pow(_ - h, 2) + Math.pow(l - o, 2)),
            m = n * r / (r + d),
            w = n * d / (r + d),
            i = h - m * (_ - e),
            t = o - m * (l - a),
            c = h + w * (_ - e),
            p = o + w * (l - a);
        return [i, t, c, p]
    }

    function f(e, a) {
        const h = e.length,
            o = [];
        for (let _ = 2; _ < h - 2; _ += 2) {
            const l = v(e[_ - 2], e[_ - 1], e[_], e[_ + 1], e[_ + 2], e[_ + 3], a);
            isNaN(l[0]) || (o.push(l[0]), o.push(l[1]), o.push(e[_]), o.push(e[_ + 1]), o.push(l[2]), o.push(l[3]))
        }
        return o
    }
    let s = class extends M.Shape {
        constructor(a) {
            super(a), this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
                this._clearCache("tensionPoints")
            })
        }
        _sceneFunc(a) {
            const h = this.points(),
                o = h.length,
                _ = this.tension(),
                l = this.closed(),
                n = this.bezier();
            if (!o) return;
            let r = 0;
            if (a.beginPath(), a.moveTo(h[0], h[1]), _ !== 0 && o > 4) {
                const d = this.getTensionPoints(),
                    m = d.length;
                for (r = l ? 0 : 4, l || a.quadraticCurveTo(d[0], d[1], d[2], d[3]); r < m - 2;) a.bezierCurveTo(d[r++], d[r++], d[r++], d[r++], d[r++], d[r++]);
                l || a.quadraticCurveTo(d[m - 2], d[m - 1], h[o - 2], h[o - 1])
            } else if (n)
                for (r = 2; r < o;) a.bezierCurveTo(h[r++], h[r++], h[r++], h[r++], h[r++], h[r++]);
            else
                for (r = 2; r < o; r += 2) a.lineTo(h[r], h[r + 1]);
            l ? (a.closePath(), a.fillStrokeShape(this)) : a.strokeShape(this)
        }
        getTensionPoints() {
            return this._getCache("tensionPoints", this._getTensionPoints)
        }
        _getTensionPoints() {
            return this.closed() ? this._getTensionPointsClosed() : f(this.points(), this.tension())
        }
        _getTensionPointsClosed() {
            const a = this.points(),
                h = a.length,
                o = this.tension(),
                _ = v(a[h - 2], a[h - 1], a[0], a[1], a[2], a[3], o),
                l = v(a[h - 4], a[h - 3], a[h - 2], a[h - 1], a[0], a[1], o),
                n = f(a, o);
            return [_[2], _[3]].concat(n).concat([l[0], l[1], a[h - 2], a[h - 1], l[2], l[3], _[0], _[1], a[0], a[1]])
        }
        getWidth() {
            return this.getSelfRect().width
        }
        getHeight() {
            return this.getSelfRect().height
        }
        getSelfRect() {
            let a = this.points();
            if (a.length < 4) return {
                x: a[0] || 0,
                y: a[1] || 0,
                width: 0,
                height: 0
            };
            this.tension() !== 0 ? a = [a[0], a[1], ...this._getTensionPoints(), a[a.length - 2], a[a.length - 1]] : a = this.points();
            let h = a[0],
                o = a[0],
                _ = a[1],
                l = a[1],
                n, r;
            for (let d = 0; d < a.length / 2; d++) n = a[d * 2], r = a[d * 2 + 1], h = Math.min(h, n), o = Math.max(o, n), _ = Math.min(_, r), l = Math.max(l, r);
            return {
                x: h,
                y: _,
                width: o - h,
                height: l - _
            }
        }
    };
    return Ut.Line = s, s.prototype.className = "Line", s.prototype._attrsAffectingSize = ["points", "bezier", "tension"], (0, C._registerNode)(s), g.Factory.addGetterSetter(s, "closed", !1), g.Factory.addGetterSetter(s, "bezier", !1), g.Factory.addGetterSetter(s, "tension", 0, (0, T.getNumberValidator)()), g.Factory.addGetterSetter(s, "points", [], (0, T.getNumberArrayValidator)()), Ut
}
var Bt = {},
    ke = {},
    si;

function yn() {
    return si || (si = 1, (function(g) {
        Object.defineProperty(g, "__esModule", {
            value: !0
        }), g.t2length = g.getQuadraticArcLength = g.getCubicArcLength = g.binomialCoefficients = g.cValues = g.tValues = void 0, g.tValues = [
            [],
            [],
            [-.5773502691896257, .5773502691896257],
            [0, -.7745966692414834, .7745966692414834],
            [-.33998104358485626, .33998104358485626, -.8611363115940526, .8611363115940526],
            [0, -.5384693101056831, .5384693101056831, -.906179845938664, .906179845938664],
            [.6612093864662645, -.6612093864662645, -.2386191860831969, .2386191860831969, -.932469514203152, .932469514203152],
            [0, .4058451513773972, -.4058451513773972, -.7415311855993945, .7415311855993945, -.9491079123427585, .9491079123427585],
            [-.1834346424956498, .1834346424956498, -.525532409916329, .525532409916329, -.7966664774136267, .7966664774136267, -.9602898564975363, .9602898564975363],
            [0, -.8360311073266358, .8360311073266358, -.9681602395076261, .9681602395076261, -.3242534234038089, .3242534234038089, -.6133714327005904, .6133714327005904],
            [-.14887433898163122, .14887433898163122, -.4333953941292472, .4333953941292472, -.6794095682990244, .6794095682990244, -.8650633666889845, .8650633666889845, -.9739065285171717, .9739065285171717],
            [0, -.26954315595234496, .26954315595234496, -.5190961292068118, .5190961292068118, -.7301520055740494, .7301520055740494, -.8870625997680953, .8870625997680953, -.978228658146057, .978228658146057],
            [-.1252334085114689, .1252334085114689, -.3678314989981802, .3678314989981802, -.5873179542866175, .5873179542866175, -.7699026741943047, .7699026741943047, -.9041172563704749, .9041172563704749, -.9815606342467192, .9815606342467192],
            [0, -.2304583159551348, .2304583159551348, -.44849275103644687, .44849275103644687, -.6423493394403402, .6423493394403402, -.8015780907333099, .8015780907333099, -.9175983992229779, .9175983992229779, -.9841830547185881, .9841830547185881],
            [-.10805494870734367, .10805494870734367, -.31911236892788974, .31911236892788974, -.5152486363581541, .5152486363581541, -.6872929048116855, .6872929048116855, -.827201315069765, .827201315069765, -.9284348836635735, .9284348836635735, -.9862838086968123, .9862838086968123],
            [0, -.20119409399743451, .20119409399743451, -.3941513470775634, .3941513470775634, -.5709721726085388, .5709721726085388, -.7244177313601701, .7244177313601701, -.8482065834104272, .8482065834104272, -.937273392400706, .937273392400706, -.9879925180204854, .9879925180204854],
            [-.09501250983763744, .09501250983763744, -.2816035507792589, .2816035507792589, -.45801677765722737, .45801677765722737, -.6178762444026438, .6178762444026438, -.755404408355003, .755404408355003, -.8656312023878318, .8656312023878318, -.9445750230732326, .9445750230732326, -.9894009349916499, .9894009349916499],
            [0, -.17848418149584785, .17848418149584785, -.3512317634538763, .3512317634538763, -.5126905370864769, .5126905370864769, -.6576711592166907, .6576711592166907, -.7815140038968014, .7815140038968014, -.8802391537269859, .8802391537269859, -.9506755217687678, .9506755217687678, -.9905754753144174, .9905754753144174],
            [-.0847750130417353, .0847750130417353, -.2518862256915055, .2518862256915055, -.41175116146284263, .41175116146284263, -.5597708310739475, .5597708310739475, -.6916870430603532, .6916870430603532, -.8037049589725231, .8037049589725231, -.8926024664975557, .8926024664975557, -.9558239495713977, .9558239495713977, -.9915651684209309, .9915651684209309],
            [0, -.16035864564022537, .16035864564022537, -.31656409996362983, .31656409996362983, -.46457074137596094, .46457074137596094, -.600545304661681, .600545304661681, -.7209661773352294, .7209661773352294, -.8227146565371428, .8227146565371428, -.9031559036148179, .9031559036148179, -.96020815213483, .96020815213483, -.9924068438435844, .9924068438435844],
            [-.07652652113349734, .07652652113349734, -.22778585114164507, .22778585114164507, -.37370608871541955, .37370608871541955, -.5108670019508271, .5108670019508271, -.636053680726515, .636053680726515, -.7463319064601508, .7463319064601508, -.8391169718222188, .8391169718222188, -.912234428251326, .912234428251326, -.9639719272779138, .9639719272779138, -.9931285991850949, .9931285991850949],
            [0, -.1455618541608951, .1455618541608951, -.2880213168024011, .2880213168024011, -.4243421202074388, .4243421202074388, -.5516188358872198, .5516188358872198, -.6671388041974123, .6671388041974123, -.7684399634756779, .7684399634756779, -.8533633645833173, .8533633645833173, -.9200993341504008, .9200993341504008, -.9672268385663063, .9672268385663063, -.9937521706203895, .9937521706203895],
            [-.06973927331972223, .06973927331972223, -.20786042668822127, .20786042668822127, -.34193582089208424, .34193582089208424, -.469355837986757, .469355837986757, -.5876404035069116, .5876404035069116, -.6944872631866827, .6944872631866827, -.7878168059792081, .7878168059792081, -.8658125777203002, .8658125777203002, -.926956772187174, .926956772187174, -.9700604978354287, .9700604978354287, -.9942945854823992, .9942945854823992],
            [0, -.1332568242984661, .1332568242984661, -.26413568097034495, .26413568097034495, -.3903010380302908, .3903010380302908, -.5095014778460075, .5095014778460075, -.6196098757636461, .6196098757636461, -.7186613631319502, .7186613631319502, -.8048884016188399, .8048884016188399, -.8767523582704416, .8767523582704416, -.9329710868260161, .9329710868260161, -.9725424712181152, .9725424712181152, -.9947693349975522, .9947693349975522],
            [-.06405689286260563, .06405689286260563, -.1911188674736163, .1911188674736163, -.3150426796961634, .3150426796961634, -.4337935076260451, .4337935076260451, -.5454214713888396, .5454214713888396, -.6480936519369755, .6480936519369755, -.7401241915785544, .7401241915785544, -.820001985973903, .820001985973903, -.8864155270044011, .8864155270044011, -.9382745520027328, .9382745520027328, -.9747285559713095, .9747285559713095, -.9951872199970213, .9951872199970213]
        ], g.cValues = [
            [],
            [],
            [1, 1],
            [.8888888888888888, .5555555555555556, .5555555555555556],
            [.6521451548625461, .6521451548625461, .34785484513745385, .34785484513745385],
            [.5688888888888889, .47862867049936647, .47862867049936647, .23692688505618908, .23692688505618908],
            [.3607615730481386, .3607615730481386, .46791393457269104, .46791393457269104, .17132449237917036, .17132449237917036],
            [.4179591836734694, .3818300505051189, .3818300505051189, .27970539148927664, .27970539148927664, .1294849661688697, .1294849661688697],
            [.362683783378362, .362683783378362, .31370664587788727, .31370664587788727, .22238103445337448, .22238103445337448, .10122853629037626, .10122853629037626],
            [.3302393550012598, .1806481606948574, .1806481606948574, .08127438836157441, .08127438836157441, .31234707704000286, .31234707704000286, .26061069640293544, .26061069640293544],
            [.29552422471475287, .29552422471475287, .26926671930999635, .26926671930999635, .21908636251598204, .21908636251598204, .1494513491505806, .1494513491505806, .06667134430868814, .06667134430868814],
            [.2729250867779006, .26280454451024665, .26280454451024665, .23319376459199048, .23319376459199048, .18629021092773426, .18629021092773426, .1255803694649046, .1255803694649046, .05566856711617366, .05566856711617366],
            [.24914704581340277, .24914704581340277, .2334925365383548, .2334925365383548, .20316742672306592, .20316742672306592, .16007832854334622, .16007832854334622, .10693932599531843, .10693932599531843, .04717533638651183, .04717533638651183],
            [.2325515532308739, .22628318026289723, .22628318026289723, .2078160475368885, .2078160475368885, .17814598076194574, .17814598076194574, .13887351021978725, .13887351021978725, .09212149983772845, .09212149983772845, .04048400476531588, .04048400476531588],
            [.2152638534631578, .2152638534631578, .2051984637212956, .2051984637212956, .18553839747793782, .18553839747793782, .15720316715819355, .15720316715819355, .12151857068790319, .12151857068790319, .08015808715976021, .08015808715976021, .03511946033175186, .03511946033175186],
            [.2025782419255613, .19843148532711158, .19843148532711158, .1861610000155622, .1861610000155622, .16626920581699392, .16626920581699392, .13957067792615432, .13957067792615432, .10715922046717194, .10715922046717194, .07036604748810812, .07036604748810812, .03075324199611727, .03075324199611727],
            [.1894506104550685, .1894506104550685, .18260341504492358, .18260341504492358, .16915651939500254, .16915651939500254, .14959598881657674, .14959598881657674, .12462897125553388, .12462897125553388, .09515851168249279, .09515851168249279, .062253523938647894, .062253523938647894, .027152459411754096, .027152459411754096],
            [.17944647035620653, .17656270536699264, .17656270536699264, .16800410215645004, .16800410215645004, .15404576107681028, .15404576107681028, .13513636846852548, .13513636846852548, .11188384719340397, .11188384719340397, .08503614831717918, .08503614831717918, .0554595293739872, .0554595293739872, .02414830286854793, .02414830286854793],
            [.1691423829631436, .1691423829631436, .16427648374583273, .16427648374583273, .15468467512626524, .15468467512626524, .14064291467065065, .14064291467065065, .12255520671147846, .12255520671147846, .10094204410628717, .10094204410628717, .07642573025488905, .07642573025488905, .0497145488949698, .0497145488949698, .02161601352648331, .02161601352648331],
            [.1610544498487837, .15896884339395434, .15896884339395434, .15276604206585967, .15276604206585967, .1426067021736066, .1426067021736066, .12875396253933621, .12875396253933621, .11156664554733399, .11156664554733399, .09149002162245, .09149002162245, .06904454273764123, .06904454273764123, .0448142267656996, .0448142267656996, .019461788229726478, .019461788229726478],
            [.15275338713072584, .15275338713072584, .14917298647260374, .14917298647260374, .14209610931838204, .14209610931838204, .13168863844917664, .13168863844917664, .11819453196151841, .11819453196151841, .10193011981724044, .10193011981724044, .08327674157670475, .08327674157670475, .06267204833410907, .06267204833410907, .04060142980038694, .04060142980038694, .017614007139152118, .017614007139152118],
            [.14608113364969041, .14452440398997005, .14452440398997005, .13988739479107315, .13988739479107315, .13226893863333747, .13226893863333747, .12183141605372853, .12183141605372853, .10879729916714838, .10879729916714838, .09344442345603386, .09344442345603386, .0761001136283793, .0761001136283793, .057134425426857205, .057134425426857205, .036953789770852494, .036953789770852494, .016017228257774335, .016017228257774335],
            [.13925187285563198, .13925187285563198, .13654149834601517, .13654149834601517, .13117350478706238, .13117350478706238, .12325237681051242, .12325237681051242, .11293229608053922, .11293229608053922, .10041414444288096, .10041414444288096, .08594160621706773, .08594160621706773, .06979646842452049, .06979646842452049, .052293335152683286, .052293335152683286, .03377490158481415, .03377490158481415, .0146279952982722, .0146279952982722],
            [.13365457218610619, .1324620394046966, .1324620394046966, .12890572218808216, .12890572218808216, .12304908430672953, .12304908430672953, .11499664022241136, .11499664022241136, .10489209146454141, .10489209146454141, .09291576606003515, .09291576606003515, .07928141177671895, .07928141177671895, .06423242140852585, .06423242140852585, .04803767173108467, .04803767173108467, .030988005856979445, .030988005856979445, .013411859487141771, .013411859487141771],
            [.12793819534675216, .12793819534675216, .1258374563468283, .1258374563468283, .12167047292780339, .12167047292780339, .1155056680537256, .1155056680537256, .10744427011596563, .10744427011596563, .09761865210411388, .09761865210411388, .08619016153195327, .08619016153195327, .0733464814110803, .0733464814110803, .05929858491543678, .05929858491543678, .04427743881741981, .04427743881741981, .028531388628933663, .028531388628933663, .0123412297999872, .0123412297999872]
        ], g.binomialCoefficients = [
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 3, 1]
        ];
        const C = (s, e, a) => {
            let h, o;
            const l = a / 2;
            h = 0;
            for (let n = 0; n < 20; n++) o = l * g.tValues[20][n] + l, h += g.cValues[20][n] * T(s, e, o);
            return l * h
        };
        g.getCubicArcLength = C;
        const M = (s, e, a) => {
            a === void 0 && (a = 1);
            const h = s[0] - 2 * s[1] + s[2],
                o = e[0] - 2 * e[1] + e[2],
                _ = 2 * s[1] - 2 * s[0],
                l = 2 * e[1] - 2 * e[0],
                n = 4 * (h * h + o * o),
                r = 4 * (h * _ + o * l),
                d = _ * _ + l * l;
            if (n === 0) return a * Math.sqrt(Math.pow(s[2] - s[0], 2) + Math.pow(e[2] - e[0], 2));
            const m = r / (2 * n),
                w = d / n,
                i = a + m,
                t = w - m * m,
                c = i * i + t > 0 ? Math.sqrt(i * i + t) : 0,
                p = m * m + t > 0 ? Math.sqrt(m * m + t) : 0,
                P = m + Math.sqrt(m * m + t) !== 0 ? t * Math.log(Math.abs((i + c) / (m + p))) : 0;
            return Math.sqrt(n) / 2 * (i * c - m * p + P)
        };
        g.getQuadraticArcLength = M;

        function T(s, e, a) {
            const h = v(1, a, s),
                o = v(1, a, e),
                _ = h * h + o * o;
            return Math.sqrt(_)
        }
        const v = (s, e, a) => {
                const h = a.length - 1;
                let o, _;
                if (h === 0) return 0;
                if (s === 0) {
                    _ = 0;
                    for (let l = 0; l <= h; l++) _ += g.binomialCoefficients[h][l] * Math.pow(1 - e, h - l) * Math.pow(e, l) * a[l];
                    return _
                } else {
                    o = new Array(h);
                    for (let l = 0; l < h; l++) o[l] = h * (a[l + 1] - a[l]);
                    return v(s - 1, e, o)
                }
            },
            f = (s, e, a) => {
                let h = 1,
                    o = s / e,
                    _ = (s - a(o)) / e,
                    l = 0;
                for (; h > .001;) {
                    const n = a(o + _),
                        r = Math.abs(s - n) / e;
                    if (r < h) h = r, o += _;
                    else {
                        const d = a(o - _),
                            m = Math.abs(s - d) / e;
                        m < h ? (h = m, o -= _) : _ /= 2
                    }
                    if (l++, l > 500) break
                }
                return o
            };
        g.t2length = f
    })(ke)), ke
}
var ai;

function Le() {
    if (ai) return Bt;
    ai = 1, Object.defineProperty(Bt, "__esModule", {
        value: !0
    }), Bt.Path = void 0;
    const g = J(),
        C = Q(),
        M = ot(),
        T = yn();
    let v = class ft extends M.Shape {
        constructor(s) {
            super(s), this.dataArray = [], this.pathLength = 0, this._readDataAttribute(), this.on("dataChange.konva", function() {
                this._readDataAttribute()
            })
        }
        _readDataAttribute() {
            this.dataArray = ft.parsePathData(this.data()), this.pathLength = ft.getPathLength(this.dataArray)
        }
        _sceneFunc(s) {
            const e = this.dataArray;
            s.beginPath();
            let a = !1;
            for (let h = 0; h < e.length; h++) {
                const o = e[h].command,
                    _ = e[h].points;
                switch (o) {
                    case "L":
                        s.lineTo(_[0], _[1]);
                        break;
                    case "M":
                        s.moveTo(_[0], _[1]);
                        break;
                    case "C":
                        s.bezierCurveTo(_[0], _[1], _[2], _[3], _[4], _[5]);
                        break;
                    case "Q":
                        s.quadraticCurveTo(_[0], _[1], _[2], _[3]);
                        break;
                    case "A":
                        const l = _[0],
                            n = _[1],
                            r = _[2],
                            d = _[3],
                            m = _[4],
                            w = _[5],
                            i = _[6],
                            t = _[7],
                            c = r > d ? r : d,
                            p = r > d ? 1 : r / d,
                            P = r > d ? d / r : 1;
                        s.translate(l, n), s.rotate(i), s.scale(p, P), s.arc(0, 0, c, m, m + w, 1 - t), s.scale(1 / p, 1 / P), s.rotate(-i), s.translate(-l, -n);
                        break;
                    case "z":
                        a = !0, s.closePath();
                        break
                }
            }!a && !this.hasFill() ? s.strokeShape(this) : s.fillStrokeShape(this)
        }
        getSelfRect() {
            let s = [];
            this.dataArray.forEach(function(n) {
                if (n.command === "A") {
                    const r = n.points[4],
                        d = n.points[5],
                        m = n.points[4] + d;
                    let w = Math.PI / 180;
                    if (Math.abs(r - m) < w && (w = Math.abs(r - m)), d < 0)
                        for (let i = r - w; i > m; i -= w) {
                            const t = ft.getPointOnEllipticalArc(n.points[0], n.points[1], n.points[2], n.points[3], i, 0);
                            s.push(t.x, t.y)
                        } else
                            for (let i = r + w; i < m; i += w) {
                                const t = ft.getPointOnEllipticalArc(n.points[0], n.points[1], n.points[2], n.points[3], i, 0);
                                s.push(t.x, t.y)
                            }
                } else if (n.command === "C")
                    for (let r = 0; r <= 1; r += .01) {
                        const d = ft.getPointOnCubicBezier(r, n.start.x, n.start.y, n.points[0], n.points[1], n.points[2], n.points[3], n.points[4], n.points[5]);
                        s.push(d.x, d.y)
                    } else s = s.concat(n.points)
            });
            let e = s[0],
                a = s[0],
                h = s[1],
                o = s[1],
                _, l;
            for (let n = 0; n < s.length / 2; n++) _ = s[n * 2], l = s[n * 2 + 1], isNaN(_) || (e = Math.min(e, _), a = Math.max(a, _)), isNaN(l) || (h = Math.min(h, l), o = Math.max(o, l));
            return {
                x: e,
                y: h,
                width: a - e,
                height: o - h
            }
        }
        getLength() {
            return this.pathLength
        }
        getPointAtLength(s) {
            return ft.getPointAtLengthOfDataArray(s, this.dataArray)
        }
        static getLineLength(s, e, a, h) {
            return Math.sqrt((a - s) * (a - s) + (h - e) * (h - e))
        }
        static getPathLength(s) {
            let e = 0;
            for (let a = 0; a < s.length; ++a) e += s[a].pathLength;
            return e
        }
        static getPointAtLengthOfDataArray(s, e) {
            let a, h = 0,
                o = e.length;
            if (!o) return null;
            for (; h < o && s > e[h].pathLength;) s -= e[h].pathLength, ++h;
            if (h === o) return a = e[h - 1].points.slice(-2), {
                x: a[0],
                y: a[1]
            };
            if (s < .01) return e[h].command === "M" ? (a = e[h].points.slice(0, 2), {
                x: a[0],
                y: a[1]
            }) : {
                x: e[h].start.x,
                y: e[h].start.y
            };
            const _ = e[h],
                l = _.points;
            switch (_.command) {
                case "L":
                    return ft.getPointOnLine(s, _.start.x, _.start.y, l[0], l[1]);
                case "C":
                    return ft.getPointOnCubicBezier((0, T.t2length)(s, ft.getPathLength(e), c => (0, T.getCubicArcLength)([_.start.x, l[0], l[2], l[4]], [_.start.y, l[1], l[3], l[5]], c)), _.start.x, _.start.y, l[0], l[1], l[2], l[3], l[4], l[5]);
                case "Q":
                    return ft.getPointOnQuadraticBezier((0, T.t2length)(s, ft.getPathLength(e), c => (0, T.getQuadraticArcLength)([_.start.x, l[0], l[2]], [_.start.y, l[1], l[3]], c)), _.start.x, _.start.y, l[0], l[1], l[2], l[3]);
                case "A":
                    const n = l[0],
                        r = l[1],
                        d = l[2],
                        m = l[3],
                        w = l[5],
                        i = l[6];
                    let t = l[4];
                    return t += w * s / _.pathLength, ft.getPointOnEllipticalArc(n, r, d, m, t, i)
            }
            return null
        }
        static getPointOnLine(s, e, a, h, o, _, l) {
            _ = _ ? ? e, l = l ? ? a;
            const n = this.getLineLength(e, a, h, o);
            if (n < 1e-10) return {
                x: e,
                y: a
            };
            if (h === e) return {
                x: _,
                y: l + (o > a ? s : -s)
            };
            const r = (o - a) / (h - e),
                d = Math.sqrt(s * s / (1 + r * r)) * (h < e ? -1 : 1),
                m = r * d;
            if (Math.abs(l - a - r * (_ - e)) < 1e-10) return {
                x: _ + d,
                y: l + m
            };
            const w = ((_ - e) * (h - e) + (l - a) * (o - a)) / (n * n),
                i = e + w * (h - e),
                t = a + w * (o - a),
                c = this.getLineLength(_, l, i, t),
                p = Math.sqrt(s * s - c * c),
                P = Math.sqrt(p * p / (1 + r * r)) * (h < e ? -1 : 1),
                G = r * P;
            return {
                x: i + P,
                y: t + G
            }
        }
        static getPointOnCubicBezier(s, e, a, h, o, _, l, n, r) {
            function d(p) {
                return p * p * p
            }

            function m(p) {
                return 3 * p * p * (1 - p)
            }

            function w(p) {
                return 3 * p * (1 - p) * (1 - p)
            }

            function i(p) {
                return (1 - p) * (1 - p) * (1 - p)
            }
            const t = n * d(s) + _ * m(s) + h * w(s) + e * i(s),
                c = r * d(s) + l * m(s) + o * w(s) + a * i(s);
            return {
                x: t,
                y: c
            }
        }
        static getPointOnQuadraticBezier(s, e, a, h, o, _, l) {
            function n(i) {
                return i * i
            }

            function r(i) {
                return 2 * i * (1 - i)
            }

            function d(i) {
                return (1 - i) * (1 - i)
            }
            const m = _ * n(s) + h * r(s) + e * d(s),
                w = l * n(s) + o * r(s) + a * d(s);
            return {
                x: m,
                y: w
            }
        }
        static getPointOnEllipticalArc(s, e, a, h, o, _) {
            const l = Math.cos(_),
                n = Math.sin(_),
                r = {
                    x: a * Math.cos(o),
                    y: h * Math.sin(o)
                };
            return {
                x: s + (r.x * l - r.y * n),
                y: e + (r.x * n + r.y * l)
            }
        }
        static parsePathData(s) {
            if (!s) return [];
            let e = s;
            const a = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
            e = e.replace(new RegExp(" ", "g"), ",");
            for (let m = 0; m < a.length; m++) e = e.replace(new RegExp(a[m], "g"), "|" + a[m]);
            const h = e.split("|"),
                o = [],
                _ = [];
            let l = 0,
                n = 0;
            const r = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
            let d;
            for (let m = 1; m < h.length; m++) {
                let w = h[m],
                    i = w.charAt(0);
                for (w = w.slice(1), _.length = 0; d = r.exec(w);) _.push(d[0]);
                const t = [];
                for (let c = 0, p = _.length; c < p; c++) {
                    if (_[c] === "00") {
                        t.push(0, 0);
                        continue
                    }
                    const P = parseFloat(_[c]);
                    isNaN(P) ? t.push(0) : t.push(P)
                }
                for (; t.length > 0 && !isNaN(t[0]);) {
                    let c = "",
                        p = [];
                    const P = l,
                        G = n;
                    let y, b, S, k, N, D, I, O, q, u;
                    switch (i) {
                        case "l":
                            l += t.shift(), n += t.shift(), c = "L", p.push(l, n);
                            break;
                        case "L":
                            l = t.shift(), n = t.shift(), p.push(l, n);
                            break;
                        case "m":
                            const x = t.shift(),
                                E = t.shift();
                            if (l += x, n += E, c = "M", o.length > 2 && o[o.length - 1].command === "z") {
                                for (let R = o.length - 2; R >= 0; R--)
                                    if (o[R].command === "M") {
                                        l = o[R].points[0] + x, n = o[R].points[1] + E;
                                        break
                                    }
                            }
                            p.push(l, n), i = "l";
                            break;
                        case "M":
                            l = t.shift(), n = t.shift(), c = "M", p.push(l, n), i = "L";
                            break;
                        case "h":
                            l += t.shift(), c = "L", p.push(l, n);
                            break;
                        case "H":
                            l = t.shift(), c = "L", p.push(l, n);
                            break;
                        case "v":
                            n += t.shift(), c = "L", p.push(l, n);
                            break;
                        case "V":
                            n = t.shift(), c = "L", p.push(l, n);
                            break;
                        case "C":
                            p.push(t.shift(), t.shift(), t.shift(), t.shift()), l = t.shift(), n = t.shift(), p.push(l, n);
                            break;
                        case "c":
                            p.push(l + t.shift(), n + t.shift(), l + t.shift(), n + t.shift()), l += t.shift(), n += t.shift(), c = "C", p.push(l, n);
                            break;
                        case "S":
                            b = l, S = n, y = o[o.length - 1], y.command === "C" && (b = l + (l - y.points[2]), S = n + (n - y.points[3])), p.push(b, S, t.shift(), t.shift()), l = t.shift(), n = t.shift(), c = "C", p.push(l, n);
                            break;
                        case "s":
                            b = l, S = n, y = o[o.length - 1], y.command === "C" && (b = l + (l - y.points[2]), S = n + (n - y.points[3])), p.push(b, S, l + t.shift(), n + t.shift()), l += t.shift(), n += t.shift(), c = "C", p.push(l, n);
                            break;
                        case "Q":
                            p.push(t.shift(), t.shift()), l = t.shift(), n = t.shift(), p.push(l, n);
                            break;
                        case "q":
                            p.push(l + t.shift(), n + t.shift()), l += t.shift(), n += t.shift(), c = "Q", p.push(l, n);
                            break;
                        case "T":
                            b = l, S = n, y = o[o.length - 1], y.command === "Q" && (b = l + (l - y.points[0]), S = n + (n - y.points[1])), l = t.shift(), n = t.shift(), c = "Q", p.push(b, S, l, n);
                            break;
                        case "t":
                            b = l, S = n, y = o[o.length - 1], y.command === "Q" && (b = l + (l - y.points[0]), S = n + (n - y.points[1])), l += t.shift(), n += t.shift(), c = "Q", p.push(b, S, l, n);
                            break;
                        case "A":
                            k = t.shift(), N = t.shift(), D = t.shift(), I = t.shift(), O = t.shift(), q = l, u = n, l = t.shift(), n = t.shift(), c = "A", p = this.convertEndpointToCenterParameterization(q, u, l, n, I, O, k, N, D);
                            break;
                        case "a":
                            k = t.shift(), N = t.shift(), D = t.shift(), I = t.shift(), O = t.shift(), q = l, u = n, l += t.shift(), n += t.shift(), c = "A", p = this.convertEndpointToCenterParameterization(q, u, l, n, I, O, k, N, D);
                            break
                    }
                    o.push({
                        command: c || i,
                        points: p,
                        start: {
                            x: P,
                            y: G
                        },
                        pathLength: this.calcLength(P, G, c || i, p)
                    })
                }(i === "z" || i === "Z") && o.push({
                    command: "z",
                    points: [],
                    start: void 0,
                    pathLength: 0
                })
            }
            return o
        }
        static calcLength(s, e, a, h) {
            let o, _, l, n;
            const r = ft;
            switch (a) {
                case "L":
                    return r.getLineLength(s, e, h[0], h[1]);
                case "C":
                    return (0, T.getCubicArcLength)([s, h[0], h[2], h[4]], [e, h[1], h[3], h[5]], 1);
                case "Q":
                    return (0, T.getQuadraticArcLength)([s, h[0], h[2]], [e, h[1], h[3]], 1);
                case "A":
                    o = 0;
                    const d = h[4],
                        m = h[5],
                        w = h[4] + m;
                    let i = Math.PI / 180;
                    if (Math.abs(d - w) < i && (i = Math.abs(d - w)), _ = r.getPointOnEllipticalArc(h[0], h[1], h[2], h[3], d, 0), m < 0)
                        for (n = d - i; n > w; n -= i) l = r.getPointOnEllipticalArc(h[0], h[1], h[2], h[3], n, 0), o += r.getLineLength(_.x, _.y, l.x, l.y), _ = l;
                    else
                        for (n = d + i; n < w; n += i) l = r.getPointOnEllipticalArc(h[0], h[1], h[2], h[3], n, 0), o += r.getLineLength(_.x, _.y, l.x, l.y), _ = l;
                    return l = r.getPointOnEllipticalArc(h[0], h[1], h[2], h[3], w, 0), o += r.getLineLength(_.x, _.y, l.x, l.y), o
            }
            return 0
        }
        static convertEndpointToCenterParameterization(s, e, a, h, o, _, l, n, r) {
            const d = r * (Math.PI / 180),
                m = Math.cos(d) * (s - a) / 2 + Math.sin(d) * (e - h) / 2,
                w = -1 * Math.sin(d) * (s - a) / 2 + Math.cos(d) * (e - h) / 2,
                i = m * m / (l * l) + w * w / (n * n);
            i > 1 && (l *= Math.sqrt(i), n *= Math.sqrt(i));
            let t = Math.sqrt((l * l * (n * n) - l * l * (w * w) - n * n * (m * m)) / (l * l * (w * w) + n * n * (m * m)));
            o === _ && (t *= -1), isNaN(t) && (t = 0);
            const c = t * l * w / n,
                p = t * -n * m / l,
                P = (s + a) / 2 + Math.cos(d) * c - Math.sin(d) * p,
                G = (e + h) / 2 + Math.sin(d) * c + Math.cos(d) * p,
                y = function(O) {
                    return Math.sqrt(O[0] * O[0] + O[1] * O[1])
                },
                b = function(O, q) {
                    return (O[0] * q[0] + O[1] * q[1]) / (y(O) * y(q))
                },
                S = function(O, q) {
                    return (O[0] * q[1] < O[1] * q[0] ? -1 : 1) * Math.acos(b(O, q))
                },
                k = S([1, 0], [(m - c) / l, (w - p) / n]),
                N = [(m - c) / l, (w - p) / n],
                D = [(-1 * m - c) / l, (-1 * w - p) / n];
            let I = S(N, D);
            return b(N, D) <= -1 && (I = Math.PI), b(N, D) >= 1 && (I = 0), _ === 0 && I > 0 && (I = I - 2 * Math.PI), _ === 1 && I < 0 && (I = I + 2 * Math.PI), [P, G, l, n, k, I, d, _]
        }
    };
    return Bt.Path = v, v.prototype.className = "Path", v.prototype._attrsAffectingSize = ["data"], (0, C._registerNode)(v), g.Factory.addGetterSetter(v, "data"), Bt
}
var oi;

function vn() {
    if (oi) return It;
    oi = 1, Object.defineProperty(It, "__esModule", {
        value: !0
    }), It.Arrow = void 0;
    const g = J(),
        C = Zi(),
        M = Z(),
        T = Q(),
        v = Le();
    let f = class extends C.Line {
        _sceneFunc(e) {
            super._sceneFunc(e);
            const a = Math.PI * 2,
                h = this.points();
            let o = h;
            const _ = this.tension() !== 0 && h.length > 4;
            _ && (o = this.getTensionPoints());
            const l = this.pointerLength(),
                n = h.length;
            let r, d;
            if (_) {
                const i = [o[o.length - 4], o[o.length - 3], o[o.length - 2], o[o.length - 1], h[n - 2], h[n - 1]],
                    t = v.Path.calcLength(o[o.length - 4], o[o.length - 3], "C", i),
                    c = v.Path.getPointOnQuadraticBezier(Math.min(1, 1 - l / t), i[0], i[1], i[2], i[3], i[4], i[5]);
                r = h[n - 2] - c.x, d = h[n - 1] - c.y
            } else r = h[n - 2] - h[n - 4], d = h[n - 1] - h[n - 3];
            const m = (Math.atan2(d, r) + a) % a,
                w = this.pointerWidth();
            this.pointerAtEnding() && (e.save(), e.beginPath(), e.translate(h[n - 2], h[n - 1]), e.rotate(m), e.moveTo(0, 0), e.lineTo(-l, w / 2), e.lineTo(-l, -w / 2), e.closePath(), e.restore(), this.__fillStroke(e)), this.pointerAtBeginning() && (e.save(), e.beginPath(), e.translate(h[0], h[1]), _ ? (r = (o[0] + o[2]) / 2 - h[0], d = (o[1] + o[3]) / 2 - h[1]) : (r = h[2] - h[0], d = h[3] - h[1]), e.rotate((Math.atan2(-d, -r) + a) % a), e.moveTo(0, 0), e.lineTo(-l, w / 2), e.lineTo(-l, -w / 2), e.closePath(), e.restore(), this.__fillStroke(e))
        }
        __fillStroke(e) {
            const a = this.dashEnabled();
            a && (this.attrs.dashEnabled = !1, e.setLineDash([])), e.fillStrokeShape(this), a && (this.attrs.dashEnabled = !0)
        }
        getSelfRect() {
            const e = super.getSelfRect(),
                a = this.pointerWidth() / 2;
            return {
                x: e.x,
                y: e.y - a,
                width: e.width,
                height: e.height + a * 2
            }
        }
    };
    return It.Arrow = f, f.prototype.className = "Arrow", (0, T._registerNode)(f), g.Factory.addGetterSetter(f, "pointerLength", 10, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(f, "pointerWidth", 10, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(f, "pointerAtBeginning", !1), g.Factory.addGetterSetter(f, "pointerAtEnding", !0), It
}
var Vt = {},
    hi;

function bn() {
    if (hi) return Vt;
    hi = 1, Object.defineProperty(Vt, "__esModule", {
        value: !0
    }), Vt.Circle = void 0;
    const g = J(),
        C = ot(),
        M = Z(),
        T = Q();
    let v = class extends C.Shape {
        _sceneFunc(s) {
            s.beginPath(), s.arc(0, 0, this.attrs.radius || 0, 0, Math.PI * 2, !1), s.closePath(), s.fillStrokeShape(this)
        }
        getWidth() {
            return this.radius() * 2
        }
        getHeight() {
            return this.radius() * 2
        }
        setWidth(s) {
            this.radius() !== s / 2 && this.radius(s / 2)
        }
        setHeight(s) {
            this.radius() !== s / 2 && this.radius(s / 2)
        }
    };
    return Vt.Circle = v, v.prototype._centroid = !0, v.prototype.className = "Circle", v.prototype._attrsAffectingSize = ["radius"], (0, T._registerNode)(v), g.Factory.addGetterSetter(v, "radius", 0, (0, M.getNumberValidator)()), Vt
}
var Ht = {},
    li;

function Sn() {
    if (li) return Ht;
    li = 1, Object.defineProperty(Ht, "__esModule", {
        value: !0
    }), Ht.Ellipse = void 0;
    const g = J(),
        C = ot(),
        M = Z(),
        T = Q();
    let v = class extends C.Shape {
        _sceneFunc(s) {
            const e = this.radiusX(),
                a = this.radiusY();
            s.beginPath(), s.save(), e !== a && s.scale(1, a / e), s.arc(0, 0, e, 0, Math.PI * 2, !1), s.restore(), s.closePath(), s.fillStrokeShape(this)
        }
        getWidth() {
            return this.radiusX() * 2
        }
        getHeight() {
            return this.radiusY() * 2
        }
        setWidth(s) {
            this.radiusX(s / 2)
        }
        setHeight(s) {
            this.radiusY(s / 2)
        }
    };
    return Ht.Ellipse = v, v.prototype.className = "Ellipse", v.prototype._centroid = !0, v.prototype._attrsAffectingSize = ["radiusX", "radiusY"], (0, T._registerNode)(v), g.Factory.addComponentsGetterSetter(v, "radius", ["x", "y"]), g.Factory.addGetterSetter(v, "radiusX", 0, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(v, "radiusY", 0, (0, M.getNumberValidator)()), Ht
}
var qt = {},
    ci;

function Cn() {
    if (ci) return qt;
    ci = 1, Object.defineProperty(qt, "__esModule", {
        value: !0
    }), qt.Image = void 0;
    const g = rt(),
        C = J(),
        M = ot(),
        T = Q(),
        v = Z();
    class f extends M.Shape {
        constructor(e) {
            super(e), this._loadListener = () => {
                this._requestDraw()
            }, this.on("imageChange.konva", a => {
                this._removeImageLoad(a.oldVal), this._setImageLoad()
            }), this._setImageLoad()
        }
        _setImageLoad() {
            const e = this.image();
            e && e.complete || e && e.readyState === 4 || e && e.addEventListener && e.addEventListener("load", this._loadListener)
        }
        _removeImageLoad(e) {
            e && e.removeEventListener && e.removeEventListener("load", this._loadListener)
        }
        destroy() {
            return this._removeImageLoad(this.image()), super.destroy(), this
        }
        _useBufferCanvas() {
            const e = !!this.cornerRadius(),
                a = this.hasShadow();
            return e && a ? !0 : super._useBufferCanvas(!0)
        }
        _sceneFunc(e) {
            const a = this.getWidth(),
                h = this.getHeight(),
                o = this.cornerRadius(),
                _ = this.attrs.image;
            let l;
            if (_) {
                const n = this.attrs.cropWidth,
                    r = this.attrs.cropHeight;
                n && r ? l = [_, this.cropX(), this.cropY(), n, r, 0, 0, a, h] : l = [_, 0, 0, a, h]
            }(this.hasFill() || this.hasStroke() || o) && (e.beginPath(), o ? g.Util.drawRoundedRectPath(e, a, h, o) : e.rect(0, 0, a, h), e.closePath(), e.fillStrokeShape(this)), _ && (o && e.clip(), e.drawImage.apply(e, l))
        }
        _hitFunc(e) {
            const a = this.width(),
                h = this.height(),
                o = this.cornerRadius();
            e.beginPath(), o ? g.Util.drawRoundedRectPath(e, a, h, o) : e.rect(0, 0, a, h), e.closePath(), e.fillStrokeShape(this)
        }
        getWidth() {
            var e, a;
            return (e = this.attrs.width) !== null && e !== void 0 ? e : (a = this.image()) === null || a === void 0 ? void 0 : a.width
        }
        getHeight() {
            var e, a;
            return (e = this.attrs.height) !== null && e !== void 0 ? e : (a = this.image()) === null || a === void 0 ? void 0 : a.height
        }
        static fromURL(e, a, h = null) {
            const o = g.Util.createImageElement();
            o.onload = function() {
                const _ = new f({
                    image: o
                });
                a(_)
            }, o.onerror = h, o.crossOrigin = "Anonymous", o.src = e
        }
    }
    return qt.Image = f, f.prototype.className = "Image", (0, T._registerNode)(f), C.Factory.addGetterSetter(f, "cornerRadius", 0, (0, v.getNumberOrArrayOfNumbersValidator)(4)), C.Factory.addGetterSetter(f, "image"), C.Factory.addComponentsGetterSetter(f, "crop", ["x", "y", "width", "height"]), C.Factory.addGetterSetter(f, "cropX", 0, (0, v.getNumberValidator)()), C.Factory.addGetterSetter(f, "cropY", 0, (0, v.getNumberValidator)()), C.Factory.addGetterSetter(f, "cropWidth", 0, (0, v.getNumberValidator)()), C.Factory.addGetterSetter(f, "cropHeight", 0, (0, v.getNumberValidator)()), qt
}
var xt = {},
    di;

function wn() {
    if (di) return xt;
    di = 1, Object.defineProperty(xt, "__esModule", {
        value: !0
    }), xt.Tag = xt.Label = void 0;
    const g = J(),
        C = ot(),
        M = Ne(),
        T = Z(),
        v = Q(),
        f = ["fontFamily", "fontSize", "fontStyle", "padding", "lineHeight", "text", "width", "height", "pointerDirection", "pointerWidth", "pointerHeight"],
        s = "Change.konva",
        e = "none",
        a = "up",
        h = "right",
        o = "down",
        _ = "left",
        l = f.length;
    let n = class extends M.Group {
        constructor(m) {
            super(m), this.on("add.konva", function(w) {
                this._addListeners(w.child), this._sync()
            })
        }
        getText() {
            return this.find("Text")[0]
        }
        getTag() {
            return this.find("Tag")[0]
        }
        _addListeners(m) {
            let w = this,
                i;
            const t = function() {
                w._sync()
            };
            for (i = 0; i < l; i++) m.on(f[i] + s, t)
        }
        getWidth() {
            return this.getText().width()
        }
        getHeight() {
            return this.getText().height()
        }
        _sync() {
            let m = this.getText(),
                w = this.getTag(),
                i, t, c, p, P, G, y;
            if (m && w) {
                switch (i = m.width(), t = m.height(), c = w.pointerDirection(), p = w.pointerWidth(), y = w.pointerHeight(), P = 0, G = 0, c) {
                    case a:
                        P = i / 2, G = -1 * y;
                        break;
                    case h:
                        P = i + p, G = t / 2;
                        break;
                    case o:
                        P = i / 2, G = t + y;
                        break;
                    case _:
                        P = -1 * p, G = t / 2;
                        break
                }
                w.setAttrs({
                    x: -1 * P,
                    y: -1 * G,
                    width: i,
                    height: t
                }), m.setAttrs({
                    x: -1 * P,
                    y: -1 * G
                })
            }
        }
    };
    xt.Label = n, n.prototype.className = "Label", (0, v._registerNode)(n);
    class r extends C.Shape {
        _sceneFunc(m) {
            const w = this.width(),
                i = this.height(),
                t = this.pointerDirection(),
                c = this.pointerWidth(),
                p = this.pointerHeight(),
                P = this.cornerRadius();
            let G = 0,
                y = 0,
                b = 0,
                S = 0;
            typeof P == "number" ? G = y = b = S = Math.min(P, w / 2, i / 2) : (G = Math.min(P[0] || 0, w / 2, i / 2), y = Math.min(P[1] || 0, w / 2, i / 2), S = Math.min(P[2] || 0, w / 2, i / 2), b = Math.min(P[3] || 0, w / 2, i / 2)), m.beginPath(), m.moveTo(G, 0), t === a && (m.lineTo((w - c) / 2, 0), m.lineTo(w / 2, -1 * p), m.lineTo((w + c) / 2, 0)), m.lineTo(w - y, 0), m.arc(w - y, y, y, Math.PI * 3 / 2, 0, !1), t === h && (m.lineTo(w, (i - p) / 2), m.lineTo(w + c, i / 2), m.lineTo(w, (i + p) / 2)), m.lineTo(w, i - S), m.arc(w - S, i - S, S, 0, Math.PI / 2, !1), t === o && (m.lineTo((w + c) / 2, i), m.lineTo(w / 2, i + p), m.lineTo((w - c) / 2, i)), m.lineTo(b, i), m.arc(b, i - b, b, Math.PI / 2, Math.PI, !1), t === _ && (m.lineTo(0, (i + p) / 2), m.lineTo(-1 * c, i / 2), m.lineTo(0, (i - p) / 2)), m.lineTo(0, G), m.arc(G, G, G, Math.PI, Math.PI * 3 / 2, !1), m.closePath(), m.fillStrokeShape(this)
        }
        getSelfRect() {
            let m = 0,
                w = 0,
                i = this.pointerWidth(),
                t = this.pointerHeight(),
                c = this.pointerDirection(),
                p = this.width(),
                P = this.height();
            return c === a ? (w -= t, P += t) : c === o ? P += t : c === _ ? (m -= i * 1.5, p += i) : c === h && (p += i * 1.5), {
                x: m,
                y: w,
                width: p,
                height: P
            }
        }
    }
    return xt.Tag = r, r.prototype.className = "Tag", (0, v._registerNode)(r), g.Factory.addGetterSetter(r, "pointerDirection", e), g.Factory.addGetterSetter(r, "pointerWidth", 0, (0, T.getNumberValidator)()), g.Factory.addGetterSetter(r, "pointerHeight", 0, (0, T.getNumberValidator)()), g.Factory.addGetterSetter(r, "cornerRadius", 0, (0, T.getNumberOrArrayOfNumbersValidator)(4)), xt
}
var Wt = {},
    ui;

function tn() {
    if (ui) return Wt;
    ui = 1, Object.defineProperty(Wt, "__esModule", {
        value: !0
    }), Wt.Rect = void 0;
    const g = J(),
        C = ot(),
        M = Q(),
        T = rt(),
        v = Z();
    let f = class extends C.Shape {
        _sceneFunc(e) {
            const a = this.cornerRadius(),
                h = this.width(),
                o = this.height();
            e.beginPath(), a ? T.Util.drawRoundedRectPath(e, h, o, a) : e.rect(0, 0, h, o), e.closePath(), e.fillStrokeShape(this)
        }
    };
    return Wt.Rect = f, f.prototype.className = "Rect", (0, M._registerNode)(f), g.Factory.addGetterSetter(f, "cornerRadius", 0, (0, v.getNumberOrArrayOfNumbersValidator)(4)), Wt
}
var zt = {},
    fi;

function xn() {
    if (fi) return zt;
    fi = 1, Object.defineProperty(zt, "__esModule", {
        value: !0
    }), zt.RegularPolygon = void 0;
    const g = J(),
        C = ot(),
        M = Z(),
        T = Q();
    let v = class extends C.Shape {
        _sceneFunc(s) {
            const e = this._getPoints();
            s.beginPath(), s.moveTo(e[0].x, e[0].y);
            for (let a = 1; a < e.length; a++) s.lineTo(e[a].x, e[a].y);
            s.closePath(), s.fillStrokeShape(this)
        }
        _getPoints() {
            const s = this.attrs.sides,
                e = this.attrs.radius || 0,
                a = [];
            for (let h = 0; h < s; h++) a.push({
                x: e * Math.sin(h * 2 * Math.PI / s),
                y: -1 * e * Math.cos(h * 2 * Math.PI / s)
            });
            return a
        }
        getSelfRect() {
            const s = this._getPoints();
            let e = s[0].x,
                a = s[0].y,
                h = s[0].x,
                o = s[0].y;
            return s.forEach(_ => {
                e = Math.min(e, _.x), a = Math.max(a, _.x), h = Math.min(h, _.y), o = Math.max(o, _.y)
            }), {
                x: e,
                y: h,
                width: a - e,
                height: o - h
            }
        }
        getWidth() {
            return this.radius() * 2
        }
        getHeight() {
            return this.radius() * 2
        }
        setWidth(s) {
            this.radius(s / 2)
        }
        setHeight(s) {
            this.radius(s / 2)
        }
    };
    return zt.RegularPolygon = v, v.prototype.className = "RegularPolygon", v.prototype._centroid = !0, v.prototype._attrsAffectingSize = ["radius"], (0, T._registerNode)(v), g.Factory.addGetterSetter(v, "radius", 0, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(v, "sides", 0, (0, M.getNumberValidator)()), zt
}
var Yt = {},
    gi;

function Pn() {
    if (gi) return Yt;
    gi = 1, Object.defineProperty(Yt, "__esModule", {
        value: !0
    }), Yt.Ring = void 0;
    const g = J(),
        C = ot(),
        M = Z(),
        T = Q(),
        v = Math.PI * 2;
    let f = class extends C.Shape {
        _sceneFunc(e) {
            e.beginPath(), e.arc(0, 0, this.innerRadius(), 0, v, !1), e.moveTo(this.outerRadius(), 0), e.arc(0, 0, this.outerRadius(), v, 0, !0), e.closePath(), e.fillStrokeShape(this)
        }
        getWidth() {
            return this.outerRadius() * 2
        }
        getHeight() {
            return this.outerRadius() * 2
        }
        setWidth(e) {
            this.outerRadius(e / 2)
        }
        setHeight(e) {
            this.outerRadius(e / 2)
        }
    };
    return Yt.Ring = f, f.prototype.className = "Ring", f.prototype._centroid = !0, f.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], (0, T._registerNode)(f), g.Factory.addGetterSetter(f, "innerRadius", 0, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(f, "outerRadius", 0, (0, M.getNumberValidator)()), Yt
}
var Kt = {},
    pi;

function Tn() {
    if (pi) return Kt;
    pi = 1, Object.defineProperty(Kt, "__esModule", {
        value: !0
    }), Kt.Sprite = void 0;
    const g = J(),
        C = ot(),
        M = Oe(),
        T = Z(),
        v = Q();
    let f = class extends C.Shape {
        constructor(e) {
            super(e), this._updated = !0, this.anim = new M.Animation(() => {
                const a = this._updated;
                return this._updated = !1, a
            }), this.on("animationChange.konva", function() {
                this.frameIndex(0)
            }), this.on("frameIndexChange.konva", function() {
                this._updated = !0
            }), this.on("frameRateChange.konva", function() {
                this.anim.isRunning() && (clearInterval(this.interval), this._setInterval())
            })
        }
        _sceneFunc(e) {
            const a = this.animation(),
                h = this.frameIndex(),
                o = h * 4,
                _ = this.animations()[a],
                l = this.frameOffsets(),
                n = _[o + 0],
                r = _[o + 1],
                d = _[o + 2],
                m = _[o + 3],
                w = this.image();
            if ((this.hasFill() || this.hasStroke()) && (e.beginPath(), e.rect(0, 0, d, m), e.closePath(), e.fillStrokeShape(this)), w)
                if (l) {
                    const i = l[a],
                        t = h * 2;
                    e.drawImage(w, n, r, d, m, i[t + 0], i[t + 1], d, m)
                } else e.drawImage(w, n, r, d, m, 0, 0, d, m)
        }
        _hitFunc(e) {
            const a = this.animation(),
                h = this.frameIndex(),
                o = h * 4,
                _ = this.animations()[a],
                l = this.frameOffsets(),
                n = _[o + 2],
                r = _[o + 3];
            if (e.beginPath(), l) {
                const d = l[a],
                    m = h * 2;
                e.rect(d[m + 0], d[m + 1], n, r)
            } else e.rect(0, 0, n, r);
            e.closePath(), e.fillShape(this)
        }
        _useBufferCanvas() {
            return super._useBufferCanvas(!0)
        }
        _setInterval() {
            const e = this;
            this.interval = setInterval(function() {
                e._updateIndex()
            }, 1e3 / this.frameRate())
        }
        start() {
            if (this.isRunning()) return;
            const e = this.getLayer();
            this.anim.setLayers(e), this._setInterval(), this.anim.start()
        }
        stop() {
            this.anim.stop(), clearInterval(this.interval)
        }
        isRunning() {
            return this.anim.isRunning()
        }
        _updateIndex() {
            const e = this.frameIndex(),
                a = this.animation(),
                h = this.animations(),
                o = h[a],
                _ = o.length / 4;
            e < _ - 1 ? this.frameIndex(e + 1) : this.frameIndex(0)
        }
    };
    return Kt.Sprite = f, f.prototype.className = "Sprite", (0, v._registerNode)(f), g.Factory.addGetterSetter(f, "animation"), g.Factory.addGetterSetter(f, "animations"), g.Factory.addGetterSetter(f, "frameOffsets"), g.Factory.addGetterSetter(f, "image"), g.Factory.addGetterSetter(f, "frameIndex", 0, (0, T.getNumberValidator)()), g.Factory.addGetterSetter(f, "frameRate", 17, (0, T.getNumberValidator)()), g.Factory.backCompat(f, {
        index: "frameIndex",
        getIndex: "getFrameIndex",
        setIndex: "setFrameIndex"
    }), Kt
}
var Xt = {},
    _i;

function Rn() {
    if (_i) return Xt;
    _i = 1, Object.defineProperty(Xt, "__esModule", {
        value: !0
    }), Xt.Star = void 0;
    const g = J(),
        C = ot(),
        M = Z(),
        T = Q();
    let v = class extends C.Shape {
        _sceneFunc(s) {
            const e = this.innerRadius(),
                a = this.outerRadius(),
                h = this.numPoints();
            s.beginPath(), s.moveTo(0, 0 - a);
            for (let o = 1; o < h * 2; o++) {
                const _ = o % 2 === 0 ? a : e,
                    l = _ * Math.sin(o * Math.PI / h),
                    n = -1 * _ * Math.cos(o * Math.PI / h);
                s.lineTo(l, n)
            }
            s.closePath(), s.fillStrokeShape(this)
        }
        getWidth() {
            return this.outerRadius() * 2
        }
        getHeight() {
            return this.outerRadius() * 2
        }
        setWidth(s) {
            this.outerRadius(s / 2)
        }
        setHeight(s) {
            this.outerRadius(s / 2)
        }
    };
    return Xt.Star = v, v.prototype.className = "Star", v.prototype._centroid = !0, v.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], (0, T._registerNode)(v), g.Factory.addGetterSetter(v, "numPoints", 5, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(v, "innerRadius", 0, (0, M.getNumberValidator)()), g.Factory.addGetterSetter(v, "outerRadius", 0, (0, M.getNumberValidator)()), Xt
}
var Tt = {},
    mi;

function en() {
    if (mi) return Tt;
    mi = 1, Object.defineProperty(Tt, "__esModule", {
        value: !0
    }), Tt.Text = void 0, Tt.stringToArray = s;
    const g = rt(),
        C = J(),
        M = ot(),
        T = Q(),
        v = Z(),
        f = Q();

    function s(V) {
        return [...V].reduce((L, H, z, B) => {
            if (new RegExp("\\p{Emoji}", "u").test(H)) {
                const A = B[z + 1];
                A && new RegExp("\\p{Emoji_Modifier}|\\u200D", "u").test(A) ? (L.push(H + A), B[z + 1] = "") : L.push(H)
            } else new RegExp("\\p{Regional_Indicator}{2}", "u").test(H + (B[z + 1] || "")) ? L.push(H + B[z + 1]) : z > 0 && new RegExp("\\p{Mn}|\\p{Me}|\\p{Mc}", "u").test(H) ? L[L.length - 1] += H : H && L.push(H);
            return L
        }, [])
    }
    const e = "auto",
        a = "center",
        h = "inherit",
        o = "justify",
        _ = "Change.konva",
        l = "2d",
        n = "-",
        r = "left",
        d = "text",
        m = "Text",
        w = "top",
        i = "bottom",
        t = "middle",
        c = "normal",
        p = "px ",
        P = " ",
        G = "right",
        y = "rtl",
        b = "word",
        S = "char",
        k = "none",
        N = "…",
        D = ["direction", "fontFamily", "fontSize", "fontStyle", "fontVariant", "padding", "align", "verticalAlign", "lineHeight", "text", "width", "height", "wrap", "ellipsis", "letterSpacing"],
        I = D.length;

    function O(V) {
        return V.split(",").map(L => {
            L = L.trim();
            const H = L.indexOf(" ") >= 0,
                z = L.indexOf('"') >= 0 || L.indexOf("'") >= 0;
            return H && !z && (L = `"${L}"`), L
        }).join(", ")
    }
    let q;

    function u() {
        return q || (q = g.Util.createCanvasElement().getContext(l), q)
    }

    function x(V) {
        V.fillText(this._partialText, this._partialTextX, this._partialTextY)
    }

    function E(V) {
        V.setAttr("miterLimit", 2), V.strokeText(this._partialText, this._partialTextX, this._partialTextY)
    }

    function R(V) {
        return V = V || {}, !V.fillLinearGradientColorStops && !V.fillRadialGradientColorStops && !V.fillPatternImage && (V.fill = V.fill || "black"), V
    }
    let F = class extends M.Shape {
        constructor(L) {
            super(R(L)), this._partialTextX = 0, this._partialTextY = 0;
            for (let H = 0; H < I; H++) this.on(D[H] + _, this._setTextData);
            this._setTextData()
        }
        _sceneFunc(L) {
            const H = this.textArr,
                z = H.length;
            if (!this.text()) return;
            let B = this.padding(),
                A = this.fontSize(),
                U = this.lineHeight() * A,
                W = this.verticalAlign(),
                Y = this.direction(),
                K = 0,
                X = this.align(),
                $ = this.getWidth(),
                tt = this.letterSpacing(),
                j = this.fill(),
                ht = this.textDecoration(),
                et = ht.indexOf("underline") !== -1,
                st = ht.indexOf("line-through") !== -1,
                Pt;
            Y = Y === h ? L.direction : Y;
            let gt = U / 2,
                At = t;
            if (T.Konva._fixTextRendering) {
                const it = this.measureSize("M");
                At = "alphabetic", gt = (it.fontBoundingBoxAscent - it.fontBoundingBoxDescent) / 2 + U / 2
            }
            for (Y === y && L.setAttr("direction", Y), L.setAttr("font", this._getContextFont()), L.setAttr("textBaseline", At), L.setAttr("textAlign", r), W === t ? K = (this.getHeight() - z * U - B * 2) / 2 : W === i && (K = this.getHeight() - z * U - B * 2), L.translate(B, K + B), Pt = 0; Pt < z; Pt++) {
                let it = 0,
                    pt = 0;
                const mt = H[Pt],
                    wt = mt.text,
                    lt = mt.width,
                    St = mt.lastInParagraph;
                if (L.save(), X === G ? it += $ - lt - B * 2 : X === a && (it += ($ - lt - B * 2) / 2), et) {
                    L.save(), L.beginPath();
                    const _t = T.Konva._fixTextRendering ? Math.round(A / 4) : Math.round(A / 2),
                        yt = it,
                        ct = gt + pt + _t;
                    L.moveTo(yt, ct);
                    const dt = X === o && !St ? $ - B * 2 : lt;
                    L.lineTo(yt + Math.round(dt), ct), L.lineWidth = A / 15;
                    const Et = this._getLinearGradient();
                    L.strokeStyle = Et || j, L.stroke(), L.restore()
                }
                if (st) {
                    L.save(), L.beginPath();
                    const _t = T.Konva._fixTextRendering ? -Math.round(A / 4) : 0;
                    L.moveTo(it, gt + pt + _t);
                    const yt = X === o && !St ? $ - B * 2 : lt;
                    L.lineTo(it + Math.round(yt), gt + pt + _t), L.lineWidth = A / 15;
                    const ct = this._getLinearGradient();
                    L.strokeStyle = ct || j, L.stroke(), L.restore()
                }
                if (Y !== y && (tt !== 0 || X === o)) {
                    const _t = wt.split(" ").length - 1,
                        yt = s(wt);
                    for (let ct = 0; ct < yt.length; ct++) {
                        const dt = yt[ct];
                        dt === " " && !St && X === o && (it += ($ - B * 2 - lt) / _t), this._partialTextX = it, this._partialTextY = gt + pt, this._partialText = dt, L.fillStrokeShape(this), it += this.measureSize(dt).width + tt
                    }
                } else tt !== 0 && L.setAttr("letterSpacing", `${tt}px`), this._partialTextX = it, this._partialTextY = gt + pt, this._partialText = wt, L.fillStrokeShape(this);
                L.restore(), z > 1 && (gt += U)
            }
        }
        _hitFunc(L) {
            const H = this.getWidth(),
                z = this.getHeight();
            L.beginPath(), L.rect(0, 0, H, z), L.closePath(), L.fillStrokeShape(this)
        }
        setText(L) {
            const H = g.Util._isString(L) ? L : L == null ? "" : L + "";
            return this._setAttr(d, H), this
        }
        getWidth() {
            return this.attrs.width === e || this.attrs.width === void 0 ? this.getTextWidth() + this.padding() * 2 : this.attrs.width
        }
        getHeight() {
            return this.attrs.height === e || this.attrs.height === void 0 ? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2 : this.attrs.height
        }
        getTextWidth() {
            return this.textWidth
        }
        getTextHeight() {
            return g.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight
        }
        measureSize(L) {
            var H, z, B, A, U, W, Y, K, X, $, tt;
            let j = u(),
                ht = this.fontSize(),
                et;
            j.save(), j.font = this._getContextFont(), et = j.measureText(L), j.restore();
            const st = ht / 100;
            return {
                actualBoundingBoxAscent: (H = et.actualBoundingBoxAscent) !== null && H !== void 0 ? H : 71.58203125 * st,
                actualBoundingBoxDescent: (z = et.actualBoundingBoxDescent) !== null && z !== void 0 ? z : 0,
                actualBoundingBoxLeft: (B = et.actualBoundingBoxLeft) !== null && B !== void 0 ? B : -7.421875 * st,
                actualBoundingBoxRight: (A = et.actualBoundingBoxRight) !== null && A !== void 0 ? A : 75.732421875 * st,
                alphabeticBaseline: (U = et.alphabeticBaseline) !== null && U !== void 0 ? U : 0,
                emHeightAscent: (W = et.emHeightAscent) !== null && W !== void 0 ? W : 100 * st,
                emHeightDescent: (Y = et.emHeightDescent) !== null && Y !== void 0 ? Y : -20 * st,
                fontBoundingBoxAscent: (K = et.fontBoundingBoxAscent) !== null && K !== void 0 ? K : 91 * st,
                fontBoundingBoxDescent: (X = et.fontBoundingBoxDescent) !== null && X !== void 0 ? X : 21 * st,
                hangingBaseline: ($ = et.hangingBaseline) !== null && $ !== void 0 ? $ : 72.80000305175781 * st,
                ideographicBaseline: (tt = et.ideographicBaseline) !== null && tt !== void 0 ? tt : -21 * st,
                width: et.width,
                height: ht
            }
        }
        _getContextFont() {
            return this.fontStyle() + P + this.fontVariant() + P + (this.fontSize() + p) + O(this.fontFamily())
        }
        _addTextLine(L) {
            this.align() === o && (L = L.trim());
            const z = this._getTextWidth(L);
            return this.textArr.push({
                text: L,
                width: z,
                lastInParagraph: !1
            })
        }
        _getTextWidth(L) {
            const H = this.letterSpacing(),
                z = L.length;
            return u().measureText(L).width + H * z
        }
        _setTextData() {
            let L = this.text().split(`
`),
                H = +this.fontSize(),
                z = 0,
                B = this.lineHeight() * H,
                A = this.attrs.width,
                U = this.attrs.height,
                W = A !== e && A !== void 0,
                Y = U !== e && U !== void 0,
                K = this.padding(),
                X = A - K * 2,
                $ = U - K * 2,
                tt = 0,
                j = this.wrap(),
                ht = j !== k,
                et = j !== S && ht,
                st = this.ellipsis();
            this.textArr = [], u().font = this._getContextFont();
            const Pt = st ? this._getTextWidth(N) : 0;
            for (let gt = 0, At = L.length; gt < At; ++gt) {
                let it = L[gt],
                    pt = this._getTextWidth(it);
                if (W && pt > X)
                    for (; it.length > 0;) {
                        let mt = 0,
                            wt = s(it).length,
                            lt = "",
                            St = 0;
                        for (; mt < wt;) {
                            const _t = mt + wt >>> 1,
                                yt = s(it),
                                ct = yt.slice(0, _t + 1).join(""),
                                dt = this._getTextWidth(ct);
                            (st && Y && tt + B > $ ? dt + Pt : dt) <= X ? (mt = _t + 1, lt = ct, St = dt) : wt = _t
                        }
                        if (lt) {
                            if (et) {
                                const ct = s(it),
                                    dt = s(lt),
                                    Et = ct[dt.length],
                                    De = Et === P || Et === n;
                                let me;
                                if (De && St <= X) me = dt.length;
                                else {
                                    const an = dt.lastIndexOf(P),
                                        on = dt.lastIndexOf(n);
                                    me = Math.max(an, on) + 1
                                }
                                me > 0 && (mt = me, lt = ct.slice(0, mt).join(""), St = this._getTextWidth(lt))
                            }
                            if (lt = lt.trimRight(), this._addTextLine(lt), z = Math.max(z, St), tt += B, this._shouldHandleEllipsis(tt)) {
                                this._tryToAddEllipsisToLastLine();
                                break
                            }
                            if (it = s(it).slice(mt).join("").trimLeft(), it.length > 0 && (pt = this._getTextWidth(it), pt <= X)) {
                                this._addTextLine(it), tt += B, z = Math.max(z, pt);
                                break
                            }
                        } else break
                    } else this._addTextLine(it), tt += B, z = Math.max(z, pt), this._shouldHandleEllipsis(tt) && gt < At - 1 && this._tryToAddEllipsisToLastLine();
                if (this.textArr[this.textArr.length - 1] && (this.textArr[this.textArr.length - 1].lastInParagraph = !0), Y && tt + B > $) break
            }
            this.textHeight = H, this.textWidth = z
        }
        _shouldHandleEllipsis(L) {
            const H = +this.fontSize(),
                z = this.lineHeight() * H,
                B = this.attrs.height,
                A = B !== e && B !== void 0,
                U = this.padding(),
                W = B - U * 2;
            return !(this.wrap() !== k) || A && L + z > W
        }
        _tryToAddEllipsisToLastLine() {
            const L = this.attrs.width,
                H = L !== e && L !== void 0,
                z = this.padding(),
                B = L - z * 2,
                A = this.ellipsis(),
                U = this.textArr[this.textArr.length - 1];
            !U || !A || (H && (this._getTextWidth(U.text + N) < B || (U.text = U.text.slice(0, U.text.length - 3))), this.textArr.splice(this.textArr.length - 1, 1), this._addTextLine(U.text + N))
        }
        getStrokeScaleEnabled() {
            return !0
        }
        _useBufferCanvas() {
            const L = this.textDecoration().indexOf("underline") !== -1 || this.textDecoration().indexOf("line-through") !== -1,
                H = this.hasShadow();
            return L && H ? !0 : super._useBufferCanvas()
        }
    };
    return Tt.Text = F, F.prototype._fillFunc = x, F.prototype._strokeFunc = E, F.prototype.className = m, F.prototype._attrsAffectingSize = ["text", "fontSize", "padding", "wrap", "lineHeight", "letterSpacing"], (0, f._registerNode)(F), C.Factory.overWriteSetter(F, "width", (0, v.getNumberOrAutoValidator)()), C.Factory.overWriteSetter(F, "height", (0, v.getNumberOrAutoValidator)()), C.Factory.addGetterSetter(F, "direction", h), C.Factory.addGetterSetter(F, "fontFamily", "Arial"), C.Factory.addGetterSetter(F, "fontSize", 12, (0, v.getNumberValidator)()), C.Factory.addGetterSetter(F, "fontStyle", c), C.Factory.addGetterSetter(F, "fontVariant", c), C.Factory.addGetterSetter(F, "padding", 0, (0, v.getNumberValidator)()), C.Factory.addGetterSetter(F, "align", r), C.Factory.addGetterSetter(F, "verticalAlign", w), C.Factory.addGetterSetter(F, "lineHeight", 1, (0, v.getNumberValidator)()), C.Factory.addGetterSetter(F, "wrap", b), C.Factory.addGetterSetter(F, "ellipsis", !1, (0, v.getBooleanValidator)()), C.Factory.addGetterSetter(F, "letterSpacing", 0, (0, v.getNumberValidator)()), C.Factory.addGetterSetter(F, "text", "", (0, v.getStringValidator)()), C.Factory.addGetterSetter(F, "textDecoration", ""), Tt
}
var jt = {},
    yi;

function An() {
    if (yi) return jt;
    yi = 1, Object.defineProperty(jt, "__esModule", {
        value: !0
    }), jt.TextPath = void 0;
    const g = rt(),
        C = J(),
        M = ot(),
        T = Le(),
        v = en(),
        f = Z(),
        s = Q(),
        e = "",
        a = "normal";

    function h(l) {
        l.fillText(this.partialText, 0, 0)
    }

    function o(l) {
        l.strokeText(this.partialText, 0, 0)
    }
    let _ = class extends M.Shape {
        constructor(n) {
            super(n), this.dummyCanvas = g.Util.createCanvasElement(), this.dataArray = [], this._readDataAttribute(), this.on("dataChange.konva", function() {
                this._readDataAttribute(), this._setTextData()
            }), this.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva fontSizeChange.konva fontFamilyChange.konva", this._setTextData), this._setTextData()
        }
        _getTextPathLength() {
            return T.Path.getPathLength(this.dataArray)
        }
        _getPointAtLength(n) {
            if (!this.attrs.data) return null;
            const r = this.pathLength;
            return n - 1 > r ? null : T.Path.getPointAtLengthOfDataArray(n, this.dataArray)
        }
        _readDataAttribute() {
            this.dataArray = T.Path.parsePathData(this.attrs.data), this.pathLength = this._getTextPathLength()
        }
        _sceneFunc(n) {
            n.setAttr("font", this._getContextFont()), n.setAttr("textBaseline", this.textBaseline()), n.setAttr("textAlign", "left"), n.save();
            const r = this.textDecoration(),
                d = this.fill(),
                m = this.fontSize(),
                w = this.glyphInfo;
            r === "underline" && n.beginPath();
            for (let i = 0; i < w.length; i++) {
                n.save();
                const t = w[i].p0;
                n.translate(t.x, t.y), n.rotate(w[i].rotation), this.partialText = w[i].text, n.fillStrokeShape(this), r === "underline" && (i === 0 && n.moveTo(0, m / 2 + 1), n.lineTo(m, m / 2 + 1)), n.restore()
            }
            r === "underline" && (n.strokeStyle = d, n.lineWidth = m / 20, n.stroke()), n.restore()
        }
        _hitFunc(n) {
            n.beginPath();
            const r = this.glyphInfo;
            if (r.length >= 1) {
                const d = r[0].p0;
                n.moveTo(d.x, d.y)
            }
            for (let d = 0; d < r.length; d++) {
                const m = r[d].p1;
                n.lineTo(m.x, m.y)
            }
            n.setAttr("lineWidth", this.fontSize()), n.setAttr("strokeStyle", this.colorKey), n.stroke()
        }
        getTextWidth() {
            return this.textWidth
        }
        getTextHeight() {
            return g.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight
        }
        setText(n) {
            return v.Text.prototype.setText.call(this, n)
        }
        _getContextFont() {
            return v.Text.prototype._getContextFont.call(this)
        }
        _getTextSize(n) {
            const d = this.dummyCanvas.getContext("2d");
            d.save(), d.font = this._getContextFont();
            const m = d.measureText(n);
            return d.restore(), {
                width: m.width,
                height: parseInt(`${this.fontSize()}`, 10)
            }
        }
        _setTextData() {
            const {
                width: n,
                height: r
            } = this._getTextSize(this.attrs.text);
            if (this.textWidth = n, this.textHeight = r, this.glyphInfo = [], !this.attrs.data) return null;
            const d = this.letterSpacing(),
                m = this.align(),
                w = this.kerningFunc(),
                i = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * d, 0);
            let t = 0;
            m === "center" && (t = Math.max(0, this.pathLength / 2 - i / 2)), m === "right" && (t = Math.max(0, this.pathLength - i));
            const c = (0, v.stringToArray)(this.text());
            let p = t;
            for (let P = 0; P < c.length; P++) {
                const G = this._getPointAtLength(p);
                if (!G) return;
                let y = this._getTextSize(c[P]).width + d;
                if (c[P] === " " && m === "justify") {
                    const I = this.text().split(" ").length - 1;
                    y += (this.pathLength - i) / I
                }
                const b = this._getPointAtLength(p + y);
                if (!b) return;
                const S = T.Path.getLineLength(G.x, G.y, b.x, b.y);
                let k = 0;
                if (w) try {
                    k = w(c[P - 1], c[P]) * this.fontSize()
                } catch {
                    k = 0
                }
                G.x += k, b.x += k, this.textWidth += k;
                const N = T.Path.getPointOnLine(k + S / 2, G.x, G.y, b.x, b.y),
                    D = Math.atan2(b.y - G.y, b.x - G.x);
                this.glyphInfo.push({
                    transposeX: N.x,
                    transposeY: N.y,
                    text: c[P],
                    rotation: D,
                    p0: G,
                    p1: b
                }), p += y
            }
        }
        getSelfRect() {
            if (!this.glyphInfo.length) return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            const n = [];
            this.glyphInfo.forEach(function(p) {
                n.push(p.p0.x), n.push(p.p0.y), n.push(p.p1.x), n.push(p.p1.y)
            });
            let r = n[0] || 0,
                d = n[0] || 0,
                m = n[1] || 0,
                w = n[1] || 0,
                i, t;
            for (let p = 0; p < n.length / 2; p++) i = n[p * 2], t = n[p * 2 + 1], r = Math.min(r, i), d = Math.max(d, i), m = Math.min(m, t), w = Math.max(w, t);
            const c = this.fontSize();
            return {
                x: r - c / 2,
                y: m - c / 2,
                width: d - r + c,
                height: w - m + c
            }
        }
        destroy() {
            return g.Util.releaseCanvas(this.dummyCanvas), super.destroy()
        }
    };
    return jt.TextPath = _, _.prototype._fillFunc = h, _.prototype._strokeFunc = o, _.prototype._fillFuncHit = h, _.prototype._strokeFuncHit = o, _.prototype.className = "TextPath", _.prototype._attrsAffectingSize = ["text", "fontSize", "data"], (0, s._registerNode)(_), C.Factory.addGetterSetter(_, "data"), C.Factory.addGetterSetter(_, "fontFamily", "Arial"), C.Factory.addGetterSetter(_, "fontSize", 12, (0, f.getNumberValidator)()), C.Factory.addGetterSetter(_, "fontStyle", a), C.Factory.addGetterSetter(_, "align", "left"), C.Factory.addGetterSetter(_, "letterSpacing", 0, (0, f.getNumberValidator)()), C.Factory.addGetterSetter(_, "textBaseline", "middle"), C.Factory.addGetterSetter(_, "fontVariant", a), C.Factory.addGetterSetter(_, "text", e), C.Factory.addGetterSetter(_, "textDecoration", ""), C.Factory.addGetterSetter(_, "kerningFunc", void 0), jt
}
var $t = {},
    vi;

function En() {
    if (vi) return $t;
    vi = 1, Object.defineProperty($t, "__esModule", {
        value: !0
    }), $t.Transformer = void 0;
    const g = rt(),
        C = J(),
        M = at(),
        T = ot(),
        v = tn(),
        f = Ne(),
        s = Q(),
        e = Z(),
        a = Q(),
        h = "tr-konva",
        o = ["resizeEnabledChange", "rotateAnchorOffsetChange", "rotateEnabledChange", "enabledAnchorsChange", "anchorSizeChange", "borderEnabledChange", "borderStrokeChange", "borderStrokeWidthChange", "borderDashChange", "anchorStrokeChange", "anchorStrokeWidthChange", "anchorFillChange", "anchorCornerRadiusChange", "ignoreStrokeChange", "anchorStyleFuncChange"].map(y => y + `.${h}`).join(" "),
        _ = "nodesRect",
        l = ["widthChange", "heightChange", "scaleXChange", "scaleYChange", "skewXChange", "skewYChange", "rotationChange", "offsetXChange", "offsetYChange", "transformsEnabledChange", "strokeWidthChange"],
        n = {
            "top-left": -45,
            "top-center": 0,
            "top-right": 45,
            "middle-right": -90,
            "middle-left": 90,
            "bottom-left": -135,
            "bottom-center": 180,
            "bottom-right": 135
        },
        r = "ontouchstart" in s.Konva._global;

    function d(y, b, S) {
        if (y === "rotater") return S;
        b += g.Util.degToRad(n[y] || 0);
        const k = (g.Util.radToDeg(b) % 360 + 360) % 360;
        return g.Util._inRange(k, 315 + 22.5, 360) || g.Util._inRange(k, 0, 22.5) ? "ns-resize" : g.Util._inRange(k, 45 - 22.5, 45 + 22.5) ? "nesw-resize" : g.Util._inRange(k, 90 - 22.5, 90 + 22.5) ? "ew-resize" : g.Util._inRange(k, 135 - 22.5, 135 + 22.5) ? "nwse-resize" : g.Util._inRange(k, 180 - 22.5, 180 + 22.5) ? "ns-resize" : g.Util._inRange(k, 225 - 22.5, 225 + 22.5) ? "nesw-resize" : g.Util._inRange(k, 270 - 22.5, 270 + 22.5) ? "ew-resize" : g.Util._inRange(k, 315 - 22.5, 315 + 22.5) ? "nwse-resize" : (g.Util.error("Transformer has unknown angle for cursor detection: " + k), "pointer")
    }
    const m = ["top-left", "top-center", "top-right", "middle-right", "middle-left", "bottom-left", "bottom-center", "bottom-right"];

    function w(y) {
        return {
            x: y.x + y.width / 2 * Math.cos(y.rotation) + y.height / 2 * Math.sin(-y.rotation),
            y: y.y + y.height / 2 * Math.cos(y.rotation) + y.width / 2 * Math.sin(y.rotation)
        }
    }

    function i(y, b, S) {
        const k = S.x + (y.x - S.x) * Math.cos(b) - (y.y - S.y) * Math.sin(b),
            N = S.y + (y.x - S.x) * Math.sin(b) + (y.y - S.y) * Math.cos(b);
        return { ...y,
            rotation: y.rotation + b,
            x: k,
            y: N
        }
    }

    function t(y, b) {
        const S = w(y);
        return i(y, b, S)
    }

    function c(y, b, S) {
        let k = b;
        for (let N = 0; N < y.length; N++) {
            const D = s.Konva.getAngle(y[N]),
                I = Math.abs(D - b) % (Math.PI * 2);
            Math.min(I, Math.PI * 2 - I) < S && (k = D)
        }
        return k
    }
    let p = 0,
        P = class extends f.Group {
            constructor(b) {
                super(b), this._movingAnchorName = null, this._transforming = !1, this._createElements(), this._handleMouseMove = this._handleMouseMove.bind(this), this._handleMouseUp = this._handleMouseUp.bind(this), this.update = this.update.bind(this), this.on(o, this.update), this.getNode() && this.update()
            }
            attachTo(b) {
                return this.setNode(b), this
            }
            setNode(b) {
                return g.Util.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead."), this.setNodes([b])
            }
            getNode() {
                return this._nodes && this._nodes[0]
            }
            _getEventNamespace() {
                return h + this._id
            }
            setNodes(b = []) {
                this._nodes && this._nodes.length && this.detach();
                const S = b.filter(N => N.isAncestorOf(this) ? (g.Util.error("Konva.Transformer cannot be an a child of the node you are trying to attach"), !1) : !0);
                return this._nodes = b = S, b.length === 1 && this.useSingleNodeRotation() ? this.rotation(b[0].getAbsoluteRotation()) : this.rotation(0), this._nodes.forEach(N => {
                    const D = () => {
                        this.nodes().length === 1 && this.useSingleNodeRotation() && this.rotation(this.nodes()[0].getAbsoluteRotation()), this._resetTransformCache(), !this._transforming && !this.isDragging() && this.update()
                    };
                    if (N._attrsAffectingSize.length) {
                        const I = N._attrsAffectingSize.map(O => O + "Change." + this._getEventNamespace()).join(" ");
                        N.on(I, D)
                    }
                    N.on(l.map(I => I + `.${this._getEventNamespace()}`).join(" "), D), N.on(`absoluteTransformChange.${this._getEventNamespace()}`, D), this._proxyDrag(N)
                }), this._resetTransformCache(), !!this.findOne(".top-left") && this.update(), this
            }
            _proxyDrag(b) {
                let S;
                b.on(`dragstart.${this._getEventNamespace()}`, k => {
                    S = b.getAbsolutePosition(), !this.isDragging() && b !== this.findOne(".back") && this.startDrag(k, !1)
                }), b.on(`dragmove.${this._getEventNamespace()}`, k => {
                    if (!S) return;
                    const N = b.getAbsolutePosition(),
                        D = N.x - S.x,
                        I = N.y - S.y;
                    this.nodes().forEach(O => {
                        if (O === b || O.isDragging()) return;
                        const q = O.getAbsolutePosition();
                        O.setAbsolutePosition({
                            x: q.x + D,
                            y: q.y + I
                        }), O.startDrag(k)
                    }), S = null
                })
            }
            getNodes() {
                return this._nodes || []
            }
            getActiveAnchor() {
                return this._movingAnchorName
            }
            detach() {
                this._nodes && this._nodes.forEach(b => {
                    b.off("." + this._getEventNamespace())
                }), this._nodes = [], this._resetTransformCache()
            }
            _resetTransformCache() {
                this._clearCache(_), this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform")
            }
            _getNodeRect() {
                return this._getCache(_, this.__getNodeRect)
            }
            __getNodeShape(b, S = this.rotation(), k) {
                const N = b.getClientRect({
                        skipTransform: !0,
                        skipShadow: !0,
                        skipStroke: this.ignoreStroke()
                    }),
                    D = b.getAbsoluteScale(k),
                    I = b.getAbsolutePosition(k),
                    O = N.x * D.x - b.offsetX() * D.x,
                    q = N.y * D.y - b.offsetY() * D.y,
                    u = (s.Konva.getAngle(b.getAbsoluteRotation()) + Math.PI * 2) % (Math.PI * 2),
                    x = {
                        x: I.x + O * Math.cos(u) + q * Math.sin(-u),
                        y: I.y + q * Math.cos(u) + O * Math.sin(u),
                        width: N.width * D.x,
                        height: N.height * D.y,
                        rotation: u
                    };
                return i(x, -s.Konva.getAngle(S), {
                    x: 0,
                    y: 0
                })
            }
            __getNodeRect() {
                if (!this.getNode()) return {
                    x: -1e8,
                    y: -1e8,
                    width: 0,
                    height: 0,
                    rotation: 0
                };
                const S = [];
                this.nodes().map(u => {
                    const x = u.getClientRect({
                            skipTransform: !0,
                            skipShadow: !0,
                            skipStroke: this.ignoreStroke()
                        }),
                        E = [{
                            x: x.x,
                            y: x.y
                        }, {
                            x: x.x + x.width,
                            y: x.y
                        }, {
                            x: x.x + x.width,
                            y: x.y + x.height
                        }, {
                            x: x.x,
                            y: x.y + x.height
                        }],
                        R = u.getAbsoluteTransform();
                    E.forEach(function(F) {
                        const V = R.point(F);
                        S.push(V)
                    })
                });
                const k = new g.Transform;
                k.rotate(-s.Konva.getAngle(this.rotation()));
                let N = 1 / 0,
                    D = 1 / 0,
                    I = -1 / 0,
                    O = -1 / 0;
                S.forEach(function(u) {
                    const x = k.point(u);
                    N === void 0 && (N = I = x.x, D = O = x.y), N = Math.min(N, x.x), D = Math.min(D, x.y), I = Math.max(I, x.x), O = Math.max(O, x.y)
                }), k.invert();
                const q = k.point({
                    x: N,
                    y: D
                });
                return {
                    x: q.x,
                    y: q.y,
                    width: I - N,
                    height: O - D,
                    rotation: s.Konva.getAngle(this.rotation())
                }
            }
            getX() {
                return this._getNodeRect().x
            }
            getY() {
                return this._getNodeRect().y
            }
            getWidth() {
                return this._getNodeRect().width
            }
            getHeight() {
                return this._getNodeRect().height
            }
            _createElements() {
                this._createBack(), m.forEach(b => {
                    this._createAnchor(b)
                }), this._createAnchor("rotater")
            }
            _createAnchor(b) {
                const S = new v.Rect({
                        stroke: "rgb(0, 161, 255)",
                        fill: "white",
                        strokeWidth: 1,
                        name: b + " _anchor",
                        dragDistance: 0,
                        draggable: !0,
                        hitStrokeWidth: r ? 10 : "auto"
                    }),
                    k = this;
                S.on("mousedown touchstart", function(N) {
                    k._handleMouseDown(N)
                }), S.on("dragstart", N => {
                    S.stopDrag(), N.cancelBubble = !0
                }), S.on("dragend", N => {
                    N.cancelBubble = !0
                }), S.on("mouseenter", () => {
                    const N = s.Konva.getAngle(this.rotation()),
                        D = this.rotateAnchorCursor(),
                        I = d(b, N, D);
                    S.getStage().content && (S.getStage().content.style.cursor = I), this._cursorChange = !0
                }), S.on("mouseout", () => {
                    S.getStage().content && (S.getStage().content.style.cursor = ""), this._cursorChange = !1
                }), this.add(S)
            }
            _createBack() {
                const b = new T.Shape({
                    name: "back",
                    width: 0,
                    height: 0,
                    draggable: !0,
                    sceneFunc(S, k) {
                        const N = k.getParent(),
                            D = N.padding();
                        S.beginPath(), S.rect(-D, -D, k.width() + D * 2, k.height() + D * 2), S.moveTo(k.width() / 2, -D), N.rotateEnabled() && N.rotateLineVisible() && S.lineTo(k.width() / 2, -N.rotateAnchorOffset() * g.Util._sign(k.height()) - D), S.fillStrokeShape(k)
                    },
                    hitFunc: (S, k) => {
                        if (!this.shouldOverdrawWholeArea()) return;
                        const N = this.padding();
                        S.beginPath(), S.rect(-N, -N, k.width() + N * 2, k.height() + N * 2), S.fillStrokeShape(k)
                    }
                });
                this.add(b), this._proxyDrag(b), b.on("dragstart", S => {
                    S.cancelBubble = !0
                }), b.on("dragmove", S => {
                    S.cancelBubble = !0
                }), b.on("dragend", S => {
                    S.cancelBubble = !0
                }), this.on("dragmove", S => {
                    this.update()
                })
            }
            _handleMouseDown(b) {
                if (this._transforming) return;
                this._movingAnchorName = b.target.name().split(" ")[0];
                const S = this._getNodeRect(),
                    k = S.width,
                    N = S.height,
                    D = Math.sqrt(Math.pow(k, 2) + Math.pow(N, 2));
                this.sin = Math.abs(N / D), this.cos = Math.abs(k / D), typeof window < "u" && (window.addEventListener("mousemove", this._handleMouseMove), window.addEventListener("touchmove", this._handleMouseMove), window.addEventListener("mouseup", this._handleMouseUp, !0), window.addEventListener("touchend", this._handleMouseUp, !0)), this._transforming = !0;
                const I = b.target.getAbsolutePosition(),
                    O = b.target.getStage().getPointerPosition();
                this._anchorDragOffset = {
                    x: O.x - I.x,
                    y: O.y - I.y
                }, p++, this._fire("transformstart", {
                    evt: b.evt,
                    target: this.getNode()
                }), this._nodes.forEach(q => {
                    q._fire("transformstart", {
                        evt: b.evt,
                        target: q
                    })
                })
            }
            _handleMouseMove(b) {
                let S, k, N;
                const D = this.findOne("." + this._movingAnchorName),
                    I = D.getStage();
                I.setPointersPositions(b);
                const O = I.getPointerPosition();
                let q = {
                    x: O.x - this._anchorDragOffset.x,
                    y: O.y - this._anchorDragOffset.y
                };
                const u = D.getAbsolutePosition();
                this.anchorDragBoundFunc() && (q = this.anchorDragBoundFunc()(u, q, b)), D.setAbsolutePosition(q);
                const x = D.getAbsolutePosition();
                if (u.x === x.x && u.y === x.y) return;
                if (this._movingAnchorName === "rotater") {
                    const B = this._getNodeRect();
                    S = D.x() - B.width / 2, k = -D.y() + B.height / 2;
                    let A = Math.atan2(-k, S) + Math.PI / 2;
                    B.height < 0 && (A -= Math.PI);
                    const W = s.Konva.getAngle(this.rotation()) + A,
                        Y = s.Konva.getAngle(this.rotationSnapTolerance()),
                        X = c(this.rotationSnaps(), W, Y) - B.rotation,
                        $ = t(B, X);
                    this._fitNodesInto($, b);
                    return
                }
                const E = this.shiftBehavior();
                let R;
                E === "inverted" ? R = this.keepRatio() && !b.shiftKey : E === "none" ? R = this.keepRatio() : R = this.keepRatio() || b.shiftKey;
                let F = this.centeredScaling() || b.altKey;
                if (this._movingAnchorName === "top-left") {
                    if (R) {
                        const B = F ? {
                            x: this.width() / 2,
                            y: this.height() / 2
                        } : {
                            x: this.findOne(".bottom-right").x(),
                            y: this.findOne(".bottom-right").y()
                        };
                        N = Math.sqrt(Math.pow(B.x - D.x(), 2) + Math.pow(B.y - D.y(), 2));
                        const A = this.findOne(".top-left").x() > B.x ? -1 : 1,
                            U = this.findOne(".top-left").y() > B.y ? -1 : 1;
                        S = N * this.cos * A, k = N * this.sin * U, this.findOne(".top-left").x(B.x - S), this.findOne(".top-left").y(B.y - k)
                    }
                } else if (this._movingAnchorName === "top-center") this.findOne(".top-left").y(D.y());
                else if (this._movingAnchorName === "top-right") {
                    if (R) {
                        const B = F ? {
                            x: this.width() / 2,
                            y: this.height() / 2
                        } : {
                            x: this.findOne(".bottom-left").x(),
                            y: this.findOne(".bottom-left").y()
                        };
                        N = Math.sqrt(Math.pow(D.x() - B.x, 2) + Math.pow(B.y - D.y(), 2));
                        const A = this.findOne(".top-right").x() < B.x ? -1 : 1,
                            U = this.findOne(".top-right").y() > B.y ? -1 : 1;
                        S = N * this.cos * A, k = N * this.sin * U, this.findOne(".top-right").x(B.x + S), this.findOne(".top-right").y(B.y - k)
                    }
                    var V = D.position();
                    this.findOne(".top-left").y(V.y), this.findOne(".bottom-right").x(V.x)
                } else if (this._movingAnchorName === "middle-left") this.findOne(".top-left").x(D.x());
                else if (this._movingAnchorName === "middle-right") this.findOne(".bottom-right").x(D.x());
                else if (this._movingAnchorName === "bottom-left") {
                    if (R) {
                        const B = F ? {
                            x: this.width() / 2,
                            y: this.height() / 2
                        } : {
                            x: this.findOne(".top-right").x(),
                            y: this.findOne(".top-right").y()
                        };
                        N = Math.sqrt(Math.pow(B.x - D.x(), 2) + Math.pow(D.y() - B.y, 2));
                        const A = B.x < D.x() ? -1 : 1,
                            U = D.y() < B.y ? -1 : 1;
                        S = N * this.cos * A, k = N * this.sin * U, D.x(B.x - S), D.y(B.y + k)
                    }
                    V = D.position(), this.findOne(".top-left").x(V.x), this.findOne(".bottom-right").y(V.y)
                } else if (this._movingAnchorName === "bottom-center") this.findOne(".bottom-right").y(D.y());
                else if (this._movingAnchorName === "bottom-right") {
                    if (R) {
                        const B = F ? {
                            x: this.width() / 2,
                            y: this.height() / 2
                        } : {
                            x: this.findOne(".top-left").x(),
                            y: this.findOne(".top-left").y()
                        };
                        N = Math.sqrt(Math.pow(D.x() - B.x, 2) + Math.pow(D.y() - B.y, 2));
                        const A = this.findOne(".bottom-right").x() < B.x ? -1 : 1,
                            U = this.findOne(".bottom-right").y() < B.y ? -1 : 1;
                        S = N * this.cos * A, k = N * this.sin * U, this.findOne(".bottom-right").x(B.x + S), this.findOne(".bottom-right").y(B.y + k)
                    }
                } else console.error(new Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
                if (F = this.centeredScaling() || b.altKey, F) {
                    const B = this.findOne(".top-left"),
                        A = this.findOne(".bottom-right"),
                        U = B.x(),
                        W = B.y(),
                        Y = this.getWidth() - A.x(),
                        K = this.getHeight() - A.y();
                    A.move({
                        x: -U,
                        y: -W
                    }), B.move({
                        x: Y,
                        y: K
                    })
                }
                const L = this.findOne(".top-left").getAbsolutePosition();
                S = L.x, k = L.y;
                const H = this.findOne(".bottom-right").x() - this.findOne(".top-left").x(),
                    z = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
                this._fitNodesInto({
                    x: S,
                    y: k,
                    width: H,
                    height: z,
                    rotation: s.Konva.getAngle(this.rotation())
                }, b)
            }
            _handleMouseUp(b) {
                this._removeEvents(b)
            }
            getAbsoluteTransform() {
                return this.getTransform()
            }
            _removeEvents(b) {
                var S;
                if (this._transforming) {
                    this._transforming = !1, typeof window < "u" && (window.removeEventListener("mousemove", this._handleMouseMove), window.removeEventListener("touchmove", this._handleMouseMove), window.removeEventListener("mouseup", this._handleMouseUp, !0), window.removeEventListener("touchend", this._handleMouseUp, !0));
                    const k = this.getNode();
                    p--, this._fire("transformend", {
                        evt: b,
                        target: k
                    }), (S = this.getLayer()) === null || S === void 0 || S.batchDraw(), k && this._nodes.forEach(N => {
                        var D;
                        N._fire("transformend", {
                            evt: b,
                            target: N
                        }), (D = N.getLayer()) === null || D === void 0 || D.batchDraw()
                    }), this._movingAnchorName = null
                }
            }
            _fitNodesInto(b, S) {
                const k = this._getNodeRect(),
                    N = 1;
                if (g.Util._inRange(b.width, -this.padding() * 2 - N, N)) {
                    this.update();
                    return
                }
                if (g.Util._inRange(b.height, -this.padding() * 2 - N, N)) {
                    this.update();
                    return
                }
                const D = new g.Transform;
                if (D.rotate(s.Konva.getAngle(this.rotation())), this._movingAnchorName && b.width < 0 && this._movingAnchorName.indexOf("left") >= 0) {
                    const R = D.point({
                        x: -this.padding() * 2,
                        y: 0
                    });
                    b.x += R.x, b.y += R.y, b.width += this.padding() * 2, this._movingAnchorName = this._movingAnchorName.replace("left", "right"), this._anchorDragOffset.x -= R.x, this._anchorDragOffset.y -= R.y
                } else if (this._movingAnchorName && b.width < 0 && this._movingAnchorName.indexOf("right") >= 0) {
                    const R = D.point({
                        x: this.padding() * 2,
                        y: 0
                    });
                    this._movingAnchorName = this._movingAnchorName.replace("right", "left"), this._anchorDragOffset.x -= R.x, this._anchorDragOffset.y -= R.y, b.width += this.padding() * 2
                }
                if (this._movingAnchorName && b.height < 0 && this._movingAnchorName.indexOf("top") >= 0) {
                    const R = D.point({
                        x: 0,
                        y: -this.padding() * 2
                    });
                    b.x += R.x, b.y += R.y, this._movingAnchorName = this._movingAnchorName.replace("top", "bottom"), this._anchorDragOffset.x -= R.x, this._anchorDragOffset.y -= R.y, b.height += this.padding() * 2
                } else if (this._movingAnchorName && b.height < 0 && this._movingAnchorName.indexOf("bottom") >= 0) {
                    const R = D.point({
                        x: 0,
                        y: this.padding() * 2
                    });
                    this._movingAnchorName = this._movingAnchorName.replace("bottom", "top"), this._anchorDragOffset.x -= R.x, this._anchorDragOffset.y -= R.y, b.height += this.padding() * 2
                }
                if (this.boundBoxFunc()) {
                    const R = this.boundBoxFunc()(k, b);
                    R ? b = R : g.Util.warn("boundBoxFunc returned falsy. You should return new bound rect from it!")
                }
                const I = 1e7,
                    O = new g.Transform;
                O.translate(k.x, k.y), O.rotate(k.rotation), O.scale(k.width / I, k.height / I);
                const q = new g.Transform,
                    u = b.width / I,
                    x = b.height / I;
                this.flipEnabled() === !1 ? (q.translate(b.x, b.y), q.rotate(b.rotation), q.translate(b.width < 0 ? b.width : 0, b.height < 0 ? b.height : 0), q.scale(Math.abs(u), Math.abs(x))) : (q.translate(b.x, b.y), q.rotate(b.rotation), q.scale(u, x));
                const E = q.multiply(O.invert());
                this._nodes.forEach(R => {
                    var F;
                    const V = R.getParent().getAbsoluteTransform(),
                        L = R.getTransform().copy();
                    L.translate(R.offsetX(), R.offsetY());
                    const H = new g.Transform;
                    H.multiply(V.copy().invert()).multiply(E).multiply(V).multiply(L);
                    const z = H.decompose();
                    R.setAttrs(z), (F = R.getLayer()) === null || F === void 0 || F.batchDraw()
                }), this.rotation(g.Util._getRotation(b.rotation)), this._nodes.forEach(R => {
                    this._fire("transform", {
                        evt: S,
                        target: R
                    }), R._fire("transform", {
                        evt: S,
                        target: R
                    })
                }), this._resetTransformCache(), this.update(), this.getLayer().batchDraw()
            }
            forceUpdate() {
                this._resetTransformCache(), this.update()
            }
            _batchChangeChild(b, S) {
                this.findOne(b).setAttrs(S)
            }
            update() {
                var b;
                const S = this._getNodeRect();
                this.rotation(g.Util._getRotation(S.rotation));
                const k = S.width,
                    N = S.height,
                    D = this.enabledAnchors(),
                    I = this.resizeEnabled(),
                    O = this.padding(),
                    q = this.anchorSize(),
                    u = this.find("._anchor");
                u.forEach(E => {
                    E.setAttrs({
                        width: q,
                        height: q,
                        offsetX: q / 2,
                        offsetY: q / 2,
                        stroke: this.anchorStroke(),
                        strokeWidth: this.anchorStrokeWidth(),
                        fill: this.anchorFill(),
                        cornerRadius: this.anchorCornerRadius()
                    })
                }), this._batchChangeChild(".top-left", {
                    x: 0,
                    y: 0,
                    offsetX: q / 2 + O,
                    offsetY: q / 2 + O,
                    visible: I && D.indexOf("top-left") >= 0
                }), this._batchChangeChild(".top-center", {
                    x: k / 2,
                    y: 0,
                    offsetY: q / 2 + O,
                    visible: I && D.indexOf("top-center") >= 0
                }), this._batchChangeChild(".top-right", {
                    x: k,
                    y: 0,
                    offsetX: q / 2 - O,
                    offsetY: q / 2 + O,
                    visible: I && D.indexOf("top-right") >= 0
                }), this._batchChangeChild(".middle-left", {
                    x: 0,
                    y: N / 2,
                    offsetX: q / 2 + O,
                    visible: I && D.indexOf("middle-left") >= 0
                }), this._batchChangeChild(".middle-right", {
                    x: k,
                    y: N / 2,
                    offsetX: q / 2 - O,
                    visible: I && D.indexOf("middle-right") >= 0
                }), this._batchChangeChild(".bottom-left", {
                    x: 0,
                    y: N,
                    offsetX: q / 2 + O,
                    offsetY: q / 2 - O,
                    visible: I && D.indexOf("bottom-left") >= 0
                }), this._batchChangeChild(".bottom-center", {
                    x: k / 2,
                    y: N,
                    offsetY: q / 2 - O,
                    visible: I && D.indexOf("bottom-center") >= 0
                }), this._batchChangeChild(".bottom-right", {
                    x: k,
                    y: N,
                    offsetX: q / 2 - O,
                    offsetY: q / 2 - O,
                    visible: I && D.indexOf("bottom-right") >= 0
                }), this._batchChangeChild(".rotater", {
                    x: k / 2,
                    y: -this.rotateAnchorOffset() * g.Util._sign(N) - O,
                    visible: this.rotateEnabled()
                }), this._batchChangeChild(".back", {
                    width: k,
                    height: N,
                    visible: this.borderEnabled(),
                    stroke: this.borderStroke(),
                    strokeWidth: this.borderStrokeWidth(),
                    dash: this.borderDash(),
                    x: 0,
                    y: 0
                });
                const x = this.anchorStyleFunc();
                x && u.forEach(E => {
                    x(E)
                }), (b = this.getLayer()) === null || b === void 0 || b.batchDraw()
            }
            isTransforming() {
                return this._transforming
            }
            stopTransform() {
                if (this._transforming) {
                    this._removeEvents();
                    const b = this.findOne("." + this._movingAnchorName);
                    b && b.stopDrag()
                }
            }
            destroy() {
                return this.getStage() && this._cursorChange && this.getStage().content && (this.getStage().content.style.cursor = ""), f.Group.prototype.destroy.call(this), this.detach(), this._removeEvents(), this
            }
            toObject() {
                return M.Node.prototype.toObject.call(this)
            }
            clone(b) {
                return M.Node.prototype.clone.call(this, b)
            }
            getClientRect() {
                return this.nodes().length > 0 ? super.getClientRect() : {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
        };
    $t.Transformer = P, P.isTransforming = () => p > 0;

    function G(y) {
        return y instanceof Array || g.Util.warn("enabledAnchors value should be an array"), y instanceof Array && y.forEach(function(b) {
            m.indexOf(b) === -1 && g.Util.warn("Unknown anchor name: " + b + ". Available names are: " + m.join(", "))
        }), y || []
    }
    return P.prototype.className = "Transformer", (0, a._registerNode)(P), C.Factory.addGetterSetter(P, "enabledAnchors", m, G), C.Factory.addGetterSetter(P, "flipEnabled", !0, (0, e.getBooleanValidator)()), C.Factory.addGetterSetter(P, "resizeEnabled", !0), C.Factory.addGetterSetter(P, "anchorSize", 10, (0, e.getNumberValidator)()), C.Factory.addGetterSetter(P, "rotateEnabled", !0), C.Factory.addGetterSetter(P, "rotateLineVisible", !0), C.Factory.addGetterSetter(P, "rotationSnaps", []), C.Factory.addGetterSetter(P, "rotateAnchorOffset", 50, (0, e.getNumberValidator)()), C.Factory.addGetterSetter(P, "rotateAnchorCursor", "crosshair"), C.Factory.addGetterSetter(P, "rotationSnapTolerance", 5, (0, e.getNumberValidator)()), C.Factory.addGetterSetter(P, "borderEnabled", !0), C.Factory.addGetterSetter(P, "anchorStroke", "rgb(0, 161, 255)"), C.Factory.addGetterSetter(P, "anchorStrokeWidth", 1, (0, e.getNumberValidator)()), C.Factory.addGetterSetter(P, "anchorFill", "white"), C.Factory.addGetterSetter(P, "anchorCornerRadius", 0, (0, e.getNumberValidator)()), C.Factory.addGetterSetter(P, "borderStroke", "rgb(0, 161, 255)"), C.Factory.addGetterSetter(P, "borderStrokeWidth", 1, (0, e.getNumberValidator)()), C.Factory.addGetterSetter(P, "borderDash"), C.Factory.addGetterSetter(P, "keepRatio", !0), C.Factory.addGetterSetter(P, "shiftBehavior", "default"), C.Factory.addGetterSetter(P, "centeredScaling", !1), C.Factory.addGetterSetter(P, "ignoreStroke", !1), C.Factory.addGetterSetter(P, "padding", 0, (0, e.getNumberValidator)()), C.Factory.addGetterSetter(P, "nodes"), C.Factory.addGetterSetter(P, "node"), C.Factory.addGetterSetter(P, "boundBoxFunc"), C.Factory.addGetterSetter(P, "anchorDragBoundFunc"), C.Factory.addGetterSetter(P, "anchorStyleFunc"), C.Factory.addGetterSetter(P, "shouldOverdrawWholeArea", !1), C.Factory.addGetterSetter(P, "useSingleNodeRotation", !0), C.Factory.backCompat(P, {
        lineEnabled: "borderEnabled",
        rotateHandlerOffset: "rotateAnchorOffset",
        enabledHandlers: "enabledAnchors"
    }), $t
}
var Qt = {},
    bi;

function kn() {
    if (bi) return Qt;
    bi = 1, Object.defineProperty(Qt, "__esModule", {
        value: !0
    }), Qt.Wedge = void 0;
    const g = J(),
        C = ot(),
        M = Q(),
        T = Z(),
        v = Q();
    let f = class extends C.Shape {
        _sceneFunc(e) {
            e.beginPath(), e.arc(0, 0, this.radius(), 0, M.Konva.getAngle(this.angle()), this.clockwise()), e.lineTo(0, 0), e.closePath(), e.fillStrokeShape(this)
        }
        getWidth() {
            return this.radius() * 2
        }
        getHeight() {
            return this.radius() * 2
        }
        setWidth(e) {
            this.radius(e / 2)
        }
        setHeight(e) {
            this.radius(e / 2)
        }
    };
    return Qt.Wedge = f, f.prototype.className = "Wedge", f.prototype._centroid = !0, f.prototype._attrsAffectingSize = ["radius"], (0, v._registerNode)(f), g.Factory.addGetterSetter(f, "radius", 0, (0, T.getNumberValidator)()), g.Factory.addGetterSetter(f, "angle", 0, (0, T.getNumberValidator)()), g.Factory.addGetterSetter(f, "clockwise", !1), g.Factory.backCompat(f, {
        angleDeg: "angle",
        getAngleDeg: "getAngle",
        setAngleDeg: "setAngle"
    }), Qt
}
var Jt = {},
    Si;

function Fn() {
    if (Si) return Jt;
    Si = 1, Object.defineProperty(Jt, "__esModule", {
        value: !0
    }), Jt.Blur = void 0;
    const g = J(),
        C = at(),
        M = Z();

    function T() {
        this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
    }
    const v = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
        f = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

    function s(a, h) {
        const o = a.data,
            _ = a.width,
            l = a.height;
        let n, r, d, m, w, i, t, c, p, P, G, y, b, S, k, N, D, I, O, q;
        const u = h + h + 1,
            x = _ - 1,
            E = l - 1,
            R = h + 1,
            F = R * (R + 1) / 2,
            V = new T,
            L = v[h],
            H = f[h];
        let z = null,
            B = V,
            A = null,
            U = null;
        for (let W = 1; W < u; W++) B = B.next = new T, W === R && (z = B);
        B.next = V, d = r = 0;
        for (let W = 0; W < l; W++) {
            y = b = S = k = m = w = i = t = 0, c = R * (N = o[r]), p = R * (D = o[r + 1]), P = R * (I = o[r + 2]), G = R * (O = o[r + 3]), m += F * N, w += F * D, i += F * I, t += F * O, B = V;
            for (let Y = 0; Y < R; Y++) B.r = N, B.g = D, B.b = I, B.a = O, B = B.next;
            for (let Y = 1; Y < R; Y++) n = r + ((x < Y ? x : Y) << 2), m += (B.r = N = o[n]) * (q = R - Y), w += (B.g = D = o[n + 1]) * q, i += (B.b = I = o[n + 2]) * q, t += (B.a = O = o[n + 3]) * q, y += N, b += D, S += I, k += O, B = B.next;
            A = V, U = z;
            for (let Y = 0; Y < _; Y++) o[r + 3] = O = t * L >> H, O !== 0 ? (O = 255 / O, o[r] = (m * L >> H) * O, o[r + 1] = (w * L >> H) * O, o[r + 2] = (i * L >> H) * O) : o[r] = o[r + 1] = o[r + 2] = 0, m -= c, w -= p, i -= P, t -= G, c -= A.r, p -= A.g, P -= A.b, G -= A.a, n = d + ((n = Y + h + 1) < x ? n : x) << 2, y += A.r = o[n], b += A.g = o[n + 1], S += A.b = o[n + 2], k += A.a = o[n + 3], m += y, w += b, i += S, t += k, A = A.next, c += N = U.r, p += D = U.g, P += I = U.b, G += O = U.a, y -= N, b -= D, S -= I, k -= O, U = U.next, r += 4;
            d += _
        }
        for (let W = 0; W < _; W++) {
            b = S = k = y = w = i = t = m = 0, r = W << 2, c = R * (N = o[r]), p = R * (D = o[r + 1]), P = R * (I = o[r + 2]), G = R * (O = o[r + 3]), m += F * N, w += F * D, i += F * I, t += F * O, B = V;
            for (let K = 0; K < R; K++) B.r = N, B.g = D, B.b = I, B.a = O, B = B.next;
            let Y = _;
            for (let K = 1; K <= h; K++) r = Y + W << 2, m += (B.r = N = o[r]) * (q = R - K), w += (B.g = D = o[r + 1]) * q, i += (B.b = I = o[r + 2]) * q, t += (B.a = O = o[r + 3]) * q, y += N, b += D, S += I, k += O, B = B.next, K < E && (Y += _);
            r = W, A = V, U = z;
            for (let K = 0; K < l; K++) n = r << 2, o[n + 3] = O = t * L >> H, O > 0 ? (O = 255 / O, o[n] = (m * L >> H) * O, o[n + 1] = (w * L >> H) * O, o[n + 2] = (i * L >> H) * O) : o[n] = o[n + 1] = o[n + 2] = 0, m -= c, w -= p, i -= P, t -= G, c -= A.r, p -= A.g, P -= A.b, G -= A.a, n = W + ((n = K + R) < E ? n : E) * _ << 2, m += y += A.r = o[n], w += b += A.g = o[n + 1], i += S += A.b = o[n + 2], t += k += A.a = o[n + 3], A = A.next, c += N = U.r, p += D = U.g, P += I = U.b, G += O = U.a, y -= N, b -= D, S -= I, k -= O, U = U.next, r += _
        }
    }
    const e = function(h) {
        const o = Math.round(this.blurRadius());
        o > 0 && s(h, o)
    };
    return Jt.Blur = e, g.Factory.addGetterSetter(C.Node, "blurRadius", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), Jt
}
var Zt = {},
    Ci;

function Mn() {
    if (Ci) return Zt;
    Ci = 1, Object.defineProperty(Zt, "__esModule", {
        value: !0
    }), Zt.Brighten = void 0;
    const g = J(),
        C = at(),
        M = Z(),
        T = function(v) {
            const f = this.brightness() * 255,
                s = v.data,
                e = s.length;
            for (let a = 0; a < e; a += 4) s[a] += f, s[a + 1] += f, s[a + 2] += f
        };
    return Zt.Brighten = T, g.Factory.addGetterSetter(C.Node, "brightness", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), Zt
}
var te = {},
    wi;

function Gn() {
    if (wi) return te;
    wi = 1, Object.defineProperty(te, "__esModule", {
        value: !0
    }), te.Contrast = void 0;
    const g = J(),
        C = at(),
        M = Z(),
        T = function(v) {
            const f = Math.pow((this.contrast() + 100) / 100, 2),
                s = v.data,
                e = s.length;
            let a = 150,
                h = 150,
                o = 150;
            for (let _ = 0; _ < e; _ += 4) a = s[_], h = s[_ + 1], o = s[_ + 2], a /= 255, a -= .5, a *= f, a += .5, a *= 255, h /= 255, h -= .5, h *= f, h += .5, h *= 255, o /= 255, o -= .5, o *= f, o += .5, o *= 255, a = a < 0 ? 0 : a > 255 ? 255 : a, h = h < 0 ? 0 : h > 255 ? 255 : h, o = o < 0 ? 0 : o > 255 ? 255 : o, s[_] = a, s[_ + 1] = h, s[_ + 2] = o
        };
    return te.Contrast = T, g.Factory.addGetterSetter(C.Node, "contrast", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), te
}
var ee = {},
    xi;

function Nn() {
    if (xi) return ee;
    xi = 1, Object.defineProperty(ee, "__esModule", {
        value: !0
    }), ee.Emboss = void 0;
    const g = J(),
        C = at(),
        M = rt(),
        T = Z(),
        v = function(f) {
            const s = this.embossStrength() * 10,
                e = this.embossWhiteLevel() * 255,
                a = this.embossDirection(),
                h = this.embossBlend(),
                o = f.data,
                _ = f.width,
                l = f.height,
                n = _ * 4;
            let r = 0,
                d = 0,
                m = l;
            switch (a) {
                case "top-left":
                    r = -1, d = -1;
                    break;
                case "top":
                    r = -1, d = 0;
                    break;
                case "top-right":
                    r = -1, d = 1;
                    break;
                case "right":
                    r = 0, d = 1;
                    break;
                case "bottom-right":
                    r = 1, d = 1;
                    break;
                case "bottom":
                    r = 1, d = 0;
                    break;
                case "bottom-left":
                    r = 1, d = -1;
                    break;
                case "left":
                    r = 0, d = -1;
                    break;
                default:
                    M.Util.error("Unknown emboss direction: " + a)
            }
            do {
                const w = (m - 1) * n;
                let i = r;
                m + i < 1 && (i = 0), m + i > l && (i = 0);
                const t = (m - 1 + i) * _ * 4;
                let c = _;
                do {
                    const p = w + (c - 1) * 4;
                    let P = d;
                    c + P < 1 && (P = 0), c + P > _ && (P = 0);
                    const G = t + (c - 1 + P) * 4,
                        y = o[p] - o[G],
                        b = o[p + 1] - o[G + 1],
                        S = o[p + 2] - o[G + 2];
                    let k = y;
                    const N = k > 0 ? k : -k,
                        D = b > 0 ? b : -b,
                        I = S > 0 ? S : -S;
                    if (D > N && (k = b), I > N && (k = S), k *= s, h) {
                        const O = o[p] + k,
                            q = o[p + 1] + k,
                            u = o[p + 2] + k;
                        o[p] = O > 255 ? 255 : O < 0 ? 0 : O, o[p + 1] = q > 255 ? 255 : q < 0 ? 0 : q, o[p + 2] = u > 255 ? 255 : u < 0 ? 0 : u
                    } else {
                        let O = e - k;
                        O < 0 ? O = 0 : O > 255 && (O = 255), o[p] = o[p + 1] = o[p + 2] = O
                    }
                } while (--c)
            } while (--m)
        };
    return ee.Emboss = v, g.Factory.addGetterSetter(C.Node, "embossStrength", .5, (0, T.getNumberValidator)(), g.Factory.afterSetFilter), g.Factory.addGetterSetter(C.Node, "embossWhiteLevel", .5, (0, T.getNumberValidator)(), g.Factory.afterSetFilter), g.Factory.addGetterSetter(C.Node, "embossDirection", "top-left", void 0, g.Factory.afterSetFilter), g.Factory.addGetterSetter(C.Node, "embossBlend", !1, void 0, g.Factory.afterSetFilter), ee
}
var ie = {},
    Pi;

function On() {
    if (Pi) return ie;
    Pi = 1, Object.defineProperty(ie, "__esModule", {
        value: !0
    }), ie.Enhance = void 0;
    const g = J(),
        C = at(),
        M = Z();

    function T(f, s, e, a, h) {
        const o = e - s,
            _ = h - a;
        if (o === 0) return a + _ / 2;
        if (_ === 0) return a;
        let l = (f - s) / o;
        return l = _ * l + a, l
    }
    const v = function(f) {
        const s = f.data,
            e = s.length;
        let a = s[0],
            h = a,
            o, _ = s[1],
            l = _,
            n, r = s[2],
            d = r,
            m;
        const w = this.enhance();
        if (w === 0) return;
        for (let y = 0; y < e; y += 4) o = s[y + 0], o < a ? a = o : o > h && (h = o), n = s[y + 1], n < _ ? _ = n : n > l && (l = n), m = s[y + 2], m < r ? r = m : m > d && (d = m);
        h === a && (h = 255, a = 0), l === _ && (l = 255, _ = 0), d === r && (d = 255, r = 0);
        let i, t, c, p, P, G;
        if (w > 0) i = h + w * (255 - h), t = a - w * (a - 0), c = l + w * (255 - l), p = _ - w * (_ - 0), P = d + w * (255 - d), G = r - w * (r - 0);
        else {
            const y = (h + a) * .5;
            i = h + w * (h - y), t = a + w * (a - y);
            const b = (l + _) * .5;
            c = l + w * (l - b), p = _ + w * (_ - b);
            const S = (d + r) * .5;
            P = d + w * (d - S), G = r + w * (r - S)
        }
        for (let y = 0; y < e; y += 4) s[y + 0] = T(s[y + 0], a, h, t, i), s[y + 1] = T(s[y + 1], _, l, p, c), s[y + 2] = T(s[y + 2], r, d, G, P)
    };
    return ie.Enhance = v, g.Factory.addGetterSetter(C.Node, "enhance", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), ie
}
var ne = {},
    Ti;

function Ln() {
    if (Ti) return ne;
    Ti = 1, Object.defineProperty(ne, "__esModule", {
        value: !0
    }), ne.Grayscale = void 0;
    const g = function(C) {
        const M = C.data,
            T = M.length;
        for (let v = 0; v < T; v += 4) {
            const f = .34 * M[v] + .5 * M[v + 1] + .16 * M[v + 2];
            M[v] = f, M[v + 1] = f, M[v + 2] = f
        }
    };
    return ne.Grayscale = g, ne
}
var re = {},
    Ri;

function Dn() {
    if (Ri) return re;
    Ri = 1, Object.defineProperty(re, "__esModule", {
        value: !0
    }), re.HSL = void 0;
    const g = J(),
        C = at(),
        M = Z();
    g.Factory.addGetterSetter(C.Node, "hue", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), g.Factory.addGetterSetter(C.Node, "saturation", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), g.Factory.addGetterSetter(C.Node, "luminance", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter);
    const T = function(v) {
        const f = v.data,
            s = f.length,
            e = 1,
            a = Math.pow(2, this.saturation()),
            h = Math.abs(this.hue() + 360) % 360,
            o = this.luminance() * 127,
            _ = e * a * Math.cos(h * Math.PI / 180),
            l = e * a * Math.sin(h * Math.PI / 180),
            n = .299 * e + .701 * _ + .167 * l,
            r = .587 * e - .587 * _ + .33 * l,
            d = .114 * e - .114 * _ - .497 * l,
            m = .299 * e - .299 * _ - .328 * l,
            w = .587 * e + .413 * _ + .035 * l,
            i = .114 * e - .114 * _ + .293 * l,
            t = .299 * e - .3 * _ + 1.25 * l,
            c = .587 * e - .586 * _ - 1.05 * l,
            p = .114 * e + .886 * _ - .2 * l;
        let P, G, y, b;
        for (let S = 0; S < s; S += 4) P = f[S + 0], G = f[S + 1], y = f[S + 2], b = f[S + 3], f[S + 0] = n * P + r * G + d * y + o, f[S + 1] = m * P + w * G + i * y + o, f[S + 2] = t * P + c * G + p * y + o, f[S + 3] = b
    };
    return re.HSL = T, re
}
var se = {},
    Ai;

function In() {
    if (Ai) return se;
    Ai = 1, Object.defineProperty(se, "__esModule", {
        value: !0
    }), se.HSV = void 0;
    const g = J(),
        C = at(),
        M = Z(),
        T = function(v) {
            const f = v.data,
                s = f.length,
                e = Math.pow(2, this.value()),
                a = Math.pow(2, this.saturation()),
                h = Math.abs(this.hue() + 360) % 360,
                o = e * a * Math.cos(h * Math.PI / 180),
                _ = e * a * Math.sin(h * Math.PI / 180),
                l = .299 * e + .701 * o + .167 * _,
                n = .587 * e - .587 * o + .33 * _,
                r = .114 * e - .114 * o - .497 * _,
                d = .299 * e - .299 * o - .328 * _,
                m = .587 * e + .413 * o + .035 * _,
                w = .114 * e - .114 * o + .293 * _,
                i = .299 * e - .3 * o + 1.25 * _,
                t = .587 * e - .586 * o - 1.05 * _,
                c = .114 * e + .886 * o - .2 * _;
            for (let p = 0; p < s; p += 4) {
                const P = f[p + 0],
                    G = f[p + 1],
                    y = f[p + 2],
                    b = f[p + 3];
                f[p + 0] = l * P + n * G + r * y, f[p + 1] = d * P + m * G + w * y, f[p + 2] = i * P + t * G + c * y, f[p + 3] = b
            }
        };
    return se.HSV = T, g.Factory.addGetterSetter(C.Node, "hue", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), g.Factory.addGetterSetter(C.Node, "saturation", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), g.Factory.addGetterSetter(C.Node, "value", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), se
}
var ae = {},
    Ei;

function Un() {
    if (Ei) return ae;
    Ei = 1, Object.defineProperty(ae, "__esModule", {
        value: !0
    }), ae.Invert = void 0;
    const g = function(C) {
        const M = C.data,
            T = M.length;
        for (let v = 0; v < T; v += 4) M[v] = 255 - M[v], M[v + 1] = 255 - M[v + 1], M[v + 2] = 255 - M[v + 2]
    };
    return ae.Invert = g, ae
}
var oe = {},
    ki;

function Bn() {
    if (ki) return oe;
    ki = 1, Object.defineProperty(oe, "__esModule", {
        value: !0
    }), oe.Kaleidoscope = void 0;
    const g = J(),
        C = at(),
        M = rt(),
        T = Z(),
        v = function(e, a, h) {
            const o = e.data,
                _ = a.data,
                l = e.width,
                n = e.height,
                r = h.polarCenterX || l / 2,
                d = h.polarCenterY || n / 2;
            let m = Math.sqrt(r * r + d * d),
                w = l - r,
                i = n - d;
            const t = Math.sqrt(w * w + i * i);
            m = t > m ? t : m;
            const c = n,
                p = l,
                P = 360 / p * Math.PI / 180;
            for (let G = 0; G < p; G += 1) {
                const y = Math.sin(G * P),
                    b = Math.cos(G * P);
                for (let S = 0; S < c; S += 1) {
                    w = Math.floor(r + m * S / c * b), i = Math.floor(d + m * S / c * y);
                    let k = (i * l + w) * 4;
                    const N = o[k + 0],
                        D = o[k + 1],
                        I = o[k + 2],
                        O = o[k + 3];
                    k = (G + S * l) * 4, _[k + 0] = N, _[k + 1] = D, _[k + 2] = I, _[k + 3] = O
                }
            }
        },
        f = function(e, a, h) {
            const o = e.data,
                _ = a.data,
                l = e.width,
                n = e.height,
                r = h.polarCenterX || l / 2,
                d = h.polarCenterY || n / 2;
            let m = Math.sqrt(r * r + d * d),
                w = l - r,
                i = n - d;
            const t = Math.sqrt(w * w + i * i);
            m = t > m ? t : m;
            const c = n,
                p = l,
                P = 0;
            let G, y;
            for (w = 0; w < l; w += 1)
                for (i = 0; i < n; i += 1) {
                    const b = w - r,
                        S = i - d,
                        k = Math.sqrt(b * b + S * S) * c / m;
                    let N = (Math.atan2(S, b) * 180 / Math.PI + 360 + P) % 360;
                    N = N * p / 360, G = Math.floor(N), y = Math.floor(k);
                    let D = (y * l + G) * 4;
                    const I = o[D + 0],
                        O = o[D + 1],
                        q = o[D + 2],
                        u = o[D + 3];
                    D = (i * l + w) * 4, _[D + 0] = I, _[D + 1] = O, _[D + 2] = q, _[D + 3] = u
                }
        },
        s = function(e) {
            const a = e.width,
                h = e.height;
            let o, _, l, n, r, d, m, w, i, t, c = Math.round(this.kaleidoscopePower());
            const p = Math.round(this.kaleidoscopeAngle()),
                P = Math.floor(a * (p % 360) / 360);
            if (c < 1) return;
            const G = M.Util.createCanvasElement();
            G.width = a, G.height = h;
            const y = G.getContext("2d").getImageData(0, 0, a, h);
            M.Util.releaseCanvas(G), v(e, y, {
                polarCenterX: a / 2,
                polarCenterY: h / 2
            });
            let b = a / Math.pow(2, c);
            for (; b <= 8;) b = b * 2, c -= 1;
            b = Math.ceil(b);
            let S = b,
                k = 0,
                N = S,
                D = 1;
            for (P + b > a && (k = S, N = 0, D = -1), _ = 0; _ < h; _ += 1)
                for (o = k; o !== N; o += D) l = Math.round(o + P) % a, i = (a * _ + l) * 4, r = y.data[i + 0], d = y.data[i + 1], m = y.data[i + 2], w = y.data[i + 3], t = (a * _ + o) * 4, y.data[t + 0] = r, y.data[t + 1] = d, y.data[t + 2] = m, y.data[t + 3] = w;
            for (_ = 0; _ < h; _ += 1)
                for (S = Math.floor(b), n = 0; n < c; n += 1) {
                    for (o = 0; o < S + 1; o += 1) i = (a * _ + o) * 4, r = y.data[i + 0], d = y.data[i + 1], m = y.data[i + 2], w = y.data[i + 3], t = (a * _ + S * 2 - o - 1) * 4, y.data[t + 0] = r, y.data[t + 1] = d, y.data[t + 2] = m, y.data[t + 3] = w;
                    S *= 2
                }
            f(y, e, {})
        };
    return oe.Kaleidoscope = s, g.Factory.addGetterSetter(C.Node, "kaleidoscopePower", 2, (0, T.getNumberValidator)(), g.Factory.afterSetFilter), g.Factory.addGetterSetter(C.Node, "kaleidoscopeAngle", 0, (0, T.getNumberValidator)(), g.Factory.afterSetFilter), oe
}
var he = {},
    Fi;

function Vn() {
    if (Fi) return he;
    Fi = 1, Object.defineProperty(he, "__esModule", {
        value: !0
    }), he.Mask = void 0;
    const g = J(),
        C = at(),
        M = Z();

    function T(l, n, r) {
        let d = (r * l.width + n) * 4;
        const m = [];
        return m.push(l.data[d++], l.data[d++], l.data[d++], l.data[d++]), m
    }

    function v(l, n) {
        return Math.sqrt(Math.pow(l[0] - n[0], 2) + Math.pow(l[1] - n[1], 2) + Math.pow(l[2] - n[2], 2))
    }

    function f(l) {
        const n = [0, 0, 0];
        for (let r = 0; r < l.length; r++) n[0] += l[r][0], n[1] += l[r][1], n[2] += l[r][2];
        return n[0] /= l.length, n[1] /= l.length, n[2] /= l.length, n
    }

    function s(l, n) {
        const r = T(l, 0, 0),
            d = T(l, l.width - 1, 0),
            m = T(l, 0, l.height - 1),
            w = T(l, l.width - 1, l.height - 1),
            i = n || 10;
        if (v(r, d) < i && v(d, w) < i && v(w, m) < i && v(m, r) < i) {
            const t = f([d, r, w, m]),
                c = [];
            for (let p = 0; p < l.width * l.height; p++) {
                const P = v(t, [l.data[p * 4], l.data[p * 4 + 1], l.data[p * 4 + 2]]);
                c[p] = P < i ? 0 : 255
            }
            return c
        }
    }

    function e(l, n) {
        for (let r = 0; r < l.width * l.height; r++) l.data[4 * r + 3] = n[r]
    }

    function a(l, n, r) {
        const d = [1, 1, 1, 1, 0, 1, 1, 1, 1],
            m = Math.round(Math.sqrt(d.length)),
            w = Math.floor(m / 2),
            i = [];
        for (let t = 0; t < r; t++)
            for (let c = 0; c < n; c++) {
                const p = t * n + c;
                let P = 0;
                for (let G = 0; G < m; G++)
                    for (let y = 0; y < m; y++) {
                        const b = t + G - w,
                            S = c + y - w;
                        if (b >= 0 && b < r && S >= 0 && S < n) {
                            const k = b * n + S,
                                N = d[G * m + y];
                            P += l[k] * N
                        }
                    }
                i[p] = P === 2040 ? 255 : 0
            }
        return i
    }

    function h(l, n, r) {
        const d = [1, 1, 1, 1, 1, 1, 1, 1, 1],
            m = Math.round(Math.sqrt(d.length)),
            w = Math.floor(m / 2),
            i = [];
        for (let t = 0; t < r; t++)
            for (let c = 0; c < n; c++) {
                const p = t * n + c;
                let P = 0;
                for (let G = 0; G < m; G++)
                    for (let y = 0; y < m; y++) {
                        const b = t + G - w,
                            S = c + y - w;
                        if (b >= 0 && b < r && S >= 0 && S < n) {
                            const k = b * n + S,
                                N = d[G * m + y];
                            P += l[k] * N
                        }
                    }
                i[p] = P >= 1020 ? 255 : 0
            }
        return i
    }

    function o(l, n, r) {
        const d = [.1111111111111111, .1111111111111111, .1111111111111111, .1111111111111111, .1111111111111111, .1111111111111111, .1111111111111111, .1111111111111111, .1111111111111111],
            m = Math.round(Math.sqrt(d.length)),
            w = Math.floor(m / 2),
            i = [];
        for (let t = 0; t < r; t++)
            for (let c = 0; c < n; c++) {
                const p = t * n + c;
                let P = 0;
                for (let G = 0; G < m; G++)
                    for (let y = 0; y < m; y++) {
                        const b = t + G - w,
                            S = c + y - w;
                        if (b >= 0 && b < r && S >= 0 && S < n) {
                            const k = b * n + S,
                                N = d[G * m + y];
                            P += l[k] * N
                        }
                    }
                i[p] = P
            }
        return i
    }
    const _ = function(l) {
        const n = this.threshold();
        let r = s(l, n);
        return r && (r = a(r, l.width, l.height), r = h(r, l.width, l.height), r = o(r, l.width, l.height), e(l, r)), l
    };
    return he.Mask = _, g.Factory.addGetterSetter(C.Node, "threshold", 0, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), he
}
var le = {},
    Mi;

function Hn() {
    if (Mi) return le;
    Mi = 1, Object.defineProperty(le, "__esModule", {
        value: !0
    }), le.Noise = void 0;
    const g = J(),
        C = at(),
        M = Z(),
        T = function(v) {
            const f = this.noise() * 255,
                s = v.data,
                e = s.length,
                a = f / 2;
            for (let h = 0; h < e; h += 4) s[h + 0] += a - 2 * a * Math.random(), s[h + 1] += a - 2 * a * Math.random(), s[h + 2] += a - 2 * a * Math.random()
        };
    return le.Noise = T, g.Factory.addGetterSetter(C.Node, "noise", .2, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), le
}
var ce = {},
    Gi;

function qn() {
    if (Gi) return ce;
    Gi = 1, Object.defineProperty(ce, "__esModule", {
        value: !0
    }), ce.Pixelate = void 0;
    const g = J(),
        C = rt(),
        M = at(),
        T = Z(),
        v = function(f) {
            let s = Math.ceil(this.pixelSize()),
                e = f.width,
                a = f.height,
                h = Math.ceil(e / s),
                o = Math.ceil(a / s),
                _ = f.data;
            if (s <= 0) {
                C.Util.error("pixelSize value can not be <= 0");
                return
            }
            for (let l = 0; l < h; l += 1)
                for (let n = 0; n < o; n += 1) {
                    let r = 0,
                        d = 0,
                        m = 0,
                        w = 0;
                    const i = l * s,
                        t = i + s,
                        c = n * s,
                        p = c + s;
                    let P = 0;
                    for (let G = i; G < t; G += 1)
                        if (!(G >= e))
                            for (let y = c; y < p; y += 1) {
                                if (y >= a) continue;
                                const b = (e * y + G) * 4;
                                r += _[b + 0], d += _[b + 1], m += _[b + 2], w += _[b + 3], P += 1
                            }
                    r = r / P, d = d / P, m = m / P, w = w / P;
                    for (let G = i; G < t; G += 1)
                        if (!(G >= e))
                            for (let y = c; y < p; y += 1) {
                                if (y >= a) continue;
                                const b = (e * y + G) * 4;
                                _[b + 0] = r, _[b + 1] = d, _[b + 2] = m, _[b + 3] = w
                            }
                }
        };
    return ce.Pixelate = v, g.Factory.addGetterSetter(M.Node, "pixelSize", 8, (0, T.getNumberValidator)(), g.Factory.afterSetFilter), ce
}
var de = {},
    Ni;

function Wn() {
    if (Ni) return de;
    Ni = 1, Object.defineProperty(de, "__esModule", {
        value: !0
    }), de.Posterize = void 0;
    const g = J(),
        C = at(),
        M = Z(),
        T = function(v) {
            const f = Math.round(this.levels() * 254) + 1,
                s = v.data,
                e = s.length,
                a = 255 / f;
            for (let h = 0; h < e; h += 1) s[h] = Math.floor(s[h] / a) * a
        };
    return de.Posterize = T, g.Factory.addGetterSetter(C.Node, "levels", .5, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), de
}
var ue = {},
    Oi;

function zn() {
    if (Oi) return ue;
    Oi = 1, Object.defineProperty(ue, "__esModule", {
        value: !0
    }), ue.RGB = void 0;
    const g = J(),
        C = at(),
        M = Z(),
        T = function(v) {
            const f = v.data,
                s = f.length,
                e = this.red(),
                a = this.green(),
                h = this.blue();
            for (let o = 0; o < s; o += 4) {
                const _ = (.34 * f[o] + .5 * f[o + 1] + .16 * f[o + 2]) / 255;
                f[o] = _ * e, f[o + 1] = _ * a, f[o + 2] = _ * h, f[o + 3] = f[o + 3]
            }
        };
    return ue.RGB = T, g.Factory.addGetterSetter(C.Node, "red", 0, function(v) {
        return this._filterUpToDate = !1, v > 255 ? 255 : v < 0 ? 0 : Math.round(v)
    }), g.Factory.addGetterSetter(C.Node, "green", 0, function(v) {
        return this._filterUpToDate = !1, v > 255 ? 255 : v < 0 ? 0 : Math.round(v)
    }), g.Factory.addGetterSetter(C.Node, "blue", 0, M.RGBComponent, g.Factory.afterSetFilter), ue
}
var fe = {},
    Li;

function Yn() {
    if (Li) return fe;
    Li = 1, Object.defineProperty(fe, "__esModule", {
        value: !0
    }), fe.RGBA = void 0;
    const g = J(),
        C = at(),
        M = Z(),
        T = function(v) {
            const f = v.data,
                s = f.length,
                e = this.red(),
                a = this.green(),
                h = this.blue(),
                o = this.alpha();
            for (let _ = 0; _ < s; _ += 4) {
                const l = 1 - o;
                f[_] = e * o + f[_] * l, f[_ + 1] = a * o + f[_ + 1] * l, f[_ + 2] = h * o + f[_ + 2] * l
            }
        };
    return fe.RGBA = T, g.Factory.addGetterSetter(C.Node, "red", 0, function(v) {
        return this._filterUpToDate = !1, v > 255 ? 255 : v < 0 ? 0 : Math.round(v)
    }), g.Factory.addGetterSetter(C.Node, "green", 0, function(v) {
        return this._filterUpToDate = !1, v > 255 ? 255 : v < 0 ? 0 : Math.round(v)
    }), g.Factory.addGetterSetter(C.Node, "blue", 0, M.RGBComponent, g.Factory.afterSetFilter), g.Factory.addGetterSetter(C.Node, "alpha", 1, function(v) {
        return this._filterUpToDate = !1, v > 1 ? 1 : v < 0 ? 0 : v
    }), fe
}
var ge = {},
    Di;

function Kn() {
    if (Di) return ge;
    Di = 1, Object.defineProperty(ge, "__esModule", {
        value: !0
    }), ge.Sepia = void 0;
    const g = function(C) {
        const M = C.data,
            T = M.length;
        for (let v = 0; v < T; v += 4) {
            const f = M[v + 0],
                s = M[v + 1],
                e = M[v + 2];
            M[v + 0] = Math.min(255, f * .393 + s * .769 + e * .189), M[v + 1] = Math.min(255, f * .349 + s * .686 + e * .168), M[v + 2] = Math.min(255, f * .272 + s * .534 + e * .131)
        }
    };
    return ge.Sepia = g, ge
}
var pe = {},
    Ii;

function Xn() {
    if (Ii) return pe;
    Ii = 1, Object.defineProperty(pe, "__esModule", {
        value: !0
    }), pe.Solarize = void 0;
    const g = function(C) {
        const M = C.data,
            T = C.width,
            v = C.height,
            f = T * 4;
        let s = v;
        do {
            const e = (s - 1) * f;
            let a = T;
            do {
                const h = e + (a - 1) * 4;
                let o = M[h],
                    _ = M[h + 1],
                    l = M[h + 2];
                o > 127 && (o = 255 - o), _ > 127 && (_ = 255 - _), l > 127 && (l = 255 - l), M[h] = o, M[h + 1] = _, M[h + 2] = l
            } while (--a)
        } while (--s)
    };
    return pe.Solarize = g, pe
}
var _e = {},
    Ui;

function jn() {
    if (Ui) return _e;
    Ui = 1, Object.defineProperty(_e, "__esModule", {
        value: !0
    }), _e.Threshold = void 0;
    const g = J(),
        C = at(),
        M = Z(),
        T = function(v) {
            const f = this.threshold() * 255,
                s = v.data,
                e = s.length;
            for (let a = 0; a < e; a += 1) s[a] = s[a] < f ? 0 : 255
        };
    return _e.Threshold = T, g.Factory.addGetterSetter(C.Node, "threshold", .5, (0, M.getNumberValidator)(), g.Factory.afterSetFilter), _e
}
var Bi;

function $n() {
    if (Bi) return kt;
    Bi = 1, Object.defineProperty(kt, "__esModule", {
        value: !0
    }), kt.Konva = void 0;
    const g = _n(),
        C = mn(),
        M = vn(),
        T = bn(),
        v = Sn(),
        f = Cn(),
        s = wn(),
        e = Zi(),
        a = Le(),
        h = tn(),
        o = xn(),
        _ = Pn(),
        l = Tn(),
        n = Rn(),
        r = en(),
        d = An(),
        m = En(),
        w = kn(),
        i = Fn(),
        t = Mn(),
        c = Gn(),
        p = Nn(),
        P = On(),
        G = Ln(),
        y = Dn(),
        b = In(),
        S = Un(),
        k = Bn(),
        N = Vn(),
        D = Hn(),
        I = qn(),
        O = Wn(),
        q = zn(),
        u = Yn(),
        x = Kn(),
        E = Xn(),
        R = jn();
    return kt.Konva = g.Konva.Util._assign(g.Konva, {
        Arc: C.Arc,
        Arrow: M.Arrow,
        Circle: T.Circle,
        Ellipse: v.Ellipse,
        Image: f.Image,
        Label: s.Label,
        Tag: s.Tag,
        Line: e.Line,
        Path: a.Path,
        Rect: h.Rect,
        RegularPolygon: o.RegularPolygon,
        Ring: _.Ring,
        Sprite: l.Sprite,
        Star: n.Star,
        Text: r.Text,
        TextPath: d.TextPath,
        Transformer: m.Transformer,
        Wedge: w.Wedge,
        Filters: {
            Blur: i.Blur,
            Brighten: t.Brighten,
            Contrast: c.Contrast,
            Emboss: p.Emboss,
            Enhance: P.Enhance,
            Grayscale: G.Grayscale,
            HSL: y.HSL,
            HSV: b.HSV,
            Invert: S.Invert,
            Kaleidoscope: k.Kaleidoscope,
            Mask: N.Mask,
            Noise: D.Noise,
            Pixelate: I.Pixelate,
            Posterize: O.Posterize,
            RGB: q.RGB,
            RGBA: u.RGBA,
            Sepia: x.Sepia,
            Solarize: E.Solarize,
            Threshold: R.Threshold
        }
    }), kt
}
var Qn = ye.exports,
    Vi;

function Jn() {
    if (Vi) return ye.exports;
    Vi = 1, Object.defineProperty(Qn, "__esModule", {
        value: !0
    });
    const g = $n();
    return ye.exports = g.Konva, ye.exports
}
var Zn = Jn();
const nt = ln(Zn);

function ve(g) {
    if (!nt.autoDrawEnabled) {
        const C = g.getLayer() || g.getStage();
        C && C.batchDraw()
    }
}
const Hi = {
        key: !0,
        style: !0,
        elm: !0,
        isRootInsert: !0
    },
    Fe = ".vue-konva-event";

function nn(g, C, M, T) {
    const v = g.__konvaNode,
        f = {};
    let s = !1;
    for (let e in M) {
        if (Hi.hasOwnProperty(e)) continue;
        const a = e.slice(0, 2) === "on",
            h = M[e] !== C[e];
        if (a && h) {
            let o = e.slice(2).toLowerCase();
            o.slice(0, 7) === "content" && (o = "content" + o.slice(7, 1).toUpperCase() + o.slice(8)), v ? .off(o + Fe, M[e])
        }!C.hasOwnProperty(e) && v ? .setAttr(e, void 0)
    }
    for (let e in C) {
        if (Hi.hasOwnProperty(e)) continue;
        let a = e.slice(0, 2) === "on";
        const h = M[e] !== C[e];
        if (a && h) {
            let o = e.slice(2).toLowerCase();
            o.slice(0, 7) === "content" && (o = "content" + o.slice(7, 1).toUpperCase() + o.slice(8)), C[e] && (v ? .off(o + Fe), v ? .on(o + Fe, C[e]))
        }!a && (C[e] !== M[e] || T && C[e] !== v ? .getAttr(e)) && (s = !0, f[e] = C[e])
    }
    s && v && (v.setAttrs(f), ve(v))
}
const tr = "v";

function er(g) {
    function C(M) {
        return M ? .__konvaNode ? M : M ? .parent ? C(M.parent) : (console.error("vue-konva error: Can not find parent node"), null)
    }
    return C(g.parent)
}

function rn(g) {
    return g.component ? g.component.__konvaNode || rn(g.component.subTree) : null
}

function ir(g) {
    const {
        el: C,
        component: M
    } = g, T = rn(g);
    if (C ? .tagName && M && !T) {
        const v = C.tagName.toLowerCase();
        return console.error(`vue-konva error: You are trying to render "${v}" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.`), null
    }
    return T
}

function nr(g) {
    const C = v => !!v ? .hasOwnProperty("component"),
        M = v => Array.isArray(v),
        T = v => C(v) ? [v, ...T(v.children)] : M(v) ? v.flatMap(T) : [];
    return T(g.children)
}

function sn(g, C) {
    const M = nr(g),
        T = [];
    M.forEach(f => {
        const s = ir(f);
        s && T.push(s)
    });
    let v = !1;
    T.forEach((f, s) => {
        f.getZIndex() !== s && (f.setZIndex(s), v = !0)
    }), v && ve(C)
}
const rr = qi({
        name: "Stage",
        props: {
            config: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            __useStrictMode: {
                type: Boolean
            }
        },
        inheritAttrs: !1,
        setup(g, {
            attrs: C,
            slots: M,
            expose: T
        }) {
            const v = zi();
            if (!v) return;
            const f = Wi({}),
                s = cn(null),
                e = new nt.Stage({
                    width: g.config.width,
                    height: g.config.height,
                    container: document.createElement("div")
                });
            v.__konvaNode = e, o();

            function a() {
                return v ? .__konvaNode
            }

            function h() {
                return v ? .__konvaNode
            }

            function o() {
                if (!v) return;
                const _ = f || {},
                    l = { ...C,
                        ...g.config
                    };
                nn(v, l, _, g.__useStrictMode), Object.assign(f, l)
            }
            return Ki(() => {
                s.value && (s.value.innerHTML = "", e.container(s.value)), o()
            }), Xi(() => {
                o(), sn(v.subTree, e)
            }), dn(() => {
                e.destroy()
            }), ji(() => g.config, o, {
                deep: !0
            }), T({
                getStage: h,
                getNode: a
            }), () => Yi("div", {
                ref: s,
                style: C ? .style
            }, M.default ? .())
        }
    }),
    sr = ".vue-konva-event",
    ar = {
        Group: !0,
        Layer: !0,
        FastLayer: !0,
        Label: !0
    };

function or(g, C) {
    return qi({
        name: g,
        props: {
            config: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            __useStrictMode: {
                type: Boolean
            }
        },
        setup(M, {
            attrs: T,
            slots: v,
            expose: f
        }) {
            const s = zi();
            if (!s) return;
            const e = Wi({}),
                a = new C;
            s.__konvaNode = a, s.vnode.__konvaNode = a, _();

            function h() {
                return s ? .__konvaNode
            }

            function o() {
                return s ? .__konvaNode
            }

            function _() {
                if (!s) return;
                const n = {};
                for (const m in s ? .vnode.props) m.slice(0, 2) === "on" && (n[m] = s.vnode.props[m]);
                const r = e || {},
                    d = { ...T,
                        ...M.config,
                        ...n
                    };
                nn(s, d, r, M.__useStrictMode), Object.assign(e, d)
            }
            Ki(() => {
                const n = er(s) ? .__konvaNode;
                n && "add" in n && n.add(a), ve(a)
            }), un(() => {
                ve(a), a.destroy(), a.off(sr)
            }), Xi(() => {
                _(), sn(s.subTree, a)
            }), ji(() => M.config, _, {
                deep: !0
            }), f({
                getStage: o,
                getNode: h
            });
            const l = ar.hasOwnProperty(g);
            return () => l ? Yi("template", {}, v.default ? .()) : null
        }
    })
}
typeof window < "u" && !window.Konva && require("konva");
const hr = {
        install: (g, C) => {
            const M = C ? .prefix || tr,
                T = {
                    Arc: nt.Arc,
                    Arrow: nt.Arrow,
                    Circle: nt.Circle,
                    Ellipse: nt.Ellipse,
                    FastLayer: nt.FastLayer,
                    Group: nt.Group,
                    Image: nt.Image,
                    Label: nt.Label,
                    Layer: nt.Layer,
                    Line: nt.Line,
                    Path: nt.Path,
                    Rect: nt.Rect,
                    RegularPolygon: nt.RegularPolygon,
                    Ring: nt.Ring,
                    Shape: nt.Shape,
                    Sprite: nt.Sprite,
                    Star: nt.Star,
                    Tag: nt.Tag,
                    Text: nt.Text,
                    TextPath: nt.TextPath,
                    Transformer: nt.Transformer,
                    Wedge: nt.Wedge,
                    ...C ? .customNodes
                };
            [rr, ...Object.entries(T).map(([v, f]) => or(v, f))].forEach(v => {
                g.component(`${M}${v.name}`, v)
            })
        }
    },
    Gr = hn(async ({
        app: g
    }) => {
        g.use(hr)
    });
export {
    Gr as
    default
};