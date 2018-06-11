<%@ page language="java" import="java.util.*" import="cap.bean.*"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	session.setAttribute("basePath", basePath);
%>

<jsp:include page="frame/Header.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar.jsp"></jsp:include>

	<c:if test="${succMsg!=null }">
		<div class="container">
			<div class="alert alert-success">${succMsg }</div>
		</div>
		<c:remove var="succMsg" />
	</c:if>
	<c:if test="${errorMsg!=null }">
		<div class="container">
			<div class="alert alert-error">${errorMsg }</div>
		</div>
		<c:remove var="errorMsg" />
	</c:if>

	<c:if test="${deleSuccMsg!=null }">
		<div class="container">
			<div class="alert alert-success">${deleSuccMsg }</div>
		</div>
		<c:remove var="deleSuccMsg" />
	</c:if>
	<c:if test="${deleErrorMsg!=null }">
		<div class="container">
			<div class="alert alert-error">${deleErrorMsg }</div>
		</div>
		<c:remove var="deleErrorMsg" />
	</c:if>

	<c:if test="${user!=null }">
		<div class="container">
			<div class="btn-toolbar" style="margin-bottom:10px;">
				<a class="btn btn-primary"
					href="<%=basePath%>article?action=add&userId=${user.id}">新建曲谱</a>
			</div>
			<div class="well">
				<table class="table">
					<thead>
						<tr>
							<th>标题</th>
							<th>系统分类</th>
							<th>个人分类</th>
							<th>最近一次修改时间</th>
							<th style="width: 50px;">操作</th>
						</tr>
					</thead>
					<tbody>
						<c:choose>
							<c:when test="${artList!=null }">
								<c:forEach items="${artList }" var="art">
									<tr>
										<td><a
											href="<%=basePath %>article?action=update&artId=${art.id}">${art.title }</a></td>
										<td>${art.scName }</td>
										<td>${art.categoryName }</td>
										<td>${art.publishTime }</td>
										<td><a
											href="<%=basePath %>article?action=update&artId=${art.id}"><i
												class="glyphicon glyphicon-pencil"></i></a></td>
										<td><a
											href="${basePath }article?action=delete&artId=${art.id }&userId=${user.id }"><i
												class="glyphicon glyphicon-remove"></i></a></td>

									</tr>

								</c:forEach>
							</c:when>
							<c:otherwise>
								<c:out value="暂时没有文章"></c:out>
								<p>你还没有分享过简谱噢，赶紧写吧~</p>
							</c:otherwise>
						</c:choose>
					</tbody>
				</table>
			</div>

			<div>
				<ul class="pager">
					<c:if test="${curPage>1 }">

						<li class="previous"><a
							href="<%=basePath%>article?action=manage&userId=${user.id }&curPage=${curPage-1}">&larr;
								上一页</a></li>

					</c:if>
					<p style="display:inline;">第 ${curPage} 页 / 共 ${totalPages} 页</p>
					<c:if test="${curPage<totalPages }">
						<li class="next"><a
							href="<%=basePath%>article?action=manage&userId=${user.id }&curPage=${curPage+1}">下一页
								&rarr;</a></li>
					</c:if>
				</ul>
			</div>


		</div>
	</c:if>
	<jsp:include page="frame/Footer.jsp"></jsp:include>