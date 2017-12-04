/**
 * Created by chshah on 12/2/2017.
 */

public without sharing class AccountContactsViewerController {
    @AuraEnabled
    public static List<Contact> getContacts(Id recordId) {
        return [Select Id, FirstName, LastName, Email, Phone From Contact Where AccountId = :recordId];
    }

    @AuraEnabled
    public static Configuration getConfiguration() {
        Configuration configuration = new Configuration();
        AccountContactsViewerComponent__c defaultOption = AccountContactsViewerComponent__c.getInstance('default');
        configuration.displayCustom = defaultOption.displayCustom__c;
        configuration.displayLightning = defaultOption.displayLightning__c;
        configuration.allowedColumns = defaultOption.allowedColumns__c;
        configuration.columns = new List<Column>();
        for(String fieldName : configuration.allowedColumns.split(',') ) {
            Column column = new Column();
            column.value = fieldName;
            column.fieldName = fieldName;
            column.label = fieldName;
            column.sortable = true;
            column.type = 'String';
            configuration.columns.add(column);
        }
        System.debug( ' configuration ' + configuration);
        return configuration;
    }

    public class Configuration {
        Boolean displayCustom;
        Boolean displayLightning;
        String allowedColumns;
        List<Column> columns;
    }

    public class Column {
        String label;
        String value;
        String type;
        String fieldName;
        Boolean sortable;
    }

}