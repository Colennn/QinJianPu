package cap.dao;

import cap.bean.Admin;

public interface AdminDao {

	/**
	 * ����Ա��¼��֤
	 */
	public abstract Admin login(String userName, String passWord);

}