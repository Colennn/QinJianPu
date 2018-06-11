package cap.service.impl;

import java.util.List;

import cap.bean.User;
import cap.dao.UserDao;
import cap.dao.impl.UserDaoImpl;
import cap.service.UserService;
import cap.util.PageControl;

public class UserServiceImpl implements UserService {
	private UserDao userDao;

	public UserServiceImpl() {
		userDao=new UserDaoImpl();
	}
	
	@Override
	public User login(String username,String password){
		User u=userDao.login(username, password);
		return u;
	}
	/*
	 * 根据id获取用户资料
	 */
	
	@Override
	public User getUserById(int id){
		return userDao.getUserById(id);
	}
	/*
	 * 查询用户名是否存在
	 */
	
	@Override
	public int getIdByuserName(String username){
		return userDao.getIdByuserName(username);
		
	}
	
	
	@Override
	public User getByEmail(String email){
		return userDao.getByEmail(email);
	}
	
	
	@Override
	public int register(String email, String username, String password){
		return userDao.register(email, username, password);
	}
	
	
	@Override
	public int setIsAppliedById(int id){
		return userDao.setIsAppliedById(id);
	}
	
	
	@Override
	public User getByIdPwd(int userId, String password){
		return userDao.getByIdPwd(userId, password);
	}
	
	@Override
	public int updatePwdById(int userId, String password){
		return userDao.updatePwdById(userId, password);
	}
	
	
	@Override
	public int setIsProfile(int userId){
		return userDao.setIsProfile(userId);
	}
	
	
	@Override
	public PageControl getUserOfPage(String curPageStr){
		PageControl pc = new PageControl(curPageStr, userDao.getAllUser().size());
		List<User> uList=userDao.getUserByPage(pc.getCurPage(), pc.getPageSize());
		pc.setList(uList);
		return pc;
		
	}
	
	
	@Override
	public int deleteUser(int uId){
		return userDao.deleteUser(uId);
	}
	
	
	@Override
	public int activeUser(int uId){
		return userDao.activeUser(uId);
	}

	@Override
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		return userDao.getAllUser();
	}
	
	

}
