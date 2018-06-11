//修改部分：全部全局变量以“g_”开头

//默认谱子的宽度为1000，高度为1415
//默认行的宽度为880，高度120，一行默认放四个小节
//默认小节宽度为220，高度同行的高度
var g_pageWidth = 1000;
var g_pageHeight = 1415;
var g_lineWidth = 840;
var g_lineHeight = 70;
var g_barWidth = 220;
var g_barHeight = g_lineHeight;
//默认字体颜色、hover颜色、副标题颜色
var g_textColor = "#333333";
var g_textHoverColor = "#999999";
var g_subTittleColor = "#666666";
//默认标题、副标题、作者、简谱的字体大小
var g_tittleFontSize = 46;
var g_subtittleFontSize = 21;
var g_writerFontSize = 20;
var g_noteFontSize = 25;
//默认小节颜色
var g_barColor = "#ffffff";
var g_barHoverColor = "#999999";
//默认的行距
var g_rowLedge = 20;
//默认上下间隔
var g_topLedge = 50;
var g_bottomLedge = 50;
//初始的第一行x轴值和y轴值,随小节的数量以及宽度而改变
var g_lineX = (g_pageWidth - g_lineWidth) / 2;
var g_lineY = 260;
//记录页数、行数、小节数
var g_pageNum = 0;
var g_lineNum = 0;
var g_barNum = 0;

