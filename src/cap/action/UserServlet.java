package cap.action;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import cap.bean.Article;
import cap.bean.BlogInfo;
import cap.bean.Category;
import cap.bean.Profile;
import cap.bean.SysCategory;
import cap.bean.User;
import cap.dao.ArticleDao;
import cap.dao.impl.ArticleDaoImpl;
import cap.service.ArticleService;
import cap.service.BlogInfoService;
import cap.service.CategoryService;
import cap.service.ProfileService;
import cap.service.SysCategoryService;
import cap.service.UserService;
import cap.service.impl.ArticleServiceImpl;
import cap.service.impl.BlogInfoServiceImpl;
import cap.service.impl.CategoryServcieImpl;
import cap.service.impl.ProfileServiceImpl;
import cap.service.impl.SysCategoryServiceImpl;
import cap.service.impl.UserServiceImpl;
import cap.util.PageControl;


@WebServlet("/user")
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private UserService userService;
	private SysCategoryService scService;
	private ArticleService artService;
	private BlogInfoService biService;
	private CategoryService categoryService;
	private ProfileService profileService;
       
    
    public UserServlet() {
    	userService=new UserServiceImpl();
    	scService=new SysCategoryServiceImpl();
    	artService=new ArticleServiceImpl();
    	biService=new BlogInfoServiceImpl();
    	categoryService=new CategoryServcieImpl();
    	profileService=new ProfileServiceImpl();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		String action=request.getParameter("action");
		if(action.equals("login")){			
			String userName = request.getParameter("username");
			String password = request.getParameter("password");
			User u = userService.login(userName, password);
			
			if (null != u) {	 
				
				if (u.getIsDelete() == 0) { 	
					request.getSession().setAttribute("user", u);
					response.sendRedirect("user?action=index");
				} else {
					request.getSession().setAttribute("userIsDeleMsg", "该用户已被禁止登录");
					response.sendRedirect("Login1.jsp");
				}
				
			} else {
				request.getSession().setAttribute("msg", "密码或用户名错误");
				response.sendRedirect("Login.jsp");
			}
		}else if(action.equals("index")){
					
			List<SysCategory> scList = scService.getAllSysCategory();	
			List<User> uList = artService.getActiveUser(2);
			List<Article> tenList=artService.topTenArticle();
			
			String curPageStr = request.getParameter("curPage");		
			PageControl pc = artService.getData(curPageStr);
			request.setAttribute("curPage", pc.getCurPage());
			request.setAttribute("totalPages", pc.getTotalPages());
			request.setAttribute("uList", uList);
			request.setAttribute("scList", scList);
			request.setAttribute("tenList", tenList);
			request.setAttribute("artList", pc.getList());
			
			
			request.getRequestDispatcher("/Index.jsp").forward(request, response);
		}else if(action.equals("myblog")){
			int userId = Integer.parseInt(request.getParameter("userId"));
			BlogInfo bi = biService.getByuserId(userId);
			List<Category> cgList = categoryService.getByUserId(userId);    
			User u = userService.getUserById(userId);			
			if (null == bi) {
				response.sendRedirect("templates/404.jsp");
			} else {
				String blogName = bi.getBlogName();
				String blogAnnoucement = bi.getAnnoucement();
				
				String curPageStr = request.getParameter("curPage");
				PageControl pc=artService.getByPageUserId(curPageStr, userId);
				request.setAttribute("userId", userId);
				request.setAttribute("blogName", blogName);
				request.setAttribute("blogAnnoucement", blogAnnoucement);
				request.setAttribute("artList", pc.getList());
				request.setAttribute("cgList", cgList);
				request.setAttribute("blogInfo", bi);
				request.setAttribute("author", u.getUserName());
				request.setAttribute("curPage", pc.getCurPage());
				request.setAttribute("totalPages", pc.getTotalPages());
				request.getRequestDispatcher("MyBlogIndex.jsp").forward(request, response);
			}
		}else if(action.equals("register")){
			String username = request.getParameter("username");
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			int userId = userService.getIdByuserName(username);    
			User u = userService.getByEmail(email);				   
			
			if ((userId > 0) || (null != u)) {
				request.getSession().setAttribute("existMsg", "您输入的E-mail已存在。");
				
			} else {
				int res = userService.register(email, username, password);
				
				if (res > 0) {				
					request.getSession().setAttribute("succMsg", "注册成功");
				} else {
					request.setAttribute("errorMsg", "注册失败");
				}
			}
			
			response.sendRedirect("Register.jsp");
		}else if(action.equals("apply")){
			int userId = Integer.parseInt(request.getParameter("userId"));
			String blogName = request.getParameter("blog_name");
			String description = request.getParameter("description");
			String annoucement = request.getParameter("annoucement");
			BlogInfo bi = biService.getByuserId(userId);
			int res = -1;
			
			if (null != bi) {
				res = biService.updateBlogInfo(userId, blogName, description, annoucement);
				bi = biService.getByuserId(userId);
			} else {
				res = biService.insertBlogInfo(userId, blogName, description, annoucement);
			}
				
			if (res > 0) {			
				userService.setIsAppliedById(userId);				
				categoryService.insertCategory(userId, "�޷���");				
				User u = userService.getUserById(userId);		
				String succMsg = "申请成功";				
				request.getSession().setAttribute("user", u);
				request.getSession().setAttribute("succMsg", succMsg);
			} else {
				String errorMsg = "申请失败";
				request.getSession().setAttribute("errorMsg", errorMsg);
			}
			
			response.sendRedirect("ApplyBlog.jsp");
		}else if(action.equals("profile")){
			
			int id = Integer.parseInt(request.getParameter("id"));			
			User u = userService.getUserById(id);			
			Profile pf = profileService.getByuserId(id);			
			if (null != pf) {
				request.setAttribute("profile", pf);
			}			
			request.getSession().setAttribute("user", u);
			request.getRequestDispatcher("Profile.jsp").forward(request, response);
		}else if(action.equals("logout")){
			request.setCharacterEncoding("utf-8");		
			HttpSession session = request.getSession(false);    		
			if (null == session) {
				response.sendRedirect("user?action=index");
				return;
			}			
			session.removeAttribute("user");
			response.sendRedirect("user?action=index");
		}else if(action.equals("myblogindex")){
			int userId = Integer.parseInt(request.getParameter("userId"));
			BlogInfo bi = biService.getByuserId(userId);
			List<Category> cgList = categoryService.getByUserId(userId);    		
			ArticleDao artDao = new ArticleDaoImpl();
			User u = userService.getUserById(userId);
			
			if (null == bi) {
				
				response.sendRedirect("templates/404.jsp");
			} else {
				String blogName = bi.getBlogName();
				String blogAnnoucement = bi.getAnnoucement();				
				String curPageStr = request.getParameter("curPage");
				PageControl pc=artService.getByPageUserId(curPageStr, userId);				
				request.setAttribute("userId", userId);
				request.setAttribute("blogName", blogName);
				request.setAttribute("blogAnnoucement", blogAnnoucement);
				request.setAttribute("artList", pc.getList());
				request.setAttribute("cgList", cgList);
				request.setAttribute("blogInfo", bi);
				request.setAttribute("author", u.getUserName());
				request.setAttribute("curPage", pc.getCurPage());
				request.setAttribute("totalPages", pc.getTotalPages());
				request.getRequestDispatcher("MyBlogIndex.jsp").forward(request, response);
			}
		}else if(action.equals("search")){
			String q = request.getParameter("q");			
			List<Article> artList = artService.search(q);
			request.setAttribute("q", q);
			request.setAttribute("artList", artList);
			request.getRequestDispatcher("SearchResult.jsp").forward(request, response);
		}else if(action.equals("updatepass")){
			String oldPwd = request.getParameter("old_pwd");
			String newPwd = request.getParameter("new_pwd");
			int userId = Integer.parseInt(request.getParameter("userId"));
			User u = userService.getByIdPwd(userId, oldPwd);			
			if (null != u) {	
				int res = userService.updatePwdById(userId, newPwd);
				
				if (res > 0) {
					request.getSession().setAttribute("succUpdateMsg", "密码修改成功");
				} else {
					request.getSession().setAttribute("errorUpdateMsg", "密码修改失败");
				}
				
			} else {			
				request.getSession().setAttribute("validPwdMsg", "无效密码");
			}
			
			response.sendRedirect("user?action=profile&id="+userId);
		}else if(action.equals("updateprofile")){
			
			int userId = Integer.parseInt(request.getParameter("id"));
			String firstName = request.getParameter("first_name");		
			String lastName = request.getParameter("last_name");
			String genderVal = request.getParameter("gender");	
			int gender = genderVal.equals("male") ? 1 : 0;
			String telephone = request.getParameter("telephone");
			Profile pf = profileService.getByuserId(userId);
			int res = -1;
			int resOfpf = -1;
			
			if (null != pf) {
				res = profileService.updateProfile(userId, firstName, lastName, gender, telephone);
				pf = profileService.getByuserId(userId);
				
			} else {
				res = profileService.insertProfile(userId, firstName, lastName, gender, telephone);
			}
				
			if (res > 0) {
				resOfpf = userService.setIsProfile(userId);
				
				String succMsg = "更新个人资料成功";
				request.getSession().setAttribute("succMsg", succMsg);
			} else {
				String errorMsg = "更新个人资料失败";
				request.getSession().setAttribute("errorMsg", errorMsg);
			}
			response.sendRedirect("user?action=profile&id="+userId);
		}else if(action.equals("bloginfo")){	
			
			int userId = Integer.parseInt(request.getParameter("userId"));
			BlogInfo bi = biService.getByuserId(userId);		
			request.setAttribute("bi", bi);
			request.getRequestDispatcher("BlogInfo.jsp").forward(request, response);
			
			
		}else if(action.equals("updatebloginfo")){
			response.setContentType("text/html; charset=UTF-8");
			request.setCharacterEncoding("UTF-8");
			int userId = Integer.parseInt(request.getParameter("userId"));
			String blogName = request.getParameter("blog_name");
			String description = request.getParameter("description");
			String annoucement = request.getParameter("annoucement");
			int res = biService.updateBlogInfo(userId, blogName, description, annoucement);
			
			if (res > 0) {   
				request.getSession().setAttribute("succUpdateMsg", "更新首页成功");
			} else {
				request.getSession().setAttribute("errorUpdateMsg", "更新首页失败");
			}
			
			response.sendRedirect("user?action=bloginfo&userId="+userId);
		}
	}

}
