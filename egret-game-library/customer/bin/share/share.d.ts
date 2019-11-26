declare module share {
    class ShareConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_SHARE: string;
        /**邀请有礼界面 */
        static SHARE_INVITEDATA: string;
        /**领取奖励 */
        static SHARE_INVITEAWARD: string;
    }
}
declare module Cmd {
    function OnGetInviteInfoLittleGameLobbyCmd_S(rev: Cmd.GetInviteInfoLittleGameLobbyCmd_S): void;
    function OnGetInviteRewardLittleGameLobbyCmd_S(rev: Cmd.GetInviteRewardLittleGameLobbyCmd_S): void;
}
declare module share {
    class sharePanel extends eui.Component {
        /**一键领取 */
        private _getBtn;
        private _closeBtn;
        private _icon0;
        private _lab0;
        private _icon1;
        private _lab1;
        private _icon2;
        private _lab2;
        private _icon3;
        private _lab3;
        private _icon4;
        private _lab4;
        /**大礼包 */
        private _bigReawrd;
        /**领取状态 1：未邀请不可领 2：可领 3：今日已领取完*/
        private _rewardStatus;
        constructor();
        protected childrenCreated(): void;
        private destroy();
        private addEvent();
        private init(evt);
        private update(evt);
        private updateHead(data);
        private btnClick(evt);
        private clickShare(icon);
        /**领奖 */
        private getAward();
    }
}
