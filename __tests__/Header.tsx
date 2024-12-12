import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useSession, signOut } from "next-auth/react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("Header Component", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it("renders the header with login button when no session exists", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<Header />);

    expect(screen.getByText(/Appointment Management Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("navigates to login page when login button is clicked", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<Header />);

    fireEvent.click(screen.getByText(/Login/i));

    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  it("renders admin-specific options and logout button when session exists for admin user", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
        },
      },
    });

    render(<Header />);

    expect(screen.getByText(/Appointment Management Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Add User/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it("renders logout button when session exists for non-admin user", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          id: "2",
          email: "doctor@example.com",
          name: "Test User",
          role: "doctor",
        },
      },
    });

    render(<Header />);

    expect(screen.queryByText(/Add User/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it("navigates to add member page when 'Add User' button is clicked by admin", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
        },
      },
    });

    render(<Header />);

    fireEvent.click(screen.getByText(/Add User/i));

    expect(mockRouterPush).toHaveBeenCalledWith("/addmember");
  });

  it("calls signOut function when logout button is clicked", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          id: "2",
          email: "user@example.com",
          name: "Test User",
          role: "user",
        },
      },
    });

    render(<Header />);

    fireEvent.click(screen.getByText(/Logout/i));

    await waitFor(() => expect(signOut).toHaveBeenCalled());
  });
});
