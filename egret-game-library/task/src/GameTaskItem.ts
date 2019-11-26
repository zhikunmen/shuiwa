module task {
    export class GameTaskItem extends eui.ItemRenderer {

        private desc_text: eui.Label;
        private reward_text: eui.Label;
        private progress_text: eui.Label;
        private reward_icon:eui.Image;

        constructor() {
            super();
            this.skinName = "GameTaskItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }


        protected dataChanged() {
            super.dataChanged();
            var info: Cmd.DaysTaskItem = this.data;
            let task: table.TableGameTaskConfig = ConfigMgr.getInstance().getGameTaskCfgById(info.taskId);
            if(task == null){
                this.clear();
                return;
            }
            this.desc_text.text = task.taskDesc;

            this.progress_text.text =info.current + "/" + task.taskCondition;
            if(info.taskStatus >= Cmd.TaskStatus.Task_Status_Complete)
                this.progress_text.text = "已完成";
            this.progress_text.anchorOffsetX = this.progress_text.width>>1;

            if (task.taskReward) {
                if(task.taskReward[0].goodId == 6){
                    this.reward_text.text =  " x"+task.taskReward[0].goodNbr;
                    this.reward_icon.source = "game_task_json.renwu_zuanshi";
                }else if(task.taskReward[0].goodId == 32){
                    this.reward_text.text = task.taskReward[0].goodNbr + "";
                    this.reward_icon.source = "game_task_json.renwu_jinbi";
                }
                    
            }
        }

        private clear():void{
            this.desc_text.text = "";
            this.progress_text.text = "";
            this.reward_text.text = "";
            this.reward_icon.source = null;
        }

        public destroy(): void {
            
        }
    }
}