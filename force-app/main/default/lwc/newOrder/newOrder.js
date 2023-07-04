import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';

export default class NewOrder extends NavigationMixin(LightningElement) {
    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields: ['Account.Name', 'Account.Phone'] })
    record;

    handleClick(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'OrderManagement'
            },
            state: { 
                c__Id: this.recordId,
                c__Name: this.record.data.fields.Name.value,
                c__Phone:  this.record.data.fields.Phone.value,
           }
        });
    }
}