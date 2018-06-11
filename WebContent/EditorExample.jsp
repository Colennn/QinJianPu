<%@ page language="java" import="java.util.*" import="cap.bean.*"
	import="cap.dao.impl.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>


<jsp:include page="frame/Header-Editor.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar.jsp"></jsp:include>

	<div class="container" style="width: 90%;">
		<div class="row col-md-12">
			<div class="col-md-12">

				<form class="form-horizontal" name="add_artical_form" action=""
					method="post">
					<div class="col-md-4">
						<!-- 可切换导航栏 -->
						<ul id="myTab" class="nav nav-tabs">
							<li class="active"><a href="#editor-div" data-toggle="tab">曲谱编辑器</a></li>
							<li>
								<div class="btn-group" style="margin-left: 30px;">
									<button type="button" class="btn btn-default" aria-label="Play"
										ng-disabled="playDisabled" ng-click="play()">
										<span class="glyphicon glyphicon-play" aria-hidden="true"></span>
									</button>
									<button type="button" class="btn btn-default" aria-label="Stop"
										ng-disabled="stopDisabled" ng-click="stop()">
										<span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
									</button>
								</div>
							</li>
						</ul>

						<div id="myTabContent" class="tab-content">

							<!-- 简谱编辑器  -->
							<div class="tab-pane fade in active" id="editor-div"
								style="margin-top: 20px;">
								<div id="editor" class="form-group editor">
									<textarea id="message" class="form-control" name="content"
										ui-codemirror="cmOption" ng-model="src"
										ng-model-options="{ debounce: 500 }" ng-change="run()"
										ng-click="run()" ng-dblclick="loadSong()">
<<编辑器使用说明>>作者：corn
//拍号
4/4
//音符
1234 | 5670 |
// 升降号、还原号 /  高低八度   /
1  #1  b2  n2   | 3, 3,, 4' 4''|
//全音符 /二分音符/ 四分音符 /
 5---  | 5- 5- | 5 5 5 5 |
//   八分音符 + 十六分音符   /
5_5_ 5_5_ 5=5= 5=5= 5=5= 5=5= |
//延音线、滑音线 /
  6~ 6  (6 7) |
// 以上是曲谱编辑器使用说明									
										</textarea>
									<pre class="error" ng-show="error">{{error}}</pre>
									<p style="margin: 10px 35px; font-size: 12px;">曲谱总长度:
										{{totalMeasures}}小节, 解析时间: {{parseTime}} ms, 渲染时间:
										{{renderTime}} ms</p>
									<pre ng-show="schema">{{schema}}</pre>
									<pre ng-show="converted">{{converted}}</pre>
									<pre ng-show="result">{{result}}</pre>
								</div>
							</div>
							<!-- 图像识别入口 -->
							<div style="text-align: center; margin-top: 20px;">
								<div style="text-align: center; margin-top: 20px;">
									<button class="btn btn-primary" data-toggle="modal"
										data-target="#myModal">简谱图像识别demo</button>
									<!-- 这里是模态框 -->
									<div class="modal fade" id="myModal" tabindex="-1"
										role="dialog" aria-labelledby="myModalLabel"
										aria-hidden="true" data-backdrop="static" style="display: none;">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<h4 class="modal-title" id="myModalLabel">简谱图像识别demo</h4>
												</div>
												<div id="modalBody" class="modal-body">
												<h5 style="margin:20px;">目前仅支持纯简谱，歌词信息暂时无法显示在曲谱上~</h5>
													<button id="baiduAPI" class="btn btn-primary"
														style="margin-right: 20px;">百度图像识别API</button>
													<button id="addLabProdPic" class="btn btn-primary">OpenCV+tess4j识别</button>
												</div>
												<div class="modal-footer">
													<button id="modalClose" type="button"
														class="btn btn-default" data-dismiss="modal">关闭</button>
												</div>
											</div>
											<!-- /.modal-content -->
										</div>
										<!-- /.modal -->
									</div>
									<!-- 提示作用的模态窗口 -->
									<div class="modal fade" id="loadingModal" tabindex="-1"
										role="dialog" aria-labelledby="myModalLabel"
										aria-hidden="true" data-backdrop="static" style="display: none;">
										<div class="modal-dialog">
											<div class="modal-content">
												<img class="loading" src="style/img/loading.gif" />
												正在识别中，请耐心等待~
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-md-8">
						<ol class="breadcrumb">
							<li><a href="index.html">主页</a></li>
							<li class="active">编辑器使用说明</li>
						</ol>
					</div>

					<div resize id="score" class="col-md-8" style="visibility: hidden">
						<svg class="mus-score"></svg>
					</div>
				</form>
			</div>
		</div>
	</div>
	<jsp:include page="frame/Footer-Editor.jsp"></jsp:include>
	
	<!-- 上传插件脚本 -->
	<script src="<%=basePath%>style/js/ajaxupload.js" charset="utf-8"></script>
	<script type="text/javascript">
		$(function() {
			//上传图片，使用tess4j识别
			var a = new AjaxUpload('#addLabProdPic', {
				action : 'upload',
				name : 'picFile',
				responseType : 'json',
				onSubmit : function(file, ext) {
					if (ext && /^(jpg|png|bmp)$/.test(ext.toLowerCase())) {
						this.setData({
							'picName' : file
						});
						$('#myModal').modal('hide');
						$('#loadingModal').modal('show');
					} else {
						alert("请上传格式为 jpg|png|bmp 的图片！");
						return false;
					}
				},
				onComplete : function(file, response) {
					if (response.error) {
						alert(response.error);
						return;
					}
					/* $('#viewImg').attr('src',response.picUrl); */
					$('#message').val(" ");
					$('#message').val((response.picUrl).replace(/_@/g, "\n"));
					var i = 0;
					var int = setInterval(function () {
						$("#message").dblclick()
					    $("#message").trigger('click');
					    i ++;
					    if(i > 5){
					    	clearInterval(int);
					    }
					}, 100);
					$('#loadingModal').modal('hide');
				}
			});
		})
		
		$(function() {
			//上传图片，使用百度API识别
			var b = new AjaxUpload('#baiduAPI', {
				action : 'uploadBaidu',
				name : 'picFile',
				responseType : 'json',
				onSubmit : function(file, ext) {
					if (ext && /^(jpg|png|bmp)$/.test(ext.toLowerCase())) {
						this.setData({
							'picName' : file
						});
						$('#myModal').modal('hide');
						$('#loadingModal').modal('show');
					} else {
						alert("请上传格式为 jpg|png|bmp 的图片！");
						return false;
					}
				},
				onComplete : function(file, response) {
					if (response.error) {
						alert(response.error);
						return;
					}
					/* $('#viewImg').attr('src',response.picUrl); */
					$('#message').val(" ");
					$('#message').val((response.picUrl).replace(/_@/g, "\n"));
					var i = 0;
					var int = setInterval(function () {
						$("#message").dblclick()
					    $("#message").trigger('click');
					    i ++;
					    if(i > 5){
					    	clearInterval(int);
					    }
					}, 100);
					$('#loadingModal').modal('hide');
				}
			});
		})
	</script>