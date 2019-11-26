declare module rankList {
    class ListItem extends eui.ItemRenderer {
        private _head;
        private _rankTxt;
        private _rankImg;
        private rankData;
        constructor();
        protected dataChanged(): void;
        destroy(): void;
    }
}
declare module rankList {
    class ListVC extends eui.Component {
        private _rankGroup;
        private subscribe_btn;
        private _rankScroll;
        private _rankList;
        private _rankData;
        private myData;
        private rankVC;
        constructor();
        protected childrenCreated(): void;
        private sendReq();
        private init();
        private addEvent();
        private showRank();
        private setRank(evt);
        private subscribeHandle();
        private removeEvent();
        destroy(): void;
    }
}
declare module rankList {
    class RankConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共排行榜需要加载的资源组
         */
        static PUB_MESSAGE: string;
        /**
         * 收藏需要加载的资源组
         */
        static LB_SUBSCRIBE: string;
        /**
         * 排行榜数据
         */
        static RANK_DATA: string;
        /**
         * 捕鱼收藏需要加载的资源组
         */
        static BUYU_SUBSCRIBE: string;
    }
}
declare module Cmd {
    function OnGetRankListLobbyCmd_S(rev: Cmd.GetRankListLobbyCmd_S): void;
}
declare module rankList {
    class RankItem extends eui.ItemRenderer {
        type_img: eui.Image;
        head_img: eui.Image;
        _rankTxt: eui.BitmapLabel;
        nickName_lbl: eui.Label;
        num_lbl: eui.Label;
        constructor();
        protected dataChanged(): void;
        destroy(): void;
    }
}
declare module rankList {
    class RankVC extends eui.Component {
        goldPig_btn: eui.Group;
        _friendBg: eui.Image;
        _friendBtn: eui.Image;
        silverPig_btn: eui.Group;
        _groupBg: eui.Image;
        _closeBtn: eui.WxButton;
        rank_img: eui.Image;
        head_img: eui.Image;
        type_img: eui.Image;
        rank_blbl: eui.BitmapLabel;
        nickName_lbl: eui.Label;
        num_lbl: eui.Label;
        _rankList: eui.List;
        private _arrColl;
        /**金猪 银猪排行数据 */
        private _goldData;
        private _silverData;
        private _type;
        constructor(type?: number);
        protected childrenCreated(): void;
        private addEvent();
        private getData(type);
        private onTouch(evt);
        private getWorld(evt);
        private setView(data);
        private removeSelf();
        private onItemTap();
        private removeEvent();
        destroy(): void;
    }
}
declare module rankList {
    /**
     * 收藏
     */
    class WxSubscribe extends eui.Component {
        close_btn: eui.WxButton;
        private skins;
        constructor(type?: number);
        childrenCreated(): void;
        destroy(): void;
    }
}
