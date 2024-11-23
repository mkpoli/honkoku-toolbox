/**
 * Kanji variants that are not supported by honkoku.org
 *
 * Notes:
 * - 緒 U+7DD2 and 緖 U+7DD7 are both CJK Unified Ideographs for historical reasons, so 緖 U+7DD7 is filled in both compatibility and variant selector.
 * - Ditto. 眞 U+771E; 顚 U+985A; 絶 U+7D76 | 絕 U+7D55
 */
export const GROUPED_VARIANTS: Record<
	string,
	[string, [compatibility: string | null, variantSelector: string | null]][]
> = {
	"者→者": [
		["者", ["者", "者︀"]],
		["諸", ["諸", "諸︀"]],
		["著", ["著", "著︀"]],
		["箸", [null, "箸󠄁"]],
		["緒", ["緖", "緖"]],
		["暑", ["暑", "暑︀"]],
		["渚", ["渚", "渚︀"]],
		["煮", ["煮", "煮︀"]],
		["署", ["署", "署︀"]],
		["猪", ["猪", "猪︀"]],
		["都", ["都", "都︀"]],
		["賭", [null, "賭󠄁"]],
		["儲", [null, "儲󠄁"]],
		["曙", [null, "曙󠄁"]],
		["偖", [null, "偖󠄀"]],
		["堵", [null, "堵󠄁"]],
		["奢", ["奢", "奢︀"]],
		["屠", ["屠", "屠︀"]],
		["楮", [null, "楮󠄀"]],
		["躇", [null, "躇󠄀"]],
		["闍", [null, "闍󠄀"]],
	],
	"毎→每": [
		["毎", ["每", null]],
		["侮", ["侮", "侮︀"]],
		["悔", ["悔", "悔︀"]],
		["敏", ["敏", "敏︀"]],
		["梅", ["梅", "梅︀"]],
		["海", ["海", "海︀"]],
		["繁", ["繁", "繁︀"]],
	],
	"礻→示": [
		["神", ["神", "神︀"]],
		["祥", ["祥", "祥︀"]],
		["福", ["福", "福︀"]],
		["視", ["視", "視︀"]],
		["社", ["社", "社︀"]],
		["祉", ["祉", "祉︀"]],
		["祈", ["祈", "祈︀"]],
		["祐", ["祐", "祐︀"]],
		["祖", ["祖", "祖︀"]],
		["祝", ["祝", "祝︀"]],
		["禍", ["禍", "禍︀"]],
		["禎", ["禎", "禎︀"]],
	],
	"真→眞": [
		["直", ["直", "直︁"]],
		["真", ["眞", "眞"]],
		["顛", ["顚", "顚"]],
	],
	"开→幵": [
		["研", ["硏", "硏"]],
		["妍", ["姸", "姸"]],
		["笄", ["筓", "筓"]],
	],
	"并→幷": [
		["并", ["幷", "幷"]],
		["併", ["倂", "倂"]],
		["胼", ["腁", "腁"]],
		["駢", ["騈", "騈"]],
		["迸", ["逬", "逬"]],
		["瓶", ["甁", "甁"]],
		["屏", ["屛", "屛"]],
		["塀", ["塀", "塀︀"]],
	],
	"𢀳→皀": [
		["即", ["卽", "卽"]],
		["節", ["節", "節︀"]],
		["既", ["旣", "旣"]],
		["郷", ["鄕", "鄕"]],
		["慨", ["慨", "慨︀"]],
		["概", ["槪", "槪"]],
		["㮣", ["槩", "槩"]],
	],
	"曽→曾": [
		["曽", ["曾", "曾"]],
		["僧", ["僧", "僧︀"]],
		["層", ["層", "層︀"]],
		["憎", ["憎", "憎︀"]],
		["贈", ["贈", "贈︀"]],
		["増", ["增", "增"]],
	],
	"黒→黑": [
		["黒", ["黑", "黑"]],
		["墨", ["墨", "墨︀"]],
		["薫", ["薰", "薰"]],
	],
	"東→柬": [
		["練", ["練", "練︁"]],
		["錬", ["鍊", "鍊"]],
		["欄", ["欄", "欄︀"]],
	],
	"⺈→刀": [
		["免", ["免", "免︀"]],
		// ["逸", ["逸", null]],
		// ["晩", ["晚", null]],
		// ["勉", ["勉", null]],
		["絶", ["絕", "絕"]],
	],
	"廿→艹": [
		["漢", ["漢", "漢︀"]],
		["難", ["難", "難︀"]],
		["勤", ["勤", "勤︀"]],
		["嘆", ["嘆", "嘆︀"]],
	],
	"兑→兌": [
		["兑", ["兌", "兌"]],
		["悦", ["悅", "悅"]],
		["説", ["說", "說"]],
		["脱", ["脫", "脫"]],
		["鋭", ["銳", "銳"]],
		["閲", ["閱", "閱"]],
	],
	"戸→戶": [
		["戸", ["戶", "戶"]],
		["戻", ["戾", "戾"]],
		["涙", ["淚", "淚"]],
	],
	"豕→豖": [["琢", ["琢", "琢︀"]]],
	"卑→卑": [
		["卑", ["卑", "卑︀"]],
		["碑", ["碑", "碑︀"]],
	],
	"匂→匃": [
		["喝", ["喝", "喝︀"]],
		["褐", ["褐", "褐︀"]],
		["謁", ["謁", "謁︀"]],
		["掲", ["揭", "揭"]],
		["渇", ["渴", "渴"]],
	],
	"大→犬": [
		["器", ["器", "器︀"]],
		["突", ["突", "突︀"]],
		["臭", ["臭", "臭︀"]],
		["戻", ["戾", "戾"]],
		["涙", ["淚", "淚"]],
		["類", ["類", "類︀"]],
	],
	"㇏→乀󠄀": [
		["又", ["又󠄂", "又󠄂"]],
		["交", ["交󠄁", "交󠄁"]],
		["文", [null, "文󠄁"]],
		["史", [null, "史󠄁"]],
		["更", ["更", "更︀"]],
		["便", ["便", "便︀"]],
	],
	"冫⇆𰀪": [
		["羽", ["羽", "羽󠄀"]],
		["習", [null, "習󠄁"]],
		["冬", ["冬", "冬󠄀"]],
	],
	"亡→亡󠄁": [["亡", [null, "亡󠄁"]]],
	"丷→八": [
		["遂", [null, "遂󠄂"]],
		["半", [null, "半󠄁"]],
		["肖", [null, "肖󠄁"]],
		["酋", [null, "酋󠄁"]],
		["益", ["益", "益︀"]],
	],
	"己→巳": [
		["記", [null, "記󠄂"]],
		["起", [null, "起󠄁"]],
	],
	"丶→丩": [["並", ["並", "並︀"]]],
	"辶→辶󠄀": [["近", [null, "近󠄁"]]],
	"爫→爪": [["採", [null, "採󠄁"]]],
	"月→丹": [
		["丹", [null, "丹󠄁"]],
		["青", ["靑", "靑"]],
		["精", [null, "精󠄀"]],
		["晴", [null, "晴󠄀"]],
		["睛", [null, "睛󠄀"]],
	],
	"𫩏→中": [
		["告", ["吿", "吿"]],
		["舎", ["舍", "舍"]],
		["周", ["周", "周︀"]],
	],
	"人→入": [
		["全", [null, "全󠄁"]],
		["内", ["內", "內"]],
	],
} as const;
