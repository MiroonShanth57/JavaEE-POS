package Listeners;

import org.apache.commons.dbcp2.BasicDataSource;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.sql.SQLException;

@WebListener
public class MyListeners implements ServletContextListener{

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("contextInitialized");

        BasicDataSource basicDataSource = new BasicDataSource();

        basicDataSource.setDriverClassName("com.mysql.jdbc.Driver");
        basicDataSource.setUrl("jdbc:mysql://localhost:3306/AppOne?useSSL=false");
        basicDataSource.setUsername("root");
        basicDataSource.setPassword("1234");

        basicDataSource.setMaxTotal(5);
        basicDataSource.setInitialSize(5);



        ServletContext servletContext = servletContextEvent.getServletContext();
        servletContext.setAttribute("basicDataSource",basicDataSource);
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {


        try {


            ServletContext servletContext = servletContextEvent.getServletContext();
            BasicDataSource basicDataSource = (BasicDataSource) servletContext.getAttribute("basicDataSource");
            basicDataSource.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }
}
