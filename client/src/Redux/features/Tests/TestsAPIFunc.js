export async function addTest(testDetails) {
    try {
        for (let [key, value] of testDetails.entries()) {
            console.log(key, value);
        }
        const response = await fetch("http://localhost:5000/api/test/add-test-story", {
            method: 'POST',
            headers: {
                // "Content-Type": "multipart/form-data",
            },
            body: testDetails,
            credentials: 'include'
        });
        const data = await response.json();
        if(!data.status){
            throw new Error(data.error || 'Fetching details failed');
        }
        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function updateTestDetails(testID, testType, testDetails) {
    try {
        console.log("hello")
        for (let [key, value] of testDetails.entries()) {
            console.log(key, value);
        }
        const response = await fetch(`http://localhost:5000/api/test/update-test/${testID}/${testType}`, {
            method: 'PUT',
            headers: {
                // "Content-Type": "multipart/form-data",
            },
            body: testDetails,
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data)
        if(!data.status){
            throw new Error(data.error || 'Update failed');
        }
        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function deleteTest(testID) {
    try {
        const response = await fetch(`http://localhost:5000/api/test/add-test-story/${testID}`, {
            method: 'DELETE',
            headers: {
                // "Content-Type": "multipart/form-data",
            },
            body: testDetails,
            credentials: 'include'
        });
        const data = await response.json();
        if(!data.status){
            throw new Error(data.error || 'Fetching details failed');
        }
        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function getAllTests() {
    try {
        const response = await fetch(`http://localhost:5000/api/test/update-test-story/`, {
            method: 'GET',
            headers: {
                // "Content-Type": "multipart/form-data",
            },
            credentials: 'include'
        });
        const data = await response.json();
        if(!data.status){
            throw new Error(data.error || 'Fetching details failed');
        }
        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function getTestDetails(testID) {
    try {
        const response = await fetch(`http://localhost:5000/api/test/update-test-story/${testID}`, {
            method: 'GET',
            headers: {
                // "Content-Type": "multipart/form-data",
            },
            credentials: 'include'
        });
        const data = await response.json();
        if(!data.status){
            throw new Error(data.error || 'Fetching details failed');
        }
        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}