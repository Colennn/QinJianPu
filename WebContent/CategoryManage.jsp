<%@ page language="java" import="java.util.*" import="cap.bean.*"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<jsp:include page="frame/Header.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar.jsp"></jsp:include>

	<%-- 新建分类结果提示消息 --%>
	<c:if test="${succAddMsg!=null }">

		<div class="container">
			<div class="alert alert-success">${succAddMsg }</div>
		</div>
		<c:remove var="succAddMsg" />
	</c:if>
	<%-- 删除分类结果提示消息 --%>

	<c:if test="${succDeleMsg!=null }">
		<div class="container">
			<div class="alert alert-success">${succDeleMsg }</div>
		</div>
		<c:remove var="succDeleMsg" />
	</c:if>
	<c:if test="${errorDeleMsg!=null }">

		<div class="container">
			<div class="alert alert-error">${errorDeleMsg}</div>
		</div>
		<c:remove var="errorDeleMsg" />
	</c:if>

	<%-- 更新分类的结果提示消息 --%>
	<c:if test="${succUpdateMsg!=null }">
		<div class="container">
			<div class="alert alert-success">${succUpdateMsg }</div>
		</div>
		<c:remove var="succUpdateMsg" />
	</c:if>
	<c:if test="${errorUpdateMsg!=null }">
		<div class="container">
			<div class="alert alert-error">${errorUpdateMsg }</div>
		</div>
		<c:remove var="errorUpdateMsg" />
	</c:if>

	<c:if test="${user!=null }">

		<div class="container">
			<div class="btn-toolbar">
				<a class="btn btn-primary" href="<%=basePath%>AddCategory.jsp">新建分类</a>
			</div>
			<div class="well">
				<table class="table">
					<thead>
						<tr>
							<th>分类名称</th>
							<th>包含文章数量</th>
							<th style="width: 50px;">操作</th>
						</tr>
					</thead>
					<tbody>
						<c:choose>
							<c:when test="${cgList!=null }">
								<c:forEach items="${cgList }" var="cg">
									<tr>
										<td>${cg.categoryName }</td>
										<td>${cg.articles }</td>
										<td><c:choose>
												<c:when test="${cg.categoryName eq '无分类' }">
													<c:out value="系统"></c:out>
												</c:when>
												<c:otherwise>
													<a href="<%=basePath %>category?action=edit&cgId=${cg.id}"><i
														class="glyphicon glyphicon-pencil"></i></a>
													<a
														href="<%=basePath %>category?action=delete&cgId=${cg.id }&userId=${user.id}"><i
														class="glyphicon glyphicon-remove"></i></a>
												</c:otherwise>
											</c:choose></td>
									</tr>
								</c:forEach>
							</c:when>
							<c:otherwise>
								<c:out value="没有查询到分类"></c:out>
							</c:otherwise>
						</c:choose>
					</tbody>
				</table>
			</div>

			<div>
				<!-- pager -->
				<ul class="pager">
					<c:if test="${curPage>1 }">
						<li class="previous"><a
							href="<%=basePath%>category?action=manage&userId=${user.id }&curPage=${curPage-1}">&larr;
								上一页</a></li>
					</c:if>
					<c:if test="${curPage<totalPages }">
						<li class="next"><a
							href="<%=basePath%>category?action=manage&userId=${user.id }&curPage=${curPage+1}">下一页
								&rarr;</a></li>
					</c:if>
				</ul>
			</div>


		</div>
	</c:if>

	<jsp:include page="frame/Footer.jsp"></jsp:include>

	</script>