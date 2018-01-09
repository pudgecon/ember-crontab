import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-crontab-second-editor', 'Integration | Component | ember crontab second editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-crontab-second-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-crontab-second-editor}}
      template block text
    {{/ember-crontab-second-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
