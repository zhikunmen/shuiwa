class VIPItemView extends eui.ItemRenderer {

	private pao_text:eui.Label;
	private pao_img:eui.Image;
	private vip_level:eui.Label;
	private vip_desc:eui.Label;
	private vip_receive:eui.WxButton;
	private paoEffect:egret.MovieClip;

	 constructor() {
		super();
		this.skinName = "VipItemSkin";
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.vip_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
	}

	private onTouchHandle(e:egret.TouchEvent):void{
		let req:Cmd.GetFishVipRewardCmd_CS = new Cmd.GetFishVipRewardCmd_CS();
		req.level = this.data.level;
		NetMgr.tcpSend(req);
	}


	public dataChanged() {
		super.dataChanged();
		let reward:vip.VipReward = this.data
		let level:number = reward.level;
		
		this.vip_level.textFlow = <Array<egret.ITextElement>>[{ text: "VIP"+level, style: { textColor: 0xFF00E8 } }, { text: "特权", style: {textColor: 0x8E2A06 } }];
		let vipConfig:table.TableFishVIP = ConfigMgr.getInstance().getFishVipByLv(level);
		let html= new egret.HtmlTextParser();
		this.vip_desc.textFlow = html.parser(vipConfig.des);
		
		var gun:table.TableFishGunType = ConfigMgr.getInstance().getFishGunTypeByID(vipConfig.unlockCannon);
		if(vipConfig.unlockCannon>0){
			this.setPaoWH(vipConfig.unlockCannon);
			this.setEffect(vipConfig.unlockCannon);
			this.vip_receive.visible = false;
			if(gun)
				this.pao_text.text = gun.gunName;
		}else{
			let count:number = vipConfig.vipReward[0].count;
			 if( count<1000000){
				this.pao_img.source = "vip_json.vip_gold2";
			}else{
				this.pao_img.source = "vip_json.vip_gold3";
			}
			this.pao_img.x = (129 - 88);
			this.pao_img.y = (148 - 88);
			if(count>=10000)
				this.pao_text.text = count/10000 +"万金币";
			else
				this.pao_text.text = count +"金币";
			
			if(MJLobbyData.getInstance().userInfoSynLobby.userInfo.vip >= level){
				if(reward.unReceived){
					this.vip_receive.visible = true;
				}else{
					this.vip_receive.visible = false;
				}
			}else{
				this.vip_receive.visible = false;
			}
			this.removeEffect();
		
		}
		this.pao_text.x = 129- this.pao_text.width/2;
	}

	private setPaoWH(id:number):void{
		this.pao_img.source = "pao_tai_"+id;
		if(this.pao_img.width == 0){
			this.pao_img.x = (129 - 180/2);
			this.pao_img.y = (148 - 150/2);
		}else{
			this.pao_img.x = (129 - this.pao_img.width/2);
			this.pao_img.y = (148 - this.pao_img.height/2);
		}
		
	}

	private setEffect(id:number):void{
		this.removeEffect();
		this.paoEffect = vip.VIPPanel.createMovieClicp("paotai_effect_"+id);
		this.addChild(this.paoEffect);
		this.paoEffect.x = 129;
		this.paoEffect.y = 148;
		this.paoEffect.play(-1);
	}

	private removeEffect():void{
		if(this.paoEffect){
			this.paoEffect.stop();
			uniLib.DisplayUtils.removeFromParent(this.paoEffect);
			this.paoEffect = null;
		}
	}

	public destroy():void{
		this.vip_receive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
		this.removeEffect();
	}

}
