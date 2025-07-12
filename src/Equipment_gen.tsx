
// import React, { useState } from 'react';
// import './Abnormality.css';
// import { XMLParser } from 'fast-xml-parser'; // ライブラリをインポート
// const ConverRWBPType = (type: RWBP) =>{
//     return(type == RWBP.R ? ('R') : type == RWBP.W ? 'W' : type == RWBP.B ? ('B') : type == RWBP.P ? ('P') : 'R');
// }
// interface AbnoXMLs{
//     stat: string;
//     creature: string;
//     gen: string;
//     info: string;
// }

// const Conver2XML = () =>{
    

//     const handleDownload = () => {
//         const blob = new Blob([stat], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
//         const url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `${abn.basicInfo.name}_stat.txt`; // ダウンロードされるファイル名
//         document.body.appendChild(a);
//         a.click(); // 自動クリック
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url); // メモリ解放
//     };
//     const result = {stat:stat, creature:creature, info:info, gen:gen};
//     return (result);
// }
// interface Information {
//     openLevel: number;
//     data: string;
// }
// enum Grade {
//   ZAYIN,
//   TETH,
//   HE,
//   WAW,
//   ALEPH
// }
// enum RWBP {
//     R,
//     W,
//     B,
//     P
// }
// const initialDamage: Damage = { type: RWBP.R, min: 2, max: 5 };
// const initioalRequireLevel: RequireLevel = { type: RWBP.R, number: 1 };
// const initioalRequireLevelArray: RequireLevel[] = [structuredClone(initioalRequireLevel)];
// const initioalDamageInfo: DamageInfo = { damage: initialDamage, effectInfo: '' ,soundInfo: ''};

// const initialWeaponInfo: WeaponInfo = {
//   type: 'weapon',
//   name_ja: '',
//   name_en: '',
//   no: '',
//   desc_ja: '',
//   desc_en: '',
//   specialDesc_ja: '',
//   specialDesc_en: '',
  
//   specialWeaponAnim: '',
//   weaponClassType: '',
//   require: initioalRequireLevelArray,
//   damage: initioalDamageInfo,
//   ramge: 0,
//   script: 0,
//   maxNum: 0,
//   splash: 0,
//   attackSpeed: 0,
//   grade: Grade.TETH
// };

// interface WeaponInfo {
//   type: string;
//   name_ja: string;
//   name_en: string;
//   no: string;
//   desc_ja: string;
//   desc_en: string;
//   specialDesc_ja: string;
//   specialDesc_en: string;
  
//   specialWeaponAnim: string;
//   weaponClassType: string;
//   require: RequireLevel[];
//   damage: DamageInfo;
//   ramge: number;
//   script: number;
//   maxNum: number;
//   splash: number;
//   attackSpeed: number;
//   grade: Grade;
// }
// interface DamageInfo {
//   damage: Damage
//   effectInfo: string;
//   soundInfo: string;
// }
// interface RequireLevel {
//   type: RWBP
//   number: number
// }
// interface Damage {
//     type: RWBP;
//     min: number;
//     max: number;
// }
// interface RWBPInfomation {
//     R: number;
//     W: number;
//     B: number;
//     P: number;
// }

// // ヘルパー関数: Information[] の初期値
// const initialInformation: Information = { openLevel: 0, data: '' };
// const initialInformationArray: Information[] = [structuredClone(initialInformation)];

// // ヘルパー関数: RWBPInfomation の初期値
// const initialRWBPInformation: RWBPInfomation = { R: 0, W: 0, B: 0, P: 0 };



// const AbnormalityForm: React.FC = () => {
//   const [weapon, setWeapon] = useState<WeaponInfo>(initialWeaponInfo);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, path: string) => {
//     const { value, type, checked, name } = e.target as HTMLInputElement;
//     const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value);

//     setWeapon(prevWeapon => {
//       const updatedAbnormality = { ...prevWeapon };
//       let current: any = updatedAbnormality;
//       const pathParts = path.split('.');

//       for (let i = 0; i < pathParts.length - 1; i++) {
//         const part = pathParts[i];
//         if (Array.isArray(current[part])) {
//             const index = parseInt(pathParts[i+1]);
//             current = current[part][index];
//             i++; // Skip next part as it's the index
//         } else {
//             current = current[part];
//         }
//       }

