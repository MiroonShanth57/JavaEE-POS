function Order(OId,ODate,CId,OAmount) {
    var __OrderId = OId;
    var __OrderDate = ODate;
    var __OrderCusId = CId;
    var __OrderAmount = OAmount;

    this.getOrderID = function () {
        return __OrderId;
    }

    this.setOrderID = function (OId) {
        __OrderId = OId;
    }

//    //////////////////////

    this.getOrderDate = function () {
        return __OrderDate;
    }

    this.setOrderDate = function (ODate) {
        __OrderDate = ODate;
    }

//    //////////////////////

    this.getCusID = function () {
        return __OrderCusId;
    }

    this.setCusID = function (CId) {
        __OrderCusId = CId;
    }

//    //////////////////////

    this.getOrderAmount = function () {
        return __OrderAmount;
    }

    this.setOrderAmount = function (OAmount) {
        __OrderAmount = OAmount;
    }

//    //////////////////////
}