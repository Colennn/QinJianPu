<%@ page language="java" import="java.util.*" import="cap.bean.*"
	pageEncoding="UTF-8"%>
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
		<c:if test="${succMsg!=null }">
			<div class="alert alert-success">${succMsg }</div>
			<c:remove var="succMsg" />
		</c:if>

		<c:if test="${errorMsg!=null}">
			<div class="alert alert-error">${errorMsg }</div>
			<c:remove var="errorMsg" />
		</c:if>
		<div class="row col-md-6">
			<form class="form-horizontal"
				action="<%=basePath %>user?action=apply&userId=${user.id}"
				method="post" role="form" class="form-horizontal"
				name="blog_info_form" id="blog_info_form"
				onsubmit="return isValidate(blog_info_form)">

				<div class="form-group">
					<label for="blog_name"> 主页名称 </label> <input class="form-control"
						name="blog_name" type="text" value="" id="blog_name">
				</div>

				<div class="form-group">
					<label for="description"> 主页描述 </label> <input class="form-control"
						name="description" type="text" value="" id="blog_des">
				</div>

				<div class="form-group">
					<label for="annoucement"> 主页公告 </label>
					<textarea class="form-control" id="annoucement" name="annoucement"
						rows="5"></textarea>
				</div>

				<div class="form-group">
					<button class="btn btn-primary" type="submit" class="">申请</button>
				</div>

			</form>

		</div>
	</div>



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