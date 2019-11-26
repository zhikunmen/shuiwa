// module chessCommonLib {
// 	export class LoadingGameTip extends eui.Component implements uniLib.IUI {

// 		////////////////////////////exml2class:开始替换声明区域///////////////////////////////
// 		private turn: egret.tween.TweenGroup;
// 		private image: eui.Image;
// 		private process_lb: eui.Label;

// 		////////////////////////////exml2class:结束替换声明区域///////////////////////////////

// 		public static exml = `<e:Skin class="LoadGameTipSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" xmlns:tween="egret.tween.*">
// 									<w:Declarations>
// 										<tween:TweenGroup id="turn">
// 											<tween:TweenItem target="{image}">
// 												<tween:Set/>
// 												<tween:To duration="2000">
// 													<tween:props>
// 														<e:Object rotation="{360}"/>
// 													</tween:props>
// 												</tween:To>
// 											</tween:TweenItem>
// 										</tween:TweenGroup>
// 									</w:Declarations>
// 									<e:Image id="image" source="loadingCircle_png" anchorOffsetX="45" anchorOffsetY="45"/>
// 									<e:Label id="process_lb" text="1%" anchorOffsetX="40" width="80" verticalAlign="middle" textAlign="center" anchorOffsetY="15"/>
// 								</e:Skin>`;
// 		constructor() {
// 			super();
// 			this.skinName = LoadingGameTip.exml;
// 		}

// 		protected childrenCreated(): void {
// 			super.childrenCreated();
// 			uniLib.DisplayUtils.playTweenGroup(this.turn, true);
// 		}

// 		public updateUIData(data: any): void {
// 			if (this.process_lb)
// 				this.process_lb.text = data + "%";
// 		}

// 		public resize(): void {

// 		}

// 		public destroy() {
// 			uniLib.DisplayUtils.stopTweenGroup(this.turn);
// 		}
// 	}
// }