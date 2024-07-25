import { ID, Query } from "node-appwrite"
import {
    users, 
    NEXT_PROJECT_ID,
    NEXT_API_KEY,
    NEXT_DATABASE_ID,
    NEXT_PATIENT_COLLECTION_ID,
    NEXT_DOCTOR_COLLECTION_ID,
    NEXT_APPOINTMENT_COLLECTION_ID,
} from "../appwrite.config"
import { parseStringify } from "../utils"

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
    try {
        console.table({
            NEXT_PROJECT_ID,
            NEXT_API_KEY,
            NEXT_DATABASE_ID,
            NEXT_PATIENT_COLLECTION_ID,
            NEXT_DOCTOR_COLLECTION_ID,
            NEXT_APPOINTMENT_COLLECTION_ID,
        })
        // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
        const newuser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

        return parseStringify(newuser);
    } catch (error: any) {
        // Check existing user
        if (error && error?.code === 409) {
            const existingUser = await users.list([
                Query.equal("email", [user.email]),
            ]);

            return existingUser.users[0];
        }
        console.error("An error occurred while creating a new user:", error);
    }
};
