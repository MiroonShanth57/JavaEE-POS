///////////search Customer ///////////
function SearchCustomer(id){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerID()==id){
            $("#CustNameO").val(customerDB[i].getCustomerName());
            $("#CustAddreO").val(customerDB[i].getCustomerAddress());
            $("#CustSalaO").val(customerDB[i].getCustomerSalary());

            return;
        }
    }
}
/////////////////////////////////////

/////////////////////search Item ///////////
function SearchItem(code){
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode()==code){
            $("#nameItemO").val(itemDB[i].getItemName());
            $("#quantityItemO").val(itemDB[i].getItemQuantity());
            $("#priceItemO").val(itemDB[i].getItemPrice());

            return;
        }
    }
}
//////////////////////////////////////////////

/////btn Search Customer//////////////

$("#CustIDO").keydown(function (searchCustomer){
    if (searchCustomer.key=="Enter"){
        if ($("#CustIDO").val()==''){
            alert("Field is empty! try again..")
             return;
        }
        alert("Customer Found");

        SearchCustomer($("#CustIDO").val());
    }
});

////////////////////////////////////

/////btn Search Item//////////////

$("#itemCodeO").keydown(function (searchItem){
    if (searchItem.key=="Enter"){
        if ($("#itemCodeO").val()==''){
            alert("Field is empty! try again..")
            return;
        }
        alert("Item Found");

        SearchItem($("#itemCodeO").val());
    }
});

/////////////////////////////////////////

//////////////Add item to final table//////
let ItemTempTotal=0;
let ItemSubTempTotal=0;

$("#AddToCrtO").click(function (){
    let TotalValueOfItem=$("#priceItemO").val()*$("#quantityForSaleItemO").val();
    ItemTempTotal=ItemTempTotal+TotalValueOfItem;
    $("#billTotalO").val(ItemTempTotal + "/=");


    let row=`<tr><td>${$("#itemCodeO").val()}</td><td>${$("#nameItemO").val()}</td><td>${$("#quantityForSaleItemO").val()}</td><td>${TotalValueOfItem}</td></tr>`;
    $("#CustomerFinalTableO").append(row)

///////////Quantity - form array/////

    let currentLastQuantity=$("#quantityItemO").val()-$("#quantityForSaleItemO").val();
    $("#quantityItemO").val(currentLastQuantity);

 ////////////////////enter new value to item array//////////////////
    let newQuantityForAdd=searchFomArrayItem($("#itemCodeO").val());
    if(newQuantityForAdd!=1){
        itemDB[newQuantityForAdd].setItemQuantity(currentLastQuantity);
        LoadAllItem();
        SetTextToFieldsItem();
        return;
    }
    /////////////////////////////////////////////////////////////////

    $("#CardValue").val(ItemTempTotal + "rs Only");

    $("#billTotalO").val(ItemTempTotal + "/=");

});

//////////////////////////////finalOrder/////////////////////////
$("#finalOrderO").click(function (){
    if($("#OrderIdFixO").val()!=''&&$("#DateFixO").val()!=''&&$("#CustIDO").val()!=''&&$("#itemCodeO").val()!=''&&
        $("#reCashO").val()!=''){

        let OID=$("#OrderIdFixO").val();
        let ODate=$("#DateFixO").val();
        let OCusId=$("#CustIDO").val();
        let OPrice=ItemSubTempTotal;

    //    ///////order id check/////
        if (OrderIDCheck(OID)){
            alert(OID +" This Order ID Has Already Taken !")
        }

        if(confirm("confirm this order?")){

            let Oder=new FinalOreder(OID,ODate,OCusId,OPrice);
            orderDB.push(Oder);
            ClearTextField();
        }else {
            alert("Order Canceled for some reason")
        }

    }else {
        alert("try again...");
        return;
    }
});

////////////////////////////////////////////////////////////////

//////////////////////Oder ID Checking //////////////////////////
function OrderIDCheck(id){
    for (let i = 0; i < orderDB.length; i++) {
       if (orderDB[i].getOrderID()==id){
           return true;
       }else {
           return false;
       }
    }
}

////////////////////////////////////////////////////////////////

///////////clear All fields for new order///////////////////////
function ClearTextField(){
    $("#OrderIdFixO").val('');
    $("#DateFixO").val('');

    $("#itemCodeO").val('');
    $("#nameItemO").val('');
    $("#quantityItemO").val('');
    $("#quantityForSaleItemO").val('');
    $("#priceItemO").val('');

    $("#billTotalO").val('');
    $("#finalOrderO").val('');
    $("#discountO").val('');
    $("#reCashO").val('');
    $("#BalanceForCusO").val('');
    $("#finalTotalO").val('')

    $("#CustIDO").val('');
    $("#CustNameO").val('');
    $("#CustAddreO").val('');
    $("#CusSala").val('');

    $("#CustomerFinalTableO>tr").remove();

    $("#CardValue").val('');
}
////////////////////////////////////////////////////////////////

