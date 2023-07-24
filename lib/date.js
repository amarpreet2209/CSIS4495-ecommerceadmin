/*
export default function prettyDate(dateStr) {
    return ().toLocaleString('en-CA');
}
*/


import {format} from "date-fns-tz";

export default function prettyDate(dateStr) {
    const vancouverTimezone = 'America/Vancouver';
    return format(new Date(dateStr), 'MM/dd/yyyy, h:mm:ss a', {timeZone: vancouverTimezone});
}
