(function (app, $, _, undefined) {

    var 
        ByCell,
        ByTable,
        ByTemplate,
        max = 100,
        rowCount = 20,
        colCount = 10;

    ByTemplate = function () {

        this.body = $('tbody');
        this.body.empty();

        this.rowData = [];

        _.templateSettings.variable = 'x';

        var t1 = _.template('<td class="col<%= x.c %>"><td class="data"><span>cell_<%= x.r %>_<%= x.c %></span></div></td>');
        var t2 = _.template('<td class="col<%= x.c %>"><td class="data"><span>cell_<%= x.c %>_<%= x.r %></span></div></td>');

        for (var r = 0; r < rowCount; r++) {
            row = this.rowData[r] = r % 2 === 0 ? t1 : t2;
        }

        this.body = this.body[0];
        this.table = this.body.parentNode;


    };

    ByTemplate.prototype = {

        go : function () {

            var self = this,
                id = null;

            this.per = [];
            this.i = 0;

            this.ticks = 0;

            id = setInterval(function () {

                if (self.i >= max) {
                    clearInterval(id);
                    console.log(self.ticks, 'avg:', _.reduce(self.per, function (memo, time) {
                        return memo + time;
                    }, 0)/max, 'min:', _.min(self.per), 'max:', _.max(self.per));
                    return;
                }

                if (self.i % 2 === 0) {
                    self.forward();
                } else {
                    self.reverse();
                }

                self.i++;

            }, 20);

        },

        forward : function () {

            var ticks,
                body = this.body,
                markup = '',
                rowData = this.rowData,
                r, c,
                row;

            ticks = new Date().getTime();

            for (r = 0; r < rowCount; r++) {

                markup += '<tr class="';
                markup += r % 0 === 0 ? '">' : 'odd">';

                row = rowData[r];

                for (c = 0; c < colCount; c++) {
                    markup += row({
                        r : r,
                        c : c
                    });
                }

                markup += '</tr>';

            }

            //body.innerHTML = markup;
            body = this.foo(markup, body);

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        },

        reverse : function () {

            var ticks,
                body = this.body,
                markup = '',
                rowData = this.rowData,
                r, t, c, d,
                row;

            ticks = new Date().getTime();

            for (t = rowCount - 1; t >= 0; t--) {

                markup += '<tr class="';
                markup += t % 2 === 0 ? '">' : 'odd">';


                row = rowData[t];

                for (d = colCount - 1; d >= 0; d--) {
                    markup += row({
                        r : t,
                        c : d
                    });
                }

                markup += '</tr>';

            }

            //body.innerHTML = markup;
            body = this.foo(markup, body);

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        },




        foo : function (markup, tbody) {

            var m = '<table>';
            m += markup;
            m += '</table>'

            var div = document.createElement('div');

            div.innerHTML = m;
            return this.body = this.table.replaceChild(div.firstChild.firstChild, this.table.firstChild);
        }


    };

    ByCell = function () {

        this.body = $('tbody');
        this.body.empty();
        this.rows = [];

        for (var r = 0; r < rowCount; r++) {

            var $row = $('<tr></tr>').appendTo(this.body);

            var row = this.rows[r] = [];

            for (var c = 0; c < colCount; c++) {

                var col = $('<td class="col' + c + '"></td>').appendTo($row);

                row[c] = col[0];

            }

        }

        this.rowData = [];

        for (var r = 0; r < rowCount; r++) {

            row = this.rowData[r] = [];

            for (var c = 0; c < colCount; c++) {

                row[c] = '<div class="data"><span>cell_' + r + '_' + c + '</span></div>';

            }
        }

        this.body = this.body[0];

    };

    ByCell.prototype = {

        go : function () {

            var self = this,
                id = null;

            this.per = [];
            this.i = 0;

            this.ticks = 0;

            id = setInterval(function () {

                if (self.i >= max) {
                    clearInterval(id);
                    console.log(self.ticks, 'avg:', _.reduce(self.per, function (memo, time) {
                        return memo + time;
                    }, 0)/max, 'min:', _.min(self.per), 'max:', _.max(self.per));
                    return;
                }

                if (self.i % 2 === 0) {
                    self.forward();
                } else {
                    self.reverse();
                }

                self.i++;

            }, 20);


        },

        forward : function () {

            var ticks,
                body = this.body,
                rows = this.rows,
                rowData = this.rowData,
                r, c,
                row;

            ticks = new Date().getTime();

            for (r = 0; r < rowCount; r++) {

                row = rowData[r];
                tr = rows[r];

                for (c = 0; c < colCount; c++) {
                    tr[c].innerHTML = row[c];
                }

            }

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        },

        reverse : function () {

            var ticks,
                body = this.body,
                rows = this.rows,
                rowData = this.rowData,
                r, t, c, d,
                row;

            ticks = new Date().getTime();

            for (r = 0, t = rowCount - 1; r < rowCount; r++, t--) {

                row = rowData[r];
                tr = rows[t];

                for (c = 0, d = colCount - 1; c < colCount; c++, d--) {
                    tr[d].innerHTML = row[c];
                }

            }

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        }


    };

    ByTable = function () {

        this.body = $('tbody');
        this.body.empty();

        this.rowData = [];

        for (var r = 0; r < rowCount; r++) {

            row = this.rowData[r] = [];

            for (var c = 0; c < colCount; c++) {

                row[c] = '<td class="col' + c + '><div class="data"><span>cell_' + r + '_' + c + '</span></div></td>';

            }
        }

        this.body = this.body[0];
        this.table = this.body.parentNode;

    };

    ByTable.prototype = {

        go : function () {

            var self = this,
                id = null;

            this.per = [];
            this.i = 0;

            this.ticks = 0;

            id = setInterval(function () {

                if (self.i >= max) {
                    clearInterval(id);
                    console.log(self.ticks, 'avg:', _.reduce(self.per, function (memo, time) {
                        return memo + time;
                    }, 0)/max, 'min:', _.min(self.per), 'max:', _.max(self.per));
                    return;
                }

                if (self.i % 2 === 0) {
                    self.forward();
                } else {
                    self.reverse();
                }

                self.i++;

            }, 20);


        },

        forward : function () {

            var ticks,
                body = this.body,
                markup = '',
                rowData = this.rowData,
                r, c,
                row;

            ticks = new Date().getTime();

            for (r = 0; r < rowCount; r++) {

                markup += '<tr class="';
                markup += r % 2 === 0 ? '">' : 'odd">';


                row = rowData[r];

                for (c = 0; c < colCount; c++) {
                    markup += row[c];
                }

                markup += '</tr>';

            }

            //body.innerHTML = markup;
            body = this.foo(markup, body);

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        },

        reverse : function () {

            var ticks,
                body = this.body,
                markup = '',
                rowData = this.rowData,
                r, t, c, d,
                row;

            ticks = new Date().getTime();

            for (t = rowCount - 1; t >= 0; t--) {

                markup += '<tr class="';
                markup += t % 2 === 0 ? '">' : 'odd">';


                row = rowData[t];

                for (d = colCount - 1; d >= 0; d--) {
                    markup += row[d];
                }

                markup += '</tr>';

            }

            //body.innerHTML = markup;
            body = this.foo(markup, body);

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        },

        foo : function (markup, tbody) {

            var m = '<table>';
            m += markup;
            m += '</table>'

            var div = document.createElement('div');

            div.innerHTML = m;
            return this.body = this.table.replaceChild(div.firstChild.firstChild, this.table.firstChild);
        }


    };

    $(function () {

        var data = [
            {
                values : [ 1, 2, 3, 4, 5 ],
                items : [
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] }
                ]
            },
            {
                values : [ 1, 2, 3, 4, 5 ],
                items : [
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] }
                ]
            },
            {
                values : [ 1, 2, 3, 4, 5 ],
                items : [
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] }
                ]
            }
        ];

        function count (row) {
            
            row.count = 1;
            row.vc = row.values.length;
            row.ic = row.items ? row.items.length : 0;

            if (row.items) {
                _.each(row.items, function (item) {
                    count(item);
                    row.count += item.count;
                });
            } 

        }

        var ticks = new Date().getTime();

        console.log(new Date().getTime() - ticks);

        return;

        /*


        $('#by_cell').on('click', function () {
            new ByCell().go();
        });

        $('#by_table').on('click', function () {
            new ByTable().go();
        });

        $('#by_template').on('click', function () {
            new ByTemplate().go();
        });

        var find = /<[a-z\/][^>]*>/g;

        var text = '<a href="#"><div class="data">This items a test of the emergency broadcast system.  This items only a test<br/></div></a>';
        var title = text.replace(find, function (match) {
            return '';
        });

        console.log(title);

        $('#title_test').attr('title', title).html(text);

        */


    });


}(window.app || (window.app = {}), jQuery, _))
