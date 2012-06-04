(function (app, $, _, undefined) {
    'use strict';

    // The following styles can be added the the grouping functionality is added via extension:
    //groupLastColumnStyle = 'border-right:1px solid #9da6b2; margin-right:0; padding-right:7px;', 
    //
    
    app.gridCss = function (gridId, columns) {

        var rules,
            cssWriter,
            template = app.gridTemplates.gridCss;

        function createMarkup(cols) {
            return template({
                gridId : gridId,
                columns : cols.getWidthInfos()
            });
        }

        cssWriter = app.cssWriter(createMarkup(columns));

        return {

            id : cssWriter.id,
            rules : cssWriter.rules,

            destroy : function () {
                cssWriter.destroy();
            },

            update : function (columns) {
                cssWriter.update(createMarkup(columns));
                this.rules = cssWriter.rules;
            }
        };
    };

}(window.app || (window.app = {}), jQuery, _));
