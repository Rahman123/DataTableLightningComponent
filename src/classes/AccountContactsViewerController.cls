/**
 * Created by chshah on 12/2/2017.
 */

public without sharing class AccountContactsViewerController {
    @AuraEnabled
    public static List<Contact> getContacts(Id recordId) {
        System.debug(' recordId ' + recordId );
        String query = 'select ' + AccountContactsViewerComponent__c.getInstance('default').allowedColumns__c + ' from Contact Where AccountId = :recordId ';
        return Database.query(query);
    }

    @AuraEnabled
    public static String getConfiguration() {
        Configuration configuration = new Configuration();
        AccountContactsViewerComponent__c defaultOption = AccountContactsViewerComponent__c.getInstance('default');
        configuration.displayCustom = defaultOption.displayCustom__c;
        configuration.displayLightning = defaultOption.displayLightning__c;
        configuration.allowedColumns = defaultOption.allowedColumns__c.split(',');
        configuration.columns = new List<Column>();
        for(String fieldName : configuration.allowedColumns ) {
            Column column = new Column();
            column.value = fieldName;
            column.fieldName = fieldName;
            column.label = fieldName;
            column.sortable = true;
            column.type = 'String';
            configuration.columns.add(column);
        }
        System.debug( ' configuration ' + configuration);
        return JSON.serialize( configuration );
    }

    public class Configuration {
        Boolean displayCustom;
        Boolean displayLightning;
        List<String> allowedColumns;
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