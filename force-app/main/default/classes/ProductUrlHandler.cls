public with sharing class ProductUrlHandler {
    public Boolean success;
    public String word;
    public Integer rowcount;
    public String errormessage;
    public List<Data> data;

    public class Data{
        public String id;
        public String imageurl;
    }

    public static ProductUrlHandler parse(String json) {
        return (ProductUrlHandler) System.JSON.deserialize(json, ProductUrlHandler.class);
    }

    @future(callout=true)
    public static void setProductImages(Set<Id> prodIds) { 
        List<Product__c> prodList = [ SELECT Id, Name, Image__c FROM Product__c WHERE Id IN: prodIds];  
        for(Product__c prod : prodList){
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('http://www.glyffix.com/api/Image?word=' + prod.Name);
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            if(response.getStatusCode() == 200) {
                ProductUrlHandler resp = ProductUrlHandler.parse(response.getBody());
                prod.Image__c = resp.data[0].imageurl;
            }
        }
        update prodList;
    }  
}