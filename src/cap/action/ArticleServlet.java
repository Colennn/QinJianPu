package cap.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cap.bean.Article;
import cap.bean.Category;
import cap.bean.SysCategory;
import cap.service.ArticleService;
import cap.service.CategoryService;
import cap.service.SysCategoryService;
import cap.service.impl.ArticleServiceImpl;
import cap.service.impl.CategoryServcieImpl;
import cap.service.impl.SysCategoryServiceImpl;
import cap.util.PageControl;


@WebServlet("/article")
public class ArticleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private CategoryService cgService;
	private SysCategoryService scService;
	private ArticleService artService;
       
   
    public ArticleServlet() {
    	cgService=new CategoryServcieImpl();
    	scService=new SysCategoryServiceImpl();
    	artService=new ArticleServiceImpl();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String action=request.getParameter("action");
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		if(action.equals("add")){
			int userId = Integer.parseInt(request.getParameter("userId"));	
			List<Category> cgList = cgService.getByUserId(userId);
			List<SysCategory> scgList = scService.getAllSysCategory();			
			request.setAttribute("cgList", cgList);
			request.setAttribute("scgList", scgList);
			request.getRequestDispatcher("AddArtical.jsp").forward(request, response);
			
		}else if(action.equals("save")){
			int userId = Integer.parseInt(request.getParameter("userId"));
			String title = request.getParameter("title");
			int scgId = Integer.parseInt(request.getParameter("sys_category"));
			int cgId = Integer.parseInt(request.getParameter("category"));
			String summary = request.getParameter("summary");
			String content = request.getParameter("content");
			int res = artService.insertArtical(title, userId, scgId, cgId, content, summary);
			
			if (res > 0) {	
				request.getSession().setAttribute("succMsg", "保存成功");			
			} else {
				request.getSession().setAttribute("errorMsg", "保存失败");				
			}
			
			response.sendRedirect("article?action=manage&userId="+userId);
		}else if(action.equals("update")){
			
			int artId = Integer.parseInt(request.getParameter("artId"));			
			Article art = artService.getById(artId);
			List<SysCategory> scgList = scService.getAllSysCategory();			
			request.setAttribute("scgList", scgList);
			request.setAttribute("art", art);
			request.getRequestDispatcher("UpdateArtical.jsp").forward(request, response);
		}else if(action.equals("manage")){
			 
			int userId = Integer.parseInt(request.getParameter("userId"));
			//������ڷ�ҳ
			String curPageStr = request.getParameter("curPage");
			PageControl pc=artService.getByPageUserId(curPageStr, userId);
			request.setAttribute("curPage", pc.getCurPage());
			request.setAttribute("totalPages", pc.getTotalPages());
				
			request.setAttribute("artList", pc.getList());
			request.getRequestDispatcher("ArticleManage.jsp").forward(request, response);
		}else if(action.equals("delete")){
			
			int artId = Integer.parseInt(request.getParameter("artId"));
			int userId = Integer.parseInt(request.getParameter("userId"));
			int res = artService.deleteArtical(artId);			
			if (res > 0) {	//ɾ���ɹ�
				request.getSession().setAttribute("deleSuccMsg", "删除成功");
			} else {
				request.getSession().setAttribute("deleErrorMsg", "删除失败");
			}			
			response.sendRedirect("article?action=manage&userId="+userId);
		}else if(action.equals("saveupdate")){
			
			int artId = Integer.parseInt(request.getParameter("artId"));
			String title = (String)request.getParameter("title");
			int userId = Integer.parseInt(request.getParameter("userId"));
			int scgId = Integer.parseInt(request.getParameter("sys_category"));
			int cgId = Integer.parseInt(request.getParameter("category"));
			String content = (String)request.getParameter("content");
			String summary = (String)request.getParameter("summary");
			int res = artService.UpdateArtical(artId, title, userId, scgId, cgId, content, summary);
			
			if (res > 0) {	
				request.getSession().setAttribute("succMsg", "修改成功");
			} else {
				request.getSession().setAttribute("errorMsg", "修改失败");
			}
			
			response.sendRedirect("article?action=update&artId="+artId);
		}
	}

}
