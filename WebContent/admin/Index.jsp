<%@ page language="java" import="java.util.*" import="cap.bean.*"
	import="cap.dao.impl.*" pageEncoding="UTF-8"%>
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

<jsp:include page="frame/Header.jsp"></jsp:include>

<%
	if (null != admin) {
%>
<div class="container">
	<jsp:include page="frame/navbar.jsp"></jsp:include>

	<div id="page-wrapper">

		<div class="row">
			<div class="col-lg-12">
				<h1>
					 轻简谱社区<small>管理系统</small>
				</h1>
				<ol class="breadcrumb">
					<li class="active"><i class="glyphicon glyphicon-dashboard"></i>
						控制面板</li>
				</ol>

				<div class="row">
					<div class="col-lg-3">
						<div class="panel panel-info">
							<div class="panel-heading">
								<div class="row">
									<div class="col-xs-6">
										<i class="glyphicon glyphicon-search"></i>
									</div>
									<div class="col-xs-6 text-right">
										<p class="announcement-heading"><%=cnt.getCount()%></p>
										<p class="announcement-text">网站来访人数</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-lg-3">
						<div class="panel panel-success">
							<div class="panel-heading">
								<div class="row">
									<div class="col-xs-6">
										<i class="glyphicon glyphicon-edit"></i>
									</div>
									<div class="col-xs-6 text-right">
										<p class="announcement-heading"><%=artList.size()%></p>
										<p class="announcement-text">曲谱总数</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-lg-3">
						<div class="panel panel-warning">
							<div class="panel-heading">
								<div class="row">
									<div class="col-xs-6">
										<i class="glyphicon glyphicon-envelope"></i>
									</div>
									<div class="col-xs-6 text-right">
										<p class="announcement-heading"><%=cmtList.size()%></p>
										<p class="announcement-text">评论总数</p>
									</div>
								</div>
							</div>
						</div>
					</div>


					<div class="col-lg-3">
						<div class="panel panel-danger">
							<div class="panel-heading">
								<div class="row">
									<div class="col-xs-6">
										<i class="glyphicon glyphicon-user"></i>
									</div>
									<div class="col-xs-6 text-right">
										<p class="announcement-heading"><%=uList.size()%></p>
										<p class="announcement-text">注册会员数</p>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>

	</div>
</div>
<%
	} else {
%>
<%-- 404 page --%>
<%
	}
%>
<jsp:include page="frame/Footer.jsp"></jsp:include>