let airLines = {};
// airLines["000"] = {nameZh:'伊朗马汉航空',nameEn:'Mahan Airlines',nameEnAbbr:'',flightCode:'W5',pageUrl:'https://my.jetpak.com/track/910.xmlc'};
airLines["001"] = {nameZh:'美国美洲航空公司',nameEn:'American Airlines',nameEnAbbr:'AAL',flightCode:'AA',pageUrl:'https://www.aacargo.com/mobile/tracking-details.html?awb=lineCodeshipmentNum'};
airLines["006"] = {nameZh:'美国达美航空公司',nameEn:'Delta Air Lines',nameEnAbbr:'DAL',flightCode:'DL',pageUrl:'https://www.deltacargo.com/Cargo/#/trackShipment?awbNumber=lineCodeshipmentNum'};
airLines["014"] = {nameZh:'加拿大航空公司',nameEn:'Air Canada',nameEnAbbr:'ACA',flightCode:'AC',pageUrl:'https://www.aircanada.com/cargo/en/tools-forms/?s_acn=lineCode&s_sref=shipmentNum'};
airLines["016"] = {nameZh:'美国联合航空公司',nameEn:'United Airlines',nameEnAbbr:'UAL',flightCode:'UA',pageUrl:'https://www.unitedcargo.com/OurNetwork/TrackingCargo1512/Tracking.jsp?id=shipmentNum&pfx=lineCode'};
airLines["018"] = {nameZh:'上海吉祥航空货运',nameEn:'JUNEYAO Air',nameEnAbbr:'',flightCode:'',pageUrl:'http://cargo.juneyaoair.com/NewWeb/NQueryFrameAwben.aspx?Billid=lineCodeshipmentNum'};
airLines["020"] = {nameZh:'德国汉莎航空',nameEn:'Lufthansa Cargo AG',nameEnAbbr:'DLH',flightCode:'LH',pageUrl:'https://lufthansa-cargo.com/eservices/etracking/awb-details/-/awb/lineCode/shipmentNum?searchFilter=awb'};
airLines["023"] = {nameZh:'美联邦航空公司',nameEn:'Fedex',nameEnAbbr:'',flightCode:'FX',pageUrl:'https://www.fedex.com/apps/fedextrack/?tracknumbers=lineCodeshipmentNum'};
// airLines["027"] = {nameZh:'阿拉斯加航空公司',nameEn:'Alaska Airlines',nameEnAbbr:'ASA',flightCode:'AS',pageUrl:'http://cargo.alaskaair.com/awbtrackui/awbtrack.aspx'};
airLines["031"] = {nameZh:'肯尼亚航空',nameEn:'Kenya Airways',nameEnAbbr:'',flightCode:'',pageUrl:'https://www.kqcargo.com/track-and-trace.aspx?awb=lineCodeshipmentNum'};
airLines["043"] = {nameZh:'国泰航空',nameEn:'Cathay Pacific Airways Limited',nameEnAbbr:'',flightCode:'',pageUrl:'https://www.cathaypacificcargo.com/ManageYourShipment/TrackYourShipment/tabid/108/SingleAWBNo/lineCode-shipmentNum/language/en-US/Default.aspx'};
airLines["044"] = {nameZh:'阿根廷航空公司',nameEn:'AEROLINEAS',nameEnAbbr:'ARG',flightCode:'AR',pageUrl:'https://aerolineas.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=lineCode&AWBNo=shipmentNum'};
airLines["045"] = {nameZh:'智利拉塔姆航空',nameEn:'LATAM Cargo',nameEnAbbr:'LAN',flightCode:'LA',pageUrl:'https://mycargomanager.appslatam.com/etracking-web/publico/detalleGuia.do?lang=EN&style=LA&prefix=lineCode&number=shipmentNum'};
airLines["047"] = {nameZh:'TAP葡萄牙航空 公司',nameEn:'TAP AIR PORTUQAL',nameEnAbbr:'TAP',flightCode:'TP',pageUrl:'https://www.tapcargo.com/en/Tracking-Results?countryCode=lineCode&consignmentNote=shipmentNum'};
airLines["048"] = {nameZh:'塞浦路斯航空',nameEn:'Cyprus Airways',nameEnAbbr:'CYP',flightCode:'CY',pageUrl:'http://www.cargoupdate.com/tracktrace/'};
// airLines["055"] = {nameZh:'意大利航空公司',nameEn:'Alitalia',nameEnAbbr:'AZA',flightCode:'AZ',pageUrl:'https://www.skyteam.com/en/cargo/track-shipment/'};
airLines["057"] = {nameZh:'法国航空公司',nameEn:'Air France',nameEnAbbr:'AFR',flightCode:'AF',pageUrl:'https://www.afklcargo.com/mycargo/shipment/detail/lineCode-shipmentNum'};
// airLines["061"] = {nameZh:'塞舌尔航空公司',nameEn:'Air Seychelles',nameEnAbbr:'SEY',flightCode:'HM',pageUrl:'http://www.cargoserv.com/tracking.asp?Carrier=HM&Pfx=061'};
airLines["064"] = {nameZh:'捷克航空公司',nameEn:'CSA Czech Airlines',nameEnAbbr:'CSA',flightCode:'OK',pageUrl:'http://www.csacargo.cz/en/products-service/track-and-trace?prefix=lineCode&number=shipmentNum'};
airLines["065"] = {nameZh:'沙特阿拉伯航空公司',nameEn:'Saudi Arabian Airlines',nameEnAbbr:'SVA',flightCode:'SV',pageUrl:'https://www.saudiacargo.com/TrackyourShipmentResult.aspx?awbNumber=lineCodeshipmentNum'};
airLines["071"] = {nameZh:'埃塞俄比亚航空公司',nameEn:'Ethiopian airlines',nameEnAbbr:'ETH',flightCode:'ET',pageUrl:'https://cargo.ethiopianairlines.com/e-cargo/cargotrack?awbnumber=lineCode-shipmentNum'};
// airLines["072"] = {nameZh:'海湾航空公司',nameEn:'Gulf Air',nameEnAbbr:'GFA',flightCode:'GF',pageUrl:'http://www.cargo.sita.aero/webtracking/gf/tracking.asp'};
airLines["074"] = {nameZh:'荷兰皇家航空公司',nameEn:'KLM',nameEnAbbr:'KLM',flightCode:'KL',pageUrl:'https://www.afklcargo.com/mycargo/shipment/detail/lineCode-shipmentNum'};
airLines["075"] = {nameZh:'爱尔兰航空',nameEn:'IAG Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://www.iagcargo.com/iagcargo/portlet/en/html/601/main/search?awb.cia=lineCode&awb.cod=shipmentNum'};
airLines["076"] = {nameZh:'中东航空公司',nameEn:'Middle East Airlines',nameEnAbbr:'LAQ',flightCode:'LQ',pageUrl:'https://mea-icargo.ibsplc.aero:8443/meaportal/portal/trackshipments?trkTxnValue=lineCode-shipmentNum'};
airLines["077"] = {nameZh:'埃及航空公司',nameEn:'Egyptair',nameEnAbbr:'MSR',flightCode:'MS',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=MS&Shipment_text=lineCode-shipmentNum'};
airLines["079"] = {nameZh:'菲律宾航空公司',nameEn:'Philippine airlines',nameEnAbbr:'PAL',flightCode:'PR',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=PR&Shipment_text=lineCode-shipmentNum'};
airLines["080"] = {nameZh:'波兰航空公司',nameEn:'Lot Polish Airlines',nameEnAbbr:'LOT',flightCode:'LO',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=LO&Shipment_text=lineCode-shipmentNum'};
airLines["081"] = {nameZh:'快达航空公司',nameEn:'Qantas Airways',nameEnAbbr:'QFA',flightCode:'QF',pageUrl:'https://freight.qantas.com/online-tracking.html?airWaybills=lineCode-shipmentNum'};
// airLines["083"] = {nameZh:'南非航空公司',nameEn:'South African Airways',nameEnAbbr:'SAA',flightCode:'SA',pageUrl:'http://www.flysaa.com/za/en/Saa_Cargo_new/flysaa_cargo_track_a_shipment.html'};
// airLines["086"] = {nameZh:'新西兰航空公司',nameEn:'Air New Zealand',nameEnAbbr:'ANZ',flightCode:'NZ',pageUrl:'http://www.airnewzealand.co.uk/international-cargo#'};
airLines["096"] = {nameZh:'伊朗航空公司',nameEn:'Iran air',nameEnAbbr:'IRA',flightCode:'IR',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=IR&Shipment_text=lineCode-shipmentNum'};
// airLines["098"] = {nameZh:'印度航空公司',nameEn:'Air India',nameEnAbbr:'AIC',flightCode:'AI',pageUrl:'http://203.94.240.238/cargo-tracking.aspx'};
// airLines["105"] = {nameZh:'芬兰航空公司',nameEn:'Finnair Oyj',nameEnAbbr:'FIN',flightCode:'AY',pageUrl:'https://prdcgoay.mercator.com/skychain/app'};
// airLines["106"] = {nameZh:'加勒比航空',nameEn:'Caribbean Airlines',nameEnAbbr:'',flightCode:'',pageUrl:'https://cargo.caribbean-airlines.com/#/track'};
// airLines["108"] = {nameZh:'冰岛航空公司',nameEn:'Iceland air',nameEnAbbr:'ICE',flightCode:'FI',pageUrl:'https://www.icelandaircargo.com/tools/track-and-trace/'};
airLines["112"] = {nameZh:'中国货运航空',nameEn:'China Cargo Airlines LTD.',nameEnAbbr:'CKK',flightCode:'CK',pageUrl:'https://cargo.china-airlines.com/CCNetv2/content/manage/ShipmentTracking.aspx?AwbPfx=lineCode&AwbNum=shipmentNum&checkcode=*7*upHGj'};
airLines["114"] = {nameZh:'以色列航空公司',nameEn:'El Al Israel Airlines',nameEnAbbr:'ELY',flightCode:'LY',pageUrl:'http://www.elalextra.net/info/awb.asp?aid=lineCode&awb=shipmentNum'};
airLines["115"] = {nameZh:'塞尔维亚航空公司',nameEn:'Air Serbia',nameEnAbbr:'',flightCode:'',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=JU&Shipment_text=lineCode-shipmentNum'};
airLines["117"] = {nameZh:'北欧航空公司',nameEn:'Scandinavian Airlines System',nameEnAbbr:'SAS',flightCode:'SK',pageUrl:'https://www.sascargo.com/shippingdetails.aspx?source=sitecore&prefix=lineCode&awb=shipmentNum&url=http%3A%2F%2Fwww.sascargo.com%2F'};
airLines["118"] = {nameZh:'安哥拉航空公司',nameEn:'TAAG - Linhas Aereas de Angola',nameEnAbbr:'DTA',flightCode:'DT',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=DT&Shipment_text=lineCode-shipmentNum'};
airLines["124"] = {nameZh:'阿尔及利亚航空公司',nameEn:'Air Algerie',nameEnAbbr:'DAH',flightCode:'AH',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=AH&Shipment_text=lineCode-shipmentNum'};
airLines["125"] = {nameZh:'爱尔兰航空',nameEn:'IAG Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://www.iagcargo.com/iagcargo/portlet/en/html/601/main/search?awb.cia=lineCode&awb.cod=shipmentNum'};
airLines["126"] = {nameZh:'印尼航空',nameEn:'Garuda Indonesia',nameEnAbbr:'GIA',flightCode:'GA',pageUrl:'https://icms.garuda-indonesia.com/HtmlFiles/AWBTracking/AWBTracking.html?BasedOn=0&CarrierCode=lineCode&AWBNo=shipmentNum'};
airLines["128"] = {nameZh:'香港快运航空公司',nameEn:'Hong Kong Air Cargo',nameEnAbbr:'HKE',flightCode:'UO',pageUrl:'https://www.hkaircargo.com/track-your-shipment/?Code=lineCode&WaybillNo=shipmentNum'};
// airLines["131"] = {nameZh:'日本航空公司',nameEn:'Japan Airlines Company Ltd.',nameEnAbbr:'JAL',flightCode:'JL',pageUrl:'https://www.jal.co.jp/en/jalcargo/inter/awb/'};
airLines["133"] = {nameZh:'阿维安卡货运',nameEn:'Avianca Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://prdskyav.mercator.com/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=lineCode&awb_no=shipmentNum'};
airLines["134"] = {nameZh:'阿维安卡货运',nameEn:'Avianca Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://prdskyav.mercator.com/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=lineCode&awb_no=shipmentNum'};
airLines["136"] = {nameZh:'古巴航空公司',nameEn:'Cubana de Aviacion S.A.',nameEnAbbr:'CUB',flightCode:'CU',pageUrl:'http://www.selectairlinemanagement.com/Sam/TrackerNoLogin.jsp'};
// airLines["139"] = {nameZh:'墨西哥航空公司',nameEn:'Aeromexico Cargo',nameEnAbbr:'AMX',flightCode:'AM',pageUrl:'https://www.aeromexicocargo.com.mx/trackhistory.php?lang=es&errorContact=true'};
airLines["141"] = {nameZh:'迪拜航空公司',nameEn:'Flydubai',nameEnAbbr:'FDB',flightCode:'FZ',pageUrl:'https://prdcgofz.mercator.com/skychain/app'};
airLines["144"] = {nameZh:'敦豪航空公司',nameEn:'DHL Aviation',nameEnAbbr:'',flightCode:'',pageUrl:'https://aviationcargo.dhl.com/track/lineCodeshipmentNum'};
airLines["145"] = {nameZh:'智利拉塔姆航空',nameEn:'LATAM Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://mycargomanager.appslatam.com/etracking-web/publico/detalleGuia.do?lang=EN&style=LA&prefix=lineCode&number=shipmentNum'};
airLines["147"] = {nameZh:'摩洛哥皇家航空公司',nameEn:'Royal Air Maroc',nameEnAbbr:'RAM',flightCode:'AT',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=AT&Shipment_text=lineCode-shipmentNum'};
airLines["154"] = {nameZh:'Trust Forwarding',nameEn:'Trust Forwarding',nameEnAbbr:'',flightCode:'',pageUrl:'https://gfx.gln.com/tru-cph/ShipmentDetailPublic.aspx?OrgId=306928859&AWN=lineCode-shipmentNum'};
airLines["155"] = {nameZh:'敦豪航空公司',nameEn:'DHL International E.C.',nameEnAbbr:'DHX',flightCode:'ES',pageUrl:'https://aviationcargo.dhl.com/track/lineCodeshipmentNum'};
airLines["157"] = {nameZh:'卡塔尔航空公司',nameEn:'Qatar Airways (W.L.L.)',nameEnAbbr:'QTR',flightCode:'QR',pageUrl:'https://www.qrcargo.com/trackshipment?docNumber=shipmentNum&docType=MAWB&docPrefix=lineCode'};
airLines["160"] = {nameZh:'香港国泰航空有限公司',nameEn:'Cathay Pacific Airways Ltd.',nameEnAbbr:'CPA',flightCode:'CX',pageUrl:'https://www.cathaypacificcargo.com/ManageYourShipment/TrackYourShipment/tabid/108/SingleAWBNo/lineCode-shipmentNum/language/en-US/Default.aspx'};
airLines["172"] = {nameZh:'卢森堡航空公司',nameEn:'Cargolux Airlines International',nameEnAbbr:'CVA',flightCode:'CV',pageUrl:'https://cvtnt.champ.aero/trackntrace?awbnumber=lineCode-shipmentNum'};
// airLines["173"] = {nameZh:'夏威夷航空',nameEn:'Hawaiian Airlines',nameEnAbbr:'HAL',flightCode:'HA',pageUrl:'https://hawaiian.smartkargo.com/FrmAWBTracking.aspx'};
airLines["176"] = {nameZh:'阿联酋航空公司',nameEn:'Emirates',nameEnAbbr:'UAE',flightCode:'EK',pageUrl:'https://www.skycargo.com/shipping-services/track-shipments?type=AWB&id=lineCode-shipmentNum'};
airLines["180"] = {nameZh:'大韩航空公司',nameEn:'Korean Air Lines Co. Ltd.',nameEnAbbr:'KAL',flightCode:'KE',pageUrl:'https://cargo.koreanair.com/en/tracking?awbNO=lineCodeshipmentNum'};
airLines["199"] = {nameZh:'突尼斯航空公司',nameEn:'Tunisair Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'http://prdcgotu.mercator.com/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=lineCode&awb_no=shipmentNum'};
airLines["202"] = {nameZh:'哥伦比亚国家航空公司',nameEn:'Avianca Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://prdskyav.mercator.com/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=lineCode&awb_no=shipmentNum'};
// airLines["203"] = {nameZh:'宿务太平洋航空',nameEn:'Cebu Pacific Air',nameEnAbbr:'CPI',flightCode:'5J',pageUrl:'https://cebu.smartkargo.com/'};
airLines["205"] = {nameZh:'日本全日空航空公司',nameEn:'ANA All Nippon Airways',nameEnAbbr:'ANA',flightCode:'NH',pageUrl:'https://cargo.ana.co.jp/anaicoportal/portal/trackshipments?trkTxnValue=lineCode-shipmentNum'};
airLines["211"] = {nameZh:'菲律宾航空',nameEn:'Philippine Airlines',nameEnAbbr:'',flightCode:'',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=PR&Shipment_text=lineCode-shipmentNum'};
airLines["214"] = {nameZh:'巴基斯坦航空公司',nameEn:'Pakistan International Airlines',nameEnAbbr:'PIA',flightCode:'PK',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=PK&Shipment_text=lineCode-shipmentNum'};
airLines["217"] = {nameZh:'泰国航空公司',nameEn:'Thai Airways International Public',nameEnAbbr:'THA',flightCode:'TG',pageUrl:'https://chorus.thaicargo.com/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=lineCode&awb_no=shipmentNum'};
airLines["229"] = {nameZh:'科威特航空公司',nameEn:'Kuwait Airways',nameEnAbbr:'KAC',flightCode:'KU',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=KU&Shipment_text=lineCode-shipmentNum'};
airLines["230"] = {nameZh:'巴拿马航空公司',nameEn:'COPA Airlines',nameEnAbbr:'CMP',flightCode:'CM',pageUrl:'https://copa.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=lineCode&AWBNo=shipmentNum'};
airLines["235"] = {nameZh:'土耳其航空公司',nameEn:'Turkish Airlines Inc.',nameEnAbbr:'THY',flightCode:'TK',pageUrl:'https://www.turkishcargo.com.tr/en/online-services/shipment-tracking?quick=True&awbInput=lineCode-shipmentNum'};
airLines["239"] = {nameZh:'毛里求斯航空有限公司',nameEn:'Air Mauritius',nameEnAbbr:'MAU',flightCode:'MK',pageUrl:'https://ebooking.champ.aero/http_tracking.asp?Carrier=MK&Shipment_text=lineCode-shipmentNum'};
// airLines["244"] = {nameZh:'大溪地航空公司',nameEn:'Air Tahiti Nui',nameEnAbbr:'',flightCode:'',pageUrl:'https://www.airtahitinui.com/uk-en/online-cargo-tracking'};
// airLines["245"] = {nameZh:'北加拿大航空',nameEn:'Canadian North',nameEnAbbr:'',flightCode:'',pageUrl:'https://canadiannorth.com/cargo/track-and-trace/'};
airLines["250"] = {nameZh:'乌兹别克斯坦航空公司',nameEn:'Uzbekistan Airways',nameEnAbbr:'',flightCode:'',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=HY&Shipment_text=lineCode-shipmentNum'};
airLines["254"] = {nameZh:'Jetclub航空 ',nameEn:'Jet Club',nameEnAbbr:'JCS',flightCode:'0J',pageUrl:'https://www.strike.aero/wp-admin/admin-ajax.php?action=strike_tracking_get_status&tracking_code=lineCode-shipmentNum&template=tracking_results'};
airLines["262"] = {nameZh:'乌拉尔航空公司',nameEn:'Ural Airlines',nameEnAbbr:'',flightCode:'',pageUrl:'https://u6-cargo.com/tracking/lineCode-shipmentNum'};
// airLines["272"] = {nameZh:'卡利塔航空',nameEn:'Kalitta Air',nameEnAbbr:'CKS',flightCode:'K4',pageUrl:'https://www.cargonetworkmanager.com/tracktrace/'};
airLines["281"] = {nameZh:'罗马尼亚航空',nameEn:'Tarom',nameEnAbbr:'ROT',flightCode:'RO',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=RO&Shipment_text=lineCode-shipmentNum'};
airLines["288"] = {nameZh:'香港国泰航空公司',nameEn:'Cathay Pacific Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://www.cathaypacificcargo.com/ManageYourShipment/TrackYourShipment/tabid/108/SingleAWBNo/lineCode-shipmentNum/language/en-US/Default.aspx'};
airLines["297"] = {nameZh:'中华航空股份有限公司',nameEn:'China Airlines',nameEnAbbr:'CAL',flightCode:'CI',pageUrl:'https://cargo.china-airlines.com/CCNetv2/content/manage/ShipmentTracking.aspx?AwbPfx=lineCode&AwbNum=shipmentNum&checkcode=*7*upHGj'};
airLines["301"] = {nameZh:'全球航空服务',nameEn:'Global Aviation and Services',nameEnAbbr:'GAK',flightCode:'5S',pageUrl:'https://qlatracking.awery.aero/frame#lineCode-shipmentNum'};
airLines["321"] = {nameZh:'德国星光航空公司',nameEn:'Starlight Airlines',nameEnAbbr:'',flightCode:'QP',pageUrl:'http://www.starlightairline.com/track_shipment.aspx?p=lineCode&a=shipmentNum'};
// airLines["324"] = {nameZh:'山东航空',nameEn:'Shandong Airlines Co.,Ltd.',nameEnAbbr:'CDG',flightCode:'SC',pageUrl:'http://www.sda.cn/transport/'};
// airLines["328"] = {nameZh:'挪威航空',nameEn:'Norwegian Air Shuttle',nameEnAbbr:'NAX',flightCode:'DY',pageUrl:'https://dy.smartkargo.com/'};
// airLines["331"] = {nameZh:'SATA航空',nameEn:'SATA INTERNATIONAL',nameEnAbbr:'RZO',flightCode:'S4',pageUrl:'https://www.azoresairlines.pt/en/services/cargo/cargo-tracking'};
airLines["345"] = {nameZh:'北方货运航空公司',nameEn:'Northern Air Cargo',nameEnAbbr:'NAC',flightCode:'NC',pageUrl:'http://tracking.stratair.net/Tools/Tracking.aspx?awb=lineCode-shipmentNum'};
airLines["355"] = {nameZh:'邮件空运航空',nameEn:'Estafeta Carga Aerea',nameEnAbbr:'ESF',flightCode:'E7',pageUrl:'https://cargaareasitecorecms.azurewebsites.net/Rastreo-carga-aerea/'};
airLines["356"] = {nameZh:'卢森堡国际货运航空公司',nameEn:'Cargolux Italia',nameEnAbbr:'ESF',flightCode:'C8',pageUrl:'https://cvtnt.champ.aero/trackntrace?awbnumber=lineCode-shipmentNum'};
airLines["369"] = {nameZh:'美国阿特拉斯航空公司',nameEn:'Atlas Air, Inc.',nameEnAbbr:'GTI',flightCode:'5Y',pageUrl:'https://jumpseat.atlasair.com/aa/tracktracehtml/TrackTrace.html?pe=lineCode&se=shipmentNum'};
airLines["375"] = {nameZh:'捷星航空',nameEn:'Jetstar Asia',nameEnAbbr:'',flightCode:'',pageUrl:'https://freight.qantas.com/online-tracking.html?airWaybills=lineCode-shipmentNum'};
airLines["378"] = {nameZh:'开曼航空',nameEn:'Cayman Airways',nameEnAbbr:'CAY',flightCode:'KX',pageUrl:'https://www.newcaymancargo.com/Tracking.aspx?cco=lineCode&awb=shipmentNum'};
airLines["390"] = {nameZh:'希腊爱琴海航空',nameEn:'Aegean Airlines',nameEnAbbr:'AEE',flightCode:'A3',pageUrl:'https://en.about.aegeanair.com/sys/System/CargoTrack?prefix=lineCode&number=shipmentNum'};
airLines["403"] = {nameZh:'极地航空货运全球有限公司',nameEn:'Polar Air Cargo',nameEnAbbr:'PAC',flightCode:'PO',pageUrl:'https://www.polaraircargo.com/track-and-trace/?pe=lineCode&se=shipmentNum'};
airLines["406"] = {nameZh:'联合包裹航空公司',nameEn:'United Parcel Service',nameEnAbbr:'UPS',flightCode:'5X',pageUrl:'https://aircargo.ups.com/en-US/Tracking?awbPrefix=lineCode&awbNumber=shipmentNum'};
airLines["417"] = {nameZh:'中南美空运',nameEn:'Bringer Air Cargo',nameEnAbbr:'BRC',flightCode:'E6',pageUrl:'https://www.bringeraircargo.com/'};
airLines["421"] = {nameZh:'西伯利亚航空公司',nameEn:'Siberia Airlines',nameEnAbbr:'SBI',flightCode:'S7',pageUrl:'https://cargo.s7.ru/shipment/track-n-trace/index.dot?prefix=lineCode&number=shipmentNum&language_id=3'};
airLines["466"] = {nameZh:'因纽特人航空航空',nameEn:'Air Inuit',nameEnAbbr:'',flightCode:'',pageUrl:'https://www.airinuit.com/en/cargo/track-and-trace/tracking?tracknumber=lineCode-shipmentNum'};
airLines["474"] = {nameZh:'亚特兰提斯航空公司',nameEn:'Atlantis Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://tracking.atlantiscargo.es/User/TrackView?AWB1=lineCode&AWB=shipmentNum'};
airLines["479"] = {nameZh:'深圳航空公司',nameEn:'Shenzhen Airlines',nameEnAbbr:'CSZ',flightCode:'ZH',pageUrl:'https://cargo.shenzhenair.com/Query/AwbSearch.aspx?txtPrefix1=lineCode&txtNO1=shipmentNum'};
// airLines["489"] = {nameZh:'喷气货运航空公司',nameEn:'Cargojet Airways',nameEnAbbr:'CJT',flightCode:'W8',pageUrl:'https://km.cargojet.com/ords/f?p=102:857:0:&tz=8:00'};
airLines["501"] = {nameZh:'丝绸之路航空',nameEn:'Silk Way West Airlines',nameEnAbbr:'',flightCode:'7L',pageUrl:'https://silkwaywest.com/pages/awb.php?awb=shipmentNum&pfx=lineCode'};
airLines["512"] = {nameZh:'约旦皇家航空',nameEn:'Royal Jordanian',nameEnAbbr:'RJA',flightCode:'RJ',pageUrl:'https://rj-cargo.com/track-and-trace'};
airLines["514"] = {nameZh:'阿拉伯航空',nameEn:'Air Arabia',nameEnAbbr:'ABY',flightCode:'G9',pageUrl:'https://cargomgmt.airarabia.com/Tracking/AWB/lineCode-shipmentNum'};
airLines["526"] = {nameZh:'美国西南航空公司',nameEn:'Southwest Airlines',nameEnAbbr:'SWA',flightCode:'WN',pageUrl:'https://www.swacargo.com/swacargo_com_ui/tracking-details?trackingId=lineCode-shipmentNum'};
airLines["549"] = {nameZh:'智利拉塔姆航空',nameEn:'LATAM Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://mycargomanager.appslatam.com/etracking-web/publico/detalleGuia.do?lang=EN&style=LA&prefix=lineCode&number=shipmentNum'};
airLines["555"] = {nameZh:'俄罗斯航空公司',nameEn:'Aeroflot Russian Airlines',nameEnAbbr:'AFL',flightCode:'SU',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=SU&Shipment_text=lineCode-shipmentNum'};
airLines["566"] = {nameZh:'乌克兰国际航空公司',nameEn:'Ukraine International Airlines',nameEnAbbr:'AUI',flightCode:'PS',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=PS&Shipment_text=lineCode-shipmentNum'};
// airLines["572"] = {nameZh:'摩尔多瓦航空公司',nameEn:'Air Moldova',nameEnAbbr:'MLD',flightCode:'9U',pageUrl:'https://www.airmoldova.md/cargo-check-en/'};
airLines["574"] = {nameZh:'联盟航空',nameEn:'Allied Air',nameEnAbbr:'AJK',flightCode:' ',pageUrl:'https://network-airline.com/track-and-trace/?consignment-number=lineCodeshipmentNum'};
// airLines["575"] = {nameZh:'英国 Coyne Air公司',nameEn:'Coyne Air',nameEnAbbr:'COY',flightCode:'7C',pageUrl:'http://www.coyneair.info/NewWebStrackandTrace/formprocessor.php?statussch=tracktrace'};
airLines["576"] = {nameZh:'Skylease航空',nameEn:'Skylease Cargo',nameEnAbbr:'',flightCode:'KY',pageUrl:'http://skylease.cargolink.aero/tracking/index.asp?awbno=lineCodeshipmentNum'};
airLines["580"] = {nameZh:'俄罗斯空桥货运航空公司',nameEn:'Airbridge cargo',nameEnAbbr:'ABW',flightCode:'RU',pageUrl:'https://www.airbridgecargo.com/en/tracking/'};
// airLines["603"] = {nameZh:'斯里兰卡航空公司',nameEn:'SriLankan Airlines Limited',nameEnAbbr:'ALK',flightCode:'UL',pageUrl:'http://www.srilankanskychain.aero/skychain/app?PID=WEB01-10'};
airLines["607"] = {nameZh:'阿联酋阿提哈德航空公司',nameEn:'Etihad cristal cargo',nameEnAbbr:'ETD',flightCode:'EY',pageUrl:'https://www.etihadcargo.com/content/eag/egcmc/etihadcargo/en-ae/track-and-trace.html?awb=lineCodeshipmentNum'};
airLines["615"] = {nameZh:'DHL航空',nameEn:'DHL Aviation ',nameEnAbbr:'GRL',flightCode:'GL',pageUrl:'https://aviationcargo.dhl.com/track/lineCodeshipmentNum'};
// airLines["618"] = {nameZh:'新加坡航空公司',nameEn:'Singapore Airlines',nameEnAbbr:'SIA',flightCode:'SQ',pageUrl:'http://www.siacargo.com/ccn/ShipmentTrack.aspx'};
airLines["624"] = {nameZh:'巴西天马航空',nameEn:'Pegasus Cargo',nameEnAbbr:'',flightCode:'PC',pageUrl:'http://www.pegasuscargo.com/en/cargo-questioning/Default.aspx?awb=lineCodeshipmentNum'};
airLines["635"] = {nameZh:'也门航空',nameEn:'Yemenia Airlines',nameEnAbbr:'IYE',flightCode:'IY',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=IY&Shipment_text=lineCode-shipmentNum'};
airLines["643"] = {nameZh:'马耳他航空',nameEn:'Air Malta',nameEnAbbr:'AMC',flightCode:'KM',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=KM&Shipment_text=lineCode-shipmentNum'};
airLines["644"] = {nameZh:'Solar Cargo航空',nameEn:'Solar Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'http://solarcargo.cargolink.aero/tracking/index.asp?awbno=lineCodeshipmentNum'};
// airLines["649"] = {nameZh:'越洋航空',nameEn:'Air Transat',nameEnAbbr:'TSC',flightCode:'TS',pageUrl:'http://shipment-tracking.ecsgroup.aero/'};
airLines["657"] = {nameZh:'波罗的海航空',nameEn:'Air Baltic',nameEnAbbr:'BTI',flightCode:'BT',pageUrl:'https://www.airbaltic.com/cargoTracking:plineCode:sshipmentNum'};
// airLines["672"] = {nameZh:'文莱航空公司',nameEn:'Royal Brunei Airlines',nameEnAbbr:'RBA',flightCode:'BI',pageUrl:'https://www.flyroyalbrunei.com/rba/cargospot/index.php'};;
airLines["675"] = {nameZh:'澳门航空有限公司',nameEn:'Air Macau Company Limited',nameEnAbbr:'AMU',flightCode:'NX',pageUrl:'http://119.254.234.112/nx/PublicEng/index.aspx?strCul=en'};
airLines["687"] = {nameZh:'阿罗哈航空货运',nameEn:'Aloha Air Cargo',nameEnAbbr:'AAH',flightCode:'KH',pageUrl:'https://www.alohaaircargo.com/'};
airLines["695"] = {nameZh:'台湾长荣航空',nameEn:'EVA Airways',nameEnAbbr:'EVA',flightCode:'BR',pageUrl:'https://www.brcargo.com/ec_web/Default.aspx?Parm2=191&Parm3=?TNT_FLAG=Y&AWB_CODE=lineCode&MAWB_NUMBER=shipmentNum'};
// airLines["700"] = {nameZh:'以色列航空公司',nameEn:'C.A.L. Cargo Airlines Ltd.',nameEnAbbr:'CAL',flightCode:'5C',pageUrl:'http://www.cal.co.il/tracing/'};
airLines["706"] = {nameZh:'肯尼亚航空公司',nameEn:'Kenya Airways Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://www.kqcargo.com/track-and-trace.aspx?awb=lineCodeshipmentNum'};
airLines["724"] = {nameZh:'瑞士国际航空公司',nameEn:'Swiss International Air Lines',nameEnAbbr:'SWR',flightCode:'LX',pageUrl:'https://www.swissworldcargo.com/'};
airLines["729"] = {nameZh:'坦帕航空货运',nameEn:'Tampa Cargo',nameEnAbbr:'TPA',flightCode:'QT',pageUrl:'https://prdskyav.mercator.com/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=lineCode&awb_no=shipmentNum'};
airLines["730"] = {nameZh:'海航航空货运控股有限公司',nameEn:'HNA Air Cargo Holding Co.,ltd',nameEnAbbr:'ACG',flightCode:'6U',pageUrl:'https://www.hnacargo.com/Portal2/AwbSearch.aspx'};
airLines["731"] = {nameZh:'厦门航空公司',nameEn:'XiaMen Airlines',nameEnAbbr:'CXA',flightCode:'MF',pageUrl:'https://cargo.xiamenair.com/Cargo/English/Search.html?status=1&Ids=lineCodeshipmentNum'};
airLines["738"] = {nameZh:'越南国家航空公司',nameEn:'Vietnam Airlines',nameEnAbbr:'HVN',flightCode:'VN',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=VN&Shipment_text=lineCode-shipmentNum'};
airLines["749"] = {nameZh:'南非支线航空公司',nameEn:'SA Airlink Airlines',nameEnAbbr:'LNK',flightCode:'4Z',pageUrl:'https://www.ivs-online.co.za/pls/ivs/f?p=400:29'};
airLines["767"] = {nameZh:'大西洋航空',nameEn:'Atlantic Airways',nameEnAbbr:'FLI',flightCode:'RC',pageUrl:'https://www.spiritaircargohandling.com/Tracking.aspx?awb=lineCodeshipmentNum&type=quick'};
airLines["775"] = {nameZh:'森帕蒂航空公司',nameEn:'spiceJet',nameEnAbbr:'',flightCode:'SG',pageUrl:'https://spicejet.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=lineCode&AWBNo=shipmentNum'};
airLines["784"] = {nameZh:'中国南方航空公司',nameEn:'China Southern Airlines',nameEnAbbr:'CSN',flightCode:'CZ',pageUrl:'http://tang.csair.com/EN/WebFace/Tang.WebFace.Cargo/AgentAwbBrower.aspx?AwbPrefix=lineCode&AwbNo=shipmentNum'};
airLines["803"] = {nameZh:'华信航空公司',nameEn:'Mandarin Airlines',nameEnAbbr:'MDA',flightCode:'AE',pageUrl:'https://cargo.china-airlines.com/CCNetv2/content/manage/ShipmentTracking.aspx?AwbPfx=lineCode&AwbNum=shipmentNum&checkcode=*7*upHGj'};
airLines["807"] = {nameZh:'亚洲航空公司',nameEn:'AirAsia Berhad',nameEnAbbr:'AXM',flightCode:'AK',pageUrl:'https://airasia.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=lineCode&AWBNo=shipmentNum'};
airLines["810"] = {nameZh:'美国喷气国际公司',nameEn:'Amerijet International',nameEnAbbr:'AJT',flightCode:'M6',pageUrl:'https://mycargo.amerijet.com/View_AirTrackDetails?tracking_number=lineCodeshipmentNum'};
airLines["831"] = {nameZh:'克罗的亚航空',nameEn:'Croatia Airlines',nameEnAbbr:'CTN',flightCode:'OU',pageUrl:'https://cargoserv.champ.aero/trace/trace.asp?Carrier=OU&Shipment_text=lineCode-shipmentNum'};
airLines["843"] = {nameZh:'亚洲航空',nameEn:'AirAsia',nameEnAbbr:'KUL',flightCode:'D7',pageUrl:'https://airasia.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=lineCode&AWBNo=shipmentNum'};
airLines["851"] = {nameZh:'香港航空',nameEn:'Hong Kong Airways',nameEnAbbr:'CRK',flightCode:'HX',pageUrl:'https://www.hkaircargo.com/track-your-shipment/?Code=lineCode&WaybillNo=shipmentNum'};
airLines["865"] = {nameZh:'智利拉塔姆航空',nameEn:'LATAM Cargo',nameEnAbbr:'',flightCode:'',pageUrl:'https://mycargomanager.appslatam.com/etracking-web/publico/detalleGuia.do?lang=EN&style=LA&prefix=lineCode&number=shipmentNum'};
airLines["871"] = {nameZh:'海航航空货运控股有限公司',nameEn:'HNA Air Cargo Holding Co.,ltd',nameEnAbbr:'',flightCode:'',pageUrl:'https://www.hnacargo.com/Portal2/AwbSearch.aspx'};
airLines["876"] = {nameZh:'四川航空',nameEn:'Sichuan Airlines Co.,Ltd.',nameEnAbbr:'CSC',flightCode:'3U',pageUrl:'http://cargo.sichuanair.com:8000/EN/WebFace/Tang.WebFace.Cargo/AgentAwbBrower.aspx?AwbPrefix=lineCode&AwbNo=shipmentNum&menuID=1'};
airLines["880"] = {nameZh:'海南航空公司',nameEn:'Hainan Airlines',nameEnAbbr:'CHH',flightCode:'HU',pageUrl:'https://www.hnacargo.com/Portal2/AwbSearch.aspx'};
airLines["900"] = {nameZh:'亚洲航空',nameEn:'Air Asia Cargo',nameEnAbbr:'AMI',flightCode:'L6',pageUrl:'https://airasia.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=lineCode&AWBNo=shipmentNum'};
airLines["910"] = {nameZh:'阿曼航空公司',nameEn:'Oman Air',nameEnAbbr:'OAS',flightCode:'WY',pageUrl:'https://omanair.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=lineCode&AWBno=shipmentNum'};
airLines["932"] = {nameZh:'英国维珍航空公司',nameEn:'Virgin Atlantic Airways Limited',nameEnAbbr:'VIR',flightCode:'VS',pageUrl:'https://www.virginatlanticcargo.com/gb/en/track/track-your-cargo.html?prefix=lineCode&number=shipmentNum&track=go'};
airLines["933"] = {nameZh:'日本货运航空公司',nameEn:'Nippon Cargo Airlines',nameEnAbbr:'NCA',flightCode:'KZ',pageUrl:'https://www.nca.aero/icargoportal/portal/trackshipments?trkTxnValue=lineCode-shipmentNum,933-,933-,933-'};
airLines["946"] = {nameZh:'敦豪航空',nameEn:'DHL Aviation',nameEnAbbr:'',flightCode:'',pageUrl:'https://aviationcargo.dhl.com/track/lineCodeshipmentNum'};
airLines["947"] = {nameZh:'敦豪航空',nameEn:'DHL Aviation',nameEnAbbr:'',flightCode:'',pageUrl:'https://aviationcargo.dhl.com/track/lineCodeshipmentNum'};
airLines["988"] = {nameZh:'韩亚航空公司',nameEn:'Asiana Airlines',nameEnAbbr:'AAR',flightCode:'OZ',pageUrl:'https://www.asianacargo.com/tracking/viewTraceAirWaybill.do?lang=en'};
airLines["992"] = {nameZh:'敦豪航空',nameEn:'DHL Aero Expreso',nameEnAbbr:'DAE',flightCode:'D5',pageUrl:'https://aviationcargo.dhl.com/track/lineCodeshipmentNum'};
airLines["996"] = {nameZh:'欧洲货运航空公司',nameEn:'Air Europa Cargo',nameEnAbbr:'AEA',flightCode:'UX',pageUrl:'http://www.aireuropacargo.com/index.asp?prefix=lineCode&Serial=shipmentNum'};
airLines["997"] = {nameZh:'孟加拉航空',nameEn:'Biman Bangladesh',nameEnAbbr:'BBC',flightCode:'BG',pageUrl:'https://cargoserv.champ.aero/tracking.asp'};
airLines["999"] = {nameZh:'中国国际货运航空有限公司',nameEn:'Air China International Corporation',nameEnAbbr:'CAO',flightCode:'CA',pageUrl:'http://www.airchinacargo.com/en/search_order.php'}
export default airLines