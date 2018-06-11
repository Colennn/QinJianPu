package cap.dao.impl;
import java.sql.ResultSet;
import java.sql.SQLException;

import cap.bean.Admin;
import cap.dao.AdminDao;
import cap.db.DBPool;
public class AdminDaoImpl implements AdminDao {


	@Override
	public Admin login(String userName, String passWord) {
		Admin admin = null;

		ResultSet rs = null;
		DBPool dbc=new DBPool();
		try {		
			String sql="select * from s_admin where username=? and password=?";
			rs=dbc.doQueryRS(sql, new Object[]{userName,passWord});
			if (rs.next()) {
				admin = new Admin();
				admin.setId(rs.getInt("id"));
				admin.setUserName(rs.getString("username"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbc.close();
		}
		
		return admin;
	}
	
}
