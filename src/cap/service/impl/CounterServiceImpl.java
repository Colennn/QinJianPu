package cap.service.impl;

import cap.bean.Counter;
import cap.dao.CounterDao;
import cap.dao.impl.CounterDaoImpl;
import cap.service.CounterService;

public class CounterServiceImpl implements CounterService {
	private CounterDao counterDao;
	

	public CounterServiceImpl() {
		counterDao=new CounterDaoImpl();
	}

	@Override
	public Counter getCounter() {
		
		return counterDao.getCounter();
	}

	@Override
	public int setNum(int num) {
		
		return counterDao.setNum(num);
	}

}
