//添加音符按钮
var groupId = "btn-notes";
var btnlist = new Array(1, 2, 3, 4, 5, 6, 7, 0);
addButton(groupId, btnlist);
//添加音高按钮
var groupId = "btn-pitch";
var btnlist = new Array("picth1", "picth2", "picth3");
addButton(groupId, btnlist);
//添加时值按钮
var groupId = "btn-duration";
var btnlist = new Array("dura1", "dura2", "dura3", "dura4", "dura5", "dura6", "dura7");
addButton(groupId, btnlist);
//添加其他按钮
var groupId = "btn-others";
var btnlist = new Array("beasms");
addButton(groupId, btnlist);

//功能:批量生成按钮;
//输入参数:div的id,存储按钮名称的数组。
//输出:生成按钮
function addButton(groupid, btnlist) {

	for(var i = 0; i < btnlist.length; i++) {
		//设置指向的div，并为其添加样式btn-groud
		var temp = document.getElementById(groupid);
		temp.setAttribute("class", "btn-group");

		var btntemp = document.createElement("button");
		btntemp.setAttribute("type", "button");
		btntemp.setAttribute("class", "btn btn-default " + btnlist[i]);
		btntemp.setAttribute("id", btnlist[i]);
		btntemp.innerHTML = btnlist[i];
		temp.appendChild(btntemp);
	}
}

//导航栏隐藏代码
$(".navbar-fixed-top").autoHidingNavbar({
 
});