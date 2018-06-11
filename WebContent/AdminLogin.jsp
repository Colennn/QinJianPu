<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<%
	//String errorMsg = (String)request.getSession().getAttribute("msg");
	//String logoutMsg = (String)request.getSession().getAttribute("logoutMsg");
%>
<jsp:include page="frame/Header.jsp"></jsp:include>

<body>

	<jsp:include page="frame/navbar-LandR.jsp"></jsp:include>

	<c:if test="${msg!=null }">
		<%-- 登录验证失败提示 --%>
		<div class="container">
			<div class="alert alert-danger">${msg}</div>
		</div>
		<c:remove var="msg" />
	</c:if>
	<c:if test="${logoutMsg!=null }">
		<%-- 退出成功提示 --%>
		<div class="container">
			<div class="alert alert-success">${logoutMsg }</div>
		</div>
		<c:remove var="logoutMsg" />
	</c:if>
	<div class="container">
		<div class="row">
			<div class="col-md-6">
				<form name="login_form" class="form-horizontal"
					action='admin.html?action=login' method="POST"
					onsubmit="return isValidate(login_form)">
					<fieldset>
						<div id="legend">
							<legend class="caption">管理员登录</legend>
						</div>

						<div class="form-group">
							<!-- Username -->
							<label for="username">用户名</label> <input class="form-control"
								type="text" id="username" name="username" placeholder="User name">
						</div>
						<div class="form-group">
							<!-- Password-->
							<label for="password">密码</label> <input class="form-control"
								type="password" id="password" name="password"
								placeholder="Password">
						</div>
						<div class="form-group">
							<!-- Button -->
							<button class="btn btn-primary">登录</button>
						</div>
					</fieldset>
				</form>
			</div>
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