package cap.dao;

import cap.bean.Counter;

public interface CounterDao {

	//��ȡ��վ���ʼ���	 
	public abstract Counter getCounter();

	public abstract int setNum(int num);

}