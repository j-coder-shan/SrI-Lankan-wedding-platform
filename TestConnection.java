
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestConnection {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5435/wedding_analytics";
        String user = "postgres";
        String password = "1234";

        System.out.println("Testing connection to: " + url);
        System.out.println("User: " + user);
        System.out.println("Password: " + password);

        try {
            // Calculate wait time or logic if needed, but DriverManager is standard
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("SUCCESS: Connection established!");
            conn.close();
        } catch (SQLException e) {
            System.out.println("FAILURE: Could not connect.");
            e.printStackTrace();

            // Check if it's the database name issue
            if ("3D000".equals(e.getSQLState())) {
                System.out.println(
                        "HINT: Database 'wedding_analytics' might not exist. Try connecting to 'postgres' db.");
            }
        }
    }
}
