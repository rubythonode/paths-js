(function() {
  define([], function() {
    var build_tree, collect, max_by, set_height, tree_height;
    max_by = function(items, f) {
      if (items == null) {
        items = [];
      }
      return items.reduce((function(m, i) {
        return Math.max(m, f(i));
      }), 0);
    };
    tree_height = function(root) {
      return 1 + max_by(root.children, tree_height);
    };
    build_tree = function(data, children, level) {
      var cs, result;
      if (level == null) {
        level = 0;
      }
      result = {
        item: data,
        level: level
      };
      cs = children(data);
      if (cs && cs.length) {
        result.children = cs.map(function(c) {
          return build_tree(c, children, level + 1);
        });
      }
      return result;
    };
    set_height = function(root, level, max_heights) {
      var child, _i, _len, _ref;
      if (max_heights == null) {
        max_heights = [];
      }
      if (level == null) {
        level = 0;
      }
      if (max_heights[level] != null) {
        root.height = max_heights[level] + 1;
        max_heights[level] += 1;
      } else {
        max_heights[level] = 0;
        root.height = 0;
      }
      _ref = root.children || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        set_height(child, level + 1, max_heights);
      }
      return max_heights;
    };
    collect = function(root, f) {
      var child, result, _i, _len, _ref;
      result = [];
      _ref = root.children || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        result.push(f(root, child));
        result = result.concat(collect(child, f));
      }
      return result;
    };
    return {
      tree_height: tree_height,
      build_tree: build_tree,
      set_height: set_height,
      collect: collect
    };
  });

}).call(this);
