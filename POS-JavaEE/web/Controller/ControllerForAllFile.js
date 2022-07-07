
<!--    non-->
document.getElementById("ItemPage").style.display="none";
document.getElementById("OrderPage").style.display="none";
//------------------------------------1st btn
document.getElementById("HomeBtn").addEventListener("click",function () {
    document.getElementById("ItemPage").style.display="none";
    document.getElementById("OrderPage").style.display="none";
    document.getElementById("CustomerPage").style.display="block";
});
//--------------------------------------2nd btn
document.getElementById("ItemBtn").addEventListener("click",function () {
    document.getElementById("ItemPage").style.display="block";
    document.getElementById("OrderPage").style.display="none";
    document.getElementById("CustomerPage").style.display="none";
});
// -------------------------------------3rd btn
document.getElementById("OrderBtn").addEventListener("click",function () {
    document.getElementById("ItemPage").style.display="none";
    document.getElementById("OrderPage").style.display="block";
    document.getElementById("CustomerPage").style.display="none";
});