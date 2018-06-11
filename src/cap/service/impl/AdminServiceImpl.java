package cap.service.impl;

import java.util.List;
import cap.bean.Admin;
import cap.bean.SysCategory;
import cap.bean.User;
import cap.dao.AdminDao;
import cap.dao.ArticleDao;
import cap.dao.SysCategoryDao;
import cap.dao.UserDao;
import cap.dao.impl.AdminDaoImpl;
import cap.dao.impl.ArticleDaoImpl;
import cap.dao.impl.SysCategoryDaoImpl;
import cap.dao.impl.UserDaoImpl;
import cap.service.AdminService;
import cap.util.PageControl;

public class AdminServiceImpl implements AdminService {
	private AdminDao adminDao;
	private UserDao userDao;
	private SysCategoryDao scgDao;
	private ArticleDao artDao;
	
	public AdminServiceImpl() {
		adminDao=new AdminDaoImpl();
		userDao=new UserDaoImpl();
		scgDao = new SysCategoryDaoImpl();
		artDao=new ArticleDaoImpl();
	}
	

	
	@Override
	public Admin login(String userName, String passWord){
		
		return adminDao.login(userName, passWord);
	}
	
	
	@Override
	public int activeUser(int uId){
		return userDao.activeUser(uId);
	}
	
	@Override
	public PageControl getUserOfPage(String curPageStr){
		PageControl pc = new PageControl(curPageStr, userDao.getAllUser().size());
		List<User> uList = userDao.getUserByPage(pc.getCurPage(), pc.getPageSize());
		pc.setList(uList);
		return pc;
	}
	
	@Override
	public PageControl getSysCategoryByPage(String curPageStr){
		PageControl pc = new PageControl(curPageStr, scgDao.count());
		List<SysCategory> scgList=scgDao.getSysCategoryByPage(pc.getCurPage(), pc.getPageSize());
		pc.setList(scgList);
		return pc;
	}
	
	
	
	@Override
	public int deleteUser(int uId){
		return userDao.deleteUser(uId);
	}
	
	
	@Override
	public int deleteArtical(int artId){
		return artDao.deleteArtical(artId);
	}

}
