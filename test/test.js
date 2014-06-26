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

function testSHA1String(test, pass, miss) {

    var source = "aaa";
    var answer = "7e240de74fb1ed08fa08d38063f6a6a91462a815";
    var sha1HashString = SHA1(source);

    if (answer === sha1HashString) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSHA1Binary(test, pass, miss) {

    var source = "aaa";
    var answer = "7e240de74fb1ed08fa08d38063f6a6a91462a815";
    var sha1HashArray = SHA1.encode(DataType["Uint8Array"].fromString(source));
    var array = Array.prototype.slice.call(sha1HashArray);

    var match = array.every(function(value, index) {
            var hex = parseInt(answer.slice(index * 2, index * 2 + 2), 16);

            return value === hex;
        });

    if (match) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

})((this || 0).self || global);

