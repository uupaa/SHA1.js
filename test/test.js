var ModuleTestSHA1 = (function(global) {

return new Test("SHA1", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        testSHA1String,
        testSHA1Binary,
    ]).run().clone();

function testSHA1String(next) {

    var source = "aaa";
    var answer = "7e240de74fb1ed08fa08d38063f6a6a91462a815";
    var sha1HashString = SHA1(source);

    if (answer === sha1HashString) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testSHA1Binary(next) {

    var source = "aaa";
    var answer = "7e240de74fb1ed08fa08d38063f6a6a91462a815";
    var sha1HashArray = SHA1.encode(ByteArray.fromString(source));

    var match = sha1HashArray.every(function(value, index) {
            var hex = parseInt(answer.slice(index * 2, index * 2 + 2), 16);

            return value === hex;
        });

    if (match) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

})((this || 0).self || global);

