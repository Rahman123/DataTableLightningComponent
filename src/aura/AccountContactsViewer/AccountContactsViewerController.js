/**
 * Created by chshah on 12/2/2017.
 */
({
    initialization : function(component, event, helper) {

        console.log(" AccountContactsViewerController getContacts for account : " + component.get("v.recordId") + ' initialization ');

        var action = component.get("c.getContacts");
        action.setParams({
            recordId: component.get("v.recordId")
        });

        var configurationAction = component.get("c.getConfiguration");

        /**
        component.set("v.Columns", [
            {label:"First Name", fieldName:"FirstName", type:"text", sortable:true },
            {label:"Last Name", fieldName:"LastName", type:"text" , sortable:true},
            {label:"Phone", fieldName:"Phone", type:"phone" , sortable:true}
        ]);

        component.set("v.AllColumns", [
            {label:"First Name", value:"FirstName", type:'text', fieldName:"FirstName", sortable:true},
            {label:"Last Name", value:"LastName", type:'text', fieldName:"LastName", sortable:true},
            {label:"Phone", value:"Phone", type:'phone', fieldName:"Phone", sortable:true }
        ]);

        component.set("v.SelectedColumns", [ "FirstName", "LastName", "Phone" ] );
         **/

        console.log(" AccountContactsViewerController getContacts for account : " + component.get("v.recordId") + ' param set  ');

        action.setCallback(this, function(data) {
            var state = data.getState();
            console.log( ' AccountContactsViewerController getContacts callback - state ' + state );
            console.log( data );
            if (state === "SUCCESS") {
                console.log( data.getReturnValue() );
                component.set("v.Contacts", data.getReturnValue() );
                //helper.dataTable(component);
                //helper.tableSorter(component);
            } else if (state === "INCOMPLETE") {
                console.log(' AccountContactsViewerController getContacts callback - incomplete ');
            } else if (state === "ERROR") {
                component.set("v.displayError", true );
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                        component.set("v.errorMessage", errors[0].message );
                    }
                } else {
                    console.log("Unknown error");
                    component.set("v.errorMessage", 'Unknown error' );
                }
            }
        });

        configurationAction.setCallback(this, function(data) {
            var state = data.getState();
            console.log( ' AccountContactsViewerController configurationAction callback - state ' + state );
            if (state === "SUCCESS") {
                var response = JSON.parse( data.getReturnValue() );
                console.log( ' response.displayCustom ' + response.displayCustom + ' response.displayLightning ' + response.displayLightning + ' response.allowedColumns ' + ' response.columns ' );
                console.log( response.allowedColumns );
                console.log( response.columns );
                component.set("v.displayCustom", response.displayCustom );
                component.set("v.displayLightning", response.displayLightning );
                component.set("v.SelectedColumns", response.allowedColumns );
                component.set("v.AllColumns", response.columns );
                component.set("v.Columns", response.columns );
            } else if (state === "ERROR") {
                component.set("v.displayError", true );
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        component.set("v.errorMessage", errors[0].message );
                    }
                } else {
                    component.set("v.errorMessage", 'Unknown error' );
                }
            }
        });

        console.log(" AccountContactsViewerController getContacts for account : " + component.get("v.recordId") + ' server side action is about to be submitted. ');
        $A.enqueueAction(action);
        $A.enqueueAction(configurationAction);
        console.log(" AccountContactsViewerController getContacts for account : " + component.get("v.recordId") + ' server side action is submitted. ');
    },

    toggleColumnSelector: function (component, event, helper) {
        var displayColumnSelector = component.get('v.displayColumnSelector');
        console.log(' AccountContactsViewerController toggleColumnSelector displayColumnSelector ' + displayColumnSelector );
        component.set("v.displayColumnSelector", !displayColumnSelector );
    },

    handleColumnSelection: function (component, event, helper) {
        var SelectedColumns = component.get('v.SelectedColumns');
        var AllColumns = component.get('v.AllColumns');
        var Columns = component.get('v.Columns');
        var Contacts = component.get("v.Contacts");
        console.log(' AccountContactsViewerController SelectedColumns PRE: SelectedColumns AllColumns  Columns ' );
        console.log( SelectedColumns );
        console.log( AllColumns);
        console.log( Columns );
        Columns = [];
        SelectedColumns.forEach(function(selectedColumn) {
            AllColumns.forEach(function(allColumn) {
                if( allColumn.value == selectedColumn ) {
                    Columns.push( allColumn );
                }
            });
        });
        component.set("v.Columns", Columns);
        component.set("v.Contacts", Contacts);
        console.log(' AccountContactsViewerController SelectedColumns POST: SelectedColumns AllColumns  Columns ' );
        console.log( SelectedColumns );
        console.log( AllColumns);
        console.log( Columns );
    },

    sortContacts: function (component, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        console.log(" AccountContactsViewerController sortContacts for account : " + component.get("v.recordId") + ' fieldName  ' + fieldName + ' sortDirection ' + sortDirection );
        // assign the latest attribute with the sorted column fieldName and sorted direction
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        console.log(" AccountContactsViewerController calling helper to do the sort : account : " + component.get("v.recordId") + ' fieldName  ' + fieldName + ' sortDirection ' + sortDirection );
        helper.sortData(component, fieldName, sortDirection);
    }

})