/**
 * @fileoverview Enforce components are written as function components
 */

// TODO: improve typing
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */

import type { Rule } from "eslint";
// Using eslint-plugin-react internals for upstream consideration
// https://github.com/yannickcr/eslint-plugin-react/issues/2860#issuecomment-819784530
import Components from "eslint-plugin-react/lib/util/Components";
import {
  getComponentProperties,
  getPropertyName,
} from "eslint-plugin-react/lib/util/ast";

export const COMPONENT_SHOULD_BE_FUNCTION = "componentShouldBeFunction";
export const ALLOW_COMPONENT_DID_CATCH = "allowComponentDidCatch";
const COMPONENT_DID_CATCH = "componentDidCatch";
// https://eslint.org/docs/developer-guide/working-with-rules
const PROGRAM_EXIT = "Program:exit";

// https://eslint.org/docs/developer-guide/working-with-rules
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Enforce components are written as function components",
      category: "Stylistic Issues",
      recommended: false,
      suggestion: false,
      url:
        "https://github.com/tatethurston/eslint-plugin-react-prefer-function-component#rule-details",
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

  create: Components.detect((context: any, components: any, utils: any) => {
    const allowComponentDidCatch =
      context.options[0]?.allowComponentDidCatch ?? true;

    function shouldPreferFunction(node: any): boolean {
      if (!allowComponentDidCatch) {
        return true;
      }

      const properties = getComponentProperties(node).map(getPropertyName);
      return !properties.includes(COMPONENT_DID_CATCH);
    }

    const detect = (guard: (node: any) => boolean) => (node: any) => {
      if (guard(node) && shouldPreferFunction(node)) {
        components.set(node, {
          [COMPONENT_SHOULD_BE_FUNCTION]: true,
        });
      }
    };

    return {
      ObjectExpression: detect(utils.isES5Component),
      ClassDeclaration: detect(utils.isES6Component),
      ClassExpression: detect(utils.isES6Component),

      [PROGRAM_EXIT]() {
        const list = components.list();
        Object.values(list).forEach((component: any) => {
          if (component[COMPONENT_SHOULD_BE_FUNCTION]) {
            context.report({
              node: component.node,
              messageId: COMPONENT_SHOULD_BE_FUNCTION,
            });
          }
        });
      },
    };
  }),
};

export default rule;
