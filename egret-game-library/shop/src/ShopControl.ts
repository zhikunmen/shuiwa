module shop {
    export class ShopControl {

        public static checkSession(data: table.TableShopConfig, extObj?: Object): void {
            if (!uniLib.Global.isWxGame()) {
                let extStr: string;
                if (extObj) {
                    extStr = JSON.stringify(extObj);
                }
                this.createOrder(data, extStr);
            }
            else {
                wx.login({
                    success: (res) => {
                        if (extObj) {
                            extObj["code"] = res.code;
                            this.createOrder(data, JSON.stringify(extObj));
                        }
                        else {
                            this.createOrder(data, JSON.stringify({ code: res.code }));
                        }
                    },
                    fail: () => {
                        console.log("wx.login失败");
                    }
                });
            }
        }

        /**
	 * 下订单
	 */
        private static createOrder(data: table.TableShopConfig, extData?: string): void {

            var msg: Pmd.CreatePlatOrderRequestSdkPmd_C = new Pmd.CreatePlatOrderRequestSdkPmd_C();
            msg.roleid = Number(NetMgr.UID);
            msg.rolename = "";
            msg.originalmoney = data.price / 100;
            msg.ordermoney = data.price / 100;
            msg.goodid = data.shopId;
            msg.goodnum = 1;
            let good: table.TableGoodsConfig = ConfigMgr.getInstance().getGoodCfgById(data.shopGoods.goodId);
            msg.goodname = good.goodName;
            msg.gooddesc = good.goodName;
            msg.redirecturl = uniLib.BrowersUtils.getLocationUrl();
            if (extData)
                msg.extdata = extData;
            else
                msg.extdata = "";
            if (uniLib.Global.isNative && uniLib.Utils.isIOS && uniLib.Global.is_sandbox == 1) {
                msg.payplatid = 17;//苹果内购
            }
            else {
                msg.payplatid = uniLib.Global.payPlatId;
            }
            // uniLib.UIMgr.instance.showLoadingTimeout(LoadSecondPanel, "recharge");
            // LobbyResUtil.trace(JSON.stringify(msg));
            NetMgr.tcpSend(msg);
        }
    }
}