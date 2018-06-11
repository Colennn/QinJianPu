<%@ page language="java" import="java.util.*" import="cap.bean.*"
	import="cap.dao.impl.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<%
	int userId = 0;
	User u = (User) request.getSession().getAttribute("user"); //用户登录后的信息
	Article art = (Article) request.getAttribute("art");
	SysCategory scg = (SysCategory) request.getAttribute("scg");
	Category cg = (Category) request.getAttribute("cg");
	String author = (String) request.getAttribute("author");

	String succMsg = (String) request.getSession().getAttribute("succMsg");
	String errorMsg = (String) request.getSession().getAttribute("errorMsg");
	List<Comment> cmtList = (List<Comment>) request.getAttribute("cmtList");
	List<Article> artList = (List<Article>) request.getAttribute("artList");

	char[] artArray = art.getContent().toCharArray();
%>


<jsp:include page="frame/Header-Editor.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar.jsp"></jsp:include>

	<div class="container" style="">
		<div class="row col-md-12">
			<div class="col-md-12">
				<!-- 编辑器的div -->
				<div class="tab-pane hidden" id="editor-div"
					style="margin-top: 20px;">
					<div id="editor" class="form-group editor">
						<textarea id="message" class="form-control" name="content"
							ui-codemirror="cmOption" ng-model="src"
							ng-model-options="{ debounce: 500 }" ng-change="run()"
							ng-click="run()">
											<%=art.getContent()%>
						</textarea>
						<p style="margin: 10px 35px; font-size: 12px;">曲谱总长度:
							{{totalMeasures}}小节, 解析时间: {{parseTime}} ms, 渲染时间: {{renderTime}}
							ms</p>
					</div>
				</div>

			</div>

			<div class="col-md-12">

				<!-- 面包屑导航 -->
				<ol class="breadcrumb">
					<li><a href="index.html">主页</a></li>
					<li class="active">查看曲谱</li>
					<li class="active"><%=art.getTitle()%></li>
					<div class="btn-group" style="margin-left: 10px;">
						<!-- 播放暂停按钮 -->
						<button type="button" class="btn btn-default" aria-label="Play"
							ng-disabled="playDisabled" ng-click="play()">
							<span class="glyphicon glyphicon-play" aria-hidden="true"></span>
						</button>
						<button type="button" class="btn btn-default" aria-label="Stop"
							ng-disabled="stopDisabled" ng-click="stop()">
							<span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
						</button>
					</div>
				</ol>
				<div style="text-align: center;">
					<!-- 标题 the actual blog post: title/author/date/content -->
					<%
						if (null != art) {
					%>
					<h2 style="font-weight: bold;"><%=art.getTitle()%></h2>
					<p style="font-size: 14px; color: #999999;">
						<i class="glyphicon glyphicon-user"></i>
						<%=author%>
						| <i class="glyphicon glyphicon-calendar"></i>
						<%=art.getPublishTime()%>
						| <i class="glyphicon glyphicon-eye-open"></i>
						<%-- <%=(Integer)session.getAttribute("readNum")%>  --%>
						<%=art.getCount()%>
						<!-- | <i class="glyphicon glyphicon-comment"></i> -->
					</p>
					<%
						}
					%>


				</div>
				<hr>

			</div>
			<!-- 乐谱 -->
			<div resize id="score" class="col-md-12" style="visibility:hidden">
				<svg class="mus-score"></svg>
			</div>

		</div>
	</div>
	</div>

	<div class="container" style="margin-top: 30px;">

		<div class="row">
			<div class="col-lg-8">

				<!-- the comment box -->
				<div class="well">
					<%
						if (null != succMsg) {
					%>
					<div class="alert alert-success">
					<%=succMsg%>
					<a href="#" class="close" data-dismiss="alert">&times;</a>
					</div>
					<%
						request.getSession().removeAttribute("succMsg");
						}
					%>

					<%
						if (null != errorMsg) {
					%>
					<div class="alert alert-danger">
					<%=errorMsg%>
					<a href="#" class="close" data-dismiss="alert">&times;</a>
					</div>
					<%
						request.getSession().removeAttribute("errorMsg");
						}
					%>
					<h4>发布评论：</h4>
					<%
						if (null != u) {
							userId = u.getId();
						}
					%>
					<form role="form" name="comment"
						action="comment.html?action=commit&userId=<%=userId%>&artId=<%=art.getId()%>"
						method="post" onsubmit="return isValidate(comment)">
						<div class="form-group">
							<textarea class="form-control" rows="3" name="comment_content"
								style="resize: none;" placeholder="请在这里输入您的评论……"></textarea>
						</div>
						<button type="submit" class="btn btn-primary">提交</button>
					</form>
				</div>



				<hr>
				<!-- the comments -->
				<%
					if (null != cmtList) {
						for (Comment cmt : cmtList) {
							if (cmt.getIsDelete() == 0) { //未被删除的评论
								int cmtUserId = cmt.getUserId();
								UserDaoImpl uDao = new UserDaoImpl();
								User cmtUser = uDao.getUserById(cmtUserId);
				%>
				<p><%=cmt.getContent()%></p>
				<p style="font-size: 14px; color: #999999;">
					<i class="glyphicon glyphicon-user"></i>
					<a href="<%=basePath%>user?action=myblog&userId=<%=cmt.getUserId()%> target="_blank">
						<%=cmtUser.getUserName()%></a> | 
					<i class="glyphicon glyphicon-calendar"></i>
						<%=cmt.getTime()%>
				</p>
				<hr>
				<%
					}
						}
					} else {
				%>
				暂无评论。。。
				<%
					}
				%>
			</div>

			<div class="col-lg-4">
				<div class="well">
					<h4>所属系统分类</h4>
					<div class="row">
						<div class="col-lg-6">
							<ul class="list-unstyled">
								<%
									if (null != scg) {
								%>
								<li><%=scg.getCategoryName()%></li>
								<%
									}
								%>
							</ul>
						</div>
					</div>
				</div>
				<!-- /well -->

				<div class="well">
					<h4>所属个人分类</h4>
					<div class="row">
						<div class="col-lg-6">
							<ul class="list-unstyled">
								<%
									if ((null != cg) && (cg.getIsDelete() == 0)) {
								%>
								<li><%=cg.getCategoryName()%></li>
								<%
									} else {
								%>
								<li>无分类</li>
								<%
									}
								%>
							</ul>
						</div>
					</div>
				</div>
				<!-- /well -->

				<div class="well">
					<h4>相关曲谱推荐：</h4>
					<%
						if (artList != null) {
							for (Article relateArt : artList) {
					%>
					<ul>
						<li><a
							href="comment.html?action=post&artId=<%=relateArt.getId()%>&userId=<%=relateArt.getUserId()%>"
							target="_blank"><%=relateArt.getTitle()%></a></li>
					</ul>
					<%
						}
						}
					%>
				</div>

			</div>
		</div>

		<jsp:include page="frame/Footer-Editor.jsp"></jsp:include>
		<script type="text/javascript">
			function isValidate(comment) {
				var comment_content = comment.comment_content.value;

				if (comment_content == "") {
					alert("请填写评论内容");

					return false;
				}

				return true;
			}
		</script>