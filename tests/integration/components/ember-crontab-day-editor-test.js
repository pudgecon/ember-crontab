import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-crontab-day-editor', 'Integration | Component | ember crontab day editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-crontab-day-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-crontab-day-editor}}
      template block text
    {{/ember-crontab-day-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
