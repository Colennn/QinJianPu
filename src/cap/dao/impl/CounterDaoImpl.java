package cap.dao.impl;


import java.sql.ResultSet;
import java.sql.SQLException;

import cap.bean.Counter;
import cap.dao.CounterDao;
import cap.db.DBPool;

public class CounterDaoImpl implements CounterDao {
	
	//获取网站访问计数	 
	
	@Override
	public Counter getCounter() {
		Counter cnt = null;
		ResultSet rs = null;
		DBPool dbc=new DBPool();
		try {
			String sql="select * from counter where id=1";
			cnt = new Counter();
			rs=dbc.doQueryRS(sql, new Object[]{});
			if (rs.next()) {
				cnt.setCount(rs.getInt("num"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return cnt;
	}

	@Override
	public int setNum(int num) {
		int res = -1;
		DBPool dbc=new DBPool();
		try {
			String sql="update counter set num=? where id=1";
			res=dbc.doUpdate(sql, new Object[]{num});
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return res;
	}
}
