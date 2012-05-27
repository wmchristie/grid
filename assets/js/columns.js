(function (app, $, _, undefined) {

    app.GridColumns = function (defs, paddingSize) {

        var widthInfos = this._widthInfos = [],
            widthInfo;
            position = 0,
            previous = 0;

        _.each(defs, function (def, i) {

            widthInfo = widthInfos[i] = {
                index : i,
                td : def.pixelWidth + paddingSize,
                data : def.pixelWidth,
                auto : def.autoWidth,
                left : (position = position + previous),
                right : position + def.pixelWidth + paddingSize,
                def : def
            };

            previous = widthInfo.td;

        });

        this._populateTree();

        this._currentWidthInfo = widthInfos[0];

    };

    app.GridColumns.prototype = {

        _widthInfoIndex : 0,
        _lessThanIndex : 1,
        _greaterThanIndex : 2,

        _findWidthInfo : function (pixel) {

            var widthInfoIndex = this._widthInfoIndex,
                lessThanIndex = this._lessThanIndex,
                greaterThanIndex = this._greaterThanIndex,
                
                item = this._tree;

            while (true) {

                widthInfo = item[widthInfoIndex];

                if (widthInfo.left <= pixel && widthInfo.right >= pixel) {
                    return widthInfo;
                }
                
                item = pixel < widthInfo.left ? item[lessThanIndex] : item[greaterThanIndex];

                if (item.length === 0) {
                    return pixel < 0 ? _.first(this._widthInfos[0]) : _.last(this._widthInfos);
                }

            }

        },

        _populateTree : function () {

            var widthInfos = this._widthInfos,
                tree = this._tree = [],

                widthInfoIndex = this._widthInfoIndex,
                lessThanIndex = this._lessThanIndex,
                greaterThanIndex = this._greaterThanIndex;
                
            function segment(item, min, max) {

                var center;

                if (min > max) {
                    return;
                }


                if (min < max) {

                    center = Math.ceil((min + max) / 2);
                    item[widthInfoIndex] = widthInfos[center];
                    segment((item[lessThanIndex] = []), min, center - 1);
                    segment((item[greaterThanIndex] = []), center + 1, max);

                } else {

                    item[widthInfoIndex] = widthInfos[min];
                    item[lessThanIndex] = [];
                    item[greaterThanIndex] = [];

                }

            }

            segment(tree, 0, this._widthInfos.length);

        },

        getCount : function (width, left) {

            var widthInfos = this._widthInfos,
                max = widthInfos.length,
                current = this._currentWidthInfo,
                i = current.index,
                count = 0;

            width += left - current.left;

            while (i < max && width > 0) {

                count++
                width -= widthInfos[i++].td;

            }

            return count;

        },

        getCurrent : function () {
            return this._currentWidthInfo;
        },

        getWidthInfos : function () {
            return this._widthInfos;
        },

        setCssRules : function (rules) {

            _.each(this._widthInfos, function (widthInfo, i) {
                widthInfo.rule = rules[i];
            });

        },

        setCurrent : function (pixel) {

            var current = this._currentWidthInfo,
                changed = current.left > pixel || current.right < pixel;

            if (changed) {
                this._currentWidthInfo = this._findWidthInfo(pixel);
            }

            return changed;

        }

    };



}(window.app || (window.app = {}), jQuery, _))
