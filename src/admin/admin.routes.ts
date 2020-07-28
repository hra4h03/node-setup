import AdminBro from 'admin-bro';
import AdminBroExpress from 'admin-bro-expressjs'
import AdminBroMongoose from 'admin-bro-mongoose'
import { AdminUserModel } from './admin.model';
import { Router } from 'express';

const ADMIN = {
  email: process.env.EMAIL || 'test@example.com',
  password: process.env.PASSWORD || 'password',
}

export const registerAdminPanel = (DB_connection: unknown) => {
  const adminParent = {
    name: 'Admin Users',
    icon: 'Settings'
  }
  AdminBro.registerAdapter(AdminBroMongoose)
  const adminBro = new AdminBro({
    databases: [DB_connection],
    rootPath: '/admin',  
    resources: [
      {resource: AdminUserModel, options: { parent: adminParent }}
    ]
  })

  const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email: string, password: string) => {
      if (ADMIN.password === password && ADMIN.email === email) return ADMIN;
      const adminUser = await AdminUserModel.findOne({ email })
      if(adminUser && adminUser.password === password) return adminUser;
      return null
    },
    cookiePassword: process.env.SECRET_COOKIE || 'somasd1nda0asssjsdhb21uy3g',
  }, null, {
    resave: true,
    saveUninitialized: true
  }) as Router

  return { router, path: adminBro.options.rootPath }
}