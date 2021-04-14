/**
 * @fileoverview Enforce components are written as function components
 */

import type { Rule } from "eslint";

// TODO:
// .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
// https://github.com/yannickcr/eslint-plugin-react/blob/master/lib/util/pragma.js
const pragma = "React";
const createClass = "createReactClass";
export const COMPONENT_SHOULD_BE_FUNCTION = "componentShouldBeFunction";
export const ALLOW_COMPONENT_DID_CATCH = "allowComponentDidCatch";
const COMPONENT_DID_CATCH = "componentDidCatch";
// https://eslint.org/docs/developer-guide/working-with-rules
const PROGRAM_EXIT = "Program:exit";

// TODO: Type definitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Node = any;

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment */

function getComponentProperties(node: Node): Node[] {
  switch (node.type) {
    case "ClassDeclaration":
    case "ClassExpression":
      return node.body.body;
    case "ObjectExpression":
      return node.properties;
    default:
      return [];
  }
}

function getPropertyNameNode(node: Node): Node | undefined {
  if (node.key || ["MethodDefinition", "Property"].indexOf(node.type) !== -1) {
    return node.key;
  }
  if (node.type === "MemberExpression") {
    return node.property;
  }
  return undefined;
}

function getPropertyName(node: Node): string {
  const nameNode = getPropertyNameNode(node);
  return nameNode ? nameNode.name : "";
}

// https://eslint.org/docs/developer-guide/working-with-rules
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Enforce components are written as function components",
      category: "Stylistic Issues",
      recommended: false,
      suggestion: false,
      url:
        "https://github.com/tatethurston/eslint-plugin-react/tree/master/docs/rules/prefer-function-component",
    },
    type: "problem",
    messages: {
      [COMPONENT_SHOULD_BE_FUNCTION]:
        "Class component should be written as a function",
    },
    schema: [
      {
        type: "object",
        properties: {
          [ALLOW_COMPONENT_DID_CATCH]: {
            default: true,
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context: Rule.RuleContext) {
    const allowComponentDidCatch =
      context.options[0]?.allowComponentDidCatch ?? true;
    const sourceCode = context.getSourceCode();

    function isES5Component(node: Node): boolean {
      if (!node.parent) {
        return false;
      }

      return new RegExp(`^(${pragma}\\.)?${createClass}$`).test(
        sourceCode.getText(node.parent.callee)
      );
    }

    function isES6Component(node: Node): boolean {
      if (!node.superClass) {
        return false;
      }

      return new RegExp(`^(${pragma}\\.)?(Pure)?Component$`).test(
        sourceCode.getText(node.superClass)
      );
    }

    function shouldPreferFunction(node: Node): boolean {
      if (!allowComponentDidCatch) {
        return true;
      }

      const properties = getComponentProperties(node).map(getPropertyName);
      return !properties.includes(COMPONENT_DID_CATCH);
    }

    const components = new Set<Node>();

    const detect = (guard: (node: Node) => boolean) => (node: Node) => {
      if (guard(node) && shouldPreferFunction(node)) {
        components.add(node);
      }
    };

    return {
      ObjectExpression: detect(isES5Component),
      ClassDeclaration: detect(isES6Component),
      ClassExpression: detect(isES6Component),

      [PROGRAM_EXIT]() {
        components.forEach((node) => {
          context.report({
            node,
            messageId: COMPONENT_SHOULD_BE_FUNCTION,
          });
        });
      },
    };
  },
};

export default rule;
