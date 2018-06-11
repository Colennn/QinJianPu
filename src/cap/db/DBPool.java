package cap.db;

import java.sql.*;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;


public class DBPool {
	private String jndiName = "java:comp/env/jdbc/blog";
	private Connection conn = null;

	public DBPool() {

	}

	public DBPool(String jndiName) {
		this.jndiName = jndiName;
	}

	public Connection getConnection() {
		try {
			InitialContext context = new InitialContext();
			DataSource ds = (DataSource) context.lookup(jndiName);
			conn = ds.getConnection();
		} catch (NamingException e) {			
			e.printStackTrace();
		} catch (SQLException e) {			
			e.printStackTrace();
		}
		return conn;
	}

	public ResultSet doQueryRS(String sql, Object[] params) throws SQLException {
		conn = this.getConnection();
		PreparedStatement pstmt = conn.prepareStatement(sql);
		for (int i = 0; i < params.length; i++) {
			pstmt.setObject(i + 1, params[i]);
		}
		ResultSet rs = pstmt.executeQuery();
		
		return rs;
	}
	

	public int doUpdate(String sql, Object[] params) throws SQLException {
		conn = this.getConnection();
		PreparedStatement pstmt = conn.prepareStatement(sql);
		for (int i = 0; i < params.length; i++) {
			pstmt.setObject(i + 1, params[i]);
		}
		int res = pstmt.executeUpdate();
		if(conn!=null) conn.close();
		return res;
	}

	public void close()  {
		try {
			if(conn!=null) conn.close();
		} catch (Exception e) {
			System.out.print(e.getMessage());
		}
		
	}

}
 