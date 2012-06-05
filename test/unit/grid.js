/*global module test ok app */
$(function () {
    'use strict';

    module('grid');

    var grid;

    test('should have a setDefinition function', function () {
        
        grid = new app.ui.Grid({
            element : $('#qunit-fixture')
        });

        ok(grid.setDefinition instanceof Function);

        grid.destroy();
    });

    test('should have a setData function', function () {
        
        grid = new app.ui.Grid({
            element : $('#qunit-fixture')
        });

        ok(grid.setData instanceof Function);

        grid.destroy();

    });

});
