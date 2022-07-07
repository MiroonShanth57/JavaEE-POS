function Customer(Id,Name,Address,Salary){
    var __CusID=Id;
    var __CusName=Name;
    var __CusAddress=Address;
    var __CusSalary=Salary;

    this.getCustomerID=function (){
        return __CusID;
    }

    this.setCustomerID=function (Id){
        __CusID=Id;
    }

//    ////////////////////

    this.getCustomerName=function (){
        return __CusName;
    }

    this.setCustomerName=function (Name){
        __CusName=Name;
    }

//    ////////////////////////

    this.getCustomerAddress=function (){
        return __CusAddress;
    }

    this.setCustomerAddress=function (Address){
        __CusAddress=Address;
    }

//    ////////////////////////

    this.getCustomerSalary=function (){
        return __CusSalary;
    }

    this.setCustomerSalary=function (Salary){
        __CusSalary=Salary;
    }

}