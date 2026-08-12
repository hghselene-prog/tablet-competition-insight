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

const CONSUMER_VOICE = {
  "updated": "2026-08-12",
  "note": "消费者声音：汇总各品牌平板在 B站 的 KOL 评测/开箱视频（按型号关键词检索）。按品牌→产品组织；每条为视频链接。report 字段预留给后续「消费者声音报告」。数据更新：2026-08-12。",
  "brands": {
    "huawei": {
      "products": [
        {
          "name": "MatePad Pro Max",
          "voices": [
            {
              "type": "video",
              "title": "华为最薄平板！MatePad Pro Max 究竟是怎么做到的？",
              "author": "胜利文绉绉",
              "play": 1280305,
              "date": "2026-06-01",
              "url": "https://www.bilibili.com/video/BV1VAVf6WEg8",
              "compare": false
            },
            {
              "type": "video",
              "title": "掀桌子的一代｜华为MatePad Pro Max",
              "author": "林捂捂",
              "play": 718429,
              "date": "2026-06-01",
              "url": "https://www.bilibili.com/video/BV1xnVQ6oEN2",
              "compare": false
            },
            {
              "type": "video",
              "title": "怎么能这么薄？！—华为MatePad Pro Max 解析",
              "author": "搞机所",
              "play": 636813,
              "date": "2026-06-01",
              "url": "https://www.bilibili.com/video/BV1xxV96wEaF",
              "compare": false
            },
            {
              "type": "video",
              "title": "华为把电脑塞进了平板里？深度体验MatePad Pro Max",
              "author": "科技宅小明",
              "play": 537930,
              "date": "2026-06-01",
              "url": "https://www.bilibili.com/video/BV1GpVU6fEgH",
              "compare": false
            },
            {
              "type": "video",
              "title": "华为matepad pro max，这次还能领先吗",
              "author": "科技禁锢",
              "play": 213719,
              "date": "2026-08-06",
              "url": "https://www.bilibili.com/video/BV16UuH6pETj",
              "compare": false
            },
            {
              "type": "video",
              "title": "华为MatePad Pro Max价格公布弹幕炸裂！真香！",
              "author": "红米K100新品发布",
              "play": 181174,
              "date": "2026-06-01",
              "url": "https://www.bilibili.com/video/BV1J2VZ6PEWZ",
              "compare": false
            },
            {
              "type": "video",
              "title": "值不值？华为MatePad Pro Max超细体验，对比Pro13.2：120W快充+麒麟T93Pro+电脑桌面+超窄边框+星跃键盘",
              "author": "别龙马吃牛内面",
              "play": 110109,
              "date": "2026-06-01",
              "url": "https://www.bilibili.com/video/BV1Db5F6WE6g",
              "compare": true
            },
            {
              "type": "video",
              "title": "华为 MatePad Pro Max 拆机",
              "author": "YCS杨长顺",
              "play": 101167,
              "date": "2026-06-03",
              "url": "https://www.bilibili.com/video/BV1umVm6XEaW",
              "compare": false
            }
          ]
        },
        {
          "name": "MatePad Pro 2026",
          "voices": [
            {
              "type": "video",
              "title": "【大屏生产力平板推荐】2026华为MatePad Pro Max轻办公实测，能不能替代电脑？",
              "author": "电子蛋野菌",
              "play": 122949,
              "date": "2026-06-11",
              "url": "https://www.bilibili.com/video/BV1swEB6cEfR",
              "compare": false
            },
            {
              "type": "video",
              "title": "值不值？华为MatePad Pro12 2026超细体验，小的Pro Max~麒麟T93+电脑桌面",
              "author": "别龙马吃牛内面",
              "play": 63017,
              "date": "2026-08-05",
              "url": "https://www.bilibili.com/video/BV1UxM16aE9b",
              "compare": false
            },
            {
              "type": "video",
              "title": "华为续航最长平板 MatePad Pro 2026 发布：麒麟 T93 芯片，5999 元起",
              "author": "゙数码情报站",
              "play": 19760,
              "date": "2026-08-05",
              "url": "https://www.bilibili.com/video/BV13eMk6bEC4",
              "compare": false
            },
            {
              "type": "video",
              "title": "2026下半年华为即将发布的3款新平板！配置预测和外观变化。",
              "author": "是阿羽同学呀",
              "play": 19719,
              "date": "2026-07-05",
              "url": "https://www.bilibili.com/video/BV1FuTC6rEVb",
              "compare": false
            },
            {
              "type": "video",
              "title": "华为 MatePad Pro 2026 旗舰平板官宣 8 月 5 日亮相",
              "author": "゙数码情报站",
              "play": 11498,
              "date": "2026-07-30",
              "url": "https://www.bilibili.com/video/BV1aC3W6nE19",
              "compare": false
            },
            {
              "type": "video",
              "title": "「参数分解」华为MatePad Pro 12英寸，标准和悦享版的差别。",
              "author": "阳光使者2025",
              "play": 6128,
              "date": "2026-08-07",
              "url": "https://www.bilibili.com/video/BV1Qvut6sEpg",
              "compare": false
            },
            {
              "type": "video",
              "title": "2026华为MatePadPro开箱！这可能是学生党最需要的鸿蒙生产力神器",
              "author": "科技家电魅力未来",
              "play": 4236,
              "date": "2026-02-25",
              "url": "https://www.bilibili.com/video/BV1YRfyB8Ett",
              "compare": false
            },
            {
              "type": "video",
              "title": "【平板电脑测评】2026年618全价位平板选购指南｜苹果华为小米联想避坑必看、学生党网课追剧平替、柔光屏护眼大容量续航全解析",
              "author": "委屈丫丫",
              "play": 1841,
              "date": "2026-06-06",
              "url": "https://www.bilibili.com/video/BV1uK7S6PEgo",
              "compare": false
            }
          ]
        },
        {
          "name": "MatePad Edge",
          "voices": [
            {
              "type": "video",
              "title": "华为首款鸿蒙二合一平板电脑发布！沉浸式上手体验来了！ 杭州",
              "author": "dpitns02451",
              "play": 821649,
              "date": "2026-07-21",
              "url": "https://www.bilibili.com/video/BV1wCKx6hEYx",
              "compare": false
            },
            {
              "type": "video",
              "title": "这台华为鸿蒙二合一，能不能成为你的下一台电脑？",
              "author": "笔吧评测室",
              "play": 645786,
              "date": "2025-12-10",
              "url": "https://www.bilibili.com/video/BV1g5m4ByE2B",
              "compare": false
            },
            {
              "type": "video",
              "title": "人类为了一台真的二合一平板电脑，到底走了多少弯路？【差评君】",
              "author": "差评君",
              "play": 505017,
              "date": "2025-12-10",
              "url": "https://www.bilibili.com/video/BV1mwmtBrEvE",
              "compare": false
            },
            {
              "type": "video",
              "title": "华为MatePad Edge鸿蒙二合一全网最细真机开箱！！电脑&amp;平板两种模式竟可以来回切换？？",
              "author": "李大锤同学",
              "play": 438166,
              "date": "2025-11-19",
              "url": "https://www.bilibili.com/video/BV1BxynBwEeN",
              "compare": false
            },
            {
              "type": "video",
              "title": "【大家测】5999元起 “买一得二”华为MatePad Edge 开箱体验 | 鸿蒙二合一平板电脑 多种形态 超强散热",
              "author": "大家测",
              "play": 232121,
              "date": "2025-11-27",
              "url": "https://www.bilibili.com/video/BV1HRSMBHE1S",
              "compare": false
            },
            {
              "type": "video",
              "title": "夯！华为MatePad Edge万字超细体验，对比鸿蒙电脑+MatePad Pro13.2平板有哪些不同？麒麟X90怎么样？还有电脑微信？",
              "author": "别龙马吃牛内面",
              "play": 180328,
              "date": "2025-11-25",
              "url": "https://www.bilibili.com/video/BV1KZUQBLE9m",
              "compare": true
            },
            {
              "type": "video",
              "title": "华为MatePad Edge 超详细深度体验！华为如何重新定义二合一平板电脑？！",
              "author": "李大锤同学",
              "play": 113494,
              "date": "2025-11-25",
              "url": "https://www.bilibili.com/video/BV14uUmBaEqs",
              "compare": false
            },
            {
              "type": "video",
              "title": "用了7天华为MatePad Edge，我差点信了…",
              "author": "源机话",
              "play": 101769,
              "date": "2025-12-04",
              "url": "https://www.bilibili.com/video/BV14r2hBUEuT",
              "compare": false
            }
          ]
        },
        {
          "name": "MatePad 11.5 S 2026",
          "voices": [
            {
              "type": "video",
              "title": "买前必看！华为MatePad 11.5 2026柔光版选购指南，和MatePad 11.5S灵动版对比怎么选？麒麟8020/T82/T82B有什么区别？",
              "author": "别龙马吃牛内面",
              "play": 129897,
              "date": "2026-02-08",
              "url": "https://www.bilibili.com/video/BV1iMcwzUEpt",
              "compare": true
            },
            {
              "type": "video",
              "title": "荣耀平板20&amp;华为 MatePad 11.5s｜2026年两款超火学习平板怎么选",
              "author": "福瑞科技",
              "play": 92407,
              "date": "2026-06-02",
              "url": "https://www.bilibili.com/video/BV1XqVo6nEHp",
              "compare": true
            },
            {
              "type": "video",
              "title": "华为入门款平板怎么选？华为matepad Air 12 2025、11.5 S  2025、11.5 2026、11.5 S 2024该怎么选",
              "author": "奉仙数码",
              "play": 671,
              "date": "2026-04-26",
              "url": "https://www.bilibili.com/video/BV1AZodB3E4W",
              "compare": true
            },
            {
              "type": "video",
              "title": "2026暑假适合入手的华为平板：华为MatePad 11.5 2026、华为MatePad 11.5 S 灵动款 2025",
              "author": "奉仙数码",
              "play": 483,
              "date": "2026-07-09",
              "url": "https://www.bilibili.com/video/BV11JME6DExc",
              "compare": false
            },
            {
              "type": "video",
              "title": "华为matepad 11.5s2026款首发攻略来啦！首发直接叠加国补，教育优惠，双旦活动，跟着学姐",
              "author": "托洛夫斯基徐",
              "play": 121,
              "date": "2026-08-11",
              "url": "https://www.bilibili.com/video/BV1M5ue6PEVF",
              "compare": false
            }
          ]
        },
        {
          "name": "MatePad 11.5 2026",
          "voices": [
            {
              "type": "video",
              "title": "孩子们 我不是板皇",
              "author": "弎秋缒",
              "play": 14577,
              "date": "2026-07-29",
              "url": "https://www.bilibili.com/video/BV1TN3k6FEPD",
              "compare": false
            },
            {
              "type": "video",
              "title": "华为MatePad 11.5 2026鸿蒙7.0更新，超多实用新功能",
              "author": "玩机小课堂",
              "play": 2235,
              "date": "2026-07-29",
              "url": "https://www.bilibili.com/video/BV1tb316gEZ6",
              "compare": false
            },
            {
              "type": "video",
              "title": "2026款华为MatePad11.5！对比2024升级什么？ 华为MatePad11.5 .....",
              "author": "ottnrw55909",
              "play": 569,
              "date": "2026-07-27",
              "url": "https://www.bilibili.com/video/BV11v3w6jEzP",
              "compare": true
            },
            {
              "type": "video",
              "title": "2026款华为MatePad11.5！对比2024升级什么？ 华为MatePad11.5 2026款",
              "author": "m來Cg去皆江湖",
              "play": 316,
              "date": "2026-08-02",
              "url": "https://www.bilibili.com/video/BV1se3R6ZEoE",
              "compare": true
            },
            {
              "type": "video",
              "title": "【平板测评】2026千元平板选购指南，华为MatePad 11.5 2026对比荣耀平板GT，性能屏幕续航全维度深度解析",
              "author": "小黄测评",
              "play": 218,
              "date": "2026-07-25",
              "url": "https://www.bilibili.com/video/BV189K46kE5P",
              "compare": true
            },
            {
              "type": "video",
              "title": "千元高性价比平板推荐，华为MatePad 11.5 2026对比荣耀平板GT，普通用户入手哪款不踩坑",
              "author": "好物共享",
              "play": 135,
              "date": "2026-07-30",
              "url": "https://www.bilibili.com/video/BV1fggz6NEF3",
              "compare": true
            },
            {
              "type": "video",
              "title": "给大家看一下我新买的设备—华为matepad 11.5 2026，请关注我",
              "author": "浅雾游戏解说",
              "play": 116,
              "date": "2026-07-17",
              "url": "https://www.bilibili.com/video/BV1scKj6uEGC",
              "compare": false
            },
            {
              "type": "video",
              "title": "平板测评之轻生产力平板对决，华为MatePad 11.5 2026对比荣耀平板GT，办公学习效率谁更高",
              "author": "老张聊科技",
              "play": 111,
              "date": "2026-07-21",
              "url": "https://www.bilibili.com/video/BV1HuKt6aEET",
              "compare": true
            }
          ]
        }
      ],
      "report": null
    },
    "apple": {
      "products": [
            {
                  "name": "iPad Air M4",
                  "voices": [
                        {
                              "type": "video",
                              "title": "你真的需要一台iPad Air M4嘛？看完再决定！ iPadAir iPad 生产力工具 平板推荐 平板选购",
                              "author": "十八秒看信",
                              "play": 1448,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1Swgm6kEdA",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "再降价：教育优惠：Apple iPad Air 11英寸 M4芯片 深空灰色 128G",
                              "author": "家电小常识1001",
                              "play": 1232,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV17Ygb6zETL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 蓝色 256G",
                              "author": "南序家电日记",
                              "play": 1158,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1oUgU6FE16",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 256G",
                              "author": "家电优选频道",
                              "play": 1144,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1F2gU6aEGF",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 11英寸 M4芯片 深空灰色 256G",
                              "author": "数码少年馆",
                              "play": 1140,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1Z2gU6hEoc",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 13英寸 M4芯片 深空灰 256G",
                              "author": "家电小常识1001",
                              "play": 1137,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1oSgU6bENv",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "再降价：教育优惠：Apple iPad Air 2026 11英寸 M4芯片 深空灰色 256G",
                              "author": "小茹讲数码",
                              "play": 1136,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1M8gU6VEM3",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 256G",
                              "author": "数码情报局さ",
                              "play": 1135,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1VLgU6XEgD",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "教育优惠：Apple iPad Air 11英寸 M4芯片 深空灰色 128G",
                              "author": "数码玩物志",
                              "play": 1133,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1VLgU6XE9T",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "再降价：教育优惠：Apple iPad Air 11英寸 M4芯片 深空灰色 128G",
                              "author": "辰序优选社",
                              "play": 1132,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1MsgU62Evh",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 11英寸 M4芯片 深空灰色 128G",
                              "author": "觅渡辰",
                              "play": 1126,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1kRg16bExT",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 256G",
                              "author": "简配数码君",
                              "play": 1122,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1WBgx6zEGy",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 11英寸 M4芯片 深空灰色 128G",
                              "author": "赛博生活优选",
                              "play": 1104,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1swga6tEeB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 13英寸 M4芯片 深空灰 256G",
                              "author": "幻想科技喵",
                              "play": 1102,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1Eagb6gEp8",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "再降价：教育优惠：Apple iPad Air 2026 11英寸 M4芯片 深空灰色 256G",
                              "author": "3C避坑大魔王",
                              "play": 1101,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1cGga6DEr7",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 128G",
                              "author": "3C避坑大魔王",
                              "play": 1101,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1ELga6UEZZ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 256G",
                              "author": "家电生活派",
                              "play": 1099,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1x7gb6SE8B",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 11英寸 M4芯片 深空灰色 128G",
                              "author": "真机实测情报局",
                              "play": 1099,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1m8gt6QEYa",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 128G",
                              "author": "数码小黑板さ",
                              "play": 1090,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1Lzgb6vEJ4",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 11英寸 M4芯片 深空灰色 256G",
                              "author": "数码行业观察员",
                              "play": 1077,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1aggh6AEu5",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "教育优惠：Apple iPad Air 11英寸 M4芯片 深空灰色 128G",
                              "author": "良物数码局",
                              "play": 1077,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV14Lgh6fEhA",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 11英寸 M4芯片 星光色 128G",
                              "author": "老虎夏洛特",
                              "play": 1076,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV18Xgh6eEAg",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 蓝色 256G",
                              "author": "量子好物集",
                              "play": 1075,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV14wga6tENd",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 128G",
                              "author": "小娴讲数码",
                              "play": 1055,
                              "date": "2026-07-25",
                              "url": "https://www.bilibili.com/video/BV1oN3T6GEJm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 128G",
                              "author": "小霏说数码",
                              "play": 951,
                              "date": "2026-07-26",
                              "url": "https://www.bilibili.com/video/BV1QS356sEhM",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "鸣潮启动时长对比原神崩铁，设备ipad air M4",
                              "author": "outdoburde",
                              "play": 468,
                              "date": "2026-07-22",
                              "url": "https://www.bilibili.com/video/BV1v4g16mE3t",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 128G",
                              "author": "数码次元观测",
                              "play": 347,
                              "date": "2026-08-04",
                              "url": "https://www.bilibili.com/video/BV1Tquc6gEYT",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 128G",
                              "author": "科技省钱君",
                              "play": 337,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV1uauG6GEwn",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 128G",
                              "author": "小羊饱饱-o",
                              "play": 319,
                              "date": "2026-08-07",
                              "url": "https://www.bilibili.com/video/BV1FJut6iEFX",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 13英寸 M4芯片 深空灰色 128G",
                              "author": "全屋家电参谋",
                              "play": 313,
                              "date": "2026-08-10",
                              "url": "https://www.bilibili.com/video/BV1ACud69EKR",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 11英寸 M4芯片 深空灰色 256G",
                              "author": "数码干货君",
                              "play": 86,
                              "date": "2026-08-07",
                              "url": "https://www.bilibili.com/video/BV1vwus6nEzc",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "开学季MacBook Air M5值不值得买？学习/创作/续航/生态全体验分享",
                              "author": "美少女测士",
                              "play": 82,
                              "date": "2026-08-12",
                              "url": "https://www.bilibili.com/video/BV1QZgG67EtK",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "学生会员：Apple iPad Air 2026 11英寸 M4芯片 星光色 128G",
                              "author": "科技小木",
                              "play": 42,
                              "date": "2026-08-05",
                              "url": "https://www.bilibili.com/video/BV1gvMk6ZEPA",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "教育优惠 国补 限地区 再降价 Apple iPad Air 2026 11英寸 M4芯片 深空灰色 128G 4色可选",
                              "author": "数码小侦探",
                              "play": 27,
                              "date": "2026-07-27",
                              "url": "https://www.bilibili.com/video/BV1N1gR64EaH",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "学生会员：Apple iPad Air 2026 11英寸 M4芯片 星光色 128G",
                              "author": "数码佬柯",
                              "play": 25,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1xFgX6JEc9",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "教育优惠 国补 限地区 再降价 Apple iPad Air 2026 11英寸 M4芯片 深空灰色 128G 4色可选",
                              "author": "打工数码哥",
                              "play": 21,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV16Huu6HEB7",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "沉浸式开箱 M4‑iPad Air｜打造实用主义平板主屏幕|英文原生 vlog｜新 iPad 开箱 + 功能分区，适合磨耳朵",
                              "author": "土狼1号",
                              "play": 14,
                              "date": "2026-08-09",
                              "url": "https://www.bilibili.com/video/BV1Kzu26vEVr",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 11英寸 M4芯片 深空灰色 256G 公开版",
                              "author": "科技飞侠",
                              "play": 11,
                              "date": "2026-08-05",
                              "url": "https://www.bilibili.com/video/BV1UEMC6tE7B",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 11英寸 M4芯片 星光色 256G",
                              "author": "数码小闪电",
                              "play": 11,
                              "date": "2026-07-27",
                              "url": "https://www.bilibili.com/video/BV1Xggd6uE5n",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 11英寸 M4芯片 深空灰色 256G 公开版",
                              "author": "科技小旋风",
                              "play": 9,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1Cjgm6AEe2",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "PLUS：Apple iPad Air 2026 13英寸 M4芯片 深空灰色 128G",
                              "author": "科技迷哥",
                              "play": 7,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1Pegx6GEqJ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 13英寸 M4芯片 256G",
                              "author": "数码极客员",
                              "play": 6,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1Ywgh6BEDN",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "开箱新款 M4芯片iPad Air 屏幕超大.180351",
                              "author": "雨辰来来",
                              "play": 4,
                              "date": "2026-08-12",
                              "url": "https://www.bilibili.com/video/BV1Tbuk6dEGN",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Apple iPad Air 2026 13英寸 M4芯片 深空灰色 256G",
                              "author": "数码小桃",
                              "play": 4,
                              "date": "2026-07-22",
                              "url": "https://www.bilibili.com/video/BV14dg66WEpj",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "iPad Air M3",
                  "voices": [
                        {
                              "type": "video",
                              "title": "真不值得购买吗？2025款 iPad Air M3版本开箱验机实测「科技美学开箱」",
                              "author": "科技美学",
                              "play": 849349,
                              "date": "2025-03-15",
                              "url": "https://www.bilibili.com/video/BV1R8QyYQECz",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "iPad Air M3为什么是我唯一推荐的iPad！？",
                              "author": "哎呀_思",
                              "play": 298888,
                              "date": "2025-03-15",
                              "url": "https://www.bilibili.com/video/BV1NLQUYUE1Q",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "iPad 11代 A16",
                  "voices": [
                        {
                              "type": "video",
                              "title": "iPad 11评测！国补后值得买吗？详细对比分析 iPad A16/iPadAirM3/iPad10/iPad9/iPadProM4/2024/2025",
                              "author": "动然",
                              "play": 23137,
                              "date": "2025-03-14",
                              "url": "https://www.bilibili.com/video/BV1EAQ3YwEpf",
                              "compare": true
                        }
                  ]
            },
            {
                  "name": "iPad Pro M5",
                  "voices": [
                        {
                              "type": "video",
                              "title": "「科技美学开箱」M5芯片 iPad Pro 2025是否值得购买？ 七大升级都有啥？ 对比M4版本 iPad Pro",
                              "author": "科技美学",
                              "play": 641777,
                              "date": "2025-10-21",
                              "url": "https://www.bilibili.com/video/BV1bHW9z3Euh",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "「小白」iPad Pro M5体验：附Pro选购指南",
                              "author": "小白测评",
                              "play": 493438,
                              "date": "2025-10-21",
                              "url": "https://www.bilibili.com/video/BV1KnWQzPEU1",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "iPad Pro M5 开箱：和 iPhone Air 的 eSIM 有哪些差别？",
                              "author": "钟文泽",
                              "play": 385076,
                              "date": "2025-10-23",
                              "url": "https://www.bilibili.com/video/BV1oksqz1Eqw",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "「黑貓」银色 iPad Pro M5 开箱 + 简单评测：一次小小升级",
                              "author": "黑貓的野望",
                              "play": 246718,
                              "date": "2025-12-31",
                              "url": "https://www.bilibili.com/video/BV1zeiuBmEQG",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "M5接近征服120帧原神！iPad Pro 2025 2K全高帧率测试",
                              "author": "人鬼秀我挨揍",
                              "play": 41893,
                              "date": "2025-12-08",
                              "url": "https://www.bilibili.com/video/BV15HmABQE65",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "iPad Pro M5 原神日常表现",
                              "author": "Lekinze",
                              "play": 15425,
                              "date": "2025-11-18",
                              "url": "https://www.bilibili.com/video/BV1y5CzBtEHn",
                              "compare": false
                        }
                  ]
            }
      ],
      "report": null
    },
    "honor": {
      "products": [
            {
                  "name": "荣耀 MagicPad 3 Pro",
                  "voices": [
                        {
                              "type": "video",
                              "title": "如何用平板本地爽玩Steam游戏？荣耀MagicPad3 Pro演示",
                              "author": "大甲虫先生腿很多",
                              "play": 398400,
                              "date": "2026-01-31",
                              "url": "https://www.bilibili.com/video/BV1cW6nBfEuv",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Linux+PC级模式，真的能让安卓有生产力？平板推荐 2026荣耀MagicPad3 Pro 12.3",
                              "author": "小冯整挺好",
                              "play": 168186,
                              "date": "2026-04-30",
                              "url": "https://www.bilibili.com/video/BV1999eBQEN8",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "13.3有了 您看7.9那个事？荣耀MagicPad3 Pro蓝光频闪极速测试",
                              "author": "全是干货的大胖鸽",
                              "play": 50322,
                              "date": "2026-03-20",
                              "url": "https://www.bilibili.com/video/BV13CA7zZEQy",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "如何用平板爽玩《地平线6》？还能本地玩Steam和EPIC游戏！荣耀MagicPad3 Pro演示",
                              "author": "大甲虫先生腿很多",
                              "play": 31867,
                              "date": "2026-07-31",
                              "url": "https://www.bilibili.com/video/BV1cqGP6mEdK",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "同为第五代骁龙8至尊大屏平板，vivo Pad6 Pro和荣耀MagicPad3 Pro 13.3怎么选？高性能旗舰大尺寸平板推荐",
                              "author": "奉仙数码",
                              "play": 13725,
                              "date": "2026-03-27",
                              "url": "https://www.bilibili.com/video/BV1yZXHBqECm",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "2026开学平板选购｜大屏生产力vs小屏便携怎么选？",
                              "author": "一分钟的开箱",
                              "play": 8679,
                              "date": "2026-07-30",
                              "url": "https://www.bilibili.com/video/BV1En3b6rEAB",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "荣耀MagicPad3 Pro 13.3极客中心原神高分辨率简单实机测试",
                              "author": "BoNunn",
                              "play": 8419,
                              "date": "2026-07-15",
                              "url": "https://www.bilibili.com/video/BV13dNi6uE2r",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "「荣耀MagicPad 3 Pro」平板也能玩转龙虾?",
                              "author": "Code壳实验室",
                              "play": 8116,
                              "date": "2026-03-15",
                              "url": "https://www.bilibili.com/video/BV1S1w3zMEsw",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀PC模式超详细体验，可以说是风味十足。。",
                              "author": "感觉测评_Zooe",
                              "play": 7572,
                              "date": "2026-08-04",
                              "url": "https://www.bilibili.com/video/BV1k9M965EtL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀MagicPad3 Pro 12.3，适合影音娱乐，也能学习轻办公。",
                              "author": "阳光使者2025",
                              "play": 2701,
                              "date": "2026-08-02",
                              "url": "https://www.bilibili.com/video/BV1L33R6CEkn",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板MagicPad3Pro系列怎么选？ 同样是荣耀平板MagicPad 3 Pro，12.3英寸和13.3英寸到底该怎么选？",
                              "author": "酥机长",
                              "play": 1427,
                              "date": "2026-08-05",
                              "url": "https://www.bilibili.com/video/BV1ChMC6JELF",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "百元内最适配荣耀magicpad3pro的三件套",
                              "author": "评分君",
                              "play": 1183,
                              "date": "2026-08-04",
                              "url": "https://www.bilibili.com/video/BV1zuuc6tEWB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "全网最详细的荣耀平板magicpad3pro扩展屏模式评测",
                              "author": "评分君",
                              "play": 1024,
                              "date": "2026-07-31",
                              "url": "https://www.bilibili.com/video/BV1UnGP6tEz3",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "超高亮度超薄机身！全能荣耀MagicPad 3 Pro 12.3对比性能13.3英寸，旧款能买吗？",
                              "author": "极科君聊数码",
                              "play": 457,
                              "date": "2026-08-05",
                              "url": "https://www.bilibili.com/video/BV1VaMy6BEo5",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "平板秒变PC，荣耀平板也能轻办公！",
                              "author": "小杨KrayTech",
                              "play": 415,
                              "date": "2026-08-03",
                              "url": "https://www.bilibili.com/video/BV1kH3d6REgL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板MagicOS 11.0内测招募正式开启！",
                              "author": "酥机长",
                              "play": 216,
                              "date": "2026-08-07",
                              "url": "https://www.bilibili.com/video/BV1hjub64Eap",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "迈克尔贝环绕运镜荣耀平板",
                              "author": "酥机长",
                              "play": 107,
                              "date": "2026-08-07",
                              "url": "https://www.bilibili.com/video/BV1Fjut6BEKN",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【平板选购容易踩坑？】2026年8月全价位平板梳理｜千元入门到大屏旗舰全覆盖",
                              "author": "小葵数码",
                              "play": 75,
                              "date": "2026-08-05",
                              "url": "https://www.bilibili.com/video/BV1u5Mr6WELU",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀MagicPad3 Pro平板电脑深度实测：性能、护眼、续航，优缺点一次说透！从芯片到体验，值不值得入手？",
                              "author": "京挑京选",
                              "play": 47,
                              "date": "2026-08-04",
                              "url": "https://www.bilibili.com/video/BV1uMuF6gE3s",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "荣耀平板 10 Pro",
                  "voices": [
                        {
                              "type": "video",
                              "title": "听劝！想买荣耀平板10 Pro的人，看看这条视频再做决定也不迟！",
                              "author": "若川科技洞察局",
                              "play": 37818,
                              "date": "2026-05-18",
                              "url": "https://www.bilibili.com/video/BV1gQ5Z69EWw",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "把钱花屏幕上的荣耀平板10 Pro真的好用？",
                              "author": "优秀的子都",
                              "play": 33586,
                              "date": "2026-01-13",
                              "url": "https://www.bilibili.com/video/BV16Pr5B3E6z",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【荣耀平板10 Pro评测】2000档学生平板，到底值不值？",
                              "author": "Yoko视频工作室",
                              "play": 28095,
                              "date": "2026-01-13",
                              "url": "https://www.bilibili.com/video/BV1Bi6oBxEwX",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "MagicOS 10.0封神！荣耀平板10 Pro系统功能全拆解，效率直接翻倍",
                              "author": "一周数码说",
                              "play": 26793,
                              "date": "2026-02-28",
                              "url": "https://www.bilibili.com/video/BV1vjADzsENK",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10pro柔光板好还是玻璃版本好",
                              "author": "佛系测评家-小生",
                              "play": 18731,
                              "date": "2026-03-15",
                              "url": "https://www.bilibili.com/video/BV1SAwuzFEC5",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10pro，降价1000元后值得入手吗？【优点＆缺点】",
                              "author": "旧机测",
                              "play": 13499,
                              "date": "2026-07-28",
                              "url": "https://www.bilibili.com/video/BV13o3T6qEah",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro的性能跑分和游戏体验",
                              "author": "金玉2011",
                              "play": 8618,
                              "date": "2026-02-23",
                              "url": "https://www.bilibili.com/video/BV1vifiB6Exg",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "平板也能设置锁屏视频了！荣耀平板10pro更新了哪些新功能？",
                              "author": "一分钟的开箱",
                              "play": 5222,
                              "date": "2026-03-30",
                              "url": "https://www.bilibili.com/video/BV1YCXYB2EDc",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀magicpad3pro碉堡的续航，开极客中心自定义，向日葵远程办公，2小时30分钟仅耗电10%！",
                              "author": "夜月文文",
                              "play": 2859,
                              "date": "2026-03-25",
                              "url": "https://www.bilibili.com/video/BV1BDQUBPEoD",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板X10 Pro 11.5英寸 苍山灰 8GB+256GB",
                              "author": "数码不踩坑",
                              "play": 1333,
                              "date": "2026-07-22",
                              "url": "https://www.bilibili.com/video/BV16Ngz6BEL1",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板X10 Pro 11.5英寸 苍山灰 8GB+256GB",
                              "author": "家电潮流馆",
                              "play": 1151,
                              "date": "2026-07-19",
                              "url": "https://www.bilibili.com/video/BV185K662ELp",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板10 Pro 11.5英寸 苍山灰 12GB+256GB",
                              "author": "幻想科技喵",
                              "play": 1131,
                              "date": "2026-07-28",
                              "url": "https://www.bilibili.com/video/BV1Su3v6VE7L",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板X10 Pro 11.5英寸 苍山灰 8GB+256GB",
                              "author": "购机逃坑实录",
                              "play": 1114,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1nrgx6qEfv",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10Pro优缺点总结！2000块的平板真的能用？ #平板电脑",
                              "author": "觅崖兑词Um3",
                              "play": 1083,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1HFdqB5EKo",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板10 Pro 11.5英寸 苍山灰 12GB+256GB",
                              "author": "萤窗映雪案",
                              "play": 1046,
                              "date": "2026-07-29",
                              "url": "https://www.bilibili.com/video/BV1bt3C6AENe",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板10 Pro 11.5英寸 苍山灰 12GB+256GB",
                              "author": "家电好物精选社",
                              "play": 1024,
                              "date": "2026-07-31",
                              "url": "https://www.bilibili.com/video/BV1Yd3a65E7X",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板X10 Pro 11.5英寸 苍山灰 8GB+256GB",
                              "author": "清序家电局",
                              "play": 926,
                              "date": "2026-07-20",
                              "url": "https://www.bilibili.com/video/BV1jiKm61Ep9",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板10 Pro 11.5英寸 苍山灰 12GB+256GB",
                              "author": "家电优选频道",
                              "play": 905,
                              "date": "2026-07-27",
                              "url": "https://www.bilibili.com/video/BV1fCgZ6sEvb",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板X10 Pro 11.5英寸 苍山灰 8GB+256GB",
                              "author": "小小讲家电",
                              "play": 896,
                              "date": "2026-07-20",
                              "url": "https://www.bilibili.com/video/BV1ieK16uE5P",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板X10 Pro 11.5英寸 苍山灰 8GB+256GB",
                              "author": "家电小惊喜",
                              "play": 466,
                              "date": "2026-07-16",
                              "url": "https://www.bilibili.com/video/BV15RKG61EDv",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板10 Pro 11.5英寸 苍山灰 12GB+256GB",
                              "author": "小晴说数码",
                              "play": 459,
                              "date": "2026-08-01",
                              "url": "https://www.bilibili.com/video/BV1c8Gu6ZEF9",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【4月平板终极评测】不要随大流，只看需求选！",
                              "author": "叨哔叨哔评测",
                              "play": 457,
                              "date": "2026-04-26",
                              "url": "https://www.bilibili.com/video/BV1tjZFBREs3",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板10 Pro 11.5英寸 苍山灰 12GB+256GB",
                              "author": "赴野数码集",
                              "play": 429,
                              "date": "2026-08-01",
                              "url": "https://www.bilibili.com/video/BV1qPGV6cEPD",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板10 Pro 11.5英寸 苍山灰 12GB+256GB",
                              "author": "购机逃坑实录",
                              "play": 311,
                              "date": "2026-08-09",
                              "url": "https://www.bilibili.com/video/BV1HSu26ZEhB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "学习还是爱奇艺？荣耀平板X10 Pro开箱视频！",
                              "author": "南宁荣耀哥",
                              "play": 239,
                              "date": "2026-03-18",
                              "url": "https://www.bilibili.com/video/BV1UxwYzhEcw",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板10 Pro 11.5英寸 苍山灰 12GB+256GB",
                              "author": "花影扫阶苔",
                              "play": 217,
                              "date": "2026-08-04",
                              "url": "https://www.bilibili.com/video/BV1yAuA6gEnN",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "别再瞎买了❗学生党平板到底怎么选？",
                              "author": "煲一锅数码周",
                              "play": 162,
                              "date": "2026-08-06",
                              "url": "https://www.bilibili.com/video/BV1hJuJ6eESC",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10Pro优缺点总结！2000块的平板真的能用？ #平板电脑",
                              "author": "鹅池哦风复古",
                              "play": 121,
                              "date": "2026-03-17",
                              "url": "https://www.bilibili.com/video/BV15AwSzHEUA",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro【国家补贴】11.5英寸2.5K护眼屏 荣耀学习空间 全金属一体机身 8GB+256GB 苍山灰",
                              "author": "暮色存档子",
                              "play": 108,
                              "date": "2026-04-24",
                              "url": "https://www.bilibili.com/video/BV1L7oVBBEnY",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板10 Pro 11.5英寸 苍山灰 12GB+256GB",
                              "author": "数码次元观测",
                              "play": 64,
                              "date": "2026-08-11",
                              "url": "https://www.bilibili.com/video/BV1rGuq6wEhD",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官诸葛朗",
                              "play": 44,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1XbdeBdEoz",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10Pro柔光礼盒版测评，这柔光屏幕看着真舒服",
                              "author": "静静精选",
                              "play": 32,
                              "date": "2026-04-07",
                              "url": "https://www.bilibili.com/video/BV1jnDYB1ELU",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro上手体验 1107619531",
                              "author": "桃气满满店3",
                              "play": 24,
                              "date": "2026-05-23",
                              "url": "https://www.bilibili.com/video/BV1KoGa6BEdP",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 礼盒版【国家补贴】11.5英寸荣耀绿洲护眼屏 内置荣耀Pencil4s AI笔 12+256玉龙雪7831",
                              "author": "B购",
                              "play": 15,
                              "date": "2026-03-11",
                              "url": "https://www.bilibili.com/video/BV1q6cRzqEeW",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 11.5英寸144Hz刷新率2.8K超清屏 网课学习娱乐二合一游戏办公Pad 玉龙雪 柔光版 12GB+256GB 礼盒装",
                              "author": "他就累了吧",
                              "play": 14,
                              "date": "2026-03-10",
                              "url": "https://www.bilibili.com/video/BV1ycNczgEBo",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 学习娱乐两不误 1093526844",
                              "author": "美妆盒子",
                              "play": 12,
                              "date": "2026-04-30",
                              "url": "https://www.bilibili.com/video/BV1ru9bB7Egt",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10Pro自由摆放操作不设限",
                              "author": "熊泓峰",
                              "play": 11,
                              "date": "2026-05-24",
                              "url": "https://www.bilibili.com/video/BV1UrG569ES4",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官汤琿騏",
                              "play": 10,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1cLdeBiEgc",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 礼盒版【国家补贴】11.5英寸荣耀绿洲护眼屏 内置荣耀Pencil4s AI笔 12+256玉龙雪",
                              "author": "大牛甄选",
                              "play": 10,
                              "date": "2026-03-11",
                              "url": "https://www.bilibili.com/video/BV1B6cRzqEyV",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 礼盒版 1101902735",
                              "author": "哥哥好物馆",
                              "play": 9,
                              "date": "2026-04-21",
                              "url": "https://www.bilibili.com/video/BV1iodrBDEhN",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官任鑠翃",
                              "play": 9,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1oHdeBhEGG",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为【3C认证】原装88W全能充电器超级快充P60 Mate60pro 70 50 40proX5nova10荣耀手机平板笔记本电脑 【华为88W超级快充套",
                              "author": "好物种草官廖逸纯",
                              "play": 8,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1QzdiBoEA3",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官江麓姮",
                              "play": 8,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1A3deBuE52",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 礼盒版 【国家补贴】11.5英寸荣耀绿洲护眼屏 内置荣耀Pencil4s AI笔12+256苍山灰",
                              "author": "亓官觉",
                              "play": 7,
                              "date": "2026-05-02",
                              "url": "https://www.bilibili.com/video/BV1QxR5BwEEU",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 柔光版【国家补贴】11.5英寸2.5K护眼柔光屏 荣耀学习空间 8+256GB 苍山灰",
                              "author": "宋罗幽",
                              "play": 7,
                              "date": "2026-04-25",
                              "url": "https://www.bilibili.com/video/BV1qFoXBpEmd",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "千元出头，护眼，质感，续航都不错。荣耀平板X10Pro产品力还是不错的！#荣耀平板X10Pro#荣耀平板-7595190229838342057",
                              "author": "寂豢撂蹲Tl8",
                              "play": 6,
                              "date": "2026-08-11",
                              "url": "https://www.bilibili.com/video/BV1YHuY6zEB8",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro【国家补贴】11.5英寸2.5K护眼屏 荣耀学习空间 全金属一体机身 8GB+256GB 苍山灰",
                              "author": "太叔達",
                              "play": 6,
                              "date": "2026-05-22",
                              "url": "https://www.bilibili.com/video/BV1E1Li6GEBt",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官任麓韶",
                              "play": 5,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1NKdeBkEEz",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "#荣耀平板10Pro到手有一段时间了，刚开始会认为自己会不适应柔光屏，用了一个月，发现竟然越用越爽，这个售价2000左右，但是给了非常多的平板，我个人认为在荣耀",
                              "author": "床栏列智Oa3",
                              "play": 4,
                              "date": "2026-08-09",
                              "url": "https://www.bilibili.com/video/BV11JuV6uELE",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10Pro学生上网课神器超清屏幕用起来 1136815420",
                              "author": "七七精选小店孔麗翳",
                              "play": 4,
                              "date": "2026-07-02",
                              "url": "https://www.bilibili.com/video/BV1DrT76XEcK",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 柔光礼盒版【国家补贴】荣耀类纸柔光屏 内置荣耀Pencil4s AI笔 12+256GB 玉龙雪",
                              "author": "澹台杏",
                              "play": 4,
                              "date": "2026-05-22",
                              "url": "https://www.bilibili.com/video/BV1qPLe6aE62",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 开箱分享 1093547249",
                              "author": "笔记本电脑严选",
                              "play": 4,
                              "date": "2026-04-30",
                              "url": "https://www.bilibili.com/video/BV1Kz9hBiEry",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 11.5英寸144Hz刷新率2.8K超清屏 网课学习娱乐二合一游戏办公Pad 玉龙雪 柔光版 12GB+256GB 礼盒装",
                              "author": "樱桃小汽水的精选日记",
                              "play": 4,
                              "date": "2026-03-13",
                              "url": "https://www.bilibili.com/video/BV1DiwEztE43",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10Pro柔光版第一时间上手，天玑8350至尊版处理器+115英寸柔光屏。#荣耀平板10Pro柔光版#荣耀平板#数码科技-759187440251148",
                              "author": "仄萄荒吭Zy2",
                              "play": 3,
                              "date": "2026-08-11",
                              "url": "https://www.bilibili.com/video/BV1GKue6zEgm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 平板10 Pro 11.5英寸 苍山灰 12GB+256GB",
                              "author": "蝉腹卧松风",
                              "play": 3,
                              "date": "2026-08-05",
                              "url": "https://www.bilibili.com/video/BV13kM26zE6Q",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 柔光版【国家补贴】11.5英寸2.5K护眼柔光屏 荣耀学习空间 8+256GB 苍山灰",
                              "author": "澹台躬",
                              "play": 3,
                              "date": "2026-05-22",
                              "url": "https://www.bilibili.com/video/BV1ymLY6VEDG",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 1147753992",
                              "author": "阿涛分享乐正菊",
                              "play": 3,
                              "date": "2026-04-30",
                              "url": "https://www.bilibili.com/video/BV1Cb9aBwEJB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 柔光礼盒版【国家补贴】荣耀类纸柔光屏 内置荣耀Pencil4s AI笔 12+256GB 玉龙雪",
                              "author": "测评达人好物df",
                              "play": 3,
                              "date": "2026-04-29",
                              "url": "https://www.bilibili.com/video/BV1n49DBLE6S",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官梁艮耜",
                              "play": 3,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1dsdeBbEY8",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro【国家补贴】11.5英寸2.5K护眼屏 荣耀学习空间 全金属一体机身 8GB+256GB 晴空蓝",
                              "author": "人不用来",
                              "play": 2,
                              "date": "2026-04-25",
                              "url": "https://www.bilibili.com/video/BV1LKoXBEEAL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 1147753992",
                              "author": "来了老弟南门华",
                              "play": 2,
                              "date": "2026-04-21",
                              "url": "https://www.bilibili.com/video/BV17odrBDENB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 11.5英寸144Hz刷新率2.8K超清屏 网课学习娱乐二合一游戏办公Pad 玉龙雪 柔光版 12GB+256GB 礼盒装",
                              "author": "青空回响ovo",
                              "play": 2,
                              "date": "2026-03-14",
                              "url": "https://www.bilibili.com/video/BV1aTw4znEks",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10Pro大屏沉浸看剧上课都超给力 1136816872",
                              "author": "好物分享官黎誉畅",
                              "play": 1,
                              "date": "2026-04-24",
                              "url": "https://www.bilibili.com/video/BV1n1oVBEEGp",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10Pro学生上网课神器超清屏幕用起来 1136815420",
                              "author": "榜单好物推荐常薰久",
                              "play": 1,
                              "date": "2026-04-23",
                              "url": "https://www.bilibili.com/video/BV1nfohBYEQ8",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官秦卿袆",
                              "play": 1,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1A3deBuEa6",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官钟离铎",
                              "play": 1,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1sMdeB3Exz",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 11.5英寸144Hz刷新率2.8K超清屏 网课学习娱乐二合一游戏办公Pad 玉龙雪 柔光版 12GB+256GB 礼盒装",
                              "author": "日向夏帆x",
                              "play": 1,
                              "date": "2026-03-10",
                              "url": "https://www.bilibili.com/video/BV1FMPfzoEpB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10Pro 1129465826",
                              "author": "朴物集选",
                              "play": 0,
                              "date": "2026-04-28",
                              "url": "https://www.bilibili.com/video/BV1LP9rBgEFJ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro苍山灰版｜感拉满，颜值天花板！",
                              "author": "琦琦风影",
                              "play": 0,
                              "date": "2026-04-26",
                              "url": "https://www.bilibili.com/video/BV19RoRBpEm7",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro【国家补贴】11.5英寸2.5K护眼屏 荣耀学习空间 全金属一体机身 8GB+256GB 苍山灰",
                              "author": "龙遐闰",
                              "play": 0,
                              "date": "2026-04-24",
                              "url": "https://www.bilibili.com/video/BV1oVoVBgESW",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官谢鑫轶",
                              "play": 0,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1XbdeBdEZM",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官周绣豫",
                              "play": 0,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV1w3deBuE1y",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "华为原装超级快充充电器p70p60p50p40mate70 60 50 40 30nova13 12 11 10 9 7pro适配荣耀畅玩手机平板 10V2",
                              "author": "好物种草官王靖澄",
                              "play": 0,
                              "date": "2026-04-17",
                              "url": "https://www.bilibili.com/video/BV112deB5E8E",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 11.5英寸144Hz刷新率2.8K超清屏 网课学习娱乐二合一游戏办公Pad 玉龙雪 柔光版 12GB+256GB 礼盒装",
                              "author": "顾星辞666",
                              "play": 0,
                              "date": "2026-03-14",
                              "url": "https://www.bilibili.com/video/BV1C4w4ziESJ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 11.5英寸144Hz刷新率2.8K超清屏 网课学习娱乐二合一游戏办公Pad 玉龙雪 柔光版 12GB+256GB 礼盒装",
                              "author": "森屿鹿眠mm",
                              "play": 0,
                              "date": "2026-03-11",
                              "url": "https://www.bilibili.com/video/BV1VecZzuEXp",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 11.5英寸144Hz刷新率2.8K超清屏 网课学习娱乐二合一游戏办公Pad 玉龙雪 柔光版 12GB+256GB 礼盒装",
                              "author": "人不用来",
                              "play": 0,
                              "date": "2026-03-10",
                              "url": "https://www.bilibili.com/video/BV1anPfzmEou",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro 11.5英寸144Hz刷新率2.8K超清屏 网课学习娱乐二合一游戏办公Pad 玉龙雪 柔光版 12GB+256GB 礼盒装",
                              "author": "凉柚与云M",
                              "play": 0,
                              "date": "2026-03-10",
                              "url": "https://www.bilibili.com/video/BV1rcPfzhEU1",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "荣耀平板 X10 Pro",
                  "voices": [
                        {
                              "type": "video",
                              "title": "逆天平板避雷第二期，点名表扬:荣耀X10 Pro、荣耀X9 Pro、OPPO Pad Air5",
                              "author": "中国机长-起飞版",
                              "play": 43871,
                              "date": "2026-01-18",
                              "url": "https://www.bilibili.com/video/BV1ujr9BiEpQ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【学生平板推荐】荣耀平板X10 Pro 测评",
                              "author": "做裙子的Cc",
                              "play": 43311,
                              "date": "2026-02-28",
                              "url": "https://www.bilibili.com/video/BV1H1AazXEzS",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10Pro开箱展示",
                              "author": "小光的数码屋",
                              "play": 37395,
                              "date": "2026-01-18",
                              "url": "https://www.bilibili.com/video/BV1qLksBqETJ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "学生党平板【荣耀平板X10 Pro】使用体验",
                              "author": "玩酷数码",
                              "play": 30798,
                              "date": "2026-02-28",
                              "url": "https://www.bilibili.com/video/BV18hAazAEYa",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "千元柔光护眼天花板！荣耀平板X10 Pro测评",
                              "author": "特务喵喵",
                              "play": 29729,
                              "date": "2026-02-27",
                              "url": "https://www.bilibili.com/video/BV1RVADz4EUa",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀Power2价格公布弹幕炸裂！10080毫安巨无霸电池真香！",
                              "author": "红米K100新品发布",
                              "play": 27530,
                              "date": "2026-01-05",
                              "url": "https://www.bilibili.com/video/BV1L3i4B4E7Z",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【全程回放】荣耀Power2新品发布会",
                              "author": "数码新品发布会",
                              "play": 4278,
                              "date": "2026-01-05",
                              "url": "https://www.bilibili.com/video/BV1qui4BZE5t",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【电池天花板】荣耀Power2价格公布弹幕逆天！差点10086电池！",
                              "author": "发布会直播姬",
                              "play": 2982,
                              "date": "2026-01-05",
                              "url": "https://www.bilibili.com/video/BV1GqixBDEWW",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "「参数分解」荣耀平板X10 Pro，适合上网课，不建议拿来干别的。",
                              "author": "阳光使者2025",
                              "play": 2814,
                              "date": "2026-01-10",
                              "url": "https://www.bilibili.com/video/BV1f1rGBvEP7",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro，不仅是平板，还是孩子的学习好搭子",
                              "author": "小杨KrayTech",
                              "play": 1918,
                              "date": "2026-01-09",
                              "url": "https://www.bilibili.com/video/BV1TvrNBFEpy",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "荣耀Power2价格公布香吗？10080毫安电池续航巨无霸！",
                              "author": "荣耀RobotPhone发布",
                              "play": 1783,
                              "date": "2026-01-05",
                              "url": "https://www.bilibili.com/video/BV1LEibB8EAm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro柔光版，适合孩子的护眼好平板",
                              "author": "陆一手数码分享",
                              "play": 706,
                              "date": "2026-01-06",
                              "url": "https://www.bilibili.com/video/BV1ZXqcBxEEb",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro/荣耀平板X10 Pro柔光版的对比和区别，荣耀平板X10 Pro/荣耀平板X10 Pro柔光版使用体验测评，这两款的性价比哪个更高",
                              "author": "梦之长安",
                              "play": 555,
                              "date": "2026-01-12",
                              "url": "https://www.bilibili.com/video/BV1aSrhByEsN",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板10 Pro、X10 Pro发布：2499元、1499元起，还有一款荣耀亲选AI通话耳机",
                              "author": "xqjxqj",
                              "play": 541,
                              "date": "2026-01-05",
                              "url": "https://www.bilibili.com/video/BV1wyibBCEbc",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro提前开箱评测，除了是平板还能是学习机  荣耀平板X10pro  荣耀.....",
                              "author": "fghfg34535",
                              "play": 309,
                              "date": "2026-02-24",
                              "url": "https://www.bilibili.com/video/BV14Mf1BDEan",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro：千元价位，全家共享",
                              "author": "数码小甜",
                              "play": 305,
                              "date": "2026-01-08",
                              "url": "https://www.bilibili.com/video/BV1i7iQBbEeL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "柔光+高刷+大电池！荣耀X10 Pro柔光版一台搞定学习、追剧、办公全场景",
                              "author": "科技洛克",
                              "play": 151,
                              "date": "2026-01-10",
                              "url": "https://www.bilibili.com/video/BV1JzrGBzEzj",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "孩子学习，家长省心：荣耀平板X10 Pro体验！",
                              "author": "喵呜测评",
                              "play": 64,
                              "date": "2026-01-06",
                              "url": "https://www.bilibili.com/video/BV1aDqPBsEn3",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10Pro柔光板，学习看护，家长放心",
                              "author": "斑马野谈",
                              "play": 60,
                              "date": "2026-01-08",
                              "url": "https://www.bilibili.com/video/BV12Ci9BJE7j",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板x10pro开箱",
                              "author": "大牛甄选",
                              "play": 58,
                              "date": "2026-01-09",
                              "url": "https://www.bilibili.com/video/BV1akrPBvE6o",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 开箱分享！",
                              "author": "发现美好东西",
                              "play": 53,
                              "date": "2026-02-18",
                              "url": "https://www.bilibili.com/video/BV1PGZDB8ELq",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro，专属资源助力孩子成长",
                              "author": "好物学长",
                              "play": 50,
                              "date": "2026-01-17",
                              "url": "https://www.bilibili.com/video/BV1JqryBcEBb",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "适合学习和办公，荣耀平板X10 Pro 柔光版",
                              "author": "精选宝贝",
                              "play": 49,
                              "date": "2026-01-29",
                              "url": "https://www.bilibili.com/video/BV1iXzoBDEu4",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "孩子学习，家长娱乐，荣耀平板X10 Pro柔光屏全给你搞定",
                              "author": "茄子egg",
                              "play": 33,
                              "date": "2026-01-09",
                              "url": "https://www.bilibili.com/video/BV19jrNB3Efo",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro平板",
                              "author": "必购",
                              "play": 16,
                              "date": "2026-01-17",
                              "url": "https://www.bilibili.com/video/BV1vVrUBAEjm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro【国家补贴】11.5英寸2.5K护眼屏 荣耀学习空间 全金属一体机身 8GB+128GB 苍山灰0345",
                              "author": "好物学长",
                              "play": 15,
                              "date": "2026-03-10",
                              "url": "https://www.bilibili.com/video/BV1uKPZzuECX",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 开箱分享！",
                              "author": "小羊优选",
                              "play": 11,
                              "date": "2026-01-15",
                              "url": "https://www.bilibili.com/video/BV1aBrfBdEG8",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "孩子学习，家长省心荣耀平板X10 Pro体验！",
                              "author": "小羊优选",
                              "play": 9,
                              "date": "2026-03-08",
                              "url": "https://www.bilibili.com/video/BV1yUNNzXECc",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 开箱分享！",
                              "author": "必购",
                              "play": 9,
                              "date": "2026-01-15",
                              "url": "https://www.bilibili.com/video/BV1YBrfBdEKa",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀x10pro平板",
                              "author": "必购",
                              "play": 9,
                              "date": "2026-01-12",
                              "url": "https://www.bilibili.com/video/BV1sPraBNEjY",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀 X10Pro开箱",
                              "author": "必购",
                              "play": 9,
                              "date": "2026-01-09",
                              "url": "https://www.bilibili.com/video/BV1gkrPBvEzY",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 开箱分享！",
                              "author": "好物学长",
                              "play": 8,
                              "date": "2026-02-18",
                              "url": "https://www.bilibili.com/video/BV1NGZDB8EwH",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 学习娱乐两不误！",
                              "author": "大牛甄选",
                              "play": 6,
                              "date": "2026-01-15",
                              "url": "https://www.bilibili.com/video/BV19BrfBdEWX",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "家里小孩的学习机 荣耀X10 Pro平板电脑",
                              "author": "必购",
                              "play": 5,
                              "date": "2026-01-09",
                              "url": "https://www.bilibili.com/video/BV1gyrPBPEqv",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro 学习娱乐两不误！",
                              "author": "小羊优选",
                              "play": 4,
                              "date": "2026-02-18",
                              "url": "https://www.bilibili.com/video/BV1PGZDB8Eck",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro【国家补贴】11.5英寸2.5K护眼屏 荣耀学习空间 全金属一体机身 8GB+128GB 苍山灰",
                              "author": "B购",
                              "play": 3,
                              "date": "2026-03-10",
                              "url": "https://www.bilibili.com/video/BV1MTPZzBEGn",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10Pro上手",
                              "author": "小羊优选",
                              "play": 2,
                              "date": "2026-01-09",
                              "url": "https://www.bilibili.com/video/BV1gyrPBPELe",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10 Pro，孩子学习更安心",
                              "author": "B购",
                              "play": 1,
                              "date": "2026-01-17",
                              "url": "https://www.bilibili.com/video/BV1JqryBcEkz",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板X10Pro#官方正品精选好物",
                              "author": "量子小茶",
                              "play": 0,
                              "date": "2026-01-09",
                              "url": "https://www.bilibili.com/video/BV1aBrwB8EXA",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "荣耀平板 GT Pro",
                  "voices": [
                        {
                              "type": "video",
                              "title": "2100块，这就是世界上最好的平板！荣耀平板GT Pro详细测评，平板中的智界R7？",
                              "author": "简机测评SimpleTech",
                              "play": 211599,
                              "date": "2025-02-17",
                              "url": "https://www.bilibili.com/video/BV12bwRebEBC",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板GT Pro分享，1600元就能买到一个oled显示屏的平板电脑！！！",
                              "author": "喜欢就挂JustGua",
                              "play": 11405,
                              "date": "2025-06-02",
                              "url": "https://www.bilibili.com/video/BV1zp7SzaE6r",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "全新1799入手OLED平板！荣耀平板GT Pro",
                              "author": "给自己1個微笑",
                              "play": 9775,
                              "date": "2025-07-07",
                              "url": "https://www.bilibili.com/video/BV1zs3yzPEMD",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "荣耀平板 V9",
                  "voices": [
                        {
                              "type": "video",
                              "title": "降价后成了千元板皇，一加平板真体验，对比小米平板7、荣耀平板V9、小新PadPro 12.7",
                              "author": "纸飞机Paperfly",
                              "play": 316703,
                              "date": "2025-04-04",
                              "url": "https://www.bilibili.com/video/BV1o9ZRYqEHT",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "发布半年，荣耀平板V9柔光版还香吗？",
                              "author": "大甲虫先生腿很多",
                              "play": 114229,
                              "date": "2025-09-20",
                              "url": "https://www.bilibili.com/video/BV1LiWLz7EyA",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "有话我直说！荣耀平板V9真实体验，6个缺点4个优点。",
                              "author": "小龙的科技生活",
                              "play": 66744,
                              "date": "2025-01-04",
                              "url": "https://www.bilibili.com/video/BV1cBrsYJEGj",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "刀法精准！同样配置的荣耀平板GT和荣耀平板V9该怎么选？",
                              "author": "一分钟的开箱",
                              "play": 41102,
                              "date": "2025-04-30",
                              "url": "https://www.bilibili.com/video/BV128GbzBEnc",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "荣耀平板GT和荣耀平板V9！有什么差别？哪一个更适合你",
                              "author": "林半仙数码",
                              "play": 13790,
                              "date": "2025-05-11",
                              "url": "https://www.bilibili.com/video/BV15kETzkEA4",
                              "compare": true
                        }
                  ]
            }
      ],
      "report": null
    },
    "xiaomi": {
      "products": [
            {
                  "name": "Xiaomi Pad 8 Pro",
                  "voices": [
                        {
                              "type": "video",
                              "title": "【大家测】首发体验 小米Pad 8 Pro柔光版开箱测试 | 11.2 英寸 3.2K屏幕 骁龙8至尊版",
                              "author": "大家测",
                              "play": 436499,
                              "date": "2025-09-19",
                              "url": "https://www.bilibili.com/video/BV1YBWVzMErv",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米平板8 Pro首发测评：终于有常规尺寸的安卓板皇了！不仅是平板更是一台PC游戏主机？",
                              "author": "WHYLAB",
                              "play": 396922,
                              "date": "2025-09-19",
                              "url": "https://www.bilibili.com/video/BV1MxWGztEAn",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Air般身材，Pro级实力！Xiaomi Pad 8 Pro上手体验",
                              "author": "花生説",
                              "play": 383384,
                              "date": "2025-09-19",
                              "url": "https://www.bilibili.com/video/BV1NTW3zDEGp",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【享拆】Xiaomi Pad 8 Pro 拆解：轻薄不减配！",
                              "author": "微机分WekiHome",
                              "play": 321952,
                              "date": "2025-09-19",
                              "url": "https://www.bilibili.com/video/BV16NW5zUEkW",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "原来小尺寸才是平板的正确答案？！小米Pad 8 Pro使用体验",
                              "author": "Winnie龟龟仔",
                              "play": 217610,
                              "date": "2025-09-23",
                              "url": "https://www.bilibili.com/video/BV1STJCzKEkm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "双十一学生党终极对比：2–3K买到Pro级体验，谁把预算变生产力",
                              "author": "Yo点高科技",
                              "play": 67246,
                              "date": "2025-11-07",
                              "url": "https://www.bilibili.com/video/BV1UW23BbEK2",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "2–3K闭眼选？双十一学生全能平板横评谁更稳",
                              "author": "极客玩家阿城",
                              "play": 50762,
                              "date": "2025-11-07",
                              "url": "https://www.bilibili.com/video/BV1PT2gBHEvn",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "【评说】小米Pad 8 Pro，骁龙8至尊+澎湃OS3正式版，表现怎样？",
                              "author": "评说",
                              "play": 28519,
                              "date": "2025-09-19",
                              "url": "https://www.bilibili.com/video/BV17mp4z1EgU",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "第一次搭载骁龙8至尊的小米平板： Xiaomi Pad 8 Pro 小米平板 小米平板8P.....",
                              "author": "fjenfkvke9",
                              "play": 1118,
                              "date": "2025-10-22",
                              "url": "https://www.bilibili.com/video/BV1i4sbz9EsK",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "作为忠实果粉的我，为啥会选择Xiaomi Pad 8 Pro小米Pad8Pro 11寸.....",
                              "author": "愛的自在法敢雅",
                              "play": 772,
                              "date": "2025-10-08",
                              "url": "https://www.bilibili.com/video/BV129HczDEK8",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【享拆】Xiaomi Pad 8 Pro 拆解：轻薄不减配！ 小米平板新成员，Xiaomi.....",
                              "author": "ftmbkx393997",
                              "play": 734,
                              "date": "2025-10-21",
                              "url": "https://www.bilibili.com/video/BV1NmWXzvEkx",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "新款Xiaomi Pad 8 Pro到底有哪些升级亮点！",
                              "author": "夜晚呦点甜",
                              "play": 556,
                              "date": "2025-10-05",
                              "url": "https://www.bilibili.com/video/BV12JnkzwEoL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【享拆】Xiaomi Pad 8 Pro 拆解：轻薄不减配！ 小米平板新成员，Xiaomi.....",
                              "author": "mmvpn1167739",
                              "play": 398,
                              "date": "2025-12-05",
                              "url": "https://www.bilibili.com/video/BV1722VBHESj",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 8 Pro 拆解：轻薄不减配！ 小米平板新成员，Xiaomi.....",
                              "author": "fjenfkvke9",
                              "play": 387,
                              "date": "2025-10-22",
                              "url": "https://www.bilibili.com/video/BV1i4sbz9EJ9",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 8 Pro上手测评！",
                              "author": "胖胖好物甄选",
                              "play": 120,
                              "date": "2025-10-22",
                              "url": "https://www.bilibili.com/video/BV14usbzTEHn",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米平板8 Pro平板电脑Xiaomi Pad 8 Pro 办公游戏平板小米pad8 pro 小米正品",
                              "author": "TAO精选测评",
                              "play": 40,
                              "date": "2025-12-21",
                              "url": "https://www.bilibili.com/video/BV1udqSBUEdW",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "自己真的喜欢的话，那就不需要在意别人的看法.xiaomi Pad 8 Pro",
                              "author": "蓝鲸不能堕落啦",
                              "play": 26,
                              "date": "2025-12-21",
                              "url": "https://www.bilibili.com/video/BV1zbq1BDEBf",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 8 Pro上手测评！",
                              "author": "大牛甄选",
                              "play": 25,
                              "date": "2025-10-08",
                              "url": "https://www.bilibili.com/video/BV1fJxdzTEyW",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "平板新选择丨Xiaomi Pad 8 Pro",
                              "author": "我丢啊i",
                              "play": 18,
                              "date": "2025-12-03",
                              "url": "https://www.bilibili.com/video/BV11QShBQEe4",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "第一次搭载骁龙8至尊的小米平板： Xiaomi Pad 8 Pro#小米平板#小米平板8Pro#安卓",
                              "author": "奶泡芙小铺",
                              "play": 18,
                              "date": "2025-10-07",
                              "url": "https://www.bilibili.com/video/BV14nxRzmEV3",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 8 Pro搭载高刷屏幕与高性能芯片，适合办公学习，续航持久，提升日常使用体验。",
                              "author": "大超真实测评",
                              "play": 7,
                              "date": "2025-11-18",
                              "url": "https://www.bilibili.com/video/BV1rsCrBbE6m",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米Xiaomi Pad 8 Pro，护眼模式长时间使",
                              "author": "涂好物分享2",
                              "play": 7,
                              "date": "2025-11-07",
                              "url": "https://www.bilibili.com/video/BV1bG2NBkEWC",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "第一次搭载骁龙8至尊的小米平板： Xiaomi Pad 8 Pro#小米平板#小米平板8Pro#安卓",
                              "author": "累累好物分享",
                              "play": 6,
                              "date": "2025-11-25",
                              "url": "https://www.bilibili.com/video/BV1rmUDBAEya",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "你们等的Xiaomi Pad 8 Pro 终于来了，它采用骁龙8至尊芯片，兼容PC版浏览器和3A游戏，影音娱乐都全能！#新品发布 #平板电脑 #小米 #小米17",
                              "author": "糖糖豆豆的好物",
                              "play": 6,
                              "date": "2025-10-02",
                              "url": "https://www.bilibili.com/video/BV1vJHPzrEr4",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad88Pro 沉浸式开箱#小米 #小米之家 #普宁 #pad8 #新品",
                              "author": "累累好物分享",
                              "play": 4,
                              "date": "2025-11-25",
                              "url": "https://www.bilibili.com/video/BV1rmUDBAEsZ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米Xiaomi Pad 8 Pro，超薄设计彰显时尚",
                              "author": "涂好物分享2",
                              "play": 4,
                              "date": "2025-11-07",
                              "url": "https://www.bilibili.com/video/BV1Lf2PBpEQG",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米新平板——Xiaomi Pad 7 Pro，轻薄机身搭配120Hz高刷屏，追剧办公更流畅；骁龙8 Gen2芯片性能强，多任务不卡顿，续航持久，支持快充，出差",
                              "author": "静怡分享好物",
                              "play": 3,
                              "date": "2025-11-24",
                              "url": "https://www.bilibili.com/video/BV1Y9UGByEaF",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 8Pro 小米平板8Pro 游戏 办公平板#平板电脑 #小米平板#",
                              "author": "啊博分享",
                              "play": 3,
                              "date": "2025-10-19",
                              "url": "https://www.bilibili.com/video/BV1XKsczeExn",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad88Pro 沉浸式开箱#小米 #小米之家 #普宁 #pad8 #新品",
                              "author": "啊博分享",
                              "play": 3,
                              "date": "2025-10-15",
                              "url": "https://www.bilibili.com/video/BV1Q24ezAEJ2",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米Xiaomi Pad 8 Pro，智能节电模式延长",
                              "author": "岳岳优选好物",
                              "play": 2,
                              "date": "2025-10-23",
                              "url": "https://www.bilibili.com/video/BV11LsYzmEmt",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 8 Pro上手测评！",
                              "author": "M_Brother",
                              "play": 2,
                              "date": "2025-10-18",
                              "url": "https://www.bilibili.com/video/BV1BxWpzTEVX",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad88Pro 沉浸式开箱#小米 #小米之家 #普宁 #pad8 #新品",
                              "author": "是柚屿呀啊",
                              "play": 2,
                              "date": "2025-10-15",
                              "url": "https://www.bilibili.com/video/BV1CT4zzNEp4",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【8+128】Xiaomi Pad 8 Pro 小米平板 8 Pro 游戏 办公小米平板8pro#小米pad8pro #数码产品 #平板电脑 #数码 #平板",
                              "author": "小冉95",
                              "play": 1,
                              "date": "2025-12-04",
                              "url": "https://www.bilibili.com/video/BV1Lb2YBvEMu",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米小家电官方旗舰店Xiaomi Pad 8 Pro",
                              "author": "KevinasQ",
                              "play": 1,
                              "date": "2025-11-08",
                              "url": "https://www.bilibili.com/video/BV1RQ1DBUEfw",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "便携生产力工具，Xiaomi Pad 8 Pro！",
                              "author": "清高好物推荐",
                              "play": 1,
                              "date": "2025-10-28",
                              "url": "https://www.bilibili.com/video/BV1PNyzBbEV1",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad88Pro 沉浸式开箱#小米 #小米之家 #普宁 #pad8 #新品",
                              "author": "小c好物分享",
                              "play": 0,
                              "date": "2025-11-02",
                              "url": "https://www.bilibili.com/video/BV1FKyZB6ETr",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米（MI） Xiaomi  Pad 8 Pro 平板电脑 年度旗舰新品 冰晶蓝 16GB+512GB 柔光版",
                              "author": "新新好物分享0001",
                              "play": 0,
                              "date": "2025-10-24",
                              "url": "https://www.bilibili.com/video/BV1CFsnzgEvm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米Xiaomi Pad 8 Pro，强大处理器应对复",
                              "author": "悠悠优选好物A",
                              "play": 0,
                              "date": "2025-10-23",
                              "url": "https://www.bilibili.com/video/BV15fsaz8EHG",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad88Pro 沉浸式开箱#小米 #小米之家 #普宁 #pad8 #新品",
                              "author": "累累好物分享",
                              "play": 0,
                              "date": "2025-10-18",
                              "url": "https://www.bilibili.com/video/BV1xdWszsEaQ",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "Xiaomi Pad 7 Ultra",
                  "voices": [
                        {
                              "type": "video",
                              "title": "浅谈小米Pad7 Ultra：小米平板都卖这么贵了？",
                              "author": "花生説",
                              "play": 674608,
                              "date": "2025-07-14",
                              "url": "https://www.bilibili.com/video/BV1PKuEzeEb1",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【享拆】小米 Pad 7 Ultra 拆解：旗舰安卓平板就该这么做～",
                              "author": "微机分WekiHome",
                              "play": 521588,
                              "date": "2025-05-23",
                              "url": "https://www.bilibili.com/video/BV1LNJ4zYEr7",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米Pad 7 Ultra全面测评：玄戒O1降频版啥体验？「白问」",
                              "author": "白问豆豆",
                              "play": 449570,
                              "date": "2025-05-23",
                              "url": "https://www.bilibili.com/video/BV1hHJHzjEeg",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【大家测】首款玄戒平板！5699元起售 超轻薄机身，超窄边框！Xiaomi Pad 7 Ultra 柔光版开箱快速体验",
                              "author": "大家测",
                              "play": 160611,
                              "date": "2025-05-23",
                              "url": "https://www.bilibili.com/video/BV1hDj7zFEis",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "搭载玄戒O1的小米平板7 ULtra首发开箱体验，真的不像一颗新芯片的表现！",
                              "author": "摄影师云飞",
                              "play": 144169,
                              "date": "2025-05-22",
                              "url": "https://www.bilibili.com/video/BV1igJHz9EyG",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "没有任何适配?小米Pad7Ultra两个月使用!实话实说...",
                              "author": "小猪隊长",
                              "play": 116393,
                              "date": "2025-07-30",
                              "url": "https://www.bilibili.com/video/BV14Qhwz5EPK",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "感受一下 Xiaomi Pad 7 Ultra 的 8 扬声器！",
                              "author": "凉心暖男賊",
                              "play": 37374,
                              "date": "2025-05-23",
                              "url": "https://www.bilibili.com/video/BV1mwJtzWEx1",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "适配不学 学上平板也用OLED了 小米Pad 7 Ultra频闪极速测试！",
                              "author": "全是干货的大胖鸽",
                              "play": 24492,
                              "date": "2025-05-28",
                              "url": "https://www.bilibili.com/video/BV1qVjvzEEAK",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Pad 7 Ultra 压力测试！吃鸡1080P+HDR高清+120+抗锯齿全部拉满榨干玄戒O1",
                              "author": "守晨星诉约",
                              "play": 23289,
                              "date": "2025-05-28",
                              "url": "https://www.bilibili.com/video/BV1LRjvznEjr",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "试试用小米Pad 7 Ultra串流",
                              "author": "某枣吖",
                              "play": 14759,
                              "date": "2025-05-23",
                              "url": "https://www.bilibili.com/video/BV13qjnziEA9",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "xiaomi Pad 7 Ultra 量产版顶配开箱",
                              "author": "创客薛源Chinaxueyuan",
                              "play": 9686,
                              "date": "2025-05-23",
                              "url": "https://www.bilibili.com/video/BV1aQjJzTEpM",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad Ultra｜云视听",
                              "author": "守晨星诉约",
                              "play": 9035,
                              "date": "2025-06-23",
                              "url": "https://www.bilibili.com/video/BV1d3KxzaEGR",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra云视听｜海阔天空",
                              "author": "守晨星诉约",
                              "play": 8560,
                              "date": "2025-07-12",
                              "url": "https://www.bilibili.com/video/BV1fPuGz6EfJ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米pad7 Ultra鸣潮高画质表现",
                              "author": "琴枫有话说",
                              "play": 7242,
                              "date": "2025-06-02",
                              "url": "https://www.bilibili.com/video/BV1SF7Sz7EWZ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米平板 xiaomi pad7 Ultra-目前平板最强素质扬声器",
                              "author": "非酋-zerotwo",
                              "play": 6682,
                              "date": "2025-05-24",
                              "url": "https://www.bilibili.com/video/BV1BqjbzBEgf",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra 和 iPad Pro对比开箱来啦~",
                              "author": "洪老狮",
                              "play": 6571,
                              "date": "2025-05-23",
                              "url": "https://www.bilibili.com/video/BV1CtjJzXE9Y",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "小米平板xiaomi pad7ultra，看视频体验，手机录屏",
                              "author": "小忆忆忆忆忆忆忆忆忆",
                              "play": 5748,
                              "date": "2025-07-27",
                              "url": "https://www.bilibili.com/video/BV1C88izYEQ6",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【小米】发布会完整版 2025.5.22「小米15周年战略新品发布会｜玄戒O1 XRING｜xiaomi YU7｜15S pro｜Pad7 Ultra」",
                              "author": "冰蓝色蛋挞",
                              "play": 3209,
                              "date": "2025-05-22",
                              "url": "https://www.bilibili.com/video/BV1CFJHzhEba",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "我的Xiaomi Pad 7 Ultra  12g+512g(标准版)玩无限暖暖开八音套大招100%闪退",
                              "author": "十二年一瞬间",
                              "play": 2929,
                              "date": "2025-05-28",
                              "url": "https://www.bilibili.com/video/BV1uXjBzJEFU",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra首发评测：小米的第一次都在这了",
                              "author": "锋潮评测",
                              "play": 2640,
                              "date": "2025-05-23",
                              "url": "https://www.bilibili.com/video/BV1sUjEznEsz",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "都说小米pad7u可以计算和配平方程式，谁说6sp不行了",
                              "author": "霜月琉依",
                              "play": 2557,
                              "date": "2025-05-25",
                              "url": "https://www.bilibili.com/video/BV1m2j3zBErW",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra云视听｜祝福",
                              "author": "守晨星诉约",
                              "play": 2188,
                              "date": "2025-09-30",
                              "url": "https://www.bilibili.com/video/BV1BqnyztEeL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi  Pad 7 Ultra｜云视听",
                              "author": "守晨星诉约",
                              "play": 2072,
                              "date": "2025-06-17",
                              "url": "https://www.bilibili.com/video/BV1SxNhzeEeP",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "XIAOMI Pad 7 Ultra | 生而强大",
                              "author": "SUNWHEEL光伦",
                              "play": 1848,
                              "date": "2025-06-13",
                              "url": "https://www.bilibili.com/video/BV17YMTzpEaK",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "罗小黑战记2鹿野回忆片尾纯音乐｜Xiaomi Pad 7 Ultra",
                              "author": "守晨星诉约",
                              "play": 1798,
                              "date": "2025-08-18",
                              "url": "https://www.bilibili.com/video/BV1zaYnzoEc7",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra首发评测！",
                              "author": "数码时代领航师",
                              "play": 1237,
                              "date": "2025-05-24",
                              "url": "https://www.bilibili.com/video/BV1WNjtzrEpm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra首发评测！",
                              "author": "新宇华天",
                              "play": 1097,
                              "date": "2025-05-24",
                              "url": "https://www.bilibili.com/video/BV1Eejbz6E84",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【小米发布会】小米15周年战略新品发布会！",
                              "author": "皮卡锤练习生",
                              "play": 910,
                              "date": "2025-05-22",
                              "url": "https://www.bilibili.com/video/BV1AoJnzeEeD",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "14英寸OLED大屏！ Xiaomi Pad 7 Ultra体验如何？",
                              "author": "凰家智车局",
                              "play": 909,
                              "date": "2025-05-27",
                              "url": "https://www.bilibili.com/video/BV1Bkj9z3Epe",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "感受一下 Xiaomi Pad 7 Ultra 的 8 扬声器！",
                              "author": "少女的英雄之梦",
                              "play": 709,
                              "date": "2025-05-24",
                              "url": "https://www.bilibili.com/video/BV1xRjsz6EYJ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra首发评测！",
                              "author": "手机控探索科技",
                              "play": 533,
                              "date": "2025-05-26",
                              "url": "https://www.bilibili.com/video/BV1Bsj1zDE3f",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米新品 Xiaomi Pad 7 Ultra 来啦~",
                              "author": "洪老狮",
                              "play": 494,
                              "date": "2025-05-22",
                              "url": "https://www.bilibili.com/video/BV1Q6Jnz5EYT",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra首发评测：小米的第一次都 Xiaomi Pad 7 U.....",
                              "author": "魔法少女退休生活",
                              "play": 362,
                              "date": "2025-06-12",
                              "url": "https://www.bilibili.com/video/BV1V4TfzsE8T",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra线下初探（配置速报）",
                              "author": "呆呆熊带你飞",
                              "play": 345,
                              "date": "2025-05-30",
                              "url": "https://www.bilibili.com/video/BV1oF7WzHEeb",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra办公娱乐全部打满，自研芯片加持更有OLED好屏",
                              "author": "科技Daily",
                              "play": 338,
                              "date": "2025-05-23",
                              "url": "https://www.bilibili.com/video/BV1EsjpzpEaD",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "换「芯」的 Xiaomi Pad 7 Ultra 真那么强？",
                              "author": "新宇华天",
                              "play": 318,
                              "date": "2025-05-24",
                              "url": "https://www.bilibili.com/video/BV1zijbzuETk",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra首发评测！",
                              "author": "科技领航梦想家",
                              "play": 311,
                              "date": "2025-10-13",
                              "url": "https://www.bilibili.com/video/BV1W741zXE5M",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米平板7 Ultra平板电脑 Xiaomi Pad 7 Ultra小米平板官旗新品玄戒",
                              "author": "TAO精选测评",
                              "play": 185,
                              "date": "2025-12-21",
                              "url": "https://www.bilibili.com/video/BV16jqDBNEQU",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米pad7ultra背板出现污渍，集中在左右两侧，也是我经常拿的地方，完全擦不掉",
                              "author": "快哄哄老子",
                              "play": 180,
                              "date": "2025-05-31",
                              "url": "https://www.bilibili.com/video/BV1e17WzDEr5",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "xiaomi pad 7 ultra，《生而强大见证》  安卓  ”板王“ 的诞生，雷军：碉堡了",
                              "author": "酥瑞思拜",
                              "play": 116,
                              "date": "2025-05-25",
                              "url": "https://www.bilibili.com/video/BV1cijMzUE6m",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米Xiaomi Pad7 Ultra悬浮键盘，黑色款适配平板，办公打字超顺手",
                              "author": "婧初的好物笔记",
                              "play": 76,
                              "date": "2025-08-30",
                              "url": "https://www.bilibili.com/video/BV1EFhYznEsp",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra上手实测✅生产力神器 💥谁说平板只能追剧？Xiaomi Pad",
                              "author": "阿童木分享好物",
                              "play": 32,
                              "date": "2025-10-15",
                              "url": "https://www.bilibili.com/video/BV1Q24ezAELz",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra首发评测",
                              "author": "必购",
                              "play": 16,
                              "date": "2025-10-25",
                              "url": "https://www.bilibili.com/video/BV1fYsWz5EHc",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7 Ultra",
                              "author": "75830454023_bili",
                              "play": 10,
                              "date": "2025-08-11",
                              "url": "https://www.bilibili.com/video/BV1S2tSzGEEJ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "平板界的全能选手！Xiaomi Pad 7 Ultra",
                              "author": "小云朵的百宝箱",
                              "play": 7,
                              "date": "2025-09-21",
                              "url": "https://www.bilibili.com/video/BV13sWAzTEjw",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "Xiaomi Pad 7S Pro",
                  "voices": [
                        {
                              "type": "video",
                              "title": "【享拆】小米平板 7S Pro 12.5 拆解：壁垒正在逐步形成～",
                              "author": "微机分WekiHome",
                              "play": 298303,
                              "date": "2025-06-19",
                              "url": "https://www.bilibili.com/video/BV1mvNHziEo4",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【大家测】Xiaomi Pad 7S Pro 12.5开箱测试 | 搭载玄戒O1芯片 主打轻薄体验 3.2K LCD屏幕",
                              "author": "大家测",
                              "play": 264526,
                              "date": "2025-06-19",
                              "url": "https://www.bilibili.com/video/BV1nwNJzHEzy",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【评说】小米Pad 7S Pro，LCD+玄戒O1的大平板怎样？",
                              "author": "评说",
                              "play": 68640,
                              "date": "2025-06-19",
                              "url": "https://www.bilibili.com/video/BV156Nnz5EzT",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米平板 7S Pro 真实体验：媲美超大杯？",
                              "author": "科技小辛",
                              "play": 40245,
                              "date": "2025-06-19",
                              "url": "https://www.bilibili.com/video/BV16nNEzJEd6",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米 Xiaomi Pad 7S Pro~沉浸式开箱&amp;游戏实测～",
                              "author": "BOXLITE-X",
                              "play": 32266,
                              "date": "2025-06-28",
                              "url": "https://www.bilibili.com/video/BV1soKmz3E3w",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米 Pad 7S Pro 上手体验！ 自研的好处这不就来了！",
                              "author": "数码热评站",
                              "play": 21637,
                              "date": "2025-08-01",
                              "url": "https://www.bilibili.com/video/BV1r8h7zyEcB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "「邦尼評測」扯！小米平板 7！大升級，價格還超香？Xiaomi Pad 7 Pro 開箱評測（3.2K 144Hz、台積電 8s Gen 3 奈米柔光螢幕 Xi",
                              "author": "邦尼幫你",
                              "play": 16984,
                              "date": "2025-05-09",
                              "url": "https://www.bilibili.com/video/BV1S955zCEZT",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi小米Pad 7S Pro 12.5充电评测：120W快充搭配10610mAh大电池，24分钟可充电50%",
                              "author": "充电头网评测室",
                              "play": 9424,
                              "date": "2025-07-18",
                              "url": "https://www.bilibili.com/video/BV1e9uyz4EJr",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "xiaomi pad 7uitra所搭载的玄戒O1或为残血版",
                              "author": "云语y",
                              "play": 7932,
                              "date": "2025-05-20",
                              "url": "https://www.bilibili.com/video/BV1zHJ8zEEd5",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7S Pro沉浸式开箱游戏实测",
                              "author": "尊贵的5位QQ用户",
                              "play": 2468,
                              "date": "2025-06-29",
                              "url": "https://www.bilibili.com/video/BV1GSgZzhEQh",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米 Xiaomi Pad 7S Pro沉浸式开箱 ！",
                              "author": "江湖浪客寻梦者",
                              "play": 1440,
                              "date": "2025-07-23",
                              "url": "https://www.bilibili.com/video/BV1sc8cziEFX",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "替掉iPad承接好体验，Xiaomi Pad 7S Pro当真超能干？",
                              "author": "科技Daily",
                              "play": 1325,
                              "date": "2025-06-19",
                              "url": "https://www.bilibili.com/video/BV1kyNdztEnq",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "GRID Legends &amp; Xiaomi Pad 7s Pro 画质修改实测",
                              "author": "II555",
                              "play": 402,
                              "date": "2025-08-01",
                              "url": "https://www.bilibili.com/video/BV1tH8mzBExE",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【多地国补】Xiaomi Pad 7S Pro 办公 娱乐 学习平板#小米pad7spro #数码产品 #平板电脑 #数码 #手机数码",
                              "author": "大文好物推荐",
                              "play": 201,
                              "date": "2025-12-05",
                              "url": "https://www.bilibili.com/video/BV1LX2VBEEfK",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7S Pro 12.5小米平板7S Pro平板电脑小米平板",
                              "author": "TAO精选测评",
                              "play": 27,
                              "date": "2025-12-21",
                              "url": "https://www.bilibili.com/video/BV1tcqDBLEvQ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Xiaomi Pad 7S Pro震撼登场，新一代平板引领潮",
                              "author": "星空泥石流",
                              "play": 3,
                              "date": "2025-09-04",
                              "url": "https://www.bilibili.com/video/BV1VbaSzbEqg",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【多地国补】Xiaomi Pad 7S Pro 办公 娱乐 学习平板#小米pad7spro #手机数码 #数码产品 #平板电脑 #平板",
                              "author": "小冉95",
                              "play": 0,
                              "date": "2025-12-06",
                              "url": "https://www.bilibili.com/video/BV1ro2HB2EQc",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "REDMI Pad 2 Pro",
                  "voices": [
                        {
                              "type": "video",
                              "title": "【大家测】入门平板 REDMI Pad 2 Pro开箱体验 | 12000mAh巨无霸电池",
                              "author": "大家测",
                              "play": 178017,
                              "date": "2026-01-29",
                              "url": "https://www.bilibili.com/video/BV1HW6FBMERy",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "红米REDMI Pad 2 Pro千元平板离谱苹果Mac配件",
                              "author": "老张是大佬",
                              "play": 87623,
                              "date": "2026-01-29",
                              "url": "https://www.bilibili.com/video/BV1cA6MBREaA",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "苹果用户：冲我来的？千元平板 红米REDMI Pad 2 Pro体验",
                              "author": "刘钚冷",
                              "play": 30479,
                              "date": "2026-03-13",
                              "url": "https://www.bilibili.com/video/BV1JGcQzFEbp",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "REDMI Pad 2 Pro平板电脑的优缺点解析， 红米Pad 2 Pro平板电脑怎么样，小米REDMI Pad 2 Pro平板值不值得买？",
                              "author": "梦之长安",
                              "play": 23645,
                              "date": "2026-01-31",
                              "url": "https://www.bilibili.com/video/BV1CE6nBwExA",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "红米 Pad 2 Pro 简单开箱",
                              "author": "小王搞机v",
                              "play": 16700,
                              "date": "2026-01-31",
                              "url": "https://www.bilibili.com/video/BV1gg61ByEKg",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "千元档学习神器！REDMI Pad 2 Pro真实体验",
                              "author": "科技小辛",
                              "play": 10757,
                              "date": "2026-01-29",
                              "url": "https://www.bilibili.com/video/BV1z2zfBYEZR",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "重度游戏我选红米k Pad2",
                              "author": "热爱数码的小魏w",
                              "play": 1813,
                              "date": "2026-07-28",
                              "url": "https://www.bilibili.com/video/BV1wr3F6vEfn",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "关于红米Pad2pro的热门问题，这个视频全包括了#红米pad2pro #REDMI#新年货新年价",
                              "author": "壤鸵不谛Vu7",
                              "play": 386,
                              "date": "2026-07-21",
                              "url": "https://www.bilibili.com/video/BV1pNKx64EMv",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "红米Pad Pro骁龙7SGEN2 16+256运行变形金刚:塞博坦陨落",
                              "author": "晓齐R",
                              "play": 164,
                              "date": "2026-08-06",
                              "url": "https://www.bilibili.com/video/BV14uun6FEbm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "米米 8Gen2 设备一键解锁工具！使用 Xiaomi Pad 6S Pro 演示",
                              "author": "岚天呀",
                              "play": 113,
                              "date": "2026-08-12",
                              "url": "https://www.bilibili.com/video/BV1NLuC6sEiS",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "REDMI pad 2 pro全网最快沉浸开箱#REDMIpad2pro #小米 #红米 #pad",
                              "author": "库里波救我O",
                              "play": 52,
                              "date": "2026-08-05",
                              "url": "https://www.bilibili.com/video/BV1a1Mz6WEsk",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米 Redmi Pad 2 Pro 平板电脑 8GB+256GB 银色",
                              "author": "数码小桃",
                              "play": 12,
                              "date": "2026-08-07",
                              "url": "https://www.bilibili.com/video/BV1n3ux6PEYp",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【新品上市】REDMI Pad 2 Pro 12.1英寸 2.5K 学习 娱乐 红米平板",
                              "author": "腥孤嗽秘Xm9",
                              "play": 4,
                              "date": "2026-08-10",
                              "url": "https://www.bilibili.com/video/BV1YouQ6tEFX",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米 Redmi Pad 2 Pro 平板电脑 8GB+256GB 银色",
                              "author": "数码小希",
                              "play": 4,
                              "date": "2026-08-02",
                              "url": "https://www.bilibili.com/video/BV1XZ3X6eEus",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "Xiaomi Pad 8",
                  "voices": [
                        {
                              "type": "video",
                              "title": "小米Pad 8 让我想起了一位故人！",
                              "author": "我是HYK",
                              "play": 168405,
                              "date": "2025-09-19",
                              "url": "https://www.bilibili.com/video/BV1uyW3zxEyE",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米平板8上手测评：性能大升级，值得买吗？",
                              "author": "且听Phone吟",
                              "play": 63734,
                              "date": "2025-09-19",
                              "url": "https://www.bilibili.com/video/BV1otW3zKEUv",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米 Pad 8～沉浸式开箱&amp;游戏实测～",
                              "author": "BOXLITE-X",
                              "play": 39951,
                              "date": "2025-09-27",
                              "url": "https://www.bilibili.com/video/BV1jBnJzDEDZ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米Pad 8体验分享 出厂就是Xiaomi HyperOS 3",
                              "author": "瓦力评测",
                              "play": 33553,
                              "date": "2025-09-19",
                              "url": "https://www.bilibili.com/video/BV1UUWVz8Ej3",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米平板8和小米平板7 Pro怎么选？小米新款平板值不值得入手，参数对比",
                              "author": "奉仙数码",
                              "play": 21519,
                              "date": "2025-09-29",
                              "url": "https://www.bilibili.com/video/BV1WanqzUEoW",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "小米平板8选标准版还是Pro？看完秒懂，别花冤枉钱！",
                              "author": "时空操控师的你",
                              "play": 17016,
                              "date": "2025-10-27",
                              "url": "https://www.bilibili.com/video/BV19ms2zPELj",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "小米平板8标准版真实体验，值得买吗？",
                              "author": "电器科技点亮未来",
                              "play": 9567,
                              "date": "2025-11-05",
                              "url": "https://www.bilibili.com/video/BV1u61sBwEsH",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米平板Pad8 优点和缺点解读，小米平板8 怎么样，适合哪些人群，小米Pad8 值得入手吗？",
                              "author": "叁哥说",
                              "play": 9155,
                              "date": "2025-09-30",
                              "url": "https://www.bilibili.com/video/BV11Sn1zuEx8",
                              "compare": true
                        }
                  ]
            },
            {
                  "name": "REDMI K Pad",
                  "voices": [
                        {
                              "type": "video",
                              "title": "红米K Pad &amp; K80 至尊版上手体验：天玑9400+小平板和大手机表现如何？",
                              "author": "极客湾Geekerwan",
                              "play": 1229596,
                              "date": "2025-06-19",
                              "url": "https://www.bilibili.com/video/BV1iwN4zeEUo",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【大家测】iPad mini平替？REDMI K Pad 小平板开箱体验 | 双C口扩展多玩法 3K LCD屏幕+165Hz刷新率 旗舰天玑9400+处理器",
                              "author": "大家测",
                              "play": 593138,
                              "date": "2025-06-19",
                              "url": "https://www.bilibili.com/video/BV1ToNpz3EH3",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【享拆】REDMI K Pad 拆解：一次性牙膏挤爆？",
                              "author": "微机分WekiHome",
                              "play": 561378,
                              "date": "2025-06-19",
                              "url": "https://www.bilibili.com/video/BV1YSNsz9EyL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "红米首个小平板K Pad，真的适合打游戏吗？",
                              "author": "穷评",
                              "play": 284447,
                              "date": "2025-07-05",
                              "url": "https://www.bilibili.com/video/BV1ya3RzgERG",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【云飞首发】REDMI K Pad 详细测评，红米小屏旗舰平板能打过iPad mini 吗？",
                              "author": "摄影师云飞",
                              "play": 273737,
                              "date": "2025-06-19",
                              "url": "https://www.bilibili.com/video/BV1fZNxzTE1h",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "暴打iPad mini？REDMI K Pad到底有多强",
                              "author": "科技小辛",
                              "play": 190267,
                              "date": "2025-06-19",
                              "url": "https://www.bilibili.com/video/BV1eQN7zuEzH",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "到底谁狂暴？红米 K Pad 评测 vs iPad mini 7、Y700 四代 | 大米评测",
                              "author": "大米评测",
                              "play": 186873,
                              "date": "2025-07-26",
                              "url": "https://www.bilibili.com/video/BV1wi84zBEs3",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "红米 K Pad游戏测试来啦，快来看看玩吃鸡能稳定流畅120帧呗？",
                              "author": "喂驴来了",
                              "play": 138977,
                              "date": "2025-06-28",
                              "url": "https://www.bilibili.com/video/BV1noK1zYEoE",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "REDMI K Pad深度体验：KO我们自己",
                              "author": "机太美JTM",
                              "play": 137331,
                              "date": "2025-10-01",
                              "url": "https://www.bilibili.com/video/BV1d3HpzfEoa",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "REDMI Pad 2",
                  "voices": [
                        {
                              "type": "video",
                              "title": "【大家测】999元起售 REDMI Pad 2开箱体验 学习机市场的新成员 做你的学习好搭子",
                              "author": "大家测",
                              "play": 91705,
                              "date": "2025-08-22",
                              "url": "https://www.bilibili.com/video/BV13jYfzpEQ4",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "REDMI Pad 2~沉浸式开箱&amp;游戏实测～",
                              "author": "BOXLITE-X",
                              "play": 50862,
                              "date": "2025-08-07",
                              "url": "https://www.bilibili.com/video/BV1TgtBzMExn",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小米REDMI Pad 2平板电脑优点与缺点介绍，REDMIPad2怎么样，红米平板2值得入手吗？",
                              "author": "小新侃数码",
                              "play": 26674,
                              "date": "2025-08-01",
                              "url": "https://www.bilibili.com/video/BV176hJz1EsL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Redmi Pad 2 评测",
                              "author": "老实人们在搬运",
                              "play": 17791,
                              "date": "2025-06-28",
                              "url": "https://www.bilibili.com/video/BV1R2KyznEfQ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "红米REDMI Pad 2好不好用？配置如何？优缺点+入手建议！",
                              "author": "大C评测",
                              "play": 12813,
                              "date": "2025-08-08",
                              "url": "https://www.bilibili.com/video/BV135t2zqECG",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "Redmi Pad 2正式开售！999元性价比天花板？简单聊一下！",
                              "author": "白鹭说数码",
                              "play": 12776,
                              "date": "2025-08-15",
                              "url": "https://www.bilibili.com/video/BV13KbxzjEbx",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "红米REDMI Pad 2优缺点评测，REDMIPad2怎么样，红米平板2值得入手吗？",
                              "author": "大白讲数码",
                              "play": 8231,
                              "date": "2025-08-01",
                              "url": "https://www.bilibili.com/video/BV1r8h7zyE3n",
                              "compare": false
                        }
                  ]
            }
      ],
      "report": null
    },
    "oppo": {
      "products": [
            {
                  "name": "OPPO Pad 5 Pro",
                  "voices": [
                        {
                              "type": "video",
                              "title": "大平板是工作，小平板是生活！OPPO Pad Mini &amp; OPPO Pad 5 Pro首发体验",
                              "author": "大狸子切切里",
                              "play": 2162996,
                              "date": "2026-04-16",
                              "url": "https://www.bilibili.com/video/BV1hQdhB5EKa",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "「小白」OPPO Pad 5 Pro&amp;Pad Mini全面测评：娱乐办公全都要！",
                              "author": "小白测评",
                              "play": 2036787,
                              "date": "2026-04-16",
                              "url": "https://www.bilibili.com/video/BV15CdhBSEn2",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO 平板最新出的 OPPO Pad 6 、OPPO Pad5 Pro、OPPO Pad Mini ，学习/办公/娱乐，哪款更适合你？",
                              "author": "神奇的冯不悔",
                              "play": 165240,
                              "date": "2026-05-27",
                              "url": "https://www.bilibili.com/video/BV1ZHG26oEsh",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "一台平板的生产力竟和PC旗鼓相当？OPPO Pad 5 Pro使用体验分享",
                              "author": "玩机体验派",
                              "play": 151313,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV1dTub6YEwu",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "太离谱了⚡现在的大世界游戏 这么逆天了？",
                              "author": "你好呀桃生",
                              "play": 127516,
                              "date": "2026-08-02",
                              "url": "https://www.bilibili.com/video/BV1KY3R6bEu7",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【7月平板推荐】暑假选机必看！800-5000元全价位指南，中高考毕业生专属",
                              "author": "科技风暴X",
                              "play": 107888,
                              "date": "2026-07-08",
                              "url": "https://www.bilibili.com/video/BV1BKM367ENL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO平板 学生党+打工人 选购指南！OPPO Pad Mini &amp; Pad 5 Pro &amp; Pad 6",
                              "author": "无双评测_Charles",
                              "play": 85641,
                              "date": "2026-06-16",
                              "url": "https://www.bilibili.com/video/BV1JmjG62EUW",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "再见了，所有的空月之歌！挪德卡莱一整年的革新内容评价，由夯到拉！哪个是你的最爱？",
                              "author": "多洛塔塔",
                              "play": 69814,
                              "date": "2026-08-11",
                              "url": "https://www.bilibili.com/video/BV1gvuq67EKq",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "7.0卡池抽取+原石规划！奥黛塔值得抽吗？免费命座怎么选？后续原石福利全汇总",
                              "author": "绝云丘丘",
                              "play": 69676,
                              "date": "2026-08-10",
                              "url": "https://www.bilibili.com/video/BV1eruR6KEtQ",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "【大家测】PC级平板 OPPO Pad 5 Pro开箱测试 | 13.2英寸3.4K LCD屏幕 13380mAh超大电池",
                              "author": "大家测",
                              "play": 68471,
                              "date": "2026-04-20",
                              "url": "https://www.bilibili.com/video/BV1XPoNB5Edx",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "安卓板皇OPPO Pad5 Pro上手体验！办公娱乐我都要！",
                              "author": "小J体验馆",
                              "play": 51371,
                              "date": "2026-07-22",
                              "url": "https://www.bilibili.com/video/BV1yigz67Ekx",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "专业生产力！OPPO Pad 5 Pro深度体验：绝不是大号手机！",
                              "author": "克里体验",
                              "play": 44709,
                              "date": "2026-04-27",
                              "url": "https://www.bilibili.com/video/BV1qworBHEhL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 5 Pro 一次索然无味的迭代",
                              "author": "感觉测评_Zooe",
                              "play": 36357,
                              "date": "2026-04-22",
                              "url": "https://www.bilibili.com/video/BV1g4opBWEV5",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "一个平板三种形态？是平板也是电脑，还是扩展屏！",
                              "author": "熊小白玩数码",
                              "play": 25968,
                              "date": "2026-07-17",
                              "url": "https://www.bilibili.com/video/BV11uKn6EE73",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "把平板当电脑用！PC级办公+游戏，到底靠谱吗？",
                              "author": "熊小白玩数码",
                              "play": 8926,
                              "date": "2026-07-03",
                              "url": "https://www.bilibili.com/video/BV1DBT462ESq",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 5 Pro使用体验",
                              "author": "搞机Ultra",
                              "play": 8224,
                              "date": "2026-06-01",
                              "url": "https://www.bilibili.com/video/BV121VR6TEvw",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "夏天玩游戏OPPO Pad 5 Pro散热扛不扛得住？",
                              "author": "小城测评",
                              "play": 2395,
                              "date": "2026-07-17",
                              "url": "https://www.bilibili.com/video/BV1nLNd6MEno",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "联想拯救者Y700五代改oppoPad5pro系统，和平精英游戏帧率表现如何？  联想拯救.....",
                              "author": "xjuriq51941",
                              "play": 1750,
                              "date": "2026-07-08",
                              "url": "https://www.bilibili.com/video/BV1JrMe6QE7u",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "盘点2000价位最强平板，详细对比参数情况，看看哪款最值得入手 #荣耀magicpad3 #小米平板8 #荣耀平板gt2pro #oppopad5",
                              "author": "不知名小果数码版",
                              "play": 1623,
                              "date": "2026-07-03",
                              "url": "https://www.bilibili.com/video/BV1jTTt6oErh",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "OPPOpad5Pro第五人格实战表现第五代骁龙8至尊",
                              "author": "那里啊了吧",
                              "play": 1343,
                              "date": "2026-07-10",
                              "url": "https://www.bilibili.com/video/BV1AkN76KEx5",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "2026安卓旗舰平板能扛起轻中度办公了吗？ OPPO Pad 5 Pro自用2个月体验",
                              "author": "黑氪的科技圈",
                              "play": 1295,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1kxgb65EWS",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "最流畅的安卓平板是它？我们对比了三台超大平板#平板#oppo#oppopad5pro#性能-7629654955741302054 (1)",
                              "author": "ifjvcoowqcmg",
                              "play": 1268,
                              "date": "2026-07-31",
                              "url": "https://www.bilibili.com/video/BV1YXGw6ZEF9",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "3.5鸣潮实测OPPO Pad5 Pro骁龙八E5（卡顿并且发热）",
                              "author": "那里啊了吧",
                              "play": 1221,
                              "date": "2026-07-20",
                              "url": "https://www.bilibili.com/video/BV1d4KC6NEDn",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "拿到 OPPO Pad 5 Pro 了！是不是有点太丝滑了 #oppo #平板 #oppopad5pro #生产力",
                              "author": "giyrjc543027",
                              "play": 1196,
                              "date": "2026-07-09",
                              "url": "https://www.bilibili.com/video/BV1aCM56UEwz",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "深度体验一个月的OPPO Pad5 Pro，不愧是安卓版皇",
                              "author": "小俞数码",
                              "play": 991,
                              "date": "2026-07-18",
                              "url": "https://www.bilibili.com/video/BV1HsKw6xE7E",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "写稿、剪片、改PPT，OPPO Pad 5 Pro不开电脑也可以办公了",
                              "author": "小城测评",
                              "play": 921,
                              "date": "2026-07-28",
                              "url": "https://www.bilibili.com/video/BV1nY3q6iEhT",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 5 Pro游戏必调设置！体验直接翻倍",
                              "author": "九五科技",
                              "play": 841,
                              "date": "2026-07-25",
                              "url": "https://www.bilibili.com/video/BV1Xj3u6kExw",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 5 Pro大屏 &amp; Pad Mini小屏，该怎么选？各有侧重点，看完你就懂了",
                              "author": "康pad",
                              "play": 770,
                              "date": "2026-07-11",
                              "url": "https://www.bilibili.com/video/BV1VMNw6GE73",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "实话实说！主打游戏追剧，OPPO Pad 5 Pro体验到底咋样？",
                              "author": "小黄同学一",
                              "play": 757,
                              "date": "2026-07-31",
                              "url": "https://www.bilibili.com/video/BV12N3h68Eqr",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "一个视频告诉你OPPOPad5和Pad4Pro该怎么选？#oppopad5#oppo平板#oppo双十一省心狂补节#孙颖莎同款OPPO平板#平板电脑-75625",
                              "author": "v58230801",
                              "play": 749,
                              "date": "2026-07-16",
                              "url": "https://www.bilibili.com/video/BV17CKM6qEH7",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "一个视频告诉你OPPOPad5和Pad4Pro该怎么选？#oppopad5#oppo平板#oppo双十一省心狂补节#孙颖莎同款OPPO平板#平板电脑-75625",
                              "author": "潞钥拷品Sz4",
                              "play": 627,
                              "date": "2026-08-04",
                              "url": "https://www.bilibili.com/video/BV1W6uc6TEmM",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "一个视频告诉你OPPOPad5和Pad4Pro该怎么选？#oppopad5#oppo平板#oppo双十一省心狂补节#孙颖莎同款OPPO平板#平板电脑-75625",
                              "author": "岗榷百堂Uc7",
                              "play": 622,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1dcgh6uEub",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "选的省，也要选的准，准大学生暑期平板选购指南",
                              "author": "黑氪的科技圈",
                              "play": 587,
                              "date": "2026-07-14",
                              "url": "https://www.bilibili.com/video/BV1AFNb6eE96",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 5 Pro游戏表现如何？重负载硬核实测来了",
                              "author": "小孟科技",
                              "play": 575,
                              "date": "2026-07-09",
                              "url": "https://www.bilibili.com/video/BV1h2Mj6sEAP",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "一条视频讲清楚OPPO三款新平板到底怎么选择",
                              "author": "小希聊数码",
                              "play": 544,
                              "date": "2026-07-28",
                              "url": "https://www.bilibili.com/video/BV1Rn3i69E2z",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 3 Pro外屏爆裂能不能更换显示触摸完好就可以",
                              "author": "志毅数码",
                              "play": 510,
                              "date": "2026-07-20",
                              "url": "https://www.bilibili.com/video/BV1GcKm6zEzU",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPOpad5Pro精美1.0渔女实战",
                              "author": "那里啊了吧",
                              "play": 496,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1jMgU6tEf7",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 5 Pro点评大反馈，说真心话",
                              "author": "春花时雨",
                              "play": 444,
                              "date": "2026-07-04",
                              "url": "https://www.bilibili.com/video/BV1nTMP6YEFN",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 5 Pro这几个隐藏游戏小技巧一定不要错过",
                              "author": "小俞数码",
                              "play": 421,
                              "date": "2026-07-23",
                              "url": "https://www.bilibili.com/video/BV1QKgQ6sEgY",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 6、Pad 5Pro、Mini,这三款OPPO大小平板到底怎么选？",
                              "author": "觅光数码",
                              "play": 416,
                              "date": "2026-08-01",
                              "url": "https://www.bilibili.com/video/BV1zQGg6hEaR",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "OPPO这两款平板该怎么选？ OPPOPad6  OPPOPad5Pro  OPPO40瓦散热器",
                              "author": "vbkgkl81243",
                              "play": 387,
                              "date": "2026-07-14",
                              "url": "https://www.bilibili.com/video/BV18DNX6mE2Y",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "拥有类PC级生产力的OPPO Pad 5 Pro究竟怎么样？我来带大家体验一下！",
                              "author": "青水数码",
                              "play": 309,
                              "date": "2026-07-31",
                              "url": "https://www.bilibili.com/video/BV1v9GK6CEXw",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "用OPPO Pad 5 Pro已经大半个月没开电脑了，它到底凭啥让我笔记本吃灰？",
                              "author": "小黄同学一",
                              "play": 243,
                              "date": "2026-07-31",
                              "url": "https://www.bilibili.com/video/BV1xN3h68EZB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "自用三个月，OPPO Pad 5Pro说点真心话！",
                              "author": "许小姐驾到",
                              "play": 175,
                              "date": "2026-07-20",
                              "url": "https://www.bilibili.com/video/BV1obKp6VE1C",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "2025年三款闭眼入平板推荐！#oppo#oppopad5#小米pad8pro#vivopad5Pro-7579564647594954036",
                              "author": "大V他让他",
                              "play": 174,
                              "date": "2026-08-11",
                              "url": "https://www.bilibili.com/video/BV1youa6dECy",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【Phigros测试】OPPO Pad5 Pro",
                              "author": "竹子Bamboo11",
                              "play": 168,
                              "date": "2026-07-31",
                              "url": "https://www.bilibili.com/video/BV1DZGP6AEQ6",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO大平板和小平板就这么选准没错！",
                              "author": "小希聊数码",
                              "play": 144,
                              "date": "2026-07-13",
                              "url": "https://www.bilibili.com/video/BV14CNy6JEVL",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "深度体验OPPO Pad 5 Pro，最贴合PC平替的安卓大屏平板",
                              "author": "小黄同学一",
                              "play": 131,
                              "date": "2026-07-31",
                              "url": "https://www.bilibili.com/video/BV1yu3h6oEQW",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【35980147】最新视频上线，求关注！",
                              "author": "35980147",
                              "play": 130,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV1ihuu6LEyT",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "289块钱的OPPO Pad 5 Pro，自从摆在书桌上以后，我宅家的时长明显增加了----ETEWTGERTGRDYGHDTY",
                              "author": "bili_97161629",
                              "play": 101,
                              "date": "2026-07-16",
                              "url": "https://www.bilibili.com/video/BV13AKV63EbD",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad Mini &amp; OPPO Pad 5 Pro 体验：安卓板皇双子星，选大选小？#oppopad5pro #oppopadmini #抖音精选 #",
                              "author": "寄海w",
                              "play": 40,
                              "date": "2026-07-07",
                              "url": "https://www.bilibili.com/video/BV1VyMt6xEgB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad Mini &amp; OPPO Pad 5 Pro 体验：安卓板皇双子星，选大选小？#oppopad5pro #oppopadmini #抖音精选 #",
                              "author": "嘉柚好物推荐",
                              "play": 32,
                              "date": "2026-08-10",
                              "url": "https://www.bilibili.com/video/BV13euD6sEXi",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "即是生产力工具，又是娱乐神器，OPPO Pad 5 Pro就是一台全能旗舰平板",
                              "author": "库里波救我O",
                              "play": 30,
                              "date": "2026-08-10",
                              "url": "https://www.bilibili.com/video/BV1HguU6AEVy",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "平板也能有PC端体验，就选OPPO Pad 5 Pro。#oppopad5pro 新代#coloros16",
                              "author": "沈国LGD",
                              "play": 19,
                              "date": "2026-08-12",
                              "url": "https://www.bilibili.com/video/BV1juuk6zEPB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 5 Pro测评 1156073175",
                              "author": "小莫测评分享江江真",
                              "play": 16,
                              "date": "2026-07-02",
                              "url": "https://www.bilibili.com/video/BV1u2T76nEpx",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad Mini &amp; Pad 5 Pro首发体验 盼了好久的绿厂小平板终于出来了，体验到底怎么样？大平板加上悬浮键盘，更有内味了。#科技 #OPPOP",
                              "author": "逞贸妊蹿Dh6",
                              "play": 10,
                              "date": "2026-08-12",
                              "url": "https://www.bilibili.com/video/BV17Kuk6rEbA",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "轻办公首选！OPPO Pad 5 Pro真实使用感受分享",
                              "author": "即嫉睬蓝En0",
                              "play": 8,
                              "date": "2026-08-07",
                              "url": "https://www.bilibili.com/video/BV19xux6XErP",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "平板能代替笔记本吗？OPPO Pad 5 Pro体验实测 打工人轻办公，平板能代替笔记本吗？OPPO Pad 5 Pro深度实测#oppopad5pro #OP",
                              "author": "即嫉睬蓝En0",
                              "play": 7,
                              "date": "2026-08-07",
                              "url": "https://www.bilibili.com/video/BV1Rxux6XEBb",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 5 Pro体验：5点创作变化和不足之处",
                              "author": "风禾好物推荐",
                              "play": 2,
                              "date": "2026-08-06",
                              "url": "https://www.bilibili.com/video/BV1mxuJ6bEbS",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "OPPO Pad Mini",
                  "voices": [
                        {
                              "type": "video",
                              "title": "OPPO Pad Mini，想去哪就去哪！",
                              "author": "妮可厅长",
                              "play": 1443696,
                              "date": "2026-04-16",
                              "url": "https://www.bilibili.com/video/BV1mjdhBMEd5",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "完蛋，我被小平板绑架了！OPPO Pad Mini 深度体验",
                              "author": "搞机所",
                              "play": 304932,
                              "date": "2026-05-15",
                              "url": "https://www.bilibili.com/video/BV1jB5v6NEzb",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "小平板该怎么选？华为 MatePad Mini、OPPO Pad Mini、红米 K Pad 2 选购建议",
                              "author": "请不要叫我测评君",
                              "play": 212574,
                              "date": "2026-07-29",
                              "url": "https://www.bilibili.com/video/BV1DH3C6TEzo",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "【大家测】小平板OPPO Pad Mini开箱体验对比市面热门小平板 | 单手握持 144Hz刷新率 完爆隔壁友商？",
                              "author": "大家测",
                              "play": 210802,
                              "date": "2026-04-16",
                              "url": "https://www.bilibili.com/video/BV1YwdhBUEDq",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad Mini游戏测试来啦，玩吃鸡能稳定流畅144帧吗",
                              "author": "喂驴来了",
                              "play": 194051,
                              "date": "2026-05-03",
                              "url": "https://www.bilibili.com/video/BV1deRFBhEvu",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "「买前必看」OPPOPadMini一个月深度使用体验|对比华为mini|购买建议",
                              "author": "随意评测",
                              "play": 143266,
                              "date": "2026-06-07",
                              "url": "https://www.bilibili.com/video/BV14gEH6DEP2",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "安卓小平板大战！OPPO Pad mini  vs  红米 K Pad 2  | 大米评测",
                              "author": "大米评测",
                              "play": 96555,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV15nuG6SEdB",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "两款OPPO Pad测评 Pro VS Mini怎么选？",
                              "author": "小控sync",
                              "play": 61974,
                              "date": "2026-08-06",
                              "url": "https://www.bilibili.com/video/BV1M1uE6oE1W",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad Mini的拆解它来啦！能干翻iPad mini吗！跟华为小米红魔的小平板怎么选？ OPPO Pad 3 Pro",
                              "author": "瓜哥说手机",
                              "play": 51086,
                              "date": "2026-05-23",
                              "url": "https://www.bilibili.com/video/BV14TGq6jEcK",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "信他们说话这辈子有了 OPPO Pad Mini 柔光版蓝光频闪极速测试！",
                              "author": "全是干货的大胖鸽",
                              "play": 34193,
                              "date": "2026-05-08",
                              "url": "https://www.bilibili.com/video/BV16Ld3BTEAe",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "优点很猛 缺点很迷！OPPO Pad Mini的真实体验（附购买建议）",
                              "author": "爱好比钱多",
                              "play": 29555,
                              "date": "2026-05-19",
                              "url": "https://www.bilibili.com/video/BV1QzLq6NEfv",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "开学换新机怎么选？5款高性价比手机平板实测体验",
                              "author": "猪猪猪猪里脊",
                              "play": 9838,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV1WUuN67EpH",
                              "compare": true
                        }
                  ]
            },
            {
                  "name": "OPPO Pad 5",
                  "voices": [
                        {
                              "type": "video",
                              "title": "OPPO Pad 该怎么选？一期视频告诉你！「Air5、Pad 5、Pad 4 Pro评测」",
                              "author": "科技阁",
                              "play": 257099,
                              "date": "2026-03-28",
                              "url": "https://www.bilibili.com/video/BV1qvXgB9EPq",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "就小平板不配用LCD和好芯片？OPPO Pad 5Pro蓝光频闪极速测试！",
                              "author": "全是干货的大胖鸽",
                              "play": 17346,
                              "date": "2026-04-30",
                              "url": "https://www.bilibili.com/video/BV1Nk96BsE7o",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "依旧大号手机？一加平板2使用体验报告（体验适用于oppopad5和pad6）",
                              "author": "品机者",
                              "play": 4052,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV1KTut6yEKo",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "兼顾绘画、办公、娱乐的oppo平板",
                              "author": "李程ART",
                              "play": 278,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV1npuu6QEgm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【OPPO Pad 5 推荐】孙颖莎同款旗舰平板｜国家补贴12.1英寸高性能学习办公神器｜天玑9400+旗舰芯｜12GB+256GB｜星河银配色｜轻薄游戏影音全",
                              "author": "精选种草日记",
                              "play": 96,
                              "date": "2026-08-04",
                              "url": "https://www.bilibili.com/video/BV1Q63d6kEzm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "2000档安卓全能板王流畅得不像标准版#oppopad5#oppo平板#效率神器平板推荐#内存涨价#手机涨价-7619202980709446257",
                              "author": "bili_3706953299659320",
                              "play": 52,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV1YBuu6rEcz",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【学生党高性价比推荐】OPPO Pad 5｜12.1英寸3K超清屏＋天玑9400旗舰芯｜学习办公娱乐全能平板｜星河银配色｜8GB+256GB",
                              "author": "极简精品测评",
                              "play": 22,
                              "date": "2026-08-04",
                              "url": "https://www.bilibili.com/video/BV1An3d64EMm",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "护眼无反光，新学期生产力，OPPOPad5趁涨价前赶紧冲#oppopad5#oppo平板#效率神器平板推荐#内存涨价#学生平板推荐-76217369560544",
                              "author": "欠幸渍焊Fv5",
                              "play": 20,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV1xeug6AEa2",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPOPad5已上手体验来看看有什么惊喜吧#oppopad5#oppo平板#oppo双十一省心狂补节#孙颖莎同款OPPO平板#平板电脑-75617410515",
                              "author": "瓜屎用耙Kf1",
                              "play": 8,
                              "date": "2026-08-09",
                              "url": "https://www.bilibili.com/video/BV17duG6dEoE",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 5柔光版开箱 #OPPOPad5 #OPPO平板 #平板 #数码开箱视频 #OPPOPad",
                              "author": "白狂妄的跳跳虎",
                              "play": 5,
                              "date": "2026-08-03",
                              "url": "https://www.bilibili.com/video/BV1Ki3o6NESZ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPOPad5柔光版第一时间开箱！「次元搞机所」#OPPO平板#OPPOpad#OPPO#OPPOpad5#平板电脑-7559139909778246963",
                              "author": "寄海w",
                              "play": 1,
                              "date": "2026-08-06",
                              "url": "https://www.bilibili.com/video/BV1oLMS69EAd",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "OPPO Pad 6",
                  "voices": [
                        {
                              "type": "video",
                              "title": "一台平板全搞定！超全能的OPPO Pad 6 上手体验",
                              "author": "冰淇淋不吃喵",
                              "play": 207376,
                              "date": "2026-05-22",
                              "url": "https://www.bilibili.com/video/BV17MGb6CET1",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "开学装备新升级！OPPO Pad 6这次系统有点东西",
                              "author": "小冯整挺好",
                              "play": 157121,
                              "date": "2026-05-23",
                              "url": "https://www.bilibili.com/video/BV1tMGz6WEvC",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "这部安卓平板这么强？OPPO Pad 6 测评",
                              "author": "喵橙橙评测室",
                              "play": 69634,
                              "date": "2026-06-11",
                              "url": "https://www.bilibili.com/video/BV1vbEd6eEor",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【大家测】OPPO Pad 6 柔光版开箱体验 | 大屏幕+大电量+144Hz高刷 面向学生党",
                              "author": "大家测",
                              "play": 21859,
                              "date": "2026-06-15",
                              "url": "https://www.bilibili.com/video/BV134Jg6PEF7",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPOPad6 深度体验评测，一条视频告诉你优缺点",
                              "author": "头脑数码特工",
                              "play": 10034,
                              "date": "2026-06-12",
                              "url": "https://www.bilibili.com/video/BV1xuEy6SE3r",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "买这台OPPOPad6是我体验感最差的一次，有种买了二手平板的无力感",
                              "author": "冬词数码",
                              "play": 9577,
                              "date": "2026-06-28",
                              "url": "https://www.bilibili.com/video/BV1eBTg6kEdz",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "以小博大的旧神SR3M-以小博大整枪仅18万",
                              "author": "哔啵哔探员",
                              "play": 3397,
                              "date": "2026-08-06",
                              "url": "https://www.bilibili.com/video/BV1mbM16bEcG",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 6 游戏性能实测 玩原神还是有点烫手",
                              "author": "随遇河岸231313",
                              "play": 1276,
                              "date": "2026-07-19",
                              "url": "https://www.bilibili.com/video/BV1cuKN6PEDN",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPOPad6游戏党可选#oppopad6#",
                              "author": "久推笔记",
                              "play": 1134,
                              "date": "2026-07-15",
                              "url": "https://www.bilibili.com/video/BV1HBNB6bE8n",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "柔光版是什么意思，买平板要买柔光版吗？",
                              "author": "小郑小郑啊zw",
                              "play": 1085,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1Cmga6dEE3",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "天玑9500s性能如何？OPPO Pad6打游戏实测？#oppopad6 #oppo平板 #效率神器平板推荐",
                              "author": "小孟科技",
                              "play": 1057,
                              "date": "2026-07-15",
                              "url": "https://www.bilibili.com/video/BV1GSNe6vEro",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "2800左右六款平板测评，华为、小米、OPPO、联想、一加到底怎么选？",
                              "author": "小牛数码优选",
                              "play": 1038,
                              "date": "2026-07-18",
                              "url": "https://www.bilibili.com/video/BV1W7Kw6cErF",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 6这些功能不会用≈白买",
                              "author": "小郑小郑啊zw",
                              "play": 991,
                              "date": "2026-07-29",
                              "url": "https://www.bilibili.com/video/BV1qX3169Ebr",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPOPad6上手几个月体验分享#oppopad6#",
                              "author": "久推笔记",
                              "play": 609,
                              "date": "2026-07-15",
                              "url": "https://www.bilibili.com/video/BV1saNB6YExn",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "别浪费性能！OPPO Pad6新机必改6个设置",
                              "author": "阿迪玩家",
                              "play": 563,
                              "date": "2026-07-31",
                              "url": "https://www.bilibili.com/video/BV1fCGP6kESk",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO平板入手后，一定要做的设置❗️",
                              "author": "煲一锅数码周",
                              "play": 454,
                              "date": "2026-08-05",
                              "url": "https://www.bilibili.com/video/BV1TyMy68EwV",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad6 Pro、拯救者Y900、OPPO Pad6 Pro怎么选？",
                              "author": "慕容甄选",
                              "play": 365,
                              "date": "2026-08-11",
                              "url": "https://www.bilibili.com/video/BV1eMuB69E5X",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "OPPO这三款平板怎么选？看完不纠结！ OPPO Pad 6、OPPO Pad Mini、.....",
                              "author": "vbkgkl81243",
                              "play": 344,
                              "date": "2026-07-29",
                              "url": "https://www.bilibili.com/video/BV1Gr3y6VELp",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 6用了两个月！分享几个学生党使用的学习小技巧",
                              "author": "小孟科技",
                              "play": 323,
                              "date": "2026-07-21",
                              "url": "https://www.bilibili.com/video/BV1W3Ka62Es5",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "安卓全能旗舰新标杆来了！OPPO Find X10系列预计9月下旬发布！这机器有多猛？",
                              "author": "瓜籽儿攻略",
                              "play": 246,
                              "date": "2026-08-11",
                              "url": "https://www.bilibili.com/video/BV1rGuj6rE6Y",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 6值得买的一台平板",
                              "author": "QH吉普",
                              "play": 216,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1Efga6JEoj",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "别再说平板只能盖泡面！生产力这块，一台OPPO Pad6就够了",
                              "author": "觅光数码",
                              "play": 150,
                              "date": "2026-07-25",
                              "url": "https://www.bilibili.com/video/BV19Y3g6SEkb",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 6 首销活动送好礼",
                              "author": "幸福甄选",
                              "play": 119,
                              "date": "2026-07-29",
                              "url": "https://www.bilibili.com/video/BV1dv3y6jEaP",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "买了OPPO Pad 6 这些实用的的功能不要错过",
                              "author": "小俞数码",
                              "play": 116,
                              "date": "2026-08-01",
                              "url": "https://www.bilibili.com/video/BV1oJGg6pEEP",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "死亡并非爱的敌人",
                              "author": "历代光崽监护人",
                              "play": 103,
                              "date": "2026-07-13",
                              "url": "https://www.bilibili.com/video/BV1nUNk6MEBs",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "学习搭子，OPPO Pad 6",
                              "author": "QH吉普",
                              "play": 57,
                              "date": "2026-07-24",
                              "url": "https://www.bilibili.com/video/BV1zfga6EEPD",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "全体追剧党和游戏党全体集合！！！99块！！99块拿下了OPPO Pad 4 Pro？？？以为是平台出了世纪bug。-----LKJU7TGJU6YHRG",
                              "author": "隐雀独角兽Y",
                              "play": 55,
                              "date": "2026-07-16",
                              "url": "https://www.bilibili.com/video/BV1Y5Kg6NEjE",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 6登场！数码宅们准备好了吗？(1655)",
                              "author": "七七精选小店金信芙",
                              "play": 9,
                              "date": "2026-07-20",
                              "url": "https://www.bilibili.com/video/BV1AEK16JExk",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "OPPO Pad 6学生平板：高效学习工具",
                              "author": "七七精选小店顾學霜",
                              "play": 4,
                              "date": "2026-07-18",
                              "url": "https://www.bilibili.com/video/BV1YAKP6EEqa",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "OPPO Pad Air5",
                  "voices": [
                        {
                              "type": "video",
                              "title": "【大家测】1899元起售高颜值学习平板 | OPPO Pad Air5柔光版开箱体验",
                              "author": "大家测",
                              "play": 74925,
                              "date": "2025-12-30",
                              "url": "https://www.bilibili.com/video/BV1PBvaBnEg2",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "我与iPad Air 5的杂谈_2025年了，M1还「遥遥领先」吗？",
                              "author": "MacOSAQUA",
                              "play": 72937,
                              "date": "2025-12-26",
                              "url": "https://www.bilibili.com/video/BV18DqmB5EPW",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "两千元档买学习平板？看OPPO Pad Air5就够了",
                              "author": "喵橙橙评测室",
                              "play": 62247,
                              "date": "2025-12-30",
                              "url": "https://www.bilibili.com/video/BV1qDvaB3EBr",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "用了几天，说说OPPOPadAir5的真实感受",
                              "author": "他们叫我小仙",
                              "play": 16965,
                              "date": "2025-12-25",
                              "url": "https://www.bilibili.com/video/BV1wkBDB3Eih",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "2K档学生平板怎么选？OPPO Pad Air 5体验分享",
                              "author": "85年的栗子",
                              "play": 13992,
                              "date": "2025-12-30",
                              "url": "https://www.bilibili.com/video/BV1BsvhBgEQc",
                              "compare": true
                        }
                  ]
            }
      ],
      "report": null
    },
    "vivo": {
      "products": [
            {
                  "name": "vivo Pad6 Pro",
                  "voices": [
                        {
                              "type": "video",
                              "title": "4K板皇？视听盛宴！vivo Pad6 Pro首发体验",
                              "author": "搞机所",
                              "play": 703380,
                              "date": "2026-03-30",
                              "url": "https://www.bilibili.com/video/BV1ZbXhBEETB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad6 Pro首发：4K屏不够，还得高性能？",
                              "author": "花生説",
                              "play": 667909,
                              "date": "2026-03-30",
                              "url": "https://www.bilibili.com/video/BV1o3XaBSE5w",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "无4K不旗舰 vivo Pad6 Pro体验评测【新评科技】",
                              "author": "新评科技",
                              "play": 511618,
                              "date": "2026-03-30",
                              "url": "https://www.bilibili.com/video/BV1xQXhBYEeC",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad6 Pro：4K杜比，一步到位！",
                              "author": "柯基小宸",
                              "play": 391897,
                              "date": "2026-03-30",
                              "url": "https://www.bilibili.com/video/BV1PTXSBjEfh",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "平板需不需要上 4K？vivo Pad6 Pro 真的更清晰吗？",
                              "author": "Navis-慢点评测",
                              "play": 156281,
                              "date": "2026-03-30",
                              "url": "https://www.bilibili.com/video/BV1xoXhBFEuB",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad6 Pro越是大UP主吹的越是无底线",
                              "author": "一花一劍",
                              "play": 41050,
                              "date": "2026-04-04",
                              "url": "https://www.bilibili.com/video/BV1N7DTBQEuR",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad6 Pro来了，是入手vivo Pad5 Pro还是等新款？应该怎么选",
                              "author": "奉仙数码",
                              "play": 28076,
                              "date": "2026-03-05",
                              "url": "https://www.bilibili.com/video/BV1BCPCz2EPW",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "iQOO Pad6 Pro和vivo Pad6 Pro有什么区别？该怎么选",
                              "author": "奉仙数码",
                              "play": 14428,
                              "date": "2026-05-21",
                              "url": "https://www.bilibili.com/video/BV1HJLx6JEQs",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "Iqoopad6pro平板对比vivopad6pro测试,视频有点长,感兴趣的耐心看完",
                              "author": "北清plus",
                              "play": 4492,
                              "date": "2026-08-04",
                              "url": "https://www.bilibili.com/video/BV1MnuP6mEKA",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "vivopad6pro多开！#新品#vivo平板#开学季#大学生必买好物-7624423682403798291",
                              "author": "汛衷奔胀Az8",
                              "play": 13,
                              "date": "2026-08-08",
                              "url": "https://www.bilibili.com/video/BV1QCuu6TEHN",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "iQOO Pad6 Pro 8GB+256GB 灰晶 国家补贴 第五代骁龙8至尊版 4K游戏电竞大屏 13000mAh 平板电脑 vivo",
                              "author": "斐斐ie好物推荐",
                              "play": 3,
                              "date": "2026-08-06",
                              "url": "https://www.bilibili.com/video/BV1QpuH6uEaD",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "vivo Pad5",
                  "voices": [
                        {
                              "type": "video",
                              "title": "「小白」vivo Pad5 Pro测评：天玑9400在平板表现如何？",
                              "author": "小白测评",
                              "play": 1684584,
                              "date": "2025-04-18",
                              "url": "https://www.bilibili.com/video/BV1NS56zGE69",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "平板一定要知道的实用玩法，vivo Pad5e测评",
                              "author": "UX_有思",
                              "play": 627056,
                              "date": "2025-10-11",
                              "url": "https://www.bilibili.com/video/BV1Ru4JzwEse",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo 全家桶体验：是兄弟就来连我！vivo Pad5丨WATCH 5丨TWS Air3 Pro丨X200 Ultra",
                              "author": "橙红Iris",
                              "play": 591706,
                              "date": "2025-08-18",
                              "url": "https://www.bilibili.com/video/BV1qXY4zqEgS",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "「小白」OPPO Pad 5 测评：ColorOS 16+天玑9400+玩出花？",
                              "author": "小白测评",
                              "play": 564152,
                              "date": "2025-10-15",
                              "url": "https://www.bilibili.com/video/BV1Rh48zoEVT",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "超强多面手，体验打几分？vivo Pad5e学生党体验",
                              "author": "小辰出击",
                              "play": 415257,
                              "date": "2025-10-11",
                              "url": "https://www.bilibili.com/video/BV1pJ4nz5ENJ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "游戏性能逆天，强得不像标准版！iQOO Pad5 使用体验",
                              "author": "请不要叫我测评君",
                              "play": 243840,
                              "date": "2025-05-21",
                              "url": "https://www.bilibili.com/video/BV1iGJhz5Ew9",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "2025年OV米三家热门平板-OPPO Pad5&amp;vivo Pad5 Pro&amp;小米平板8 Pro超详细对比评测！",
                              "author": "超级赛博仓鼠",
                              "play": 184396,
                              "date": "2025-11-22",
                              "url": "https://www.bilibili.com/video/BV1AoULBgEdE",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "「参数分解」vivo Pad5，性价比还不错，充电慢了点，建议取消8g版本。",
                              "author": "阳光使者2025",
                              "play": 65120,
                              "date": "2025-05-30",
                              "url": "https://www.bilibili.com/video/BV19y7HzCE5Z",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "全能型真旗舰平板vivo Pad5 详细体验",
                              "author": "科技小辛",
                              "play": 42397,
                              "date": "2025-05-28",
                              "url": "https://www.bilibili.com/video/BV1hFjozqEeN",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad5 可还行？ vivo Pad5 稍微深度的体验",
                              "author": "龙叔vlog",
                              "play": 33459,
                              "date": "2025-06-07",
                              "url": "https://www.bilibili.com/video/BV1nUTVzkEAw",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad 5~沉浸式开箱&amp;游戏实测～",
                              "author": "BOXLITE-X",
                              "play": 28923,
                              "date": "2025-06-17",
                              "url": "https://www.bilibili.com/video/BV146Nvz6ERP",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad5，准大学生新装备！",
                              "author": "我爱音频网",
                              "play": 25568,
                              "date": "2025-08-18",
                              "url": "https://www.bilibili.com/video/BV1hZYszxEjT",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "全能得不像平板，vivo Pad5 能搞定轻办公吗？",
                              "author": "钢炮同学啊",
                              "play": 14430,
                              "date": "2025-05-30",
                              "url": "https://www.bilibili.com/video/BV1F97szNE2p",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad5e体验：你拿这玩意考验学生党？",
                              "author": "满电的小贺",
                              "play": 14422,
                              "date": "2025-10-13",
                              "url": "https://www.bilibili.com/video/BV1SP41zhERT",
                              "compare": false
                        }
                  ]
            },
            {
                  "name": "vivo Pad5 Pro",
                  "voices": [
                        {
                              "type": "video",
                              "title": "vivo Pad5 Pro上手体验：高性能轻办公平板，还能拉苹果一起上船？",
                              "author": "花生説",
                              "play": 1104555,
                              "date": "2025-04-18",
                              "url": "https://www.bilibili.com/video/BV1B85vzSEbk",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "更轻更薄还更强：vivo Pad5 Pro首发体验",
                              "author": "搞机所",
                              "play": 961365,
                              "date": "2025-04-18",
                              "url": "https://www.bilibili.com/video/BV1iv5vzjEyw",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad5 Pro深度体验，终于有一台同时拥有PC级WPS和顶级性能的超旗舰平板了！",
                              "author": "纸飞机Paperfly",
                              "play": 759431,
                              "date": "2025-04-18",
                              "url": "https://www.bilibili.com/video/BV1qa5vzEESQ",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad5 Pro，这是真板皇！",
                              "author": "极客村长",
                              "play": 743351,
                              "date": "2025-04-18",
                              "url": "https://www.bilibili.com/video/BV1iB5vz5E8X",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "vivo Pad5 Pro 体验：拒绝大号手机，娱乐+轻办公我都行！",
                              "author": "微机分WekiHome",
                              "play": 723269,
                              "date": "2025-04-18",
                              "url": "https://www.bilibili.com/video/BV1qm5rzaEjG",
                              "compare": false
                        },
                        {
                              "type": "video",
                              "title": "【大家测】 2899元起售 vivo Pad5 Pro开箱对比 | 天玑9400旗舰处理器 13寸LCD | 对比iPad Pro、OPPO Pad 4 Pro",
                              "author": "大家测",
                              "play": 106455,
                              "date": "2025-05-01",
                              "url": "https://www.bilibili.com/video/BV1UnGbzyE6F",
                              "compare": true
                        },
                        {
                              "type": "video",
                              "title": "【万字无恰饭测评遗风】vivo Pad5 Pro一个月深度体验报告：平板厂商比笔记本积极努力的多，但努力的不是技术，是套路…",
                              "author": "超能测评Ultra",
                              "play": 105785,
                              "date": "2025-08-14",
                              "url": "https://www.bilibili.com/video/BV1EqbzzaEGg",
                              "compare": false
                        }
                  ]
            }
      ],
      "report": null
    }
  }
};
