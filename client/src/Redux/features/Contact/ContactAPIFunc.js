export async function addContact(contactDetails) {
    try {
        const response = await fetch("http://localhost:5000/api/contact/add-contact", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactDetails)
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

export async function getAllContacts() {
    try {
        const response = await fetch("http://localhost:5000/api/contact/getAllContacts", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
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

export async function deleteContact(contactId) {
    try {
        const response = await fetch(`http://localhost:5000/api/contact/delete-contact/${contactId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        const data = await response.json();
        if(!data.status){
            throw new Error(data.error || 'Deletion failed');
        }
        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

export async function getContactDetails(contactId) {
    try {
        const response = await fetch(`http://localhost:5000/api/contact/getContactDeatils/${contactId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
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