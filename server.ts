import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const JWT_SECRET = process.env.JWT_SECRET || "default_sdm_secret_key_change_in_prod";

  app.use(express.json());

  // In-memory user store for demo purposes
  // In a real app, this would be a database like PostgreSQL or MongoDB
  const users: any[] = [
    {
      id: "1",
      email: "admin@specinsite.com",
      password: await bcrypt.hash("admin123", 10),
      role: "administrator"
    },
    {
      id: "2",
      email: "editor@specinsite.com",
      password: await bcrypt.hash("editor123", 10),
      role: "editor"
    },
    {
      id: "3",
      email: "viewer@specinsite.com",
      password: await bcrypt.hash("viewer123", 10),
      role: "viewer"
    }
  ];

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ message: "Token is invalid" });
      req.user = user;
      next();
    });
  };

  // RBAC Middleware
  const authorizeRoles = (...roles: string[]) => {
    return (req: any, res: any, next: any) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }
      next();
    };
  };

  // API Routes
  app.post("/api/auth/register", async (req, res) => {
    const { email, password, role = "viewer" } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      role
    };

    users.push(newUser);
    res.status(201).json({ message: "User registered successfully" });
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  });

  app.get("/api/user/me", authenticateToken, (req: any, res) => {
    res.json({ user: req.user });
  });

  // Example Protected Route
  app.get("/api/admin/data", authenticateToken, authorizeRoles('administrator'), (req, res) => {
    res.json({ data: "This is sensitive admin data" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
