import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '@/app/login/page';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Mock modules
jest.mock('next-auth/react');
jest.mock('next/navigation');
jest.mock('react-hot-toast');

describe('LoginPage - White Box Unit Test', () => {
  const replaceMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ replace: replaceMock });
  });

  it('shows loading if session is loading', () => {
    useSession.mockReturnValue({ data: null, status: 'loading' });

    render(<LoginPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('redirects if user is authenticated', () => {
    useSession.mockReturnValue({ data: { user: {} }, status: 'authenticated' });

    render(<LoginPage />);
    expect(replaceMock).toHaveBeenCalledWith('/');
  });

  it('shows error if email is invalid', async () => {
    useSession.mockReturnValue({ data: null, status: 'unauthenticated' });

    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email is invalid');
    });
  });

  it('shows error if password is too short', async () => {
    useSession.mockReturnValue({ data: null, status: 'unauthenticated' });

    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Password is invalid');
    });
  });

  it('shows error if login fails with invalid credentials', async () => {
    useSession.mockReturnValue({ data: null, status: 'unauthenticated' });
    signIn.mockResolvedValue({ error: 'Invalid', ok: false });

    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid email or password');
    });
  });

  it('shows success if login succeeds', async () => {
    useSession.mockReturnValue({ data: null, status: 'unauthenticated' });
    signIn.mockResolvedValue({ ok: true });

    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Successful login');
    });
  });
});