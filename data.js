// ===== Shared data + comparison logic (used by index.html and compare.html) =====

// ===== Tiers (5 levels) =====
const tierInfo = {
  ultra:    { name:"超旗舰", range:"¥6000+",     color:"#7c3aed" },
  flagship: { name:"高端",   range:"¥4000-6000", color:"#be185d" },
  midhigh:  { name:"中高端", range:"¥3000-4000", color:"#2563eb" },
  mid:      { name:"中端",   range:"¥2000-3000", color:"#059669" },
  entry:    { name:"入门",   range:"<¥2000",     color:"#d97706" },
};
const tierColors = { ultra:"#7c3aed", flagship:"#be185d", midhigh:"#2563eb", mid:"#059669", entry:"#d97706" };
const tierOrder = ["ultra","flagship","midhigh","mid","entry"];
function getTier(price){ if(price<=0) return "mid"; if(price>=6000) return "ultra"; if(price>=4000) return "flagship"; if(price>=3000) return "midhigh"; if(price>=2000) return "mid"; return "entry"; }

// ===== Product Data (49 products, 2 EOL) =====
const products = [
  // Apple (6)
  {brand:"apple",brandName:"Apple",name:'iPad Pro (M5) 11"',series:"iPad Pro",screen:'11"',chip:"Apple M5",resolution:"2420×1668",price:10799,launchPrice:9599,priceFrom:true,positioning:"专业旗舰",isNew:true,specs:{battery:"—",speaker:"四扬声器",os:"iPadOS",pen:"Apple Pencil Pro"}},
  {brand:"apple",brandName:"Apple",name:'iPad Pro (M5) 13"',series:"iPad Pro",screen:'13"',chip:"Apple M5",resolution:"2752×2064",price:13499,launchPrice:11699,priceFrom:true,positioning:"专业旗舰",isNew:true,specs:{battery:"—",speaker:"四扬声器",os:"iPadOS",pen:"Apple Pencil Pro"}},
  {brand:"apple",brandName:"Apple",name:'iPad Air (M4) 11"',series:"iPad Air",screen:'11"',chip:"Apple M4",resolution:"2360×1640",price:5999,launchPrice:5999,priceFrom:true,positioning:"轻薄生产力",isNew:true,specs:{battery:"—",speaker:"双扬声器",os:"iPadOS",pen:"Apple Pencil Pro"}},
  {brand:"apple",brandName:"Apple",name:'iPad Air (M4) 13"',series:"iPad Air",screen:'13"',chip:"Apple M4",resolution:"2732×2048",price:7999,launchPrice:7999,priceFrom:true,positioning:"轻薄生产力",isNew:true,specs:{battery:"—",speaker:"双扬声器",os:"iPadOS",pen:"Apple Pencil Pro"}},
  {brand:"apple",brandName:"Apple",name:'iPad (A16) 11"',series:"iPad",screen:'11"',chip:"Apple A16",resolution:"2360×1640",price:3799,launchPrice:2999,priceFrom:true,positioning:"入门主力",specs:{battery:"—",speaker:"双扬声器",os:"iPadOS",pen:"Apple Pencil (USB-C)"}},
  {brand:"apple",brandName:"Apple",name:"iPad mini (A17 Pro)",series:"iPad mini",screen:'8.3"',chip:"Apple A17 Pro",resolution:"2266×1488",price:4799,launchPrice:3999,priceFrom:true,positioning:"便携小屏",specs:{battery:"—",speaker:"双扬声器",os:"iPadOS",pen:"Apple Pencil Pro"}},
  // Huawei (10)
  {brand:"huawei",brandName:"华为",name:"MatePad Pro Max",series:"Pro",screen:'13.2"',chip:"华为自研",resolution:"3000×2000",price:5999,launchPrice:5999,priceFrom:true,positioning:"专业旗舰",isNew:true,specs:{battery:"10400mAh",speaker:"六扬声器",os:"HarmonyOS 6.1",pen:"M-Pencil Pro"}},
  {brand:"huawei",brandName:"华为",name:"MatePad Edge",series:"Edge",screen:'14.2"',chip:"华为自研",resolution:"3120×2080",price:5999,launchPrice:5999,priceFrom:true,positioning:"二合一生产力",isNew:true,specs:{battery:"—",speaker:"六扬声器",os:"HarmonyOS 5.1",pen:"M-Pencil Pro"}},
  {brand:"huawei",brandName:"华为",name:'MatePad Pro 12.2"',series:"Pro",screen:'12.2"',chip:"华为自研",resolution:"2800×1840",price:3999,launchPrice:4499,priceFrom:true,positioning:"专业创作",specs:{battery:"—",speaker:"四扬声器",os:"HarmonyOS 5.0",pen:"M-Pencil Pro"}},
  {brand:"huawei",brandName:"华为",name:"MatePad Mini",series:"Mini",screen:'8.8"',chip:"华为自研",resolution:"2560×1600",price:3999,launchPrice:4299,priceFrom:true,positioning:"便携小屏",isNew:true,specs:{battery:"—",speaker:"双扬声器",os:"HarmonyOS 5.1",pen:"M-Pencil Pro"}},
  {brand:"huawei",brandName:"华为",name:"MatePad Mini 悦读版",series:"Mini",screen:'8.8"',chip:"华为自研",resolution:"2560×1600",price:3299,launchPrice:3599,priceFrom:true,positioning:"阅读便携"},
  {brand:"huawei",brandName:"华为",name:"MatePad Air",series:"Air",screen:'12"',chip:"华为自研",resolution:"2800×1840",price:2799,launchPrice:3199,priceFrom:true,positioning:"潮流生产力"},
  {brand:"huawei",brandName:"华为",name:"MatePad 11.5",series:"MatePad",screen:'11.5"',chip:"—",resolution:"—",price:1799,launchPrice:2099,priceFrom:true,positioning:"学习入门"},
  {brand:"huawei",brandName:"华为",name:"MatePad 11.5 S",series:"MatePad",screen:'11.5"',chip:"—",resolution:"—",price:2499,launchPrice:2899,priceFrom:true,positioning:"学习进阶"},
  {brand:"huawei",brandName:"华为",name:"MatePad 11.5 S 灵动款",series:"MatePad",screen:'11.5"',chip:"—",resolution:"—",price:2199,launchPrice:2499,priceFrom:true,positioning:"学习进阶"},
  {brand:"huawei",brandName:"华为",name:"MatePad SE",series:"SE",screen:'11"',chip:"—",resolution:"—",price:1399,launchPrice:1599,priceFrom:true,positioning:"入门娱乐"},
  // Honor (8)
  {brand:"honor",brandName:"荣耀",name:'MagicPad 3 Pro 12.3"',series:"MagicPad",screen:'12.3"',chip:"—",resolution:"—",price:4699,launchPrice:4999,priceFrom:true,positioning:"旗舰大屏"},
  {brand:"honor",brandName:"荣耀",name:'MagicPad 3 12.5"',series:"MagicPad",screen:'12.5"',chip:"—",resolution:"—",price:3099,launchPrice:3499,priceFrom:false,positioning:"大屏旗舰"},
  {brand:"honor",brandName:"荣耀",name:"MagicPad 2",series:"MagicPad",screen:"—",chip:"—",resolution:"—",price:2999,launchPrice:3399,priceFrom:false,positioning:"中高端"},
  {brand:"honor",brandName:"荣耀",name:"平板 V9",series:"V",screen:"—",chip:"—",resolution:"—",price:2699,launchPrice:2999,priceFrom:true,positioning:"中端主力"},
  {brand:"honor",brandName:"荣耀",name:"平板 10 Pro",series:"数字",screen:"—",chip:"—",resolution:"—",price:2699,launchPrice:2999,priceFrom:false,positioning:"中端"},
  {brand:"honor",brandName:"荣耀",name:"平板 X10 Pro",series:"X",screen:'11.5"',chip:"—",resolution:"—",price:1699,launchPrice:1999,priceFrom:true,positioning:"入门进阶"},
  {brand:"honor",brandName:"荣耀",name:"平板 X10",series:"X",screen:'11"',chip:"—",resolution:"—",price:1099,launchPrice:1399,priceFrom:false,positioning:"千元入门"},
  {brand:"honor",brandName:"荣耀",name:"平板 X8 Pro",series:"X",screen:'11.5"',chip:"—",resolution:"—",price:1399,launchPrice:1699,priceFrom:true,positioning:"入门娱乐"},
  // Xiaomi (8, incl Redmi)
  {brand:"xiaomi",brandName:"小米",name:"Xiaomi Pad 8 Pro",series:"Xiaomi Pad",screen:'11.2"',chip:"骁龙8至尊版",resolution:"—",price:2999,launchPrice:2999,priceFrom:true,positioning:"性能旗舰",isNew:true,isHot:true,subBrand:"Xiaomi"},
  {brand:"xiaomi",brandName:"小米",name:"Xiaomi Pad 8",series:"Xiaomi Pad",screen:'11.2"',chip:"—",resolution:"—",price:2799,launchPrice:2799,priceFrom:true,positioning:"中高端",isNew:true,subBrand:"Xiaomi"},
  {brand:"xiaomi",brandName:"小米",name:"Xiaomi Pad 7 Pro",series:"Xiaomi Pad",screen:'11.2"',chip:"—",resolution:"—",price:2699,launchPrice:2999,priceFrom:true,positioning:"中端主力",subBrand:"Xiaomi"},
  {brand:"xiaomi",brandName:"小米",name:"REDMI K Pad 2",series:"REDMI K",screen:"—",chip:"—",resolution:"—",price:3599,launchPrice:3599,priceFrom:true,positioning:"性能电竞",isNew:true,isHot:true,subBrand:"Redmi"},
  {brand:"xiaomi",brandName:"小米",name:"REDMI Pad 2 Pro",series:"REDMI Pad",screen:"—",chip:"—",resolution:"—",price:1899,launchPrice:2199,priceFrom:true,positioning:"中端性价比",subBrand:"Redmi"},
  {brand:"xiaomi",brandName:"小米",name:"REDMI Pad 2",series:"REDMI Pad",screen:"—",chip:"—",resolution:"—",price:1299,launchPrice:1599,priceFrom:true,positioning:"入门性价比",subBrand:"Redmi"},
  {brand:"xiaomi",brandName:"小米",name:"REDMI Pad 2 SE",series:"REDMI Pad",screen:"—",chip:"—",resolution:"—",price:1199,launchPrice:1399,priceFrom:true,positioning:"极致入门",subBrand:"Redmi"},
  {brand:"xiaomi",brandName:"小米",name:"Redmi Pad Pro",series:"REDMI Pad",screen:'12.1"',chip:"—",resolution:"—",price:0,launchPrice:2199,priceFrom:false,positioning:"大屏性价比(EOL)",subBrand:"Redmi",isEOL:true},
  // OPPO (7)
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad 6",series:"Pad",screen:'12.1"',chip:"天玑9500s",resolution:"3000×2120",price:3599,launchPrice:3599,priceFrom:true,positioning:"最新旗舰",isNew:true,isHot:true,specs:{battery:"10420mAh",speaker:"—",os:"ColorOS 16",pen:"OPPO Pencil 2"}},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad Mini",series:"Pad Mini",screen:"—",chip:"—",resolution:"—",price:3699,launchPrice:3699,priceFrom:false,positioning:"小屏便携",isNew:true},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad 5 Pro",series:"Pad Pro",screen:'13.2"',chip:"骁龙8至尊版(第五代)",resolution:"—",price:4499,launchPrice:4999,priceFrom:true,positioning:"大屏旗舰",specs:{battery:"13380mAh",speaker:"—",os:"ColorOS",pen:"支持"}},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad 5",series:"Pad",screen:"—",chip:"天玑9400+",resolution:"3K",price:3299,launchPrice:3699,priceFrom:true,positioning:"中高端"},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad Air5",series:"Pad Air",screen:"—",chip:"—",resolution:"2.8K",price:2499,launchPrice:2799,priceFrom:true,positioning:"轻薄中端",specs:{battery:"10050mAh"}},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad 4 Pro",series:"Pad Pro",screen:"—",chip:"—",resolution:"3.4K",price:3999,launchPrice:4499,priceFrom:true,positioning:"上一代旗舰"},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad SE",series:"Pad SE",screen:'11"',chip:"—",resolution:"—",price:1999,launchPrice:2299,priceFrom:true,positioning:"入门学习",specs:{battery:"9340mAh"}},
  // vivo (12, incl iQOO, 2 EOL)
  {brand:"vivo",brandName:"vivo",name:"vivo Pad6 Pro",series:"vivo Pad",screen:"—",chip:"—",resolution:"4K",price:4999,launchPrice:4999,priceFrom:true,positioning:"最新旗舰",isNew:true,isHot:true,subBrand:"vivo"},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad6 Pro",series:"iQOO Pad",screen:'13.2"',chip:"骁龙8至尊版(第五代)",resolution:"3840×2512",price:4499,launchPrice:4499,priceFrom:true,positioning:"电竞性能旗舰",isNew:true,isHot:true,subBrand:"iQOO",specs:{battery:"13000mAh",speaker:"八扬声器",os:"OriginOS 6",pen:"—"}},
  {brand:"vivo",brandName:"vivo",name:"vivo Pad5 Pro",series:"vivo Pad",screen:"—",chip:"天玑9400",resolution:"—",price:3999,launchPrice:4299,priceFrom:true,positioning:"高端",subBrand:"vivo"},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad5 Pro",series:"iQOO Pad",screen:"—",chip:"天玑9400+",resolution:"—",price:3699,launchPrice:3999,priceFrom:true,positioning:"性能高端",subBrand:"iQOO"},
  {brand:"vivo",brandName:"vivo",name:"vivo Pad5",series:"vivo Pad",screen:"—",chip:"天玑9300+",resolution:"—",price:3299,launchPrice:3599,priceFrom:true,positioning:"中高端",isNew:true,subBrand:"vivo"},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad5",series:"iQOO Pad",screen:"—",chip:"天玑9300+",resolution:"—",price:0,launchPrice:3299,priceFrom:false,positioning:"中高端(EOL)",subBrand:"iQOO",isEOL:true},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad5e",series:"iQOO Pad",screen:"—",chip:"第三代骁龙8s",resolution:"—",price:2999,launchPrice:3299,priceFrom:true,positioning:"中端",isNew:true,subBrand:"iQOO"},
  {brand:"vivo",brandName:"vivo",name:"vivo Pad5e",series:"vivo Pad",screen:"—",chip:"—",resolution:"—",price:2499,launchPrice:2799,priceFrom:true,positioning:"学娱中端",isNew:true,subBrand:"vivo"},
  {brand:"vivo",brandName:"vivo",name:"vivo Pad SE",series:"vivo Pad",screen:'12.3"',chip:"—",resolution:"—",price:1999,launchPrice:2299,priceFrom:true,positioning:"入门护眼",isNew:true,subBrand:"vivo"},
  {brand:"vivo",brandName:"vivo",name:"vivo Pad3",series:"vivo Pad",screen:"—",chip:"第三代骁龙8s",resolution:"—",price:0,launchPrice:2999,priceFrom:false,positioning:"中端(EOL)",subBrand:"vivo",isEOL:true},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad2 Pro",series:"iQOO Pad",screen:"—",chip:"天玑9300+",resolution:"—",price:2999,launchPrice:3499,priceFrom:true,positioning:"中端性能",subBrand:"iQOO"},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad2",series:"iQOO Pad",screen:"—",chip:"第三代骁龙8s",resolution:"—",price:2799,launchPrice:3199,priceFrom:true,positioning:"中端",subBrand:"iQOO"},
];
products.forEach(p=>{p.tier=getTier(p.price);});

