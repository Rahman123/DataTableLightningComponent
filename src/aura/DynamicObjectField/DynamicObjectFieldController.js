/**
 * Created by chshah on 12/3/2017.
 */
({

    initialization : function(component, event, helper) {
        var object = component.get("v.Object");
        var field = component.get("v.Field");
        //console.log(" DynamicObjectFieldController initialization object : " + object + ' field  ' + field );
        //console.log(object);
        var objectField = object[field];
        //console.log(" DynamicObjectFieldController initialization objectField : " + objectField );
        component.set("v.ObjectFieldValue", objectField);
    }

})