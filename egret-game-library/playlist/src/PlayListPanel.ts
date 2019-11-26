module playlist {
	export class LobbyHelpPanel extends commonpanel.LobbyBaseEuiPanel {

		private _closeBtn: eui.Button;
		private _gameList: eui.List;
		private _menu0: eui.Image;//小程序用ToggleButton有问题
		private _menu1: eui.Image;
		private _menu2: eui.Image;
		private _menu3: eui.Image;
		private _scroll: eui.Scroller;
		private _sysMsgTxt: eui.Label;

		private _menuArr: Array<eui.Image>;
		/**存放玩法 */
		private _ruleArr: Array<Array<string>>;
		/**当前选择的标签索引 */
		private _menuIndex: number;
		private _gameId: number
		constructor(gameId?: number) {
			super("mjl_help_title_png", 1070, 640);
			this.skinName = "playlist.HelpPanelSkin";
			this._gameId = gameId;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		protected addEvent(): void {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this._gameList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
		}

		protected removeEvent(): void {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this._gameList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
		}

		protected initUI(): void {
			this._ruleArr = [];
			this._menuArr = [this._menu0, this._menu1, this._menu2, this._menu3];
			this._gameList.itemRenderer = RadioButton;
			this._gameList.dataProvider = new eui.ArrayCollection(MJLobbyData.getInstance().getGameList());
			this._gameList.selectedIndex = 0;
			if (this._gameId) {
				this._gameList.selectedIndex = MJLobbyData.getInstance().lobbyConfig.mahjongList.indexOf(this._gameId);
			}
			this._menuIndex = 0;
			this.refreshHelpTxt();
		}

		private btnClick(evt: egret.TouchEvent) {
			switch (evt.target) {
				case this._closeBtn:
					super.removePop();
					break;
				case this._menu0:
					this._menuIndex = 0; this.refreshHelpTxt();
					break;
				case this._menu1:
					this._menuIndex = 1; this.refreshHelpTxt();
					break;
				case this._menu2:
					this._menuIndex = 2; this.refreshHelpTxt();
					break;
				case this._menu3:
					this._menuIndex = 3; this.refreshHelpTxt();
					break;
			}
		}

		private itemTap(evt: eui.ItemTapEvent) {
			this.refreshHelpTxt();
		}

		private refreshHelpTxt(): void {
			this._menuArr.forEach((f, value) => {
				if(value == this._menuIndex){
					f.source = "mjl_help_menu" + (value + 1) + "_1_png";
					f.touchEnabled = false;
				}else{
					f.source = "mjl_help_menu" + (value + 1) + "_2_png";
					f.touchEnabled = true;
				}
			})
			var gameType: number = this._gameList.selectedItem;
			var ruleStr: string;

			if (!this._ruleArr[gameType]) {
				ruleStr = RES.getRes("rule_" + gameType + "_txt");
				if (!ruleStr) {
					ruleStr = "";
				}
				ruleStr = ruleStr.replace(/#113780/g, "#493FFF");//大厅批量替换规则字体贪色
				this._ruleArr[gameType] = ruleStr.split("########");
			}
			if (!this._ruleArr[gameType][this._menuIndex * 2 + 1]) {
				this._ruleArr[gameType][this._menuIndex * 2 + 1] = "暂无";
			}
			this._sysMsgTxt.textFlow = (new egret.HtmlTextParser).parser(this._ruleArr[gameType][this._menuIndex * 2 + 1]);
			this._scroll.viewport.scrollV = 0;
		}
	}
}