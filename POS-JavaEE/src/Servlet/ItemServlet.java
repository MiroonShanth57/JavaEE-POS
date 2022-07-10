package Servlet;

import org.apache.commons.dbcp2.BasicDataSource;

import javax.json.*;
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

        String code = req.getParameter("code");
        String name = req.getParameter("name");
        String quantity = req.getParameter("quantity");
        String price = req.getParameter("price");

        try {
            Connection connection = basicDataSource.getConnection();

            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO Item VALUE (?,?,?,?)");

            preparedStatement.setObject(1,code);
            preparedStatement.setObject(2,name);
            preparedStatement.setObject(3,quantity);
            preparedStatement.setObject(4,price);

            boolean AddItem = preparedStatement.executeUpdate()>0;

            PrintWriter writer = resp.getWriter();

            if(AddItem){
                writer.write("Successfully Added Your Item");
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

        String item_code=req.getParameter("code");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");



        try {
            Connection connection = basicDataSource.getConnection();

            PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM Item WHERE Item_Code=?");

            preparedStatement.setObject(1,item_code);

            boolean DeleteItem=preparedStatement.executeUpdate()>0;


            if (DeleteItem){
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                writer.print(objectBuilder.build());

                writer.write("Successfully Delete Your Item");
                System.out.println("Done");
            }else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                writer.print(objectBuilder.build());

                writer.write("Try Again...");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("I am Working");

        ServletContext servletContext = req.getServletContext();
        BasicDataSource basicDataSource = (BasicDataSource) servletContext.getAttribute("basicDataSource");

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        String code = jsonObject.getString("code");
        String name = jsonObject.getString("name");
        String quantity = jsonObject.getString("quantity");
        String price = jsonObject.getString("price");

        PrintWriter writer=resp.getWriter();
        System.out.println(code + "--"+name+"--" +quantity+"--"+price);

        resp.setContentType("application/json");
        try {




            Connection connection = basicDataSource.getConnection();

            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE Item SET Item_Name=?, Quantity=?, Price=? WHERE Item_Code=?");

            preparedStatement.setObject(1,code);
            preparedStatement.setObject(2,name);
            preparedStatement.setObject(3,quantity);
            preparedStatement.setObject(4,price);

            boolean AddItem=preparedStatement.executeUpdate()>0;


            if (AddItem){
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                writer.print(objectBuilder.build());

                writer.write("Successfully Updated Your Item Details");
            }else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                writer.print(objectBuilder.build());

                writer.write("Try Again...");
            }


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }

}
