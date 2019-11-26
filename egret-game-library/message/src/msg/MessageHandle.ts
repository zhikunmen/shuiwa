/**
 * 消息接收
 */
module Cmd {
	//请求邮件列表
	export function OnGetListMailCmd_S(rev: Cmd.GetListMailCmd_S) {
		if (rev.resultCode == 0) {
			uniLib.Global.dispatchEvent(message.MessageConst.GET_MAILLIST, rev);
		}
	}
	//处理全部邮件
	export function OnBulkOperationMailCmd_S(rev: Cmd.BulkOperationMailCmd_S) {
		if (rev.resultCode == 0) {
			if (rev.opType == 1) {
				//领取奖励
				uniLib.Global.dispatchEvent(message.MessageConst.GET_PRIZE, rev);
			} else {
				//删除邮件
				uniLib.Global.dispatchEvent(message.MessageConst.REMOVE_ALL_MAIL, rev);
			}
		}
	}
	//领取奖励
	export function OnGetMailRewardCmd_S(rev: Cmd.GetMailRewardCmd_S) {
		if (rev.resultCode == 0) {
			uniLib.Global.dispatchEvent(message.MessageConst.GET_PRIZE, rev);
		}
	}
	//删除邮件
	export function OnDeleteMailCmd_S(rev: Cmd.DeleteMailCmd_S) {
		if (rev.resultCode == 0) {
			uniLib.Global.dispatchEvent(message.MessageConst.REMOVE_ALL_MAIL, rev);
		}
	}
}