//功能：判断页面中是否为空
//输入：
//输出：
function pageIsNull() {
	if($("#score").html() == "" || $("#score").html().length == 0) {
		newPage();
	}
}
//功能：在score中生成新页面
//输入：
//输出：
function newPage() {
	g_pageNum = g_pageNum + 1;
	var pageDiv = $("<div></div>");
	pageDiv.attr("id", "page" + g_pageNum);
	pageDiv.attr("class", "page");
	pageDiv.appendTo("#score");
	newSvgPage();
}
//功能：newPage()中新建的div要包含的svg格式将在这里创建
//输入：
//输出：带有id的svg谱页
function newSvgPage() {
	//	新建svg
	var svgPage = $("<svg version='1.1' xmlns='http://www.w3.org/2000/svg'></svg>");
	var svgPageId = "svgPage" + g_pageNum;
	//	设置svg的长宽
	svgPage.attr("id", svgPageId);
	svgPage.attr("width", "1000");
	svgPage.attr("height", "1415");
	//将svg插入已新建好的div中
	var temp = "#page" + g_pageNum;
	var pageDiv = $(temp);
	svgPage.appendTo(pageDiv);
	//	新建rect
	var svgPageId = "#svgPage" + g_pageNum;
	var snap = Snap(svgPageId);
	snap.paper.rect(0, 0, g_pageWidth, g_pageHeight, 0).attr({
		id: "rectPage" + g_pageNum,
		fill: "#fff"
	});
}
//功能：判断页面是否已满
//输入：
//输出：页满返回1，否则返回0
function pageIsFull() {
	var temp = g_pageHeight - g_bottomLedge - g_lineY;
	if(temp < g_barHeight) {
		return 1;
	} else {
		return 0;
	}
}
//功能：设置简谱标题、副标题
//输入：标题、副标题 （字符串）
//输出：在简谱上输出标题、副标题
function setTittle(tittle, subTittle) {
	var snap = Snap("#svgPage1");
	snap.paper.text(0, 0, tittle).attr({
		id: "tittle",
		x: "50%",
		y: "7%",
		fill: g_textColor,
		style: " font-weight:bold; cursor:hand; text-anchor: middle;" + "font-size:" + g_tittleFontSize + ";", //文本居中
	}).hover(function() {
		this.attr({
			fill: g_textHoverColor, //鼠标放上去后的颜色
		});
	}, function() {
		this.attr({
			fill: g_textColor,
		});
	});
	snap.paper.text(0, 0, subTittle).attr({
		id: "subTittle",
		x: "50%",
		y: "10%",
		fill: g_subTittleColor,
		style: " font-weight:light; cursor:hand; text-anchor: middle;" + "font-size:" + g_subtittleFontSize + ";", //文本居中
	}).hover(function() {
		this.attr({
			fill: g_textHoverColor, //鼠标放上去后的颜色
		});
	}, function() {
		this.attr({
			fill: g_subTittleColor,
		});
	});
	//设置属性,因为data-toggle中的“-”在jquery中会报错，所以要用js在操作修改属性
	document.getElementById("tittle").setAttribute("data-toggle", "modal");
	document.getElementById("tittle").setAttribute("data-target", "#myModal");
	document.getElementById("subTittle").setAttribute("data-toggle", "modal");
	document.getElementById("subTittle").setAttribute("data-target", "#myModal");
	reCodeEditor("#T:", tittle);
	reCodeEditor("#ST:", subTittle);
}
//功能：设置简谱曲作者、词作者
//输入：曲作、词作 （字符串）
//输出：在简谱上输出曲作、词作
function setWriterName(lyricist, composer) {
	var snap = Snap("#svgPage1");
	snap.paper.text(0, 0, lyricist).attr({
		id: "lyricist",
		x: "90%",
		y: "14%",
		fill: g_textColor,
		style: "font-weight:blod; cursor:hand; text-anchor: end;" +
			"font-size:" + g_writerFontSize + ";",
	}).hover(function() {
		this.attr({
			fill: g_textHoverColor, //鼠标放上去后的颜色
		});
	}, function() {
		this.attr({
			fill: g_textColor,
		});
	});
	snap.paper.text(0, 0, composer).attr({
		id: "composer",
		x: "90%",
		y: "16%",
		fill: g_textColor,
		style: "font-weight:blod; cursor:hand; text-anchor: end;" +
			"font-size:" + g_writerFontSize + ";",
	}).hover(function() {
		this.attr({
			fill: g_textHoverColor, //鼠标放上去后的颜色
		});
	}, function() {
		this.attr({
			fill: g_textColor,
		});
	});
	//设置属性,因为data-toggle中的“-”在jquery中会报错，所以要用js在操作修改属性
	document.getElementById("lyricist").setAttribute("data-toggle", "modal");
	document.getElementById("lyricist").setAttribute("data-target", "#myModal");
	document.getElementById("composer").setAttribute("data-toggle", "modal");
	document.getElementById("composer").setAttribute("data-target", "#myModal");
	reCodeEditor("#L:", lyricist);
	reCodeEditor("#C:", composer);
}
//功能：去除标题、副标题、作者等信息
//输入：无
//输出：去除相应标签
function removeTittleAndWriter() {
	$("#tittle").remove();
	$("#subTittle").remove();
	$("#lyricist").remove();
	$("#composer").remove();
}
//功能：设置调性
//输入：C、#C、bC、……十二个调性
function setKey(key) {

}
//功能：创建节拍
//输入:格式2/4、3/4、4/4、3/8、6/8
function setTimeSignature(sign) {

}
//功能：创建速度，单位为BPM（每分钟节拍数）
//输入:40~208之间的数字
function setBeat(beat) {

}

//功能：创建一行，宽度固定，高度根据内容大小而改变
//输入：坐标y
//输出：在页面上创建svg.g()
//function newLine(y) {
//	g_lineNum = g_lineNum + 1; //行数+1
//	var snap = Snap("#svgPage" + g_pageNum);
//	var lineGroup = snap.paper.g().attr({
//		id: "lineGroup" + g_lineNum,
//		transform:"translate("+g_lineX+" "+y+")",
//	});
//}

//设置光标指向
//光标与音符之间的距离
var cursorHeight = 48;

