module chessCommonLib {
    export class SendGiftUtils {
        public constructor() {
        }

		/**
		 * 发送礼物     giftId礼物编号      receivePos终点位置      sendPos起始位置
		 */
        public static sendGift(giftId: number, receivePos: egret.Point, sendPos: egret.Point, container?: egret.DisplayObjectContainer, animationName: string = "newAnimation") {
            let giftItem: dragonBones.Armature = uniLib.DragonUtils.createDragonBonesDisplay("gift_effect_" + giftId + "_ske_json", "gift_effect_" + giftId + "_tex_json", "gift_effect_" + giftId + "_tex_png", uniLib.DragonType.ARMATURE);
            giftItem.display.x = sendPos.x;
            giftItem.display.y = sendPos.y;
            if (giftItem.animation.hasAnimation(animationName)) {
                giftItem.animation.gotoAndStopByFrame(animationName, 1);
                if (container == null) {
                    if (uniLib.SceneMgr.instance.currentScene) {
                        container = uniLib.SceneMgr.instance.currentScene.effectLayer;
                    }
                    else {
                        container = egret.MainContext.instance.stage;
                    }
                }
                container.addChild(giftItem.display);
                egret.Tween.get(giftItem.display).to({ x: receivePos.x, y: receivePos.y * uniLib.ScreenUtils.scaleFactor }, 400, egret.Ease.circOut).call(function () {
                    egret.Tween.removeTweens(giftItem.display);
                    uniLib.SoundMgr.instance.playSound("GiftSound" + giftId + "_mp3");
                    uniLib.DragonUtils.runDragonBonesArmature(giftItem, animationName, 1);
                    giftItem.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, function () {
                        uniLib.DisplayUtils.removeFromParent(giftItem.display);
                        uniLib.DragonUtils.destoryDragonBonesArmature(giftItem, animationName);
                    }, this);
                })
            }
            else{
                egret.log(animationName + " not-existent");
            }
        }
    }
}