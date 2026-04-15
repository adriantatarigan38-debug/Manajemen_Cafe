/**
 * Authentication utility functions for cafe login system
 * 
 * This module provides core authentication functionality including:
 * - Credential validation against hardcoded values
 * - Authentication state checking via sessionStorage
 * - Logout functionality
 */

/**
 * Validates user credentials against hardcoded values
 * 
 * @param username - The username to validate
 * @param password - The password to validate
 * @returns true if and only if username === "adrianta" AND password === "adrianta23"
 * 
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4
 * 
 * Preconditions:
 * - username is defined (not null/undefined)
 * - password is defined (not null/undefined)
 * 
 * Postconditions:
 * - Returns true if and only if username === "adrianta" AND password === "adrianta23"
 * - Returns false otherwise
 * - No side effects on input parameters
 */
export function validateCredentials(username: string, password: string): boolean {
  return username === "adrianta" && password === "adrianta23";
}

/**
 * Checks if the user is currently authenticated
 * 
 * @returns true if sessionStorage contains 'isAuthenticated' === 'true', false otherwise
 * 
 * Validates: Requirements 3.1, 3.4
 * 
 * Preconditions:
 * - sessionStorage is available (browser environment)
 * 
 * Postconditions:
 * - Returns true if sessionStorage.getItem('isAuthenticated') === 'true'
 * - Returns false otherwise
 * - No mutations to sessionStorage
 */
export function checkAuth(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return sessionStorage.getItem('isAuthenticated') === 'true';
}

/**
 * Logs out the current user by clearing authentication state
 * 
 * Validates: Requirements 3.4, 5.1
 * 
 * Preconditions:
 * - sessionStorage is available
 * 
 * Postconditions:
 * - sessionStorage.removeItem('isAuthenticated') is called
 * - Authentication state is cleared
 * - No return value
 */
export function logout(): void {
  if (typeof window === 'undefined') {
    return;
  }
  sessionStorage.removeItem('isAuthenticated');
}
