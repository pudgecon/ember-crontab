import PeriodEditor from './ember-crontab-period-editor';

export default PeriodEditor.extend({
  unit: '周',
  minimum: 1,
  maximum: 7
});
