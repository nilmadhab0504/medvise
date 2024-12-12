import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import LoginPage from "@/app/login/page";
import "@testing-library/jest-dom";
import React from "react";
import { useSession, signIn } from "next-auth/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
  signIn: jest.fn(),
  useSession: jest.fn(),
}));

describe("LoginPage Component", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });

    jest.clearAllMocks();
  });

  it("renders the login page with default role as 'doctor'", () => {
    render(<LoginPage />);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.getByTestId('login-title')).toHaveTextContent('Login');
    
    const doctorButton = screen.getByTestId('doctor-role-button');
    const adminButton = screen.getByTestId('admin-role-button');
    
    expect(doctorButton).toHaveClass('bg-primary');
    expect(doctorButton).toHaveClass('text-primary-foreground');
    expect(adminButton).toHaveClass('border');
    expect(adminButton).toHaveClass('border-input');
  });

  it("changes role to 'admin' when Admin button is clicked", () => {
    render(<LoginPage />);

    const doctorButton = screen.getByTestId('doctor-role-button');
    const adminButton = screen.getByTestId('admin-role-button');

    fireEvent.click(adminButton);

    expect(doctorButton).toHaveClass('border');
    expect(doctorButton).toHaveClass('border-input');
    expect(adminButton).toHaveClass('bg-primary');
    expect(adminButton).toHaveClass('text-primary-foreground');
  });

  it("shows an error when submitting empty form", async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByTestId('login-submit-button'));

    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('Email is required');
    });
  });

  it("shows an error for invalid email format", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId('login-submit-button'));

    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('Email is invalid');
    });
  });

  it("shows an error for password less than 8 characters", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: "short" },
    });

    fireEvent.click(screen.getByTestId('login-submit-button'));

    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('Password must be at least 8 characters');
    });
  });

  it("submits the form and calls signIn with correct data", async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: null });

    render(<LoginPage />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId('login-submit-button'));

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "user@example.com",
        password: "password123",
        role: "doctor",
        redirect: false,
      })
    );
  });

  it("displays an error when signIn fails", async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: "Invalid credentials" });

    render(<LoginPage />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId('login-submit-button'));

    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('Invalid credentials');
    });
  });
});