//       const lastPart = pathParts[pathParts.length - 1];
//       if (Array.isArray(current)) { // For arrays like narration, specialDamage etc.
//           const index = parseInt(lastPart);
//           current[index] = newValue;
//       } else {
//           current[lastPart] = newValue;
//       }
//       return updatedAbnormality;
//     });
//   };

//   const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, path: string, index: number) => {
//     const { value, type, checked, name } = e.target as HTMLInputElement;
//     const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value);

//     setEquipment(prevEquipment => {
//         const updatedAbnormality = { ...prevEquipment };
//         let current: any = updatedAbnormality;
//         const pathParts = path.split('.');

//         for (let i = 0; i < pathParts.length - 1; i++) {
//             current = current[pathParts[i]];
//         }

//         current[pathParts[pathParts.length - 1]][index] = {...current[pathParts[pathParts.length - 1]][index],[name]: newValue};
//         return updatedAbnormality;
//     });
//   };

//   const handleNestedObjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, parentPath: string) => {
//     const { name, value, type, checked } = e.target as HTMLInputElement;
//     const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value);

//     setAbnormality(prevAbnormality => {
//         const updatedAbnormality = { ...prevAbnormality };
//         let current: any = updatedAbnormality;
//         const pathParts = parentPath.split('.');
//         for (const part of pathParts) {
//             current = current[part];
//         }
//         current[name] = newValue;
//         return updatedAbnormality;
//     });
//   };

//   const handleRWBPChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
//     const { name, value } = e.target;
//     setAbnormality(prevAbnormality => {
//       const updatedAbnormality = { ...prevAbnormality };
//       let current: any = updatedAbnormality;
//       const pathParts = path.split('.');
//       for (const part of pathParts) {
//         current = current[part];
//       }
//       current[name as keyof RWBPInfomation] = parseFloat(value);
//       return updatedAbnormality;
//     });
//   };

//   const handleArrayAddItem = (path: string) => {
//   setAbnormality(prevAbnormality => {

//     const updatedAbnormality = structuredClone(prevAbnormality); // ディープコピー
//     let current: any = updatedAbnormality;
//     const pathParts = path.split('.');

//     for (let i = 0; i < pathParts.length - 1; i++) {
//       current = current[pathParts[i]];
//     }
//     const arrayName = pathParts[pathParts.length - 1];

//     let newItem: any;
//     switch (arrayName) {
//       case 'codeNo':
//       case 'name':
//       case 'portrait':
//       case 'openText':
//       case 'desc':
//         newItem = { openLevel: 0, data: '' };
//         break;
//       case 'riskLevel':
//         newItem = { openLevel: 0, data: '', level: 0 };
//         break;
//       case 'specialTips':
//         newItem = { data: { openLevel: 0, data: '' }, cost: 0 };
//         break;
//       case 'narration':
//         newItem = '';
//         break;
//       case 'observeBonus':
//         newItem = { type: ObserveBonusType.prob, data: 0, level: 0 };
//         break;
//       case 'specialDamage':
//         newItem = { type: RWBP.R, min: 0, max: 0 };
//         break;
//       default:
//         console.warn('未対応のarrayName:', arrayName);
//         return prevAbnormality;
//     }

//     current[arrayName] = [...current[arrayName], newItem];
//     return updatedAbnormality;
//   });
//   };

//   const handleArrayRemoveItem = (path: string, index: number) => {
//     setAbnormality(prevAbnormality => {
//     const updatedAbnormality = structuredClone(prevAbnormality); // ディープコピー

//     let current: any = updatedAbnormality;
//     const pathParts = path.split('.');
//     for (let i = 0; i < pathParts.length - 1; i++) {
//         current = current[pathParts[i]];
//     }
//     const arrayName = pathParts[pathParts.length - 1];

//     if (Array.isArray(current[arrayName])) {
//         current[arrayName] = current[arrayName].filter((_: any, i: number) => i !== index);
//     } else {
//         console.warn('削除対象が配列ではありません:', current[arrayName]);
//     }

//     return updatedAbnormality;
//     });
//   };


