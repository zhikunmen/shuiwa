module club {

    /**导入成员 玩家ITem */
    export class ClubPartnerImportItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg: eui.Image;
        /**昵称 */
        private _nameText: eui.Label;
        /**ID */
        private _idText: eui.Label;
        /** 选中图标*/
        private _selectImg: eui.Image;
        /**玩家数据 */
        private _info: Cmd.MatchGroupMemberInfo;

        constructor() {
            super();
            this.skinName = "ClubPartnerImportItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected dataChanged(): void {
            this._info = this.data;
            this._headImg.source = this._info.headUrl;
            this._nameText.text = this._info.nickname;
            this._idText.text = "" + this._info.uid;
            if (ClubData.getInstance().PartnerImportUidList.indexOf(this._info.uid) != -1) {
                this._selectImg.visible = true;
            } else {
                this._selectImg.visible = false;
            }
        }

    }
}