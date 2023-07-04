import { LightningElement, api } from 'lwc';

export default class ProductDetails extends LightningElement{
    @api product;

    handleClose(){
        const selectEvent = new CustomEvent('closedetails');
        this.dispatchEvent(selectEvent);
    }
}