import * as Sentry from '@sentry/browser';

export function log(...args) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

export function logError(error, extraInfo) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`%c[${extraInfo}]`, 'color: red; font-weight: bold;', error);
  } else {
    Sentry.withScope(scope => {
      if (extraInfo) {
        scope.setExtras(extraInfo);
      }
      Sentry.captureException(new Error(JSON.stringify(error)));
    });
  }
}
