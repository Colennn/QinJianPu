<%@ page language="java" import="java.util.*" import="cap.bean.*"
	import="cap.dao.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<%
	Admin admin = (Admin) request.getSession().getAttribute("admin");

	List<Article> artList = (List<Article>) request.getAttribute("artList");

	String deleSuccMsg = (String) request.getSession().getAttribute("deleSuccMsg"); //删除文章消息
	String deleErrorMsg = (String) request.getSession().getAttribute("deleErrorMsg");

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
					<li class="active"><i class="glyphicon glyphicon-edit"></i>
						文章管理</li>
				</ol>
			</div>
		</div>

		<%
			if (null != deleSuccMsg) {
		%>
		<div class="row">
			<div class="col-lg-12">
				<div class="alert alert-success"><%=deleSuccMsg%></div>
			</div>
		</div>
		<%
			request.getSession().removeAttribute("deleSuccMsg");
				}
		%>

		<%
			if (null != deleErrorMsg) {
		%>
		<div class="row">
			<div class="col-lg-12">
				<div class="alert alert-error"><%=deleErrorMsg%></div>
			</div>
		</div>
		<%
			request.getSession().removeAttribute("deleErrorMsg");
				}
		%>


		<div class="row">
			<div class="col-lg-12">
				<div class="table-responsive">
					<table class="table table-hover tablesorter">
						<thead>
							<tr>
								<th>文章标题</th>
								<th>作者</th>
								<th>发布时间</th>
								<th style="width: 50px;">操作</th>
							</tr>
						</thead>

						<tbody>
							<%
								if ((artList != null) && (artList.size() > 0)) {
										for (Article art : artList) {
											if (0 == art.getIsDelete()) {
												String deleUrl = basePath + "admin.html?action=DeleteSysArtical&artId=" + art.getId();

												//UserDaoImpl uDao = new UserDaoImpl();
												//User u = uDao.getUserById(art.getUserId());
							%>
							<tr>
								<td><a
									href="<%=basePath%>comment.html?action=post&artId=<%=art.getId()%>&userId=<%=art.getUserId()%>"
									target="_blank"> <%=art.getTitle()%></a></td>
								<td><%=art.getUsername()%></td>
								<td><%=art.getPublishTime()%></td>
								<td><a onClick="dele('<%=deleUrl%>')"><i
										class="glyphicon glyphicon-floppy-remove"></i></a></td>
							</tr>

							<%
								}
										}
									} else {
							%>
							<%="获取系统分类失败！"%>
							<%
								}
							%>
						</tbody>
					</table>
				</div>
			</div>
		</div>


		<!-- pager -->
		<ul class="pager">
			<c:if test="${curPage > 1}">
				<li class="previous"><a
					href="<%=basePath%>admin.html?action=SysArticalAdmin&curPage=${curPage-1}">&larr;
						上一页</a></li>
			</c:if>
			<p style="display: inline;">第 ${curPage} 页 / 共 ${totalPages} 页</p>
			<c:if test="${curPage < totalPages}">
				<li class="next"><a
					href="<%=basePath%>admin.html?action=SysArticalAdmin&curPage=${curPage+1}">下一页
						&rarr;</a></li>
			</c:if>
		</ul>



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

<script type="text/javascript">
	function dele(deleUrl) {

		if (confirm("你确定要删除该文章吗？")) {
			location.href = deleUrl;

		}
	}
</script>