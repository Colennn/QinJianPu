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
	<c:if test="${cg!=null }">
		<div class="container">
			<c:if test="${errorUpdateMsg!=null }">
				<%-- 提示更新分类失败 --%>
				<div class="container">
					<div class="alert alert-error">${errorUpdateMsg }</div>
				</div>
				<c:remove var="errorUpdateMsg" />
			</c:if>
			<div class="row col-md-6">
				<div class="col-md-12">
					<ol class="breadcrumb">
						<li><a
							href="<%=basePath%>category?action=manage&userId=${user.id}">分类管理</a></li>
						<li class="active">编辑分类</li>
					</ol>
				</div>
				<div class="col-md-12">
					<form class="form-horizontal" name="save_edit_category_form"
						action="<%=basePath %>category?action=save&userId=${user.id}&cgId=${cg.id}"
						method="post"
						onsubmit="return isValidate(save_edit_category_form)">
						<div class="form-group">
							<label for="category_name">分类名：</label> <input
								class="form-control" id="category_name" name="category_name"
								value="${cg.categoryName }" type="text">
						</div>


						<div class="form-group">
							<button id="add_category_submit" type="submit"
								class="btn btn-primary">更新</button>
						</div>
					</form>
				</div>
			</div>
		</div>

	</c:if>
	<jsp:include page="frame/Footer.jsp"></jsp:include>

	<script type="text/javascript">
		function isValidate(form) {
			var category_name = form.category_name.value;

			if (category_name == "") {
				alert("请填写分类名！");

				return false;
			}
			return true;
		}
	</script>