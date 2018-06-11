<%@ page language="java" import="java.util.*" import="bean.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>JianPuPu - Admin</title>
	
	<script src="<%=basePath %>style/js/jquery/2.0.0/jquery.min.js"></script>
	<script src="<%=basePath %>style/css/bootstrap/js/bootstrap.js"></script>
   	<link href="<%=basePath %>style/css/bootstrap/css/bootstrap.css" rel="stylesheet">
   	<link href="<%=basePath %>style/css/bootstrap/css/bootstrap-theme.css" rel="stylesheet">
   	
    <link href="<%=basePath %>style/css/main.css" rel="stylesheet">

  </head>

  <body>
  <div id="wrapper">
  