//   const renderInformationArray = (infoArray: Information[], path: string) => (
//     <div>
//       {infoArray.map((info, index) => (
//         <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
//           <h4>情報 {index + 1}</h4>
//           <label>
//             Open Level:
//             <input
//               type="number"
//               name="openLevel"
//               value={info.openLevel}
//               onChange={(e) => handleArrayChange(e, path, index)}
//             />
//           </label>
//           <br />
//           <label>
//             Data:
//             <input
//               type="text"
//               name="data"
//               value={info.data}
//               onChange={(e) => handleArrayChange(e, path, index)}
//             />
//           </label>
//           <br />
//           <button type="button" onClick={() => handleArrayRemoveItem(path, index)}>
//             削除
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={() => handleArrayAddItem(path)}>
//         情報追加
//       </button>
//     </div>
//   );

//   const renderLiskLevelArray = (liskLevelArray: LiskLevel[], path: string) => (
//     <div>
//       {liskLevelArray.map((lisk, index) => (
//         <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
//           <h4>リスクレベル {index + 1}</h4>
//           <label>
//             Open Level:
//             <input
//               type="number"
//               name="openLevel"
//               value={lisk.openLevel}
//               onChange={(e) => handleArrayChange(e, path, index)}
//             />
//           </label>
//           <br />
//           <label>
//             Data:
//             <input
//               type="text"
//               name="data"
//               value={lisk.data}
//               onChange={(e) => handleArrayChange(e, path, index)}
//             />
//           </label>
//           <br />
//           <label>
//             Level:
//             <input
//               type="number"
//               name="level"
//               value={lisk.level}
//               onChange={(e) => handleArrayChange(e, path, index)}
//             />
//           </label>
//           <br />
//           <button type="button" onClick={() => handleArrayRemoveItem(path, index)}>
//             削除
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={() => handleArrayAddItem(path)}>
//         リスクレベル追加
//       </button>
//     </div>
//   );

//   const renderRWBPInfo = (rwbpInfo: RWBPInfomation, path: string) => (
//     <div className="flex" style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
//       <label>
//         R:
//         <input type="number" name="R" value={rwbpInfo.R} onChange={(e) => handleRWBPChange(e, path)} />
//       </label>
//       <label>
//         W:
//         <input type="number" name="W" value={rwbpInfo.W} onChange={(e) => handleRWBPChange(e, path)} />
//       </label>
//       <label>
//         B:
//         <input type="number" name="B" value={rwbpInfo.B} onChange={(e) => handleRWBPChange(e, path)} />
//       </label>
//       <label>
//         P:
//         <input type="number" name="P" value={rwbpInfo.P} onChange={(e) => handleRWBPChange(e, path)} />
//       </label>
//     </div>
//   );

//   const renderDamage = (damage: Damage, path: string, index?: number) => (
//     <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
//       <label>
//         Type:
//         <select
//           name="type"
//           value={damage.type}
//           onChange={(e) => index !== undefined ? handleArrayChange(e, path, index) : handleNestedObjectChange(e, path)}
//         >
//           {Object.values(RWBP).map((type) => (
//             <option key={type} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Min:
//         <input
//           type="number"
//           name="min"
//           value={damage.min}
//           onChange={(e) => index !== undefined ? handleArrayChange(e, path, index) : handleNestedObjectChange(e, path)}
//         />
//       </label>
//       <label>
//         Max:
//         <input
//           type="number"
//           name="max"
//           value={damage.max}
//           onChange={(e) => index !== undefined ? handleArrayChange(e, path, index) : handleNestedObjectChange(e, path)}
//         />
//       </label>
//     </div>
//   );

//   const renderObserveBonusArray = (observeBonusArray: ObserveBonus[], path: string) => (
//     <div>
//       {observeBonusArray.map((bonus, index) => (
//         <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
//           <h4>観測ボーナス {index + 1}</h4>
//           <label>
//             Type:
//             <select
//               name="type"
//               value={bonus.type}
//               onChange={(e) => handleArrayChange(e, path, index)}
//             >
//               {Object.values(ObserveBonusType).map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <br />
//           <label>
//             Data:
//             <input
//               type="number"
//               name="data"
//               value={bonus.data}
//               onChange={(e) => handleArrayChange(e, path, index)}
//             />
//           </label>
//           <br />
//           <label>
//             Level:
//             <input
//               type="number"
//               name="level"
//               value={bonus.level}
//               onChange={(e) => handleArrayChange(e, path, index)}
//             />
//           </label>
//           <br />
//         </div>
//       ))}
//     </div>
//   );

