// @name: SHA1.js
// @require: Valid.js, ByteArray.js

(function(global) {
"use strict";

// --- variable --------------------------------------------
//{@assert
var Valid = global["Valid"] || require("uupaa.valid.js");
//}@assert

var ByteArray = global["ByteArray"] || require("uupaa.bytearray.js");  // npm link uupaa.bytearray.js

var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function SHA1(source) { // @arg String: source string
                        // @ret String: sha1 hash string.
                        // @help: SHA1
//{@assert
    _if(!Valid.type(source, "String"), "SHA1(source)");
//}@assert

    var sha1 = ByteArray["toHexString"](
                    SHA1_encode(
                        ByteArray["fromString"](source) ) );

    return sha1;
}
SHA1["name"] = "SHA1";
SHA1["repository"] = "https://github.com/uupaa/SHA1.js";

SHA1["encode"] = SHA1_encode; // SHA1.encode(source:ByteArray):ByteArray

// --- implement -------------------------------------------
function SHA1_encode(source) { // @arg ByteArray: [byte, ...]
                               // @ret ByteArray: [...]
                               // @help: SHA1.encode
//{@assert
    _if(!Valid.type(source, "Array"), "SHA1.encode(source)");
//}@assert

    var rv = source, i = rv.length, iz, e = i;
    var a, b, c, d;

    // --- padding ---
    rv[i++] = 0x80;

    while (i % 64 !== 56) {
        rv[i++] = 0;
    }
    e *= 8;

    rv.push(0, 0, 0, 0,
            e >> 24 & 0xff,
            e >> 16 & 0xff,
            e >>  8 & 0xff,
            e       & 0xff);

    var hash = _SHA1(rv);

    for (rv = [], i = 0, iz = hash.length; i < iz; ++i) {
        rv.push(hash[i]       & 0xff,
                hash[i] >>  8 & 0xff,
                hash[i] >> 16 & 0xff,
                hash[i] >> 24 & 0xff);
    }
    for (i = 0, iz = rv.length; i < iz; i += 4) {
        a = rv[i    ];
        b = rv[i + 1];
        c = rv[i + 2];
        d = rv[i + 3];
        rv[i + 3] = a;
        rv[i + 2] = b;
        rv[i + 1] = c;
        rv[i    ] = d;
    }
    return rv;
}

function _SHA1(source) { // @arg ByteArray:
                         // @ret ByteArray:
                         // @desc: calc SHA-1
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

//{@assert
function _if(value, msg) {
    if (value) {
        console.error(Valid.stack(msg));
        throw new Error(msg);
    }
}
//}@assert

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = SHA1;
}
//}@node
if (global["SHA1"]) {
    global["SHA1_"] = SHA1; // already exsists
} else {
    global["SHA1"]  = SHA1;
}

})((this || 0).self || global);
