import PeriodEditor from './ember-crontab-period-editor';

export default PeriodEditor.extend({
  unit: '年',
  minimum: 2010, // 最低 1970
  maximum: 2199
});
