
module com_main {
	export class GeneralFateCell extends eui.ItemRenderer {

		public m_lbName: eui.Label;
		public m_lbContent: eui.Label;
		public m_lbEffect: eui.Label;
		public m_pActiveState: com_main.CImage;
		public m_lbStar: eui.Label;
		public m_pBtn: com_main.ComButton;
		public m_pAcCondition: eui.Group;
		public m_pro: eui.Group;
		public m_phead: eui.Group;





		private m_fateVo: FateVo;
		public constructor() {
			super();
			this.skinName = Utils.getSkinName("app/fate/GeneralFateCellSkin.exml");
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			EventManager.addTouchScaleListener(this.m_pBtn, this, this.onClickTask);
		}

		$onRemoveFromStage(): void {
			this.onDestroy();
			super.$onRemoveFromStage();
		}

		public onDestroy() {
			EventManager.removeEventListener(this.m_pBtn);
		}

		//btn
		private onClickTask(e) {
			// if (this.m_fateVo.status != FateStatus.CAN_ACTIVE) return;
			// FateProxy.C2S_RELATION_EFFECT(this.m_fateVo.id);
			if (this.m_fateVo.status == FateStatus.CAN_ACTIVE) {
				FateProxy.C2S_RELATION_EFFECT(this.m_fateVo.id);
			} else {
				EffectUtils.showTips(GCodeFromat(CLEnum.FATE_STAR_TIP, Utils.getPropName(this.m_fateVo.disGeneralSoulList[0])), 1, true);
				Utils.open_view(TASK_UI.NOR_SOURCE_VIEW_PANEL, this.m_fateVo.disGeneralSoulList[0]);
			}
		}



		//MissionInfoVo
		public dataChanged(): void {
			super.dataChanged();
			this.m_fateVo = this.data;
			let curActiveMaxCfg: RelationConfig = FateModel.getCurFinshActiveFateCfg(this.m_fateVo.id);
			this.m_lbName.textFlow = Utils.htmlParser(curActiveMaxCfg.name);
			this.m_lbContent.textFlow = Utils.htmlParser(curActiveMaxCfg.Desc);

			let content: string = this.m_fateVo.level != 1 ? GCodeFromat(CLEnum.FATE_GEN_NEXT, FateModel.getNextFateStar(this.m_fateVo.id)) : GCodeFromat(CLEnum.FATE_GEN_ALL, FateModel.getNextFateStar(this.m_fateVo.id))
			this.m_lbStar.textFlow = Utils.htmlParser(content)

			this.m_lbStar.visible = FateModel.getNextFateStar(this.m_fateVo.id) != 0;
			if (this.m_fateVo.level == 1) {
				this.m_pBtn.setTitleLabel(GCode(CLEnum.FATE_GEN_ACTIVE));
			} else {
				this.m_pBtn.setTitleLabel(GCode(CLEnum.GEN_STRENG));
			}

			this.m_pBtn.visible = this.m_fateVo.status != FateStatus.FINISH_ACTIVE && this.m_fateVo.isOwnGeneral();
			this.m_pActiveState.visible = this.m_fateVo.status == FateStatus.FINISH_ACTIVE;
			this.m_pBtn.currentState = this.m_fateVo.status !== FateStatus.CAN_ACTIVE ? "style6" : "style1";
			this.m_lbStar.visible = this.m_fateVo.status != FateStatus.FINISH_ACTIVE && this.m_fateVo.isOwnGeneral();
			this.m_lbEffect.visible = this.m_fateVo.status != FateStatus.FINISH_ACTIVE && this.m_fateVo.level != 1;
			if (this.m_fateVo.status == FateStatus.FINISH_ACTIVE || this.m_fateVo.level > 1) {
				this.m_lbName.textColor = 0xe7c772;
				this.m_lbContent.textColor = 0xaac7ff;
			} else {
				this.m_lbName.textColor = 0x878585;
				this.m_lbContent.textColor = 0x878585;
			}
			let attrAdd: string[] = this.m_fateVo.fateCfg.effect.split("_");
			this.m_lbEffect.text = `${Utils.getAttriNameByType(Number(attrAdd[0]))}` + "+" + `${attrAdd[1]}`
			this.m_pro.removeChildren();

			this.m_phead.removeChildren();
			let triggerParameter: string[] = curActiveMaxCfg.triggerParameter.split(",")
			let activiState: string = this.m_fateVo.status == FateStatus.FINISH_ACTIVE || this.m_fateVo.level > 1 ? "unlock" : "lock";
			for (let index = 0; index < triggerParameter.length; index++) {
				let triggerArr: string[] = triggerParameter[index].split("_");
				if (index != triggerParameter.length - 1) {
					let pro: FateProComp = FateProComp.create(activiState);
					pro.x = 96 * (index + 1);
					pro.y = 44;
					this.m_pro.addChild(pro)
				}

			}
			this.m_pro.validateNow();
			for (let index = 0; index < triggerParameter.length; index++) {
				let genHead: GeneralHeadRender = GeneralHeadRender.create("fate");
				let triggerArr: string[] = triggerParameter[index].split("_");
				let hero = GeneralModel.getOwnGeneral(Number(triggerArr[0]));
				let star: number = hero.isOwn ? hero.star : 0;
				genHead.setGenViewInfo(Number(triggerArr[0]), 1, star)
				genHead.x = 170 * index;
				genHead.scaleX = 0.8;
				genHead.scaleY = 0.8;
				Utils.isGray(!hero.isOwn, genHead.Image_head);
				this.m_phead.addChild(genHead);
				// genHead.validateNow();
			}
			// egret.callLater(() => {
			// 	this.m_phead.validateNow();
			// }, this)

			// egret.setTimeout(() => {
			// 	this.m_phead.validateNow();
			// }, this, 100);

		}


	}
}