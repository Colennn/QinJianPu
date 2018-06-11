package cap.dao.impl;


import java.sql.ResultSet;
import java.sql.SQLException;

import cap.bean.BlogInfo;
import cap.dao.BlogInfoDao;
import cap.db.DBPool;

public class BlogInfoDaoImpl implements BlogInfoDao {

	
	@Override
	public int insertBlogInfo(int userId, String blogName, String description, String annoucement) {

		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="insert into blog_info values(NULL, ?, ?, ?, ?)";
			res=dbc.doUpdate(sql, new Object[]{userId,blogName,description,annoucement});
					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return res;
	}
	
	@Override
	public BlogInfo getByuserId(int userId) {

		ResultSet rs = null;
		BlogInfo bi = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from blog_info where user_id=? limit 1";
			rs=dbc.doQueryRS(sql, new Object[]{userId})	;	
			if (rs.next()) {
				bi = new BlogInfo(); 
				
				bi.setId(rs.getInt("id"));
				bi.setUserId(rs.getInt("user_id"));
				bi.setBlogName(rs.getString("blog_name"));
				bi.setDescription(rs.getString("description"));
				bi.setAnnoucement(rs.getString("annoucement"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return bi;
	}
	

	@Override
	public int updateBlogInfo(int userId, String blogName, String description, String annoucement) {		

		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="update blog_info " +
					"set blog_name=?, description=?, annoucement=? where user_id=?";
			res=dbc.doUpdate(sql, new Object[]{blogName,description,annoucement,userId});
					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return res;
	}
}
