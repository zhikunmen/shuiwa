module match {
    export class HpwGameRule extends eui.Component {

        public rule_lbl:eui.Label;

        private _sceneId: number;

        constructor(sceneId: number) {
            super();
            this._sceneId = sceneId;
            this.skinName = "HpwGameRuleSkin";
        }

        public childrenCreated(){
            super.childrenCreated();
            let config = table.getMatchConfigBySceneId(this._sceneId);
            if(config){
                if(config.MatchPlayerNumber == 6){
                    this.rule_lbl.text = "满6人";
                }
                else{
                    this.rule_lbl.text = "不限";
                }
            }
        }
    }
}