//   const renderEquipment = (equipment: Equipment, path: string) => (
//     <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
//       <label>
//         ID:
//         <input type="number" name="id" value={equipment.id} onChange={(e) => handleNestedObjectChange(e, path)} />
//       </label>
//       <label>
//         Level:
//         <input type="number" name="level" value={equipment.level} onChange={(e) => handleNestedObjectChange(e, path)} />
//       </label>
//       <label>
//         Cost:
//         <input type="number" name="cost" value={equipment.cost} onChange={(e) => handleNestedObjectChange(e, path)} />
//       </label>
//     </div>
//   );

//   const renderGift = (gift: Gift, path: string) => (
//     <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
//       <label>
//         ID:
//         <input type="number" name="id" value={gift.id} onChange={(e) => handleNestedObjectChange(e, path)} />
//       </label>
//       <label>
//         Level:
//         <input type="number" name="level" value={gift.level} onChange={(e) => handleNestedObjectChange(e, path)} />
//       </label>
//       <label>
//         Prob:
//         <input type="number" name="prob" value={gift.prob} onChange={(e) => handleNestedObjectChange(e, path)} />
//       </label>
//     </div>
//   );

//   const handleDownload = (xml:AbnoXMLs) => {
//     let blob = new Blob([xml.stat], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
//     let url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
//     let a = document.createElement('a');
//     a.href = url;
//     a.download = `${abnormality.basicInfo.name_en}_stat.txt`; // ダウンロードされるファイル名
//     document.body.appendChild(a);
//     a.click(); // 自動クリック
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url); // メモリ解放
    
//     blob = new Blob([xml.info], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
//     url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
//     a = document.createElement('a');
//     a.href = url;
//     a.download = `info_${abnormality.basicInfo.name_en}.xml`; // ダウンロードされるファイル名
//     document.body.appendChild(a);
//     a.click(); // 自動クリック
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url); // メモリ解放
    
//     blob = new Blob([xml.creature], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
//     url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
//     a = document.createElement('a');
//     a.href = url;
//     a.download = `list_${abnormality.basicInfo.name_en}.txt`; // ダウンロードされるファイル名
//     document.body.appendChild(a);
//     a.click(); // 自動クリック
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url); // メモリ解放

//     blob = new Blob([xml.gen], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
//     url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
//     a = document.createElement('a');
//     a.href = url;
//     a.download = `gen_${abnormality.basicInfo.name_en}.txt`; // ダウンロードされるファイル名
//     document.body.appendChild(a);
//     a.click(); // 自動クリック
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url); // メモリ解放
//   };
//   const BasicInfoForm = () => (
//     <div className="BasicInfoForm" style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
//           <h2>基本情報 (Basic Information)</h2>
//       <label className="Contents">
//           <label>
//             ID:
//             <input type="number" value={abnormality.basicInfo.id} onChange={(e) => handleChange(e, 'basicInfo.id')} />
//           </label>
//           <br />
//           </label>
//       <label className="Contents">
//           <label>
//             英語名 (Name EN):
//             <input type="text" value={abnormality.basicInfo.name_en} onChange={(e) => handleChange(e, 'basicInfo.name_en')} />
//           </label>
//           <br />
//           </label>
//       <label className="Contents">
//           <label>
//             日本語名 (Name JA):
//             <input type="text" value={abnormality.basicInfo.name_ja} onChange={(e) => handleChange(e, 'basicInfo.name_ja')} />
//           </label>
//           <br />
//           </label>

//       <label className="Contents">
//           <h3>Code No.</h3>
//           {renderInformationArray(abnormality.basicInfo.codeNo, 'basicInfo.codeNo')}
//           <br />
//           </label>

//       <label className="Contents">
//           <h3>名前 (Name)</h3>
//           {renderInformationArray(abnormality.basicInfo.name, 'basicInfo.name')}
//           <br />
//           </label>

