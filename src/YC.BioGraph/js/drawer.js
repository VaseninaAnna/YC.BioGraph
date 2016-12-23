var draw = function(height, width, edges, n) {
    var v = edges;
    var g = new Graph();
    var i = 0;
	while (i<v.length)
	{
	  if (v[i][3]) g.addEdge (v[i][0], v[i][1], { stroke : "#bfa" , fill : "#56f", label : v[i][2] });
	  if (!v[i][3]) g.addEdge (v[i][0], v[i][1], { label : v[i][2] });
	  i = i+1;
	}

    var layouter = new Graph.Layout.Spring(g);
    layouter.layout();

    var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);
    renderer.draw();

    redraw = function() {
        layouter.layout();
        renderer.draw();
    };
    fullscreen_draw = redraw;
};

var fullscreen_draw = function(g) {
        return function(c) {
        var height = window.outerHeight - 180;
        var width = window.outerWidth - 30;
        draw(height, width, g, c);
    }
}