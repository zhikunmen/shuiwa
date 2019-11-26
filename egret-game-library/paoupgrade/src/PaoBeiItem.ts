/**
 * 游戏内任务面板
 */
module paoupgrade {

	export class PaoBeiItem extends eui.ItemRenderer {

        private pao_text:eui.Label;
        private reward_num:eui.Label;
        private need_icon:eui.Image;
        private need_num:eui.Label;

        public constructor() {
            super();
            this.skinName = "PaoBeiItemSkin";
        }

        public dataChanged() {
            super.dataChanged();

            var conf:table.TableFishGun = this.data;
            this.pao_text.text = conf.gunTime+"倍";
            this.reward_num.text = "x"+conf.unlockGold;
            this.need_num.text = "x"+conf.unlockDiamon;
        }
    }
    
} 