//       <label className="Contents">
//           <h3>肖像 (Portrait)</h3>
//           {renderInformationArray(abnormality.basicInfo.portrait, 'basicInfo.portrait')}
//           <br />
//           </label>

//       <label className="Contents">
//           <h3>リスクレベル (Risk Level)</h3>
//           {renderLiskLevelArray(abnormality.basicInfo.riskLevel, 'basicInfo.riskLevel')}
//           <br />
//           </label>

//       <label className="Contents">
//           <h3>解放テキスト (Open Text)</h3>
//           {renderInformationArray(abnormality.basicInfo.openText, 'basicInfo.openText')}
//           <br />
//           </label>

//       <label className="Contents">
//           <h3>説明 (Description)</h3>
//           {renderInformationArray(abnormality.basicInfo.desc, 'basicInfo.desc')}
//           <br />
//           </label>

//         <label className="Contents">
//           <h3>特殊ヒント (Special Tips)</h3>
//             <div>
//               {abnormality.basicInfo.specialTips.map((tip, index) => (
//                 <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
//                   <h4>特殊ヒント {index + 1}</h4>
//                   <label>
//                     Open Level:
//                     <input
//                       type="number"
//                       name="openLevel"
//                       value={tip.openLevel}
//                       onChange={(e) => handleArrayChange(e, `basicInfo.specialTips`, index)}
//                     />
//                   </label>
//                   <br />
//                   <label>
//                     Data:
//                     <input
//                       type="text"
//                       name="data"
//                       value={tip.data}
//                       onChange={(e) => handleArrayChange(e, `basicInfo.specialTips`, index)}
//                     />
//                   </label>
//                   <br />
//                   <label>
//                     Cost:
//                     <input
//                       type="number"
//                       name="cost"
//                       value={tip.cost}
//                       onChange={(e) => handleArrayChange(e, `basicInfo.specialTips`, index)}
//                     />
//                   </label>
//                   <br />
//                   <button type="button" onClick={() => handleArrayRemoveItem('basicInfo.specialTips', index)}>
//                     削除
//                   </button>
//                 </div>
//               ))}
//               <button type="button" onClick={() => handleArrayAddItem('basicInfo.specialTips')}>
//                 特殊ヒント追加
//               </button>
//             </div>
//           </label>
//         </div>
//   );
//   const SkillInfoForm = () => (
//     <div className="SkillInfoForm" style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
//           <h2>スキル情報 (Skill Information)</h2>
//       <label className="Contents">
//           <h3>作業成功率 (Work Prob)</h3>
//           <h4>Open Cost</h4>
//             <input
//             type="number"
//             name="openLevel"
//             value={abnormality.skillInfo.workProb.openCost}
//             onChange={(e) => handleChange(e, 'skillInfo.workProb.openCost')}
//             />
//           <h4>Level 1</h4>
//           {renderRWBPInfo(abnormality.skillInfo.workProb.Level1, 'skillInfo.workProb.Level1')}
//           <h4>Level 2</h4>
//           {renderRWBPInfo(abnormality.skillInfo.workProb.Level2, 'skillInfo.workProb.Level2')}
//           <h4>Level 3</h4>
//           {renderRWBPInfo(abnormality.skillInfo.workProb.Level3, 'skillInfo.workProb.Level3')}
//           <h4>Level 4</h4>
//           {renderRWBPInfo(abnormality.skillInfo.workProb.Level4, 'skillInfo.workProb.Level4')}
//           <h4>Level 5</h4>
//           {renderRWBPInfo(abnormality.skillInfo.workProb.Level5, 'skillInfo.workProb.Level5')}
//       </label>

//       <label className="Contents">
//           <label>
//             開始ナレーション (Narration Start):
//             <textarea value={abnormality.skillInfo.narration_start} onChange={(e) => handleChange(e, 'skillInfo.narration_start')} rows={3} cols={50} />
//           </label>
//           <br />
//       </label>
//       <label className="Contents">
//           <label>
//             移動ナレーション (Narration Move):
//             <textarea value={abnormality.skillInfo.narration_move} onChange={(e) => handleChange(e, 'skillInfo.narration_move')} rows={3} cols={50} />
//           </label>
//           <br />
//       </label>

