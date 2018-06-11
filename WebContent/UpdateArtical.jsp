<%@ page language="java" import="java.util.*" import="cap.bean.*"
	import="cap.dao.impl.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<%
	User u = (User) request.getSession().getAttribute("user");
	Article art = (Article) request.getAttribute("art");
	List<SysCategory> scgList = (List<SysCategory>) request.getAttribute("scgList");

	String succMsg = (String) request.getSession().getAttribute("succMsg");
	String errorMsg = (String) request.getSession().getAttribute("errorMsg");
%>

<jsp:include page="frame/Header-Editor.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar.jsp"></jsp:include>
	<!-- 保存提示 -->
	<%
		if (null != succMsg) {
	%>
	<div class="container">
		<div class="alert alert-success">
			<%=succMsg%>
			<a href="#" class="close" data-dismiss="alert">&times;</a>
		</div>
	</div>
	<%
		request.getSession().removeAttribute("succMsg");
		}
	%>

	<%
		if (null != errorMsg) {
	%>
	<div class="container">
		<div class="alert alert-error">
			<%=errorMsg%>
			<a href="#" class="close" data-dismiss="alert">&times;</a>
		</div>
	</div>
	<%
		request.getSession().removeAttribute("errorMsg");
		}
	%>

	<%
		if ((null != u) && (null != art)) {
	%>
	<div class="container" style="width: 90%;">
		<div class="row col-md-12">
			<div class="col-md-12">

				<form class="form-horizontal" name="add_artical_form"
					action="<%=basePath%>article?action=saveupdate&userId=<%=u.getId()%>&artId=<%=art.getId()%>"
					method="post">
					<div class="col-md-4">
						<!-- 可切换导航栏 -->
						<ul id="myTab" class="nav nav-tabs">
							<li><a href="#tittle-div" data-toggle="tab"> 曲谱信息 </a></li>
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
										id="name" name="title" type="text" value="<%=art.getTitle()%>">
								</div>
								<div class="form-group">
									<label for="sys_category">系统分类</label> <select
										class="form-control" id="subject" name="sys_category"
										class="span3">
										<%
											if ((null != scgList) && (scgList.size() > 0)) {
													int scgId = art.getSysCategoryId(); //当前文章所属系统分类的id

													for (SysCategory scg : scgList) {
														if (scgId == scg.getId()) {
										%>
										<option value="<%=scgId%>" selected><%=scg.getCategoryName()%></option>

										<%
											} else {
										%>
										<option value="<%=scg.getId()%>"><%=scg.getCategoryName()%></option>
										<%
											}
													}
												} else {
										%>
										<%="获取系统分类失败"%>
										<%
											}
										%>
									</select>
								</div>
								<div class="form-group">
									<label for="category">个人分类</label> <select class="form-control"
										id="subject" name="category">
										<%
											int userId = u.getId();
												CategoryDaoImpl cgDao = new CategoryDaoImpl();
												List<Category> cgList = cgDao.getByUserId(userId);

												int cgId = art.getCategoryId();

												if ((null != cgList) && (cgList.size() > 0)) {
													for (Category cg : cgList) {
														if (cg.getIsDelete() == 0) {
															if (cgId == cg.getId()) {
										%>
										<option value="<%=cgId%>" selected><%=cg.getCategoryName()%></option>

										<%
											} else {
										%>
										<option value="<%=cg.getId()%>"><%=cg.getCategoryName()%></option>

										<%
											}
														}
													}
												} else {
										%>
										<%="获取个人分类失败"%>
										<%
											}
										%>
									</select>
								</div>

								<div class="form-group">
									<label for="category">简介</label>
									<textarea class="form-control" name="summary" placeholder="简介"
										rows="5"><%=art.getSummary()%></textarea>
								</div>

							</div>

							<!-- 简谱编辑器  -->
							<div class="tab-pane fade in active" id="editor-div"
								style="margin-top: 20px;">
								<div id="editor" class="form-group editor">
									<textarea id="message" class="form-control" name="content"
										ui-codemirror="cmOption" ng-model="src"
										ng-model-options="{ debounce: 500 }" ng-change="run()"
										ng-click="run()"><%=art.getContent()%></textarea>
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
					</div>

					<div class="col-md-8">
						<ol class="breadcrumb">
							<li><a
								href="<%=basePath%>article?action=manage&userId=<%=u.getId()%>">曲谱管理</a></li>
							<li class="active">编辑曲谱</li>
						</ol>
					</div>

					<div resize id="score" class="col-md-8" style="visibility: hidden">
						<svg class="mus-score"></svg>
					</div>
				</form>
			</div>
		</div>
	</div>
	<%
		}
	%>
	<jsp:include page="frame/Footer-Editor.jsp"></jsp:include>