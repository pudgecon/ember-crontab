import PeriodEditor from './ember-crontab-period-editor';

export default PeriodEditor.extend({
  unit: '天',
  minimum: 1,
  maximum: 31
});
