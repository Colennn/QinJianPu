package cap.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import cap.bean.SysCategory;
import cap.dao.SysCategoryDao;
import cap.db.DBPool;
public class SysCategoryDaoImpl implements SysCategoryDao {

	/*
	 * 查询所有系统分类
	 */
	
	@Override
	public List<SysCategory> getAllSysCategory() {
		List<SysCategory> scList = new ArrayList<SysCategory>();
		SysCategory sc = null;
		ResultSet rs = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from sys_category";
			rs=dbc.doQueryRS(sql, new Object[]{});
			while (rs.next()) {
				sc = new SysCategory();
				sc.setId(rs.getInt("id"));
				sc.setCategoryName(rs.getString("category_name"));
				sc.setArticles(rs.getInt("articals"));
				sc.setIsDelete(rs.getInt("is_delete"));				
				scList.add(sc);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return scList;
	}
	
	
	@Override
	public SysCategory getById(int id) {
		SysCategory sc = null;

		ResultSet rs = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from sys_category where id=? limit 1";
	        rs=dbc.doQueryRS(sql, new Object[]{id});
			if (rs.next()) {
				sc = new SysCategory();
				sc.setId(rs.getInt("id"));
				sc.setCategoryName(rs.getString("category_name"));
				sc.setArticles(rs.getInt("articals"));
				sc.setIsDelete(rs.getInt("is_delete"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return sc;
	}
	
	
	@Override
	public int deleteSysCategory(int scgId) {
		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="update sys_category set is_delete=1 where id=?";
			res=dbc.doUpdate(sql, new Object[]{scgId});				
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return res;
	}
	

	@Override
	public SysCategory getByName(String scgName) {

		ResultSet rs = null;
		SysCategory scg = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from sys_category where category_name=? and is_delete=0 limit 1";
			rs=dbc.doQueryRS(sql, new Object[]{scgName});
			if (rs.next()) {
				scg = new SysCategory();
				scg.setId(rs.getInt("id"));
				scg.setCategoryName(rs.getString("category_name"));
				scg.setArticles(rs.getInt("articals"));
				scg.setIsDelete(rs.getInt("is_delete"));
			}
		
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return scg;
	}

	@Override
	public int insertSysCategory(String scgName) {
		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="insert into sys_category values(NULL, ?, 0, 0)";
			res=dbc.doUpdate(sql, new Object[]{scgName});
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return res;
	}
	

	@Override
	public int updateSysCategory(int scgId, String scgName) {
		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="update sys_category set category_name=? where id=?";
			res=dbc.doUpdate(sql, new Object[]{scgName,scgId});
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return res;
	}
	/*
	 * 分页
	 */
	
	@Override
	public List<SysCategory> getSysCategoryByPage(int curPage, int size) {		
		ResultSet rs = null;
		List<SysCategory> scgList = null;
		int start = (curPage - 1) * size;	
		DBPool dbc=new DBPool();
		try {
			String sql="select * from sys_category where is_delete=0 order by id DESC limit ?,?";
			scgList = new ArrayList<SysCategory>();			
			rs=dbc.doQueryRS(sql, new Object[]{start,size});
			while (rs.next()) {
				SysCategory scg = new SysCategory();
				scg.setId(rs.getInt("id"));
				scg.setCategoryName(rs.getString("category_name"));
				scg.setArticles(rs.getInt("articals"));
				scg.setIsDelete(rs.getInt("is_delete"));
				scgList.add(scg);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return scgList;
	}
	/*
	 * 计算分类的总数
	 */
	
	@Override
	public int count(){
		ResultSet rs = null;
		DBPool dbc=new DBPool();
		int total=0;
		String sql="select count(*) from sys_category";
		try {
			rs=dbc.doQueryRS(sql, new Object[]{});
			if(rs.next()) total=rs.getInt(1);
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			dbc.close();
		}
		return total;
	}
	
}
