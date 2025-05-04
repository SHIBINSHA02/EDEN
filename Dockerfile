# Use a Node.js base image.  Debian is generally more compatible.
FROM node:18-bookworm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package.json ./
COPY package-lock.json ./

# Install dependencies.  Do NOT use --force or --legacy-peer-deps here.
RUN npm install

# Copy the rest of your application code
COPY . ./

# Expose the port your application runs on (if applicable)
# If your app runs on port 5173 (like Vite's default), expose it here:
EXPOSE 5173

# Start the application.  Include the --host flag for Vite.
CMD ["npm", "run", "dev", "--", "--host"]

# =========================================================================================
#  Explanation:
# =========================================================================================
# 1.  Base Image:
#     * We're using node:18-bookworm.  This provides a consistent environment with Node.js 18 (LTS).
#     * You can change the Node.js version if needed (e.g., node:20-bookworm).  But ensure it matches your application's requirements.
#
# 2.  Working Directory:
#     * /app is the directory where your application code will reside inside the container.
#
# 3.  Copying Files:
#     * We copy package.json and package-lock.json *first*.  This is a Docker optimization.  It allows Docker to cache the dependencies layer.  If you only change your application code, Docker can reuse the cached layer, making builds faster.
#     * We copy package-lock.json to ensure consistent dependency installation.
#     * The rest of your application code is copied *after* the dependencies are installed.  This keeps the dependencies layer separate.
#
# 4.  Installing Dependencies:
#     * RUN npm install: This command installs the dependencies defined in your package.json and locked by your package-lock.json.
#     * Important: We do *not* use --force or --legacy-peer-deps here.  These are workarounds for dependency issues and should not be used in a Dockerfile for production.  The goal is to have a clean, reliable build.  If you're getting errors here, you need to fix your package.json and package-lock.json.
#
# 5.  Exposing Ports:
#     * EXPOSE 5173:  This line tells Docker that your application listens on port 5173.  This is the default port for Vite.  If your application uses a different port, change this accordingly.  Exposing the port doesn't automatically publish it, but it's good practice and required for linking and other Docker features.
#
# 6.  Command:
#     * CMD ["npm", "run", "dev", "--", "--host"]: This specifies the command to run when the container starts.
#         * It runs the "dev" script defined in your package.json (e.g., vite).
#         * The --host flag is crucial for Vite.  By default, Vite binds to localhost, which is not accessible from outside the container.  The --host flag makes Vite listen on all interfaces (0.0.0.0), allowing it to be accessed from your host machine.
#         * The extra "--" is used to separate the arguments for npm run dev from the arguments for Vite.
#
# 7.  Best Practices:
#     * .dockerignore:  Create a .dockerignore file in the same directory as your Dockerfile to exclude unnecessary files and directories from your Docker image (e.g., node_modules, .git, etc.).  This makes your builds faster and your images smaller.
#     * Versioning:  Use specific versions for your Node.js base image (e.g., node:18-bookworm) instead of tags like "latest" to ensure consistency.
#     * Security:  Be mindful of security best practices when building your Docker images.  Avoid running processes as root whenever possible.  The Node.js image already takes care of this.
#
# 8.  How to Use:
#     * Save this content as a file named Dockerfile in the root of your project.
#     * Build the image: docker build -t my-app .  (Replace "my-app" with a name for your image.)
#     * Run the container: docker run -p 5173:5173 my-app  (Map the port.  If your app uses a different port, change 5173:5173 accordingly.)
#
# =========================================================================================
