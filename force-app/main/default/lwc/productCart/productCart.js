import {LightningElement, api } from 'lwc';
import createOrder from '@salesforce/apex/ProductCartController.createOrder';
import { NavigationMixin } from 'lightning/navigation';

export default class ProductCart extends NavigationMixin(LightningElement) {
    @api products = [];
    @api accid;

    get noProducts() {
		return (this.products.length == 0);
	}

    handleClose(){
        const selectEvent = new CustomEvent('cartclose');
        this.dispatchEvent(selectEvent);
    }

    handleCheckout() {
        createOrder({prodList : this.products, accId : this.accid})
        .then(result => {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: result,
                    objectApiName: 'Order__c',
                    actionName: 'view'
                },
            });
            this.handleClose();
        })
        .catch(error => {
            console.log(error);
        });
    }
}