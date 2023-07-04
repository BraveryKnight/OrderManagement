@isTest
public with sharing class ProductsControllerTest {

    @testSetup static void setup() {
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
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
    }

    @isTest static void testGetAllProducts() {
        List<Product__c> lst = ProductsController.searchProducts('', new List<String>(), new List<String>());
        System.assertEquals(5, lst.size());
    }

    @isTest static void testSearchProducts() {
        List<Product__c> lst = ProductsController.searchProducts('prod', new List<String>{'1', '2'}, new List<String>{'1', '2'});
        System.assertEquals(2, lst.size());
    }
}