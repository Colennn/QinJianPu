<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<jsp:include page="frame/Header.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar-LandR.jsp"></jsp:include>

	<c:if test="${msg!=null }">
		<%-- 登录验证失败提示信息 --%>
		<div class="container">
			<div class="alert alert-danger">${msg }</div>
		</div>
		<c:remove var="msg" />
	</c:if>
	<c:if test="${userIsDeleMsg}">
		<%-- 用户被禁用提示信息 --%>
		<div class="container">
			<div class="alert alert-danger">${userIsDeleMsg}</div>
		</div>
		<c:remove var="userIsDeleMsg"/>
	</c:if>
	<div class="container" style="magrin: 0px auto;">
		<div class="row col-md-6">
			<form name="login_form" role="form" action="user?action=login"
				method="POST" onsubmit="return isValidate(login_form)">
				<fieldset>
					<div id="legend">
						<legend class="caption">登录</legend>
					</div>
					<div class="form-group">
						<label for="username">用户名</label> <input type="text"
							class="form-control " name="username" id="username"
							placeholder="User name">
					</div>
					<div class="form-group">
						<label for="password">密码</label> <input type="password"
							class="form-control" name="password" id="password"
							placeholder="Password">
					</div>

					<div class="form-group">
						<button type="submit" class="btn btn-primary">登录</button>
					</div>
				</fieldset>
			</form>
		</div>
	</div>

	<jsp:include page="frame/Footer.jsp"></jsp:include>

	<script type="text/javascript">
		function isValidate(login_form) {
			var username = login_form.username.value;
			var password = login_form.password.value;

			if (username == "" || password == "") {
				alert("请填写用户名和密码！");

				return false;
			}
			return true;
		}
	</script>