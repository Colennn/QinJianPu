package cap.bean;

public class Category {
	private int id;
	private int userId;
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
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
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
