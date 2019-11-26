window.chessCommonLib={};
window.chessCommonlib={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"chessCommonLib.HeadSkin":"resource/chessCommon_skins/HeadSkin.exml","chessCommonLib.BrSeatSkin":"resource/chessCommon_skins/BrSeatSkin.exml"};generateEUI.paths['resource/chessCommon_skins/BrSeatSkin.exml'] = window.chessCommonLib.BrSeatSkin = (function (_super) {
	__extends(BrSeatSkin, _super);
	function BrSeatSkin() {
		_super.call(this);
		this.skinParts = ["empty_bg","head","lb_bg_img","nickName_lbl","chips_lbl"];
		
		this.height = 90;
		this.minHeight = 10;
		this.minWidth = 10;
		this.width = 90;
		this.elementsContent = [this.empty_bg_i(),this.head_i(),this.lb_bg_img_i(),this.nickName_lbl_i(),this.chips_lbl_i()];
	}
	var _proto = BrSeatSkin.prototype;

	_proto.empty_bg_i = function () {
		var t = new eui.Image();
		this.empty_bg = t;
		t.anchorOffsetX = 0;
		t.bottom = -12;
		t.left = -12;
		t.right = -9;
		t.source = "br_seatHead_png";
		t.top = -10;
		return t;
	};
	_proto.head_i = function () {
		var t = new chessCommonLib.Head();
		this.head = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		return t;
	};
	_proto.lb_bg_img_i = function () {
		var t = new eui.Image();
		this.lb_bg_img = t;
		t.left = 0;
		t.right = 0;
		t.source = "name_bg_mask_png";
		t.visible = false;
		t.y = 60;
		return t;
	};
	_proto.nickName_lbl_i = function () {
		var t = new eui.Label();
		this.nickName_lbl = t;
		t.bottom = 8;
		t.height = 22;
		t.left = 0;
		t.multiline = false;
		t.right = 0;
		t.size = 22;
		t.text = "1212";
		t.textAlign = "center";
		t.visible = false;
		return t;
	};
	_proto.chips_lbl_i = function () {
		var t = new eui.BitmapLabel();
		this.chips_lbl = t;
		t.font = "jinbi_num_fnt";
		t.height = 22;
		t.horizontalCenter = -1;
		t.text = "";
		t.textAlign = "center";
		t.visible = false;
		t.y = 91;
		return t;
	};
	return BrSeatSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/CommonPanelSkin.exml'] = window.chessCommonLib.CommonPanelSkin = (function (_super) {
	__extends(CommonPanelSkin, _super);
	var CommonPanelSkin$Skin1 = 	(function (_super) {
		__extends(CommonPanelSkin$Skin1, _super);
		function CommonPanelSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","zm_common_close2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = CommonPanelSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "zm_common_close1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return CommonPanelSkin$Skin1;
	})(eui.Skin);

	function CommonPanelSkin() {
		_super.call(this);
		this.skinParts = ["_title","_closeBtn"];
		
		this.height = 554;
		this.width = 808;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = CommonPanelSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._title_i(),this._closeBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 19;
		t.scale9Grid = new egret.Rectangle(42,153,14,32);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_common_bg_png";
		t.top = 17;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "repeat";
		t.height = 64;
		t.left = 15;
		t.right = 34;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_common_spot_png";
		t.y = 25;
		return t;
	};
	_proto._title_i = function () {
		var t = new eui.Image();
		this._title = t;
		t.horizontalCenter = -15;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_userinfo_title_png";
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new eui.Button();
		this._closeBtn = t;
		t.label = "";
		t.right = -10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = -10;
		t.skinName = CommonPanelSkin$Skin1;
		return t;
	};
	return CommonPanelSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/GameTaskButtonSkin.exml'] = window.GameTaskButtonSkin = (function (_super) {
	__extends(GameTaskButtonSkin, _super);
	var GameTaskButtonSkin$Skin2 = 	(function (_super) {
		__extends(GameTaskButtonSkin$Skin2, _super);
		function GameTaskButtonSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","task_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GameTaskButtonSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.height = 75;
			t.source = "task_png";
			t.width = 91;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameTaskButtonSkin$Skin2;
	})(eui.Skin);

	function GameTaskButtonSkin() {
		_super.call(this);
		this.skinParts = ["light_rotate","game_task","progress_text"];
		
		this.elementsContent = [this.light_rotate_i(),this.game_task_i(),this.progress_text_i()];
	}
	var _proto = GameTaskButtonSkin.prototype;

	_proto.light_rotate_i = function () {
		var t = new eui.Image();
		this.light_rotate = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.height = 100;
		t.source = "guang01_png";
		t.visible = false;
		t.width = 100;
		t.x = 50;
		t.y = 50;
		return t;
	};
	_proto.game_task_i = function () {
		var t = new eui.Button();
		this.game_task = t;
		t.x = 4;
		t.y = 12;
		t.skinName = GameTaskButtonSkin$Skin2;
		return t;
	};
	_proto.progress_text_i = function () {
		var t = new eui.Label();
		this.progress_text = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "(0/8)";
		t.textAlign = "center";
		t.textColor = 0xaec6fe;
		t.x = 22;
		t.y = 82;
		return t;
	};
	return GameTaskButtonSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/HeadSkin.exml'] = window.chessCommonLib.HeadSkin = (function (_super) {
	__extends(HeadSkin, _super);
	function HeadSkin() {
		_super.call(this);
		this.skinParts = ["avar_img","avarFrame_img","gift_icon","info_bg"];
		
		this.minHeight = 10;
		this.minWidth = 10;
		this.elementsContent = [this.avar_img_i(),this.avarFrame_img_i(),this.gift_icon_i(),this.info_bg_i()];
	}
	var _proto = HeadSkin.prototype;

	_proto.avar_img_i = function () {
		var t = new eui.Image();
		this.avar_img = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.avarFrame_img_i = function () {
		var t = new eui.Image();
		this.avarFrame_img = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 2;
		return t;
	};
	_proto.gift_icon_i = function () {
		var t = new eui.Image();
		this.gift_icon = t;
		t.source = "head_gift_icon_png";
		t.x = -20;
		t.y = -20;
		return t;
	};
	_proto.info_bg_i = function () {
		var t = new eui.Image();
		this.info_bg = t;
		t.horizontalCenter = 0;
		t.source = "info_img_bg_png";
		t.touchEnabled = false;
		t.verticalCenter = 2;
		t.visible = false;
		return t;
	};
	return HeadSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/ShiShiCaiButtonSkin.exml'] = window.ShiShiCaiButtonSkin = (function (_super) {
	__extends(ShiShiCaiButtonSkin, _super);
	var ShiShiCaiButtonSkin$Skin3 = 	(function (_super) {
		__extends(ShiShiCaiButtonSkin$Skin3, _super);
		function ShiShiCaiButtonSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","ssc_btn2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShiShiCaiButtonSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "ssc_btn1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ShiShiCaiButtonSkin$Skin3;
	})(eui.Skin);

	function ShiShiCaiButtonSkin() {
		_super.call(this);
		this.skinParts = ["_ratote","_timer"];
		
		this.height = 110;
		this.width = 100;
		this.elementsContent = [this._ratote_i(),this._Button1_i(),this._timer_i()];
	}
	var _proto = ShiShiCaiButtonSkin.prototype;

	_proto._ratote_i = function () {
		var t = new eui.Image();
		this._ratote = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.source = "guang01_png";
		t.visible = false;
		t.x = 50;
		t.y = 48;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.name = "ssc";
		t.x = 10;
		t.skinName = ShiShiCaiButtonSkin$Skin3;
		return t;
	};
	_proto._timer_i = function () {
		var t = new eui.Label();
		this._timer = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = -1;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xdcffff;
		t.x = 24;
		t.y = 82;
		return t;
	};
	return ShiShiCaiButtonSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/SysMsgMcSkin.exml'] = window.chessCommonLib.SysMsgMcSkin = (function (_super) {
	__extends(SysMsgMcSkin, _super);
	function SysMsgMcSkin() {
		_super.call(this);
		this.skinParts = ["_vipIcon","_worldchat"];
		
		this.height = 39;
		this.width = 561;
		this.elementsContent = [this._Image1_i(),this._vipIcon_i(),this._worldchat_i()];
	}
	var _proto = SysMsgMcSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 39;
		t.source = "mjl_lobby_systembg_png";
		t.width = 561;
		return t;
	};
	_proto._vipIcon_i = function () {
		var t = new eui.Image();
		this._vipIcon = t;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "vip_small1_png";
		return t;
	};
	_proto._worldchat_i = function () {
		var t = new eui.Image();
		this._worldchat = t;
		t.source = "sys_msg_click_png";
		t.x = 548;
		return t;
	};
	return SysMsgMcSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/zm_ChatRadioButtonSkin.exml'] = window.chessCommonLib.zm_ChatRadioButtonSkin = (function (_super) {
	__extends(zm_ChatRadioButtonSkin, _super);
	function zm_ChatRadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.height = 43;
		this.width = 375;
		this.elementsContent = [this.labelDisplay_i()];
	}
	var _proto = zm_ChatRadioButtonSkin.prototype;

	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 28;
		t.rotation = 359.99;
		t.size = 22;
		t.text = "不好意思，我有事先走一步";
		t.textColor = 0xfffefe;
		t.verticalCenter = 0;
		t.width = 365;
		t.x = 5;
		return t;
	};
	return zm_ChatRadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/zm_ChatSkin.exml'] = window.chessCommonLib.zm_ChatSkin = (function (_super) {
	__extends(zm_ChatSkin, _super);
	var zm_ChatSkin$Skin4 = 	(function (_super) {
		__extends(zm_ChatSkin$Skin4, _super);
		function zm_ChatSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","zm_send2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = zm_ChatSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "zm_send1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return zm_ChatSkin$Skin4;
	})(eui.Skin);

	function zm_ChatSkin() {
		_super.call(this);
		this.skinParts = ["faceGroup","faceScroller","chatGroup","chatScroller","textField","sendBtn"];
		
		this.height = 554;
		this.width = 825;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = zm_ChatSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 554;
		t.touchEnabled = false;
		t.width = 825;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.faceScroller_i(),this.chatScroller_i(),this.textField_i(),this.sendBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 326;
		t.scale9Grid = new egret.Rectangle(15,14,19,23);
		t.source = "zm_help_bg_png";
		t.width = 325;
		t.x = 37.33;
		t.y = 103;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 59.33;
		t.scale9Grid = new egret.Rectangle(15,14,19,23);
		t.source = "zm_help_bg_png";
		t.width = 551.67;
		t.x = 37.33;
		t.y = 453.01;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 326;
		t.scale9Grid = new egret.Rectangle(15,14,19,23);
		t.source = "zm_help_bg_png";
		t.width = 387;
		t.x = 383.17;
		t.y = 103;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "zm_horn_png";
		t.x = 55;
		t.y = 465.67;
		return t;
	};
	_proto.faceScroller_i = function () {
		var t = new eui.Scroller();
		this.faceScroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 313;
		t.width = 313;
		t.x = 45;
		t.y = 112;
		t.viewport = this.faceGroup_i();
		return t;
	};
	_proto.faceGroup_i = function () {
		var t = new eui.Group();
		this.faceGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 313;
		t.width = 313;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 2;
		return t;
	};
	_proto.chatScroller_i = function () {
		var t = new eui.Scroller();
		this.chatScroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 313;
		t.width = 375;
		t.x = 392.5;
		t.y = 112;
		t.viewport = this.chatGroup_i();
		return t;
	};
	_proto.chatGroup_i = function () {
		var t = new eui.Group();
		this.chatGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 313;
		t.width = 375;
		t.layout = this._TileLayout2_i();
		return t;
	};
	_proto._TileLayout2_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 0;
		return t;
	};
	_proto.textField_i = function () {
		var t = new eui.EditableText();
		this.textField = t;
		t.anchorOffsetX = 0;
		t.height = 50;
		t.prompt = "请在此输入内容，总长度不超过60字！";
		t.promptColor = 0x6a6fb7;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.strokeColor = 0x332f2f;
		t.textAlign = "left";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.width = 479.26;
		t.x = 101.08;
		t.y = 459.01;
		return t;
	};
	_proto.sendBtn_i = function () {
		var t = new eui.Button();
		this.sendBtn = t;
		t.label = "";
		t.x = 603.08;
		t.y = 453.01;
		t.skinName = zm_ChatSkin$Skin4;
		return t;
	};
	return zm_ChatSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/zm_FaceButtonSkin.exml'] = window.chessCommonLib.zm_FaceButtonSkin = (function (_super) {
	__extends(zm_FaceButtonSkin, _super);
	function zm_FaceButtonSkin() {
		_super.call(this);
		this.skinParts = ["iconDisplay"];
		
		this.height = 75;
		this.width = 75;
		this.elementsContent = [this.iconDisplay_i()];
	}
	var _proto = zm_FaceButtonSkin.prototype;

	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return zm_FaceButtonSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/zm_GiftItemSkin.exml'] = window.chessCommonLib.zm_GiftItemSkin = (function (_super) {
	__extends(zm_GiftItemSkin, _super);
	function zm_GiftItemSkin() {
		_super.call(this);
		this.skinParts = ["_gift_img","_gift_name"];
		
		this.height = 167;
		this.width = 110;
		this.elementsContent = [this._Image1_i(),this._gift_img_i(),this._gift_name_i()];
	}
	var _proto = zm_GiftItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "zm_userinfo_bg1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._gift_img_i = function () {
		var t = new eui.Image();
		this._gift_img = t;
		t.source = "zm_userinfo_gift1_png";
		t.x = 16.5;
		t.y = 61;
		return t;
	};
	_proto._gift_name_i = function () {
		var t = new eui.Label();
		this._gift_name = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.text = "黄瓜";
		t.textAlign = "center";
		t.width = 105;
		t.x = 2.5;
		t.y = 18;
		return t;
	};
	return zm_GiftItemSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/zm_HelpSkin.exml'] = window.chessCommonLib.zm_HelpSkin = (function (_super) {
	__extends(zm_HelpSkin, _super);
	function zm_HelpSkin() {
		_super.call(this);
		this.skinParts = ["_titleTxt","_typeTxt","_contentTxt"];
		
		this.elementsContent = [this._Group2_i()];
	}
	var _proto = zm_HelpSkin.prototype;

	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 554;
		t.touchEnabled = false;
		t.width = 825;
		t.x = -1;
		t.y = 1.52;
		t.elementsContent = [this._Image1_i(),this._titleTxt_i(),this._typeTxt_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 370.49;
		t.scale9Grid = new egret.Rectangle(17,15,17,21);
		t.source = "zm_help_bg_png";
		t.width = 729.57;
		t.x = 38;
		t.y = 143.74;
		return t;
	};
	_proto._titleTxt_i = function () {
		var t = new eui.Label();
		this._titleTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = -9.5;
		t.text = "我是标题";
		t.textAlign = "center";
		t.textColor = 0xe6c347;
		t.y = 167.79;
		return t;
	};
	_proto._typeTxt_i = function () {
		var t = new eui.Label();
		this._typeTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.rotation = 359.91;
		t.size = 24;
		t.text = "经典模式  底注:100  入场:2000  离场:1000";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.width = 724.96;
		t.y = 107.18;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 255;
		t.width = 693;
		t.x = 58.99;
		t.y = 208.73;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.width = 688;
		t.elementsContent = [this._contentTxt_i()];
		return t;
	};
	_proto._contentTxt_i = function () {
		var t = new eui.Label();
		this._contentTxt = t;
		t.anchorOffsetX = 0;
		t.size = 18;
		t.text = "暂无";
		t.width = 641;
		t.x = 29.85;
		t.y = 21.15;
		return t;
	};
	return zm_HelpSkin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/zm_SetPlanel.exml'] = window.chessCommonLib.zm_SetPanelSKin = (function (_super) {
	__extends(zm_SetPanelSKin, _super);
	var zm_SetPanelSKin$Skin5 = 	(function (_super) {
		__extends(zm_SetPanelSKin$Skin5, _super);
		function zm_SetPanelSKin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","game_sp_voice_off_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","game_sp_voice_off_png")
					])
			];
		}
		var _proto = zm_SetPanelSKin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "game_sp_voice_on_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return zm_SetPanelSKin$Skin5;
	})(eui.Skin);

	var zm_SetPanelSKin$Skin6 = 	(function (_super) {
		__extends(zm_SetPanelSKin$Skin6, _super);
		function zm_SetPanelSKin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","game_sp_voice_off_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","game_sp_voice_off_png")
					])
			];
		}
		var _proto = zm_SetPanelSKin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "game_sp_voice_on_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return zm_SetPanelSKin$Skin6;
	})(eui.Skin);

	var zm_SetPanelSKin$Skin7 = 	(function (_super) {
		__extends(zm_SetPanelSKin$Skin7, _super);
		function zm_SetPanelSKin$Skin7() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","game_sp_voice_off_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","game_sp_voice_off_png")
					])
			];
		}
		var _proto = zm_SetPanelSKin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "game_sp_voice_on_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return zm_SetPanelSKin$Skin7;
	})(eui.Skin);

	function zm_SetPanelSKin() {
		_super.call(this);
		this.skinParts = ["leftBtn","rightBtn","musicBtn","soundBtn","localSoundBtn","_imgGroup","_mainGroup"];
		
		this.height = 403;
		this.width = 690;
		this.elementsContent = [this._mainGroup_i()];
	}
	var _proto = zm_SetPanelSKin.prototype;

	_proto._mainGroup_i = function () {
		var t = new eui.Group();
		this._mainGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 403;
		t.touchEnabled = false;
		t.width = 690;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this.leftBtn_i(),this.rightBtn_i(),this.musicBtn_i(),this.soundBtn_i(),this.localSoundBtn_i(),this._Label3_i(),this._imgGroup_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 25;
		t.text = "方言";
		t.x = 509;
		t.y = 270;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 25;
		t.text = "音效";
		t.x = 508;
		t.y = 199;
		return t;
	};
	_proto.leftBtn_i = function () {
		var t = new eui.Image();
		this.leftBtn = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "game_sp_arrow_left_png";
		t.touchEnabled = true;
		t.x = 28;
		t.y = 197;
		return t;
	};
	_proto.rightBtn_i = function () {
		var t = new eui.Image();
		this.rightBtn = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "game_sp_arrow_right_png";
		t.touchEnabled = true;
		t.x = 453;
		t.y = 197;
		return t;
	};
	_proto.musicBtn_i = function () {
		var t = new eui.ToggleSwitch();
		this.musicBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.enabled = true;
		t.height = 50;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 50;
		t.x = 581;
		t.y = 116.5;
		t.skinName = zm_SetPanelSKin$Skin5;
		return t;
	};
	_proto.soundBtn_i = function () {
		var t = new eui.ToggleSwitch();
		this.soundBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.enabled = true;
		t.height = 50;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 50;
		t.x = 581;
		t.y = 190;
		t.skinName = zm_SetPanelSKin$Skin6;
		return t;
	};
	_proto.localSoundBtn_i = function () {
		var t = new eui.ToggleSwitch();
		this.localSoundBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.enabled = true;
		t.height = 50;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 50;
		t.x = 581;
		t.y = 262.5;
		t.skinName = zm_SetPanelSKin$Skin7;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 25;
		t.text = "音乐";
		t.x = 507;
		t.y = 128;
		return t;
	};
	_proto._imgGroup_i = function () {
		var t = new eui.Group();
		this._imgGroup = t;
		t.height = 201;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 367;
		t.x = 70.5;
		t.y = 116.5;
		return t;
	};
	return zm_SetPanelSKin;
})(eui.Skin);generateEUI.paths['resource/chessCommon_skins/zm_UserInfoSKin.exml'] = window.chessCommonLib.zm_UserInfoSKin = (function (_super) {
	__extends(zm_UserInfoSKin, _super);
	function zm_UserInfoSKin() {
		_super.call(this);
		this.skinParts = ["_name_lbl","_id_lbl","_gps_lbl","_bean_lbl","_diamond_lbl","_ip_lbl","_gender_img","_head_img","_head"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = zm_UserInfoSKin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 554;
		t.touchEnabled = false;
		t.width = 825;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._name_lbl_i(),this._id_lbl_i(),this._gps_lbl_i(),this._bean_lbl_i(),this._diamond_lbl_i(),this._ip_lbl_i(),this._gender_img_i(),this._head_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_userinfo_bg2_png";
		t.x = 200;
		t.y = 143;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_userinfo_bg2_png";
		t.x = 425;
		t.y = 143;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_bean_png";
		t.x = 433;
		t.y = 146;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_diamond_png";
		t.x = 204;
		t.y = 148;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_userinfo_gps_png";
		t.x = 41;
		t.y = 272;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_userinfo_head_png";
		t.x = 32;
		t.y = 89;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 189;
		t.scale9Grid = new egret.Rectangle(20,21,7,8);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_common_bg1_png";
		t.width = 733;
		t.x = 32;
		t.y = 314;
		return t;
	};
	_proto._name_lbl_i = function () {
		var t = new eui.Label();
		this._name_lbl = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "名字最多几个字";
		t.textAlign = "left";
		t.width = 577;
		t.x = 240;
		t.y = 101;
		return t;
	};
	_proto._id_lbl_i = function () {
		var t = new eui.Label();
		this._id_lbl = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "帐号:44422200";
		t.textAlign = "left";
		t.width = 215;
		t.x = 204;
		t.y = 201;
		return t;
	};
	_proto._gps_lbl_i = function () {
		var t = new eui.Label();
		this._gps_lbl = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.multiline = false;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "";
		t.textAlign = "left";
		t.width = 673;
		t.x = 67;
		t.y = 268.5;
		return t;
	};
	_proto._bean_lbl_i = function () {
		var t = new eui.Label();
		this._bean_lbl = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 26;
		t.text = "00000.";
		t.textAlign = "left";
		t.textColor = 0xfff285;
		t.width = 137;
		t.x = 484;
		t.y = 152.5;
		return t;
	};
	_proto._diamond_lbl_i = function () {
		var t = new eui.Label();
		this._diamond_lbl = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 26;
		t.text = "00000.";
		t.textAlign = "left";
		t.textColor = 0xFFF285;
		t.width = 137;
		t.x = 259;
		t.y = 153;
		return t;
	};
	_proto._ip_lbl_i = function () {
		var t = new eui.Label();
		this._ip_lbl = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "地址:192.168.000.000";
		t.textAlign = "left";
		t.width = 267;
		t.x = 425;
		t.y = 201;
		return t;
	};
	_proto._gender_img_i = function () {
		var t = new eui.Image();
		this._gender_img = t;
		t.height = 24;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zm_userinfo_male_png";
		t.width = 24;
		t.x = 204;
		t.y = 105;
		return t;
	};
	_proto._head_i = function () {
		var t = new eui.Group();
		this._head = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 131;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 134;
		t.x = 43;
		t.y = 102;
		t.elementsContent = [this._head_img_i()];
		return t;
	};
	_proto._head_img_i = function () {
		var t = new eui.Image();
		this._head_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 129;
		t.width = 130;
		t.x = 2;
		t.y = 1;
		return t;
	};
	return zm_UserInfoSKin;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat2_skins/ChatLabaItemSkin2.exml'] = window.chessCommonLib.Chat2LabaItemSkin = (function (_super) {
	__extends(Chat2LabaItemSkin, _super);
	function Chat2LabaItemSkin() {
		_super.call(this);
		this.skinParts = ["avar_img","frame_img","gold_lb"];
		
		this.height = 93;
		this.elementsContent = [this._Image1_i(),this.avar_img_i(),this.frame_img_i(),this.gold_lb_i(),this._Image2_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.text"],[0],this.gold_lb,"text");
	}
	var _proto = Chat2LabaItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(17,13,45,46);
		t.source = "chat_userlist_bg_png";
		t.top = 0;
		return t;
	};
	_proto.avar_img_i = function () {
		var t = new eui.Image();
		this.avar_img = t;
		t.source = "chat_laba_icon_png";
		t.x = 14;
		t.y = 6.5;
		return t;
	};
	_proto.frame_img_i = function () {
		var t = new eui.Image();
		this.frame_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.source = "chat_input_png";
		t.visible = false;
		t.width = 60;
		t.x = 11.5;
		t.y = 14;
		return t;
	};
	_proto.gold_lb_i = function () {
		var t = new eui.Label();
		this.gold_lb = t;
		t.left = 66;
		t.maxChars = 60;
		t.right = 0;
		t.size = 26;
		t.textColor = 0xfdf4a9;
		t.y = 15;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "chat_vip_icon_png";
		t.x = 65.5;
		t.y = 7;
		return t;
	};
	return Chat2LabaItemSkin;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat2_skins/ChatListItemSkin2.exml'] = window.chessCommonlib.Chat2ListItemSkin = (function (_super) {
	__extends(Chat2ListItemSkin, _super);
	function Chat2ListItemSkin() {
		_super.call(this);
		this.skinParts = ["avar_img","name_txt","time_txt","chat_txt"];
		
		this.elementsContent = [this.avar_img_i(),this.name_txt_i(),this.time_txt_i(),this._Image1_i(),this.chat_txt_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.headUrl"],[0],this.avar_img,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.nickName"],[0],this.name_txt,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.time"],[0],this.time_txt,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.words"],[0],this.chat_txt,"text");
	}
	var _proto = Chat2ListItemSkin.prototype;

	_proto.avar_img_i = function () {
		var t = new eui.Image();
		this.avar_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 46;
		t.left = 0;
		t.width = 49;
		t.y = 19;
		return t;
	};
	_proto.name_txt_i = function () {
		var t = new eui.Label();
		this.name_txt = t;
		t.fontFamily = "null1";
		t.size = 20;
		t.textColor = 0x14142a;
		t.x = 62;
		t.y = 20;
		return t;
	};
	_proto.time_txt_i = function () {
		var t = new eui.Label();
		this.time_txt = t;
		t.fontFamily = "null1";
		t.right = 0;
		t.size = 20;
		t.textColor = 0x14142A;
		t.y = 20;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 52;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(24,23,84,32);
		t.source = "chat_chat_bg_png";
		t.top = 48;
		return t;
	};
	_proto.chat_txt_i = function () {
		var t = new eui.Label();
		this.chat_txt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 12;
		t.fontFamily = "null1";
		t.left = 79;
		t.lineSpacing = 6;
		t.right = 13;
		t.size = 23;
		t.top = 62;
		return t;
	};
	return Chat2ListItemSkin;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat2_skins/ChatListSkin2.exml'] = window.chessCommonLib.Chat2ListSkin = (function (_super) {
	__extends(Chat2ListSkin, _super);
	var Chat2ListSkin$Skin8 = 	(function (_super) {
		__extends(Chat2ListSkin$Skin8, _super);
		function Chat2ListSkin$Skin8() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_room_btn_normal_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = Chat2ListSkin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_room_btn_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Chat2ListSkin$Skin8;
	})(eui.Skin);

	var Chat2ListSkin$Skin9 = 	(function (_super) {
		__extends(Chat2ListSkin$Skin9, _super);
		function Chat2ListSkin$Skin9() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_laba_btn_selected_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = Chat2ListSkin$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_laba_btn_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Chat2ListSkin$Skin9;
	})(eui.Skin);

	var Chat2ListSkin$Skin10 = 	(function (_super) {
		__extends(Chat2ListSkin$Skin10, _super);
		function Chat2ListSkin$Skin10() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_send_selected_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = Chat2ListSkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_send_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Chat2ListSkin$Skin10;
	})(eui.Skin);

	var Chat2ListSkin$Skin11 = 	(function (_super) {
		__extends(Chat2ListSkin$Skin11, _super);
		function Chat2ListSkin$Skin11() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_laba_drop_selected_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = Chat2ListSkin$Skin11.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_laba_drop_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Chat2ListSkin$Skin11;
	})(eui.Skin);

	var Chat2ListSkin$Skin12 = 	(function (_super) {
		__extends(Chat2ListSkin$Skin12, _super);
		function Chat2ListSkin$Skin12() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_room_drop_selected_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = Chat2ListSkin$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_room_drop_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Chat2ListSkin$Skin12;
	})(eui.Skin);

	function Chat2ListSkin() {
		_super.call(this);
		this.skinParts = ["roomType_btn","labaType_btn","send_bt","chat_etxt","chat_lst","chat_scr","labaDrop_btn","roomDrop_btn","chat_select_grp"];
		
		this.height = 720;
		this.width = 415;
		this.elementsContent = [this._Group1_i(),this.chat_scr_i(),this.chat_select_grp_i()];
	}
	var _proto = Chat2ListSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.width = 396;
		t.x = 9;
		t.y = 653;
		t.elementsContent = [this._Image1_i(),this.roomType_btn_i(),this.labaType_btn_i(),this._Image2_i(),this.send_bt_i(),this.chat_etxt_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(8,7,49,46);
		t.source = "chat_input_bg_png";
		t.top = 0;
		return t;
	};
	_proto.roomType_btn_i = function () {
		var t = new eui.Button();
		this.roomType_btn = t;
		t.label = "";
		t.verticalCenter = 0.5;
		t.x = 5.5;
		t.skinName = Chat2ListSkin$Skin8;
		return t;
	};
	_proto.labaType_btn_i = function () {
		var t = new eui.Button();
		this.labaType_btn = t;
		t.label = "";
		t.verticalCenter = 0.5;
		t.x = 5.5;
		t.skinName = Chat2ListSkin$Skin9;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 44;
		t.left = 92;
		t.right = 76;
		t.scale9Grid = new egret.Rectangle(6,5,38,34);
		t.source = "chat_input_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.send_bt_i = function () {
		var t = new eui.Button();
		this.send_bt = t;
		t.label = "";
		t.verticalCenter = 0.5;
		t.x = 323;
		t.skinName = Chat2ListSkin$Skin10;
		return t;
	};
	_proto.chat_etxt_i = function () {
		var t = new eui.EditableText();
		this.chat_etxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 31;
		t.left = "99";
		t.prompt = "请输入聊天内容";
		t.right = "83";
		t.size = 24;
		t.text = "";
		t.textColor = 0x14142a;
		t.verticalAlign = "middle";
		t.y = 14;
		return t;
	};
	_proto.chat_scr_i = function () {
		var t = new eui.Scroller();
		this.chat_scr = t;
		t.bottom = 82;
		t.left = 15;
		t.right = 15;
		t.top = 20;
		t.viewport = this._Group2_i();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.chat_lst_i()];
		return t;
	};
	_proto.chat_lst_i = function () {
		var t = new eui.List();
		this.chat_lst = t;
		t.itemRendererSkinName = chessCommonLib.Chat2ListItemSkin;
		t.left = 0;
		t.right = 0;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		t.horizontalAlign = "justify";
		t.verticalAlign = "top";
		return t;
	};
	_proto.chat_select_grp_i = function () {
		var t = new eui.Group();
		this.chat_select_grp = t;
		t.x = 15;
		t.y = 590;
		t.elementsContent = [this.labaDrop_btn_i(),this.roomDrop_btn_i()];
		return t;
	};
	_proto.labaDrop_btn_i = function () {
		var t = new eui.Button();
		this.labaDrop_btn = t;
		t.label = "";
		t.skinName = Chat2ListSkin$Skin11;
		return t;
	};
	_proto.roomDrop_btn_i = function () {
		var t = new eui.Button();
		this.roomDrop_btn = t;
		t.label = "";
		t.skinName = Chat2ListSkin$Skin12;
		return t;
	};
	return Chat2ListSkin;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat2_skins/ChatUserSkin2.exml'] = window.chessCommonLib.Chat2UserSkin = (function (_super) {
	__extends(Chat2UserSkin, _super);
	var Chat2UserSkin$Skin13 = 	(function (_super) {
		__extends(Chat2UserSkin$Skin13, _super);
		function Chat2UserSkin$Skin13() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat2_btn_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","chat2_btn_png")
					])
			];
		}
		var _proto = Chat2UserSkin$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat2_btn_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Chat2UserSkin$Skin13;
	})(eui.Skin);

	var Chat2UserSkin$Skin14 = 	(function (_super) {
		__extends(Chat2UserSkin$Skin14, _super);
		function Chat2UserSkin$Skin14() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat2_noseat_btn_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","chat2_noseat_btn_png")
					])
			];
		}
		var _proto = Chat2UserSkin$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat2_noseat_btn_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Chat2UserSkin$Skin14;
	})(eui.Skin);

	function Chat2UserSkin() {
		_super.call(this);
		this.skinParts = ["chat_btn","noseat_btn"];
		
		this.height = 720;
		this.width = 458;
		this.elementsContent = [this._Image1_i(),this.chat_btn_i(),this.noseat_btn_i()];
	}
	var _proto = Chat2UserSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.scale9Grid = new egret.Rectangle(12,11,22,24);
		t.source = "chat2_bg_png";
		t.top = 0;
		t.width = 420;
		t.x = 0;
		return t;
	};
	_proto.chat_btn_i = function () {
		var t = new eui.ToggleButton();
		this.chat_btn = t;
		t.label = "";
		t.left = 417;
		t.y = 199;
		t.skinName = Chat2UserSkin$Skin13;
		return t;
	};
	_proto.noseat_btn_i = function () {
		var t = new eui.ToggleButton();
		this.noseat_btn = t;
		t.label = "";
		t.left = 417;
		t.visible = false;
		t.y = 368;
		t.skinName = Chat2UserSkin$Skin14;
		return t;
	};
	return Chat2UserSkin;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat2_skins/UserListItemSkin2.exml'] = window.chessCommonLib.User2ListItemSkin = (function (_super) {
	__extends(User2ListItemSkin, _super);
	function User2ListItemSkin() {
		_super.call(this);
		this.skinParts = ["avar_img","frame_img","name_lb","gold_lb"];
		
		this.height = 93;
		this.elementsContent = [this._Image1_i(),this.avar_img_i(),this.frame_img_i(),this.name_lb_i(),this.gold_lb_i(),this._Image2_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.headUrl"],[0],this.avar_img,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.nickName"],[0],this.name_lb,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.remainder"],[0],this.gold_lb,"text");
	}
	var _proto = User2ListItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(17,13,45,46);
		t.source = "chat_userlist_bg_png";
		t.top = 0;
		return t;
	};
	_proto.avar_img_i = function () {
		var t = new eui.Image();
		this.avar_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 55;
		t.width = 55;
		t.x = 14;
		t.y = 17;
		return t;
	};
	_proto.frame_img_i = function () {
		var t = new eui.Image();
		this.frame_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.source = "chat_input_png";
		t.visible = false;
		t.width = 60;
		t.x = 11.5;
		t.y = 14;
		return t;
	};
	_proto.name_lb_i = function () {
		var t = new eui.Label();
		this.name_lb = t;
		t.horizontalCenter = 37;
		t.textColor = 0xabc2ff;
		t.y = 10.5;
		return t;
	};
	_proto.gold_lb_i = function () {
		var t = new eui.Label();
		this.gold_lb = t;
		t.horizontalCenter = 37;
		t.size = 26;
		t.textColor = 0xfdf4a9;
		t.y = 49;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 45;
		t.source = "chat_coin_png";
		t.width = 45;
		t.x = 91;
		t.y = 41;
		return t;
	};
	return User2ListItemSkin;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat2_skins/UserListSkin2.exml'] = window.chessCommonLib.User2ListSkin = (function (_super) {
	__extends(User2ListSkin, _super);
	function User2ListSkin() {
		_super.call(this);
		this.skinParts = ["loadingTip","null","noseat_lst","loading_img"];
		
		this.height = 720;
		this.width = 400;
		this.loadingTip_i();
		this.elementsContent = [this._Scroller1_i(),this.loading_img_i()];
		
		eui.Binding.$bindProperties(this, ["loading_img"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [360],[],this._Object1,"rotation");
	}
	var _proto = User2ListSkin.prototype;

	_proto.loadingTip_i = function () {
		var t = new egret.tween.TweenGroup();
		this.loadingTip = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._To1_i()];
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 3000;
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 680;
		t.width = 363;
		t.x = 19;
		t.y = 20;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.noseat_lst_i()];
		return t;
	};
	_proto.noseat_lst_i = function () {
		var t = new eui.List();
		this.noseat_lst = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = chessCommonLib.User2ListItemSkin;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "justify";
		t.paddingTop = 0;
		t.verticalAlign = "top";
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this.null_i()];
		return t;
	};
	_proto.null_i = function () {
		var t = {};
		this.null = t;
		t.headUrl = "null";
		t.nickName = "null";
		t.remainder = "null";
		return t;
	};
	_proto.loading_img_i = function () {
		var t = new eui.Image();
		this.loading_img = t;
		t.anchorOffsetX = 18;
		t.anchorOffsetY = 18;
		t.source = "chat_loading_png";
		t.x = 202;
		t.y = 361;
		return t;
	};
	return User2ListSkin;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat3_skins/ChatLabaItemSkin3.exml'] = window.chessCommonLib.ChatLabaItemSkin3 = (function (_super) {
	__extends(ChatLabaItemSkin3, _super);
	function ChatLabaItemSkin3() {
		_super.call(this);
		this.skinParts = ["notice_lb","chat_laba_vip_img"];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.notice_lb_i(),this.chat_laba_vip_img_i()];
	}
	var _proto = ChatLabaItemSkin3.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = -7;
		t.left = 0;
		t.right = 1;
		t.scale9Grid = new egret.Rectangle(15,11,4,13);
		t.source = "3chat_userlist_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "3chat_laba_icon_png";
		t.x = 13;
		t.y = 4.5;
		return t;
	};
	_proto.notice_lb_i = function () {
		var t = new eui.Label();
		this.notice_lb = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 5;
		t.fontFamily = "Microsoft YaHei";
		t.left = 123;
		t.lineSpacing = 10;
		t.maxChars = 60;
		t.right = 13;
		t.size = 23;
		t.text = "testrgergwergewgwegwergg";
		t.textColor = 0xfdf4a9;
		t.top = 6;
		return t;
	};
	_proto.chat_laba_vip_img_i = function () {
		var t = new eui.Image();
		this.chat_laba_vip_img = t;
		t.source = "chat_vip_icon_png";
		t.x = 65.5;
		t.y = 7;
		return t;
	};
	return ChatLabaItemSkin3;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat3_skins/ChatListItemSkin3.exml'] = window.chessCommonLib.ChatListItemSkin3 = (function (_super) {
	__extends(ChatListItemSkin3, _super);
	function ChatListItemSkin3() {
		_super.call(this);
		this.skinParts = ["avar_img","vip_img","name_txt","time_txt","chat_txt"];
		
		this.width = 386;
		this.elementsContent = [this.avar_img_i(),this.vip_img_i(),this.name_txt_i(),this.time_txt_i(),this._Image1_i(),this.chat_txt_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.data.headUrl"],[0],this.avar_img,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.data.nickName"],[0],this.name_txt,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.data.words"],[0],this.chat_txt,"text");
	}
	var _proto = ChatListItemSkin3.prototype;

	_proto.avar_img_i = function () {
		var t = new eui.Image();
		this.avar_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 46;
		t.width = 49;
		t.x = 20;
		t.y = 19;
		return t;
	};
	_proto.vip_img_i = function () {
		var t = new eui.Image();
		this.vip_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.width = 105;
		t.x = -9;
		t.y = -1;
		return t;
	};
	_proto.name_txt_i = function () {
		var t = new eui.Label();
		this.name_txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.textColor = 0xffffff;
		t.x = 88;
		t.y = 9;
		return t;
	};
	_proto.time_txt_i = function () {
		var t = new eui.Label();
		this.time_txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.right = 1;
		t.size = 20;
		t.text = "1231231";
		t.textColor = 0xffffff;
		t.y = 10;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 12;
		t.height = 30;
		t.left = 90;
		t.right = 2;
		t.scale9Grid = new egret.Rectangle(23,25,11,9);
		t.source = "3chat_chat_bg_png";
		t.top = 37;
		t.width = 306;
		return t;
	};
	_proto.chat_txt_i = function () {
		var t = new eui.Label();
		this.chat_txt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 22;
		t.fontFamily = "Microsoft YaHei";
		t.left = 109;
		t.lineSpacing = 6;
		t.right = 4;
		t.size = 23;
		t.top = 43;
		return t;
	};
	return ChatListItemSkin3;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat3_skins/ChatListSkin3.exml'] = window.chessCommonLib.ChatListSkin3 = (function (_super) {
	__extends(ChatListSkin3, _super);
	var ChatListSkin3$Skin15 = 	(function (_super) {
		__extends(ChatListSkin3$Skin15, _super);
		function ChatListSkin3$Skin15() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","mjl_common_button2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatListSkin3$Skin15.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "mjl_common_button1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "3chat_room_png";
			t.verticalCenter = 0;
			return t;
		};
		return ChatListSkin3$Skin15;
	})(eui.Skin);

	var ChatListSkin3$Skin16 = 	(function (_super) {
		__extends(ChatListSkin3$Skin16, _super);
		function ChatListSkin3$Skin16() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","mjl_common_button2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatListSkin3$Skin16.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "mjl_common_button1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "3chat_laba_png";
			t.verticalCenter = 0;
			return t;
		};
		return ChatListSkin3$Skin16;
	})(eui.Skin);

	var ChatListSkin3$Skin17 = 	(function (_super) {
		__extends(ChatListSkin3$Skin17, _super);
		function ChatListSkin3$Skin17() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","mjl_common_button2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatListSkin3$Skin17.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "mjl_common_button1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "3chat_send_png";
			t.verticalCenter = 0;
			return t;
		};
		return ChatListSkin3$Skin17;
	})(eui.Skin);

	var ChatListSkin3$Skin18 = 	(function (_super) {
		__extends(ChatListSkin3$Skin18, _super);
		function ChatListSkin3$Skin18() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","mjl_common_button2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatListSkin3$Skin18.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "mjl_common_button1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "3chat_laba_png";
			t.verticalCenter = 0;
			return t;
		};
		return ChatListSkin3$Skin18;
	})(eui.Skin);

	var ChatListSkin3$Skin19 = 	(function (_super) {
		__extends(ChatListSkin3$Skin19, _super);
		function ChatListSkin3$Skin19() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","mjl_common_button2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatListSkin3$Skin19.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "mjl_common_button1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "3chat_room_png";
			t.verticalCenter = 0;
			return t;
		};
		return ChatListSkin3$Skin19;
	})(eui.Skin);

	function ChatListSkin3() {
		_super.call(this);
		this.skinParts = ["roomType_btn","labaType_btn","send_bt","chat_etxt","chat_lst","chat_scr","labaDrop_btn","roomDrop_btn","chat_select_grp"];
		
		this.height = 720;
		this.width = 408;
		this.elementsContent = [this._Group1_i(),this.chat_scr_i(),this.chat_select_grp_i()];
	}
	var _proto = ChatListSkin3.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 653;
		t.elementsContent = [this.roomType_btn_i(),this.labaType_btn_i(),this._Image1_i(),this.send_bt_i(),this.chat_etxt_i()];
		return t;
	};
	_proto.roomType_btn_i = function () {
		var t = new eui.Button();
		this.roomType_btn = t;
		t.height = 48;
		t.label = "";
		t.verticalCenter = 0.5;
		t.width = 82;
		t.x = 5.5;
		t.skinName = ChatListSkin3$Skin15;
		return t;
	};
	_proto.labaType_btn_i = function () {
		var t = new eui.Button();
		this.labaType_btn = t;
		t.height = 48;
		t.label = "";
		t.verticalCenter = 0.5;
		t.width = 82;
		t.x = 5;
		t.skinName = ChatListSkin3$Skin16;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 48;
		t.left = 91;
		t.right = 89;
		t.scale9Grid = new egret.Rectangle(14,11,8,12);
		t.source = "3chat_userlist_bg_png";
		t.verticalCenter = 0;
		t.width = 225;
		return t;
	};
	_proto.send_bt_i = function () {
		var t = new eui.Button();
		this.send_bt = t;
		t.anchorOffsetX = 0;
		t.height = 48;
		t.label = "";
		t.verticalCenter = 1;
		t.width = 82;
		t.x = 322.68;
		t.skinName = ChatListSkin3$Skin17;
		return t;
	};
	_proto.chat_etxt_i = function () {
		var t = new eui.EditableText();
		this.chat_etxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 31;
		t.left = "99";
		t.prompt = "请输入聊天内容";
		t.promptColor = 0x807adc;
		t.right = "99";
		t.size = 24;
		t.text = "";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.y = 14;
		return t;
	};
	_proto.chat_scr_i = function () {
		var t = new eui.Scroller();
		this.chat_scr = t;
		t.height = 630;
		t.width = 386;
		t.x = 10;
		t.y = 10;
		t.viewport = this._Group2_i();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this.chat_lst_i()];
		return t;
	};
	_proto.chat_lst_i = function () {
		var t = new eui.List();
		this.chat_lst = t;
		t.itemRendererSkinName = chessCommonLib.ChatListItemSkin3;
		t.width = 386;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		t.horizontalAlign = "justify";
		t.verticalAlign = "top";
		return t;
	};
	_proto.chat_select_grp_i = function () {
		var t = new eui.Group();
		this.chat_select_grp = t;
		t.x = 5;
		t.y = 605;
		t.elementsContent = [this.labaDrop_btn_i(),this.roomDrop_btn_i()];
		return t;
	};
	_proto.labaDrop_btn_i = function () {
		var t = new eui.Button();
		this.labaDrop_btn = t;
		t.height = 48;
		t.label = "";
		t.width = 82;
		t.skinName = ChatListSkin3$Skin18;
		return t;
	};
	_proto.roomDrop_btn_i = function () {
		var t = new eui.Button();
		this.roomDrop_btn = t;
		t.height = 48;
		t.label = "";
		t.width = 82;
		t.x = 0;
		t.skinName = ChatListSkin3$Skin19;
		return t;
	};
	return ChatListSkin3;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat3_skins/ChatUserSkin3.exml'] = window.chessCommonLib.ChatUserSkin3 = (function (_super) {
	__extends(ChatUserSkin3, _super);
	var ChatUserSkin3$Skin20 = 	(function (_super) {
		__extends(ChatUserSkin3$Skin20, _super);
		function ChatUserSkin3$Skin20() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","3chat_chat_selected_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","3chat_chat_selected_png")
					])
			];
		}
		var _proto = ChatUserSkin3$Skin20.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "3chat_chat_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatUserSkin3$Skin20;
	})(eui.Skin);

	var ChatUserSkin3$Skin21 = 	(function (_super) {
		__extends(ChatUserSkin3$Skin21, _super);
		function ChatUserSkin3$Skin21() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","3chat_noset_selected_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","3chat_noset_selected_png")
					])
			];
		}
		var _proto = ChatUserSkin3$Skin21.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "3chat_noset_normal2_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatUserSkin3$Skin21;
	})(eui.Skin);

	function ChatUserSkin3() {
		_super.call(this);
		this.skinParts = ["chat_btn","noseat_btn","mess_count"];
		
		this.height = 720;
		this.width = 458;
		this.elementsContent = [this._Image1_i(),this.chat_btn_i(),this.noseat_btn_i(),this.mess_count_i()];
	}
	var _proto = ChatUserSkin3.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.scale9Grid = new egret.Rectangle(14,12,29,31);
		t.source = "3chat_noset_bg_png";
		t.top = 0;
		t.width = 406;
		t.x = 2;
		return t;
	};
	_proto.chat_btn_i = function () {
		var t = new eui.ToggleButton();
		this.chat_btn = t;
		t.label = "";
		t.x = 408;
		t.y = 216;
		t.skinName = ChatUserSkin3$Skin20;
		return t;
	};
	_proto.noseat_btn_i = function () {
		var t = new eui.ToggleButton();
		this.noseat_btn = t;
		t.label = "";
		t.visible = false;
		t.x = 408;
		t.y = 362;
		t.skinName = ChatUserSkin3$Skin21;
		return t;
	};
	_proto.mess_count_i = function () {
		var t = new eui.BitmapLabel();
		this.mess_count = t;
		t.font = "room_num_fnt";
		t.height = 20;
		t.text = "0";
		t.textAlign = "center";
		t.visible = false;
		t.x = 412;
		t.y = 427;
		return t;
	};
	return ChatUserSkin3;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat3_skins/UserListItemSkin3.exml'] = window.chessCommonLib.UserListItemSkin3 = (function (_super) {
	__extends(UserListItemSkin3, _super);
	function UserListItemSkin3() {
		_super.call(this);
		this.skinParts = ["avar_img","vip_img","frame_img","name_lb","gold_lb"];
		
		this.height = 87;
		this.width = 386;
		this.elementsContent = [this._Image1_i(),this.avar_img_i(),this.vip_img_i(),this.frame_img_i(),this.name_lb_i(),this.gold_lb_i(),this._Image2_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.headUrl"],[0],this.avar_img,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.vipLevel"],[0],this.vip_img,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.nickName"],[0],this.name_lb,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.remainder"],[0],this.gold_lb,"text");
	}
	var _proto = UserListItemSkin3.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(14,11,9,10);
		t.source = "3chat_userlist_bg_png";
		t.top = 0;
		return t;
	};
	_proto.avar_img_i = function () {
		var t = new eui.Image();
		this.avar_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 55;
		t.verticalCenter = 0;
		t.width = 55;
		t.x = 15;
		return t;
	};
	_proto.vip_img_i = function () {
		var t = new eui.Image();
		this.vip_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 105;
		t.width = 115;
		t.x = -15;
		t.y = -7;
		return t;
	};
	_proto.frame_img_i = function () {
		var t = new eui.Image();
		this.frame_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.source = "chat_input_png";
		t.visible = false;
		t.width = 60;
		t.x = 11.5;
		t.y = 14;
		return t;
	};
	_proto.name_lb_i = function () {
		var t = new eui.Label();
		this.name_lb = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 25;
		t.size = 23;
		t.textAlign = "left";
		t.textColor = 0xf8f87e;
		t.verticalCenter = 0;
		t.width = 165;
		t.x = 87;
		return t;
	};
	_proto.gold_lb_i = function () {
		var t = new eui.Label();
		this.gold_lb = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 24;
		t.size = 23;
		t.textAlign = "left";
		t.textColor = 0xf8f87e;
		t.verticalCenter = 0.5;
		t.width = 110;
		t.x = 295;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 45;
		t.source = "3chat_coin_png";
		t.verticalCenter = 0;
		t.width = 45;
		t.x = 252;
		return t;
	};
	return UserListItemSkin3;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat3_skins/UserListSkin3.exml'] = window.chessCommonLib.UserListSkin3 = (function (_super) {
	__extends(UserListSkin3, _super);
	function UserListSkin3() {
		_super.call(this);
		this.skinParts = ["loadingTip","null","noseat_lst","loading_img"];
		
		this.height = 720;
		this.width = 408;
		this.loadingTip_i();
		this.elementsContent = [this._Scroller1_i(),this.loading_img_i()];
		
		eui.Binding.$bindProperties(this, ["loading_img"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [360],[],this._Object1,"rotation");
	}
	var _proto = UserListSkin3.prototype;

	_proto.loadingTip_i = function () {
		var t = new egret.tween.TweenGroup();
		this.loadingTip = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._To1_i()];
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 3000;
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 700;
		t.width = 386;
		t.x = 10;
		t.y = 10;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this.noseat_lst_i()];
		return t;
	};
	_proto.noseat_lst_i = function () {
		var t = new eui.List();
		this.noseat_lst = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = chessCommonLib.UserListItemSkin3;
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "justify";
		t.paddingTop = 0;
		t.verticalAlign = "top";
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this.null_i()];
		return t;
	};
	_proto.null_i = function () {
		var t = {};
		this.null = t;
		t.headUrl = "null";
		t.nickName = "null";
		t.remainder = "null";
		return t;
	};
	_proto.loading_img_i = function () {
		var t = new eui.Image();
		this.loading_img = t;
		t.anchorOffsetX = 18;
		t.anchorOffsetY = 18;
		t.horizontalCenter = 0;
		t.source = "chat_loading_png";
		t.verticalCenter = 0;
		return t;
	};
	return UserListSkin3;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat_skins/ChatLabaItemSkin1.exml'] = window.chessCommonLib.ChatLabaItemSkin1 = (function (_super) {
	__extends(ChatLabaItemSkin1, _super);
	function ChatLabaItemSkin1() {
		_super.call(this);
		this.skinParts = ["notice_lb","chat_laba_vip_img"];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.notice_lb_i(),this.chat_laba_vip_img_i()];
	}
	var _proto = ChatLabaItemSkin1.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = -7;
		t.left = 0;
		t.right = 1;
		t.scale9Grid = new egret.Rectangle(17,13,45,46);
		t.source = "chat_userlist_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "chat_laba_icon_png";
		t.x = 14;
		t.y = 6.5;
		return t;
	};
	_proto.notice_lb_i = function () {
		var t = new eui.Label();
		this.notice_lb = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 5;
		t.left = 123;
		t.lineSpacing = 10;
		t.maxChars = 60;
		t.right = 13;
		t.size = 26;
		t.text = "testrgergwergewgwegwergg";
		t.textColor = 0xfdf4a9;
		t.top = 6;
		return t;
	};
	_proto.chat_laba_vip_img_i = function () {
		var t = new eui.Image();
		this.chat_laba_vip_img = t;
		t.source = "chat_vip_icon_png";
		t.visible = false;
		t.x = 65.5;
		t.y = 7;
		return t;
	};
	return ChatLabaItemSkin1;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat_skins/ChatListItemSkin1.exml'] = window.chessCommonLib.ChatListItemSkin1 = (function (_super) {
	__extends(ChatListItemSkin1, _super);
	function ChatListItemSkin1() {
		_super.call(this);
		this.skinParts = ["avar_img","vip_img","name_txt","time_txt","chat_txt"];
		
		this.width = 386;
		this.elementsContent = [this.avar_img_i(),this.vip_img_i(),this.name_txt_i(),this.time_txt_i(),this._Image1_i(),this.chat_txt_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.data.headUrl"],[0],this.avar_img,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.data.nickName"],[0],this.name_txt,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.data.words"],[0],this.chat_txt,"text");
	}
	var _proto = ChatListItemSkin1.prototype;

	_proto.avar_img_i = function () {
		var t = new eui.Image();
		this.avar_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 46;
		t.width = 49;
		t.x = 20;
		t.y = 19;
		return t;
	};
	_proto.vip_img_i = function () {
		var t = new eui.Image();
		this.vip_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.width = 105;
		t.x = -9;
		t.y = -1;
		return t;
	};
	_proto.name_txt_i = function () {
		var t = new eui.Label();
		this.name_txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.textColor = 0x14142a;
		t.x = 88;
		t.y = 9;
		return t;
	};
	_proto.time_txt_i = function () {
		var t = new eui.Label();
		this.time_txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.right = 1;
		t.size = 20;
		t.textColor = 0x14142A;
		t.y = 10;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 12;
		t.height = 30;
		t.left = 90;
		t.right = 2;
		t.scale9Grid = new egret.Rectangle(24,23,84,32);
		t.source = "chat_chat_bg_png";
		t.top = 37;
		t.width = 306;
		return t;
	};
	_proto.chat_txt_i = function () {
		var t = new eui.Label();
		this.chat_txt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 22;
		t.fontFamily = "Microsoft YaHei";
		t.left = 109;
		t.lineSpacing = 6;
		t.right = 4;
		t.size = 23;
		t.top = 43;
		return t;
	};
	return ChatListItemSkin1;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat_skins/ChatListSkin1.exml'] = window.chessCommonLib.ChatListSkin1 = (function (_super) {
	__extends(ChatListSkin1, _super);
	var ChatListSkin1$Skin22 = 	(function (_super) {
		__extends(ChatListSkin1$Skin22, _super);
		function ChatListSkin1$Skin22() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_room_btn_normal_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatListSkin1$Skin22.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_room_btn_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatListSkin1$Skin22;
	})(eui.Skin);

	var ChatListSkin1$Skin23 = 	(function (_super) {
		__extends(ChatListSkin1$Skin23, _super);
		function ChatListSkin1$Skin23() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_laba_btn_selected_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatListSkin1$Skin23.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_laba_btn_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatListSkin1$Skin23;
	})(eui.Skin);

	var ChatListSkin1$Skin24 = 	(function (_super) {
		__extends(ChatListSkin1$Skin24, _super);
		function ChatListSkin1$Skin24() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_send_selected_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatListSkin1$Skin24.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_send_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatListSkin1$Skin24;
	})(eui.Skin);

	var ChatListSkin1$Skin25 = 	(function (_super) {
		__extends(ChatListSkin1$Skin25, _super);
		function ChatListSkin1$Skin25() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_laba_drop_selected_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatListSkin1$Skin25.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_laba_drop_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatListSkin1$Skin25;
	})(eui.Skin);

	var ChatListSkin1$Skin26 = 	(function (_super) {
		__extends(ChatListSkin1$Skin26, _super);
		function ChatListSkin1$Skin26() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_room_drop_selected_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatListSkin1$Skin26.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_room_drop_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatListSkin1$Skin26;
	})(eui.Skin);

	function ChatListSkin1() {
		_super.call(this);
		this.skinParts = ["roomType_btn","labaType_btn","send_bt","chat_etxt","chat_lst","chat_scr","labaDrop_btn","roomDrop_btn","chat_select_grp"];
		
		this.height = 720;
		this.width = 415;
		this.elementsContent = [this._Group1_i(),this.chat_scr_i(),this.chat_select_grp_i()];
	}
	var _proto = ChatListSkin1.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.width = 396;
		t.x = 9;
		t.y = 653;
		t.elementsContent = [this._Image1_i(),this.roomType_btn_i(),this.labaType_btn_i(),this._Image2_i(),this.send_bt_i(),this.chat_etxt_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(8,7,49,46);
		t.source = "chat_input_bg_png";
		t.top = 0;
		return t;
	};
	_proto.roomType_btn_i = function () {
		var t = new eui.Button();
		this.roomType_btn = t;
		t.label = "";
		t.verticalCenter = 0.5;
		t.x = 5.5;
		t.skinName = ChatListSkin1$Skin22;
		return t;
	};
	_proto.labaType_btn_i = function () {
		var t = new eui.Button();
		this.labaType_btn = t;
		t.label = "";
		t.verticalCenter = 0.5;
		t.x = 5.5;
		t.skinName = ChatListSkin1$Skin23;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 44;
		t.left = 92;
		t.right = 76;
		t.scale9Grid = new egret.Rectangle(6,5,38,34);
		t.source = "chat_input_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.send_bt_i = function () {
		var t = new eui.Button();
		this.send_bt = t;
		t.label = "";
		t.verticalCenter = 0.5;
		t.x = 323;
		t.skinName = ChatListSkin1$Skin24;
		return t;
	};
	_proto.chat_etxt_i = function () {
		var t = new eui.EditableText();
		this.chat_etxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 31;
		t.left = "99";
		t.prompt = "请输入聊天内容";
		t.right = "83";
		t.size = 24;
		t.text = "";
		t.textColor = 0x14142a;
		t.verticalAlign = "middle";
		t.y = 14;
		return t;
	};
	_proto.chat_scr_i = function () {
		var t = new eui.Scroller();
		this.chat_scr = t;
		t.bottom = 82;
		t.left = 15;
		t.right = 15;
		t.top = 20;
		t.viewport = this._Group2_i();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.chat_lst_i()];
		return t;
	};
	_proto.chat_lst_i = function () {
		var t = new eui.List();
		this.chat_lst = t;
		t.itemRendererSkinName = chessCommonLib.ChatListItemSkin1;
		t.left = 0;
		t.right = 0;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		t.horizontalAlign = "justify";
		t.verticalAlign = "top";
		return t;
	};
	_proto.chat_select_grp_i = function () {
		var t = new eui.Group();
		this.chat_select_grp = t;
		t.x = 15;
		t.y = 590;
		t.elementsContent = [this.labaDrop_btn_i(),this.roomDrop_btn_i()];
		return t;
	};
	_proto.labaDrop_btn_i = function () {
		var t = new eui.Button();
		this.labaDrop_btn = t;
		t.label = "";
		t.skinName = ChatListSkin1$Skin25;
		return t;
	};
	_proto.roomDrop_btn_i = function () {
		var t = new eui.Button();
		this.roomDrop_btn = t;
		t.label = "";
		t.skinName = ChatListSkin1$Skin26;
		return t;
	};
	return ChatListSkin1;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat_skins/ChatUserSkin1.exml'] = window.chessCommonLib.ChatUserSkin1 = (function (_super) {
	__extends(ChatUserSkin1, _super);
	var ChatUserSkin1$Skin27 = 	(function (_super) {
		__extends(ChatUserSkin1$Skin27, _super);
		function ChatUserSkin1$Skin27() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_chat_selected_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","chat_chat_selected_png")
					])
			];
		}
		var _proto = ChatUserSkin1$Skin27.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_chat_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatUserSkin1$Skin27;
	})(eui.Skin);

	var ChatUserSkin1$Skin28 = 	(function (_super) {
		__extends(ChatUserSkin1$Skin28, _super);
		function ChatUserSkin1$Skin28() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","chat_noset_selected_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","chat_noset_selected_png")
					])
			];
		}
		var _proto = ChatUserSkin1$Skin28.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "chat_noset_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatUserSkin1$Skin28;
	})(eui.Skin);

	function ChatUserSkin1() {
		_super.call(this);
		this.skinParts = ["chat_btn","noseat_btn","mess_count"];
		
		this.height = 720;
		this.width = 458;
		this.elementsContent = [this._Image1_i(),this.chat_btn_i(),this.noseat_btn_i(),this.mess_count_i()];
	}
	var _proto = ChatUserSkin1.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.scale9Grid = new egret.Rectangle(12,11,66,72);
		t.source = "chat_noset_bg_png";
		t.top = 0;
		t.width = 420;
		t.x = 0;
		return t;
	};
	_proto.chat_btn_i = function () {
		var t = new eui.ToggleButton();
		this.chat_btn = t;
		t.label = "";
		t.left = 406;
		t.y = 222;
		t.skinName = ChatUserSkin1$Skin27;
		return t;
	};
	_proto.noseat_btn_i = function () {
		var t = new eui.ToggleButton();
		this.noseat_btn = t;
		t.label = "";
		t.left = 409;
		t.visible = false;
		t.y = 348;
		t.skinName = ChatUserSkin1$Skin28;
		return t;
	};
	_proto.mess_count_i = function () {
		var t = new eui.BitmapLabel();
		this.mess_count = t;
		t.font = "room_num_fnt";
		t.height = 20;
		t.text = "0";
		t.textAlign = "center";
		t.visible = false;
		t.x = 420;
		t.y = 427;
		return t;
	};
	return ChatUserSkin1;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat_skins/UserListItemSkin1.exml'] = window.chessCommonLib.UserListItemSkin1 = (function (_super) {
	__extends(UserListItemSkin1, _super);
	function UserListItemSkin1() {
		_super.call(this);
		this.skinParts = ["avar_img","vip_img","frame_img","name_lb","gold_lb"];
		
		this.height = 93;
		this.elementsContent = [this._Image1_i(),this.avar_img_i(),this.vip_img_i(),this.frame_img_i(),this.name_lb_i(),this.gold_lb_i(),this._Image2_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.headUrl"],[0],this.avar_img,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.vipLevel"],[0],this.vip_img,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.nickName"],[0],this.name_lb,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.remainder"],[0],this.gold_lb,"text");
	}
	var _proto = UserListItemSkin1.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(17,13,45,46);
		t.source = "chat_userlist_bg_png";
		t.top = 0;
		return t;
	};
	_proto.avar_img_i = function () {
		var t = new eui.Image();
		this.avar_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 55;
		t.width = 55;
		t.x = 14;
		t.y = 17;
		return t;
	};
	_proto.vip_img_i = function () {
		var t = new eui.Image();
		this.vip_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 97;
		t.width = 118;
		t.x = -18;
		t.y = -1;
		return t;
	};
	_proto.frame_img_i = function () {
		var t = new eui.Image();
		this.frame_img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.source = "chat_input_png";
		t.visible = false;
		t.width = 60;
		t.x = 11.5;
		t.y = 14;
		return t;
	};
	_proto.name_lb_i = function () {
		var t = new eui.Label();
		this.name_lb = t;
		t.horizontalCenter = 37;
		t.textColor = 0xabc2ff;
		t.y = 10.5;
		return t;
	};
	_proto.gold_lb_i = function () {
		var t = new eui.Label();
		this.gold_lb = t;
		t.horizontalCenter = 37;
		t.size = 26;
		t.textColor = 0xfdf4a9;
		t.y = 49;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 45;
		t.source = "chat_coin_png";
		t.width = 45;
		t.x = 91;
		t.y = 41;
		return t;
	};
	return UserListItemSkin1;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/chat_skins/UserListSkin1.exml'] = window.chessCommonLib.UserListSkin1 = (function (_super) {
	__extends(UserListSkin1, _super);
	function UserListSkin1() {
		_super.call(this);
		this.skinParts = ["loadingTip","null","noseat_lst","loading_img"];
		
		this.height = 720;
		this.width = 400;
		this.loadingTip_i();
		this.elementsContent = [this._Scroller1_i(),this.loading_img_i()];
		
		eui.Binding.$bindProperties(this, ["loading_img"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [360],[],this._Object1,"rotation");
	}
	var _proto = UserListSkin1.prototype;

	_proto.loadingTip_i = function () {
		var t = new egret.tween.TweenGroup();
		this.loadingTip = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._To1_i()];
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 3000;
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 680;
		t.width = 363;
		t.x = 19;
		t.y = 20;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.noseat_lst_i()];
		return t;
	};
	_proto.noseat_lst_i = function () {
		var t = new eui.List();
		this.noseat_lst = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = chessCommonLib.UserListItemSkin1;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "justify";
		t.paddingTop = 0;
		t.verticalAlign = "top";
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this.null_i()];
		return t;
	};
	_proto.null_i = function () {
		var t = {};
		this.null = t;
		t.headUrl = "null";
		t.nickName = "null";
		t.remainder = "null";
		return t;
	};
	_proto.loading_img_i = function () {
		var t = new eui.Image();
		this.loading_img = t;
		t.anchorOffsetX = 18;
		t.anchorOffsetY = 18;
		t.source = "chat_loading_png";
		t.x = 202;
		t.y = 361;
		return t;
	};
	return UserListSkin1;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/EmjoChatSkins/LobbyChatFcaeItemSkin.exml'] = window.chessCommonLib.LobbyChatFcaeItemSkin = (function (_super) {
	__extends(LobbyChatFcaeItemSkin, _super);
	function LobbyChatFcaeItemSkin() {
		_super.call(this);
		this.skinParts = ["faceIcon"];
		
		this.height = 67;
		this.width = 67;
		this.elementsContent = [this.faceIcon_i()];
	}
	var _proto = LobbyChatFcaeItemSkin.prototype;

	_proto.faceIcon_i = function () {
		var t = new eui.Image();
		this.faceIcon = t;
		t.source = "";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return LobbyChatFcaeItemSkin;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/EmjoChatSkins/LobbyChatFcaePanelSkin.exml'] = window.chessCommonLib.LobbyChatFcaePanelSkin = (function (_super) {
	__extends(LobbyChatFcaePanelSkin, _super);
	function LobbyChatFcaePanelSkin() {
		_super.call(this);
		this.skinParts = ["faceList","faceList1","scroll","page1Point1","page1Point2","page2Point1","page2Point2"];
		
		this.height = 320;
		this.width = 920;
		this.elementsContent = [this._Image1_i(),this.scroll_i(),this.page1Point1_i(),this.page1Point2_i(),this.page2Point1_i(),this.page2Point2_i()];
	}
	var _proto = LobbyChatFcaePanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "sz_common_chat_facebg";
		t.y = 0;
		return t;
	};
	_proto.scroll_i = function () {
		var t = new eui.Scroller();
		this.scroll = t;
		t.anchorOffsetY = 0;
		t.height = 308.66;
		t.scrollPolicyV = "off";
		t.width = 892;
		t.x = 13;
		t.y = 7.67;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.x = 22;
		t.y = -139.67;
		t.elementsContent = [this.faceList_i(),this.faceList1_i()];
		return t;
	};
	_proto.faceList_i = function () {
		var t = new eui.List();
		this.faceList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 284.66;
		t.itemRendererSkinName = chessCommonLib.LobbyChatFcaeItemSkin;
		t.width = 888.67;
		t.x = 0;
		t.y = 10;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 31;
		t.paddingLeft = 20;
		t.requestedColumnCount = 9;
		t.verticalGap = 33;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i(),this._Object9_i(),this._Object10_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto.faceList1_i = function () {
		var t = new eui.List();
		this.faceList1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 284.66;
		t.itemRendererSkinName = chessCommonLib.LobbyChatFcaeItemSkin;
		t.width = 888.67;
		t.x = 900;
		t.y = 10;
		t.layout = this._TileLayout2_i();
		t.dataProvider = this._ArrayCollection2_i();
		return t;
	};
	_proto._TileLayout2_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 31;
		t.paddingLeft = 20;
		t.requestedColumnCount = 9;
		t.verticalGap = 33;
		return t;
	};
	_proto._ArrayCollection2_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object11_i(),this._Object12_i(),this._Object13_i(),this._Object14_i(),this._Object15_i(),this._Object16_i(),this._Object17_i(),this._Object18_i(),this._Object19_i(),this._Object20_i()];
		return t;
	};
	_proto._Object11_i = function () {
		var t = {};
		return t;
	};
	_proto._Object12_i = function () {
		var t = {};
		return t;
	};
	_proto._Object13_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object14_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object15_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object16_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object17_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object18_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object19_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object20_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto.page1Point1_i = function () {
		var t = new eui.Image();
		this.page1Point1 = t;
		t.horizontalCenter = -54.5;
		t.source = "sz_common_Chat_json.sz_common_chat_point1";
		t.y = 304;
		return t;
	};
	_proto.page1Point2_i = function () {
		var t = new eui.Image();
		this.page1Point2 = t;
		t.horizontalCenter = -54.5;
		t.source = "sz_common_Chat_json.sz_common_chat_point2";
		t.y = 304;
		return t;
	};
	_proto.page2Point1_i = function () {
		var t = new eui.Image();
		this.page2Point1 = t;
		t.horizontalCenter = -4.5;
		t.source = "sz_common_Chat_json.sz_common_chat_point1";
		t.y = 304;
		return t;
	};
	_proto.page2Point2_i = function () {
		var t = new eui.Image();
		this.page2Point2 = t;
		t.horizontalCenter = -4.5;
		t.source = "sz_common_Chat_json.sz_common_chat_point2";
		t.y = 304;
		return t;
	};
	return LobbyChatFcaePanelSkin;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/EmjoChatSkins/LobbyChatListItemSkin.exml'] = window.chessCommonLib.LobbyChatListItemSkin = (function (_super) {
	__extends(LobbyChatListItemSkin, _super);
	function LobbyChatListItemSkin() {
		_super.call(this);
		this.skinParts = ["chat_lb","name_lb","vipIcon"];
		
		this.width = 960;
		this.elementsContent = [this.chat_lb_i(),this.name_lb_i(),this.vipIcon_i()];
	}
	var _proto = LobbyChatListItemSkin.prototype;

	_proto.chat_lb_i = function () {
		var t = new eui.Label();
		this.chat_lb = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 6;
		t.fontFamily = "null1";
		t.left = 8;
		t.lineSpacing = 5;
		t.maxChars = 60;
		t.multiline = true;
		t.size = 27;
		t.text = "";
		t.textColor = 0x239924;
		t.top = 3;
		t.visible = false;
		t.width = 949;
		return t;
	};
	_proto.name_lb_i = function () {
		var t = new eui.Label();
		this.name_lb = t;
		t.fontFamily = "null1";
		t.height = 26;
		t.size = 27;
		t.textColor = 0x000000;
		t.visible = false;
		t.width = 198;
		t.x = 106;
		t.y = 7;
		return t;
	};
	_proto.vipIcon_i = function () {
		var t = new eui.Image();
		this.vipIcon = t;
		t.source = "mid_vip12";
		t.visible = false;
		t.x = 5.5;
		t.y = 0;
		return t;
	};
	return LobbyChatListItemSkin;
})(eui.Skin);generateEUI.paths['resource/chesscommonres/EmjoChatSkins/LobbyChatPanelSkin.exml'] = window.chessCommonLib.LobbyChatPanelSkin = (function (_super) {
	__extends(LobbyChatPanelSkin, _super);
	var LobbyChatPanelSkin$Skin29 = 	(function (_super) {
		__extends(LobbyChatPanelSkin$Skin29, _super);
		function LobbyChatPanelSkin$Skin29() {
			_super.call(this);
			this.skinParts = ["sendDisable","send_word","send_wordDisable","sendClock"];
			
			this.elementsContent = [this._Image1_i(),this.sendDisable_i(),this.send_word_i(),this.send_wordDisable_i(),this.sendClock_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","sz_common_chat_sendBtn1"),
						new eui.SetProperty("_Image1","scaleX",1.05),
						new eui.SetProperty("_Image1","scaleY",1.05),
						new eui.SetProperty("sendDisable","source","sz_common_chat_sendBtn2"),
						new eui.SetProperty("send_word","source","sz_common_chat_send"),
						new eui.SetProperty("send_word","scaleX",1.1),
						new eui.SetProperty("send_word","scaleY",1.1),
						new eui.SetProperty("send_wordDisable","source","sz_common_chat_send2"),
						new eui.SetProperty("send_wordDisable","scaleX",1.1),
						new eui.SetProperty("send_wordDisable","scaleY",1.1)
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LobbyChatPanelSkin$Skin29.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "sz_common_chat_sendBtn1";
			return t;
		};
		_proto.sendDisable_i = function () {
			var t = new eui.Image();
			this.sendDisable = t;
			t.source = "sz_common_chat_sendBtn2";
			t.visible = false;
			return t;
		};
		_proto.send_word_i = function () {
			var t = new eui.Image();
			this.send_word = t;
			t.anchorOffsetX = 54.67;
			t.anchorOffsetY = 20;
			t.horizontalCenter = 0;
			t.source = "sz_common_chat_send";
			t.verticalCenter = 0.5;
			t.visible = true;
			return t;
		};
		_proto.send_wordDisable_i = function () {
			var t = new eui.Image();
			this.send_wordDisable = t;
			t.anchorOffsetX = 54.67;
			t.anchorOffsetY = 20;
			t.horizontalCenter = 0;
			t.source = "sz_common_chat_send2";
			t.verticalCenter = 0.5;
			return t;
		};
		_proto.sendClock_i = function () {
			var t = new eui.Label();
			this.sendClock = t;
			t.anchorOffsetX = 0;
			t.anchorOffsetY = 0;
			t.fontFamily = "null1";
			t.height = 53;
			t.size = 33;
			t.text = "";
			t.textAlign = "center";
			t.verticalAlign = "middle";
			t.width = 110.34;
			t.x = 11.33;
			t.y = 8;
			return t;
		};
		return LobbyChatPanelSkin$Skin29;
	})(eui.Skin);

	var LobbyChatPanelSkin$Skin30 = 	(function (_super) {
		__extends(LobbyChatPanelSkin$Skin30, _super);
		function LobbyChatPanelSkin$Skin30() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","sz_Lobby_help_close"),
						new eui.SetProperty("_Image1","scaleX",1.1),
						new eui.SetProperty("_Image1","scaleY",1.1)
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LobbyChatPanelSkin$Skin30.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "sz_Lobby_help_close";
			return t;
		};
		return LobbyChatPanelSkin$Skin30;
	})(eui.Skin);

	function LobbyChatPanelSkin() {
		_super.call(this);
		this.skinParts = ["loadingTip","loading_img","chatSend","chatClose","chatList","chatScroll","chatFaceIcon","hornIcon","chatContentLable","hornNum","touchMask"];
		
		this.height = 720;
		this.width = 1280;
		this.loadingTip_i();
		this.elementsContent = [this._Image1_i(),this.loading_img_i(),this.chatSend_i(),this.chatClose_i(),this.chatScroll_i(),this.chatFaceIcon_i(),this.hornIcon_i(),this._Image2_i(),this.chatContentLable_i(),this.hornNum_i(),this.touchMask_i()];
		
		eui.Binding.$bindProperties(this, ["loading_img"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [360],[],this._Object1,"rotation");
	}
	var _proto = LobbyChatPanelSkin.prototype;

	_proto.loadingTip_i = function () {
		var t = new egret.tween.TweenGroup();
		this.loadingTip = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._To1_i()];
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 3000;
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "sz_common_Chat_json.sz_common_chat_bg";
		t.y = 78.33;
		return t;
	};
	_proto.loading_img_i = function () {
		var t = new eui.Image();
		this.loading_img = t;
		t.anchorOffsetX = 58;
		t.anchorOffsetY = 58;
		t.horizontalCenter = 0;
		t.source = "Emojchat_loading_png";
		t.y = 316;
		return t;
	};
	_proto.chatSend_i = function () {
		var t = new eui.Button();
		this.chatSend = t;
		t.anchorOffsetX = 66.33;
		t.anchorOffsetY = 35.67;
		t.label = "";
		t.width = 130;
		t.x = 1042.83;
		t.y = 587;
		t.skinName = LobbyChatPanelSkin$Skin29;
		return t;
	};
	_proto.chatClose_i = function () {
		var t = new eui.Button();
		this.chatClose = t;
		t.anchorOffsetX = 29;
		t.anchorOffsetY = 25;
		t.label = "";
		t.x = 1120.5;
		t.y = 53.83;
		t.skinName = LobbyChatPanelSkin$Skin30;
		return t;
	};
	_proto.chatScroll_i = function () {
		var t = new eui.Scroller();
		this.chatScroll = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bounces = false;
		t.height = 420.33;
		t.scrollPolicyH = "off";
		t.width = 963;
		t.x = 159;
		t.y = 109;
		t.viewport = this.chatList_i();
		return t;
	};
	_proto.chatList_i = function () {
		var t = new eui.List();
		this.chatList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 453.66;
		t.itemRendererSkinName = chessCommonLib.LobbyChatListItemSkin;
		t.x = 0;
		t.y = -30.67;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 4;
		t.horizontalAlign = "justify";
		t.verticalAlign = "top";
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i(),this._Object9_i()];
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.x = "1";
		t.y = "2";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		t.dsf = "null";
		return t;
	};
	_proto.chatFaceIcon_i = function () {
		var t = new eui.Image();
		this.chatFaceIcon = t;
		t.source = "sz_common_Chat_json.sz_common_chat_icon";
		t.x = 805.33;
		t.y = 561.33;
		return t;
	};
	_proto.hornIcon_i = function () {
		var t = new eui.Image();
		this.hornIcon = t;
		t.source = "sz_common_Chat_json.sz_common_chat_horn";
		t.x = 874;
		t.y = 565.83;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 70;
		t.scale9Grid = new egret.Rectangle(74,15,448,18);
		t.source = "sz_common_Chat_json.sz_common_chat_mask";
		t.width = 640;
		t.x = 162;
		t.y = 550.33;
		return t;
	};
	_proto.chatContentLable_i = function () {
		var t = new eui.EditableText();
		this.chatContentLable = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "null1";
		t.height = 64;
		t.multiline = true;
		t.prompt = "请在此输入内容，总长度不超过40个字";
		t.size = 27;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0x050505;
		t.verticalAlign = "middle";
		t.width = 623;
		t.x = 171;
		t.y = 555.33;
		return t;
	};
	_proto.hornNum_i = function () {
		var t = new eui.Label();
		this.hornNum = t;
		t.fontFamily = "null1";
		t.size = 24;
		t.text = "";
		t.textAlign = "center";
		t.width = 63;
		t.x = 913;
		t.y = 574;
		return t;
	};
	_proto.touchMask_i = function () {
		var t = new eui.Rect();
		this.touchMask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.fillColor = 0xfcfcfc;
		t.height = 723;
		t.touchEnabled = false;
		t.width = 1278.33;
		return t;
	};
	return LobbyChatPanelSkin;
})(eui.Skin);