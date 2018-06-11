package cap.service.impl;

import cap.bean.Profile;
import cap.dao.ProfileDao;
import cap.dao.impl.ProfileDaoImpl;
import cap.service.ProfileService;

public class ProfileServiceImpl implements ProfileService {
	private ProfileDao profileDao;
	
	public ProfileServiceImpl() {
		profileDao=new ProfileDaoImpl();
	}
	
	
	@Override
	public Profile getByuserId(int userId){
		return profileDao.getByuserId(userId);
	}
	
	

	@Override
	public int updateProfile(int userId, String firstName, String lastName,
			int gender, String telephone){
	return profileDao.updateProfile(userId, firstName, lastName, gender, telephone);
		
	}
	
	@Override
	public int insertProfile(int userId, String firstName, String lastName,
			int gender, String telephone){
		return profileDao.insertProfile(userId, firstName, lastName, gender, telephone);
		
	}

}
