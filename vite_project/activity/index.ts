import { isActivityEnabled } from './activity.guard';

type Level = 'info' | 'warn' | 'error';

/*
Contact widget activity phases:

- bootstrap
- config
- form-ready
- turnstile-ready
- submit-click
- validation-failed
- submission-start
- submission-success
- submission-failed
*/
export function activity(
    phase: string,
    message: string,
    data?: unknown,
    level: Level = 'info'
) {
    if (!isActivityEnabled()) return;

    const payload = {
        widget: 'booking',
        phase,
        message,
        data,
        ts: Date.now(),
    };

    const prefix = `[RE:contact] [${phase}]`;

    if (level === 'error') {
        console.error(prefix, payload);
    } else if (level === 'warn') {
        console.warn(prefix, payload);
    } else {
        console.log(prefix, payload);
    }
}
