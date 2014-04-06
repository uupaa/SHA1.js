SHA1.js
=========

calc SHA1 hash.

# Document

- https://github.com/uupaa/SHA1.js/wiki/SHA1

and

- https://github.com/uupaa/WebModule and [slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
- https://github.com/uupaa/Help.js and [slide](http://uupaa.github.io/Slide/slide/Help.js/index.html)

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

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/SHA1.js.git
    $ cd SHA1.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`

