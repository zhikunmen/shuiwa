declare module message {
    class EmailVC extends eui.Component {
        private _closeBtn;
        private _getBtn;
        private _prizeTxt;
        private _msgTxt;
        private _fromTxt;
        private _timeTxt;
        private data;
        private _scroll;
        private _group;
        private listX;
        constructor();
        protected childrenCreated(): void;
        initData(data: Cmd.MailInfo): void;
        private initTime(time);
        private addEvent();
        private getPrize();
        private closeEmail();
        private removeEvent();
        destroy(): void;
    }
}
declare module message {
    class FriendItem extends eui.ItemRenderer {
        private _head;
        private _nickName;
        private _msg;
        private _typeTxt;
        private _getBtn;
        private _noGet;
        private mailData;
        constructor();
        private addEvent();
        private getPrize();
        protected dataChanged(): void;
        private removeEvent();
        destroy(): void;
    }
}
declare module message {
    class MainVC extends eui.Component {
        private _closeBtn;
        private _friendPanel;
        private _sysPanel;
        private _friendBtn;
        private _sysBtn;
        private _lookBtn;
        private _getBtn;
        private _sysTxt;
        private _friendTxt;
        private _friendScroll;
        private _sysScroll;
        private _friendList;
        private _sysList;
        private _friendData;
        private _sysData;
        private _noMail;
        private mailType;
        constructor();
        protected childrenCreated(): void;
        private sendReq();
        private init();
        private addEvent();
        private showFriend();
        private showSys();
        private setMail(evt);
        private mailHandle();
        private closeEmail();
        private removeEvent();
        destroy(): void;
    }
}
declare module message {
    class MessageConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_MESSAGE: string;
        static GET_MAILLIST: string;
        static REMOVE_ALL_MAIL: string;
        static GET_PRIZE: string;
    }
}
declare module message {
    class PrizeItem extends eui.Component {
        private _type;
        private _numTxt;
        constructor();
        protected childrenCreated(): void;
        initData(data: Cmd.Attachment): void;
        destroy(): void;
    }
}
declare module message {
    class SysItem extends eui.ItemRenderer {
        private _type;
        private _titleTxt;
        private _msg;
        private _timeTxt;
        private _getBtn;
        private _lookBtn;
        private mailData;
        constructor();
        private addEvent();
        private getPrize();
        private openEmail();
        protected dataChanged(): void;
        private changeHour(time);
        private removeEvent();
        destroy(): void;
    }
}
/**
 * 消息接收
 */
declare module Cmd {
    function OnGetListMailCmd_S(rev: Cmd.GetListMailCmd_S): void;
    function OnBulkOperationMailCmd_S(rev: Cmd.BulkOperationMailCmd_S): void;
    function OnGetMailRewardCmd_S(rev: Cmd.GetMailRewardCmd_S): void;
    function OnDeleteMailCmd_S(rev: Cmd.DeleteMailCmd_S): void;
}
