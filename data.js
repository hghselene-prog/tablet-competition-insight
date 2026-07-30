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

// ===== Product Data (44 products, 3 EOL) =====
// 价格/配置来源：各品牌中国官网在售页(官网价=price) + IT之家/凤凰网/中关村在线/站长之家 首发稿(首销价=launchPrice，来源见 launchSource URL)。
// 诚实口径：price=当前官网在售起售价；launchPrice=真实首销起售价(取自新闻首发稿，见 launchSource)。
// 配置字段：launchConfig=首销价对应 RAM+存储(如 "8+256")；priceConfig=现价对应 RAM+存储(如 "8+256"/"256GB(WiFi)"/"-"=EOL无在售)。所有价格均带配置标注，避免跨配置误比。
// ⚠ 首销价为「起售价/入门版」，与现价(在售起售价)直接相减可能因配置版本不同而不代表真实涨跌：
//    例如 OPPO Pad 6 的「3299首销→3899现」是 8+256首销 vs 12+256现，并非同SKU涨价。
// ⚠ 例外：Apple 2026年国行官网全线官方调价(同SKU真实涨价，2026-07-29核对 apple.com.cn)：
//    iPad Pro 11" 8999→10799 / 13" 11499→13299；Air 11" 4799→5999 / 13" 6499→7699；iPad(A16) 2999→3799；mini 3999→4799。
// 当前价已据官网修正：荣耀平板20 官网现约¥2599起（honor.com ¥2599/参考¥3299起、京东8+256 ¥2499，原¥3499偏高已改）；OPPO Pad SE 官网核实¥1399（原¥1999已改）；Redmi Pad Pro / iQOO Pad5 / vivo Pad3 已EOL，首销价见 launchSource。
const products = [
  // Apple (6) — 国行官方起售价 apple.com.cn；首销价来自 Apple Newsroom / ZOL 首发稿
  {brand:"apple",brandName:"Apple",name:'iPad Pro (M5) 11"',series:"iPad Pro",screen:'11"',chip:"Apple M5",resolution:"2420×1668",price:10799,priceConfig:"256GB(WiFi)",launchPrice:8999,launchConfig:"256GB(WiFi)",launchSource:"https://pad.zol.com.cn/1063/10635602.html||ZOL：M5 iPad Pro 10/22上市起售8999元",priceFrom:true,positioning:"专业旗舰",isNew:true,specs:{battery:"8190mAh",speaker:"四扬声器",os:"iPadOS",pen:"Apple Pencil Pro"}},
  {brand:"apple",brandName:"Apple",name:'iPad Pro (M5) 13"',series:"iPad Pro",screen:'13"',chip:"Apple M5",resolution:"2752×2064",price:13299,priceConfig:"256GB(WiFi)",launchPrice:11499,launchConfig:"256GB(WiFi)",launchSource:"https://apple.com.cn/newsroom/2025/10/apple-introduces-ipad-pro-with-m5||Apple Newsroom：iPad Pro M5 发布",priceFrom:true,positioning:"专业旗舰",isNew:true,specs:{battery:"10200mAh",speaker:"四扬声器",os:"iPadOS",pen:"Apple Pencil Pro"}},
  {brand:"apple",brandName:"Apple",name:'iPad Air (M4) 11"',series:"iPad Air",screen:'11"',chip:"Apple M4",resolution:"2360×1640",price:5999,priceConfig:"128GB(WiFi)",launchPrice:4799,launchConfig:"128GB(WiFi)",launchSource:"https://www.apple.com.cn/cn/newsroom/2026/03/apple-introduces-the-new-ipad-air-powered-by-m4/||Apple Newsroom：新款 iPad Air (M4)",priceFrom:true,positioning:"轻薄生产力",isNew:true,specs:{battery:"约7600mAh",speaker:"双扬声器",os:"iPadOS",pen:"Apple Pencil Pro"}},
  {brand:"apple",brandName:"Apple",name:'iPad Air (M4) 13"',series:"iPad Air",screen:'13"',chip:"Apple M4",resolution:"2732×2048",price:7699,priceConfig:"128GB(WiFi)",launchPrice:6499,launchConfig:"128GB(WiFi)",launchSource:"https://www.apple.com.cn/cn/newsroom/2026/03/apple-introduces-the-new-ipad-air-powered-by-m4/||Apple Newsroom：新款 iPad Air (M4)",priceFrom:true,positioning:"轻薄生产力",isNew:true,specs:{battery:"约9700mAh",speaker:"双扬声器",os:"iPadOS",pen:"Apple Pencil Pro"}},
  {brand:"apple",brandName:"Apple",name:'iPad (A16) 11"',series:"iPad",screen:'11"',chip:"Apple A16",resolution:"2360×1640",price:3799,priceConfig:"128GB(WiFi)",launchPrice:2999,launchConfig:"128GB(WiFi)",launchSource:"https://finance.sina.cn/tech/2025-03-11/detail-inepicec5180036.d.html||新浪/IT之家：iPad (A16) 开售 ¥2999",priceFrom:true,positioning:"入门主力",specs:{battery:"约7600mAh",speaker:"双扬声器",os:"iPadOS",pen:"Apple Pencil (USB-C)"}},
  {brand:"apple",brandName:"Apple",name:"iPad mini (A17 Pro)",series:"iPad mini",screen:'8.3"',chip:"Apple A17 Pro",resolution:"2266×1488",price:4799,priceConfig:"128GB(WiFi)",launchPrice:3999,launchConfig:"128GB(WiFi)",launchSource:"https://www.apple.com.cn/newsroom/2024/10/the-new-ipad-mini-is-available-today/||Apple Newsroom：iPad mini 7 发售 ¥3999 起",priceFrom:true,positioning:"便携小屏",specs:{battery:"约5000mAh",speaker:"双扬声器",os:"iPadOS",pen:"Apple Pencil Pro"}},
  // Huawei (6) — 国行官方 vmall.com；首销价来自 IT之家 / 站长之家 首发稿
  {brand:"huawei",brandName:"华为",name:"MatePad 11.5 2026",series:"MatePad",screen:'11.5"',chip:"麒麟 T82B",resolution:"2456×1600",price:1999,priceConfig:"8+256",launchPrice:1799,launchConfig:"8+128",launchSource:"https://www.ithome.com/0/906/972.htm||IT之家：MatePad 11.5 2026 发布 1799元起",priceFrom:true,positioning:"学习入门",isNew:true,specs:{battery:"10100mAh",speaker:"—",os:"HarmonyOS 6",pen:"M-Pencil"}},
  {brand:"huawei",brandName:"华为",name:"MatePad Edge X90",series:"Edge",screen:'14.2"',chip:"麒麟 X90A",resolution:"3120×2080",price:5799,priceConfig:"16+256",launchPrice:5999,launchConfig:"16+256",launchSource:"https://ku.ithome.com/item/47338/canshu.html||IT之家参数页：MatePad Edge X90 发布价5999",priceFrom:true,positioning:"二合一生产力",isNew:true,specs:{battery:"12900mAh",speaker:"六扬声器",os:"HarmonyOS 6",pen:"M-Pencil Pro"}},
  {brand:"huawei",brandName:"华为",name:'MatePad Pro 12.2"',series:"Pro",screen:'12.2"',chip:"麒麟 9020/9020A",resolution:"2800×1840",price:4499,priceConfig:"12+512",launchPrice:3999,launchConfig:"12+256",launchSource:"https://m.ithome.com/html/870436.htm||IT之家：MatePad Pro 12.2 2025 3999元起",priceFrom:true,positioning:"专业创作",specs:{battery:"10100mAh",speaker:"四扬声器",os:"HarmonyOS 5",pen:"M-Pencil Pro"}},
  {brand:"huawei",brandName:"华为",name:"MatePad Mini",series:"Mini",screen:'8.8"',chip:"麒麟 9010",resolution:"2560×1600",price:3299,priceConfig:"12+256",launchPrice:3299,launchConfig:"12+256",launchSource:"https://m.ithome.com/html/880418.htm||IT之家：MatePad Mini 3299元起",priceFrom:true,positioning:"便携小屏",isNew:true,specs:{battery:"6400mAh",speaker:"双扬声器",os:"HarmonyOS 5",pen:"M-Pencil Pro"}},
  {brand:"huawei",brandName:"华为",name:"MatePad Air 12",series:"Air",screen:'12"',chip:"麒麟 T92A",resolution:"2800×1840",price:3099,priceConfig:"12+256",launchPrice:3099,launchConfig:"12+256",launchSource:"https://ku.ithome.com/item/47012/canshu.html||IT之家参数页：MatePad Air 12 发布价3099",priceFrom:true,positioning:"潮流生产力",specs:{battery:"10100mAh",speaker:"—",os:"HarmonyOS 5",pen:"M-Pencil(第三代)"}},
  {brand:"huawei",brandName:"华为",name:"MatePad 11.5 S 2025",series:"MatePad",screen:'11.5"',chip:"—",resolution:"2800×1840",price:2499,priceConfig:"12+256",launchPrice:2199,launchConfig:"8+256",launchSource:"https://m.chinaz.com/feed/0815/1704215.shtml||站长之家：MatePad 11.5 S 2025 首发2099元起",priceFrom:true,positioning:"学习进阶",specs:{battery:"8800mAh",speaker:"—",os:"HarmonyOS 5",pen:"M-Pencil"}},
  // Honor (5) — 国行官方 honor.com；首销价来自 IT之家 / 荣耀官网 / 快科技
  {brand:"honor",brandName:"荣耀",name:"荣耀平板20",series:"平板",screen:'12.1"',chip:"第三代骁龙7",resolution:"3000×1872",price:2599,priceConfig:"8+256",launchPrice:1899,launchConfig:"6+128",launchSource:"https://www.chinaz.com/tags/rongyaopingban.shtml||快科技/站长之家：荣耀平板20 发布 1899元起",priceFrom:true,positioning:"主流大屏",specs:{battery:"10100mAh",speaker:"—",os:"—",pen:"4096级压感手写笔"}},
  {brand:"honor",brandName:"荣耀",name:'MagicPad 3 Pro 12.3"',series:"MagicPad",screen:'12.3"',chip:"第五代骁龙8至尊版",resolution:"3200×2136",price:4699,priceConfig:"12+256",launchPrice:3999,launchConfig:"8+256",launchSource:"https://tech.sina.cn/2025-10-15/detail-inftyruh1893704.d.html||新浪科技：MagicPad 3 Pro 3999元起(8+256)",priceFrom:true,positioning:"旗舰大屏",isNew:true,specs:{battery:"12450mAh",speaker:"—",os:"MagicOS 10",pen:"Magic Pencil 3"}},
  {brand:"honor",brandName:"荣耀",name:"荣耀平板X10",series:"平板X",screen:'11"',chip:"骁龙680",resolution:"1920×1200",price:1099,priceConfig:"6+128",launchPrice:1299,launchConfig:"16+128",launchSource:"https://honor.com/||荣耀官网：平板X10 1299元起",priceFrom:true,positioning:"千元入门",specs:{battery:"10100mAh",speaker:"—",os:"—",pen:"—"}},
  {brand:"honor",brandName:"荣耀",name:"荣耀平板10 Pro",series:"平板",screen:'11.5"',chip:"天玑8350至尊版",resolution:"2.8K(未单列像素)",price:2699,priceConfig:"12+256",launchPrice:2499,launchConfig:"12+256",launchSource:"https://www.honor.com/cn/news/honor-power2-launch||荣耀官网：平板10 Pro 2499元起",priceFrom:true,positioning:"中端主力",specs:{battery:"10100mAh",speaker:"—",os:"—",pen:"Magic Pencil 4s"}},
  {brand:"honor",brandName:"荣耀",name:"荣耀平板X10 Pro",series:"平板X",screen:'11.5"',chip:"骁龙685",resolution:"2508×1504",price:1699,priceConfig:"8+256",launchPrice:1499,launchConfig:"8+128",launchSource:"https://honor.com/cn/tablets/honor-pad-x10-pro/||荣耀官网：平板X10 Pro 1499元起",priceFrom:true,positioning:"入门进阶",specs:{battery:"8300mAh",speaker:"—",os:"—",pen:"—"}},
  // Xiaomi (8, incl Redmi；Redmi Pad Pro 已下架→EOL) — 国行官方 mi.com；首销价来自 IT之家
  {brand:"xiaomi",brandName:"小米",name:"Xiaomi Pad 8 Pro",series:"Xiaomi Pad",screen:'11.2"',chip:"骁龙8至尊版",resolution:"3200×2136",price:2999,priceConfig:"8+128",launchPrice:2799,launchConfig:"8+128",launchSource:"https://digi.ithome.com/archiver/0/885/838.htm||IT之家：小米平板8/Pro 发布 2799元起",priceFrom:true,positioning:"性能旗舰",isNew:true,isHot:true,subBrand:"Xiaomi",specs:{battery:"9200mAh",speaker:"—",os:"澎湃OS 3",pen:"焦点触控笔 Pro"}},
  {brand:"xiaomi",brandName:"小米",name:"Xiaomi Pad 8",series:"Xiaomi Pad",screen:'11.2"',chip:"第四代骁龙8s",resolution:"3200×2136",price:2799,priceConfig:"8+256",launchPrice:2199,launchConfig:"8+128",launchSource:"https://digi.ithome.com/archiver/0/885/838.htm||IT之家：小米平板8/Pro 发布 2199元起",priceFrom:true,positioning:"中高端",isNew:true,subBrand:"Xiaomi",specs:{battery:"9200mAh",speaker:"—",os:"澎湃OS 3",pen:"焦点触控笔"}},
  {brand:"xiaomi",brandName:"小米",name:"Xiaomi Pad 7 Pro",series:"Xiaomi Pad",screen:'11.2"',chip:"第三代骁龙8s",resolution:"3200×2136",price:2699,priceConfig:"8+128",launchPrice:2499,launchConfig:"8+128",launchSource:"https://www.ithome.com/0/806/236.htm||IT之家：小米平板7系列 1999元起",priceFrom:true,positioning:"中端主力",subBrand:"Xiaomi",specs:{battery:"8850mAh",speaker:"—",os:"澎湃OS 2",pen:"焦点触控笔"}},
  {brand:"xiaomi",brandName:"小米",name:"REDMI K Pad 2",series:"REDMI K",screen:'8.8"',chip:"天玑9500",resolution:"8.8″ 3K",price:3599,priceConfig:"8+256",launchPrice:3399,launchConfig:"8+256",launchSource:"https://www.ithome.com/zt/redmik90max/||IT之家专题：REDMI K Pad 2 3399元起",priceFrom:true,positioning:"性能电竞",isNew:true,isHot:true,subBrand:"Redmi",specs:{battery:"9100mAh",speaker:"—",os:"—",pen:"兼容多种手写笔"}},
  {brand:"xiaomi",brandName:"小米",name:"REDMI Pad 2 Pro",series:"REDMI Pad",screen:'12.1"',chip:"骁龙7s Gen4",resolution:"2560×1600",price:1899,priceConfig:"8+128",launchPrice:1799,launchConfig:"8+128",launchSource:"https://android.ithome.com/archiver/0/917/639.htm||IT之家：REDMI Pad 2 Pro 1799元起",priceFrom:true,positioning:"中端性价比",subBrand:"Redmi",specs:{battery:"12000mAh",speaker:"—",os:"澎湃OS",pen:"REDMI 灵感触控笔"}},
  {brand:"xiaomi",brandName:"小米",name:"REDMI Pad 2",series:"REDMI Pad",screen:'11"',chip:"天玑 G100-Ultra",resolution:"2560×1600",price:999,priceConfig:"6+128",launchPrice:999,launchConfig:"6+128",launchSource:"https://digi.ithome.com/archiver/872/247.htm||IT之家：REDMI Pad 2 999元起",priceFrom:true,positioning:"入门性价比",subBrand:"Redmi",specs:{battery:"9000mAh",speaker:"—",os:"—",pen:"REDMI 灵感触控笔"}},
  {brand:"xiaomi",brandName:"小米",name:"REDMI Pad 2 SE",series:"REDMI Pad",screen:'9.7"',chip:"第二代骁龙6s",resolution:"2048×1280",price:1199,priceConfig:"6+128",launchPrice:1099,launchConfig:"6+128",launchSource:"https://android.ithome.com/archiver/0/941/483.htm||IT之家：REDMI Pad 2 SE 1099元",priceFrom:true,positioning:"极致入门",subBrand:"Redmi",specs:{battery:"7600mAh",speaker:"—",os:"—",pen:"支持手写笔"}},
  {brand:"xiaomi",brandName:"小米",name:"Redmi Pad Pro",series:"REDMI Pad",screen:'12.1"',chip:"骁龙7s Gen2",resolution:"2560×1600",price:0,priceConfig:"-",launchPrice:1499,launchConfig:"6+128",launchSource:"https://www.ithome.com/0/761/800.htm||IT之家：Redmi Pad Pro 开售 1499元起",priceFrom:false,positioning:"大屏性价比(EOL)",subBrand:"Redmi",isEOL:true,specs:{battery:"10000mAh",speaker:"—",os:"—",pen:"Redmi 灵感触控笔"}},
  // OPPO (7) — 国行官方 oppo.com；首销价来自 IT之家 首发/首销稿
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad 6",series:"Pad",screen:'12.1"',chip:"天玑9500s",resolution:"3000×2120",price:3899,priceConfig:"12+256",launchPrice:3299,launchConfig:"8+256",launchSource:"https://m.ithome.com/html/956957.htm||IT之家：OPPO Pad 6 首销 3299元起",priceFrom:true,positioning:"最新旗舰",isNew:true,isHot:true,specs:{battery:"10420mAh",speaker:"六扬声器",os:"ColorOS 16",pen:"OPPO Pencil 2"}},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad Mini",series:"Pad Mini",screen:'8.8"',chip:"第五代骁龙8",resolution:"8.8″ 2.5K OLED",price:3699,priceConfig:"8+256",launchPrice:3699,launchConfig:"8+256",launchSource:"https://m.ithome.com/html/945256.htm||IT之家：OPPO Pad Mini 首销 3699元起",priceFrom:true,positioning:"小屏便携",isNew:true,specs:{battery:"8000mAh",speaker:"—",os:"—",pen:"OPPO AI 手写笔"}},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad 5 Pro",series:"Pad Pro",screen:'13.2"',chip:"第五代骁龙8至尊版",resolution:"13.2″ 3.4K (3392×2400)",price:4499,priceConfig:"12+256",launchPrice:4299,launchConfig:"8+256",launchSource:"https://m.ithome.com/html/941818.htm||IT之家：OPPO Pad 5 Pro 4299元起",priceFrom:true,positioning:"大屏旗舰",specs:{battery:"13380mAh",speaker:"—",os:"ColorOS 16",pen:"OPPO Pencil 3 Pro"}},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad 5",series:"Pad",screen:'12.1"',chip:"天玑9400+",resolution:"3000×2120",price:3299,priceConfig:"12+256",launchPrice:2599,launchConfig:"8+128",launchSource:"https://www.ithome.com/0/890/56.htm||IT之家：OPPO Pad 5 2599元起",priceFrom:true,positioning:"中高端",specs:{battery:"10420mAh",speaker:"—",os:"—",pen:"OPPO Pencil 2"}},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad Air5",series:"Pad Air",screen:'12.1"',chip:"天玑7300 Ultra",resolution:"2800×1980",price:2499,priceConfig:"12+256",launchPrice:1899,launchConfig:"8+128",launchSource:"https://digi.ithome.com/archiver/0/909/417.htm||IT之家：OPPO Pad Air5 首销 1899元起",priceFrom:true,positioning:"轻薄中端",specs:{battery:"10050mAh",speaker:"—",os:"—",pen:"支持(首销赠笔)"}},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad 4 Pro",series:"Pad Pro",screen:'13.2"',chip:"骁龙8至尊版",resolution:"13.2″ 3.4K (3392×2400)",price:3999,priceConfig:"12+256",launchPrice:3299,launchConfig:"8+256",launchSource:"https://m.ithome.com/mip/html/845595.htm||IT之家：OPPO Pad 4 Pro 开售 3299元起",priceFrom:true,positioning:"上一代旗舰",specs:{battery:"12140mAh",speaker:"—",os:"—",pen:"OPPO Pencil 2 Pro"}},
  {brand:"oppo",brandName:"OPPO",name:"OPPO Pad SE",series:"Pad SE",screen:'11"',chip:"Helio G100",resolution:"1920×1200",price:1399,priceConfig:"8+256柔光",launchPrice:849,launchConfig:"6+128",launchSource:"https://android.ithome.com/archiver/855/354.htm||IT之家：OPPO Pad SE 开售 849元起",priceFrom:true,positioning:"入门学习",specs:{battery:"9340mAh",speaker:"—",os:"—",pen:"—"}},
  // vivo (12) — 国行官方 vivo.com.cn；首销价来自 IT之家 / 凤凰网 / vivo 官网参数页
  {brand:"vivo",brandName:"vivo",name:"vivo Pad6 Pro",series:"vivo Pad",screen:'13.2"',chip:"第五代骁龙8至尊版",resolution:"13.2″ 4K (3840×2160)",price:4999,priceConfig:"12+256",launchPrice:4299,launchConfig:"8+256",launchSource:"https://www.toutiao.com/article/7623028433135714850/||IT之家/头条：vivo Pad6 Pro 发布 4299元起",priceFrom:true,positioning:"最新旗舰",isNew:true,isHot:true,subBrand:"vivo",specs:{battery:"13000mAh",speaker:"—",os:"OriginOS 6",pen:"vivo Pencil 3"}},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad6 Pro",series:"iQOO Pad",screen:'13.2"',chip:"第五代骁龙8至尊版",resolution:"13.2″ 4K (3840×2160)",price:4499,priceConfig:"12+256",launchPrice:4299,launchConfig:"8+256",launchSource:"https://tech.ifeng.com/c/8tHrdnq3B3A||凤凰网：iQOO Pad6 Pro 发布 4299元起",priceFrom:true,positioning:"电竞性能旗舰",isNew:true,isHot:true,subBrand:"iQOO",specs:{battery:"13000mAh",speaker:"八扬声器",os:"OriginOS 6",pen:"iQOO Pencil 3"}},
  {brand:"vivo",brandName:"vivo",name:"vivo Pad5 Pro",series:"vivo Pad",screen:'13"',chip:"蓝晶×天玑9400",resolution:"13″ 3.1K (3096×2064)",price:3999,priceConfig:"16+512",launchPrice:2999,launchConfig:"8+128",launchSource:"https://m.vivo.com.cn/vivo/param/vivopad5pro||vivo官网参数页：Pad5 Pro 上市价2999起",priceFrom:true,positioning:"高端",subBrand:"vivo",specs:{battery:"12050mAh",speaker:"—",os:"—",pen:"vivo Pencil 3"}},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad5 Pro",series:"iQOO Pad",screen:'13"',chip:"蓝晶×天玑9400+",resolution:"13″ 3.1K (3096×2064)",price:3699,priceConfig:"12+256",launchPrice:3199,launchConfig:"8+256",launchSource:"https://m.vivo.com.cn/vivo/param/iqoopad5pro||vivo官网参数页：iQOO Pad5 Pro 上市价3199起",priceFrom:true,positioning:"性能高端",subBrand:"iQOO",specs:{battery:"12050mAh",speaker:"—",os:"—",pen:"iQOO Pencil 3"}},
  {brand:"vivo",brandName:"vivo",name:"vivo Pad5",series:"vivo Pad",screen:'12.1"',chip:"蓝晶×天玑9300+",resolution:"12.1″ 2.8K (2800×1968)",price:3299,priceConfig:"12+256",launchPrice:2399,launchConfig:"8+128",launchSource:"https://www.toutiao.com/article/7509842039589143049/||IT之家/头条：vivo Pad5 首发2399元起",priceFrom:true,positioning:"中高端",isNew:true,subBrand:"vivo",specs:{battery:"10000mAh",speaker:"—",os:"—",pen:"vivo Pencil 3"}},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad5",series:"iQOO Pad",screen:'12.1"',chip:"天玑9300+",resolution:"12.1″ 2.8K (2800×1968)",price:0,priceConfig:"-",launchPrice:2499,launchConfig:"8+128",launchSource:"https://m.vivo.com.cn/vivo/param/iqoopad5||vivo官网参数页：iQOO Pad5 上市价2499起",priceFrom:false,positioning:"中高端(EOL)",subBrand:"iQOO",isEOL:true,specs:{battery:"10000mAh",speaker:"—",os:"—",pen:"iQOO Pencil 3"}},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad5e",series:"iQOO Pad",screen:'12.05"',chip:"第三代骁龙8s",resolution:"12.05″ 2.8K (2800×1968)",price:2999,priceConfig:"16+512",launchPrice:1999,launchConfig:"8+128",launchSource:"https://m.cnmo.com/news/798421.html||CNMO：iQOO Pad 5e 1999元起",priceFrom:true,positioning:"中端",isNew:true,subBrand:"iQOO",specs:{battery:"10000mAh",speaker:"—",os:"—",pen:"—"}},
  {brand:"vivo",brandName:"vivo",name:"vivo Pad5e",series:"vivo Pad",screen:'12.1"',chip:"第三代骁龙8s",resolution:"12.1″ 2.8K (2800×1968)",price:2499,priceConfig:"柔光版8+256",launchPrice:1999,launchConfig:"8+128",launchSource:"https://new.qq.com/rain/a/20251015A014D800||腾讯/站长：vivo Pad5e 发布1999元起",priceFrom:true,positioning:"学娱中端",isNew:true,subBrand:"vivo",specs:{battery:"10000mAh",speaker:"—",os:"—",pen:"—"}},
  {brand:"vivo",brandName:"vivo",name:"vivo Pad SE",series:"vivo Pad",screen:'12.3"',chip:"骁龙4 Gen2",resolution:"12.3″ 2.5K (2464×1600)",price:1999,priceConfig:"8+256",launchPrice:999,launchConfig:"6+128",launchSource:"https://m.vivo.com.cn/vivo/param/vivopadse||vivo官网参数页：Pad SE 上市价999起",priceFrom:true,positioning:"入门护眼",isNew:true,subBrand:"vivo",specs:{battery:"8500mAh",speaker:"—",os:"—",pen:"—"}},
  {brand:"vivo",brandName:"vivo",name:"vivo Pad3",series:"vivo Pad",screen:'12.1"',chip:"第三代骁龙8s",resolution:"12.1″ 2.8K (2800×1968)",price:0,priceConfig:"-",launchPrice:2499,launchConfig:"8+128",launchSource:"https://m.vivo.com.cn/vivo/param/vivopad3||vivo官网参数页：Pad3 上市价2499起",priceFrom:false,positioning:"中端(EOL)",subBrand:"vivo",isEOL:true,specs:{battery:"10000mAh",speaker:"—",os:"—",pen:"—"}},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad2 Pro",series:"iQOO Pad",screen:'13"',chip:"天玑9300+",resolution:"13″ 3.1K (3096×2064)",price:2999,priceConfig:"8+256",launchPrice:3399,launchConfig:"8+256",launchSource:"https://m.vivo.com.cn/vivo/param/iqoopad2pro||vivo官网参数页：iQOO Pad2 Pro 上市价3399起",priceFrom:true,positioning:"中端性能",subBrand:"iQOO",specs:{battery:"11500mAh",speaker:"—",os:"—",pen:"iQOO Pencil2s"}},
  {brand:"vivo",brandName:"vivo",name:"iQOO Pad2",series:"iQOO Pad",screen:'12.1"',chip:"第三代骁龙8s",resolution:"12.1″ 2.8K (2800×1968)",price:2499,priceConfig:"8+128",launchPrice:2499,launchConfig:"8+128",launchSource:"https://kafan.cn/news/22674.html||卡饭网：iQOO Pad2 系列开售2499元起",priceFrom:true,positioning:"中端",subBrand:"iQOO",specs:{battery:"10000mAh",speaker:"—",os:"—",pen:"iQOO Pencil Air"}},
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
  const rows=[{l:"官网现价",k:"price",t:"price",h:"low"},{l:"首销价",k:"launchPrice",t:"pp"},{l:"首销→官网现价",k:"ppr",t:"ppr"},{l:"价格档位",k:"tier",t:"tier"},{l:"屏幕",k:"screen",t:"text",h:"high"},{l:"处理器",k:"chip",t:"text"},{l:"分辨率",k:"resolution",t:"text"},{l:"电池",k:"battery",t:"bat",h:"high"},{l:"扬声器",k:"speaker",t:"spk",h:"high"},{l:"系统",k:"os",t:"text"},{l:"手写笔",k:"pen",t:"text"},{l:"定位",k:"positioning",t:"text"}];
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
      if(row.t==="price")val=p.price>0?`<span class="pv">¥${p.price.toLocaleString()}${p.priceFrom?" 起":""}${p.priceConfig?` <span class="cfg-tag">${p.priceConfig}</span>`:""}</span>`:'<span class="di">缺货</span>';
      else if(row.t==="pp")val=p.launchPrice>0?`¥${p.launchPrice.toLocaleString()}${p.launchConfig?` <span class="cfg-tag">${p.launchConfig}</span>`:""}`:'<span class="di">—</span>';
      else if(row.t==="drop"){if(p.launchPrice>0&&p.price>0&&p.launchPrice>p.price){const d=p.launchPrice-p.price,pc=((d/p.launchPrice)*100).toFixed(1);val=`<span class="dv">-¥${d.toLocaleString()}<br>(${pc}%)</span>`;}else if(p.price<=0)val='<span class="di">EOL</span>';else val='<span class="di">持平</span>';}
      else if(row.t==="ppr"){if(p.launchPrice>0&&p.price>0){val=`<span class="di">¥${p.launchPrice.toLocaleString()}${p.launchConfig?` <span class="cfg-tag">${p.launchConfig}</span>`:""}起 → ¥${p.price.toLocaleString()}${p.priceConfig?` <span class="cfg-tag">${p.priceConfig}</span>`:""}起</span>`;}else if(p.price<=0&&p.launchPrice>0){val='<span class="di">首销¥'+p.launchPrice.toLocaleString()+(p.launchConfig?` <span class="cfg-tag">${p.launchConfig}</span>`:'')+'起 · EOL</span>';}else{val='<span class="di">—</span>';}}
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
  // 首销价/现价均取「起售价/入门版」，跨配置相减不代表真实涨跌，故不再显示单点「调价」 Pill；
  // 真实首销→官网现价对照与来源链接见卡片「首销价 ¥X 起（来源↗）」与对比表「首销→官网现价」列。
  return "";
}

