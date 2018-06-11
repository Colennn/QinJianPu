package cap.service;

import cap.bean.Counter;

public interface CounterService {
	/* 
	 * 获取网站访问计数
	 */
	public abstract Counter getCounter();
    /*
     * 设置网站访问数
     */
	public abstract int setNum(int num);

}
