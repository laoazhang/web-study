const fourADArr = [
	"img/pear.jpg",
	"img/Regular.jpg",
	"img/grapefruit.jpg",
	"img/Raisin.jpg"
]

const footArr = [
	{
		imgPath: "img/果园推荐.png",
		name: "first",
		theKey: "",
		price: ""
	},
	{
		imgPath: "img/foot1.jpg",
		name: "佳沛意大利绿奇异果",
		theKey: "第二件立省20",
		price: "¥49.90/12个"
	},
	{
		imgPath: "img/foot2.jpg",
		name: "佳沛意大利金奇异果",
		theKey: "第二件立省20",
		price: "¥49.00/6个"
	},
	{
		imgPath: "img/foot3.jpg",
		name: "泰国龙眼",
		theKey: "买两斤送一斤",
		price: "￥39.90/2+1斤"
	},
	{
		imgPath: "img/foot4.jpg",
		name: "泰国苹果",
		theKey: "",
		price: "¥49.00/6个"
	},
	{
		imgPath: "img/foot5.jpg",
		name: "美国华盛顿红地厘蛇果",
		theKey: "第二件9.9",
		price: "¥19.00/个"
	}
]

const worldFruitArr = [
	{
		imgPath: "img/全球鲜果.png",
		name: "first",
		theKey: "",
		price: ""
	},
	{
		imgPath: "img/worldFoot1.jpg",
		name: "越南红心火龙果",
		theKey: "",
		price: "￥38.00/2斤"
	},
	{
		imgPath: "img/worldFoot2.jpg",
		name: "海南西州蜜瓜",
		theKey: "",
		price: "￥29.00/1个"
	},
	{
		imgPath: "img/worldFoot3.jpg",
		name: "越南火龙果",
		theKey: "",
		price: "￥49.00/5斤"
	},
	{
		imgPath: "img/worldFoot4.jpg",
		name: "美国红玫瑰苹果",
		theKey: "",
		price: "￥68.00/6个"
	},
	{
		imgPath: "img/worldFoot5.jpg",
		name: "海南木瓜",
		theKey: "",
		price: "￥29.00/3个"
	},
	{
		imgPath: "img/每一天.jpg",
		name: "last", // 单独判断
		theKey: "",
		price: ""
	}
]
	
const freshFoodArr = [
	{
		imgPath: "img/生鲜.png",
		name: "first",
		theKey: "",
		price: ""
	},
	{
		imgPath: "img/生鲜1.jpg",
		name: "鲜曝大黄鱼(送调料包)",
		theKey: "第二件立省30",
		price: "￥49.90/270g"
	},
	{
		imgPath: "img/生鲜2.png",
		name: "澳大利亚谷饲金钱腱",
		theKey: "立省20元",
		price: "¥79.00/600g"
	},
	{
		imgPath: "img/生鲜3.png",
		name: "阿根廷雪花鲳鱼",
		theKey: "第二件9.9",
		price: "29.90/300-400g"
	},
	{
		imgPath: "img/生鲜4.png",
		name: "加拿大北极甜虾(冻煮长额虾)",
		theKey: "第二件立省30",
		price: "¥56.00/400g"
	},
	{
		imgPath: "img/生鲜5.png",
		name: "新西兰羊蝎子",
		theKey: "第二件19.9",
		price: "¥32.90/600g"
	},
	{
		imgPath: "img/生鲜6.png",
		name: "加拿大北极甜虾（冻煮长额虾)",
		theKey: "第二件立省30",
		price: "¥56.00/400g"
	},
	{
		imgPath: "img/生鲜7.png",
		name: "日式烧烤青花鱼",
		theKey: "第二件9.9",
		price: "¥19.00/100-150g"
	},
	{
		imgPath: "img/生鲜8.png",
		name: "优选东海带鱼段",
		theKey: "第二件19.9",
		price: "￥32.90/400g"
	},
	{
		imgPath: "img/生鲜9.png",
		name: "越南巴沙鱼柳",
		theKey: "",
		price: "¥24.90/300-400g"
	},
	{
		imgPath: "img/生鲜10.png",
		name: "巴西精选牛腩块",
		theKey: "第二件9.9",
		price: "¥39.90/500g"
	},
	{
		imgPath: "img/肥瘦.jpg",
		name: "last",
		theKey: "",
		price: ""
	},
]

const giftArr = [
	{
		imgPath: "img/卡.png",
		name: "first",
		theKey: "",
		price: ""
	},
	{
		imgPath: "img/gift1.jpg",
		name: "阳光普照B礼盒",
		theKey: "",
		price: "￥118.00/1盒"
	},
	{
		imgPath: "img/gift2.jpg",
		name: "惠心礼盒",
		theKey: "",
		price: "￥88.00/1盒"
	},
	{
		imgPath: "img/gift3.jpg",
		name: "欢乐孕期水果礼盒B",
		theKey: "",
		price: "￥178.00/1盒"
	},
	{
		imgPath: "img/gift4.jpg",
		name: "诚心诚意礼盒",
		theKey: "",
		price: "￥178.00/1盒"
	},
	{
		imgPath: "img/gift5.jpg",
		name: "暖人心《美》礼盒",
		theKey: "",
		price: "￥168.00/1盒"
	}
]

const searchArr = [
	"樱桃",
	"大个智利甜心樱桃",
	"英桃",
	"莺桃",
	"yingtao",
	"樱桃小番茄"
]

// 3. 使用fs模块写入相关数据
const footPath='./data/foot.json'
const fourAdPath='./data/fourAd.json'
const freshFoodPath='./data/freshFood.json'
const giftPath='./data/gift.json'
const searchPath='./data/search.json'
const worldFruitPath='./data/worldFruit.json'
import fs from 'fs'

fs.writeFile(footPath,JSON.stringify(footArr),err=>{
    if(err) console.log(err)
    else console.log('foot.json写入成功')
})
fs.writeFile(fourAdPath,JSON.stringify(fourADArr),err=>{
    if(err) console.log(err)
    else console.log('fourAd.json写入成功')
})
fs.writeFile(freshFoodPath,JSON.stringify(freshFoodArr),err=>{
    if(err) console.log(err)
    else console.log('freshFood.json写入成功')
})
fs.writeFile(giftPath,JSON.stringify(giftArr),err=>{
    if(err) console.log(err)
    else console.log('gift.json写入成功')
})
fs.writeFile(searchPath,JSON.stringify(searchArr),err=>{
    if(err) console.log(err)
    else console.log('search.json写入成功')
})
fs.writeFile(worldFruitPath,JSON.stringify(worldFruitArr),err=>{
    if(err) console.log(err)
    else console.log('worldFruit.json写入成功')
})