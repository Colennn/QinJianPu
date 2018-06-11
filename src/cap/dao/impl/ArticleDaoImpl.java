package cap.dao.impl;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import cap.bean.Article;
import cap.bean.User;
import cap.dao.ArticleDao;
import cap.dao.UserDao;
import cap.db.DBPool;

public class ArticleDaoImpl implements ArticleDao {

	
	@Override
	public List<User> getActiveUser(int num) {
		UserDao userDao = new UserDaoImpl();
		User u = null;
		List<User> uList = null;
		ResultSet rs = null;
		DBPool dbc=new DBPool();
		try {
			uList = userDao.getAllUser();			
			if (num <= uList.size()) {
				uList = new ArrayList<User>();
				String sql="select user_id, COUNT(user_id) from article group by user_id DESC limit ?";				
				rs = dbc.doQueryRS(sql, new Object[]{num});
				while (rs.next()) {
					u = userDao.getUserById(rs.getInt("user_id"));
					uList.add(u);					
				}
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return uList;
	}
	
	
	@Override
	public List<Article> getByUserId(int userId) {
		
		DBPool dbc=new DBPool();
		ResultSet rs = null;
		List<Article> artList = null;
		
		try {
			artList = new ArrayList<Article>();
			String sql="select * from article where user_id=? order by publish_time DESC";
			rs=dbc.doQueryRS(sql, new Object[]{userId});
			while (rs.next()) {
				Article art = new Article();
				art.setId(rs.getInt("id"));
				art.setTitle(rs.getString("title"));
				art.setUserId(rs.getInt("user_id"));
				art.setSysCategoryId(rs.getInt("sys_category_id"));
				art.setCategoryId(rs.getInt("category_id"));
				art.setContent(rs.getString("content"));
				art.setSummary(rs.getString("summary"));
				art.setPublishTime(rs.getTimestamp("publish_time"));
				art.setIsTop(rs.getInt("is_top"));
				art.setIsDelete(rs.getInt("is_delete"));
				art.setCount(rs.getInt("count"));				
				artList.add(art);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return artList;
	}
	
	@Override
	public Article getById(int id) {
		

		ResultSet rs = null;
		Article art = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from article where id=?";
			art = new Article();

			rs=dbc.doQueryRS(sql, new Object[]{id});
			while (rs.next()) {
				art.setId(rs.getInt("id"));
				art.setTitle(rs.getString("title"));
				art.setUserId(rs.getInt("user_id"));
				art.setSysCategoryId(rs.getInt("sys_category_id"));
				art.setCategoryId(rs.getInt("category_id"));
				art.setContent(rs.getString("content"));
				art.setSummary(rs.getString("summary"));
				art.setPublishTime(rs.getTimestamp("publish_time"));
				art.setIsTop(rs.getInt("is_top"));
				art.setIsDelete(rs.getInt("is_delete"));
				art.setCount(rs.getInt("count"));				
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			dbc.close();
		}
		
		return art;
	}

	@Override
	public int insertArticle(String title, int userId, int scgId, int cgId, String content, String summary) {

		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="insert into article(title,user_id,sys_category_id,category_id,content,summary,publish_time,is_top,is_delete) "
					+ "values( ?, ?, ?, ?, ?, ?, NOW(), 0, 0)";

			res=dbc.doUpdate(sql, new Object[]{title,userId,scgId,cgId,content,summary});
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			dbc.close();
		}
		
		return res;
	}
	
	
	@Override
	public int updateArticle(int artId, String title, int userId, int scgId, int cgId, String content, String summary) {
		DBPool dbc=new DBPool();
		int res = -1;		
		try {
			String sql="update article " +
							"set title=?, user_id=?, sys_category_id=?, category_id=?, content=?, summary=?, publish_time=NOW(), is_top=0, is_delete=0" +
							" where id=?";
			res=dbc.doUpdate(sql, new Object[]{title,userId,scgId,cgId,content,summary,artId});
					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}		
		return res;
	}
	

	@Override
	public int deleteArtical(int artId) {
		DBPool dbc=new DBPool();

		int res = -1;
		
		try {
			String sql="update article set is_delete=1 where id=?";
		
			res=dbc.doUpdate(sql, new Object[]{artId});
					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			dbc.close();
		}
		
		return res;
	}
	

	@Override
	public List<Article> getAllArtical() {

		ResultSet rs = null;
		List<Article> artList = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from article where is_delete=0 order by publish_time DESC";
			artList = new ArrayList<Article>();

			rs=dbc.doQueryRS(sql, new Object[]{});
			
			while (rs.next()) {
				Article art = new Article();
				
				art.setId(rs.getInt("id"));
				art.setTitle(rs.getString("title"));
				art.setUserId(rs.getInt("user_id"));
				art.setSysCategoryId(rs.getInt("sys_category_id"));
				art.setCategoryId(rs.getInt("category_id"));
				art.setContent(rs.getString("content"));
				art.setSummary(rs.getString("summary"));
				art.setPublishTime(rs.getTimestamp("publish_time"));
				art.setIsTop(rs.getInt("is_top"));
				art.setIsDelete(rs.getInt("is_delete"));
				
				artList.add(art);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			dbc.close();
		}
		
		return artList;
	}
	

	@Override
	public List<Article> search(String q) {
		List<Article> artList = null;

		ResultSet rs = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from article where title like ? or content like ? or summary like ? order by publish_time DESC";
			artList = new ArrayList<Article>();		
			q = '%' + q + '%';	
			rs=dbc.doQueryRS(sql,  new Object[]{q,q,q});
			while (rs.next()) {
				Article art = new Article();
				
				art.setId(rs.getInt("id"));
				art.setTitle(rs.getString("title"));
				art.setUserId(rs.getInt("user_id"));
				art.setSysCategoryId(rs.getInt("sys_category_id"));
				art.setCategoryId(rs.getInt("category_id"));
				art.setContent(rs.getString("content"));
				art.setSummary(rs.getString("summary"));
				art.setPublishTime(rs.getTimestamp("publish_time"));
				art.setIsTop(rs.getInt("is_top"));
				art.setIsDelete(rs.getInt("is_delete"));
				
				artList.add(art);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return artList;
	}
	
	
	@Override
	public List<Article> getArticleByPage(int curPage, int size) {

		ResultSet rs = null;
		List<Article> artList = null;
		int start = (curPage - 1) * size;	//limit��0��ʼ
		DBPool dbc=new DBPool();
		try {
			String sql="select a.*,u.username from article as a, user as u  where u.id=a.user_id and a. is_delete=0 order by publish_time DESC limit ?,?";
			artList = new ArrayList<Article>();			
			rs=dbc.doQueryRS(sql, new Object[]{start,size});			
			while (rs.next()) {
				Article art = new Article();				
				art.setId(rs.getInt("id"));
				art.setTitle(rs.getString("title"));
				art.setUserId(rs.getInt("user_id"));
				art.setSysCategoryId(rs.getInt("sys_category_id"));
				art.setCategoryId(rs.getInt("category_id"));
				art.setContent(rs.getString("content"));
				art.setSummary(rs.getString("summary"));
				art.setPublishTime(rs.getTimestamp("publish_time"));
				art.setIsTop(rs.getInt("is_top"));
				art.setIsDelete(rs.getInt("is_delete"));
				art.setCount(rs.getInt("count"));
				try {
					art.setUsername(rs.getString("username"));					
				} catch (Exception e) {
					art.setUsername("");					
				}
				artList.add(art);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			dbc.close();
		}
		
		return artList;
	}
	

	@Override
	public List<Article> getArticleByPageUserId(int curPage, int size, int userId) {
		

		ResultSet rs = null;
		List<Article> artList = null;
		int start = (curPage - 1) * size;
		DBPool dbc=new DBPool();
		try {
			String sql="SELECT article.*,c.category_name as cname,sc.category_name AS scgname,u.username "
					+ "FROM article "
					+ " INNER JOIN category AS c ON article.category_id = c.id"
					+ " INNER JOIN sys_category AS sc ON article.sys_category_id = sc.id"
					+ " INNER JOIN user AS u ON article.user_id = u.id AND c.user_id = u.id "
					+" where article.is_delete=0 and article.user_id=? order by publish_time DESC limit ?,?";
			
			
			artList = new ArrayList<Article>();
			rs=dbc.doQueryRS(sql, new Object[]{userId,start,size});
			while (rs.next()) {
				Article art = new Article();
				
				art.setId(rs.getInt("id"));
				art.setTitle(rs.getString("title"));
				art.setUserId(rs.getInt("user_id"));
				art.setSysCategoryId(rs.getInt("sys_category_id"));
				art.setCategoryId(rs.getInt("category_id"));
				art.setContent(rs.getString("content"));
				art.setSummary(rs.getString("summary"));
				art.setPublishTime(rs.getTimestamp("publish_time"));
				art.setIsTop(rs.getInt("is_top"));
				art.setIsDelete(rs.getInt("is_delete"));
				art.setCount(rs.getInt("count"));
				try {
					art.setUsername(rs.getString("username"));
					art.setCategoryName(rs.getString("cname"));
					art.setScName(rs.getString("scgname"));
				} catch (Exception e) {
					art.setUsername("");
					art.setCategoryName("");
					art.setScName("");
				}
				
				artList.add(art);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			dbc.close();
		}
		
		return artList;
	}
	

	@Override
	public List<Article> getBycgIdorscgId(int cgId, int scgId, int artId) {
	
		ResultSet rs = null;
		List<Article> artList = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from article where is_delete=0 and id<>? and category_id=? and sys_category_id=? order by publish_time DESC limit 5";
			artList = new ArrayList<Article>();
			rs=dbc.doQueryRS(sql, new Object[]{artId,cgId,scgId});	
			while (rs.next()) {
				Article art = new Article();
				
				art.setId(rs.getInt("id"));
				art.setTitle(rs.getString("title"));
				art.setUserId(rs.getInt("user_id"));
				art.setSysCategoryId(rs.getInt("sys_category_id"));
				art.setCategoryId(rs.getInt("category_id"));
				art.setContent(rs.getString("content"));
				art.setSummary(rs.getString("summary"));
				art.setPublishTime(rs.getTimestamp("publish_time"));
				art.setIsTop(rs.getInt("is_top"));
				art.setIsDelete(rs.getInt("is_delete"));
				art.setCount(rs.getInt("count"));
				artList.add(art);
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return artList;
	}
	
	@Override
	public List<Article> topTenArticle(){
		DBPool dbc=null;
		ResultSet rs=null;
		List<Article> artList = null;
		try {
			artList = new ArrayList<Article>();
			dbc=new DBPool();
			String sql="select * from article ORDER BY count desc limit 10";
			rs=dbc.doQueryRS(sql, new Object[]{});
			while(rs.next()){
				Article art = new Article();
				art.setId(rs.getInt("id"));
				art.setTitle(rs.getString("title"));
				art.setUserId(rs.getInt("user_id"));
				art.setSysCategoryId(rs.getInt("sys_category_id"));
				art.setCategoryId(rs.getInt("category_id"));
				art.setContent(rs.getString("content"));
				art.setSummary(rs.getString("summary"));
				art.setPublishTime(rs.getTimestamp("publish_time"));
				art.setIsTop(rs.getInt("is_top"));
				art.setIsDelete(rs.getInt("is_delete"));
				art.setCount(rs.getInt("count"));
				artList.add(art);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			dbc.close();
		}
		return artList;
	}

	@Override
	public int updateCount(int artId) {
		DBPool dbc=new DBPool();
		int res=0;
		try {
			String sql="update article set count=count+1 where id=?";
			res=dbc.doUpdate(sql, new Object[]{artId});
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}

	
}
