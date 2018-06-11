package cap.mylikes;

import java.awt.Component;
import java.awt.image.BufferedImage;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;

import org.opencv.core.Mat;

public class ShowImage {    
	  
    private JFrame frame;    
    
    /**  
     * Create the application.  
     */    
    public ShowImage(Mat mat) {    
        initialize(mat);    
    }    
    
    public JFrame getFrame() {  
        return frame;  
    }  
    /**  
     * Initialize the contents of the frame.  
     */    
    private void initialize(Mat mat) {    
        frame = new JFrame();    
        frame.setBounds(20, 100, mat.width()+20, mat.height()+45);    
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);    
        frame.getContentPane().setLayout(null);             
        BufferedImage image=new MatToBufImg(mat, ".png").getImage();    
        JLabel label = new JLabel(""){  
            @Override  
            public void setLabelFor(Component c) {  
                // TODO Auto-generated method stub  
                super.setLabelFor(c);  
            }  
        };    
        label.setBounds(0, 0, mat.width(), mat.height());  
        frame.getContentPane().add(label);    
        label.setIcon(new ImageIcon(image));    
    }    
    
}  