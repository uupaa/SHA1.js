new Test().add([
        testSHA1String,
        testSHA1Binary,
    ]).run().worker(function(err, test) {
        if (!err) {
            SHA1 = SHA1_;
            new Test(test).run().worker();
        }
    });

function testSHA1String(next) {

    var source = "aaa";
    var answer = "7e240de74fb1ed08fa08d38063f6a6a91462a815";
    var sha1HashString = SHA1(source);

    if (answer === sha1HashString) {
        console.log("testSHA1String ok");
        next && next.pass();
    } else {
        console.log("testSHA1String ng");
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
        console.log("testSHA1Binary ok");
        next && next.pass();
    } else {
        console.log("testSHA1Binary ng");
        next && next.miss();
    }
}

