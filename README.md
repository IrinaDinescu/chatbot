# **Chatbot Project**

## **How to Run the Project**

### **1. Clone the Repository**

```sh
git clone git@github.com:IrinaDinescu/chatbot.git
cd chatbot
```

### **2. Choose How You Want to Run the Project**

#### **a) Run with Docker Compose**

This method runs the project inside a Docker container.

1. Check if Docker and Docker Compose are installed:

   ```sh
   docker --version
   docker-compose --version
   ```

2. Start the application with Docker Compose:

   ```sh
   docker compose up
   ```

---

#### **b) Run in Development Mode**

This mode is best for local development with hot-reloading.

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the application in dev mode:

   ```sh
   npm run dev
   ```

---

#### **c) Run in Production Mode**

This mode runs the app with Next.js optimizations.

1. Install dependencies:

   ```sh
   npm install
   ```

2. Build the application:

   ```sh
   npm run build
   ```

3. Start the production server:

   ```sh
   npm start
   ```

---

### **3. Access the Application**

Once running, you can access the app at:

- **Local:** [http://localhost:3000](http://localhost:3000)

---

### **4. Additional Notes**

- Ensure you have Node.js installed if running the project locally.
- If using Docker, remove any existing containers before restarting with:

  ```sh
  docker rm -f dirina_chatbot_container
  ```

- Stop the Docker container with:

  ```sh
  docker compose down
  ```

Enjoy! 🚀

---

![Chatbot Image](https://github.com/IrinaDinescu/chatbot/blob/main/assets/chatbot.png)

# 📌 **NOTES**

The file is read with the assumption that, in a stock exchange context, prices must always be up-to-date and should not be cached. If the file’s content were static, caching could have been used to prevent redundant reads. Instead, I’ve treated file reading as if retrieving real-time data from a database or an external service.