function setCursor(x, y) {
	removeCursor(); //创建之前删除已存在的光标
	var snap = Snap("#svgPage" + g_pageNum);
	y = y + cursorHeight;
	snap.paper.circle(x, y, 10).attr({
		id: "cursor",
		fill: "#333333"
	});
	var html = "<animate attributeName='opacity' values='1;0.1;1' dur='1s' repeatCount='indefinite' />";
	var temp = document.getElementById("cursor").innerHTML = html;
	return x;
}
//功能：向右移动光标
//输入：当使用右键时触发
//输出：将光标向右移动一个单位
function toRightCursor() {
	//先判断在同一y坐标高度是否有音符，和下一行是否有音符
	//获取光标的x坐标和y坐标
	var x = parseInt(getCursorX());
	var y = parseInt(getCursorY());
	var temp = 0;
	//判断在光标的位置有没有note的情况下,不改变位置；
	if(parseInt($("text[x='" + x + "']").attr("y")) == NaN) {
		return 0;
	} else { //判断光标下有note的情况下，下一个位置有note的情况
		for(i = x + 1; i < g_pageWidth; i++) {
			//在可能会跳过小节线
			var nextNoteY_text = parseInt($("text[x='" + i + "']").attr("y"));
			if(nextNoteY_text == y) { //下一个位置有note的情况
				setCursor(i, y);
				return 0;
			}
		}
		//下一个位置没有note且光标所在的坐标没有超过限制
		if(nextNoteY_text != y && getCursorX() <= g_lineWidth + noteSpace) {
			var textLength = $("text[x='" + x + "']").html().length;
			var halfOfNoteWidth = parseInt(g_noteFontSize / 2) * textLength;
			setCursor(x + noteSpace + halfOfNoteWidth, y);
			return 0;
		} else {
			setCursor(g_lineX + noteSpace / 2, getCursorY() + g_rowLedge + g_barHeight);
			return 0;
		}
	}
}
//功能：向左移动光标
//输入：当使用左键时触发
//输出：将光标向左移动一个单位
function toLeftCursor() {
	//先判断在同一y坐标高度是否有音符，和上一行是否有音符
	//获取光标的x坐标和y坐标
	var x = parseInt(getCursorX());
	var y = parseInt(getCursorY());
	var temp = 0;
	//判断在光标的位置有没有note的情况下,可以向左移动
	if(parseInt($("text[x='" + x + "']").attr("y")) == NaN) {
		//		return 0;
	} else { //判断光标下有note的情况下，下一个位置是否有note
		for(i = x - 1; i > 0; i--) {
			var nextNoteY_text = parseInt($("text[x='" + i + "']").attr("y"));
			if(nextNoteY_text == y) { //下一个位置有note的情况
				setCursor(i, y);
				return 0;
			}
		}
		//判断光标下没有note的情况，向左没有note的情况，搜索一下有没有上一行
		if(nextNoteY_text != y) {
			var id = $("text[x='" + x + "'][y='" + y + "']").attr("id");
			if(id == "note1") {
				return 0;
			} else if(!id) {
				var snap = Snap("#note" + noteId);
				setCursor(snap.asPX("x"), snap.asPX("y"));
				return 0;
			}
			var idNum = parseInt(id.substr(4, id.length)) - 1;
			var snap = Snap("#note" + idNum);
			setCursor(snap.asPX("x"), snap.asPX("y"));
		}
	}
}

//功能：插入音符到小节组中
//输入：要插入的小节数
//输出：显示相应的音符

//为每个音符设置编号id
var noteId = 0;
var note = "0";

//每个音符的间隔
var noteSpace = 30;

//功能：获得音符所在行的坐标,常用给光标定位
function getNoteX() {
	if(g_barNum == 0) {
		//在创建第一个小节时，lineX为0，所以这里赋值为第一个小节的x坐标
		return g_lineX + noteSpace / 2;
	}
	return g_lineX - getLastBarWidth() + noteSpace;
}

function getNoteY() {
	return g_lineY + g_barHeight / 2 + 10;
}