//       <label className="Contents">
//           <h3>ナレーション (Narration)</h3>
//           <div>
//             {abnormality.skillInfo.narration.map((nar, index) => (
//               <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
//                 <label>
//                   ナレーション {index + 1}:
//                   <textarea
//                     value={nar.data}
//                     name="data"
//                     onChange={(e) => {handleArrayChange(e, `skillInfo.narration`, index)}}
//                     rows={3}
//                     cols={50}
//                   />
//                 </label>
//                 <br />
//                 <button type="button" onClick={() => handleArrayRemoveItem('skillInfo.narration', index)}>
//                   削除
//                 </button>
//               </div>
//             ))}
//             <button type="button" onClick={() => handleArrayAddItem('skillInfo.narration')}>
//               ナレーション追加
//             </button>
//           </div>
//           <br />
//       </label>

//       <label className="Contents">
//           <label>
//             クリフォトカウンター (Qliphoth Counter):
//             <input type="number" value={abnormality.skillInfo.qliphoth} onChange={(e) => handleChange(e, 'skillInfo.qliphoth')} />
//           </label>
//           <br />
//       </label>
//       <label className="Contents">

//           <h3>感情状態キューブ境界 (Feeling State Cube Bounds)</h3>
//           <label>
//             Bad:
//             <input type="number" value={abnormality.skillInfo.feelingStateCubeBounds.bad} onChange={(e) => handleChange(e, 'skillInfo.feelingStateCubeBounds.bad')} name="bad" />
//           </label>
//           <label>
//             Norm:
//             <input type="number" value={abnormality.skillInfo.feelingStateCubeBounds.norm} onChange={(e) => handleChange(e, 'skillInfo.feelingStateCubeBounds.norm')} name="norm" />
//           </label>
//           <label>
//             Good:
//             <input type="number" value={abnormality.skillInfo.feelingStateCubeBounds.good} onChange={(e) => handleChange(e, 'skillInfo.feelingStateCubeBounds.good')} name="good" />
//           </label>
//           <br />
//       </label>

//       <label className="Contents">
//           <label>
//             作業速度 (Work Speed):
//             <input type="number" value={abnormality.skillInfo.workSpeed} onChange={(e) => handleChange(e, 'skillInfo.workSpeed')} />
//           </label>
//           <br />
//       </label>

//       <label className="Contents">
//           <h3>作業ダメージ (Work Damage)</h3>
//           {renderDamage(abnormality.skillInfo.workDamage, 'skillInfo.workDamage')}
//           <br />

//           <label>
//             作業クールタイム (Work Cooltime):
//             <input type="number" value={abnormality.skillInfo.workCooltime} onChange={(e) => handleChange(e, 'skillInfo.workCooltime')} />
//           </label>
//           <br />
//       </label>

//       <label className="Contents">
//           <h3>観測ボーナス (Observe Bonus)</h3>
//           {renderObserveBonusArray(abnormality.skillInfo.observeBonus, 'skillInfo.observeBonus')}
//           <br />
//       </label>

//       <label className="Contents">
//           <h3>防具 (Armor)</h3>
//           {renderEquipment(abnormality.skillInfo.armor, 'skillInfo.armor')}
//           <br />
//       </label>

//       <label className="Contents">
//           <h3>武器 (Weapon)</h3>
//           {renderEquipment(abnormality.skillInfo.weapon, 'skillInfo.weapon')}
//           <br />
//       </label>

//       <label className="Contents">
//           <h3>ギフト (Gift)</h3>
//           {renderGift(abnormality.skillInfo.gift, 'skillInfo.gift')}
//       </label>
//       </div>
//   )
//   const EscapeInfoForm = () => (
//     <div className="EscapeInfoForm" style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
//       <h2>脱走情報 (Escape Information)</h2>
//       <label className="Contents">
//         脱走可能 (Escapable):
//         <input type="checkbox" checked={abnormality.escapeInfo.escapable} onChange={(e) => handleChange(e, 'escapeInfo.escapable')} />
//       </label>
//       <br />

