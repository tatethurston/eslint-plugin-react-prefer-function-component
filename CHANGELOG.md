# Changelog

## v3.2.0

- The plugin's recommended configuration has been fixed, so `plugins` can be dropped from your `.eslintrc` when using the recommended settings:

  ```diff
  module.exports = {
  -  plugins: ["react-prefer-function-component"],
    extends: ["plugin:react-prefer-function-component/recommended"],
  };

  Thanks @alecmev!
  ```

## v3.1.0

- New option: `allowJsxUtilityClass`. This configuration option permits JSX utility classes: classes that have methods that return JSX but are not themselves components(they do not extend from a Component class or have a render method).

  The following is now permitted when enabling this configuration option:

  ```jsx
  class Foo {
    getBar() {
      return <Bar />;
    }
  }
  ```

  Thanks [noahm](https://github.com/noahm) for the contribution!

## v3.0.0

Detects `class` components that extend the `Component` class, even if they do not use any JSX. Now errors on manager, business logic, and other renderless `class` components that extend `Component`. Previously the below was not caught:

```jsx
class TimerComponent extends React.Component {
  /// ...

  componentWillMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    null;
  }
}
```

Thanks @wo1ph for the improvements!

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
