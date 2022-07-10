package Servlet;

import org.apache.commons.dbcp2.BasicDataSource;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet(urlPatterns = "/Item")
public class ItemServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ServletContext servletContext = req.getServletContext();
        BasicDataSource basicDataSource = (BasicDataSource) servletContext.getAttribute("basicDataSource");

        try {

            resp.setContentType("application/json");

            Connection connection = basicDataSource.getConnection();
            ResultSet resultSet = connection.prepareStatement("SELECT * FROM Item").executeQuery();

            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();


            while (resultSet.next()) {

                String code = resultSet.getString(1);
                String name = resultSet.getString(2);
                String quantity = resultSet.getString(3);
                String price = resultSet.getString(4);

                System.out.println(code+"==="+name+"==="+quantity+"==="+price);

                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

                objectBuilder.add("code",code);
                objectBuilder.add("name",name);
                objectBuilder.add("quantity",quantity);
                objectBuilder.add("price",price);



                arrayBuilder.add(objectBuilder.build());
            }

            PrintWriter writer=resp.getWriter();
            writer.print(arrayBuilder.build());


        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = req.getServletContext();
        BasicDataSource basicDataSource = (BasicDataSource) servletContext.getAttribute("basicDataSource");

        resp.setContentType("application/json");

        String Item_Code = req.getParameter("ItemCode");
        String Item_Name = req.getParameter("ItemName");
        String Item_Quantity = req.getParameter("ItemQuantity");
        String Item_Price = req.getParameter("Price");

        try {
            Connection connection = basicDataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO Item VALUE (?,?,?,?)");

            preparedStatement.setObject(1,Item_Code);
            preparedStatement.setObject(2,Item_Name);
            preparedStatement.setObject(3,Item_Quantity);
            preparedStatement.setObject(4,Item_Price);

            boolean AddCustomer = preparedStatement.executeUpdate()>0;

            PrintWriter writer = resp.getWriter();

            if(AddCustomer){
                writer.write("Successfully Added Your Customer");
            }else {
                writer.write("Try Again...");
            }


        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ServletContext servletContext = req.getServletContext();
        BasicDataSource basicDataSource = (BasicDataSource) servletContext.getAttribute("basicDataSource");

        String Item_Code=req.getParameter("ItemCode");
        System.out.println(Item_Code);
        resp.setContentType("application/json");

        try {
            Connection connection = basicDataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM Item WHERE Item_Code=?");

            preparedStatement.setObject(1,Item_Code);

            boolean DeleteCustomer=preparedStatement.executeUpdate()>0;

            PrintWriter writer = resp.getWriter();

            if (DeleteCustomer){
                writer.write("Successfully Delete Your Customer");
                System.out.println("Done");
            }else {
                writer.write("Try Again...");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }




    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = req.getServletContext();
        BasicDataSource basicDataSource = (BasicDataSource) servletContext.getAttribute("basicDataSource");

        String Item_Code = req.getParameter("ItemCode");
        String Item_Name = req.getParameter("ItemName");
        String Item_Quantity = req.getParameter("ItemQuantity");
        String Item_Price = req.getParameter("Price");

        System.out.println(Item_Code + "--"+Item_Name+"--" +Item_Quantity+"--"+Item_Price);


        try {


            resp.setContentType("application/json");
            resp.addHeader("Shop","MK");


            Connection connection = basicDataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE Item SET Item_Name=?, Quantity=?, Price=? WHERE Item_=?");

            preparedStatement.setObject(4,Item_Code);
            preparedStatement.setObject(1,Item_Name);
            preparedStatement.setObject(2,Item_Quantity);
            preparedStatement.setObject(3,Item_Price);

            boolean AddCustomer=preparedStatement.executeUpdate()>0;

            PrintWriter writer = resp.getWriter();

            if (AddCustomer){
                writer.write("Successfully Updated Your Customer Details");
            }else {
                writer.write("Try Again...");
            }


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }
}
