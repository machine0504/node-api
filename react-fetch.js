var express = require('express');
var path = require('path');
var app = new express();
var bodyParser = require('body-parser');
var axios=require('axios')
var ws=require('nodejs-websocket')
//单点登录
// var crypto=require('crypto');
// var session = require('express-session');
// var cookie = require('cookie-parser');
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
var data = {
  "status": 1,
  "code": 200,
  "data": [{
    "title": "图片1",
    "image": "http://192.168.125.12:8082/img/lunbo1.jpg",
    "webs": "#"
  }, {
    "title": "图片2",
    "image": "http://192.168.125.12:8082/img/lunbo2.jpg",
    "webs": "#"
  }, {
    "title": "图片3",
    "image": "http://192.168.125.12:8082/img/lunbo3.jpg",
    "webs": "#"
  }]
}
var data1 = {
  "status": 1,
  "code": 200,
  "data": [{
    "cid": "492",
    "title": "潮流女装",
    "image": "http://192.168.125.12:8082/img/girl.png"
  }, {
    "cid": "493",
    "title": "品牌男装",
    "image": "http://192.168.125.12:8082/img/boy.png"
  }, {
    "cid": "494",
    "title": "电脑办公",
    "image": "http://192.168.125.12:8082/img/dn.png"
  }, {
    "cid": "495",
    "title": "手机数码",
    "image": "http://192.168.125.12:8082/img/sj.png"
  }]
}
var data2 = {
  "status": 1,
  "code": 200,
  "data": [{
    "title": "潮流女装",
    "items": [{
      "title": "高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带",
      "gid": "精品打折",
      "cid": "523",
      "price": 12.8,
      "image": "http://192.168.125.12:8082/img/nz1.jpg"
    }, {
      "title": "欧美尖头蝴蝶结拖鞋女夏外穿2018新款绸缎面细跟凉拖半拖鞋穆勒鞋",
      "gid": "981541541",
      "cid": "品质精选",
      "price": 25.5,
      "image": "http://192.168.125.12:8082/img/nz2.jpg"
    }, {
      "title": "老爹鞋女韩版ulzzang原宿百搭网鞋透气网面内增高运动鞋网鞋夏季",
      "gid": "417197395",
      "cid": "品质精选4折起",
      "price": 255,
      "image": "http://192.168.125.12:8082/img/nz3.jpg"
    }, {
      "title": "小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋",
      "gid": "944196216",
      "cid": "523",
      "price": 288,
      "image": "http://192.168.125.12:8082/img/nz4.jpg"
    }, {
      "title": "雪兰黛2018春季新款高跟鞋尖头细跟性感鞋子女韩版透气纱网女单鞋 ",
      "gid": "767430600",
      "cid": "523",
      "price": 280,
      "image": "http://192.168.125.12:8082/img/nz5.jpg"
    }, {
      "title": "2018夏季新款韩版百搭高跟鞋女显瘦细跟黑色工作鞋金属扣露趾凉鞋",
      "gid": "189918736",
      "cid": "523",
      "price": 300,
      "image": "http://192.168.125.12:8082/img/nz6.jpg"
    }, {
      "title": "2018新款韩版高跟鞋女凉鞋夏细跟尖头一字扣猫跟鞋包头百搭磨砂皮",
      "gid": "205476485",
      "cid": "523",
      "price": 200,
      "image": "http://192.168.125.12:8082/img/nz7.jpg"
    }]
  }, {
    "title": "品牌男装",
    "items": [{
      "title": "新款短袖男士夏季3d立体图案体恤猴子搞怪大猩猩个性t恤大码衣服",
      "gid": "火爆开售",
      "cid": "525",
      "price": 26,
      "image": "http://192.168.125.12:8082/img/nz8.jpg"
    }, {
      "title": "成人五分裤海边度假短裤男士潮流沙滩库子2018新款大裤衩夏装悠闲",
      "gid": "火爆开售",
      "cid": "500",
      "price": 79,
      "image": "http://192.168.125.12:8082/img/nz9.png"
    }, {
      "title": "男装棉麻休闲裤男夏季短裤男潮七分裤中裤宽松大码库子大裤衩日系",
      "gid": "454635074",
      "cid": "500",
      "price": 69,
      "image": "http://192.168.125.12:8082/img/nz10.jpg"
    }, {
      "title": "牛仔裤男宽松九分裤韩版潮流文艺男生直筒夏季薄裤子百搭学生港风",
      "gid": "792777211",
      "cid": "500",
      "price": 78,
      "image": "http://192.168.125.12:8082/img/nz11.png"
    }, {
      "title": "衣长: 常规领型: 连帽颜色: 白色 黑色尺码: S 现货 M 现货 L 现货面料分类: 涂层布款式细节: 多口袋品牌: harsh and cruel/桀骜不驯男装-穿着方式: 外穿厚薄: 加厚填充物: 灰鸭绒适用场景: 其他休闲基础风格: 青春流行",
      "gid": "955533435",
      "cid": "500",
      "price": 119,
      "image": "http://192.168.125.12:8082/img/nz12.jpg"
    }, {
      "title": "HARSHCRUEL 秋冬男保暖充绒夹棉加厚防风羽绒棉服高领面罩TPU外套",
      "gid": "635492201",
      "cid": "499",
      "price": 778,
      "image": "http://192.168.125.12:8082/img/nz13.jpg"
    }]
  }, {
    "title": "电脑办公",
    "items": [{
      "title": "酷睿i5四核GTX1060独显台式机组装电脑主机整机 绝地求生吃鸡游戏",
      "gid": "精品打折",
      "cid": "527",
      "price": 4599,
      "image": "http://192.168.125.12:8082/img/nz14.jpg"
    }, {
      "title": "金属鼠标垫个性定制LOGO大号高贵时尚航空级铝合金圆形游戏办公批",
      "gid": "323813881",
      "cid": "品质精选",
      "price": 34.9,
      "image": "http://192.168.125.12:8082/img/nz15.png"
    }, {
      "title": "微软ARC TOUCH无线蓝牙鼠标 苹果MAC笔记本创意超薄便携时尚折叠",
      "gid": "324461936",
      "cid": "品质精选4折起",
      "price": 341,
      "image": "http://192.168.125.12:8082/img/nz16.png"
    }, {
      "title": "美国tomtoc13/15寸苹果笔记本macbook时尚商务手提男女电脑包纤薄",
      "gid": "658312140",
      "cid": "502",
      "price": 149,
      "image": "http://192.168.125.12:8082/img/nz17.png"
    }, {
      "title": "以诺双肩电脑包13.3/14/15.6寸男小米苹果电脑背包商务笔记本包女",
      "gid": "350587851",
      "cid": "502",
      "price": 129,
      "image": "http://192.168.125.12:8082/img/nz18.jpg"
    }, {
      "title": "联想华硕神舟笔记本贴膜15.6 戴尔宏基HP外壳保护膜电脑贴纸14寸",
      "gid": "914829807",
      "cid": "502",
      "price": 28,
      "image": "http://192.168.125.12:8082/img/nz19.jpg"
    }, {
      "title": "ETS六代 笔记本抽风式散热器侧吸式戴尔联想电脑风扇17机14寸15.6",
      "gid": "852883544",
      "cid": "502",
      "price": 108,
      "image": "http://192.168.125.12:8082/img/nz20.jpg"
    }]
  }]
}
var data3 = {
  "status": 1,
  "code": 200,
  "data": [{
    "gid": "286026274",
    "cid": "496",
    "title": "ONLY冬装新品雪纺拼接流苏腰带长款连衣裙女",
    "price": "￥399.00",
    "image": "http://192.168.125.12:8082/img/nz21.jpg",
    "gid1": "124555205",
    "cid1": "496",
    "title1": "韩都衣舍2016秋新款时尚拼接色宽松显瘦气质长款长袖连衣裙",
    "price1": "￥128.00",
    "image1": "http://192.168.125.12:8082/img/nz22.jpg"
  }, {
    "gid": "704407997",
    "cid": "496",
    "title": "韩都衣舍2017韩版女装春装新款木耳边卡通刺绣显瘦连衣裙",
    "price": "￥118.00",
    "image": "http://192.168.125.12:8082/img/nz23.jpg",
    "gid1": "941801102",
    "cid1": "497",
    "title1": "美动态胖妹妹春装打底裙2017新款加肥加大码女装胖mm显瘦连衣裙",
    "price1": "￥139.00",
    "image1": "http://192.168.125.12:8082/img/nz24.jpg"
  }, {
    "gid": "252173006",
    "cid": "497",
    "title": "美动态胖妹妹秋冬2016新款大码女装200斤胖mm显瘦印花直筒连衣裙",
    "price": "￥159.00",
    "image": "http://192.168.125.12:8082/img/nz31.jpg",
    "gid1": "766946433",
    "cid1": "498",
    "title1": "李宁运动裤男长裤 2016秋冬款篮球系列修身直筒卫裤运动套装下装",
    "price1": "￥109.00",
    "image1": "http://192.168.125.12:8082/img/nz32.jpg"
  }, {
    "gid": "534523517",
    "cid": "498",
    "title": "国家队全英赛比赛 正品李宁羽毛球女羽毛球裙 短裙 裙裤春夏下装",
    "price": "￥188.00",
    "image": "http://192.168.125.12:8082/img/nz25.jpg",
    "gid1": "330520519",
    "cid1": "498",
    "title1": "阿迪达斯2016秋季新款女子运动休闲下装针织短裤",
    "price1": "￥257.00",
    "image1": "http://192.168.125.12:8082/img/nz26.jpg"
  }, {
    "gid": "613094524",
    "cid": "499",
    "title": "Bosideng/波司登2016新款90%鹅绒男轻薄中长款连帽羽绒服",
    "price": "￥759.00",
    "image": "http://192.168.125.12:8082/img/nz27.jpg",
    "gid1": "808830978",
    "cid1": "499",
    "title1": "波司登2016新款加厚男士羽绒服中长款带帽保暖冬外套",
    "price1": "￥799.00",
    "image1": "http://192.168.125.12:8082/img/nz28.jpg"
  }, {
    "gid": "827013226",
    "cid": "499",
    "title": "阿迪达斯羽绒服男 2016冬季大码保暖运动服休闲连帽外套",
    "price": "￥798.00",
    "image": "http://192.168.125.12:8082/img/nz29.jpg",
    "gid1": "541081261",
    "cid1": "501",
    "title1": "Apple/苹果 MacBook Air 13.3英寸笔记本电脑 i5 8G 128G",
    "price1": "￥6988.00",
    "image1": "http://192.168.125.12:8082/img/nz30.jpg"
  }]
}
var data4 = {
  "status": 1,
  "code": 200,
  "data": [{
    "cid": "492",
    "title": "潮流女装",
    "style": true
  }, {
    "cid": "493",
    "title": "品牌男装",
    "style": false
  }, {
    "cid": "494",
    "title": "电脑办公",
    "style": false
  }, {
    "cid": "495",
    "title": "手机数码",
    "style": false
  }, {
    "cid": "505",
    "title": "母婴童装",
    "style": false
  }, {
    "cid": "506",
    "title": "图书",
    "style": false
  }, {
    "cid": "507",
    "title": "家居家纺",
    "style": false
  }, {
    "cid": "508",
    "title": "居家生活",
    "style": false
  }, {
    "cid": "509",
    "title": "家具建材",
    "style": false
  }, {
    "cid": "510",
    "title": "食品生鲜",
    "style": false
  }, {
    "cid": "514",
    "title": "医药保健",
    "style": false
  }, {
    "cid": "511",
    "title": "箱包",
    "style": false
  }, {
    "cid": "512",
    "title": "运动户外",
    "style": false
  }, {
    "cid": "513",
    "title": "内衣",
    "style": false
  }, {
    "cid": "516",
    "title": "汽车用品",
    "style": false
  }, {
    "cid": "515",
    "title": "奢品礼品",
    "style": false
  }, {
    "cid": "517",
    "title": "食品生鲜",
    "style": false
  }, {
    "cid": "518",
    "title": "玩具乐器",
    "style": false
  }, {
    "cid": "519",
    "title": "生活旅行",
    "style": false
  }, {
    "cid": "520",
    "title": "酒水饮料",
    "style": false
  }, {
    "cid": "521",
    "title": "化妆彩妆",
    "style": false
  }, {
    "cid": "522",
    "title": "钟表珠宝",
    "style": false
  }, {
    "cid": "529",
    "title": "书籍",
    "style": false
  }]
}
var data5 = {
  "status": 1,
  "code": 200,
  "data": [{
    "cid": "499",
    "title": "羽绒服",
    "goods": [{
      "gid": "635492201",
      "title": "HARSHCRUEL 秋冬男保暖充绒夹棉加厚防风羽绒棉服高领面罩TPU外套",
      "image": "http://192.168.125.12:8082/img/n1.png"
    }, {
      "gid": "700417577",
      "title": "PZP mountain baltoro jacket downinsulation雪山联名棉羽绒服",
      "image": "http://192.168.125.12:8082/img/n2.jpg"
    }, {
      "gid": "620902097",
      "title": "2017重工加厚羽绒服男士户外中长款大毛领韩版保暖衣修身防水外套",
      "image": "http://192.168.125.12:8082/img/n3.jpg"
    }, {
      "gid": "827013226",
      "title": "阿迪达斯羽绒服男 2016冬季大码保暖运动服休闲连帽外套",
      "image": "http://192.168.125.12:8082/img/n4.jpg"
    }, {
      "gid": "808830978",
      "title": "波司登2016新款加厚男士羽绒服中长款带帽保暖冬外套",
      "image": "http://192.168.125.12:8082/img/n5.jpg"
    }, {
      "gid": "613094524",
      "title": "Bosideng/波司登2016新款90%鹅绒男轻薄中长款连帽羽绒服",
      "image": "http://192.168.125.12:8082/img/n6.jpg"
    }]
  }, {
    "cid": "500",
    "title": "休闲裤",
    "goods": [{
      "gid": "634071836",
      "title": "成人五分裤海边度假短裤男士潮流沙滩库子2018新款大裤衩夏装悠闲",
      "image": "http://192.168.125.12:8082/img/nz8.jpg"
    }, {
      "gid": "454635074",
      "title": "男装棉麻休闲裤男夏季短裤男潮七分裤中裤宽松大码库子大裤衩日系",
      "image": "http://192.168.125.12:8082/img/nz9.png"
    }, {
      "gid": "792777211",
      "title": "牛仔裤男宽松九分裤韩版潮流文艺男生直筒夏季薄裤子百搭学生港风",
      "image": "http://192.168.125.12:8082/img/nz10.jpg"
    }, {
      "gid": "955533435",
      "title": "衣长: 常规领型: 连帽颜色: 白色 黑色尺码: S 现货 M 现货 L 现货面料分类: 涂层布款式细节: 多口袋品牌: harsh and cruel/桀骜不驯男装-穿着方式: 外穿厚薄: 加厚填充物: 灰鸭绒适用场景: 其他休闲基础风格: 青春流行",
      "image": "http://192.168.125.12:8082/img/nz13.jpg"
    }]
  }, {
    "cid": "525",
    "title": "短袖",
    "goods": [{
      "gid": "265947808",
      "title": "新款短袖男士夏季3d立体图案体恤猴子搞怪大猩猩个性t恤大码衣服",
      "image": "http://192.168.125.12:8082/img/nz12.jpg"
    }, {
      "gid": "251697854",
      "title": "莫代尔短袖t恤男士打底衫V领纯色黑色修身半袖潮夏装衣服运动体恤",
      "image": "http://192.168.125.12:8082/img/n7.jpg"
    }, {
      "gid": "708147276",
      "title": "夏季新款短袖t恤男士韩版潮流v领男装上衣服青年修身半截袖体恤衫",
      "image": "http://192.168.125.12:8082/img/n8.jpg"
    }, {
      "gid": "371226276",
      "title": "骆驼男装 2018夏季新款圆领印花修身上衣 青年休闲微弹短袖T恤",
      "image": "http://192.168.125.12:8082/img/n9.png"
    }]
  }, {
    "cid": "526",
    "title": "牛仔裤",
    "goods": [{
      "gid": "179723152",
      "title": "破洞牛仔裤男韩版潮流2017修身小脚男士九分裤直筒宽松帅气牛子裤",
      "image": "http://192.168.125.12:8082/img/n11.jpg"
    }, {
      "gid": "984973799",
      "title": "牛仔裤男修身小脚韩版潮流2017宽松休闲直筒弹力男士九分裤牛子裤",
      "image": "http://192.168.125.12:8082/img/n12.jpg"
    }, {
      "gid": "684004338",
      "title": "2017新款裤子男韩版潮流九分运动裤哈伦休闲裤男修身小脚男士裤子",
      "image": "http://192.168.125.12:8082/img/n13.jpg"
    }]
  }]
}
var data6 = {
  "status": 1,
  "code": 200,
  "data": [{
    "cid": "496",
    "title": "裙装",
    "goods": [{
      "gid": "714246965",
      "title": "裙装裙装6",
      "image": "http://192.168.125.12:8082/img/nz21.jpg"
    }, {
      "gid": "617862381",
      "title": "裙装裙装5",
      "image": "http://192.168.125.12:8082/img/nz22.jpg"
    }, {
      "gid": "684006549",
      "title": "裙装裙装4",
      "image": "http://192.168.125.12:8082/img/nz23.jpg"
    }, {
      "gid": "704909428",
      "title": "裙装裙装3",
      "image": "http://192.168.125.12:8082/img/nz24.jpg"
    }, {
      "gid": "452502287",
      "title": "裙装裙装2",
      "image": "http://192.168.125.12:8082/img/nz22.jpg"
    }, {
      "gid": "512829844",
      "title": "裙装裙装",
      "image": "http://192.168.125.12:8082/img/nz31.jpg"
    }, {
      "gid": "704407997",
      "title": "韩都衣舍2017韩版女装春装新款木耳边卡通刺绣显瘦连衣裙",
      "image": "http://192.168.125.12:8082/img/nz23.jpg"
    }, {
      "gid": "124555205",
      "title": "韩都衣舍2016秋新款时尚拼接色宽松显瘦气质长款长袖连衣裙",
      "image": "http://192.168.125.12:8082/img/nz21.jpg"
    }, {
      "gid": "286026274",
      "title": "ONLY冬装新品雪纺拼接流苏腰带长款连衣裙女",
      "image": "http://192.168.125.12:8082/img/nz24.jpg"
    }]
  }, {
    "cid": "497",
    "title": "上装",
    "goods": [{
      "gid": "183044524",
      "title": "香后T恤女2018夏季新款短袖韩版修身",
      "image": "http://192.168.125.12:8082/img/nz33.jpg"
    }, {
      "gid": "552370716",
      "title": "夏装新款韩版时尚织带字母印花七分袖破洞T恤女宽松百搭学生上衣",
      "image": "http://192.168.125.12:8082/img/nz34.jpg"
    }, {
      "gid": "396797732",
      "title": "短袖t恤女夏装韩版2017新款学生宽松大码百搭绑带",
      "image": "http://192.168.125.12:8082/img/nz35.jpg"
    }, {
      "gid": "207686760",
      "title": "S-4XL纯棉短袖T恤女2018夏季新款女装上衣大码宽松字母印花半袖小衫",
      "image": "http://192.168.125.12:8082/img/nz36.jpg"
    }, {
      "gid": "427387635",
      "title": "筱岚2018春装新款纯棉刺绣休闲宽松大码女士体恤长袖T恤女",
      "image": "http://192.168.125.12:8082/img/nz37.jpg"
    }, {
      "gid": "252173006",
      "title": "美动态胖妹妹秋冬2016新款大码女装200斤胖mm显瘦印花直筒连衣裙",
      "image": "http://192.168.125.12:8082/img/nz23.jpg"
    }, {
      "gid": "941801102",
      "title": "美动态胖妹妹春装打底裙2017新款加肥加大码女装胖mm显瘦连衣裙",
      "image": "http://192.168.125.12:8082/img/nz24.jpg"
    }]
  }, {
    "cid": "498",
    "title": "下装",
    "goods": [{
      "gid": "873512747",
      "title": "蕾丝半身裙女2018春夏新款韩版修身包臀a字纯色不规则裙 CM81004",
      "image": "http://192.168.125.12:8082/img/nz38.jpg"
    }, {
      "gid": "785391832",
      "title": "2018春秋新款网纱a字裙女复古长款半身裙宽松高腰韩版黑色伞裙夏",
      "image": "http://192.168.125.12:8082/img/nz39.jpg"
    }, {
      "gid": "753424386",
      "title": "2018夏季新款A字中裙半身裙女复古小格子高腰荷叶边不规则鱼尾裙",
      "image": "http://192.168.125.12:8082/img/nz24.jpg"
    }, {
      "gid": "715885098",
      "title": "大码女装胖mm下装2018春季新款显瘦袜1200D微压加大码连裤打底袜",
      "image": "http://192.168.125.12:8082/img/nz41.png"
    }, {
      "gid": "226362889",
      "title": "扇百戏局杂技团2017秋季新款拼接撞色褶皱蓬蓬裙荷叶边半身裙",
      "image": "http://192.168.125.12:8082/img/nz42.png"
    }, {
      "gid": "196472467",
      "title": "2018春夏新款女装简约修身休闲破洞贴花牛仔短裤",
      "image": "http://192.168.125.12:8082/img/nz43.jpg"
    }, {
      "gid": "330520519",
      "title": "阿迪达斯2016秋季新款女子运动休闲下装针织短裤",
      "image": "http://192.168.125.12:8082/img/nz38.jpg"
    }, {
      "gid": "534523517",
      "title": "国家队全英赛比赛 正品李宁羽毛球女羽毛球裙 短裙 裙裤春夏下装",
      "image": "http://192.168.125.12:8082/img/nz40.jpg"
    }, {
      "gid": "766946433",
      "title": "李宁运动裤男长裤 2016秋冬款篮球系列修身直筒卫裤运动套装下装",
      "image": "http://192.168.125.12:8082/img/nz42.png"
    }]
  }, {
    "cid": "523",
    "title": "潮流女鞋",
    "goods": [{
      "gid": "143208071",
      "title": "高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带",
      "image": "http://192.168.125.12:8082/img/nz1.jpg"
    }, {
      "gid": "981541541",
      "title": "欧美尖头蝴蝶结拖鞋女夏外穿2018新款绸缎面细跟凉拖半拖鞋穆勒鞋",
      "image": "http://192.168.125.12:8082/img/nz2.jpg"
    }, {
      "gid": "417197395",
      "title": "老爹鞋女韩版ulzzang原宿百搭网鞋透气网面内增高运动鞋网鞋夏季",
      "image": "http://192.168.125.12:8082/img/nz3.jpg"
    }, {
      "gid": "944196216",
      "title": "小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋",
      "image": "http://192.168.125.12:8082/img/nz4.jpg"
    }, {
      "gid": "767430600",
      "title": "雪兰黛2018春季新款高跟鞋尖头细跟性感鞋子女韩版透气纱网女单鞋 ",
      "image": "http://192.168.125.12:8082/img/nz5.jpg"
    }, {
      "gid": "189918736",
      "title": "2018夏季新款韩版百搭高跟鞋女显瘦细跟黑色工作鞋金属扣露趾凉鞋",
      "image": "http://192.168.125.12:8082/img/nz6.jpg"
    }, {
      "gid": "205476485",
      "title": "2018新款韩版高跟鞋女凉鞋夏细跟尖头一字扣猫跟鞋包头百搭磨砂皮",
      "image": "http://192.168.125.12:8082/img/nz7.jpg"
    }, {
      "gid": "546511537",
      "title": "小清新高跟鞋春季2018新款夏季女鞋少女韩版百搭细跟凉鞋学生鞋子",
      "image": "http://192.168.125.12:8082/img/nz8.jpg"
    }]
  }]
}
var data7 = {
  "status": 1,
  "code": 201,
  "data": "没有相关的产品"
}
var data8 = {
  "status": 1,
  "code": 200,
  "data": [{
    "title": "电脑"
  }, {
    "title": "裙"
  }, {
    "title": "连衣裙"
  }, {
    "title": "羽绒服"
  }, {
    "title": "裙装"
  }, {
    "title": "吃鸡神器"
  }, {
    "title": "鞋"
  }, {
    "title": "羽绒"
  }, {
    "title": "裤"
  }, {
    "title": "韩都衣舍"
  }, {
    "title": "裤子"
  }, {
    "title": "夏装"
  }]
}
var data9 = {
  "status": 1,
  "code": 200,
  "data": [{
    "gid": "873512747",
    "cid": "498",
    "title": "蕾丝半身裙女2018春夏新款韩版修身包臀a字纯色不规则裙 CM81004",
    "price": "118.00",
    "sales": "100",
    "image": "http://192.168.125.12:8082/img/nz38.jpg"
  }, {
    "gid": "785391832",
    "cid": "498",
    "title": "2018春秋新款网纱a字裙女复古长款半身裙宽松高腰韩版黑色伞裙夏",
    "price": "79.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz39.jpg"
  }, {
    "gid": "753424386",
    "cid": "498",
    "title": "2018夏季新款A字中裙半身裙女复古小格子高腰荷叶边不规则鱼尾裙",
    "price": "255.00",
    "sales": "70",
    "image": "http://192.168.125.12:8082/img/nz40.jpg"
  }, {
    "gid": "226362889",
    "cid": "498",
    "title": "扇百戏局杂技团2017秋季新款拼接撞色褶皱蓬蓬裙荷叶边半身裙",
    "price": "288.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz41.png"
  }, {
    "gid": "714246965",
    "cid": "496",
    "title": "裙装裙装6",
    "price": "100.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz42.png"
  }, {
    "gid": "617862381",
    "cid": "496",
    "title": "裙装裙装5",
    "price": "100.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz43.jpg"
  }, {
    "gid": "684006549",
    "cid": "496",
    "title": "裙装裙装4",
    "price": "200.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz23.jpg"
  }, {
    "gid": "704909428",
    "cid": "496",
    "title": "裙装裙装3",
    "price": "0.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz24.jpg"
  }, {
    "gid": "452502287",
    "cid": "496",
    "title": "裙装裙装2",
    "price": "10.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz26.jpg"
  }, {
    "gid": "512829844",
    "cid": "496",
    "title": "裙装裙装",
    "price": "100.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz22.jpg"
  }],
  "pageinfo": {
    "pagesize": "10",
    "page": "1",
    "pagenum": "2",
    "total": 16
  }
}
var data10 = {
  "status": 1,
  "code": 200,
  "data": [{
    "gid": "534523517",
    "cid": "498",
    "title": "国家队全英赛比赛 正品李宁羽毛球女羽毛球裙 短裙 裙裤春夏下装",
    "price": "188.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz33.jpg"
  }, {
    "gid": "252173006",
    "cid": "497",
    "title": "美动态胖妹妹秋冬2016新款大码女装200斤胖mm显瘦印花直筒连衣裙",
    "price": "159.00",
    "sales": "30",
    "image": "http://192.168.125.12:8082/img/nz34.jpg"
  }, {
    "gid": "941801102",
    "cid": "497",
    "title": "美动态胖妹妹春装打底裙2017新款加肥加大码女装胖mm显瘦连衣裙",
    "price": "139.00",
    "sales": "20",
    "image": "http://192.168.125.12:8082/img/nz35.jpg"
  }, {
    "gid": "704407997",
    "cid": "496",
    "title": "韩都衣舍2017韩版女装春装新款木耳边卡通刺绣显瘦连衣裙",
    "price": "118.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz36.jpg"
  }, {
    "gid": "124555205",
    "cid": "496",
    "title": "韩都衣舍2016秋新款时尚拼接色宽松显瘦气质长款长袖连衣裙",
    "price": "128.00",
    "sales": "0",
    "image": "http://192.168.125.12:8082/img/nz37.jpg"
  }, {
    "gid": "286026274",
    "cid": "496",
    "title": "ONLY冬装新品雪纺拼接流苏腰带长款连衣裙女",
    "price": "399.00",
    "sales": "10",
    "image": "http://192.168.125.12:8082/img/nz38.jpg"
  }],
  "pageinfo": {
    "pagesize": "10",
    "page": "2",
    "pagenum": "2",
    "total": 16
  }
}
var data11 = {
  "status": 1,
  "data": [{
    "data": {
      "keywords": "连衣裙",
      "code": 200,
      "data": [{
        "gid": "873512747",
        "cid": "492",
        "title": "蕾丝半身裙女2018春夏新款韩版修身包臀a字纯色不规则裙 CM81004",
        "price": "118.00",
        "sales": "100",
        "image": "http://192.168.125.12:8082/img/nz38.jpg"
      }, {
        "gid": "785391832",
        "cid": "492",
        "title": "2018春秋新款网纱a字裙女复古长款半身裙宽松高腰韩版黑色伞裙夏",
        "price": "79.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/nz39.jpg"
      }, {
        "gid": "753424386",
        "cid": "492",
        "title": "2018夏季新款A字中裙半身裙女复古小格子高腰荷叶边不规则鱼尾裙",
        "price": "255.00",
        "sales": "70",
        "image": "http://192.168.125.12:8082/img/nz40.jpg"
      }, {
        "gid": "226362889",
        "cid": "492",
        "title": "扇百戏局杂技团2017秋季新款拼接撞色褶皱蓬蓬裙荷叶边半身裙",
        "price": "288.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/nz41.png"
      }, {
        "gid": "714246965",
        "cid": "492",
        "title": "裙装裙装6",
        "price": "100.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/nz42.png"
      }, {
        "gid": "617862381",
        "cid": "496",
        "title": "裙装裙装5",
        "price": "100.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/nz43.jpg"
      }, {
        "gid": "684006549",
        "cid": "496",
        "title": "裙装裙装4",
        "price": "200.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/nz23.jpg"
      }, {
        "gid": "704909428",
        "cid": "496",
        "title": "裙装裙装3",
        "price": "0.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/nz24.jpg"
      }, {
        "gid": "452502287",
        "cid": "496",
        "title": "裙装裙装2",
        "price": "10.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/nz26.jpg"
      }, {
        "gid": "512829844",
        "cid": "496",
        "title": "裙装裙装",
        "price": "100.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/nz22.jpg"
      }]
    }
  }, {
    "data": {
      "keywords": "羽绒服",
      "code": 200,
      "data": [{
        "gid": "534523517",
        "cid": "493",
        "title": "PZP mountain baltoro jacket downinsulation雪山联名棉羽绒服",
        "price": "188.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/n1.png"
      }, {
        "gid": "252173006",
        "cid": "493",
        "title": "2017重工加厚羽绒服男士户外中长款大毛领韩版保暖衣修身防水外套",
        "price": "159.00",
        "sales": "30",
        "image": "http://192.168.125.12:8082/img/n2.jpg"
      }, {
        "gid": "941801102",
        "cid": "493",
        "title": "阿迪达斯羽绒服男 2016冬季大码保暖运动服休闲连帽外套",
        "price": "139.00",
        "sales": "20",
        "image": "http://192.168.125.12:8082/img/n3.jpg"
      }, {
        "gid": "704407997",
        "cid": "493",
        "title": "波司登2016新款加厚男士羽绒服中长款带帽保暖冬外套",
        "price": "118.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/n4.jpg"
      }, {
        "gid": "124555205",
        "cid": "496",
        "title": "Bosideng/波司登2016新款90%鹅绒男轻薄中长款连帽羽绒服",
        "price": "128.00",
        "sales": "0",
        "image": "http://192.168.125.12:8082/img/n5.jpg"
      }, {
        "gid": "286026274",
        "cid": "496",
        "title": "Bosideng/波司登2016新款90%鹅绒男轻薄中长款连帽羽绒服",
        "price": "399.00",
        "sales": "10",
        "image": "http://192.168.125.12:8082/img/n6.jpg"
      }]
    }
  }]
}
var data12 = {
  "status": 2,
  "code": 404,
  "data": [{
    "data": [{
      "code": 404,
      "title": "抱歉,没有搜索到相关内容!",
      "image": "http://192.168.125.12:8082/img/404.jpg"
    }]
  }]
}
var data13 = {
  "status": 1,
  "code": 200,
  "data": [{
    "cid": "492",
    "title": "潮流女装",
    "state": false
  }, {
    "cid": "493",
    "title": "品牌男装",
    "state": false
  }, {
    "cid": "494",
    "title": "电脑办公",
    "state": false
  }, {
    "cid": "495",
    "title": "手机数码",
    "state": false
  }, {
    "cid": "496",
    "title": "母婴童装",
    "state": false
  }, {
    "cid": "497",
    "title": "图书",
    "state": false
  }, {
    "cid": "498",
    "title": "家居家纺",
    "state": false
  }, {
    "cid": "499",
    "title": "居家生活",
    "state": false
  }, {
    "cid": "500",
    "title": "家居建材",
    "state": false
  }]
}
var data14 = {
  "status": 1,
  "code": 200,
  "data": [{
    "price1": "0",
    "price2": "50",
    "state": false
  }, {
    "price1": "50",
    "price2": "200",
    "state": false
  }, {
    "price1": "200",
    "price2": "800",
    "state": false
  }, {
    "price1": "800",
    "price2": "2000",
    "state": false
  }, {
    "price1": "2000",
    "price2": "5000",
    "state": false
  }, {
    "price1": "5000",
    "price2": "9999",
    "state": false
  }],
  "data1": [{
    'sport': "阿迪达斯"
  }, {
    'sport': "耐克"
  }, {
    'sport': "安德玛"
  }, {
    'sport': "万斯"
  }, {
    'sport': "李宁"
  }]
}
var data16 = [{
  "attrid": "964",
  "title": "品牌",
  "param": [{
    "pid": "965",
    "title": "美动态"
  }, {
    "pid": "966",
    "title": "恒源祥"
  }, {
    "pid": "1020",
    "title": "筱岚"
  }, {
    "pid": "1021",
    "title": "娇茹妮"
  }, {
    "pid": "1022",
    "title": "香后"
  }]
}, {
  "attrid": "967",
  "title": "选购热点",
  "param": [{
    "pid": "968",
    "title": "加肥加大"
  }, {
    "pid": "969",
    "title": "藏肉"
  }, {
    "pid": "970",
    "title": "修身显瘦"
  }]
}]
var data17 = [{
  "attrid": "974",
  "title": "品牌",
  "param": [{
    "pid": "975",
    "title": "波司登"
  }, {
    "pid": "976",
    "title": "adidas"
  }]
}, {
  "attrid": "977",
  "title": "衣长",
  "param": [{
    "pid": "978",
    "title": "中长款"
  }, {
    "pid": "979",
    "title": "常规"
  }, {
    "pid": "980",
    "title": "长款"
  }, {
    "pid": "981",
    "title": "短款"
  }, {
    "pid": "982",
    "title": "超短"
  }]
}]
var allData = {
  "status": 1,
  "code": 200,
  "data": [{
    "title": "连衣裙",
    "code": 200,
    "data": data16
  }, {
    "title": "羽绒服",
    "code": 200,
    "data": data17
  }]
}
var data18 = {
  "status": 1,
  "code": 200,
  "data": [{
    "attrid": "1006",
    "title": "颜色",
    "values": [{
      "vid": "1394",
      "value": "红色",
      "checked": false
    }, {
      "vid": "1395",
      "value": "白色",
      "checked": false
    }, {
      "vid": "1396",
      "value": "黑色",
      "checked": false
    }, {
      "vid": "1397",
      "value": "黄色",
      "checked": false
    }]
  }, {
    "attrid": "1007",
    "title": "尺寸",
    "values": [{
      "vid": "1399",
      "value": "S",
      "checked": false
    }, {
      "vid": "1400",
      "value": "M",
      "checked": false
    }, {
      "vid": "1401",
      "value": "L",
      "checked": false
    }, {
      "vid": "1402",
      "value": "XL",
      "checked": false
    }]
  }]
}
var imgData = {
  "status": 1,
  "code": 200,
  "data": [{
    "code": 200,
    "gid": "944196216",
    "title": "小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋",
    "price": 288,
    "freight": 0,
    "sales": "0",
    "bodys": "高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带",
    "images": [
      "http://192.168.125.12:8082/img/nz5.jpg",
      "http://192.168.125.12:8082/img/nz6.jpg",
      "http://192.168.125.12:8082/img/nz7.jpg"
    ]
  }, {
    "code": 200,
    "gid": "767430600",
    "title": "雪兰黛2018春季新款高跟鞋尖头细跟性感鞋子女韩版透气纱网女单鞋 ",
    "price": 280,
    "freight": 10,
    "sales": "0",
    "bodys": "高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带",
    "images": [
      "http://192.168.125.12:8082/img/nz2.jpg",
      "http://192.168.125.12:8082/img/nz3.jpg",
      "http://192.168.125.12:8082/img/nz4.jpg"
    ]
  }, {
    "code": 200,
    "gid": "189918736",
    "title": "2018夏季新款韩版百搭高跟鞋女显瘦细跟黑色工作鞋金属扣露趾凉鞋",
    "price": 300,
    "freight": 20,
    "sales": "0",
    "bodys": "高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带",
    "images": [
      "http://192.168.125.12:8082/img/nz21.jpg",
      "http://192.168.125.12:8082/img/nz22.jpg",
      "http://192.168.125.12:8082/img/nz23.jpg"
    ]
  }, {
    "code": 200,
    "gid": "205476485",
    "title": "2018新款韩版高跟鞋女凉鞋夏细跟尖头一字扣猫跟鞋包头百搭磨砂皮",
    "price": 200,
    "freight": 20,
    "sales": "0",
    "bodys": "高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带",
    "images": [
      "http://192.168.125.12:8082/img/nz24.jpg",
      "http://192.168.125.12:8082/img/nz25.jpg",
      "http://192.168.125.12:8082/img/nz26.jpg"
    ]
  }]
}
var reviewData = {
  "status": 1,
  "code": 200,
  "data": [{
    "nickname": "苏玉婵",
    "head": "http://192.168.125.12:8082/img/xz2.png",
    "content": "落叶寄相思",
    "times": "2019-01-10 16:16:56"
  }, {
    "nickname": "罗明松",
    "head": "http://192.168.125.12:8082/img/xz2.png",
    "content": "三叶不言中",
    "times": "2019-01-10 16:16:45"
  }, {
    "nickname": "袁飞",
    "head": "http://192.168.125.12:8082/img/xz2.png",
    "content": "梧桐知相惜",
    "times": "2019-01-10 16:16:27"
  }, {
    "nickname": "缪代旭",
    "head": "http://192.168.125.12:8082/img/xz2.png",
    "content": "枫银本同季",
    "times": "2019-01-10 16:16:16"
  }, {
    "nickname": "龚兴文",
    "head": "http://192.168.125.12:8082/img/xz2.png",
    "content": "送君三捆扎",
    "times": "2019-01-10 16:11:57"
  }, {
    "nickname": "陈认可",
    "head": "http://192.168.125.12:8082/img/xz2.png",
    "content": "吾愿等三生",
    "times": "2019-01-10 16:10:09"
  }, {
    "nickname": "邓成超",
    "head": "http://192.168.125.12:8082/img/xz2.png",
    "content": "叶落知秋，与君分离，",
    "times": "2017-02-13 17:16:59"
  }, {
    "nickname": "刘红艳",
    "head": "http://192.168.125.12:8082/img/xz2.png",
    "content": "过往三秋，夜夜思君，",
    "times": "2017-02-13 17:16:59"
  }],
  "data1": [
    {
      "nickname": "宿瑜婵",
      "head": "http://192.168.125.12:8082/img/xz2.png",
      "content": "落叶寄相思",
      "times": "2019-01-10 16:16:56"
    }, {
      "nickname": "张慢慢",
      "head": "http://192.168.125.12:8082/img/xz2.png",
      "content": "春赏百花冬观雪,醒亦念卿,梦亦念卿",
      "times": "2019-01-10 16:16:56"
    }
  ],
  "pageinfo": {
    "pagesize": "8",
    "page": "1",
    "pagenum": "2",
    "total": 10
  }
}
var detailsImg = {
  "status": 1,
  "code": 200,
  "data": [
    {
      "img": "http://192.168.125.12:8082/img/tb1.jpg"
    },
    {
      "img": "http://192.168.125.12:8082/img/tb2.jpg"
    },
    {
      "img": "http://192.168.125.12:8082/img/tb3.jpg"
    },
    {
      "img": "http://192.168.125.12:8082/img/tb4.jpg"
    },
    {
      "img": "http://192.168.125.12:8082/img/tb5.jpg"
    },
    {
      "img": "http://192.168.125.12:8082/img/tb6.jpg"
    },
    {
      "img": "http://192.168.125.12:8082/img/tb7.jpg"
    },
    {
      "img": "http://192.168.125.12:8082/img/tb8.jpg"
    }
  ]
}
var register = {
  "status": 1,
  "code": 200,
  "data": [
    {
      "mobile": "18483671471",
      "alert": "该手机号已经注册",
      "pas": "123456",
      "state": 1,
      "uid": 10001,
      "name": '皮皮虾10001'
    }, {
      "mobile": "13795566893",
      "alert": "该手机号已经注册",
      "pas": "123456",
      "state": 1,
      "uid": 10002,
      "name": '皮皮虾10002'
    }
  ]
}
var web = {
  "status": 1,
  "code": 200,
  "data": 'web'
}
app.use(express.static(path.join(__dirname, 'public')));
//websocket测试
app.get('/webtest',(req,res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  // console.log(req)
  res.send(web)
})
//index轮播图加载
app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data)
})
//index产品分类
app.get('/nav', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data1)
})
//index产品明细
app.get('/goodslevel', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data2)
})
//index为你推荐
app.get('/recommend', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data3)
})
//goods左侧导航
app.get('/goodsclass', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data4)
})
//goods右侧界面
app.get('/goodsitems', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.query.cid) {
    if (req.query.cid === '492') {
      res.send(data6)
    }
    else if (req.query.cid === '493') {
      res.send(data5)
    }
    else {
      res.send(data7)
    }
  }
  else {
    res.send(data6)
  }
})
app.get('/words', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data8)
})
app.get('/search', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data9)
})
app.get('/loading', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data10)
})
//浏览器关键词搜索
var getdata = [];
app.get('/searchkey', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  for (let i = 0; i < data11.data.length; i++) {
    getdata.push(data11.data[i].data.keywords)
  }
  if (getdata.indexOf(req.query.keywords) === -1) {
    res.send(data12.data[0]);
  }
  else {
    if (req.query.cid === '' && req.query.price1 === '') {
      res.send(data11.data[getdata.indexOf(req.query.keywords)].data);
    } else if (req.query.cid !== '' && req.query.price1 === '') {
      let cidData = [];
      for (let i = 0; i < data11.data[getdata.indexOf(req.query.keywords)].data.data.length; i++) {
        if (req.query.cid === data11.data[getdata.indexOf(req.query.keywords)].data.data[i].cid) {
          cidData.push(data11.data[getdata.indexOf(req.query.keywords)].data.data[i])
        }
      }
      let cidData1 = {
        "code": 200,
        "data": cidData
      };
      res.send(cidData1)
    } else if (req.query.cid === '' && req.query.price1 !== '') {
      let cidData = [];
      for (let i = 0; i < data11.data[getdata.indexOf(req.query.keywords)].data.data.length; i++) {
        if (parseInt(req.query.price1) <= parseInt(data11.data[getdata.indexOf(req.query.keywords)].data.data[i].price) && parseInt(req.query.price2) >= parseInt(data11.data[getdata.indexOf(req.query.keywords)].data.data[i].price)) {
          cidData.push(data11.data[getdata.indexOf(req.query.keywords)].data.data[i])
        }
      }
      let cidData1 = {
        "code": 200,
        "data": cidData
      };
      res.send(cidData1)
    } else {
      let cidData = [];
      for (let i = 0; i < data11.data[getdata.indexOf(req.query.keywords)].data.data.length; i++) {
        if (parseInt(req.query.price1) <= parseInt(data11.data[getdata.indexOf(req.query.keywords)].data.data[i].price) && parseInt(req.query.price2) >= parseInt(data11.data[getdata.indexOf(req.query.keywords)].data.data[i].price) && req.query.cid === data11.data[getdata.indexOf(req.query.keywords)].data.data[i].cid) {
          cidData.push(data11.data[getdata.indexOf(req.query.keywords)].data.data[i])
        }
      }
      let cidData1 = {
        "code": 200,
        "data": cidData
      };
      res.send(cidData1)
    }
  }
})
//分类信息获取
app.get('/getnav', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data13)
})
//获取价格区间
app.get('/getprice', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data14)
})
//获取搜索品牌样式
app.get('/getattr', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  allData.data.find(element => {
    if (element.title === req.query.keywords) {
      res.send(element)
    }
  })
})
//获取商品详情样式
app.get('/goodsinfo', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data18);
})
//连接Oracle数据库
var oracledb = require('oracledb');
oracledb.autoCommit = true;
function unique(arr) {
  return Array.from(new Set(arr))
}
app.get('/dianji', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  oracledb.getConnection({
    user: 'accm',　　//用户名
    password: 'accm2013',　　//密码
    //IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
    connectString: "10.244.125.39:1521/wms"
  }, function (err, connection) {
    if (err) {
      console.error(err.message);
      return
    }
    if (req.query.num === '') {
      connection.execute("select * from gis_click", function (err, result) {
        if (err) {
          console.error(err.message);
          return
        }
        //json处理
        var arr1 = [];
        var arr2 = [];
        for (let i = 0; i < result.rows.length; i++) {
          arr1.push(result.rows[i][2])
          if (result.rows[i][3] === 0) {
            arr2.push(result.rows[i])
          }
        }
        arr1 = unique(arr1)
        var arrData = {
          "status": 1,
          "code": 200,
          "data": [{
            "sys": arr2
          }, {
            "date": arr1
          }]
        }
        res.send(arrData)
      })
    }
    else {
      connection.execute("select * from gis_click", function (err, result) {
        if (err) {
          console.error(err.message);
          return
        }
        //json处理
        var arr1 = [];
        var arr2 = [];
        for (let i = 0; i < result.rows.length; i++) {
          arr1.push(result.rows[i][2])
          if (result.rows[i][3] === parseInt(req.query.num)) {
            arr2.push(result.rows[i])
          }
        }
        arr1 = unique(arr1)
        var arrData = {
          "status": 1,
          "code": 200,
          "data": [{
            "sys": arr2
          }, {
            "date": arr1
          }]
        }
        res.send(arrData)
      })
    }
  })
})
//获取系统名称
app.get('/getsystem', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  oracledb.getConnection({
    user: 'accm',　　//用户名
    password: 'accm2013',　　//密码
    //IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
    connectString: "10.244.125.39:1521/wms"
  }, function (err, connection) {
    if (err) {
      console.error(err.message);
      return
    }
    if (req.query.keywords === '') {
      connection.execute("select system from gis_click", function (err, result) {
        if (err) {
          console.error(err.message);
          return
        }
        //json处理
        var arr1 = [];
        for (let i = 0; i < result.rows.length; i++) {
          arr1.push(result.rows[i][0])
        }
        arr1 = unique(arr1)
        res.send(arr1)
      })
    }
    else {
      connection.execute("select * from gis_click where system='" + req.query.keywords + "'", (err, result) => {
        if (err) {
          console.error(err.message);
          return;
        }
        //json处理
        var arr1 = [];//月份
        var arr2 = [];//数据
        for (let i = 0; i < result.rows.length; i++) {
          arr1.push(result.rows[i][2])
          arr2.push(result.rows[i][1])
        }
        var arrData = {
          "status": 1,
          "code": 200,
          "data": [{
            "date": arr1
          }, {
            "data": arr2
          }]
        }
        res.send(arrData)
      })
    }
  })
})
//加载照片详情
app.get('/imgdata', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  imgData.data.find(element => {
    if (element.gid === req.query.gid) {
      res.send(element)
    }
  })
})
//加载评论
app.get('/reviewdata', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(reviewData)
})
//商品详情界面
app.get('/detailsimg', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(detailsImg)
})
//手机号注册检测
app.get('/mobileregis', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(register)
})
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
//注册
app.post('/mobile', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  register.data.push({
    "mobile": req.body.regis,
    "alert": "该手机号已经注册",
    "pas": req.body.pas,
    "state": 1,
    "uid": 10003,
    "name": '皮皮虾10003'
  })
})
//登录检测
app.post('/mobilelogin', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  var kk = register.data.find(e => {
    return e.mobile === req.body.user;
  })
  if (kk) {
    var cc = register.data.find(e => {
      if (e.mobile === req.body.user && e.pas === req.body.pas) {
        return true;
      }
    })
    if (cc) {
      let data2 = {
        "code": 200,
        "data": cc
      }
      res.send(data2)
    } else {
      let data1 = {
        "code": 201,
      }
      res.send(data1)
    }
  } else {
    let data3 = {
      "code": 404
    }
    res.send(data3)
  }
})
//添加收货地址
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/nemo";
app.post('/insertaddress', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 插入数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    dbase.createCollection('address', function (err, res1) {
      if (err) throw err;
      let data = {
        "code": 200,
        "status": 1,
        "data": {
          'uid': req.body.uid,
          'province': req.body.province,
          'city': req.body.city,
          'area': req.body.area,
          'detailsAddress': req.body.detailsAddress,
          'connector': req.body.connector,
          'mobile': req.body.mobile,
          'defaultState': req.body.defaultState
        }
      }
      if (req.body.defaultState === '1') {
        dbase.collection('address').updateMany({ 'data.defaultState': req.body.defaultState }, { $set: { 'data.defaultState': '0' } })
      }
      dbase.collection('address').insertOne(data, (err, res2) => {
        if (err) throw err;
        let data0 = {
          "code": 200
        }
        res.send(data0)
      })
    });
  });
})
//加载收货地址
app.post('/selectaddress', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 查询数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    dbase.collection('address').find({ "data.uid": req.body.uid }).sort({ 'data.defaultState': -1 }).toArray((err, result) => {
      if (err) throw err;
      res.send(result)
    })
  });
})
//删除收货地址
app.post('/deleteaddress', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 删除数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let data = {
      'data.uid': req.body.uid,
      'data.province': req.body.province,
      'data.city': req.body.city,
      'data.area': req.body.area,
      'data.detailsAddress': req.body.detailsAddress,
      'data.connector': req.body.connector,
      'data.mobile': req.body.mobile,
    }
    let statu = {
      "code": 200
    }
    dbase.collection('address').deleteOne(data)
    res.send(statu)
  });
})
//获取默认收货地址
app.post('/getDetaultAddress', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 删除数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let data = {
      'data.defaultState': req.body.defaultState,
    }
    let statu = {
      "code": 200
    }
    dbase.collection('address').find(data).toArray((err, result) => {
      if (err) throw err;
      res.send(result)
    })
  });
})
//修改收货地址
app.post('/updateaddress', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 删除数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let statu = {
      "code": 200
    }
    let data = {
      'data.uid': req.body.uid,
      'data.province': req.body.province,
      'data.city': req.body.city,
      'data.area': req.body.area,
      'data.detailsAddress': req.body.detailsAddress,
      'data.connector': req.body.connector,
      'data.mobile': req.body.mobile,
    }
    dbase.collection('address').find(data).toArray((err, result) => {
      if (err) throw err;
      res.send(statu)
    })
  });
})
function getNextSequenceValue(sequenceName, fn) {
  let number = 0;
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    dbase.collection('counter').findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequence_value: 1 } },
      { "new": true }
    );
    dbase.collection('counter').find({ _id: sequenceName }).toArray((err, result) => {
      if (err) throw err;
      number = result[0].sequence_value;
      fn(number)
    })
  });
}
//添加订单
app.post('/addorder', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  getNextSequenceValue('productid', createOrderItem(req, res))
})
function createOrderItem(req, res) {
  return function orderItem(id) {
    //连接mongo数据库 插入数据
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbase = db.db("buddy");
      dbase.createCollection('order', function (err, res1) {
        if (err) throw err;
        let data = {
          "code": 200,
          "status": 1,
          "_id": id,
          "data": {
            'uid': req.body.uid,
            'total': req.body.total,
            'freight': req.body.freight,
            'goodsdata': JSON.parse(req.body.goodsdata),
            'orderid': req.body.orderid
          }
        }
        dbase.collection('order').insertOne(data, (err, res2) => {
          if (err) throw err;
          res.send(data)
        })
      });
    });
  }
}
//查询订单
app.post('/selectorder', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let uid = req.body.uid;
    dbase.collection('order').find({ 'data.uid': uid }).toArray((err, result) => {
      if (err) throw err;
      res.send(result)
    })
  });
})
//图片上传地址
var fm = require('formidable');
var fs = require('fs');
app.post('/uploadimg', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  var form = new fm.IncomingForm();
  form.uploadDir = path.join(__dirname, 'public/uploads');
  // uploadDir设置文件的上传的路径
  form.parse(req);
  form.on('file', function (field, file) {
    fs.renameSync(file.path, path.join(form.uploadDir, '/icon.png'))
  })
  // form.on('end', function () {
  //     console.log('upload success')
  // })
  let data = {
    "code": 200,
    "img": 'http://192.168.125.12:8082/uploads/icon.png'
  }
  setTimeout(() => {
    res.send(data)
  }, 100);
})
//基本信息存入数据库
app.post('/uploaduserinfo', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    dbase.createCollection('userinfo', function (err, res1) {
      if (err) throw err;
      let data = {
        "code": 200,
        "status": 1,
        "data": {
          'uid': req.body.uid,
          'nickName': req.body.nickName,
          'sex': req.body.sex,
          'headImg': req.body.headImg,
        }
      }
      dbase.collection('userinfo').find({ 'data.uid': req.body.uid }).toArray((err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          dbase.collection('userinfo').insertOne(data, (err, res2) => {
            if (err) throw err;
            let data0 = {
              "code": 200
            }
            res.send(data0)
          })
        }
        else {
          dbase.collection('userinfo').updateOne({ 'data.uid': req.body.uid }, { $set: { 'data.nickName': req.body.nickName, 'data.sex': req.body.sex, 'data.headImg': req.body.headImg } })
          dbase.collection('userinfo').find({ 'data.uid': req.body.uid }).toArray((err, result1) => {
            if (err) throw err;
            let userData = {
              'code': 200,
              "data": result1
            }
            res.send(userData)
          })
        }
      });
    });
  });
})
//确认付款
app.post('/surepay', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 删除数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    dbase.createCollection('suregoods', (err, res1) => {
      if (err) throw err;
    })
    let id = Number(req.body.id)
    dbase.collection('order').find({ '_id': id }).forEach(function (x) {
      dbase.collection('suregoods').insertOne(x);
    });
    dbase.collection('order').deleteOne({ '_id': id });
  });
  let data = {
    'code': 200
  }
  res.send(data)
})
//确认收货
app.post('/suregoods', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 查询数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let uid = req.body.uid;
    dbase.collection('suregoods').find({ 'data.uid': uid }).toArray((err, result) => {
      if (err) throw err;
      res.send(result)
    })
  });
})
//确认评价
app.post('/surereview', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 删除数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    dbase.createCollection('surereview', (err, res1) => {
      if (err) throw err;
    })
    let id = Number(req.body.id)
    dbase.collection('suregoods').find({ '_id': id }).forEach(function (x) {
      dbase.collection('surereview').insertOne(x);
    });
    dbase.collection('suregoods').deleteOne({ '_id': id });
  });
  let data = {
    'code': 200
  }
  res.send(data)
})
//加载评价
app.post('/loadreview', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 查询数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let uid = req.body.uid;
    dbase.collection('surereview').find({ 'data.uid': uid }).toArray((err, result) => {
      if (err) throw err;
      res.send(result)
    })
  });
})
//已经完成的订单
app.post('/overorder', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 删除数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    dbase.createCollection('overorder', (err, res1) => {
      if (err) throw err;
    })
    let id = Number(req.body.id)
    dbase.collection('surereview').find({ '_id': id }).forEach(function (x) {
      dbase.collection('overorder').insertOne(x);
    });
    dbase.collection('surereview').deleteOne({ '_id': id });
  });
  let data = {
    'code': 200
  }
  res.send(data)
})
//加载已经完成的订单
app.post('/selectoverorder', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 查询数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let uid = req.body.uid;
    dbase.collection('overorder').find({ 'data.uid': uid }).toArray((err, result) => {
      if (err) throw err;
      res.send(result)
    })
  });
})
//删除已经完成的订单
app.post('/deleteoverorder', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 查询数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let id = Number(req.body.id)
    dbase.collection('overorder').deleteOne({ '_id': id });
    dbase.collection('overorder').find({ '_id': id }).toArray((err, result) => {
      if (err) throw err;
      res.send(result)
    })
  });
})
//查询订单详情
app.post('/selectorderdetails', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 查询数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let id = Number(req.body.id);
    dbase.collection('overorder').find({ '_id': id }).toArray((err, result) => {
      if (err) throw err;
      res.send(result)
    })
  });
})
//添加我的收藏
app.post('/addmylove', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 查询数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    dbase.createCollection('mylove', (err, res1) => {
      if (err) throw err
    })
    let data = {
      "price": req.body.price,
      "title": req.body.title,
      "gid": req.body.gid,
      "img": req.body.img,
      "uid": req.body.uid,
    }
    dbase.collection('mylove').insertOne(data, (err, res2) => {
      res.send({
        "code": 200
      })
    })
  });
})
app.post('/getlovedata', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 查询数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let uid = req.body.uid;
    dbase.collection('mylove').find({ "uid": uid }).toArray((err, result) => {
      if (err) throw err;
      res.send(result)
    })
  });
})
//删除收藏
app.post('/deletemylove', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  //连接mongo数据库 查询数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("buddy");
    let uid = req.body.uid;
    dbase.collection('mylove').deleteOne({ 'uid': uid });
    res.send({
      "code": 200
    })
  });
})
// const WebSocket = require('ws').Server;
// var wss = new WebSocket({ host: '192.168.125.12', port: 8001 });
// wss.on('connection', function (ws) {
//     console.log('server: 收到连接');
//     ws.on('message', function (message) {
//         console.log('server: 收到消息', JSON.parse(message));
//         //连接mongo数据库 查询数据
//         MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
//             if (err) throw err;
//             var dbase = db.db("buddy");
//             let uid = JSON.parse(message).uid;
//             dbase.collection('mylove').deleteOne({ 'uid': uid });
//         });
//     });
//     ws.send('server: hi，客户端');
// });
app.get('/testhtml', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log('sss', req.query.html)
  //连接mongo数据库 查询数据
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("nemo");
    dbase.createCollection('html', (err, res1) => {
      if (err) throw err;
      let data = {
        "code": 200,
        "status": 1,
        "data": {
          "html": req.query.html,
          "id": req.query.id
        }
      }
      dbase.collection('html').find({}).toArray((err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          dbase.collection('html').insertOne(data, (err, res2) => {
            if (err) throw err;
            res.send(data)
          })
        } else {
          dbase.collection('html').updateOne({ 'data.id': req.query.id }, { $set: { 'data.html': req.query.html } })
          dbase.collection('html').find({ 'data.id': req.query.id }).toArray((err, result1) => {
            if (err) throw err;
            let userData = {
              'code': 200,
              "data": result1
            }
            res.send(userData)
          })
        }
      })
    })
  });
})
app.get('/testhtmldata', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("nemo");
    dbase.collection('html').find({ 'data.id': req.query.id }).toArray((err, result) => {
      if (err) throw err;
      let userData = {
        'code': 200,
        "data": result
      }
      res.send(userData)
    })
  });
})
var status='a'
app.post('/mxLogin',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  let openid='oAgIs5MF7KVLZ4FijDMSc01yOqA0'
  let code=req.body.code
  // console.log(req.body.avatarUrl)
  // console.log(req.body.nickName)
  let appid='wx8e0e2a88e974b63c'
  let secert='6fc7908ba4df41a1ce36fa9e87b20e2f'
  let url=`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secert}&js_code=${code}&grant_type=authorization_code`
  // axios.get(url).then(res=>{
  //   //console.log(res.data.openid)
  //   status=res.data.openid
  // })
  const p=new Promise((resolve,reject)=>{
    axios.get(url).then(res=>{
      resolve(res.data.openid)
    }).catch(error=>{
      reject(error)
    })
  })
  //判断openid是否存在数据库，若有，直接登录，无则注册
  p.then(data=>{
    if(data===openid){
      res.send({
        code:200,
        msg:'ok',
        data:{
          avatarUrl:req.body.avatarUrl,
          nickName:req.body.nickName
        }
      })
    }else{
      res.send({
        code:404
      })
    }
  })
})
/*http*/
var server = app.listen(8082, '192.168.125.12', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
/*websocket*/
// var server=ws.createServer(conn=>{
//   console.log('New connection'); // 表示新的连接进来了
// }).listen(8082)