package cap.dao;

import java.util.List;

import cap.bean.Admin;
import cap.bean.User;

public interface UserDao {

	/**
	 * ��¼
	 * @param userName
	 * @param password
	 * @return
	 */
	public abstract User login(String userName, String password);

	/**
	 * ע��
	 * @param email
	 * @param username
	 * @param password
	 * @param name
	 * @return
	 */
	public abstract int register(String email, String username, String password);

	/**
	 * �����û���ȡ�û�id
	 * @param username
	 * @return
	 */
	public abstract int getIdByuserName(String username);

	/**
	 * ��ȡϵͳ�����û�
	 */
	public abstract List<User> getAllUser();

	/**
	 * ����id��ѯ�û�
	 */
	public abstract User getUserById(int id);

	/**
	 * �޸�is_applied�ֶ�Ϊ1����ʾ�Ѿ������˸��˲���
	 */
	public abstract int setIsAppliedById(int id);

	/**
	 * ����userId��password��ѯ�û���¼
	 */
	public abstract User getByIdPwd(int userId, String password);

	/**
	 * ����id����������
	 */
	public abstract int updatePwdById(int userId, String password);

	/**
	 * ����email��ѯ�û���¼
	 */
	public abstract User getByEmail(String email);

	/**
	 * �����˻�
	 */
	public abstract int deleteUser(int uId);

	/**
	 * �����˻�
	 */
	public abstract int activeUser(int uId);
	
	/**
	 * �����û�������Ϣ
	 */
	public abstract int setIsProfile(int userId);

	/**
	 * ��ҳ����û���ÿҳ��ʾ5����¼
	 * @param curPage
	 * @param size
	 * @return ��curPageҳ���û�����
	 */
	public abstract List<User> getUserByPage(int curPage, int size);
	
	

}