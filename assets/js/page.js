(function (app, $, _, undefined) {
    'use strict';

    var ui = app.ui;     

    $(function () {

        var markupTime,
            insertTime,

            grid,

            container = document.getElementById('grid_container'),

            columns = app.data.primaryView.columns,
            rows = app.data.records;

        grid = new ui.Grid({
            element : container
        });

        grid.setDefinition(columns);
        grid.setData(rows);

    });

}(window.app, jQuery, _));
