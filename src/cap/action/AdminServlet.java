package cap.action;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import cap.bean.Admin;
import cap.bean.Article;
import cap.bean.Comment;
import cap.bean.Counter;
import cap.bean.Profile;
import cap.bean.SysCategory;
import cap.bean.User;
import cap.service.AdminService;
import cap.service.ArticleService;
import cap.service.CommentService;
import cap.service.CounterService;
import cap.service.ProfileService;
import cap.service.SysCategoryService;
import cap.service.UserService;
import cap.service.impl.AdminServiceImpl;
import cap.service.impl.ArticleServiceImpl;
import cap.service.impl.CommentServiceImpl;
import cap.service.impl.CounterServiceImpl;
import cap.service.impl.ProfileServiceImpl;
import cap.service.impl.SysCategoryServiceImpl;
import cap.service.impl.UserServiceImpl;
import cap.util.PageControl;


@WebServlet("/admin.html")
public class AdminServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private AdminService adminService;
	private UserService userService;
	private ProfileService profileService;
	private ArticleService artService;
	private SysCategoryService scService;
	private CounterService cntService;
	private CommentService cmtService;
       
    
    public AdminServlet() {
    	adminService=new AdminServiceImpl();
    	userService=new UserServiceImpl();
    	profileService=new ProfileServiceImpl();
    	artService=new ArticleServiceImpl();
    	scService=new SysCategoryServiceImpl();
    	cntService=new CounterServiceImpl();
    	cmtService=new CommentServiceImpl();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html");
		request.setCharacterEncoding("UTF-8");
		String action=request.getParameter("action");
		if(action.equals("login")){
			String userName = request.getParameter("username");
			String passWord = request.getParameter("password");

			Admin admin = adminService.login(userName, passWord);
			
			if (admin == null) {
				request.getSession().setAttribute("msg", "用户名或密码错误");
				response.sendRedirect("AdminLogin.jsp");
			} else {
				request.getSession().setAttribute("admin", admin);
				response.sendRedirect("admin.html?action=index");
			}
			
		}else if(action.equals("logout")){
			HttpSession session = request.getSession(false);
			
			if (null != session) {
				session.removeAttribute("admin");
			}
			
			request.getSession().setAttribute("logoutMsg", "退出成功");
			response.sendRedirect("AdminLogin.jsp");
			
		}else if(action.equals("index")){			
			List<Article> artList = artService.getAllArtical(); 		
			List<Comment> cmtList = cmtService.getAll(); 	
			List<User> uList = userService.getAllUser();
			Counter cnt = cntService.getCounter();
			request.setAttribute("artList", artList);
			request.setAttribute("cmtList", cmtList);
			request.setAttribute("uList", uList);
			request.setAttribute("cnt", cnt);
			request.getRequestDispatcher("admin/Index.jsp").forward(request, response);
		}	
		else if(action.equals("useradmin")){			
			//��ҳ
			String curPageStr = request.getParameter("curPage");
			PageControl pc=userService.getUserOfPage(curPageStr);
			request.setAttribute("curPage", pc.getCurPage());
			request.setAttribute("totalPages", pc.getTotalPages());
			
			request.setAttribute("uList", pc.getList());
			request.getRequestDispatcher("admin/UserAdmin.jsp").forward(request, response);
		}else if(action.equals("userprofile")){
				
			int userId = Integer.parseInt(request.getParameter("uId"));
			Profile pf = profileService.getByuserId(userId);			
			request.setAttribute("pf", pf);
			request.getRequestDispatcher("/admin/UserProfile.jsp").forward(request, response);
			
		}else if(action.equals("deleteuser")){
			int uId = Integer.parseInt(request.getParameter("uId"));
			int res = userService.deleteUser(uId);
			
			if (res > 0) {	
				request.getSession().setAttribute("succDeleMsg", "已禁用该用户");
			} else {     
				request.getSession().setAttribute("errorDeleMsg", "禁用失败");
			}
			
			response.sendRedirect("admin.html?action=useradmin");
		}else if(action.equals("activeuser")){
			
			int uId = Integer.parseInt(request.getParameter("uId"));
			int res = userService.activeUser(uId);
			
			if (res > 0) {	
				request.getSession().setAttribute("succActMsg", "已启用该用户");
			} else {     
				request.getSession().setAttribute("errorActMsg", "启用失败");
			}			
			response.sendRedirect("admin.html?action=useradmin");
			
		}else if(action.equals("SysArticalAdmin")){

			String curPageStr = request.getParameter("curPage");
			PageControl pc = artService.getData(curPageStr);
			request.setAttribute("curPage", pc.getCurPage());
			request.setAttribute("totalPages", pc.getTotalPages());
			List<Article> artList=pc.getList();
			request.setAttribute("artList", artList);
			request.getRequestDispatcher("admin/SysArticleAdmin.jsp").forward(request, response);
			
		}else if(action.equals("DeleteSysArtical")){
			int artId = Integer.parseInt(request.getParameter("artId"));
			int res = artService.deleteArtical(artId);
			
			if (res > 0) {	
				request.getSession().setAttribute("deleSuccMsg", "删除成功");
			} else {
				request.getSession().setAttribute("deleErrorMsg", "删除失败");
			}
			
			response.sendRedirect("admin.html?action=SysArticalAdmin");
			
			
		}else if(action.equals("SysCategoryAdmin")){

			String curPageStr = request.getParameter("curPage");
			PageControl pc = scService.getSysCategoryByPage(curPageStr);
			request.setAttribute("scgList", pc.getList());
			request.setAttribute("curPage", pc.getCurPage());
			request.setAttribute("totalPages", pc.getTotalPages());
			request.getRequestDispatcher("admin/SysCategoryAdmin.jsp").forward(request, response);
			
			
		}else if(action.equals("EditSysCategory")){
			int scgId = Integer.parseInt(request.getParameter("scgId"));
			SysCategory scg = scService.getById(scgId);			
			request.setAttribute("scg", scg);
			request.getRequestDispatcher("admin/EditSysCategory.jsp").forward(request, response);
			
			
		}else if(action.equals("SaveEditSysCategory")){
			int scgId = Integer.parseInt(request.getParameter("scgId"));			
			String scgName = request.getParameter("scgName");
			SysCategory scg = scService.getByName(scgName);
			
			if ((null != scg) && (scgId != scg.getId())) {
				request.getSession().setAttribute("scgExist", "系统分类不存在");
				response.sendRedirect("EditSysCategory.html?scgId="+scgId);
				
			} else {
				int res = scService.updateSysCategory(scgId, scgName);
				
				if (res > 0) {
					request.getSession().setAttribute("succUpdateScg", "保存成功");
					response.sendRedirect("admin.html?action=SysCategoryAdmin");
				} else {
					request.getSession().setAttribute("errorUpdateScg", "保存失败");
					response.sendRedirect("admin.html?action=SysCategoryAdmin");
				}
			}
		}else if(action.equals("AddSysCategory")){
			String scgName = request.getParameter("scgName");
			SysCategory scg = scService.getByName(scgName);
			
			if (null != scg) {    
				request.getSession().setAttribute("scgExist", "个人分类不存在");
				response.sendRedirect("admin/AddSysCategory.jsp");
				
			} else {
				int res = scService.insertSysCategory(scgName);
				
				if (res > 0) {	 
					request.getSession().setAttribute("succAddScg", "分类添加成功");
				} else {		  
					request.getSession().setAttribute("errorAddScg", "分类添加失败");
				}
				
				response.sendRedirect("admin.html?action=SysCategoryAdmin");
			}
		}else if(action.equals("DeleteSysCategory")){
			int scgId = Integer.parseInt(request.getParameter("scgId"));
			//SysCategoryDao scgDao = new SysCategoryDao();
			int res = scService.deleteSysCategory(scgId);
			
			if (res > 0) {
				request.getSession().setAttribute("succDeleScg", "分类删除成功");
			} else {
				request.getSession().setAttribute("errorDeleScg", "分类删除失败");
			}
			
			response.sendRedirect("admin.html?action=SysCategoryAdmin");
		}
	}

	

	
}