// ===== Shared filter state =====
let currentBrandFilter="all", currentTierFilter="all", currentNewFilter="all", dropBrand="all";
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
  const pt=p.price>0?'<span class="unit">¥</span>'+p.price.toLocaleString()+(p.priceConfig?' <span class="cfg-tag">'+p.priceConfig+'</span>':'')+(p.priceFrom?' <span class="unit">起</span>':'') :'<span class="unit">暂无报价</span>';
  const badge=p.isEOL?'<span class="badge-eol">EOL</span>':p.isNew?'<span class="badge-new">新品</span>':p.isHot?'<span class="badge-hot">热销</span>':'';
  const st=p.subBrand?'<span class="sub-brand-tag">'+p.subBrand+'</span>':'';
  let pc='';
  const _ls=p.launchSource?p.launchSource.split("||")[0]:"";const _lc=p.launchConfig?'('+p.launchConfig+')':'';const _pc=p.priceConfig?'('+p.priceConfig+')':'';
  if(p.launchPrice&&p.launchPrice>0&&p.price>0){pc='<div class="price-compare"><span class="price-launch">首销价 ¥'+p.launchPrice.toLocaleString()+' '+_lc+' 起</span>'+(p.launchSource?'<a class="src-link" href="'+_ls+'" target="_blank" rel="noopener">（来源↗）</a>':'')+'<span class="price-sep">｜</span><span class="price-diff same">官网现价 ¥'+p.price.toLocaleString()+' '+_pc+' 起</span></div>';}else if(p.price<=0&&p.launchPrice>0){pc='<div class="price-compare"><span class="price-launch">首销价 ¥'+p.launchPrice.toLocaleString()+' '+_lc+' 起</span>'+(p.launchSource?'<a class="src-link" href="'+_ls+'" target="_blank" rel="noopener">（来源↗）</a>':'')+'<span class="price-diff na">已停产/EOL</span></div>';}
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
    const pt=p.price>0?'¥'+p.price.toLocaleString()+(p.priceConfig?' <span class="cfg-tag">'+p.priceConfig+'</span>':'')+(p.priceFrom?'<span class="from"> 起</span>':'') :'<span class="from">EOL/缺货</span>';
    const _ls=p.launchSource?p.launchSource.split("||")[0]:"";
    const lt=p.launchPrice>0?('¥'+p.launchPrice.toLocaleString()+(p.launchConfig?' <span class="cfg-tag">'+p.launchConfig+'</span>':'')+' 起'+(p.launchSource?' <a class="src-link" href="'+_ls+'" target="_blank" rel="noopener">来源↗</a>':'')):'—';
    let dt='—';if(p.launchPrice>0&&p.price>0){dt='<span class="launch-cell">首销价 ¥'+p.launchPrice.toLocaleString()+(p.launchConfig?' <span class="cfg-tag">'+p.launchConfig+'</span>':'')+' 起</span> → <span class="price-cell-sm">官网现价 ¥'+p.price.toLocaleString()+(p.priceConfig?' <span class="cfg-tag">'+p.priceConfig+'</span>':'')+' 起</span>';}else if(p.launchPrice>0&&p.price<=0){dt='<span class="launch-cell">首销价 ¥'+p.launchPrice.toLocaleString()+(p.launchConfig?' <span class="cfg-tag">'+p.launchConfig+'</span>':'')+' 起</span> <span class="from">官网已下架/EOL</span>';}
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
// 价格变动数据集（首销价≠官网现价，受 dropBrand 品牌筛选），渲染与导出共用
function getDrops(){
  const tierW={entry:0,mid:1,midhigh:2,flagship:3,ultra:4};
  const tierName={entry:"入门",mid:"中端",midhigh:"中高",flagship:"高端",ultra:"旗舰"};
  return products.filter(p=>p.launchPrice>0&&p.price>0&&p.launchPrice!==p.price&&(dropBrand==="all"||p.brand===dropBrand)).map(p=>{
    let srcT="",srcU="";
    if(p.launchSource){const idx=p.launchSource.indexOf("||");if(idx>=0){srcU=p.launchSource.slice(0,idx);srcT=p.launchSource.slice(idx+2);}else{srcU=p.launchSource;}}
    return {name:p.name,brand:p.brand,brandName:p.brandName,price:p.price,launchPrice:p.launchPrice,diff:p.price-p.launchPrice,pct:((p.price-p.launchPrice)/p.launchPrice)*100,tier:getTier(p.price),tierName:tierName[getTier(p.price)],lc:p.launchConfig,pc:p.priceConfig,srcT,srcU};
  }).sort((a,b)=>(tierW[b.tier]-tierW[a.tier])||(b.price-a.price)||(Math.abs(b.diff)-Math.abs(a.diff)));
}
function renderDropChart(){
  const ct=document.getElementById("dropChart");if(!ct)return;
  // ---- 品牌选择按钮 ----
  const bar=document.getElementById("dropBrandBar");
  if(bar){
    let bh='<span class="dbb-label">按品牌：</span>';
    const list=[{k:"all",n:"全部"}].concat(brandOrder.map(b=>({k:b,n:brandInfo[b].name})));
    list.forEach(b=>{
      const dot=b.k==="all"?"":'<span class="dbb-dot" style="background:'+brandInfo[b.k].color+'"></span>';
      bh+='<button class="dbb-btn'+(dropBrand===b.k?' active':'')+'" data-brand="'+b.k+'">'+dot+b.n+'</button>';
    });
    bar.innerHTML=bh;
    bar.querySelectorAll(".dbb-btn").forEach(btn=>{
      btn.addEventListener("click",()=>{ dropBrand=btn.dataset.brand; renderDropChart(); });
    });
  }
  // ---- 图表主体（按品牌筛选）----
  ct.innerHTML="";
  const tierW={entry:0,mid:1,midhigh:2,flagship:3,ultra:4};
  const tierName={entry:"入门",mid:"中端",midhigh:"中高",flagship:"高端",ultra:"旗舰"};
  const drops=getDrops();
  const md=drops.length>0?Math.max(...drops.map(d=>Math.abs(d.diff))):1;
  drops.forEach((d,i)=>{const up=d.diff>0,wp=(Math.abs(d.diff)/md)*100,info=brandInfo[d.brand];const mt='<span class="month-pill '+(up?'up':'down')+'" style="margin-left:6px;">调价 '+(up?'↑+':'↓-')+'¥'+Math.abs(d.diff).toLocaleString()+'</span>';const row=document.createElement("div");row.className="drop-item";row.innerHTML='<div class="drop-rank">'+(i+1)+'</div><div class="drop-name"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+info.color+';margin-right:4px;"></span>'+d.name+(d.lc||d.pc?`<span class="cfg-tag">${d.lc?('首销价 '+d.lc):''}${d.lc&&d.pc?' · ':''}${d.pc?('官网现 '+d.pc):''}</span>`:'')+'<span class="tier-tag t-'+d.tier+'">'+tierName[d.tier]+'</span>'+mt+'</div><div class="drop-bar-container"><div class="drop-bar" style="width:'+wp+'%;background:'+info.color+';">'+(up?'+':'-')+Math.abs(d.pct).toFixed(1)+'%</div></div><div class="drop-amount">'+(up?'+¥':'-¥')+Math.abs(d.diff).toLocaleString()+'</div>';ct.appendChild(row);});
  if(drops.length===0)ct.innerHTML='<p style="color:var(--ts);text-align:center;padding:20px;">该品牌暂无首销→现价格变动数据</p>';
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
  const head=["品牌","产品名称","子品牌","价格档位","屏幕尺寸","处理器","分辨率","首销价","官网现价","价格变动","定位"];
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

// ===== Export current price-change (首销→现) view to CSV =====
function exportDrop(){
  const drops=getDrops();
  if(drops.length===0){alert("当前品牌暂无价格变动数据可导出");return;}
  const label=dropBrand==="all"?"全部品牌":(brandInfo[dropBrand]?brandInfo[dropBrand].name:dropBrand);
  const head=["排名","品牌","产品名称","价格档位","首销价","首销配置","官网现价","官网配置","变动金额","变动幅度","调价方向","首销来源"];
  let csv="\uFEFF"+head.join(",")+"\n";
  drops.forEach((d,i)=>{
    const up=d.diff>0;
    const cells=[i+1,d.brandName,d.name,d.tierName,
      d.launchPrice>0?"¥"+d.launchPrice.toLocaleString():"",d.lc||"",
      d.price>0?"¥"+d.price.toLocaleString():"",d.pc||"",
      (up?"+¥":"-¥")+Math.abs(d.diff).toLocaleString(),(up?"+":"-")+Math.abs(d.pct).toFixed(1)+"%",
      up?"涨价":"降价",d.srcT||""];
    csv+=cells.map(c=>{c=String(c);if(c.indexOf(",")>=0||c.indexOf('"')>=0)c='"'+c.replace(/"/g,'""')+'"';return c;}).join(",")+"\n";
  });
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download="平板价格变动_"+label+"_"+new Date().toISOString().slice(0,10)+".csv";document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
}

// ===== Shared filter bar wiring (acts on whatever sections exist on the page) =====
function setupFilterBar(){
  const bar=document.getElementById("filterBar");if(!bar)return;
  bar.addEventListener("click",e=>{const btn=e.target.closest(".filter-btn");if(!btn)return;if(btn.dataset.brand!==undefined){bar.querySelectorAll(".filter-btn[data-brand]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");currentBrandFilter=btn.dataset.brand;}if(btn.dataset.tier!==undefined){document.querySelectorAll(".filter-btn[data-tier]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");currentTierFilter=btn.dataset.tier;}if(btn.dataset.new!==undefined){bar.querySelectorAll(".filter-btn[data-new]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");currentNewFilter=btn.dataset.new;}if(document.getElementById("productSections"))renderProducts();if(document.getElementById("tableBody"))renderTable();  if(document.getElementById("tierOv"))renderTierOv();});
}

function renderTableTierBar(){
  const bar=document.getElementById("tableTierBar");if(!bar)return;
  let h='<span class="filter-label">价格档位</span>';
  const opts=[{k:"all",n:"全部"}].concat(tierOrder.map(t=>({k:t,n:tierInfo[t].name})));
  opts.forEach(o=>{ h+='<button class="filter-btn'+(currentTierFilter===o.k?' active':'')+'" data-tier="'+o.k+'">'+o.n+'</button>'; });
  bar.innerHTML=h;
  bar.addEventListener("click",e=>{
    const btn=e.target.closest(".filter-btn");if(!btn||btn.dataset.tier===undefined)return;
    currentTierFilter=btn.dataset.tier;
    document.querySelectorAll(".filter-btn[data-tier]").forEach(b=>b.classList.toggle("active",b.dataset.tier===currentTierFilter));
    if(document.getElementById("tableBody"))renderTable();
    if(document.getElementById("tierOv"))renderTierOv();
    if(document.getElementById("productSections"))renderProducts();
  });
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
