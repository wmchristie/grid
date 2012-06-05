/*global module test ok app */
$(function () {
    'use strict';

    module('gridCss');

    var grid = app.ui.grid,
        gridId = 'grid0',
        css,
        infos;

    function execute() {

        infos = [
            { data : 100, align : 'left', index : 0},
            { data : 42, align : 'right', index : 1 }
        ];

        return grid.css(gridId, {
            getWidthInfos : function () {
                return  infos;
            }
        });

    }

    test('should add the stylesheet to the page and expose the id', function () {

        css = execute();

        ok($('head #' + css.id).length === 1, 'expected stylesheet with id of "' + css.id + '" to exist on the page');

        css.destroy();
    });
            
    test('should remove the stylesheet from the page when destroy is called', function () {

        css = execute();
        css.destroy();

        ok($('#' + css.id).length === 0, 'expected stylesheet with id of "' + css.id + '" to be removed from the page');

    });
            
    test('should create a width rule for each column', function () {

        css = execute();

        _.each(infos, function (info, i) {

            var width = css.rules[i].style.width;

            ok(width === info.data + 'px', 'expected ' + info.data + 'px but was ' + (width || 'an empty string'));

        });

        css.destroy();

    });

    test('should create a text-align rule for each column', function () {

        css = execute();

        _.each(infos, function (info, i) {

            var align = css.rules[i].style.textAlign;

            ok(align === info.align, 'expected ' + info.align + ' but was ' + align);

        });

        css.destroy();

    });

    test('should begin each selector with the gridId', function () {

        css = execute();

        _.each(infos, function (info, i) {

            var rule = css.rules[i]; 

            ok(rule.cssText.indexOf('#' + gridId) === 0, 'expected the selector to start with "#' + gridId + '"');

        });

        css.destroy();

    });

    test('should update the styles with the updated values on the columns', function () {

        css = execute();

        infos[0].data += 10;
        infos[0].data += 20;

        css.update({
            getWidthInfos : function () {
                return  infos;
            }
        });
        
        _.each(infos, function (info, i) {

            var width = css.rules[i].style.width;

            ok(width === info.data + 'px', 'expected ' + info.data + 'px but was ' + (width || 'an empty string'));

        });

        css.destroy();

    });

});
