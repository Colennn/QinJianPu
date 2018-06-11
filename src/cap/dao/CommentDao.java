package cap.dao;

import java.util.List;

import cap.bean.Comment;
import cap.bean.Ucomment;

public interface CommentDao {

	
	public abstract int insertComment(int userId, int artId, String content);

	public abstract List<Comment> getAllByArtId(int artId);

	public abstract int deleteComment(int cmtId);

	public abstract List<Comment> getAll();

	public abstract List<Comment> getCommentByPage(int curPage, int size);

	public abstract List<Ucomment> getCommentByPageUserId(int curPage, int size,
			int userId);

	public abstract int getCountByUserId(int userId);
	

}