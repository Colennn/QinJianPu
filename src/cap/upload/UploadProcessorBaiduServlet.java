package cap.upload;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONArray;
import org.json.JSONObject;

import com.baidu.aip.ocr.AipOcr;

import cap.mylikes.test;

public class UploadProcessorBaiduServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	// 保存文件的目录
	private static String PATH_FOLDER = "/";
	// 存放临时文件的目录
	private static String TEMP_FOLDER = "/";
	
	//设置APPID/AK/SK
    public static final String APP_ID = "11367559";
    public static final String API_KEY = "x6Gn2KkQXm7FQzz6abihxd7U";
    public static final String SECRET_KEY = "egD3kos55QhGO7HyLNcEtrrehbgUZIK4";

	@Override
	public void init(ServletConfig config) throws ServletException {
		ServletContext servletCtx = config.getServletContext();
		// 初始化路径
		// 保存文件的目录
		PATH_FOLDER = servletCtx.getRealPath("/upload");
		// 存放临时文件的目录,存放xxx.tmp文件的目录
		TEMP_FOLDER = servletCtx.getRealPath("/uploadTemp");
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8"); // 设置编码
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=UTF-8");
		// 获得磁盘文件条目工厂
		DiskFileItemFactory factory = new DiskFileItemFactory();

		// 如果没以下两行设置的话，上传大的 文件 会占用 很多内存，
		// 设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同
		/**
		 * 原理 它是先存到 暂时存储室，然后在真正写到 对应目录的硬盘上， 按理来说 当上传一个文件时，其实是上传了两份，第一个是以 .tem 格式的
		 * 然后再将其真正写到 对应目录的硬盘上
		 */
		factory.setRepository(new File(TEMP_FOLDER));
		// 设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室
		factory.setSizeThreshold(1024 * 1024);

		// 高水平的API文件上传处理
		ServletFileUpload upload = new ServletFileUpload(factory);

		try {
			// 提交上来的信息都在这个list里面
			// 这意味着可以上传多个文件
			// 请自行组织代码
			List<FileItem> list = upload.parseRequest(request);
			// 获取上传的文件
			FileItem item = getUploadFileItem(list);
			// 获取文件名
			String filename = getUploadFileName(item);
			// 保存后的文件名
			String saveName = new Date().getTime() + filename.substring(filename.lastIndexOf("."));
			// 保存后图片的浏览器访问路径
			String picUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
					+ request.getContextPath() + "/upload/" + saveName;

			System.out.println("存放目录:" + PATH_FOLDER);
			System.out.println("文件名:" + filename);
			System.out.println("浏览器访问路径:" + picUrl);
			
			// 真正写到磁盘上
			item.write(new File(PATH_FOLDER, saveName)); // 第三方提供的
			
			//百度图像API，初始化一个AipOcr
			AipOcr client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);
			//调用接口
			String tempPATH_FOLDER = PATH_FOLDER.replaceAll("\\\\", "\\\\\\\\");
			tempPATH_FOLDER = tempPATH_FOLDER + "\\\\" + saveName;
			JSONObject res = client.basicGeneral(tempPATH_FOLDER, new HashMap<String, String>());
			//控制台输入获取的JSON
			System.out.println(res.toString(2));
			//对json进行操作
			JSONArray word = res.getJSONArray("words_result");// 找到word_result的json数组
			String result = "";
			for (int i = 0; i < word.length(); i++) {  
                JSONObject info = word.getJSONObject(i);// 获取word数组的第i个json对象  
                System.out.println("word:"+info.get("words").toString());
                result = result +info.get("words").toString() + "_@";
            }  
			
			//向服务端AJAX发送消息
			PrintWriter writer = response.getWriter();
			writer.print("{");
			writer.print("msg:\"文件大小:" + item.getSize() + ",文件名:" + filename + "\"");
			writer.print(",picUrl:\"" + result + "\"");
			writer.print("}");
			writer.close();
			
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
		}

	}

	private FileItem getUploadFileItem(List<FileItem> list) {
		for (FileItem fileItem : list) {
			if (!fileItem.isFormField()) {
				return fileItem;
			}
		}
		return null;
	}

	private String getUploadFileName(FileItem item) {
		// 获取路径名
		String value = item.getName();
		// 索引到最后一个反斜杠
		int start = value.lastIndexOf("/");
		// 截取 上传文件的 字符串名字，加1是 去掉反斜杠，
		String filename = value.substring(start + 1);

		return filename;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doGet(request, response);
	}

}
