package com.wedding.SearchService;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;


public class MongoConnectionTest {

    public static void main(String[] args) {
        String uri = "mongodb+srv://anukaakshana_db_user:g1uVvC7vn8eex0zx@cluster0.bbzli6b.mongodb.net/wedease_search_db?retryWrites=true&w=majority";

        System.out.println("Testing MongoDB Atlas connection...");
        System.out.println("URI: " + uri.replaceAll(":[^:@]+@", ":****@")); // Hide password in output

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("wedease_search_db");

            Document serverStatus = database.runCommand(new Document("ping", 1));

            System.out.println("✅ SUCCESS! Connected to MongoDB Atlas");
            System.out.println("Database: " + database.getName());
            System.out.println("Server response: " + serverStatus.toJson());

            System.out.println("\nAvailable collections:");
            for (String collectionName : database.listCollectionNames()) {
                System.out.println("  - " + collectionName);
            }

        } catch (Exception e) {
            System.err.println("❌ FAILED! Could not connect to MongoDB Atlas");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
