module com_main {

    /**收集菜单 */
    export class WorldMenuGatherWidget extends WorldMenuComponent {
        public m_pGInfo: eui.Group;
        public m_lblpCity: eui.Label;
        public m_pLbTitle: eui.Label;
        public m_pLbAwardNum: eui.Label;
        public m_refTime: eui.Label;
        public m_pItem: com_main.ComItemNew;
        public m_colCout: eui.Label;
        public m_pMenu: eui.Group;
        public m_pBg: com_main.CImage;
        public m_pBtnGather: eui.Group;
        public m_pImgGather: com_main.CImage;

        private m_nId: number;   //事件id

        public constructor(id: number) {
            super();
            this.name = "WorldMenu";
            this.initApp("world/WorldMenuGatherSkin.exml");
            this.cacheAsBitmap = true;
            this.m_nId = id;
        }

        public $onRemoveFromStage(): void {
            this.onDestroy();
            EventManager.removeEventListener(this.m_pBtnGather);
            super.$onRemoveFromStage();
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            let eventVo = WorldModel.getEventVoByPosId(this.m_nId);
            let conf = C.EventDataConfig[eventVo.eventDataId];
            if (!conf) {
                error(`WorldMenuGatherWidget:childrenCreated=====id:${this.m_nId} is Empty=====`);
                return;
            }

            let arrPoint = []
                , arr = [this.m_pBtnGather]

            for (let o of arr) {
                arrPoint.push([o.x, o.y])
            }
            this.showBtnTween(arr, arrPoint);

            this.m_pLbTitle.text = GLan(conf.name).replace(/[\d]/g, '');
            this.m_lblpCity.text = GLan(eventVo.coordCfg.name);
            let data = NormalModel.getFunCountById(IFunCountEnum.GATHER_COUNT);
            this.m_colCout.textFlow = Utils.htmlParser(GCodeFromat(CLEnum.WOR_CO_COU, data.useCount, data.maxCount));

            this.m_refTime.text = GCodeFromat(CLEnum.WOR_CO_REF, Math.ceil(eventVo.coordCfg.frequency / 60));
            let award = Utils.parseCommonItemJson(conf.reward);
            let item = award[0];
            this.m_pLbAwardNum.text = `${item.count}`

            this.m_pItem.setItemInfo(item.itemId, item.count);

            // EventManager.addTouchScaleListener(this.m_pBtnGather, this, this.onGatherClick);
        }

        private onGatherClick() {
            let data = NormalModel.getFunCountById(IFunCountEnum.GATHER_COUNT);
            let vipCfg = C.VipPrivillegesConfig[VipPrivillType.BUY_MONSTER];
            let buyMax = Number(vipCfg['vip' + RoleData.vipLevel]);//最大购买数
            if (data.reCount == 0) {
                if (data.buyAmountCount >= buyMax) {
                    Utils.showVipUpConfim();
                    WorldView.callFunc(WORLD_FUNC.HIDE_MENU);
                    return;
                }
                if(platform.isHidePayFunc()) return;
                
                let needGold: number = NormalModel.getFunCostByData(data)
                if (PropModel.isItemEnough(PropEnum.GOLD, needGold, 3)) {
                    let content = GCodeFromat(CLEnum.WOR_BUY_GOLD, needGold) + '\n' + GCodeFromat(CLEnum.VIP_MAX_BUY, (buyMax - data.buyAmountCount));
                    Utils.showConfirmPop(content, this.onConfirmBuy, this);
                    // view.setVipCanBuyNum(GCodeFromat(CLEnum.VIP_MAX_BUY, (buyMax - data.buyAmountCount)))
                }
                WorldView.callFunc(WORLD_FUNC.HIDE_MENU);
                return;
            }
            Utils.open_view(TASK_UI.POP_WORLD_HERO_EVT_PANEL, { evtPosId: this.m_nId, cityId: -1 });
            WorldView.callFunc(WORLD_FUNC.HIDE_MENU);
        }

        //确认购买
        private onConfirmBuy() {
            WorldProxy.C2S_MAP_EVENT_BUY(WorldEventType.RES_GATHER);
        }
        /**前往充值界面 */
        public onConFirmCharge() {
            Utils.open_view(TASK_UI.POP_PAY_SHOP_VIEW);
        }
        public hitPoint(x: number, y: number): boolean {
            if (this.m_pBtnGather.hitTestPoint(x, y)) {
                /**新手引导点击 */
                EventMgr.dispatchEvent(GuideEvent.GUIDE_TOUCH_FINISH, null);
                this.onGatherClick();
            }
            return this.m_pBtnGather.hitTestPoint(x, y) || this.m_pMenu.hitTestPoint(x, y)
        }


        public removeFromParent() {
            super.removeFromParent([this.m_pBtnGather]);
        }

        /**检查新手引导面板条件 */
        public onGuideCondition() {
            EventMgr.dispatchEvent(GuideEvent.GUIDE_ON_CONDITION, IGUIDECD.MENU_COLLECT);
        }

    }


}