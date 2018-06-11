<%@ page language="java" import="java.util.*" import="cap.bean.*"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%

//User u = (User)request.getSession().getAttribute("user");
//String errorAddMsg = (String)request.getSession().getAttribute("errorAddMsg");
 %>

<jsp:include page="frame/Header.jsp"></jsp:include>

<body>
	<jsp:include page="frame/navbar.jsp"></jsp:include>
	
    <c:if test="${errorAddMsg!=null }">   
  	<div class="container">
  	<div class="alert alert-error">${errorAddMsg }</div>
  	</div> 	
  	<c:remove var="errorAddMsg"/>
    </c:if>
    <div class="container "> 
		<ol class="breadcrumb">
             <li><a href="<%=basePath%>category?action=manage&userId=${user.id}">分类管理</a></li>
             <li class="active">新建分类</li>
        </ol>  
         
    	<form class="form-horizontal" name="add_category_form" action="<%=basePath %>category?action=add&userId=${user.id}" method="post" onsubmit="return isValidate(add_category_form)">
    	<div class="col-md-6">
    	<div class="from-group">
    		<label for="category_name">分类名：</label>
    		<input class="form-control" id="category_name" name="category_name" type="text">
    	</div>
    	
    	<div class="from-group">
    		<button id="add_category_submit" type="submit" class="btn btn-primary">保存</button>
    	</div>
    	</div>
    	</form>
    </div>
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