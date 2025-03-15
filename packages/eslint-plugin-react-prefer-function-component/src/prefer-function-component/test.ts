import { RuleTester } from "eslint";
import rule, {
  ALLOW_COMPONENT_DID_CATCH,
  ALLOW_JSX_UTILITY_CLASS,
  COMPONENT_SHOULD_BE_FUNCTION,
} from ".";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

const validForAllOptions = [
  // Already a stateless function
  `\
    const Foo = function(props) {
      return <div>{props.foo}</div>;
    };
  `,
  // Already a stateless (arrow) function
  "const Foo = ({foo}) => <div>{foo}</div>;",
  // class without JSX
  `\
    class Foo {
      render() {
        return 'hello'
      }
    };
  `,
  // object with JSX
  `\
    const foo = {
      foo: <h>hello</h>
    };
  `,
];

const invalidForAllOptions = [
  // Extending from react
  `\
    import { Component } from 'react';

    class Foo extends Component {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
  `,
  // Extending from preact
  `\
    import { Component } from 'preact';

    class Foo extends Component {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
  `,
  // Extending from inferno
  `\
    import { Component } from 'inferno';

    class Foo extends Component {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
  `,
  // Extending from another class (not Component)
  `\
    import Document from 'next/document';

    class Foo extends Document {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
  `,
  `\
    class Foo extends React.Component {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
  `,
  `\
    class Foo extends React.PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
  `,
  `\
    const Foo = class extends React.Component {
      render() {
        return <div>{this.props.foo}</div>;
      }
    };
  `,
  `\
    export default class extends React.Component {
      render() {
        return <div>{this.props.foo}</div>;
      }
    };
  `,
  // Does not contain JSX and extends React.Component.
  `\
    class Foo extends React.Component {
      render() {
        return null;
      }
    }
  `,
  // Does not contain JSX and extends Component.
  `\
    import { Component } from 'react';

    class Foo extends Component {
      render() {
        return null;
      }
    }
  `,
  // Does not contain JSX and extends React.Component in an expression context.
  `\
    const Foo = class extends React.Component {
      render() {
        return null;
      }
    };
  `,
  // Does not contain JSX and extends Component in an expression context.
  `\
    import { Component } from 'react';

    const Foo = class extends Component {
      render() {
        return null;
      }
    };
  `,
  // Does not contain JSX and extends Component in an expression context.
  `\
    import { Component } from 'react';

    const Foo = class Bar extends Component {
      render() {
        return null;
      }
    };
  `,
  // Does not contain JSX and extends Component in an default export expression context.
  `\
    import { Component } from 'react';

    export default class extends Component {
      render() {
        return null;
      }
    };
  `,
  // Does not contain JSX and extends Component in an default export expression context.
  `\
    import { Component } from 'react';

    export default class Foo extends Component {
      render() {
        return null;
      }
    };
  `,
];

const componentDidCatch = [
  // Extends from Component and uses componentDidCatch
  `\
    class Foo extends React.Component {
      componentDidCatch(error, errorInfo) {
        logErrorToMyService(error, errorInfo);
      }
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
  `,
  // Extends from Component and uses componentDidCatch
  `\
    class Foo extends React.PureComponent {
      componentDidCatch(error, errorInfo) {
        logErrorToMyService(error, errorInfo);
      }
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
  `,
  // Extends from Component in an expression context.
  `\
    const Foo = class extends React.Component {
      componentDidCatch(error, errorInfo) {
        logErrorToMyService(error, errorInfo);
      }
      render() {
        return <div>{this.props.foo}</div>;
      }
    };
  `,
];

const jsxUtilityClass = [
  `\
    class Foo {
      getBar() {
        return <Bar />;
      }
    };
  `,
];

ruleTester.run("prefer-function-component", rule, {
  valid: [
    ...validForAllOptions.flatMap((code) => [
      { code },
      { code, options: [{ [ALLOW_JSX_UTILITY_CLASS]: true }] },
      { code, options: [{ [ALLOW_COMPONENT_DID_CATCH]: false }] },
      {
        code,
        options: [
          {
            [ALLOW_JSX_UTILITY_CLASS]: true,
            [ALLOW_COMPONENT_DID_CATCH]: false,
          },
        ],
      },
    ]),
    ...componentDidCatch.flatMap((code) => [
      { code },
      { code, options: [{ [ALLOW_JSX_UTILITY_CLASS]: true }] },
    ]),
    ...jsxUtilityClass.flatMap((code) => [
      { code, options: [{ [ALLOW_JSX_UTILITY_CLASS]: true }] },
    ]),
  ],

  invalid: [
    ...invalidForAllOptions.flatMap((code) => [
      { code, errors: [{ messageId: COMPONENT_SHOULD_BE_FUNCTION }] },
      {
        code,
        errors: [{ messageId: COMPONENT_SHOULD_BE_FUNCTION }],
        options: [{ [ALLOW_JSX_UTILITY_CLASS]: true }],
      },
      {
        code,
        errors: [{ messageId: COMPONENT_SHOULD_BE_FUNCTION }],
        options: [{ [ALLOW_COMPONENT_DID_CATCH]: false }],
      },
      {
        code,
        errors: [{ messageId: COMPONENT_SHOULD_BE_FUNCTION }],
        options: [
          {
            [ALLOW_JSX_UTILITY_CLASS]: true,
            [ALLOW_COMPONENT_DID_CATCH]: false,
          },
        ],
      },
    ]),
    ...componentDidCatch.map((code) => ({
      code,
      options: [
        {
          [ALLOW_COMPONENT_DID_CATCH]: false,
        },
      ],
      errors: [
        {
          messageId: COMPONENT_SHOULD_BE_FUNCTION,
        },
      ],
    })),
    ...jsxUtilityClass.flatMap((code) => [
      { code, errors: [{ messageId: COMPONENT_SHOULD_BE_FUNCTION }] },
      {
        code,
        errors: [{ messageId: COMPONENT_SHOULD_BE_FUNCTION }],
        options: [{ [ALLOW_COMPONENT_DID_CATCH]: false }],
      },
    ]),
  ],
});
