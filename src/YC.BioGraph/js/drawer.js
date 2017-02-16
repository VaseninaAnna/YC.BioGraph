var draw = function (height) {
        return function (width) {
          return function (edges) {
            return function (n) {
                    var v = edges;
                    var g = new Graph();
                    var i = 0;
                    while (i < v.length) {
                        if (v[i][3]) g.addEdge(v[i][0], v[i][1], { stroke: "#ADFF2F", fill: "#ADFF2F", label: v[i][2], directed: true});
                        if (!v[i][3]) g.addEdge(v[i][0], v[i][1], { stroke: "#A9A9A9", fill: "#A9A9A9", label: v[i][2] });
                        i = i + 1;
                    }

                    var layouter = new Graph.Layout.Spring(g);
                    layouter.layout();

                    var renderer = new Graph.Renderer.Raphael('canvas', g, height, width);
                    renderer.draw();
            };
        };
    };
};
