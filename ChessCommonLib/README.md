# 通用组件库


## 表情聊天组件-----------------------------------------
* 协议部分，目前协议已经完全将聊天部分和无座玩家的协议抽离出来
* 使用方法：    
           /**传入需要的socketName数组，游戏一般需要同
            * 时传入uniLib和大厅模块名，大厅一般只需要传入对应的module名
            * 按照[0]是游戏内，[1]是大厅socket的顺序，
            * 当是大厅，则[0]是大厅，[1]不需要
            */
             chesscommonlib.CommonVariable.getInstance().socketName = ["uniLib","Lobby"]
            if (this._chatPanel == null) {
                this._chatPanel = new chesscommonlib.LobbyChatPanel();
                BC.addEvent(this, this._chatPanel, LobbyUIEventConsts.CLOSE, this.closeChat);

            }
            this._chatPanel.initView();
            uniLib.PopUpMgr.addPopUp(this._chatPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			
需要的资源组件：
                chessCommonLib.GrpConsts.CHESS_COMMON_SANZHANG,
                chessCommonLib.GrpConsts.CHESS_COMMON_EMOJCHAT,
			
### 额外需要知道：
符号"(1)"是特殊内容，括号里面的数字会被解析成图片编号，目前前50代表表情 ，从100到111吧
符号"<1>"是特殊内容，尖括号里面的数字会被解析成颜色编号，目前是1-4对应["0xffe097", "0xf9e3ff", "0xffd200", "0x0aaee0"]		

### 单独获得由表情组件解析生成的内容：
            let _chatComponent = new chatComponent("这是测试(22).看我表情(1)(3)")
			let content = _chatComponent.showContent(500);//500是指定的一行的最大宽度
			this.addChild(content);		
通过上面的可以直接将内容解析后添加到舞台上
## 表情聊天组件-----------------------------------------