//       <label className="Contents">
//         <h3>防御 (Defense)</h3>
//         <h4>データ</h4>
//         {renderRWBPInfo(abnormality.escapeInfo.defense.data, 'escapeInfo.defense.data')}
//         <label>
//           コスト:
//           <input type="number" value={abnormality.escapeInfo.defense.cost} onChange={(e) => handleChange(e, 'escapeInfo.defense.cost')} />
//         </label>
//         <br />
//       </label>

//       <label className="Contents">
//         <h3>特殊ダメージ (Special Damage)</h3>
//         <div>
//           {abnormality.escapeInfo.specialDamage.map((damage, index) => (
//             <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
//               <h4>特殊ダメージ {index + 1}</h4>
//               {renderDamage(damage, `escapeInfo.specialDamage`, index)}
//               <button type="button" onClick={() => handleArrayRemoveItem('escapeInfo.specialDamage', index)}>
//                 削除
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={() => handleArrayAddItem('escapeInfo.specialDamage')}>
//             特殊ダメージ追加
//           </button>
//         </div>
//         <br />
//       </label>
//       <label className="Contents">
//         HP:
//         <input type="number" value={abnormality.escapeInfo.HP} onChange={(e) => handleChange(e, 'escapeInfo.HP')} />
//       </label>
//       <br />
//       <label className="Contents">
//         速度 (Speed):
//         <input type="number" value={abnormality.escapeInfo.speed} onChange={(e) => handleChange(e, 'escapeInfo.speed')} />
//       </label>
//       <br />
//       <label className="Contents">
//         アニメーションプレハブ (Anim Prefab):
//         <input type="text" value={abnormality.escapeInfo.animPrefab} onChange={(e) => handleChange(e, 'escapeInfo.animPrefab')} />
//       </label>
//     </div>
//   )
//   const Result = () => (
//     <div className="Contents" style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
//       <h2>現在のAbnormalityデータ</h2>
//       <button onClick={(e)=>handleDownload(Conver2XML(abnormality))}>Download</button>
//       <pre >{Conver2XML(abnormality).stat}</pre >
//       <pre >{Conver2XML(abnormality).info}</pre >
//       <pre >{Conver2XML(abnormality).creature}</pre >
//       <pre >{Conver2XML(abnormality).gen}</pre >
//     </div>
//   )
//   const Header = () => (
//     <div className="Header">
//         <style>
//         @import url('https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap');
//         @import url('https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=ZCOOL+QingKe+HuangYou&display=swap');
//         </style>
      
//       <div className="System right">LOBOTOMY CORPORATION MOD DEVELOPMENT SYSTEM</div>
//       <div className="Logo quantico-bold">ABNORMALITY INFORMATION GENERATOR</div>
//     </div>
//   );
//   const [currentPage,setCurrentPage] = useState('BasicInfo');
//   const renderPage = () => {
//     switch(currentPage){
//       case 'BasicInfo' : 
//       return <BasicInfoForm />;break;
//       case 'SkillInfoForm' : 
//       return <SkillInfoForm />;break;
//       case 'EscapeInfoForm' : 
//       return <EscapeInfoForm />;break;
//       case 'Result' : 
//       return <Result />;break;
//     }
//     return <BasicInfoForm />;
//   }
//   return (
//     <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <Header></Header>
//       <Navigation currentPage={currentPage} setCurrentPage ={setCurrentPage}></Navigation>
//       <form>
//         {renderPage()}
//       </form>
//       <hr />
//     </div>
//   );
// };
// const Navigation = ({ currentPage, setCurrentPage }:PageInfo) =>{
//   const menuItems = [
//     { id: 'BasicInfoForm', label: '基本情報' },
//     { id: 'SkillInfoForm', label: '作業情報' },
//     { id: 'EscapeInfoForm', label: '脱走情報' },
//     { id: 'Result', label: '出力結果' }
//   ];
//   return(
//     <nav className="Menu bg-blue-600 text-white p-4">
      
//       <div className="MenuContainer container mx-auto">
//         <ul className="MenuItem flex space-x-6">
//           {menuItems.map((item) => (
//             <li key={item.id}>
//               <button
//                 onClick={() => setCurrentPage(item.id)}
//               >
//                 {item.label}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   )

// }
// interface PageInfo{
//   currentPage: string;
//   setCurrentPage: any;
// }
// interface MenuItem{
//   id: string;
//   label: string;
// }
export default {};