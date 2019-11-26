module match {

    /**
     * 添0操作
     */
    export function add0(num) {
        return num < 10 ? "0" + num : num;
    }

    /**
     * 格式化时间戳
     * @time 时间戳
     * @split 分隔符
     * @returns 1990-08-08 09:20
     */
    export function formatTime(time: number, split: string): string {
        let str = "";
        let date = new Date(time);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let mm = date.getMinutes();
        return y + split + add0(m) + split + add0(d) + " " + add0(h) + ':' + add0(mm);
    }

    /**
     * goodId转汉字
     */
    export function getDescByGoodId(goodId: number) {
        if (goodId == GoodType.TYPE_DIAMOND) {
            return "钻石";
        }
        else if (goodId == GoodType.TYPE_GOLD) {
            return "金币";
        }
        else if (goodId == GoodType.TYPE_FUKA) {
            return "福卡";
        }
    }

    /**判断道具是否足够 */
    export function judgeItemIsEnough(goodId: number, goodNum: number) {
        if (goodId == GoodType.TYPE_DIAMOND) {
            if (uniLib.UserInfo.chips < goodNum) {
                // LobbyModuleMgr.getInstance().showDiamondsPanel();
                LobbyModuleMgr.getInstance().showMarketPanel(0);
                uniLib.TipsUtils.showTipsDownToUp("钻石不足");
                return false;
            }
            else {
                return true;
            }
        }
        else if (goodId == GoodType.TYPE_GOLD) {
            if (uniLib.UserInfo.goldChips < goodNum) {
                let confirm = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, () => {
                    LobbyModuleMgr.getInstance().showMarketPanel(1);
                }, () => { }, this);
                uniLib.PopUpMgr.addPopUp(confirm, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                return false;
            }
            else {
                return true;
            }
        }
        else if (goodId == GoodType.TYPE_FUKA) {
            if (uniLib.UserInfo.giftCoupon < goodNum) {
                uniLib.TipsUtils.showTipsDownToUp("福卡不足");
                return false;
            }
            else {
                return true;
            }
        }
        else if (goodId == GoodType.TYPE_CARD) {
            if (uniLib.UserInfo.fangka < goodNum) {
                uniLib.TipsUtils.showTipsDownToUp("房卡不足");
                return false;
            }
            else {
                return true;
            }
        }
    }

}