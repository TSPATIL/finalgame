//user
export function createUser(userData) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/create-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': `Bearer ${userData.token}`,
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
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/login-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': `Bearer ${userData.token}`,
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

export function googleLoginUser(userData) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/google-login-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': `Bearer ${userData.token}`,
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

export async function logoutUser(){
    try {
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error || 'Logout failed'); // Throw an error if the status isn't OK
        }
        return {status: true, message: data};
    } catch (error) {
        consol.log(error)
        return {status: false, message: error.message, error};
    }
}

export async function getAllUsers(){
    try {
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/getallusers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': `Bearer ${userData.token}`,
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
        const data = await response.json(); 

        if (!response.ok) {
            throw new Error(data.error || 'Fetching details failed'); // Throw an error if the status isn't OK
        }

        return data; // Return the successful response data
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function getUserDetails(){
    try {
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/getuserdetails`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Information fetching failed');
        }
        return data;
    } catch (error) {
        return {status: false, error: error.message || 'Network error occurred'};
    }
}

export async function getUserDetailsByParams(userId){
    try {
        console.log(userId)
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/getuserdetailsbyadmin/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
            throw new Error(data.error || 'Information fetching failed');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function updateUserDetails(userData){
    try{
        for (let [key, value] of userData.entries()) {
            console.log(key, value);
        }
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/updateUserDetails`, {
            method: "PATCH",
            headers: {
                // "Content-Type": "multipart/form-data",
            },
            body: userData,
            credentials: 'include'
        })
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error || 'Data failed to save');
        }

        return data;
    }
    catch(error){
        throw new Error(error.message || 'Network error occurred');
    }
}

//admin
export async function createAdmin(adminDetails){
    try{
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/create-admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(adminDetails),
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        if(data.error){
            throw new Error(data.error || 'Failed to create');
        }
        return data;
    }
    catch(error){
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function loginAdmin(adminDetails){
    try{
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/login-admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(adminDetails),
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data)
        if(data.error){
            throw new Error(data.error || 'Failed to login');
        }
        return data;
    }
    catch(error){
        console.log(error)
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function logoutAdmin(){
    try{
        const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/logout-admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error || 'Logout failed'); // Throw an error if the status isn't OK
        }
        return {status: true, message: data};
    }
    catch(error){
        return {status: false, message: error.message, error};
    }
}