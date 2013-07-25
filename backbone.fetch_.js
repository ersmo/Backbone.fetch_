var __slice = [].slice;

(function(Backbone, _) {
  var json;
  json = {
    fetch_auto: function(json) {
      var d, i, k, next_to_fetch, now_to_fetch, v, _i, _j, _len, _len1;
      if (_.isEmpty(json)) return this.fetch();
      for (k in json) {
        v = json[k];
        if (!_.isArray(v)) json[k] = [v];
      }
      now_to_fetch = (function() {
        var _results;
        _results = [];
        for (k in json) {
          v = json[k];
          if (v.length === 1) _results.push(k);
        }
        return _results;
      })();
      for (_i = 0, _len = now_to_fetch.length; _i < _len; _i++) {
        d = now_to_fetch[_i];
        json[d][0].fetch();
      }
      next_to_fetch = _.omit(json, now_to_fetch);
      for (k in next_to_fetch) {
        v = next_to_fetch[k];
        for (_j = 0, _len1 = now_to_fetch.length; _j < _len1; _j++) {
          d = now_to_fetch[_j];
          if ((i = v.indexOf(d)) > -1) v.splice(i, 1);
        }
      }

      return this.fetch_auto(next_to_fetch);
    },    
    fetch_sync: function(callback) {
      var fn, event_name,
        _this = this;

      if (this instanceof Backbone.Model) {
        event_name = 'change';
        if (!this.isNew()) return callback(this);
      }; 
      if (this instanceof Backbone.Collection) {
        if (this._idAttr) return callback(this);
        event_name = 'sync';
      };         
      
      fn = function() {
        return callback(_this);
      };

      if (!event_name) return callback(this);
      this.on(event_name, fn);
      return this.fetch();
    },
    fetch_with: function() {
      var callback, fn, i, length, m, models, _i, _j, _len, _results;
      models = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), callback = arguments[_i++];
      models.unshift(this);
      length = models.length;
      i = 1;
      fn = function() {
        if (i === length) callback(models);
        return i++;
      };
      _results = [];
      for (_j = 0, _len = models.length; _j < _len; _j++) {
        m = models[_j];
        _results.push(m.fetch({
          success: fn
        }));
      }
      return _results;
    }
  };
  _.extend(Backbone.Model.prototype, json);
  _.extend(Backbone.Collection.prototype, json);
})(Backbone, _);
