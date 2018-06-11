package cap.bean;

public class SysCategory {
	private int id;
	private String categoryName;
	private int articles;
	private int isDelete;
	
	public int getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(int isDelete) {
		this.isDelete = isDelete;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public int getArticles() {
		return articles;
	}
	public void setArticles(int articals) {
		this.articles = articals;
	}
	
}
