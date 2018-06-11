package cap.dao.impl;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import cap.bean.Comment;
import cap.bean.Ucomment;
import cap.dao.CommentDao;
import cap.db.DBPool;

public class CommentDaoImpl implements CommentDao {


	@Override
	public int insertComment(int userId, int artId, String content) {
		
		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="insert into comment values(NULL, ?, ?, ?, NOW(), 0)";
			res=dbc.doUpdate(sql, new Object[]{userId,artId,content});
		
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			dbc.close();
		}
		
		return res;
	}
	

	@Override
	public List<Comment> getAllByArtId(int artId) {
		List<Comment> cmtList = null;
		ResultSet rs = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from comment where artical_id=? order by time ASC";
			cmtList = new ArrayList<Comment>();

			rs=dbc.doQueryRS(sql, new Object[]{artId});
			while (rs.next()) {
				Comment cmt = new Comment();
				cmt.setId(rs.getInt("id"));
				cmt.setUserId(rs.getInt("user_id"));
				cmt.setArticleId(rs.getInt("artical_id"));
				cmt.setContent(rs.getString("content"));
				cmt.setTime(rs.getTimestamp("time"));
				cmt.setIsDelete(rs.getInt("is_delete"));				
				cmtList.add(cmt);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return cmtList;
	}
	
	
	@Override
	public int deleteComment(int cmtId) {
		
		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="update comment set is_delete=1 where id=?";
			res=dbc.doUpdate(sql, new Object[]{cmtId});
		
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return res;
	}

	@Override
	public List<Comment> getAll() {
		List<Comment> cmtList = null;
		ResultSet rs = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from comment";
			cmtList = new ArrayList<Comment>();
			rs=dbc.doQueryRS(sql, new Object[]{});
			while (rs.next()) {
				Comment cmt = new Comment();
				cmt.setId(rs.getInt("id"));
				cmt.setUserId(rs.getInt("user_id"));
				cmt.setArticleId(rs.getInt("artical_id"));
				cmt.setContent(rs.getString("content"));
				cmt.setTime(rs.getTimestamp("time"));
				cmt.setIsDelete(rs.getInt("is_delete"));
				
				cmtList.add(cmt);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return cmtList;
	}

	@Override
	public List<Comment> getCommentByPage(int curPage, int size) {
		ResultSet rs = null;
		List<Comment> cmtList = null;
		int start = (curPage - 1) * size;	
		DBPool dbc=new DBPool();
		try {
			String sql="select * from comment where is_delete=0 order by id DESC limit ?,?";
			cmtList = new ArrayList<Comment>();
			
			rs=dbc.doQueryRS(sql, new Object[]{start,size});
			while (rs.next()) {
				Comment cmt = new Comment();
				cmt.setId(rs.getInt("id"));
				cmt.setUserId(rs.getInt("user_id"));
				cmt.setArticleId(rs.getInt("artical_id"));
				cmt.setContent(rs.getString("content"));
				cmt.setTime(rs.getTimestamp("time"));
				cmt.setIsDelete(rs.getInt("is_delete"));
				
				cmtList.add(cmt);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return cmtList;
	}
	
	@Override
	public List<Ucomment> getCommentByPageUserId(int curPage, int size, int userId) {
		
		ResultSet rs = null;
		List<Ucomment> cmtList = null;
		int start = (curPage - 1) * size;
		DBPool dbc=new DBPool();
		try {		
			cmtList = new ArrayList<Ucomment>();
			String sql="select DISTINCT aid ,cid,ccontent, username,title,ctime from ucomment where cdelete=0 and aid IN (select id from article where user_id =?) limit ?,?";
			
			rs=dbc.doQueryRS(sql, new Object[]{userId,start,size});
			while (rs.next()) {
				Ucomment cmt = new Ucomment();
				cmt.setAid(rs.getInt("aid"));
				cmt.setCid(rs.getInt("cid"));
				cmt.setCcontent(rs.getString("ccontent"));
				cmt.setUsername(rs.getString("username"));
				cmt.setTitle(rs.getString("title"));
				cmt.setPublish_time(rs.getTimestamp("ctime"));
				cmtList.add(cmt);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return cmtList;
	}
	
	@Override
	public int getCountByUserId(int userId ){
		DBPool dbc=new DBPool();
		ResultSet rs = null;
		int total=0;
		String sql="select count(*) from ucomment where uid=? and cdelete=0 ";
		try {
			rs=dbc.doQueryRS(sql, new Object[]{userId});
			if(rs.next()) total=rs.getInt(1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			dbc.close();
		}
		return total;
		
	}

	
}
