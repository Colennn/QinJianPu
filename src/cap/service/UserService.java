package cap.service;

import java.util.List;

import cap.bean.User;
import cap.util.PageControl;

public interface UserService {

	public abstract User login(String username, String password);

	/*
	 * 根据id获取用户资料
	 */
	public abstract User getUserById(int id);

	/*
	 * 查询用户名是否存在
	 */
	public abstract int getIdByuserName(String username);

	public abstract User getByEmail(String email);

	public abstract int register(String email, String username, String password);

	public abstract int setIsAppliedById(int id);

	public abstract User getByIdPwd(int userId, String password);

	public abstract int updatePwdById(int userId, String password);

	public abstract int setIsProfile(int userId);

	public abstract PageControl getUserOfPage(String curPageStr);

	public abstract int deleteUser(int uId);

	public abstract int activeUser(int uId);
	
	public abstract List<User> getAllUser();

}