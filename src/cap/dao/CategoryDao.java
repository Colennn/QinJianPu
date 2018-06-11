package cap.dao;

import java.util.List;

import cap.bean.Category;

public interface CategoryDao {

	/**
	 * ����userId��ȡ���з���
	 */
	public abstract List<Category> getByUserId(int userId);

	/**
	 * ����id��ȡ���˷���
	 */
	public abstract Category getById(int id);

	/**
	 * ɾ������
	 */
	public abstract int deleteCategory(int cgId);

	/**
	 * ����name����ѯ�����¼
	 */
	public abstract Category getByName(String cgName, int userId);

	/**
	 * ����һ�������¼
	 */
	public abstract int insertCategory(int userId, String cgName);

	/**
	 * ���·�����Ϣ
	 */
	public abstract int updateCategory(int cgId, String cgName);

	public abstract List<Category> getCategoryByPage(int curPage, int size);

	public abstract List<Category> getCategoryByPageUserId(int curPage, int size,
			int userId);

}