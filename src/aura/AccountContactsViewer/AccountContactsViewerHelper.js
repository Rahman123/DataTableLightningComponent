/**
 * Created by chshah on 12/3/2017.
 */
({

    sortData: function (cmp, fieldName, sortDirection) {
        console.log(" AccountContactsViewerHelper calling helper to do the sort : account : " + cmp.get("v.recordId") + ' fieldName  ' + fieldName + ' sortDirection ' + sortDirection );
        var data = cmp.get("v.Contacts");
        var reverse = sortDirection !== 'asc';
        //sorts the rows based on the column header that's clicked
        data.sort(this.sortBy(fieldName, reverse))
        cmp.set("v.Contacts", data);
    },

    sortBy: function (field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};
        //checks if the two rows should switch places
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },

    dataTable : function(component) {
        console.log(" AccountContactsViewerHelper dataTable : " + component.get("v.recordId")  );
        jQuery('#contactsDataTable').DataTable( {
            dom: 'Bfrtip',
            buttons: [ 'colvis' ]
        } );
    },

    tableSorter: function(component) {
        jQuery(".custom-popup").tablesorter({
            theme: 'blue',
            widgets: ['zebra', 'columnSelector', 'stickyHeaders'],
            widgetOptions : {
                // target the column selector markup
                columnSelector_container : jQuery('#columnSelector'),
                // column status, true = display, false = hide
                // disable = do not display on list
                columnSelector_columns : {
                    0: 'disable' /* set to disabled; not allowed to unselect it */
                },
                // remember selected columns (requires $.tablesorter.storage)
                columnSelector_saveColumns: true,

                // container layout
                columnSelector_layout : '<label><input type="checkbox">{name}</label>',
                // layout customizer callback called for each column
                // function($cell, name, column){ return name || $cell.html(); }
                columnSelector_layoutCustomizer : null,
                // data attribute containing column name to use in the selector container
                columnSelector_name  : 'data-selector-name',

                /* Responsive Media Query settings */
                // enable/disable mediaquery breakpoints
                columnSelector_mediaquery: true,
                // toggle checkbox name
                columnSelector_mediaqueryName: 'Auto: ',
                // breakpoints checkbox initial setting
                columnSelector_mediaqueryState: true,
                // hide columnSelector false columns while in auto mode
                columnSelector_mediaqueryHidden: true,

                // set the maximum and/or minimum number of visible columns; use null to disable
                columnSelector_maxVisible: null,
                columnSelector_minVisible: null,
                // responsive table hides columns with priority 1-6 at these breakpoints
                // see http://view.jquerymobile.com/1.3.2/dist/demos/widgets/table-column-toggle/#Applyingapresetbreakpoint
                // *** set to false to disable ***
                columnSelector_breakpoints : [ '20em', '30em', '40em', '50em', '60em', '70em' ],
                // data attribute containing column priority
                // duplicates how jQuery mobile uses priorities:
                // http://view.jquerymobile.com/1.3.2/dist/demos/widgets/table-column-toggle/
                columnSelector_priority : 'data-priority',

                // class name added to checked checkboxes - this fixes an issue with Chrome not updating FontAwesome
                // applied icons; use this class name (input.checked) instead of input:checked
                columnSelector_cssChecked : 'checked',

                // class name added to rows that have a span (e.g. grouping widget & other rows inside the tbody)
                columnSelector_classHasSpan : 'hasSpan',

                // event triggered when columnSelector completes
                columnSelector_updated : 'columnUpdate'
            }
        });
    }

})