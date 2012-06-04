/*global module test ok app */
$(function () {
    'use strict';

    module('gridCss');
    
    test('should create a width rule for each column', function () {

        var gridId = 'grid0',
            css,
            infos;

        infos = [
            { width : 100, align : 'left' },
            { width : 42, align : 'right' }
        ];
            
        css = app.gridCss(gridId, {
            getWidthInfos : function () {
                return  infos;
            }
        });

        _.each(infos, function (info, i) {
            var width = css.rules[i].style.width;
            ok(width === info.width + 'px', 'expected ' + info.width + 'px but was ' + width);
        });
    });



});
