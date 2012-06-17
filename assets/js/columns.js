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

        // returns the number of columns needed to fill the width starting at left
        count : function (left, width) {

            var columnInfos = this._columnInfos,
                max = columnInfos.length,
                current = this._current,
                i = current.index,
                count = 0;

            // todo: I no longer understand why we need to reference current here.
            width += left - current.left;

            while (i < max && width > 0) {

                count++;
                width -= columnInfos[i++].tdWidth;

            }

            return count;

        },

        getInfoAt : function (left) {

            var current = this._current,
                changed = current.left > left || current.right < left;

            if (changed) {
                this._current = this._findColumnInfo(left);
            }

            return this._current;
        },

        getInfos : function () {
            return this._columnInfos;
        },

        setCssRules : function (rules) {

            _.each(this._columnInfos, function (columnInfo, i) {
                columnInfo.rule = rules[i];
            });

        },

        _findColumnInfo : function (pixel) {

            var columnInfo,
                item = this._tree;

            while (true) {

                columnInfo = item[columnInfoIndex];

                if (columnInfo.left <= pixel && columnInfo.right >= pixel) {
                    return columnInfo;
                }
                
                item = pixel < columnInfo.left ? item[lessThanIndex] : item[greaterThanIndex];

                if (item.length === 0) {
                    return pixel < 0 ? _.first(this._columnInfos[0]) : _.last(this._columnInfos);
                }

            }

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
