trigger ProductTrigger on Product__c (after insert) {
    Set<Id> prodsNoImage = new Set<Id>();
    for(Product__c prod : Trigger.new){
        if(prod.Image__c == null){
            prodsNoImage.add(prod.Id);
        }
    }
    ProductUrlHandler.setProductImages(prodsNoImage);
}