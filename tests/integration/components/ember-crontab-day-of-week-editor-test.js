import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-crontab-day-of-week-editor', 'Integration | Component | ember crontab day of week editor', {
  integration: true
});

test('it renders', function(assert) {
  this.set('value', '*');
  this.render(hbs`{{ember-crontab-day-of-week-editor value=value periodType="dayOfWeek"}}`);

  assert.equal(this.$('input[type=radio]').length, 7);
});