//功能：插入音符
//输入（音符,x,y,所选小节数）
function newNote(note, x, y) {
	var snap = Snap("#svgPage" + g_pageNum);
	//如果在该位置已存在元素则修改该元素note值
	if($("text[x='" + x + "'][y='" + y + "']").length > 0) {
		$("text[x='" + x + "'][y='" + y + "']").text(note);
		var id = $("text[x='" + x + "'][y='" + y + "']").attr("id");
		reCodeEditor("#NMN:", note, id);
		return;
	}
	noteId = noteId + 1; //这里可以放到监听里处理
	snap.paper.text(0, 0, note).attr({
		id: "note" + noteId,
		x: x,
		y: y,
		fill: g_textColor,
		rotate: "-90",
		style: "writing-mode:tb; cursor:hand; font-weight:light; text-anchor: middle; dominant-baseline:middle;" + "font-size:" + g_noteFontSize + ";",
	}).click(function() {
		setCursor(this.asPX("x"), this.asPX("y"));
	}).hover(function() {
		this.attr({
			fill: g_textHoverColor, //鼠标放上去后的颜色
		});
	}, function() {
		this.attr({
			fill: g_textColor,
		});
	});
	//将音符文本添加到editor_text
	valueEditor(note);
}
//功能：获得上一个字符的坐标
function getLastNoteX() {
	var x = getCursorX();
	var y = getCursorY() - g_rowLedge - g_barHeight;
	for(x; x > 0; x--) {
		if($("text[x='" + x + "']").length > 0) {
			for(y; y > 0; y--) {
				if($("text[y='" + y + "']").length > 0) {
					alert(1)
					return x + noteSpace;
				}
			}
		}
	}
	return g_lineX;
}

//功能：将音符添加到editor_text当中
function valueEditor(note) {
	var str = $("textarea[id='editor_text']").val() + note;
	$("textarea[id='editor_text']").val(str);
}

function getLastBarWidth(lastBarId) {
	if(g_barNum == 0) {
		//在创建第一个小节时，lineX为0，所以这里赋值为第一个小节的x坐标
		return 0;
	}
	return parseInt($("#" + lastBarId).attr("width"));
}

//功能：设置光标指向
//输入：要在谱子上设置光标的坐标
//输出：在谱子上显示光标
var cursorHeight = 48;

//功能：新建一个光标图标
//输入：设置光标位置的坐标x,y
//输出：显示光标
function newCursor(x, y) {
	var snap = Snap("#svgPage" + g_pageNum);
	y = y + cursorHeight;
	snap.paper.circle(x + g_noteFontSize / 2, y + g_noteFontSize - 3, 8).attr({
		id: "cursor",
		fill: "#666666",
	});
	//这里的代码是设置动画样式
	var html = "<animate attributeName='opacity' values='0.4;0.1;0.4' dur='1.1s' repeatCount='indefinite' />";
	document.getElementById("cursor").innerHTML = html;
}
//功能：设置光标的位置，并且判断在同一高度上是否存在行或者小节，若不存在则创建
//输入：设置光标位置的坐标x,y
//输出：在相应位置上显示光标，返回x,y
function getCursorX() {
	return document.getElementById("cursor").getAttribute("cx");
}

function getCursorY() {
	return document.getElementById("cursor").getAttribute("cy") - cursorHeight;
}
//功能：移除光标
function removeCursor() {
	$("#cursor").remove();
}

