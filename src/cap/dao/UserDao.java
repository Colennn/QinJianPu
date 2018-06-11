package cap.dao;

import java.util.List;

import cap.bean.Admin;
import cap.bean.User;

public interface UserDao {

	/**
	 * 登录
	 * @param userName
	 * @param password
	 * @return
	 */
	public abstract User login(String userName, String password);

	/**
	 * 注册
	 * @param email
	 * @param username
	 * @param password
	 * @param name
	 * @return
	 */
	public abstract int register(String email, String username, String password);

	/**
	 * 根据用户名取用户id
	 * @param username
	 * @return
	 */
	public abstract int getIdByuserName(String username);

	/**
	 * 获取系统所有用户
	 */
	public abstract List<User> getAllUser();

	/**
	 * 根据id查询用户
	 */
	public abstract User getUserById(int id);

	/**
	 * 修改is_applied字段为1，表示已经申请了个人博客
	 */
	public abstract int setIsAppliedById(int id);

	/**
	 * 根据userId和password查询用户记录
	 */
	public abstract User getByIdPwd(int userId, String password);

	/**
	 * 根据id来更新密码
	 */
	public abstract int updatePwdById(int userId, String password);

	/**
	 * 根据email查询用户记录
	 */
	public abstract User getByEmail(String email);

	/**
	 * 禁用账户
	 */
	public abstract int deleteUser(int uId);

	/**
	 * 激活账户
	 */
	public abstract int activeUser(int uId);
	
	/**
	 * 设置用户个人信息
	 */
	public abstract int setIsProfile(int userId);

	/**
	 * 分页获得用户，每页显示5条记录
	 * @param curPage
	 * @param size
	 * @return 第curPage页的用户数据
	 */
	public abstract List<User> getUserByPage(int curPage, int size);
	
	

}