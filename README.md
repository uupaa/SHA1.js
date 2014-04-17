=========
SHA1.js
=========

![](https://travis-ci.org/uupaa/SHA1.js.png)

Calc SHA1 hash.

# Document

- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [SHA1.js wiki](https://github.com/uupaa/SHA1.js/wiki/SHA1)


# How to use

```js
<script src="lib/SHA1.js">
<script>
// for Browser

console.log( SHA1("aaa") ); // "7e240de74fb1ed08fa08d38063f6a6a91462a815";
</script>
```

```js
// for WebWorkers
importScripts("lib/SHA1.js");

console.log( SHA1("aaa") ); // "7e240de74fb1ed08fa08d38063f6a6a91462a815";
```

```js
// for Node.js
var SHA1 = require("lib/SHA1.js");

console.log( SHA1("aaa") ); // "7e240de74fb1ed08fa08d38063f6a6a91462a815";
```
