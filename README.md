## 🛠️ Tech Stack

This project is built using the MERN stack (MongoDB, Express, React, Node.js) and is supercharged with Google's AI and Authentication services.



### Frontend

* **Core:** **React** (A JavaScript library for building user interfaces)
* **Routing:** **React Router** (For client-side routing and navigation)
* **Styling:** **Tailwind CSS** (A utility-first CSS framework for rapid UI development)
* **UI Components:** **Shadcn/UI** (For accessible, beautifully designed components like toasts and buttons)
* **Authentication:** **@react-oauth/google** (The Google Identity Services library to handle the client-side authentication flow)
* **HTTP Client:** **Axios** (A promise-based HTTP client for making requests to the backend API)

### Backend

* **Runtime:** **Node.js** (A JavaScript runtime environment)
* **Framework:** **Express.js** (A minimal and flexible web application framework for building the API)
* **Google AI:** **@google/genai** (The official SDK to access Google's generative AI models)
* **Google APIs:** **googleapis** (The official Node.js client library to securely interact with Google APIs, e.g., verifying auth tokens)
* **Database ODM:** **Mongoose** (An elegant Object Data Modeling (ODM) library for MongoDB)

### Database

* **Database:** **MongoDB** (A NoSQL, document-oriented database to store application data)

### Data & Content

* **Formatting:** **Markdown** (Used to format and render data within the application)



# Project Setup and Run

## 📋 Prerequisites

Before you begin, make sure you have:

* An AWS account with EC2 access
* A full-stack application (`Express.js` backend + `Vite` frontend) imported from this repo <https://github.com/yeyaansh/AI-Email-Classifier>
* A Google Cloud account
* A MongoDB Atlas database connection string
* Basic command line knowledge
* A domain name (optional—you can add this later)

---

## 🔑 Part 1: Get Google Credentials

This part covers how to get your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to access Google Services via API.

1.  Visit the **[Google Cloud Console](https://console.cloud.google.com/)**.
2.  If you are new, create an account.
3.  Under the ‘Quick access’ section, click on **API & Services**.
4.  If you do not have a project, create one:
    * Click **Create Project**.
    * Name your project and click **Create**.
    * Select the project you just created from the top navigation bar.
5.  In the left-hand menu, navigate to the **OAuth consent screen**.
6.  **User Type:** Select **External**.
    * This will require app verification by Google for production use, but it allows you to add test users immediately.
7.  **App Information:**
    * Fill in the **App Name** (this is the name users will see).
    * Provide a **User support email**.
8.  **Contact Information:**
    * Add your email address under **Developer contact information**.
    * Click **Save and Continue** through the "Scopes" and "Optional Info" sections.
9.  **Test Users:**
    * On the **Test users** step, click **+ ADD USERS**.
    * Add the email addresses for all accounts you will use to test your application (limit 100).
    * Click **Save and Continue**, then click **Back to Dashboard**.
10. In the left-hand menu, click on **Credentials**.
11. At the top of the page, click **+ CREATE CREDENTIALS** and select **OAuth client ID**.
12. Configure the client ID:
    * **Application type:** Select **Web application**.
    * **Name:** Give it a descriptive name (e.g., "My App Web Client").
    * **Authorized JavaScript origins:** Add the URLs for your frontend.
        * `http://localhost:5173` (saying only your frontend is authorized to process login feature)
    * **Authorized redirect URIs:** Add the URLs your frontend will use.
        * `http://localhost:3000` (saying google should not send the authorization code other than this domain )
13. Click the **Create** button.
14. A modal will appear titled "OAuth client created".

    > **Warning:** You **must** download and save the credentials now. Click **DOWNLOAD JSON**. This file contains your `CLIENT_ID` and `CLIENT_SECRET`. You will not be able to download this file again after closing this modal.

15. Finally, enable the Gmail API.
    * In the left-hand menu, go to **Library**.
    * Search for **Gmail API**.
    * Click on it and then click the **Enable** button.

You are now done with the Google Cloud setup and have your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the downloaded JSON file.


# Part 2: AWS EC2 Instance Setup

### Step 1: Launch EC2 Instance

1.  Login to the **AWS Console** and navigate to the EC2 Dashboard.
2.  Click **"Launch Instance"**.
3.  Configure the following:
    * **Name:** `my-fullstack-app`
    * **Application and OS Images:** `Ubuntu Server 24.04 LTS (HVM) SSD Volume Type`
    * **Instance Type:** `t3.micro` (recommended) or `t2.micro` (free tier eligible)
    * **Key Pair:**
        1.  Click **"Create new key pair"**.
        2.  **Name:** `my-app-key` (or any name you prefer)
        3.  **Key pair type:** `RSA`
        4.  **Private key file format:** `.pem`
        5.  Click **"Create key pair"** and download the `.pem` file.

### Step 2: Configure Security Group

1.  **Network Settings** -> **Create new security group**:
    * **Security group name:** `my-app-security-group`
    * **Description:** `Security group for full-stack application`
2.  Add the following **Inbound Rules**:

| Type | Protocol | Port Range | Source | Description |
| :--- | :--- | :--- | :--- | :--- |
| SSH | TCP | 22 | Anywhere (0.0.0.0/0) | SSH access |
| HTTP | TCP | 80 | Anywhere (0.0.0.0/0) | Web traffic |
| HTTPS | TCP | 443 | Anywhere (0.0.0.0/0) | Secure web traffic |
| Custom TCP | TCP | 3000 | Anywhere (0.0.0.0/0) | Backend API |

### Step 3: Configure Storage

Keep the default settings:
* `8 GiB gp3 SSD` (sufficient for most applications)
* `3000 IOPS`
* `Not encrypted` (for simplicity)

### Step 4: Launch Instance

1.  Review your configuration and click **"Launch Instance"**.
2.  Wait 3-5 minutes for the instance to initialize.
3.  Note down the **Public IPv4 address** when available.

    


# Part 3: Connect to EC2 and Setup Environment

### Step 7: Setup SSH Key Permissions

On your **local machine**:

```bash
# Navigate to downloads folder ( or where you stored your .pem file)
cd ~/Downloads (Assuming..)

# Set correct permissions (VERY IMPORTANT!)
chmod 400 my-app-key.pem

# Optional: Move to secure location
mv my-app-key.pem ~/.ssh/

NOTE: replace my-app-key.pem with your downloaded .pem file
```

### Step 8: Connect to EC2 Instance


```bash
# Connect via SSH (replace with your actual IP)
ssh -i ~/.ssh/my-app-key.pem ubuntu@YOUR-EC2-PUBLIC-IP

# Example:
ssh -i ~/.ssh/my-app-key.pem ubuntu@65.0.99.148

# First connection will ask: "Are you sure you want to continue connecting?"
# Type: yes and press Enter
```

### Step 9: Update System and Install Dependencies


```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (latest LTS)
curl -fsSL [https://deb.nodesource.com/setup_20.x](https://deb.nodesource.com/setup_20.x) | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx (Web Server)
sudo apt install nginx -y

# Install Git
sudo apt install git -y

# Verify installations
node --version
npm --version
pm2 --version
nginx -v

```

----------

# Part 4: Deploy Your Application

### Step 10: Clone Your Repository


```bash
# Clone your GitHub repository
git clone https://github.com/yeyaansh/AI-Email-Classifier
cd AI-Email-Classifier

# List contents to verify
ls -la

```

### Step 11: Setup Client(Frontend)


```bash
# Navigate to server directory
cd client

# Install dependencies
npm install

# Create environment file
nano .env

```

Add your environment variables in `.env`
```Ini, TOML
VITE_GOOGLE_CLIENT_ID  = <CLIENT_ID_AVAILABLE_IN_DOWNLOADED_JSON>
```


> Save and exit: Press `Ctrl + X`, then `Y`, then `Enter`

### Step 11: Setup Client(Frontend) continue...
```bash
# Build your Frontend
npm run build
```



### Step 11: Setup Server (Backend)


```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
nano .env


```

Add your environment variables in `.env`:


```Ini, TOML

PORT  = 3000
MONGODB_URI  =  <YOUR_MONGODB_URI>
DATABASE_NAME  =  <YOUR_DATABASE_NAME>
GOOGLE_CLIENT_ID  = <CLIENT_ID_AVAILABLE_IN_DOWNLOADED_JSON>
GOOGLE_CLIENT_SECRET  = <CLIENT_SECRET_AVAILABLE_IN_DOWNLOADED_JSON>
JWT_SECRET_KEY  = <YOUR_CODE_THAT_CODE_WILL_BE_USED_TO_GENERATED_JWT_TOKEN>
JWT_EXPIRY_TIME  =  '1h'
COOKIE_EXPIRY_TIME  = 3600000
# Add any other environment variables your server needs
```

> Save and exit: Press `Ctrl + X`, then `Y`, then `Enter`


### Step 12: Start Server (Backend) with PM2

```bash
# Test server starts correctly
node index.js
# Press Ctrl+C to stop after testing

# Start with PM2
pm2 start index.js --name "backend"

# Configure auto-start on boot
pm2 startup
# Copy and run the command PM2 shows you

# Save PM2 configuration
pm2 save

# Check status
pm2 status

```

----------

# Part 5: Configure Nginx

### Step 13: Create Nginx Configuration

```Bash
# Create Nginx site configuration
sudo nano /etc/nginx/sites-available/my-app

```

Add this configuration (replace paths with your actual paths):


```Nginx
server {
    listen 80;
    server_name YOUR-EC2-PUBLIC-IP_ADDRESS;  # Replace with your actual IP

    # Serve client static files
    location / {
        root /home/ubuntu/AI-Email-Classifier/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to server
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

```

### Step 14: Enable Site and Start Nginx


```Bash
# Enable your site
sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Start and enable Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

```

### Step 15: Fix File Permissions

```Bash
# Set proper permissions for Nginx to access files
sudo chmod 755 /home/ubuntu/
sudo chmod 755 /home/ubuntu/AI-Email-Classifier/
sudo chmod 755 /home/ubuntu/AI-Email-Classifier/client/
sudo chmod -R 755 /home/ubuntu/AI-Email-Classifier/client/dist/

```

### Step 16: Configure Firewall


```Bash
# Configure UFW firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

```

----------

# Part 6: Test Your Application

### Step 17: Test Basic Functionality

1.  Open your browser and visit `http://YOUR-EC2-PUBLIC-IP`
    
2.  Verify the client (frontend) loads correctly.
    
3.  Test API functionality (login, register, etc.).
    
4.  Check the browser console for any errors.
    
5.  Check server status:
    
    
    ```    Bash
    # Check PM2 status
    pm2 status
    
    # Check Nginx status
    sudo systemctl status nginx
    
    # View server logs if needed
    pm2 logs server
    
    ```
    

----------

# Part 7: Add Custom Domain (Optional)

### Step 18: Get a Domain Name

-   **Free domains:** Freenom.com (.tk, .ml, .ga, .cf)
    
-   **Paid domains:** Hostinger,  Namecheap, GoDaddy, Google Domains
    

### Step 19: Configure DNS

In your domain provider's DNS settings, add:

| Type | Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| A | @ (or blank) | YOUR-EC2-PUBLIC-IP | 300 |
| A | www | YOUR-EC2-PUBLIC-IP | 300 |


### Step 20: Update Nginx for Domain


```Bash
# Edit Nginx configuration
sudo nano /etc/nginx/sites-available/my-app

```

Update the `server_name` line:


```Nginx
server_name yourdomain.com www.yourdomain.com;

```

Test and restart:


```Bash
sudo nginx -t
sudo systemctl restart nginx

```

----------

# Part 8: Add SSL Certificate (HTTPS)

### Step 21: Install Certbot


```Bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

```

### Step 22: Get SSL Certificate


```Bash
# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

```

Follow the prompts:

-   Enter email address
    
-   Agree to terms
    
-   Choose whether to share email with EFF
    
-   **Choose to redirect HTTP to HTTPS (recommended: option 2)**
    

### Step 23: Test Auto-Renewal


```Bash
# Test certificate auto-renewal
sudo certbot renew --dry-run

```

----------

# Part 9: Final Testing and Verification

### Step 24: Complete Testing

1.  Visit your domain: `https://yourdomain.com`
    
2.  Verify SSL certificate: Look for the lock icon 🔒
    
3.  Test all functionality: Registration, login, API calls
    
4.  Check HTTPS redirect: HTTP should redirect to HTTPS
    
5.  Test www subdomain: `https://www.yourdomain.com`
    



----------


### 📌 Important: Authorizing Your New Domain for Google Services

> **NOTE:**You **must** add your new domain name to your project in the Google Cloud Console.
>
> Google requires this verification to protect your user's data and secure your API keys. It ensures that only your *actual* website is allowed to make authentication requests or use your project's services.
>
> **How to do it:**
> 1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
> 2.  Navigate to **APIs & Services** -> **Credentials**.
> 3.  Find and click on the **OAuth 2.0 Client ID** you are using for login.
> 4.  Under **"Authorized JavaScript origins"**, add your new domain (e.g., `https://your-domain.com`).
> 5.  Under **"Authorized redirect URIs"**, add your specific callback URL (e.g., `https://your-domain.com/`).
>
> **If you skip this step,** Google will block all login attempts and API requests from your new domain, often resulting in a `redirect_uri_mismatch` error.

----------

# 🛠️ Maintenance and Management

Useful Commands for Ongoing Management

### Server (Backend) Management:


```Bash
pm2 status            # Check server status
pm2 restart server    # Restart server
pm2 logs server       # View server logs
pm2 stop server       # Stop server
pm2 delete server     # Remove from PM2

```

### Nginx Management:


```Bash
sudo systemctl status nginx        # Check Nginx status
sudo systemctl restart nginx       # Restart Nginx
sudo nginx -t                      # Test configuration
sudo tail -f /var/log/nginx/error.log  # View error logs

```

### SSL Certificate Management:


```Bash
sudo certbot certificates          # List certificates
sudo certbot renew                 # Manually renew certificates

```

### System Monitoring:


```Bash
htop                              # System resource monitor
df -h                             # Disk usage
free -h                           # Memory usage
pm2 monit                         # PM2 monitoring interface

```

### Updating Your Application

When you make changes to your code:


    
1.  **On EC2 server:**
    
    
    ```    Bash
    cd /home/ubuntu/AI-Email-Classifier
    git pull origin main
    
    # If server changed:
    cd server
    npm install  # if package.json changed
    pm2 restart server
    
    # If client changed:
    cd client
    npm install  # if package.json changed
    npm run build
    
    ```
    

----------

# 🔎 Troubleshooting Common Issues

-   **Issue 1: SSH Connection Timeout**
    
    -   **Solution:** Check the security group has an SSH rule allowing your IP.
        
-   **Issue 2: 500 Internal Server Error**
    
    -   **Solutions:**
        
        -   Check file permissions: `sudo chmod -R 755 /home/ubuntu/your-repo-name/client/dist/`
            
        -   Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
            
        -   Verify `dist` folder exists: `ls -la /home/ubuntu/your-repo-name/client/dist/`
            
-   **Issue 3: Server (Backend) API Not Working**
    
    -   **Solutions:**
        
        -   Check PM2 status: `pm2 status`
            
        -   Check server logs: `pm2 logs server`
            
        -   Verify environment variables in `.env` file
            
        -   Check MongoDB Atlas IP whitelist
            
-   **Issue 4: Domain Not Resolving**
    
    -   **Solutions:**
        
        -   Wait 5-30 minutes for DNS propagation
            
        -   Check DNS settings at your domain provider
            
        -   Use whatsmydns.net to check propagation status
            
-   **Issue 5: SSL Certificate Issues**
    
    -   **Solutions:**
        
        -   Ensure domain points to correct IP
            
        -   Check certificate status: `sudo certbot certificates`
            
        -   Renew if expired: `sudo certbot renew`
            

----------

# 🔒 Security Best Practices

-   **Keep system updated:** `sudo apt update && sudo apt upgrade`
    
-   Use strong passwords and **SSH keys only**
    
-   **Configure firewall** properly with UFW
    
-   **Regular backups** of your application and database
    
-   **Monitor logs** regularly for suspicious activity
    
-   Use **environment variables** for sensitive data
    
-   Keep dependencies updated: Regular `npm audit` and updates
    

----------

# 💰 Cost Optimization Tips

-   Use `t3.micro` for development and small applications
    
-   **Stop instances** when not needed (development environments)
    
-   Monitor usage with **AWS CloudWatch**
    
-   Use **reserved instances** for production workloads
    
-   Set up **billing alerts** to avoid unexpected charges
    

----------

# 🚀 Conclusion

You now have a fully deployed, production-ready full-stack application with:

✅ Ubuntu 24.04 LTS server on AWS EC2

✅ Express.js server (backend) managed by PM2

✅ Vite React client (frontend) served by Nginx

✅ Custom domain name with DNS configuration

✅ Free SSL certificate for HTTPS

✅ Proper security configuration

✅ Automated process management

✅ Scalable architecture

Your application is now accessible worldwide and follows industry best practices for deployment and security.

-   **Total Setup Time:** 20-40 mins
    
-   **Monthly Cost:** ~$4-15 (depending on instance type and usage)
    
-   **Skill Level:** Beginner to Intermediate
    


### Common Issues & Solutions

-   **Server (Backend) not starting:**
    
    -   Check PM2 logs: `pm2 logs server`
        
    -   Verify environment variables in `.env`
        
    -   Check MongoDB Atlas IP whitelist
        
-   **Client (Frontend) not loading:**
    
    -   Verify Nginx configuration: `sudo nginx -t`
        
    -   Check file permissions: `ls -la client/dist/`
        
    -   Review Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
        
-   **API calls failing:**
    
    -   Check if server is running: `pm2 status`
        
    -   Verify Nginx proxy configuration
        
    -   Check security group rules in AWS
        
-   **502 Bad Gateway:**
    
    -   Server is down or not responding
        
    -   Check PM2 status and restart if needed
        

### File Structure Reference

```
~/your-repo/
├── server/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── ... (other server files)
└── client/
    ├── dist/  (built files)
    ├── src/   (source files)
    ├── package.json
    └── .env.production

```

### Security Best Practices

* Keep system updated: `sudo apt update && sudo apt upgrade`
* Use strong passwords and **SSH keys only**
* Configure a firewall properly with **UFW**
* Perform **regular backups** of your application and database
* **Monitor logs** regularly
* Use **environment variables** for sensitive data
* Enable **fail2ban** for SSH protection: `sudo apt install fail2ban`