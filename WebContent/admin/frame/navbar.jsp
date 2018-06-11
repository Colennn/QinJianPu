<%@ page language="java" import="java.util.*" import="cap.bean.*"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%
	Admin admin = (Admin) request.getSession().getAttribute("admin");
	List<Article> artList = (List<Article>) request.getAttribute("artList");
	List<Comment> cmtList = (List<Comment>) request.getAttribute("cmtList");
	List<User> uList = (List<User>) request.getAttribute("uList");
	Counter cnt = (Counter) request.getAttribute("cnt");
%>
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<a class="navbar-brand" href="<%=basePath%>admin.html?action=index">系统管理</a>
		</div>

		<div class="collapse navbar-collapse navbar-ex1-collapse">
			<ul class="nav navbar-nav side-nav">
				<li><a href="<%=basePath%>admin.html?action=index"><i
						class="glyphicon glyphicon-dashboard"></i> 控制面板</a></li>
				<li><a href="<%=basePath%>admin.html?action=useradmin"><i
						class="glyphicon glyphicon-cog"></i> 用户管理</a></li>
				<li><a href="<%=basePath%>admin.html?action=SysArticalAdmin"><i
						class="glyphicon glyphicon-cog"></i> 曲谱管理</a></li>
				<li><a href="<%=basePath%>admin.html?action=SysCategoryAdmin"><i
						class="glyphicon glyphicon-edit"></i> 分类管理</a></li>

			</ul>

			<ul class="nav navbar-nav navbar-right navbar-user">
				<li class="dropdown user-dropdown"><a href="#"
					class="dropdown-toggle" data-toggle="dropdown"><i
						class="glyphicon glyphicon-user"></i> <%=admin.getUserName()%> <b
						class="caret"></b></a>
					<ul class="dropdown-menu">
						<li class="disabled"><a href="#"><i
								class="glyphicon glyphicon-cog"></i> 设置</a></li>
						<li class="divider"></li>
						<li><a href="<%=basePath%>admin.html?action=logout"><i
								class="glyphicon glyphicon-off"></i> 登出</a></li>
					</ul></li>
			</ul>
		</div>
	</div>
</nav>