import { computed, observer } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/ember-crontab';

// FIXME
const YEAR_INDEX = 6;
const DAY_OF_WEEK_INDEX = 5;
const MONTH_INDEX = 4;
const DAY_OF_MONTH_INDEX = 3;
const HOUR_INDEX = 2;
const MINUTE_INDEX = 1;
const SECOND_INDEX = 0;

// Field Name    Allowed Values     Allowed Special Characters
// Seconds        0-59               , - * /
// Minutes        0-59               , - * /
// Hours          0-23               , - * /
// Day-of-month   1-31               , - * ? / L W
// Month          1-12 or JAN-DEC    , - * /
// Day-of-Week    1-7 or SUN-SAT     , - * ? / L #

export default Component.extend({
  layout,
  classNames: ['ember-crontab'],

  cron: '* * * * * ? *',

  periods: computed('cron', function () {
    let periodArray = this.get('cron').split(' ');
    if (periodArray.length < 6) {
      return {};
    }

    return {
      year: periodArray.length === 7 ? periodArray[YEAR_INDEX] : '*',
      dayOfWeek: periodArray[DAY_OF_WEEK_INDEX],
      month: periodArray[MONTH_INDEX],
      dayOfMonth: periodArray[DAY_OF_MONTH_INDEX],
      hour: periodArray[HOUR_INDEX],
      minute: periodArray[MINUTE_INDEX],
      second: periodArray[SECOND_INDEX]
    }
  }),

  year: alias('periods.year'),
  dayOfWeek: alias('periods.dayOfWeek'),
  month: alias('periods.month'),
  dayOfMonth: alias('periods.dayOfMonth'),
  hour: alias('periods.hour'),
  minute: alias('periods.minute'),
  second: alias('periods.second'),

  valueChanged: observer('year', 'dayOfWeek', 'month', 'dayOfMonth', 'hour', 'minute', 'second', function() {
    return this.set('cron', `${this.get('second')} ${this.get('minute')} ${this.get('hour')} ${this.get('dayOfMonth')} ${this.get('month')} ${this.get('dayOfWeek')} ${this.get('year')}`);
  })
});
