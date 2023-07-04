import { LightningElement, api } from 'lwc';

export default class ProductTile extends LightningElement {
    @api product;

    showDetails() {
        const selectEvent = new CustomEvent('showdetails', {
            detail: this.product
        });
        this.dispatchEvent(selectEvent);
    }

    addProductToCart() {
        const selectEvent = new CustomEvent('addproducttocart', {
            detail: this.product
        });
        this.dispatchEvent(selectEvent);
    }
}