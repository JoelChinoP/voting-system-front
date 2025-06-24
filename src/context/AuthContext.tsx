import type { AuthContextType } from "@/types/auth";
import { createContext } from "react";

/**
 * @description This file contains the context for authentication.
 * @module AuthContext
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

