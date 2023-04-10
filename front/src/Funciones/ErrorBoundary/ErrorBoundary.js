import React from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      } else {
        return (
          <section className="errorBoundary">
            <img src="/logo192.png" alt="imagen logo" />
            <h1>Lo siento ocurrió un error, prueba más tarde.</h1>
          </section>
        );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
