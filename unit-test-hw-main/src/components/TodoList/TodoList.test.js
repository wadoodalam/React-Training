import TodoList from "./TodoList";
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { render, waitFor, screen, queryByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockData = [
    {
        "userId": 1,
        "id": 1,
        "title": "First Todo",
        "completed": false
    },
    {
        "userId": 1,
        "id": 2,
        "title": "Second Todo",
        "completed": false
    },
    {
        "userId": 1,
        "id": 3,
        "title": "Third Todo",
        "completed": true
    },
];

const server = setupServer(
    rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
        return res(ctx.json(mockData));
    })
);
// TODO: Mock the fetch API, and do reset and clean up
beforeEach(() => { server.listen(); });

afterEach(() => { server.resetHandlers(); });

afterAll(() => { server.close(); });

// TODO: Test component to render correctly with the fetched data
test("renders fetched todos on mount", async () => {
    // check if loading is present when fetching
    const { getByText } = render(<TodoList />);

    expect(getByText("Loading...")).toBeInTheDocument();

    // check if the todos from the mock data exsist.
    await waitFor(() => {
        expect(getByText("First Todo")).toBeInTheDocument();
        expect(getByText("Second Todo")).toBeInTheDocument();
        expect(getByText("Third Todo")).toBeInTheDocument();
    });
});

// TODO: Test component to handle API fetch failure and display error message
test("handles API fetch failure", async () => {
    server.use(
        rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
            return res(ctx.status(404));
        })
    );
    // use getByText when testing for ele existence, and queryByText for NO existence
    const { getByText, queryByText } = render(<TodoList />);

    await waitFor(() => {
        // test if error message is present
        expect(getByText("Error: Failed to fetch todos")).toBeInTheDocument();
        // test that todos should not be present
        expect(queryByText("First Todo")).not.toBeInTheDocument();
        expect(queryByText("Second Todo")).not.toBeInTheDocument();
        expect(queryByText("Third Todo")).not.toBeInTheDocument();
    });
});

// TODO: Test adding a new todo
test("adds a new todo item", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<TodoList />);
    // need to first have this waitFor to ensure that the button and input box are rendered
    await waitFor(() => {
        const inputBox = getByPlaceholderText("Enter todo");
        const submitButton = getByText("Add Todo");

        expect(inputBox).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
    // now do your testing
    const inputBox = getByPlaceholderText("Enter todo");
    const submitButton = getByText("Add Todo");
    
    // "type" need await
    await userEvent.type(inputBox, "New Todo");
    // clicks do not need await 
    userEvent.click(submitButton);

    await waitFor(() => {
        expect(getByText("New Todo")).toBeInTheDocument();
        // an invalid test case
        expect(queryByText("Invalid Todo")).not.toBeInTheDocument();
    });
});

// TODO: Test removing a todo
test("removes a todo item", async () => {
    const { getByText,queryByText } = render(<TodoList />);

    // ensure that the todos are present
    await waitFor(() => {
        expect(getByText("First Todo")).toBeInTheDocument();
        expect(getByText("Second Todo")).toBeInTheDocument();
        expect(getByText("Third Todo")).toBeInTheDocument();
    });

    // get the delete button
    const deleteButton = getByText("First Todo").children[0];
    // clicks do not need await
    userEvent.click(deleteButton);


    await waitFor(() => {
        expect(queryByText("First Todo")).not.toBeInTheDocument();
        expect(getByText("Second Todo")).toBeInTheDocument();
        expect(getByText("Third Todo")).toBeInTheDocument();
    });
});
