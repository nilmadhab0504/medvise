import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';
import Header from '../src/components/Header';

describe('Home Page', () => {
  it('renders the Header component', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner'); // Assuming Header component has a role of banner
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1, name: /Streamline Your Medical Practice/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the feature section heading', () => {
    render(<Home />);
    const featureHeading = screen.getByRole('heading', { level: 2, name: /Powerful Tools for Medical Professionals/i });
    expect(featureHeading).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<Home />);
    const featureCards = screen.getAllByRole('heading', { level: 3 }); // Assuming each card title is rendered as a level 3 heading
    expect(featureCards).toHaveLength(4);
  });

  it('renders the footer', () => {
    render(<Home />);
    const footer = screen.getByText(/Medical Appointment Management Portal. All rights reserved./i);
    expect(footer).toBeInTheDocument();
  });

  it('renders feature card descriptions correctly', () => {
    render(<Home />);
    expect(screen.getByText(/Easily view and manage your daily, weekly, or monthly appointment schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/Access and update patient information securely within the platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Modify appointment details, reschedule, or add notes as needed/i)).toBeInTheDocument();
    expect(screen.getByText(/Easily remove appointments from the system when necessary/i)).toBeInTheDocument();
  });
});
