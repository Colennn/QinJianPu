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
	<c:choose>
		<c:when test="${bi!=null }">

			<div class="container">
				<div class="row col-md-6">
					<form class="form-horizontal"
						action="<%=basePath %>user?action=updatebloginfo&userId=${user.id}"
						method="post" class="form-horizontal" name="blog_info_form"
						id="blog_info_form" onsubmit="return isValidate(blog_info_form)">

						<div class="form-group">
							<label for="email">博客名称</label> <input class="form-control"
								name="blog_name" type="text" value="${bi.blogName }"
								id="blog_name">
						</div>

						<div class="form-group">
							<label for="address">博客描述</label> <input class="form-control"
								name="description" type="text" value="${bi.description }"
								id="blog_des">
						</div>

						<div class="form-group">
							<label for="zip">博客公告</label>
							<textarea class="form-control" id="annoucement"
								name="annoucement" rows="5">${bi.annoucement }</textarea>
						</div>

						<div class="form-group">
							<button type="submit" class="btn btn-primary">保存</button>
						</div>
					</form>
				</div>
			</div>
		</c:when>
		<c:otherwise>
			<c:out value="读取博客信息出错！"></c:out>
		</c:otherwise>
	</c:choose>
	<jsp:include page="frame/Footer.jsp"></jsp:include>

	<script type="text/javascript">
		function isValidate(blog_info_form) {
			var blog_name = blog_info_form.blog_name.value;
			var description = blog_info_form.description.value;
			var annoucement = blog_info_form.annoucement.value;

			if (blog_name == "" || description == "" || annoucement == "") {
				alert("博客名称，博客描述，博客公告为必填项");

				return false;
			}

			return true;
		}
	</script>