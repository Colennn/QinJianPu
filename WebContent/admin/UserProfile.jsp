<%@ page language="java" import="java.util.*" import="cap.bean.*"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<%
	Admin admin = (Admin) request.getSession().getAttribute("admin");
	Profile pf = (Profile) request.getAttribute("pf");
%>

<jsp:include page="frame/Header.jsp"></jsp:include>

<%
	if (null != admin) {
%>
<div class="container">
	<!-- Sidebar -->
	<jsp:include page="frame/navbar.jsp"></jsp:include>


	<div id="page-wrapper">
		<div class="row">
			<div class="col-lg-12">
				<h1>
					系统管理<small>用户详情信息管理</small>
				</h1>
				<ol class="breadcrumb">
					<li><a href="<%=basePath%>admin.html?action=index"><i
							class="glyphicon glyphicon-dashboard"></i> 控制面板</a></li>
					<li><a href="<%=basePath%>admin.html?action=useradmin"><i
							class="glyphicon glyphicon-cog"></i>用户管理</a></li>
					<li class="active"><i class="glyphicon glyphicon-user"></i>用户详细信息</li>
				</ol>



				<div class="col-lg-12">
					<div class="table-responsive">
						<table class="table table-hover tablesorter">
							<thead>
								<tr>
									<th>姓</th>
									<th>名</th>
									<th>性别</th>
									<th>联系电话</th>
								</tr>

							</thead>
							<tbody>
								<tr>
									<th><%=pf.getFirstName()%></th>
									<th><%=pf.getLastName()%></th>
									<th>
										<%
											if (pf.getGender() == 1) {
										%> 男 <%
											} else {
										%> 女 <%
											}
										%>
									</th>
									<th><%=pf.getTelephone()%></th>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /.row -->

</div>
<%
	} else {
%>
<%-- 404 page --%>
<%
	}
%>
<jsp:include page="frame/Footer.jsp"></jsp:include>

