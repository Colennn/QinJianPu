package cap.dao;

import cap.bean.BlogInfo;

public interface BlogInfoDao {

	/**
	 * 插入个人博客信息
	 * 
	 * return 影响行数
	 */
	public abstract int insertBlogInfo(int userId, String blogName,
			String description, String annoucement);

	/**
	 * 根据userId查询BlogInfo
	 */
	public abstract BlogInfo getByuserId(int userId);

	/**
	 * 更新博客信息
	 * 
	 * return 影响行数
	 */
	public abstract int updateBlogInfo(int userId, String blogName,
			String description, String annoucement);

}