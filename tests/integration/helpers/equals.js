import { equals } from 'my-app/helpers/equals';
import { module, test } from 'ember-qunit';

module('Unit | Helper | equals');

test('param1 equals param2', function(assert) {
  assert.ok(equals("2001", "2001"));
});
