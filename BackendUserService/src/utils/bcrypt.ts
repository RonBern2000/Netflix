import bcrypt from "bcryptjs";

export const compare = async(password: string, comparePassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, comparePassword);
}

export const hash = async(password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}