///////////////////Date Input Validation///////////////////////

var regExDate=/^\d{2}\/\d{2}\/\d{4}$/;
var OrderIDRegEx =/^(OID-)[0-9]{3,4}$/;

$("#DateFixO").keyup(function (){

    let text1 =$("#DateFixO").val();
    if(regExDate.test(text1)){
        $("#DateFixO").css('border', '2px solid green');

        $("#DateFixO").keydown(function (focusNextInput){

            if(focusNextInput.key=="Enter"){

                $("#OrderIdFixO").focus();

//////////////////////////////////////////////////////////////////////////////////////////////////////////
                $("#OrderIdFixO").keyup(function (){

                    let text2=$("#OrderIdFixO").val();
                    if(OrderIDRegEx.test(text2)){
                        $("#OrderIdFixO").css('border', '2px solid green');
                    }else {

                        $("#OrderIdFixO").css('border', '2px solid red');
                        $("#OrderIdFixO").focus();
                    }
                });

            }else {
                $("#DateFixO").focus();
            }
        });


    }else {
        $("#DateFixO").css('border', '2px solid red');
        $("#DateFixO").focus();
    }

});

var CusIDRegEx =/^(C00-)[0-9]{3,4}$/;
var ItemIDRegEx =/^(I00-)[0-9]{3,4}$/;

$("#CustIDO").keyup(function (){

    let text1 =$("#CustIDO").val();
    if(CusIDRegEx.test(text1)){
        $("#CustIDO").css('border', '2px solid green');

        $("#CustIDO").keydown(function (focusNextInput){

            if(focusNextInput.key=="Enter"){

                $("#itemCodeO").focus();

//////////////////////////////////////////////////////////////////////////////////////////////////////////
                $("#itemCodeO").keyup(function (){

                    let text2=$("#itemCodeO").val();
                    if(ItemIDRegEx.test(text2)){
                        $("#itemCodeO").css('border', '2px solid green');
                    }else {

                        $("#itemCodeO").css('border', '2px solid red');
                        $("#itemCodeO").focus();
                    }
                });

            }else {
                $("#CustIDO").focus();
            }
        });


    }else {
        $("#CustIDO").css('border', '2px solid red');
        $("#CustIDO").focus();
    }

});

//////////////////////////////////////////

var QuantityRegEx=/^[1-100]{1,10}$/;

$("#quantityForSaleItemO").keyup(function (){

    var input1=$("#quantityForSaleItemO").val();
        if (QuantityRegEx.test(input1)){
            $("#quantityForSaleItemO").css('border','2px solid green');
            $("#AddToCrtO").attr("disabled",false);
        }else{
            $("#quantityForSaleItemO").css('border','2px solid red');
                $("#quantityForSaleItemO").focus();
                alert("Wrong Format !")
            $("#AddToCrtO").attr("disabled",true);

        }

        if ($("#quantityForSaleItemO").val()==''){
            $("#quantityForSaleItemO").css('border','2px solid red');
            $("#quantityForSaleItemO").focus();
            alert("Empty fields !")
            $("#AddToCrtO").attr("disabled",true);

            return;
        }

        if($("#quantityForSaleItemO").val()>$("#quantityItemO").val()){
            $("#quantityForSaleItemO").css('border','2px solid red');
            $("#quantityForSaleItemO").focus();
            alert("you don't have this much stock balance !.. ");
            $("#AddToCrtO").attr("disabled",true);
            return;
        }else {
            $("#quantityForSaleItemO").css('border','2px solid green');
            $("#AddToCrtO").attr("disabled",false);
        }

});

/////////////////////////////////////////
var regDis=/^[0-9]{1,2}|(.)[0-9]{1,2}$/;
$("#discountO").keyup(function (){
    let input2=$("#discountO").val();
    if (regDis.test(input2)){
        $("#discountO").css('border','2px solid green');
        let dis=$("#discountO").val();
        let subT=ItemTempTotal*(dis/100);

        ItemSubTempTotal=ItemTempTotal-subT;

        $("#finalTotalO").val(ItemSubTempTotal+" /=");
        // $("#reCashO").focus();

        $("#CalcFinalAmountO").click(function (){
    let bal=$("#reCashO").val()-ItemSubTempTotal;
    $("#BalanceForCusO").val(bal);


});
    }else {
        $("#discountO").css('border','2px solid red');
        $("#discountO").focus();

    }
});
///////////////////////////////////////

$("#SelectCusO").click(function (){
    ClearTextField();
});