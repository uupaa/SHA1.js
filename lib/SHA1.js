(function(global) {
"use strict";

// --- dependency modules ----------------------------------
var DataType = global["DataType"];

// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function SHA1(source) { // @arg String - source string
                        // @ret SHA1HashHexString
//{@dev
    $valid($type(source, "String"), SHA1, "source");
//}@dev

    var sha1 = DataType["Array"]["toHexStringArray"](
                    SHA1_encode(
                        DataType["Uint8Array"]["fromString"](source) ) );

    return sha1.join("");
}

//{@dev
SHA1["repository"] = "https://github.com/uupaa/SHA1.js";
//}@dev

SHA1["encode"] = SHA1_encode; // SHA1.encode(source:Uint8Array):Uint8Array

// --- implements ------------------------------------------
function SHA1_encode(source) { // @arg Uint8Array
                               // @ret Uint8Array
//{@dev
    $valid($type(source, "Uint8Array"), SHA1_encode, "source");
//}@dev

    var buffer = _createBufferWith64BytePadding(source);
    var hash   = _SHA1(buffer); // [a, b, c, d, e]
    var result = new Uint8Array(20);

    for (var ri = 0, hi = 0; hi < 5; ri += 4, ++hi) {
        result[ri    ] = hash[hi] >>> 24 & 0xff;
        result[ri + 1] = hash[hi] >>> 16 & 0xff;
        result[ri + 2] = hash[hi] >>>  8 & 0xff;
        result[ri + 3] = hash[hi]        & 0xff;
    }
    return result;
}

function _createBufferWith64BytePadding(source) {
    var iz     = source.length;
    var e      = iz * 8;
    var remain = (iz + 1) % 64;
    var times  = (iz + 1) >> 6;

    if (remain > 56) {
        ++times;
    }
    var bufferLength = (times + 1) << 6;
    var buffer = new Uint8Array(bufferLength);

    buffer.set(source);
    buffer[iz] = 0x80;
    buffer[bufferLength - 4] = e >>> 24 & 0xff;
    buffer[bufferLength - 3] = e >>> 16 & 0xff;
    buffer[bufferLength - 2] = e >>>  8 & 0xff;
    buffer[bufferLength - 1] = e        & 0xff;

    return buffer;
}

function _SHA1(source) { // @arg Uint8Array
                         // @ret Array
                         // @desc calc SHA-1
    // setup default values
    var a = 0x67452301;
    var b = 0xefcdab89;
    var c = 0x98badcfe;
    var d = 0x10325476;
    var e = 0xc3d2e1f0;

    // working and temporary
    var aa = 0, bb = 0, cc = 0, dd = 0, ee = 0;
    var i = 0, iz = source.length, j = 0, jz = 0, n = 0;
    var word = [];

    for (; i < iz; i += 64) {
        aa = a;
        bb = b;
        cc = c;
        dd = d;
        ee = e;

        for (j = i, jz = i + 64, n = 0; j < jz; j += 4, ++n) {
            word[n] = (source[j]     << 24) | (source[j + 1] << 16) |
                      (source[j + 2] <<  8) |  source[j + 3];
        }
        for (j = 16; j < 80; ++j) {
            n = word[j - 3] ^ word[j - 8] ^ word[j - 14] ^ word[j - 16];
            word[j] = (n << 1) | (n >>> 31);
        }
        for (j = 0; j < 80; ++j) {
            n = j < 20 ? ((b & c) ^ (~b & d))           + 0x5a827999
              : j < 40 ?  (b ^ c ^ d)                   + 0x6ed9eba1
              : j < 60 ? ((b & c) ^  (b & d) ^ (c & d)) + 0x8f1bbcdc
                       :  (b ^ c ^ d)                   + 0xca62c1d6;
            n += ((a << 5) | (a >>> 27)) + word[j] + e;

            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = n;
        }
        a += aa;
        b += bb;
        c += cc;
        d += dd;
        e += ee;
    }
    return [a, b, c, d, e];
}

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = SHA1;
}
global["SHA1" in global ? "SHA1_" : "SHA1"] = SHA1; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

