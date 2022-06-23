/**
 * @fileoverview Enforce components are written as function components
 */

import type { Rule } from "eslint";

export const COMPONENT_SHOULD_BE_FUNCTION = "componentShouldBeFunction";
export const ALLOW_COMPONENT_DID_CATCH = "allowComponentDidCatch";
const COMPONENT_DID_CATCH = "componentDidCatch";
// https://eslint.org/docs/developer-guide/working-with-rules
const PROGRAM_EXIT = "Program:exit";
const VARIABLE_DECLARATOR = "VariableDeclarator";

// TODO: Type definitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Node = any;

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment */

// https://eslint.org/docs/developer-guide/working-with-rules
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Enforce components are written as function components",
      category: "Stylistic Issues",
      recommended: false,
      suggestion: false,
      url: "https://github.com/tatethurston/eslint-plugin-react-prefer-function-component#rule-details",
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

    function shouldPreferFunction(node: Node): boolean {
      const properties = node.body.body;
      const hasComponentDidCatch =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        properties.find(
          (property: Node) => property.key?.name === COMPONENT_DID_CATCH
        ) !== undefined;

      if (hasComponentDidCatch && allowComponentDidCatch) {
        return false;
      }
      return true;
    }

    const components = new Set<Node>();

    function detect(node: Node): void {
      if (shouldPreferFunction(node)) {
        components.add(node);
      }
    }

    return {
      "ClassDeclaration:has(JSXElement)": detect,
      "ClassDeclaration:has(JSXFragment)": detect,
      "ClassDeclaration[superClass.object.name='React'][superClass.property.name='Component']":
        detect,
      "ClassDeclaration[superClass.name='Component']": detect,
      "ClassExpression:has(JSXElement)": detect,
      "ClassExpression:has(JSXFragment)": detect,
      "ClassExpression[superClass.object.name='React'][superClass.property.name='Component']":
        detect,
      "ClassExpression[superClass.name='Component']": detect,
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
