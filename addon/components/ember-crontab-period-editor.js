import EmberObject, { computed, observer } from '@ember/object';
import { alias, equal, or, not } from '@ember/object/computed';
import { once } from "@ember/runloop"
import { isNone } from '@ember/utils';
import { A } from '@ember/array';
import Component from '@ember/component';
import layout from '../templates/components/ember-crontab-period-editor';

const TYPE_ALL = 'all'; // *
const TYPE_UNSPECIFIC = 'unspecific'; // ?
const TYPE_RANGE = 'range'; // 0-4
const TYPE_LIST = 'list'; // 0,4,8
const TYPE_LIST_AND_RANGE = 'list_and_range'; // 0-4,8-12
const TYPE_STEP = 'step'; // */2 or 2/3(from 2, every 3)
const TYPE_RANGE_AND_STEP = 'range_and_step'; // Step values can be used in conjunction with ranges. 0-23/2

export default Component.extend({
  layout,

  minimum: 0,
  maximun: 0,

  cronType: computed('value', {
    get() {
      let value = this.get('value');

      if ('*' === value) {
        return TYPE_ALL;
      }
      if ('?' === value) {
        return TYPE_UNSPECIFIC;
      }
      if (value.match('/')) {
        return value.match('-') ? TYPE_RANGE_AND_STEP : TYPE_STEP;
      }
      if (value.match(',') && value.match('-')) {
        return TYPE_LIST_AND_RANGE;
      }
      if (value.match('-')) {
        return TYPE_RANGE;
      }
      
      return TYPE_LIST;
    },
    set(_, value) {
      return value;
    }
  }),

  isAll: equal('cronType', TYPE_ALL),
  isUnspecific: equal('cronType', TYPE_UNSPECIFIC),
  isList: equal('cronType', TYPE_LIST),
  isRange: equal('cronType', TYPE_RANGE),
  isListAndRange: equal('cronType', TYPE_LIST_AND_RANGE),
  isStep: equal('cronType', TYPE_STEP),
  isRangeAndStep: equal('cronType', TYPE_RANGE_AND_STEP),

  notRange: not('isRange'),
  notStep: not('isStep'),
  notList: not('isList'),

  isDayOfMonth: equal('periodType', 'dayOfMonth'),
  isDayOfWeek: equal('periodType', 'dayOfWeek'),
  isDayOfMonthOrDayOfWeek: or('isDayOfMonth', 'isDayOfWeek'),

  startFrom: computed('value', {
    get() {
      let value = this.get('value');
      if (isNone(value)) {
        return '0';
      }

      if (this.get('isRange')) {
        return value.split('-')[0];
      }
      if (this.get('isStep')) {
        return value.split('/')[0];
      }

      return '0';
    },
    set(key, value) {
      return value;
    }
  }),
  
  endTo: computed('value', {
    get() {
      let value = this.get('value');
      if (isNone(value)) {
        return '0';
      }

      if (this.get('isRange')) {
        return value.split('-')[1];
      }

      return '0';
    },
    set(key, value) {
      return value;
    }
  }),

  step: computed('value', {
    get() {
      let value = this.get('value');
      if (isNone(value)) {
        return null;
      }

      if (this.get('isStep')) {
        return value.split('/')[1];
      }

      return null;
    },
    set(key, value) {
      return value;
    }
  }),

  list: computed('value', {
    get() {
      let value = this.get('value');
      let selected = [];

      if (this.get('isList')) {
        selected = value.split(',');
      }

      return this.get('selectOptions').map(function(o) {
        return EmberObject.create({
          value: o,
          checked: selected.includes(o)
        });
      });
    },
    set(_, value) {
      return value;
    }
  }),

  selectOptions: computed('minimum', 'maximum', function () {
    let options = [];
    for (let i = this.get('minimum'); i <= this.get('maximum'); i++) {
      options.push('' + i);
    }

    return options;
  }),

  startFromOptions: alias('selectOptions'),
  endToOptions: alias('selectOptions'),
  // endToOptions: computed('startFrom', 'minimum', 'maximum', function () {
  //   let options = [];
  //   for (let i = Math.max(this.get('startFrom'), this.get('minimum')); i <= this.get('maximum'); i++) {
  //     options.push(i);
  //   }
  //   return options;
  // }),

  valueChanged: observer('cronType', 'startFrom', 'endTo', 'step', /*'list.@each.checked', */function() {
    once(this, 'refreshValue');
  }),

  refreshValue() {
    if (this.get('isAll')) {
      return this.set('value', '*');
    }
    if (this.get('isRange')) {
      return this.set('value', `${this.get('startFrom')}-${this.get('endTo')}`);
    }
    if (this.get('isStep')) {
      return this.set('value', `${this.get('startFrom')}/${this.get('step')}`);
    }
    if (this.get('isList')) {
      // FIXME Error: filterBy() is not a function...
      // return this.set('value', this.get('list').filterBy('checked', true).mapBy('value').join(','));
      let array = A();
      this.get('list').forEach(function(l) {
        if (!l.get('checked')) {
          return;
        }
        array.push(l.get('value'));
      });
      return this.set('value', array.join(','));
    }
    if (this.get('isUnspecific')) {
      return this.set('value', '?');
    }
    // TODO
  },

  actions: {
    toggleListItem: function(listItem) {
      listItem.toggleProperty('checked');
      this.refreshValue(); // FIXME not fired in observer valueChanged
    }
  }
});
