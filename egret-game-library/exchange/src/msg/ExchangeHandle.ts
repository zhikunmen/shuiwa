module Cmd {
    //兑换礼品券记录个人信息
    export function OnExchangeGiftVoucherRecordUserInfoLobby_S(rev: Cmd.ExchangeGiftVoucherRecordUserInfoLobby_S) {
        if (rev.resultCode == 0) {
            uniLib.Global.dispatchEvent(exchange.ExchangeConst.EXCHANGE_FARE, rev);
            wxgame.Global.instance.aldSendEvent("周边系统", "兑换话费shopId" + rev.shopId + "成功");
        }
    }
    //兑换话费信息
    export function OnGetExchangeGiftVoucherInfo_S(rev: Cmd.GetExchangeGiftVoucherInfo_S) {
        uniLib.Global.dispatchEvent(exchange.ExchangeConst.FARE_INFO, rev);
    }

    /**商城购买相关 埋点*/
    export function OnBuyGoodsLobbyCmd_S(rev: Cmd.BuyGoodsLobbyCmd_S) {
        if (!rev.resultCode) {
            wxgame.Global.instance.aldSendEvent("周边系统", "兑换钻石shopId" + rev.shopId + "成功");
        }
    }

    /**
     * 提现到公众号
     */
    export function OnOpenRedPackLobbyCmd_S(rev: Cmd.OpenRedPackLobbyCmd_S) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(exchange.ExchangeConst.DRAW_INFO, rev);
        }
    }
}