package cap.service.impl;

import java.util.List;

import cap.bean.Category;
import cap.dao.CategoryDao;
import cap.dao.impl.CategoryDaoImpl;
import cap.service.CategoryService;
import cap.util.PageControl;

public class CategoryServcieImpl implements CategoryService {
	private CategoryDao categoryDao;
	
	public CategoryServcieImpl() {
		categoryDao=new CategoryDaoImpl();
	}

	
	@Override
	public List<Category> getByUserId(int userId ){
		return categoryDao.getByUserId(userId);
	}
	
	
	@Override
	public Category getById(int id) {
		return categoryDao.getById(id);
	}
	
	@Override
	public Category getByName(String cgName, int userId){
		return categoryDao.getByName(cgName, userId);
	}
	
	
	@Override
	public int insertCategory(int userId, String cgName){
		return categoryDao.insertCategory(userId, cgName);
	}
	
	
	@Override
	public int updateCategory(int cgId, String cgName){
		return categoryDao.updateCategory(cgId, cgName);
	}
	
	
	@Override
	public int deleteCategory(int cgId){
		return categoryDao.deleteCategory(cgId);
	}
	
	/*
	 * 根据用户id获得分页列表
	 */
	
	@Override
	public PageControl getCategoryByUserId(String curPageStr, int userId) {
		
		int total=categoryDao.getByUserId(userId).size();
		PageControl pc = new PageControl(curPageStr, total);
		List<Category> cgList =categoryDao.getCategoryByPageUserId(pc.getCurPage(), pc.getPageSize(), userId);
		pc.setList(cgList);
		return pc;
		
	}
	
	

}
