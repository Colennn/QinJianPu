package cap.service;

import cap.bean.Profile;

public interface ProfileService {

	public abstract Profile getByuserId(int userId);

	public abstract int updateProfile(int userId, String firstName,
			String lastName, int gender, String telephone);

	public abstract int insertProfile(int userId, String firstName,
			String lastName, int gender, String telephone);

}