//功能：将或得到的字符串输入到editor_text当中
//输入：字符串
//输出：editor_text中输出相关字符
function valueEditor(text) {
	var str = $("textarea[id='editor_text']").val() + text;
	$("textarea[id='editor_text']").val(str);
}
//功能：将相关信息添加到editor_text当中，标题、音符等
//输入：类型（#T:标题  #ST:(副标题) #L:词  #C:曲  #K:1=c #B:4/4 #S:60 #SK:简述  #NMN:1），修改的信息（字符串）
//输出：在editor_text中修改相应类型的字符串
function reCodeEditor(type, text, noteId) {
	var str = $("textarea[id='editor_text']").val();
	if(text == "") {
		return 0;
	} else if(type == "#T:" || type == "#ST:" || type == "#L:" || type == "#C:" || type == "#K:" || type == "#B:" || type == "#S:") {
		//获得类型索引位置+type的字符长度
		var typeIndex = str.indexOf(type) + type.length;
		//先将字符串分成左、右两个部分
		var leftPart = str.substr(0, typeIndex);
		var rightPart = str.substr(typeIndex, str.length);
		//下一个#的索引位置
		var nextPoundIndex = rightPart.indexOf("#", 1) + typeIndex;
		//将要修改的部分去除并覆盖
		var midPart = str.substr(typeIndex, nextPoundIndex);
		rightPart = str.substr(nextPoundIndex, str.length);
		//最后输出在editor_text中
		str = leftPart + text + rightPart;
		$("textarea[id='editor_text']").val(str);
		return 0;
	} else if(type == "#NMN:") {
		//获得类型索引位置+type的字符长度
		var typeIndex = str.indexOf(type) + type.length;
		//先将字符串分成左、右两个部分
		var leftPart = str.substr(0, typeIndex);
		var rightPart = str.substr(typeIndex, str.length);
		//搜索右边部分的音符文本所在
		var idType = noteId.substr(0, 4);
		var idNum = parseInt(noteId.substr(4, idType.length));
		var numSort = 0;//判断数字的排序
		//当类型为noteId类型为note时
		if(idType == "note") {
			for(var i = 0; i < rightPart.length; i++){
				//跳过非数字字符，字符判读，为将来不同类型的音符判断做准备
//				if(parseInt(rightPart.charAt(i)) >=0 || parseInt(rightPart.charAt(i)) <= 7){
					numSort ++;
					if(numSort == idNum){
						rightPart = rightPart.substr(0, i)+text+rightPart.substr(i+1, rightPart.length);
						$("textarea[id='editor_text']").val(leftPart+rightPart);
						return 0;
					}
//				}
			}
		}
	}
}

//设置时值

//设置音高

//设置附点

//设置延音线

//设置装饰音

//鼠标监听
//1.标题、作者等页面元素的监听
$("#submit-tittle").click(function() {
	removeTittleAndWriter();
	setTittle($("#input-tittle").val(), $("#input-subTittle").val());
	setWriterName($("#input-lyricist").val(), $("#input-composer").val());
});
//2.按钮监听
$("#0").click(function() {newNote("0", getCursorX(), getCursorY())});
$("#1").click(function() {newNote("1", getCursorX(), getCursorY())});
$("#2").click(function() {newNote("2", getCursorX(), getCursorY())});
$("#3").click(function() {newNote("3", getCursorX(), getCursorY())});
$("#4").click(function() {newNote("4", getCursorX(), getCursorY())});
$("#5").click(function() {newNote("5", getCursorX(), getCursorY())});
$("#6").click(function() {newNote("6", getCursorX(), getCursorY())});
$("#7").click(function() {newNote("7", getCursorX(), getCursorY())});

//给光标设置←、→两个快捷键
$(document).keydown(function(event) {
	if(event.keyCode == 37) { //左箭头
		toLeftCursor();
	}
	if(event.keyCode == 39) { //右箭头
		toRightCursor();
	}
	if(event.keyCode >= 96 && event.keyCode <= 103) { //数字键
		var note = event.keyCode - 96;
		newNote(note, getCursorX(), getCursorY());
	}
	if(event.keyCode == 220) { //小节线,同时添加中文字符的“、”
		newNote("|", getCursorX(), getCursorY());
	}
	if(event.keyCode == 8) { //backspace 退格
		
	}
});

//检测editor中的值
//alert($("textarea[id='editor_text']").val());