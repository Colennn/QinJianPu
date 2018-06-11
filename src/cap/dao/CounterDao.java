package cap.dao;

import cap.bean.Counter;

public interface CounterDao {

	//获取网站访问计数	 
	public abstract Counter getCounter();

	public abstract int setNum(int num);

}