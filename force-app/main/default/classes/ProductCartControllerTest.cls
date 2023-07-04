@isTest
public with sharing class ProductCartControllerTest {

    @testSetup static void setup() {
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());

        Account acc = new Account(
            Name = 'accName'
        );
        List<Product__c> testProds = new List<Product__c>();
        for(Integer i=1;i<=5;i++) {
            testProds.add(new Product__c(
                Name = 'prod'+i,
                Description__c = 'test description ' + i,
                Type__c = ''+i,
                Family__c = ''+i,
                Price__c = 100
            ));
        }
        insert testProds;  
        insert acc;        
    }

    @isTest static void testCreateOrder() {
        List<Product__c> lst = [SELECT Id, Name, Price__c FROM Product__c];
        Account acc = [SELECT Id FROM Account LIMIT 1];
        ProductCartController.createOrder(lst, acc.Id);
        Order__c ord = [SELECT Id, AccountId__c FROM Order__c LIMIT 1];
        List<OrderItem__c> itemList = [SELECT Id, Name, OrderId__c FROM OrderItem__c WHERE OrderId__c = :ord.Id];
        System.assertEquals(acc.Id, ord.AccountId__c);
        System.assertEquals(5, itemList.size());
    }
}