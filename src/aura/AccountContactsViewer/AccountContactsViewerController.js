/**
 * Created by chshah on 12/2/2017.
 */
({
    initialization : function(component, event, helper) {

        component.set("v.version2", '2' );

        console.log(" AccountContactsViewerController getContacts for account : " + component.get("v.recordId") + ' initialization ');

        var action = component.get("c.getContacts");

        console.log(" AccountContactsViewerController getContacts for account : " + component.get("v.recordId") + ' got action  ');

        action.setParams({
            recordId: component.get("v.recordId")
        });

        component.set("v.Columns", [
            {label:"First Name", fieldName:"FirstName", type:"text", sortable:true },
            {label:"Last Name", fieldName:"LastName", type:"text" , sortable:true},
            {label:"Phone", fieldName:"Phone", type:"phone" , sortable:true}
        ]);

        console.log(" AccountContactsViewerController getContacts for account : " + component.get("v.recordId") + ' param set  ');

        action.setCallback(this, function(data) {
            var state = data.getState();
            console.log( ' AccountContactsViewerController getContacts callback - state ' + state + ' data: ' + data );
            if (state === "SUCCESS") {
                component.set("v.Contacts", data.getReturnValue() );
            } else if (state === "INCOMPLETE") {
                console.log(' AccountContactsViewerController getContacts callback - incomplete ');
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        console.log(" AccountContactsViewerController getContacts for account : " + component.get("v.recordId") + ' server side action is about to be submitted. ');
        $A.enqueueAction(action);
        console.log(" AccountContactsViewerController getContacts for account : " + component.get("v.recordId") + ' server side action is submitted. ');
    }

})
