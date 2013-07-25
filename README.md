Backbone.fetch_
===============

enhance Backbone.fetch with async utilities

### fetch_with
  you can fetch parallelly with other model or collection

### fetch_sync
  asure model/collection has been fetched, then run the callback

### fetch_auto
  you can design the fetch order of collection/model as you want. in the end, the caller (a model too) will be fetch.

````
var Me, Ta, me, ta, wo, wo2, you;

Me = Backbone.Model.extend({
  aaa: 'bbb'
});

Ta = Backbone.Collection;

me = new Me;

ta = new Ta;

wo = new Me;

wo2 = new Ta;

you = new Me;

wo.url = 'http://fixture.ap01.aws.af.cm/template?value=lorem&url=IMAGE|600x400/cde/fff&id=1';

wo2.url = 'http://fixture.ap01.aws.af.cm/template?value=lorem&url=IMAGE|600x400/cde/fff&id=21...40&__=4';

you.url = 'http://fixture.ap01.aws.af.cm/template?value=lorem&url=IMAGE|600x400/cde/fff&id=2';

ta.url = 'http://fixture.ap01.aws.af.cm/template?value=lorem&url=IMAGE|600x400/cde/fff&id=4...20&__=4';

me.url = 'http://fixture.ap01.aws.af.cm/template?value=lorem&url=IMAGE|600x400/cde/fff&id=3';

ta.fetch_with(me, function(models) {
  return console.log(models);
});

me.fetch_sync(function(model) {
  return console.log(model.toJSON());
});

you.on('change', function() {
  return console.log('you');
});

me.on('change', function() {
  return console.log('me');
});

ta.on('sync', function() {
  return console.log('ta');
});

wo.on('change', function() {
  return console.log('wo');
});

wo2.on('sync', function() {
  return console.log('wo2');
});

you.fetch_auto({
  first: me,
  second: ta,
  third: ['first', wo],
  forth: ['third', wo2]
});

````