import React from 'react';
import { logger } from '../../utils';
import styles from './ErrorBoundary.modules.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logger(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <h2>We&apos;re sorry</h2>
            <h5>Something went very terribly wrong.</h5>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
