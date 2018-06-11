package cap.dao;

import cap.bean.BlogInfo;

public interface BlogInfoDao {

	/**
	 * ������˲�����Ϣ
	 * 
	 * return Ӱ������
	 */
	public abstract int insertBlogInfo(int userId, String blogName,
			String description, String annoucement);

	/**
	 * ����userId��ѯBlogInfo
	 */
	public abstract BlogInfo getByuserId(int userId);

	/**
	 * ���²�����Ϣ
	 * 
	 * return Ӱ������
	 */
	public abstract int updateBlogInfo(int userId, String blogName,
			String description, String annoucement);

}