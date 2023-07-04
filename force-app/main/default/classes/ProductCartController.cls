public with sharing class ProductCartController {
    
    @AuraEnabled(cacheable=false)
    public static String createOrder(List<Product__c> prodList, String accId) {
        Order__c newOrder = new Order__c(
            Name = accId + ' Order',
            AccountId__c = accId
        );
        insert newOrder;

        Map<Product__c, Integer> prodMap = new Map<Product__c, Integer>();
        for(Product__c prod : prodList){
            if(prodMap.get(prod) != null){
                prodMap.put(prod, prodMap.get(prod) + 1);
            }else{
                prodMap.put(prod, 1);
            }
        }
        List<OrderItem__c> orderLst = new List<OrderItem__c>();
        for(Product__c prod : prodMap.keySet()){
            orderLst.add(new OrderItem__c(
                OrderId__c = newOrder.Id,
                ProductId__c = prod.Id,
                Quantity__c = prodMap.get(prod),
                Price__c =  prodMap.get(prod) * prod.Price__c
            ));
        }
        insert orderLst;
        return newOrder.Id;
    }
}