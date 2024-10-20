// A mock function to mimic making an async request for data
export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://127.0.0.1:5000/api/user/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userData.token}`,
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
        const data = await response.json()
        if(data.error){
            reject(data.error);
        }
        resolve({ data })
    }
    );
}

export function loginUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://127.0.0.1:5000/api/user/login-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userData.token}`,
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
        const data = await response.json()
        if(data.error){
            reject(data.error);
        }
        resolve({ data });
    }
    );
}

export async function getAllUsers(){
    try {
        const response = await fetch("http://127.0.0.1:5000/api/user/getallusers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userData.token}`,
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
        const data = await response.json(); // Parse the JSON response

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(data.error || 'Login failed'); // Throw an error if the status isn't OK
        }

        return data; // Return the successful response data
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function getUserDetails(){
    try {
        const response = await fetch("http://127.0.0.1:5000/api/user/getuserdetails", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userData.token}`,
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function getUserDetailsByParams(){
    try {
        const response = await fetch("http://127.0.0.1:5000/api/user/getuserdetailsbyadmin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userData.token}`,
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

