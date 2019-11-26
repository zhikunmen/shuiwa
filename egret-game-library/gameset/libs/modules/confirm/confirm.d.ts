declare module commonConfirm {
    class ConfirmConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共confirm需要加载的资源组
         */
        static PUB_CONFIRM: string;
    }
    /**面板关闭事件 动画用*/
    var EVENT_PANEL_CLOSE: string;
    /**打开面板事件  动画用*/
    var EVENT_PANEL_OPEN: string;
    /**面板动画播放完毕  动画用*/
    var EVENT_PANEL_OVER: string;
}
declare module commonConfirm {
    class ConfirmPanel extends eui.Component {
        title_img: eui.Image;
        okButton: eui.WxButton;
        cacelButton: eui.WxButton;
        contentText: eui.Label;
        title_lbl: eui.Label;
        private _title;
        private _btnRes;
        private _content;
        private _callback1;
        private _callback2;
        private _callObj;
        /**
       * titleUrl 确认框标题 传个资源名或文字
       * btnUrl 自定义的按钮皮肤 传个资源名
       * text 确认框内容
       * callback1 确定按钮回调函数
       * callback2 取消按钮回调函数
       */
        constructor(content: string | Array<egret.ITextElement>, title?: string, btnRes?: string[], callback1?: Function, callback2?: Function, callObj?: any);
        childrenCreated(): void;
        private touchHandle(e);
        destroy(): void;
    }
}
declare module commonConfirm {
    class ResUtil {
        static numFormat(num: number): string;
        /**获取JavaScript类型 */
        static getType(o: any): any;
        static limitImageSize(img: egret.DisplayObject, maxH: number): void;
    }
}
declare module commonConfirm {
    class ReWardDataVo {
        icon: string;
        num: number;
        des: any;
        /**
         * shopId
         */
        getDataByShopId(shopId: number, shopNum?: number): void;
        /**
         * goodId
         */
        getDataByGoodId(goodId: number, shopNum?: number): void;
    }
}
declare module commonConfirm {
    class RewardItem extends eui.Component implements eui.UIComponent {
        private _data;
        private giftIcon_img;
        private giftName_lb;
        constructor($data: any);
        protected partAdded(partName: string, instance: any): void;
        protected childrenCreated(): void;
        private initData(vo);
    }
}
declare module commonConfirm {
    class RewardItem2 extends eui.Component implements eui.UIComponent {
        private _data;
        private giftIcon_img;
        private giftName_lb;
        constructor($data: any);
        protected partAdded(partName: string, instance: any): void;
        protected childrenCreated(): void;
        private initData(vo);
    }
}
declare module commonConfirm {
    class RewardPanel extends eui.Component {
        private guangquan;
        private light;
        private quan1;
        private quan2;
        private image;
        private sure_btn;
        private item_grp;
        private _data;
        private _isCmd;
        constructor(data?: commonConfirm.ReWardDataVo[]);
        protected childrenCreated(): void;
        initData(data?: commonConfirm.ReWardDataVo[]): void;
        initData2(data?: Cmd.RewardItem[]): void;
        private onSureHandle(e);
    }
}
declare module eui {
    /**
     * 通用基础控件
     */
    class ArmatureComponent extends eui.Component {
        resName: string;
        ncName: string;
        mcType: string;
        center: boolean;
        private _armature;
        constructor();
        protected childrenCreated(): void;
        private onRemoveFromStage(evt);
        update(): void;
        destroy(): void;
    }
}
declare module eui {
    class WxButton extends eui.Button {
        constructor();
        private colorMatrix;
        private isFilter;
        protected childrenCreated(): void;
        private init();
        protected removeTouchEvent(): void;
        protected onTouchBegin(evt: egret.TouchEvent): void;
        protected onTouchEnd(): void;
        protected onTouchCancel(evt: egret.TouchEvent): void;
        protected onTouchMove(): void;
        protected onTouchReleaseOutside(): void;
        setColorMatrix(matrix?: number[]): void;
        dispose(): void;
    }
}
