var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var customer;
(function (customer) {
    var customerConst = (function () {
        function customerConst() {
        }
        customerConst.RES_JSON = "resource/customer.res.json";
        customerConst.RESLY_JSON = "resource/customer_ly.res.json";
        customerConst.RESGD_JSON = "resource/customer/customer_gd.res_c0e3ff32.json";
        customerConst.THM_JSON = "resource/customer/gameEui_e69eb8fe.json";
        /**
         * 公共loading需要加载的资源组
         */
        customerConst.PUB_CUSTOMER = "pub_customer";
        return customerConst;
    }());
    customer.customerConst = customerConst;
    __reflect(customerConst.prototype, "customer.customerConst");
})(customer || (customer = {}));
var customer;
(function (customer) {
    var customerPanel = (function (_super) {
        __extends(customerPanel, _super);
        function customerPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "LobbyCustomerlSkin";
            return _this;
        }
        customerPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
            this.addEvent();
        };
        customerPanel.prototype.addEvent = function () {
            var _this = this;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                uniLib.PopUpMgr.removePopUp(_this);
            }, this);
        };
        customerPanel.prototype.destroy = function () {
            var _this = this;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                uniLib.PopUpMgr.removePopUp(_this);
            }, this);
        };
        return customerPanel;
    }(eui.Component));
    customer.customerPanel = customerPanel;
    __reflect(customerPanel.prototype, "customer.customerPanel");
})(customer || (customer = {}));
