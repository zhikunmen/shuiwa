/**合作群 成员战绩item */
module club {
    export class ClubPartnerMemberRecordItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg: eui.Image;
        /**昵称 */
        private _nameText: eui.Label;
        /**id */
        private _uidText: eui.Label;
        /** 总房间*/
        private _roomNumText: eui.Label;
        /** 大赢家*/
        private _bigWinText: eui.Label;
        /** 战绩*/
        private _recordText: eui.Label;
        /** 详情按钮*/
        private _detailBtn: eui.Button;
        /** 删除按钮*/
        private _deleteBtn: eui.Button;
        /**置灰按钮 */
        private _removeImg: eui.Image;
        private _info: Cmd.PartnerMemberRecordInfo;

        constructor() {
            super();
            this.skinName = "ClubPartnerMemberRecordItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addListener();
        }

        private addListener() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        private removeListener() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this._removeImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected dataChanged(): void {
            this._info = this.data;
            this._headImg.source = this._info.member.headUrl;
            this._nameText.text = this._info.member.nickname;
            this._uidText.text = "ID:" + this._info.member.uid;
            this._roomNumText.text = "" + this._info.roomNbrs[ClubData.getInstance().clubDayChose - 1];
            this._bigWinText.text = "" + this._info.winNbrs[ClubData.getInstance().clubDayChose - 1];
            this._recordText.text = "" + this._info.scores[ClubData.getInstance().clubDayChose - 1];
            if (this._info.member.partnerState && this._info.member.partnerState == 1) {
                this._removeImg.visible = true;
                this._removeImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
                this._deleteBtn.visible = false;
            } else {
                this._removeImg.visible = false;
                this._deleteBtn.visible = true;
            }
            if (this._info.member.uid == uniLib.UserInfo.uid) {
                this._deleteBtn.visible = false;
            }
        }

        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._deleteBtn:
                    ClubModuleMgr.getInstance().showClubPartnerRemoveMemberPanel(this._info.member);
                    break;
                case this._detailBtn:
                    ClubModuleMgr.getInstance().showClubPartnerRecordDetailPanel(this._info.member);
                    break;
                case this._removeImg:
                    uniLib.TipsUtils.showTipsDownToUp("此成员已踢出，记录保留24小时！");
                    break;
            }
        }

    }
}
