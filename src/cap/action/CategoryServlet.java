package cap.action;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import cap.bean.Category;
import cap.service.CategoryService;
import cap.service.impl.CategoryServcieImpl;
import cap.util.PageControl;


@WebServlet("/category")
public class CategoryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private CategoryService cgService;

    public CategoryServlet() {
    	cgService=new CategoryServcieImpl();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		request.setCharacterEncoding("UTF-8");
		String action=request.getParameter("action");
		if(action.equals("manage")){

			int userId = Integer.parseInt(request.getParameter("userId"));

			int total=cgService.getByUserId(userId).size();
			
			String curPageStr = request.getParameter("curPage");
			PageControl pc=cgService.getCategoryByUserId(curPageStr, userId);
			request.setAttribute("curPage", pc.getCurPage());
			request.setAttribute("totalPages", pc.getTotalPages());
			
			request.setAttribute("cgList", pc.getList());
			request.getRequestDispatcher("CategoryManage.jsp").forward(request, response);
		}
		else if(action.equals("add")){
			int userId = Integer.parseInt(request.getParameter("userId"));
			String cgName = request.getParameter("category_name");
			Category cg = cgService.getByName(cgName, userId);
			
			if (null == cg) {	
				int res = cgService.insertCategory(userId, cgName);
				
				if (res > 0) {
					request.getSession().setAttribute("succAddMsg", "添加个人分类成功");
					response.sendRedirect("category?action=manage&userId="+userId);
				} else {
					request.getSession().setAttribute("errorAddMsg", "添加个人分类失败");
					response.sendRedirect("category?action=manage&userId="+userId);
				}
				
			} else {			
				request.getSession().setAttribute("errorAddMsg", "您添加的分类名称已存在");
				response.sendRedirect("AddCategory.jsp");
			}
		}else if(action.equals("edit")){
			int cgId = Integer.parseInt(request.getParameter("cgId"));
			Category cg = cgService.getById(cgId);
			
			request.setAttribute("cg", cg);
			request.getRequestDispatcher("EditCategory.jsp").forward(request, response);
			
		}else if(action.equals("save")){
			int cgId = Integer.parseInt(request.getParameter("cgId"));
			int userId = Integer.parseInt(request.getParameter("userId"));
			String cgName = request.getParameter("category_name");
			Category cg = cgService.getByName(cgName, userId);
			
			if (null == cg) {	
				int res = cgService.updateCategory(cgId, cgName);
				
				if (res > 0) {
					request.getSession().setAttribute("succUpdateMsg", "保存成功");
					response.sendRedirect("category?action=manage&userId="+userId);
				} else {
					request.getSession().setAttribute("errorUpdateMsg", "保存失败");
					response.sendRedirect("category?action=manage&userId="+userId);
				}
				
			} else {			
				if (cgId != cg.getId()) {	
					request.getSession().setAttribute("errorUpdateMsg", "更新的分类名称已存在");
				}				
				response.sendRedirect("category?action=edit&cgId="+cgId);
			}
		}else if(action.equals("delete")){
			int cgId = Integer.parseInt(request.getParameter("cgId"));
			int userId = Integer.parseInt(request.getParameter("userId"));
			int res = cgService.deleteCategory(cgId);
			
			if (res > 0) {	
				request.getSession().setAttribute("succDeleMsg", "删除成功");
			} else {
				request.getSession().setAttribute("errorDeleMsg", "删除失败");
			}
			
			response.sendRedirect("category?action=manage&userId="+userId);
		}
	}

}
