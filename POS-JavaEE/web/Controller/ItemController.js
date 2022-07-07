removeValidation();

$("#btnSave").click(function (){


    // gather item Information
    let itemCode = $("#ItemId").val();
    let itemName = $("#ItemName").val();
    let itemQuantity =$("#ItemQuantity").val();
    let itemPrice =$("#ItemPrice").val();

    ///////////////////////////////create obj//////////////////////////////////////////////

    let itemObject=new Item(itemCode,itemName,itemQuantity,itemPrice);

    itemDB.push(itemObject);
    LoadAllItem();

    itemInputFieldsClear();
    SetTextToFieldsItem();

    /////////////////////////////////////////////////////////////////////////////

    $("#ItemTableBody").dblclick(function (){
        (this).remove();
    });

});

/////////////////Update Customer/////////////////////////////////////
$("#btnUpdate").click(function (){
    let index=searchFomArray(itemCode);

    if (index!=-1){
        alert("Successfully Item Details updated...");

        itemDB[index].setItemName(itemName);
        itemDB[index].setItemQuantity(itemQuantity);
        itemDB[index].setItemPrice(itemPrice);

        LoadAllItem();
        SetTextToFieldsItem();
        return;
    }
});
///////////////////////////////////////////////////////////

///////////////Clear Fields////////////////////

function itemInputFieldsClear(){
    $("#ItemId").val('');
    $("#ItemName").val('');
    $("#ItemQuantity").val('');
    $("#ItemPrice").val('');
}

/////////////////////////////////////////////

////////////////Load Customer From Array////////////////////////////

function LoadAllItem(){
    $("#ItemTableBody").empty();

    for (let i = 0; i <itemDB.length; i++) {
        let ItemId=itemDB[i].getItemCode();
        let ItemName=itemDB[i].getItemName();
        let ItemQuantity=itemDB[i].getItemQuantity();
        let ItemPrice=itemDB[i].getItemPrice();

        let row = `<tr><td>${ItemId}</td><td>${ItemName}</td><td>${ItemQuantity}</td><td>${ItemPrice}</td></tr>`;
        $("#ItemTableBody").append(row);
    }
};

/////////////////////////////////////////////////////

//////////////////Set the Customer details to the input fields///////////

function SetTextToFieldsItem(){
    $("#ItemTableBody>tr").click(function (){
        let ItemID=$(this).children(":eq(0)").text();
        let ItemName=$(this).children(":eq(1)").text();
        let ItemQuantity=$(this).children(":eq(2)").text();
        let ItemPrice=$(this).children(":eq(3)").text();

        $("#ItemId").val(ItemID);
        $("#ItemName").val(ItemName);
        $("#ItemQuantity").val(ItemQuantity);
        $("#ItemPrice").val(ItemPrice);
    });
};

///////////////////////////////////////////////////////////

///////////////////Validation Part////////////////////////////////////////

var ItemIDRegEx =/^(I00-)[0-9]{3,4}$/;
var ItemNameRegEx =/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)$/;
var ItemQuantityRegEx =/^(?:\d*\.)?\d+$/;
var ItemPriceRegEx =/^(?:\d*\.)?\d+$/;

$("#ItemId").keyup(function (){

    let text1 =$("#ItemId").val();
    if(ItemIDRegEx.test(text1)){
        $("#ItemId").css('border', '2px solid green');
        $("#error1").text("Correct Format");
        $("#error1").css('color','green');

        $("#ItemId").keydown(function (focusNextInput){

            if(focusNextInput.key=="Enter"){

                $("#ItemName").focus();

//////////////////////////////////////////////////////////////////////////////////////////////////////////
                $("#ItemName").keyup(function (){

                    let text2=$("#ItemName").val();
                    if(ItemNameRegEx.test(text2)){
                        $("#ItemName").css('border', '2px solid green');
                        $("#error2").text("Correct Format");
                        $("#error2").css('color','green');

                        $("#ItemName").keydown(function (focusNextInput){

                            if(focusNextInput.key=="Enter"){
                                $("#ItemQuantity").focus();
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                $("#ItemQuantity").keyup(function (){

                                    let text3=$("#ItemQuantity").val();
                                    if(ItemQuantityRegEx.test(text3)){
                                        $("#ItemQuantity").css('border', '2px solid green');
                                        $("#error3").text("Correct Format");
                                        $("#error3").css('color','green');

                                        $("#ItemQuantity").keydown(function (focusNextInput){

                                            if(focusNextInput.key=="Enter"){
                                                $("#ItemPrice").focus();
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                $("#ItemPrice").keyup(function (){

                                                    let text4=$("#ItemPrice").val();
                                                    if(ItemPriceRegEx.test(text4)){
                                                        $("#ItemPrice").css('border', '2px solid green');
                                                        $("#error4").text("Correct Format");
                                                        $("#error4").css('color','green');

                                                        $("#btnSave").removeAttr('disabled')

                                                    }else{
                                                        $("#ItemPrice").css('border', '2px solid red');
                                                        $("#error4").text("Entered Wrong Format");
                                                        $("#ItemPrice").focus();
                                                        $("#btnSave").attr("disabled", true);
                                                    }

                                                });

                                            }else {
                                                $("#ItemQuantity").focus();
                                            }
                                        });


                                    }else{
                                        $("#ItemQuantity").css('border', '2px solid red');
                                        $("#error3").text("Entered Wrong Format");
                                        $("#ItemQuantity").focus();
                                        $("#btnSave").attr("disabled", true);
                                    }

                                });

                            }
                            else{
                                $("#ItemName").focus();
                            }
                        });

                    }else {

                        $("#ItemName").css('border', '2px solid red');
                        $("#error2").text("Entered Wrong Format");
                        $("#ItemName").focus();
                        $("#btnSave").attr("disabled", true);
                    }
                });

            }else {
                $("#ItemId").focus();
            }
        });


    }else {
        $("#ItemId").css('border', '2px solid red');
        $("#error1").text("Entered Wrong Format. (I00-001)");
        $("#ItemId").focus();
        $("#btnSave").attr("disabled", true);
    }

});


////////////////////remove Validation///////////////////////////////////////

function removeValidation(){
    $("#error1,#error2,#error3,#error4").css('display','none');
};

///////////////////////////////////////////////////////////

///////////////////Search the details from array /////////////////////

function searchFomArrayItem(Code){
    let temp=-1;
    for (let i = 0; i <itemDB.length; i++) {
        if (itemDB[i].getItemCode()==Code){
            temp=i;
        }
    }
    return temp;
}

///////////////////////////Delete Customer////////////////////////////////
$("#ItemTableBody").dblclick(function (){
    let itemId=$(this);
    let index=searchFomArrayItem(itemId);
    if(index!=-1){
        itemDB.splice(index,1);
        LoadAllItem();
        alert("Item Details deleted.")
        return;
    }
});

/////////////////////////////////////////////////////////

//////////////////////////Search Function///////////////////////////////

$("#btnItemSearch").click(function (){

    var tempID= $("#searchInputItem").val();
    var out=searchFomArrayItem(tempID);

    if(out!=-1){
        alert("Item "+ tempID+ " Found ");

        $("#ItemId").val(itemDB[out].getItemCode());
        $("#ItemName").val(itemDB[out].getItemName());
        $("#ItemQuantity").val(itemDB[out].getItemQuantity());
        $("#ItemPrice").val(itemDB[out].getItemPrice());
        return;
    }else {
        alert("Item not found");
    }

});
