/*global module test ok app sinon equal */
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

    test('getInfos() should return a columnInfo for each column definition', function () {

        var infos;

        createColumns();

        infos = columns.getInfos();

        equal(definitions.length, infos.length);

        _.each(definitions, function (definition, i) {
            equal(infos[i].definition, definition);
        });

    });

    test('the columnInfo for a column should contain', function () {

        var info,
            def;

        createColumns();


        info = columns.getInfos()[1];
        def = definitions[1];

        equal(info.definition, def);
        equal(info.align, def.align);
        equal(info.index, 1);
        equal(info.dataWidth, def.pixelWidth);
        equal(info.tdWidth, def.pixelWidth + padding);
        equal(info.autoWidth, def.autoWidth);
        equal(info.left, 39); // previous accumulated tdWidth

        // todo : we may need to subract 1 from left + tdWidth. I really don't know how, or if, the "right" property will be used, yet.
        //        we may be able to remove it altogether. :)
        equal(info.right, 98); // left + tdWidth

    });

    test('getInfoAt() should return the column that contains the pixel position', function () {

        createColumns();

        equal(columns.getInfoAt(0).definition, definitions[0]);
        equal(columns.getInfoAt(20).definition, definitions[0]);
        equal(columns.getInfoAt(38).definition, definitions[0]);
        equal(columns.getInfoAt(39).definition, definitions[1]);
        equal(columns.getInfoAt(50).definition, definitions[1]);
        equal(columns.getInfoAt(97).definition, definitions[1]);
        equal(columns.getInfoAt(98).definition, definitions[2]);
        equal(columns.getInfoAt(120).definition, definitions[2]);
        equal(columns.getInfoAt(177).definition, definitions[2]);
        equal(columns.getInfoAt(178), null);
        equal(columns.getInfoAt(500), null);
        equal(columns.getInfoAt(-10), null);

    });

});
