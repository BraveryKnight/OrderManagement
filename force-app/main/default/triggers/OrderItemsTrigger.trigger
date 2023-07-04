trigger OrderItemsTrigger on OrderItem__c (after insert) {
    Double totalPrice = 0;
    Double totalCount = 0;
    Id orderId;
    for(OrderItem__c item : Trigger.New) {
        totalPrice +=  item.Price__c;
        totalCount += item.Quantity__c;
        orderId = item.OrderId__c;
    }
    Order__c ord = [SELECT TotalProductCount__c, TotalPrice__c FROM Order__c WHERE Id = :orderId];
    ord.TotalProductCount__c = totalCount;
    ord.TotalPrice__c = totalPrice;
    update ord;
}