package cap.mylikes;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.MatOfPoint2f;
import org.opencv.core.Point;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

public class test {

	// 阈值化
	public static Mat threshold(Mat inputMat) {

		Imgproc.cvtColor(inputMat, inputMat, Imgproc.COLOR_RGB2GRAY);// 灰度化
		Imgproc.threshold(inputMat, inputMat, 100, 255, Imgproc.THRESH_BINARY_INV);// 阈值化
		return inputMat;
	}

	// 膨胀，连通每个字符
	public static Mat myDilate(Mat inputMat) {

		Mat kernel = Imgproc.getStructuringElement(Imgproc.MORPH_CROSS, new Size(3, 3));
		Imgproc.dilate(inputMat, inputMat, kernel);
		return inputMat;
	}

	// 腐蚀
	public static Mat myErode(Mat inputMat) {

		Mat kernel = Imgproc.getStructuringElement(Imgproc.MORPH_CROSS, new Size(3, 3));
		Imgproc.erode(inputMat, inputMat, kernel, new Point(-1, -1), 1);
		return inputMat;
	}

	// 重设大小
	public static Mat myResize(Mat inputMat) {

		// 设置图片为1500宽度
		float width = 1500;
		float height = inputMat.height();
		height = height * width / inputMat.width();

		Imgproc.resize(inputMat, inputMat, new Size(width, height));
		return inputMat;
	}

	// 按行切割
	public static List<Mat> horizontalProjection(Mat inputMat) {

		int height = inputMat.height();// 图片的高度
		int width = inputMat.width();// 长度

		double[] pixelValue = null;// 获取的每个像素值
		int[] projectValArry = new int[height];// 存储每行的像素量

		// 如果该行有255像素的像素点，则记录下来ֵ
		for (int row = 0; row < height; row++) {
			for (int col = 0; col < width; col++) {
				pixelValue = inputMat.get(row, col);
				if (pixelValue[0] != 0)// 没有则跳过
					projectValArry[row]++;
			}
		}

		// 按照上面的得出的行信息绘制出每行的框框
		pixelValue[0] = 255; // 像素点为255
		Mat dst = new Mat(height, width, CvType.CV_8UC1);
		for (int row = 0; row < height; row++) {
			for (int col = 0; col < projectValArry[row]; col++) {
				dst.put(row, col, pixelValue[0]);
			}
		}

		// 按行切割
		List<Mat> rowsImgsList = new ArrayList();
		Mat rowsImg = null;
		int rowsNum = 0;
		Scalar color = new Scalar(255, 0, 0);
		// 获取每行的top,bottom
		for (int row = 0; row < height; row++) {
			pixelValue = dst.get(row, 0);
			if (pixelValue[0] != 0) {
				int top = row;
				// System.out.println("top:" + row);
				for (row = top; row < height; row++) {
					pixelValue = dst.get(row, 0);
					if (pixelValue[0] == 0) {
						// 获得底部
						int bottom = row;
						Imgproc.rectangle(dst, new Point(0, top), new Point(width, bottom), color);
						// System.out.println("bottom:" + row);
						Rect rect = new Rect(0, top, width, bottom - top);// 得出rect
						rowsImg = new Mat(inputMat, rect);// 单行
						rowsImgsList.add(rowsNum, rowsImg);// 存入集合中
						rowsNum++;
						break;
					}
				}
			}
		}

		return rowsImgsList;
	}

	// 找轮廓
	public static Mat myFindContours(Mat inputMat) {

		List contours = new ArrayList<MatOfPoint>();
		Mat hierarchy = new Mat();
		Mat temp = new Mat();
		String text;
		Imgproc.findContours(inputMat, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);
		// 轮廓
		Collections.reverse(contours);
		// 找轮廓
		Scalar color = new Scalar(255, 255, 255);
		for (int i = 0; i < contours.size(); i++) {
			// 画框框
			Rect rect = Imgproc.boundingRect((MatOfPoint) contours.get(i));
			Imgproc.rectangle(inputMat, rect.tl(), rect.br(), color);

			// 显示框框坐标信息
			// text = rect.x + " " + rect.y;
			// Imgproc.putText(inputMat, text, rect.tl(), Core.FONT_HERSHEY_SIMPLEX,
			// 0.25,color);

			// 分割
			// Mat roi= new Mat(inputMat, rect);
			// roi.convertTo(temp, roi.type());
			// System.out.println(text);
		}
		return inputMat;
	}

	// tess4j配置
	public static String ocrWithMat(Mat inputMat) {
		ITesseract instance = new Tesseract();

		// 项目的根目录路径
		String nodepath = test.class.getClassLoader().getResource("/").getPath();
		String filePath = nodepath.substring(1, nodepath.length() - 16);

		instance.setDatapath(filePath + "tessdata");

		instance.setLanguage("chi_sim"); // 选择语言库
		BufferedImage bi = new MatToBufImg(inputMat, ".png").getImage();
		String result = null;

		try {
			result = instance.doOCR(bi);
		} catch (TesseractException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	public static String getOcrResult(String imageFilePath) {
		// System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
		System.load("C:\\OpenCV\\opencv\\build\\java\\x64\\opencv_java330.dll");
		Mat src = Imgcodecs.imread(imageFilePath);
		String result = "";

		// 对图片进行预处理
		src = threshold(src);// 阈值化
		src = myResize(src);// 重设大小

		// 将图片分割存储
		List<Mat> rowsImgsList = horizontalProjection(src);
		for (Mat rowsImg : rowsImgsList) {
			// 显示切割后图片
			// ShowImage window = new ShowImage(rowsImg);
			// window.getFrame().setVisible(true);
			String rowResult = ocrWithMat(rowsImg);
			// System.out.println(rowResult);
			result = result + rowResult + "_@";
		}
		
		result = result.replaceAll("\n","");
		System.out.println(result);

		return result;
	}
}