(function (app, $, _, undefined) {

    app.gridDom = function (container) {

        var headTable,
            bodyTable,
            sizer,
            portal,
            template = _.template('<table><<%= item.tag %>><%= item.markup %></<%= item.tag %>></table>'),
            write;

        container.innerHTML = 
            '<div class="portal">' +
                '<table><thead></thead></table>' +
                '<div class="scroll-sizer">' +
                    '<table><tbody></tbody></table>' +
                </div>' +
            '</div>';

        headTable = container.getElementsByTagName('table')[0];
        bodyTable = container.getElementsByTagName('table')[1];

        portal = $(container).children();
        sizer = portal.find('.scoll-sizer');

        function write (table, markup, tag) {

            var temp = document.createElement('div');

            temp.innerHTML = template({
                markup : markup, 
                tag : tag
            });

            table.replaceChild(
                temp.childNodes[0].childNodes[0], // extract the new element
                _.first(table.getElementsByTagName(tag)) // find the existing element
            );

        }

        return {

            setPortalSize : function (height, width) {

                portal.css({
                    height : height,
                    width : width
                });

                $table.css({
                    height : height,
                    width : width
                });

            },

            setSizerSize : function (height, width) {

                sizer.css({
                    height : height,
                    width : width
                });

            },

            writeBody : function (markup) {
                write(bodyTable, markup, 'tbody');
            },

            writeHead : function (markup) {
                write(headTable, markup, 'thead');
            }
        
        };

    };

}(window.app || (window.app = {}), jQuery, _))
