import { LightningElement } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Product__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Product__c.Description__c';
import TYPE_FIELD from '@salesforce/schema/Product__c.Type__c';
import FAMILY_FIELD from '@salesforce/schema/Product__c.Family__c';
import IMAGE_FIELD from '@salesforce/schema/Product__c.Image__c';
import PRICE_FIELD from '@salesforce/schema/Product__c.Price__c';

export default class CreateProductModal extends LightningElement {
    fields = [NAME_FIELD, DESCRIPTION_FIELD, TYPE_FIELD, FAMILY_FIELD, IMAGE_FIELD, PRICE_FIELD];

    handleClose(){
        const selectEvent = new CustomEvent('productclose');
        this.dispatchEvent(selectEvent);
    }

    handleSuccess() {
        this.handleClose();
    }

}