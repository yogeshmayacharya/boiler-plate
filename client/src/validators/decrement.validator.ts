import { IValidator, Product, ValidatorAction } from '@capillarytech/pwa-framework';

export class DecrementValidator implements IValidator {
    basedOnDefault: boolean;
    itemRemovalLimit: number;
    isDefault: boolean;

    constructor(basedOnDefault: boolean, itemAdditionLimit: number, isDefault: boolean){
        this.basedOnDefault = basedOnDefault;
        this.itemRemovalLimit = itemAdditionLimit;
        this.isDefault = isDefault;
    }

    allowedAction(): ValidatorAction{
        return ValidatorAction.REMOVE;
    }
    
    validate(clientProduct: Product): boolean{
        if(!this.isDefault) {
            return true;
        }
        let validToRemoveItem = false;
        clientProduct.setSelectedItemsCount();
        let limit = this.itemRemovalLimit;
        let selectedCount = clientProduct.selectedItemCount;
        if(this.basedOnDefault){
            limit = clientProduct.defaultItemCount - this.itemRemovalLimit;
            selectedCount = clientProduct.defaultSelectedItemCount;
        }
        if(selectedCount > limit){
            validToRemoveItem = true;
        }
        clientProduct.resetSelectedItemsCount();
        return validToRemoveItem;
    }
}