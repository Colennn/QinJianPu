package cap.util;
import java.util.List;
public class PageControl {
	private int curPage = 1;
	private int pageSize;
	private int totalRows;
	private int totalPages;	
	private List list;//用于存放分页数据
	
	public PageControl(String curPageStr, int totalRows) {
		
		if (null != curPageStr) {
			this.curPage = Integer.parseInt(curPageStr);    //初始化当前页数
		}		
		this.totalRows = totalRows;							//初始化总行数		
		this.pageSize=10;//设置每页显示的记录数
		
		//计算总页数
		this.totalPages = (this.totalRows / this.pageSize) + ((this.totalRows % this.pageSize) > 0 ? 1 : 0);
		
	}
	

	public List getList() {
		return list;
	}

	public int getCurPage() {
		return curPage;
	}


	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}


	public int getPageSize() {
		return pageSize;
	}


	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}


	public int getTotalPages() {
		return totalPages;
	}


	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}


	public void setList(List list) {
		this.list = list;
	}
	
	
}
