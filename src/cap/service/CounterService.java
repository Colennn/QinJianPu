package cap.service;

import cap.bean.Counter;

public interface CounterService {
	/* 
	 * ��ȡ��վ���ʼ���
	 */
	public abstract Counter getCounter();
    /*
     * ������վ������
     */
	public abstract int setNum(int num);

}
