package cap.service;

import cap.bean.BlogInfo;

public interface BlogInfoService {

	public abstract BlogInfo getByuserId(int userId);

	public abstract int updateBlogInfo(int userId, String blogName,
			String description, String annoucement);

	public abstract int insertBlogInfo(int userId, String blogName,
			String description, String annoucement);

}