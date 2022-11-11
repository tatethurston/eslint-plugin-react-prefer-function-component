/**
 * @fileoverview Enforce components are written as function components
 */

import type { Rule } from "eslint";

export const COMPONENT_SHOULD_BE_FUNCTION = "componentShouldBeFunction";
export const ALLOW_COMPONENT_DID_CATCH = "allowComponentDidCatch";
export const ALLOW_JSX_UTILITY_CLASS = "allowJsxUtilityClass";
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
          [ALLOW_JSX_UTILITY_CLASS]: {
            default: false,
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
    const allowJsxUtilityClass =
      context.options[0]?.allowJsxUtilityClass ?? false;

    function shouldPreferFunction(node: Node): boolean {
      const properties = node.body.body;
      const hasComponentDidCatch =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        properties.find(
          (property: Node) => property.key?.name === "componentDidCatch"
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

    function detectJsxInClass(node: Node): void {
      if (!allowJsxUtilityClass) {
        detect(node);
      }
    }

    return {
      "ClassDeclaration:has(JSXElement)": detectJsxInClass,
      "ClassDeclaration:has(JSXFragment)": detectJsxInClass,
      "ClassExpression:has(JSXElement)": detectJsxInClass,
      "ClassExpression:has(JSXFragment)": detectJsxInClass,
      "ClassDeclaration:has(JSXElement):has(MethodDefinition[key.name='render'])":
        detect,
      "ClassDeclaration:has(JSXFragment):has(MethodDefinition[key.name='render'])":
        detect,
      "ClassExpression:has(JSXElement):has(MethodDefinition[key.name='render'])":
        detect,
      "ClassExpression:has(JSXFragment):has(MethodDefinition[key.name='render'])":
        detect,
      "ClassDeclaration[superClass.object.name='React'][superClass.property.name='Component']":
        detect,
      "ClassDeclaration[superClass.object.name='React'][superClass.property.name='PureComponent']":
        detect,
      "ClassDeclaration[superClass.name='Component']": detect,
      "ClassDeclaration[superClass.name='PureComponent']": detect,
      "ClassExpression[superClass.object.name='React'][superClass.property.name='Component']":
        detect,
      "ClassExpression[superClass.object.name='React'][superClass.property.name='PureComponent']":
        detect,
      "ClassExpression[superClass.name='Component']": detect,
      "ClassExpression[superClass.name='PureComponent']": detect,
      [PROGRAM_EXIT]() {
        components.forEach((node) => {
          // report on just the class identifier
          if (node.id) {
            // for ClassDeclaration
            node = node.id;
          } else if (node.parent.type == VARIABLE_DECLARATOR) {
            //for ClassExpression
            node = node.parent.id;
          }

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
