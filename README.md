# SHA1.js [![Build Status](https://travis-ci.org/uupaa/SHA1.js.png)](http://travis-ci.org/uupaa/SHA1.js)

[![npm](https://nodei.co/npm/uupaa.sha1.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.sha1.js/)

Calc SHA1 hash.

## Document

- [SHA1.js wiki](https://github.com/uupaa/SHA1.js/wiki/SHA1)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


## How to use

### for Browser

```js
<script src="lib/SHA1.js">
<script>

console.log( SHA1("aaa") ); // "7e240de74fb1ed08fa08d38063f6a6a91462a815";
</script>
```

### WebWorkers

```js
importScripts("lib/SHA1.js");

console.log( SHA1("aaa") ); // "7e240de74fb1ed08fa08d38063f6a6a91462a815";
```

### Node.js

```js
var SHA1 = require("lib/SHA1.js");

console.log( SHA1("aaa") ); // "7e240de74fb1ed08fa08d38063f6a6a91462a815";
```

