/**
 * 游戏内任务面板
 */
module paoupgrade {

	export class GameInTaskItem extends eui.Component {

        private reward_icon:eui.Image;
        private reward_num:eui.Label;

        private task_title:eui.Label;
        private task_progress:eui.Label;
        private task_bar:eui.ProgressBar;

        public constructor() {
            super();
            this.skinName = "GameInTaskItemSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.task_bar.minimum = 0;
        }

        public setInfo(info:Cmd.DaysTaskItem):boolean{
            let task: table.LobbyTaskConfig = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            this.reward_icon.source = "game_prop_json.bag_daoju_"+task.taskReward[0].goodId;
            commonConfirm.ResUtil.limitImageSize(this.reward_icon,63);
            if(task.taskReward[0].goodNbr >= 10000)
                this.reward_num.text = (task.taskReward[0].goodNbr/10000).toFixed(2)+"万";
            else
                this.reward_num.text = task.taskReward[0].goodNbr+"";
            this.task_title.text = task.taskDesc;
            this.task_progress.text = info.current + "/" + task.taskCondition;
            // this.task_bar.width = (info.current/task.taskCondition)*168;
            this.task_bar.maximum = task.taskCondition;
            this.task_bar.value = info.current;
            return info.taskStatus == Cmd.TaskStatus.Task_Status_Complete
        }

        public destroy(): void {
            this.removeChildren();
        }
    }
    
} 