package cap.service.impl;

import cap.bean.BlogInfo;
import cap.dao.BlogInfoDao;
import cap.dao.impl.BlogInfoDaoImpl;
import cap.service.BlogInfoService;

public class BlogInfoServiceImpl implements BlogInfoService {
	private BlogInfoDao biDao;
	
	public BlogInfoServiceImpl() {
		biDao=new BlogInfoDaoImpl();
	}

	
	@Override
	public BlogInfo getByuserId(int userId){
		return biDao.getByuserId(userId);
	}
	
	@Override
	public int updateBlogInfo(int userId, String blogName, String description, String annoucement){
		return biDao.updateBlogInfo(userId, blogName, description, annoucement);
	}
	
	@Override
	public int insertBlogInfo(int userId, String blogName, String description, String annoucement){
		return biDao.insertBlogInfo(userId, blogName, description, annoucement);
	}

}
