// --- define ----------------------------------------------
// --- variable --------------------------------------------
var test = new UnitTest([
        testSHA1String,
        testSHA1Binary,
    ]);

// --- interface -------------------------------------------
// --- implement -------------------------------------------
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

// --- export ----------------------------------------------

// --- run ----------------------------------------------
function _init() {
    // create <input> buttons.
    if (typeof document !== "undefined") {
        test.names().forEach(function(name) {
            //  <input type="button" onclick="testX()" value="testX()" /> node.
            document.body.appendChild(
                _createNode("input", {
                    type: "button",
                    value: name + "()",
                    onclick: name + "()" }));
        });
        window.addEventListener("error", function(message, lineno, filename) {
            document.body.style.backgroundColor = "red";
        });
    }
    // run
    test.run(function(err) {
        if (typeof document !== "undefined") {
            document.body.style.backgroundColor = err ? "red" : "lime";
        } else {
            // console color
            var RED    = '\u001b[31m';
            var YELLOW = '\u001b[33m';
            var GREEN  = '\u001b[32m';
            var CLR    = '\u001b[0m';

            if (err) {
                console.log(RED + "error." + CLR);
            } else {
                console.log(GREEN + "ok." + CLR);
            }
        }
    });

    function _createNode(name, attrs) {
        var node = document.createElement(name);

        for (var key in attrs) {
            node.setAttribute(key, attrs[key]);
        }
        return node;
    }
}

if (this.self) {
    this.self.addEventListener("load", _init);
} else {
    _init();
}