const brandInfo={
  apple:{name:"Apple",color:"#555",logo:"",tag:"iPadOS · M芯片"},
  huawei:{name:"华为",color:"#c8102e",logo:"H",tag:"鸿蒙 · 自研芯片"},
  honor:{name:"荣耀",color:"#1a73e8",logo:"HONOR",tag:"MagicPad · X系列"},
  xiaomi:{name:"小米/红米",color:"#ff6900",logo:"MI",tag:"Xiaomi Pad · REDMI"},
  oppo:{name:"OPPO",color:"#1ba784",logo:"OPPO",tag:"ColorOS · 柔光屏"},
  vivo:{name:"vivo/iQOO",color:"#415fff",logo:"vivo",tag:"OriginOS · 双品牌"},
};
const brandOrder=["apple","huawei","honor","xiaomi","oppo","vivo"];
const MAX_COMPARE=5;

// ===== Shared compare state (persisted across pages via localStorage) =====
let compareList=[];
try{const s=localStorage.getItem('tb_compare_list');if(s){const arr=JSON.parse(s);if(Array.isArray(arr))compareList=arr.filter(i=>Number.isInteger(i)&&i>=0&&i<products.length);}}catch(e){}
function saveCompare(){try{localStorage.setItem('tb_compare_list',JSON.stringify(compareList));}catch(e){}}
// page-specific hook, set by each page (e.g. re-render products on index)
let onCompareChange=null;

