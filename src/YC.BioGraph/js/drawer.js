var draw = function(height, width, edges, n) {
    var v = edges;
    var g = new Graph();
    var i = 0;
	while (i<n)
	{
	  if (v[i][2]) g.addEdge (v[i][0], v[i][1], { stroke : "#bfa" , fill : "#56f", label : v[i][3] });
	  if (!v[i][2]) g.addEdge (v[i][0], v[i][1], { label : v[i][3] });
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

var fullscreen_draw = function() {
    var height = window.outerHeight - 180;
    var width = window.outerWidth - 30;
    var v = [["One", "Two", 1, "U"], ["Two", "Three", 0, "T"], ["Two", "Four", 1, "T"], ["Four", "Three", 0, "E"]];
    n = 4;
    draw(height, width, v, n);
}