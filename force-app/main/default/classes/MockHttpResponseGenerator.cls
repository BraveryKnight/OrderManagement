@isTest
global class MockHttpResponseGenerator implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"success":true,"word":"sample string 2","rowcount":1,"data":[{"id":1,"imageurl":"sample string 2"}],"errormessage":"sample string 4"}');
        res.setStatusCode(200);
        return res;
    }
}