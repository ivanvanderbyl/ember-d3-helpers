import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-select-all', 'Integration | Helper | d3-select-all', {
  integration: true
});

test('selects multiple elements', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#d3-graph (pipe
        (d3-select-all "i.a")
        (d3-text "matched")
      )}}
      <i class="a"></i>
      <i class="a b"></i>
      <i class="b c"></i>
    {{/d3-graph}}
  `);

  assert.ok(this.$('i.a:contains(matched)').length);
  assert.ok(this.$('i.a.b:contains(matched)').length);  
  assert.notOk(this.$('i.b.c:contains(matched)').length);
});

test('selection changes when selector is changed', function(assert){

  this.set('selector', '.a');

  // Template block usage:
  this.render(hbs`
    {{#d3-graph (pipe
      (d3-select ".selection-container")
      (d3-select selector)
      (d3-text "matched")
    )}}
      <i class="a"></i>
      <i class="a"></i>
      <i class="b"></i>
      <i class="b"></i>
    {{/d3-graph}}
  `);

  assert.ok(this.$('.a:contains(matched)').length);
  assert.ok(this.$('.a:contains(matched)').length);  
  assert.notOk(this.$('.b:contains(matched)').length);
  assert.notOk(this.$('.b:contains(matched)').length);

  this.set('selector', '.b');

  assert.ok(this.$('.a:contains(matched)').length);
  assert.ok(this.$('.a:contains(matched)').length);
  assert.ok(this.$('.b:contains(matched)').length);
  assert.ok(this.$('.b:contains(matched)').length);  
});