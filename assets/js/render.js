(function (app, $, _, undefined) {
    'use strict';

    // todo : rename to createRenderer() and place in the correct namespace
    app.gridRender = function (dom, columns, bodyMarkupBuilder, headMarkupBuilder) {

        var portalWidth,
            portalHeight,

            bodyTable = dom.bodyTable(),
            thead = dom.thead(),

            rowHeight = bodyMarkupBuilder.rowHeight(),
            rowRange,
            colStart,
            colCount,

            columnInfo,

            headMarkup,
            bodyMarkup;

        // we rely on the scrollSizer being set to the correct size which limits the scrollbars so that the
        // 'top' and 'left' parameters never cause an attempt to retrieve a column or row that is outside the 
        // available range. Thus, there are no guard clauses to insure valid results from columns.at() and 
        // bodyMarkupBuilder.getRange().
        function show(top, left) {

            //var start = new Date();

            columnInfo = columns.at(left);

            bodyTable.style.left = columnInfo.left + 'px';
            bodyTable.style.top = top - (top % rowHeight) + 'px';

            rowRange = bodyMarkupBuilder.getRange(top, portalHeight);

            colStart = columnInfo.index;
            colCount = columns.count(left, portalWidth);

            bodyMarkup = bodyMarkupBuilder.markup(rowRange.start, rowRange.count, colStart, colCount);
            headMarkup = headMarkupBuilder.col(colStart, colCount);

            //markupTime = new Date().getTime() - start.getTime();

            //start = new Date();

            thead = dom.writeHead(headMarkup);

            // the thead is replaced when it is written so we have to write it before we can set its new style.left (thank you IE);
            thead.style.left = columnInfo.left - left + 'px';

            dom.writeBody(bodyMarkup);

            //insertTime = new Date().getTime() - start.getTime();

            //console.log(markupTime, ' ', insertTime, ' ', markupTime + insertTime);

        }

        function setPortalDimensions() {
            portalWidth = $(dom.portal()).width();
            portalHeight = $(dom.portal()).height();
        }

        $(bodyTable).delegate('tr', 'mouseover.gridRender', function (e) {
            $(this).addClass('active');
        }).delegate('tr', 'mouseout.gridRender', function (e) {
            $(this).removeClass('active');
        });

        $(dom.portal()).bind('scroll.gridRender', function () {
            show(this.scrollTop, this.scrollLeft);
        });

        $(window).bind('resize.gridRender', function () {

            var scrollSizer = dom.scrollSizer();

            setPortalDimensions();
            show(scrollSizer.scrollTop(), scrollSizer.scrollLeft());

        });

        setPortalDimensions();

        return {

            destroy : function () {
                $(dom.portal()).unbind('scroll.render');
                $(window).unbind('resize.gridRender');
            },

            setColumns : function (theColumns) {
                columns = theColumns;
            },

            setRows : function (theRows) {
                bodyMarkupBuilder = theRows;
            },

            show : function () {
                var scrollSizer = dom.scrollSizer();
                show(scrollSizer.scrollTop(), scrollSizer.scrollLeft());
            }

        };
        
    };

}(window.app || (window.app = {}), jQuery, _));
