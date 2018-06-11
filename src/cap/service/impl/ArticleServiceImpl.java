package cap.service.impl;



import java.util.List;

import cap.bean.Article;
import cap.bean.User;
import cap.dao.ArticleDao;
import cap.dao.impl.ArticleDaoImpl;
import cap.service.ArticleService;
import cap.util.PageControl;

public class ArticleServiceImpl implements ArticleService {
	private ArticleDao artDao;

	public ArticleServiceImpl() {
		artDao=new ArticleDaoImpl();
	}
	
	@Override
	public int insertArtical(String title, int userId, int scgId, 
			int cgId, String content, String summary){
		return artDao.insertArticle(title, userId, scgId, cgId, content, summary);
	 
	}
	
	@Override
	public PageControl getData(String curPageStr){
		int count=artDao.getAllArtical().size();
		PageControl pc = new PageControl(curPageStr, count);
		List<Article> artList= artDao.getArticleByPage(pc.getCurPage(), pc.getPageSize());
		pc.setList(artList);
		return pc;
	}
	
	@Override
	public PageControl getByPageUserId(String curPageStr,int userId){
		PageControl pc = new PageControl(curPageStr, artDao.getByUserId(userId).size());
		List<Article> artList=artDao.getArticleByPageUserId(pc.getCurPage(), pc.getPageSize(), userId);
		pc.setList(artList);
		return pc;
	}
	
	
	@Override
	public List<Article> search(String q){
		return artDao.search(q);
	}
	
	@Override
	public int deleteArtical(int artId){
		return artDao.deleteArtical(artId);
	}
	
	@Override
	public int UpdateArtical(int artId, String title, int userId, 
			int scgId, int cgId, String content, String summary) {
		return artDao.updateArticle(artId, title, userId, scgId, cgId, content, summary);
	}
	
	
	@Override
	public List<Article> getBycgIdorscgId(int cgId, int scgId, int artId){
		return artDao.getBycgIdorscgId(cgId, scgId, artId);
	}
	
	
	@Override
	public List<Article> topTenArticle(){
		return artDao.topTenArticle();
	}
	
	
	@Override
	public List<User> getActiveUser(int num){
		return artDao.getActiveUser(num);
	}
	
	@Override
	public Article getById(int id) {
		return  artDao.getById(id);
	}
	@Override
	public int updateCount(int artId) {
		// TODO Auto-generated method stub
		return artDao.updateCount(artId);
	}

	@Override
	public List<Article> getAllArtical() {
		// TODO Auto-generated method stub
		return artDao.getAllArtical();
	}
	

}
