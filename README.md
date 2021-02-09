`production` vs `development` config:

```js
// webpack.prod.js hoặc webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = merge(common, {
    // config
});
```

Thêm `--config file` trong `package.json`

Khởi chạy `dev server`:

```
npm start
```

Build `production`:

```
npm run build
```
