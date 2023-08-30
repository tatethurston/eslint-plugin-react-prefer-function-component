# eslint-plugin-react-prefer-function-component

<blockquote>An <a href="https://github.com/eslint/eslint">ESLint</a> plugin that prevents the use of React class components.</blockquote>

<br />

<a href="https://www.npmjs.com/package/eslint-plugin-react-prefer-function-component">
  <img src="https://img.shields.io/npm/v/eslint-plugin-react-prefer-function-component.svg">
</a>
<a href="https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/blob/master/LICENSE">
  <img src="https://img.shields.io/npm/l/eslint-plugin-react-prefer-function-component.svg">
</a>
<a href="https://bundlephobia.com/result?p=eslint-plugin-react-prefer-function-component">
  <img src="https://img.shields.io/bundlephobia/minzip/eslint-plugin-react-prefer-function-component">
</a>
<a href="https://www.npmjs.com/package/eslint-plugin-react-prefer-function-component">
  <img src="https://img.shields.io/npm/dy/eslint-plugin-react-prefer-function-component.svg">
</a>
<a href="https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/actions/workflows/ci.yml">
  <img src="https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/actions/workflows/ci.yml/badge.svg">
</a>
<a href="https://codecov.io/gh/tatethurston/eslint-plugin-react-prefer-function-component">
  <img src="https://img.shields.io/codecov/c/github/tatethurston/eslint-plugin-react-prefer-function-component/main.svg?style=flat-square">
</a>

## What is this? 🧐

An [ESLint](https://github.com/eslint/eslint) plugin that prevents the use of React class components. While this plugin specifically calls out React, it will work with Preact, Inferno, or other JSX libraries.

## Motivation

Since the addition of hooks, it has been possible to write stateful React components
using only functions.

Leaving the choice between class or function components up to the community is great, but generally within a codebase I want consistency: either we're writing class components and HoCs or we're using function components and hooks. Straddling the two adds unnecessary hurdles for sharing reusable logic.

By default, class components that use `componentDidCatch` are enabled because there is currently no hook alternative for React. This option is configurable via `allowComponentDidCatch`.

This rule is intended to complement the [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) rule set.

## FAQ

> What about `ErrorBoundary` class components? Does this lint rule support those?

Yes it does. [Error Boundaries](https://reactjs.org/docs/error-boundaries.html) are implemented by defining `componentDidCatch`. Because there is currently no hook equivalent, class components that implement `componentDidCatch` are allowed by default.

This option is configurable.

> What about [eslint-plugin-react/prefer-stateless-function](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)?

`eslint-plugin-react/prefer-stateless-function` allows class components that implement any methods or properties other than `render`. This rule is stricter and prevents the use of _any_ class components. This [open issue](https://github.com/jsx-eslint/eslint-plugin-react/issues/2860) explains the limitations of `prefer-stateless-function` and the motivations for this plugin.

> Why didn't you contribute this rule to [https://github.com/yannickcr/eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)?

I'm discussing this in an [open issue](https://github.com/yannickcr/eslint-plugin-react/issues/2860#issuecomment-819784530) and [pull request](https://github.com/yannickcr/eslint-plugin-react/pull/3040) on `eslint-plugin-react`. At this time, the maintainer of `eslint-plugin-react` is unconvinced that function component enforcement should be a lint rule. If you would like to see this rule added to `eslint-plugin-react`, please join the discussion on the issue or pull request.

## Installation & Usage 📦

1. Install:

```
$ npm install eslint eslint-plugin-react-prefer-function-component --save-dev
```

2. Update your `eslint.config.js`:

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

### ESLint Legacy Configuration

`.eslintrc` configuration:

```js
module.exports = {
  extends: ["plugin:react-prefer-function-component/recommended"],
};
```

Or customize:

```js
module.exports = {
  plugins: ["react-prefer-function-component"],
  rules: {
    "react-prefer-function-component/react-prefer-function-component": [
      "error",
      { allowComponentDidCatch: false },
    ],
  },
};
```

For more configuration examples, take a look at the [examples directory](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/tree/main/examples).

## Rule Details

This rule will flag any React class components that don't use `componentDidCatch`.

Examples of **incorrect** code for this rule:

```jsx
import { Component } from "react";

class Foo extends Component {
  render() {
    return <div>{this.props.foo}</div>;
  }
}
```

Examples of **correct** code for this rule:

```jsx
function Foo(props) {
  return <div>{props.foo}</div>;
}
```

```jsx
const Foo = ({ foo }) => <div>{foo}</div>;
```

## Rule Options

```js
...
"prefer-function-component": [<enabled>, { "allowComponentDidCatch": <allowComponentDidCatch>, "allowJsxUtilityClass": <allowJsxUtilityClass> }]
...
```

- `enabled`: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.
- `allowComponentDidCatch`: optional boolean. set to `false` if you want to also flag class components that use `componentDidCatch` (defaults to `true`).
- `allowJsxUtilityClass`: optional boolean. set to `true` if you want to allow classes that contain JSX but aren't class components (defaults to `false`).

### `allowComponentDidCatch`

When `true` (the default) the rule will ignore components that use `componentDidCatch`

Examples of **correct** code for this rule:

```jsx
import { Component } from "react";

class Foo extends Component {
  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    return <div>{this.props.foo}</div>;
  }
}
```

When `false` the rule will also flag components that use `componentDidCatch`

Examples of **incorrect** code for this rule:

```jsx
import { Component } from "react";

class Foo extends Component {
  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    return <div>{this.props.foo}</div>;
  }
}
```

### `allowJsxUtilityClass`

When `true` the rule will ignore JS classes that aren't class Components

Examples of **correct** code for this rule:

```jsx
import { Bar } from "./Bar";

class Foo {
  getBar() {
    return <Bar />;
  }
}
```

When `false` (the default) the rule will flag any class with JSX

Examples of **incorrect** code for this rule:

```jsx
import { Bar } from "./Bar";

class Foo {
  getBar() {
    return <Bar />;
  }
}
```

## Contributing 👫

PR's and issues welcomed! For more guidance check out [CONTRIBUTING.md](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/blob/master/CONTRIBUTING.md)

## Licensing 📃

See the project's [MIT License](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/blob/master/LICENSE).
