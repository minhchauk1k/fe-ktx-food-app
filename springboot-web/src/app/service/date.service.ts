import { Injectable } from "@angular/core";
import * as moment from 'moment'

@Injectable({
    providedIn: 'root'
})
export class DateService {

    constructor() { }

    public getMinuteFromNow(date: Date) {
        const now = moment();
        const minMoment = moment(date);

        // get the difference between the moments
        const diff = now.diff(minMoment);

        // express as a duration
        const diffDuration = moment.duration(diff);

        // display
        return diffDuration.minutes();
    }

    public format(date: Date) {
        return moment(date).format('DD/MM/YYYY');
    }

    public formatToSv(date: Date) {
        return moment(date).format('DD-MM-YYYY');
    }

    public formatCustom(date: Date, format: string) {
        return moment(date).format(format);
    }

    public formatHours(date: Date) {
        return moment(date).format('DD/MM/YYYY HH:mm');
    }

    public formatSecs(date: Date) {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }

    // public subtractDates(date1, date2) {
    //     return moment.subtract(date1, date2).milliseconds();
    // }
}
