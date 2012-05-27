(function (app, $, _, undefined) {

    app.gridDom = function (container) {

        var headTable,
            bodyTable,
            head,
            body,
            sizer,
            portal,
            template = _.template('<table><<%= item.tag %>><%= item.markup %></<%= item.tag %>></table>'),
            write;

        container.innerHTML = 
            '<table><thead></thead></table>' +
            '<div class="portal">' +
                '<div class="scroll-sizer">' +
                    '<table><tbody></tbody></table>' +
                '</div>' +
            '</div>';

        headTable = container.getElementsByTagName('table')[0];
        bodyTable = container.getElementsByTagName('table')[1];

        portal = _.find(container.childNodes, function (node) {
            return node.className === 'portal';
        });

        $(bodyTable).delegate('tr', 'mouseover', function (e) {
            $(this).addClass('active');
        }).delegate('tr', 'mouseout', function (e) {
            $(this).removeClass('active');
        });

        function write (table, markup, tag) {

            var temp = document.createElement('div'),
                newNode;

            temp.innerHTML = template({
                markup : markup, 
                tag : tag
            });

            newNode = temp.childNodes[0].childNodes[0];

            table.replaceChild(
                newNode, // extract the new element
                _.first(table.getElementsByTagName(tag)) // find the existing element
            );

            return newNode;

        }

        return {

            bodyTable : function () {
                return bodyTable;
            },

            head : function () {
                return head;
            },

            portal : function () {
                return portal;
            },

            scrollSizer : function () {
                return $(portal).find('.scroll-sizer');
            },

            writeBody : function (markup) {
                return body = write(bodyTable, markup, 'tbody');
            },

            writeHead : function (markup) {
                return head = write(headTable, markup, 'thead');
            }
        
        };

    };

}(window.app || (window.app = {}), jQuery, _))
