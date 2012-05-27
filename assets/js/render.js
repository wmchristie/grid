(function (app, $, _, undefined) {

    app.gridRender = function (dom, columns, rowMarkup, headMarkup) {

        var portalWidth = $(dom.portal()).width(),
            bodyTable = dom.bodyTable(),
            head,

            rowCount,
            colStart,
            colCount,

            widthInfo,

            previousTop = 0,

            list,

            i;

        function show(top, left, force) {

            var start = new Date();

            if (columns.setCurrent(left) || !widthInfo) {

                widthInfo = columns.getCurrent();
                bodyTable.style.left = widthInfo.left + 'px';
                colStart = widthInfo.index;

            }

            colCount = columns.getCount(portalWidth, left);

            list = '';

            for (i = 0, rowCount = 21; i < rowCount; i++) {

                list += '<tr';

                if (i % 2 !== 0) {
                    list += ' class="odd"'; 
                }

                list += '>';

                list += rowMarkup[i].col(colStart, colCount);

                list += '</tr>';

            }

            markupTime = new Date().getTime() - start.getTime();

            start = new Date();

            head = dom.writeHead(headMarkup.col(colStart, colCount));
            head.style.left = widthInfo.left - left + 'px';

            dom.writeBody(list);

            previousLeft = left;
            previousTop = top;

            insertTime = new Date().getTime() - start.getTime();

            console.log(markupTime, ' ', insertTime, ' ', markupTime + insertTime);

        }

        $(dom.portal()).bind('scroll.render', function () {
            show(this.scrollTop, this.scrollLeft);
        });

        return {

            setColumns : function (theColumns) {
                columns = theColumns;
            },

            setRows : function (theRows) {
                rowMarkup = theRows;
            },

            show : function () {
                var scrollSizer = dom.scrollSizer();
                show(scrollSizer.scrollTop(), scrollSizer.scrollLeft(), true);
            }

        };
        
    };

}(window.app || (window.app = {}), jQuery, _))
