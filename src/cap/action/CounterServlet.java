package cap.action;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import cap.bean.Counter;
import cap.service.CounterService;
import cap.service.impl.CounterServiceImpl;


@WebServlet("/counter.html")
public class CounterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private CounterService counterService;   
 
    public CounterServlet() {
    	counterService=new CounterServiceImpl();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Counter counter=counterService.getCounter();
		//request.setAttribute("counter", counter);
		PrintWriter out=response.getWriter();
		out.print(counter.getCount());
        out.close();
	}

}
