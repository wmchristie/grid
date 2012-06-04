/*global module test ok app */
$(function () {
    'use strict';

    module('gridCss');

    test('should create a width rule for each column', function () {

        var gridId = 'grid0',
            css,
            infos;

        infos = [
            { width : 100, align : 'left', index : 0},
            { width : 42, align : 'right', index : 1 }
        ];
            
        css = app.gridCss(gridId, {
            getWidthInfos : function () {
                return  infos;
            }
        });

        _.each(infos, function (info, i) {

            var rule = css.rules[i], 
                style = rule.style,
                width = style.width,
                align = style.textAlign;

            ok(width === info.width + 'px', 'expected ' + info.width + 'px but was ' + width);
            ok(align === info.align, 'expected ' + info.align + ' but was ' + align);

            ok(rule.cssText.indexOf('#' + gridId) === 0, 'expected the selector to start with "#' + gridId + '"');

        });
    });



});
