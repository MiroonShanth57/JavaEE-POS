import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
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
        try {

            resp.setContentType("application/json");

            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/JavaEEPOS","root","1234");
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


        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json");

        String customer_id = req.getParameter("Customer Id");
        String customer_name = req.getParameter("Customer Name");
        String customer_address = req.getParameter("Customer Address");
        String customer_number = req.getParameter("Number");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/JavaEEPOS","root","1234");
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


        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String customer_id = req.getParameter("Customer Id");
        String customer_name = req.getParameter("Customer Name");
        String customer_address = req.getParameter("Customer Address");
        String number = req.getParameter("Contuct_Number");

        System.out.println(customer_id + "--"+customer_name+"--" +customer_address+"--"+number);


        try {


            resp.setContentType("application/json");
            resp.addHeader("Shop","MK");


            Class.forName("com.mysql.jdbc.Driver");
            Connection connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/AppOne","root", "1234");
            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE Customer SET Customer_Name=?, Customer_Address=?, Contuct_Number=? WHERE Id=?");

            preparedStatement.setObject(4,customer_id);
            preparedStatement.setObject(1,customer_name);
            preparedStatement.setObject(2,customer_address);
            preparedStatement.setObject(3,number);

            boolean AddCustomer=preparedStatement.executeUpdate()>0;

            PrintWriter writer = resp.getWriter();

            if (AddCustomer){
                writer.write("Successfully Updated Your Customer Details");
            }else {
                writer.write("Try Again...");
            }


        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }



    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String customer_id=req.getParameter("CusID");
        System.out.println(customer_id);
        resp.setContentType("application/json");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/JavaEEPOS?useSSL=false","root", "1234");
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

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }

    }
}
