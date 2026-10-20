import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Phonebook App', () => {
  beforeEach(() => {
    const persons = [
      {
        id: '1',
        name: 'Arto Hellas',
        number: '040-123456'
      },
      {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-44-5323523'
      },
      {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234343'
      },
      {
        id: '4',
        name: 'Mary Poppins',
        number: '39-22-715'
      },
      {
        id: '5',
        name: 'Rosalind Franklin',
        number: '44-86-72381'
      }
    ];
    localStorage.setItem('persons', JSON.stringify(persons));
  });

  test('phonebook starts with right amount of notes', () => {
    const { length } = screen.getAllByRole('listitem');
    expect(length).toBe(5);
  });

  test('user can add a new note', () => {
    render(<App />);
    const input = screen.getByLabelText('name');
    const button = screen.getByRole('button', { name: /add/i });
    userEvent.type(input, 'Matti N');
    userEvent.click(button);
    const newNote = screen.getByText('Matti N');
    expect(newNote).toBeInTheDocument();
  });

  test('user can delete a note', () => {
    render(<App />);
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    userEvent.click(deleteButtons[0]);
    const notesAfterDelete = screen.getAllByRole('listitem');
    expect(notesAfterDelete.length).toBe(4);
  });
});