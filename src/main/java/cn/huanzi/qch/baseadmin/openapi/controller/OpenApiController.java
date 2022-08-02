package cn.huanzi.qch.baseadmin.openapi.controller;

import cn.huanzi.qch.baseadmin.common.pojo.Result;
import cn.huanzi.qch.baseadmin.openapi.service.OpenApiService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.hutool.core.img.gif.AnimatedGifEncoder;
import cn.hutool.core.img.gif.GifDecoder;
import cn.hutool.core.io.FileUtil;
import org.springframework.core.io.Resource;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/openApi/")
public class OpenApiController {

    @Autowired
    private OpenApiService openApiService;

    /**
     * 通过此类获得springboot的resources下的内容
     */
    @Autowired
    private ResourceLoader resourceLoader;

    @SneakyThrows
    @GetMapping("test")
    public Result<String> test() {
        byte[] bytes = makeImage("hello", "你好");

        FileUtil.writeBytes(bytes,"D:\\test\\aa.gif");
        
        return openApiService.test();
        
    }


    public Result<String> mongoTest(String[] args) {


        List a=new ArrayList();

        /*for (int i = 0; i < 2; i++) {

            User user = new User();

            user.setId(i+1L);
            user.setAge(12);
            user.setName("你好");

            a.add(user);

        }



        userRepository.saveAll(a);*/

        return openApiService.test();
    }


    public  byte[] makeImage(String left,String right) throws IOException {
        AnimatedGifEncoder encoder= new AnimatedGifEncoder();
        Resource resource = resourceLoader.getResource("classpath:static/img/kedaya.gif");
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        encoder.start(outputStream);
        encoder.setRepeat(0);
        encoder.setDelay(200);

        GifDecoder decoder = new GifDecoder();
        decoder.read(resource.getInputStream());
        int count = decoder.getFrameCount();
        for (int i = 0; i < count; i++) {
            BufferedImage frame = decoder.getFrame(i);
            Graphics2D graphics = frame.createGraphics();
//            graphics.setFont(new Font("微软雅黑", Font.PLAIN, 30));
            graphics.setFont(new Font("宋体", Font.BOLD, 30));
            graphics.setColor(new Color(0));

            switch (i) {
                case 0:
                    rotate(left, graphics, 40, 110, -5);
                    break;
                case 1:
                    rotate(left, graphics, 40, 104, -5.1);
                    break;
                case 2:
                    rotate(left, graphics, 40, 90, -5.1);
                    break;
                case 4:
                    rotate(right, graphics, 320, 71, 8.1);
                    break;
                case 5:
                    rotate(right, graphics, 320, 85, 11.1);
                    break;
                case 6:
                    rotate(right, graphics, 320, 81, 10.1);
                    break;
                case 7:
                    rotate(right, graphics, 320, 84, 11.1);
                    break;
                case 8:
                    rotate(right, graphics, 325, 71, 11.1);
                    break;
                case 9:
                    rotate(right, graphics, 320, 75, 8.8);
                    break;
                case 10:
                    rotate(right, graphics, 320, 72, 8.8);
                    break;
                case 11:
                    rotate(right, graphics, 320, 75, 6);
                    break;
                case 13:
                    rotate(left, graphics, 56, 105, -5.1);
                    break;
                case 14:
                    rotate(left, graphics, 55, 100, -5.1);
                    break;
                case 15:
                    rotate(left, graphics, 66, 105, -3.1);
                    break;
                case 16:
                    rotate(left, graphics, 60, 100, -5.1);
                    break;
                case 17:
                    rotate(left, graphics, 56, 100, -5.1);
                    break;
                default:
                    break;
            }
            encoder.addFrame(frame);
//            ImageIO.write(frame, "png", new File("out/"+i+".png"));

        }
        encoder.finish();
        return outputStream.toByteArray();


    }
    private   void rotate(String text, Graphics2D graphics, int x, int y , double angle){
        graphics.translate(x, y);
        graphics.rotate((Math.PI/180)*angle);
        graphics.drawString(text,0,0);
//        Rectangle2D barra=new Rectangle2D.Double(0, 0, 700, 500);
//        graphics.draw(barra);
    }
    
}
