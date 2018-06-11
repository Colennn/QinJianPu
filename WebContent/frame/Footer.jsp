<%@ page language="java" import="java.util.*" import="cap.bean.*"
	import="cap.dao.impl.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>



<div class="container">
	<hr>

	<footer>
		<div class="row" style="text-align: center;">
			<div class="col-lg-12">
				<p>
					Copyright &copy; 2018 &middot; UI based on Bootstrap &middot; <a
						href="<%=basePath%>AdminLogin.jsp" target="_blank">admin</a>
					&middot; 757164835@qq.com &middot;访问人数：<%=(Integer) session.getAttribute("num")%>

				</p>
			</div>
		</div>
	</footer>

</div>

<script src="<%=basePath%>editor-bin/demo/main.js" charset="utf-8"></script>
<script src="<%=basePath %>style/js/style.js" charset="utf-8"></script>
</body>
</html>