// ===== Radar Scores =====
function getRadarScores(p){
  let value=50;if(p.price>0)value=Math.max(20,Math.min(100,108-(p.price/130)));
  let screen=50;if(p.screen&&p.screen!=="—"){const s=parseFloat(String(p.screen).replace(/[^0-9.]/g,''));if(!isNaN(s))screen=Math.max(30,Math.min(100,(s-6)*10));}
  let perf=50;const c=(p.chip||'').toLowerCase();
  if(c.includes('m5'))perf=100;else if(c.includes('至尊版')&&c.includes('第五代'))perf=95;else if(c.includes('m4'))perf=92;else if(c.includes('9500'))perf=90;else if(c.includes('9400'))perf=85;else if(c.includes('a17 pro'))perf=82;else if(c.includes('9300'))perf=75;else if(c.includes('a16'))perf=70;else if(c.includes('8s'))perf=65;else if(c.includes('自研'))perf=68;
  let bat=40;if(p.specs&&p.specs.battery&&p.specs.battery!=="—"){const m=parseInt(p.specs.battery.replace(/[^0-9]/g,''));if(!isNaN(m)&&m>0)bat=Math.max(20,Math.min(100,(m/14000)*100));}
  let aud=40;if(p.specs&&p.specs.speaker&&p.specs.speaker!=="—"){const s=p.specs.speaker;if(s.includes('八'))aud=100;else if(s.includes('六'))aud=85;else if(s.includes('四'))aud=70;else if(s.includes('双'))aud=50;}
  let eco=50;if(p.specs&&p.specs.os){if(p.specs.os.includes('iPadOS'))eco=95;else if(p.specs.os.includes('HarmonyOS 6'))eco=88;else if(p.specs.os.includes('HarmonyOS 5'))eco=82;else if(p.specs.os.includes('HarmonyOS'))eco=80;else if(p.specs.os.includes('ColorOS 16'))eco=72;else if(p.specs.os.includes('ColorOS'))eco=68;else if(p.specs.os.includes('OriginOS 6'))eco=72;else if(p.specs.os.includes('OriginOS'))eco=68;}
  if(p.brand==="apple"&&(!p.specs||!p.specs.os))eco=90;
  if(p.specs&&p.specs.pen&&p.specs.pen!=="—"){if(p.specs.pen.includes('Pro'))eco=Math.min(100,eco+8);else eco=Math.min(100,eco+4);}
  return{value:Math.round(value),screen:Math.round(screen),performance:Math.round(perf),battery:Math.round(bat),audio:Math.round(aud),ecosystem:Math.round(eco)};
}

