<%@ page language="java" import="java.util.*" import="java.text.*"
	import="cap.bean.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>


<%
	int userId = (Integer) request.getAttribute("userId");
	User u = (User) request.getSession().getAttribute("user");
	BlogInfo bi = (BlogInfo) request.getAttribute("blogInfo");
	List<Category> cgList = (List<Category>) request.getAttribute("cgList");
	List<Article> artList = (List<Article>) request.getAttribute("artList");
	String blogName = (String) request.getAttribute("blogName");
	String blogAnnoucement = (String) request.getAttribute("blogAnnoucement");
	String author = (String) request.getAttribute("author");
	
	int commentCout = (Integer) request.getAttribute("artId");

	int curPage = (Integer) request.getAttribute("curPage");
	int totalPages = (Integer) request.getAttribute("totalPages");
%>
<jsp:include page="frame/Header.jsp"></jsp:include>

<body>

	<jsp:include page="frame/navbar.jsp"></jsp:include>

	<div class="container">

		<div class="row">
			<div class="col-lg-8">

				<!-- blog entry -->
				<h1>
					<a href="<%=basePath%>user?action=myblog&userId=<%=userId%>"> <%
 						if (null != blogName) {
 							%> <%=blogName%> <%
 						} else {
 							%> 读取标题失败！ <%
 						}
 						%>
					</a>
				</h1>
				<p class="lead">
					<%
						if (null != bi) {
					%>
					<%=bi.getDescription()%>
					<%
						} else {
					%>
					读取副标题失败！
					<%
						}
					%>
				</p>
				<br>


				<%
					if ((null != artList) && (artList.size() > 0)) {
						for (Article art : artList) {
							if (0 == art.getIsDelete()) { //删除的文章就不显示了
				%>
				<h3>
					<a href="<%=basePath%>comment.html?action=post&artId=<%=art.getId()%>&userId=<%=userId%>">
					<%=art.getTitle()%></a>
				</h3>
				<p style="font-size: 16px; color: #666666;"><%=art.getSummary()%></p>
				<p style="font-size: 14px; color: #999999;">
					<i class="glyphicon glyphicon-user"></i>
					<a href="#"><%=author%></a> | 
					<i class="glyphicon glyphicon-calendar"></i>
					<%=art.getPublishTime()%> | 
					<i class="glyphicon glyphicon-eye-open"></i> 
					<%=art.getCount()%> <!-- | 
					<i class="glyphicon glyphicon-comment"></i> -->
				</p>
				
		
				<hr>

				<%
					}
						}
					} else {
				%>
				<p>还没有写过文章哦，赶紧写吧~</p>
				<%
					}
				%>
				<!-- pager -->
				<ul class="pager">
					<%
						if (curPage > 1) {
					%>
					<li class="previous"><a
						href="<%=basePath%>user?action=myblog&curPage=<%=(curPage - 1)%>&userId=<%=userId%>">&larr;
							上一页</a></li>
					<%
						}
					%>

					<%
						if (curPage < totalPages - 1) {
					%>
					<li class="next"><a
						href="<%=basePath%>user?action=myblog&curPage=<%=(curPage + 1)%>&userId=<%=userId%>">下一页
							&rarr;</a></li>
					<%
						}
					%>
				</ul>

			</div>

			<div class="col-lg-4">
				<form action="servlet/GetSysCategoryServlet" method="GET">
					<div class="well">
						<h4>文章分类</h4>
						<div class="row">
							<div class="col-lg-6">
								<ul class="list-unstyled">
									<%
										if ((null != cgList) && (cgList.size() > 0)) {
											for (Category cg : cgList) {
												if (cg.getIsDelete() == 0) {
									%>
									<li><a href="#"><%=cg.getCategoryName()%></a></li>
									<%
										}
											}
										} else {
									%>
									<li>无分类</li>
									<%
										}
									%>
								</ul>
							</div>
						</div>
					</div>
					<!-- /well -->
				</form>

				<div class="well">
					<h4>公告</h4>
					<p><%=bi.getAnnoucement()%></p>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="frame/Footer.jsp"></jsp:include>