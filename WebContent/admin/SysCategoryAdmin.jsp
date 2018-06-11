<%@ page language="java" import="java.util.*" import="cap.bean.*"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<%
	Admin admin = (Admin) request.getSession().getAttribute("admin");
	List<SysCategory> scgList = (List<SysCategory>) request.getAttribute("scgList");

	String succDeleScg = (String) request.getSession().getAttribute("succDeleScg"); //删除提示
	String errorDeleScg = (String) request.getSession().getAttribute("errorDeleScg");

	String succAddScg = (String) request.getSession().getAttribute("succAddScg"); //添加提示
	String errorAddScg = (String) request.getSession().getAttribute("errorAddScg");

	String succUpdateScg = (String) request.getSession().getAttribute("succUpdateScg"); //更新提示
	String errorUpdateScg = (String) request.getSession().getAttribute("errorUpdateScg");

	//添加用于分页显示
	int curPage = (Integer) request.getAttribute("curPage");
	int totalPages = (Integer) request.getAttribute("totalPages");
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
				<br>
				<ol class="breadcrumb">
					<li><a href="<%=basePath%>admin.html?action=index"><i
							class="glyphicon glyphicon-dashboard"></i> 控制面板</a></li>
					<li class="active"><i class="glyphicon glyphicon-cog"></i>
						分类管理</li>
				</ol>
				<p>
					<a class="btn btn-primary"
						href="<%=basePath%>admin/AddSysCategory.jsp">新建分类</a>
				<p>

					<%
						if (null != succDeleScg) {
					%>
					<%-- 删除成功 --%>
				<div class="row">
					<div class="col-lg-12">
						<div class="alert alert-success"><%=succDeleScg%></div>
					</div>
				</div>
				<%
					request.getSession().removeAttribute("succDeleScg");
						}
				%>

				<%
					if (null != errorDeleScg) {
				%>
				<%-- 删除失败 --%>
				<div class="row">
					<div class="col-lg-12">
						<div class="alert alert-error"><%=errorDeleScg%></div>
					</div>
				</div>
				<%
					request.getSession().removeAttribute("errorDeleScg");
						}
				%>

				<%
					if (null != succAddScg) {
				%>
				<%-- 添加成功 --%>
				<div class="row">
					<div class="col-lg-12">
						<div class="alert alert-success"><%=succAddScg%></div>
					</div>
				</div>
				<%
					request.getSession().removeAttribute("succAddScg");
						}
				%>

				<%
					if (null != errorAddScg) {
				%>
				<%-- 添加失败 --%>
				<div class="row">
					<div class="col-lg-12">
						<div class="alert alert-error"><%=errorAddScg%></div>
					</div>
				</div>
				<%
					request.getSession().removeAttribute("errorAddScg");
						}
				%>

				<%
					if (null != succUpdateScg) {
				%>
				<%-- 更新成功 --%>
				<div class="row">
					<div class="col-lg-12">
						<div class="alert alert-success"><%=succUpdateScg%></div>
					</div>
				</div>
				<%
					request.getSession().removeAttribute("succUpdateScg");
						}
				%>

				<%
					if (null != errorUpdateScg) {
				%>
				<%-- 更新失败 --%>
				<div class="row">
					<div class="col-lg-12">
						<div class="alert alert-error"><%=errorUpdateScg%></div>
					</div>
				</div>
				<%
					request.getSession().removeAttribute("errorUpdateScg");
						}
				%>

				<div class="row">
					<div class="col-lg-12">
						<div class="table-responsive">
							<table class="table table-hover tablesorter">
								<thead>
									<tr>
										<th>分类名</th>
										<th>文章数</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									<%
										if ((scgList != null) && (scgList.size() > 0)) {
												for (SysCategory scg : scgList) {
													if (scg.getIsDelete() == 0) {
														String deleUrl = basePath + "admin.html?action=DeleteSysCategory&scgId=" + scg.getId();
									%>
									<tr>
										<td><%=scg.getCategoryName()%></td>
										<td><%=scg.getArticles()%></td>
										<td>
											<%
												if (!"无分类".equals(scg.getCategoryName())) {
											%> <a
											href="<%=basePath%>admin.html?action=EditSysCategory&scgId=<%=scg.getId()%>"><i
												class="glyphicon glyphicon-pencil"></i></a> <a
											onClick="dele('<%=deleUrl%>')"><i class="icon-remove"></i></a>
											<%
												} else {
											%> <%="系统默认分类"%> <%
 	}
 %>
										</td>
									</tr>
									<%
										}
												}
											} else {
									%>
									<%="获取分类失败"%>
									<%
										}
									%>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div>
					<!-- pager -->
					<ul class="pager">
						<%
							if (curPage > 1) {
						%>
						<li class="previous"><a
							href="<%=basePath%>admin.html?action=SysCategoryAdmin&curPage=<%=(curPage - 1)%>">&larr;
								上一页</a></li>
						<%
							}
						%>

						<%
							if (curPage < totalPages) {
						%>
						<li class="next"><a
							href="<%=basePath%>admin.html?action=SysCategoryAdmin&curPage=<%=(curPage + 1)%>">下一页
								&rarr;</a></li>
						<%
							}
						%>
					</ul>
				</div>
			</div>
		</div>
		<!-- /.row -->
	</div>
	<!-- /#page-wrapper -->
</div>
<%
	} else {
%>
<%-- 404 page --%>
<%
	}
%>
<jsp:include page="frame/Footer.jsp"></jsp:include>

<script type="text/javascript">
	function dele(deleUrl) {

		if (confirm("你确定要删除该分类吗？")) {
			location.href = deleUrl;
		}
	}
</script>