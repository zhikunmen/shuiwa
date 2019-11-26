declare module redpackets {
    class RedPacketsConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_REDPACKETS: string;
        /**邀请有礼界面 */
        static SHARE_INVITEDATA: string;
        /**领取奖励 */
        static SHARE_INVITEAWARD: string;
        /**不可以领取邀请奖励通知 */
        static NOTCAN_GETINVITE: string;
    }
    /**
     * 打包成app之后的分享 不支持分享图片
     * @shareType 分享类型
     * @state 跳转公众号需要携带的参数 多个参数以_分割 发送给平台的参数
     * @extData 发送给服务器的扩展字段 json字符串
     * @roomId 房间号id
     * @title 标题
     * @description 描述
     * @callBack 分享回调
     * @callObj 回调函数域
     * @shareWay 0好友 1 朋友圈 默认为好友
     */
    function shareNativeMessage(shareType: Cmd.ShareType, roomId?: number, state?: string, extData?: string, title?: string, description?: string, callBack?: Function, callObj?: any, shareWay?: number): void;
}
declare module Cmd {
    function OnGetInviteInfoLittleGameLobbyCmd_S(rev: Cmd.GetInviteInfoLittleGameLobbyCmd_S): void;
    function OnGetInviteRewardLittleGameLobbyCmd_S(rev: Cmd.GetInviteRewardLittleGameLobbyCmd_S): void;
}
declare module redpackets {
    /**现金红包 */
    class RedPacketsPanel extends eui.Component {
        /**邀请按钮 */
        btn_0: eui.Button;
        btn_1: eui.Button;
        btn_2: eui.Button;
        /**规则提示 */
        tips_lbl: eui.Label;
        /**数据 */
        private _inviteInfo;
        /**判断是否还有未领取奖励 */
        private _isHaveAward;
        constructor();
        protected childrenCreated(): void;
        destroy(): void;
        private addEvent();
        /**初次导入数据 */
        private init(evt);
        /**更新数据，领奖 */
        private update(evt);
        /**更新数据 */
        private updateHead();
        /**蒙版 */
        private setPlayerIconMask(image);
        private btnClick(evt);
        /**分享操作 */
        private clickShare();
    }
}
