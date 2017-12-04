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
    }

})