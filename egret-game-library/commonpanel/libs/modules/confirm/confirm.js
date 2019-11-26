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
var commonConfirm;
(function (commonConfirm) {
    var ConfirmConsts = (function () {
        function ConfirmConsts() {
        }
        ConfirmConsts.RES_JSON = "resource/confirm/confirm.res_a001e2d6.json";
        ConfirmConsts.THM_JSON = "resource/confirm/gameEui_a392ec2a.json";
        /**
         * 公共confirm需要加载的资源组
         */
        ConfirmConsts.PUB_CONFIRM = "pub_confirm";
        return ConfirmConsts;
    }());
    commonConfirm.ConfirmConsts = ConfirmConsts;
    __reflect(ConfirmConsts.prototype, "commonConfirm.ConfirmConsts");
})(commonConfirm || (commonConfirm = {}));
var commonConfirm;
(function (commonConfirm) {
    var ConfirmPanel = (function (_super) {
        __extends(ConfirmPanel, _super);
        /**
       * titleUrl 确认框标题 传个资源名或文字
       * btnUrl 自定义的按钮皮肤 传个资源名
       * text 确认框内容
       * callback1 确定按钮回调函数
       * callback2 取消按钮回调函数
       */
        function ConfirmPanel(content, title, btnRes, callback1, callback2, callObj) {
            var _this = _super.call(this) || this;
            _this._content = content;
            _this._title = title;
            _this._btnRes = btnRes;
            _this._callback1 = callback1;
            _this._callback2 = callback2;
            _this._callObj = callObj;
            _this.skinName = "ConfirmPanelSkin";
            return _this;
        }
        ConfirmPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
            if (this._title) {
                if (RES.hasRes(this._title)) {
                    this.title_lbl.visible = false;
                    this.title_img.source = this._title;
                }
                else {
                    this.title_img.visible = false;
                    this.title_lbl.text = this._title;
                }
            }
            if (this._btnRes) {
                this.confirm_btn.skin["img"].source = this._btnRes[0];
                if (this._btnRes[1])
                    this.cancel_btn.skin["img"].source = this._btnRes[1];
            }
            if (this._content.length && Object.prototype.toString.call(this._content).toLowerCase() == "[object array]") {
                this.confirm_lbl.textFlow = this._content;
            }
            else {
                this.confirm_lbl.text = this._content + '';
            }
            if (this._callback2) {
                this.cancel_btn.visible = true;
                this.confirm_btn.horizontalCenter = -150;
            }
            else {
                this.cancel_btn.visible = false;
                this.confirm_btn.horizontalCenter = 0;
            }
        };
        ConfirmPanel.prototype.touchHandle = function (e) {
            var target = e.target;
            switch (target) {
                case this.confirm_btn:
                    uniLib.PopUpMgr.removePopUp(this);
                    this._callback1 && this._callback1.apply(this._callObj, []);
                    break;
                case this.cancel_btn:
                    uniLib.PopUpMgr.removePopUp(this);
                    this._callback2 && this._callback2.apply(this._callObj, []);
                    break;
            }
        };
        ConfirmPanel.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
            this._content = null;
            this._title = null;
            this._btnRes = null;
            this._callback1 = null;
            this._callback2 = null;
            this._callObj = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return ConfirmPanel;
    }(eui.Component));
    commonConfirm.ConfirmPanel = ConfirmPanel;
    __reflect(ConfirmPanel.prototype, "commonConfirm.ConfirmPanel");
})(commonConfirm || (commonConfirm = {}));
var commonConfirm;
(function (commonConfirm) {
    var ReWardDataVo = (function () {
        function ReWardDataVo() {
        }
        /**
         * shopId
         */
        ReWardDataVo.prototype.getDataByShopId = function (shopId, shopNum) {
            if (shopNum === void 0) { shopNum = 1; }
            this.num = 0;
            var goodId = ConfigMgr.getInstance().getShopCfgById(shopId).shopGoods.goodId;
            var reward = ConfigMgr.getInstance().getGoodCfgById(goodId);
            console.log(reward);
            this.icon = reward.goodIcon + "+_png";
            this.des = reward.goodDesc;
        };
        /**
         * goodId
         */
        ReWardDataVo.prototype.getDataByGoodId = function (goodId, shopNum) {
            if (shopNum === void 0) { shopNum = 1; }
            this.num = 0;
            var reward = ConfigMgr.getInstance().getGoodCfgById(goodId);
            console.log(reward);
            this.icon = reward.goodIcon + "+_png";
            this.des = reward.goodDesc;
        };
        return ReWardDataVo;
    }());
    commonConfirm.ReWardDataVo = ReWardDataVo;
    __reflect(ReWardDataVo.prototype, "commonConfirm.ReWardDataVo");
})(commonConfirm || (commonConfirm = {}));
var commonConfirm;
(function (commonConfirm) {
    var RewardItem = (function (_super) {
        __extends(RewardItem, _super);
        function RewardItem($data) {
            var _this = _super.call(this) || this;
            _this._data = $data;
            _this.skinName = "RewardItemSkin";
            return _this;
        }
        RewardItem.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        RewardItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initData(this._data);
        };
        RewardItem.prototype.initData = function (vo) {
            this.giftIcon_img.source = vo.icon;
            if (vo.num) {
                this.giftName_lb.text = this.numberFormat(vo.num) + vo.des;
            }
            else {
                // this.giftName_lb.text = vo.des;
                if (Array.isArray(vo.des)) {
                    this.giftName_lb.textFlow = vo.des;
                }
                else {
                    this.giftName_lb.text = vo.des;
                }
            }
        };
        /**麻将大厅货币规格 */
        RewardItem.prototype.numberFormat = function (num) {
            var str;
            if (num < 1e5) {
                str = "" + num;
            }
            else if (num >= 1e5 && num < 1e6) {
                str = (num / 1e4).toFixed(2) + "万";
            }
            else if (num >= 1e6 && num < 1e7) {
                str = (num / 1e4).toFixed(1) + "万";
            }
            else if (num >= 1e7 && num < 1e8) {
                str = (num / 1e4).toFixed(0) + "万";
            }
            else if (num >= 1e8 && num < 1e10) {
                str = (num / 1e8).toFixed(2) + "亿";
            }
            else {
                str = (num / 1e8).toFixed(0) + "亿";
            }
            return str;
        };
        return RewardItem;
    }(eui.Component));
    commonConfirm.RewardItem = RewardItem;
    __reflect(RewardItem.prototype, "commonConfirm.RewardItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(commonConfirm || (commonConfirm = {}));
var commonConfirm;
(function (commonConfirm) {
    var RewardPanel = (function (_super) {
        __extends(RewardPanel, _super);
        function RewardPanel(data) {
            var _this = _super.call(this) || this;
            _this._data = data;
            _this.skinName = "RewardPanelSkin";
            return _this;
        }
        RewardPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initData();
            this.sure_btn.once(egret.TouchEvent.TOUCH_TAP, this.onSureHandle, this);
            this.quan1.visible = true;
            this.quan2.visible = true;
            this.item_grp.touchEnabled = false;
            this.item_grp.touchChildren = false;
            uniLib.DisplayUtils.playTweenGroup(this.guangquan, false);
            uniLib.DisplayUtils.playTweenGroup(this.light, true);
        };
        RewardPanel.prototype.initData = function (data) {
            if (data) {
                this._data = data;
            }
            if (this._data) {
                for (var i = 0; i < this._data.length; i++) {
                    var item = new commonConfirm.RewardItem(this._data[i]);
                    this.item_grp.addChild(item);
                    item.x = i * 100;
                }
            }
        };
        RewardPanel.prototype.onSureHandle = function (e) {
            uniLib.DisplayUtils.stopTweenGroup(this.guangquan);
            uniLib.DisplayUtils.stopTweenGroup(this.light);
            egret.Tween.removeTweens(this.guangquan);
            egret.Tween.removeTweens(this.light);
            uniLib.PopUpMgr.removePopUp(this);
        };
        return RewardPanel;
    }(eui.Component));
    commonConfirm.RewardPanel = RewardPanel;
    __reflect(RewardPanel.prototype, "commonConfirm.RewardPanel");
})(commonConfirm || (commonConfirm = {}));
