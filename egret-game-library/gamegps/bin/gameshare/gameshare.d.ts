declare module gamegps {
    class ShareConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static GAME_GPS: string;
    }
}
declare module gamegps {
    class GameGpsPanel extends eui.Component {
        private _btn_continue;
        private _btn_close;
        private _btn_leave;
        private _twoPeople;
        private _line_2;
        private _user_group_2_1;
        private _user_group_2_2;
        private _user_headImg_2_1;
        private _user_headImg_2_2;
        private _user_name_2_1;
        private _user_name_2_2;
        private _distance_group_2_1;
        private _distance_bg_2_1;
        private _distance_txt_2_1;
        private _threePeple;
        private _line_3;
        private _user_group_3_1;
        private _user_group_3_2;
        private _user_group_3_3;
        private _user_headImg_3_1;
        private _user_headImg_3_2;
        private _user_headImg_3_3;
        private _user_name_3_1;
        private _user_name_3_2;
        private _user_name_3_3;
        private _distance_group_3_1;
        private _distance_bg_3_1;
        private _distance_txt_3_1;
        private _distance_group_3_2;
        private _distance_bg_3_2;
        private _distance_txt_3_2;
        private _distance_group_3_3;
        private _distance_bg_3_3;
        private _distance_txt_3_3;
        private _fourPeople;
        private _line_4;
        private _user_group_4_1;
        private _user_group_4_2;
        private _user_group_4_3;
        private _user_group_4_4;
        private _user_headImg_4_1;
        private _user_headImg_4_2;
        private _user_headImg_4_3;
        private _user_headImg_4_4;
        private _user_name_4_1;
        private _user_name_4_2;
        private _user_name_4_3;
        private _user_name_4_4;
        private _distance_group_4_1;
        private _distance_bg_4_1;
        private _distance_txt_4_1;
        private _distance_group_4_2;
        private _distance_bg_4_2;
        private _distance_txt_4_2;
        private _distance_group_4_3;
        private _distance_bg_4_3;
        private _distance_txt_4_3;
        private _distance_group_4_4;
        private _distance_bg_4_4;
        private _distance_txt_4_4;
        private _distance_group_4_5;
        private _distance_bg_4_5;
        private _distance_txt_4_5;
        private _distance_group_4_6;
        private _distance_bg_4_6;
        private _distance_txt_4_6;
        private eleMap;
        private distanceMap;
        private userVoList;
        constructor();
        protected createChildren(): void;
        protected initUI(): void;
        private reset();
        closeGPS(): void;
        private onLeave();
        initPanel(): void;
        private addShowPlayer(userVo, userIndex);
        private isWarn;
        private _tip_ok_group;
        private _tip_warn_group;
        private showDistanceAll();
        private showDistance(seatIndex, index1, index2);
        private hasPopUpUidArr;
        private hasPop(userVo1, userVo2);
        destroy2(): void;
    }
}
