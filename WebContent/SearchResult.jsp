<%@ page language="java" import="java.util.*" import="java.text.*"
	import="cap.bean.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	//User u = (User)request.getSession().getAttribute("user");
	//List<Category> cgList = (List<Category>)request.getAttribute("cgList");
	//List<Article> artList = (List<Article>)request.getAttribute("artList");

	String q = (String) request.getAttribute("q");
%>
<jsp:include page="frame/Header.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar.jsp"></jsp:include>

	<div class="container">

		<div class="row">
			<div class="col-lg-8">

				<p class="lead">
					搜索关键字：
					<c:choose>
						<c:when test="${q!=null }">
							<b><i> ${q }</i></b>
						</c:when>
						<c:otherwise>
							<c:out value="没有输入搜索内容" />
						</c:otherwise>
					</c:choose>
				</p>
				<hr>
				<p class="lead">搜索结果列表：</p>
				<c:choose>
					<c:when test="${artList!=null && fn:length(artList) >0 }">
						<c:forEach items="${artList}" var="art">
							<h4>
								<a
									href="<%=basePath%>comment.html?action=post&artId=${art.id }&userId=${art.userId }"
									target="_blank">${art.title }</a>
							</h4>
						</c:forEach>
					</c:when>
					<c:otherwise>
						<c:out value="对不起，没有搜索到"></c:out>
					</c:otherwise>
				</c:choose>

			</div>

			<div class="col-lg-4">
				<jsp:include page="frame/searchbar.jsp"></jsp:include>
			</div>
		</div>
	</div>

	<jsp:include page="frame/Footer.jsp"></jsp:include>