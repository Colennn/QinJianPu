package cap.dao.impl;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import cap.bean.Category;
import cap.dao.CategoryDao;
import cap.db.DBPool;

public class CategoryDaoImpl implements CategoryDao {


	@Override
	public List<Category> getByUserId(int userId) {
		
		ResultSet rs = null;
		List<Category> cgList = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from category where user_id=? and is_delete=0";
			cgList = new ArrayList<Category>();
			rs=dbc.doQueryRS(sql, new Object[]{userId});
			while (rs.next()) {
				Category cg = new Category();
				cg.setId(rs.getInt("id"));
				cg.setUserId(rs.getInt("user_id"));
				cg.setCategoryName(rs.getString("category_name"));
				cg.setArticles(rs.getInt("articals"));
				cg.setIsDelete(rs.getInt("is_delete"));
				
				cgList.add(cg);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return cgList;
	}
	

	@Override
	public Category getById(int id) {
		Category cg = null;

		ResultSet rs = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from category where id=? limit 1";
			rs=dbc.doQueryRS(sql, new Object[]{id});
	
			if (rs.next()) {
				cg = new Category();
				cg.setId(rs.getInt("id"));
				cg.setUserId(rs.getInt("user_id"));
				cg.setCategoryName(rs.getString("category_name"));
				cg.setArticles(rs.getInt("articals"));
				cg.setIsDelete(rs.getInt("is_delete"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return cg;
	}

	@Override
	public int deleteCategory(int cgId) {

		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="update category set is_delete=1 where id=?";
			res=dbc.doUpdate(sql, new Object[]{cgId});
					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return res;
	}
	

	@Override
	public Category getByName(String cgName, int userId) {

		ResultSet rs = null;
		Category cg = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from category where category_name=? and user_id=? and is_delete=0 limit 1";
			rs=dbc.doQueryRS(sql, new Object[]{cgName,userId});
			if (rs.next()) {
				cg = new Category();
				cg.setId(rs.getInt("id"));
				cg.setUserId(rs.getInt("user_id"));
				cg.setCategoryName(rs.getString("category_name"));
				cg.setArticles(rs.getInt("articals"));
				cg.setIsDelete(rs.getInt("is_delete"));
			}
		
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return cg;
	}
	

	@Override
	public int insertCategory(int userId, String cgName) {

		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="insert into category values(NULL, ?, ?, 0, 0)";
			res=dbc.doUpdate(sql, new Object[]{userId,cgName});
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return res;
	}
	
	@Override
	public int updateCategory(int cgId, String cgName) {

		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="update category set category_name=? where id=?";
			res=dbc.doUpdate(sql, new Object[]{cgName,cgId});
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return res;
	}
	
	@Override
	public List<Category> getCategoryByPage(int curPage, int size) {
		ResultSet rs = null;
		List<Category> cgList = null;
		int start = (curPage - 1) * size;	
		DBPool dbc=new DBPool();
		try {
			String sql="select * from category where is_delete=0 order by id DESC limit ?,?";
			cgList = new ArrayList<Category>();
			
			rs=dbc.doQueryRS(sql, new Object[]{start,size});
			while (rs.next()) {
				Category cg = new Category();
				cg.setId(rs.getInt("id"));
				cg.setUserId(rs.getInt("user_id"));
				cg.setCategoryName(rs.getString("category_name"));
				cg.setArticles(rs.getInt("articals"));
				cg.setIsDelete(rs.getInt("is_delete"));				
				cgList.add(cg);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return cgList;
	}
	
	@Override
	public List<Category> getCategoryByPageUserId(int curPage, int size, int userId) {

		ResultSet rs = null;
		List<Category> cgList = null;
		int start = (curPage - 1) * size;	
		DBPool dbc=new DBPool();
		try {
			String sql="select * from category where is_delete=0 and user_id=? order by id DESC limit ?,?";
			cgList = new ArrayList<Category>();
			
			rs=dbc.doQueryRS(sql, new Object[]{userId,start,size});
			while (rs.next()) {
				Category cg = new Category();
				cg.setId(rs.getInt("id"));
				cg.setUserId(rs.getInt("user_id"));
				cg.setCategoryName(rs.getString("category_name"));
				cg.setArticles(rs.getInt("articals"));
				cg.setIsDelete(rs.getInt("is_delete"));				
				cgList.add(cg);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return cgList;
	}
	
}
