package cap.bean;

public class User {
	private int id;
	private String email;
	private String userName;
	private int isApplied;
	private int isDelete;
	private int isProfile;
	
	public int getIsProfile() {
		return isProfile;
	}
	public void setIsProfile(int isProfile) {
		this.isProfile = isProfile;
	}
	public int getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(int isDelete) {
		this.isDelete = isDelete;
	}
	public int getIsApplied() {
		return isApplied;
	}
	public void setIsApplied(int isApplied) {
		this.isApplied = isApplied;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}

}
