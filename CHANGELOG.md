# Changelog

## v2.0.0

Support for `createClass` has been dropped. Usage of `createClass` will no longer be detected.

Now errors on any JSX usage within a `class`. Previously the below was not caught:

```jsx
import Document from "next/document";

class MyDocument extends Document {
  render() {
    <>...</>;
  }
}
```

## v1.0.0

No API changes. This library will now follow [semantic versioning](https://docs.npmjs.com/about-semantic-versioning).
