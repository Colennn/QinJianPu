<%@ page language="java" import="java.util.*" import="cap.bean.*"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<%
	Admin admin = (Admin) request.getSession().getAttribute("admin");
	String scgExist = (String) request.getSession().getAttribute("scgExist");

	SysCategory scg = (SysCategory) request.getAttribute("scg");
%>

<jsp:include page="frame/Header.jsp"></jsp:include>

<%
	if (null != admin) {
%>
<!-- Sidebar -->
<jsp:include page="frame/navbar.jsp"></jsp:include>

<div id="page-wrapper" style="width:1100px; margin:0px auto;">
	<div class="row">
		<div class="col-lg-12">
			<h1>
				轻简谱社区 <small>管理系统</small>
			</h1>
			<ol class="breadcrumb">
				<li><a href="<%=basePath%>admin.html?action=index"><i
						class="glyphicon glyphicon-dashboard"></i> 控制面板</a></li>
				<li><a href="<%=basePath%>admin.html?action=SysCategoryAdmin"><i
						class="glyphicon glyphicon-cog"></i> 分类管理</a></li>
				<li class="active"><i class="glyphicon glyphicon-cog"></i> 编辑分类</li>
			</ol>

			<%
				if (null != scgExist) {
			%>
			<%-- 添加失败 --%>
			<div class="row">
				<div class="col-lg-12">
					<div class="alert alert-warning"><%=scgExist%></div>
				</div>
			</div>
			<%
				request.getSession().removeAttribute("scgExist");
					}
			%>

			<%
				if (null != scg) {
			%>
			<div class="row">
				<div class="col-lg-6">
					<form
						action="<%=basePath%>admin.html?action=SaveEditSysCategory&scgId=<%=scg.getId()%>"
						method="post">
						<label>分类名：</label> <input name="scgName" class="form-control"
							type="text" value="<%=scg.getCategoryName()%>" /><br> <input
							type="submit" class="btn btn-primary" value="保存">
					</form>
				</div>
			</div>
			<%
				}
			%>
		</div>
		<!-- /.col-lg-12 -->
	</div>
	<!-- /.row -->
</div>
<!-- /#page-wrapper -->

<%
	} else {
%>
<%-- 404 page --%>
<%
	}
%>
<jsp:include page="frame/Footer.jsp"></jsp:include>

