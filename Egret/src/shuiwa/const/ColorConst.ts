namespace SWGAME {
	export class ColorConst {
		public static  green :string = "";
		public static  greenFont :number = 0x6ba8c7;
		public static  greenFanghao: number = 0x6da8c8;
		public static  resetFont: number = 0xfff600;

		//芝麻三公房号和轮数字体颜色
		public static zmRoomIDcolor = 0x8e7d63;
		/**是否显示绿色桌布等  1显示 0不显示 */
		public static setGreen(num: number = 0){
			if(num == 1){
				this.green = "green_";
				this.greenFont = 0x50a351;
				this.greenFanghao = 0x50a351;
				this.resetFont = 0x6ff68f;
			}
		}
		public constructor() {
		}
	}
}