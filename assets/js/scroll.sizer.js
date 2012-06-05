(function (app, $, _, undefined) {
    'use strict';

    app.GridScrollSizer = function (options) {

        this._element = options.element;
        this._rowHeight = options.rowHeight;

    };

    app.GridScrollSizer.prototype = {

        sizeToColumns : function (widthInfos) {

            // note: we migth need to add 1 
            this._element.css('width', _.last(widthInfos).right);

        },

        sizeToRows : function (rows) {
            this._element.css('height', rows.length * this._rowHeight);
        }

    };

}(window.app || (window.app = {}), jQuery, _));
