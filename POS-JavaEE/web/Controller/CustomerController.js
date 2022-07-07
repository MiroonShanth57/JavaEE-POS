
removeValidation();

$("#save").click(function (){


    // gather Cus Information
    let cusID = $("#CusID").val();
    let cusName = $("#CusName").val();
    let cusAddress =$("#CusAddr").val();
    let cusSalary =$("#CusSala").val();

    ///////////////////////////////create obj//////////////////////////////////////////////

    let CustomerObject=new Customer(cusID,cusName,cusAddress,cusSalary);

    customerDB.push(CustomerObject);
    LoadAllCustomer();

    CustomerInputFieldsClear();
    SetTextToFieldsCustomer();

    /////////////////////////////////////////////////////////////////////////////

    $("#CustomerTableBody").dblclick(function (){
        (this).remove();
    });

});

/////////////////Update Customer/////////////////////////////////////
$("#update").click(function (){
    let index=searchFomArray(cusID);

    if (index!=-1){
        alert("Successfully Customer Details updated...");

        customerDB[index].setCustomerName(cusName);
        customerDB[index].setCustomerAddress(cusAddress);
        customerDB[index].setCustomerSalary(cusSalary);

        LoadAllCustomer();
        SetTextToFieldsCustomer();
        return;
    }
});
///////////////////////////////////////////////////////////

///////////////Clear Fields////////////////////

function CustomerInputFieldsClear(){
    $("#CusID").val('');
    $("#CusName").val('');
    $("#CusAddr").val('');
    $("#CusSala").val('');
}

/////////////////////////////////////////////

////////////////Load Customer From Array////////////////////////////

function LoadAllCustomer(){
    $("#CustomerTableBody").empty();

    for (let i = 0; i <customerDB.length; i++) {
        let CusID=customerDB[i].getCustomerID();
        let CusName=customerDB[i].getCustomerName();
        let CusAddress=customerDB[i].getCustomerAddress();
        let CusSalary=customerDB[i].getCustomerSalary();

        let row = `<tr><td>${CusID}</td><td>${CusName}</td><td>${CusAddress}</td><td>${CusSalary}</td></tr>`;
        $("#CustomerTableBody").append(row);
    }
};

/////////////////////////////////////////////////////

//////////////////Set the Customer details to the input fields///////////

function SetTextToFieldsCustomer(){
    $("#CustomerTableBody>tr").click(function (){
        let CusID=$(this).children(":eq(0)").text();
        let CusName=$(this).children(":eq(1)").text();
        let CusAddress=$(this).children(":eq(2)").text();
        let CusSalary=$(this).children(":eq(3)").text();

        $("#CusID").val(CusID);
        $("#CusName").val(CusName);
        $("#CusAddr").val(CusAddress);
        $("#CusSala").val(CusSalary);
    });
};

///////////////////////////////////////////////////////////

///////////////////Validation Part////////////////////////////////////////

var CusIDRegEx =/^(C00-)[0-9]{3,4}$/;
var CusNameRegEx =/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)$/;
var CusAddressRegEx =/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)$/;
var CusSalaryRegEx =/^(?:\d*\.)?\d+$/;
$("#save").attr("disabled", true);
$("#CusID").keyup(function (){

    let input =$("#CusID").val();
    if(CusIDRegEx.test(input)){
        $("#CusID").css('border', '2px solid green');
        $("#warning").text("Correct Format");
        $("#warning").css('color','green');

        $("#CusID").keydown(function (focusNextInput){

            if(focusNextInput.key=="Enter"){

                $("#CusName").focus();

//////////////////////////////////////////////////////////////////////////////////////////////////////////
                $("#CusName").keyup(function (){

                    let input2=$("#CusName").val();
                    if(CusNameRegEx.test(input2)){
                        $("#CusName").css('border', '2px solid green');
                        $("#warning2").text("Correct Format");
                        $("#warning2").css('color','green');

                        $("#CusName").keydown(function (focusNextInput){

                            if(focusNextInput.key=="Enter"){
                                $("#CusAddr").focus();
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                $("#CusAddr").keyup(function (){

                                    let input3=$("#CusAddr").val();
                                    if(CusAddressRegEx.test(input3)){
                                        $("#CusAddr").css('border', '2px solid green');
                                        $("#warning3").text("Correct Format");
                                        $("#warning3").css('color','green');

                                        $("#CusAddr").keydown(function (focusNextInput){

                                            if(focusNextInput.key=="Enter"){
                                                $("#CusSala").focus();
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                $("#CusSala").keyup(function (){

                                                    let input4=$("#CusSala").val();
                                                    if(CusSalaryRegEx.test(input4)){
                                                        $("#CusSala").css('border', '2px solid green');
                                                        $("#warning4").text("Correct Format");
                                                        $("#warning4").css('color','green');

                                                        $("#save").removeAttr('disabled')

                                                    }else{
                                                        $("#CusSala").css('border', '2px solid red');
                                                        $("#warning4").text("Entered Wrong Format");
                                                        $("#CusSala").focus();
                                                        $("#save").attr("disabled", true);
                                                    }

                                                });

                                            }else {
                                                $("#CusAddr").focus();
                                            }
                                        });


                                    }else{
                                        $("#CusAddr").css('border', '2px solid red');
                                        $("#warning3").text("Entered Wrong Format");
                                        $("#CusAddr").focus();
                                        $("#save").attr("disabled", true);
                                    }

                                });

                            }
                            else{
                                $("#CusName").focus();
                            }
                        });

                    }else {

                        $("#CusName").css('border', '2px solid red');
                        $("#warning2").text("Entered Wrong Format");
                        $("#CusName").focus();
                        $("#save").attr("disabled", true);
                    }
                });

            }else {
                $("#CusID").focus();
            }
        });


    }else {
        $("#CusID").css('border', '2px solid red');
        $("#warning").text("Entered Wrong Format. (C00-001)");
        $("#CusID").focus();
        $("#save").attr("disabled", true);
    }

});


////////////////////remove Validation///////////////////////////////////////

function removeValidation(){
    $("#warning,#warning2,#warning3,#warning4").css('display','none');
};

///////////////////////////////////////////////////////////

///////////////////Search the details from array /////////////////////

function searchFomArray(Id){
    let temp=-1;
    for (let i = 0; i <customerDB.length; i++) {
        if (customerDB[i].getCustomerID()==Id){
                temp=i;
        }
    }
    return temp;
}

///////////////////////////Delete Customer////////////////////////////////
$("#CustomerTableBody").dblclick(function (){
    let cusId=$(this);
    let index=searchFomArray(cusId);
    if(index!=-1){
        customerDB.splice(index,1);
        LoadAllCustomer();
        alert("Customer Details deleted.")
        return;
    }
});

/////////////////////////////////////////////////////////

//////////////////////////Search Function///////////////////////////////

$("#btnSearch").click(function (){

    var tempID= $("#searchInputCus").val();
    var out=searchFomArray(tempID);

    if(out!=-1){
        alert("Customer "+ tempID+ " Found ");

        $("#CusID").val(customerDB[out].getCustomerID());
        $("#CusName").val(customerDB[out].getCustomerName());
        $("#CusAddr").val(customerDB[out].getCustomerAddress());
        $("#CusSala").val(customerDB[out].getCustomerSalary());
        return;
    }else {
        alert("Customer not found");
    }

});
