<%@ page language="java" import="java.util.*" import="cap.bean.*"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<a class="navbar-brand" href="index.html">QinJianPu</a>
		</div>

		<div class="collapse navbar-collapse navbar-ex1-collapse">
			<c:if test="${user!=null && user.isApplied==1}">
				<ul class="nav navbar-nav">
					<li><a
						href="<%=basePath%>user?action=myblog&userId=${user.id}">我的首页</a></li>
				</ul>

				<ul class="nav navbar-nav">
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown">个人管理<b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a
								href="<%=basePath%>article?action=manage&userId=${user.id}"><i
									class="glyphicon glyphicon-cog"></i> 曲谱管理</a></li>
							<li class="divider"></li>
							<li><a
								href="<%=basePath%>category?action=manage&userId=${user.id}"><i
									class="glyphicon glyphicon-cog"></i> 分类管理</a></li>
							<li class="divider"></li>
							<li><a
								href="<%=basePath%>comment.html?action=manage&userId=${user.id}"><i
									class="glyphicon glyphicon-cog"></i> 评论管理</a></li>
						</ul></li>
				</ul>

			</c:if>
			<c:choose>
				<c:when test="${user==null }">

					<ul class="nav navbar-nav navbar-right">
						<li><a href="EditorExample.jsp" target="_blank"
							data-toggle="tooltip" data-placement="bottom" title="曲谱编辑器使用说明">
								&nbsp;&nbsp;Tips&nbsp;&nbsp;</a></li>
						<li><a href="Login.jsp" target="_blank">登录</a></li>
						<li><a href="Register.jsp" target="_blank">注册</a></li>
					</ul>

				</c:when>
				<c:when test="${user!=null }">

					<div class="pull-right">
						<ul class="nav navbar-nav pull-right">
							<li><a href="EditorExample.jsp" data-toggle="tooltip"
								data-placement="bottom" title="曲谱编辑器使用说明">
									&nbsp;&nbsp;Tips&nbsp;&nbsp;</a></li>
							<li class="dropdown"><a href="#" class="dropdown-toggle"
								data-toggle="dropdown">欢迎，${user.userName} <b class="caret"></b></a>
								<ul class="dropdown-menu">
									<li><a
										href="<%=basePath%>user?action=profile&id=${user.id}"><i
											class="glyphicon glyphicon-cog"></i> 编辑个人信息</a></li>
									<c:if test="${user.isApplied==1}">

										<li class="divider"></li>
										<li><a
											href="<%=basePath%>user?action=bloginfo&userId=${user.id}"><i
												class="glyphicon glyphicon-cog"></i> 编辑个人主页</a></li>
									</c:if>
									<li class="divider"></li>
									<li><a href="user?action=logout"><i
											class="glyphicon glyphicon-off"></i> 登出</a></li>
								</ul></li>
						</ul>
					</div>

				</c:when>
			</c:choose>
		</div>
	</div>
</nav>