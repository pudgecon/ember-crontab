import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-crontab-week-editor', 'Integration | Component | ember crontab week editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-crontab-week-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-crontab-week-editor}}
      template block text
    {{/ember-crontab-week-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
