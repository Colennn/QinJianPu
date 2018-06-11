package cap.dao;

import cap.bean.Profile;

public interface ProfileDao {

	/**
	 * 插入用户个人信息
	 * 
	 * return 影响行数
	 */
	public abstract int insertProfile(int userId, String firstName,
			String lastName, int gender, String telephone);

	/**
	 * 根据userId查询profile
	 */
	public abstract Profile getByuserId(int userId);

	/**
	 * 更新用户个人资料
	 * 
	 * return 影响行数
	 */
	public abstract int updateProfile(int userId, String firstName,
			String lastName, int gender, String telephone);

}