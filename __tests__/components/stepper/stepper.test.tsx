import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stepper from '../../../components/stepper/stepper';
import useStepper from '../../../hooks/useStepper';

// Mock the useStepper hook
jest.mock('../../../hooks/useStepper');

const mockUseStepper = useStepper as jest.MockedFunction<typeof useStepper>;

describe('Stepper Component', () => {
    const mockSteps = [
        { id: 1, title: 'Service' },
        { id: 2, title: 'Termin' },
        { id: 3, title: 'Fahrzeug' },
        { id: 4, title: 'Kontakt' },
    ];

    const createMockStepper = (currentStep: number) => ({
        currentStep,
        handleNextStep: jest.fn(),
    });

    beforeEach(() => {
        mockUseStepper.mockReturnValue(createMockStepper(1));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<Stepper steps={mockSteps} />);
        expect(screen.getByText('Service')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();
        expect(screen.getByText('Fahrzeug')).toBeInTheDocument();
        expect(screen.getByText('Kontakt')).toBeInTheDocument();
    });

    it('displays "No steps provided" when steps array is empty', () => {
        render(<Stepper steps={[]} />);
        expect(screen.getByText('No steps provided')).toBeInTheDocument();
    });

    it('displays "No steps provided" when steps is null', () => {
        render(<Stepper steps={null as any} />);
        expect(screen.getByText('No steps provided')).toBeInTheDocument();
    });

    it('renders step titles correctly', () => {
        render(<Stepper steps={mockSteps} />);
        expect(screen.getByText('Service')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();
        expect(screen.getByText('Fahrzeug')).toBeInTheDocument();
        expect(screen.getByText('Kontakt')).toBeInTheDocument();
    });

    it('applies correct styles for completed steps', () => {
        mockUseStepper.mockReturnValue(createMockStepper(2));
        render(<Stepper steps={mockSteps} />);
        const stepCircles = document.querySelectorAll('.rounded-full');
        expect(stepCircles[0].className).toContain('bg-blue-500');
        expect(stepCircles[1].className).toContain('bg-blue-500');
    });

    it('applies correct styles for inactive steps', () => {
        mockUseStepper.mockReturnValue(createMockStepper(0));
        render(<Stepper steps={mockSteps} />);
        const stepCircles = document.querySelectorAll('.rounded-full');
        expect(stepCircles[1].className).toContain('bg-gray-200');
        expect(stepCircles[2].className).toContain('bg-gray-200');
        expect(stepCircles[3].className).toContain('bg-gray-200');
    });

    it('renders connector lines between steps', () => {
        render(<Stepper steps={mockSteps} />);
        const connectorLines = document.querySelectorAll('.absolute.top-6');
        expect(connectorLines).toHaveLength(3);
    });
});
