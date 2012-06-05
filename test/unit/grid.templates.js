/*global module test ok app */
$(function () {
    'use strict';

    module('grid.templates');

    var grid;

    test('should define the default templates', function () {

        var t = app.ui.grid.templates;

        ok(t.value instanceof Function);
        ok(t.anchor instanceof Function);
        ok(t.rowLabel instanceof Function);
        ok(t.twisty instanceof Function);
        ok(t.blank instanceof Function);
        ok(t.head instanceof Function);
        ok(t.headGroup instanceof Function);
        ok(t.css instanceof Function);
        
    });


});
