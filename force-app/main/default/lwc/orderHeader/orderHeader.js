import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import {getPicklistValues, getObjectInfo} from 'lightning/uiObjectInfoApi';
import PRODUCT_OBJECT from '@salesforce/schema/Product__c'
import TYPE_FIELD from '@salesforce/schema/Product__c.Type__c'
import FAMILY_FIELD from '@salesforce/schema/Product__c.Family__c'
import searchProducts from '@salesforce/apex/ProductsController.searchProducts';
import ProductDetails from 'c/productDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import { refreshApex } from '@salesforce/apex';

export default class OrderHeader extends LightningElement {
    accName = 'Default';
    accNumber = '88005553535';
    accId;
    typeColumn = [{ label: 'Product Type', fieldName: 'name', type: 'text'}];
    familyColumn = [{ label: 'Product Family', fieldName: 'name',  type: 'text' }];
    familyPicklistData = [];
    typePicklistData = [];
    searchTerm = '';
    error;
    typeFilter = [];
    familyFilter = [];
    currentProduct;
    productCart = [];
    isCartOpen = false;
    isNewProductOpen = false;
    isDetailsShown = false;
    isManager;

    @wire(getObjectInfo, {objectApiName : PRODUCT_OBJECT})
    productObjectMetadata;

    @wire(getPicklistValues,{recordTypeId: '$productObjectMetadata.data.defaultRecordTypeId', fieldApiName: TYPE_FIELD})
    typeData({error, data}){
        if(data){
            this.typePicklistData = [];
            data.values.forEach(el=> {
                this.typePicklistData.push({name : el.value})
            });
        }
    }

    @wire(getPicklistValues,{recordTypeId: '$productObjectMetadata.data.defaultRecordTypeId', fieldApiName: FAMILY_FIELD})
    familyData({error, data}){
        if(data){
            this.familyPicklistData = [];
            data.values.forEach(el=> {
                this.familyPicklistData.push({name : el.value})
            });
        }
    }

    currentPageReference;
    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
        if (this.connected) {
            this.generateUrls();
        } else {
            this.generateUrlOnConnected = true;
        }
    }

    @wire(getRecord, { recordId: USER_ID, fields: ['User.IsManager__c'] })
    userData({error, data}) {
        if(data) {
            this.isManager = data.fields.IsManager__c.value;
        } 
    }

    @wire(searchProducts, {searchTerm: '$searchTerm', typeFilter: '$typeFilter', familyFilter: '$familyFilter'})
    products;


	handleSearchTermChange(event) {
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
            this.aplyFilters();
		}, 300);
	}

    aplyFilters() {
        this.familyFilter = [];
        this.typeFilter = [];
        this.template.querySelector('lightning-datatable[data-recid=typeTable]').getSelectedRows().forEach(el=> {
            this.typeFilter.push(el.name)
        });
        this.template.querySelector('lightning-datatable[data-recid=familyTable]').getSelectedRows().forEach(el=> {
            this.familyFilter.push(el.name)
        });
	}

    get hasResults() {
		return (this.products.data.length > 0);
	}

    showDetails(event) {
        this.currentProduct = event.detail;
        this.isDetailsShown = true;
    }

    addProductToCart(event) {
        this.productCart.push(event.detail);
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Product added to cart',
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }

    openCart() {
        this.isCartOpen = true;
    }

    handleClose() {
        this.isCartOpen = false;
    }

    createProduct(){
        this.isNewProductOpen = true;
    }

    closeProductModal(){
        this.isNewProductOpen = false;
        refreshApex(this.products);
        this.aplyFilters();
    }

    closeDetails() {
        this.isDetailsShown = false;
    }

    connectedCallback(){
        this.accName = this.currentPageReference.state.c__Name;
        this.accNumber = this.currentPageReference.state.c__Phone;
        this.accId = this.currentPageReference.state.c__Id;
    }
}