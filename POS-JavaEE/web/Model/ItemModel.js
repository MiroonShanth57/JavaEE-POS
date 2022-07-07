function Item(ICode,IName,IHQuantity,IPrice){
    var __ItemCode=ICode;
    var __ItemName=IName;
    var __ItemQuantity=IHQuantity;
    var __ItemPrice=IPrice;

    this.getItemCode=function (){
        return __ItemCode;
    }

    this.setItemCode=function (ICode){
        __ItemCode=ICode;
    }

//    /////////////////

    this.getItemName=function (){
        return __ItemName;
    }

    this.setItemName=function (IName){
        __ItemName=IName;
    }

    //////////////////////

    this.getItemQuantity=function (){
        return __ItemQuantity;
    }

    this.setItemQuantity=function (IHQuantity){
        __ItemQuantity=IHQuantity;
    }

    /////////////////////////

    this.getItemPrice=function (){
        return __ItemPrice;
    }

    this.setItemPrice=function (IPrice){
        __ItemPrice=IPrice;
    }

}