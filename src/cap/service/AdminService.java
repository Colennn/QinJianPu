package cap.service;

import cap.bean.Admin;
import cap.util.PageControl;

public interface AdminService {

	public abstract Admin login(String userName, String passWord);

	public abstract int activeUser(int uId);

	/**
	 * �����û���ҳ
	 * @param curPageStr
	 * @return
	 */
	public abstract PageControl getUserOfPage(String curPageStr);

	/**
	 * ����ϵͳ��Ŀ��ҳ
	 * @param curPageStr
	 * @return
	 */
	public abstract PageControl getSysCategoryByPage(String curPageStr);

	/**
	 * �û�����
	 * @param uId
	 * @return
	 */
	public abstract int deleteUser(int uId);

	public abstract int deleteArtical(int artId);

}