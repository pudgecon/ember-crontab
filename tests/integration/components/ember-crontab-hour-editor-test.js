import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-crontab-hour-editor', 'Integration | Component | ember crontab hour editor', {
  integration: true
});

test('it renders', function(assert) {
  this.set('value', '*');
  this.render(hbs`{{ember-crontab-hour-editor value=value}}`);

  assert.equal(this.$('input[type=radio]').length, 4);
});
