(function (app, $, _, undefined) {
    'use strict';

    var grid = app.ui.grid,
    
        // tree item index constants
        columnInfoIndex = 0,
        lessThanIndex = 1,
        greaterThanIndex = 2;

    grid.Columns = function (definitions, paddingSize) {

        var columnInfos,
            position = 0,
            previous = 0;

        columnInfos = this._columnInfos = _.map(definitions, function (definition, i) {

            return {
                index : i,
                align : definition.align,
                left : (position = position + previous), // must preceed the tdWidth property to insure correct 'previous' value
                right : position + definition.pixelWidth + paddingSize, // must follow the left property to insure correct 'position' value
                dataWidth : definition.pixelWidth,
                autoWidth : definition.autoWidth,
                tdWidth : (previous = definition.pixelWidth + paddingSize), 
                definition : definition
            };

        });

        this._populateTree();

        // the first column always starts off as current
        this._current = columnInfos[0];

    };

    grid.Columns.prototype = {

        at : function (pixel) {

            var columnInfo,
                item = this._tree;

            while (true) {

                columnInfo = item[columnInfoIndex];

                if (columnInfo.left <= pixel && columnInfo.right >= pixel) {
                    return columnInfo;
                }
                
                item = pixel < columnInfo.left ? item[lessThanIndex] : item[greaterThanIndex];

                if (!item[columnInfoIndex]) {
                    return null;
                    // not sure how this is going to work yet. if we should return the null then we have to maintain the makeCurrent() method.  If 
                    // we can return the first or last column when pixel is beyond the range, then we can rename 'at()' and set this._current to the returned item.
                    //return pixel < 0 ? _.first(this._columnInfos) : _.last(this._columnInfos);
                }

            }

        },

        // returns the number of columns needed to fill the width starting at pixel
        // width should be the width of the viewing area.
        // makeCurrent() must be called before calling count();
        count : function (pixel, width) {

            var columnInfos = this._columnInfos,
                max = columnInfos.length,
                current = this._current,
                i = current.index,
                count = 0;

            // width needs to encompass the width of the viewing area plus any of the left column that is scrolled out of view to the left.
            width += pixel - current.left;

            while (i < max && width > 0) {

                count++;
                width -= columnInfos[i++].tdWidth;

            }

            return count;

        },

        getInfos : function () {
            return this._columnInfos;
        },

        makeCurrent : function (columnInfo) {
            this._current = columnInfo;
            return this;
        },

        setCssRules : function (rules) {

            _.each(this._columnInfos, function (columnInfo, i) {
                columnInfo.rule = rules[i];
            });

        },

        // creates a binary tree of the columnInfos for rapid lookup by _findColumnInfo
        _populateTree : function () {

            var columnInfos = this._columnInfos,
                tree = this._tree = [];

            function segment(item, min, max) {

                var center;

                if (min > max) {
                    return;
                }


                if (min < max) {

                    center = Math.ceil((min + max) / 2);
                    item[columnInfoIndex] = columnInfos[center];
                    segment((item[lessThanIndex] = []), min, center - 1);
                    segment((item[greaterThanIndex] = []), center + 1, max);

                } else {

                    item[columnInfoIndex] = columnInfos[min];
                    item[lessThanIndex] = [];
                    item[greaterThanIndex] = [];

                }

            }

            segment(tree, 0, this._columnInfos.length);

        }

    };

}(window.app, jQuery, _));
