declare module commonConfirm {
    class ConfirmConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共confirm需要加载的资源组
         */
        static PUB_CONFIRM: string;
    }
}
declare module commonConfirm {
    class ConfirmPanel extends eui.Component {
        title_img: eui.Image;
        confirm_btn: eui.WxButton;
        cancel_btn: eui.WxButton;
        confirm_lbl: eui.Label;
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
        constructor($data: commonConfirm.ReWardDataVo);
        protected partAdded(partName: string, instance: any): void;
        protected childrenCreated(): void;
        private initData(vo);
        /**麻将大厅货币规格 */
        numberFormat(num: any): string;
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
        constructor(data?: commonConfirm.ReWardDataVo[]);
        protected childrenCreated(): void;
        initData(data?: commonConfirm.ReWardDataVo[]): void;
        private onSureHandle(e);
    }
}
