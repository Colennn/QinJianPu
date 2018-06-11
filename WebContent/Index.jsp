<%@ page language="java" import="java.util.*" import="cap.bean.*"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<jsp:include page="frame/Header.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar.jsp"></jsp:include>

	<div class="container">

		<div class="row">
			<div id="blog" class="col-lg-8">
				<h1>
					<a href="user?action=index">轻简谱&nbsp;<small>简谱社区</small></a>
				</h1>
				<br>
				<c:choose>
					<c:when test="${artList!=null && fn:length(artList)>0}">
						<c:forEach items="${artList}" var="art">
							<h3>
								<a href="<%=basePath%>comment.html?action=post&artId=${art.id }&userId=${art.userId }"
									target="_blank">${art.title }</a>
							</h3>
							<p style="font-size: 16px; color: #666666;">${art.summary }</p>
						
							<p style="font-size: 14px; color: #999999;">
								<i class="glyphicon glyphicon-user"></i> 
								<a href="<%=basePath%>user?action=myblog&userId=${art.userId }"
									target="_blank">${art.username }</a> | 
								<i class="glyphicon glyphicon-calendar"></i> ${art.publishTime } |
								<i class="glyphicon glyphicon-eye-open"></i>  ${art.count } <!-- | 
								<i class="glyphicon glyphicon-comment"></i> -->
							</p>
						
							<hr>
						</c:forEach>
					</c:when>

					<c:otherwise>
						<p>你还没有分享过简谱噢，赶紧写吧~</p>
					</c:otherwise>
				</c:choose>
				<!-- pager -->
				<ul class="pager">
					<c:if test="${curPage > 1}">
						<li class="previous"><a
							href="<%=basePath%>user?action=index&curPage=${curPage-1}">&larr;
								上一页</a></li>
					</c:if>
					<p style="display:inline;">第 ${curPage} 页 / 共 ${totalPages} 页</p>
					<c:if test="${curPage < totalPages}">
						<li class="next"><a
							href="<%=basePath%>user?action=index&curPage=${curPage+1}">下一页
								&rarr;</a></li>
					</c:if>
				</ul>

			</div>

			<div class="col-lg-4">
				<c:if test="${user!=null&&user.isApplied==0}">

					<div class="well" align="center">
						<a class="btn btn-primary" href="<%=basePath%>ApplyBlog.jsp"
							target="_blank">申请个人主页</a>
					</div>

				</c:if>
				<c:if test="user!=null&&user.isApplied==1">

					<div class="well" align="center">
						<a class="btn btn-primary"
							href="<%=basePath%>user?action=myblog&userId=${user.id}">进入我的主页</a>
					</div>

				</c:if>
				
				<jsp:include page="frame/searchbar.jsp"></jsp:include>

				<form action="servlet/GetSysCategoryServlet" method="GET">
					<div class="well">
						<h4>曲谱分类</h4>
						<div class="row">
							<div class="col-lg-6">
								<ul class="list-unstyled">
									<c:choose>
										<c:when test="${scList!=null && fn:length(scList)>0}">
											<c:forEach items="${scList }" var="sc">
												<li><a href="#">${sc.categoryName }</a></li>
											</c:forEach>
										</c:when>
										<c:otherwise>
											<li>无分类</li>
										</c:otherwise>
									</c:choose>
								</ul>
							</div>
						</div>
					</div>
					<!-- /well -->
				</form>

				<div class="well">
					<h4>本周活跃用户</h4>
					<div class="row">
						<div class="col-lg-6">
							<ul class="list-unstyled">
								<c:choose>
									<c:when test="${uList!=null && fn:length(uList)>0}">
										<c:forEach items="${uList}" var="u" varStatus="status">
											<li><a
												href="<%=basePath%>user?action=myblog&userId=${u.id}"
												target="_blank"> ${status.index +1}. ${u.userName }</a></li>
										</c:forEach>
									</c:when>
									<c:otherwise>
										<li>暂无排名，sorry......</li>
									</c:otherwise>
								</c:choose>
							</ul>
						</div>
					</div>
				</div>
				<!-- /well -->

				<div class="well">
					<h4>曲谱排行TOP10</h4>
					<div class="row">
						<div class="col-lg-6">
							<ul class="list-unstyled">
								<c:choose>
									<c:when test="${tenList!=null }">
										<c:forEach items="${tenList }" var="art" varStatus="status">
											<li><a
												href="<%=basePath%>comment.html?action=post&artId=${art.id }&userId=${art.userId}"
												target="_blank">${status.index +1}. ${art.title }</a></li>
										</c:forEach>
									</c:when>
									<c:otherwise>
										<li>暂无排名，sorry......</li>
									</c:otherwise>
								</c:choose>
							</ul>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>


	<jsp:include page="frame/Footer.jsp"></jsp:include>