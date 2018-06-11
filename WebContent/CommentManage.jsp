<%@ page language="java" import="java.util.*" import="cap.bean.*"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
session.setAttribute("basePath", basePath);
%>
<jsp:include page="frame/Header.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar.jsp"></jsp:include>
  	
	<%-- 删除评论的提示消息 --%>
	<c:if test="${succDeleMsg!=null }">	
  	<div class="container">
  	<div class="alert alert-success">${succDeleMsg}</div>
  	</div>
  	<c:remove var="succDeleMsg"/>
  	</c:if>
  	<c:if test="${errorDeleMsg!=null }">  	
  	<div class="container">
  	<div class="alert alert-error">${errorDeleMsg }</div>
  	</div>
  	<c:remove var="errorDeleMsg"/>
  	</c:if>
  	<c:if test="${user!=null }">
	
	<div class="container">	
		<div class="well">
			<table class="table">
				<thead>
					<tr>
						<th>评论内容</th>
						<th>评论人</th>
						<th>评论的文章标题</th>

						<th>评论时间</th>
						<th style="width: 50px;">操作</th>
					</tr>
				</thead>
				<tbody>
				<c:if test="${cmtList!=null }">
				<c:forEach items="${cmtList }" var="cmt">					
					<tr>
						<td>${cmt.ccontent}</td>
						<td>${cmt.username}</td>
						<td>${cmt.title}</td>
						<td>${cmt.publish_time}</td>
						<td><a href="${basePath }comment.html?action=delete&cmtId=${cmt.cid}&userId=${user.id}" >
						<i class="glyphicon glyphicon-remove"></i></a></td>
					</tr>					
		      		</c:forEach>
		      		</c:if>
				</tbody>
			</table>
		</div>
		
		
		<div>
		 <!-- pager -->
          <ul class="pager">
            <c:if test="${curPage>1 }">         	
            <li class="previous"><a href="<%=basePath%>comment.html?action=manage&userId=${user.id }&curPage=${curPage-1}">&larr; 上一页</a></li>          
            </c:if>
            <c:if test="${curPage<totalPages }">           
            <li class="next"><a href="<%=basePath%>comment.html?action=manage&userId=${user.id }&curPage=${curPage+1}">下一页  &rarr;</a></li>            
            </c:if>
          </ul>
		</div>		
	</div>			
	</c:if>
<jsp:include page="frame/Footer.jsp"></jsp:include>

<script type="text/javascript">
function dele(deleUrl) {
	
	if (confirm("你确定要删除该评论吗？")) {
		location.href = deleUrl;
	}
}
</script>