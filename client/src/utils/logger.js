import * as Sentry from '@sentry/browser';

function logger(...args) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(...args);
  } else {
    Sentry.withScope(scope => {
      const [errorMsg, ...error] = args;
      scope.setExtras(errorMsg);
      Sentry.captureException(new Error(error));
    });
  }
}

export default logger;
