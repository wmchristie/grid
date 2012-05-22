(function (app, $, _, undefined) {

    var show = function (dom, rows, colStart) {

        var start = new Date();

        var list = '';

        var rowCount = 21;
        var colCount = 5;

        for (var i = 0; i < rowCount; i++) {

            list += '<tr';

            if (i % 2 !== 0) {
                list += ' class="odd"'; 
            }

            list += '>';

            list += rows[i].col(colStart, colCount);

            list += '</tr>';

        }

        markupTime = new Date().getTime() - start.getTime();

        start = new Date();

        dom.writeBody(list);

        insertTime = new Date().getTime() - start.getTime();

        console.log(markupTime, ' ', insertTime, ' ', markupTime + insertTime);

    };


    $(function () {

        var markupTime,
            insertTime,

            factory = new app.RowFactory(),
            rows = factory.create(app.data.records),
            dom = app.gridDom(document.getElementById('grid_container')),

            colStart = 0;

        show(dom, rows, colStart++);

        $('#by_cell').on('click', function () {
            show(dom, rows, colStart++);
        });

    });

}(window.app || (window.app = {}), jQuery, _))
