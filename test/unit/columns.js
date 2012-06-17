/*global module test ok app sinon */
$(function () {
    'use strict';

    module('columns');

    var id = 'qunit-fixture',
        padding,
        definitions,
        columns;

    function container() {
        return $('#' + id);
    }

    function createColumns(defs, pad) {

        definitions = defs || [
            { align : 'left', autoWidth: 50, pixelWidth : 20 },
            { align : 'right', autoWidth: 150, pixelWidth : 40 },
            { align : 'center', autoWidth: 250, pixelWidth : 60 }
        ];

        padding = pad || 19;

        columns = new app.ui.grid.Columns(definitions, padding);

    }

    test('should foo', function () {

        createColumns();

        ok(false);
    });

});
