module commonConfirm {

	export class ConfirmConsts {

		public static RES_JSON = "resource/confirm.res.json";

		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 公共confirm需要加载的资源组
		 */
		public static PUB_CONFIRM: string = "pub_confirm";
	}

	/**面板关闭事件 动画用*/
	export var EVENT_PANEL_CLOSE = "event_panel_close";

	/**打开面板事件  动画用*/
	export var EVENT_PANEL_OPEN = "event_panel_open";

	/**面板动画播放完毕  动画用*/
	export var EVENT_PANEL_OVER = "event_panel_over";
}