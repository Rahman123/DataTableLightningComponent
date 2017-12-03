/**
 * Created by chshah on 12/2/2017.
 */

public without sharing class AccountContactsViewerController {
    @AuraEnabled
    public static List<Contact> getContacts(Id recordId) {
        return [Select Id, FirstName, LastName, Email, Phone From Contact Where AccountId = :recordId];
    }
}