
export interface User {
    id?: string;
    organizationName: string;  // Changed organization to an object type
    username: string;
    email: string;
    password?: string; // Optional as it's not returned in the response
}
