# Changelog

## v4.0.1

- Fix flat config issue. See [#23](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/pull/23). Thanks @MariaSolOs!

## v4.0.0

- Add `react-` prefix to the flat configuration rule name. When using ESLint's flat configuration, the exported configuration from this package now "react-prefer-function-component". Previously it was "prefer-function-component". Practically speaking, no changes are expected from consumers of this package.

Action would only be necessary if there is an existing plugin in your ESLint configuration using the "react-prefer-function-component" name, or if you're programmatically processing your ESLint configuration and expecting to find "prefer-function-component".

See [#20](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/pull/20). Thanks @MariaSolOs!

## v3.4.0

- Improved TypeScript type for the configuration object. See [#17](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/pull/17). Thanks @PrettyCoffee!

## v3.3.0

Adds ESLint's [new configuration system](https://eslint.org/blog/2022/08/new-config-system-part-1/), `flat config`. If you're using the new flat config:

    `eslint.config.js`:

    ```js
    import eslint from "@eslint/js";
    import reactRecommended from "eslint-plugin-react/configs/recommended.js";
    import preferFC from "eslint-plugin-react-prefer-function-component/config";

    export default [
      { files: ["**/*.{js,jsx}"] },
      eslint.configs.recommended,
      reactRecommended,
      preferFC.configs.recommended,
    ];
    ```

## v3.2.0

- The plugin's recommended configuration has been fixed, so `plugins` can be dropped from your `.eslintrc` when using the recommended settings:

  ```diff
  module.exports = {
  -  plugins: ["react-prefer-function-component"],
    extends: ["plugin:react-prefer-function-component/recommended"],
  };
  ```

  Thanks @alecmev!

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
