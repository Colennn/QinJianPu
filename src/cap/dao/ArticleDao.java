package cap.dao;

import java.util.List;

import cap.bean.Article;
import cap.bean.User;

public interface ArticleDao {

	public abstract List<User> getActiveUser(int num);

	public abstract List<Article> getByUserId(int userId);

	public abstract Article getById(int id);

	public abstract int insertArticle(String title, int userId, int scgId,
			int cgId, String content, String summary);

	public abstract int updateArticle(int artId, String title, int userId,
			int scgId, int cgId, String content, String summary);

	public abstract int deleteArtical(int artId);

	public abstract List<Article> getAllArtical();

	public abstract List<Article> search(String q);

	public abstract List<Article> getArticleByPage(int curPage, int size);

	public abstract List<Article> getArticleByPageUserId(int curPage, int size,
			int userId);

	public abstract List<Article> getBycgIdorscgId(int cgId, int scgId,
			int artId);

	public abstract List<Article> topTenArticle();

	public int updateCount(int artId);

	

}