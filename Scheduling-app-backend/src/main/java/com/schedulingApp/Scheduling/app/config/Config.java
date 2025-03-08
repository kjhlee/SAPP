package com.schedulingApp.Scheduling.app.config;

import io.github.cdimascio.dotenv.Dotenv;


public class Config {
    private static final Dotenv dotenv = Dotenv.configure()
            .directory("./") // Ensure it looks for .env in the root directory
            .ignoreIfMissing() // Prevents failure if .env is missing
            .load();

    public static String get(String key) {
        return dotenv.get(key);
    }

    public static void main(String[] args) {
        System.out.println("DB_URL: " + get("DB_URL"));
        System.out.println("DB_USERNAME: " + get("DB_USERNAME"));
        System.out.println("DB_PASSWORD: " + get("DB_PASSWORD"));
    }
}

