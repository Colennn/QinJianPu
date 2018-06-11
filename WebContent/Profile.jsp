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
	
	<c:if test="${succMsg!=null }">

		<div class="container">
			<div class="alert alert-success">${succMsg }</div>
		</div>
		<c:remove var="succMsg" />
	</c:if>
	<c:if test="${errorMsg!=null }">

		<div class="container">
			<div class="alert alert-error">${errorMsgerrorMsg}</div>
		</div>
		<c:remove var="errorMsg" />
	</c:if>
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
	<c:if test="${validPwdMsg }">
		<div class="container">
			<div class="alert alert-error">${validPwdMsg }</div>
		</div>
		<c:remove var="validPwdMsg" />
	</c:if>
	<div class="container">
		<div class="well row col-md-6" style="padding:30px 50px;">
			<ul class="nav nav-tabs">
				<li class="active"><a href="#home" data-toggle="tab">个人资料</a></li>
				<li><a href="#profile" data-toggle="tab">修改密码</a></li>
			</ul>
			<div id="myTabContent" class="tab-content">
				<div class="tab-pane active in" id="home">
					<form class="form-horizontal" name="profile_form" role="form"
						id="tab"
						action="<%=basePath %>user?action=updateprofile&id=${user.id}"
						method="post" onsubmit="return isValidate(profile_form)">
						<div class="form-group">
							<label for="username">用户名</label> <input type="text"
								value="${user.userName }" class="form-control" name="username"
								disabled>
						</div>
						<div class="form-group">
							<label for="email">邮箱</label> <input type="text"
								value="${user.email }" class="form-control" name="email"
								disabled>
						</div>
						<div class="form-group">
							<label for="first_name">姓</label>
							<c:choose>
								<c:when test="${profile!=null }">
									<input class="form-control" type="text"
										value="${profile.firstName }" name="first_name">
								</c:when>
								<c:otherwise>
									<input class="form-control" type="text" value=""
										name="first_name">
								</c:otherwise>
							</c:choose>
						</div>
						<div class="form-group">
							<label for="last_name">名</label>
							<c:choose>
								<c:when test="${profile!=null }">
									<input class="form-control" type="text"
										value="${profile.lastName }" name="last_name">
								</c:when>
								<c:otherwise>
									<input class="form-control" type="text" value=""
										name="last_name">
								</c:otherwise>
							</c:choose>
						</div>
						<div class="form-group">
							<label for="telephone">手机号码</label>
							<c:choose>
								<c:when test="${profile!=null }">
									<input class="form-control" type="text"
										value="${profile.telephone }" name="telephone">
								</c:when>
								<c:otherwise>
									<input class="form-control" type="text" value=""
										name="telephone">
								</c:otherwise>
							</c:choose>
						</div>
						<div class="form-group">
							<label for="gender">性别</label> <select class="form-control"
								name="gender" id="gender">
								<c:choose>
									<c:when test="${profile!=null }">
										<c:choose>
											<c:when test="${profile.gender==0 }">

												<option value="male">男</option>
												<option value="female" selected>女</option>
											</c:when>
											<c:otherwise>

												<option value="male" selected>男</option>
												<option value="female">女</option>
											</c:otherwise>

										</c:choose>
									</c:when>
									<c:otherwise>
										<option value="male">男</option>
										<option value="female">女</option>

									</c:otherwise>
								</c:choose>
							</select>
						</div>
						<div class="form-group">
							<button class="btn btn-primary" type="submit">保存</button>
						</div>
					</form>
				</div>
				<div class="tab-pane fade" id="profile">
					<form class="form-horizontal" id="tab2" name="updatePwd"
						onsubmit="return isPasswordValidate(updatePwd)" method="post"
						action="user?action=updatepass&userId=${user.id }">
						<div class="form-group">
							<label for="old_pwd">旧密码</label> <input class="form-control"
								type="password" name="old_pwd">
						</div>
						<div class="form-group">
							<label for="new_pwd">新密码</label> <input class="form-control"
								type="password" name="new_pwd">
						</div>
						<div class="form-group">
							<label for="submit_new_pwd">新密码（确认）</label> <input
								class="form-control" type="password" name="submit_new_pwd">
						</div>
						<div class="form-group">
							<button class="btn btn-primary">保存</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="frame/Footer.jsp"></jsp:include>

	<script type="text/javascript">
		function isValidate(profile_form) {
			var first_name = profile_form.first_name.value;
			var last_name = profile_form.last_name.value;
			var telephone = profile_form.telephone.value;

			if (first_name == "" || last_name == "" || telephone == "") {
				alert("姓，名，手机号码为必填项");

				return false;
			}

			return true;
		}

		function isPasswordValidate(form) {
			var old_pwd = form.old_pwd.value;
			var new_pwd = form.new_pwd.value;
			var submit_new_pwd = form.submit_new_pwd.value;

			if (old_pwd == "" || new_pwd == "" || submit_new_pwd == "") {
				alert("新密码、旧密码、旧密码（确认）为必填项");
				return false;
			} else if (old_pwd == new_pwd) {
				alert("新密码和旧密码不能相同");
				return false;
			} else if (submit_new_pwd != new_pwd) {
				alert("新密码和新密码（确认）必须相同");
				return false;
			} else {
				return true;
			}

		}
	</script>