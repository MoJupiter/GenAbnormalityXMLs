
import React, { useState, useEffect } from 'react';
import './Abnormality.css';
const ConverRWBPType = (type: RWBP) =>{
    return(type == RWBP.R ? ('R') : type == RWBP.W ? 'W' : type == RWBP.B ? ('B') : type == RWBP.P ? ('P') : 'R');
}
interface AbnName{
  en: string;
  ja: string;
}
  const Adjective = ([{en:'Laugh', ja:'笑う死体の'}, {en:'NothingThere', ja:'何もない'}, {en:'Silent', ja:'静かな'}, {en:'Blue', ja:'青い'}, {en:'Melting', ja:'溶ける'}]);
  const Alphabet = (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
  const Name = ([{en:'Mountain', ja:'山'}, {en:'', ja:''}, {en:'Ster', ja:'星'}, {en:'Orch', ja:'オーケストラ'}, {en:'Love', ja:'愛'}]);
  const Condition = ([{en:'作業結果が良い場合', ja:'作業結果が良い場合'}, {en:'作業結果が普通の場合', ja:'作業結果が普通の場合'}, {en:'作業結果が悪い、または普通の場合', ja:'作業結果が悪い、または普通の場合'}, {en:'職員がどこかで死んだとき', ja:'職員がどこかで死んだとき'}]);
  const Happen = ([{en:'クリフォトカウンターが1減る。', ja:'クリフォトカウンターが1減る。'}, {en:'クリフォトカウンターが1増える。', ja:'クリフォトカウンターが1増える。'}]);
  const Desk = ([{en:'Mountain', ja:'山'}, {en:'Ster', ja:'星'}, {en:'Orch', ja:'オーケストラ'}, {en:'Love', ja:'愛'}]);
  const RiskLevel = (['ZAYIN', 'TETH', 'HE', 'WAW', 'ALEPH']);
interface AbnoXMLs{
    stat: string;
    creature: string;
    gen: string;
    info: string;
}
const Conver2XML = (abn: Abnormality) =>{
  let bonuss = "";
  for(let i = 0; i < abn.skillInfo.observeBonus.length; i++){
      const output = abn.skillInfo.observeBonus[i];
        bonuss+=`<observeBonus level="${output.level}" type="${output.type==0 ? 'prob' : 'speed'}">${output.data}</observeBonus>\n    `;
  }
    const cares = abn.basicInfo.specialTips.map((output, index) => {
        return `<observeElement name="care_${index}" cost="${output.cost}" />\n`;
    });
    const codeNo = abn.basicInfo.codeNo.map((output, index) => {
        return `<codeNo openLevel="${output.openLevel}">${output.data}</codeNo>\n`;
    });
    const portrait = abn.basicInfo.portrait.map((output, index) => {
        return `<portrait openLevel="${output.openLevel}">Custom/${output.data}</portrait>\n`;
    });
    const narration = abn.skillInfo.narration.map((output, index) => {
        return `<narration action="mid${index}">${output}</narration>\n`;
    });
    const name = abn.basicInfo.name.map((output, index) => {
        return `<name openLevel="${output.openLevel}">${output.data}</name>`;
    });
    const riskLevel = abn.basicInfo.riskLevel.map((output, index) => {
        return `<riskLevel openLevel="${output.openLevel}">${output.data}</riskLevel>\n`;
    });
    const openText = abn.basicInfo.openText.map((output, index) => {
        return `<openText>${output.data}</openText>\n`;
    });
    const desc = abn.basicInfo.desc.map((output, index) => {
        return `<desc id="${output.openLevel}" openLevel="${output.openLevel}"> [ {${output.data}} ] </desc>\n`;
    });
    const specialTip = abn.basicInfo.specialTips.map((output, index) => {
        return `<specialTip openLevel="${output.openLevel}" key="${index}">${output.data}</specialTip>\n`;
    });
    const specialDamage = abn.escapeInfo.specialDamage.map((output, index) => {
        return `<damage id="${index}" type="${ConverRWBPType(output.type)}" min="${output.min}" max="${output.max}" />\n`;
    });
    let sum = abn.escapeInfo.defense.cost + abn.escapeInfo.defense.cost;
    for (let i = 0; i <abn.basicInfo.specialTips.length; i++) {
        sum += abn.basicInfo.specialTips[i].cost;
    }
    
    let stat = `<?xml version=\"1.0\"?\>
<creature\>
<script>${abn.basicInfo.name_en}</script\>
<stat\>
    <riskLevel>${abn.basicInfo.riskLevel[0].level}</riskLevel>
    <maxWorkCount>2</maxWorkCount>
    <workProb type="R\">
      <prob level="1\">${abn.skillInfo.workProb.Level1.R}</prob>
      <prob level="2\">${abn.skillInfo.workProb.Level2.R}</prob>
      <prob level="3\">${abn.skillInfo.workProb.Level3.R}</prob>
      <prob level="4\">${abn.skillInfo.workProb.Level4.R}</prob>
      <prob level="5\">${abn.skillInfo.workProb.Level5.R}</prob>
    </workProb\>
    <workProb type="W">
      <prob level="1">${abn.skillInfo.workProb.Level1.W}</prob>
      <prob level="2">${abn.skillInfo.workProb.Level2.W}</prob>
      <prob level="3">${abn.skillInfo.workProb.Level3.W}</prob>
      <prob level="4">${abn.skillInfo.workProb.Level4.W}</prob>
      <prob level="5">${abn.skillInfo.workProb.Level5.W}</prob>
    </workProb>
    <workProb type="B">
      <prob level="1">${abn.skillInfo.workProb.Level1.B}</prob>
      <prob level="2">${abn.skillInfo.workProb.Level2.B}</prob>
      <prob level="3">${abn.skillInfo.workProb.Level3.B}</prob>
      <prob level="4">${abn.skillInfo.workProb.Level4.B}</prob>
      <prob level="5">${abn.skillInfo.workProb.Level5.B}</prob>
    </workProb>
    <workProb type="P">
      <prob level="1">${abn.skillInfo.workProb.Level1.P}</prob>
      <prob level="2">${abn.skillInfo.workProb.Level2.P}</prob>
      <prob level="3">${abn.skillInfo.workProb.Level3.P}</prob>
      <prob level="4">${abn.skillInfo.workProb.Level4.P}</prob>
      <prob level="5">${abn.skillInfo.workProb.Level5.P}</prob>
    </workProb>
    <workCooltime>${abn.skillInfo.workCooltime}</workCooltime>
    <feelingStateCubeBounds>
        <cube>${abn.skillInfo.feelingStateCubeBounds.bad}</cube>
        <cube>${abn.skillInfo.feelingStateCubeBounds.norm}</cube>
        <cube>${abn.skillInfo.feelingStateCubeBounds.good}</cube>
    </feelingStateCubeBounds>
    <workDamage type="${ConverRWBPType(abn.skillInfo.workDamage.type)}" min="${abn.skillInfo.workDamage.min}" max="${abn.skillInfo.workDamage.max}" />
    <workSpeed>${abn.skillInfo.workSpeed}</workSpeed>

    <defense id="1">
      <defenseElement type="R">${abn.escapeInfo.defense.data.R}</defenseElement>
      <defenseElement type="W">${abn.escapeInfo.defense.data.W}</defenseElement>
      <defenseElement type="B">${abn.escapeInfo.defense.data.B}</defenseElement>
      <defenseElement type="P">${abn.escapeInfo.defense.data.P}</defenseElement>
    </defense>
    <hp>${abn.escapeInfo.HP}</hp>
    <speed>${abn.escapeInfo.speed}</speed>
    <specialDamage>
        ${specialDamage}
    </specialDamage>

    <observeInfo total="${sum}">
    <observeElement name="stat" cost="${abn.escapeInfo.defense.cost}" />
    <observeElement name="defense" cost="${abn.escapeInfo.defense.cost}" />
    <observeElement name="work_r" cost="${abn.skillInfo.workProb.openCost}" />
    <observeElement name="work_w" cost="${abn.skillInfo.workProb.openCost}" />
    <observeElement name="work_b" cost="${abn.skillInfo.workProb.openCost}" />
    <observeElement name="work_p" cost="${abn.skillInfo.workProb.openCost}" />
    ${cares}
    </observeInfo>
    ${bonuss}
    <escapeable>${abn.escapeInfo.escapable}</escapeable>
    <equipment level="${abn.skillInfo.armor.level}" cost="${abn.skillInfo.armor.cost}" equipId="${abn.skillInfo.armor.id}" />
    <equipment level="${abn.skillInfo.weapon.level}" cost="${abn.skillInfo.weapon.cost}" equipId="${abn.skillInfo.weapon.id}" />
    <equipment level="${abn.skillInfo.gift.level}" prob="${abn.skillInfo.gift.prob}" equipId="${abn.skillInfo.gift.id}" />
    <qliphoth>${abn.skillInfo.qliphoth}</qliphoth>

</stat>
<graph>
    <node id="creature" x="-1.4" y="-2.0" type="creature" />
    <node id="workspace" x="1.9" y="-1.8" type="workspace" />
    <!--<node id="door"  x="2" y="-1" type="entry"/>-->
    <node id="outter" x="0" y="0" type="outterDoor" />
    <node id="inner" x="2" y="-1.8" type="innerDoor" />
    <node id="teddy" x="-0.2" y="-1.8" type="custom" />

    <edge node1="teddy" node2="inner" type="road" />
    <edge node1="workspace" node2="inner" type="road" />
    <edge node1="creature" node2="workspace" type="road" />
</graph>
<anim prefab="Custom/${abn.basicInfo.name_en}Anim" x="-2" y="-2" />
<portrait src="Unit/creature/magicalGirl" />
</creature>`;

    let info = `<creature>
<info id="${abn.basicInfo.id}">
<narration action="move"> ${abn.skillInfo.narration_move}</narration>
<narration action="start"> ${abn.skillInfo.narration_start}</narration>
${narration}
</info>
<observe level="1">
    <collection>
        ${codeNo}
        ${portrait}
        ${name}
        ${riskLevel}
        ${openText}
    </collection>
        ${desc}
    <specialTipSize size="${abn.basicInfo.specialTips.length}">
        ${specialTip}
        ${specialTip}
    </specialTipSize>
</observe>
</creature>`;

    let creature = `<?xml version="1.0" encoding="UTF-8" ?>
<creature_list>
<creature name="${abn.basicInfo.name_en}" src="${abn.basicInfo.name_en}" id="${abn.basicInfo.id}">
    <stat>${abn.basicInfo.name_en}_stat</stat>
  </creature>
</creature_list>`;
    let gen = `<All>
<add>${abn.basicInfo.id}</add>
</All>`;
    

    const handleDownload = () => {
        const blob = new Blob([stat], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
        const url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
        const a = document.createElement('a');
        a.href = url;
        a.download = `${abn.basicInfo.name}_stat.txt`; // ダウンロードされるファイル名
        document.body.appendChild(a);
        a.click(); // 自動クリック
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // メモリ解放
    };
    const result = {stat:stat, creature:creature, info:info, gen:gen};
    return (result);
}
interface Information {
    openLevel: number;
    data: string;
}
interface AbnormalityBasicInformation {
    //��{���
    id: number;
    name_en: string;
    name_ja: string;

    codeNo: Information[];
    name: Information[];
    portrait: Information[];
    riskLevel: LiskLevel[];
    openText: Information[];
    desc: Information[];
    specialTips: SpecialTips[];
}
interface AbnormalitySkillInformation {
    //��Ə��
    workProb: WorkProb;

    narration_start: string;
    narration_move: string;
    narration: Information[];

    qliphoth: number;

    feelingStateCubeBounds: FeelingStateCubeBounds;

    workSpeed: number;
    workDamage: Damage;

    workCooltime: number;
    observeBonus: ObserveBonus[];

    armor: Equipment;
    weapon: Equipment;
    gift: Gift;
}
interface AbnormalityEscapeInformation {
    //�E�����
    escapable: boolean;

    defense: Defence;
    specialDamage: Damage[];
    HP: number;
    speed: number;

    animPrefab: string;
}
interface Abnormality {
    basicInfo: AbnormalityBasicInformation;
    skillInfo: AbnormalitySkillInformation;
    escapeInfo: AbnormalityEscapeInformation;
}
enum RWBP {
    R,
    W,
    B,
    P
}
interface ObserveBonus {
    type: ObserveBonusType;
    data: number;
    level: number;
}
enum ObserveBonusType {
    prob=0,
    speed=1,
}
interface Damage {
    type: RWBP;
    min: number;
    max: number;
}
interface Equipment {
    id: number;
    level: number;
    cost: number;
}
interface Gift {
    id: number;
    level: number;
    prob: number;
}
interface SpecialTips {
    openLevel: number;
    data: string;
    cost: number;
}
interface FeelingStateCubeBounds {
    bad: number;
    norm: number;
    good: number;
}
interface Information {
    openLevel: number;
    data: string;
}
interface LiskLevel {
    openLevel: number;
    data: string;
    level: number;
}
interface WorkProb {
    openCost: number;
    Level1: RWBPInfomation;
    Level2: RWBPInfomation;
    Level3: RWBPInfomation;
    Level4: RWBPInfomation;
    Level5: RWBPInfomation;
}
interface Defence {
    data: RWBPInfomation;
    cost: number;
}
interface RWBPInfomation {
    R: number;
    W: number;
    B: number;
    P: number;
}

// ヘルパー関数: Information[] の初期値
const initialInformation: Information = { openLevel: 1, data: '' };
const initialInformationArray: Information[] = [structuredClone(initialInformation)];

// ヘルパー関数: LiskLevel[] の初期値
const initialLiskLevel: LiskLevel = { openLevel: 1, data: '', level: 1 };
const initialLiskLevelArray: LiskLevel[] = [structuredClone(initialLiskLevel)];

// ヘルパー関数: RWBPInfomation の初期値
const initialRWBPInformation: RWBPInfomation = { R: Math.floor(Math.random()*10)/10, W: Math.floor(Math.random()*10)/10, B: Math.floor(Math.random()*10)/10, P: Math.floor(Math.random()*10)/10};

// ヘルパー関数: Damage の初期値
const initialDamage: Damage = { type: RWBP.R, min: 1, max: 1 };
const IDGen = () => {
  return `${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}`;
}
// Abnormality の初期状態
const initialAbnormality = () => {
  let adjective_index = Math.floor(Math.random()*(Adjective.length));
  let name_index = Math.floor(Math.random()*(Adjective.length));
  let risk_level = Math.floor(Math.random()*(RiskLevel.length));
  let max_cube = Math.floor((Math.random()+2)*3);
  return {
    basicInfo: {
      id: parseInt(IDGen()),
      name_en: Adjective[adjective_index].en + Name[name_index].en,
      name_ja: Adjective[adjective_index].ja + Name[name_index].ja,
      codeNo: [structuredClone({openLevel: Math.floor(Math.random()*2+1), data: `${(Alphabet[Math.floor(Math.random()*Alphabet.length)])}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}-${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}-${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`})],
      name: [structuredClone({openLevel: Math.floor(Math.random()*2+1), data:Adjective[adjective_index].ja + Name[name_index].ja})],
      portrait: [structuredClone({openLevel: Math.floor(Math.random()*2+3), data:Adjective[adjective_index].ja + Name[name_index].ja})],
      riskLevel: [structuredClone({openLevel: 4, data: RiskLevel[risk_level], level: risk_level+1})],
      openText: [structuredClone({openLevel: 1, data:''})],
      specialTips: [structuredClone({openLevel: 1, cost:Math.floor((Math.random()+1)*3), data:`${Condition[Math.floor(Math.random()*Condition.length)].ja}${Happen[Math.floor(Math.random()*Happen.length)].ja}`})],
      desc: [structuredClone({openLevel: 1, data:`${Desk[Math.floor(Math.random()*Desk.length)].ja}`})],
    },
    skillInfo: {
      workProb: {
        openCost: Math.floor((Math.random()+1)*3),
        Level1: structuredClone(initialRWBPInformation),
        Level2: structuredClone(initialRWBPInformation),
        Level3: structuredClone(initialRWBPInformation),
        Level4: structuredClone(initialRWBPInformation),
        Level5: structuredClone(initialRWBPInformation),
      },
      narration_start: '作業を始める。',
      narration_move: '作業部屋に入る。',
      narration: [structuredClone({openLevel: 1, data:`ナレーション1`})],
      qliphoth: Math.floor((Math.random()+0.3)*3),
      feelingStateCubeBounds: { bad: max_cube*1, norm: max_cube*2, good: max_cube*3 },
      workSpeed: Math.floor((Math.random())*20)/10,
      workDamage: structuredClone({type: Math.floor(Math.random()*4), min:Math.floor(Math.random()*10), max:Math.floor(Math.random()*10)}),
      workCooltime: Math.floor((Math.random()+1)*3),
      observeBonus: [{ type: ObserveBonusType.prob, data: 4, level: 1 }, { type: ObserveBonusType.prob, data: 4, level: 2 }, { type: ObserveBonusType.prob, data: 4, level: 3 }, { type: ObserveBonusType.prob, data: 4, level: 4 }],
      armor: { id: parseInt(IDGen()), level: 3, cost: Math.floor((Math.random()+12)*5) },
      weapon: { id: parseInt(IDGen()), level: 4, cost: Math.floor((Math.random()+12)*5) },
      gift: { id: parseInt(IDGen()), level: 3, prob: Math.floor(Math.random()*100)/100 },
    },
    escapeInfo: {
      escapable: Math.floor((Math.random()*2)) == 0 ? true:false,
      defense: { data: structuredClone(initialRWBPInformation), cost: Math.floor((Math.random()+1)*3) },
      specialDamage: [structuredClone(initialDamage)],
      HP: Math.floor(Math.random()*100)+50,
      speed: Math.floor(Math.random()*100)+50,
      animPrefab: `${Adjective[adjective_index].en}${Name[name_index].en}Anim`,
    },
  }
}

const AbnormalityForm: React.FC = () => {
  const [abnormality, setAbnormality] = useState<Abnormality>(initialAbnormality);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, path: string) => {
    const { value, type, checked, name } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value);

    setAbnormality(prevAbnormality => {
      const updatedAbnormality = { ...prevAbnormality };
      let current: any = updatedAbnormality;
      const pathParts = path.split('.');

      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        if (Array.isArray(current[part])) {
            const index = parseInt(pathParts[i+1]);
            current = current[part][index];
            i++; // Skip next part as it's the index
        } else {
            current = current[part];
        }
      }

      const lastPart = pathParts[pathParts.length - 1];
      if (Array.isArray(current)) { // For arrays like narration, specialDamage etc.
          const index = parseInt(lastPart);
          current[index] = newValue;
      } else {
          current[lastPart] = newValue;
      }
      return updatedAbnormality;
    });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, path: string, index: number) => {
    const { value, type, checked, name } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value);

    setAbnormality(prevAbnormality => {
        const updatedAbnormality = { ...prevAbnormality };
        let current: any = updatedAbnormality;
        const pathParts = path.split('.');

        for (let i = 0; i < pathParts.length - 1; i++) {
            current = current[pathParts[i]];
        }

        current[pathParts[pathParts.length - 1]][index] = {...current[pathParts[pathParts.length - 1]][index],[name]: newValue};
        return updatedAbnormality;
    });
  };

  const handleNestedObjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, parentPath: string) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value);

    setAbnormality(prevAbnormality => {
        const updatedAbnormality = { ...prevAbnormality };
        let current: any = updatedAbnormality;
        const pathParts = parentPath.split('.');
        for (const part of pathParts) {
            current = current[part];
        }
        current[name] = newValue;
        return updatedAbnormality;
    });
  };

  const handleRWBPChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    const { name, value } = e.target;
    setAbnormality(prevAbnormality => {
      const updatedAbnormality = { ...prevAbnormality };
      let current: any = updatedAbnormality;
      const pathParts = path.split('.');
      for (const part of pathParts) {
        current = current[part];
      }
      current[name as keyof RWBPInfomation] = parseFloat(value);
      return updatedAbnormality;
    });
  };

  const handleArrayAddItem = (path: string) => {
  setAbnormality(prevAbnormality => {

    const updatedAbnormality = structuredClone(prevAbnormality); // ディープコピー
    let current: any = updatedAbnormality;
    const pathParts = path.split('.');

    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }
    const arrayName = pathParts[pathParts.length - 1];

    let newItem: any;
    switch (arrayName) {
      case 'codeNo':
      case 'name':
      case 'portrait':
      case 'openText':
      case 'desc':
        newItem = { openLevel: 1, data: '' };
        break;
      case 'riskLevel':
        newItem = { openLevel: 1, data: '', level: 1 };
        break;
      case 'specialTips':
        newItem = { data: { openLevel: 1, data: '' }, cost: 1 };
        break;
      case 'narration':
        newItem = '';
        break;
      case 'observeBonus':
        newItem = { type: ObserveBonusType.prob, data: 1, level: 1 };
        break;
      case 'specialDamage':
        newItem = { type: RWBP.R, min: 1, max: 1 };
        break;
      default:
        console.warn('未対応のarrayName:', arrayName);
        return prevAbnormality;
    }

    current[arrayName] = [...current[arrayName], newItem];
    return updatedAbnormality;
  });
  };

  const handleArrayRemoveItem = (path: string, index: number) => {
    setAbnormality(prevAbnormality => {
    const updatedAbnormality = structuredClone(prevAbnormality); // ディープコピー

    let current: any = updatedAbnormality;
    const pathParts = path.split('.');
    for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
    }
    const arrayName = pathParts[pathParts.length - 1];

    if (Array.isArray(current[arrayName])) {
        current[arrayName] = current[arrayName].filter((_: any, i: number) => i !== index);
    } else {
        console.warn('削除対象が配列ではありません:', current[arrayName]);
    }

    return updatedAbnormality;
    });
  };


  const renderInformationArray = (infoArray: Information[], path: string) => (
    <div>
      {infoArray.map((info, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
          <h4>情報 {index + 1}</h4>
          <label>
            Open Level:
            <input
              type="number"
              name="openLevel"
              value={info.openLevel}
              onChange={(e) => handleArrayChange(e, path, index)}
            />
          </label>
          <br />
          <label>
            Data:
            <input
              type="text"
              name="data"
              value={info.data}
              onChange={(e) => handleArrayChange(e, path, index)}
            />
          </label>
          <br />
          <button type="button" onClick={() => handleArrayRemoveItem(path, index)}>
            削除
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleArrayAddItem(path)}>
        情報追加
      </button>
    </div>
  );

  const renderLiskLevelArray = (liskLevelArray: LiskLevel[], path: string) => (
    <div>
      {liskLevelArray.map((lisk, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
          <h4>リスクレベル {index + 1}</h4>
          <label>
            Open Level:
            <input
              type="number"
              name="openLevel"
              value={lisk.openLevel}
              onChange={(e) => handleArrayChange(e, path, index)}
            />
          </label>
          <br />
          <label>
            Data:
            <input
              type="text"
              name="data"
              value={lisk.data}
              onChange={(e) => handleArrayChange(e, path, index)}
            />
          </label>
          <br />
          <label>
            Level:
            <input
              type="number"
              name="level"
              value={lisk.level}
              onChange={(e) => handleArrayChange(e, path, index)}
            />
          </label>
          <br />
          <button type="button" onClick={() => handleArrayRemoveItem(path, index)}>
            削除
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleArrayAddItem(path)}>
        リスクレベル追加
      </button>
    </div>
  );

  const renderRWBPInfo = (rwbpInfo: RWBPInfomation, path: string) => (
    <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
      <label>
        R:
        <input type="number" name="R" value={rwbpInfo.R} onChange={(e) => handleRWBPChange(e, path)} />
      </label>
      <label>
        W:
        <input type="number" name="W" value={rwbpInfo.W} onChange={(e) => handleRWBPChange(e, path)} />
      </label>
      <label>
        B:
        <input type="number" name="B" value={rwbpInfo.B} onChange={(e) => handleRWBPChange(e, path)} />
      </label>
      <label>
        P:
        <input type="number" name="P" value={rwbpInfo.P} onChange={(e) => handleRWBPChange(e, path)} />
      </label>
    </div>
  );

  const renderDamage = (damage: Damage, path: string, index?: number) => (
    <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
      <label>
        Type:
        <select
          name="type"
          value={damage.type}
          onChange={(e) => index !== undefined ? handleArrayChange(e, path, index) : handleNestedObjectChange(e, path)}
        >
          {Object.values(RWBP).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        Min:
        <input
          type="number"
          name="min"
          value={damage.min}
          onChange={(e) => index !== undefined ? handleArrayChange(e, path, index) : handleNestedObjectChange(e, path)}
        />
      </label>
      <label>
        Max:
        <input
          type="number"
          name="max"
          value={damage.max}
          onChange={(e) => index !== undefined ? handleArrayChange(e, path, index) : handleNestedObjectChange(e, path)}
        />
      </label>
    </div>
  );

  const renderObserveBonusArray = (observeBonusArray: ObserveBonus[], path: string) => (
    <div>
      {observeBonusArray.map((bonus, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
          <h4>観測ボーナス {index + 1}</h4>
          <label>
            Type:
            <select
              name="type"
              value={bonus.type}
              onChange={(e) => handleArrayChange(e, path, index)}
            >
              {Object.values(ObserveBonusType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Data:
            <input
              type="number"
              name="data"
              value={bonus.data}
              onChange={(e) => handleArrayChange(e, path, index)}
            />
          </label>
          <br />
          <label>
            Level:
            <input
              type="number"
              name="level"
              value={bonus.level}
              onChange={(e) => handleArrayChange(e, path, index)}
            />
          </label>
          <br />
        </div>
      ))}
    </div>
  );

  const renderEquipment = (equipment: Equipment, path: string) => (
    <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
      <label>
        ID:
        <input type="number" name="id" value={equipment.id} onChange={(e) => handleNestedObjectChange(e, path)} />
      </label>
      <label>
        Level:
        <input type="number" name="level" value={equipment.level} onChange={(e) => handleNestedObjectChange(e, path)} />
      </label>
      <label>
        Cost:
        <input type="number" name="cost" value={equipment.cost} onChange={(e) => handleNestedObjectChange(e, path)} />
      </label>
    </div>
  );

  const renderGift = (gift: Gift, path: string) => (
    <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
      <label>
        ID:
        <input type="number" name="id" value={gift.id} onChange={(e) => handleNestedObjectChange(e, path)} />
      </label>
      <label>
        Level:
        <input type="number" name="level" value={gift.level} onChange={(e) => handleNestedObjectChange(e, path)} />
      </label>
      <label>
        Prob:
        <input type="number" name="prob" value={gift.prob} onChange={(e) => handleNestedObjectChange(e, path)} />
      </label>
    </div>
  );

  const handleDownload = (xml:AbnoXMLs) => {
    let blob = new Blob([xml.stat], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
    let url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
    let a = document.createElement('a');
    a.href = url;
    a.download = `${abnormality.basicInfo.name_en}_stat.txt`; // ダウンロードされるファイル名
    document.body.appendChild(a);
    a.click(); // 自動クリック
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // メモリ解放
    
    blob = new Blob([xml.info], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
    url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
    a = document.createElement('a');
    a.href = url;
    a.download = `info_${abnormality.basicInfo.name_en}.xml`; // ダウンロードされるファイル名
    document.body.appendChild(a);
    a.click(); // 自動クリック
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // メモリ解放
    
    blob = new Blob([xml.creature], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
    url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
    a = document.createElement('a');
    a.href = url;
    a.download = `list_${abnormality.basicInfo.name_en}.txt`; // ダウンロードされるファイル名
    document.body.appendChild(a);
    a.click(); // 自動クリック
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // メモリ解放

    blob = new Blob([xml.gen], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
    url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
    a = document.createElement('a');
    a.href = url;
    a.download = `gen_${abnormality.basicInfo.name_en}.txt`; // ダウンロードされるファイル名
    document.body.appendChild(a);
    a.click(); // 自動クリック
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // メモリ解放
  };
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Abnormality 情報設定</h1>
      <form>
        {/* Basic Information */}
        <div style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
          <h2>基本情報 (Basic Information)</h2>
          <label>
            ID:
            <input type="number" value={abnormality.basicInfo.id} onChange={(e) => handleChange(e, 'basicInfo.id')} />
          </label>
          <br />
          <label>
            英語名 (Name EN):
            <input type="text" value={abnormality.basicInfo.name_en} onChange={(e) => handleChange(e, 'basicInfo.name_en')} />
          </label>
          <br />
          <label>
            日本語名 (Name JA):
            <input type="text" value={abnormality.basicInfo.name_ja} onChange={(e) => handleChange(e, 'basicInfo.name_ja')} />
          </label>
          <br />

          <h3>Code No.</h3>
          {renderInformationArray(abnormality.basicInfo.codeNo, 'basicInfo.codeNo')}
          <br />

          <h3>名前 (Name)</h3>
          {renderInformationArray(abnormality.basicInfo.name, 'basicInfo.name')}
          <br />

          <h3>肖像 (Portrait)</h3>
          {renderInformationArray(abnormality.basicInfo.portrait, 'basicInfo.portrait')}
          <br />

          <h3>リスクレベル (Risk Level)</h3>
          {renderLiskLevelArray(abnormality.basicInfo.riskLevel, 'basicInfo.riskLevel')}
          <br />

          <h3>解放テキスト (Open Text)</h3>
          {renderInformationArray(abnormality.basicInfo.openText, 'basicInfo.openText')}
          <br />

          <h3>説明 (Description)</h3>
          {renderInformationArray(abnormality.basicInfo.desc, 'basicInfo.desc')}
          <br />

          <h3>特殊ヒント (Special Tips)</h3>
          <div>
            {abnormality.basicInfo.specialTips.map((tip, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
                <h4>特殊ヒント {index + 1}</h4>
                <label>
                  Open Level:
                  <input
                    type="number"
                    name="openLevel"
                    value={tip.openLevel}
                    onChange={(e) => handleArrayChange(e, `basicInfo.specialTips`, index)}
                  />
                </label>
                <br />
                <label>
                  Data:
                  <input
                    type="text"
                    name="data"
                    value={tip.data}
                    onChange={(e) => handleArrayChange(e, `basicInfo.specialTips`, index)}
                  />
                </label>
                <br />
                <label>
                  Cost:
                  <input
                    type="number"
                    name="cost"
                    value={tip.cost}
                    onChange={(e) => handleArrayChange(e, `basicInfo.specialTips`, index)}
                  />
                </label>
                <br />
                <button type="button" onClick={() => handleArrayRemoveItem('basicInfo.specialTips', index)}>
                  削除
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleArrayAddItem('basicInfo.specialTips')}>
              特殊ヒント追加
            </button>
          </div>
        </div>

        {/* Skill Information */}
        <div style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
          <h2>スキル情報 (Skill Information)</h2>
          <h3>作業成功率 (Work Prob)</h3>
          <h4>Open Cost</h4>
            <input
            type="number"
            name="openLevel"
            value={abnormality.skillInfo.workProb.openCost}
            onChange={(e) => handleChange(e, 'skillInfo.workProb.openCost')}
            />
          <h4>Level 1</h4>
          {renderRWBPInfo(abnormality.skillInfo.workProb.Level1, 'skillInfo.workProb.Level1')}
          <h4>Level 2</h4>
          {renderRWBPInfo(abnormality.skillInfo.workProb.Level2, 'skillInfo.workProb.Level2')}
          <h4>Level 3</h4>
          {renderRWBPInfo(abnormality.skillInfo.workProb.Level3, 'skillInfo.workProb.Level3')}
          <h4>Level 4</h4>
          {renderRWBPInfo(abnormality.skillInfo.workProb.Level4, 'skillInfo.workProb.Level4')}
          <h4>Level 5</h4>
          {renderRWBPInfo(abnormality.skillInfo.workProb.Level5, 'skillInfo.workProb.Level5')}

          <label>
            開始ナレーション (Narration Start):
            <textarea value={abnormality.skillInfo.narration_start} onChange={(e) => handleChange(e, 'skillInfo.narration_start')} rows={3} cols={50} />
          </label>
          <br />
          <label>
            移動ナレーション (Narration Move):
            <textarea value={abnormality.skillInfo.narration_move} onChange={(e) => handleChange(e, 'skillInfo.narration_move')} rows={3} cols={50} />
          </label>
          <br />

          <h3>ナレーション (Narration)</h3>
          <div>
            {abnormality.skillInfo.narration.map((nar, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
                <label>
                  ナレーション {index + 1}:
                  <textarea
                    value={nar.data}
                    name="data"
                    onChange={(e) => {handleArrayChange(e, `skillInfo.narration`, index)}}
                    rows={3}
                    cols={50}
                  />
                </label>
                <br />
                <button type="button" onClick={() => handleArrayRemoveItem('skillInfo.narration', index)}>
                  削除
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleArrayAddItem('skillInfo.narration')}>
              ナレーション追加
            </button>
          </div>
          <br />

          <label>
            クリフォトカウンター (Qliphoth Counter):
            <input type="number" value={abnormality.skillInfo.qliphoth} onChange={(e) => handleChange(e, 'skillInfo.qliphoth')} />
          </label>
          <br />

          <h3>感情状態キューブ境界 (Feeling State Cube Bounds)</h3>
          <label>
            Bad:
            <input type="number" value={abnormality.skillInfo.feelingStateCubeBounds.bad} onChange={(e) => handleChange(e, 'skillInfo.feelingStateCubeBounds.bad')} name="bad" />
          </label>
          <label>
            Norm:
            <input type="number" value={abnormality.skillInfo.feelingStateCubeBounds.norm} onChange={(e) => handleChange(e, 'skillInfo.feelingStateCubeBounds.norm')} name="norm" />
          </label>
          <label>
            Good:
            <input type="number" value={abnormality.skillInfo.feelingStateCubeBounds.good} onChange={(e) => handleChange(e, 'skillInfo.feelingStateCubeBounds.good')} name="good" />
          </label>
          <br />

          <label>
            作業速度 (Work Speed):
            <input type="number" value={abnormality.skillInfo.workSpeed} onChange={(e) => handleChange(e, 'skillInfo.workSpeed')} />
          </label>
          <br />

          <h3>作業ダメージ (Work Damage)</h3>
          {renderDamage(abnormality.skillInfo.workDamage, 'skillInfo.workDamage')}
          <br />

          <label>
            作業クールタイム (Work Cooltime):
            <input type="number" value={abnormality.skillInfo.workCooltime} onChange={(e) => handleChange(e, 'skillInfo.workCooltime')} />
          </label>
          <br />

          <h3>観測ボーナス (Observe Bonus)</h3>
          {renderObserveBonusArray(abnormality.skillInfo.observeBonus, 'skillInfo.observeBonus')}
          <br />

          <h3>防具 (Armor)</h3>
          {renderEquipment(abnormality.skillInfo.armor, 'skillInfo.armor')}
          <br />

          <h3>武器 (Weapon)</h3>
          {renderEquipment(abnormality.skillInfo.weapon, 'skillInfo.weapon')}
          <br />

          <h3>ギフト (Gift)</h3>
          {renderGift(abnormality.skillInfo.gift, 'skillInfo.gift')}
        </div>

        {/* Escape Information */}
        <div style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
          <h2>脱走情報 (Escape Information)</h2>
          <label>
            脱走可能 (Escapable):
            <input type="checkbox" checked={abnormality.escapeInfo.escapable} onChange={(e) => handleChange(e, 'escapeInfo.escapable')} />
          </label>
          <br />

          <h3>防御 (Defense)</h3>
          <h4>データ</h4>
          {renderRWBPInfo(abnormality.escapeInfo.defense.data, 'escapeInfo.defense.data')}
          <label>
            コスト:
            <input type="number" value={abnormality.escapeInfo.defense.cost} onChange={(e) => handleChange(e, 'escapeInfo.defense.cost')} />
          </label>
          <br />

          <h3>特殊ダメージ (Special Damage)</h3>
          <div>
            {abnormality.escapeInfo.specialDamage.map((damage, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
                <h4>特殊ダメージ {index + 1}</h4>
                {renderDamage(damage, `escapeInfo.specialDamage`, index)}
                <button type="button" onClick={() => handleArrayRemoveItem('escapeInfo.specialDamage', index)}>
                  削除
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleArrayAddItem('escapeInfo.specialDamage')}>
              特殊ダメージ追加
            </button>
          </div>
          <br />

          <label>
            HP:
            <input type="number" value={abnormality.escapeInfo.HP} onChange={(e) => handleChange(e, 'escapeInfo.HP')} />
          </label>
          <br />
          <label>
            速度 (Speed):
            <input type="number" value={abnormality.escapeInfo.speed} onChange={(e) => handleChange(e, 'escapeInfo.speed')} />
          </label>
          <br />
        </div>
      </form>

      <hr />
      <h2>現在のAbnormalityデータ</h2>
      <button onClick={(e)=>handleDownload(Conver2XML(abnormality))}>Download</button>
      <pre style={{ textAlign: 'left', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
        {Conver2XML(abnormality).stat}
      </pre>
      <pre style={{ textAlign: 'left', backgroundColor: '#f0f0a0', padding: '10px', borderRadius: '5px' }}>
        {Conver2XML(abnormality).info}
      </pre>
      <pre style={{ textAlign: 'left', backgroundColor: '#f0f0e0', padding: '10px', borderRadius: '5px' }}>
        {Conver2XML(abnormality).creature}
      </pre>
      <pre style={{ backgroundColor: '#f0f0b0', padding: '10px', borderRadius: '5px' }}>
        {Conver2XML(abnormality).gen}
      </pre>
    </div>
  );
};

export default AbnormalityForm;