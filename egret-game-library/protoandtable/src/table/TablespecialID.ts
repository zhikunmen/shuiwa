﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
module table {
	/**
	 * FILE: 特殊账号.xlsx SHEET: 特殊账号
	 */
	export class TablespecialID {
		/**
		 * 序号
		 */
		id: number;
		/**
		 * id
		 */
		userID: number;
		/**
		 * 昵称
		 */
		username: string;
		/**
		 * 初始化充值
		 */
		resetpay: number;
		/**
		 * 初始化金币
		 */
		resetgold: number;
		/**
		 * 手机号
		 */
		phonenbr: string;

		GetType(): string { return 'table.TablespecialID'; }
	}
}