// ===== Radar Chart =====
function rPt(cx,cy,r,a,v){const rad=(a-90)*Math.PI/180,d=r*(v/100);return{x:cx+d*Math.cos(rad),y:cy+d*Math.sin(rad)};}
function renderRadar(){
  const ct=document.getElementById("radarCt"),lg=document.getElementById("radarLegend");
  if(!ct)return;
  const sel=compareList.map(i=>products[i]);
  if(sel.length===0){ct.innerHTML='<div class="radar-empty"><div class="re-icon">&#128202;</div><div>选择产品后显示雷达图</div></div>';if(lg)lg.innerHTML="";return;}
  const dims=[{k:"value",l:"性价比"},{k:"screen",l:"屏幕"},{k:"performance",l:"性能"},{k:"battery",l:"续航"},{k:"audio",l:"音效"},{k:"ecosystem",l:"生态"}];
  const cx=240,cy=240,r=170,angles=dims.map((_,i)=>i*60);
  let svg=`<svg viewBox="0 0 480 500" style="width:100%;max-width:480px;">`;
  [25,50,75,100].forEach(lv=>{let pts=angles.map(a=>{const p=rPt(cx,cy,r,a,lv);return`${p.x.toFixed(1)},${p.y.toFixed(1)}`;}).join(" ");svg+=`<polygon points="${pts}" fill="none" stroke="#e5e7eb" stroke-width="1"/>`;});
  angles.forEach((a,i)=>{const p=rPt(cx,cy,r,a,100);svg+=`<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="#e5e7eb" stroke-width="1"/>`;const lp=rPt(cx,cy,r+28,a,100);svg+=`<text x="${lp.x.toFixed(1)}" y="${lp.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="700" fill="#4b5563">${dims[i].l}</text>`;});
  [25,50,75,100].forEach(lv=>{const sp=rPt(cx,cy,r,0,lv);svg+=`<text x="${sp.x+6}" y="${sp.y+3}" font-size="9" fill="#9ca3af">${lv}</text>`;});
  const lgItems=[];
  sel.forEach((p,i)=>{const sc=getRadarScores(p);const col=brandInfo[p.brand].color;let pts=dims.map((d,j)=>{const pt=rPt(cx,cy,r,angles[j],sc[d.k]);return`${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;}).join(" ");const fo=sel.length>3?0.08:0.12;svg+=`<polygon points="${pts}" fill="${col}" fill-opacity="${fo}" stroke="${col}" stroke-width="2" stroke-linejoin="round"/>`;dims.forEach((d,j)=>{const pt=rPt(cx,cy,r,angles[j],sc[d.k]);svg+=`<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="4" fill="${col}" stroke="#fff" stroke-width="1.5"/>`;});if(i===0){dims.forEach((d,j)=>{const pt=rPt(cx,cy,r,angles[j],sc[d.k]);svg+=`<text x="${pt.x.toFixed(1)}" y="${(pt.y-8).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="700" fill="${col}">${sc[d.k]}</text>`;});}
    const sn=p.name.length>14?p.name.substring(0,14)+"...":p.name;lgItems.push({col,name:sn,brand:p.brandName});});
  svg+="</svg>";ct.innerHTML=svg;
  if(lg)lg.innerHTML=lgItems.map(it=>`<div class="radar-legend-item"><div class="ls" style="background:${it.col}33;border:2px solid ${it.col};"></div><span>${it.name}</span><span style="color:var(--ts);font-weight:400;font-size:11px;">${it.brand}</span></div>`).join("");
}

// ===== Comparison Grid (up to 5 cols) =====
function renderCmpGrid(){
  const ct=document.getElementById("cmpGridCt");if(!ct)return;
  const sel=compareList.map(i=>products[i]);const cc=Math.max(sel.length,1);
  const rows=[{l:"现价",k:"price",t:"price",h:"low"},{l:"首销价",k:"launchPrice",t:"pp"},{l:"降价幅度",k:"drop",t:"drop",h:"high"},{l:"价格档位",k:"tier",t:"tier"},{l:"屏幕",k:"screen",t:"text",h:"high"},{l:"处理器",k:"chip",t:"text"},{l:"分辨率",k:"resolution",t:"text"},{l:"电池",k:"battery",t:"bat",h:"high"},{l:"扬声器",k:"speaker",t:"spk",h:"high"},{l:"系统",k:"os",t:"text"},{l:"手写笔",k:"pen",t:"text"},{l:"定位",k:"positioning",t:"text"}];
  if(sel.length===0){ct.innerHTML='<div class="cmp-empty"><div class="hint-icon">&#128269;</div><div class="hint-text">尚未选择对比产品</div><div class="hint-sub">点击下方「+ 添加产品」选择，或返回首页勾选（最多 5 款）</div></div>';return;}
  let h=`<div class="cmp-grid" style="--cc:${cc};"><div class="cell label-cell"></div>`;
  sel.forEach((p,i)=>{const info=brandInfo[p.brand];h+=`<div class="cell ph-cell"><div class="bs" style="background:${info.color}"></div><button class="p-rm" onclick="removeFromCompare(${compareList[i]})">&times;</button><div class="pn-col">${p.name}</div><div class="pb-col">${p.brandName}${p.subBrand?" · "+p.subBrand:""}</div></div>`;});
  rows.forEach(row=>{
    h+=`<div class="cell label-cell">${row.l}</div>`;
    let bi=-1;
    if(row.h==="low"&&row.k==="price"){let bv=Infinity;sel.forEach((p,i)=>{if(p.price>0&&p.price<bv){bv=p.price;bi=i;}});}
    if(row.h==="high"){
      if(row.k==="drop"){let bv=-1;sel.forEach((p,i)=>{if(p.launchPrice>0&&p.price>0&&p.launchPrice>p.price){const d=p.launchPrice-p.price;if(d>bv){bv=d;bi=i;}}});}
      else if(row.k==="screen"){let bv=0;sel.forEach((p,i)=>{const n=parseFloat(String(p.screen).replace(/[^0-9.]/g,''));if(!isNaN(n)&&n>bv){bv=n;bi=i;}});}
      else if(row.k==="battery"){let bv=0;sel.forEach((p,i)=>{const raw=(p.specs&&p.specs.battery)?p.specs.battery:'0';const n=parseInt(raw.replace(/[^0-9]/g,''));if(!isNaN(n)&&n>bv){bv=n;bi=i;}});}
      else if(row.k==="speaker"){let bv=0;const rk={'八':4,'六':3,'四':2,'双':1};sel.forEach((p,i)=>{const raw=(p.specs&&p.specs.speaker)?p.specs.speaker:'';let r=0;for(const[k,v]of Object.entries(rk)){if(raw.includes(k)){r=v;break;}}if(r>bv){bv=r;bi=i;}});}
    }
    sel.forEach((p,i)=>{
      let val="",cls="";
      if(row.t==="price")val=p.price>0?`<span class="pv">¥${p.price.toLocaleString()}${p.priceFrom?" 起":""}</span>`:'<span class="di">缺货</span>';
      else if(row.t==="pp")val=p.launchPrice>0?`¥${p.launchPrice.toLocaleString()}`:'<span class="di">—</span>';
      else if(row.t==="drop"){if(p.launchPrice>0&&p.price>0&&p.launchPrice>p.price){const d=p.launchPrice-p.price,pc=((d/p.launchPrice)*100).toFixed(1);val=`<span class="dv">-¥${d.toLocaleString()}<br>(${pc}%)</span>`;}else if(p.price<=0)val='<span class="di">EOL</span>';else val='<span class="di">持平</span>';}
      else if(row.t==="tier")val=`<span class="tv ${p.tier}">${tierInfo[p.tier].name}</span>`;
      else if(row.t==="bat"){const raw=(p.specs&&p.specs.battery)?p.specs.battery:'—';val=raw!=="—"?raw:'<span class="di">—</span>';}
      else if(row.t==="spk"){const raw=(p.specs&&p.specs.speaker)?p.specs.speaker:'—';val=raw!=="—"?raw:'<span class="di">—</span>';}
      else if(row.t==="text"){if(row.k==="os"){const raw=(p.specs&&p.specs.os)?p.specs.os:'—';val=raw!=="—"?raw:'<span class="di">—</span>';}else if(row.k==="pen"){const raw=(p.specs&&p.specs.pen)?p.specs.pen:'—';val=raw!=="—"?raw:'<span class="di">—</span>';}else{const raw=p[row.k];val=(raw&&raw!=="—")?raw:'<span class="di">—</span>';}}
      if(i===bi)cls="best";h+=`<div class="cell ${cls}">${val}</div>`;
    });
  });
  h+="</div>";ct.innerHTML=h;
}

// ===== Compare UI (shared) =====
function toggleCompare(idx){
  const pos=compareList.indexOf(idx);
  if(pos>=0){compareList.splice(pos,1);}else{if(compareList.length>=MAX_COMPARE){alert("最多选择 "+MAX_COMPARE+" 款产品进行对比");return;}compareList.push(idx);}
  saveCompare();updateCompareUI();
}
function removeFromCompare(idx){compareList=compareList.filter(i=>i!==idx);saveCompare();updateCompareUI();}
function clearCompare(){compareList=[];saveCompare();updateCompareUI();}
function updateCompareUI(){
  const tray=document.getElementById("cmpTray");
  if(tray){
    const c1=document.getElementById("cmpCount");if(c1)c1.textContent=compareList.length;
    const c2=document.getElementById("cmpCountTray");if(c2)c2.textContent=compareList.length;
    const items=document.getElementById("cmpItems");items.innerHTML="";
    compareList.forEach(idx=>{const p=products[idx];const chip=document.createElement("div");chip.className="compare-tray-chip";chip.innerHTML=`${p.name} <span class="remove" onclick="removeFromCompare(${idx})">&times;</span>`;items.appendChild(chip);});
    if(compareList.length>0)tray.classList.add("show");else tray.classList.remove("show");
    const goBtn=document.getElementById("goCompare");
    if(goBtn)goBtn.classList.toggle("disabled",compareList.length===0);
  }
  if(typeof onCompareChange==="function")onCompareChange();
  if(typeof refreshPicker==="function")refreshPicker();
  if(typeof refreshQuickSelect==="function")refreshQuickSelect();
}

// ===== Price-change (month-trend) proxy =====
// NOTE: official sites expose only launchPrice vs current price (no 1-month history).
// We use launch->now delta as the best-available proxy for "调价". Replace monthChange
// with a real last-30-day delta when a price-history source is provided.
products.forEach(p=>{ if(p.price>0&&p.launchPrice>0){ p.monthChange=p.price-p.launchPrice; } else { p.monthChange=null; } });
function monthTrendPill(p){
  if(p.monthChange===null||p.monthChange===0)return "";
  if(p.monthChange<0)return '<span class="month-pill down">调价 ↓-¥'+Math.abs(p.monthChange).toLocaleString()+'</span>';
  return '<span class="month-pill up">调价 ↑+¥'+p.monthChange.toLocaleString()+'</span>';
}

// ===== Shared filter state =====
let currentBrandFilter="all", currentTierFilter="all", currentNewFilter="all";
function getFiltered(){return products.map((p,i)=>({...p,_idx:i})).filter(p=>{if(currentBrandFilter!=="all"&&p.brand!==currentBrandFilter)return false;if(currentTierFilter!=="all"&&p.tier!==currentTierFilter)return false;if(currentNewFilter==="new"&&!p.isNew)return false;return true;});}

// ===== Scatter Chart (all 49 products) =====
function renderTierOv(){
  const ct=document.getElementById("tierOv"),tip=document.getElementById("ovTip");if(!ct)return;
  const W=1200,H=600,padL=70,padR=30,padT=40,padB=80;
  const cW=W-padL-padR,cH=H-padT-padB,pMin=1000,pMax=14000;
  const bc={};brandOrder.forEach((b,i)=>{bc[b]=padL+(cW/6)*(i+0.5);});
  const yp=pr=>pr<=0?padT+cH-8:padT+cH-((pr-pMin)/(pMax-pMin))*cH;
  const bands=[
    {k:"ultra",n:"超旗舰 ¥6K+",yT:yp(14000),yB:yp(6000)},
    {k:"flagship",n:"高端 ¥4K-6K",yT:yp(6000),yB:yp(4000)},
    {k:"midhigh",n:"中高端 ¥3K-4K",yT:yp(4000),yB:yp(3000)},
    {k:"mid",n:"中端 ¥2K-3K",yT:yp(3000),yB:yp(2000)},
    {k:"entry",n:"入门 <¥2K",yT:yp(2000),yB:yp(1000)},
  ];
  let svg='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;">';
  bands.forEach(t=>{const c=tierColors[t.k];svg+='<rect x="'+padL+'" y="'+t.yT+'" width="'+cW+'" height="'+(t.yB-t.yT)+'" fill="'+c+'" fill-opacity="0.06"/>';svg+='<line x1="'+padL+'" y1="'+t.yB+'" x2="'+(W-padR)+'" y2="'+t.yB+'" stroke="'+c+'" stroke-width="1" stroke-opacity="0.2" stroke-dasharray="4,3"/>';svg+='<text x="'+(padL+8)+'" y="'+(t.yT+16)+'" font-size="11" font-weight="700" fill="'+c+'">'+t.n+'</text>';});
  [2000,4000,6000,8000,10000,12000,14000].forEach(pr=>{const y=yp(pr);svg+='<line x1="'+padL+'" y1="'+y+'" x2="'+(W-padR)+'" y2="'+y+'" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="2,4"/>';svg+='<text x="'+(padL-8)+'" y="'+(y+4)+'" text-anchor="end" font-size="11" fill="#9ca3af">¥'+(pr/1000)+'K</text>';});
  brandOrder.forEach((b,i)=>{const x=bc[b];const info=brandInfo[b];if(i>0){const sx=padL+(cW/6)*i;svg+='<line x1="'+sx+'" y1="'+padT+'" x2="'+sx+'" y2="'+(padT+cH)+'" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="2,4"/>';}svg+='<rect x="'+(x-55)+'" y="'+(H-padB+8)+'" width="110" height="28" rx="14" fill="'+info.color+'" fill-opacity="0.1"/>';svg+='<text x="'+x+'" y="'+(H-padB+26)+'" text-anchor="middle" font-size="13" font-weight="700" fill="'+info.color+'">'+info.name+'</text>';const cnt=products.filter(p=>p.brand===b).length;svg+='<text x="'+x+'" y="'+(H-padB+48)+'" text-anchor="middle" font-size="11" fill="#9ca3af">'+cnt+' 款</text>';});
  brandOrder.forEach(b=>{
    const bps=products.map((p,i)=>({...p,_idx:i})).filter(p=>p.brand===b);
    const valid=bps.filter(p=>p.price>0);
    const eol=bps.filter(p=>p.price<=0);
    const cc=bc[b],spread=65;
    valid.forEach((p,j)=>{
      const xo=valid.length===1?0:(j/(valid.length-1)-0.5)*spread*2;
      const x=cc+xo,y=yp(p.price),col=brandInfo[p.brand].color;
      const sel=compareList.includes(p._idx);
      const dim=(currentBrandFilter!=="all"&&p.brand!==currentBrandFilter)||(currentTierFilter!=="all"&&p.tier!==currentTierFilter);
      svg+='<g class="ov-dot'+(sel?' sel':'')+(dim?' dim':'')+'" data-idx="'+p._idx+'" data-name="'+p.name+'" data-brand="'+p.brandName+'" data-price="'+p.price+'" data-tier="'+tierInfo[p.tier].name+'" data-eol="0">';
      svg+='<circle cx="'+x+'" cy="'+y+'" r="'+(sel?11:9)+'" fill="'+col+'" fill-opacity="'+(dim?0.12:0.85)+'" stroke="'+(sel?'#1a1a2e':(dim?'none':'#fff'))+'" stroke-width="'+(sel?3:2)+'"/>'+(p.isNew?'<text x="'+(x+8)+'" y="'+(y-7)+'" font-size="13" font-weight="700" fill="#f59e0b" text-anchor="middle">★</text>':'');
      svg+='</g>';
    });
    eol.forEach((p,j)=>{
      const x=cc+(j-eol.length/2+0.5)*24,y=padT+cH-6;
      const col=brandInfo[p.brand].color;
      const sel=compareList.includes(p._idx);
      const dim=(currentBrandFilter!=="all"&&p.brand!==currentBrandFilter)||(currentTierFilter!=="all"&&p.tier!==currentTierFilter);
      svg+='<g class="ov-dot'+(sel?' sel':'')+(dim?' dim':'')+'" data-idx="'+p._idx+'" data-name="'+p.name+'" data-brand="'+p.brandName+'" data-price="0" data-tier="'+tierInfo[p.tier].name+'" data-eol="1">';
      svg+='<circle cx="'+x+'" cy="'+y+'" r="'+(sel?9:7)+'" fill="'+col+'" fill-opacity="'+(dim?0.08:0.35)+'" stroke="'+(dim?'none':brandInfo[p.brand].color)+'" stroke-width="1.5" stroke-dasharray="2,2"/>';
      svg+='</g>';
    });
  });
  let lx=padL+4,ly=16;
  brandOrder.forEach(b=>{const c=brandInfo[b].color;svg+='<circle cx="'+lx+'" cy="'+ly+'" r="6" fill="'+c+'" fill-opacity="0.85" stroke="#fff" stroke-width="1.5"/>';svg+='<text x="'+(lx+12)+'" y="'+(ly+4)+'" font-size="11" font-weight="600" fill="#4b5563">'+brandInfo[b].name+'</text>';lx+=(brandInfo[b].name.length>4?96:76);});
  svg+='<circle cx="'+lx+'" cy="'+ly+'" r="6" fill="#9ca3af" fill-opacity="0.35" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="2,2"/>';svg+='<text x="'+(lx+12)+'" y="'+(ly+4)+'" font-size="11" font-weight="600" fill="#4b5563">EOL/缺货</text>';
  svg+='<text x="'+(W-padR-4)+'" y="'+(ly+4)+'" text-anchor="end" font-size="11" fill="#9ca3af" font-style="italic">点击圆点加入对比 (最多5款)</text>';
  lx+=110;svg+='<text x="'+lx+'" y="'+(ly+4)+'" font-size="15" font-weight="700" fill="#f59e0b">★</text>';svg+='<text x="'+(lx+16)+'" y="'+(ly+4)+'" font-size="11" font-weight="600" fill="#4b5563">新品</text>';
  svg+='</svg>';
  ct.innerHTML=svg;
  ct.querySelectorAll(".ov-dot").forEach(dot=>{
    dot.addEventListener("mouseenter",()=>{
      const n=dot.dataset.name,b=dot.dataset.brand,pr=parseInt(dot.dataset.price),t=dot.dataset.tier,eol=dot.dataset.eol;
      const pt=pr>0?"¥"+pr.toLocaleString():"已停产/EOL";
      tip.innerHTML='<div class="tt-b">'+b+'</div><div style="font-size:13px;font-weight:700;margin:2px 0;">'+n+'</div><div class="tt-p">'+pt+'</div><div class="tt-t">'+t+'</div>'+(eol==="1"?'<div class="tt-eol">EOL/缺货</div>':'');
      tip.style.display="block";
    });
    dot.addEventListener("mousemove",e=>{const r=document.getElementById("tierOvContainer").getBoundingClientRect();tip.style.left=(e.clientX-r.left+12)+"px";tip.style.top=(e.clientY-r.top+12)+"px";});
    dot.addEventListener("mouseleave",()=>{tip.style.display="none";});
    dot.addEventListener("click",()=>{toggleCompare(parseInt(dot.dataset.idx));});
  });
}

// ===== Tier Summary Cards =====
function renderTierSum(){
  const ct=document.getElementById("tierSumGrid");if(!ct)return;let h="";
  tierOrder.forEach(t=>{const items=products.filter(p=>p.tier===t);const brands=[...new Set(items.map(p=>p.brandName))];const ti=tierInfo[t];h+='<div class="tier-sum-card '+t+'"><div class="ts-name">'+ti.name+'</div><div class="ts-range">'+ti.range+'</div><div class="ts-count">'+items.length+' 款</div><div class="ts-brands">'+brands.join(" · ")+'</div></div>';});
  ct.innerHTML=h;
}

// ===== Product Cards =====
function renderProducts(){
  const ct=document.getElementById("productSections");if(!ct)return;ct.innerHTML="";
  const brands=currentBrandFilter==="all"?brandOrder:[currentBrandFilter];
  brands.forEach(b=>{
    const all=products.map((p,i)=>({...p,_idx:i})).filter(p=>p.brand===b);if(all.length===0)return;
    const fi=currentTierFilter==="all"?all:all.filter(p=>p.tier===currentTierFilter);if(currentNewFilter==="new")fi=fi.filter(p=>p.isNew);if(fi.length===0)return;
    const info=brandInfo[b],sec=document.createElement("div");sec.className="brand-section";sec.dataset.brand=b;
    let h='<div class="brand-header" data-brand="'+b+'"><div class="brand-logo">'+info.logo+'</div><div><div class="brand-name">'+info.name+'</div><div class="brand-tag">'+info.tag+'</div></div><div class="brand-count">'+fi.length+' 款'+(currentTierFilter!=="all"?"（当前档位）":"在售")+'</div></div>';
    if(currentTierFilter==="all"){tierOrder.forEach(t=>{const ti=fi.filter(p=>p.tier===t);if(ti.length===0)return;const tinfo=tierInfo[t];h+='<div class="tier-group"><div class="tier-header"><span class="tier-badge '+t+'">'+tinfo.name+'</span><span class="tier-price-range">'+tinfo.range+' · '+ti.length+' 款</span></div><div class="product-grid">';ti.forEach(p=>{h+=renderCard(p);});h+='</div></div>';});}else{h+='<div class="product-grid">';fi.forEach(p=>{h+=renderCard(p);});h+='</div>';}
    sec.innerHTML=h;ct.appendChild(sec);
  });
  document.querySelectorAll(".compare-check input").forEach(cb=>{cb.addEventListener("change",e=>{toggleCompare(parseInt(e.target.dataset.idx));});});
}
function renderCard(p){
  const pt=p.price>0?'<span class="unit">¥</span>'+p.price.toLocaleString()+(p.priceFrom?' <span class="unit">起</span>':'') :'<span class="unit">暂无报价</span>';
  const badge=p.isEOL?'<span class="badge-eol">EOL</span>':p.isNew?'<span class="badge-new">新品</span>':p.isHot?'<span class="badge-hot">热销</span>':'';
  const st=p.subBrand?'<span class="sub-brand-tag">'+p.subBrand+'</span>':'';
  let pc='';
  if(p.launchPrice&&p.launchPrice>0&&p.price>0){if(p.launchPrice>p.price){const d=p.launchPrice-p.price,pc2=((d/p.launchPrice)*100).toFixed(1);pc='<div class="price-compare"><span class="price-launch">首销 ¥'+p.launchPrice.toLocaleString()+'</span><span class="price-diff drop">降 ¥'+d.toLocaleString()+' ('+pc2+'%)</span></div>';}else pc='<div class="price-compare"><span class="price-diff same">与首销价持平</span></div>';}else if(p.price<=0&&p.launchPrice>0)pc='<div class="price-compare"><span class="price-launch">首销 ¥'+p.launchPrice.toLocaleString()+'</span><span class="price-diff na">已停产/EOL</span></div>';
  let sr='<div class="spec-row"><span class="spec-label">屏幕</span><span class="spec-value">'+(p.screen||"—")+'</span></div><div class="spec-row"><span class="spec-label">处理器</span><span class="spec-value">'+(p.chip||"—")+'</span></div><div class="spec-row"><span class="spec-label">分辨率</span><span class="spec-value">'+(p.resolution||"—")+'</span></div>';
  if(p.specs){if(p.specs.battery&&p.specs.battery!=="—")sr+='<div class="spec-row"><span class="spec-label">电池</span><span class="spec-value">'+p.specs.battery+'</span></div>';if(p.specs.speaker&&p.specs.speaker!=="—")sr+='<div class="spec-row"><span class="spec-label">扬声器</span><span class="spec-value">'+p.specs.speaker+'</span></div>';if(p.specs.os&&p.specs.os!=="—")sr+='<div class="spec-row"><span class="spec-label">系统</span><span class="spec-value">'+p.specs.os+'</span></div>';if(p.specs.pen&&p.specs.pen!=="—")sr+='<div class="spec-row"><span class="spec-label">手写笔</span><span class="spec-value">'+p.specs.pen+'</span></div>';}
  const ti=tierInfo[p.tier];sr+='<div class="spec-row"><span class="spec-label">档位</span><span class="spec-value"><span class="tier-badge '+p.tier+'" style="font-size:11px">'+ti.name+'</span></span></div>';sr+='<div class="spec-row"><span class="spec-label">定位</span><span class="spec-value"><span class="spec-tag">'+p.positioning+'</span></span></div>';
  const ck=compareList.includes(p._idx);
  const mt=monthTrendPill(p);
  return'<div class="product-card '+(ck?'selected':'')+'" data-brand="'+p.brand+'" data-idx="'+p._idx+'">'+badge+mt+'<div class="card-top"><div class="product-name">'+p.name+st+'</div><span class="product-series">'+p.series+'</span></div><div class="price-area"><div class="price-current">'+pt+'</div>'+pc+'</div><div class="spec-list">'+sr+'</div><label class="compare-check"><input type="checkbox" data-idx="'+p._idx+'" '+(ck?'checked':'')+'> 加入对比</label></div>';
}

// ===== Table =====
function renderTable(){
  const tb=document.getElementById("tableBody");if(!tb)return;tb.innerHTML="";getFiltered().forEach(p=>{
    const tr=document.createElement("tr");
    const pt=p.price>0?'¥'+p.price.toLocaleString()+(p.priceFrom?'<span class="from"> 起</span>':'') :'<span class="from">EOL/缺货</span>';
    const lt=p.launchPrice>0?'¥'+p.launchPrice.toLocaleString():'—';
    let dt='—';if(p.launchPrice>0&&p.price>0){if(p.price<p.launchPrice){const d=p.launchPrice-p.price,pc=((d/p.launchPrice)*100).toFixed(1);dt='<span class="drop-amount-text">-¥'+d.toLocaleString()+'</span> <span class="drop-pct">('+pc+'%)</span>';}else if(p.price>p.launchPrice){const d=p.price-p.launchPrice,pc=((d/p.launchPrice)*100).toFixed(1);dt='<span class="drop-amount-up">+¥'+d.toLocaleString()+'</span> <span class="drop-pct-up">(+'+pc+'%)</span>';}else{dt='<span class="from">持平</span>';}}
    const ti=tierInfo[p.tier];const mt=monthTrendPill(p);
    tr.innerHTML='<td><div class="brand-cell" data-brand="'+p.brand+'"><span class="dot"></span>'+p.brandName+'</div></td><td style="font-weight:600">'+p.name+'</td><td><span class="tier-cell '+p.tier+'">'+ti.name+'</span></td><td>'+(p.screen||"—")+'</td><td>'+(p.chip||"—")+'</td><td>'+(p.resolution||"—")+'</td><td style="color:var(--ts)">'+lt+'</td><td class="price-cell">'+pt+' '+mt+'</td><td class="price-drop-cell">'+dt+'</td><td><span class="spec-tag">'+p.positioning+'</span></td>';
    tb.appendChild(tr);
  });
}

// ===== Price Chart =====
function renderPriceChart(){
  const ct=document.getElementById("priceChart");if(!ct)return;ct.innerHTML="";
  const bpr=brandOrder.map(b=>{const items=products.filter(p=>p.brand===b&&p.price>0);const pr=items.map(p=>p.price);return{brand:b,min:Math.min(...pr),max:Math.max(...pr),count:items.length,info:brandInfo[b]};});
  const gm=Math.max(...bpr.map(b=>b.max));
  bpr.forEach(b=>{const minP=(b.min/gm)*100,maxP=(b.max/gm)*100,w=maxP-minP;const row=document.createElement("div");row.className="price-bar-row";row.innerHTML='<div class="price-bar-label"><span class="dot" style="background:'+b.info.color+'"></span>'+b.info.name+'</div><div class="price-bar-container"><div class="price-bar" style="background:'+b.info.color+';margin-left:'+minP+'%;width:'+Math.max(w,8)+'%;">¥'+(b.min/1000).toFixed(1)+'k - ¥'+(b.max/1000).toFixed(1)+'k</div></div><div class="price-bar-range">'+b.count+'款</div>';ct.appendChild(row);});
}

// ===== Drop Chart =====
function renderDropChart(){
  const ct=document.getElementById("dropChart");if(!ct)return;ct.innerHTML="";
  const drops=products.filter(p=>p.launchPrice>0&&p.price>0&&p.launchPrice!==p.price).map(p=>({name:p.name,brand:p.brand,diff:p.price-p.launchPrice,pct:((p.price-p.launchPrice)/p.launchPrice)*100})).sort((a,b)=>Math.abs(b.diff)-Math.abs(a.diff));
  const md=drops.length>0?Math.max(...drops.map(d=>Math.abs(d.diff))):1;
  drops.forEach((d,i)=>{const up=d.diff>0,wp=(Math.abs(d.diff)/md)*100,info=brandInfo[d.brand];const mt='<span class="month-pill '+(up?'up':'down')+'" style="margin-left:6px;">调价 '+(up?'↑+':'↓-')+'¥'+Math.abs(d.diff).toLocaleString()+'</span>';const row=document.createElement("div");row.className="drop-item";row.innerHTML='<div class="drop-rank">'+(i+1)+'</div><div class="drop-name"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+info.color+';margin-right:4px;"></span>'+d.name+mt+'</div><div class="drop-bar-container"><div class="drop-bar" style="width:'+wp+'%;background:'+info.color+';">'+(up?'+':'-')+Math.abs(d.pct).toFixed(1)+'%</div></div><div class="drop-amount">'+(up?'+¥':'-¥')+Math.abs(d.diff).toLocaleString()+'</div>';ct.appendChild(row);});
  if(drops.length===0)ct.innerHTML='<p style="color:var(--ts);text-align:center;padding:20px;">暂无价格变动数据</p>';
}

// ===== New-product summary (home) =====
function renderNewSummary(){
  const ct=document.getElementById("newSumBody");if(!ct)return;
  const news=products.filter(p=>p.isNew);
  const byB={};news.forEach(p=>{byB[p.brandName]=(byB[p.brandName]||0)+1;});
  let h='<div class="new-sum-count"><span class="ns-num">'+news.length+'</span> 款近月新品</div><div class="new-sum-brands">';
  Object.keys(byB).forEach(b=>{h+='<span class="ns-brand"><span class="ns-dot"></span>'+b+' '+byB[b]+'</span>';});
  h+='</div><a class="new-sum-link" href="products.html?new=1">查看新品卡片 →</a>';
  ct.innerHTML=h;
}

// ===== Export current filtered table to CSV =====
function exportTable(){
  const rows=getFiltered();
  if(rows.length===0){alert("当前筛选无产品可导出");return;}
  const head=["品牌","产品名称","子品牌","价格档位","屏幕尺寸","处理器","分辨率","首销价","现价","价格变动","定位"];
  let csv="\uFEFF"+head.join(",")+"\n";
  rows.forEach(p=>{
    const diff=(p.launchPrice>0&&p.price>0)?(p.price-p.launchPrice):null;
    const diffTxt=diff===null?"":(diff>0?"+¥"+diff.toLocaleString():"-¥"+(-diff).toLocaleString());
    const tier=tierInfo[p.tier]?tierInfo[p.tier].name:"";
    const cells=[p.brandName,p.name,p.subBrand||"",tier,p.screen||"",p.chip||"",p.resolution||"",p.launchPrice>0?"¥"+p.launchPrice.toLocaleString():"",p.price>0?"¥"+p.price.toLocaleString():"",diffTxt,p.positioning||""];
    csv+=cells.map(c=>{c=String(c);if(c.indexOf(",")>=0)c='"'+c+'"';return c;}).join(",")+"\n";
  });
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download="平板竞品分析_"+new Date().toISOString().slice(0,10)+".csv";document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
}

// ===== Shared filter bar wiring (acts on whatever sections exist on the page) =====
function setupFilterBar(){
  const bar=document.getElementById("filterBar");if(!bar)return;
  bar.addEventListener("click",e=>{const btn=e.target.closest(".filter-btn");if(!btn)return;if(btn.dataset.brand!==undefined){bar.querySelectorAll(".filter-btn[data-brand]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");currentBrandFilter=btn.dataset.brand;}if(btn.dataset.tier!==undefined){bar.querySelectorAll(".filter-btn[data-tier]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");currentTierFilter=btn.dataset.tier;}if(btn.dataset.new!==undefined){bar.querySelectorAll(".filter-btn[data-new]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");currentNewFilter=btn.dataset.new;}if(document.getElementById("productSections"))renderProducts();if(document.getElementById("tableBody"))renderTable();if(document.getElementById("tierOv"))renderTierOv();});
}

// ===== Shared onCompareChange: sync scatter dots + product cards (both pages) =====
onCompareChange=function(){
  document.querySelectorAll(".product-card").forEach(card=>{const idx=parseInt(card.dataset.idx);const on=compareList.includes(idx);card.classList.toggle("selected",on);const cb=card.querySelector(".compare-check input");if(cb)cb.checked=on;});
  if(document.getElementById("tierOv"))renderTierOv();
};


// ===== Quick-select panel (page 2: products.html) =====
function renderQuickSelect(){
  const ct=document.getElementById("qsChips");if(!ct)return;ct.innerHTML="";
  brandOrder.forEach(b=>{
    const info=brandInfo[b];
    const items=products.map((p,i)=>({...p,_idx:i})).filter(p=>p.brand===b);
    if(items.length===0)return;
    const g=document.createElement("div");g.className="qs-group";
    let gh='<div class="qs-g-head"><span class="qs-dot" style="background:'+info.color+'"></span><span class="qs-g-name">'+info.name+'</span><span class="qs-g-cnt">'+items.length+'</span></div>';
    let gh2='<div class="qs-chips">';
    items.forEach(p=>{
      const sel=compareList.includes(p._idx);
      const full=(!sel&&compareList.length>=MAX_COMPARE);
      const short=(p.name.length>15?p.name.substring(0,15)+'…':p.name);
      gh2+='<button class="qs-chip'+(sel?' on':'')+(full?' disabled':'')+'" data-idx="'+p._idx+'" title="'+p.name+'">'+(sel?'✓ ':'')+short+'</button>';
    });
    gh2+='</div>';
    g.innerHTML=gh+gh2;ct.appendChild(g);
  });
  bindQuickChips();updateQSCount();
}
function bindQuickChips(){
  document.querySelectorAll("#qsChips .qs-chip").forEach(ch=>{
    ch.addEventListener("click",()=>{const idx=parseInt(ch.dataset.idx);toggleCompare(idx);});
  });
}
function refreshQuickSelect(){
  document.querySelectorAll("#qsChips .qs-chip").forEach(ch=>{
    const idx=parseInt(ch.dataset.idx);const sel=compareList.includes(idx);
    ch.classList.toggle("on",sel);
    const full=(!sel&&compareList.length>=MAX_COMPARE);
    ch.classList.toggle("disabled",full);
  });
  updateQSCount();
}
function updateQSCount(){
  const c=document.getElementById("qsCount");if(c)c.textContent=compareList.length;
}
function selectCurrentFilter(){
  if(compareList.length>=MAX_COMPARE)return;
  const items=getFiltered();
  items.forEach(p=>{if(compareList.length<MAX_COMPARE&&!compareList.includes(p._idx))compareList.push(p._idx);});
  saveCompare();updateCompareUI();
}
