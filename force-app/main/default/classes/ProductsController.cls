public with sharing class ProductsController {
    
    @AuraEnabled(Cacheable=true)
    public static Product__c[] getAllProducts() {
        return [
            SELECT
                Id,
                Name,
                Description__c,
                Family__c,
                Type__c,
                Price__c,
                Image__c
            FROM Product__c
            ORDER BY Name
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Product__c[] searchProducts(String searchTerm, List<String> typeFilter, List<String> familyFilter) {
        searchTerm = searchTerm.trim();
        if (searchTerm == '' && typeFilter.size() == 0 && familyFilter.size() == 0) {
            return getAllProducts();
        }
        String queryString = 'SELECT Id, Name, Description__c, Family__c, Type__c, Price__c, Image__c FROM Product__c WHERE ';
        if(searchTerm != ''){
            searchTerm = '(Name LIKE \'%' + searchTerm + '%\' OR Description__c LIKE \'%' + searchTerm + '%\')';
            queryString += searchTerm;
        }
        if(typeFilter.size() != 0){
            String typeFilterStr = '';
            for(Integer i =0; i < typeFilter.size(); i++){
                typeFilterStr += '\'' + typeFilter[i] + '\'';
                if(i+1<typeFilter.size()){
                    typeFilterStr += ' , ';
                }
            }
            queryString += (searchTerm == '' ? '' : ' AND ') + 'Type__c IN (' + typeFilterStr + ')';
        }        
        if(familyFilter.size() != 0){
            String familyFilterStr = '';
            for(Integer i =0; i < familyFilter.size(); i++){
                familyFilterStr += '\'' + familyFilter[i] + '\'';
                if(i+1<familyFilter.size()){
                    familyFilterStr += ' , ';
                }
            }
            queryString += (searchTerm == '' && typeFilter.size() == 0 ? '' : ' AND ') + 'Family__c IN (' + familyFilterStr + ')';
        }
        return Database.query(queryString);
    }
}