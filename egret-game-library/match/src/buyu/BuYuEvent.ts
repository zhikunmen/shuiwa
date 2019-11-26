module match {

	 export class BuYuEvent extends egret.Event {
		public static CLICK_ITEM_REWARD:string = "click_item_reward";

		public static CLICK_ITEM_GAME:string = "click_item_game";

		public data:any;

		constructor(type:string,$data?:any){
			super(type);
			this.data = $data;
		}
	}
}