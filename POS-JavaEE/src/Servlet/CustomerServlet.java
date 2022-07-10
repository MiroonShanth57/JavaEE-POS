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


@WebServlet(urlPatterns = "/Customer")
public class CustomerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("I am Get");

        ServletContext servletContext = req.getServletContext();
        BasicDataSource basicDataSource = (BasicDataSource) servletContext.getAttribute("basicDataSource");


        try {

            resp.setContentType("application/json");

            Connection connection = basicDataSource.getConnection();

            ResultSet resultSet = connection.prepareStatement("SELECT * FROM Customer").executeQuery();

            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();


            while (resultSet.next()) {

                String id = resultSet.getString(1);
                String name = resultSet.getString(2);
                String address = resultSet.getString(3);
                String number = resultSet.getString(4);

                System.out.println(id+"==="+name+"==="+address+"==="+number);

                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

                objectBuilder.add("id",id);
                objectBuilder.add("name",name);
                objectBuilder.add("address",address);
                objectBuilder.add("number",number);



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

        String customer_id = req.getParameter("customerID");
        String customer_name = req.getParameter("customerName");
        String customer_address = req.getParameter("customerAddress");
        String customer_number = req.getParameter("customerNumber");

        try {
            Connection connection = basicDataSource.getConnection();

            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO Customer VALUE (?,?,?,?)");

            preparedStatement.setObject(1,customer_id);
            preparedStatement.setObject(2,customer_name);
            preparedStatement.setObject(3,customer_address);
            preparedStatement.setObject(4,customer_number);

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
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("hekkkk");
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("I am Working");

        ServletContext servletContext = req.getServletContext();
        BasicDataSource basicDataSource = (BasicDataSource) servletContext.getAttribute("basicDataSource");

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();


        String customer_id = jsonObject.getString("id");
        String customer_name = jsonObject.getString("name");
        String customer_address = jsonObject.getString("address");
        String number = jsonObject.getString("number");

        PrintWriter writer=resp.getWriter();
        System.out.println(customer_id + "--"+customer_name+"--" +customer_address+"--"+number);

        resp.setContentType("application/json");
        try {




            Connection connection = basicDataSource.getConnection();

            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE Customer SET Customer_Name=?, Customer_Address=?, Contuct_Number=? WHERE Customer_Id=?");

            preparedStatement.setObject(1,customer_name);
            preparedStatement.setObject(2,customer_address);
            preparedStatement.setObject(3,number);
            preparedStatement.setObject(4,customer_id);

            boolean AddCustomer=preparedStatement.executeUpdate()>0;


            if (AddCustomer){
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                writer.print(objectBuilder.build());

                writer.write("Successfully Updated Your Customer Details");
            }else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                writer.print(objectBuilder.build());

                writer.write("Try Again...");
            }


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }







    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ServletContext servletContext = req.getServletContext();
        BasicDataSource basicDataSource = (BasicDataSource) servletContext.getAttribute("basicDataSource");

        String customer_id=req.getParameter("CusID");
        System.out.println(customer_id);
        resp.setContentType("application/json");

        try {
            Connection connection = basicDataSource.getConnection();

            PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM Customer WHERE Id=?");

            preparedStatement.setObject(1,customer_id);

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
}
