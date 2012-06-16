/*global module test ok app */
$(function () {
    'use strict';

    module('grid');

    var grid;

    function container() {
        return $('#qunit-fixture');
    }

    function createGrid() {

        grid = new app.ui.Grid({
            element : container()
        });

    }

    test('should create a table element as the child of the container', function () {

        createGrid();

        ok(container().children().length === 1, 'the container should only contain a single child');
        ok(container().children('table').length === 1, 'the child of the container should be a table');

        grid.destroy();
        
    });

    test('destroy should remove the contents of the container', function () {

        createGrid();
        grid.destroy();
        
    });

    test('should have a setDefinition function', function () {

        createGrid();
        
        ok(grid.setDefinition instanceof Function);

        grid.destroy();
    });

    test('should have a setData function', function () {
        
        createGrid();
        
        ok(grid.setData instanceof Function);

        grid.destroy();

    });

});
