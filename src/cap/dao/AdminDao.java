package cap.dao;

import cap.bean.Admin;

public interface AdminDao {

	/**
	 * 管理员登录验证
	 */
	public abstract Admin login(String userName, String passWord);

}