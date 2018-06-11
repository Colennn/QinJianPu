<%@ page language="java" import="java.util.*" import="cap.bean.*"
	import="cap.dao.impl.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	List<Article> artList = (List<Article>) request.getAttribute("artList");
	List<Category> cgList = (List<Category>) request.getAttribute("cgList");
	List<SysCategory> scgList = (List<SysCategory>) request.getAttribute("scgList");
%>

<jsp:include page="frame/Header-Editor.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar.jsp"></jsp:include>

	<c:if test="${user!=null }">

		<div class="container" style="width: 90%;">
			<div class="row col-md-12">
				<div class="col-md-12">


					<div class="col-md-4">
						<form class="form-horizontal" name="add_artical_form"
							action="<%=basePath %>article?action=save&userId=${user.id}"
							method="post" onsubmit="return isValidate(add_artical_form)">

							<!-- 可切换导航栏 -->
							<ul id="myTab" class="nav nav-tabs">
								<li><a href="#tittle-div" data-toggle="tab"> 曲谱信息 </a></li>
								<li class="active"><a href="#editor-div" data-toggle="tab">曲谱编辑器</a></li>
								<li>
									<div class="btn-group" style="margin-left: 30px;">
										<button type="button" class="btn btn-default"
											aria-label="Play" ng-disabled="playDisabled"
											ng-click="play()">
											<span class="glyphicon glyphicon-play" aria-hidden="true"></span>
										</button>
										<button type="button" class="btn btn-default"
											aria-label="Stop" ng-disabled="stopDisabled"
											ng-click="stop()">
											<span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
										</button>
										<button id="contact-submit" type="submit"
											class="btn btn-primary input-medium pull-right">
											<span class="glyphicon glyphicon-floppy-disk"
												aria-hidden="true"></span>
										</button>
									</div>
								</li>
							</ul>

							<div id="myTabContent" class="tab-content">
								<!-- 标题等信息的可切换导航栏div -->
								<div class="tab-pane fade" id="tittle-div"
									style="margin-top: 20px;">
									<div class="form-group">
										<label for="title">标题</label> <input class="form-control"
											id="name" name="title" type="text" placeholder="请在这里输入标题">
									</div>
									<div class="form-group">
										<label for="sys_category">系统分类</label> <select
											class="form-control" id="subject" name="sys_category">
											<c:choose>
												<c:when test="${scgList!=null && fn:length(scgList)>0 }">
													<c:forEach items="${scgList }" var="scg">
														<option value="${scg.id }">${scg.categoryName }</option>
													</c:forEach>
												</c:when>
												<c:otherwise>
													<c:out value="获取系统分类失败"></c:out>
												</c:otherwise>
											</c:choose>
										</select>
									</div>
									<div class="form-group">
										<label for="category">个人分类</label> <select
											class="form-control" id="subject" name="category">
											<c:choose>
												<c:when test="${cgList!=null && fn:length(cgList)>0 }">
													<c:forEach items="${cgList }" var="cg">
														<option value="${cg.id }">${cg.categoryName}</option>
													</c:forEach>
												</c:when>
												<c:otherwise>
													<c:out value="无分类"></c:out>
												</c:otherwise>
											</c:choose>
										</select>
									</div>

									<div class="form-group">
										<label for="category">简介</label>
										<textarea class="form-control" name="summary"
											placeholder="请在这里输入简介" rows="5"></textarea>
									</div>

								</div>

								<!-- 简谱编辑器  -->
								<div class="tab-pane fade in active" id="editor-div"
									style="margin-top: 20px;">
									<div id="editor" class="form-group editor">
										<textarea id="message" name="content" class="form-control"
											ui-codemirror="cmOption" ng-model="src"
											ng-model-options="{ debounce: 500 }" ng-change="run()"
											ng-click="run()" ng-dblclick="loadSong()">
<<未命名标题>>作者
4/4
1234|5670|
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
							</div>
						</form>
						<!-- 图像识别入口 -->
						<div style="text-align: center; margin-top: 20px;">
							<div style="text-align: center; margin-top: 20px;">
								<button class="btn btn-primary" data-toggle="modal"
									data-target="#myModal">简谱图像识别demo</button>
								<!-- 这里是模态框 -->
								<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
									aria-labelledby="myModalLabel" aria-hidden="true"
									data-backdrop="static" style="display: none;">
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
									role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
									data-backdrop="static" style="display: none;">
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
					<!-- 乐谱 -->
					<div class="col-md-8">
						<ol class="breadcrumb">
							<li><a
								href="<%=basePath%>article?action=manage&userId=${user.id}">曲谱管理</a></li>
							<li class="active">新建曲谱</li>
						</ol>
					</div>
					<div resize id="score" class="col-md-8">
						<svg class="mus-score"></svg>
					</div>

				</div>
			</div>
		</div>


	</c:if>
	<jsp:include page="frame/Footer-Editor.jsp"></jsp:include>
	<script type="text/javascript">
			function isValidate(add_artical_form) {
				var title = add_artical_form.title.value;

				if (title == "") {
					alert("请在曲谱信息中填写标题~");

					return false;
				}

				return true;
			}
		</script>
	<!-- 上传插件脚本 -->
	<script src="<%=basePath%>style/js/ajaxupload.js" charset="utf-8"></script>
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