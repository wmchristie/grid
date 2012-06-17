/*global module test ok app sinon */
$(function () {
    'use strict';

    module('grid');

    var id = 'qunit-fixture',
        options,
        grid;

    function container() {
        return $('#' + id);
    }

    function createGrid() {

        options = {
            element : container()
        };

        grid = new app.ui.Grid(options);

    }

    function expected(exp, actual) {
        if (actual == null) 
        { 
            return 'expected "' + exp + '".';
        } else {
            return 'expected "' + exp + '" but was "' + actual + '"';
        }
    }

    test('should create the grid structure', function () {

        createGrid();

        ok(container().children('table').length === 1, 'a table should exist as a child of container');
        ok(container().children('.portal').length === 1, 'a ".portal" element should exist as a child of the container');

        grid.destroy();
        
    });

    test('destroy() should call destroy() on the dom', function () {
    
        var destroySpy;

        createGrid();

        destroySpy = sinon.spy(grid._dom, 'destroy');

        grid.destroy();

        ok(destroySpy.calledOnce, 'dom.destroy should be called');
        
    });

    test('should have the id of the container', function () {

        createGrid();

        ok(grid.id === id, expected(id, grid.id));
    });

    test('should export these methods', function () {

        createGrid();
        
        ok(grid.options instanceof Function, expected('options()'));
        ok(grid.data instanceof Function, expected('data()'));

        grid.destroy();

    });

    test('options() should return a shallow copy of the options passed to the constructor', function () {

        createGrid();

        var actual = grid.options();

        ok(actual !== options);
        ok(actual.element === options.element);

        grid.destroy();
        
    });

    test('options() should extend grid._options', function () {

        createGrid();

        grid.options({
            foobar : 'baz'
        });

        ok(grid._options.foobar === 'baz');

        grid.destroy();

    });


});
