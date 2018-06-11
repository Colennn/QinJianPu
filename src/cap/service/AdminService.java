package cap.service;

import cap.bean.Admin;
import cap.util.PageControl;

public interface AdminService {

	public abstract Admin login(String userName, String passWord);

	public abstract int activeUser(int uId);

	/**
	 * 管理用户分页
	 * @param curPageStr
	 * @return
	 */
	public abstract PageControl getUserOfPage(String curPageStr);

	/**
	 * 管理系统栏目分页
	 * @param curPageStr
	 * @return
	 */
	public abstract PageControl getSysCategoryByPage(String curPageStr);

	/**
	 * 用户禁用
	 * @param uId
	 * @return
	 */
	public abstract int deleteUser(int uId);

	public abstract int deleteArtical(int artId);

}