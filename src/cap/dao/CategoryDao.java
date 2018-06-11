package cap.dao;

import java.util.List;

import cap.bean.Category;

public interface CategoryDao {

	/**
	 * 根据userId获取所有分类
	 */
	public abstract List<Category> getByUserId(int userId);

	/**
	 * 根据id获取个人分类
	 */
	public abstract Category getById(int id);

	/**
	 * 删除分类
	 */
	public abstract int deleteCategory(int cgId);

	/**
	 * 根据name来查询分类记录
	 */
	public abstract Category getByName(String cgName, int userId);

	/**
	 * 创建一条分类记录
	 */
	public abstract int insertCategory(int userId, String cgName);

	/**
	 * 更新分类信息
	 */
	public abstract int updateCategory(int cgId, String cgName);

	public abstract List<Category> getCategoryByPage(int curPage, int size);

	public abstract List<Category> getCategoryByPageUserId(int curPage, int size,
			int userId);

}