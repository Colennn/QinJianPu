package cap.service.impl;

import java.util.List;

import cap.bean.Comment;
import cap.bean.Ucomment;
import cap.dao.CommentDao;
import cap.dao.impl.CommentDaoImpl;
import cap.service.CommentService;
import cap.util.PageControl;

public class CommentServiceImpl implements CommentService {
	private CommentDao commentDao;
	
	
	
	public CommentServiceImpl() {
		commentDao=new CommentDaoImpl();
	}
	
	@Override
	public int insertComment(int userId, int artId, String content){
		return commentDao.insertComment(userId, artId, content);
	}
	
	
	@Override
	public int deleteComment(int cmtId){
		return commentDao.deleteComment(cmtId);
	}
	
	
	@Override
	public List<Comment> getAllByArtId(int artId){
		return commentDao.getAllByArtId(artId);
	}

	@Override
	public PageControl getCommentByUserId(String curPageStr,int userId){
		int total=commentDao.getCountByUserId(userId);
		PageControl pc = new PageControl(curPageStr, total);
		List<Ucomment> cmtList=commentDao.getCommentByPageUserId(pc.getCurPage(), pc.getPageSize(), userId);
		pc.setList(cmtList);
		return pc;
	}

	@Override
	public List<Comment> getAll() {
		// TODO Auto-generated method stub
		return commentDao.getAll();
	}


}
