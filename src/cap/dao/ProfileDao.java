package cap.dao;

import cap.bean.Profile;

public interface ProfileDao {

	/**
	 * �����û�������Ϣ
	 * 
	 * return Ӱ������
	 */
	public abstract int insertProfile(int userId, String firstName,
			String lastName, int gender, String telephone);

	/**
	 * ����userId��ѯprofile
	 */
	public abstract Profile getByuserId(int userId);

	/**
	 * �����û���������
	 * 
	 * return Ӱ������
	 */
	public abstract int updateProfile(int userId, String firstName,
			String lastName, int gender, String telephone);

}