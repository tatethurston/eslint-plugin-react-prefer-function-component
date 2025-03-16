/**
 * @fileoverview Enforce components are written as function components
 */
import type { Rule } from "eslint";
import type { TSESTree } from "@typescript-eslint/types";

export const COMPONENT_SHOULD_BE_FUNCTION = "componentShouldBeFunction";
export const ALLOW_COMPONENT_DID_CATCH = "allowComponentDidCatch";
export const ALLOW_JSX_UTILITY_CLASS = "allowJsxUtilityClass";

type ClassNode = TSESTree.ClassDeclaration | TSESTree.ClassExpression;

type RuleOptions = {
  allowComponentDidCatch?: boolean;
  allowJsxUtilityClass?: boolean;
};

// https://eslint.org/docs/developer-guide/working-with-rules
const rule = {
  meta: {
    docs: {
      description: "Enforce components are written as function components",
      category: "Stylistic Issues",
      recommended: false,
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
    const options: RuleOptions = context.options[0] ?? {};
    const allowComponentDidCatch = options.allowComponentDidCatch ?? true;
    const allowJsxUtilityClass = options.allowJsxUtilityClass ?? false;

    function shouldPreferFunction(node: ClassNode): boolean {
      const properties = node.body.body;
      const hasComponentDidCatch = properties.some((property) => {
        if ("key" in property && "name" in property.key) {
          return property.key.name === "componentDidCatch";
        }
      });

      if (hasComponentDidCatch && allowComponentDidCatch) {
        return false;
      }
      return true;
    }

    const components = new Set<ClassNode>();

    function detect(node: ClassNode): void {
      if (shouldPreferFunction(node)) {
        components.add(node);
      }
    }

    function detectJsxInClass(node: ClassNode): void {
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
      "Program:exit": function () {
        components.forEach((component) => {
          switch (component.type) {
            case "ClassDeclaration":
            case "ClassExpression":
              return context.report({
                node: component.id ?? (component as any),
                messageId: COMPONENT_SHOULD_BE_FUNCTION,
              });
          }
        });
      },
    };
  },
} satisfies Rule.RuleModule;

export default rule;
