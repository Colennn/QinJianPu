<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<jsp:include page="<%=basePath %>templates/Header.jsp"></jsp:include>

<body>
	<div class="container">
	  <div class="row">
	    <div class="span12">
	      <div class="hero-unit center">
	          <h1>Page Not Found <small><font face="Tahoma" color="red">Error 404</font></small></h1>
	          <br />
	          <p>The page you requested could not be found, either contact your webmaster or try again. Use your browsers <b>Back</b> button to navigate to the page you have prevously come from</p>
	          <p><b>Or you could just press this neat little button:</b></p>
	          <a href="<%=basePath %>index.html" class="btn btn-large btn-info"><i class="icon-home icon-white"></i> Take Me Home</a>
	      </div>
	      <br/>

	    </div>
	  </div>
	</div>

<jsp:include page="<%=basePath %>templates/Footer.jsp"></jsp:include>