declare module joinroom {
    /**
     * 单个历史记录
     */
    class HistroyJoinRecordItem extends eui.ItemRenderer {
        private roomInfo;
        private detailsBtn;
        private joinBtn;
        private _boo;
        constructor();
        protected dataChanged(): void;
        private showInfo();
        private clickHandle(e);
    }
}
declare module joinroom {
    class InputKeyItem extends eui.Button {
        private _inputTxt;
        private _value;
        constructor();
        initUI(): void;
        value: number;
        destory(): void;
    }
}
declare module joinroom {
    class InputNumItem extends egret.DisplayObjectContainer {
        private _inputTxt;
        private _value;
        constructor();
        initUI(): void;
        value: number;
        delete(): void;
    }
}
declare module joinroom {
    class JoinRoomConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_JOINROOM: string;
    }
}
declare module joinroom {
    /**
     * 进入房间面板
     */
    class JoinRoomPanel extends commonpanel.LobbyBaseEuiPanel {
        private _inputNArr;
        private _curIndex;
        private _keyArr;
        private inputKeyGroup;
        private inputNumberGroup;
        private historyBtn;
        private historyGroup;
        private joinGroup;
        /**历史加入 */
        private _recordList;
        /**历史加入 */
        private recordList;
        /**未加入info */
        private neverInfo;
        /**是老友圈加入房间还是普通房间  1：老友圈 2：普通房间*/
        constructor();
        destroy(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        setData(evt: uniLib.ZqEvent): void;
        private reqMatchRecord(e);
        private onInput(e);
        private reset();
        private removeOneNum();
        private addNun(num);
        private joinRoom();
    }
}
