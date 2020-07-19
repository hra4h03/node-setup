import { Schema, model, Document } from "mongoose";

interface IAdminUser extends Document {
  email: string
  password: string
}

const adminUser = new Schema<IAdminUser>({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
})

const AdminUserModel = model<IAdminUser>("AdminUser", adminUser)
export { AdminUserModel }