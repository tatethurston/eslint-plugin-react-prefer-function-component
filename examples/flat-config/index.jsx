import React, { Component } from "react";

export class Foo extends Component {
  render() {
    return <div>{this.props.foo}</div>;
  }
}

export const Bar = function (props) {
  return <div>{props.foo}</div>;
};

export function Baz(props) {
  return <div>{props.foo}</div>;
}

export class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    return <div>{this.props.foo}</div>;
  }
}
