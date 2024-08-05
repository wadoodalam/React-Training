
const baseURL = "http://localhost:3000/todos";
export default class TodoApi {
    getTodos = async () => {
        try {
            const response = await fetch(baseURL);
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }

    };
    addTodo = async (todo) => {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (!response.ok) {
            throw new Error('Failed to add todo');
        }
        const data = await response.json();
        return data;
    };

    deleteTodo = async (id) => {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
    };

    updateTodo = async (id, updatedTodo) => {
        try {
            const response = await fetch(`${baseURL}/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo)
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    };

}






/*
functional component

const baseURL = "http://localhost:3000/todos";

export const getTodos = async () => {
    try {
        const response = await fetch(baseURL);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }

};


export const addTodo = async (todo) => {
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to add todo');
    }
    const data = await response.json();
    return data;
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
};

export const updateTodo = async (id, updatedTodo) => {
    try {
        const response = await fetch(`${baseURL}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo)
        });

        return await response.json();
    } catch (error) {
        throw error;
    }
};
*/