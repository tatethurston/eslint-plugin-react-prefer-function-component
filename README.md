# ESLint-plugin-React-prefer-function-component

<blockquote>ESLint lint rule to enforce function components in React</blockquote>

## What is this? 🧐

An [ESLint](https://github.com/eslint/eslint) plugin that prevents the use of React class components. By default, class components that use `componentDidCatch` are enabled because there is currently no hook alternative for React. This option is configurable via `allowComponentDidCatch`.

This rule is intended to complement the [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) rule set.

## Installation & Usage 📦

```
$ npm install eslint eslint-plugin-react-prefer-function-component --save-dev
```

`.eslintrc` configuration:

```js
module.exports = {
  plugins: ["react-prefer-function-component"],
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

## Rule Details

function components are simpler than class based components and will benefit from future React performance optimizations.

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
const Foo = function (props) {
  return <div>{props.foo}</div>;
};
```

```jsx
const Foo = ({ foo }) => <div>{foo}</div>;
```

## Rule Options

```js
...
"prefer-function-component": [<enabled>, { "allowComponentDidCatch": <allowComponentDidCatch> }]
...
```

- `enabled`: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.
- `allowComponentDidCatch`: optional boolean set to `true` if you would like to ignore class components using `componentDidCatch` (default to `true`).

### `allowComponentDidCatch`

When `true` the rule will ignore components that use `componentDidCatch`

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

## Contributing 👫

PR's and issues welcomed! For more guidance check out [CONTRIBUTING.md](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/blob/master/CONTRIBUTING.md)

## Licensing 📃

See the project's [MIT License](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/blob/master/LICENSE).
