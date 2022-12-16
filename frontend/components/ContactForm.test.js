import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const h1 = screen.getByText(/contact form/i);
    expect(h1).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    userEvent.type(screen.getByPlaceholderText('Edd'), 'Kyle');
    const error = screen.getByText(/error: firstname must have at least 5 characters/i);
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    userEvent.click(screen.getByText(/submit/i));  
    expect(screen.getByText(/Error: firstName must have at least 5 characters./i)).toBeInTheDocument();
    expect(screen.getByText(/Error: lastName is a required field./i)).toBeInTheDocument();
    expect(screen.getByText(/Error: email must be a valid email address./i)).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    userEvent.type(screen.getByPlaceholderText('Edd'), 'Marcus');
    userEvent.type(screen.getByPlaceholderText('Burke'), 'Stephens');
    userEvent.click(screen.getByText(/submit/i));
    expect(screen.getByText(/Error: email must be a valid email address./i)).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    userEvent.type(screen.getByPlaceholderText('bluebill1049@hotmail.com'), 'Marcus');
    expect(screen.getByText(/Error: email must be a valid email address./i)).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    userEvent.type(screen.getByPlaceholderText('Edd'), 'Marcus');
    userEvent.type(screen.getByPlaceholderText('bluebill1049@hotmail.com'), 'kyle@kyle.com');
    userEvent.click(screen.getByText(/submit/i));
    expect(screen.getByText(/lastname is a required field/i));
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    userEvent.type(screen.getByPlaceholderText('Edd'), 'Marcus');
    userEvent.type(screen.getByPlaceholderText('Burke'), 'Stephens');
    userEvent.type(screen.getByPlaceholderText('bluebill1049@hotmail.com'), 'kyle@kyle.com');
    userEvent.click(screen.getByText(/submit/i));
    expect(screen.getByTestId('firstnameDisplay')).toBeInTheDocument();
    expect(screen.getByTestId('lastnameDisplay')).toBeInTheDocument();
    expect(screen.getByTestId('emailDisplay')).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    userEvent.type(screen.getByPlaceholderText('Edd'), 'Marcus');
    userEvent.type(screen.getByPlaceholderText('Burke'), 'Stephens');
    userEvent.type(screen.getByPlaceholderText('bluebill1049@hotmail.com'), 'kyle@kyle.com');
    userEvent.type(screen.getByLabelText('Message'), 'kyle@kyle.com');
    userEvent.click(screen.getByText(/submit/i));
    expect(screen.getByTestId('firstnameDisplay')).toBeInTheDocument();
    expect(screen.getByTestId('lastnameDisplay')).toBeInTheDocument();
    expect(screen.getByTestId('emailDisplay')).toBeInTheDocument();
    expect(screen.getByTestId('messageDisplay')).toBeInTheDocument();
});
