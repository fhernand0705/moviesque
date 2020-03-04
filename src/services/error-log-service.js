import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({dsn:
    "https://dd1337564f724061b98e2f208e0acff0@sentry.io/3286225"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
}
