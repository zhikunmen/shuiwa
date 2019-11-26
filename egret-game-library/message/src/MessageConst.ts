module message {

	export class MessageConst {

		public static RES_JSON = "resource/message.res.json";

		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 公共loading需要加载的资源组
		 */
		public static PUB_MESSAGE: string = "pub_message";
		//请求邮件列表
		public static GET_MAILLIST = "Get_MailList";
		//删除全部邮件
		public static REMOVE_ALL_MAIL = "REMOVE_ALL_MAIL";
		//领取奖励
		public static GET_PRIZE = "GET_PRIZE";
	}
}